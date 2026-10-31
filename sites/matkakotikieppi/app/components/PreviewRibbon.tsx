import Link from "next/link";
import { isPreview, type Locale } from "@/app/content";

/** Only in the preview build: tells the owner this is not live yet and links the SEO walkthrough. */
export function PreviewRibbon({ lang }: { lang: Locale }) {
  if (!isPreview) return null;
  return (
    <div className="relative z-40 bg-[#ffb27a] px-4 py-2 text-center text-xs font-medium text-ink sm:text-sm">
      {lang === "fi" ? "Esikatselu, ei vielä julkaistu" : "Preview, not live yet"} ·{" "}
      <Link href="/mita-teimme" className="font-bold underline underline-offset-2">
        Mitä teimme ja miksi →
      </Link>
    </div>
  );
}
