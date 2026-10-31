import { SaunaView } from "@/app/components/Views";
import { paths, sauna, ui } from "@/app/content";
import { pageMetadata } from "@/app/metadata";

export const metadata = pageMetadata({
  locale: "en",
  path: paths.sauna.en,
  otherPath: paths.sauna.fi,
  title: ui.en.saunaPageTitle,
  description: ui.en.saunaDescription,
  image: sauna.photos[0].lg,
});

export default function Page() {
  return <SaunaView locale="en" />;
}
