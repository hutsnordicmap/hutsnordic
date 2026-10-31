import { SaunaView } from "@/app/components/Views";
import { paths, sauna, ui } from "@/app/content";
import { pageMetadata } from "@/app/metadata";

export const metadata = pageMetadata({
  locale: "fi",
  path: paths.sauna.fi,
  otherPath: paths.sauna.en,
  title: ui.fi.saunaPageTitle,
  description: ui.fi.saunaDescription,
  image: sauna.photos[0].lg,
});

export default function Page() {
  return <SaunaView locale="fi" />;
}
