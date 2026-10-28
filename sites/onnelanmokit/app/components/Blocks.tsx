import Image from "next/image";
import Link from "next/link";
import { BedDouble, CalendarDays, Car, Check, MapPin, Navigation, Ruler, Users } from "lucide-react";
import { Icon } from "@/app/components/Icon";
import { business, HUTS, more, ui, type Locale, type Villa } from "@/app/content";

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export function Hero({
  image,
  alt,
  kicker,
  title,
  text,
  pills,
  children,
  tall = true,
}: {
  image: string;
  alt: string;
  kicker: string;
  title: string;
  text: string;
  pills?: string[];
  children?: React.ReactNode;
  tall?: boolean;
}) {
  return (
    <section
      className={`relative isolate flex items-end overflow-hidden bg-lake-deep text-white ${tall ? "min-h-[600px] sm:min-h-[680px]" : "min-h-[420px]"}`}
    >
      <Image src={image} alt={alt} fill priority sizes="100vw" className="-z-10 object-cover" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/75 via-black/30 to-black/45" />
      <div className={`mx-auto w-full max-w-6xl px-4 pt-28 sm:px-6 ${tall ? "pb-28 sm:pb-32" : "pb-12"}`}>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80 sm:text-sm">{kicker}</p>
        <h1 className="mt-3 max-w-3xl text-balance font-serif text-[2.6rem] font-semibold leading-[1.02] sm:text-6xl lg:text-7xl">
          {title}
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/90">{text}</p>
        {pills ? (
          <ul className="mt-6 flex flex-wrap gap-2">
            {pills.map((p) => (
              <li key={p} className="inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/10 px-3 py-1.5 text-xs font-medium backdrop-blur sm:text-sm">
                <Check className="size-3.5" aria-hidden />
                {p}
              </li>
            ))}
          </ul>
        ) : null}
        {children ? <div className="mt-8 flex flex-wrap gap-3">{children}</div> : null}
      </div>
    </section>
  );
}

export function Button({
  href,
  children,
  variant = "solid",
  full = false,
}: {
  href: string;
  children: React.ReactNode;
  variant?: "solid" | "light" | "outline" | "ghost";
  full?: boolean;
}) {
  const styles = {
    solid: "bg-pine text-white hover:bg-[#a4632f]",
    light: "bg-white text-lake hover:bg-mist",
    outline: "border border-current hover:bg-white/10",
    ghost: "border border-lake/25 text-lake hover:bg-mist",
  }[variant];
  const external = href.startsWith("http");
  const className = `inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold transition ${full ? "w-full" : ""} ${styles}`;
  return external ? (
    <a href={href} className={className} rel="noopener">
      {children}
    </a>
  ) : (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

export function QuickFacts({ villa, locale, light = false }: { villa: Villa; locale: Locale; light?: boolean }) {
  const t = more[locale];
  const items = [
    { icon: Users, text: villa.guests[locale] },
    { icon: BedDouble, text: `${villa.bedrooms} ${t.bedrooms}` },
    { icon: Ruler, text: `${villa.size} m²` },
    { icon: CalendarDays, text: `${villa.built}` },
  ];
  return (
    <ul className={`flex flex-wrap gap-x-5 gap-y-2 text-sm ${light ? "text-white/90" : "text-ink/75"}`}>
      {items.map(({ icon: I, text }) => (
        <li key={text} className="inline-flex items-center gap-1.5">
          <I className="size-4" strokeWidth={1.6} aria-hidden />
          {text}
        </li>
      ))}
    </ul>
  );
}

export function BenefitStrip({ locale }: { locale: Locale }) {
  return (
    <ul className="grid grid-cols-3 gap-4 sm:grid-cols-6">
      {more[locale].benefits.map((b) => (
        <li key={b.label} className="flex flex-col items-center gap-2 text-center text-sm text-lake">
          <span className="flex size-12 items-center justify-center rounded-full bg-mist">
            <Icon name={b.icon} className="size-6" />
          </span>
          {b.label}
        </li>
      ))}
    </ul>
  );
}

export function DirectBand({ locale }: { locale: Locale }) {
  const t = more[locale];
  return (
    <section className="bg-lake-deep text-white">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ffb27a]">{t.directKicker}</p>
        <h2 className="mt-3 max-w-2xl text-balance font-serif text-3xl font-semibold sm:text-5xl">{t.directTitle}</h2>
        <p className="mt-4 max-w-2xl text-lg text-white/80">{t.directText}</p>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {t.direct.map((d) => (
            <li key={d.title} className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <Icon name={d.icon} className="size-6 text-[#ffb27a]" />
              <p className="mt-4 font-semibold">{d.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-white/70">{d.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function HostsPlaceholder({ locale }: { locale: Locale }) {
  const t = more[locale];
  return (
    <div className="grid items-center gap-6 rounded-2xl border-2 border-dashed border-pine/40 bg-white p-6 sm:grid-cols-[180px_1fr] sm:p-8">
      <div className="flex aspect-square w-32 items-center justify-center rounded-full bg-mist text-lake/50 sm:w-full">
        <Users className="size-12" strokeWidth={1.2} aria-hidden />
      </div>
      <div>
        <span className="inline-block rounded-full bg-[#ffe3cf] px-3 py-1 text-xs font-semibold text-[#8a4a1c]">{t.previewTag}</span>
        <p className="mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-ink/50">{t.hostsKicker}</p>
        <h2 className="mt-1 font-serif text-3xl font-semibold text-lake">{t.hostsTitle}</h2>
        <p className="mt-3 max-w-xl leading-relaxed text-ink/75">{t.hostsPlaceholder}</p>
      </div>
    </div>
  );
}

/** Huts.fi map of both villas. The visible Huts.fi link sits outside the iframe on purpose. */
export function MapEmbed({ locale }: { locale: Locale }) {
  const t = ui[locale];
  const src = locale === "fi" ? business.mapEmbed : business.mapEmbed.replace("/suomi/", "/finland/");
  return (
    <div>
      <iframe
        src={src}
        title={`Onnelan mökit – ${t.mapTitle}`}
        loading="lazy"
        className="block h-[360px] w-full rounded-2xl border-0 bg-mist sm:h-[440px]"
        allowFullScreen
      />
      <p className="py-2 text-right text-xs text-ink/70">
        {t.mapCredit}{" "}
        <a href={HUTS} className="font-bold text-[#FF6B00]">
          Huts.fi
        </a>
      </p>
    </div>
  );
}

export function Directions({ locale }: { locale: Locale }) {
  const t = more[locale];
  const maps = `https://www.google.com/maps/dir/?api=1&destination=${business.lat},${business.lng}`;
  return (
    <div className="space-y-4">
      <h3 className="font-serif text-2xl font-semibold text-lake">{t.directionsTitle}</h3>
      <div className="rounded-2xl bg-white p-5">
        <p className="flex items-center gap-2 font-semibold text-lake">
          <Car className="size-5" strokeWidth={1.6} aria-hidden />
          {t.byCar}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-ink/75">{t.byCarText}</p>
      </div>
      <div className="rounded-2xl bg-white p-5">
        <p className="flex items-center gap-2 font-semibold text-lake">
          <MapPin className="size-5" strokeWidth={1.6} aria-hidden />
          {t.parking}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-ink/75">{t.parkingText}</p>
      </div>
      <a href={maps} rel="noopener" className="inline-flex items-center gap-2 text-sm font-semibold text-pine hover:underline">
        <Navigation className="size-4" aria-hidden />
        {t.route}
      </a>
    </div>
  );
}

export function Faq({ locale }: { locale: Locale }) {
  const t = ui[locale];
  return (
    <div className="divide-y divide-ink/10 rounded-2xl bg-white">
      {t.faq.map((item) => (
        <details key={item.q} className="group px-5 py-4 sm:px-6">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-lake [&::-webkit-details-marker]:hidden">
            {item.q}
            <span className="text-xl text-pine transition group-open:rotate-45">+</span>
          </summary>
          <p className="mt-2 leading-relaxed text-ink/80">{item.a}</p>
        </details>
      ))}
    </div>
  );
}

export function lodgingJsonLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: business.name,
    url: locale === "fi" ? "https://www.onnelanmokit.com/" : "https://www.onnelanmokit.com/en",
    email: business.email,
    telephone: business.phones,
    vatID: business.businessId,
    address: {
      "@type": "PostalAddress",
      streetAddress: business.street,
      postalCode: business.postalCode,
      addressLocality: business.village,
      addressRegion: business.region[locale],
      addressCountry: "FI",
    },
    geo: { "@type": "GeoCoordinates", latitude: business.lat, longitude: business.lng },
    areaServed: `${business.municipality}, ${business.region[locale]}`,
  };
}
