import type { VercelRequest, VercelResponse } from "@vercel/node";
import { z } from "zod";
import { Resend } from "resend";
import { getSql } from "./_lib/db.js";
import { validateSlot } from "./_lib/bookingConfig.js";
import { clinicEmail, patientEmail, type BookingPayload } from "./_lib/emailTemplates.js";
import { buildIcs } from "./_lib/ics.js";

const SERVICE_IDS = [
  "komplexbehandlung",
  "nagelpilzbehandlung",
  "eingewachsener-nagel",
  "warzenbehandlung",
  "nagelspangenbehandlung",
  "hornhaut-entfernen",
  "plasmatherapie",
  "beratung",
] as const;
const INSURANCE = ["kasse_verordnung", "privat"] as const;

const payloadSchema = z.object({
  service: z.enum(SERVICE_IDS),
  insurance: z.enum(INSURANCE),
  isFirstVisit: z.boolean().default(false),
  hasDiabetes: z.boolean().default(false),
  // Exact slot start, ISO with explicit Berlin offset, e.g. "2026-05-20T09:00:00+02:00"
  slotTime: z.string().regex(/^\d{4}-\d{2}-\d{2}T\d{2}:00:00\+02:00$/),
  name: z.string().trim().min(2).max(100),
  phone: z.string().trim().min(6).max(40),
  email: z.string().trim().email().max(200),
  birthDate: z.string().trim().max(20).optional().or(z.literal("")),
  notes: z.string().trim().max(2000).optional().or(z.literal("")),
  consent: z.literal(true),
  lang: z.enum(["de", "en", "ru"]).default("de"),
});

function generateRef(): string {
  const d = new Date();
  const y = String(d.getFullYear()).slice(2);
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `HF-${y}${m}${day}-${rand}`;
}

function ip(req: VercelRequest): string | null {
  const xff = req.headers["x-forwarded-for"];
  if (typeof xff === "string") return xff.split(",")[0]?.trim() ?? null;
  if (Array.isArray(xff)) return xff[0] ?? null;
  return req.socket?.remoteAddress ?? null;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "method_not_allowed" });
  }

  // Honeypot — silently accept then drop.
  const honey = (req.body && typeof req.body === "object" && (req.body as Record<string, unknown>).website) ?? "";
  if (typeof honey === "string" && honey.length > 0) {
    return res.status(200).json({ ok: true, ref: "HF-IGNORED" });
  }

  const parsed = payloadSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      ok: false,
      error: "validation_failed",
      issues: parsed.error.issues,
    });
  }

  const data = parsed.data;
  const slot = validateSlot(data.slotTime);
  if (!slot) {
    return res.status(400).json({ ok: false, error: "slot_invalid" });
  }

  const ref = generateRef();
  const userAgent = String(req.headers["user-agent"] ?? "").slice(0, 400);
  const userIp = ip(req);
  const sql = getSql();

  // 1) Atomic capacity check: insert only if current count < capacity.
  // INSERT...SELECT...WHERE returns 0 rows if no capacity, 1 row otherwise.
  let inserted: { id: number; ref: string }[];
  try {
    inserted = (await sql`
      INSERT INTO bookings (
        ref, service, insurance, is_first_visit, has_diabetes,
        preferred_date, name, phone, email, birth_date, notes, lang, ip, user_agent
      )
      SELECT
        ${ref}, ${data.service}, ${data.insurance}, ${data.isFirstVisit}, ${data.hasDiabetes},
        ${data.slotTime}::timestamptz, ${data.name}, ${data.phone}, ${data.email},
        ${data.birthDate || null}, ${data.notes || null}, ${data.lang}, ${userIp}, ${userAgent}
      WHERE (
        SELECT COUNT(*) FROM bookings
        WHERE preferred_date = ${data.slotTime}::timestamptz
          AND status IN ('new', 'confirmed', 'rescheduled')
      ) < ${slot.capacity}
      RETURNING id, ref
    `) as unknown as { id: number; ref: string }[];
  } catch (e) {
    console.error("[booking] db insert failed", e);
    return res.status(500).json({ ok: false, error: "db_failed" });
  }

  if (inserted.length === 0) {
    return res.status(409).json({ ok: false, error: "slot_taken" });
  }

  // 2) Send emails via Resend (best-effort).
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.BOOKING_FROM ?? "Healthy Feet <muenchen@healthyfeet-podologie.de>";
  const to = process.env.BOOKING_TO ?? "muenchen@healthyfeet-podologie.de";
  const bcc = process.env.BOOKING_BCC ?? "";

  if (apiKey) {
    try {
      const resend = new Resend(apiKey);
      const payload: BookingPayload = { ref, ...data };
      // Site URL for quick-action links — Vercel sets VERCEL_URL automatically; fall back to env or known stable alias.
      const siteUrl =
        process.env.PUBLIC_SITE_URL ??
        (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://healthy-feet-hanna-s-projects-b080b3c8.vercel.app");
      const clinic = clinicEmail(payload, { siteUrl });
      const patient = patientEmail(payload);
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
      const ics = buildIcs({
        uid: ref,
        startIso: data.slotTime,
        summary: `Podologie Healthy Feet — ${SERVICE_LABEL_DE[data.service] ?? data.service}`,
        description: `Termin Ref: ${ref}\\n\\nKontakt: muenchen@healthyfeet-podologie.de\\nTelefon: 0821 349 0642`,
        location: "Baumkirchner Str. 19, 81673 München",
      });
      const icsAttachment = {
        filename: `Healthy-Feet-${ref}.ics`,
        content: Buffer.from(ics, "utf-8").toString("base64"),
      };

      await Promise.all([
        resend.emails.send({
          from,
          to: [to],
          ...(bcc ? { bcc: bcc.split(",").map((s) => s.trim()).filter(Boolean) } : {}),
          replyTo: data.email,
          subject: clinic.subject,
          html: clinic.html,
          text: clinic.text,
        }),
        resend.emails.send({
          from,
          to: [data.email],
          replyTo: to,
          subject: patient.subject,
          html: patient.html,
          text: patient.text,
          attachments: [icsAttachment],
        }),
      ]);

      try {
        await sql`UPDATE bookings SET email_sent_at = NOW() WHERE ref = ${ref}`;
      } catch {
        // non-fatal
      }
    } catch (e) {
      console.error("[booking] resend send failed", e);
    }
  } else {
    console.warn("[booking] RESEND_API_KEY missing — booking saved but no email sent");
  }

  return res.status(200).json({ ok: true, ref });
}
