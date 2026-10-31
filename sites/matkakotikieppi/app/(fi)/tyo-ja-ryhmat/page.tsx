import { ContentView } from "@/app/components/Views";
import { pages, paths } from "@/app/content";
import { pageMetadata } from "@/app/metadata";

const page = pages.tyo.fi;

export const metadata = pageMetadata({
  locale: "fi",
  path: paths.tyo.fi,
  otherPath: paths.tyo.en,
  title: page.title,
  description: page.description,
  image: page.hero.src,
});

export default function Page() {
  return <ContentView id="tyo" locale="fi" />;
}
