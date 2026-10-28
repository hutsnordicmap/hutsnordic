import { Figtree, Fraunces } from "next/font/google";
import { PreviewRibbon } from "@/app/components/PreviewRibbon";
import type { Locale } from "@/app/content";
import "@/app/globals.css";

const figtree = Figtree({ subsets: ["latin", "latin-ext"], variable: "--font-figtree" });
const fraunces = Fraunces({ subsets: ["latin", "latin-ext"], variable: "--font-fraunces" });

export function RootHtml({ lang, children }: { lang: Locale; children: React.ReactNode }) {
  return (
    <html lang={lang} className={`${figtree.variable} ${fraunces.variable} antialiased`}>
      <body className="min-h-screen font-sans">
        <PreviewRibbon />
        <div className="relative">{children}</div>
      </body>
    </html>
  );
}
