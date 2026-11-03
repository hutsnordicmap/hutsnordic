import { PageView } from "@/app/components/Views";
import { pages, paths } from "@/app/content";
import { pageMetadata } from "@/app/metadata";

const p = pages.huvila;

export const metadata = pageMetadata({ locale: "fi", path: paths.huvila.fi, otherPath: paths.huvila.en, title: p.title.fi, description: p.description.fi, image: p.photos[0].src });

export default function Page() {
  return <PageView id="huvila" locale="fi" />;
}
