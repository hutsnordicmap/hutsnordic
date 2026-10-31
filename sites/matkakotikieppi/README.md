# matkakotikieppi.fi

Website for Matkakoti Kieppi (Vienantie 3, Kuhmo), a 14-room guesthouse run by Kari-Mikko Sarkkinen. Finnish at `/`,
English under `/en`. Built by Huts.fi (1 year free, then 20 €/month).

All copy and facts live in `app/content.ts`, taken from the owner's old WordPress site (read 2026-10-31), the photos he
allowed Huts.fi to use and Huts.fi's nearby places. Photos are in `public/photos/`. The old addresses `/majoitus`,
`/yhteystiedot`, `/en/accommodation` and `/en/contact-us` are kept; `/en/frontpage` 301s to `/en` in `next.config.ts`.

`PREVIEW_EXPORT=1 PREVIEW_BASE_PATH=/preview/matkakotikieppi npx next build` writes the static preview to `out/`.
