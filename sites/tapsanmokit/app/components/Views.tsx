import Image from "next/image";
import Link from "next/link";
import { ClipboardList, MapPin, Navigation, UserRound } from "lucide-react";
import { Footer, Header, StickyBar } from "@/app/components/Chrome";
import { PhotoGallery } from "@/app/components/Gallery";
import { Icon } from "@/app/components/Icon";
import { Inquiry, TubInquiry } from "@/app/components/Inquiry";
import {
  business,
  embed,
  euro,
  fromPrice,
  HUTS,
  isPreview,
  km,
  paths,
  SITE_URL,
  splitIcon,
  tub,
  ui,
  unitList,
  unitPath,
  units,
  type Locale,
  type PriceRow,
  type Unit,
  type UnitId,
} from "@/app/content";

const other = (locale: Locale): Locale => (locale === "fi" ? "en" : "fi");
const absolute = (src: string) => `${SITE_URL}${src.replace(process.env.BASE_PATH ?? "", "")}`;

function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="font-serif text-3xl text-tar sm:text-4xl">{children}</h2>;
}

/** Preview only: a dashed box listing what we still need from the owner. */
function Ask({ locale, items }: { locale: Locale; items: string[] }) {
  if (!isPreview || items.length === 0) return null;
  return (
    <div className="rounded-2xl border-2 border-dashed border-amber/60 bg-[#fff7ec] p-5 text-ink/80">
      <p className="flex items-center gap-2 font-semibold text-amber">
        <ClipboardList className="size-5" aria-hidden />
        {ui[locale].askTitle}
      </p>
      <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm">
        {items.map((i) => (
          <li key={i}>{i}</li>
        ))}
      </ul>
    </div>
  );
}

function HostsPlaceholder({ locale }: { locale: Locale }) {
  if (!isPreview) return null;
  const t = ui[locale];
  return (
    <div className="flex items-center gap-6 rounded-3xl border-2 border-dashed border-amber/40 bg-white p-6 sm:p-8">
      <div className="flex size-24 shrink-0 items-center justify-center rounded-full bg-panel text-tar/40">
        <UserRound className="size-10" strokeWidth={1.2} aria-hidden />
      </div>
      <div>
        <span className="inline-block rounded-full bg-[#ffe9c9] px-3 py-1 text-xs font-semibold text-[#7a4508]">{t.previewTag}</span>
        <h2 className="mt-2 font-serif text-3xl text-tar">{t.hostsTitle}</h2>
        <p className="mt-1 text-ink/70">{t.hostsText}</p>
      </div>
    </div>
  );
}

/** One Huts.fi link per map, outside the iframe, with the NLS credit the map tiles' licence asks for. */
function MapEmbed({ locale, title }: { locale: Locale; title: string }) {
  return (
    <div>
      <iframe src={embed(locale)} title={title} loading="lazy" className="block h-[420px] w-full rounded-3xl border-0 bg-panel sm:h-[520px]" allowFullScreen />
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

function Calendar({ src, title }: { src: string; title: string }) {
  return <iframe src={src} title={title} loading="lazy" className="block h-[420px] w-full rounded-2xl border-0 bg-white" />;
}

function PriceTable({ rows, locale }: { rows: PriceRow[]; locale: Locale }) {
  return (
    <table className="w-full overflow-hidden rounded-2xl bg-white text-left">
      <tbody className="divide-y divide-ink/10">
        {rows.map((r) => (
          <tr key={r.when.fi}>
            <td className="px-5 py-3.5 text-ink/80">{r.when[locale]}</td>
            <td className="whitespace-nowrap px-5 py-3.5 text-right font-semibold text-tar">{euro(r.price, locale)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function UnitCard({ unit: u, locale }: { unit: Unit; locale: Locale }) {
  const t = ui[locale];
  return (
    <Link href={unitPath(u, locale)} className="group flex flex-col overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-ink/5">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image src={u.photos[0].src} alt={u.photos[0][locale]} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition duration-500 group-hover:scale-[1.03]" />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-serif text-3xl text-tar">{u.name[locale]}</h3>
        <p className="mt-1 flex items-center gap-1.5 text-sm text-ink/60">
          <MapPin className="size-4" aria-hidden />
          {u.street}, {u.locality}
        </p>
        <p className="mt-4 flex items-end justify-between gap-3 border-t border-ink/10 pt-4">
          <span className="text-sm text-ink/70">{u.sleeps[locale]}</span>
          <span className="text-sm text-ink/60">
            {t.from} <strong className="font-serif text-2xl font-normal text-tar">{euro(fromPrice(u), locale)}</strong> {t.perNight}
          </span>
        </p>
      </div>
    </Link>
  );
}

function Faq({ locale }: { locale: Locale }) {
  return (
    <div className="divide-y divide-ink/10 rounded-3xl bg-white">
      {ui[locale].faq.map((item) => (
        <details key={item.q} className="group px-5 py-4 sm:px-7">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-tar [&::-webkit-details-marker]:hidden">
            {item.q}
            <span className="text-2xl leading-none text-amber transition group-open:rotate-45">+</span>
          </summary>
          <p className="mt-2 leading-relaxed text-ink/80">{item.a}</p>
        </details>
      ))}
    </div>
  );
}

function businessJsonLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    "@id": `${SITE_URL}/#business`,
    name: business.name,
    url: `${SITE_URL}${paths.home[locale]}`,
    email: business.email,
    telephone: business.phoneIntl,
    founder: { "@type": "Person", name: business.owner },
    areaServed: ["Jyväskylä", "Uurainen"],
    sameAs: [`${HUTS}/suomi/keski-suomi/jyvaskyla/lomamokit/tapsan-mokit-jyvaskyla`],
    containsPlace: unitList.map((u) => ({ "@type": "House", name: u.name[locale], url: `${SITE_URL}${unitPath(u, locale)}` })),
  };
}

function faqJsonLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: ui[locale].faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
}

export function HomeView({ locale }: { locale: Locale }) {
  const t = ui[locale];
  return (
    <>
      <JsonLd data={businessJsonLd(locale)} />
      <JsonLd data={faqJsonLd(locale)} />
      <Header locale={locale} otherHref={paths.home[other(locale)]} />
      <main>
        <section className="bg-tar pb-40 text-white">
          <div className="mx-auto max-w-6xl px-4 pt-14 sm:px-6 sm:pt-20">
            <h1 className="max-w-4xl text-balance font-serif text-5xl leading-[1.02] sm:text-7xl">{t.h1}</h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/75 sm:text-xl">{t.lead}</p>
          </div>
        </section>

        <section className="mx-auto -mt-28 max-w-6xl px-4 sm:px-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {unitList.map((u) => (
              <UnitCard key={u.id} unit={u} locale={locale} />
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <Link href={paths.tub[locale]} className="group grid items-center gap-8 overflow-hidden rounded-3xl bg-panel md:grid-cols-2">
            <div className="relative aspect-[3/2] md:aspect-auto md:h-full md:min-h-[320px]">
              <Image src={tub.photos[0].src} alt={tub.photos[0][locale]} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
            </div>
            <div className="p-6 pt-0 md:p-10">
              <h2 className="font-serif text-4xl text-tar">{t.tubTitle}</h2>
              <p className="mt-3 text-lg text-ink/75">{t.tubLead}</p>
              <ul className="mt-6 space-y-1">
                {tub.prices.map((p) => (
                  <li key={p.when.fi} className="flex justify-between gap-4 border-b border-ink/10 py-2">
                    <span className="text-ink/75">{p.when[locale]}</span>
                    <span className="font-semibold text-tar">
                      {euro(p.price, locale)} {t.perDay}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 font-semibold text-amber group-hover:underline">{t.nav.tub} →</p>
            </div>
          </Link>
        </section>

        <section className="mx-auto max-w-6xl space-y-8 px-4 sm:px-6">
          <HostsPlaceholder locale={locale} />
          <Ask locale={locale} items={t.homeAsk} />
        </section>

        <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <H2>{t.mapTitle}</H2>
          <div className="mt-6">
            <MapEmbed locale={locale} title={`${business.name} – ${t.mapTitle}`} />
          </div>
        </section>

        <section className="mx-auto grid max-w-6xl gap-12 px-4 pb-24 sm:px-6 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <H2>{t.faqTitle}</H2>
            <div className="mt-6">
              <Faq locale={locale} />
            </div>
          </div>
          <div id="tarjous" className="scroll-mt-6 rounded-3xl bg-white p-6 shadow-xl shadow-tar/10 lg:self-start">
            <Inquiry locale={locale} />
          </div>
        </section>
      </main>
      <Footer locale={locale} />
      <StickyBar locale={locale} bookHref="#tarjous" />
    </>
  );
}

export function UnitView({ id, locale }: { id: UnitId; locale: Locale }) {
  const u = units[id];
  const t = ui[locale];
  const others = unitList.filter((x) => x.id !== id);
  const address = `${u.street}, ${u.postalCode} ${u.locality}`;
  const ld = {
    "@context": "https://schema.org",
    "@type": id === "huoneisto" ? "Apartment" : "House",
    name: `${u.name[locale]} – ${business.name}`,
    url: `${SITE_URL}${unitPath(u, locale)}`,
    description: u.intro[locale].join(" "),
    image: u.photos.slice(0, 6).map((p) => absolute(p.src)),
    amenityFeature: u.highlights[locale].map((h) => ({ "@type": "LocationFeatureSpecification", name: splitIcon(h)[1], value: true })),
    address: { "@type": "PostalAddress", streetAddress: u.street, postalCode: u.postalCode, addressLocality: u.locality, addressCountry: "FI" },
    geo: { "@type": "GeoCoordinates", latitude: u.lat, longitude: u.lng },
    containedInPlace: { "@id": `${SITE_URL}/#business` },
  };
  const maps = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;
  const week = u.prices.find((p) => p.when.fi.startsWith("Viikko"));

  return (
    <>
      <JsonLd data={ld} />
      <Header locale={locale} otherHref={unitPath(u, other(locale))} />
      <main>
        <div className="mx-auto max-w-6xl md:px-6 md:pt-6">
          <PhotoGallery photos={u.photos} locale={locale} />
        </div>

        <section className="mx-auto grid max-w-6xl gap-12 px-4 py-10 sm:px-6 lg:grid-cols-[1.5fr_1fr]">
          <div className="min-w-0">
            <h1 className="font-serif text-5xl leading-none text-tar sm:text-7xl">{u.name[locale]}</h1>
            <p className="mt-3 flex items-center gap-1.5 text-lg text-ink/70">
              <MapPin className="size-5 text-amber" aria-hidden />
              {address}
            </p>

            <ul className={`mt-6 grid divide-x divide-ink/10 rounded-2xl bg-white py-4 text-center ${week ? "grid-cols-3" : "grid-cols-2"}`}>
              <li className="px-2">
                <p className="font-serif text-2xl text-tar">{u.sleeps[locale]}</p>
                <p className="text-xs text-ink/60">{t.guests}</p>
              </li>
              <li className="px-2">
                <p className="font-serif text-2xl text-tar">{euro(fromPrice(u), locale)}</p>
                <p className="text-xs text-ink/60">{t.from} {t.perNight}</p>
              </li>
              {week ? (
                <li className="px-2">
                  <p className="font-serif text-2xl text-tar">{euro(week.price, locale)}</p>
                  <p className="text-xs text-ink/60">{t.week}</p>
                </li>
              ) : null}
            </ul>

            <div className="mt-8 space-y-4 text-lg leading-relaxed text-ink/85">
              {u.intro[locale].map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>

            <div className="mt-12">
              <H2>{t.has}</H2>
            </div>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {u.highlights[locale].map((h) => {
                const [icon, text] = splitIcon(h);
                return (
                  <li key={h} className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 text-ink/85">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-panel text-tar">
                      <Icon name={icon} className="size-5" />
                    </span>
                    {text}
                  </li>
                );
              })}
            </ul>

            {u.sections?.map((s) => (
              <div key={s.title.fi} className="mt-12">
                <H2>{s.title[locale]}</H2>
                <div className="mt-4 space-y-3 text-lg leading-relaxed text-ink/85">
                  {s.text[locale].map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
              </div>
            ))}

            <div className="mt-12">
              <H2>{t.prices}</H2>
            </div>
            <p className="mt-2 text-ink/60">{u.priceFor[locale]}</p>
            <div className="mt-4">
              <PriceTable rows={u.prices} locale={locale} />
            </div>

            <div className="mt-12">
              <H2>{t.calendar}</H2>
            </div>
            <div className="mt-5">
              <Calendar src={u.calendar} title={`${u.name[locale]} – ${t.calendar}`} />
            </div>

            <div className="mt-10">
              <Ask locale={locale} items={u.ask} />
            </div>
          </div>

          <aside id="tarjous" className="scroll-mt-6 lg:sticky lg:top-6 lg:self-start">
            <div className="rounded-3xl bg-white p-6 shadow-xl shadow-tar/10">
              <Inquiry locale={locale} unit={id} />
            </div>
            <p className="mt-4 text-center text-sm">
              <a href={u.booking} rel="noopener" className="font-semibold text-ink/60 hover:underline">{t.onBooking} →</a>
            </p>
          </aside>
        </section>

        <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
          <H2>{t.near}</H2>
          <ul className="mt-5 grid gap-x-8 sm:grid-cols-2">
            {u.near.map((n) => (
              <li key={n.id} className="flex items-center gap-3 border-b border-ink/10 py-3">
                <Icon name={n.icon} className="size-5 shrink-0 text-amber" />
                <span className="flex-1 text-ink/85">{n.name[locale]}</span>
                <span className="text-sm text-ink/60">{km(n.km, locale)}</span>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-sm">
            <a href={maps} rel="noopener" className="inline-flex items-center gap-1.5 font-semibold text-amber hover:underline">
              <Navigation className="size-4" aria-hidden />
              {t.directions}
            </a>
          </p>
        </section>

        <section className="bg-panel">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
            <H2>{t.others}</H2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {others.map((o) => (
                <UnitCard key={o.id} unit={o} locale={locale} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
      <StickyBar locale={locale} bookHref="#tarjous" />
    </>
  );
}

export function TubView({ locale }: { locale: Locale }) {
  const t = ui[locale];
  const ld = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: t.tubH1,
    url: `${SITE_URL}${paths.tub[locale]}`,
    description: tub.text[locale].join(" "),
    areaServed: "Jyväskylä",
    provider: { "@id": `${SITE_URL}/#business` },
    offers: tub.prices.map((p) => ({ "@type": "Offer", name: p.when[locale], price: p.price, priceCurrency: "EUR" })),
  };
  return (
    <>
      <JsonLd data={ld} />
      <Header locale={locale} otherHref={paths.tub[other(locale)]} />
      <main>
        <div className="mx-auto max-w-6xl md:px-6 md:pt-6">
          <PhotoGallery photos={tub.photos} locale={locale} />
        </div>
        <section className="mx-auto grid max-w-6xl gap-12 px-4 py-10 sm:px-6 lg:grid-cols-[1.5fr_1fr]">
          <div className="min-w-0">
            <h1 className="text-balance font-serif text-5xl leading-none text-tar sm:text-6xl">{t.tubH1}</h1>
            <div className="mt-8 space-y-4 text-lg leading-relaxed text-ink/85">
              {tub.text[locale].map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <div className="mt-12">
              <H2>{t.prices}</H2>
            </div>
            <div className="mt-5">
              <PriceTable rows={tub.prices.map((p) => ({ ...p, when: { fi: `${p.when.fi}, 1 vrk`, en: `${p.when.en}, 1 day` } }))} locale={locale} />
            </div>
            <div className="mt-12">
              <H2>{t.calendar}</H2>
            </div>
            <div className="mt-5">
              <Calendar src={tub.calendar} title={`${t.nav.tub} – ${t.calendar}`} />
            </div>
            <div className="mt-10">
              <Ask locale={locale} items={tub.ask} />
            </div>
          </div>
          <aside id="tarjous" className="scroll-mt-6 lg:sticky lg:top-6 lg:self-start">
            <div className="rounded-3xl bg-white p-6 shadow-xl shadow-tar/10">
              <TubInquiry locale={locale} />
            </div>
          </aside>
        </section>
        <section className="bg-panel">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
            <H2>{t.others}</H2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {unitList.map((o) => (
                <UnitCard key={o.id} unit={o} locale={locale} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
      <StickyBar locale={locale} bookHref="#tarjous" />
    </>
  );
}

