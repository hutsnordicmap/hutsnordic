# mokkiloma.fi

Website for Elijärven Mökkilomat (Mika Merilä): six holiday cottages and a smoke sauna around Lake Elijärvi,
Yläne, Pöytyä. Finnish is at `/`, English under `/en`. Built and hosted by Huts.fi.

All copy and facts live in `app/content.ts`. Facts come from the owner's old WordPress site (read
2026-10-31), his emails to Huts.fi and his own photos (downloaded from the old site, in `public/photos/`).

Pages: home (full-screen video, cottage finder, compare table), `/mokit` and one page per cottage,
`/aktiviteetit/savusauna`, `/aktiviteetit`, `/varaus`. Old WordPress addresses 301 to the new pages in
`next.config.ts` (`/mokit/rantamaki` is Fransula).

The intro video plays from the owner's YouTube channel until he sends the original file; then swap the
iframe in `app/components/VideoHero.tsx` for a plain muted, looping `<video>`.

`PREVIEW_EXPORT=1 PREVIEW_BASE_PATH=/preview/mokkiloma npx next build` writes the static preview to `out/`.
