import { PrivacyView } from "@/app/components/Views";
import { paths, photos, privacyPage } from "@/app/content";
import { pageMetadata } from "@/app/metadata";

export const metadata = pageMetadata({
  locale: "fi",
  path: paths.privacy.fi,
  otherPath: paths.privacy.en,
  title: privacyPage.fi.title,
  description: privacyPage.fi.description,
  image: photos.porch.src,
});

export default function Page() {
  return <PrivacyView locale="fi" />;
}
