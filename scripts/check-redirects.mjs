// Simulates Netlify _redirects (first match wins, * splat) for every URL the old site exposed,
// and confirms each one lands on a page that exists in dist/ (or on an external subdomain).
import fs from 'node:fs';
const rules = fs.readFileSync('public/_redirects', 'utf8').trim().split('\n').map(l => l.trim().split(/\s+/));
const old = [...fs.readFileSync('audit/sitemap-live.xml', 'utf8').matchAll(/<loc>https:\/\/www\.levelupcincinnati\.org([^<]*)<\/loc>/g)].map(m => m[1] || '/')
  .concat(['/about', '/events', '/home', '/cart', '/volunteer', '/join-the-network', '/prog-dash', '/app-1', '/custom-404-page']);
const exists = p => p.startsWith('http') || ['', '/index'].includes(p.replace(/\/$/, '')) || fs.existsSync(`dist${p}.html`) || fs.existsSync(`dist${p}/index.html`);
let bad = 0;
for (const u of [...new Set(old)]) {
  const path = decodeURIComponent(u);
  const r = rules.find(([from]) => from.endsWith('/*') ? path.startsWith(from.slice(0, -1)) : from === path || from === u);
  const dest = r ? r[1] : path;
  const ok = exists(dest);
  if (!ok) bad++;
  if (!ok || process.env.VERBOSE) console.log(`${ok ? 'ok ' : 'BAD'} ${u} -> ${dest}${r ? ` (${r[2]})` : ' (same URL)'}`);
}
console.log(`${new Set(old).size} old URLs checked, ${bad} broken`);
