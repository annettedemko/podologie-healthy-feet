// Booking-window and capacity configuration. Mirror in api/_lib/bookingConfig.ts.
// All hours in Europe/Berlin local time. Slots are 1h.

export const OPEN_WINDOWS: Array<{ from: string; to: string }> = [
  { from: "2026-06-01", to: "2026-06-27" }, // Mo–Sa inkl. (Sa+So gefiltert)
];

export const WORK_START_HOUR = 9;   // first slot starts 09:00
export const WORK_END_HOUR = 18;    // last slot ENDS 18:00 → last START is 17:00
export const LUNCH_HOUR = 13;       // slot 13:00–14:00
export const SPECIALIST_COUNT = 2;
export const LUNCH_CAPACITY = 1;
export const TZ = "Europe/Berlin";
// CEST offset (May–Oct). Hard-coded since current open windows fall in DST. Update if booking after Oct.
export const BERLIN_OFFSET = "+02:00";

export type SlotInfo = {
  iso: string;       // ISO with offset, exact moment of slot start
  date: string;      // YYYY-MM-DD (Berlin local)
  hour: number;      // 9..17
  capacity: number;  // 1 or 2
  taken: number;     // current bookings count
  available: number; // capacity - taken
};

export function capacityForHour(hour: number): number {
  return hour === LUNCH_HOUR ? LUNCH_CAPACITY : SPECIALIST_COUNT;
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

/** Build the ISO start of a slot: `${date}T${hh}:00:00${BERLIN_OFFSET}`. */
export function slotIso(date: string, hour: number): string {
  return `${date}T${String(hour).padStart(2, "0")}:00:00${BERLIN_OFFSET}`;
}

/** Generate all slots for a single open date. */
export function slotsForDate(date: string): { iso: string; hour: number; capacity: number }[] {
  const out: { iso: string; hour: number; capacity: number }[] = [];
  for (let h = WORK_START_HOUR; h < WORK_END_HOUR; h++) {
    out.push({ iso: slotIso(date, h), hour: h, capacity: capacityForHour(h) });
  }
  return out;
}
