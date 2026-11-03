import Link from "next/link";
import { isPreview } from "@/app/content";

/** Preview build only: links the owner to the walkthrough of what we did and why. */
export function PreviewRibbon() {
  if (!isPreview) return null;
  return (
    <div className="relative z-30 bg-kelo-light px-4 py-2 text-center text-xs font-medium text-night sm:text-sm">
      <Link href="/mita-teimme" className="font-bold underline underline-offset-2">
        Mitä teimme Googlea varten →
      </Link>
    </div>
  );
}
