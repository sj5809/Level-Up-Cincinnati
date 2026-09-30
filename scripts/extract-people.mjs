// One-off: turn crawled text/links/images into structured JSON data for src/data.
import fs from 'node:fs';
const raw = f => JSON.parse(fs.readFileSync(`content/raw/www__${f}.json`, 'utf8'));
const manifest = JSON.parse(fs.readFileSync('content/images/_manifest.json', 'utf8'));
const fileFor = src => { const base = (src || '').split('?')[0]; return manifest.find(m => m.url === base)?.file; };
const slug = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[“”".]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const fixLinkedIn = u => !u ? null : u.replace(/^https:\/\/www\.levelupcincinnati\.org\/LinkedIn\.com/i, 'https://www.linkedin.com').replace(/^http:\/\//, 'https://').replace(/\?.*$/, '');
const block = (text, start, end) => { const a = text.indexOf(start) + start.length; return text.slice(a, text.indexOf(end, a)); };

// --- Coach roster (become-a-coach, 36 people) ---
{
  const d = raw('become-a-coach');
  const lines = block(d.text, 'coach with Level Up today.\n\n‹\n', 'There’s a spot for you').split('\n').map(s => s.trim()).filter(Boolean);
  const out = []; let cur;
  for (const l of lines) {
    if (l === 'LinkedIn' || /^[A-Z]{1,2}$/.test(l)) continue;
    if (!cur || cur.company) { cur = { name: l }; out.push(cur); } else if (!cur.title) cur.title = l; else cur.company = l;
  }
  for (const c of out) {
    const img = d.images.find(i => i.alt === c.name); c.photo = img ? fileFor(img.src) : null;
    const a = d.links.find(l => l.text.startsWith(c.name) && /linkedin/i.test(l.href)); c.linkedin = fixLinkedIn(a?.href);
  }
  fs.writeFileSync('src/data/coach-roster.json', JSON.stringify(out, null, 2)); console.log('roster', out.length);
}
// --- Coach directory (coach-profiles, 19 people) ---
{
  const d = raw('coach-profiles');
  const lines = block(d.text, '2023 Cohort\nLaunch Network\n\n', '\nOur Vision').split('\n').map(s => s.trim()).filter(Boolean);
  const out = []; let cur = null;
  for (const l of lines) {
    if (/^Current Coach|Cohort$/.test(l)) { cur.tags = l.split(',').map(s => s.trim()); cur = null; continue; }
    if (l.includes('@')) { cur.email = l; continue; }
    if (!cur) { cur = { name: l, info: [] }; out.push(cur); } else cur.info.push(l);
  }
  const dir = raw('level-up-coaches-directory');
  for (const c of out) {
    [c.title, c.company] = c.info; delete c.info;
    const img = dir.images.find(i => i.alt === c.name || (c.name === 'Perry Washington' && i.alt === 'Perry Washburn') || (c.name === 'Josh Wierzba' && i.alt === 'Joshua Wierzba'));
    c.photo = img ? fileFor(img.dataSrc || img.src) : null;
    const a = d.links.find(l => /linkedin/.test(l.href) && (l.text === c.name || l.text.split(' ')[1] === c.name.split(' ')[1])); c.linkedin = fixLinkedIn(a?.href);
    const old = d.links.find(l => l.text === c.name && l.href.includes('/level-up-coaches-directory/')); c.oldUrl = old ? new URL(old.href).pathname : null;
    c.slug = slug(c.name === 'Perry Washington' ? 'Perry Washburn' : c.name);
  }
  fs.writeFileSync('src/data/coaches.json', JSON.stringify(out, null, 2)); console.log('coaches', out.length, out.filter(c => !c.photo).map(c => c.name));
}
// --- Scholar roster (students, 35 people) ---
{
  const d = raw('students');
  const lines = block(d.text, 'leveling up right now.\n\n‹\n', 'Rooting for them?').split('\n').map(s => s.trim()).filter(Boolean);
  const out = []; let cur;
  for (const l of lines) {
    if (l === 'LinkedIn' || /^[A-Z]$/.test(l)) continue;
    if (/^Class of/.test(l)) { cur.classOf = +l.slice(-4); cur = null; continue; }
    if (!cur) { cur = { name: l }; out.push(cur); } else cur.major = l;
  }
  for (const c of out) {
    const img = d.images.find(i => i.alt === `${c.name}, Level Up Scholar` && i.src.includes('firebase')); c.photo = img ? fileFor(img.src) : null;
    const a = d.links.find(l => l.text.startsWith(c.name) && /linkedin/i.test(l.href)) || d.links.find(l => /linkedin/i.test(l.href) && l.text.replace(/^A\s+/, '').startsWith(c.name)); c.linkedin = fixLinkedIn(a?.href);
  }
  fs.writeFileSync('src/data/scholar-roster.json', JSON.stringify(out, null, 2)); console.log('scholar roster', out.length, out.filter(c => !c.photo).map(c => c.name));
}
// --- Scholar directory (20 profile pages) ---
{
  const d = raw('level-up-scholar-directory-blog');
  const out = [];
  for (const l of d.links.filter(l => /\/level-up-scholar-directory-blog\/(?!tag)/.test(l.href) && l.text && !l.text.includes('\n'))) {
    if (out.find(o => o.oldUrl === new URL(l.href).pathname)) continue;
    const slugOld = new URL(l.href).pathname.split('/').pop();
    const p = raw(`level-up-scholar-directory-blog__${slugOld}`);
    const after = p.text.slice(p.text.indexOf(`${l.text}\n`) + l.text.length + 1);
    const body = after.slice(0, after.search(/\n(Previous|Next)\n/)).split('\n').map(s => s.trim()).filter(Boolean);
    const [, ...rest0] = body; const tag = rest0.find(x => /Scholar$/.test(x)); const rest = rest0.filter(x => x !== tag && x !== 'LinkedIn');
    const img = d.images.find(i => i.alt === l.text);
    const li = p.links.find(x => /linkedin/i.test(x.href) && !/level-up-cincinnati/.test(x.href));
    out.push({ name: l.text, slug: slug(l.text), details: rest, tag, photo: img ? fileFor(img.dataSrc || img.src) : null, linkedin: fixLinkedIn(li?.href), oldUrl: new URL(l.href).pathname });
  }
  fs.writeFileSync('src/data/scholars.json', JSON.stringify(out, null, 2)); console.log('scholars', out.length);
}
