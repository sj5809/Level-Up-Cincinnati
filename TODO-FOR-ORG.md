# Questions for Level Up Cincinnati

These are the open items from the website rebuild. Nothing here blocks launch: each one has a safe default already in place (noted as **Now:**). A short answer per item is plenty.

## Must do before launch

1. **GitHub account (free).** The site is hosted free on **GitHub Pages**. Level Up should create a free GitHub **organization** and own the repository (not a volunteer's personal account). The repository must be **public** for free Pages hosting. Personal data (coach emails) has been removed from it.
   - Name the repository `<org-name>.github.io` so the preview works at `https://<org-name>.github.io/` before the domain moves. Any other name serves the site under a sub-path, which breaks links until the custom domain is connected.
   - In the repo: **Settings → Pages → Source: GitHub Actions**. Every push then deploys automatically.
2. **Domain: keep the subdomains working.** Point `www.levelupcincinnati.org` at GitHub Pages:
   - Add a `CNAME` record `www` → `<org-name>.github.io`, plus the four GitHub `A` records for the bare domain.
   - Enter the domain under **Settings → Pages → Custom domain**, then tick **Enforce HTTPS**.
   - **Copy every existing DNS record first.** The site links to `impact.`, `ai.`, `volunteer.`, `coach.`, and `app.`, and email (MX) records must keep working.
3. **Form email (free, 5 minutes).** All forms (coach applications, partner inquiries, Launch Network, event sponsor interest, and newsletter) send through **Web3Forms**. It's free for 250 submissions a month and uses no scripts.
   - Go to web3forms.com, enter the email address that should receive submissions, and paste the access key it emails you into `src/data/site.json` → `forms.accessKey`.
   - **Forms won't send until this is done.**
   - Submissions arrive by email. Keep them, since Web3Forms doesn't store them.
   - The Privacy Policy (Feb 17, 2026) should mention that website form submissions are processed by Web3Forms. Please have whoever maintains it add a line.
4. **Mailing list.** The old Squarespace newsletter block stores subscribers inside Squarespace.
   - Please **export that list before cancelling Squarespace**.
   - Do you use an email tool (Mailchimp, Constant Contact, Givebutter email)? If so, the signup form can point straight at it.
   - **Now:** sign-ups arrive by email through Web3Forms.
5. **Content editor login (`/admin`).** Staff edit events, people, partners, and stats at `/admin` (Sveltia CMS).
   - One-time setup: put the real `owner/repo` in `public/admin/config.yml`.
   - Each editor signs in with **"Sign in with token"**: a GitHub fine-grained token for this repo with *Contents: read and write*.
   - Every save republishes the site in about 2 minutes.
   - Staff can also edit the same files directly on github.com.

## Please confirm these facts

6. **Program satisfaction: 98%.** The live site only showed this after a script ran, so search engines saw "0%". Is 98% current?
7. **Numbers that disagree across the current site.** Which figure is right?
   - **Coaches:** "36 Cincinnati professionals coach with Level Up today" vs. "30+ Active Coaches" (both on Become a Coach).
   - **Partners:** "50+ Corporate & Community Partners" (Become a Coach) vs. "30+ partners" (Our Partners, which lists 30).
   - **Graduation rates:** "1 in 2 first-gen students drop out" (Become a Coach), "9 out of 10 low-income first-gen students leave without a degree" (Our Story), "only 1 in 9 graduate" (Elevating Women), and "one in ten … finishes" (AFO guest guide). These may measure different groups, but a single source line would help.
   - **Martha's class year:** 2025 (Donate), 2026 Masters of Nursing (Students), 2028 Nursing (scholar list).
   - **When coaches are matched:** "New coaches join every summer" vs. "Scholars are matched with new coaches every fall." The site now says orientation is in July and Match Day is in August.
   - **Donate page:** "100% of students on track to graduate" and "100% of gifts support programming". Still accurate?
8. **Two contact emails.** Both `hello@` and `info@` appear on the current site. **Now:** `hello@` is the main address and `info@` stays on the Partners page. Should everything use one address?
9. **Coach FAQ.** The new "Coaching FAQ" on Become a Coach was written only from facts already on the site (time commitment, eligibility, orientation, Match Day, and the two coach tiers). Please review the wording.

## Events

10. **Aiming for Opportunity 2026 (Sept 24) has happened.** The page now automatically switches to a "Thank you" message and a sign-up for next year. Please send:
    - the 2026 total raised
    - the 2027 date
    - the 2027 sponsorship levels
11. **Elevating Women.** The live page still says "Save the date: Summer 2026". **Now:** it says "date to be announced". Is there a 2026 or 2027 date?
12. **HERizon Oct 23 ("Exiting Well") and Nov 20 (Graeter's).** Registration links and locations aren't posted yet. Add them in `/admin` → Events when ready.
13. **Urban Bourbon.** The Cincinnati Art Academy is listed as the "Current Partner · 2025". Is there a 2026 partner?
14. **Events refresh daily.** Past events disappear from "upcoming" through an automatic daily rebuild (`.github/workflows/deploy.yml`). No setup is needed once GitHub Pages is on.

## People and privacy

15. **Coach personal emails.** The current `/coach-profiles` page publishes coaches' **personal email addresses** (Gmail, Yahoo, work email). That invites spam and wasn't needed for anyone to contact Level Up. Because the repository is public, the emails were also removed from the code and its history.
    - **Now:** they are **not shown** on the site and are not in the repository. A copy is kept offline with the volunteer who did the rebuild.
    - Should any be shown?
16. **Scholar profiles.** The scholar directory shows students' full names and is indexed by Google. The newer Students page uses first names only.
    - Should the full-name profiles stay public and searchable?
    - **Now:** kept as they are, under clean `/scholars/…` URLs.
17. **Missing photos.** These profiles use the Level Up logo, so the new site shows initials instead:
    - 10 scholar-directory profiles (for example Jainaba Drammeh, Nick Corona, and Ian McNamara)
    - Angie (Students page)
    - Laura Atalaya (coach list)
18. **Name and link fixes to confirm:**
    - "Perry Washington" on the old coach directory card is "Perry Washburn" everywhere else (link, photo, email). **Now:** Washburn.
    - "Citi Bamk" has been corrected to "Citi Bank".
    - Jess Aurand's LinkedIn link (`linkedin.com/jessaurand`) is missing `/in/` and probably doesn't work. What's the correct URL?
    - Two coach LinkedIn links that were broken on the old site (Carolon Donnally and Jena McClanahan) now work.
19. **Launch Network filter.** The coach directory has a "Launch Network" filter, but no one is tagged with it yet.

## Nice to have

20. **Vector logo.** The site only has the logo as a JPEG/PNG. An SVG version would be sharper and smaller.
21. **Translation (Weglot).** Weglot's script loaded on every page, but there was no language switcher and no languages were set up, so nobody could actually translate the site.
    - **Now:** removed, which made the site much faster.
    - If Spanish (or another language) is needed, we can build static translated pages with no speed cost.
22. **Analytics.** Do you want visitor analytics? Cloudflare Web Analytics and Plausible are privacy-friendly and don't slow the site down.
23. **Pages that were removed (they redirect to the homepage):** `/cart`, `/prog-dash`, and `/app-1` were empty Squarespace pages.
