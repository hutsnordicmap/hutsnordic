import { PageView } from "@/app/components/Views";
import { pages, paths } from "@/app/content";
import { pageMetadata } from "@/app/metadata";

const p = pages.historia;

export const metadata = pageMetadata({ locale: "fi", path: paths.historia.fi, otherPath: paths.historia.en, title: p.title.fi, description: p.description.fi, image: p.photos[0].src });

export default function Page() {
  return <PageView id="historia" locale="fi" />;
}
