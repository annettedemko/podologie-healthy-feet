// "Termin bestätigt" / appointment confirmed email — sent when admin clicks "Bestätigt".
// 3 languages, ICS-attachment ready (caller adds it).

type Lang = "de" | "en" | "ru";

const STR: Record<Lang, {
  subject: (time: string) => string;
  greet: (name: string) => string;
  intro: string;
  badge: string;
  date: string;
  service: string;
  address: string;
  prepTitle: string;
  prepKasse: string;
  prepPrivat: string;
  reschedule: string;
  call: string;
  thanks: string;
}> = {
  de: {
    subject: (t) => `Termin bestätigt · ${t} bei Podologie Healthy Feet`,
    greet: (n) => `Hallo ${n},`,
    intro: "wir freuen uns — Ihr Termin in unserer Praxis ist nun bestätigt!",
    badge: "✓ TERMIN BESTÄTIGT",
    date: "Termin",
    service: "Anliegen",
    address: "Adresse",
    prepTitle: "So bereiten Sie sich vor",
    prepKasse: "Bitte bringen Sie Ihre Heilmittelverordnung und Versichertenkarte mit. Wir rechnen direkt mit Ihrer Krankenkasse ab.",
    prepPrivat: "Bitte bringen Sie eine Liste Ihrer Medikamente sowie ggf. relevante Vorbefunde mit. Sie erhalten nach der Behandlung eine transparente Rechnung.",
    reschedule: "Sollten Sie verhindert sein, melden Sie sich bitte rechtzeitig (mind. 24h vorher) — gern verschieben wir Ihren Termin.",
    call: "Bei Fragen oder zum Verschieben:",
    thanks: "Wir freuen uns auf Ihren Besuch!",
  },
  en: {
    subject: (t) => `Appointment confirmed · ${t} at Podologie Healthy Feet`,
    greet: (n) => `Hello ${n},`,
    intro: "great news — your appointment at our practice is now confirmed!",
    badge: "✓ APPOINTMENT CONFIRMED",
    date: "Appointment",
    service: "Service",
    address: "Address",
    prepTitle: "How to prepare",
    prepKasse: "Please bring your medical prescription and insurance card. We'll bill your statutory insurance directly.",
    prepPrivat: "Please bring a list of your medications and any relevant prior findings. You'll receive a transparent invoice after treatment.",
    reschedule: "Can't make it? Please let us know early (at least 24h in advance) — we'll happily reschedule.",
    call: "Questions or rescheduling:",
    thanks: "Looking forward to seeing you!",
  },
  ru: {
    subject: (t) => `Приём подтверждён · ${t} в Podologie Healthy Feet`,
    greet: (n) => `Здравствуйте, ${n},`,
    intro: "отличные новости — ваш приём в нашей практике подтверждён!",
    badge: "✓ ПРИЁМ ПОДТВЕРЖДЁН",
    date: "Приём",
    service: "Услуга",
    address: "Адрес",
    prepTitle: "Как подготовиться",
    prepKasse: "Пожалуйста, возьмите с собой направление врача (Verordnung) и страховую карту. Мы рассчитываемся напрямую со страховой кассой.",
    prepPrivat: "Пожалуйста, возьмите список ваших лекарств и, при необходимости, предыдущие медицинские заключения. После приёма вы получите прозрачный счёт.",
    reschedule: "Если не сможете прийти, пожалуйста, сообщите заранее (минимум за 24 часа) — мы с удовольствием перенесём приём.",
    call: "Вопросы или перенос:",
    thanks: "Будем рады видеть вас!",
  },
};

const SERVICE_NAMES: Record<string, Record<Lang, string>> = {
  komplexbehandlung: { de: "Podologische Komplexbehandlung", en: "Podiatric Complex Treatment", ru: "Подологическое комплексное лечение" },
  nagelpilzbehandlung: { de: "Nagelpilzbehandlung", en: "Nail Fungus Treatment", ru: "Лечение грибка ногтей" },
  "eingewachsener-nagel": { de: "Eingewachsener Nagel", en: "Ingrown Nail", ru: "Вросший ноготь" },
  warzenbehandlung: { de: "Warzenbehandlung", en: "Wart Treatment", ru: "Лечение бородавок" },
  nagelspangenbehandlung: { de: "Nagelspangenbehandlung", en: "Nail Brace", ru: "Ногтевые скобы" },
  "hornhaut-entfernen": { de: "Hornhaut entfernen", en: "Callus Removal", ru: "Удаление мозолей" },
  plasmatherapie: { de: "Plasmatherapie", en: "Plasma Therapy", ru: "Плазмотерапия" },
  beratung: { de: "Erstberatung", en: "Initial consultation", ru: "Первичная консультация" },
};

function escape(s: string): string {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
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
  const map: Record<Lang, string> = { de: "de-DE", en: "en-GB", ru: "ru-RU" };
  const date = new Intl.DateTimeFormat(map[lang], {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "Europe/Berlin",
  }).format(new Date(iso));
  return `${date} · ${fmtTime(iso, lang)}`;
}

const PRIMARY = "#1e6bf5";
const MUTED = "#6b7280";
const BG = "#f6faff";

export function confirmationEmail(input: {
  ref: string;
  name: string;
  service: string;
  insurance: "kasse_verordnung" | "privat";
  slotTime: string;
  lang: Lang;
}): { subject: string; html: string; text: string } {
  const L = STR[input.lang] ?? STR.de;
  const time = fmtTime(input.slotTime, input.lang);
  const dt = fmtDateTime(input.slotTime, input.lang);
  const subject = L.subject(time);
  const serviceName = SERVICE_NAMES[input.service]?.[input.lang] ?? input.service;
  const firstName = input.name.split(" ")[0];
  const prepText = input.insurance === "kasse_verordnung" ? L.prepKasse : L.prepPrivat;

  const html = `<!doctype html>
<html><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/></head>
<body style="margin:0;padding:24px;background:${BG};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#111827;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:16px;border:1px solid #e5e7eb;overflow:hidden;">
    <tr><td style="padding:24px 28px 16px;background:linear-gradient(135deg,#10b981,#059669);">
      <strong style="font-size:14px;color:#ffffff;letter-spacing:0.6px;">${escape(L.badge)}</strong>
    </td></tr>
    <tr><td style="padding:28px;">
      <h1 style="margin:0 0 8px;font-size:22px;color:#111827;">${escape(L.greet(firstName))}</h1>
      <p style="margin:0 0 22px;color:#374151;font-size:15px;line-height:1.55;">${escape(L.intro)}</p>

      <div style="background:#ecfdf5;border:1px solid #a7f3d0;border-radius:12px;padding:16px 20px;margin:0 0 22px;">
        <p style="margin:0 0 4px;color:#065f46;font-size:11px;text-transform:uppercase;letter-spacing:0.6px;font-weight:600;">${escape(L.date)}</p>
        <p style="margin:0 0 14px;font-size:18px;color:#047857;font-weight:700;">${escape(dt)}</p>
        <p style="margin:0 0 4px;color:#065f46;font-size:11px;text-transform:uppercase;letter-spacing:0.6px;font-weight:600;">${escape(L.service)}</p>
        <p style="margin:0 0 14px;font-size:14px;color:#111827;font-weight:500;">${escape(serviceName)}</p>
        <p style="margin:0 0 4px;color:#065f46;font-size:11px;text-transform:uppercase;letter-spacing:0.6px;font-weight:600;">${escape(L.address)}</p>
        <p style="margin:0;font-size:14px;color:#111827;">Baumkirchner Str. 19, 81673 München</p>
      </div>

      <div style="border:1px solid #e5e7eb;border-radius:12px;padding:14px 18px;margin:0 0 20px;">
        <p style="margin:0 0 6px;font-size:13px;color:${MUTED};font-weight:600;text-transform:uppercase;letter-spacing:0.4px;">${escape(L.prepTitle)}</p>
        <p style="margin:0;color:#374151;font-size:14px;line-height:1.5;">${escape(prepText)}</p>
      </div>

      <p style="margin:0 0 18px;color:#374151;font-size:14px;line-height:1.5;">${escape(L.reschedule)}</p>
      <p style="margin:0 0 6px;font-size:13px;color:${MUTED};">${escape(L.call)}</p>
      <p style="margin:0 0 22px;font-size:14px;">
        <a href="tel:+498213490642" style="color:${PRIMARY};text-decoration:none;font-weight:600;">📞 0821 349 0642</a>
        &nbsp;·&nbsp;
        <a href="mailto:muenchen@healthyfeet-podologie.de" style="color:${PRIMARY};text-decoration:none;font-weight:600;">✉ muenchen@healthyfeet-podologie.de</a>
      </p>
      <p style="margin:0;color:#374151;font-size:14px;font-style:italic;">${escape(L.thanks)}</p>
    </td></tr>
    <tr><td style="padding:14px 28px;background:#fafafa;border-top:1px solid #f1f5f9;font-size:11px;color:${MUTED};">
      Ref: <span style="font-family:ui-monospace,Menlo,monospace;">${escape(input.ref)}</span> · Podologie Healthy Feet · München
    </td></tr>
  </table>
</body></html>`;

  const text =
    `${L.greet(firstName)}\n\n${L.badge}\n\n${L.intro}\n\n` +
    `${L.date}: ${dt}\n` +
    `${L.service}: ${serviceName}\n` +
    `${L.address}: Baumkirchner Str. 19, 81673 München\n\n` +
    `${L.prepTitle}:\n${prepText}\n\n` +
    `${L.reschedule}\n${L.call} +49 821 349 0642 · muenchen@healthyfeet-podologie.de\n\n` +
    `${L.thanks}\n\nRef: ${input.ref}`;

  return { subject, html, text };
}
