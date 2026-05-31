// Build a single-event .ics file (RFC 5545) and a Google-Calendar add-to-calendar URL.

interface IcsInput {
  uid: string;          // unique event id (use booking ref)
  startIso: string;     // ISO with offset, e.g. "2026-05-20T09:00:00+02:00"
  durationMin?: number; // default 60
  summary: string;
  description: string;
  location: string;
}

function pad2(n: number): string {
  return String(n).padStart(2, "0");
}

/** Format a Date as a UTC ICS timestamp: 20260520T070000Z */
function utcStamp(d: Date): string {
  return (
    d.getUTCFullYear() +
    pad2(d.getUTCMonth() + 1) +
    pad2(d.getUTCDate()) +
    "T" +
    pad2(d.getUTCHours()) +
    pad2(d.getUTCMinutes()) +
    pad2(d.getUTCSeconds()) +
    "Z"
  );
}

function escapeIcs(text: string): string {
  return text
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");
}

/** Fold long lines per RFC 5545 (max 75 octets — simple char-based heuristic). */
function fold(line: string): string {
  if (line.length <= 75) return line;
  const out: string[] = [];
  let s = line;
  while (s.length > 75) {
    out.push(s.slice(0, 75));
    s = s.slice(75);
  }
  out.push(s);
  return out.join("\r\n ");
}

export function buildIcs(input: IcsInput): string {
  const start = new Date(input.startIso);
  const end = new Date(start.getTime() + (input.durationMin ?? 45) * 60_000);
  const now = new Date();
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Healthy Feet//Booking//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    fold(`UID:${input.uid}@healthyfeet-podologie.de`),
    `DTSTAMP:${utcStamp(now)}`,
    `DTSTART:${utcStamp(start)}`,
    `DTEND:${utcStamp(end)}`,
    fold(`SUMMARY:${escapeIcs(input.summary)}`),
    fold(`DESCRIPTION:${escapeIcs(input.description)}`),
    fold(`LOCATION:${escapeIcs(input.location)}`),
    "STATUS:CONFIRMED",
    "BEGIN:VALARM",
    "ACTION:DISPLAY",
    "TRIGGER:-PT1H",
    "DESCRIPTION:Termin Erinnerung",
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ];
  return lines.join("\r\n") + "\r\n";
}

/** Google Calendar "Add Event" URL (works in any browser, opens prefilled event). */
export function googleCalendarUrl(input: IcsInput): string {
  const start = new Date(input.startIso);
  const end = new Date(start.getTime() + (input.durationMin ?? 45) * 60_000);
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: input.summary,
    dates: `${utcStamp(start)}/${utcStamp(end)}`,
    details: input.description,
    location: input.location,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
