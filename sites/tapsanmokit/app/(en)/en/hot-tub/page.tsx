import { TubView } from "@/app/components/Views";
import { paths, tub, ui } from "@/app/content";
import { pageMetadata } from "@/app/metadata";

export const metadata = pageMetadata({
  locale: "en",
  path: paths.tub.en,
  otherPath: paths.tub.fi,
  title: ui.en.tubMeta,
  description: ui.en.tubDescription,
  image: tub.photos[0].src,
});

export default function Page() {
  return <TubView locale="en" />;
}
