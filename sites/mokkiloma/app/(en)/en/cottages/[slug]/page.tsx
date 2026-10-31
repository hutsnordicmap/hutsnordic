import { notFound } from "next/navigation";
import { CottageView } from "@/app/components/Views";
import { cottageList, cottageMeta, cottagePath } from "@/app/content";
import { pageMetadata } from "@/app/metadata";

export const dynamicParams = false;

export function generateStaticParams() {
  return cottageList.map((c) => ({ slug: c.slug.en }));
}

const find = (slug: string) => cottageList.find((c) => c.slug.en === slug);

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const c = find((await params).slug);
  if (!c) return {};
  return pageMetadata({
    locale: "en",
    path: cottagePath(c, "en"),
    otherPath: cottagePath(c, "fi"),
    ...cottageMeta(c, "en"),
    image: c.photos[0].lg,
  });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const c = find((await params).slug);
  if (!c) notFound();
  return <CottageView id={c.id} locale="en" />;
}
