import { PageView } from "@/app/components/Views";
import { pages, paths } from "@/app/content";
import { pageMetadata } from "@/app/metadata";

const p = pages.sauna;

export const metadata = pageMetadata({ locale: "en", path: paths.sauna.en, otherPath: paths.sauna.fi, title: p.title.en, description: p.description.en, image: p.photos[0].src });

export default function Page() {
  return <PageView id="sauna" locale="en" />;
}
