import { getCollection, type CollectionEntry } from 'astro:content';

export type Ev = CollectionEntry<'events'>;
// Dates are calendar days; an event stays "upcoming" through the end of its day (Eastern).
const dayKey = (d: Date) => d.toISOString().slice(0, 10);
const todayKey = () => new Date(Date.now() - 5 * 3600e3).toISOString().slice(0, 10);

export async function getEvents() {
  const all = await getCollection('events');
  const today = todayKey();
  const dated = all.filter(e => e.data.date).sort((a, b) => +a.data.date! - +b.data.date!);
  return {
    upcoming: dated.filter(e => dayKey(e.data.date!) >= today),
    past: dated.filter(e => dayKey(e.data.date!) < today).reverse(),
    undated: all.filter(e => !e.data.date),
    all,
  };
}

export const fmt = (d: Date, opts: Intl.DateTimeFormatOptions) => d.toLocaleDateString('en-US', { timeZone: 'UTC', ...opts });

export function eventJsonLd(e: Ev, site: URL) {
  const d = e.data;
  if (!d.date || !d.location) return null; // Google requires a location for Event results
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: d.title,
    description: d.summary,
    startDate: dayKey(d.date),
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    location: d.location ? { '@type': 'Place', name: d.location, address: d.address ?? d.location } : undefined,
    organizer: { '@type': 'Organization', name: 'Level Up Cincinnati', url: site.href },
    url: new URL(d.page ?? '/events', site).href,
    ...(d.registerUrl ? { offers: { '@type': 'Offer', url: d.registerUrl, price: 0, priceCurrency: 'USD', availability: 'https://schema.org/InStock' } } : {}),
  };
}

// --- Calendar helpers (Add to calendar + countdown) ---
const pad = (n: number) => String(n).padStart(2, '0');
// "11:30 a.m.–1:30 p.m." → [[11,30],[13,30]]
const times = (s = '') => [...s.matchAll(/(\d{1,2}):(\d{2})\s*([ap])\.?\s*m\.?/gi)].map(m => [(+m[1] % 12) + (m[3].toLowerCase() === 'p' ? 12 : 0), +m[2]]);

export function calendarInfo(e: Ev, site: URL) {
  const d = e.data;
  if (!d.date) return null;
  const day = dayKey(d.date).replace(/-/g, '');
  const t = times(d.time);
  const next = new Date(d.date.getTime() + 864e5).toISOString().slice(0, 10).replace(/-/g, '');
  const [start, end] = t.length >= 2 ? [`${day}T${pad(t[0][0])}${pad(t[0][1])}00`, `${day}T${pad(t[1][0])}${pad(t[1][1])}00`] : [day, next];
  const where = [d.location, d.address].filter(Boolean).join(', ');
  const url = new URL(d.page ?? '/events', site).href;
  const details = `${d.summary}\n\n${d.registerUrl ? `Register: ${d.registerUrl}\n` : ''}Details: ${url}`;
  const google = 'https://calendar.google.com/calendar/render?' + new URLSearchParams({ action: 'TEMPLATE', text: d.title, dates: `${start}/${end}`, ctz: 'America/New_York', details, location: where }).toString();
  const esc = (s: string) => s.replace(/[\;,]/g, m => '\\' + m).replace(/\n/g, '\\n');
  const timed = t.length >= 2;
  const ics = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Level Up Cincinnati//Events//EN', 'CALSCALE:GREGORIAN', 'BEGIN:VEVENT',
    `UID:${e.id}@levelupcincinnati.org`, `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').slice(0, 15)}Z`,
    timed ? `DTSTART;TZID=America/New_York:${start}` : `DTSTART;VALUE=DATE:${start}`,
    timed ? `DTEND;TZID=America/New_York:${end}` : `DTEND;VALUE=DATE:${end}`,
    `SUMMARY:${esc(d.title)}`, `DESCRIPTION:${esc(details)}`, ...(where ? [`LOCATION:${esc(where)}`] : []), `URL:${url}`,
    'END:VEVENT', 'END:VCALENDAR'].join('\r\n') + '\r\n';
  return { google, ics, icsPath: `/events/${e.id}.ics` };
}

// "Today" / "Tomorrow" / "In 12 days" (kept fresh by the daily rebuild).
export function countdown(e: Ev) {
  if (!e.data.date) return null;
  const days = Math.round((Date.parse(dayKey(e.data.date)) - Date.parse(todayKey())) / 864e5);
  return days < 0 || days > 90 ? null : days === 0 ? 'Today' : days === 1 ? 'Tomorrow' : `In ${days} days`;
}
