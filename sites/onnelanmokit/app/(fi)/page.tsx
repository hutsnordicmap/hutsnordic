import { HomeView } from "@/app/components/Views";
import { paths, ui, villas } from "@/app/content";
import { pageMetadata } from "@/app/metadata";

export const metadata = pageMetadata({
  locale: "fi",
  path: paths.home.fi,
  otherPath: paths.home.en,
  title: ui.fi.homeTitle,
  description: ui.fi.homeDescription,
  image: villas.onnela.photos[1].src,
});

export default function Page() {
  return <HomeView locale="fi" />;
}
