import { ActivitiesView } from "@/app/components/Views";
import { paths, shared, ui } from "@/app/content";
import { pageMetadata } from "@/app/metadata";

export const metadata = pageMetadata({
  locale: "en",
  path: paths.activities.en,
  otherPath: paths.activities.fi,
  title: ui.en.activitiesPageTitle,
  description: ui.en.activitiesDescription,
  image: shared.sup.lg,
});

export default function Page() {
  return <ActivitiesView locale="en" />;
}
