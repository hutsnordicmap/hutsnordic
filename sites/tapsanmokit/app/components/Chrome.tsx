import Link from "next/link";
import { Menu, Phone, Send } from "lucide-react";
import { business, HUTS, paths, tel, ui, unitList, unitPath, type Locale } from "@/app/content";

function Logo({ locale }: { locale: Locale }) {
  return (
    <Link href={paths.home[locale]} className="font-serif text-2xl leading-none tracking-tight">
      Tapsan Mökit
    </Link>
  );
}

export function Header({ locale, otherHref }: { locale: Locale; otherHref: string }) {
  const t = ui[locale];
  const links = [...unitList.map((u) => ({ href: unitPath(u, locale), label: u.name[locale] })), { href: paths.tub[locale], label: t.nav.tub }];
  return (
    <header className="relative z-20 bg-tar text-white">
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
          <a href={tel} className="hidden items-center gap-2 rounded-full bg-amber px-4 py-2 font-semibold text-white hover:bg-[#9d5a0f] md:inline-flex">
            <Phone className="size-4" aria-hidden />
            {business.phone}
          </a>
          <details className="relative lg:hidden">
            <summary className="flex cursor-pointer list-none items-center rounded-full p-1.5 hover:bg-white/10 [&::-webkit-details-marker]:hidden" aria-label="Menu">
              <Menu className="size-6" aria-hidden />
            </summary>
            <div className="absolute right-0 mt-2 w-60 overflow-hidden rounded-2xl bg-white py-2 text-tar shadow-xl">
              {links.map((l) => (
                <Link key={l.href} href={l.href} className="block px-5 py-2.5 font-semibold hover:bg-panel">
                  {l.label}
                </Link>
              ))}
            </div>
          </details>
        </nav>
      </div>
    </header>
  );
}

/** Phones only: call and quote request always one thumb away. */
export function StickyBar({ locale, bookHref }: { locale: Locale; bookHref: string }) {
  const t = ui[locale].sticky;
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-ink/10 bg-white/95 px-4 pt-3 pb-[max(12px,env(safe-area-inset-bottom))] backdrop-blur md:hidden">
      <div className="grid grid-cols-2 gap-3">
        <a href={tel} className="inline-flex items-center justify-center gap-2 rounded-full border border-tar/30 py-3 font-semibold text-tar">
          <Phone className="size-4" aria-hidden />
          {t.call}
        </a>
        <a href={bookHref} className="inline-flex items-center justify-center gap-2 rounded-full bg-amber py-3 font-semibold text-white">
          <Send className="size-4" aria-hidden />
          {t.book}
        </a>
      </div>
    </div>
  );
}

export function Footer({ locale }: { locale: Locale }) {
  const t = ui[locale];
  return (
    <footer id="yhteys" className="bg-tar-deep pb-24 text-white/85 md:pb-0">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
        <div>
          <Logo locale={locale} />
          <p className="mt-4 text-sm leading-relaxed">
            {business.owner}
            <br />
            <a href={tel} className="hover:underline">{business.phone}</a>
            <br />
            <a href={`mailto:${business.email}`} className="break-all hover:underline">{business.email}</a>
          </p>
        </div>
        <ul className="space-y-3 text-sm leading-relaxed md:col-span-2 md:grid md:grid-cols-2 md:gap-x-10 md:space-y-0">
          {unitList.map((u) => (
            <li key={u.id}>
              <Link href={unitPath(u, locale)} className="font-semibold text-white hover:underline">{u.name[locale]}</Link>
              <br />
              {u.street}, {u.postalCode} {u.locality}
            </li>
          ))}
          <li>
            <Link href={paths.tub[locale]} className="font-semibold text-white hover:underline">{t.nav.tub}</Link>
          </li>
        </ul>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-6xl px-4 py-5 text-xs text-white/50 sm:px-6">
          © {business.name} · {t.madeBy} <a href={HUTS} className="hover:underline">Huts.fi</a>
        </p>
      </div>
    </footer>
  );
}
