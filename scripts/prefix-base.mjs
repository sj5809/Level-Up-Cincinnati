// Preview helper for GitHub Pages *project* sites (served from a sub-folder like /Level-Up-Cincinnati/).
// The site is written for the root of a domain, so after `npm run build` this rewrites every
// root-relative URL in dist/ to start with BASE_PATH. It does nothing when BASE_PATH is unset,
// so once a custom domain is connected you simply delete the BASE_PATH repository variable.
//   BASE_PATH=/Level-Up-Cincinnati node scripts/prefix-base.mjs
import fs from 'node:fs';
import path from 'node:path';

const base = (process.env.BASE_PATH || '').replace(/\/$/, '');
if (!base) { console.log('prefix-base: BASE_PATH not set, nothing to do'); process.exit(0); }
if (!/^\/[\w.-]+$/.test(base)) throw new Error(`prefix-base: BASE_PATH must look like /Repo-Name, got "${base}"`);

const walk = d => fs.readdirSync(d, { withFileTypes: true }).flatMap(e => e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]);
const root = process.argv[2] || 'dist';
const files = walk(root);
// A root-relative URL: starts with one "/" (not "//"), and isn't already prefixed.
const rel = `\\/(?!\\/)(?!${base.slice(1)}(?:\\/|$))`;
const fix = u => u.replace(new RegExp(`^${rel}`), base + '/');

let changed = 0;
for (const f of files) {
  const ext = path.extname(f);
  if (!['.html', '.js', '.css', '.xml', '.txt'].includes(ext)) continue;
  if (ext === '.js' && /index\.esm|firebase/.test(f)) continue; // third-party bundles: leave alone
  let s = fs.readFileSync(f, 'utf8');
  const before = s;
  if (ext === '.html' || ext === '.css') {
    // href/src/action/poster="/x"
    s = s.replace(new RegExp(`(\\s(?:href|src|action|poster)=["'])(${rel})`, 'g'), `$1${base}/`);
    // srcset="/a 1x, /b 2x"
    s = s.replace(/(\ssrcset=["'])([^"']+)(["'])/g, (_, a, list, z) => a + list.split(',').map(p => { const t = p.trim(); return (p.startsWith(' ') ? ' ' : '') + fix(t); }).join(',') + z);
    // url(/fonts/...) in inline styles and CSS
    s = s.replace(new RegExp(`url\\((["']?)(${rel})`, 'g'), `url($1${base}/`);
    // <meta http-equiv="refresh" content="0; url=/x">
    s = s.replace(new RegExp(`(content="0; url=)(${rel})`, 'g'), `$1${base}/`);
    // Inline scripts/JSON: quoted root paths used for navigation and speculation rules.
    s = s.replace(/<script(?![^>]*application\/ld\+json)([^>]*)>([\s\S]*?)<\/script>/g, (m, attrs, body) =>
      `<script${attrs}>${body.replace(new RegExp(`(["'\`])(${rel})`, 'g'), `$1${base}/`)}</script>`);
  } else if (ext === '.js') {
    // Our own page scripts: quoted root paths like '/account', '/login?next=/account'.
    s = s.replace(new RegExp(`(["'\`])(${rel})(?=[\\w?#=&/.-]*["'\`])`, 'g'), `$1${base}/`);
    s = s.replace(/(next=)\/(?!\/)/g, `$1${base}/`);
  } else if (f.endsWith('robots.txt')) {
    s = s.replace(/^(Disallow: )\//gm, `$1${base}/`);
  }
  if (s !== before) { fs.writeFileSync(f, s); changed++; }
}
console.log(`prefix-base: rewrote root-relative URLs under ${base} in ${changed} files`);
