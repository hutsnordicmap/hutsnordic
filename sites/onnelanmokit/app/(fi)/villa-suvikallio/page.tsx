import { VillaView } from "@/app/components/Views";
import { villaMeta, villas } from "@/app/content";
import { pageMetadata } from "@/app/metadata";

const villa = villas.suvikallio;

export const metadata = pageMetadata({
  locale: "fi",
  path: villa.path.fi,
  otherPath: villa.path.en,
  ...villaMeta.suvikallio.fi,
  image: villa.photos[0].src,
});

export default function Page() {
  return <VillaView id="suvikallio" locale="fi" />;
}
