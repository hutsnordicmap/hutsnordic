import type { MetadataRoute } from "next";
import { SITE_URL } from "@/app/content";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: SITE_URL, lastModified: new Date("2026-11-10") }];
}
