import Image from "next/image";
import Link from "next/link";
import { CalendarCheck, ClipboardList, Mail, Phone } from "lucide-react";
import { Footer, Header, StickyBar } from "@/app/components/Chrome";
import { CaptionGrid, PhotoGallery } from "@/app/components/Gallery";
import { Icon } from "@/app/components/Icon";
import { NearbyMap } from "@/app/components/NearbyMap";
import { VideoHero } from "@/app/components/VideoHero";
import {
  address,
  business,
  facts,
  homeCards,
  homePhotos,
  isPreview,
  pages,
  paths,
  SITE_URL,
  splitIcon,
  stoveVideo,
  tel,
  ui,
  type Locale,
  type Page,
  type PageId,
} from "@/app/content";

const other = (locale: Locale): Locale => (locale === "fi" ? "en" : "fi");
const absolute = (src: string) => `${SITE_URL}${src.replace(process.env.BASE_PATH ?? "", "")}`;

function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="font-serif text-3xl text-lake-deep sm:text-4xl">{children}</h2>;
}

function Paragraphs({ items, className = "" }: { items: string[]; className?: string }) {
  return (
    <div className={`space-y-4 text-lg leading-relaxed text-ink/85 ${className}`}>
      {items.map((p) => (
        <p key={p}>{p}</p>
      ))}
    </div>
  );
}

/** Preview only: a dashed box listing what we still need from the owner. */
function Ask({ locale, items }: { locale: Locale; items: string[] }) {
  if (!isPreview || items.length === 0) return null;
  return (
    <div className="rounded-2xl border-2 border-dashed border-[#e08a2c]/70 bg-[#fff6ea] p-5 text-ink/80">
      <p className="flex items-center gap-2 font-semibold text-[#b8620f]">
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

function Highlights({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {items.map((h) => {
        const [icon, text] = splitIcon(h);
        return (
          <li key={h} className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 text-ink/85">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-panel text-lake">
              <Icon name={icon} className="size-5" />
            </span>
            {text}
          </li>
        );
      })}
    </ul>
  );
}

function Faq({ locale }: { locale: Locale }) {
  return (
    <div className="divide-y divide-ink/10 rounded-3xl bg-white">
      {ui[locale].faq.map((item) => (
        <details key={item.q} className="group px-5 py-4 sm:px-7">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-lake-deep [&::-webkit-details-marker]:hidden">
            {item.q}
            <span className="text-2xl leading-none text-ochre-dark transition group-open:rotate-45">+</span>
          </summary>
          <p className="mt-2 leading-relaxed text-ink/80">{item.a}</p>
        </details>
      ))}
    </div>
  );
}

/** Booking goes through Lomarengas; extras and house rules sit right beside the button. */
function BookBox({ locale }: { locale: Locale }) {
  const t = ui[locale];
  return (
    <div className="rounded-3xl bg-white p-6 shadow-xl shadow-lake-deep/10 sm:p-8">
      <h2 className="font-serif text-3xl text-lake-deep">{t.bookTitle}</h2>
      <p className="mt-2 text-ink/70">{t.bookText}</p>
      <a
        href={business.booking}
        rel="noopener"
        className="mt-5 flex items-center justify-center gap-2 rounded-full bg-ochre py-3.5 text-lg font-semibold text-lake-deep hover:bg-[#ecc46c]"
      >
        <CalendarCheck className="size-5" aria-hidden />
        {t.bookLong}
      </a>
      <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <a href={tel} className="flex items-center justify-center gap-2 rounded-full border border-lake/25 py-2.5 font-semibold text-lake-deep">
          <Phone className="size-4" aria-hidden />
          {business.phone}
        </a>
        <a href={`mailto:${business.email}`} className="flex items-center justify-center gap-2 rounded-full border border-lake/25 py-2.5 font-semibold text-lake-deep">
          <Mail className="size-4" aria-hidden />
          {locale === "fi" ? "Sähköposti" : "Email"}
        </a>
      </div>
      <h3 className="mt-8 font-semibold text-lake-deep">{t.extrasTitle}</h3>
      <ul className="mt-2 divide-y divide-ink/10 text-sm">
        {t.extras.map((e) => (
          <li key={e.what} className="flex justify-between gap-4 py-2.5">
            <span className="text-ink/75">{e.what}</span>
            <span className="whitespace-nowrap font-semibold text-lake-deep">{e.price}</span>
          </li>
        ))}
      </ul>
      <ul className="mt-5 flex flex-wrap gap-2 text-sm">
        {t.rules.map((r) => (
          <li key={r} className="rounded-full bg-panel px-3 py-1.5 text-ink/80">
            {r}
          </li>
        ))}
      </ul>
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
    description: ui[locale].homeDescription,
    email: business.email,
    telephone: business.phoneIntl,
    image: [homePhotos.villa, homePhotos.sauna, homePhotos.beach].map((p) => absolute(p.src)),
    address: { "@type": "PostalAddress", streetAddress: business.street, postalCode: business.postalCode, addressLocality: business.locality, addressCountry: "FI" },
    geo: { "@type": "GeoCoordinates", latitude: business.lat, longitude: business.lng },
    petsAllowed: true,
    amenityFeature: [...(pages.huvila.highlights?.[locale] ?? []), ...(pages.sauna.highlights?.[locale] ?? [])].map((h) => ({
      "@type": "LocationFeatureSpecification",
      name: splitIcon(h)[1],
      value: true,
    })),
    sameAs: [business.facebook, business.instagram],
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
      <Header locale={locale} otherHref={paths.home[other(locale)]} overlay />
      <main>
        <VideoHero locale={locale} next="#huvila" />

        <section id="huvila" className="mx-auto max-w-6xl scroll-mt-4 px-4 pt-16 sm:px-6 sm:pt-24">
          <h1 className="max-w-4xl text-balance font-serif text-5xl leading-[1.05] text-lake-deep sm:text-7xl">{t.h1}</h1>
          <ul className="mt-10 grid grid-cols-2 gap-y-6 border-y border-ink/10 py-6 sm:grid-cols-4">
            {facts.map((f) => (
              <li key={f.label.fi} className="px-2">
                <p className="font-serif text-3xl text-lake-deep sm:text-4xl">{f.value[locale]}</p>
                <p className="text-sm text-ink/60">{f.label[locale]}</p>
              </li>
            ))}
          </ul>
          <Paragraphs items={t.lead} className="mt-10 max-w-3xl" />
        </section>

        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="grid gap-6 md:grid-cols-2">
            {homeCards.map((c) => (
              <Link key={c.id} href={paths[c.id][locale]} className="group overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-ink/5">
                <div className="relative aspect-[3/2] overflow-hidden">
                  <Image src={c.photo.src} alt={c.photo[locale]} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover transition duration-500 group-hover:scale-[1.03]" />
                </div>
                <div className="p-6">
                  <h2 className="font-serif text-3xl text-lake-deep">{pages[c.id].name[locale]}</h2>
                  <p className="mt-1 text-ink/70">{c.text[locale]}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section>
          <div className="relative h-[70svh] min-h-[420px]">
            <Image src={homePhotos.beach.src} alt={homePhotos.beach[locale]} fill sizes="100vw" className="object-cover" />
          </div>
          <div className="mx-auto -mt-32 max-w-6xl px-4 sm:px-6">
            <Link href={paths.tekemista[locale]} className="relative block max-w-xl rounded-3xl bg-lake-deep p-7 text-white sm:p-9">
              <h2 className="font-serif text-4xl">{t.beachTitle}</h2>
              <p className="mt-3 text-lg leading-relaxed text-white/80">{t.beachText}</p>
              <p className="mt-5 font-semibold text-ochre">{pages.tekemista.name[locale]} →</p>
            </Link>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <Link href={paths.historia[locale]} className="group grid items-center gap-8 overflow-hidden rounded-3xl bg-panel md:grid-cols-2">
            <div className="relative aspect-[3/2] md:aspect-auto md:h-full md:min-h-[340px]">
              <Image src={homePhotos.history.src} alt={homePhotos.history[locale]} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
            </div>
            <div className="p-6 pt-0 md:p-10">
              <p className="font-serif text-6xl text-ochre-dark">1922–1951</p>
              <h2 className="mt-2 font-serif text-3xl text-lake-deep">{pages.historia.h1[locale]}</h2>
              <p className="mt-3 text-lg leading-relaxed text-ink/75">{t.historyText}</p>
              <p className="mt-5 font-semibold text-lake group-hover:underline">{pages.historia.name[locale]} →</p>
            </div>
          </Link>
        </section>

        <section className="mx-auto grid max-w-6xl gap-10 px-4 pb-20 sm:px-6 lg:grid-cols-[1fr_1.1fr] lg:items-start">
          <div className="space-y-8">
            <div className="flex items-center gap-6">
              <div className="relative size-28 shrink-0 overflow-hidden rounded-full sm:size-36">
                <Image src={homePhotos.hosts.src} alt={homePhotos.hosts[locale]} fill sizes="144px" className="object-cover" />
              </div>
              <div>
                <h2 className="font-serif text-3xl text-lake-deep">{t.hostsTitle}</h2>
                <p className="mt-1 text-ink/75">{t.hostsText}</p>
              </div>
            </div>
            <Ask locale={locale} items={t.homeAsk} />
          </div>
          <div id="varaa" className="scroll-mt-6">
            <BookBox locale={locale} />
          </div>
        </section>

        <section className="bg-panel">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
            <H2>{t.mapTitle}</H2>
            <div className="mt-6">
              <NearbyMap locale={locale} />
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
          <H2>{t.faqTitle}</H2>
          <div className="mt-6">
            <Faq locale={locale} />
          </div>
        </section>
      </main>
      <Footer locale={locale} />
      <StickyBar locale={locale} />
    </>
  );
}

function pageJsonLd(p: Page, locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: p.title[locale],
    url: `${SITE_URL}${paths[p.id][locale]}`,
    description: p.description[locale],
    primaryImageOfPage: absolute(p.photos[0].src),
    about: { "@id": `${SITE_URL}/#business` },
  };
}

export function PageView({ id, locale }: { id: PageId; locale: Locale }) {
  const p = pages[id];
  const t = ui[locale];
  const isHistory = id === "historia";
  return (
    <>
      <JsonLd data={pageJsonLd(p, locale)} />
      <Header locale={locale} otherHref={paths[id][other(locale)]} />
      <main>
        {isHistory ? null : (
          <div className="mx-auto max-w-6xl md:px-6 md:pt-6">
            <PhotoGallery photos={p.photos} locale={locale} />
          </div>
        )}

        <section className={`mx-auto grid max-w-6xl gap-12 px-4 py-10 sm:px-6 ${isHistory ? "" : "lg:grid-cols-[1.5fr_1fr]"}`}>
          <div className="min-w-0">
            <h1 className="text-balance font-serif text-5xl leading-none text-lake-deep sm:text-7xl">{p.h1[locale]}</h1>
            <Paragraphs items={p.intro[locale]} className={`mt-8 ${isHistory ? "max-w-3xl" : ""}`} />

            {p.highlights ? (
              <>
                <div className="mt-12">
                  <H2>{t.has}</H2>
                </div>
                <div className="mt-5">
                  <Highlights items={p.highlights[locale]} />
                </div>
              </>
            ) : null}

            {id === "huvila" ? (
              <div className="mt-12">
                <H2>{t.floorPlan}</H2>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  {[homePhotos.floorDown, homePhotos.floorUp].map((f) => (
                    <figure key={f.src} className="rounded-2xl bg-white p-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={f.src} alt={f[locale]} loading="lazy" className="w-full" />
                      <figcaption className="mt-2 text-center text-sm text-ink/60">{f[locale]}</figcaption>
                    </figure>
                  ))}
                </div>
              </div>
            ) : null}

            {p.sections?.map((s) => (
              <div key={s.title.fi} className={`mt-12 ${isHistory ? "max-w-3xl" : ""}`}>
                <H2>{s.title[locale]}</H2>
                {s.photo ? (
                  <div className="relative mt-5 aspect-[16/9] overflow-hidden rounded-2xl">
                    <Image src={s.photo.src} alt={s.photo[locale]} fill sizes="(min-width: 1024px) 60vw, 100vw" className="object-cover" />
                  </div>
                ) : null}
                <Paragraphs items={s.text[locale]} className="mt-4" />
                {id === "sauna" ? (
                  <video
                    src={stoveVideo}
                    poster={homePhotos.stovePoster.src}
                    controls
                    preload="none"
                    playsInline
                    className="mt-5 aspect-video w-full rounded-2xl bg-black object-cover"
                  />
                ) : null}
              </div>
            ))}

            {isHistory ? (
              <div className="mt-14">
                <CaptionGrid photos={p.photos} locale={locale} />
                <p className="mt-2 text-sm text-ink/60">{t.photoCredit}</p>
              </div>
            ) : null}

            <div className={`mt-10 ${isHistory ? "max-w-3xl" : ""}`}>
              <Ask locale={locale} items={p.ask} />
            </div>
          </div>

          {isHistory ? null : (
            <aside className="lg:sticky lg:top-6 lg:self-start">
              <BookBox locale={locale} />
              <p className="mt-4 text-center text-sm text-ink/60">{address}</p>
            </aside>
          )}
        </section>

        {isHistory ? (
          <section className="mx-auto max-w-3xl px-4 pb-20 sm:px-6">
            <BookBox locale={locale} />
          </section>
        ) : null}
      </main>
      <Footer locale={locale} />
      <StickyBar locale={locale} />
    </>
  );
}
