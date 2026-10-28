import { Bodoni_Moda, Hanken_Grotesk } from "next/font/google";
import { PreviewRibbon } from "@/app/components/PreviewRibbon";
import type { Locale } from "@/app/content";
import "@/app/globals.css";

const hanken = Hanken_Grotesk({ subsets: ["latin", "latin-ext"], variable: "--font-hanken" });
const bodoni = Bodoni_Moda({ subsets: ["latin", "latin-ext"], style: ["normal", "italic"], variable: "--font-bodoni" });

export function RootHtml({ lang, children }: { lang: Locale; children: React.ReactNode }) {
  return (
    <html lang={lang} className={`${hanken.variable} ${bodoni.variable} antialiased`}>
      <body className="min-h-screen font-sans">
        <PreviewRibbon lang={lang} />
        <div className="relative">{children}</div>
      </body>
    </html>
  );
}
