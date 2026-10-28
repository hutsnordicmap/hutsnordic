import { VillaView } from "@/app/components/Views";
import { villaMeta, villas } from "@/app/content";
import { pageMetadata } from "@/app/metadata";

const villa = villas.onnela;

export const metadata = pageMetadata({
  locale: "fi",
  path: villa.path.fi,
  otherPath: villa.path.en,
  ...villaMeta.onnela.fi,
  image: villa.photos[0].src,
});

export default function Page() {
  return <VillaView id="onnela" locale="fi" />;
}
