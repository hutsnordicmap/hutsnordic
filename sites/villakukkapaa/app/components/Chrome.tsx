import Link from "next/link";
import { CalendarCheck, Mail, Menu, Phone } from "lucide-react";
import { address, business, HUTS, pageList, paths, tel, ui, type Locale } from "@/app/content";

export function Header({ locale, otherHref, overlay = false }: { locale: Locale; otherHref: string; overlay?: boolean }) {
  const t = ui[locale];
  const links = pageList.map((p) => ({ href: paths[p.id][locale], label: p.name[locale] }));
  return (
    <header className={`${overlay ? "absolute inset-x-0 top-0 bg-gradient-to-b from-black/45 to-transparent" : "relative bg-lake-deep"} z-20 text-white`}>
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link href={paths.home[locale]} className="font-serif text-2xl leading-none">
          {business.name}
        </Link>
        <nav className="flex items-center gap-5 text-sm font-medium">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="hidden hover:underline lg:inline">
              {l.label}
            </Link>
          ))}
          <Link href={otherHref} hrefLang={locale === "fi" ? "en" : "fi"} className="hover:underline">
            {locale === "fi" ? "EN" : "FI"}
          </Link>
          <a href={business.booking} rel="noopener" className="hidden items-center gap-2 rounded-full bg-ochre px-4 py-2 font-semibold text-lake-deep hover:bg-[#ecc46c] md:inline-flex">
            <CalendarCheck className="size-4" aria-hidden />
            {t.book}
          </a>
          <details className="relative lg:hidden">
            <summary className="flex cursor-pointer list-none items-center rounded-full p-1.5 hover:bg-white/10 [&::-webkit-details-marker]:hidden" aria-label="Menu">
              <Menu className="size-6" aria-hidden />
            </summary>
            <div className="absolute right-0 mt-2 w-60 overflow-hidden rounded-2xl bg-white py-2 text-lake-deep shadow-xl">
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

/** Phones only: call and book always one thumb away. */
export function StickyBar({ locale }: { locale: Locale }) {
  const t = ui[locale];
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-ink/10 bg-white/95 px-4 pt-3 pb-[max(12px,env(safe-area-inset-bottom))] backdrop-blur md:hidden">
      <div className="grid grid-cols-2 gap-3">
        <a href={tel} className="inline-flex items-center justify-center gap-2 rounded-full border border-lake/30 py-3 font-semibold text-lake-deep">
          <Phone className="size-4" aria-hidden />
          {t.call}
        </a>
        <a href={business.booking} rel="noopener" className="inline-flex items-center justify-center gap-2 rounded-full bg-ochre py-3 font-semibold text-lake-deep">
          <CalendarCheck className="size-4" aria-hidden />
          {t.book}
        </a>
      </div>
    </div>
  );
}

export function Footer({ locale }: { locale: Locale }) {
  const t = ui[locale];
  return (
    <footer id="yhteys" className="bg-lake-deep pb-24 text-white/85 md:pb-0">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
        <div>
          <p className="font-serif text-2xl text-white">{business.name}</p>
          <p className="mt-4 text-sm leading-relaxed">{address}</p>
        </div>
        <div className="space-y-2 text-sm">
          <p className="font-semibold text-white">{t.contactTitle}</p>
          <a href={tel} className="flex items-center gap-2 hover:underline">
            <Phone className="size-4" aria-hidden />
            Pentti {business.phone}
          </a>
          <a href={`tel:${business.phone2Intl}`} className="flex items-center gap-2 hover:underline">
            <Phone className="size-4" aria-hidden />
            {business.phone2Name} {business.phone2}
          </a>
          <a href={`mailto:${business.email}`} className="flex items-center gap-2 break-all hover:underline">
            <Mail className="size-4 shrink-0" aria-hidden />
            {business.email}
          </a>
        </div>
        <ul className="space-y-2 text-sm">
          {pageList.map((p) => (
            <li key={p.id}>
              <Link href={paths[p.id][locale]} className="hover:underline">
                {p.name[locale]}
              </Link>
            </li>
          ))}
          <li className="flex gap-4 pt-2">
            <a href={business.facebook} rel="noopener" className="hover:underline">Facebook</a>
            <a href={business.instagram} rel="noopener" className="hover:underline">Instagram</a>
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
