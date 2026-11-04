# Case: Kelomaja and Kuusisto (Sallatunturi, Salla)

Owner Arvo Puhakka, puhakkaarvo@gmail.com (site shows arvo.puhakka@kelomaja.fi), 050 539 4738. Huts.fi
organization `31222a7a-97a4-4bef-8630-4f3aaf0f347c` ("Mökit Sallatunturissa"). Two rentals:
Kelomaja (Revontie 8 B, kelo log, 6 people) and Kuusisto (Tunturitie 10 A, renovated, 4+2). Both listed on
Nettimökki (kelomaja/52377, kuusisto/51299). Old site: webnode with a long "aktiviteetit" page about the area.
Preview: https://hutsnordic.fi/preview/kelomaja. Source: `sites/kelomaja/`.
Drop box: https://hutsnordic.fi/drop/<token> (token kept out of git; slug `kelomaja`).

## What happened, in order

| When | What |
|---|---|
| 3.11. | Jeff talked with Arvo and promised a start of a redesign. Preview built from the old site + Nettimökki facts. |
| 3.11. | Jeff: Arvo said we can use his photos. 13 Kelomaja + 12 Kuusisto photos added to huts.fi (photo pins). Kuusisto pin moved to Tunturitie 10 (OSM address point); Kelomaja stays on Revontie (OSM has no house 8), Arvo asked to confirm both. |
| 3.11. | Jeff: use huts.fi's map to promote *his* site: clicking a place on the map opens his own page about it. Built as the huts.fi embed option `links=` (taisto PR #661, not live until Jeff says go). |
| 3.11. | Arvo saved 15 answers 17:08–17:18 and left without pressing send. The 2-hourly check turned them into a work request at 18:08, the site and reply were done at 18:13. |
| 4.11. | Salla photos back, Call made the main button, Nettimökki calendar question added. |

## Build notes

- **Area content kept, reorganised:** one `/sallatunturi` page (winter / summer, ski stats) plus one page per
  nearby place or trail (`/sallatunturi/<slug>`), our own words, his facts. The 8 picks match the map.
- **Map links to his pages:** the embed URL carries `links=<hutsId>:/path,…`; hover card, preview card and pin
  click open his page in the top window. Huts.fi credit stays under the map. Until #661 ships, production ignores
  `links=` and the list rows beside the map do the linking.
- **Reviews:** Nettimökki reviews read privately only (e.g. guests mention check-in, so we ask about a code lock).
  Never quoted, never stored, no rating schema.
- **Photos:** his own photos only. First left out as AI-made or stock-looking: skier, aurora, hiker/biker, collage,
  a snowy log cabin. Arvo says they are his and gave written permission by email (3.11.), so Jeff put skier,
  aurora and hiker/biker back on 4.11. (skier = winter photo, hiker/biker = summer photo, aurora in the gallery).
  The collage stays out: it is a poster with text on it, not a photo. The snowy cabin was the ski-track photo
  already in use.
- **Booking:** Arvo prefers phone, then email, then Nettimökki. So Call is the main button (unit price box and
  the phone bar), email under it, Nettimökki a small link (Jeff 4.11.: "make judgment calls").
- **Payments:** bank transfer or MobilePay; he takes no cards himself. Nettimökki's own payment (Nettimaksu)
  costs the owner 299 € + VAT a year per listing and 2.5 % per booking; guests pay 3.5 % (nettimokki.com/hinnasto,
  read 4.11.). Nettimökki's public pages say nothing about calendar export or sync (iCal), so we don't suggest
  our own online booking with payment until we know his Nettimökki calendar can sync: asked him in the drop box.
- **Colours:** night blue #18273a + kelo amber #a8743a, Fraunces + Inter.
- **Fact conflicts (asked in the ask boxes):** Kuusisto 2 bedrooms/6 (old site) vs 1 bedroom + loft, 4+2
  (Nettimökki); Kelomaja parking 5 vs 2; stove induction or ceramic; lit tracks 43 vs 45 km. Vertical drop
  215 m (his counter) vs 230 m (huts.fi).
- **Huts.fi data:** both places still link to the old webnode site (change when his new site goes live).
- **Main map** opens on the two cabins (lat/lng/zoom in the embed URL), not fitted to every pick: fitting to the
  4.7 km tower made his own pin a dot at the edge (Jeff 3.11.).
