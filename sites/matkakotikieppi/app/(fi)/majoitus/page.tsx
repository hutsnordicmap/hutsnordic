import { ContentView } from "@/app/components/Views";
import { pages, paths } from "@/app/content";
import { pageMetadata } from "@/app/metadata";

const page = pages.majoitus.fi;

export const metadata = pageMetadata({
  locale: "fi",
  path: paths.majoitus.fi,
  otherPath: paths.majoitus.en,
  title: page.title,
  description: page.description,
  image: page.hero.src,
});

export default function Page() {
  return <ContentView id="majoitus" locale="fi" />;
}
