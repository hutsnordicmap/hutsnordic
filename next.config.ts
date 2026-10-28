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
