import { Cormorant_Garamond, Manrope } from "next/font/google";
import { PreviewRibbon } from "@/app/components/PreviewRibbon";
import type { Locale } from "@/app/content";
import "@/app/globals.css";

const manrope = Manrope({ subsets: ["latin", "latin-ext"], variable: "--font-manrope" });
const cormorant = Cormorant_Garamond({
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
});

export function RootHtml({ lang, children }: { lang: Locale; children: React.ReactNode }) {
  return (
    <html lang={lang} className={`${manrope.variable} ${cormorant.variable} antialiased`}>
      <body className="min-h-screen font-sans">
        <PreviewRibbon />
        <div className="relative">{children}</div>
      </body>
    </html>
  );
}
