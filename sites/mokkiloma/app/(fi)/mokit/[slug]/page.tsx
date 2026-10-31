import { notFound } from "next/navigation";
import { CottageView } from "@/app/components/Views";
import { cottageList, cottageMeta, cottagePath } from "@/app/content";
import { pageMetadata } from "@/app/metadata";

export const dynamicParams = false;

export function generateStaticParams() {
  return cottageList.map((c) => ({ slug: c.slug.fi }));
}

const find = (slug: string) => cottageList.find((c) => c.slug.fi === slug);

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const c = find((await params).slug);
  if (!c) return {};
  return pageMetadata({
    locale: "fi",
    path: cottagePath(c, "fi"),
    otherPath: cottagePath(c, "en"),
    ...cottageMeta(c, "fi"),
    image: c.photos[0].lg,
  });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const c = find((await params).slug);
  if (!c) notFound();
  return <CottageView id={c.id} locale="fi" />;
}
