import { CottagesView } from "@/app/components/Views";
import { paths, shared, ui } from "@/app/content";
import { pageMetadata } from "@/app/metadata";

export const metadata = pageMetadata({
  locale: "en",
  path: paths.cottages.en,
  otherPath: paths.cottages.fi,
  title: ui.en.cottagesTitle,
  description: ui.en.cottagesDescription,
  image: shared.aerialKotolahti.lg,
});

export default function Page() {
  return <CottagesView locale="en" />;
}
