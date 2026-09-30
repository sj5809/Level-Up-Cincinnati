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
