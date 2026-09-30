// Phase 0 capture: text, headings, links, images, meta for each URL (JS-rendered via Playwright).
import { chromium } from 'playwright';
import fs from 'node:fs';
const urls = fs.readFileSync('scripts/crawl-urls.txt', 'utf8').trim().split('\n');
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true });
const index = [];
for (const url of urls) {
  const page = await ctx.newPage();
  let status = 0;
  try {
    const res = await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
    status = res?.status() ?? 0;
    // scroll to trigger lazy images and count-up stats
    await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 400) { scrollTo(0, y); await new Promise(r => setTimeout(r, 120)); } });
    await page.waitForTimeout(1500);
    const data = await page.evaluate(() => {
      const meta = n => document.querySelector(`meta[name="${n}"],meta[property="${n}"]`)?.content ?? null;
      return {
        finalUrl: location.href,
        title: document.title,
        description: meta('description'),
        canonical: document.querySelector('link[rel=canonical]')?.href ?? null,
        og: { title: meta('og:title'), description: meta('og:description'), image: meta('og:image') },
        headings: [...document.querySelectorAll('h1,h2,h3,h4')].map(h => ({ level: h.tagName, text: h.innerText.trim() })).filter(h => h.text),
        links: [...document.querySelectorAll('a[href]')].map(a => ({ text: a.innerText.trim(), aria: a.getAttribute('aria-label'), href: a.href })),
        images: [...document.querySelectorAll('img')].map(i => ({ src: i.currentSrc || i.src, dataSrc: i.dataset.src || i.dataset.image || null, alt: i.alt, w: i.naturalWidth, h: i.naturalHeight, hasDims: i.hasAttribute('width') && i.hasAttribute('height') })),
        bgImages: [...document.querySelectorAll('*')].map(e => getComputedStyle(e).backgroundImage).filter(b => b.startsWith('url(')),
        iframes: [...document.querySelectorAll('iframe')].map(f => f.src),
        scripts: [...document.querySelectorAll('script[src]')].map(s => s.src),
        jsonld: [...document.querySelectorAll('script[type="application/ld+json"]')].map(s => s.textContent),
        text: document.body.innerText,
      };
    });
    const rawHtml = await (await fetch(url)).text().catch(() => '');
    const slug = new URL(url).host.split('.')[0] + (new URL(url).pathname.replace(/\/$/, '').replace(/\//g, '__') || '__index');
    fs.writeFileSync(`content/raw/${slug}.json`, JSON.stringify({ url, status, ...data }, null, 2));
    fs.writeFileSync(`content/raw/${slug}.txt`, data.text);
    fs.writeFileSync(`content/raw/${slug}.server.html`, rawHtml);
    index.push({ url, status, finalUrl: data.finalUrl, slug, title: data.title, description: data.description, h1: data.headings.filter(h => h.level === 'H1').map(h => h.text), images: data.images.length, scripts: data.scripts.length });
    console.log(status, url, '->', data.finalUrl);
  } catch (e) { console.log('ERR', url, e.message); index.push({ url, error: e.message }); }
  await page.close();
}
fs.writeFileSync('content/raw/_index.json', JSON.stringify(index, null, 2));
await browser.close();
