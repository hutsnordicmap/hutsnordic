import Link from "next/link";
import { Mail, Menu, Navigation, Phone } from "lucide-react";
import { business, HUTS, live, navOrder, paths, route, tel, ui, type Locale } from "@/app/content";

/** The owner's sign logo (a framed plate with "Matkakoti Kieppi" in Courgette), redrawn so it stays sharp. */
export function SignLogo({ className = "", tone = "dark" }: { className?: string; tone?: "dark" | "light" }) {
  const color = tone === "dark" ? "#1c2420" : "#f7f2e9";
  return (
    <svg viewBox="0 0 325 141" className={className} role="img" aria-label={business.name}>
      <path
        d="M307.9 138.5H17a15 15 0 0 0-15-15V17A15 15 0 0 0 17 2h290.9a15 15 0 0 0 15 15v106.5a15 15 0 0 0-15 15Z"
        fill="none"
        stroke={color}
        strokeWidth="4"
      />
      <text x="162.5" y="62" textAnchor="middle" fill={color} fontSize="58" style={{ fontFamily: "var(--font-courgette)" }}>
        Matkakoti
      </text>
      <text x="162.5" y="120" textAnchor="middle" fill={color} fontSize="58" style={{ fontFamily: "var(--font-courgette)" }}>
        Kieppi
      </text>
    </svg>
  );
}

export function NoticeBar({ locale }: { locale: Locale }) {
  const text = live.notice[locale];
  if (!text) return null;
  return (
    <Link href={paths.tyo[locale]} className="block bg-spruce px-4 py-2 text-center text-xs font-semibold tracking-wide text-paper hover:bg-spruce-soft sm:text-sm">
      {text} →
    </Link>
  );
}

export function Header({ locale, otherHref }: { locale: Locale; otherHref: string }) {
  const t = ui[locale];
  const links = [...navOrder.map((id) => ({ href: paths[id][locale], label: t.nav[id] })), { href: paths.contact[locale], label: t.nav.contact }];
  return (
    <header className="sticky top-0 z-30 border-b border-ink/10 bg-paper/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2.5 sm:px-6">
        <Link href={paths.home[locale]} aria-label={business.name}>
          <SignLogo className="h-11 w-auto sm:h-12" />
        </Link>
        <nav className="hidden items-center gap-7 text-[15px] font-medium lg:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-ink/75 hover:text-lingon">
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2 text-sm sm:gap-3">
          <Link href={otherHref} hrefLang={locale === "fi" ? "en" : "fi"} className="label px-2 text-ink/60 hover:text-lingon">
            {locale === "fi" ? "EN" : "FI"}
          </Link>
          <a href={tel(business.phone)} className="hidden items-center gap-2 rounded-full bg-lingon px-5 py-2.5 font-semibold text-white hover:bg-lingon-dark md:inline-flex">
            <Phone className="size-4" aria-hidden />
            {business.phoneLocal}
          </a>
          <details className="group relative lg:hidden">
            <summary className="flex cursor-pointer list-none items-center gap-2 rounded-full p-2 hover:bg-birch [&::-webkit-details-marker]:hidden" aria-label="Menu">
              <Menu className="size-6" aria-hidden />
            </summary>
            <div className="absolute right-0 top-full mt-3 w-64 rounded-2xl border border-ink/10 bg-paper p-2 shadow-2xl">
              {links.map((l) => (
                <Link key={l.href} href={l.href} className="block rounded-xl px-4 py-3 font-display text-lg hover:bg-birch">
                  {l.label}
                </Link>
              ))}
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}

/** Phones only: call, email and directions one thumb away. */
export function StickyBar({ locale }: { locale: Locale }) {
  const t = ui[locale];
  const btn = "inline-flex flex-col items-center justify-center gap-1 py-2.5 text-xs font-semibold";
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-ink/10 bg-paper pb-[env(safe-area-inset-bottom)] text-ink md:hidden">
      <a href={tel(business.phone)} className={`${btn} bg-lingon text-white`}>
        <Phone className="size-5" aria-hidden />
        {t.call}
      </a>
      <a href={`mailto:${business.email}`} className={`${btn} border-r border-ink/10`}>
        <Mail className="size-5" aria-hidden />
        {t.email}
      </a>
      <a href={route} rel="noopener" className={btn}>
        <Navigation className="size-5" aria-hidden />
        {t.route}
      </a>
    </div>
  );
}

export function Footer({ locale }: { locale: Locale }) {
  const t = ui[locale];
  return (
    <footer className="bg-spruce pb-24 text-paper/75 md:pb-0">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <SignLogo tone="light" className="h-20 w-auto" />
          <p className="mt-5 text-sm leading-relaxed">
            {business.street}, {business.postalCode} {business.town}
            <br />
            {business.region[locale]}
          </p>
        </div>
        <nav className="text-sm">
          <p className="label text-paper/50">{business.name}</p>
          <ul className="mt-4 space-y-2">
            {navOrder.map((id) => (
              <li key={id}>
                <Link href={paths[id][locale]} className="hover:text-white">{t.nav[id]}</Link>
              </li>
            ))}
            <li><Link href={paths.contact[locale]} className="hover:text-white">{t.nav.contact}</Link></li>
          </ul>
        </nav>
        <div className="text-sm">
          <p className="label text-paper/50">{t.contactTitle}</p>
          <ul className="mt-4 space-y-2">
            <li><a href={tel(business.phone)} className="hover:text-white">{business.phoneLocal}</a></li>
            <li><a href={`mailto:${business.email}`} className="break-all hover:text-white">{business.email}</a></li>
            <li><a href={business.facebook} rel="noopener" className="hover:text-white">Facebook</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-7xl px-4 py-4 text-xs text-paper/45 sm:px-6">
          {t.madeBy} <a href={HUTS} className="hover:underline">Huts.fi</a>
        </p>
      </div>
    </footer>
  );
}
