import Link from "next/link";
import { RootHtml } from "@/app/components/RootHtml";

export const metadata = { title: "Sivua ei löytynyt – Elijärven Mökkilomat" };

export default function GlobalNotFound() {
  return (
    <RootHtml lang="fi">
      <main className="mx-auto max-w-xl px-4 py-32 text-center">
        <h1 className="font-serif text-4xl font-semibold text-forest">Sivua ei löytynyt</h1>
        <p className="mt-4 text-ink/75">Page not found</p>
        <p className="mt-8 flex justify-center gap-6">
          <Link href="/" className="text-copper hover:underline">Etusivulle</Link>
          <Link href="/en" className="text-copper hover:underline">Home (English)</Link>
        </p>
      </main>
    </RootHtml>
  );
}
