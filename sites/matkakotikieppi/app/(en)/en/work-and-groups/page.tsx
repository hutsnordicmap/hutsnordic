import { ContentView } from "@/app/components/Views";
import { pages, paths } from "@/app/content";
import { pageMetadata } from "@/app/metadata";

const page = pages.tyo.en;

export const metadata = pageMetadata({
  locale: "en",
  path: paths.tyo.en,
  otherPath: paths.tyo.fi,
  title: page.title,
  description: page.description,
  image: page.hero.src,
});

export default function Page() {
  return <ContentView id="tyo" locale="en" />;
}
