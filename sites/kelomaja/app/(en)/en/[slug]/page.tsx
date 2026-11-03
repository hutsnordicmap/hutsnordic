import { notFound } from "next/navigation";
import { UnitView } from "@/app/components/Views";
import { unitList, unitMeta, unitPath } from "@/app/content";
import { pageMetadata } from "@/app/metadata";

export const dynamicParams = false;

export function generateStaticParams() {
  return unitList.map((u) => ({ slug: u.slug }));
}

const find = (slug: string) => unitList.find((u) => u.slug === slug);

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const u = find((await params).slug);
  if (!u) return {};
  return pageMetadata({ locale: "en", path: unitPath(u, "en"), otherPath: unitPath(u, "fi"), ...unitMeta(u, "en"), image: u.photos[0].src });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const u = find((await params).slug);
  if (!u) notFound();
  return <UnitView id={u.id} locale="en" />;
}
