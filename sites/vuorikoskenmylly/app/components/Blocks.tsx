import { Bus, Car, ClipboardList, Navigation } from "lucide-react";
import { dayRange, hoursText } from "@/app/hours";
import { business, HUTS, hutsLinks, isPreview, live, paths, route, SITE_URL, ui, type Locale, type OpenDay, type PageId } from "@/app/content";

export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

/** Preview only: a dashed box listing what we still need from the owner. */
export function Ask({ locale, items, tone = "light" }: { locale: Locale; items: string[]; tone?: "light" | "dark" }) {
  if (!isPreview || items.length === 0) return null;
  const t = ui[locale];
  return (
    <div className={`border-2 border-dashed p-5 ${tone === "dark" ? "border-[#ffb27a]/60 text-flour/85" : "border-[#d9772f]/60 bg-[#fff6ee] text-ink/80"}`}>
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
      {kicker ? <p className={`label ${tone === "dark" ? "text-rust-light" : "text-rust"}`}>{kicker}</p> : null}
      <h2 className="mt-3 text-balance font-display text-3xl leading-[1.08] sm:text-4xl lg:text-5xl">{title}</h2>
    </div>
  );
}

export function HoursList({ locale }: { locale: Locale }) {
  const years = [...new Set(live.openDays.map((d) => d.from.slice(0, 4)))];
  return (
    <div className="space-y-8">
      {years.map((y) => (
        <div key={y}>
          <p className="label opacity-60">{y}</p>
          <ul className="mt-2 divide-y divide-current/10 border-y border-current/10">
            {live.openDays
              .filter((d) => d.from.startsWith(y))
              .map((d) => (
                <li key={d.from} className="flex flex-wrap items-baseline justify-between gap-x-4 py-3">
                  <span className="font-semibold">{dayRange(d, locale)}</span>
                  <span className="text-sm opacity-70">{d.label[locale]}</span>
                  <span className="ml-auto tabular-nums">{hoursText(d, locale)}</span>
                </li>
              ))}
          </ul>
        </div>
      ))}
      <p className="text-sm opacity-70">{live.breaks[locale]}</p>
    </div>
  );
}

/** Huts.fi map of the mill. The visible Huts.fi link sits outside the iframe on purpose. */
export function MapEmbed({ locale, src, title }: { locale: Locale; src?: string; title?: string }) {
  const t = ui[locale];
  const url = src ?? (locale === "fi" ? business.mapEmbed : business.mapEmbed.replace("/suomi/", "/finland/"));
  return (
    <div>
      <iframe src={url} title={title ?? t.mapTitle} loading="lazy" className="block h-[360px] w-full border-0 bg-bran sm:h-[460px]" allowFullScreen />
      <p className="py-2 text-right text-xs opacity-70">
        {t.mapCredit}{" "}
        <a href={HUTS} className="font-bold text-[#FF6B00]">
          Huts.fi
        </a>
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
          {business.postalCode} {business.village}, {business.municipality}
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
          <Bus className="size-5" strokeWidth={1.5} aria-hidden />
          {t.byBus}
        </p>
        <p className="mt-1 text-sm leading-relaxed opacity-80">{t.byBusText}</p>
      </div>
      <a href={route} rel="noopener" className="inline-flex items-center gap-2 bg-rust px-5 py-3 font-semibold text-white hover:bg-[#a04824]">
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
            <span className="mt-1 text-2xl leading-none text-rust transition group-open:rotate-45">+</span>
          </summary>
          <p className="mt-3 max-w-2xl leading-relaxed opacity-80">{item.a}</p>
        </details>
      ))}
    </div>
  );
}

/* ----------------------------- JSON-LD ----------------------------- */

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function openingHours(list: OpenDay[]) {
  return list.map((d) => {
    const out: string[] = [];
    for (let x = new Date(`${d.from}T12:00:00`); x <= new Date(`${d.to}T12:00:00`) && out.length < 7; x.setDate(x.getDate() + 1)) {
      if (!d.days || d.days.includes(x.getDay())) out.push(days[x.getDay()]);
    }
    return { "@type": "OpeningHoursSpecification", dayOfWeek: out, opens: d.open, closes: d.close, validFrom: d.from, validThrough: d.to };
  });
}

const address = {
  "@type": "PostalAddress",
  streetAddress: business.street,
  postalCode: business.postalCode,
  addressLocality: business.village,
  addressRegion: "Uusimaa",
  addressCountry: "FI",
};

const pageUrl = (p: string) => `${SITE_URL}${p === "/" ? "" : p}`;
const millId = `${SITE_URL}/#mylly`;

const types: Record<PageId, string> = {
  kahvila: "CafeOrCoffeeShop",
  putiikki: "Store",
  galleria: "ArtGallery",
  juhlatila: "EventVenue",
  majoitus: "BedAndBreakfast",
};

/** The mill as one local business with its five parts as departments. No ratings or reviews, ever. */
export function millJsonLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": millId,
    name: business.name,
    url: pageUrl(paths.home[locale]),
    logo: `${SITE_URL}/vkm-logo.png`,
    image: `${SITE_URL}/photos/mylly-kuisti-galleria.jpg`,
    telephone: business.phone,
    email: business.email,
    foundingDate: String(business.founded),
    address,
    geo: { "@type": "GeoCoordinates", latitude: business.lat, longitude: business.lng },
    areaServed: ["Sammatti", "Lohja", "Länsi-Uusimaa", "Uusimaa"],
    sameAs: [business.facebook, ...hutsLinks.map((l) => `${HUTS}${l[locale]}`)],
    openingHoursSpecification: openingHours(live.openDays),
    department: (Object.keys(types) as PageId[]).map((id) => ({ "@id": `${SITE_URL}${paths[id].fi}#${id}` })),
    event: live.events.map((e) => ({
      "@type": "Event",
      name: e.name,
      description: e.text[locale],
      startDate: `${e.from}T${e.open}`,
      endDate: `${e.to}T${e.close}`,
      eventStatus: "https://schema.org/EventScheduled",
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      location: { "@type": "Place", name: business.name, address },
      organizer: { "@id": millId },
    })),
  };
}

export function serviceJsonLd(id: PageId, locale: Locale, name: string, description: string, faq: { q: string; a: string }[]) {
  const node: Record<string, unknown> = {
    "@type": types[id],
    "@id": `${SITE_URL}${paths[id].fi}#${id}`,
    name: `${business.name} – ${name}`,
    description,
    url: pageUrl(paths[id][locale]),
    telephone: business.phone,
    address,
    geo: { "@type": "GeoCoordinates", latitude: business.lat, longitude: business.lng },
    parentOrganization: { "@id": millId },
  };
  if (id === "kahvila") {
    node.servesCuisine = ["Gluten-free baking", "Lactose-free baking", "Vegan options", "Coffee", "Cakes"];
    node.paymentAccepted = "Cash, Credit Card, MobilePay";
    node.priceRange = "€";
    node.amenityFeature = [{ "@type": "LocationFeatureSpecification", name: "Pets allowed", value: true }];
    node.openingHoursSpecification = openingHours(live.openDays);
  }
  if (id === "putiikki") node.openingHoursSpecification = openingHours(live.openDays);
  if (id === "majoitus") {
    Object.assign(node, { checkinTime: "15:00", checkoutTime: "12:00", priceRange: "59 €", numberOfRooms: 2 });
  }
  return {
    "@context": "https://schema.org",
    "@graph": [
      node,
      {
        "@type": "FAQPage",
        mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      },
    ],
  };
}
