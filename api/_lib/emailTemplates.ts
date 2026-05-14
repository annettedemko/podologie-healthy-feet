// Email rendering helpers — plain HTML strings + plain-text fallback.
// No external template engine — small, dependency-free, easy to tweak.

import { googleCalendarUrl } from "./ics.js";
import { signQuickAction } from "./sign.js";

type Lang = "de" | "en" | "ru";

export interface BookingPayload {
  ref: string;
  service: string;
  insurance: "kasse_verordnung" | "privat";
  isFirstVisit: boolean;
  hasDiabetes: boolean;
  /** Exact slot start, ISO with Berlin offset, e.g. "2026-05-20T09:00:00+02:00" */
  slotTime: string;
  name: string;
  phone: string;
  email: string;
  birthDate?: string;
  notes?: string;
  lang: Lang;
}

const SERVICE_NAMES: Record<string, Record<Lang, string>> = {
  komplexbehandlung: {
    de: "Podologische Komplexbehandlung",
    en: "Podiatric Complex Treatment",
    ru: "Подологическое комплексное лечение",
  },
  nagelpilzbehandlung: {
    de: "Nagelpilzbehandlung",
    en: "Nail Fungus Treatment",
    ru: "Лечение грибка ногтей",
  },
  "eingewachsener-nagel": {
    de: "Eingewachsener Nagel",
    en: "Ingrown Nail",
    ru: "Вросший ноготь",
  },
  warzenbehandlung: {
    de: "Warzenbehandlung",
    en: "Wart Treatment",
    ru: "Лечение бородавок",
  },
  nagelspangenbehandlung: {
    de: "Nagelspangenbehandlung",
    en: "Nail Brace Treatment",
    ru: "Лечение ногтевыми скобами",
  },
  "hornhaut-entfernen": {
    de: "Hornhaut entfernen",
    en: "Callus Removal",
    ru: "Удаление мозолей",
  },
  plasmatherapie: {
    de: "Plasmatherapie",
    en: "Plasma Therapy",
    ru: "Плазмотерапия",
  },
  beratung: {
    de: "Erstberatung",
    en: "Initial consultation",
    ru: "Первичная консультация",
  },
};

const INS_NAMES: Record<string, Record<Lang, string>> = {
  kasse_verordnung: {
    de: "Mit Heilmittelverordnung (Kasse)",
    en: "With prescription (statutory insurance)",
    ru: "С направлением (касса)",
  },
  privat: {
    de: "Privatzahler / Selbstzahler",
    en: "Private / Self-pay",
    ru: "Частный / Самооплата",
  },
};

function fmtDate(iso: string, lang: Lang): string {
  const map: Record<Lang, string> = { de: "de-DE", en: "en-GB", ru: "ru-RU" };
  return new Intl.DateTimeFormat(map[lang], {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "2-digit",
    timeZone: "Europe/Berlin",
  }).format(new Date(iso));
}

function fmtTime(iso: string, lang: Lang): string {
  const map: Record<Lang, string> = { de: "de-DE", en: "en-GB", ru: "ru-RU" };
  return new Intl.DateTimeFormat(map[lang], {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Berlin",
  }).format(new Date(iso));
}

function fmtDateTime(iso: string, lang: Lang): string {
  return `${fmtDate(iso, lang)} · ${fmtTime(iso, lang)}`;
}

function escape(s: string): string {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const PRIMARY = "#1e6bf5";
const MUTED = "#6b7280";
const BG = "#f6faff";

function shell(title: string, bodyHtml: string): string {
  return `<!doctype html>
<html><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><title>${escape(title)}</title></head>
<body style="margin:0;padding:24px;background:${BG};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#111827;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:16px;border:1px solid #e5e7eb;overflow:hidden;">
    <tr><td style="padding:24px 28px;border-bottom:1px solid #f1f5f9;">
      <strong style="font-size:16px;color:${PRIMARY};letter-spacing:0.4px;">HEALTHY FEET</strong>
      <span style="color:${MUTED};margin-left:6px;font-size:13px;">Podologische Praxis München</span>
    </td></tr>
    <tr><td style="padding:24px 28px 28px;">${bodyHtml}</td></tr>
    <tr><td style="padding:16px 28px;background:#fafafa;border-top:1px solid #f1f5f9;font-size:11px;color:${MUTED};">
      Healthy Feet · Baumkirchner Str. 19, 81673 München · muenchen@healthyfeet-podologie.de
    </td></tr>
  </table>
</body></html>`;
}

function row(label: string, value: string): string {
  return `<tr>
    <td style="padding:6px 0;color:${MUTED};font-size:13px;width:160px;vertical-align:top;">${escape(label)}</td>
    <td style="padding:6px 0;color:#111827;font-size:14px;font-weight:500;">${escape(value)}</td>
  </tr>`;
}

// ----- Clinic email (always DE) -----
export function clinicEmail(p: BookingPayload, opts: { siteUrl: string }): { subject: string; html: string; text: string } {
  const d = fmtDateTime(p.slotTime, "de");
  const time = fmtTime(p.slotTime, "de");
  const subject = `🦶 Neue Buchung · ${time} · ${p.name} · ${SERVICE_NAMES[p.service]?.de ?? p.service}`;
  const base = opts.siteUrl.replace(/\/$/, "");
  const confirmUrl = `${base}/api/admin/quick?ref=${encodeURIComponent(p.ref)}&action=confirm&sig=${signQuickAction(p.ref, "confirm")}`;
  const cancelUrl = `${base}/api/admin/quick?ref=${encodeURIComponent(p.ref)}&action=cancel&sig=${signQuickAction(p.ref, "cancel")}`;
  const adminUrl = `${base}/api/admin/bookings`;
  const flagsList = [
    p.isFirstVisit ? "Erstpatient" : null,
    p.hasDiabetes ? "Diabetiker" : null,
  ].filter(Boolean) as string[];
  const flags = flagsList.length
    ? `<div style="margin:16px 0;">
         ${flagsList
           .map(
             (f) =>
               `<span style="display:inline-block;padding:4px 10px;border-radius:9999px;background:#dbeafe;color:#1e40af;font-size:12px;font-weight:600;margin-right:6px;">${escape(f)}</span>`
           )
           .join("")}
       </div>`
    : "";
  const insBadge =
    p.insurance === "kasse_verordnung"
      ? `<span style="display:inline-block;padding:3px 10px;border-radius:9999px;background:#d1fae5;color:#065f46;font-size:12px;font-weight:600;">0 € · Kasse</span>`
      : `<span style="display:inline-block;padding:3px 10px;border-radius:9999px;background:#dbeafe;color:#1e40af;font-size:12px;font-weight:600;">Privat</span>`;

  const body = `
    <h2 style="margin:0 0 4px;font-size:20px;">Neue Buchung</h2>
    <p style="margin:0 0 16px;color:${MUTED};font-size:13px;">Ref: <strong style="font-family:ui-monospace,Menlo,monospace;">${escape(p.ref)}</strong></p>
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="border-collapse:collapse;">
      ${row("Name", p.name)}
      ${row("Telefon", p.phone)}
      ${row("E-Mail", p.email)}
      ${p.birthDate ? row("Geburtsdatum", p.birthDate) : ""}
      ${row("Anliegen", SERVICE_NAMES[p.service]?.de ?? p.service)}
      <tr><td style="padding:6px 0;color:${MUTED};font-size:13px;">Versicherung</td>
        <td style="padding:6px 0;font-size:14px;">${insBadge} <span style="margin-left:6px;color:#111827;">${escape(INS_NAMES[p.insurance]?.de ?? "")}</span></td></tr>
      ${row("Termin", d)}
      ${row("Sprache", p.lang.toUpperCase())}
    </table>
    ${flags}
    ${p.notes ? `<div style="margin-top:18px;padding:14px;background:#fff7ed;border:1px solid #fed7aa;border-radius:10px;"><p style="margin:0 0 4px;color:#9a3412;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.4px;">Anmerkungen</p><p style="margin:0;color:#1c1917;font-size:14px;white-space:pre-wrap;">${escape(p.notes)}</p></div>` : ""}
    <div style="margin-top:24px;">
      <p style="margin:0 0 10px;font-size:11px;color:${MUTED};font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">⚡ Schnell-Aktionen</p>
      <a href="${escape(confirmUrl)}" style="display:inline-block;padding:11px 18px;border-radius:9999px;background:#10b981;color:#ffffff;text-decoration:none;font-weight:600;font-size:14px;margin-right:8px;margin-bottom:8px;">✓ Bestätigen</a>
      <a href="${escape(cancelUrl)}" style="display:inline-block;padding:11px 18px;border-radius:9999px;background:#ffffff;border:1px solid #fca5a5;color:#b91c1c;text-decoration:none;font-weight:600;font-size:14px;margin-right:8px;margin-bottom:8px;">✕ Absagen</a>
      <a href="${escape(adminUrl)}" style="display:inline-block;padding:11px 18px;border-radius:9999px;background:#ffffff;border:1px solid #e5e7eb;color:#111827;text-decoration:none;font-weight:600;font-size:14px;margin-bottom:8px;">📋 Admin öffnen</a>
    </div>
    <div style="margin-top:18px;padding-top:14px;border-top:1px solid #f1f5f9;">
      <p style="margin:0;font-size:12px;color:${MUTED};">
        <a href="tel:${escape(p.phone)}" style="color:${PRIMARY};text-decoration:none;font-weight:500;">📞 ${escape(p.phone)}</a>
        &nbsp;·&nbsp;
        <a href="mailto:${escape(p.email)}" style="color:${PRIMARY};text-decoration:none;font-weight:500;">✉ ${escape(p.email)}</a>
      </p>
    </div>
  `;

  const text =
    `Neue Buchung (${p.ref})\n\n` +
    `Name: ${p.name}\nTel: ${p.phone}\nE-Mail: ${p.email}\n` +
    (p.birthDate ? `Geburt: ${p.birthDate}\n` : "") +
    `Anliegen: ${SERVICE_NAMES[p.service]?.de ?? p.service}\n` +
    `Versicherung: ${INS_NAMES[p.insurance]?.de ?? p.insurance}\n` +
    `Termin: ${d}\n` +
    (p.isFirstVisit ? "Erstpatient: ja\n" : "") +
    (p.hasDiabetes ? "Diabetiker: ja\n" : "") +
    `Sprache: ${p.lang}\n` +
    (p.notes ? `\nAnmerkungen:\n${p.notes}\n` : "");

  return { subject, html: shell(subject, body), text };
}

// ----- Patient confirmation -----
const CONFIRM_STRINGS: Record<Lang, {
  subject: string;
  greet: (name: string) => string;
  intro: string;
  refLabel: string;
  yourRequest: string;
  service: string;
  insurance: string;
  date: string;
  time: string;
  whatsNext: string;
  whatsNextText: string;
  urgent: string;
  thanks: string;
  addToCalendar: string;
  addToCalendarHint: string;
  googleCalendar: string;
  appleCalendar: string;
}> = {
  de: {
    subject: "Ihr Termin bei Podologie Healthy Feet München",
    greet: (n) => `Hallo ${n},`,
    intro: "Ihr Termin ist für Sie reserviert. Die Bestätigung erhalten Sie in Kürze per E-Mail. Sollten wir Rückfragen haben, melden wir uns telefonisch.",
    refLabel: "Ihre Termin-Nummer",
    yourRequest: "Ihr Termin im Überblick",
    service: "Anliegen",
    insurance: "Versicherung",
    date: "Termin",
    time: "Uhrzeit",
    whatsNext: "Wie geht es weiter?",
    whatsNextText: "Wir bestätigen Ihren Termin per E-Mail — meist innerhalb weniger Stunden. Telefonisch melden wir uns nur, falls wir etwas klären müssen (z. B. Heilmittelverordnung).",
    urgent: "Bei Schmerzen oder dringenden Fragen erreichen Sie uns direkt:",
    thanks: "Wir freuen uns, Sie bald in unserer Praxis begrüßen zu dürfen.",
    addToCalendar: "Termin im Kalender speichern",
    addToCalendarHint: "Eine Kalender-Datei (.ics) ist angehängt — einfach öffnen.",
    googleCalendar: "Google Kalender",
    appleCalendar: "Apple/Outlook (.ics)",
  },
  en: {
    subject: "Your appointment at Podologie Healthy Feet Munich",
    greet: (n) => `Hello ${n},`,
    intro: "your appointment is reserved. You'll get a confirmation by email shortly. If we have any questions, we'll call you.",
    refLabel: "Your reference",
    yourRequest: "Your appointment",
    service: "Concern",
    insurance: "Insurance",
    date: "Appointment",
    time: "Time",
    whatsNext: "What happens next?",
    whatsNextText: "We confirm your appointment by email — usually within a few hours. We only call if we need to clarify something (e.g. your medical prescription).",
    urgent: "For pain or urgent matters, reach us directly:",
    thanks: "We look forward to welcoming you to our practice soon.",
    addToCalendar: "Save appointment to calendar",
    addToCalendarHint: "A calendar file (.ics) is attached — just open it.",
    googleCalendar: "Google Calendar",
    appleCalendar: "Apple/Outlook (.ics)",
  },
  ru: {
    subject: "Ваш приём в Podologie Healthy Feet Мюнхен",
    greet: (n) => `Здравствуйте, ${n},`,
    intro: "ваш приём зарезервирован. Подтверждение придёт по email в ближайшее время. Если у нас будут вопросы, мы вам позвоним.",
    refLabel: "Номер приёма",
    yourRequest: "Ваш приём",
    service: "Услуга",
    insurance: "Страховка",
    date: "Приём",
    time: "Время",
    whatsNext: "Что дальше?",
    whatsNextText: "Мы подтвердим ваш приём по email — обычно в течение нескольких часов. Звоним только если нужно что-то уточнить (например, направление врача).",
    urgent: "При болях или срочных вопросах звоните или пишите напрямую:",
    thanks: "Будем рады видеть вас в нашей практике.",
    addToCalendar: "Добавить в календарь",
    addToCalendarHint: "К письму прикреплён файл (.ics) — просто откройте его.",
    googleCalendar: "Google Календарь",
    appleCalendar: "Apple/Outlook (.ics)",
  },
};

export function patientEmail(p: BookingPayload): { subject: string; html: string; text: string } {
  const L = CONFIRM_STRINGS[p.lang] ?? CONFIRM_STRINGS.de;
  const d = fmtDateTime(p.slotTime, p.lang);
  const subject = `${L.subject} · ${p.ref}`;
  const calUrl = googleCalendarUrl({
    uid: p.ref,
    startIso: p.slotTime,
    summary: `Podologie Healthy Feet — ${SERVICE_NAMES[p.service]?.[p.lang] ?? p.service}`,
    description: `Termin Ref: ${p.ref}\nMuenchen@healthyfeet-podologie.de · 0821 349 0642`,
    location: "Baumkirchner Str. 19, 81673 München",
  });

  const body = `
    <h2 style="margin:0 0 8px;font-size:20px;color:#111827;">${escape(L.greet(p.name.split(" ")[0]))}</h2>
    <p style="margin:0 0 18px;color:#374151;font-size:15px;line-height:1.55;">${escape(L.intro)}</p>

    <p style="margin:0 0 8px;font-size:13px;color:${MUTED};font-weight:600;text-transform:uppercase;letter-spacing:0.4px;">${escape(L.yourRequest)}</p>
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="border-collapse:collapse;margin:0 0 22px;">
      ${row(L.service, SERVICE_NAMES[p.service]?.[p.lang] ?? p.service)}
      ${row(L.insurance, INS_NAMES[p.insurance]?.[p.lang] ?? p.insurance)}
      ${row(L.date, d)}
    </table>

    <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:12px;padding:14px 18px;margin:0 0 22px;">
      <p style="margin:0 0 4px;font-size:13px;color:#166534;font-weight:700;">${escape(L.whatsNext)}</p>
      <p style="margin:0;font-size:14px;color:#14532d;line-height:1.5;">${escape(L.whatsNextText)}</p>
    </div>

    <div style="border:1px solid #e5e7eb;border-radius:12px;padding:14px 18px;margin:0 0 22px;">
      <p style="margin:0 0 6px;font-size:13px;color:${MUTED};font-weight:600;text-transform:uppercase;letter-spacing:0.4px;">📅 ${escape(L.addToCalendar)}</p>
      <p style="margin:0 0 10px;font-size:13px;color:#374151;">${escape(L.addToCalendarHint)}</p>
      <a href="${escape(calUrl)}" target="_blank" style="display:inline-block;padding:8px 14px;border-radius:8px;background:${PRIMARY};color:#ffffff;text-decoration:none;font-weight:600;font-size:13px;margin-right:6px;">${escape(L.googleCalendar)}</a>
      <span style="font-size:12px;color:${MUTED};">${escape(L.appleCalendar)}</span>
    </div>

    <p style="margin:0 0 6px;font-size:13px;color:${MUTED};">${escape(L.urgent)}</p>
    <p style="margin:0 0 22px;font-size:14px;">
      <a href="tel:+498213490642" style="color:${PRIMARY};text-decoration:none;font-weight:600;">📞 0821 349 0642</a>
      &nbsp;·&nbsp;
      <a href="mailto:muenchen@healthyfeet-podologie.de" style="color:${PRIMARY};text-decoration:none;font-weight:600;">✉ muenchen@healthyfeet-podologie.de</a>
    </p>

    <p style="margin:0;color:#374151;font-size:14px;font-style:italic;">${escape(L.thanks)}</p>

    <p style="margin:18px 0 0;font-size:11px;color:${MUTED};border-top:1px solid #f1f5f9;padding-top:12px;">
      ${escape(L.refLabel)}: <span style="font-family:ui-monospace,Menlo,monospace;color:#475569;">${escape(p.ref)}</span>
    </p>
  `;

  const text =
    `${L.greet(p.name.split(" ")[0])}\n\n${L.intro}\n\n` +
    `${L.yourRequest}:\n` +
    `${L.service}: ${SERVICE_NAMES[p.service]?.[p.lang] ?? p.service}\n` +
    `${L.insurance}: ${INS_NAMES[p.insurance]?.[p.lang] ?? p.insurance}\n` +
    `${L.date}: ${d}\n\n` +
    `${L.whatsNext}\n${L.whatsNextText}\n\n` +
    `${L.urgent}\n+49 821 349 0642 · muenchen@healthyfeet-podologie.de\n\n` +
    `${L.thanks}\n\n--\n${L.refLabel}: ${p.ref}`;

  return { subject, html: shell(subject, body), text };
}
