import Link from "next/link";
import { ClipboardList, Users } from "lucide-react";
import { Icon } from "@/app/components/Icon";
import {
  business,
  cottageList,
  cottagePath,
  euro,
  extras,
  HUTS,
  isPreview,
  paths,
  SITE_URL,
  terms,
  ui,
  type Cottage,
  type Locale,
} from "@/app/content";

export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

export function Button({
  href,
  children,
  variant = "solid",
  full = false,
}: {
  href: string;
  children: React.ReactNode;
  variant?: "solid" | "dark" | "light" | "ghost" | "outline";
  full?: boolean;
}) {
  const styles = {
    solid: "bg-copper text-white hover:bg-[#9a5330]",
    dark: "bg-forest text-white hover:bg-forest-deep",
    light: "bg-white text-forest hover:bg-moss",
    ghost: "border border-forest/25 text-forest hover:bg-moss",
    outline: "border border-white/50 text-white hover:bg-white/10",
  }[variant];
  const className = `inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition ${full ? "w-full" : ""} ${styles}`;
  return href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:") ? (
    <a href={href} className={className} rel="noopener">
      {children}
    </a>
  ) : (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

export function SectionTitle({ kicker, title, text, tone = "light" }: { kicker?: string; title: string; text?: string; tone?: "light" | "dark" }) {
  return (
    <div className="max-w-2xl">
      {kicker ? <p className={`label ${tone === "dark" ? "text-copper-light" : "text-copper"}`}>{kicker}</p> : null}
      <h2 className={`mt-2 text-balance font-serif text-4xl font-semibold leading-[1.05] sm:text-5xl ${tone === "dark" ? "text-white" : "text-forest"}`}>
        {title}
      </h2>
      {text ? <p className={`mt-4 text-lg leading-relaxed ${tone === "dark" ? "text-white/80" : "text-ink/75"}`}>{text}</p> : null}
    </div>
  );
}

/** Preview only: a dashed box listing what we still need from the owner. */
export function Ask({ locale, items }: { locale: Locale; items: string[] }) {
  if (!isPreview || items.length === 0) return null;
  const t = ui[locale];
  return (
    <div className="rounded-2xl border-2 border-dashed border-copper/60 bg-[#fff6ee] p-5 text-ink/80">
      <p className="flex items-center gap-2 font-semibold text-copper">
        <ClipboardList className="size-5" aria-hidden />
        {t.askTitle}
      </p>
      <p className="mt-1 text-xs opacity-70">{t.askNote}</p>
      <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm">
        {items.map((i) => (
          <li key={i}>{i}</li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Huts.fi map. The embed's own credit bar is hidden (hideAttr=1) so there is exactly one Huts.fi link:
 * this plain, followed link on the client's page (a link inside the iframe counts for huts.fi, not here).
 * The NLS credit moves out with it, because the map tiles' licence requires it.
 */
export function MapEmbed({ locale, src, title }: { locale: Locale; src: string; title: string }) {
  return (
    <div>
      <iframe src={src} title={title} loading="lazy" className="block h-[380px] w-full rounded-3xl border-0 bg-moss sm:h-[460px]" allowFullScreen />
      <p className="py-2 text-right text-xs text-ink/70">
        {ui[locale].mapCredit}{" "}
        <a href={HUTS} className="font-bold text-[#FF6B00]">
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

export function Faq({ locale }: { locale: Locale }) {
  return (
    <div className="divide-y divide-ink/10 rounded-3xl bg-white">
      {ui[locale].faq.map((item) => (
        <details key={item.q} className="group px-5 py-4 sm:px-7">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-forest [&::-webkit-details-marker]:hidden">
            {item.q}
            <span className="text-2xl leading-none text-copper transition group-open:rotate-45">+</span>
          </summary>
          <p className="mt-2 leading-relaxed text-ink/80">{item.a}</p>
        </details>
      ))}
    </div>
  );
}

export function PriceTable({ cottage, locale }: { cottage: Cottage; locale: Locale }) {
  const t = ui[locale].cottage;
  return (
    <div className="overflow-hidden rounded-2xl bg-white">
      <table className="w-full text-left">
        <tbody className="divide-y divide-ink/10">
          {cottage.weeks.map((w) => (
            <tr key={w.when.fi}>
              <td className="px-5 py-3.5 text-ink/80">{w.when[locale]}</td>
              <td className="whitespace-nowrap px-5 py-3.5 text-right font-semibold text-forest">{euro(w.price, locale)}</td>
            </tr>
          ))}
          <tr className="bg-moss/60">
            <td className="px-5 py-3.5 text-ink/80">{t.weekendRow}</td>
            <td className="whitespace-nowrap px-5 py-3.5 text-right font-semibold text-forest">{euro(cottage.weekend, locale)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export function CompareTable({ locale }: { locale: Locale }) {
  const t = ui[locale];
  return (
    <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
      <table className="w-full min-w-[760px] overflow-hidden rounded-2xl bg-white text-left text-sm sm:text-base">
        <thead className="bg-forest text-white">
          <tr>
            <th className="whitespace-nowrap px-4 py-3 font-semibold">{t.colCottage}</th>
            <th className="whitespace-nowrap px-4 py-3 font-semibold">{t.colGuests}</th>
            <th className="whitespace-nowrap px-4 py-3 font-semibold">{t.colHigh}</th>
            <th className="whitespace-nowrap px-4 py-3 font-semibold">{t.colLow}</th>
            <th className="whitespace-nowrap px-4 py-3 font-semibold">{t.colWeekend}</th>
            <th className="whitespace-nowrap px-4 py-3 font-semibold">{t.colBest}</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-ink/10">
          {cottageList.map((c) => (
            <tr key={c.id} className="align-top">
              <td className="px-4 py-3">
                <Link href={cottagePath(c, locale)} className="font-serif text-xl font-semibold text-forest hover:underline">
                  {c.name}
                </Link>
              </td>
              <td className="px-4 py-3 font-semibold">{c.guests}</td>
              <td className="px-4 py-3">{euro(Math.max(...c.weeks.map((w) => w.price)), locale)}</td>
              <td className="px-4 py-3">{euro(Math.min(...c.weeks.map((w) => w.price)), locale)}</td>
              <td className="px-4 py-3">{euro(c.weekend, locale)}</td>
              <td className="px-4 py-3 text-ink/70">{c.bestFor[locale]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function ExtrasList({ locale }: { locale: Locale }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {extras.map((e) => (
        <li key={e.name.fi} className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-moss text-forest">
            <Icon name={e.icon} className="size-5" />
          </span>
          <span className="min-w-0 flex-1 text-ink/85">{e.name[locale]}</span>
          <span className="whitespace-nowrap text-right text-sm font-semibold text-forest">{e.price[locale]}</span>
        </li>
      ))}
    </ul>
  );
}

export function Terms({ locale }: { locale: Locale }) {
  return (
    <ul className="space-y-2">
      {terms[locale].map((t) => (
        <li key={t} className="flex items-start gap-2 text-ink/85">
          <Icon name="check" className="mt-0.5 size-5 shrink-0 text-copper" />
          {t}
        </li>
      ))}
    </ul>
  );
}

export function DirectBand({ locale }: { locale: Locale }) {
  const t = ui[locale];
  return (
    <section className="bg-forest-deep text-white">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <SectionTitle kicker={t.directKicker} title={t.directTitle} tone="dark" />
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {t.direct.map((d) => (
            <li key={d.title} className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <Icon name={d.icon} className="size-6 text-copper-light" />
              <p className="mt-4 font-semibold">{d.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-white/70">{d.text}</p>
            </li>
          ))}
        </ul>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button href={`tel:${business.phonesIntl[0]}`}>{business.phones[0]}</Button>
          <Button href={`mailto:${business.email}`} variant="outline">
            {business.email}
          </Button>
        </div>
      </div>
    </section>
  );
}

export function HostsPlaceholder({ locale }: { locale: Locale }) {
  if (!isPreview) return null;
  const t = ui[locale];
  return (
    <div className="grid items-center gap-6 rounded-3xl border-2 border-dashed border-copper/40 bg-white p-6 sm:grid-cols-[180px_1fr] sm:p-8">
      <div className="flex aspect-square w-32 items-center justify-center rounded-full bg-moss text-forest/50 sm:w-full">
        <Users className="size-12" strokeWidth={1.2} aria-hidden />
      </div>
      <div>
        <span className="inline-block rounded-full bg-[#ffe3cf] px-3 py-1 text-xs font-semibold text-[#8a4a1c]">{t.previewTag}</span>
        <p className="label mt-3 text-ink/50">{t.hostsKicker}</p>
        <h2 className="mt-1 font-serif text-4xl font-semibold text-forest">{t.hostsTitle}</h2>
        <p className="mt-3 max-w-xl leading-relaxed text-ink/75">{t.hostsPlaceholder}</p>
      </div>
    </div>
  );
}

export function lodgingJsonLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    "@id": `${SITE_URL}/#business`,
    name: business.name,
    url: `${SITE_URL}${locale === "fi" ? "/" : paths.home.en}`,
    email: business.email,
    telephone: business.phonesIntl,
    founder: { "@type": "Person", name: business.owner },
    address: {
      "@type": "PostalAddress",
      streetAddress: business.street,
      postalCode: business.postalCode,
      addressLocality: business.village,
      addressRegion: business.region[locale],
      addressCountry: "FI",
    },
    geo: { "@type": "GeoCoordinates", latitude: business.lat, longitude: business.lng },
    areaServed: `${business.village}, ${business.municipality}`,
    sameAs: [`https://www.youtube.com/@elijarvenmokkilomat5584`, `${HUTS}/suomi/varsinais-suomi/poytya/lomamokit/elijarvi-holiday-cottages-2-poytya`],
    containsPlace: cottageList.map((c) => ({
      "@type": "House",
      name: c.name,
      url: `${SITE_URL}${cottagePath(c, locale)}`,
      occupancy: { "@type": "QuantitativeValue", maxValue: c.guests },
    })),
  };
}
