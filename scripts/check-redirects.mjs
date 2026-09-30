// Every URL the old site exposed must be a real page in dist/ or a redirect page whose target is real.
import fs from 'node:fs';
const old = [...fs.readFileSync('audit/sitemap-live.xml', 'utf8').matchAll(/<loc>https:\/\/www\.levelupcincinnati\.org([^<]*)<\/loc>/g)].map(m => m[1] || '/')
  .concat(['/about', '/events', '/home', '/cart', '/volunteer', '/join-the-network', '/prog-dash', '/app-1', '/custom-404-page']);
const file = p => p === '/' ? 'dist/index.html' : [`dist${p}.html`, `dist${p}/index.html`].find(f => fs.existsSync(f));
let bad = 0;
for (const u of [...new Set(old)]) {
  const f = file(u);
  const target = f && fs.readFileSync(f, 'utf8').match(/http-equiv="refresh" content="0; url=([^"]+)"/)?.[1];
  const ok = !!f && (!target || target.startsWith('http') || !!file(target));
  if (!ok) bad++;
  if (!ok || process.env.VERBOSE) console.log(`${ok ? 'ok ' : 'BAD'} ${u}${target ? ` -> ${target}` : ''}`);
}
console.log(`${new Set(old).size} old URLs checked, ${bad} broken`);
