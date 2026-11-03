import type { NextConfig } from "next";

// PREVIEW_EXPORT=1 builds a plain static copy for showing a preview before the
// domain moves. The live site on Vercel never sets it.
const previewExport = process.env.PREVIEW_EXPORT === "1";
const basePath = previewExport ? process.env.PREVIEW_BASE_PATH || "" : "";

function moved(source: string, destination: string) {
  return { source, destination, statusCode: 301 as const };
}

const nextConfig: NextConfig = {
  ...(previewExport ? { output: "export" as const, basePath: basePath || undefined } : {}),
  // Photos live in public/ and are written as plain paths, so they need the preview prefix by hand.
  env: { BASE_PATH: basePath },
  experimental: { globalNotFound: true },
  images: { unoptimized: previewExport },
  // Old WordPress addresses keep their Google ranking by pointing at the new pages.
  ...(previewExport
    ? {}
    : {
        async redirects() {
          return [
            moved("/fi", "/"),
            moved("/fi/historia", "/historia"),
            moved("/fi/kuvagalleria", "/huvila"),
            moved("/fi/varustelu-ja-lisatiedot", "/huvila"),
            moved("/fi/varustelu-ja-lisatiedot/vuokraaminen", "/#varaa"),
            moved("/fi/saunavideo", "/rantasauna"),
            moved("/fi/aktiviteetteja-lahialueilla", "/tekemista"),
            moved("/fi/kalastus", "/tekemista"),
            moved("/fi/luksusta-lomallesi", "/tekemista"),
            moved("/fi/tapahtumia-sulkavalla", "/tekemista"),
            moved("/fi/yhteystiedot", "/#yhteys"),
            moved("/en/picture-gallery", "/en/villa"),
            moved("/en/additional-information-facilities", "/en/villa"),
            moved("/en/additional-information-facilities/local-activities-and-services", "/en/things-to-do"),
            moved("/en/contact", "/en#yhteys"),
            moved("/de/:path*", "/en"),
            moved("/fr/:path*", "/en"),
            moved("/ru/:path*", "/en"),
          ];
        },
      }),
};

export default nextConfig;
