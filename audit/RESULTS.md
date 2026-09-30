# Level Up Cincinnati Website Rebuild: Results

**Prepared by:** volunteer web rebuild (community service project)
**Date:** September 30, 2026
**Scope:** full rebuild of www.levelupcincinnati.org, from Squarespace to a static site. It keeps every page, fact, photo, and feature, and makes the site fast, accessible, and built to recruit coaches, volunteers, partners, and donors.

---

## Before and after (homepage, mobile)

| Metric | Before: PageSpeed Insights | Before: my local Lighthouse | **After: local Lighthouse (median of 3)** |
|---|---|---|---|
| Performance | 42 | 53 | **100** |
| Accessibility | 92 | 92 | **100** |
| Best Practices | 96 | 73 | **100** |
| SEO | 100 | 100 | **100** |
| Largest Contentful Paint | 15.8 s | 17.2 s | **1.28s** |
| First Contentful Paint | 3.9 s | 5.7 s | **0.65s** |
| Total Blocking Time | 810 ms | 240 ms | **0 ms** |
| Cumulative Layout Shift | 0 | 0 | **0** |
| Page weight | 4,003 KiB | 3,971 KiB | **92 KiB** |
| Requests | — | 85 | **7** |
| JavaScript files | 39 scripts | 32 scripts | **0 files** (two ~1 KB inline scripts: menu, and scroll animations) |

**How these were measured:**
- **Lighthouse 13**, mobile preset: an emulated Moto G Power on a simulated slow 4G connection.
- **Desktop** uses Lighthouse's desktop preset.
- **"Before"** numbers come from the live site on Sept 30, 2026. Full reports are in `audit/baseline/`.
- **"After"** numbers come from the production build served locally, run 3 times per page with the median kept. Full reports are in `audit/final/`.
- **Remaining step:** once the site is deployed, run PageSpeed Insights on the live URL to confirm (see "Next steps").

## Every page (final build)

| Page | Mobile P / A / BP / SEO | Mobile LCP | Mobile weight | Desktop P / A / BP / SEO | Desktop LCP |
|---|---|---|---|---|---|
| `/` | 100 / 100 / 100 / 100 | 1.28s | 92 KiB | 100 / 100 / 100 / 100 | 0.32s |
| `/our-vision` | 100 / 100 / 100 / 100 | 0.91s | 194 KiB | 100 / 100 / 100 / 100 | 0.26s |
| `/our-team` | 100 / 100 / 100 / 100 | 0.91s | 124 KiB | 100 / 100 / 100 / 100 | 0.27s |
| `/become-a-coach` | 100 / 100 / 100 / 100 | 1.29s | 107 KiB | 100 / 100 / 100 / 100 | 0.32s |
| `/your-year-as-a-coach` | 100 / 100 / 100 / 100 | 0.91s | 23 KiB | 100 / 100 / 100 / 100 | 0.24s |
| `/our-partners` | 100 / 100 / 100 / 100 | 0.91s | 22 KiB | 100 / 100 / 100 / 100 | 0.25s |
| `/join-the-network` | 100 / 100 / 100 / 100 | 1.13s | 78 KiB | 100 / 100 / 100 / 100 | 0.27s |
| `/students` | 100 / 100 / 100 / 100 | 1.36s | 77 KiB | 100 / 100 / 100 / 100 | 0.31s |
| `/events` | 100 / 100 / 100 / 100 | 0.91s | 22 KiB | 100 / 100 / 100 / 100 | 0.25s |
| `/aiming-for-opportunity` | 100 / 100 / 100 / 100 | 1.28s | 169 KiB | 100 / 100 / 100 / 100 | 0.32s |
| `/aiming-for-opportunity/what-to-expect` | 100 / 100 / 100 / 100 | 1.43s | 88 KiB | 100 / 100 / 100 / 100 | 0.31s |
| `/urban-bourbon` | 100 / 100 / 100 / 100 | 1.37s | 111 KiB | 100 / 100 / 100 / 100 | 0.31s |
| `/herizon-series` | 100 / 100 / 100 / 100 | 1.21s | 40 KiB | 100 / 100 / 100 / 100 | 0.29s |
| `/elevating-women` | 100 / 100 / 100 / 100 | 1.59s | 152 KiB | 100 / 100 / 100 / 100 | 0.33s |
| `/donate` | 100 / 100 / 100 / 100 | 0.91s | 31 KiB | 100 / 100 / 100 / 100 | 0.25s |
| `/coaches` | 100 / 100 / 100 / 100 | 0.91s | 95 KiB | 100 / 100 / 100 / 100 | 0.25s |
| `/coaches/jena-mcclanahan` | 100 / 100 / 100 / 100 | 0.91s | 32 KiB | 100 / 100 / 100 / 100 | 0.24s |
| `/scholars` | 100 / 100 / 100 / 100 | 0.91s | 64 KiB | 100 / 100 / 100 / 100 | 0.25s |
| `/scholars/ndeye-wade` | 100 / 100 / 100 / 100 | 0.90s | 31 KiB | 100 / 100 / 100 / 100 | 0.24s |
| `/privacy-policy` | 100 / 100 / 100 / 100 | 0.91s | 26 KiB | 100 / 100 / 100 / 100 | 0.25s |
| `/terms-of-use` | 100 / 100 / 100 / 100 | 1.06s | 29 KiB | 100 / 100 / 100 / 100 | 0.29s |
| `/thanks` | 100 / 100 / 100 / 69 | 0.90s | 25 KiB | 100 / 100 / 100 / 69 | 0.24s |
| `/404` | 100 / 100 / 100 / 100 | 0.90s | 34 KiB | 100 / 100 / 100 / 100 | 0.25s |

**Across the whole site, averaged over the 20 pages measured before the rebuild:**
- Performance: 56 → 100
- Accessibility: 92 → 100
- Best Practices: 73 → 100
- Average page weight: 3.2 MB → 72 KB

**Notes:**
- `/thanks` is the page people see after submitting a form. It is deliberately marked "don't show in Google" (`noindex`), which Lighthouse's SEO score counts against it (69). Every page meant to appear in search scores 100.
- The coach and scholar directory pages make 15–25 requests because they show many small headshots. Their total weight is still under 100 KB.

## Other checks (all passing)

| Check | Result |
|---|---|
| Automated accessibility scan (axe-core, WCAG 2.2 AA + best practices), all 60 pages | **0 violations** (before: color contrast, unnamed links, duplicate IDs, invalid ARIA) |
| Exactly one `<h1>` per page | 60 / 60 |
| Unique title ≤ 60 characters, no doubled brand name | 60 / 60 |
| Meta description ≤ 155 characters | 60 / 60 |
| Internal links | 58 checked, 0 broken |
| Old URLs (all 71 from the old sitemap + `/about`, `/events`, `/home`, `/cart`, and others) | 76 checked, all redirect to a real page |
| HTML validation (html-validate, recommended rules) | 0 errors |
| Structured data (JSON-LD) | valid on every page: NGO, BreadcrumbList, FAQPage, Event |
| Sideways scrolling at 360 / 390 / 768 px | 0 pages |
| Screenshots at 360 / 390 / 768 / 1280 px, reviewed | `audit/screens/` |

## What changed and why

### Speed
- **Squarespace → static Astro site.** Squarespace loaded 30–40 scripts per page that couldn't be removed. The new site ships **no JavaScript files**, only one inline script of about 1 KB for the mobile menu.
- **Images.** Every photo is served in modern formats (AVIF with a WebP fallback) at the right size for each screen, with width and height set so nothing jumps while loading.
  - The homepage hero was loaded 4 times; now it loads once, at about 20–30 KB on a phone.
  - Photos further down the page load only when you scroll to them.
- **Fonts.** The heading font (Poppins Bold) is self-hosted, trimmed to Latin characters, and is 7.8 KB. Body text uses Roboto, which is already built into Android phones, and the system font elsewhere. A size-matched fallback prevents layout shift.
- **CSS** is inlined in each page (4.4 KB compressed), so nothing blocks the first paint.
- **Donate widget.** The Givebutter widget script loaded on every page. Now Donate is a normal link, and the embedded Givebutter form on `/donate` loads only when someone clicks to open it.
- **Weglot translation** loaded on every page but had no language switcher configured, so it was removed. Translation can come back as fast static pages if the org wants it (see `TODO-FOR-ORG.md`).
- **Urban Bourbon video.** It shows a photo with a play button, and YouTube loads only on click.
- **Candid seal.** It's a self-hosted image instead of a remote widget.
- **Hosting.** The site runs free on GitHub Pages behind its global CDN. It rebuilds and deploys automatically on every edit and every morning.

### Mobile
- Designed at 360 px first. Every button and link is at least 48 px tall, and text is 16 px or larger. The old menu button was 37 px, nav links 33 px, footer links 26 px, and footer text 12–13 px.
- **Donate** now sits inside the sticky header. The floating Givebutter button that covered "Be Someone's Coach" is gone.
- A full-screen mobile menu with large rows and collapsible Get Involved / Events / About groups. Escape closes it, focus is managed, and the page behind is disabled while it's open.
- The coach and scholar carousels became simple grids. Everyone is visible, with no swiping and no hidden duplicates.

### Motion that doesn't cost speed
- **Stats count up** the first time they scroll into view, like on the old site. The real number is always in the HTML, so search engines, link previews, and visitors without JavaScript see "98%" rather than "0%".
- **Cards, photos, quotes, and timeline steps fade and slide in** as they come into view, one after another.
- Nothing visible on first load is ever hidden, so there's no delay in how fast the page appears and no layout shift.
- Both effects switch off for visitors whose device is set to reduce motion.
- The whole effect is about 1 KB of inline code. Scores stayed at 100 with 0 ms blocking time and 0 layout shift.

### Accessibility (WCAG 2.2 AA)
- **Contrast.** White text on the coral buttons measured 3.2:1, which fails. The coral buttons now use **navy text (4.6:1)**, keeping the exact brand colors `#18264E` and `#F15F5E`. Small labels on navy use the brand's light coral (7.9:1).
- **Links.** All 22 unnamed image links are gone, and icon links have labels.
- **Structure.** Invalid ARIA is gone, IDs are unique, there's one `<h1>` per page (the directories had 19–20 each), a skip link, and visible focus outlines.
- **Forms.** Every field has a real label, hint text is linked to its field, and required fields are marked in text as well.

### Getting more people involved
- **Homepage.** It keeps the headline "Every student deserves someone in their corner." It now leads with four clear paths (**Become a Coach, Volunteer, Partner/Sponsor, Donate**) and real outcome stats right under the hero. The **next upcoming event** is pulled in automatically.
- **Become a Coach.**
  - "Apply to Be a Coach" is visible without scrolling on a phone.
  - The time commitment (about 2 hours a month) is in the first paragraph.
  - The eligibility requirements, which were hidden, are now shown.
  - A new **Coaching FAQ** answers the two biggest worries, built only from facts already on the site, and is marked up for Google's FAQ results.
- **Partners.** Adds "Ways to partner" (coach, Launch Network, sponsor an event, offer internships) and keeps the inquiry form and direct email.
- **Donate.** Explains what a gift does using real program facts, and shows the trust signals together: the Candid seal, Form 990s, Charity Navigator, and the Impact Report.
- **Events that never go stale.**
  - Events are stored with dates. Past events move to "Past events" automatically.
  - A daily rebuild keeps this current.
  - Aiming for Opportunity now switches itself to "Thank you" plus a sign-up for next year once the date passes.
- **Staff editing.** `/admin` (Sveltia CMS) lets staff edit events, coaches, scholars, partners, team, and stats without code.
- **All forms still work, with no scripts.** Coach application, partner inquiry, Launch Network, sponsor interest, and newsletter all send by email through Web3Forms (free), with spam protection.

### Search and sharing
- Unique titles in the form "Page — Level Up Cincinnati", with the brand no longer doubled, and descriptions on every page (13 pages had none).
- **Structured data:**
  - Organization: NGO, EIN as taxID, logo, PO Box address, LinkedIn, Instagram, Candid.
  - Breadcrumbs on every inner page.
  - FAQPage on Become a Coach and Students.
  - Events, when the date and location are set.
- **Share previews.** Each main page has its own 1200×630 share image made from a real Level Up photo, served over HTTPS. The old one was an `http://` image from 2022.
- **Clean sitemap.** It lists 58 pages, with no junk URLs.
- **Clean URLs.** Coach and scholar profiles have readable addresses, like `/coaches/becca-harper`. The old garbled URLs were real people's pages, not duplicates, so each one redirects to its new home.
- **Other fixes.** `robots.txt`, canonical tags, and a helpful 404 page. The `/cart` link and the leaked internal labels ("Hero Section Redesign", "Impact Section") are gone.
- **The homepage stat shows 98% in the HTML** instead of "0%" for search engines and link previews.

### Nothing lost, nothing invented
- Every page, fact, name, quote, stat, photo, and link from the old site was carried over. The only exceptions are three empty Squarespace pages (`/cart`, `/prog-dash`, `/app-1`), which now redirect to the homepage.
- No statistics, quotes, people, or photos were made up. Where the old site contradicts itself (for example 36 vs. "30+" coaches), both figures are kept where they appeared, and the question is listed in `TODO-FOR-ORG.md`.
- Coaches' personal email addresses, which were published on the old coach directory, are kept in the data but **not displayed**, pending the org's decision.

## Next steps

1. **Deploy (free).** Create a GitHub organization for Level Up, push the repo, and turn on GitHub Pages (Source: GitHub Actions). Add the Web3Forms key, then move DNS. **Keep the `impact.`, `ai.`, `volunteer.`, `coach.`, `app.`, and email records.**
2. **Run PageSpeed Insights on the live URL** (mobile and desktop) to confirm the scores in production.
3. **Answer the questions in `TODO-FOR-ORG.md`:** form email recipients, the mailing list export, and the numbers to confirm.
4. **Follow `OUTREACH-PLAYBOOK.md`:**
   - Google Search Console and the sitemap
   - Google Business Profile
   - Google Ad Grants ($10k/month in free search ads)
   - volunteer listings
   - LinkedIn rhythm
   - monthly stories
