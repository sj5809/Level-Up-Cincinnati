# Questions for Level Up Cincinnati

These are the open items from the website rebuild. Nothing here blocks launch: each one has a safe default already in place (noted as **Now:**). A short answer per item is plenty.

## Must do before launch

1. **Hosting account.** The new site runs on Netlify's free plan. Someone at Level Up should own the Netlify account and the GitHub repository (not a volunteer's personal account).
2. **DNS: keep the subdomains working.** When `www.levelupcincinnati.org` moves from Squarespace to Netlify, copy every existing DNS record first. The site links to all of these and they must keep working:
   - `impact.`
   - `ai.`
   - `volunteer.`
   - `coach.`
   - `app.`
   - email (MX) records
3. **Form notifications.** Coach applications, partner inquiries, Launch Network sign-ups, event sponsor interest, and newsletter sign-ups now go to Netlify Forms (free up to 100 submissions a month). **Which email address(es) should get a copy of each submission?**
4. **Mailing list.** The old Squarespace newsletter block stores subscribers inside Squarespace.
   - Please **export that list before cancelling Squarespace**.
   - Do you use an email tool (Mailchimp, Constant Contact, Givebutter email)? If so, we can point the signup form straight at it.
   - **Now:** sign-ups are collected in Netlify Forms.
5. **Content editor login (`/admin`).** Staff edit events, people, partners, and stats at `/admin`. This needs one-time setup: the GitHub repository name in `public/admin/config.yml`, plus a GitHub OAuth app connected in Netlify.

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
14. **Events refresh daily.** Past events disappear from "upcoming" through a daily automatic rebuild. This needs a Netlify build hook saved as the GitHub secret `NETLIFY_BUILD_HOOK` (see `.github/workflows/daily-rebuild.yml`).

## People and privacy

15. **Coach personal emails.** The current `/coach-profiles` page publishes coaches' **personal email addresses** (Gmail, Yahoo, work email). That invites spam and wasn't needed for anyone to contact Level Up.
    - **Now:** emails are kept in the data file but **not shown** on the site.
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
