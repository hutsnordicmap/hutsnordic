import { ServiceView } from "@/app/components/Views";
import { pages, paths } from "@/app/content";
import { pageMetadata } from "@/app/metadata";

const page = pages.putiikki.en;

export const metadata = pageMetadata({
  locale: "en",
  path: paths.putiikki.en,
  otherPath: paths.putiikki.fi,
  title: page.title,
  description: page.description,
  image: page.hero.src,
});

export default function Page() {
  return <ServiceView id="putiikki" locale="en" />;
}
