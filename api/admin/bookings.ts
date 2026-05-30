import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";
import { getSql, type DbBookingRow } from "../_lib/db.js";
import { confirmationEmail } from "../_lib/confirmationTemplate.js";
import { rescheduleEmail } from "../_lib/rescheduleTemplate.js";
import { buildIcs } from "../_lib/ics.js";
import { BERLIN_OFFSET } from "../_lib/bookingConfig.js";

const STATUSES = ["new", "confirmed", "cancelled", "rescheduled"] as const;
type Status = (typeof STATUSES)[number];

function checkAuth(req: VercelRequest): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false; // refuse access if not configured
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Basic ")) return false;
  try {
    const decoded = Buffer.from(header.slice(6), "base64").toString("utf-8");
    const idx = decoded.indexOf(":");
    if (idx < 0) return false;
    const password = decoded.slice(idx + 1);
    // constant-time compare
    if (password.length !== expected.length) return false;
    let diff = 0;
    for (let i = 0; i < password.length; i++) {
      diff |= password.charCodeAt(i) ^ expected.charCodeAt(i);
    }
    return diff === 0;
  } catch {
    return false;
  }
}

function escape(s: unknown): string {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Format a stored timestamp as a `datetime-local` input value in Berlin time: "2026-05-21T14:00". */
function toLocalInput(iso: string): string {
  const parts = new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Europe/Berlin",
  }).formatToParts(new Date(iso));
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  return `${get("year")}-${get("month")}-${get("day")}T${get("hour")}:${get("minute")}`;
}

const SERVICE_LABELS: Record<string, string> = {
  komplexbehandlung: "Komplexbehandlung",
  nagelpilzbehandlung: "Nagelpilz",
  "eingewachsener-nagel": "Eingewachsen",
  warzenbehandlung: "Warze",
  nagelspangenbehandlung: "Spange",
  "hornhaut-entfernen": "Hornhaut",
  plasmatherapie: "Plasma",
  beratung: "Beratung",
};

const STATUS_COLORS: Record<string, string> = {
  new: "background:#fef3c7;color:#92400e",
  confirmed: "background:#d1fae5;color:#065f46",
  cancelled: "background:#fee2e2;color:#991b1b",
  rescheduled: "background:#dbeafe;color:#1e40af",
};

function renderPage(rows: DbBookingRow[], filter: Status | "all"): string {
  const counts = rows.reduce<Record<string, number>>((acc, r) => {
    acc[r.status] = (acc[r.status] ?? 0) + 1;
    return acc;
  }, {});

  const filtered = filter === "all" ? rows : rows.filter((r) => r.status === filter);

  return `<!doctype html>
<html lang="de"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>Healthy Feet · Buchungen</title>
<style>
  *{box-sizing:border-box}
  body{margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;background:#f8fafc;color:#0f172a}
  .wrap{max-width:1200px;margin:0 auto;padding:24px}
  header{display:flex;align-items:center;justify-content:space-between;margin-bottom:24px}
  h1{margin:0;font-size:22px;font-weight:700;color:#1e6bf5}
  .filters{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:16px}
  .filters a{padding:6px 14px;border-radius:9999px;background:#fff;color:#475569;text-decoration:none;border:1px solid #e2e8f0;font-size:13px;font-weight:500}
  .filters a.active{background:#1e6bf5;color:#fff;border-color:#1e6bf5}
  .filters a .badge{margin-left:6px;padding:1px 6px;border-radius:9999px;background:#0001;font-size:11px}
  .filters a.active .badge{background:#fff3}
  table{width:100%;border-collapse:collapse;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px #0000000a}
  th{text-align:left;padding:10px 12px;background:#f1f5f9;font-size:11px;text-transform:uppercase;letter-spacing:0.5px;color:#64748b;border-bottom:1px solid #e2e8f0}
  td{padding:12px;border-bottom:1px solid #f1f5f9;font-size:13px;vertical-align:top}
  tr:last-child td{border-bottom:none}
  .ref{font-family:ui-monospace,Menlo,monospace;font-size:11px;color:#64748b}
  .name{font-weight:600;color:#0f172a}
  .pill{display:inline-block;padding:2px 8px;border-radius:9999px;font-size:11px;font-weight:600}
  .actions{display:flex;gap:4px;flex-wrap:wrap}
  .actions button{padding:4px 10px;border-radius:6px;border:1px solid #cbd5e1;background:#fff;color:#334155;font-size:11px;cursor:pointer;font-weight:500}
  .actions button:hover{background:#f1f5f9}
  .actions button.confirm{border-color:#10b981;color:#047857}
  .actions button.cancel{border-color:#ef4444;color:#b91c1c}
  .resched-form{display:flex;gap:4px;align-items:center;margin-top:6px;padding-top:6px;border-top:1px dashed #e2e8f0}
  .resched-form input{font-size:11px;padding:3px 5px;border:1px solid #cbd5e1;border-radius:6px;font-family:inherit;color:#334155}
  .resched-form button{padding:4px 10px;border-radius:6px;border:1px solid #3b82f6;background:#fff;color:#1e40af;font-size:11px;cursor:pointer;font-weight:600;white-space:nowrap}
  .resched-form button:hover{background:#3b82f6;color:#fff}
  .empty{text-align:center;padding:60px 20px;color:#64748b}
  .small{font-size:11px;color:#64748b}
  a{color:#1e6bf5;text-decoration:none}
  a:hover{text-decoration:underline}
  .notes{font-size:12px;color:#475569;margin-top:4px;font-style:italic;max-width:240px;white-space:pre-wrap}
  .flag{display:inline-block;padding:1px 6px;border-radius:4px;background:#fef3c7;color:#92400e;font-size:10px;font-weight:600;margin-right:3px}
  .flag.diabetes{background:#fce7f3;color:#9d174d}
</style></head>
<body><div class="wrap">
<header>
  <h1>🦶 Healthy Feet · Buchungen</h1>
  <div style="display:flex;gap:6px;align-items:center;flex-wrap:wrap;">
    <a href="/api/admin/bookings" style="padding:6px 14px;border-radius:9999px;background:#1e6bf5;color:#fff;text-decoration:none;border:1px solid #1e6bf5;font-size:13px;font-weight:500;">Liste</a>
    <a href="/api/admin/calendar" style="padding:6px 14px;border-radius:9999px;background:#fff;color:#475569;text-decoration:none;border:1px solid #e2e8f0;font-size:13px;font-weight:500;">Kalender</a>
    <a href="/api/admin/reminders" style="padding:6px 14px;border-radius:9999px;background:#fff;color:#475569;text-decoration:none;border:1px solid #e2e8f0;font-size:13px;font-weight:500;">✉️ Erinnerungen</a>
    <a href="/de/" target="_blank" rel="noopener" style="padding:6px 14px;border-radius:9999px;background:#fff;color:#475569;text-decoration:none;border:1px solid #e2e8f0;font-size:13px;font-weight:500;">🌐 Website ↗</a>
    <span class="small" style="margin-left:8px;">${rows.length} gesamt</span>
  </div>
</header>

<div class="filters">
  <a href="?status=all" class="${filter === "all" ? "active" : ""}">Alle <span class="badge">${rows.length}</span></a>
  <a href="?status=new" class="${filter === "new" ? "active" : ""}">Neu <span class="badge">${counts.new ?? 0}</span></a>
  <a href="?status=confirmed" class="${filter === "confirmed" ? "active" : ""}">Bestätigt <span class="badge">${counts.confirmed ?? 0}</span></a>
  <a href="?status=rescheduled" class="${filter === "rescheduled" ? "active" : ""}">Verschoben <span class="badge">${counts.rescheduled ?? 0}</span></a>
  <a href="?status=cancelled" class="${filter === "cancelled" ? "active" : ""}">Abgesagt <span class="badge">${counts.cancelled ?? 0}</span></a>
</div>

${filtered.length === 0 ? '<div class="empty">Keine Anfragen in dieser Kategorie.</div>' : ""}
${filtered.length > 0 ? `<table>
  <thead><tr>
    <th>Eingegangen</th>
    <th>Status</th>
    <th>Patient</th>
    <th>Anliegen</th>
    <th>Wunschtermin</th>
    <th>Aktionen</th>
  </tr></thead>
  <tbody>
${filtered
  .map((r) => {
    const created = new Date(r.created_at).toLocaleString("de-DE", { dateStyle: "short", timeStyle: "short" });
    const slotDate = new Date(r.preferred_date).toLocaleDateString("de-DE", { weekday: "short", day: "2-digit", month: "short", year: "2-digit", timeZone: "Europe/Berlin" });
    const slotTime = new Date(r.preferred_date).toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit", timeZone: "Europe/Berlin" });
    return `<tr>
      <td>
        <div>${escape(created)}</div>
        <div class="ref">${escape(r.ref)}</div>
        <div class="small">${escape(r.lang.toUpperCase())}${r.email_sent_at ? " · ✉" : ""}</div>
      </td>
      <td><span class="pill" style="${STATUS_COLORS[r.status] ?? ""}">${escape(r.status)}</span></td>
      <td>
        <div class="name">${escape(r.name)}</div>
        <div><a href="tel:${escape(r.phone)}">${escape(r.phone)}</a></div>
        <div><a href="mailto:${escape(r.email)}">${escape(r.email)}</a></div>
        ${r.birth_date ? `<div class="small">geb. ${escape(r.birth_date)}</div>` : ""}
        <div style="margin-top:4px">
          ${r.is_first_visit ? '<span class="flag">Erstpatient</span>' : ""}
          ${r.has_diabetes ? '<span class="flag diabetes">Diabetiker</span>' : ""}
        </div>
      </td>
      <td>
        <div><strong>${escape(SERVICE_LABELS[r.service] ?? r.service)}</strong></div>
        <div class="small">${r.insurance === "kasse_verordnung" ? "✓ Verordnung (0 €)" : "Privat"}</div>
        ${r.notes ? `<div class="notes">${escape(r.notes)}</div>` : ""}
      </td>
      <td>
        <div><strong>${escape(slotTime)}</strong></div>
        <div class="small">${escape(slotDate)}</div>
      </td>
      <td>
        <form method="POST" class="actions">
          <input type="hidden" name="ref" value="${escape(r.ref)}"/>
          ${r.status !== "confirmed" ? `<button class="confirm" name="status" value="confirmed">✓ Bestätigt</button>` : ""}
          ${r.status !== "rescheduled" ? `<button name="status" value="rescheduled">↻ Verschoben</button>` : ""}
          ${r.status !== "cancelled" ? `<button class="cancel" name="status" value="cancelled">✕ Abgesagt</button>` : ""}
          ${r.status !== "new" ? `<button name="status" value="new">↺ Neu</button>` : ""}
        </form>
        <form method="POST" class="resched-form" title="Neuen Termin setzen — Patient erhält automatisch eine E-Mail">
          <input type="hidden" name="ref" value="${escape(r.ref)}"/>
          <input type="datetime-local" name="new_slot" value="${escape(toLocalInput(r.preferred_date))}" required/>
          <button type="submit">↻ Verschieben</button>
        </form>
      </td>
    </tr>`;
  })
  .join("")}
  </tbody>
</table>` : ""}

</div></body></html>`;
}

const RESCHED_RE = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/;

/** Move a booking to a new date/time (works regardless of current status, including
 *  already-confirmed bookings), set status to "rescheduled", and email the patient. */
async function rescheduleBooking(
  sql: ReturnType<typeof getSql>,
  ref: string,
  newSlotLocal: string,
): Promise<void> {
  if (!RESCHED_RE.test(newSlotLocal)) return;
  const iso = `${newSlotLocal}:00${BERLIN_OFFSET}`;
  if (Number.isNaN(new Date(iso).getTime())) return;

  type Row = { service: string; name: string; email: string; lang: string };
  const rows = (await sql`
    SELECT service, name, email, lang FROM bookings WHERE ref = ${ref} LIMIT 1
  `) as unknown as Row[];
  if (rows.length === 0) return;
  const b = rows[0];

  await sql`
    UPDATE bookings
    SET preferred_date = ${iso}::timestamptz, status = 'rescheduled', updated_at = NOW()
    WHERE ref = ${ref}
  `;

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("[admin/bookings] reschedule saved but RESEND_API_KEY missing — no email sent");
    return;
  }
  try {
    const resend = new Resend(apiKey);
    const from = process.env.BOOKING_FROM ?? "Healthy Feet <muenchen@healthyfeet-podologie.de>";
    const lang = (["de", "en", "ru"].includes(b.lang) ? b.lang : "de") as "de" | "en" | "ru";
    const tpl = rescheduleEmail({ ref, name: b.name, service: b.service, slotTime: iso, lang });
    const ics = buildIcs({
      uid: ref,
      startIso: iso,
      summary: `Podologie Healthy Feet — ${SERVICE_LABELS[b.service] ?? b.service}`,
      description: `Termin VERSCHOBEN · Ref: ${ref}\\nKontakt: muenchen@healthyfeet-podologie.de\\nTelefon: 0821 349 0642`,
      location: "Baumkirchner Str. 19, 81673 München",
    });
    await resend.emails.send({
      from,
      to: [b.email],
      subject: tpl.subject,
      html: tpl.html,
      text: tpl.text,
      attachments: [
        {
          filename: `Healthy-Feet-${ref}.ics`,
          content: Buffer.from(ics, "utf-8").toString("base64"),
        },
      ],
    });
  } catch (e) {
    console.error("[admin/bookings] reschedule email failed:", e);
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!checkAuth(req)) {
    res.setHeader("WWW-Authenticate", 'Basic realm="Healthy Feet Admin", charset="UTF-8"');
    return res.status(401).send("Authentication required");
  }

  const sql = getSql();

  try {
    if (req.method === "POST") {
      // Form-encoded body
      const body = req.body as Record<string, string>;
      const ref = String(body.ref ?? "");
      const newSlot = String(body.new_slot ?? "").trim();
      const status = String(body.status ?? "");

      if (ref && newSlot) {
        // Reschedule: change date/time + notify patient. Allowed even after confirmation.
        await rescheduleBooking(sql, ref, newSlot);
      } else if (ref && (STATUSES as readonly string[]).includes(status)) {
        // Look up current state so we only fire confirmation email when status changes to confirmed
        type CurrentRow = {
          status: string;
          service: string;
          insurance: "kasse_verordnung" | "privat";
          preferred_date: string;
          name: string;
          email: string;
          lang: string;
        };
        const before = (await sql`
          SELECT status, service, insurance, preferred_date::text AS preferred_date,
                 name, email, lang
          FROM bookings WHERE ref = ${ref} LIMIT 1
        `) as unknown as CurrentRow[];

        await sql`UPDATE bookings SET status = ${status}, updated_at = NOW() WHERE ref = ${ref}`;

        if (before.length > 0 && before[0].status !== "confirmed" && status === "confirmed") {
          const b = before[0];
          const apiKey = process.env.RESEND_API_KEY;
          const from = process.env.BOOKING_FROM ?? "Healthy Feet <muenchen@healthyfeet-podologie.de>";
          if (apiKey) {
            try {
              const resend = new Resend(apiKey);
              const lang = (["de", "en", "ru"].includes(b.lang) ? b.lang : "de") as "de" | "en" | "ru";
              const tpl = confirmationEmail({
                ref,
                name: b.name,
                service: b.service,
                insurance: b.insurance,
                slotTime: b.preferred_date,
                lang,
              });
              const ics = buildIcs({
                uid: ref,
                startIso: b.preferred_date,
                summary: `Podologie Healthy Feet — ${b.service}`,
                description: `Termin BESTÄTIGT · Ref: ${ref}\\nKontakt: muenchen@healthyfeet-podologie.de\\nTelefon: 0821 349 0642`,
                location: "Baumkirchner Str. 19, 81673 München",
              });
              await resend.emails.send({
                from,
                to: [b.email],
                subject: tpl.subject,
                html: tpl.html,
                text: tpl.text,
                attachments: [
                  {
                    filename: `Healthy-Feet-${ref}.ics`,
                    content: Buffer.from(ics, "utf-8").toString("base64"),
                  },
                ],
              });
            } catch (e) {
              console.error("[admin/bookings] confirmation email failed:", e);
            }
          }
        }
      }
      // Redirect back so refresh doesn't re-submit
      const referer = (req.headers.referer as string | undefined) ?? "/api/admin/bookings";
      res.setHeader("Location", referer);
      return res.status(303).end();
    }

    if (req.method !== "GET") {
      res.setHeader("Allow", "GET, POST");
      return res.status(405).send("method_not_allowed");
    }

    const filterRaw = (req.query.status as string | undefined) ?? "all";
    const filter: Status | "all" = (STATUSES as readonly string[]).includes(filterRaw)
      ? (filterRaw as Status)
      : "all";

    const rows = (await sql`
      SELECT id, ref, status, service, insurance, is_first_visit, has_diabetes,
             preferred_date, time_slot, flexibility, name, phone, email,
             birth_date, notes, lang, ip, user_agent, email_sent_at, created_at, updated_at
      FROM bookings
      ORDER BY created_at DESC
      LIMIT 500
    `) as unknown as DbBookingRow[];

    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.setHeader("Cache-Control", "private, no-store");
    return res.status(200).send(renderPage(rows, filter));
  } catch (e) {
    console.error("[admin] error", e);
    return res.status(500).send("server_error");
  }
}
