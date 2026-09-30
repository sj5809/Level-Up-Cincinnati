// One-off: pull the legal pages' structure (headings, paragraphs, lists, links) as clean HTML.
import { chromium } from 'playwright';
import fs from 'node:fs';
const b = await chromium.launch(); const p = await b.newPage();
for (const slug of ['privacy-policy', 'terms-of-use']) {
  await p.goto(`https://www.levelupcincinnati.org/${slug}`, { waitUntil: 'networkidle' });
  const html = await p.evaluate(() => {
    const main = document.querySelector('main') || document.body;
    const clean = el => {
      let out = '';
      for (const n of el.childNodes) {
        if (n.nodeType === 3) { out += n.textContent.replace(/[<>&]/g, c => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' })[c]); continue; }
        if (n.nodeType !== 1) continue;
        const t = n.tagName.toLowerCase();
        if (['script', 'style', 'noscript', 'svg', 'img', 'button', 'form'].includes(t)) continue;
        const inner = clean(n);
        if (t === 'a') out += `<a href="${n.href}">${inner}</a>`;
        else if (['strong', 'b', 'em', 'i', 'br'].includes(t)) out += t === 'br' ? '<br>' : `<${t}>${inner}</${t}>`;
        else if (['p', 'li', 'ul', 'ol', 'h1', 'h2', 'h3', 'h4'].includes(t)) out += `\n<${t}>${inner.trim()}</${t}>`;
        else out += inner;
      }
      return out;
    };
    return clean(main);
  });
  const body = html.split('\n').map(s => s.trim()).filter(s => s && !/^<(p|li)><\/(p|li)>$/.test(s)).join('\n')
    .replace(/<h1>.*?<\/h1>\n?/, '')
    .replace(/<p>(?:<strong>)?(\d+\.)\s*([A-Z][A-Z ,;&’'()\/-]{3,})(?:<\/strong>)?<\/p>/g, '<h2>$1 $2</h2>') // numbered ALL-CAPS section titles
    .replace(/<p>TERMS OF USE<\/p>\n?/, '')
    .replace(/<h4>/g, '<h3>').replace(/<\/h4>/g, '</h3>');
  fs.writeFileSync(`src/content/legal/${slug}.html`, body + '\n');
  console.log(slug, body.length, (body.match(/<h2>/g) || []).length, 'h2');
}
await b.close();
