import { VillaView } from "@/app/components/Views";
import { villaMeta, villas } from "@/app/content";
import { pageMetadata } from "@/app/metadata";

const villa = villas.suvikallio;

export const metadata = pageMetadata({
  locale: "en",
  path: villa.path.en,
  otherPath: villa.path.fi,
  ...villaMeta.suvikallio.en,
  image: villa.photos[0].src,
});

export default function Page() {
  return <VillaView id="suvikallio" locale="en" />;
}
