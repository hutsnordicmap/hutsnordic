import type { Metadata } from "next";

// Jeff's short way into the drop box admin. Never indexed (also X-Robots-Tag in next.config.ts and Disallow in robots.ts).
export const metadata: Metadata = {
  title: "Huts Nordic admin",
  robots: { index: false, follow: false, nocache: true },
  referrer: "no-referrer",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="drop-root min-h-full flex-1">{children}</div>;
}
