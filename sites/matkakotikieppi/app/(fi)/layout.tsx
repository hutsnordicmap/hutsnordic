import type { Metadata } from "next";
import { RootHtml } from "@/app/components/RootHtml";
import { isPreview, SITE_URL } from "@/app/content";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: "Matkakoti Kieppi",
  // The preview copy must never reach Google: noindex here, plus a header and robots.txt on the preview host.
  robots: isPreview ? { index: false, follow: false, googleBot: { index: false, follow: false } } : { index: true, follow: true },
};

export default function FinnishLayout({ children }: { children: React.ReactNode }) {
  return <RootHtml lang="fi">{children}</RootHtml>;
}
