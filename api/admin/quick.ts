// One-click admin actions from clinic notification email.
// URL: /api/admin/quick?ref=HF-XXX&action=confirm|cancel&sig=...
// Auth via HMAC signature in `sig` (no Basic Auth required — token is single-purpose).
// On success: updates DB status, fires confirmation email to patient (for confirm), returns success HTML.

import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";
import { getSql } from "../_lib/db.js";
import { verifyQuickAction } from "../_lib/sign.js";
import { confirmationEmail } from "../_lib/confirmationTemplate.js";
import { buildIcs } from "../_lib/ics.js";

const ALLOWED_ACTIONS = ["confirm", "cancel"] as const;
type Action = (typeof ALLOWED_ACTIONS)[number];

const SERVICE_LABEL_DE: Record<string, string> = {
  komplexbehandlung: "Komplexbehandlung",
  nagelpilzbehandlung: "Nagelpilz-Behandlung",
  "eingewachsener-nagel": "Eingewachsener Nagel",
  warzenbehandlung: "Warzen-Behandlung",
  nagelspangenbehandlung: "Nagelspange",
  "hornhaut-entfernen": "Hornhaut entfernen",
  plasmatherapie: "Plasmatherapie",
  beratung: "Erstberatung",
};

function htmlPage(title: string, body: string, color: string): string {
  return `<!doctype html>
<html lang="de"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>${title}</title>
<style>
  body{margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;background:#f8fafc;color:#0f172a;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:20px;}
  .card{background:#fff;border-radius:16px;padding:36px 30px;text-align:center;max-width:440px;width:100%;box-shadow:0 4px 16px #0000001a;}
  .badge{display:inline-block;padding:8px 18px;border-radius:9999px;background:${color};color:#fff;font-weight:700;font-size:12px;letter-spacing:0.5px;text-transform:uppercase;margin-bottom:16px;}
  h1{font-size:22px;margin:0 0 10px;color:#111827;}
  p{color:#475569;font-size:14px;line-height:1.6;margin:0 0 8px;}
  .ref{font-family:ui-monospace,Menlo,monospace;font-size:12px;color:#94a3b8;margin-top:18px;}
  a{display:inline-block;margin-top:18px;padding:10px 18px;border-radius:9999px;background:#1e6bf5;color:#fff;text-decoration:none;font-weight:600;font-size:13px;}
  a:hover{background:#1856d4;}
</style></head>
<body><div class="card">${body}</div></body></html>`;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).send("method_not_allowed");
  }

  const ref = String(req.query.ref ?? "");
  const action = String(req.query.action ?? "");
  const sig = String(req.query.sig ?? "");

  if (!ref || !ALLOWED_ACTIONS.includes(action as Action) || !sig) {
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    return res.status(400).send(
      htmlPage("Ungültiger Link", `<div class="badge" style="background:#dc2626">⚠ Ungültig</div><h1>Link unvollständig</h1><p>Dieser Link ist fehlerhaft. Öffnen Sie die Buchung über die Admin-Ansicht.</p><a href="/api/admin/bookings">Admin öffnen</a>`, "#dc2626")
    );
  }

  if (!verifyQuickAction(ref, action, sig)) {
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    return res.status(401).send(
      htmlPage("Ungültige Signatur", `<div class="badge" style="background:#dc2626">⚠ Sicherheitsfehler</div><h1>Signatur ungültig</h1><p>Dieser Link wurde manipuliert oder ist abgelaufen.</p><a href="/api/admin/bookings">Admin öffnen</a>`, "#dc2626")
    );
  }

  const sql = getSql();
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.setHeader("Cache-Control", "private, no-store");

  try {
    type Row = {
      ref: string; status: string; service: string;
      insurance: "kasse_verordnung" | "privat";
      preferred_date: string; name: string; email: string; lang: string;
    };
    const rows = (await sql`
      SELECT ref, status, service, insurance, preferred_date::text AS preferred_date,
             name, email, lang
      FROM bookings
      WHERE ref = ${ref}
      LIMIT 1
    `) as unknown as Row[];

    if (rows.length === 0) {
      return res.status(404).send(
        htmlPage("Nicht gefunden", `<div class="badge" style="background:#64748b">Nicht gefunden</div><h1>Buchung existiert nicht</h1><p>Vielleicht wurde sie bereits gelöscht.</p><a href="/api/admin/bookings">Admin öffnen</a>`, "#64748b")
      );
    }

    const b = rows[0];
    const targetStatus = action === "confirm" ? "confirmed" : "cancelled";

    if (b.status === targetStatus) {
      // Idempotent — already in target state
      const label = action === "confirm" ? "bereits bestätigt" : "bereits abgesagt";
      return res.status(200).send(
        htmlPage("Bereits aktualisiert", `<div class="badge" style="background:#94a3b8">ℹ Schon erledigt</div><h1>${label}</h1><p><strong>${b.name}</strong> · ${b.preferred_date.slice(0, 16)}</p><p class="ref">Ref: ${ref}</p><a href="/api/admin/bookings">Admin öffnen</a>`, "#94a3b8")
      );
    }

    await sql`UPDATE bookings SET status = ${targetStatus}, updated_at = NOW() WHERE ref = ${ref}`;

    // Send confirmation email to patient (only for `confirm`, fire-and-forget)
    let emailNote = "";
    if (action === "confirm") {
      const apiKey = process.env.RESEND_API_KEY;
      const from = process.env.BOOKING_FROM ?? "Healthy Feet <muenchen@healthyfeet-podologie.de>";
      if (apiKey) {
        try {
          const resend = new Resend(apiKey);
          const lang = (["de", "en", "ru"].includes(b.lang) ? b.lang : "de") as "de" | "en" | "ru";
          const tpl = confirmationEmail({
            ref: b.ref,
            name: b.name,
            service: b.service,
            insurance: b.insurance,
            slotTime: b.preferred_date,
            lang,
          });
          // Re-issue ICS with confirmed state
          const ics = buildIcs({
            uid: b.ref,
            startIso: b.preferred_date,
            summary: `Podologie Healthy Feet — ${SERVICE_LABEL_DE[b.service] ?? b.service}`,
            description: `Termin BESTÄTIGT · Ref: ${b.ref}\\nKontakt: muenchen@healthyfeet-podologie.de\\nTelefon: 0821 349 0642`,
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
                filename: `Healthy-Feet-${b.ref}.ics`,
                content: Buffer.from(ics, "utf-8").toString("base64"),
              },
            ],
          });
          emailNote = `<p>✉ Bestätigungs-E-Mail an <strong>${b.email}</strong> gesendet.</p>`;
        } catch (e) {
          console.error("[admin/quick] failed to send confirm email:", e);
          emailNote = `<p style="color:#b91c1c">⚠ Buchung wurde bestätigt, aber E-Mail konnte nicht gesendet werden — bitte manuell anrufen.</p>`;
        }
      } else {
        emailNote = `<p style="color:#b91c1c">⚠ RESEND_API_KEY nicht gesetzt — keine E-Mail gesendet.</p>`;
      }
    }

    const successColor = action === "confirm" ? "#10b981" : "#dc2626";
    const successIcon = action === "confirm" ? "✓ BESTÄTIGT" : "✕ ABGESAGT";
    const successTitle = action === "confirm" ? "Termin bestätigt" : "Termin abgesagt";

    return res.status(200).send(
      htmlPage(
        successTitle,
        `<div class="badge" style="background:${successColor}">${successIcon}</div>
         <h1>${successTitle}</h1>
         <p><strong>${b.name}</strong></p>
         <p>${b.preferred_date.slice(0, 16).replace("T", " · ")}</p>
         ${emailNote}
         <p class="ref">Ref: ${ref}</p>
         <a href="/api/admin/bookings">Admin öffnen</a>`,
        successColor
      )
    );
  } catch (e) {
    console.error("[admin/quick] error", e);
    return res.status(500).send(
      htmlPage("Fehler", `<div class="badge" style="background:#dc2626">⚠ Fehler</div><h1>Server-Fehler</h1><p>Bitte versuchen Sie es erneut oder öffnen Sie die Admin-Ansicht.</p><a href="/api/admin/bookings">Admin öffnen</a>`, "#dc2626")
    );
  }
}
