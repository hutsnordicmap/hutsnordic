import Link from "next/link";
import { Menu, MessageCircle, Navigation, Phone } from "lucide-react";
import { asset, business, HUTS, live, navOrder, paths, route, tel, ui, type Locale } from "@/app/content";

/** The one line Antti changes most: shown above the header on every page. */
export function NoticeBar({ locale }: { locale: Locale }) {
  const text = live.notice[locale];
  if (!text) return null;
  return (
    <Link href={paths.contact[locale]} className="block bg-rust px-4 py-2 text-center text-xs font-semibold tracking-wide text-white hover:bg-[#a04824] sm:text-sm">
      {text} →
    </Link>
  );
}

function Logo({ className = "" }: { className?: string }) {
  // The owner's own round VKM logo, drawn white on the black header.
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={asset("/vkm-logo.png")} alt="Vuorikosken Mylly, Lohja, 1893" width={240} height={240} className={`invert ${className}`} />;
}

export function Header({ locale, otherHref }: { locale: Locale; otherHref: string }) {
  const t = ui[locale];
  const links = [...navOrder.map((id) => ({ href: paths[id][locale], label: t.nav[id] })), { href: paths.contact[locale], label: t.nav.contact }];
  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-coal/95 text-flour backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2.5 sm:px-6">
        <Link href={paths.home[locale]} className="flex items-center gap-3" aria-label={business.name}>
          <Logo className="size-12 sm:size-14" />
          <span className="hidden font-display text-lg tracking-wide sm:inline">Vuorikosken Mylly</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm lg:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-flour/80 hover:text-white">
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3 text-sm">
          <Link href={otherHref} hrefLang={locale === "fi" ? "en" : "fi"} className="label text-flour/70 hover:text-white">
            {locale === "fi" ? "EN" : "FI"}
          </Link>
          <a href={tel(business.phone)} className="hidden items-center gap-2 border border-flour/40 px-4 py-2 font-semibold hover:bg-flour hover:text-coal md:inline-flex">
            <Phone className="size-4" aria-hidden />
            {business.phoneLocal}
          </a>
          <details className="group relative lg:hidden">
            <summary className="flex cursor-pointer list-none items-center gap-2 p-2 [&::-webkit-details-marker]:hidden" aria-label="Menu">
              <Menu className="size-6" aria-hidden />
            </summary>
            <div className="absolute right-0 top-full mt-3 w-64 border border-white/10 bg-coal p-2 shadow-2xl">
              {links.map((l) => (
                <Link key={l.href} href={l.href} className="block px-4 py-3 font-display text-lg text-flour hover:bg-white/5">
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

/** Phones only: call, WhatsApp and directions one thumb away. */
export function StickyBar({ locale }: { locale: Locale }) {
  const t = ui[locale];
  const btn = "inline-flex flex-col items-center justify-center gap-1 py-2.5 text-xs font-semibold";
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-white/10 bg-coal text-flour pb-[env(safe-area-inset-bottom)] md:hidden">
      <a href={tel(business.phone)} className={btn}>
        <Phone className="size-5" aria-hidden />
        {t.call}
      </a>
      <a href={business.whatsapp} rel="noopener" className={`${btn} border-x border-white/10`}>
        <MessageCircle className="size-5" aria-hidden />
        {t.whatsapp}
      </a>
      <a href={route} rel="noopener" className={`${btn} bg-rust text-white`}>
        <Navigation className="size-5" aria-hidden />
        {t.route}
      </a>
    </div>
  );
}

export function Footer({ locale }: { locale: Locale }) {
  const t = ui[locale];
  return (
    <footer className="bg-coal pb-24 text-flour/75 md:pb-0">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo className="size-24" />
          <p className="mt-4 text-sm leading-relaxed">
            {business.name}
            <br />
            {business.street}, {business.postalCode} {business.village}
            <br />
            {business.municipality}, {business.region[locale]}
            <br />
            {locale === "fi" ? "Y-tunnus" : "Business ID"} {business.businessId}
          </p>
        </div>
        <nav className="text-sm">
          <p className="label text-flour/50">{business.short}</p>
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
          <p className="label text-flour/50">{t.contactTitle}</p>
          <ul className="mt-4 space-y-2">
            <li><a href={tel(business.phone)} className="hover:text-white">{business.phoneLocal}</a></li>
            <li><a href={business.whatsapp} rel="noopener" className="hover:text-white">WhatsApp</a></li>
            <li><a href={`mailto:${business.email}`} className="break-all hover:text-white">{business.email}</a></li>
            <li><a href={business.facebook} rel="noopener" className="hover:text-white">Facebook</a></li>
            <li><a href={business.instagram} rel="noopener" className="hover:text-white">Instagram</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-7xl px-4 py-4 text-xs text-flour/45 sm:px-6">
          {t.madeBy} <a href={HUTS} className="hover:underline">Huts.fi</a>
        </p>
      </div>
    </footer>
  );
}
