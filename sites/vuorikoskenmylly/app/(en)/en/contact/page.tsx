import { ContactView } from "@/app/components/Views";
import { contactPage, paths, photos } from "@/app/content";
import { pageMetadata } from "@/app/metadata";

export const metadata = pageMetadata({
  locale: "en",
  path: paths.contact.en,
  otherPath: paths.contact.fi,
  title: contactPage.en.title,
  description: contactPage.en.description,
  image: photos.porch.src,
});

export default function Page() {
  return <ContactView locale="en" />;
}
