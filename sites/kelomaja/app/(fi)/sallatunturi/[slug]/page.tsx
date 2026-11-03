import { notFound } from "next/navigation";
import { NearbyView } from "@/app/components/Views";
import { gallery, nearby, nearbyMeta, nearbyPath } from "@/app/content";
import { pageMetadata } from "@/app/metadata";

export const dynamicParams = false;

export function generateStaticParams() {
  return nearby.map((n) => ({ slug: n.slug }));
}

const find = (slug: string) => nearby.find((n) => n.slug === slug);

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const n = find((await params).slug);
  if (!n) return {};
  return pageMetadata({ locale: "fi", path: nearbyPath(n, "fi"), otherPath: nearbyPath(n, "en"), ...nearbyMeta(n, "fi"), image: (n.photo ?? gallery[0]).src });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const n = find((await params).slug);
  if (!n) notFound();
  return <NearbyView item={n} locale="fi" />;
}
