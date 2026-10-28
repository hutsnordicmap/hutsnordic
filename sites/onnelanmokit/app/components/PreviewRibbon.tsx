import Link from "next/link";
import { isPreview } from "@/app/content";

/** Only in the preview build: tells the owner this is not live yet and links the SEO walkthrough. */
export function PreviewRibbon() {
  if (!isPreview) return null;
  return (
    <div className="relative z-30 bg-[#ffb27a] px-4 py-2 text-center text-xs font-medium text-lake-deep sm:text-sm">
      Esikatselu, ei vielä julkaistu · Preview, not live yet ·{" "}
      <Link href="/mita-teimme" className="font-bold underline underline-offset-2">
        Mitä teimme Googlea varten →
      </Link>
    </div>
  );
}
