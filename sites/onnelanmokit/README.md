# onnelanmokit.com

Website for Onnelan mökit (Villa Onnela and Villa Suvikallio) on Lake Puula, Läsäkoski, Kangasniemi.
Finnish is at `/`, `/villa-onnela`, `/villa-suvikallio` and `/yhteystiedot`. English is under `/en`.
Built and hosted free by Huts.fi (first client of huts.fi/business/trial, 3 years from go-live).

All copy and facts live in `app/content.ts`. Facts come from the owner's old Weebly site (read
2026-10-28) and the photos they approved for Huts.fi. Photos are served from the Huts.fi Supabase bucket.

Old Weebly addresses (`/villa-onnela.html`, `/villa-suvikallio.html`, `/contact.html`, `/index.html`)
301 to the new pages, so Google keeps the old ranking.

The site deploys from `main` on its own Vercel project. It is not part of huts.fi.

`PREVIEW_EXPORT=1 npx next build` writes a static copy to `out/` for previews before the domain moves.
