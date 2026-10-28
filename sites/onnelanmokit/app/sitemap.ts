import type { MetadataRoute } from "next";
import { paths, SITE_URL, villaList } from "@/app/content";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-10-28");
  const pairs = [paths.home, ...villaList.map((v) => v.path), paths.contact];
  return pairs.map((p) => ({
    url: `${SITE_URL}${p.fi === "/" ? "" : p.fi}`,
    lastModified,
    alternates: { languages: { fi: `${SITE_URL}${p.fi === "/" ? "" : p.fi}`, en: `${SITE_URL}${p.en}` } },
  }));
}
