// Calendar grid view of bookings — same Basic Auth as /api/admin/bookings.

import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getSql, type DbBookingRow } from "../_lib/db.js";
import {
  WORK_START_HOUR,
  WORK_END_HOUR,
  capacityForHour,
  OPEN_WINDOWS,
  BERLIN_OFFSET,
} from "../_lib/bookingConfig.js";

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

const SERVICE_LABELS: Record<string, string> = {
  komplexbehandlung: "Komplex",
  nagelpilzbehandlung: "Nagelpilz",
  "eingewachsener-nagel": "Eingewachsen",
  warzenbehandlung: "Warze",
  nagelspangenbehandlung: "Spange",
  "hornhaut-entfernen": "Hornhaut",
  plasmatherapie: "Plasma",
  beratung: "Beratung",
};

const STATUS_BG: Record<string, string> = {
  new: "background:#fef3c7;border-color:#fbbf24",
  confirmed: "background:#d1fae5;border-color:#10b981",
  cancelled: "background:#fee2e2;border-color:#f87171;text-decoration:line-through;opacity:0.6",
  rescheduled: "background:#dbeafe;border-color:#3b82f6",
};

function* iterateOpenDates(): Generator<string> {
  for (const w of OPEN_WINDOWS) {
    const [fy, fm, fd] = w.from.split("-").map(Number);
    const [ty, tm, td] = w.to.split("-").map(Number);
    const start = new Date(Date.UTC(fy, fm - 1, fd));
    const end = new Date(Date.UTC(ty, tm - 1, td));
    for (let d = new Date(start); d.getTime() <= end.getTime(); d.setUTCDate(d.getUTCDate() + 1)) {
      const dow = d.getUTCDay();
      if (dow === 0 || dow === 6) continue;
      const y = d.getUTCFullYear();
      const m = String(d.getUTCMonth() + 1).padStart(2, "0");
      const day = String(d.getUTCDate()).padStart(2, "0");
      yield `${y}-${m}-${day}`;
    }
  }
}

function dayLabel(ymd: string): { weekday: string; date: string } {
  const d = new Date(`${ymd}T12:00:00${BERLIN_OFFSET}`);
  return {
    weekday: new Intl.DateTimeFormat("de-DE", { weekday: "short", timeZone: "Europe/Berlin" }).format(d),
    date: new Intl.DateTimeFormat("de-DE", { day: "2-digit", month: "2-digit", timeZone: "Europe/Berlin" }).format(d),
  };
}

function renderPage(rows: DbBookingRow[]): string {
  // Group by date (Berlin), then by hour.
  const dates = Array.from(iterateOpenDates());
  const byDateHour = new Map<string, DbBookingRow[]>();
  for (const r of rows) {
    // Cancelled appointments stay in the stats bar but are hidden from the grid.
    if (r.status === "cancelled") continue;
    const date = new Date(r.preferred_date);
    const ymd = new Intl.DateTimeFormat("sv-SE", { timeZone: "Europe/Berlin" }).format(date); // YYYY-MM-DD
    const hour = Number(
      new Intl.DateTimeFormat("en-GB", { hour: "2-digit", hour12: false, timeZone: "Europe/Berlin" }).format(date)
    );
    const k = `${ymd}_${hour}`;
    if (!byDateHour.has(k)) byDateHour.set(k, []);
    byDateHour.get(k)!.push(r);
  }

  const totals = rows.reduce<Record<string, number>>((a, r) => ({ ...a, [r.status]: (a[r.status] ?? 0) + 1 }), {});
  const total = rows.length;

  const hours: number[] = [];
  for (let h = WORK_START_HOUR; h < WORK_END_HOUR; h++) hours.push(h);

  return `<!doctype html>
<html lang="de"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>Healthy Feet · Kalender</title>
<style>
  *{box-sizing:border-box}
  body{margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;background:#f8fafc;color:#0f172a}
  .wrap{max-width:1400px;margin:0 auto;padding:20px}
  header{display:flex;align-items:center;justify-content:space-between;margin-bottom:20px;gap:12px;flex-wrap:wrap}
  h1{margin:0;font-size:22px;font-weight:700;color:#1e6bf5}
  .views{display:flex;gap:6px}
  .views a{padding:6px 14px;border-radius:9999px;background:#fff;color:#475569;text-decoration:none;border:1px solid #e2e8f0;font-size:13px;font-weight:500}
  .views a.active{background:#1e6bf5;color:#fff;border-color:#1e6bf5}
  .stats{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:14px}
  .stat{padding:6px 14px;border-radius:9999px;background:#fff;border:1px solid #e2e8f0;font-size:12px;color:#475569}
  .stat strong{color:#0f172a;font-weight:700}
  .grid-wrap{background:#fff;border-radius:12px;overflow-x:auto;box-shadow:0 1px 3px #0000000a;border:1px solid #e2e8f0}
  table.cal{border-collapse:separate;border-spacing:0;width:100%;min-width:920px}
  table.cal th, table.cal td{border-bottom:1px solid #f1f5f9;border-right:1px solid #f1f5f9;padding:6px;vertical-align:top;font-size:11px}
  table.cal th{background:#f8fafc;font-weight:600;font-size:11px;color:#64748b;text-transform:uppercase;letter-spacing:0.4px;position:sticky;top:0;z-index:2}
  table.cal th.day{position:sticky;left:0;background:#fff;z-index:3;text-align:left;width:84px}
  table.cal td.day{position:sticky;left:0;background:#fff;z-index:1;width:84px}
  table.cal td.day .wd{font-weight:600;color:#1e6bf5;font-size:12px}
  table.cal td.day .dt{color:#475569;font-size:11px}
  table.cal td.slot{height:64px;width:115px;background:#fafafa}
  table.cal td.slot.lunch{background:#fef9c3;}
  .booking{display:block;width:100%;text-align:left;font-family:inherit;border:2px solid;border-radius:6px;padding:3px 5px;margin-bottom:2px;line-height:1.2;font-size:11px;cursor:pointer;transition:transform 0.1s,box-shadow 0.1s}
  .booking:hover{transform:translateY(-1px);box-shadow:0 2px 8px #00000020}
  .booking:focus-visible{outline:2px solid #1e6bf5;outline-offset:1px}
  .booking .nm{font-weight:600;color:#0f172a;display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:100px}
  .booking .sv{color:#475569;font-size:10px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:100px}
  .booking .meta{font-size:9px;color:#64748b;display:flex;gap:4px;flex-wrap:wrap;margin-top:1px}
  .booking .flag{display:inline-block;padding:0 4px;border-radius:3px;font-size:9px;font-weight:600}
  .empty{color:#cbd5e1;text-align:center;padding-top:18px;font-size:11px}
  .lunch-marker{position:absolute;font-size:9px;color:#a16207;font-weight:600;text-transform:uppercase;letter-spacing:0.5px}
  .ref{font-family:ui-monospace,Menlo,monospace;font-size:9px;color:#64748b}
  .legend{margin-top:14px;display:flex;gap:10px;font-size:11px;color:#64748b;flex-wrap:wrap}
  .legend span{padding:2px 8px;border-radius:4px;border:2px solid;display:inline-block}

  /* Modal */
  .modal-overlay{position:fixed;inset:0;background:#0f172abf;backdrop-filter:blur(4px);display:none;align-items:flex-start;justify-content:center;padding:40px 16px;z-index:100;overflow-y:auto}
  .modal-overlay.open{display:flex}
  .modal{background:#fff;border-radius:16px;max-width:520px;width:100%;box-shadow:0 20px 60px #00000040;overflow:hidden;animation:slideIn 0.2s ease-out}
  @keyframes slideIn{from{opacity:0;transform:translateY(-12px)}to{opacity:1;transform:translateY(0)}}
  .modal-head{padding:20px 24px;border-bottom:1px solid #f1f5f9;display:flex;align-items:flex-start;justify-content:space-between;gap:12px}
  .modal-head h2{margin:0 0 4px;font-size:20px;color:#0f172a}
  .modal-head .meta-time{color:#64748b;font-size:13px;font-weight:500}
  .modal-head .close-btn{background:none;border:none;font-size:24px;color:#94a3b8;cursor:pointer;padding:0;width:32px;height:32px;line-height:1;border-radius:8px;flex-shrink:0}
  .modal-head .close-btn:hover{background:#f1f5f9;color:#0f172a}
  .status-pill{display:inline-block;padding:3px 10px;border-radius:9999px;font-size:11px;font-weight:600;margin-top:4px}
  .modal-body{padding:18px 24px}
  .modal-row{display:flex;justify-content:space-between;align-items:flex-start;padding:8px 0;border-bottom:1px solid #f8fafc;gap:12px}
  .modal-row:last-child{border-bottom:none}
  .modal-row .lbl{color:#64748b;font-size:12px;text-transform:uppercase;letter-spacing:0.4px;font-weight:600;min-width:100px;flex-shrink:0}
  .modal-row .val{color:#0f172a;font-size:14px;font-weight:500;text-align:right;flex:1;word-break:break-word}
  .modal-row .val a{color:#1e6bf5;text-decoration:none;font-weight:600}
  .modal-row .val a:hover{text-decoration:underline}
  .modal-row .val.notes{font-style:italic;color:#475569;text-align:left;font-weight:400;white-space:pre-wrap;background:#fff7ed;padding:8px 10px;border-radius:6px;border:1px solid #fed7aa}
  .modal-flags{display:flex;gap:6px;flex-wrap:wrap;padding:12px 0 0}
  .modal-flags .flag{padding:4px 10px;border-radius:9999px;font-size:11px;font-weight:600}
  .modal-actions{padding:16px 24px;background:#f8fafc;border-top:1px solid #e2e8f0;display:flex;flex-wrap:wrap;gap:8px;align-items:center}
  .modal-actions .quick-links{display:flex;gap:8px;flex:1}
  .modal-actions a.icon-btn{display:inline-flex;align-items:center;gap:6px;padding:8px 12px;border-radius:9999px;background:#fff;border:1px solid #e2e8f0;color:#475569;text-decoration:none;font-size:13px;font-weight:500}
  .modal-actions a.icon-btn:hover{background:#f1f5f9;color:#0f172a}
  .modal-actions form{display:flex;gap:6px;flex-wrap:wrap}
  .modal-actions button{padding:8px 14px;border-radius:9999px;border:1px solid;background:#fff;font-size:13px;cursor:pointer;font-weight:600;font-family:inherit}
  .modal-actions button.confirm{border-color:#10b981;color:#047857}
  .modal-actions button.confirm:hover{background:#10b981;color:#fff}
  .modal-actions button.cancel{border-color:#ef4444;color:#b91c1c}
  .modal-actions button.cancel:hover{background:#ef4444;color:#fff}
  .modal-actions button.resched{border-color:#3b82f6;color:#1e40af}
  .modal-actions button.resched:hover{background:#3b82f6;color:#fff}
  .modal-actions button.reset{border-color:#94a3b8;color:#475569}
  .modal-actions button.reset:hover{background:#94a3b8;color:#fff}
  .modal-actions .ref{font-size:10px;color:#94a3b8;font-family:ui-monospace,Menlo,monospace;margin-left:auto;align-self:center}
  .modal-actions .resched-form{display:flex;gap:6px;align-items:center;width:100%;margin-top:4px;padding-top:12px;border-top:1px dashed #e2e8f0}
  .modal-actions .resched-form input{flex:1;font-size:13px;padding:8px 12px;border:1px solid #cbd5e1;border-radius:9999px;font-family:inherit;color:#0f172a}
  .modal-actions .resched-form .hint{width:100%;font-size:11px;color:#64748b;margin:0 0 -2px}
</style></head>
<body><div class="wrap">
<header>
  <h1>📅 Healthy Feet · Kalender</h1>
  <div class="views">
    <a href="/api/admin/bookings">Liste</a>
    <a href="/api/admin/calendar" class="active">Kalender</a>
    <a href="/de/" target="_blank" rel="noopener">🌐 Website ↗</a>
  </div>
</header>

<div class="stats">
  <span class="stat"><strong>${total}</strong> Buchungen</span>
  <span class="stat">🟡 <strong>${totals.new ?? 0}</strong> neu</span>
  <span class="stat">🟢 <strong>${totals.confirmed ?? 0}</strong> bestätigt</span>
  <span class="stat">🔵 <strong>${totals.rescheduled ?? 0}</strong> verschoben</span>
  <span class="stat">🔴 <strong>${totals.cancelled ?? 0}</strong> abgesagt</span>
</div>

<div class="grid-wrap">
  <table class="cal">
    <thead>
      <tr>
        <th class="day">Tag</th>
        ${hours.map(h => `<th>${String(h).padStart(2, "0")}:00${capacityForHour(h) === 1 ? ' 🍽️' : ''}</th>`).join("")}
      </tr>
    </thead>
    <tbody>
      ${dates.map(ymd => {
        const dl = dayLabel(ymd);
        return `<tr>
          <td class="day">
            <div class="wd">${escape(dl.weekday)}</div>
            <div class="dt">${escape(dl.date)}</div>
          </td>
          ${hours.map(h => {
            const cell = byDateHour.get(`${ymd}_${h}`) ?? [];
            const cap = capacityForHour(h);
            const isLunch = h === 13;
            return `<td class="slot${isLunch ? ' lunch' : ''}">
              ${cell.length === 0
                ? `<div class="empty">${cap}× frei</div>`
                : cell.map(r => {
                    const dataPayload = JSON.stringify({
                      ref: r.ref, status: r.status, service: r.service, insurance: r.insurance,
                      is_first_visit: r.is_first_visit, has_diabetes: r.has_diabetes,
                      preferred_date: r.preferred_date, name: r.name, phone: r.phone, email: r.email,
                      birth_date: r.birth_date, notes: r.notes, lang: r.lang,
                      created_at: r.created_at,
                      service_label: SERVICE_LABELS[r.service] ?? r.service,
                    });
                    return `
                  <button type="button" class="booking" style="${STATUS_BG[r.status] ?? ""}" data-booking="${escape(dataPayload)}">
                    <span class="nm">${escape(r.name)}</span>
                    <span class="sv">${escape(SERVICE_LABELS[r.service] ?? r.service)}</span>
                    <span class="meta">
                      ${r.is_first_visit ? '<span class="flag" style="background:#fef3c7;color:#92400e">1×</span>' : ''}
                      ${r.has_diabetes ? '<span class="flag" style="background:#fce7f3;color:#9d174d">D</span>' : ''}
                      ${r.insurance === 'kasse_verordnung' ? '<span class="flag" style="background:#d1fae5;color:#065f46">Kasse</span>' : '<span class="flag" style="background:#dbeafe;color:#1e40af">Privat</span>'}
                    </span>
                    <span class="ref">${escape(r.ref)} · ${escape(r.phone)}</span>
                  </button>
                `;}).join("")
              }
            </td>`;
          }).join("")}
        </tr>`;
      }).join("")}
    </tbody>
  </table>
</div>

<div class="legend">
  <strong>Status:</strong>
  <span style="border-color:#fbbf24;background:#fef3c7">neu</span>
  <span style="border-color:#10b981;background:#d1fae5">bestätigt</span>
  <span style="border-color:#3b82f6;background:#dbeafe">verschoben</span>
  <span style="border-color:#f87171;background:#fee2e2">abgesagt</span>
  <span style="background:#fef9c3;border-color:#fde047">🍽️ 13:00 = Mittagspause (1 Specialist)</span>
</div>
<p style="margin-top:12px;font-size:12px;color:#64748b">💡 Klicken Sie auf eine Buchung, um die Patienten-Details zu öffnen.</p>
</div>

<!-- Modal -->
<div class="modal-overlay" id="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="modal-name">
  <div class="modal" id="modal-content"></div>
</div>

<script>
(function(){
  const overlay = document.getElementById('modal-overlay');
  const content = document.getElementById('modal-content');

  const STATUS_LABELS = { new: 'Neu', confirmed: 'Bestätigt', cancelled: 'Abgesagt', rescheduled: 'Verschoben' };
  const STATUS_PILL = {
    new: 'background:#fef3c7;color:#92400e',
    confirmed: 'background:#d1fae5;color:#065f46',
    cancelled: 'background:#fee2e2;color:#991b1b',
    rescheduled: 'background:#dbeafe;color:#1e40af',
  };
  const INSURANCE_LABELS = { kasse_verordnung: '✓ Mit Verordnung (Kasse)', privat: 'Privatzahler / Selbstzahler' };

  function esc(s){return String(s ?? '').replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));}

  function fmtDateTime(iso){
    const d = new Date(iso);
    return new Intl.DateTimeFormat('de-DE', {weekday:'long',day:'2-digit',month:'long',year:'numeric',hour:'2-digit',minute:'2-digit',timeZone:'Europe/Berlin'}).format(d);
  }
  function fmtDate(iso){
    return new Intl.DateTimeFormat('de-DE', {dateStyle:'short',timeStyle:'short',timeZone:'Europe/Berlin'}).format(new Date(iso));
  }
  function toLocalInput(iso){
    const parts = new Intl.DateTimeFormat('en-CA', {year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',hour12:false,timeZone:'Europe/Berlin'}).formatToParts(new Date(iso));
    const get = t => (parts.find(p => p.type === t) || {}).value || '';
    return get('year') + '-' + get('month') + '-' + get('day') + 'T' + get('hour') + ':' + get('minute');
  }

  function render(b){
    const flags = [];
    if (b.is_first_visit) flags.push('<span class="flag" style="background:#fef3c7;color:#92400e">Erstpatient</span>');
    if (b.has_diabetes) flags.push('<span class="flag" style="background:#fce7f3;color:#9d174d">Diabetiker</span>');
    flags.push('<span class="flag" style="' + (b.insurance === 'kasse_verordnung' ? 'background:#d1fae5;color:#065f46' : 'background:#dbeafe;color:#1e40af') + '">' + esc(INSURANCE_LABELS[b.insurance] || b.insurance) + '</span>');
    flags.push('<span class="flag" style="background:#f1f5f9;color:#475569">' + esc((b.lang || 'de').toUpperCase()) + '</span>');

    return [
      '<div class="modal-head">',
      '  <div>',
      '    <h2 id="modal-name">' + esc(b.name) + '</h2>',
      '    <div class="meta-time">' + esc(fmtDateTime(b.preferred_date)) + '</div>',
      '    <div><span class="status-pill" style="' + (STATUS_PILL[b.status] || '') + '">' + esc(STATUS_LABELS[b.status] || b.status) + '</span></div>',
      '  </div>',
      '  <button type="button" class="close-btn" onclick="window.__hfCloseModal()" aria-label="Schließen">×</button>',
      '</div>',
      '<div class="modal-body">',
      '  <div class="modal-row"><span class="lbl">Anliegen</span><span class="val">' + esc(b.service_label) + '</span></div>',
      '  <div class="modal-row"><span class="lbl">Telefon</span><span class="val"><a href="tel:' + esc(b.phone) + '">' + esc(b.phone) + '</a></span></div>',
      '  <div class="modal-row"><span class="lbl">E-Mail</span><span class="val"><a href="mailto:' + esc(b.email) + '">' + esc(b.email) + '</a></span></div>',
      b.birth_date ? '  <div class="modal-row"><span class="lbl">Geburtsdatum</span><span class="val">' + esc(b.birth_date) + '</span></div>' : '',
      '  <div class="modal-row"><span class="lbl">Eingegangen</span><span class="val">' + esc(fmtDate(b.created_at)) + '</span></div>',
      '  <div class="modal-flags">' + flags.join('') + '</div>',
      b.notes ? '  <div class="modal-row" style="display:block"><span class="lbl" style="display:block;margin-bottom:6px">Anmerkungen</span><div class="val notes">' + esc(b.notes) + '</div></div>' : '',
      '</div>',
      '<div class="modal-actions">',
      '  <div class="quick-links">',
      '    <a class="icon-btn" href="tel:' + esc(b.phone) + '">📞 Anrufen</a>',
      '    <a class="icon-btn" href="mailto:' + esc(b.email) + '">✉ E-Mail</a>',
      '  </div>',
      '  <form method="POST" action="/api/admin/bookings">',
      '    <input type="hidden" name="ref" value="' + esc(b.ref) + '"/>',
      b.status !== 'confirmed' ? '    <button class="confirm" name="status" value="confirmed">✓ Bestätigen</button>' : '',
      b.status !== 'rescheduled' ? '    <button class="resched" name="status" value="rescheduled">↻ Verschoben</button>' : '',
      b.status !== 'cancelled' ? '    <button class="cancel" name="status" value="cancelled">✕ Absagen</button>' : '',
      b.status !== 'new' ? '    <button class="reset" name="status" value="new">↺ Zurücksetzen</button>' : '',
      '  </form>',
      '  <span class="ref">' + esc(b.ref) + '</span>',
      '  <form method="POST" action="/api/admin/bookings" class="resched-form">',
      '    <p class="hint">↻ Termin verschieben — Patient erhält automatisch eine E-Mail mit dem neuen Termin:</p>',
      '    <input type="hidden" name="ref" value="' + esc(b.ref) + '"/>',
      '    <input type="datetime-local" name="new_slot" value="' + esc(toLocalInput(b.preferred_date)) + '" required/>',
      '    <button class="resched" type="submit">Verschieben</button>',
      '  </form>',
      '</div>',
    ].filter(Boolean).join('');
  }

  function open(b){
    content.innerHTML = render(b);
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    setTimeout(() => content.querySelector('.close-btn')?.focus(), 30);
  }
  function close(){
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }
  window.__hfCloseModal = close;

  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.booking');
    if (btn) {
      try {
        const data = JSON.parse(btn.dataset.booking);
        open(data);
      } catch(err) { console.error('parse failed', err); }
      return;
    }
    if (e.target === overlay) close();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('open')) close();
  });
})();
</script>

</body></html>`;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!checkAuth(req)) {
    res.setHeader("WWW-Authenticate", 'Basic realm="Healthy Feet Admin", charset="UTF-8"');
    return res.status(401).send("Authentication required");
  }
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).send("method_not_allowed");
  }

  const sql = getSql();
  try {
    const rows = (await sql`
      SELECT id, ref, status, service, insurance, is_first_visit, has_diabetes,
             preferred_date::text AS preferred_date, time_slot, flexibility,
             name, phone, email, birth_date, notes, lang, ip, user_agent,
             email_sent_at, created_at, updated_at
      FROM bookings
      ORDER BY preferred_date
      LIMIT 1000
    `) as unknown as DbBookingRow[];

    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.setHeader("Cache-Control", "private, no-store");
    return res.status(200).send(renderPage(rows));
  } catch (e) {
    console.error("[admin/calendar] error", e);
    return res.status(500).send("server_error");
  }
}
