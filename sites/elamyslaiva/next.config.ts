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
  // Old Webnode addresses keep their Google ranking by pointing at the new one-pager.
  ...(previewExport
    ? {}
    : {
        async redirects() {
          return [
            moved("/varauskalenteri", "/#hinnat"),
            moved("/varauskalenteri2", "/#hinnat"),
            moved("/galleria", "/#kuvat"),
          ];
        },
      }),
};

export default nextConfig;
