import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Mail, Navigation, Phone, Quote } from "lucide-react";
import { Footer, Header, NoticeBar, StickyBar } from "@/app/components/Chrome";
import { Ask, Faq, faqJsonLd, GettingHere, Included, JsonLd, lodgingJsonLd, MapEmbed, pageJsonLd, SectionTitle } from "@/app/components/Blocks";
import { PhotoStrip } from "@/app/components/Gallery";
import { Glyph, IconText } from "@/app/components/Icon";
import { Inquiry } from "@/app/components/Inquiry";
import {
  business,
  commonPhotos,
  contactPage,
  distance,
  home,
  homeAsk,
  homeFaq,
  HUTS,
  hutsPlace,
  isPreview,
  navOrder,
  nearby,
  pages,
  paths,
  photos,
  reviews,
  rooms,
  route,
  tel,
  ui,
  type Locale,
  type PageId,
} from "@/app/content";

const other = (locale: Locale): Locale => (locale === "fi" ? "en" : "fi");

function Shell({ locale, otherHref, children }: { locale: Locale; otherHref: string; children: React.ReactNode }) {
  return (
    <>
      <NoticeBar locale={locale} />
      <Header locale={locale} otherHref={otherHref} />
      <main>{children}</main>
      <Footer locale={locale} />
      <StickyBar locale={locale} />
    </>
  );
}

function CallButton({ locale }: { locale: Locale }) {
  return (
    <a href={tel(business.phone)} className="inline-flex items-center gap-2 rounded-full bg-lingon px-6 py-3.5 font-semibold text-white shadow-sm hover:bg-lingon-dark">
      <Phone className="size-4" aria-hidden />
      {ui[locale].call} {business.phoneLocal}
    </a>
  );
}

function AskButton({ locale, light = true }: { locale: Locale; light?: boolean }) {
  return (
    <a
      href="#kysy"
      className={`inline-flex items-center gap-2 rounded-full border px-6 py-3.5 font-semibold ${light ? "border-ink/25 hover:bg-ink hover:text-paper" : "border-paper/40 text-paper hover:bg-paper hover:text-ink"}`}
    >
      <Mail className="size-4" aria-hidden />
      {ui[locale].ask}
    </a>
  );
}

/** Dark band with the enquiry form: the end of every page. */
function EnquiryBand({ locale }: { locale: Locale }) {
  const h = home[locale];
  return (
    <section id="kysy" className="scroll-mt-20 bg-spruce text-paper">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:py-28">
        <div>
          <p className="label text-lingon-light">{business.name}</p>
          <h2 className="mt-4 font-display text-4xl leading-[1.05] sm:text-6xl">{h.ctaTitle}</h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-paper/75">{h.ctaText}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <CallButton locale={locale} />
            <a href={`mailto:${business.email}`} className="inline-flex items-center gap-2 rounded-full border border-paper/40 px-6 py-3.5 font-semibold hover:bg-paper hover:text-ink">
              <Mail className="size-4" aria-hidden />
              {business.email}
            </a>
          </div>
        </div>
        <div className="rounded-3xl bg-spruce-soft p-6 sm:p-8">
          <Inquiry locale={locale} tone="dark" />
        </div>
      </div>
    </section>
  );
}

function RoomCards({ locale }: { locale: Locale }) {
  const t = ui[locale];
  return (
    <div className="grid gap-x-10 gap-y-14 md:grid-cols-2">
      {rooms.map((r) => (
        <Link key={r.id} id={r.id} href={`${paths.majoitus[locale]}#${r.id}`} className="group scroll-mt-24 text-center">
          <div className="relative mx-auto aspect-square w-full max-w-sm overflow-hidden rounded-full ring-8 ring-birch">
            <Image src={r.photo.src} alt={r.photo[locale]} fill sizes="(min-width: 768px) 384px, 90vw" className="object-cover transition duration-700 group-hover:scale-[1.05]" />
          </div>
          <h3 className="mt-7 font-display text-3xl">{r.name[locale]}</h3>
          <p className="mt-2 text-sm font-semibold tracking-wide text-lingon">{r.beds[locale]}</p>
          <p className="mx-auto mt-3 max-w-sm leading-relaxed text-ink/75">{r.text[locale]}</p>
          <span className="mt-4 inline-flex items-center gap-2 font-semibold text-ink group-hover:text-lingon">
            {t.readMore} <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden />
          </span>
        </Link>
      ))}
    </div>
  );
}

function NearbyList({ locale }: { locale: Locale }) {
  const t = ui[locale];
  return (
    <div>
      <ul className="divide-y divide-ink/10 border-y border-ink/10">
        {nearby.map((n) => {
          const inner = (
            <>
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-birch text-lingon">
                <Glyph name={n.icon} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-semibold">{n.name}</span>
                <span className="block text-sm text-ink/60">{n.text[locale]}</span>
              </span>
              <span className="shrink-0 font-display text-xl tabular-nums">{distance(n.km, locale)}</span>
            </>
          );
          return (
            <li key={n.name}>
              {n.huts ? (
                <a href={`${HUTS}${n.huts[locale]}`} rel="noopener" className="flex items-center gap-4 py-3.5 hover:text-lingon">
                  {inner}
                </a>
              ) : (
                <span className="flex items-center gap-4 py-3.5">{inner}</span>
              )}
            </li>
          );
        })}
      </ul>
      <p className="mt-3 text-xs text-ink/55">{t.crow}</p>
    </div>
  );
}

function Reviews({ locale }: { locale: Locale }) {
  const h = home[locale];
  if (reviews.length === 0) {
    if (!isPreview) return null;
    return (
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
        <SectionTitle kicker={h.reviewsKicker} title={h.reviewsTitle} />
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="rounded-3xl border-2 border-dashed border-[#d9772f]/50 bg-[#fff6ee] p-6 text-sm text-ink/70">
              <Quote className="size-6 text-[#d9772f]" aria-hidden />
              <p className="mt-3">
                {locale === "fi"
                  ? "Tähän tulee vieraan arvio sanasta sanaan, etunimi, lähde (Booking.com, Google tai Facebook) ja päivämäärä."
                  : "A guest's review goes here word for word, with first name, source (Booking.com, Google or Facebook) and date."}
              </p>
            </div>
          ))}
        </div>
      </section>
    );
  }
  return (
    <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
      <SectionTitle kicker={h.reviewsKicker} title={h.reviewsTitle} />
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {reviews.map((r) => (
          <figure key={r.text.fi.slice(0, 30)} className="rounded-3xl bg-white p-6 shadow-sm">
            <Quote className="size-6 text-lingon" aria-hidden />
            <blockquote className="mt-3 leading-relaxed text-ink/85">{r.text[locale]}</blockquote>
            <figcaption className="mt-4 text-sm text-ink/55">
              {r.name} · {r.source}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

/* -------------------------------- Home -------------------------------- */

export function HomeView({ locale }: { locale: Locale }) {
  const h = home[locale];
  const t = ui[locale];
  return (
    <Shell locale={locale} otherHref={paths.home[other(locale)]}>
      <JsonLd data={lodgingJsonLd(locale)} />
      <JsonLd data={faqJsonLd(homeFaq[locale])} />

      {/* Hero: headline left, the house in a big rounded frame right, a room in a round inset */}
      <section className="overflow-hidden">
        <div className="mx-auto grid max-w-7xl gap-14 px-4 pt-0 pb-20 sm:px-6 sm:pt-10 lg:grid-cols-12 lg:gap-10 lg:pt-16 lg:pb-28">
          <div className="lg:col-span-6 lg:self-center">
            <p className="label text-lingon">{h.kicker}</p>
            <h1 className="mt-5 text-balance font-display text-[2.6rem] leading-[1.02] tracking-tight sm:text-6xl lg:text-[4.6rem]">{h.h1}</h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink/75">{h.lead}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <CallButton locale={locale} />
              <AskButton locale={locale} />
            </div>
            <dl className="mt-12 grid max-w-lg grid-cols-3 gap-4 border-t border-ink/15 pt-6">
              {h.stats.map((s) => (
                <div key={s.label}>
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="font-display text-3xl sm:text-4xl">{s.value}</dd>
                  <dd className="mt-1 text-sm text-ink/60">{s.label}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="relative order-first -mx-4 sm:mx-0 lg:order-none lg:col-span-6">
            <div className="relative aspect-[4/3] overflow-hidden sm:rounded-[2.5rem] lg:aspect-[5/6]">
              <Image src={photos.outside.src} alt={photos.outside[locale]} fill priority sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
            </div>
            <div className="absolute -bottom-10 left-4 size-32 overflow-hidden rounded-full border-[6px] border-paper shadow-xl sm:-left-2 sm:size-48 lg:-left-12 lg:size-56">
              <Image src={photos.dining.src} alt={photos.dining[locale]} fill sizes="224px" className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Included: the honest list that sells a budget stay */}
      <section className="bg-spruce text-paper">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1fr_1.4fr] lg:py-24">
          <div>
            <SectionTitle kicker={t.included} title={h.includedTitle} tone="dark" />
            <p className="mt-5 max-w-md text-lg leading-relaxed text-paper/75">{h.includedText}</p>
          </div>
          <Included locale={locale} tone="dark" />
        </div>
      </section>

      {/* Rooms */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <p className="label text-lingon">{h.roomsKicker}</p>
          <h2 className="mt-3 text-balance font-display text-3xl leading-[1.1] sm:text-4xl lg:text-5xl">{h.roomsTitle}</h2>
        </div>
        <div className="mt-14">
          <RoomCards locale={locale} />
        </div>
      </section>

      {/* Who stays here */}
      <section className="bg-birch">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-24">
          <SectionTitle kicker={h.whoKicker} title={h.whoTitle} />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {h.who.map((w) => (
              <Link key={w.title} href={paths[w.to as PageId][locale]} className="group flex flex-col rounded-3xl bg-paper p-6 transition hover:-translate-y-1 hover:shadow-lg">
                <span className="grid size-12 place-items-center rounded-full bg-lingon text-white">
                  <Glyph name={w.icon} />
                </span>
                <h3 className="mt-5 font-display text-2xl leading-tight">{w.title}</h3>
                <p className="mt-2 flex-1 leading-relaxed text-ink/70">{w.text}</p>
                <ArrowRight className="mt-5 size-5 text-lingon transition group-hover:translate-x-1" aria-hidden />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Shared spaces */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="grid grid-cols-5 grid-rows-[auto_auto] gap-3">
            <div className="relative col-span-5 aspect-[16/10] overflow-hidden rounded-3xl">
              <Image src={photos.dining.src} alt={photos.dining[locale]} fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
            </div>
            <div className="relative col-span-3 aspect-[4/3] overflow-hidden rounded-3xl">
              <Image src={photos.kitchen.src} alt={photos.kitchen[locale]} fill sizes="(min-width: 1024px) 27vw, 60vw" className="object-cover" />
            </div>
            <div className="relative col-span-2 aspect-square self-center overflow-hidden rounded-full">
              <Image src={photos.breakfast.src} alt={photos.breakfast[locale]} fill sizes="(min-width: 1024px) 18vw, 40vw" className="object-cover" />
            </div>
          </div>
          <div>
            <SectionTitle kicker={h.commonKicker} title={h.commonTitle} />
            <p className="mt-6 text-lg leading-relaxed text-ink/75">{h.commonText}</p>
            <Link href={paths.majoitus[locale]} className="mt-8 inline-flex items-center gap-2 font-semibold text-lingon hover:underline">
              {t.nav.majoitus} <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <p className="label text-lingon">{t.allPhotos}</p>
        </div>
        <div className="mx-auto mt-6 max-w-7xl">
          <PhotoStrip photos={[photos.single, photos.singleWindow, photos.twin, ...commonPhotos]} locale={locale} />
        </div>
      </section>

      <Reviews locale={locale} />

      {/* Nearby and map */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-28">
          <SectionTitle kicker={h.nearbyKicker} title={h.nearbyTitle} />
          <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_1.3fr]">
            <div>
              <NearbyList locale={locale} />
              <Link href={paths.kuhmo[locale]} className="mt-6 inline-flex items-center gap-2 font-semibold text-lingon hover:underline">
                {t.nav.kuhmo} <ArrowRight className="size-4" aria-hidden />
              </Link>
            </div>
            <MapEmbed locale={locale} />
          </div>
        </div>
      </section>

      {/* Host: preview placeholder until Mikko sends a photo and a few lines */}
      {isPreview ? (
        <section className="mx-auto max-w-7xl px-4 pt-20 sm:px-6">
          <div className="grid items-center gap-8 rounded-[2.5rem] border-2 border-dashed border-[#d9772f]/50 bg-[#fff6ee] p-8 sm:grid-cols-[auto_1fr] sm:p-10">
            <div className="grid size-40 place-items-center rounded-full bg-birch text-center text-sm text-ink/50">
              {locale === "fi" ? "Kuva Mikosta" : "Photo of Mikko"}
            </div>
            <div>
              <p className="label text-lingon">{h.hostKicker}</p>
              <p className="mt-2 font-display text-3xl">{h.hostTitle}</p>
              <p className="mt-3 max-w-xl leading-relaxed text-ink/70">{h.hostPlaceholder}</p>
            </div>
          </div>
        </section>
      ) : null}

      <section className="mx-auto max-w-4xl px-4 py-20 sm:px-6">
        <SectionTitle title={t.faqTitle} />
        <div className="mt-8">
          <Faq items={homeFaq[locale]} />
        </div>
        <div className="mt-10">
          <Ask locale={locale} items={homeAsk[locale]} />
        </div>
      </section>

      <EnquiryBand locale={locale} />
    </Shell>
  );
}

/* --------------------------- Content pages --------------------------- */

export function ContentView({ id, locale }: { id: PageId; locale: Locale }) {
  const p = pages[id][locale];
  const t = ui[locale];
  return (
    <Shell locale={locale} otherHref={paths[id][other(locale)]}>
      <JsonLd data={lodgingJsonLd(locale)} />
      <JsonLd data={pageJsonLd(id, locale, p.h1, p.description, p.faq)} />

      <section>
        <div className="mx-auto grid max-w-7xl gap-10 px-4 pt-8 pb-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-16 lg:pt-14 lg:pb-24">
          <div>
            <nav aria-label="Breadcrumb" className="text-sm text-ink/50">
              <Link href={paths.home[locale]} className="hover:text-lingon">{business.name}</Link>
              <span className="px-2">/</span>
              <span>{t.nav[id]}</span>
            </nav>
            <p className="label mt-8 text-lingon">{p.kicker}</p>
            <h1 className="mt-4 text-balance font-display text-[2.4rem] leading-[1.05] tracking-tight sm:text-6xl">{p.h1}</h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink/75">{p.lead}</p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {p.facts.map((f) => (
                <li key={f} className="rounded-2xl bg-birch px-4 py-3">
                  <IconText value={f} className="font-medium" />
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <CallButton locale={locale} />
              <AskButton locale={locale} />
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[2.5rem] lg:aspect-[5/6]">
            <Image src={p.hero.src} alt={p.hero[locale]} fill priority sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          </div>
        </div>
      </section>

      {id === "majoitus" ? (
        <>
          <section className="bg-birch">
            <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-24">
              <RoomCards locale={locale} />
            </div>
          </section>
          <section className="bg-spruce text-paper">
            <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1fr_1.4fr]">
              <SectionTitle kicker={business.name} title={t.included} tone="dark" />
              <Included locale={locale} tone="dark" />
            </div>
          </section>
        </>
      ) : null}

      <section className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
        <div className="space-y-14">
          {p.sections.map((s) => (
            <div key={s.title} id={s.id} className="scroll-mt-24">
              <h2 className="font-display text-3xl leading-tight sm:text-4xl">{s.title}</h2>
              {s.text.map((para) => (
                <p key={para.slice(0, 24)} className="mt-4 text-lg leading-relaxed text-ink/75">
                  {para}
                </p>
              ))}
            </div>
          ))}
          {id === "kuhmo" ? <NearbyList locale={locale} /> : null}
        </div>
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-3xl border border-ink/10 bg-white p-6 shadow-sm sm:p-8">
            <Inquiry locale={locale} />
          </div>
        </aside>
      </section>

      <section className="pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <p className="label text-lingon">{t.gallery}</p>
        </div>
        <div className="mx-auto mt-6 max-w-7xl">
          <PhotoStrip photos={p.photos} locale={locale} />
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <SectionTitle kicker={business.name} title={t.findUs} />
          <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1.5fr]">
            <GettingHere locale={locale} />
            <MapEmbed locale={locale} />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-20 sm:px-6">
        <SectionTitle title={t.faqTitle} />
        <div className="mt-8">
          <Faq items={p.faq} />
        </div>
        <div className="mt-10">
          <Ask locale={locale} items={p.ask} />
        </div>
      </section>

      <section className="border-t border-ink/10">
        <div className="mx-auto grid max-w-7xl gap-px bg-ink/10 sm:grid-cols-3">
          {[...navOrder.filter((x) => x !== id).map((x) => ({ href: paths[x][locale], label: t.nav[x] })), { href: paths.contact[locale], label: t.nav.contact }].map((l) => (
            <Link key={l.href} href={l.href} className="group flex items-center justify-between bg-paper px-6 py-8 hover:bg-birch">
              <span className="font-display text-2xl">{l.label}</span>
              <ArrowRight className="size-5 text-lingon transition group-hover:translate-x-1" aria-hidden />
            </Link>
          ))}
        </div>
      </section>

      <EnquiryBand locale={locale} />
    </Shell>
  );
}

/* ------------------------------- Contact ------------------------------- */

export function ContactView({ locale }: { locale: Locale }) {
  const c = contactPage[locale];
  const t = ui[locale];
  return (
    <Shell locale={locale} otherHref={paths.contact[other(locale)]}>
      <JsonLd data={lodgingJsonLd(locale)} />
      <section className="bg-spruce text-paper">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:py-20">
          <div>
            <h1 className="font-display text-5xl leading-[1.04] sm:text-6xl">{c.h1}</h1>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-paper/80">{c.lead}</p>
            <div className="mt-10 space-y-3 text-lg">
              <p>
                <a href={tel(business.phone)} className="font-display text-4xl hover:text-lingon-light">{business.phoneLocal}</a>
              </p>
              <p>
                <a href={`mailto:${business.email}`} className="break-all text-paper/85 hover:text-white">{business.email}</a>
              </p>
              <p className="flex flex-wrap gap-5 pt-2 text-sm font-semibold">
                <a href={business.facebook} rel="noopener" className="text-lingon-light hover:underline">Facebook</a>
                <a href={business.booking} rel="noopener" className="inline-flex items-center gap-1 text-lingon-light hover:underline">
                  Booking.com <ArrowUpRight className="size-4" aria-hidden />
                </a>
                <a href={`${HUTS}${hutsPlace[locale]}`} rel="noopener" className="text-lingon-light hover:underline">
                  {t.onHuts}
                </a>
                <a href={route} rel="noopener" className="inline-flex items-center gap-1 text-lingon-light hover:underline">
                  <Navigation className="size-4" aria-hidden />
                  {t.route}
                </a>
              </p>
            </div>
          </div>
          <div className="rounded-3xl bg-spruce-soft p-6 sm:p-8">
            <Inquiry locale={locale} tone="dark" />
          </div>
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1fr_1.5fr]">
        <div className="space-y-10">
          <GettingHere locale={locale} />
          <Ask locale={locale} items={c.ask} />
        </div>
        <MapEmbed locale={locale} />
      </section>
    </Shell>
  );
}
