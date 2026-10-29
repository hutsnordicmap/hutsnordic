import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, MessageCircle, Navigation, Phone } from "lucide-react";
import { Footer, Header, NoticeBar, StickyBar } from "@/app/components/Chrome";
import { Ask, Faq, GettingHere, GoogleRating, HoursList, JsonLd, MapEmbed, millJsonLd, SectionTitle, serviceJsonLd } from "@/app/components/Blocks";
import { PhotoStrip } from "@/app/components/Gallery";
import { IconText } from "@/app/components/Icon";
import { OpenStatus } from "@/app/components/OpenStatus";
import { dayRange, hoursText } from "@/app/hours";
import {
  business,
  contactPage,
  home,
  homeAsk,
  homeFaq,
  HUTS,
  mapPlaces,
  live,
  navOrder,
  pages,
  paths,
  photos,
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

function ContactButtons({ locale, light = false }: { locale: Locale; light?: boolean }) {
  const t = ui[locale];
  const ghost = light ? "border-ink/30 text-ink hover:bg-ink hover:text-flour" : "border-flour/40 text-flour hover:bg-flour hover:text-coal";
  return (
    <div className="flex flex-wrap gap-3">
      <a href={tel(business.phone)} className="inline-flex items-center gap-2 bg-rust px-5 py-3 font-semibold text-white hover:bg-[#a04824]">
        <Phone className="size-4" aria-hidden />
        {t.call} {business.phoneLocal}
      </a>
      <a href={business.whatsapp} rel="noopener" className={`inline-flex items-center gap-2 border px-5 py-3 font-semibold ${ghost}`}>
        <MessageCircle className="size-4" aria-hidden />
        {t.whatsapp}
      </a>
    </div>
  );
}

function CtaBand({ locale, title, text }: { locale: Locale; title: string; text: string }) {
  return (
    <section className="bg-coal text-flour">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-20 sm:px-6 md:grid-cols-[1.4fr_1fr] md:items-end">
        <div>
          <p className="label text-rust-light">{business.name}</p>
          <h2 className="mt-4 font-display text-4xl leading-[1.05] sm:text-6xl">{title}</h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-flour/75">{text}</p>
        </div>
        <ContactButtons locale={locale} />
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
      <JsonLd data={millJsonLd(locale)} />

      {/* Hero: black, text left, tall photo right with a second photo laid over it */}
      <section className="bg-coal text-flour">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 pt-12 pb-16 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:pt-20 lg:pb-24">
          <div className="lg:col-span-7 lg:pr-8">
            <p className="label text-rust-light">{h.kicker}</p>
            <h1 className="mt-5 text-balance font-display text-[2.7rem] leading-[1.02] sm:text-6xl lg:text-[5.2rem]">{h.h1}</h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-flour/80">{h.lead}</p>
            <GoogleRating locale={locale} />
            <div className="mt-8">
              <ContactButtons locale={locale} />
            </div>
            <div className="mt-12 border-t border-white/15 pt-6">
              <OpenStatus locale={locale} />
            </div>
          </div>
          <div className="relative lg:col-span-5">
            <div className="relative aspect-[4/5] w-full overflow-hidden lg:aspect-auto lg:h-full lg:min-h-[620px]">
              <Image src={photos.sign.src} alt={photos.sign[locale]} fill priority sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
            </div>
            <div className="absolute -bottom-8 -left-2 w-[42%] border-[6px] border-coal sm:-left-8 lg:-left-16">
              <div className="relative aspect-[4/5]">
                <Image src={photos.buns.src} alt={photos.buns[locale]} fill sizes="20vw" className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* "mylly" dictionary entry: the four things the mill is, numbered */}
      <section className="bg-coal text-flour">
        <div className="mx-auto grid max-w-7xl gap-10 border-t border-white/10 px-4 py-20 sm:px-6 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <p className="font-display text-7xl italic leading-none sm:text-8xl">{h.wordTitle}</p>
            <p className="mt-3 text-sm text-flour/55">
              /ˈmyl.ly/ · {h.wordClass}
            </p>
          </div>
          <ol className="divide-y divide-white/10 border-y border-white/10">
            {h.word.map((w, i) => (
              <li key={w.id}>
                <Link href={paths[w.id][locale]} className="group grid grid-cols-[3rem_1fr_auto] items-start gap-4 py-6">
                  <span className="font-display text-xl text-rust-light">{String(i + 1).padStart(2, "0")}</span>
                  <span>
                    <span className="block font-display text-2xl sm:text-3xl">{w.title}</span>
                    <span className="mt-2 block max-w-xl leading-relaxed text-flour/70">{w.text}</span>
                  </span>
                  <ArrowUpRight className="mt-2 size-6 text-flour/40 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-rust-light" aria-hidden />
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Café and shop, the two main reasons to come */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-28">
        <div className="grid items-center gap-10 md:grid-cols-2 lg:gap-16">
          <div className="relative aspect-[4/5] overflow-hidden">
            <Image src={photos.pies.src} alt={photos.pies[locale]} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
          </div>
          <div>
            <SectionTitle kicker={h.cafeKicker} title={h.cafeTitle} />
            <p className="mt-6 text-lg leading-relaxed text-ink/80">{h.cafeText}</p>
            <ul className="mt-8 space-y-3">
              {h.cafePills.map((p) => (
                <li key={p}>
                  <IconText value={p} className="font-medium" />
                </li>
              ))}
            </ul>
            <Link href={paths.kahvila[locale]} className="mt-8 inline-flex items-center gap-2 font-semibold text-rust hover:underline">
              {t.nav.kahvila} <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        </div>
        <div className="mt-20 grid items-center gap-10 md:grid-cols-2 lg:mt-28 lg:gap-16">
          <div className="md:order-2 relative aspect-square overflow-hidden">
            <Image src={photos.lamps.src} alt={photos.lamps[locale]} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
          </div>
          <div>
            <SectionTitle kicker={h.shopKicker} title={h.shopTitle} />
            <p className="mt-6 text-lg leading-relaxed text-ink/80">{h.shopText}</p>
            <Link href={paths.putiikki[locale]} className="mt-8 inline-flex items-center gap-2 font-semibold text-rust hover:underline">
              {t.nav.putiikki} <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      {/* Two photo panels: event room and the small lodging */}
      <section className="bg-coal">
        <div className="grid md:grid-cols-2">
          {(
            [
              { id: "juhlatila", photo: photos.longTable, ...h.splitEvents },
              { id: "majoitus", photo: photos.pond, ...h.splitStay },
            ] as const
          ).map((p) => (
            <Link key={p.id} href={paths[p.id][locale]} className="group relative isolate flex min-h-[460px] items-end overflow-hidden text-flour sm:min-h-[560px]">
              <Image src={p.photo.src} alt={p.photo[locale]} fill sizes="(min-width: 768px) 50vw, 100vw" className="-z-10 object-cover opacity-80 transition duration-700 group-hover:scale-[1.04] group-hover:opacity-90" />
              <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
              <div className="p-6 sm:p-10">
                <p className="label text-rust-light">{p.kicker}</p>
                <p className="mt-3 font-display text-3xl leading-tight sm:text-4xl">{p.title}</p>
                <p className="mt-3 max-w-md text-flour/80">{p.text}</p>
                {p.id === "majoitus" ? <p className="mt-2 text-sm text-flour/60">{live.lodgingStatus[locale]}</p> : null}
                <span className="mt-5 inline-flex items-center gap-2 font-semibold">
                  {t.readMore} <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Events: what has happened at the mill in past summers */}
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:py-28">
        <div>
          <SectionTitle kicker={h.eventsKicker} title={h.eventsTitle} />
          <p className="mt-6 text-lg leading-relaxed text-ink/80">{h.eventsText}</p>
          <ul className="mt-8 divide-y divide-ink/10 border-y border-ink/10">
            {live.events.map((e) => (
              <li key={e.from} className="flex gap-4 py-3.5">
                <span className="w-28 shrink-0 font-display text-rust">{dayRange({ ...e, label: e.text }, locale)}</span>
                <span>
                  <span className="font-semibold">{e.name}</span>
                  <span className="block text-sm text-ink/60">
                    {e.text[locale]}, {hoursText({ ...e, label: e.text }, locale)}
                  </span>
                </span>
              </li>
            ))}
          </ul>
          <a href={business.facebook} rel="noopener" className="mt-6 inline-flex items-center gap-2 font-semibold text-rust hover:underline">
            Facebook <ArrowUpRight className="size-4" aria-hidden />
          </a>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="relative col-span-2 aspect-[16/10] overflow-hidden">
            <Image src={photos.partySet.src} alt={photos.partySet[locale]} fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
          </div>
          <div className="relative aspect-square overflow-hidden">
            <Image src={photos.yard.src} alt={photos.yard[locale]} fill sizes="(min-width: 1024px) 22vw, 50vw" className="object-cover" />
          </div>
          <div className="relative aspect-square overflow-hidden">
            <Image src={photos.cabinet.src} alt={photos.cabinet[locale]} fill sizes="(min-width: 1024px) 22vw, 50vw" className="object-cover" />
          </div>
        </div>
      </section>

      {/* History */}
      <section className="bg-bran">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:py-28">
          <div className="relative">
            <div className="relative aspect-[16/9] overflow-hidden">
              <Image src={photos.aerial.src} alt={photos.aerial[locale]} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
            </div>
            <p className="pointer-events-none absolute -bottom-8 right-2 font-display text-[5.5rem] leading-none text-coal sm:text-[8rem]" aria-hidden>
              {business.founded}
            </p>
          </div>
          <div className="pt-6 lg:pt-0">
            <SectionTitle kicker={h.historyKicker} title={h.historyTitle} />
            {h.historyText.map((p) => (
              <p key={p.slice(0, 20)} className="mt-5 text-lg leading-relaxed text-ink/80">
                {p}
              </p>
            ))}
            <a href={business.history} rel="noopener" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-rust hover:underline">
              {h.historyLink} <ArrowUpRight className="size-4" aria-hidden />
            </a>
          </div>
        </div>
      </section>

      {/* The mill through the seasons */}
      <section className="bg-coal py-16 text-flour">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="font-display text-3xl sm:text-4xl">{h.seasonsTitle}</h2>
        </div>
        <div className="mx-auto mt-8 max-w-7xl">
          <PhotoStrip photos={[photos.spring, photos.summer, photos.rapidsSummer, photos.yard2, photos.autumn, photos.christmas, photos.winter, photos.skis, photos.window]} locale={locale} />
        </div>
      </section>

      {/* Visit */}
      <section id="kaynti" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-28">
        <SectionTitle kicker={business.name} title={h.visitTitle} />
        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1.5fr]">
          <div className="space-y-10">
            <OpenStatus locale={locale} tone="light" />
            <GettingHere locale={locale} />
          </div>
          <MapEmbed locale={locale} />
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 pb-20 sm:px-6">
        <SectionTitle title={t.faqTitle} />
        <div className="mt-8">
          <Faq items={homeFaq[locale]} />
        </div>
        <div className="mt-10">
          <Ask locale={locale} items={homeAsk[locale]} />
        </div>
      </section>

      <CtaBand locale={locale} title={h.ctaTitle} text={h.ctaText} />
    </Shell>
  );
}

/* --------------------------- Service pages --------------------------- */

export function ServiceView({ id, locale }: { id: PageId; locale: Locale }) {
  const p = pages[id][locale];
  const t = ui[locale];
  return (
    <Shell locale={locale} otherHref={paths[id][other(locale)]}>
      <JsonLd data={serviceJsonLd(id, locale, t.nav[id], p.description, p.faq)} />

      <section className="bg-coal text-flour">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-16 lg:py-20">
          <div>
            <nav aria-label="Breadcrumb" className="text-sm text-flour/50">
              <Link href={paths.home[locale]} className="hover:text-white">{business.name}</Link>
              <span className="px-2">/</span>
              <span>{t.nav[id]}</span>
            </nav>
            <p className="label mt-8 text-rust-light">{p.kicker}</p>
            <h1 className="mt-4 text-balance font-display text-[2.5rem] leading-[1.04] sm:text-6xl">{p.h1}</h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-flour/80">{p.lead}</p>
            {id === "kahvila" ? <GoogleRating locale={locale} /> : null}
            {id === "majoitus" ? <p className="mt-4 inline-block border border-rust-light/50 px-3 py-1.5 text-sm text-rust-light">{live.lodgingStatus[locale]}</p> : null}
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {p.facts.map((f) => (
                <li key={f} className="border-t border-white/15 pt-3">
                  <IconText value={f} className="text-flour/90" />
                </li>
              ))}
            </ul>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden lg:aspect-[5/6]">
            <Image src={p.hero.src} alt={p.hero[locale]} fill priority sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          </div>
        </div>
      </section>

      {p.units ? (
        <section className="mx-auto max-w-7xl px-4 pt-20 sm:px-6">
          <div className="grid gap-8 md:grid-cols-2">
            {p.units.map((u) => (
              <article key={u.id} id={u.id} className="scroll-mt-24 bg-white">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image src={u.photo.src} alt={u.photo[locale]} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
                </div>
                <div className="p-6">
                  <h2 className="font-display text-3xl">{u.name}</h2>
                  <p className="mt-2 font-semibold text-rust">{u.beds}</p>
                  <p className="mt-3 leading-relaxed text-ink/75">{u.text}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      <section className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
        <div className="space-y-14">
          {p.sections.map((s) => (
            <div key={s.title} id={s.id} className="scroll-mt-24">
              <h2 className="font-display text-3xl leading-tight sm:text-4xl">{s.title}</h2>
              {s.text.map((para) => (
                <p key={para.slice(0, 24)} className="mt-4 text-lg leading-relaxed text-ink/80">
                  {para}
                </p>
              ))}
            </div>
          ))}
        </div>
        <aside className="space-y-8 lg:sticky lg:top-24 lg:self-start">
          {p.prices ? (
            <div className="bg-coal p-6 text-flour sm:p-8">
              <p className="label text-rust-light">{p.prices.title}</p>
              <dl className="mt-5 divide-y divide-white/10">
                {p.prices.rows.map((r) => (
                  <div key={r.item} className="flex items-baseline justify-between gap-4 py-3">
                    <dt className="text-sm text-flour/80">{r.item}</dt>
                    <dd className="shrink-0 font-display text-xl">{r.price}</dd>
                  </div>
                ))}
              </dl>
              {p.prices.note ? <p className="mt-4 text-xs leading-relaxed text-flour/55">{p.prices.note}</p> : null}
            </div>
          ) : null}
          <div className="border border-ink/15 p-6 sm:p-8">
            <p className="font-display text-2xl">{p.cta}</p>
            <div className="mt-5">
              <ContactButtons locale={locale} light />
            </div>
          </div>
          <div className="border border-ink/15 p-6 sm:p-8">
            <OpenStatus locale={locale} tone="light" />
          </div>
        </aside>
      </section>

      <section className="bg-coal py-16 text-flour">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <p className="label text-rust-light">{t.gallery}</p>
        </div>
        <div className="mx-auto mt-6 max-w-7xl">
          <PhotoStrip photos={p.photos} locale={locale} />
        </div>
      </section>

      {/* Where this part of the mill is: the matching Huts.fi place on the map */}
      <section className="mx-auto max-w-7xl px-4 pt-20 sm:px-6">
        <SectionTitle kicker={t.nav[id]} title={t.findUs} />
        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1.5fr]">
          <GettingHere locale={locale} />
          <MapEmbed locale={locale} src={`${HUTS}/embed${mapPlaces[id][locale]}?address=1`} title={`${business.name} – ${t.nav[id]}`} />
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
        <div className="mx-auto grid max-w-7xl gap-px bg-ink/10 sm:grid-cols-2 lg:grid-cols-4">
          {navOrder
            .filter((x) => x !== id)
            .map((x) => (
              <Link key={x} href={paths[x][locale]} className="group flex items-center justify-between bg-flour px-6 py-8 hover:bg-bran">
                <span className="font-display text-2xl">{t.nav[x]}</span>
                <ArrowRight className="size-5 text-rust transition group-hover:translate-x-1" aria-hidden />
              </Link>
            ))}
        </div>
      </section>

      <CtaBand locale={locale} title={home[locale].ctaTitle} text={home[locale].ctaText} />
    </Shell>
  );
}

/* ------------------------------- Contact ------------------------------- */

export function ContactView({ locale }: { locale: Locale }) {
  const c = contactPage[locale];
  const t = ui[locale];
  return (
    <Shell locale={locale} otherHref={paths.contact[other(locale)]}>
      <JsonLd data={millJsonLd(locale)} />
      <section className="bg-coal text-flour">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:py-20">
          <div>
            <h1 className="font-display text-5xl leading-[1.04] sm:text-6xl">{c.h1}</h1>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-flour/80">{c.lead}</p>
            <div className="mt-10">
              <OpenStatus locale={locale} />
            </div>
          </div>
          <div>
            <p className="label text-flour/60">{t.hours}</p>
            <div className="mt-4">
              <HoursList locale={locale} />
            </div>
            <div className="mt-10 space-y-2 text-lg">
              <p>
                <a href={tel(business.phone)} className="font-display text-3xl hover:text-rust-light">{business.phoneLocal}</a>
              </p>
              <p>
                <a href={`mailto:${business.email}`} className="break-all text-flour/80 hover:text-white">{business.email}</a>
              </p>
              <p className="flex gap-5 pt-2 text-sm font-semibold">
                <a href={business.whatsapp} rel="noopener" className="text-rust-light hover:underline">WhatsApp</a>
                <a href={business.facebook} rel="noopener" className="text-rust-light hover:underline">Facebook</a>
                <a href={route} rel="noopener" className="inline-flex items-center gap-1 text-rust-light hover:underline">
                  <Navigation className="size-4" aria-hidden />
                  {t.route}
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1fr_1.5fr]">
        <div className="space-y-10">
          <GettingHere locale={locale} />
          <div>
            <p className="label opacity-60">{c.accessTitle}</p>
            <p className="mt-2 leading-relaxed text-ink/80">{c.access}</p>
          </div>
          <Ask locale={locale} items={c.ask} />
        </div>
        <MapEmbed locale={locale} />
      </section>
    </Shell>
  );
}
