import { ServiceView } from "@/app/components/Views";
import { pages, paths } from "@/app/content";
import { pageMetadata } from "@/app/metadata";

const page = pages.juhlatila.fi;

export const metadata = pageMetadata({
  locale: "fi",
  path: paths.juhlatila.fi,
  otherPath: paths.juhlatila.en,
  title: page.title,
  description: page.description,
  image: page.hero.src,
});

export default function Page() {
  return <ServiceView id="juhlatila" locale="fi" />;
}
