import { ServiceView } from "@/app/components/Views";
import { pages, paths } from "@/app/content";
import { pageMetadata } from "@/app/metadata";

const page = pages.kahvila.fi;

export const metadata = pageMetadata({
  locale: "fi",
  path: paths.kahvila.fi,
  otherPath: paths.kahvila.en,
  title: page.title,
  description: page.description,
  image: page.hero.src,
});

export default function Page() {
  return <ServiceView id="kahvila" locale="fi" />;
}
