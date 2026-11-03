import { PageView } from "@/app/components/Views";
import { pages, paths } from "@/app/content";
import { pageMetadata } from "@/app/metadata";

const p = pages.historia;

export const metadata = pageMetadata({ locale: "en", path: paths.historia.en, otherPath: paths.historia.fi, title: p.title.en, description: p.description.en, image: p.photos[0].src });

export default function Page() {
  return <PageView id="historia" locale="en" />;
}
