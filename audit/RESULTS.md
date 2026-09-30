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
| Largest Contentful Paint | 15.8 s | 17.2 s | **1.43s** |
| First Contentful Paint | 3.9 s | 5.7 s | **0.81s** |
| Total Blocking Time | 810 ms | 240 ms | **0 ms** |
| Cumulative Layout Shift | 0 | 0 | **0** |
| Page weight | 4,003 KiB | 3,971 KiB | **94 KiB** |
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
| `/` | 100 / 100 / 100 / 100 | 1.43s | 94 KiB | 100 / 100 / 100 / 100 | 0.38s |
| `/our-vision` | 100 / 100 / 100 / 100 | 1.06s | 198 KiB | 100 / 100 / 100 / 100 | 0.30s |
| `/our-team` | 100 / 100 / 100 / 100 | 0.92s | 128 KiB | 100 / 100 / 100 / 100 | 0.26s |
| `/become-a-coach` | 100 / 100 / 100 / 100 | 1.29s | 90 KiB | 100 / 100 / 100 / 100 | 0.32s |
| `/coaching-in-5-minutes` | 100 / 100 / 100 / 100 | 1.36s | 91 KiB | 100 / 100 / 100 / 100 | 0.33s |
| `/your-year-as-a-coach` | 100 / 100 / 100 / 100 | 1.05s | 27 KiB | 100 / 100 / 100 / 100 | 0.28s |
| `/volunteer` | 100 / 100 / 100 / 100 | 1.21s | 42 KiB | 100 / 100 / 100 / 100 | 0.29s |
| `/volunteer/pd-day-2026` | 100 / 100 / 100 / 100 | 0.90s | 26 KiB | 100 / 100 / 100 / 100 | 0.25s |
| `/volunteer/pool` | 100 / 100 / 100 / 100 | 0.91s | 56 KiB | 100 / 100 / 100 / 100 | 0.25s |
| `/our-partners` | 100 / 100 / 100 / 100 | 0.90s | 26 KiB | 100 / 100 / 100 / 100 | 0.24s |
| `/join-the-network` | 100 / 100 / 100 / 100 | 1.29s | 82 KiB | 100 / 100 / 100 / 100 | 0.31s |
| `/students` | 100 / 100 / 100 / 100 | 1.36s | 81 KiB | 100 / 100 / 100 / 100 | 0.32s |
| `/events` | 100 / 100 / 100 / 100 | 1.05s | 27 KiB | 100 / 100 / 100 / 100 | 0.28s |
| `/aiming-for-opportunity` | 100 / 100 / 100 / 100 | 1.43s | 173 KiB | 100 / 100 / 100 / 100 | 0.36s |
| `/aiming-for-opportunity/what-to-expect` | 100 / 100 / 100 / 100 | 1.58s | 92 KiB | 100 / 100 / 100 / 100 | 0.35s |
| `/urban-bourbon` | 100 / 100 / 100 / 100 | 1.36s | 115 KiB | 100 / 100 / 100 / 100 | 0.31s |
| `/herizon-series` | 100 / 100 / 100 / 100 | 1.36s | 45 KiB | 100 / 100 / 100 / 100 | 0.33s |
| `/elevating-women` | 100 / 100 / 100 / 100 | 1.74s | 156 KiB | 100 / 100 / 100 / 100 | 0.37s |
| `/donate` | 100 / 100 / 100 / 100 | 0.91s | 35 KiB | 100 / 100 / 100 / 100 | 0.25s |
| `/impact` | 100 / 100 / 100 / 100 | 1.36s | 65 KiB | 100 / 100 / 100 / 100 | 0.35s |
| `/your-dollar-further` | 100 / 100 / 100 / 100 | 1.28s | 67 KiB | 100 / 100 / 100 / 100 | 0.34s |
| `/coaches` | 100 / 100 / 100 / 100 | 1.07s | 99 KiB | 100 / 100 / 100 / 100 | 0.30s |
| `/coaches/jena-mcclanahan` | 100 / 100 / 100 / 100 | 0.91s | 63 KiB | 100 / 100 / 100 / 100 | 0.25s |
| `/scholars` | 100 / 100 / 100 / 100 | 0.92s | 68 KiB | 100 / 100 / 100 / 100 | 0.25s |
| `/scholars/ndeye-wade` | 100 / 100 / 100 / 100 | 0.91s | 62 KiB | 100 / 100 / 100 / 100 | 0.25s |
| `/privacy-policy` | 100 / 100 / 100 / 100 | 1.05s | 30 KiB | 100 / 100 / 100 / 100 | 0.28s |
| `/terms-of-use` | 100 / 100 / 100 / 100 | 1.05s | 33 KiB | 100 / 100 / 100 / 100 | 0.28s |
| `/thanks` | 100 / 100 / 100 / 69 | 0.91s | 56 KiB | 100 / 100 / 100 / 69 | 0.24s |
| `/404` | 100 / 100 / 100 / 100 | 0.91s | 65 KiB | 100 / 100 / 100 / 100 | 0.25s |

**Across the whole site, averaged over the 20 pages measured before the rebuild:**
- Performance: 56 → 100
- Accessibility: 92 → 100
- Best Practices: 73 → 100
- Average page weight: 3.2 MB → 76 KB

**Notes:**
- `/thanks` is the page people see after submitting a form. It is deliberately marked "don't show in Google" (`noindex`), which Lighthouse's SEO score counts against it (69). Every page meant to appear in search scores 100.
- The coach and scholar directory pages make 15–25 requests because they show many small headshots. Their total weight is still under 100 KB.

## Other checks (all passing)

| Check | Result |
|---|---|
| Automated accessibility scan (axe-core, WCAG 2.2 AA + best practices), all 66 pages | **0 violations** (before: color contrast, unnamed links, duplicate IDs, invalid ARIA) |
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

### New features the old site didn't have
- **Instant, app-like navigation.**
  - Pages load in the background when you hover or touch a link (Speculation Rules), then slide smoothly into place (View Transitions).
  - A coach's photo in the directory morphs into their profile page when you click through.
  - Browsers without support simply navigate normally.
- **"There's a place for you" chooser (homepage).** Visitors pick *Mentor a student / Lend a hand at events / Open doors for my company / Fund a scholar / I'm a UC student*. They get a tailored panel with real facts, a real quote, and the right next step. It runs on HTML and CSS only.
- **"A scholar's journey."** A timeline from selection at UC through Match Day, both coaches, and into a career, with a coral line that fills in as you scroll.
- **"The Level Up family."** A wall of every real coach and scholar photo (36 coaches, 35 scholars, counted automatically from the data), ending with a coral "You?" tile that links to the coach application.
- **Smarter events.**
  - A live countdown ("In 23 days"), kept current by the daily rebuild.
  - One-tap **Add to calendar** (Apple/Outlook `.ics` file, or Google Calendar) on every upcoming event.
  - The next event is highlighted.
- **Design upgrade.**
  - A full-width photo hero with a hand-drawn coral underline.
  - A stats card that floats over the hero.
  - Cards that lift on hover, photos that zoom slightly, coral icon circles, and centered section headings.
  - The Cincinnati skyline (Roebling Bridge at sunset) behind the footer and the final call to action.
  - A reading-progress bar on long pages.

### All four subdomain sites, rebuilt into one site
Level Up's separate sites (hosted on Vercel and Netlify) are now pages on the main site. They share one design, one navigation, and the same speed and accessibility standards:

| Was | Now | What it includes |
|---|---|---|
| `coach.levelupcincinnati.org` (14-slide deck) | `/coaching-in-5-minutes` | All 14 slides as a scrolling story with a chapter menu and a progress bar along the bottom. Includes the "see your role" and "what's covered" details, the Coaching Compass sample, and the QR code. It fixes the old deck's overlapping arrow and static progress bar. |
| `impact.levelupcincinnati.org` | `/impact` | The full 2025 Impact Report: stats, survey results, the Executive Director's letter, Sarah/Martha/Nick stories, coach stories, the P.A.C.E. model with ★ requirements, events, financial stewardship (spending and revenue bars), the 24-photo gallery, partners, and thank-you lists. |
| `ai.levelupcincinnati.org` | `/your-dollar-further` | The value grid, eight expandable case studies with links to Substack, a note on how the numbers are estimated, Jim's quote, and the call to action. |
| `volunteer.levelupcincinnati.org` | `/volunteer`, `/volunteer/pd-day-2026`, `/volunteer/pool` | Upcoming events with a Signups open / Coming soon status, a role picker that disables full roles, "notify me" forms, ways to help, and the volunteer pool. |

The **Scholar App** (`app.`) is a logged-in application, so it stays separate and linked.

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
