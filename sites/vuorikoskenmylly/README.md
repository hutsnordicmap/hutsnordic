# vuorikoskenmylly.com

Website for Vuorikosken Mylly (Tavolantie 18, Sammatti, Lohja): café, vintage and interior shop, summer gallery,
event room and two small B&B cabins. Finnish at `/`, English under `/en`. Built and hosted free by Huts.fi
(huts.fi/business trial, 3 years from go-live).

All copy and facts live in `app/content.ts`, taken from the owner's old Webnode site (read 2026-10-28) and the
photos he allowed us to use. The `live` block in that file (notice bar, opening days, lodging status) is what the
owner changes most; it is kept apart so an owner editor can replace it.

Photos are in `public/photos/`. Old Webnode addresses (`/aamiaismajoitus/`, `/mutterimokki/`, `/rantayksio/`,
`/taidenayttelyt/`, `/galleria-info/`) 301 to the new pages in `next.config.ts`.

`PREVIEW_EXPORT=1 PREVIEW_BASE_PATH=/preview/vuorikoskenmylly npx next build` writes the static preview to `out/`.
