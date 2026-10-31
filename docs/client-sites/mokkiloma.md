# Case: Elijärven Mökkilomat (mokkiloma.fi, Yläne)

Owner Mika Merilä, mikameri@netti.fi, 0400 534 973 / (02) 256 8604, Meriläntie 24, 21900 Yläne. Six cottages
(Elimäki 12, Meritähti 8, Merenneito 8, Meripoika 5, Pöytäkallio 6, Fransula 6) and a smoke sauna by a crayfish
pond. Old site: WordPress (custom theme, built by his son's friend, last edited about 2020). Preview:
https://hutsnordic.fi/preview/mokkiloma. Source: `sites/mokkiloma/`.

## What happened, in order

| When | What |
|---|---|
| 30.10. | Mika gave photo permission for huts.fi, confirmed each cottage's address, then asked for new sites "made from the old photos" and what happens after the free period. Offer for him: 2 years free, then 20 €/month (he was offered 2 years before the 1-year rule). |
| 31.10. | Preview built. Jeff's brief: many cottages that are hard to tell apart, so arctichomes.rentals-style list and listing pages; full-screen intro video with nothing over it, like harmala.fi. |

## Build notes

- **Photos:** 112 originals (2048 px, professional) downloaded from the old WordPress `wp-content/uploads` (strip the
  `-150x150` suffix to get the full size), converted to WebP in `public/photos/lg` (1400 px) and `sm` (760 px).
  Stock photos on the old site (forest road, snowy trees, boardwalk, water) were left out. Fransula only has five
  small 600 px photos from 2020, so new ones are on the ask list.
- **Video:** the owner's own YouTube video (`l_uFxbHQtfQ`, "Mokkilomat overview 2020", his channel). YouTube blocks
  downloads from the cloud ("sign in to confirm you're not a bot") and from the Mac's Cowork VM (proxy 403), so the hero
  embeds it muted and looping from youtube-nocookie, starting at 0:26 as Jeff linked, with the aerial photo on top for
  the first seconds. When Mika sends the file, swap the iframe in `VideoHero.tsx` for a `<video>`.
- **Telling cottages apart:** every cottage has a one-line tagline, "best for", location and "from" price; the home
  and /mokit pages have a group-size filter and a compare table. Taglines come only from the owner's text or what
  his photos show. The real difference between Meritähti and Merenneito is an open question for Mika.
- **Design:** forest green + sand, copper accent, Cormorant Garamond + Manrope, rounded photo tiles (1 + 4 mosaic on
  desktop, swipe on phones). Different from Onnela (blue lake) and Vuorikoski (black).
- **Old URLs:** WordPress `/mokit/<name>/` kept as is; `/mokit/rantamaki` is Fransula; `/yhteystiedot` → `/varaus`;
  activity subpages → anchors on `/aktiviteetit`; the smoke sauna keeps `/aktiviteetit/savusauna`.
- Contradictions on the old site are asked, not guessed: weekend end (Sun 15 vs 18), canoe price (20 vs 30 €),
  Fransula's overlapping week ranges, Pöytäkallio's list price, and whether prices are 2026 or 2027.
