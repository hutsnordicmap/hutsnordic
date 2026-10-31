import { Courgette, Figtree, Fraunces } from "next/font/google";
import { PreviewRibbon } from "@/app/components/PreviewRibbon";
import type { Locale } from "@/app/content";
import "@/app/globals.css";

const figtree = Figtree({ subsets: ["latin", "latin-ext"], variable: "--font-figtree" });
const fraunces = Fraunces({ subsets: ["latin", "latin-ext"], style: ["normal", "italic"], variable: "--font-fraunces" });
// The script face from the owner's own sign logo.
const courgette = Courgette({ subsets: ["latin", "latin-ext"], weight: "400", variable: "--font-courgette" });

export function RootHtml({ lang, children }: { lang: Locale; children: React.ReactNode }) {
  return (
    <html lang={lang} className={`${figtree.variable} ${fraunces.variable} ${courgette.variable} antialiased`}>
      <body className="min-h-screen font-sans">
        <PreviewRibbon lang={lang} />
        <div className="relative">{children}</div>
      </body>
    </html>
  );
}
