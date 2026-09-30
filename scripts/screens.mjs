// Full-page screenshots at 360/390/768/1280 for review; also flags horizontal overflow.
import { chromium } from 'playwright';
import fs from 'node:fs';
const base = process.env.BASE || 'http://localhost:4321';
const pages = (process.argv[2] || '/').split(',');
const widths = (process.env.WIDTHS || '360,390,768,1280').split(',').map(Number);
const b = await chromium.launch();
for (const w of widths) {
  const ctx = await b.newContext({ viewport: { width: w, height: 800 }, deviceScaleFactor: 1 });
  const p = await ctx.newPage();
  for (const path of pages) {
    await p.goto(base + path, { waitUntil: 'networkidle' });
    await p.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 600) { scrollTo(0, y); await new Promise(r => setTimeout(r, 50)); } scrollTo(0, 0); });
    const over = await p.evaluate(() => document.documentElement.scrollWidth - innerWidth);
    const name = (path === '/' ? 'home' : path.slice(1).replace(/\//g, '__')) + `-${w}.png`;
    await p.screenshot({ path: `audit/screens/${name}`, fullPage: true });
    if (over > 0) console.log(`OVERFLOW ${over}px ${path} @${w}`);
  }
  await ctx.close();
}
await b.close();
console.log('done');
