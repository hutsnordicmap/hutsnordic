import { ActivitiesView } from "@/app/components/Views";
import { paths, shared, ui } from "@/app/content";
import { pageMetadata } from "@/app/metadata";

export const metadata = pageMetadata({
  locale: "fi",
  path: paths.activities.fi,
  otherPath: paths.activities.en,
  title: ui.fi.activitiesPageTitle,
  description: ui.fi.activitiesDescription,
  image: shared.sup.lg,
});

export default function Page() {
  return <ActivitiesView locale="fi" />;
}
