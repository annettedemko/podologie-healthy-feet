// Mirror of src/lib/booking/config.ts — kept identical so backend & frontend agree.

export const OPEN_WINDOWS: Array<{ from: string; to: string }> = [
  { from: "2026-05-20", to: "2026-05-24" },
  { from: "2026-06-01", to: "2026-06-27" },
];

export const WORK_START_HOUR = 9;
export const WORK_END_HOUR = 18;
export const LUNCH_HOUR = 13;
export const SPECIALIST_COUNT = 2;
export const LUNCH_CAPACITY = 1;
export const BERLIN_OFFSET = "+02:00";

export function capacityForHour(hour: number): number {
  return hour === LUNCH_HOUR ? LUNCH_CAPACITY : SPECIALIST_COUNT;
}

/** Validates an incoming slotTime ISO string against open windows + work hours + capacity rules.
 *  Returns the parsed Date (UTC moment) when valid, or null otherwise. */
export function validateSlot(iso: string): { date: Date; hour: number; ymd: string; capacity: number } | null {
  // Expected format: `YYYY-MM-DDT09:00:00+02:00`
  const m = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):00:00\+02:00$/.exec(iso);
  if (!m) return null;
  const [, y, mo, d, h] = m;
  const ymd = `${y}-${mo}-${d}`;
  const hour = Number(h);
  if (hour < WORK_START_HOUR || hour >= WORK_END_HOUR) return null;
  // weekday check + open-window check
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return null;
  // Weekday check via UTC date construction to avoid local TZ surprises
  const utc = new Date(Date.UTC(Number(y), Number(mo) - 1, Number(d)));
  const dow = utc.getUTCDay();
  if (dow === 0 || dow === 6) return null;
  // Open windows
  let inWindow = false;
  for (const w of OPEN_WINDOWS) {
    if (ymd >= w.from && ymd <= w.to) {
      inWindow = true;
      break;
    }
  }
  if (!inWindow) return null;
  return { date, hour, ymd, capacity: capacityForHour(hour) };
}
