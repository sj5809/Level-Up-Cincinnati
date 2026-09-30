import { chromium } from 'playwright';
const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1280, height: 900 } });
await p.goto('https://www.levelupcincinnati.org/', { waitUntil: 'networkidle' });
const r = await p.evaluate(() => {
  const colors = {}, fonts = {}, bump = (o, k, n = 1) => k && (o[k] = (o[k] || 0) + n);
  for (const e of document.querySelectorAll('body *')) {
    const s = getComputedStyle(e); const area = e.offsetWidth * e.offsetHeight;
    if (s.backgroundColor !== 'rgba(0, 0, 0, 0)') bump(colors, 'bg ' + s.backgroundColor, area);
    if (e.childNodes[0]?.nodeType === 3 && e.textContent.trim()) { bump(colors, 'fg ' + s.color); bump(fonts, s.fontFamily.split(',')[0] + ' ' + s.fontWeight); }
  }
  const cssVars = [...document.styleSheets].flatMap(ss => { try { return [...ss.cssRules] } catch { return [] } })
    .filter(r => r.selectorText === ':root').map(r => r.cssText.match(/--[\w-]+:\s*[^;]+/g)).flat().filter(Boolean).filter(v => /#|rgb|hsl/.test(v)).slice(0, 40);
  const logo = document.querySelector('header img, .header-title-logo img'); const btn = document.querySelector('a[href*="become-a-coach"]');
  return { colors: Object.entries(colors).sort((a, c) => c[1] - a[1]).slice(0, 14), fonts: Object.entries(fonts).sort((a, c) => c[1] - a[1]).slice(0, 8),
    fontFaces: [...document.fonts].map(f => f.family + ' ' + f.weight + ' ' + f.status).filter((v, i, a) => a.indexOf(v) === i),
    logo: logo && { src: logo.src, alt: logo.alt }, ctaBtn: btn && (s => ({ bg: s.backgroundColor, fg: s.color }))(getComputedStyle(btn)), cssVars };
});
console.log(JSON.stringify(r, null, 1)); await b.close();
