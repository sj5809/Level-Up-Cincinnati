// Median-of-N summary for one page, plus any audit that cost points.
import fs from 'node:fs';
const [prefix, runs, path] = process.argv.slice(2);
const reps = [...Array(+runs).keys()].map(i => JSON.parse(fs.readFileSync(`${prefix}.${i + 1}.json`, 'utf8')));
const med = a => a.sort((x, y) => x - y)[Math.floor(a.length / 2)];
const cats = ['performance', 'accessibility', 'best-practices', 'seo'];
const s = cats.map(c => med(reps.map(r => Math.round(r.categories[c].score * 100))));
const m = k => med(reps.map(r => r.audits[k].numericValue));
console.log([path.padEnd(42), ...s, `LCP ${(m('largest-contentful-paint') / 1000).toFixed(2)}s`, `FCP ${(m('first-contentful-paint') / 1000).toFixed(2)}s`, `TBT ${Math.round(m('total-blocking-time'))}ms`, `CLS ${m('cumulative-layout-shift').toFixed(3)}`, `${Math.round(m('total-byte-weight') / 1024)}KiB`, `${med(reps.map(r => r.audits['network-requests'].details.items.length))}req`].join('\t'));
const r = reps[0];
for (const c of cats) for (const ref of r.categories[c].auditRefs) { const a = r.audits[ref.id]; if (ref.weight > 0 && a.score !== null && a.score < 1) console.log(`   - ${c}: ${ref.id} (${a.score}) ${a.displayValue || ''}`); }
