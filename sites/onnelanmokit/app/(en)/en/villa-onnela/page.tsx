import { VillaView } from "@/app/components/Views";
import { villaMeta, villas } from "@/app/content";
import { pageMetadata } from "@/app/metadata";

const villa = villas.onnela;

export const metadata = pageMetadata({
  locale: "en",
  path: villa.path.en,
  otherPath: villa.path.fi,
  ...villaMeta.onnela.en,
  image: villa.photos[0].src,
});

export default function Page() {
  return <VillaView id="onnela" locale="en" />;
}
