import { HomeView } from "@/app/components/Views";
import { home, paths, photos } from "@/app/content";
import { pageMetadata } from "@/app/metadata";

export const metadata = pageMetadata({
  locale: "fi",
  path: paths.home.fi,
  otherPath: paths.home.en,
  title: home.fi.title,
  description: home.fi.description,
  image: photos.outside.src,
});

export default function Page() {
  return <HomeView locale="fi" />;
}
