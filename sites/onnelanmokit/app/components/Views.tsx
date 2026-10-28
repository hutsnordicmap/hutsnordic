import Image from "next/image";
import Link from "next/link";
import { Rotate3d } from "lucide-react";
import {
  BenefitStrip,
  Button,
  DirectBand,
  Directions,
  Faq,
  Hero,
  HostsPlaceholder,
  JsonLd,
  lodgingJsonLd,
  MapEmbed,
  QuickFacts,
} from "@/app/components/Blocks";
import { Footer, Header, StickyBookBar } from "@/app/components/Chrome";
import { VillaGallery } from "@/app/components/Gallery";
import { Icon } from "@/app/components/Icon";
import { Inquiry } from "@/app/components/Inquiry";
import {
  business,
  HUTS,
  isPreview,
  more,
  paths,
  SITE_URL,
  splitIcon,
  tel,
  ui,
  villaList,
  villas,
  type Locale,
  type VillaId,
} from "@/app/content";

const other = (locale: Locale): Locale => (locale === "fi" ? "en" : "fi");

export function HomeView({ locale }: { locale: Locale }) {
  const t = ui[locale];
  const m = more[locale];
  const heroPhoto = villas.onnela.photos[1];
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: t.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <JsonLd data={lodgingJsonLd(locale)} />
      <JsonLd data={faqLd} />
      <Header locale={locale} otherHref={paths.home[other(locale)]} />
      <main>
        <Hero
          image={heroPhoto.src}
          alt={heroPhoto[locale]}
          kicker={t.heroKicker}
          title={t.heroTitle}
          text={t.heroText}
          pills={m.pills}
        />

        <div id="varaa" className="relative z-10 mx-auto -mt-16 max-w-6xl scroll-mt-6 px-4 sm:px-6">
          <div className="rounded-2xl bg-white p-5 shadow-xl shadow-lake/10 sm:p-7">
            <Inquiry locale={locale} />
          </div>
        </div>

        <section className="mx-auto max-w-6xl px-4 pt-14 sm:px-6">
          <BenefitStrip locale={locale} />
        </section>

        <section id="huvilat" className="mx-auto max-w-6xl scroll-mt-6 px-4 py-20 sm:px-6">
          <h2 className="text-balance font-serif text-3xl font-semibold text-lake sm:text-5xl">{t.villasTitle}</h2>
          <p className="mt-3 max-w-2xl text-lg text-ink/80">{t.villasText}</p>
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            {villaList.map((v) => (
              <article key={v.id} className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm">
                <Link href={v.path[locale]} className="group relative block aspect-[4/3] overflow-hidden">
                  <Image
                    src={v.photos[0].src}
                    alt={v.photos[0][locale]}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover transition duration-700 group-hover:scale-[1.03]"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-lake shadow">
                    {v.badge[locale]}
                  </span>
                </Link>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-serif text-3xl font-semibold text-lake">
                    <Link href={v.path[locale]} className="hover:underline">
                      {v.name}
                    </Link>
                  </h3>
                  <p className="mt-1 text-ink/75">{v.tagline[locale]}</p>
                  <div className="mt-4">
                    <QuickFacts villa={v} locale={locale} />
                  </div>
                  <ul className="mt-5 grid gap-2 text-sm text-ink/85 sm:grid-cols-2">
                    {v.highlights[locale].slice(0, 4).map((h) => {
                      const [icon, text] = splitIcon(h);
                      return (
                        <li key={h} className="flex items-start gap-2">
                          <Icon name={icon} className="mt-0.5 size-4 shrink-0 text-pine" />
                          {text}
                        </li>
                      );
                    })}
                  </ul>
                  <div className="mt-auto grid grid-cols-[1fr_auto] gap-3 pt-6">
                    <Button href={v.path[locale]} full>
                      {t.readMore}
                    </Button>
                    <Button href={v.airbnb} variant="ghost">
                      Airbnb
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <DirectBand locale={locale} />

        <section className="bg-mist">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-20 sm:px-6 md:grid-cols-2">
            <div className="min-w-0">
              <h2 className="text-balance font-serif text-3xl font-semibold text-lake sm:text-5xl">{t.lakeTitle}</h2>
              {t.lakeText.map((p) => (
                <p key={p} className="mt-4 text-lg leading-relaxed text-ink/80">
                  {p}
                </p>
              ))}
              <ul className="mt-6 flex flex-wrap gap-2">
                {t.activities.map((a) => (
                  <li key={a} className="rounded-full bg-white px-4 py-1.5 text-sm text-lake">
                    {a}
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[villas.suvikallio.photos[7], villas.onnela.photos[2], villas.suvikallio.photos[6], villas.onnela.photos[5]].map((p, i) => (
                <div key={p.src} className={`relative overflow-hidden rounded-2xl ${i === 0 ? "col-span-2 aspect-[16/10]" : "aspect-square"} ${i === 3 ? "hidden" : ""}`}>
                  <Image src={p.src} alt={p[locale]} fill sizes="(min-width: 768px) 40vw, 90vw" className="object-cover" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {isPreview ? (
          <section className="mx-auto max-w-6xl px-4 pt-20 sm:px-6">
            <HostsPlaceholder locale={locale} />
          </section>
        ) : null}

        <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <h2 className="font-serif text-3xl font-semibold text-lake sm:text-5xl">{t.mapTitle}</h2>
          <p className="mt-3 text-lg text-ink/80">{t.mapText}</p>
          <div className="mt-8 grid gap-8 lg:grid-cols-[2fr_1fr]">
            <MapEmbed locale={locale} />
            <Directions locale={locale} />
          </div>
        </section>

        <section className="mx-auto max-w-3xl px-4 pb-24 sm:px-6">
          <h2 className="text-center font-serif text-3xl font-semibold text-lake sm:text-4xl">{t.faqTitle}</h2>
          <div className="mt-8">
            <Faq locale={locale} />
          </div>
        </section>
      </main>
      <Footer locale={locale} />
      <StickyBookBar locale={locale} bookHref="#varaa" />
    </>
  );
}

export function VillaView({ id, locale }: { id: VillaId; locale: Locale }) {
  const v = villas[id];
  const t = ui[locale];
  const m = more[locale];
  const sibling = villaList.find((x) => x.id !== id)!;
  const ld = {
    "@context": "https://schema.org",
    "@type": "House",
    name: v.name,
    url: `${SITE_URL}${v.path[locale]}`,
    description: v.intro[locale],
    image: v.photos.map((p) => p.src),
    floorSize: { "@type": "QuantitativeValue", value: v.size, unitCode: "MTK" },
    numberOfBedrooms: v.bedrooms,
    occupancy: { "@type": "QuantitativeValue", maxValue: v.maxGuests },
    yearBuilt: v.built,
    petsAllowed: id === "onnela" ? false : undefined,
    amenityFeature: [...v.highlights[locale], ...v.equipment[locale]].map((h) => ({
      "@type": "LocationFeatureSpecification",
      name: splitIcon(h)[1],
      value: true,
    })),
    address: {
      "@type": "PostalAddress",
      streetAddress: v.address.split(",")[0],
      postalCode: business.postalCode,
      addressLocality: business.village,
      addressRegion: business.region[locale],
      addressCountry: "FI",
    },
    geo: { "@type": "GeoCoordinates", latitude: v.lat, longitude: v.lng },
    containedInPlace: { "@type": "LodgingBusiness", name: business.name, url: SITE_URL },
  };

  return (
    <>
      <JsonLd data={ld} />
      <Header locale={locale} otherHref={v.path[other(locale)]} solid />
      <main>
        <div className="mx-auto max-w-6xl md:px-6 md:pt-6">
          <VillaGallery photos={v.photos} locale={locale} />
        </div>

        <section className="mx-auto grid max-w-6xl gap-12 px-4 py-10 sm:px-6 lg:grid-cols-[1.5fr_1fr]">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/55">
              {business.village}, {business.municipality} · {business.region[locale]}
            </p>
            <h1 className="mt-2 font-serif text-4xl font-semibold text-lake sm:text-6xl">{v.name}</h1>
            <p className="mt-2 text-lg text-ink/75">{v.tagline[locale]}</p>
            <div className="mt-4">
              <QuickFacts villa={v} locale={locale} />
            </div>
            <p className="mt-8 text-lg leading-relaxed text-ink/85">{v.intro[locale]}</p>

            <h2 className="mt-12 font-serif text-2xl font-semibold text-lake">{m.included}</h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {v.highlights[locale].map((h) => {
                const [icon, text] = splitIcon(h);
                return (
                  <li key={h} className="flex items-center gap-3 rounded-xl bg-white px-4 py-3 text-ink/85">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-mist text-lake">
                      <Icon name={icon} className="size-[18px]" />
                    </span>
                    {text}
                  </li>
                );
              })}
            </ul>

            <h2 className="mt-12 font-serif text-2xl font-semibold text-lake">{t.villa.rooms}</h2>
            <p className="mt-3 leading-relaxed text-ink/85">
              {v.rooms[locale]}, {locale === "fi" ? "noin" : "about"} {v.size} m². {v.guests[locale]}.
            </p>

            <h2 className="mt-12 font-serif text-2xl font-semibold text-lake">{t.villa.equipment}</h2>
            <ul className="mt-4 grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {v.equipment[locale].map((e) => {
                const [icon, text] = splitIcon(e);
                return (
                  <li key={e} className="flex items-center gap-3 text-ink/85">
                    <Icon name={icon} className="size-5 shrink-0 text-lake/70" />
                    {text}
                  </li>
                );
              })}
            </ul>
            {v.note ? <p className="mt-4 text-sm text-ink/65">{v.note[locale]}</p> : null}

            <a
              href={v.tour}
              rel="noopener"
              className="mt-12 flex items-center gap-4 rounded-2xl bg-lake p-5 text-white hover:bg-lake-deep"
            >
              <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-white/10">
                <Rotate3d className="size-6" strokeWidth={1.6} aria-hidden />
              </span>
              <span>
                <span className="block font-semibold">{t.villa.tour} →</span>
                <span className="block text-sm text-white/75">{t.villa.tourText}</span>
              </span>
            </a>
          </div>

          <aside id="varaa" className="scroll-mt-6 lg:sticky lg:top-6 lg:self-start">
            <div className="rounded-2xl bg-white p-6 shadow-xl shadow-lake/10">
              <div className="flex items-center justify-between gap-3">
                <span className="rounded-full bg-mist px-3 py-1 text-xs font-semibold text-lake">{v.badge[locale]}</span>
                <span className="text-sm text-ink/60">{v.guests[locale]}</span>
              </div>
              <div className="mt-5">
                <Inquiry locale={locale} villa={id} compact />
              </div>
              <div className="mt-5 border-t border-ink/10 pt-5">
                <Button href={v.airbnb} variant="ghost" full>
                  {t.bookAirbnb}
                </Button>
              </div>
            </div>
          </aside>
        </section>

        <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
          <h2 className="font-serif text-3xl font-semibold text-lake">{t.mapTitle}</h2>
          <p className="mt-2 text-ink/80">
            {v.address}, {business.municipality}
          </p>
          <div className="mt-6 grid gap-8 lg:grid-cols-[2fr_1fr]">
            <MapEmbed locale={locale} />
            <Directions locale={locale} />
          </div>
          <p className="mt-2 text-sm">
            <a href={`${HUTS}${v.hutsPath[locale]}`} className="text-pine hover:underline">
              {t.villa.onHuts} →
            </a>
          </p>
        </section>

        <section className="bg-mist">
          <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-14 sm:flex-row sm:items-center sm:px-6">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl sm:w-80">
              <Image src={sibling.photos[0].src} alt={sibling.photos[0][locale]} fill sizes="320px" className="object-cover" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/55">{t.villa.other}</p>
              <h2 className="mt-1 font-serif text-3xl font-semibold text-lake">{sibling.name}</h2>
              <p className="mt-1 text-ink/75">{sibling.tagline[locale]}</p>
              <div className="mt-3">
                <QuickFacts villa={sibling} locale={locale} />
              </div>
              <div className="mt-5">
                <Button href={sibling.path[locale]}>{t.readMore}</Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
      <StickyBookBar locale={locale} bookHref="#varaa" />
    </>
  );
}

export function ContactView({ locale }: { locale: Locale }) {
  const t = ui[locale];
  const photo = villas.onnela.photos[2];
  return (
    <>
      <JsonLd data={lodgingJsonLd(locale)} />
      <Header locale={locale} otherHref={paths.contact[other(locale)]} />
      <main>
        <Hero image={photo.src} alt={photo[locale]} kicker="Onnelan mökit" title={t.contactTitle} text={t.contactDescription} tall={false} />
        <section className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-[1fr_1.4fr]">
          <div className="space-y-6 text-lg">
            <div>
              <p className="font-serif text-2xl font-semibold text-lake">{business.owner}</p>
              <p className="mt-2 text-ink/85">
                {business.street}
                <br />
                {business.postalCode} {business.village.toUpperCase()}
                <br />
                {business.municipality}, {business.region[locale]}
              </p>
            </div>
            <div className="text-ink/85">
              {business.phones.map((p) => (
                <p key={p}>
                  <a href={tel(p)} className="font-semibold text-lake hover:underline">
                    {p}
                  </a>
                </p>
              ))}
              <p>
                <a href={`mailto:${business.email}`} className="break-all font-semibold text-lake hover:underline">
                  {business.email}
                </a>
              </p>
            </div>
            <ul className="space-y-2 text-base">
              {villaList.map((v) => (
                <li key={v.id}>
                  <a href={v.airbnb} rel="noopener" className="text-pine hover:underline">
                    {v.name} – Airbnb →
                  </a>
                </li>
              ))}
            </ul>
            <p className="text-sm text-ink/60">
              {t.businessId} {business.businessId}
            </p>
          </div>
          <div id="varaa" className="scroll-mt-6 rounded-2xl bg-white p-6 shadow-xl shadow-lake/10 sm:p-8">
            <Inquiry locale={locale} compact />
          </div>
        </section>
        <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
          <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
            <MapEmbed locale={locale} />
            <Directions locale={locale} />
          </div>
        </section>
      </main>
      <Footer locale={locale} />
      <StickyBookBar locale={locale} bookHref="#varaa" />
    </>
  );
}
