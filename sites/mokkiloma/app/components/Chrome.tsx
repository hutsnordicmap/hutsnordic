import Link from "next/link";
import { CalendarDays, Menu, Phone } from "lucide-react";
import { business, cottageList, cottagePath, HUTS, paths, tel, ui, type Locale } from "@/app/content";

function Logo({ locale }: { locale: Locale }) {
  return (
    <Link href={paths.home[locale]} className="leading-none">
      <span className="block font-serif text-2xl font-semibold tracking-tight">Elijärven</span>
      <span className="label block text-[0.6rem] opacity-80">Mökkilomat</span>
    </Link>
  );
}

/** Over the video the header is transparent with no background bar; elsewhere it is solid forest green. */
export function Header({ locale, otherHref, overlay = false }: { locale: Locale; otherHref: string; overlay?: boolean }) {
  const t = ui[locale];
  const links = [
    { href: paths.cottages[locale], label: t.nav.cottages },
    { href: paths.sauna[locale], label: t.nav.sauna },
    { href: paths.activities[locale], label: t.nav.activities },
    { href: paths.booking[locale], label: t.nav.booking },
  ];
  return (
    <header className={`${overlay ? "absolute inset-x-0 top-0 bg-gradient-to-b from-black/35 to-transparent" : "relative bg-forest"} z-20 text-white`}>
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Logo locale={locale} />
        <nav className="flex items-center gap-5 text-sm font-medium">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="hidden hover:underline lg:inline">
              {l.label}
            </Link>
          ))}
          <Link href={otherHref} hrefLang={locale === "fi" ? "en" : "fi"} className="hover:underline">
            {locale === "fi" ? "EN" : "FI"}
          </Link>
          <Link href={`${paths.booking[locale]}#varaa`} className="hidden rounded-full bg-white px-4 py-2 font-semibold text-forest hover:bg-moss md:inline-flex">
            {t.nav.book}
          </Link>
          <details className="relative lg:hidden">
            <summary className="flex cursor-pointer list-none items-center rounded-full p-1.5 hover:bg-white/10 [&::-webkit-details-marker]:hidden" aria-label="Menu">
              <Menu className="size-6" aria-hidden />
            </summary>
            <div className="absolute right-0 mt-2 w-60 overflow-hidden rounded-2xl bg-white py-2 text-forest shadow-xl">
              {links.map((l) => (
                <Link key={l.href} href={l.href} className="block px-5 py-2.5 font-semibold hover:bg-moss">
                  {l.label}
                </Link>
              ))}
              <div className="my-2 border-t border-ink/10" />
              {cottageList.map((c) => (
                <Link key={c.id} href={cottagePath(c, locale)} className="block px-5 py-1.5 text-sm hover:bg-moss">
                  {c.name} · {c.guests}
                </Link>
              ))}
            </div>
          </details>
        </nav>
      </div>
    </header>
  );
}

/** Phones only: call and enquiry always one thumb away. */
export function StickyBookBar({ locale, bookHref }: { locale: Locale; bookHref: string }) {
  const t = ui[locale].sticky;
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-ink/10 bg-white/95 px-4 pt-3 pb-[max(12px,env(safe-area-inset-bottom))] backdrop-blur md:hidden">
      <div className="grid grid-cols-2 gap-3">
        <a href={tel(0)} className="inline-flex items-center justify-center gap-2 rounded-full border border-forest/30 py-3 font-semibold text-forest">
          <Phone className="size-4" aria-hidden />
          {t.call}
        </a>
        <a href={bookHref} className="inline-flex items-center justify-center gap-2 rounded-full bg-copper py-3 font-semibold text-white">
          <CalendarDays className="size-4" aria-hidden />
          {t.book}
        </a>
      </div>
    </div>
  );
}

export function Footer({ locale }: { locale: Locale }) {
  const t = ui[locale];
  return (
    <footer className="bg-forest-deep pb-24 text-white/85 md:pb-0">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div>
          <Logo locale={locale} />
          <p className="mt-4 text-sm leading-relaxed">
            {business.owner}
            <br />
            {business.street}
            <br />
            {business.postalCode} {business.village}
          </p>
        </div>
        <nav className="text-sm leading-relaxed">
          <p className="label mb-2 text-white/50">{t.nav.cottages}</p>
          <ul className="space-y-1">
            {cottageList.map((c) => (
              <li key={c.id}>
                <Link href={cottagePath(c, locale)} className="hover:underline">
                  {c.name} · {t.upTo(c.guests)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav className="text-sm leading-relaxed">
          <ul className="space-y-1">
            <li><Link href={paths.home[locale]} className="hover:underline">{t.home}</Link></li>
            <li><Link href={paths.cottages[locale]} className="hover:underline">{t.nav.cottages}</Link></li>
            <li><Link href={paths.sauna[locale]} className="hover:underline">{t.nav.sauna}</Link></li>
            <li><Link href={paths.activities[locale]} className="hover:underline">{t.nav.activities}</Link></li>
            <li><Link href={paths.booking[locale]} className="hover:underline">{t.nav.booking}</Link></li>
          </ul>
        </nav>
        <div className="text-sm leading-relaxed">
          <p className="label mb-2 text-white/50">{t.contactTitle}</p>
          {business.phones.map((p, i) => (
            <p key={p}>
              <a href={tel(i)} className="hover:underline">{p}</a>
            </p>
          ))}
          <p className="mt-1">
            <a href={`mailto:${business.email}`} className="hover:underline">{business.email}</a>
          </p>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-6xl space-y-2 px-4 py-5 text-xs text-white/50 sm:px-6">
          <p>{t.elyNote}</p>
          <p>
            © {business.name} · {t.madeBy} <a href={HUTS} className="hover:underline">Huts.fi</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
