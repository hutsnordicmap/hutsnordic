import { CottagesView } from "@/app/components/Views";
import { paths, shared, ui } from "@/app/content";
import { pageMetadata } from "@/app/metadata";

export const metadata = pageMetadata({
  locale: "fi",
  path: paths.cottages.fi,
  otherPath: paths.cottages.en,
  title: ui.fi.cottagesTitle,
  description: ui.fi.cottagesDescription,
  image: shared.aerialKotolahti.lg,
});

export default function Page() {
  return <CottagesView locale="fi" />;
}
