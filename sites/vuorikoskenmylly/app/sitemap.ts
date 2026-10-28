import type { MetadataRoute } from "next";
import { paths, SITE_URL } from "@/app/content";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-10-28");
  const url = (p: string) => `${SITE_URL}${p === "/" ? "" : p}`;
  return Object.values(paths).map((p) => ({
    url: url(p.fi),
    lastModified,
    alternates: { languages: { fi: url(p.fi), en: url(p.en) } },
  }));
}
