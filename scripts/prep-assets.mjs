// One-off: copy chosen originals from content/images into src/assets with clean names,
// capped at 1600px (people at 480px) so Astro's build stays fast. Rewrites photo fields in src/data.
import fs from 'node:fs';
import sharp from 'sharp';
const files = fs.readdirSync('content/images');
const byId = id => files.find(f => f.startsWith(id + '-'));
const img = {
  'logo-white': '068', 'logo-light': '184', 'logo-navy': '052',
  'home-hero': '013', 'home-pair': '027', 'home-pd-day': '030', 'home-moment': '042', 'home-women': '169',
  'home-tricia-stephanie': '170', 'home-coaching': '171', 'home-networking': '172',
  'vision-mike-early': '053', 'vision-mike-jerod-downtown': '054', 'vision-jerod-mike': '055', 'vision-jim-jerod': '056', 'vision-founders': '057',
  'founder-mike': '058', 'founder-jerod': '059', 'founder-jim': '060',
  'team-jim': '201', 'team-jerod': '202', 'board-mike': '203', 'board-rene': '204', 'board-paul': '205', 'board-kathy': '206', 'board-elena': '207',
  'board-jordan': '208', 'board-greg': '209', 'board-brendan': '210', 'board-kyle': '211', 'team-board-match-day': '212',
  'coach-nick-stuart': '087', 'coach-working': '088', 'coach-video-call': '089', 'coach-meetup': '090', 'coach-match-day-2025': '126',
  'coach-elena-martha': '127', 'coach-transition': '128', 'coach-career': '129', 'coach-group': '133', 'coach-cohort-2023': '134',
  'network-thumbs-up': '177', 'network-career-coach': '181', 'network-meeting': '182', 'network-connecting': '183',
  'students-hero': '213', 'students-ndeye': '071',
  'afo-hero': '070', 'afo-2025': '072', 'afo-shooter': '073', 'afo-course': '074', 'afo-station': '075',
  'afo-guide-hero': '076', 'afo-guide-banner': '077', 'afo-guide-course': '081', 'afo-guide-shelter': '084', 'afo-guide-awards': '086',
  'ub-logo': '248', 'ub-mclane': '249', 'ub-olson': '250', 'ub-video': '251', 'ub-tasting': '252', 'ub-guests': '253', 'ub-evening': '254',
  'herizon-panel': '168',
  'ew-logo': '157', 'ew-student-coach': '158', 'ew-marketplace': '159', 'ew-vendors': '160', 'ew-connecting': '161', 'ew-crowd': '162',
  'ew-speaker': '163', 'ew-smiling': '164', 'ew-art': '165', 'ew-first-meeting': '166', 'ew-stephanie-tricia': '167',
  'donate-martha': '156', 'not-found': '154',
};
fs.mkdirSync('src/assets/img', { recursive: true }); fs.mkdirSync('src/assets/people', { recursive: true });
const put = async (src, dest, max) => {
  const s = sharp('content/images/' + src); const { width, format } = await s.metadata();
  const ext = format === 'jpeg' ? 'jpg' : format; const out = `${dest}.${ext}`;
  if (fs.existsSync(out)) return out;
  if (width > max) await s.resize(max).toFile(out); else fs.copyFileSync('content/images/' + src, out);
  return out;
};
for (const [name, id] of Object.entries(img)) await put(byId(id), `src/assets/img/${name}`, 1600);
fs.copyFileSync('content/images/' + byId('069'), 'src/assets/img/candid-seal.svg');
// People photos: placeholder logos become null (rendered as initials).
const slug = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[“”".]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
for (const [json, prefix] of [['coach-roster', 'coach'], ['coaches', 'coach-dir'], ['scholar-roster', 'scholar'], ['scholars', 'scholar-dir']]) {
  const data = JSON.parse(fs.readFileSync(`src/data/${json}.json`, 'utf8'));
  for (const p of data) {
    if (!p.photo || !p.photo.startsWith?.('0') && !/^\d/.test(p.photo)) continue;
    if (/-(Logo|01)\.webp$/.test(p.photo)) { p.photo = null; continue; }
    p.photo = (await put(p.photo, `src/assets/people/${prefix}-${slug(p.name)}`, 480)).replace(/^src/, '/src');
  }
  fs.writeFileSync(`src/data/${json}.json`, JSON.stringify(data, null, 2));
}
console.log('done');
