import { ContactView } from "@/app/components/Views";
import { paths, ui } from "@/app/content";
import { pageMetadata } from "@/app/metadata";

export const metadata = pageMetadata({
  locale: "fi",
  path: paths.contact.fi,
  otherPath: paths.contact.en,
  title: `${ui.fi.contactTitle} – Onnelan mökit, Kangasniemi`,
  description: ui.fi.contactDescription,
});

export default function Page() {
  return <ContactView locale="fi" />;
}
