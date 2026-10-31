import type { MetadataRoute } from "next";
import { cottageList, cottagePath, paths, SITE_URL } from "@/app/content";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-10-31");
  const pairs: { fi: string; en: string }[] = [
    paths.home,
    paths.cottages,
    ...cottageList.map((c) => ({ fi: cottagePath(c, "fi"), en: cottagePath(c, "en") })),
    paths.sauna,
    paths.activities,
    paths.booking,
  ];
  const url = (p: string) => `${SITE_URL}${p === "/" ? "" : p}`;
  return pairs.map((p) => ({
    url: url(p.fi),
    lastModified,
    alternates: { languages: { fi: url(p.fi), en: url(p.en) } },
  }));
}
