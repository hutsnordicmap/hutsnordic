import { DM_Serif_Display, Inter } from "next/font/google";
import { PreviewRibbon } from "@/app/components/PreviewRibbon";
import type { Locale } from "@/app/content";
import "@/app/globals.css";

const inter = Inter({ subsets: ["latin", "latin-ext"], variable: "--font-inter" });
const display = DM_Serif_Display({ subsets: ["latin", "latin-ext"], weight: "400", variable: "--font-display" });

export function RootHtml({ lang, children }: { lang: Locale; children: React.ReactNode }) {
  return (
    <html lang={lang} className={`${inter.variable} ${display.variable} antialiased`}>
      <body className="min-h-screen font-sans">
        <PreviewRibbon />
        <div className="relative">{children}</div>
      </body>
    </html>
  );
}
