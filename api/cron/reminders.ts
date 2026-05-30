// Daily cron — sends reminder emails for bookings happening tomorrow.
// Scheduled via vercel.json -> "0 7 * * *" (07:00 UTC ≈ 09:00 Berlin CEST).
// Auth: Vercel automatically calls cron with header "Authorization: Bearer <CRON_SECRET>"
// when CRON_SECRET env var is set. We refuse other callers.

import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";
import { getSql, type DbBookingRow } from "../_lib/db.js";
import { reminderEmail } from "../_lib/reminderTemplate.js";

function authorized(req: VercelRequest): boolean {
  const expected = process.env.CRON_SECRET;
  if (!expected) return false; // hard-fail in production: must be configured
  const got = req.headers.authorization;
  return typeof got === "string" && got === `Bearer ${expected}`;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!authorized(req)) {
    return res.status(401).json({ ok: false, error: "unauthorized" });
  }

  const sql = getSql();
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.BOOKING_FROM ?? "Healthy Feet <muenchen@healthyfeet-podologie.de>";

  // All bookings on tomorrow's Berlin date — independent of slot hour, so afternoon
  // slots aren't missed by a narrow time window.
  type Row = Pick<DbBookingRow, "ref" | "name" | "email" | "service" | "preferred_date" | "lang">;
  const rows = (await sql`
    SELECT ref, name, email, service, preferred_date::text AS preferred_date, lang
    FROM bookings
    WHERE reminder_sent_at IS NULL
      AND status IN ('new', 'confirmed', 'rescheduled')
      AND (preferred_date AT TIME ZONE 'Europe/Berlin')::date
          = ((NOW() AT TIME ZONE 'Europe/Berlin')::date + INTERVAL '1 day')::date
  `) as unknown as Row[];

  if (rows.length === 0) {
    return res.status(200).json({ ok: true, sent: 0, msg: "no due reminders" });
  }

  if (!apiKey) {
    console.warn("[cron/reminders] RESEND_API_KEY missing — skipping send");
    return res.status(200).json({ ok: true, sent: 0, msg: "no api key" });
  }

  const resend = new Resend(apiKey);
  let sent = 0;
  const errors: string[] = [];

  for (const r of rows) {
    try {
      const lang = (["de", "en", "ru"].includes(r.lang) ? r.lang : "de") as "de" | "en" | "ru";
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
      const msg = e instanceof Error ? e.message : String(e);
      console.error(`[cron/reminders] failed for ${r.ref}:`, msg);
      errors.push(`${r.ref}: ${msg}`);
    }
  }

  return res.status(200).json({
    ok: errors.length === 0,
    sent,
    total: rows.length,
    errors: errors.length ? errors : undefined,
  });
}
