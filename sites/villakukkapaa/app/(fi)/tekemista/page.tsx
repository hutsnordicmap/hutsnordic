import { PageView } from "@/app/components/Views";
import { pages, paths } from "@/app/content";
import { pageMetadata } from "@/app/metadata";

const p = pages.tekemista;

export const metadata = pageMetadata({ locale: "fi", path: paths.tekemista.fi, otherPath: paths.tekemista.en, title: p.title.fi, description: p.description.fi, image: p.photos[0].src });

export default function Page() {
  return <PageView id="tekemista" locale="fi" />;
}
