import { ServiceView } from "@/app/components/Views";
import { pages, paths } from "@/app/content";
import { pageMetadata } from "@/app/metadata";

const page = pages.majoitus.en;

export const metadata = pageMetadata({
  locale: "en",
  path: paths.majoitus.en,
  otherPath: paths.majoitus.fi,
  title: page.title,
  description: page.description,
  image: page.hero.src,
});

export default function Page() {
  return <ServiceView id="majoitus" locale="en" />;
}
