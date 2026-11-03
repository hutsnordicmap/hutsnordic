import Link from "next/link";
import { RootHtml } from "@/app/components/RootHtml";

export const metadata = { title: "Sivua ei löytynyt – Kelomaja" };

export default function GlobalNotFound() {
  return (
    <RootHtml lang="fi">
      <main className="mx-auto max-w-xl px-4 py-32 text-center">
        <h1 className="font-serif text-4xl text-night">Sivua ei löytynyt</h1>
        <p className="mt-4 text-ink/75">Page not found</p>
        <p className="mt-8 flex justify-center gap-6">
          <Link href="/" className="text-kelo hover:underline">Etusivulle</Link>
          <Link href="/en" className="text-kelo hover:underline">Home (English)</Link>
        </p>
      </main>
    </RootHtml>
  );
}
