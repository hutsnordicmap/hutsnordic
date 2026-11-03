# Case: Villa Kukkapää (villakukkapaa.fi, Sulkava)

Owner Pentti Parkkinen, pentti.parkkinen@fimnet.fi, 0400 312 802 (also Kirsi, 0400 760 448). Register keeper on the old
privacy page: Parmed Oy. Huts.fi organization `13db0eed-161d-4f9b-bf0c-96cfffa24f91`, place `91d4dd04-…` (Vekarantie 462).
One rental: a 250 m² villa from 1904 (renovated 2012) and a 90 m² lakeside sauna house, sleeps 10 + 4, 200 m sand beach,
20 000 m² fenced grounds. Booked through Lomarengas (listing 13347). Old site: WordPress, FI/EN/DE/FR/RU, ~100 photos
(1000–2100 px) in a Photo Gallery plugin, history page with 14 old photos from Ulla Kiviaho's family album.
Preview: https://hutsnordic.fi/preview/villakukkapaa. Source: `sites/villakukkapaa/`.
Drop box: slug `villakukkapaa` (token kept out of git). Offer: 2 years free.

## What happened, in order

| When | What |
|---|---|
| 2.11. | Pentti asked for a preview. Drop page created 3.11. |
| 3.11. | Preview built from the old site (FI + EN), his photos, a home video cut from his own drone shots, and huts.fi nearby places. |

## Build notes

- **Video home page:** his main promo video is 640 px from 2016 with burned-in captions, too soft for full screen. His
  2025 guest video ("tulisijojen käyttö", 1080p, 8 min) opens and ends with clean drone shots. `public/video/hero.mp4` is an
  18 s silent loop (Saimaa from the air, the villa from above, the sauna, the fire; 1280 px, 2.8 MB). Cut each segment
  with input `-ss` and concat: one `trim` filter graph over the 650 MB file ran out of memory.
- The full guest video plays on the sauna page from his own server (`preload="none"`). For go-live, host a compressed copy.
- **Reviews:** Jeff pasted Lomarengas reviews as private notes only. Never quote, copy or summarise them on the site; they
  only steer which facts lead (big groups, shallow beach, AitoKiuas, gear, fenced plot, pets). His old home page shows
  copied reviews; the new site does not.
- **Colours** from the house: Saimaa blue, ochre-yellow boards, red base. Playfair Display + Inter.
- **Unknowns asked:** bedroom count (FI page 5, EN page and video 4), current gear (kayaks, bikes, SUP), frisbee golf on site,
  norppa sightings, business ID, the 1987 sauna plaque story.
- **Huts.fi data:** a second pin "Kukkapää" (Saunas, Vekarantie 469, no organization) sits 0.6 km away. Possibly his sauna; not changed.
- **Instagram/Facebook:** from the cloud both refuse (Instagram 401 "require_login", Facebook redirects to login). The free,
  full-quality route is the owner's own Meta "Download your information" export (photos, videos and captions), asked as homework.
