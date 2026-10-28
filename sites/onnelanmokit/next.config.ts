import type { NextConfig } from "next";

// PREVIEW_EXPORT=1 builds a plain static copy for showing a preview before the
// domain moves. The live site on Vercel never sets it.
const previewExport = process.env.PREVIEW_EXPORT === "1";

function moved(source: string, destination: string) {
  return { source, destination, statusCode: 301 as const };
}

const nextConfig: NextConfig = {
  ...(previewExport
    ? { output: "export" as const, basePath: process.env.PREVIEW_BASE_PATH || undefined }
    : {}),
  experimental: { globalNotFound: true },
  images: {
    unoptimized: previewExport,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "aqyqvkpbznygsbmrzfde.supabase.co",
        pathname: "/storage/v1/object/public/feature-images/**",
      },
    ],
  },
  // Old Weebly addresses keep their Google ranking by pointing at the new pages.
  ...(previewExport
    ? {}
    : {
        async redirects() {
          return [
            moved("/index.html", "/"),
            moved("/villa-onnela.html", "/villa-onnela"),
            moved("/villa-suvikallio.html", "/villa-suvikallio"),
            moved("/contact.html", "/yhteystiedot"),
          ];
        },
      }),
};

export default nextConfig;
