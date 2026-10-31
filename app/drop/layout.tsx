import type { Metadata } from "next";

// Private client drop boxes: never indexed (also X-Robots-Tag in next.config.ts and Disallow in robots.ts).
export const metadata: Metadata = {
  title: "Huts Nordic",
  robots: { index: false, follow: false, nocache: true },
  referrer: "no-referrer",
};

export default function DropLayout({ children }: { children: React.ReactNode }) {
  return <div className="drop-root min-h-full flex-1">{children}</div>;
}
