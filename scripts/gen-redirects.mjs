// Writes public/_redirects (Netlify) so every old Squarespace URL 301s to its new home.
// Runs before each build, so coach/scholar profile moves stay in sync with src/data.
import fs from 'node:fs';
const read = f => JSON.parse(fs.readFileSync(`src/data/${f}.json`, 'utf8')).people;
const site = JSON.parse(fs.readFileSync('src/data/site.json', 'utf8'));
const rules = [
  ['/about', '/our-vision'],
  ['/home', '/'],
  ['/cart', '/'],
  ['/prog-dash', '/'],
  ['/app-1', '/'],
  ['/custom-404-page', '/'],
  ['/volunteer', site.volunteerUrl],
  ['/join-the-network-archive', '/join-the-network'],
  ['/coach-profiles', '/coaches'],
  ['/level-up-coaches-directory', '/coaches'],
  ['/level-up-scholar-directory-blog', '/scholars'],
];
for (const c of read('coaches')) if (c.oldUrl) rules.push([c.oldUrl, `/coaches/${c.slug}`]);
for (const s of read('scholars')) if (s.oldUrl) rules.push([s.oldUrl, `/scholars/${s.slug}`]);
rules.push(['/level-up-coaches-directory/*', '/coaches'], ['/level-up-scholar-directory-blog/*', '/scholars']);
fs.writeFileSync('public/_redirects', rules.map(([from, to]) => `${from}  ${to}  301`).join('\n') + '\n');
console.log(`_redirects: ${rules.length} rules`);
