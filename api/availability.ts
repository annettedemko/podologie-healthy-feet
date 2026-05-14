import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getSql } from "./_lib/db.js";
import {
  OPEN_WINDOWS,
  WORK_START_HOUR,
  WORK_END_HOUR,
  capacityForHour,
  BERLIN_OFFSET,
} from "./_lib/bookingConfig.js";

interface SlotResp {
  iso: string;
  date: string;
  hour: number;
  capacity: number;
  taken: number;
  available: number;
}

function* iterateOpenDates(): Generator<string> {
  for (const w of OPEN_WINDOWS) {
    const [fy, fm, fd] = w.from.split("-").map(Number);
    const [ty, tm, td] = w.to.split("-").map(Number);
    const start = new Date(Date.UTC(fy, fm - 1, fd));
    const end = new Date(Date.UTC(ty, tm - 1, td));
    for (let d = new Date(start); d.getTime() <= end.getTime(); d.setUTCDate(d.getUTCDate() + 1)) {
      const dow = d.getUTCDay();
      if (dow === 0 || dow === 6) continue;
      const y = d.getUTCFullYear();
      const m = String(d.getUTCMonth() + 1).padStart(2, "0");
      const day = String(d.getUTCDate()).padStart(2, "0");
      yield `${y}-${m}-${day}`;
    }
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ ok: false, error: "method_not_allowed" });
  }

  const sql = getSql();

  // 1) Build full slot list (date × hour) for all open dates.
  const all: SlotResp[] = [];
  for (const ymd of iterateOpenDates()) {
    for (let h = WORK_START_HOUR; h < WORK_END_HOUR; h++) {
      const cap = capacityForHour(h);
      all.push({
        iso: `${ymd}T${String(h).padStart(2, "0")}:00:00${BERLIN_OFFSET}`,
        date: ymd,
        hour: h,
        capacity: cap,
        taken: 0,
        available: cap,
      });
    }
  }
  if (all.length === 0) {
    return res.status(200).json({ slots: [] });
  }

  // 2) Single grouped query for all bookings inside [first, last] window.
  const first = all[0].iso;
  const last = all[all.length - 1].iso;
  type Row = { slot_iso: string; cnt: string };
  const rows = (await sql`
    SELECT preferred_date::text AS slot_iso, COUNT(*)::text AS cnt
    FROM bookings
    WHERE preferred_date >= ${first}::timestamptz
      AND preferred_date <= ${last}::timestamptz
      AND status IN ('new', 'confirmed', 'rescheduled')
    GROUP BY preferred_date
  `) as unknown as Row[];

  // Build lookup map keyed by exact UTC moment.
  const taken = new Map<number, number>();
  for (const r of rows) {
    const t = new Date(r.slot_iso).getTime();
    taken.set(t, Number(r.cnt));
  }

  for (const s of all) {
    const t = new Date(s.iso).getTime();
    const used = taken.get(t) ?? 0;
    s.taken = used;
    s.available = Math.max(0, s.capacity - used);
  }

  // No CDN cache — capacity changes must be visible immediately. Slot count is small.
  res.setHeader("Cache-Control", "private, no-store");
  return res.status(200).json({ slots: all });
}
