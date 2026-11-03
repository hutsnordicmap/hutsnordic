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
| 3.11. | Jeff: use huts.fi's map to promote *his* site: clicking a place on the map opens his own page about it. Built as the huts.fi embed option `links=` (taisto PR #661, not live until Jeff says go). |

## Build notes

- **Area content kept, reorganised:** one `/sallatunturi` page (winter / summer, ski stats) plus one page per
  nearby place or trail (`/sallatunturi/<slug>`), our own words, his facts. The 8 picks match the map.
- **Map links to his pages:** the embed URL carries `links=<hutsId>:/path,…`; hover card, preview card and pin
  click open his page in the top window. Huts.fi credit stays under the map. Until #661 ships, production ignores
  `links=` and the list rows beside the map do the linking.
- **Reviews:** Nettimökki reviews read privately only (e.g. guests mention check-in, so we ask about a code lock).
  Never quoted, never stored, no rating schema.
- **Photos:** his own photos only. Left out as AI-made or stock-looking: skier, aurora, hiker/biker, collage, a
  snowy log cabin.
- **Colours:** night blue #18273a + kelo amber #a8743a, Fraunces + Inter.
- **Fact conflicts (asked in the ask boxes):** Kuusisto 2 bedrooms/6 (old site) vs 1 bedroom + loft, 4+2
  (Nettimökki); Kelomaja parking 5 vs 2; stove induction or ceramic; lit tracks 43 vs 45 km. Vertical drop
  215 m (his counter) vs 230 m (huts.fi).
- **Huts.fi data issues (map data, Jeff's OK needed):** Kelomaja and Kuusisto pins sit on the same coordinate
  (Kuusisto's is likely wrong); both link to the old webnode site; no photos on either place.
