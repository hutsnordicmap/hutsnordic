# hutsnordic.fi

Huts Nordic. For now this site also hosts **client website previews** before their own domains move.

- `sites/<site>/` holds each client site's source (a standalone Next.js app; it gets its own repo and
  Vercel project at go-live).
- `public/preview/<site>/` is that site's static preview, built with
  `PREVIEW_EXPORT=1 PREVIEW_BASE_PATH=/preview/<site> npx next build` inside `sites/<site>/`, then copying `out/`.
- Previews are never indexed: every page has `noindex, nofollow`, `next.config.ts` sends `X-Robots-Tag`
  for `/preview/*`, and `robots.txt` disallows `/preview/`. Nothing links to them.

Current previews: https://hutsnordic.fi/preview/onnelanmokit (Onnelan mökit, Kangasniemi).
