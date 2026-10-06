# levelupcincinnati.org

Static rebuild of the Level Up Cincinnati website: [Astro](https://astro.build), zero client JS (except a sub-1KB inline menu script), hosted free on **GitHub Pages** (deployed by `.github/workflows/deploy.yml` on every push and every morning).

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # builds to dist/, then writes redirect pages for every old Squarespace URL
npm run preview
```

## Where things live

| What | Where | Edited by staff at `/admin`? |
|---|---|---|
| Events (date → auto "upcoming"/"past") | `src/content/events/*.md` | Yes |
| Stats, emails, phone, key links | `src/data/site.json` | Yes |
| Team & board | `src/data/team.json` | Yes |
| Partners | `src/data/partners.json` | Yes |
| Coaches / scholars (lists and profile pages) | `src/data/{coach-roster,coaches,scholar-roster,scholars}.json` | Yes |
| Page copy | `src/pages/*.astro` | No — developer edit |
| Styles (brand tokens at top) | `src/styles/global.css` | No |
| Images | `src/assets/img`, `src/assets/people` | Photos via CMS |
| GitHub preview sub-folder | Repository variable `BASE_PATH` (e.g. `/Level-Up-Cincinnati`) → `scripts/prefix-base.mjs`. **Delete the variable when the custom domain is connected.** | — |
| Old-URL redirects | `scripts/gen-redirects.mjs` (instant-redirect pages; Pages has no server redirects) | Automatic |
| Form email | `src/data/site.json` → `forms.accessKey` (Web3Forms) | One-time setup |
| Website sign-in (Firebase, Microsoft 365) + Givebutter/Outlook links | `src/data/auth.json` (see TODO-FOR-ORG.md, "Login setup") | One-time setup |

## Checks

```bash
npm run preview &                 # then, in another shell:
node scripts/check.mjs            # axe (WCAG 2.2 AA), one <h1>, title/description lengths, internal links
node scripts/check-redirects.mjs  # every old Squarespace URL lands somewhere real
npx html-validate "dist/**/*.html"
scripts/lh.sh mobile 3 / /become-a-coach   # Lighthouse median-of-3 (also: desktop)
```

`scripts/crawl.mjs`, `extract-*.mjs`, and `prep-assets.mjs` were one-off migration scripts from the Squarespace site (Phase 0); `audit/` holds the before/after reports.

Open questions for the org: [TODO-FOR-ORG.md](TODO-FOR-ORG.md). Marketing how-to: [OUTREACH-PLAYBOOK.md](OUTREACH-PLAYBOOK.md).
