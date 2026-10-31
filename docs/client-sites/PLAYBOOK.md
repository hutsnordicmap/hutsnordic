# Client websites: the playbook

How we build and run free websites for huts.fi partners. It was written 2026-10-30 from the Vuorikosken Mylly
project, which Jeff called the model to repeat. Read this before starting or answering a client. The worked
example is in [`vuorikoskenmylly.md`](vuorikoskenmylly.md).

The older Cursor agent, **The Renovator** (`taisto/.cursor/skills/renovator/`), built static HTML demos inside
huts.fi. Its rules still hold: inventory everything on the old site and leave nothing behind, hero = the real
building, and per-unit pages for cabins. This playbook replaces its build path. Sites are now real Next.js
projects here in `sites/<site>/`, previewed at `hutsnordic.fi/preview/<site>`.

---

## 1. The idea: head and neck

Jeff's picture: the client (and Jeff) is the **head** and makes the final call. We are the **neck** that turns
the head: we know what makes a good site, so we steer.

- If the owner **specifically asks** for something, we do it, happily. If it carries a risk, say the risk in one
  or two lines first.
- If the owner **dumps material** (texts, photos, ideas, links), we choose. We use the best, and leave out
  what would hurt them. We tell them what we left out and why in a sentence, and we always end with
  "you're the boss, if you want it we add it".
- Examples from Vuorikoski: an AI-edited terrace photo was left out (misleading, bad for Google, see the Yle
  story https://yle.fi/a/74-20253548), and customers' Instagram photos were left out (no permission). Both
  times the owner agreed.

Jeff does not want to follow every detail. The less he has to think, the better. The goal is that clients'
emails get answered automatically one day. Until then: **we draft, Jeff reviews and sends**.

## 2. The best clients dump data

Clients are usually the bottleneck. Vuorikoski worked because the owner kept sending material fast: 10 emails
in two days, dozens of photos, opening hours for a whole year, a menu with prices, and his own story. The site
grew with every email.

Encourage this from the first email:
- Tell them we work with **AI agents**, so nothing has to be polished. Copy-paste, drag and drop, phone photos,
  half sentences, voice of the owner.
- "Just send what you have, we sort it out. Fast beats perfect."
- Ask for originals from their phone and camera. Facebook and Instagram copies are small, and we can't fetch
  them ourselves.

## 3. Questions on every page ("Kysytään Antilta" boxes)

This was the biggest win. Every page in the **preview build only** has a dashed orange box listing what we
still need for that page, in the owner's language and in plain words. Examples: "Summer 2027 opening hours",
"How many people fit at the table?", "Photo of the shore sauna".

- The data lives as `ask: string[]` in `app/content.ts` for each page, plus `homeAsk` and `contactPage.ask`.
  The `Ask` component renders nothing unless `PREVIEW_EXPORT=1`, so these boxes never reach the live site.
- When an answer arrives: put the facts in the page, then **delete that question**. When something new is
  needed, **add a question**. The owner sees the list shrink, which works like a to-do list. Antti kept
  answering until almost every box was empty.
- The first email only needs to say: "every page has a few questions for you".
- Keep each question answerable in one line or one photo. Never ask what we can find out ourselves.

## 4. Workflow

| # | Step | Notes |
|---|---|---|
| 0 | Intake | Old site URL, Facebook/Instagram, huts.fi places, the owner's wish (what comes first). Jeff's notes and any keyword list. |
| 1 | Inventory | Every page and fact on the old site. Back up the old site (section 8). List old URLs for 301s. |
| 2 | Design | Pick blocks to suit the business, different from the previous client. Café/shop = "Luxury Black"; cabins = photo-led. Read the design notes in the shared onboarding playbook. |
| 3 | Build | Next.js in `sites/<site>/`, copied from the last site. All copy in `app/content.ts`. Finnish at `/`, English at `/en`. |
| 4 | Preview | Static export to `public/preview/<site>/`, push `main`, check live. Jeff looks first. |
| 5 | First email | Short. Main goal: get the owner to click. Link, one question ("what do you think of black?"), and "questions on each page". Jeff sends it. |
| 6 | Data-dump loop | Each owner email: read it, update pages, delete answered questions, publish, check live, draft a short reply. Repeat. |
| 7 | Go-live | Section 9. Needs Jeff's OK and the owner's yes. |

The **"Mitä teimme"** page (`/mita-teimme`, preview only, linked from the orange ribbon) explains what we did
and why: SEO, GEO, the colour choice, the questions, and how the owner can update things. Owners read it, and
it answers "why black?" before they ask.

## 5. Content rules

- Only facts from the owner, their site, their social posts or their approved huts.fi photos. Never invent
  prices, distances, hours or reviews.
- The owner's own text (story, product descriptions) goes in **word for word**. Fix only obvious typos.
  Translate it to English ourselves.
- When the owner corrects a fact, fix it everywhere: page text, FAQ, meta description, `llms.txt` and JSON-LD.
  Grep for the old value.
- Check dates against weekdays (e.g. "la–su 22.–2.8." was a typo for 21.–22.8.). Ask in the reply, and use the
  likely reading meanwhile.
- **Google rating:** show it as plain linked text ("★ 4,9 Googlessa · 162 arvostelua →"), with score, count
  and date checked stored in `content.ts`. Never Review/AggregateRating schema. Get the number from Jeff
  (screenshot of Google Maps), never guess.
- **Photos:** the owner's own photos are fine. Customers' photos need the photographer's OK, or an official
  Instagram embed of hand-picked posts. Leave AI-generated or AI-edited scenes out and explain why.
- Old site URLs 301 to the new pages (`next.config.ts` redirects).
- **YouTube videos can't be downloaded** from the cloud (bot check) or from the Mac's Cowork shell (proxy blocks
  YouTube). Embed the owner's own video muted and looping (youtube-nocookie, photo on top for the first seconds) and
  ask for the original file. Example: `sites/mokkiloma/app/components/VideoHero.tsx`.
- **Many similar units** (Mökkiloma, 6 cottages): give each a one-line tagline, "best for", location and "from"
  price, plus a group-size filter and a compare table. Ask the owner what really separates look-alike units.

## 6. Technical recipe (what is in `sites/vuorikoskenmylly/`)

- Next.js 16 App Router, Tailwind 4 `@theme`, lucide-react, static export for previews.
- `app/content.ts`: all copy and facts. The `live` block holds what the owner will edit later (notice bar,
  opening days, events, breaks, lodging status), kept apart for a future owner editor.
- Opening days: `OpenDay { from, to, open, close, label, days? }`, where `days` limits a long range to some
  weekdays (summer Thu–Sun). "Open today / Next open" is worked out in the visitor's browser
  (`useSyncExternalStore`), so it stays right without a rebuild.
- Events: `live.events`, shown on the home page and published as schema.org `Event` with a `Place` location.
- JSON-LD: one LocalBusiness with departments, plus a typed node per service page (CafeOrCoffeeShop, Store,
  ArtGallery, EventVenue, BedAndBreakfast) and FAQPage. Add `paymentAccepted`, `taxID`/`vatID` and
  `sameAs` (Facebook, Instagram, huts.fi pages) once known. Never ratings.
- `public/llms.txt` for AI search: a plain summary with hours, prices and events. Update it with every fact
  change.
- A Huts.fi map of **each page's own place** sits in the page content near the bottom ("Find us"). The visible
  "Huts.fi" link goes outside the iframe. There is no map and no huts.fi link list in the footer (Jeff: too
  spammy, and a map looks bad on black).
- Preview basePath: `next/image` and `<img>` don't add it, so `content.ts` prefixes photo paths via
  `env.BASE_PATH` set in `next.config.ts`.
- Build and publish:
  ```
  cd sites/<site> && npx tsc --noEmit -p . && npx eslint app
  rm -rf out && PREVIEW_EXPORT=1 PREVIEW_BASE_PATH=/preview/<site> npx next build
  rm -rf ../../public/preview/<site> && cp -r out ../../public/preview/<site>
  git add sites/<site> public/preview/<site> && git commit && git pull --rebase origin main && git push
  ```
  Other threads push to this repo too, so always `pull --rebase` before pushing. The site is live in about a
  minute. Check with `curl -sL` (there's a trailing-slash redirect) and grep for a new phrase.
- Before telling Jeff a screen is done, take a phone-width screenshot of it with Playwright from a local
  static server.

## 7. Email handling (until it is automatic)

- Read the owner's emails with the Gmail connector (`from:<owner> newer_than:1d`).
- **Reply drafts are made through Claude in Chrome on Jeff's Mac**, by the "Automate cabin photo-permission
  emails" thread. Drafts made through the Gmail API turn links into google.com redirects. The text must be
  **pasted, not typed**: typing once dropped letters. Read the draft back before saying it's ready. Use one
  Gmail tab, close it afterwards, stop the session.
- Keep **one** unsent draft per thread. If a new owner email arrives before Jeff sends, update that draft
  rather than adding a second one.
- Replies are short, in Finnish, in Jeff's voice: what's now on the site (with the page link), one or two
  questions at most, signature `Jeff Foster / 045 661 7229 / https://www.huts.fi/`.
- Attachments: Gmail and Drive tool results over the size limit are saved to a file. Decode them from there:
  `jq -r .content` then `base64 -d` for Drive, and `jq -r .raw` plus Python `email` for Gmail RAW. Files over
  about 5 MB can crash the Drive connector, so ask Jeff to drop those into the chat. Jeff also copies
  attachments to Drive (the shared folder or his Drive root).

## 8. Back up the old site

```
cd <scratchpad> && wget -q -e robots=off --page-requisites --adjust-extension --convert-links -H \
  --domains=<domain>,<cdn hosts> <every old page URL>
tar czf <site>-<date>.tar.gz <dir>  →  /mnt/project-files/websites/<site>-old-site-backup/
```
`wget` straight onto `/mnt/project-files` crashes with a bus error. Webnode sites link some pages on
`*.webnode.fi`, so list them explicitly.

## 9. Going live

1. Check where the domain really is: RDAP `https://rdap.verisign.com/com/v1/domain/<domain>` (`.fi`: Traficom)
   and `https://dns.google/resolve?name=<domain>&type=NS|MX|TXT`. Vuorikoski's domain was bought through
   **Webnode**, which has no nameserver button. The owner asks Webnode support, or edits the A/CNAME records in
   Webnode's "Manage DNS".
2. Ask whether they use email on the domain. We don't offer or manage email. They keep Hotmail/Gmail. If they
   want an @domain address: free Cloudflare Email Routing to their inbox, or Google Workspace paid by them.
   Either way, keep existing MX/SPF records when the zone moves to Cloudflare.
3. Jeff: add the domain in Cloudflare (Free) and check it gives `miki`/`sri` and imported MX/TXT. Add it in
   Vercel, then put Vercel's records in Cloudflare (grey cloud).
4. We make the real build (no preview noindex, no ribbon, no ask boxes, root path) in its own repo, and Jeff
   creates the Vercel project. Then the owner switches the nameservers. It's live within about 24 hours.
   Cloudflare import: set every imported record to **grey** (orange breaks Webnode email autoconfig and the old
   site's https). Edit the existing apex/www rows to Vercel's values rather than adding new ones (Cloudflare
   refuses a duplicate name). The live repo is a plain copy of `sites/<site>/` (Vercel builds it with no env vars,
   so preview-only parts vanish), and `SITE_URL` must match the primary domain Vercel uses. Redirect the
   `*.vercel.app` address to the real domain once it's green.
5. After the switch: zone active, domain valid, https on both names, old URLs 301, email still arrives,
   sitemap in Search Console.
6. Hosting terms for new clients (Jeff, 2026-10-31): **1 year free, then €20/month**. Vuorikosken Mylly
   keeps the 3 years free it was promised (then "katsotaan"). If the domain was bought through the old builder, move it to Cloudflare
   before it expires, in the owner's name.

## 10. Always learn

After each client round, add what was new to the site's case file and, if it's a rule, here. Dated, short.
