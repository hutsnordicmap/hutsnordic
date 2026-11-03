import { AreaView } from "@/app/components/Views";
import { gallery, paths, ui } from "@/app/content";
import { pageMetadata } from "@/app/metadata";

export const metadata = pageMetadata({
  locale: "en",
  path: paths.area.en,
  otherPath: paths.area.fi,
  title: ui.en.areaMeta,
  description: ui.en.areaDescription,
  image: gallery[0].src,
});

export default function Page() {
  return <AreaView locale="en" />;
}
