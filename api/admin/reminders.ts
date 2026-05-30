// Manual reminder dispatch — pick a date, preview the bookings, send reminder emails.
// Auth: Basic with ADMIN_PASSWORD (matches api/admin/bookings.ts).

import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";
import { getSql, type DbBookingRow } from "../_lib/db.js";
import { reminderEmail } from "../_lib/reminderTemplate.js";

function checkAuth(req: VercelRequest): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Basic ")) return false;
  try {
    const decoded = Buffer.from(header.slice(6), "base64").toString("utf-8");
    const idx = decoded.indexOf(":");
    if (idx < 0) return false;
    const password = decoded.slice(idx + 1);
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

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

type Row = Pick<
  DbBookingRow,
  "ref" | "name" | "email" | "service" | "preferred_date" | "lang" | "status" | "reminder_sent_at"
>;

async function loadBookingsForDate(
  sql: ReturnType<typeof getSql>,
  ymd: string,
): Promise<Row[]> {
  return (await sql`
    SELECT ref, name, email, service, preferred_date::text AS preferred_date,
           lang, status, reminder_sent_at
    FROM bookings
    WHERE status IN ('new', 'confirmed', 'rescheduled')
      AND (preferred_date AT TIME ZONE 'Europe/Berlin')::date = ${ymd}::date
    ORDER BY preferred_date ASC
  `) as unknown as Row[];
}

function renderPage(opts: {
  date: string;
  rows: Row[];
  sent?: number;
  total?: number;
  error?: string;
}): string {
  const { date, rows, sent, total, error } = opts;
  const counts = {
    pending: rows.filter((r) => !r.reminder_sent_at).length,
    already: rows.filter((r) => !!r.reminder_sent_at).length,
  };
  const banner =
    typeof sent === "number"
      ? `<div class="banner success">✓ ${sent} von ${total} Erinnerungen versendet.</div>`
      : error
      ? `<div class="banner err">⚠ ${escape(error)}</div>`
      : "";

  return `<!doctype html>
<html lang="de"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>Healthy Feet · Erinnerungen</title>
<style>
  *{box-sizing:border-box}
  body{margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;background:#f8fafc;color:#0f172a}
  .wrap{max-width:1000px;margin:0 auto;padding:24px}
  header{display:flex;align-items:center;justify-content:space-between;margin-bottom:24px;flex-wrap:wrap;gap:12px}
  h1{margin:0;font-size:22px;font-weight:700;color:#1e6bf5}
  .views a{padding:6px 14px;border-radius:9999px;background:#fff;color:#475569;text-decoration:none;border:1px solid #e2e8f0;font-size:13px;font-weight:500;margin-left:6px}
  .views a.active{background:#1e6bf5;color:#fff;border-color:#1e6bf5}
  .card{background:#fff;border-radius:12px;padding:20px;box-shadow:0 1px 3px #0000000a;margin-bottom:16px}
  .picker{display:flex;gap:10px;align-items:flex-end;flex-wrap:wrap}
  .picker label{display:flex;flex-direction:column;gap:4px;font-size:12px;color:#64748b;font-weight:500}
  .picker input[type=date]{padding:8px 12px;border:1px solid #cbd5e1;border-radius:8px;font-size:14px;font-family:inherit}
  .picker button{padding:9px 18px;border-radius:8px;border:1px solid #1e6bf5;background:#1e6bf5;color:#fff;font-size:14px;font-weight:600;cursor:pointer}
  .picker button:hover{background:#1855c4}
  .picker button.secondary{background:#fff;color:#1e6bf5}
  .picker button.send{background:#10b981;border-color:#10b981}
  .picker button.send:hover{background:#059669}
  .hint{font-size:12px;color:#64748b;margin-top:8px;line-height:1.5}
  table{width:100%;border-collapse:collapse}
  th{text-align:left;padding:10px 12px;background:#f1f5f9;font-size:11px;text-transform:uppercase;letter-spacing:0.5px;color:#64748b;border-bottom:1px solid #e2e8f0}
  td{padding:12px;border-bottom:1px solid #f1f5f9;font-size:13px;vertical-align:top}
  tr:last-child td{border-bottom:none}
  .ref{font-family:ui-monospace,Menlo,monospace;font-size:11px;color:#64748b}
  .name{font-weight:600}
  .pill{display:inline-block;padding:2px 8px;border-radius:9999px;font-size:11px;font-weight:600}
  .pill.sent{background:#d1fae5;color:#065f46}
  .pill.new{background:#fef3c7;color:#92400e}
  .empty{text-align:center;padding:40px 20px;color:#64748b}
  .banner{padding:12px 16px;border-radius:8px;margin-bottom:16px;font-size:14px;font-weight:500}
  .banner.success{background:#d1fae5;color:#065f46;border:1px solid #10b981}
  .banner.err{background:#fee2e2;color:#991b1b;border:1px solid #ef4444}
  .summary{display:flex;gap:14px;font-size:13px;color:#475569;margin-top:8px}
  .summary strong{color:#0f172a}
</style></head>
<body><div class="wrap">
<header>
  <h1>✉️ Healthy Feet · Erinnerungen</h1>
  <div class="views">
    <a href="/api/admin/bookings">Liste</a>
    <a href="/api/admin/calendar">Kalender</a>
    <a href="/api/admin/reminders" class="active">Erinnerungen</a>
  </div>
</header>

${banner}

<div class="card">
  <form method="GET" class="picker">
    <label>Datum
      <input type="date" name="date" value="${escape(date)}" required/>
    </label>
    <button type="submit" class="secondary">Vorschau</button>
  </form>
  <div class="hint">
    Wählen Sie das Termindatum, für das Sie Erinnerungen versenden möchten.<br>
    💡 Die E-Mail-Vorlage sagt „morgen / tomorrow / завтра" — am besten am <strong>Tag vor dem Termin</strong> versenden.
  </div>
</div>

<div class="card">
  ${rows.length === 0
    ? `<div class="empty">Keine aktiven Termine am ${escape(date)}.</div>`
    : `<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;flex-wrap:wrap;gap:12px">
        <div>
          <div style="font-weight:600;font-size:15px;">${rows.length} Termin(e) am ${escape(date)}</div>
          <div class="summary">
            <span><strong>${counts.pending}</strong> noch nicht erinnert</span>
            <span><strong>${counts.already}</strong> bereits erinnert</span>
          </div>
        </div>
        <form method="POST" class="picker" onsubmit="return confirm('Erinnerungen an alle ${rows.length} Patient(en) senden?\\n(Auch an bereits erinnerte — diese erhalten die Mail erneut.)');">
          <input type="hidden" name="date" value="${escape(date)}"/>
          <button type="submit" class="send">✉️ Erinnerungen senden (${rows.length})</button>
        </form>
      </div>
      <table>
        <thead><tr>
          <th>Zeit</th>
          <th>Patient</th>
          <th>Anliegen</th>
          <th>Status</th>
        </tr></thead>
        <tbody>
        ${rows
          .map((r) => {
            const t = new Date(r.preferred_date).toLocaleTimeString("de-DE", {
              hour: "2-digit",
              minute: "2-digit",
              timeZone: "Europe/Berlin",
            });
            return `<tr>
              <td><strong>${escape(t)}</strong></td>
              <td>
                <div class="name">${escape(r.name)}</div>
                <div class="ref">${escape(r.email)}</div>
                <div class="ref">${escape(r.ref)} · ${escape(r.lang.toUpperCase())}</div>
              </td>
              <td>${escape(r.service)}</td>
              <td>
                ${r.reminder_sent_at
                  ? `<span class="pill sent">✓ erinnert</span>`
                  : `<span class="pill new">offen</span>`}
              </td>
            </tr>`;
          })
          .join("")}
        </tbody>
      </table>`}
</div>

</div></body></html>`;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!checkAuth(req)) {
    res.setHeader("WWW-Authenticate", 'Basic realm="Healthy Feet Admin", charset="UTF-8"');
    return res.status(401).send("Authentication required");
  }

  const sql = getSql();

  try {
    if (req.method === "POST") {
      const body = req.body as Record<string, string>;
      const date = String(body.date ?? "").trim();
      if (!DATE_RE.test(date)) {
        res.setHeader("Location", "/api/admin/reminders");
        return res.status(303).end();
      }

      const rows = await loadBookingsForDate(sql, date);
      const apiKey = process.env.RESEND_API_KEY;
      const from =
        process.env.BOOKING_FROM ?? "Healthy Feet <muenchen@healthyfeet-podologie.de>";

      if (!apiKey) {
        res.setHeader("Location", `/api/admin/reminders?date=${date}&error=no_api_key`);
        return res.status(303).end();
      }

      const resend = new Resend(apiKey);
      let sent = 0;
      for (const r of rows) {
        try {
          const lang = (["de", "en", "ru"].includes(r.lang) ? r.lang : "de") as
            | "de"
            | "en"
            | "ru";
          const tpl = reminderEmail({
            ref: r.ref,
            name: r.name,
            service: r.service,
            slotTime: r.preferred_date,
            lang,
          });
          await resend.emails.send({
            from,
            to: [r.email],
            subject: tpl.subject,
            html: tpl.html,
            text: tpl.text,
          });
          await sql`UPDATE bookings SET reminder_sent_at = NOW() WHERE ref = ${r.ref}`;
          sent++;
        } catch (e) {
          console.error(`[admin/reminders] failed for ${r.ref}:`, e);
        }
      }

      res.setHeader(
        "Location",
        `/api/admin/reminders?date=${date}&sent=${sent}&total=${rows.length}`,
      );
      return res.status(303).end();
    }

    if (req.method !== "GET") {
      res.setHeader("Allow", "GET, POST");
      return res.status(405).send("method_not_allowed");
    }

    const dateQ = String(req.query.date ?? "").trim();
    const todayBerlin = new Date().toLocaleDateString("en-CA", {
      timeZone: "Europe/Berlin",
    });
    const date = DATE_RE.test(dateQ) ? dateQ : todayBerlin;

    const rows = await loadBookingsForDate(sql, date);
    const sentQ = req.query.sent ? Number(req.query.sent) : undefined;
    const totalQ = req.query.total ? Number(req.query.total) : undefined;
    const errorQ = req.query.error ? String(req.query.error) : undefined;
    const errorMsg = errorQ === "no_api_key" ? "RESEND_API_KEY ist nicht konfiguriert." : errorQ;

    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.setHeader("Cache-Control", "private, no-store");
    return res
      .status(200)
      .send(renderPage({ date, rows, sent: sentQ, total: totalQ, error: errorMsg }));
  } catch (e) {
    console.error("[admin/reminders] error", e);
    return res.status(500).send("server_error");
  }
}
