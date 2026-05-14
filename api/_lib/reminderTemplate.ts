// Day-before reminder email — DE/EN/RU.

type Lang = "de" | "en" | "ru";

const STR: Record<Lang, {
  subject: (time: string) => string;
  greet: (name: string) => string;
  intro: string;
  date: string;
  service: string;
  address: string;
  reschedule: string;
  call: string;
  thanks: string;
}> = {
  de: {
    subject: (time) => `Erinnerung: Ihr Termin bei Healthy Feet morgen um ${time}`,
    greet: (n) => `Hallo ${n},`,
    intro: "kleine Erinnerung — Ihr Termin in unserer Praxis ist morgen.",
    date: "Termin",
    service: "Anliegen",
    address: "Adresse",
    reschedule: "Sie können nicht? Bitte rufen Sie uns frühzeitig an, damit wir den Termin neu vergeben können.",
    call: "Bei Fragen oder zum Verschieben:",
    thanks: "Wir freuen uns auf Sie!",
  },
  en: {
    subject: (time) => `Reminder: Your appointment at Healthy Feet tomorrow at ${time}`,
    greet: (n) => `Hello ${n},`,
    intro: "a quick reminder — your appointment at our practice is tomorrow.",
    date: "Appointment",
    service: "Service",
    address: "Address",
    reschedule: "Can't make it? Please call us early so we can offer the slot to someone else.",
    call: "Questions or rescheduling:",
    thanks: "Looking forward to seeing you!",
  },
  ru: {
    subject: (time) => `Напоминание: ваш приём в Podologie Healthy Feet завтра в ${time}`,
    greet: (n) => `Здравствуйте, ${n},`,
    intro: "напоминаем — ваш приём в нашей практике завтра.",
    date: "Приём",
    service: "Услуга",
    address: "Адрес",
    reschedule: "Не сможете прийти? Пожалуйста, позвоните заранее, чтобы мы могли освободить слот для другого пациента.",
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

export function reminderEmail(input: {
  ref: string;
  name: string;
  service: string;
  slotTime: string;
  lang: Lang;
}): { subject: string; html: string; text: string } {
  const L = STR[input.lang] ?? STR.de;
  const time = fmtTime(input.slotTime, input.lang);
  const dt = fmtDateTime(input.slotTime, input.lang);
  const subject = L.subject(time);
  const serviceName = SERVICE_NAMES[input.service]?.[input.lang] ?? input.service;
  const firstName = input.name.split(" ")[0];

  const html = `<!doctype html>
<html><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/></head>
<body style="margin:0;padding:24px;background:${BG};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#111827;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:16px;border:1px solid #e5e7eb;overflow:hidden;">
    <tr><td style="padding:24px 28px;border-bottom:1px solid #f1f5f9;">
      <strong style="font-size:15px;color:${PRIMARY};letter-spacing:0.4px;">⏰ ERINNERUNG · REMINDER · НАПОМИНАНИЕ</strong>
    </td></tr>
    <tr><td style="padding:28px;">
      <h1 style="margin:0 0 8px;font-size:22px;color:#111827;">${escape(L.greet(firstName))}</h1>
      <p style="margin:0 0 22px;color:#374151;font-size:15px;line-height:1.55;">${escape(L.intro)}</p>

      <div style="background:${BG};border:1px solid #dbeafe;border-radius:12px;padding:16px 20px;margin:0 0 20px;">
        <p style="margin:0 0 4px;color:${MUTED};font-size:11px;text-transform:uppercase;letter-spacing:0.6px;font-weight:600;">${escape(L.date)}</p>
        <p style="margin:0 0 14px;font-size:18px;color:${PRIMARY};font-weight:700;">${escape(dt)}</p>
        <p style="margin:0 0 4px;color:${MUTED};font-size:11px;text-transform:uppercase;letter-spacing:0.6px;font-weight:600;">${escape(L.service)}</p>
        <p style="margin:0 0 14px;font-size:14px;color:#111827;font-weight:500;">${escape(serviceName)}</p>
        <p style="margin:0 0 4px;color:${MUTED};font-size:11px;text-transform:uppercase;letter-spacing:0.6px;font-weight:600;">${escape(L.address)}</p>
        <p style="margin:0;font-size:14px;color:#111827;">Baumkirchner Str. 19, 81673 München</p>
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
    `${L.greet(firstName)}\n\n${L.intro}\n\n` +
    `${L.date}: ${dt}\n` +
    `${L.service}: ${serviceName}\n` +
    `${L.address}: Baumkirchner Str. 19, 81673 München\n\n` +
    `${L.reschedule}\n${L.call} +49 821 349 0642 · muenchen@healthyfeet-podologie.de\n\n` +
    `${L.thanks}\n\nRef: ${input.ref}`;

  return { subject, html, text };
}
