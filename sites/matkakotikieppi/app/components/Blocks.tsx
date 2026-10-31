import { Car, ClipboardList, Footprints, Navigation } from "lucide-react";
import {
  business,
  HUTS,
  hutsPlace,
  included,
  isPreview,
  mapEmbed,
  paths,
  rooms,
  route,
  SITE_URL,
  splitIcon,
  ui,
  type Locale,
  type PageId,
} from "@/app/content";
import { Glyph } from "@/app/components/Icon";

export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

/** Preview only: a dashed box listing what we still need from the owner. */
export function Ask({ locale, items, tone = "light" }: { locale: Locale; items: string[]; tone?: "light" | "dark" }) {
  if (!isPreview || items.length === 0) return null;
  const t = ui[locale];
  return (
    <div className={`rounded-2xl border-2 border-dashed p-5 ${tone === "dark" ? "border-[#ffb27a]/60 text-paper/85" : "border-[#d9772f]/60 bg-[#fff6ee] text-ink/80"}`}>
      <p className="flex items-center gap-2 font-semibold text-[#d9772f]">
        <ClipboardList className="size-5" aria-hidden />
        {t.askTitle}
      </p>
      <p className="mt-1 text-xs opacity-70">{t.askNote}</p>
      <ul className="mt-3 list-disc space-y-1 pl-5 text-sm">
        {items.map((i) => (
          <li key={i}>{i}</li>
        ))}
      </ul>
    </div>
  );
}

export function SectionTitle({ kicker, title, tone = "light" }: { kicker?: string; title: string; tone?: "light" | "dark" }) {
  return (
    <div>
      {kicker ? <p className={`label ${tone === "dark" ? "text-lingon-light" : "text-lingon"}`}>{kicker}</p> : null}
      <h2 className="mt-3 text-balance font-display text-3xl leading-[1.1] sm:text-4xl lg:text-5xl">{title}</h2>
    </div>
  );
}

/** The "included in every room" list as an icon grid. */
export function Included({ locale, tone = "light" }: { locale: Locale; tone?: "light" | "dark" }) {
  return (
    <ul className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
      {included[locale].map((entry) => {
        const [icon, text] = splitIcon(entry);
        return (
          <li key={entry} className="flex items-center gap-4">
            <span className={`grid size-11 shrink-0 place-items-center rounded-full ${tone === "dark" ? "bg-white/10 text-lingon-light" : "bg-birch text-lingon"}`}>
              <Glyph name={icon} />
            </span>
            <span className="font-medium">{text}</span>
          </li>
        );
      })}
    </ul>
  );
}

/**
 * Huts.fi map of the guesthouse with nearby places and routes. The embed's own credit bar is hidden (hideAttr=1),
 * so there is exactly one Huts.fi link: this plain, followed link on the client's page. The NLS credit moves out
 * with it, because the map tiles' licence requires it.
 */
export function MapEmbed({
  locale,
  src,
  frameRef,
  frameClassName = "h-[360px] sm:h-[460px]",
}: {
  locale: Locale;
  src?: string;
  frameRef?: React.Ref<HTMLIFrameElement>;
  frameClassName?: string;
}) {
  const t = ui[locale];
  return (
    <div>
      <iframe ref={frameRef} src={src ?? mapEmbed(locale)} title={t.mapTitle} loading="lazy" className={`block w-full rounded-2xl border-0 bg-birch ${frameClassName}`} allowFullScreen />
      <p className="py-2 text-right text-xs opacity-70">
        {t.mapCredit}{" "}
        <a href={`${HUTS}${hutsPlace[locale]}`} className="font-bold text-[#FF6B00]">
          Huts.fi
        </a>
        <span className="text-ink/50">
          {" · "}
          <a href={locale === "fi" ? "https://www.maanmittauslaitos.fi" : "https://www.maanmittauslaitos.fi/en"} rel="nofollow noopener" className="hover:underline">
            © {locale === "fi" ? "Maanmittauslaitos" : "NLS Finland"}
          </a>
        </span>
      </p>
    </div>
  );
}

export function GettingHere({ locale }: { locale: Locale }) {
  const t = ui[locale];
  return (
    <div className="space-y-6">
      <div>
        <p className="label opacity-60">{t.address}</p>
        <p className="mt-2 font-display text-2xl leading-snug">
          {business.street}
          <br />
          {business.postalCode} {business.town}
        </p>
      </div>
      <div>
        <p className="flex items-center gap-2 font-semibold">
          <Car className="size-5" strokeWidth={1.5} aria-hidden />
          {t.byCar}
        </p>
        <p className="mt-1 text-sm leading-relaxed opacity-80">{t.byCarText}</p>
      </div>
      <div>
        <p className="flex items-center gap-2 font-semibold">
          <Footprints className="size-5" strokeWidth={1.5} aria-hidden />
          {t.walk}
        </p>
        <p className="mt-1 text-sm leading-relaxed opacity-80">{t.walkText}</p>
      </div>
      <a href={route} rel="noopener" className="inline-flex items-center gap-2 rounded-full bg-lingon px-5 py-3 font-semibold text-white hover:bg-lingon-dark">
        <Navigation className="size-4" aria-hidden />
        {t.route}
      </a>
    </div>
  );
}

export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-current/15 border-y border-current/15">
      {items.map((item) => (
        <details key={item.q} className="group py-5">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 font-display text-xl [&::-webkit-details-marker]:hidden">
            {item.q}
            <span className="mt-1 text-2xl leading-none text-lingon transition group-open:rotate-45">+</span>
          </summary>
          <p className="mt-3 max-w-2xl leading-relaxed opacity-80">{item.a}</p>
        </details>
      ))}
    </div>
  );
}

/* ----------------------------- JSON-LD ----------------------------- */

const address = {
  "@type": "PostalAddress",
  streetAddress: business.street,
  postalCode: business.postalCode,
  addressLocality: business.town,
  addressRegion: "Kainuu",
  addressCountry: "FI",
};

const pageUrl = (p: string) => `${SITE_URL}${p === "/" ? "" : p}`;
const lodgingId = `${SITE_URL}/#matkakoti`;

/** The guesthouse as one LodgingBusiness with its two room types. No ratings or reviews, ever. */
export function lodgingJsonLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    "@id": lodgingId,
    name: business.name,
    url: pageUrl(paths.home[locale]),
    image: `${SITE_URL}/photos/matkakoti-kieppi-ulkoa.jpg`,
    telephone: business.phone,
    email: business.email,
    address,
    geo: { "@type": "GeoCoordinates", latitude: business.lat, longitude: business.lng },
    numberOfRooms: business.rooms,
    areaServed: ["Kuhmo", "Kainuu"],
    sameAs: [business.facebook, `${HUTS}${hutsPlace[locale]}`],
    amenityFeature: ["Free WiFi", "Bed linen and towels", "Shared guest kitchen", "Free parking", "Car engine heater", "Evening sauna on request", "Shared bathrooms"].map(
      (name) => ({ "@type": "LocationFeatureSpecification", name, value: true }),
    ),
    containsPlace: rooms.map((r, i) => ({
      "@type": "HotelRoom",
      name: r.name[locale],
      description: r.text[locale],
      occupancy: { "@type": "QuantitativeValue", maxValue: i === 0 ? 1 : 3 },
    })),
  };
}

export function pageJsonLd(id: PageId, locale: Locale, name: string, description: string, faq: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "WebPage", "@id": `${pageUrl(paths[id][locale])}#page`, name, description, url: pageUrl(paths[id][locale]), about: { "@id": lodgingId } },
      { "@type": "FAQPage", mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
    ],
  };
}

export function faqJsonLd(faq: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
}
