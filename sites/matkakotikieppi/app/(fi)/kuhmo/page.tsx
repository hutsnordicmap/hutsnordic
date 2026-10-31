import { ContentView } from "@/app/components/Views";
import { pages, paths } from "@/app/content";
import { pageMetadata } from "@/app/metadata";

const page = pages.kuhmo.fi;

export const metadata = pageMetadata({
  locale: "fi",
  path: paths.kuhmo.fi,
  otherPath: paths.kuhmo.en,
  title: page.title,
  description: page.description,
  image: page.hero.src,
});

export default function Page() {
  return <ContentView id="kuhmo" locale="fi" />;
}
