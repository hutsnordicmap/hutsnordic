import { HomeView } from "@/app/components/Views";
import { home, paths, photos } from "@/app/content";
import { pageMetadata } from "@/app/metadata";

export const metadata = pageMetadata({
  locale: "en",
  path: paths.home.en,
  otherPath: paths.home.fi,
  title: home.en.title,
  description: home.en.description,
  image: photos.porch.src,
});

export default function Page() {
  return <HomeView locale="en" />;
}
