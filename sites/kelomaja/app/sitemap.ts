import type { MetadataRoute } from "next";
import { nearby, nearbyPath, paths, SITE_URL, unitList, unitPath } from "@/app/content";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-11-03");
  const pairs: { fi: string; en: string }[] = [paths.home, ...unitList.map((u) => ({ fi: unitPath(u, "fi"), en: unitPath(u, "en") })),
    paths.area,
    ...nearby.map((n) => ({ fi: nearbyPath(n, "fi"), en: nearbyPath(n, "en") })),
  ];
  const url = (p: string) => `${SITE_URL}${p === "/" ? "" : p}`;
  return pairs.map((p) => ({ url: url(p.fi), lastModified, alternates: { languages: { fi: url(p.fi), en: url(p.en) } } }));
}
