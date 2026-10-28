import Link from "next/link";
import { CalendarDays, Phone } from "lucide-react";
import { business, HUTS, more, paths, tel, ui, villaList, type Locale } from "@/app/content";

export function Header({ locale, otherHref, solid = false }: { locale: Locale; otherHref: string; solid?: boolean }) {
  const t = ui[locale];
  return (
    <header className={`${solid ? "relative bg-lake-deep" : "absolute inset-x-0 top-0"} z-20 text-white`}>
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link href={paths.home[locale]} className="font-serif text-xl font-semibold tracking-tight drop-shadow">
          Onnelan mökit
        </Link>
        <nav className="flex items-center gap-4 text-sm font-medium sm:gap-6">
          {villaList.map((v) => (
            <Link key={v.id} href={v.path[locale]} className="hidden drop-shadow hover:underline md:inline">
              {v.name}
            </Link>
          ))}
          <Link href={paths.contact[locale]} className="hidden drop-shadow hover:underline sm:inline">
            {t.nav.contact}
          </Link>
          <Link href={otherHref} hrefLang={locale === "fi" ? "en" : "fi"} className="drop-shadow hover:underline">
            {locale === "fi" ? "EN" : "FI"}
          </Link>
          <Link
            href={`${paths.contact[locale]}#varaa`}
            className="hidden rounded-full bg-white px-4 py-2 font-semibold text-lake hover:bg-mist md:inline-flex"
          >
            {t.nav.book}
          </Link>
        </nav>
      </div>
    </header>
  );
}

/** Phones only: call and book always one thumb away. */
export function StickyBookBar({ locale, bookHref }: { locale: Locale; bookHref: string }) {
  const t = more[locale].sticky;
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-ink/10 bg-white/95 px-4 pt-3 pb-[max(12px,env(safe-area-inset-bottom))] backdrop-blur md:hidden">
      <div className="grid grid-cols-2 gap-3">
        <a href={tel(business.phones[0])} className="inline-flex items-center justify-center gap-2 rounded-xl border border-lake/30 py-3 font-semibold text-lake">
          <Phone className="size-4" aria-hidden />
          {t.call}
        </a>
        <a href={bookHref} className="inline-flex items-center justify-center gap-2 rounded-xl bg-pine py-3 font-semibold text-white">
          <CalendarDays className="size-4" aria-hidden />
          {t.book}
        </a>
      </div>
    </div>
  );
}

export function Footer({ locale }: { locale: Locale }) {
  const t = ui[locale];
  const cabins =
    locale === "fi"
      ? `${HUTS}/suomi/etela-savo/kangasniemi/lomamokit`
      : `${HUTS}/finland/south-savo/kangasniemi/holiday-cabins`;
  return (
    <footer className="bg-lake-deep pb-24 text-white/85 md:pb-0">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div>
          <p className="font-serif text-xl text-white">Onnelan mökit</p>
          <p className="mt-3 text-sm leading-relaxed">
            {business.street}
            <br />
            {business.postalCode} {business.village}, {business.municipality}
          </p>
          <p className="mt-3 text-xs text-white/60">
            {t.businessId} {business.businessId}
          </p>
        </div>
        <nav className="text-sm leading-relaxed">
          <ul className="space-y-1">
            <li><Link href={paths.home[locale]} className="hover:underline">{locale === "fi" ? "Etusivu" : "Home"}</Link></li>
            {villaList.map((v) => (
              <li key={v.id}><Link href={v.path[locale]} className="hover:underline">{v.name}</Link></li>
            ))}
            <li><Link href={paths.contact[locale]} className="hover:underline">{t.nav.contact}</Link></li>
          </ul>
        </nav>
        <div className="text-sm leading-relaxed">
          {business.phones.map((p) => (
            <p key={p}>
              <a href={tel(p)} className="hover:underline">{p}</a>
            </p>
          ))}
          <p className="mt-1">
            <a href={`mailto:${business.email}`} className="hover:underline">{business.email}</a>
          </p>
          <ul className="mt-3 space-y-1">
            {villaList.map((v) => (
              <li key={v.id}>
                <a href={v.airbnb} rel="noopener" className="hover:underline">{v.name} – Airbnb</a>
              </li>
            ))}
          </ul>
        </div>
        <div className="text-sm leading-relaxed">
          <p>{t.footerHuts}:</p>
          <ul className="mt-2 space-y-1">
            {villaList.map((v) => (
              <li key={v.id}>
                <a href={`${HUTS}${v.hutsPath[locale]}`} className="text-[#ffb27a] hover:underline">{v.name} – Huts.fi</a>
              </li>
            ))}
            <li>
              <a href={cabins} className="text-[#ffb27a] hover:underline">{t.footerHutsLink}</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-6xl px-4 py-4 text-xs text-white/50 sm:px-6">
          {t.madeBy} <a href={HUTS} className="hover:underline">Huts.fi</a>
        </p>
      </div>
    </footer>
  );
}
