# tapsanmokit.com

Website for Tapsan Mökit (Tapani Nieminen): Huvila Uurainen on Lake Iso-Uurainen, a round-log cottage on a pond in
Kuikka (Jyväskylä), an apartment with a sauna in Tikkakoski, and a mobile hot tub for rent. Finnish is at `/`,
English under `/en`. Built and hosted by Huts.fi.

All copy and facts live in `app/content.ts`. Facts come from the owner's old BaseKit site (read 2026-11-03) and the
addresses he gave Huts.fi. Photos are his, downloaded from the old site (640 px, so originals are on the ask list).
Each place page embeds his existing public Google Calendar for availability.

Pages: home, `/huvila-uurainen`, `/mokki-jyvaskyla`, `/huoneisto-tikkakoski`, `/kylpytynnyri` (+ `/en/...`).
Old addresses 301 in `next.config.ts`.

`PREVIEW_EXPORT=1 PREVIEW_BASE_PATH=/preview/tapsanmokit npx next build` writes the static preview to `out/`.
