# Case: Elämyslaiva (saunalaiva, Santalahti, Tampere)

Contact Jarkko, info@elamyslaiva.fi. Phones on the site: Sakri 040 848 1081, Eemeli 040 779 4157. Huts.fi
organisation `65c8b33b-f99b-4c6f-9a5c-4dede27ade72`. Old site: elamyslaiva.fi on Webnode (Jarkko offered the
Webnode logins; not needed so far). Booking: calendly.com/elamyslaiva-info.
Preview: https://hutsnordic.fi/preview/elamyslaiva. Source: `sites/elamyslaiva/`.
Drop box: https://hutsnordic.fi/drop/<token> (token kept out of git; slug `elamyslaiva`).

## What happened, in order

| When | What |
|---|---|
| 5.11. | Photo-permission email mentioned a free website redesign. Jarkko asked what it means. |
| 9.11. | Jeff honoured it: "a basic one-pager like saunax.ax, video-focused, but the video much clearer (no dark shading)". First rough version as a static demo in taisto (`apps/web/public/website-demos/elamyslaiva`). |
| 10.11. | Moved here as a real site with ask boxes, "Mitä teimme" page, FAQ, JSON-LD, llms.txt. Drop box made with 15 homework questions. |

## Build notes

- **Format:** one page, Finnish only (their site is Finnish only; English asked as homework). Order follows saunax.ax:
  video, Varaa, prices, what's on board, photo strip, party video, extras, paragliding, FAQ, map + contact.
- **Video:** their two clips are YouTube Shorts (vertical). Cloud can't download YouTube, and a Shorts embed draws
  YouTube's logo and like/share buttons over the video, so a muted background loop (the Mökkiloma trick) doesn't work.
  Hero = their photo + "Katso video" tap-to-play. With the original MP4, set `videos.hero.file` and it autoplays clean.
- **Words never on the video** (Jeff 9.11.), so no shading at all.
- **Colours:** lake black #0b1317 + neon pink #ff4f9a (their lounge lights and the pink SUP), Bricolage Grotesque + Figtree.
- **Fact conflicts (asked):** prices (day 490 vs "kysy tarjous", night 790 vs 549, cruise 1280 vs 1189, "alk. 390" on
  home), sleeps 9–11 vs 11–12. Page uses the long-text figures (490 / 790 / 1280, 11).
- **Old URLs:** /varauskalenteri, /varauskalenteri2 → /#hinnat, /galleria → /#kuvat (live build only).
