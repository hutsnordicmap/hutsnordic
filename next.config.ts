import type { NextConfig } from "next";

// Client site previews live as static files in public/preview/<site>/ (built elsewhere with
// basePath /preview/<site>). They must never be indexed: X-Robots-Tag here, a noindex meta tag
// in every page, and a Disallow in robots.txt.
const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/preview/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" }],
      },
      {
        // Private client drop boxes: the link itself is the key, so never index it or leak it as a referrer.
        source: "/drop/:path*",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" },
          { key: "Referrer-Policy", value: "no-referrer" },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      { source: "/preview/:site", destination: "/preview/:site/index.html" },
      { source: "/preview/:site/:path*", destination: "/preview/:site/:path*.html" },
    ];
  },
};

export default nextConfig;
