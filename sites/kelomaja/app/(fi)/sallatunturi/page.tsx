import { AreaView } from "@/app/components/Views";
import { gallery, paths, ui } from "@/app/content";
import { pageMetadata } from "@/app/metadata";

export const metadata = pageMetadata({
  locale: "fi",
  path: paths.area.fi,
  otherPath: paths.area.en,
  title: ui.fi.areaMeta,
  description: ui.fi.areaDescription,
  image: gallery[0].src,
});

export default function Page() {
  return <AreaView locale="fi" />;
}
