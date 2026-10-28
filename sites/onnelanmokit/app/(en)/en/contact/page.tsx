import { ContactView } from "@/app/components/Views";
import { paths, ui } from "@/app/content";
import { pageMetadata } from "@/app/metadata";

export const metadata = pageMetadata({
  locale: "en",
  path: paths.contact.en,
  otherPath: paths.contact.fi,
  title: `${ui.en.contactTitle} – Onnelan mökit, Kangasniemi`,
  description: ui.en.contactDescription,
});

export default function Page() {
  return <ContactView locale="en" />;
}
