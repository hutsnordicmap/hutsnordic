"use client";

import Link from "next/link";
import { useRef } from "react";
import { Icon } from "@/app/components/Icon";
import { HUTS, km, mapEmbed, nearby, nearbyPath, ui, type Locale } from "@/app/content";

/** Must match HUTS_EMBED_HIGHLIGHT_MESSAGE in the huts.fi embed. */
const HIGHLIGHT = "huts-embed-highlight";

/**
 * The huts.fi map with both cabins and the hand-picked places and trails. Every row is a real link to this
 * site's own page about that place, and hovering a row lights it up on the map. Clicking a pin on the map
 * opens the same page (huts.fi embed `?links=`), so visitors stay on this site.
 */
export function NearbyMap({ locale, title }: { locale: Locale; title: string }) {
  const frame = useRef<HTMLIFrameElement>(null);
  const t = ui[locale];
  const send = (id: string | null) => frame.current?.contentWindow?.postMessage({ type: HIGHLIGHT, id }, "*");

  const group = (kind: "route" | "place") =>
    nearby
      .filter((n) => n.kind === kind)
      .sort((a, b) => a.km - b.km)
      .map((n) => (
        <li key={n.id}>
          <Link
            href={nearbyPath(n, locale)}
            onPointerEnter={(e) => e.pointerType === "mouse" && send(n.id)}
            onPointerLeave={(e) => e.pointerType === "mouse" && send(null)}
            onFocus={() => send(n.id)}
            onBlur={() => send(null)}
            className="flex items-center gap-3 rounded-2xl px-3 py-2.5 transition hover:bg-white focus-visible:bg-white focus-visible:outline-none"
          >
            <span className={`flex size-9 shrink-0 items-center justify-center rounded-full ${kind === "route" ? "bg-night text-white" : "bg-panel text-night"}`}>
              <Icon name={n.icon} className="size-4" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate font-semibold text-night">{n.name[locale]}</span>
              <span className="block truncate text-sm text-ink/60">{n.lengthKm ? km(n.lengthKm, locale) : n.what[locale]}</span>
            </span>
            <span className="whitespace-nowrap text-sm text-ink/60">{km(n.km, locale)}</span>
          </Link>
        </li>
      ));

  return (
    <div className="grid gap-6 lg:grid-cols-[340px_1fr] lg:items-start">
      <div className="min-w-0 lg:order-2">
        <MapFrame locale={locale} title={title} src={mapEmbed(locale)} frameRef={frame} />
      </div>
      <div className="min-w-0 lg:order-1">
        <p className="px-3 text-sm font-semibold text-ink/50">{t.trails}</p>
        <ul className="mt-1">{group("route")}</ul>
        <p className="mt-5 px-3 text-sm font-semibold text-ink/50">{t.places}</p>
        <ul className="mt-1">{group("place")}</ul>
      </div>
    </div>
  );
}

/** One Huts.fi link per map, outside the iframe, with the NLS credit the map tiles' licence asks for. */
export function MapFrame({
  locale,
  title,
  src,
  frameRef,
  hutsHref = HUTS,
}: {
  locale: Locale;
  title: string;
  src: string;
  frameRef?: React.Ref<HTMLIFrameElement>;
  hutsHref?: string;
}) {
  return (
    <div>
      <iframe ref={frameRef} src={src} title={title} loading="lazy" className="block h-[420px] w-full rounded-3xl border-0 bg-panel sm:h-[520px]" allowFullScreen />
      <p className="py-2 text-right text-xs text-ink/70">
        {ui[locale].mapCredit}{" "}
        <a href={hutsHref} className="font-bold text-[#FF6B00]">
          Huts.fi
        </a>
        <span className="text-ink/50">
          {" · "}
          <a href={locale === "fi" ? "https://www.maanmittauslaitos.fi" : "https://www.maanmittauslaitos.fi/en"} rel="nofollow noopener" className="hover:underline">
            © {locale === "fi" ? "Maanmittauslaitos" : "NLS Finland"}
          </a>
        </span>
      </p>
    </div>
  );
}
