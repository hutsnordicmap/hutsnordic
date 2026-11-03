import { PrivacyView } from "@/app/components/Views";
import { paths, photos, privacyPage } from "@/app/content";
import { pageMetadata } from "@/app/metadata";

export const metadata = pageMetadata({
  locale: "en",
  path: paths.privacy.en,
  otherPath: paths.privacy.fi,
  title: privacyPage.en.title,
  description: privacyPage.en.description,
  image: photos.porch.src,
});

export default function Page() {
  return <PrivacyView locale="en" />;
}
