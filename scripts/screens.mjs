// Full-page screenshots at 360/390/768/1280 for review; also flags horizontal overflow.
import { chromium } from 'playwright';
import fs from 'node:fs';
const base = process.env.BASE || 'http://localhost:4321';
const pages = (process.argv[2] || '/').split(',');
const widths = (process.env.WIDTHS || '360,390,768,1280').split(',').map(Number);
const b = await chromium.launch();
for (const w of widths) {
  const ctx = await b.newContext({ viewport: { width: w, height: 800 }, deviceScaleFactor: 1, reducedMotion: 'reduce' }); // show all content in full-page shots
  const p = await ctx.newPage();
  for (const path of pages) {
    await p.goto(base + path, { waitUntil: 'networkidle' });
    await p.evaluate(() => document.querySelectorAll('img[loading=lazy]').forEach(i => (i.loading = 'eager')));
    await p.waitForLoadState('networkidle').catch(() => {});
    await p.evaluate(() => Promise.race([Promise.all([...document.images].map(i => i.complete || new Promise(r => (i.onload = i.onerror = r)))), new Promise(r => setTimeout(r, 5000))]));
    const over = await p.evaluate(() => document.documentElement.scrollWidth - innerWidth);
    const name = (path === '/' ? 'home' : path.slice(1).replace(/\//g, '__')) + `-${w}.png`;
    await p.screenshot({ path: `audit/screens/${name}`, fullPage: true });
    if (over > 0) console.log(`OVERFLOW ${over}px ${path} @${w}`);
  }
  await ctx.close();
}
await b.close();
console.log('done');
