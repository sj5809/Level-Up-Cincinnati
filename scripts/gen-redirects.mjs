// GitHub Pages has no server-side redirects, so after `astro build` this writes a tiny
// instant-redirect page at every old Squarespace URL (Google treats these like 301s,
// helped by the canonical link). Profile moves stay in sync with src/data.
import fs from 'node:fs';
import path from 'node:path';
const read = f => JSON.parse(fs.readFileSync(`src/data/${f}.json`, 'utf8')).people;
const site = JSON.parse(fs.readFileSync('src/data/site.json', 'utf8'));
const origin = 'https://www.levelupcincinnati.org';
export const rules = [
  ['/about', '/our-vision'], ['/home', '/'], ['/cart', '/'], ['/prog-dash', '/'], ['/app-1', '/'], ['/custom-404-page', '/'],
  ['/volunteer', site.volunteerUrl], ['/join-the-network-archive', '/join-the-network'], ['/coach-profiles', '/coaches'],
  ['/level-up-coaches-directory', '/coaches'], ['/level-up-scholar-directory-blog', '/scholars'],
  ...['Finance', 'Healthcare', 'Information+Technology', 'Insurance', 'Manufacturing'].map(c => [`/level-up-coaches-directory/category/${c}`, '/coaches']),
  ...['2023+Cohort', '2024+Cohort', 'Current+Coach'].map(t => [`/level-up-coaches-directory/tag/${t}`, '/coaches']),
  ...['Alumni+Scholar', 'Current+Scholar'].map(t => [`/level-up-scholar-directory-blog/tag/${t}`, '/scholars']),
  ...read('coaches').filter(c => c.oldUrl).map(c => [c.oldUrl, `/coaches/${c.slug}`]),
  ...read('scholars').filter(s => s.oldUrl).map(s => [s.oldUrl, `/scholars/${s.slug}`]),
];
const page = to => {
  const abs = to.startsWith('http') ? to : origin + to;
  return `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><title>Page moved — Level Up Cincinnati</title><link rel="canonical" href="${abs}"><meta http-equiv="refresh" content="0; url=${to}"></head><body><p>This page has moved to <a href="${to}">${abs}</a>.</p></body></html>\n`;
};
if (process.argv[1].endsWith('gen-redirects.mjs')) {
  let n = 0;
  for (const [from, to] of rules) {
    const file = path.join('dist', `${from}.html`);
    if (fs.existsSync(file)) throw new Error(`Redirect would overwrite a real page: ${file}`);
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, page(to)); n++;
  }
  console.log(`redirect pages: ${n}`);
}
