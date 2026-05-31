// Mirror of src/lib/booking/config.ts — kept identical so backend & frontend agree.

export const OPEN_WINDOWS: Array<{ from: string; to: string }> = [
  { from: "2026-06-02", to: "2026-06-27" },
];

export const WORK_START_HOUR = 9;
export const WORK_END_HOUR = 18;
export const SLOT_DURATION_MIN = 45;
export const SPECIALIST_COUNT = 2;
export const BERLIN_OFFSET = "+02:00";

export function capacityForSlot(): number {
  return SPECIALIST_COUNT;
}

/** All slot start times (HH:MM) within a single day's work window. */
export function slotTimes(): string[] {
  const out: string[] = [];
  const startMin = WORK_START_HOUR * 60;
  const endMin = WORK_END_HOUR * 60;
  for (let m = startMin; m + SLOT_DURATION_MIN <= endMin; m += SLOT_DURATION_MIN) {
    const h = Math.floor(m / 60);
    const mm = m % 60;
    out.push(`${String(h).padStart(2, "0")}:${String(mm).padStart(2, "0")}`);
  }
  return out;
}

/** Validates an incoming slotTime ISO string against open windows + slot grid + capacity rules.
 *  Returns the parsed Date (UTC moment) when valid, or null otherwise. */
export function validateSlot(
  iso: string,
): { date: Date; time: string; ymd: string; capacity: number } | null {
  // Expected format: `YYYY-MM-DDTHH:MM:00+02:00`
  const m = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):00\+02:00$/.exec(iso);
  if (!m) return null;
  const [, y, mo, d, h, min] = m;
  const ymd = `${y}-${mo}-${d}`;
  const time = `${h}:${min}`;
  // Must match a real 45-min slot start in our grid
  if (!slotTimes().includes(time)) return null;
  // weekday check + open-window check
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return null;
  const utc = new Date(Date.UTC(Number(y), Number(mo) - 1, Number(d)));
  const dow = utc.getUTCDay();
  if (dow === 0 || dow === 6) return null;
  let inWindow = false;
  for (const w of OPEN_WINDOWS) {
    if (ymd >= w.from && ymd <= w.to) {
      inWindow = true;
      break;
    }
  }
  if (!inWindow) return null;
  return { date, time, ymd, capacity: capacityForSlot() };
}
