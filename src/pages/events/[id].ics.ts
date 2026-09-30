// One downloadable calendar file per dated event: /events/<id>.ics
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { calendarInfo } from '../../lib/events';

export async function getStaticPaths() {
  return (await getCollection('events')).filter(e => e.data.date).map(e => ({ params: { id: e.id }, props: { e } }));
}
export const GET: APIRoute = ({ props, site }) =>
  new Response(calendarInfo(props.e, site!)!.ics, { headers: { 'Content-Type': 'text/calendar; charset=utf-8' } });
