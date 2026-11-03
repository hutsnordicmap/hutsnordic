# villakukkapaa.fi

Website for Villa Kukkapää (Pentti Parkkinen): a 1904 sawmill manager's villa and a lakeside sauna house on Lake
Saimaa in Sulkava. Finnish is at `/`, English under `/en`. Built and hosted by Huts.fi.

All copy and facts live in `app/content.ts`. Facts come from the owner's old WordPress site (FI + EN, read
2026-11-03) and his Huts.fi place. Photos are his, from the old site's media library and photo gallery; the history
photos are from Ulla Kiviaho's family album, as credited on the old site. The home page video (`public/video/hero.mp4`)
is an 18 s silent loop cut from the drone and sauna shots in his own 1080p guest video. Guest reviews from booking
sites are not used as text.

Pages: home, `/huvila`, `/rantasauna`, `/tekemista`, `/historia` (+ `/en/...`). Old addresses 301 in `next.config.ts`.
Booking goes to his Lomarengas listing.

`PREVIEW_EXPORT=1 PREVIEW_BASE_PATH=/preview/villakukkapaa npx next build` writes the static preview to `out/`.
