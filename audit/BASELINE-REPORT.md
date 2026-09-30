# Level Up Cincinnati: Baseline Report (Phase 0)

Captured on **Sept 30, 2026** from https://www.levelupcincinnati.org and its subdomains.

## 1. What was captured

| Item | Where | Count |
|---|---|---|
| Page text, headings, links, images, meta, JSON-LD (JS-rendered, mobile viewport) | `content/raw/*.json`, `*.txt` | 63 URLs |
| Server HTML (what crawlers and no-JS users get) | `content/raw/*.server.html` | 63 |
| Original images at largest size (`?format=2500w`) | `content/images/` (not in git, 46 MB) | 253 of 254 |
| Image manifest (URL, alt, pages it appears on, local file) | `content/images/_manifest.json` | 254 |
| Brand extract | `audit/brand-extract.json` | — |
| Mobile Lighthouse, 20 core pages | `audit/baseline/*.report.{json,html}`, `summary.tsv` | 20 |
| Sitemap coach-profile URLs with bad slugs (`stacyrodarte-…`), not crawled | `audit/junk-sitemap-urls.txt` | 17 |

The one image that failed is a Next.js optimizer URL on `volunteer.` that only works with query params, so nothing was lost.

## 2. Lighthouse baseline (mobile, local run)

Lighthouse 13, default mobile preset (Moto G Power, simulated slow 4G), single run per page.
Local runs differ slightly from PageSpeed Insights. Phase 3 uses median-of-3 with the same tooling, so before/after comparisons are like-for-like.

| Page | Perf | A11y | BP | SEO | FCP | LCP | TBT | CLS | Weight | Requests |
|---|---|---|---|---|---|---|---|---|---|---|
| `/custom-404-page` | 27 | 91 | 73 | 100 | 4.9 s | 18.4 s | 390 ms | 0.651 | 2881 KiB | 81 |
| `/herizon-series` | 39 | 91 | 73 | 92 | 5.7 s | 16.4 s | 790 ms | 0 | 2488 KiB | 74 |
| `/urban-bourbon` | 46 | 92 | 73 | 92 | 4.4 s | 14.5 s | 510 ms | 0 | 3770 KiB | 75 |
| `/your-year-as-a-coach` | 49 | 90 | 73 | 92 | 5.6 s | 11.5 s | 410 ms | 0 | 1863 KiB | 72 |
| `/aiming-for-opportunity/what-to-expect` | 50 | 92 | 73 | 92 | 5.3 s | 17.7 s | 350 ms | 0 | 4678 KiB | 83 |
| `/coach-profiles` | 51 | 86 | 73 | 100 | 4.9 s | 15.1 s | 300 ms | 0 | 2890 KiB | 102 |
| `/become-a-coach` | 53 | 92 | 73 | 100 | 6.7 s | 18.4 s | 250 ms | 0 | 3220 KiB | 95 |
| `/` | 53 | 92 | 73 | 100 | 5.7 s | 17.2 s | 240 ms | 0 | 3971 KiB | 85 |
| `/level-up-scholar-directory-blog` | 53 | 90 | 73 | 85 | 5.1 s | 15.7 s | 240 ms | 0 | 2534 KiB | 80 |
| `/elevating-women` | 55 | 92 | 73 | 92 | 5.7 s | 15.3 s | 210 ms | 0 | 4503 KiB | 85 |
| `/aiming-for-opportunity` | 56 | 93 | 73 | 85 | 6.5 s | 24.7 s | 150 ms | 0 | 5934 KiB | 97 |
| `/level-up-coaches-directory/jessica-king` | 56 | 90 | 73 | 100 | 4.8 s | 12.8 s | 220 ms | 0 | 1818 KiB | 71 |
| `/our-team` | 56 | 92 | 73 | 100 | 4.7 s | 14.7 s | 170 ms | 0 | 2376 KiB | 82 |
| `/join-the-network-archive` | 58 | 92 | 73 | 100 | 4.1 s | 9.8 s | 190 ms | 0 | 2680 KiB | 101 |
| `/privacy-policy` | 59 | 91 | 73 | 77 | 3.8 s | 11.6 s | 260 ms | 0 | 2020 KiB | 69 |
| `/donate` | 62 | 91 | 73 | 92 | 2.9 s | 6.5 s | 170 ms | 0.003 | 4321 KiB | 158 |
| `/level-up-coaches-directory` | 64 | 90 | 73 | 85 | 3.1 s | 9.3 s | 140 ms | 0 | 2749 KiB | 76 |
| `/our-vision` | 64 | 92 | 73 | 100 | 2.9 s | 19.8 s | 160 ms | 0.009 | 5870 KiB | 85 |
| `/students` | 68 | 92 | 73 | 100 | 2.9 s | 7.8 s | 160 ms | 0.001 | 2975 KiB | 81 |
| `/our-partners` | 69 | 91 | 73 | 100 | 3.1 s | 5.9 s | 180 ms | 0.039 | 2371 KiB | 94 |

**Medians across 20 pages:** Performance 56, Accessibility 92, Best Practices 73, SEO 100.

**Your PSI numbers are confirmed in direction.** The homepage scores 53 here (PSI: 42), with LCP 17.2s (PSI: 15.8s) and 3,971 KiB (PSI: 4,003 KiB). TBT is lower locally (240ms vs 810ms) because this Mac is faster than PSI's servers, even with CPU throttling. PSI remains the number to quote to the org.

Other things worth noting:
- `/custom-404-page` has **CLS 0.651**, the worst on the site.
- `/aiming-for-opportunity` is the heaviest page (5.9 MB, LCP 24.7s).
- `/donate` makes **158 requests** because of the Givebutter embed.
Local Best Practices comes out lower (≈73) than your PSI run (96). The failing audits on every page are `errors-in-console`, `third-party-cookies`, and `inspector-issues`, all caused by the Squarespace, Weglot, and Givebutter third-party scripts. Accessibility fails on `color-contrast` and `link-name` on every page.

## 3. Corrections to the original audit

Four things on the live site differ from the brief. My recommendation follows each one.

1. **Brand colors.** The exact tokens in the live CSS (`:root`) are:
   - navy `--luc-blue: #18264E` (the brief estimated `#1b2550`)
   - coral `--luc-coral: #F15F5E` (the brief estimated `#e06a5f`)
   - soft blue `#6B7BA8`, light coral `#FFA69E`, teal `#4CAFB6`, blue-gray `#d8d9df`, text `#111827` / `#4b5563`, background `#f3f4f6`

   **Fonts:** Poppins 700/800 for headings, Roboto 400/500/700 for body, and Cabin 700 used in a few places.
2. **`/about` and `/events` are already 301 redirects**, not duplicate pages. `/about` goes to `/our-vision` and `/events` goes to `/aiming-for-opportunity`. The rebuild keeps `/our-vision` as the canonical URL and turns `/events` into a real events index.
3. **The `stacyrodarte-…` sitemap URLs are not duplicates.** Each one is a *different real coach profile* (for example Becca Harper, Calvin Davis, Victoria White, Jena McClanahan) whose slug was auto-generated from a copied post. The scholar directory has the same problem: `emily-espinoza-ruiz-zplnz-aghzk-…` is Nick Corona, Ian McNamara, Danyela Taboada, and others, and `blog-post-title-one/two/three/four` are Aiden Portman, Mouhamed Minani, Serenity Murphy, and Jada Wallace.
   **Recommendation:** keep every profile, give each one a clean slug (`/coaches/becca-harper`, `/scholars/nick-corona`), and 301 redirect the old URLs. Deleting them would lose real people's pages.
4. **`/join-the-network` redirects to the homepage.** The actual Launch Network content lives at `/join-the-network-archive` ("Join the Launch Network as an Executive Advisor").
   **Recommendation:** move that content to `/join-the-network` and redirect `-archive` to it.

## 4. Pages you didn't list (found in the sitemap)

| URL | What it is | Recommendation |
|---|---|---|
| `/home` | Duplicate of `/` | 301 → `/` |
| `/donate` | Real donate page ("Support Cincinnati's Future Leaders") with Givebutter embed | Keep; becomes the Phase 2 donate page |
| `/elevating-women` | "Celebrating Women Who Lead" | Keep (ask the org how it relates to HERizon) |
| `/your-year-as-a-coach` | "A Year as a Level Up Coach" | Keep; link it from Become a Coach |
| `/coach-profiles` | "Meet Our Coaches & Launch Network" | Keep; merge with the coach directory |
| `/level-up-coaches-directory` (+ 5 category and 3 tag pages) | 19 coach profiles | Keep as `/coaches`; drop the thin tag/category pages → 301 |
| `/level-up-scholar-directory-blog` (+ 2 tag pages) | 20 scholar profiles, titled "Blog 2" | Keep as `/scholars` (**ask the org** whether student profiles should be public and indexed) |
| `/aiming-for-opportunity/what-to-expect` | AFO day-of guide | Keep |
| `/privacy-policy`, `/terms-of-use` | Legal | Keep verbatim (titles currently say "Privacy Policy 1" and "Terms of Service 1") |
| `/custom-404-page` | 404 page ("Listen, we're not perfect.") | Becomes the real 404 |
| `/prog-dash`, `/app-1`, `/cart` | Empty shells (nav and footer only) | Drop → 301 `/` (**ask** before removing) |

## 5. Issues confirmed

### Performance
- 29–42 scripts on every page. Both Givebutter (`widgets.givebutter.com`) and Weglot (`cdn.weglot.com`) load on **every** page, not only on the donate page.
- The logo is a JPEG (`Blue Background.jpg`) served at 1500w. There is no SVG logo on the site (**ask the org for a vector**).
- Page weight is 4–6 MB. LCP is the hero image.

### Content
- **Homepage stat.** The server HTML shows `0%`. The real figure is in the markup as `data-target="98"`, and the rendered text reads **"98% program satisfaction rating from our scholars."** The rebuild will ship 98% in the HTML, pending the org's confirmation.
- **Stale events.**
  - AFO still promotes "SEPTEMBER 24, 2026" registration.
  - HERizon still says "NEXT UP · FRIDAY, SEPTEMBER 25" and "Register for September."
- **Leaked internal labels** appear in `become-a-coach` ("Section Redesign"), `aiming-for-opportunity`/`events` ("Impact Section - Level Up Cincinnati"), and `urban-bourbon` ("Impact Section").
- **`/cart`** is linked from 59 pages.

### SEO
- The OG image is `http://static1.squarespace.com/…/Level-Up-Mobile-Image.png` from 2022.
- Title and description problems for every non-profile page are listed in `audit/seo-issues.md`. Highlights:
  - 13 pages have no meta description.
  - 0 H1s on `/herizon-series`, `/urban-bourbon`, `/terms-of-use`, `/prog-dash`, and `/app-1`.
  - 19 and 20 H1s on the coach and scholar directories (every card is an H1).
  - 4 H1s on `/join-the-network-archive`, and 2 on the homepage (the mailing-list heading).
  - The brand name is doubled in the title on 7 pages.
  - Titles such as "Blog 2", "Privacy Policy 1", "General 1Page Not Found".

### Accessibility
- The homepage has **22 links with no accessible name**: image-only nav tiles, event cards, and the `/join-the-network` footer link.
  The LinkedIn, Instagram, and Candid links *do* have `aria-label`s, so the unnamed-link failure comes from the image links.
- **Contrast** (computed from the real tokens):

  | Pair | Ratio | Result |
  |---|---|---|
  | White on coral `#F15F5E` (every coral button) | **3.21:1** | Fails AA for normal text |
  | Coral on navy | 4.59:1 | Passes (barely) |
  | Navy on coral | 4.59:1 | Passes |
  | White on navy | 14.7:1 | Passes |

## 6. Decisions I need from you before Phase 1

1. **Coral buttons fail contrast.** Pick one:
   - **(a) Navy text on coral buttons.** Keeps the exact brand coral, 4.59:1. *(My recommendation.)*
   - **(b) A darker coral for button backgrounds only**, e.g. `#CF4444` (4.60:1 with white text).

   Either counts as a color change, so I'm asking.
2. **Profile slugs.** OK to move coach and scholar profiles to clean URLs, with 301s from every old URL?
3. **Drop `/prog-dash`, `/app-1`, and `/cart`** (all empty) with 301s to `/`?
4. **Launch Network.** Make `/join-the-network` the real page (content from `-archive`)?

Everything else (Weglot, analytics, newsletter provider, the satisfaction %, a vector logo, whether scholar profiles should be indexed) goes into `TODO-FOR-ORG.md` and doesn't block the build.
