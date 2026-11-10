import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Figtree } from "next/font/google";
import Link from "next/link";
import { isPreview, SITE_URL } from "@/app/content";
import "@/app/globals.css";

const display = Bricolage_Grotesque({ subsets: ["latin", "latin-ext"], weight: ["700", "800"], variable: "--font-display" });
const body = Figtree({ subsets: ["latin", "latin-ext"], weight: ["400", "600", "700"], variable: "--font-body" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: "Elämyslaiva",
  // The preview copy must never reach Google: noindex here, plus a header and robots.txt on the preview host.
  robots: isPreview ? { index: false, follow: false, googleBot: { index: false, follow: false } } : { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: "#0b1317", viewportFit: "cover" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fi" className={`${display.variable} ${body.variable}`}>
      <body>
        {isPreview ? (
          <div className="ribbon">
            Esikatselu · <Link href="/mita-teimme">Mitä teimme Googlea varten →</Link>
          </div>
        ) : null}
        {children}
      </body>
    </html>
  );
}
