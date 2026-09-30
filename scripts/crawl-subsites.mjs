// Phase 0b: capture the subdomain sites (coach deck slide-by-slide, volunteer sub-pages) with images.
import { chromium } from 'playwright';
import fs from 'node:fs';
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1280, height: 900 } });
const grab = () => p.evaluate(() => ({
  url: location.href, title: document.title,
  text: document.body.innerText,
  headings: [...document.querySelectorAll('h1,h2,h3,h4')].map(h => h.tagName + ': ' + h.innerText.trim()),
  images: [...document.querySelectorAll('img')].map(i => ({ src: i.currentSrc || i.src, alt: i.alt })).concat([...document.querySelectorAll('*')].map(e => getComputedStyle(e).backgroundImage).filter(b => b.startsWith('url(')).map(b => ({ src: b.slice(5, -2), alt: '(bg)' }))),
  links: [...document.querySelectorAll('a[href]')].map(a => ({ text: a.innerText.trim(), href: a.href })),
  forms: [...document.querySelectorAll('form')].map(f => ({ action: f.action, fields: [...f.elements].map(e => `${e.tagName.toLowerCase()}[${e.type || ''}] name=${e.name} label=${e.labels?.[0]?.innerText || e.placeholder || ''}${e.options ? ' options=' + [...e.options].map(o => o.text).join('|') : ''}`) })),
}));
// Coach deck: step through all slides.
await p.goto('https://coach.levelupcincinnati.org/', { waitUntil: 'networkidle' });
const slides = [];
for (let i = 0; i < 14; i++) {
  await p.waitForTimeout(900);
  const s = await p.evaluate(() => {
    const vis = [...document.querySelectorAll('section, [class*=slide]')].filter(e => { const r = e.getBoundingClientRect(); return r.width > 300 && r.left >= -5 && r.left < 50 && getComputedStyle(e).visibility !== 'hidden' && getComputedStyle(e).opacity !== '0'; });
    const el = vis.sort((a, b) => b.innerText.length - a.innerText.length)[0] || document.body;
    return { text: el.innerText, images: [...el.querySelectorAll('img')].map(i => ({ src: i.currentSrc || i.src, alt: i.alt })), bg: [...el.querySelectorAll('*')].map(e => getComputedStyle(e).backgroundImage).filter(b => b.startsWith('url(')).map(b => b.slice(5, -2)), links: [...el.querySelectorAll('a[href]')].map(a => ({ text: a.innerText.trim(), href: a.href })), hash: location.hash };
  });
  await p.screenshot({ path: `content/raw/subsites/coach-slide-${String(i + 1).padStart(2, '0')}.png` });
  slides.push(s);
  await p.keyboard.press('ArrowRight');
}
fs.writeFileSync('content/raw/subsites/coach-deck.json', JSON.stringify(slides, null, 2));
console.log('coach slides', slides.length, slides.map(s => s.text.split('\n')[0].slice(0, 40)).join(' | '));
// Volunteer sub-pages
const vol = {};
for (const path of ['/', '/past', '/pool', '/events/pd-day-2026']) {
  await p.goto('https://volunteer.levelupcincinnati.org' + path, { waitUntil: 'networkidle' });
  await p.waitForTimeout(800);
  vol[path] = await grab();
  // any further event detail links
  for (const l of vol[path].links) { const u = new URL(l.href); if (u.host.startsWith('volunteer') && u.pathname.startsWith('/events/') && !vol[u.pathname]) vol[u.pathname] = null; }
}
for (const path of Object.keys(vol).filter(k => !vol[k])) { await p.goto('https://volunteer.levelupcincinnati.org' + path, { waitUntil: 'networkidle' }); await p.waitForTimeout(800); vol[path] = await grab(); }
fs.writeFileSync('content/raw/subsites/volunteer.json', JSON.stringify(vol, null, 2));
console.log('volunteer pages', Object.keys(vol));
// Impact + AI full captures (fresh, with forms)
for (const [k, u] of [['impact', 'https://impact.levelupcincinnati.org/'], ['ai', 'https://ai.levelupcincinnati.org/']]) {
  await p.goto(u, { waitUntil: 'networkidle' });
  for (let y = 0; y < 30000; y += 700) { await p.evaluate(y => scrollTo(0, y), y); await p.waitForTimeout(80); }
  await p.waitForTimeout(1200);
  fs.writeFileSync(`content/raw/subsites/${k}.json`, JSON.stringify(await grab(), null, 2));
  await p.screenshot({ path: `content/raw/subsites/${k}-full.png`, fullPage: true });
}
await b.close();
