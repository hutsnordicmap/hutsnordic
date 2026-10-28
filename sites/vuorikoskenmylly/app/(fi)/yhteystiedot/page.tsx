import { ContactView } from "@/app/components/Views";
import { contactPage, paths, photos } from "@/app/content";
import { pageMetadata } from "@/app/metadata";

export const metadata = pageMetadata({
  locale: "fi",
  path: paths.contact.fi,
  otherPath: paths.contact.en,
  title: contactPage.fi.title,
  description: contactPage.fi.description,
  image: photos.porch.src,
});

export default function Page() {
  return <ContactView locale="fi" />;
}
