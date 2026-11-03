import { TubView } from "@/app/components/Views";
import { paths, tub, ui } from "@/app/content";
import { pageMetadata } from "@/app/metadata";

export const metadata = pageMetadata({
  locale: "fi",
  path: paths.tub.fi,
  otherPath: paths.tub.en,
  title: ui.fi.tubMeta,
  description: ui.fi.tubDescription,
  image: tub.photos[0].src,
});

export default function Page() {
  return <TubView locale="fi" />;
}
