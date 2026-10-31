import Image from "next/image";
import Link from "next/link";
import { Check, MapPin, Navigation, Users } from "lucide-react";
import {
  Ask,
  Button,
  CompareTable,
  DirectBand,
  ExtrasList,
  Faq,
  HostsPlaceholder,
  JsonLd,
  lodgingJsonLd,
  MapEmbed,
  PriceTable,
  SectionTitle,
  Terms,
} from "@/app/components/Blocks";
import { Footer, Header, StickyBookBar } from "@/app/components/Chrome";
import { CottageCard, CottageFinder } from "@/app/components/CottageFinder";
import { CottageGallery } from "@/app/components/Gallery";
import { Icon } from "@/app/components/Icon";
import { Inquiry } from "@/app/components/Inquiry";
import { NearbyMap } from "@/app/components/NearbyMap";
import { VideoHero } from "@/app/components/VideoHero";
import {
  activities,
  business,
  byAgreement,
  cottageEmbed,
  cottageList,
  cottagePath,
  cottages,
  euro,
  hutsCottageUrl,
  lowestWeek,
  paths,
  priceNote,
  sauna,
  shared,
  SITE_URL,
  splitIcon,
  tel,
  ui,
  type CottageId,
  type Locale,
  type Photo,
} from "@/app/content";

const other = (locale: Locale): Locale => (locale === "fi" ? "en" : "fi");

function faqJsonLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: ui[locale].faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
}

function PhotoTile({ photo, locale, className = "", sizes = "50vw", large = false }: { photo: Photo; locale: Locale; className?: string; sizes?: string; large?: boolean }) {
  return (
    <div className={`relative overflow-hidden rounded-3xl ${className}`}>
      <Image src={large ? photo.lg : photo.sm} alt={photo[locale]} fill sizes={sizes} className="object-cover" />
    </div>
  );
}

/** Page header for inner pages: a calm photo band with the title below it, not over it. */
function PageIntro({ kicker, title, lead, photo, locale }: { kicker: string; title: string; lead: string; photo: Photo; locale: Locale }) {
  return (
    <section className="mx-auto max-w-6xl px-4 pt-8 sm:px-6 sm:pt-10">
      <PhotoTile photo={photo} locale={locale} large sizes="100vw" className="aspect-[16/9] sm:aspect-[21/8]" />
      <div className="pt-8">
        <p className="label text-copper">{kicker}</p>
        <h1 className="mt-2 text-balance font-serif text-5xl font-semibold leading-[1.02] text-forest sm:text-6xl">{title}</h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink/75">{lead}</p>
      </div>
    </section>
  );
}

export function HomeView({ locale }: { locale: Locale }) {
  const t = ui[locale];
  return (
    <>
      <JsonLd data={lodgingJsonLd(locale)} />
      <JsonLd data={faqJsonLd(locale)} />
      <Header locale={locale} otherHref={paths.home[other(locale)]} overlay />
      <main>
        <VideoHero poster={shared.hero} locale={locale} />

        <section className="mx-auto max-w-6xl px-4 pt-14 sm:px-6 sm:pt-20">
          <p className="label text-copper">{t.kicker}</p>
          <h1 className="mt-3 max-w-4xl text-balance font-serif text-5xl font-semibold leading-[1.0] text-forest sm:text-7xl">{t.h1}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink/75 sm:text-xl">{t.lead}</p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {t.pills.map((p) => (
              <li key={p} className="inline-flex items-center gap-1.5 rounded-full bg-moss px-3.5 py-1.5 text-sm text-forest">
                <Check className="size-4 text-copper" aria-hidden />
                {p}
              </li>
            ))}
          </ul>
        </section>

        <section id="mokit" className="mx-auto max-w-6xl scroll-mt-4 px-4 py-16 sm:px-6">
          <SectionTitle kicker={t.finderKicker} title={t.finderTitle} text={t.finderText} />
          <div className="mt-8">
            <CottageFinder locale={locale} />
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
          <h2 className="font-serif text-3xl font-semibold text-forest sm:text-4xl">{t.compareTitle}</h2>
          <p className="mt-2 text-ink/70">{t.compareText}</p>
          <div className="mt-6">
            <CompareTable locale={locale} />
          </div>
          <p className="mt-3 text-sm text-ink/60">{priceNote[locale]}</p>
        </section>

        <section className="bg-moss">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1.25fr_1fr]">
            <PhotoTile photo={shared.aerialMap} locale={locale} large sizes="(min-width: 1024px) 60vw, 100vw" className="aspect-[3/2]" />
            <div>
              <SectionTitle title={t.mapTitle} text={t.mapText} />
              <ul className="mt-6 space-y-2 text-sm">
                {cottageList.map((c) => (
                  <li key={c.id} className="flex items-start gap-2 text-ink/80">
                    <MapPin className="mt-0.5 size-4 shrink-0 text-copper" aria-hidden />
                    <span>
                      <Link href={cottagePath(c, locale)} className="font-semibold text-forest hover:underline">{c.name}</Link> · {c.where[locale]}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="relative isolate overflow-hidden bg-forest-deep text-white">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2">
            <div className="grid grid-cols-2 gap-3">
              <PhotoTile photo={sauna.photos[0]} locale={locale} large className="col-span-2 aspect-[16/10]" sizes="(min-width: 1024px) 45vw, 100vw" />
              <PhotoTile photo={sauna.photos[1]} locale={locale} className="aspect-square" sizes="25vw" />
              <PhotoTile photo={sauna.photos[3]} locale={locale} className="aspect-square" sizes="25vw" />
            </div>
            <div>
              <SectionTitle kicker={t.saunaKicker} title={t.saunaTitle} text={t.saunaLead} tone="dark" />
              <p className="mt-6 font-serif text-3xl text-copper-light">
                {euro(sauna.price, locale)} <span className="font-sans text-base text-white/70">· max {sauna.maxGuests}</span>
              </p>
              <div className="mt-8">
                <Button href={paths.sauna[locale]} variant="light">{t.saunaCta} →</Button>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <SectionTitle title={t.activitiesTitle} text={activities.intro[locale]} />
          <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {t.actTiles.map((a) => (
              <li key={a.label} className="flex flex-col items-center gap-3 rounded-3xl bg-white px-3 py-6 text-center text-sm font-semibold text-forest">
                <span className="flex size-12 items-center justify-center rounded-full bg-moss">
                  <Icon name={a.icon} className="size-6" />
                </span>
                {a.label}
              </li>
            ))}
          </ul>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <PhotoTile photo={shared.sup} locale={locale} className="aspect-[4/3]" sizes="(min-width: 640px) 33vw, 100vw" />
            <PhotoTile photo={shared.palju} locale={locale} className="aspect-[4/3]" sizes="(min-width: 640px) 33vw, 100vw" />
            <PhotoTile photo={cottages.merenneito.photos[5]} locale={locale} className="aspect-[4/3]" sizes="(min-width: 640px) 33vw, 100vw" />
          </div>
          <div className="mt-8">
            <Button href={paths.activities[locale]} variant="ghost">{t.activitiesCta} →</Button>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
          <div className="grid items-center gap-8 rounded-3xl bg-white p-6 sm:p-10 md:grid-cols-[1fr_1.2fr]">
            <PhotoTile photo={sauna.photos[1]} locale={locale} className="aspect-[4/3]" sizes="(min-width: 768px) 40vw, 100vw" />
            <div>
              <h2 className="font-serif text-4xl font-semibold text-forest">{t.companiesTitle}</h2>
              <p className="mt-3 text-lg leading-relaxed text-ink/75">{t.companiesText}</p>
              <div className="mt-6">
                <Button href={`${paths.booking[locale]}#varaa`}>{t.ask}</Button>
              </div>
            </div>
          </div>
        </section>

        <DirectBand locale={locale} />

        <section className="mx-auto max-w-6xl space-y-8 px-4 pt-20 sm:px-6">
          <HostsPlaceholder locale={locale} />
          <Ask locale={locale} items={t.homeAsk} />
        </section>

        <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <h2 className="font-serif text-4xl font-semibold text-forest">{t.mapTitle}</h2>
          <p className="mt-2 max-w-3xl text-ink/70">{t.mapText}</p>
          <div className="mt-8">
            <NearbyMap locale={locale} title={`${business.name} – ${t.mapTitle}`} />
          </div>
        </section>

        <section className="mx-auto max-w-3xl px-4 pb-24 sm:px-6">
          <h2 className="text-center font-serif text-4xl font-semibold text-forest">{t.faqTitle}</h2>
          <div className="mt-8">
            <Faq locale={locale} />
          </div>
        </section>
      </main>
      <Footer locale={locale} />
      <StickyBookBar locale={locale} bookHref={`${paths.booking[locale]}#varaa`} />
    </>
  );
}

export function CottagesView({ locale }: { locale: Locale }) {
  const t = ui[locale];
  const ld = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: cottageList.map((c, i) => ({ "@type": "ListItem", position: i + 1, url: `${SITE_URL}${cottagePath(c, locale)}`, name: c.name })),
  };
  return (
    <>
      <JsonLd data={ld} />
      <Header locale={locale} otherHref={paths.cottages[other(locale)]} />
      <main>
        <PageIntro kicker={t.kicker} title={t.cottagesH1} lead={t.cottagesLead} photo={shared.aerialKotolahti} locale={locale} />
        <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <CottageFinder locale={locale} />
        </section>
        <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
          <h2 className="font-serif text-3xl font-semibold text-forest sm:text-4xl">{t.compareTitle}</h2>
          <p className="mt-2 text-ink/70">{t.compareText}</p>
          <div className="mt-6">
            <CompareTable locale={locale} />
          </div>
          <p className="mt-3 text-sm text-ink/60">{priceNote[locale]}</p>
        </section>
        <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
          <h2 className="font-serif text-3xl font-semibold text-forest sm:text-4xl">{t.mapTitle}</h2>
          <p className="mt-2 max-w-3xl text-ink/70">{t.mapText}</p>
          <div className="mt-8">
            <NearbyMap locale={locale} title={`${business.name} – ${t.mapTitle}`} />
          </div>
        </section>
      </main>
      <Footer locale={locale} />
      <StickyBookBar locale={locale} bookHref={`${paths.booking[locale]}#varaa`} />
    </>
  );
}

export function CottageView({ id, locale }: { id: CottageId; locale: Locale }) {
  const c = cottages[id];
  const t = ui[locale];
  const others = cottageList.filter((x) => x.id !== id);
  const ld = {
    "@context": "https://schema.org",
    "@type": "House",
    name: `${c.name} – ${business.name}`,
    url: `${SITE_URL}${cottagePath(c, locale)}`,
    description: c.intro[locale],
    image: c.photos.slice(0, 6).map((p) => `${SITE_URL}${p.lg.replace(process.env.BASE_PATH ?? "", "")}`),
    occupancy: { "@type": "QuantitativeValue", maxValue: c.guests },
    amenityFeature: c.highlights[locale].map((h) => ({ "@type": "LocationFeatureSpecification", name: splitIcon(h)[1], value: true })),
    address: { "@type": "PostalAddress", streetAddress: c.address.split(",")[0], addressLocality: business.village, addressCountry: "FI" },
    geo: { "@type": "GeoCoordinates", latitude: c.lat, longitude: c.lng },
    containedInPlace: { "@id": `${SITE_URL}/#business` },
  };
  const maps = `https://www.google.com/maps/dir/?api=1&destination=${c.lat},${c.lng}`;

  return (
    <>
      <JsonLd data={ld} />
      <Header locale={locale} otherHref={cottagePath(c, other(locale))} />
      <main>
        <div className="mx-auto max-w-6xl md:px-6 md:pt-6">
          <CottageGallery photos={c.photos} locale={locale} />
        </div>

        <section className="mx-auto grid max-w-6xl gap-12 px-4 py-10 sm:px-6 lg:grid-cols-[1.5fr_1fr]">
          <div className="min-w-0">
            <p className="label text-copper">
              <Link href={paths.cottages[locale]} className="hover:underline">{t.nav.cottages}</Link> · {business.village}
            </p>
            <h1 className="mt-2 font-serif text-5xl font-semibold leading-none text-forest sm:text-7xl">{c.name}</h1>
            <p className="mt-3 text-xl text-ink/80">{c.tagline[locale]}</p>

            <ul className="mt-6 grid grid-cols-3 divide-x divide-ink/10 rounded-2xl bg-white py-4 text-center">
              <li className="px-2">
                <Users className="mx-auto size-5 text-copper" strokeWidth={1.6} aria-hidden />
                <p className="mt-1 font-serif text-2xl font-semibold text-forest">{c.guests}</p>
                <p className="text-xs text-ink/60">{t.guests}</p>
              </li>
              <li className="px-2">
                <Icon name="calendar" className="mx-auto size-5 text-copper" />
                <p className="mt-1 font-serif text-2xl font-semibold text-forest">{euro(lowestWeek(c), locale)}</p>
                <p className="text-xs text-ink/60">{t.from} {t.perWeek}</p>
              </li>
              <li className="px-2">
                <Icon name="sun" className="mx-auto size-5 text-copper" />
                <p className="mt-1 font-serif text-2xl font-semibold text-forest">{euro(c.weekend, locale)}</p>
                <p className="text-xs text-ink/60">{t.weekend}</p>
              </li>
            </ul>

            <p className="mt-4 text-sm text-ink/65">
              <strong className="font-semibold text-ink/80">{t.cottage.bestFor}:</strong> {c.bestFor[locale].charAt(0).toLowerCase() + c.bestFor[locale].slice(1)}
            </p>

            <p className="mt-8 text-lg leading-relaxed text-ink/85">{c.intro[locale]}</p>

            <h2 className="mt-12 font-serif text-3xl font-semibold text-forest">{t.cottage.included}</h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {c.highlights[locale].map((h) => {
                const [icon, text] = splitIcon(h);
                return (
                  <li key={h} className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 text-ink/85">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-moss text-forest">
                      <Icon name={icon} className="size-5" />
                    </span>
                    {text}
                  </li>
                );
              })}
            </ul>

            <h2 className="mt-12 font-serif text-3xl font-semibold text-forest">{t.cottage.prices}</h2>
            <div className="mt-5">
              <PriceTable cottage={c} locale={locale} />
            </div>
            <p className="mt-3 text-sm text-ink/60">{priceNote[locale]}</p>

            {c.extras ? (
              <>
                <h3 className="mt-8 font-semibold text-forest">{t.cottage.extras}</h3>
                <ul className="mt-2 space-y-1 text-ink/80">
                  {c.extras[locale].map((e) => (
                    <li key={e}>{e}</li>
                  ))}
                </ul>
              </>
            ) : null}

            <h2 className="mt-12 font-serif text-3xl font-semibold text-forest">{t.termsTitle}</h2>
            <div className="mt-4">
              <Terms locale={locale} />
            </div>
            <p className="mt-4 text-sm">
              <Link href={paths.booking[locale]} className="font-semibold text-copper hover:underline">{t.cottage.allExtras} →</Link>
            </p>

            <div className="mt-10">
              <Ask locale={locale} items={c.ask} />
            </div>
          </div>

          <aside id="varaa" className="scroll-mt-6 lg:sticky lg:top-6 lg:self-start">
            <div className="rounded-3xl bg-white p-6 shadow-xl shadow-forest/10">
              <p className="text-sm text-ink/60">
                {t.from} <strong className="font-serif text-3xl text-forest">{euro(lowestWeek(c), locale)}</strong> {t.perWeek}
              </p>
              <div className="mt-4">
                <Inquiry locale={locale} cottage={id} compact />
              </div>
            </div>
          </aside>
        </section>

        <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
          <h2 className="font-serif text-3xl font-semibold text-forest">{t.cottage.where}</h2>
          <p className="mt-2 text-ink/80">{c.address}</p>
          <div className="mt-6">
            <MapEmbed locale={locale} src={cottageEmbed(c, locale)} title={`${c.name} – ${t.cottage.where}`} hutsHref={hutsCottageUrl(c, locale)} />
          </div>
          <p className="text-sm">
            <a href={maps} rel="noopener" className="inline-flex items-center gap-1.5 font-semibold text-copper hover:underline">
              <Navigation className="size-4" aria-hidden />
              Google Maps
            </a>
          </p>
        </section>

        <section className="bg-moss">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
            <h2 className="font-serif text-4xl font-semibold text-forest">{t.cottage.others}</h2>
            <div className="no-scrollbar -mx-4 mt-8 flex snap-x gap-5 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0">
              {others.map((o) => (
                <div key={o.id} className="w-[82%] shrink-0 snap-start sm:w-[45%] lg:w-[31%]">
                  <CottageCard cottage={o} locale={locale} />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
      <StickyBookBar locale={locale} bookHref="#varaa" />
    </>
  );
}

export function SaunaView({ locale }: { locale: Locale }) {
  const t = ui[locale];
  const ld = {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    name: `${t.saunaH1} – ${business.name}`,
    url: `${SITE_URL}${paths.sauna[locale]}`,
    description: sauna.text[locale],
    image: sauna.photos.slice(0, 4).map((p) => `${SITE_URL}${p.lg.replace(process.env.BASE_PATH ?? "", "")}`),
    geo: { "@type": "GeoCoordinates", latitude: sauna.lat, longitude: sauna.lng },
    isAccessibleForFree: false,
    containedInPlace: { "@id": `${SITE_URL}/#business` },
  };
  return (
    <>
      <JsonLd data={ld} />
      <Header locale={locale} otherHref={paths.sauna[other(locale)]} />
      <main>
        <div className="mx-auto max-w-6xl md:px-6 md:pt-6">
          <CottageGallery photos={sauna.photos} locale={locale} />
        </div>
        <section className="mx-auto grid max-w-6xl gap-12 px-4 py-10 sm:px-6 lg:grid-cols-[1.5fr_1fr]">
          <div className="min-w-0">
            <p className="label text-copper">{t.saunaKicker}</p>
            <h1 className="mt-2 text-balance font-serif text-5xl font-semibold leading-none text-forest sm:text-6xl">{t.saunaH1}</h1>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {t.saunaFacts.map((f) => (
                <li key={f} className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 text-ink/85">
                  <Check className="size-5 shrink-0 text-copper" aria-hidden />
                  {f}
                </li>
              ))}
            </ul>
            <p className="mt-8 text-lg leading-relaxed text-ink/85">{sauna.text[locale]}</p>
            <div className="mt-10">
              <Ask locale={locale} items={sauna.ask} />
            </div>
          </div>
          <aside id="varaa" className="scroll-mt-6 lg:sticky lg:top-6 lg:self-start">
            <div className="rounded-3xl bg-white p-6 shadow-xl shadow-forest/10">
              <p className="font-serif text-4xl font-semibold text-forest">{euro(sauna.price, locale)}</p>
              <p className="text-sm text-ink/60">max {sauna.maxGuests} · {t.saunaFacts[1]}</p>
              <div className="mt-5 grid gap-3">
                <Button href={tel(0)} full>{business.phones[0]}</Button>
                <Button href={`mailto:${business.email}?subject=${encodeURIComponent(t.saunaH1)}`} variant="ghost" full>{business.email}</Button>
              </div>
            </div>
          </aside>
        </section>
        <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
          <MapEmbed locale={locale} src={sauna.embed[locale]} title={t.saunaH1} hutsHref={sauna.hutsUrl[locale]} />
        </section>
      </main>
      <Footer locale={locale} />
      <StickyBookBar locale={locale} bookHref="#varaa" />
    </>
  );
}

export function ActivitiesView({ locale }: { locale: Locale }) {
  const t = ui[locale];
  return (
    <>
      <Header locale={locale} otherHref={paths.activities[other(locale)]} />
      <main>
        <PageIntro kicker={t.kicker} title={t.activitiesH1} lead={activities.intro[locale]} photo={shared.sup} locale={locale} />

        <section id="vaellus" className="mx-auto grid max-w-6xl scroll-mt-6 items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-2">
          <div>
            <h2 className="font-serif text-4xl font-semibold text-forest">{t.hikeTitle}</h2>
            <p className="mt-4 text-lg leading-relaxed text-ink/80">{activities.kuhankuono[locale]}</p>
            <p className="mt-3 text-ink/70">{t.hikeGuided}</p>
            <p className="mt-4">
              <a href={activities.kuhankuonoUrl} rel="noopener" className="font-semibold text-copper hover:underline">{t.hikeLink} →</a>
            </p>
          </div>
          <PhotoTile photo={sauna.photos[10]} locale={locale} className="aspect-[4/3]" sizes="(min-width: 768px) 50vw, 100vw" />
        </section>

        <section id="savusauna" className="bg-forest-deep text-white">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-2">
            <PhotoTile photo={sauna.photos[1]} locale={locale} className="aspect-[4/3]" sizes="(min-width: 768px) 50vw, 100vw" />
            <div>
              <SectionTitle kicker={t.saunaKicker} title={t.saunaTitle} text={t.saunaLead} tone="dark" />
              <div className="mt-6">
                <Button href={paths.sauna[locale]} variant="light">{t.saunaCta} →</Button>
              </div>
            </div>
          </div>
        </section>

        <section id="melonta" className="mx-auto grid max-w-6xl scroll-mt-6 items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-2">
          <PhotoTile photo={shared.sup} locale={locale} className="aspect-[4/3] md:order-2" sizes="(min-width: 768px) 50vw, 100vw" />
          <div>
            <h2 className="font-serif text-4xl font-semibold text-forest">{t.paddleTitle}</h2>
            <p className="mt-4 text-lg leading-relaxed text-ink/80">{t.paddleText}</p>
          </div>
        </section>

        <section id="palju" className="mx-auto grid max-w-6xl scroll-mt-6 items-center gap-10 px-4 pb-16 sm:px-6 md:grid-cols-2">
          <PhotoTile photo={shared.palju} locale={locale} className="aspect-[4/3]" sizes="(min-width: 768px) 50vw, 100vw" />
          <div>
            <h2 className="font-serif text-4xl font-semibold text-forest">{t.tubTitle}</h2>
            <p className="mt-4 text-lg leading-relaxed text-ink/80">{t.tubText}</p>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
          <h2 className="font-serif text-4xl font-semibold text-forest">{t.extrasTitle}</h2>
          <div className="mt-6">
            <ExtrasList locale={locale} />
          </div>
          <h3 className="mt-8 font-semibold text-forest">{t.byAgreementTitle}</h3>
          <p className="mt-2 text-ink/75">{byAgreement[locale].join(" · ")}</p>
        </section>
      </main>
      <Footer locale={locale} />
      <StickyBookBar locale={locale} bookHref={`${paths.booking[locale]}#varaa`} />
    </>
  );
}

export function BookingView({ locale }: { locale: Locale }) {
  const t = ui[locale];
  return (
    <>
      <JsonLd data={lodgingJsonLd(locale)} />
      <Header locale={locale} otherHref={paths.booking[other(locale)]} />
      <main>
        <section className="mx-auto max-w-6xl px-4 pt-12 sm:px-6">
          <p className="label text-copper">{t.kicker}</p>
          <h1 className="mt-2 font-serif text-5xl font-semibold leading-none text-forest sm:text-6xl">{t.bookingTitle}</h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink/75">{t.bookingLead}</p>
        </section>

        <section id="varaa" className="mx-auto mt-10 max-w-6xl scroll-mt-6 px-4 sm:px-6">
          <div className="rounded-3xl bg-white p-6 shadow-xl shadow-forest/10 sm:p-8">
            <Inquiry locale={locale} />
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="font-serif text-4xl font-semibold text-forest">{t.compareTitle}</h2>
          <p className="mt-2 text-ink/70">{t.compareText}</p>
          <div className="mt-6">
            <CompareTable locale={locale} />
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {cottageList.map((c) => (
              <div key={c.id}>
                <h3 className="font-serif text-2xl font-semibold text-forest">
                  <Link href={cottagePath(c, locale)} className="hover:underline">{c.name}</Link>{" "}
                  <span className="font-sans text-sm font-normal text-ink/60">· {t.upTo(c.guests)}</span>
                </h3>
                <div className="mt-3">
                  <PriceTable cottage={c} locale={locale} />
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-ink/60">{priceNote[locale]}</p>
        </section>

        <section className="mx-auto grid max-w-6xl gap-12 px-4 pb-16 sm:px-6 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <h2 className="font-serif text-4xl font-semibold text-forest">{t.extrasTitle}</h2>
            <div className="mt-6">
              <ExtrasList locale={locale} />
            </div>
            <h3 className="mt-8 font-semibold text-forest">{t.byAgreementTitle}</h3>
            <p className="mt-2 text-ink/75">{byAgreement[locale].join(" · ")}</p>
          </div>
          <div>
            <h2 className="font-serif text-4xl font-semibold text-forest">{t.termsTitle}</h2>
            <div className="mt-6">
              <Terms locale={locale} />
            </div>
            <h2 className="mt-12 font-serif text-4xl font-semibold text-forest">{t.contactTitle}</h2>
            <div className="mt-4 space-y-1 text-lg">
              <p className="font-semibold text-forest">{business.name}</p>
              <p className="text-ink/80">{business.owner}</p>
              <p className="text-ink/80">
                {business.street}, {business.postalCode} {business.village}
              </p>
              {business.phones.map((p, i) => (
                <p key={p}>
                  <a href={tel(i)} className="font-semibold text-copper hover:underline">{p}</a>
                </p>
              ))}
              <p>
                <a href={`mailto:${business.email}`} className="font-semibold text-copper hover:underline">{business.email}</a>
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
          <Ask locale={locale} items={t.homeAsk.slice(1, 5)} />
        </section>
      </main>
      <Footer locale={locale} />
      <StickyBookBar locale={locale} bookHref="#varaa" />
    </>
  );
}
