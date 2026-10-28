import type { Metadata } from "next";
import type { Locale } from "@/app/content";

type PageMeta = {
  locale: Locale;
  path: string;
  otherPath: string;
  title: string;
  description: string;
  image?: string;
};

export function pageMetadata({ locale, path, otherPath, title, description, image }: PageMeta): Metadata {
  const fi = locale === "fi" ? path : otherPath;
  const en = locale === "en" ? path : otherPath;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path, languages: { fi, en, "x-default": fi } },
    openGraph: {
      title,
      description,
      url: path,
      siteName: "Onnelan mökit",
      locale: locale === "fi" ? "fi_FI" : "en_GB",
      type: "website",
      images: image ? [{ url: image }] : undefined,
    },
  };
}
