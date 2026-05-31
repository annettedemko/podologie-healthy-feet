// Booking-window and capacity configuration. Mirror in api/_lib/bookingConfig.ts.
// All times in Europe/Berlin local time. Slots are 45 minutes.

export const OPEN_WINDOWS: Array<{ from: string; to: string }> = [
  { from: "2026-06-02", to: "2026-06-27" }, // Mo–Sa inkl. (Sa+So gefiltert)
];

export const WORK_START_HOUR = 9;          // first slot starts 09:00
export const WORK_END_HOUR = 18;           // last slot must END by 18:00
export const SLOT_DURATION_MIN = 45;
export const SPECIALIST_COUNT = 2;
export const TZ = "Europe/Berlin";
// CEST offset (May–Oct). Hard-coded since current open windows fall in DST.
export const BERLIN_OFFSET = "+02:00";

export type SlotInfo = {
  iso: string;       // ISO with offset, exact moment of slot start
  date: string;      // YYYY-MM-DD (Berlin local)
  time: string;      // "HH:MM" Berlin local
  capacity: number;  // patients allowed in parallel
  taken: number;
  available: number;
};

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

/** Iterate weekday dates that fall in any open window (inclusive). */
export function* iterateOpenDates(): Generator<{ ymd: string; year: number; month: number; day: number }> {
  for (const w of OPEN_WINDOWS) {
    const [fy, fm, fd] = w.from.split("-").map(Number);
    const [ty, tm, td] = w.to.split("-").map(Number);
    const start = new Date(Date.UTC(fy, fm - 1, fd));
    const end = new Date(Date.UTC(ty, tm - 1, td));
    for (let d = new Date(start); d.getTime() <= end.getTime(); d.setUTCDate(d.getUTCDate() + 1)) {
      const dow = d.getUTCDay(); // 0=Sun, 6=Sat
      if (dow === 0 || dow === 6) continue;
      const y = d.getUTCFullYear();
      const m = d.getUTCMonth() + 1;
      const day = d.getUTCDate();
      const ymd = `${y}-${String(m).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      yield { ymd, year: y, month: m, day };
    }
  }
}

/** All open YYYY-MM-DD strings, sorted. */
export function openDates(): string[] {
  return Array.from(iterateOpenDates()).map((d) => d.ymd);
}

/** Build the ISO start of a slot: `${date}T${HH:MM}:00${BERLIN_OFFSET}`. */
export function slotIso(date: string, time: string): string {
  return `${date}T${time}:00${BERLIN_OFFSET}`;
}

/** Generate all slots for a single open date. */
export function slotsForDate(date: string): { iso: string; time: string; capacity: number }[] {
  return slotTimes().map((time) => ({
    iso: slotIso(date, time),
    time,
    capacity: capacityForSlot(),
  }));
}
