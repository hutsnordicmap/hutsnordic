import Image from "next/image";
import Link from "next/link";
import { ClipboardList, ExternalLink, MapPin, Phone } from "lucide-react";
import { Footer, Header, StickyBar } from "@/app/components/Chrome";
import { PhotoGallery } from "@/app/components/Gallery";
import { Icon } from "@/app/components/Icon";
import { MapFrame, NearbyMap } from "@/app/components/NearbyMap";
import {
  arrive,
  business,
  euro,
  fromPrice,
  gallery,
  HUTS,
  isPreview,
  km,
  mapEmbed,
  meters,
  nearby,
  nearbyPath,
  paths,
  seasons,
  SITE_URL,
  skiStats,
  splitIcon,
  tel,
  ui,
  unitList,
  unitPath,
  units,
  type Locale,
  type Nearby,
  type Unit,
  type UnitId,
} from "@/app/content";

const other = (locale: Locale): Locale => (locale === "fi" ? "en" : "fi");
const absolute = (src: string) => `${SITE_URL}${src.replace(process.env.BASE_PATH ?? "", "")}`;

function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="font-serif text-3xl font-semibold text-night sm:text-4xl">{children}</h2>;
}

/** Preview only: a dashed box listing what we still need from the owner. */
function Ask({ locale, items }: { locale: Locale; items: string[] }) {
  if (!isPreview || items.length === 0) return null;
  return (
    <div className="rounded-2xl border-2 border-dashed border-kelo/60 bg-[#fbf4ea] p-5 text-ink/80">
      <p className="flex items-center gap-2 font-semibold text-kelo">
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

function List({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((i) => (
        <li key={i} className="flex gap-3 text-ink/85">
          <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-kelo" aria-hidden />
          {i}
        </li>
      ))}
    </ul>
  );
}

function UnitCard({ unit: u, locale }: { unit: Unit; locale: Locale }) {
  const t = ui[locale];
  return (
    <Link href={unitPath(u, locale)} className="group flex flex-col overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-ink/5">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image src={u.photos[0].src} alt={u.photos[0][locale]} fill sizes="(min-width: 640px) 50vw, 100vw" className="object-cover transition duration-500 group-hover:scale-[1.03]" />
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="font-serif text-3xl font-semibold text-night">{u.name[locale]}</h3>
        <p className="mt-1 text-ink/70">{u.tagline[locale]}</p>
        <p className="mt-4 flex items-end justify-between gap-3 border-t border-ink/10 pt-4">
          <span className="text-sm text-ink/70">
            {u.sleeps[locale]} · {u.rooms[locale]}
          </span>
          <span className="whitespace-nowrap text-sm text-ink/60">
            {t.from} <strong className="font-serif text-2xl font-semibold text-night">{euro(fromPrice(u), locale)}</strong> {t.perNight}
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
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-night [&::-webkit-details-marker]:hidden">
            {item.q}
            <span className="text-2xl leading-none text-kelo transition group-open:rotate-45">+</span>
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
    areaServed: ["Sallatunturi", "Salla"],
    petsAllowed: true,
    sameAs: [business.instagram],
    containsPlace: unitList.map((u) => ({ "@type": "House", name: u.name[locale], url: `${SITE_URL}${unitPath(u, locale)}` })),
  };
}

export function HomeView({ locale }: { locale: Locale }) {
  const t = ui[locale];
  return (
    <>
      <JsonLd data={businessJsonLd(locale)} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: t.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
        }}
      />
      <Header locale={locale} otherHref={paths.home[other(locale)]} />
      <main>
        <section className="relative isolate overflow-hidden bg-night pb-40 text-white">
          <Image src={gallery[0].src} alt="" fill priority sizes="100vw" className="-z-10 object-cover opacity-45" />
          <div className="mx-auto max-w-6xl px-4 pt-16 sm:px-6 sm:pt-28">
            <h1 className="max-w-3xl text-balance font-serif text-5xl font-semibold leading-[1.02] sm:text-7xl">{t.h1}</h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/85 sm:text-xl">{t.lead}</p>
          </div>
        </section>

        <section className="mx-auto -mt-28 max-w-6xl px-4 sm:px-6">
          <div className="grid gap-6 sm:grid-cols-2">
            {unitList.map((u) => (
              <UnitCard key={u.id} unit={u} locale={locale} />
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 pt-20 sm:px-6">
          <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl bg-ink/10 sm:grid-cols-4">
            {skiStats.map((s) => (
              <li key={s.value} className="bg-white px-4 py-6 text-center">
                <p className="font-serif text-4xl font-semibold text-night">{s.value}</p>
                <p className="mt-1 text-sm text-ink/60">{s.label[locale]}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <H2>{t.mapTitle}</H2>
            <Link href={paths.area[locale]} className="font-semibold text-kelo hover:underline">
              {t.areaH1} →
            </Link>
          </div>
          <div className="mt-6">
            <NearbyMap locale={locale} title={`${business.name} – ${t.mapTitle}`} />
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 sm:px-6">
          <Ask locale={locale} items={t.homeAsk} />
        </section>

        <section className="mx-auto grid max-w-6xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <H2>{t.faqTitle}</H2>
            <div className="mt-6">
              <Faq locale={locale} />
            </div>
          </div>
          <div className="rounded-3xl bg-night p-7 text-white lg:self-start">
            <p className="font-serif text-3xl font-semibold">{business.owner}</p>
            <a href={tel} className="mt-5 flex items-center gap-2 text-lg font-semibold hover:underline">
              <Phone className="size-5" aria-hidden />
              {business.phone}
            </a>
            <a href={`mailto:${business.email}`} className="mt-2 block break-all text-white/80 hover:underline">
              {business.email}
            </a>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
      <StickyBar locale={locale} />
    </>
  );
}

export function UnitView({ id, locale }: { id: UnitId; locale: Locale }) {
  const u = units[id];
  const t = ui[locale];
  const others = unitList.filter((x) => x.id !== id);
  const address = `${u.street}, 98900 Salla`;
  const ld = {
    "@context": "https://schema.org",
    "@type": "House",
    name: `${u.name[locale]} – Sallatunturi`,
    url: `${SITE_URL}${unitPath(u, locale)}`,
    description: u.intro[locale].join(" "),
    image: u.photos.slice(0, 6).map((p) => absolute(p.src)),
    petsAllowed: true,
    floorSize: { "@type": "QuantitativeValue", value: 54, unitCode: "MTK" },
    amenityFeature: u.highlights[locale].map((h) => ({ "@type": "LocationFeatureSpecification", name: splitIcon(h)[1], value: true })),
    address: { "@type": "PostalAddress", streetAddress: u.street, postalCode: "98900", addressLocality: "Salla", addressCountry: "FI" },
    containedInPlace: { "@id": `${SITE_URL}/#business` },
  };
  const week = u.prices[1];

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
            <h1 className="font-serif text-5xl font-semibold leading-none text-night sm:text-7xl">{u.name[locale]}</h1>
            <p className="mt-3 flex items-center gap-1.5 text-lg text-ink/70">
              <MapPin className="size-5 text-kelo" aria-hidden />
              {address}
            </p>

            <ul className="mt-6 grid grid-cols-3 divide-x divide-ink/10 rounded-2xl bg-white py-4 text-center">
              <li className="px-2">
                <p className="font-serif text-2xl font-semibold text-night">{u.sleeps[locale]}</p>
                <p className="text-xs text-ink/60">{u.rooms[locale]}</p>
              </li>
              <li className="px-2">
                <p className="font-serif text-2xl font-semibold text-night">{euro(fromPrice(u), locale)}</p>
                <p className="text-xs text-ink/60">
                  {t.from} {t.perNight}
                </p>
              </li>
              <li className="px-2">
                <p className="font-serif text-2xl font-semibold text-night">{meters(u.distances[0].m, locale)}</p>
                <p className="text-xs text-ink/60">{u.distances[0].what[locale]}</p>
              </li>
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
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-panel text-night">
                      <Icon name={icon} className="size-5" />
                    </span>
                    {text}
                  </li>
                );
              })}
            </ul>

            <div className="mt-12 grid gap-10 sm:grid-cols-2">
              <div>
                <H2>{t.beds}</H2>
                <div className="mt-4">
                  <List items={u.beds[locale]} />
                </div>
              </div>
              <div>
                <H2>{t.kitchen}</H2>
                <div className="mt-4">
                  <List items={u.kitchen[locale]} />
                </div>
              </div>
            </div>

            <div className="mt-12">
              <H2>{t.distances}</H2>
            </div>
            <ul className="mt-5 grid gap-x-8 sm:grid-cols-2">
              {u.distances.map((d) => (
                <li key={d.what.fi} className="flex items-center gap-3 border-b border-ink/10 py-3">
                  <Icon name={d.icon} className="size-5 shrink-0 text-kelo" />
                  <span className="flex-1 text-ink/85">{d.what[locale]}</span>
                  <span className="text-sm text-ink/60">{meters(d.m, locale)}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10">
              <Ask locale={locale} items={u.ask} />
            </div>
          </div>

          <aside className="lg:sticky lg:top-6 lg:self-start">
            <div className="rounded-3xl bg-white p-6 shadow-xl shadow-night/10">
              <p className="font-serif text-3xl font-semibold text-night">{t.prices}</p>
              <table className="mt-4 w-full text-left">
                <tbody className="divide-y divide-ink/10">
                  {u.prices.map((r) => (
                    <tr key={r.when.fi}>
                      <td className="py-3 pr-3 text-ink/80">{r.when[locale]}</td>
                      <td className="whitespace-nowrap py-3 text-right font-semibold text-night">{euro(r.price, locale)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <a href={tel} className="mt-5 flex items-center justify-center gap-2 rounded-full bg-kelo px-6 py-3 font-semibold text-white hover:bg-[#8a5e2c]">
                <Phone className="size-4" aria-hidden />
                {business.phone}
              </a>
              <a href={`mailto:${business.email}`} className="mt-3 block break-all text-center text-sm font-semibold text-night hover:underline">
                {business.email}
              </a>
              <a href={u.booking} rel="noopener" className="mt-2 flex items-center justify-center gap-1.5 text-sm text-ink/70 hover:underline">
                {t.book}
                <ExternalLink className="size-3.5" aria-hidden />
              </a>
            </div>
            <p className="mt-3 text-center text-xs text-ink/50">
              {t.week}: {euro(week.price, locale)}
            </p>
          </aside>
        </section>

        <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
          <H2>{t.mapTitle}</H2>
          <div className="mt-6">
            <NearbyMap locale={locale} title={`${u.name[locale]} – ${t.mapTitle}`} />
          </div>
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
      <StickyBar locale={locale} nettimokki={u.booking} />
    </>
  );
}

export function AreaView({ locale }: { locale: Locale }) {
  const t = ui[locale];
  return (
    <>
      <Header locale={locale} otherHref={paths.area[other(locale)]} />
      <main>
        <section className="mx-auto max-w-6xl px-4 pt-12 sm:px-6 sm:pt-16">
          <h1 className="max-w-3xl text-balance font-serif text-5xl font-semibold leading-[1.02] text-night sm:text-7xl">{t.areaH1}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink/75 sm:text-xl">{t.areaLead}</p>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <NearbyMap locale={locale} title={`${t.areaTitle} – ${t.mapTitle}`} />
        </section>

        {seasons.map((s, i) => (
          <section key={s.id} className={i % 2 === 0 ? "bg-white" : ""}>
            <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_1.2fr] lg:items-start">
              <div className={`relative aspect-[4/3] overflow-hidden rounded-3xl ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                <Image src={s.photo.src} alt={s.photo[locale]} fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
              </div>
              <div>
                <H2>{s.title[locale]}</H2>
                <p className="mt-4 text-lg leading-relaxed text-ink/80">{s.lead[locale]}</p>
                <div className="mt-8 grid gap-8 sm:grid-cols-2">
                  {s.groups.map((g) => (
                    <div key={g.title.fi}>
                      <h3 className="font-semibold text-night">{g.title[locale]}</h3>
                      <div className="mt-3">
                        <List items={g.items[locale]} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        ))}

        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <H2>{t.gallery}</H2>
          <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {gallery.map((p) => (
              <li key={p.src} className="relative aspect-square overflow-hidden rounded-2xl">
                <Image src={p.src} alt={p[locale]} fill sizes="(min-width: 640px) 25vw, 50vw" className="object-cover" />
              </li>
            ))}
          </ul>
        </section>

        <section className="mx-auto grid max-w-6xl gap-10 px-4 pb-16 sm:px-6 lg:grid-cols-2">
          <div>
            <H2>{t.arrive}</H2>
            <div className="mt-4">
              <List items={arrive[locale]} />
            </div>
          </div>
          <Ask locale={locale} items={t.areaAsk} />
        </section>

        <section className="bg-panel">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
            <H2>{t.stay}</H2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {unitList.map((o) => (
                <UnitCard key={o.id} unit={o} locale={locale} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
      <StickyBar locale={locale} />
    </>
  );
}

export function NearbyView({ item: n, locale }: { item: Nearby; locale: Locale }) {
  const t = ui[locale];
  const others = nearby.filter((x) => x.id !== n.id).sort((a, b) => a.km - b.km);
  const ld = {
    "@context": "https://schema.org",
    "@type": n.kind === "route" ? "TouristAttraction" : "Place",
    name: n.name[locale],
    url: `${SITE_URL}${nearbyPath(n, locale)}`,
    description: n.lead[locale],
    sameAs: [`${HUTS}${n.hutsPath}`, ...(n.official ? [n.official.href] : [])],
    containedInPlace: { "@type": "Place", name: "Sallatunturi, Salla" },
  };

  return (
    <>
      <JsonLd data={ld} />
      <Header locale={locale} otherHref={nearbyPath(n, other(locale))} />
      <main>
        <section className="mx-auto max-w-6xl px-4 pt-8 sm:px-6">
          <p className="text-sm text-ink/60">
            <Link href={paths.area[locale]} className="hover:underline">
              {t.areaTitle}
            </Link>{" "}
            / {n.what[locale]}
          </p>
        </section>

        <section className="mx-auto grid max-w-6xl gap-12 px-4 py-8 sm:px-6 lg:grid-cols-[1.5fr_1fr]">
          <div className="min-w-0">
            <h1 className="text-balance font-serif text-5xl font-semibold leading-none text-night sm:text-6xl">{n.name[locale]}</h1>

            <ul className={`mt-6 grid divide-x divide-ink/10 rounded-2xl bg-white py-4 text-center ${n.lengthKm ? "grid-cols-2" : "grid-cols-1"}`}>
              <li className="px-2">
                <p className="font-serif text-2xl font-semibold text-night">{km(n.km, locale)}</p>
                <p className="text-xs text-ink/60">{t.fromCabins}</p>
              </li>
              {n.lengthKm ? (
                <li className="px-2">
                  <p className="font-serif text-2xl font-semibold text-night">{km(n.lengthKm, locale)}</p>
                  <p className="text-xs text-ink/60">{t.length}</p>
                </li>
              ) : null}
            </ul>

            <p className="mt-8 text-lg leading-relaxed text-ink/85">{n.lead[locale]}</p>
            <div className="mt-6">
              <List items={n.facts[locale]} />
            </div>
            <p className="mt-6 text-lg leading-relaxed text-ink/85">{n.tip[locale]}</p>

            <p className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold">
              {n.official ? (
                <a href={n.official.href} rel="noopener" className="inline-flex items-center gap-1.5 text-kelo hover:underline">
                  {t.official}: {n.official.label}
                  <ExternalLink className="size-4" aria-hidden />
                </a>
              ) : null}
            </p>

            <div className="mt-10">
              <MapFrame locale={locale} title={n.name[locale]} src={mapEmbed(locale, n)} hutsHref={`${HUTS}${n.hutsPath}`} />
            </div>
          </div>

          <aside className="space-y-6 lg:sticky lg:top-6 lg:self-start">
            {n.photo ? (
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
                <Image src={n.photo.src} alt={n.photo[locale]} fill sizes="(min-width: 1024px) 35vw, 100vw" className="object-cover" />
              </div>
            ) : null}
            <div className="rounded-3xl bg-white p-6 shadow-xl shadow-night/10">
              <p className="font-serif text-2xl font-semibold text-night">{t.stay}</p>
              <ul className="mt-4 space-y-3">
                {unitList.map((u) => (
                  <li key={u.id}>
                    <Link href={unitPath(u, locale)} className="group flex items-center gap-4">
                      <span className="relative size-16 shrink-0 overflow-hidden rounded-xl">
                        <Image src={u.photos[0].src} alt={u.photos[0][locale]} fill sizes="64px" className="object-cover" />
                      </span>
                      <span>
                        <span className="block font-semibold text-night group-hover:underline">{u.name[locale]}</span>
                        <span className="block text-sm text-ink/60">
                          {u.sleeps[locale]} · {t.from} {euro(fromPrice(u), locale)} {t.perNight}
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </section>

        <section className="bg-panel">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
            <H2>{t.mapTitle}</H2>
            <ul className="mt-6 grid gap-x-8 sm:grid-cols-2">
              {others.map((o) => (
                <li key={o.id}>
                  <Link href={nearbyPath(o, locale)} className="flex items-center gap-3 border-b border-ink/10 py-3 hover:text-kelo">
                    <Icon name={o.icon} className="size-5 shrink-0 text-kelo" />
                    <span className="flex-1 font-semibold text-night">{o.name[locale]}</span>
                    <span className="text-sm text-ink/60">{km(o.km, locale)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
      <StickyBar locale={locale} />
    </>
  );
}
