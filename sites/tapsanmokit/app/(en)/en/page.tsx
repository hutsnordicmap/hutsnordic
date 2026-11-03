import { HomeView } from "@/app/components/Views";
import { paths, ui, units } from "@/app/content";
import { pageMetadata } from "@/app/metadata";

export const metadata = pageMetadata({
  locale: "en",
  path: paths.home.en,
  otherPath: paths.home.fi,
  title: ui.en.homeTitle,
  description: ui.en.homeDescription,
  image: units.huvila.photos[0].src,
});

export default function Page() {
  return <HomeView locale="en" />;
}
