# kelomaja.fi

Website for Arvo Puhakka's two holiday cabins at Sallatunturi, Salla: Kelomaja (Revontie 8 B) and Kuusisto
(Tunturitie 10 A). Finnish at `/`, English under `/en`. Built and hosted by Huts.fi.

All copy and facts live in `app/content.ts`. Sources: his WordPress site kelomaja.fi and his own Nettimökki listings
(read 2026-11-03), plus huts.fi data for nearby places. Guest reviews are private notes only, never on the site.

Pages: home, `/kelomaja`, `/kuusisto`, `/sallatunturi` (his activities content) and `/sallatunturi/<place>`, one page
per nearby place or trail. The huts.fi map uses `?links=` so a click on a pin opens that page here
(needs the huts.fi embed change in `hutsnordicmap/taisto`; until it ships, the list links next to the map work).

`PREVIEW_EXPORT=1 PREVIEW_BASE_PATH=/preview/kelomaja npx next build` writes the static preview to `out/`.
`HUTS_EMBED_ORIGIN=http://localhost:3001` points the map at a local huts.fi for testing.
