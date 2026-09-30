// Phase 3 checks against the built site: axe (WCAG 2.2 AA) on every page, internal link check,
// one <h1> per page, title/description lengths. Usage: node scripts/check.mjs (preview must be running)
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import fs from 'node:fs';
const base = process.env.BASE || 'http://localhost:4321';
const walk = d => fs.readdirSync(d, { withFileTypes: true }).flatMap(e => e.isDirectory() ? walk(`${d}/${e.name}`) : e.name.endsWith('.html') ? [`${d}/${e.name}`] : []);
const routes = walk('dist').filter(f => !f.includes('/admin/') && !fs.readFileSync(f, 'utf8').includes('http-equiv="refresh"')).map(f => f.slice(4).replace(/\.html$/, '').replace(/\/index$/, '/').replace(/^$/, '/')).map(r => r === '/index' ? '/' : r);
const b = await chromium.launch();
const p = await (await b.newContext({ viewport: { width: 390, height: 844 } })).newPage();
const links = new Set(); let problems = 0;
for (const r of routes) {
  await p.goto(base + r, { waitUntil: 'load' });
  const res = await new AxeBuilder({ page: p }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice']).analyze();
  for (const v of res.violations) { problems++; console.log(`AXE ${r}: ${v.id} (${v.impact}) ×${v.nodes.length} — ${v.nodes[0].target.join(' ')}`); }
  const info = await p.evaluate(() => ({ h1: document.querySelectorAll('h1').length, title: document.title, desc: document.querySelector('meta[name=description]')?.content || '', hrefs: [...document.querySelectorAll('a[href]')].map(a => a.getAttribute('href')) }));
  if (info.h1 !== 1) { problems++; console.log(`H1 ${r}: ${info.h1}`); }
  if (info.title.length > 60) { problems++; console.log(`TITLE ${r}: ${info.title.length} "${info.title}"`); }
  if (!info.desc || info.desc.length > 155) { problems++; console.log(`DESC ${r}: ${info.desc.length}`); }
  info.hrefs.filter(h => h.startsWith('/') && !h.startsWith('//')).forEach(h => links.add(h.split('#')[0] || r));
}
for (const l of links) {
  const s = (await p.request.get(base + l, { maxRedirects: 0 })).status();
  if (s !== 200) { problems++; console.log(`LINK ${l}: ${s}`); }
}
console.log(`${routes.length} pages, ${links.size} internal links, ${problems} problems`);
await b.close();
