"use client";

import { useRef } from "react";
import { Icon } from "@/app/components/Icon";
import { MapEmbed } from "@/app/components/Blocks";
import { nearby, nearbyEmbed, type Locale, type NearbyItem } from "@/app/content";

/** Must match HUTS_EMBED_HIGHLIGHT_MESSAGE / HUTS_EMBED_FOCUS_MESSAGE in the huts.fi embed. */
const HIGHLIGHT = "huts-embed-highlight";
const FOCUS = "huts-embed-focus";

const copy = {
  fi: { routes: "Reitit lähellä", places: "Paikat lähellä", away: "km", trail: "km reitti", hint: "Vie hiiri rivin päälle, niin kohde näkyy kartalla." },
  en: { routes: "Trails nearby", places: "Places nearby", away: "km away", trail: "km trail", hint: "Hover a row to see it on the map." },
};

/**
 * The cottages plus a short, hand-picked list of trails and places, all on one map.
 * Desktop: hovering a row highlights it on the map (like the huts.fi list). Phones: tapping a row
 * scrolls the map into view, pans to the spot and opens its card. Nothing here links away.
 */
export function NearbyMap({ locale, title }: { locale: Locale; title: string }) {
  const frame = useRef<HTMLIFrameElement>(null);
  const mapBox = useRef<HTMLDivElement>(null);
  const t = copy[locale];

  const send = (type: string, id: string | null) => frame.current?.contentWindow?.postMessage({ type, id }, "*");

  const onTap = (item: NearbyItem) => {
    if (window.matchMedia("(max-width: 1023px)").matches) {
      mapBox.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    send(FOCUS, item.id);
  };

  const row = (item: NearbyItem) => (
    <li key={item.id}>
      <button
        type="button"
        onPointerEnter={(e) => e.pointerType === "mouse" && send(HIGHLIGHT, item.id)}
        onPointerLeave={(e) => e.pointerType === "mouse" && send(HIGHLIGHT, null)}
        onFocus={() => send(HIGHLIGHT, item.id)}
        onBlur={() => send(HIGHLIGHT, null)}
        onClick={() => onTap(item)}
        className="flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left transition hover:bg-white focus-visible:bg-white focus-visible:outline-none"
      >
        <span className={`flex size-9 shrink-0 items-center justify-center rounded-full ${item.kind === "route" ? "bg-forest text-white" : "bg-moss text-forest"}`}>
          <Icon name={item.icon} className="size-4" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate font-semibold text-forest">{item.name[locale]}</span>
          <span className="block truncate text-sm text-ink/60">
            {item.length ? `${String(item.length).replace(".", locale === "fi" ? "," : ".")} ${t.trail}` : item.what[locale]}
          </span>
        </span>
        <span className="whitespace-nowrap text-sm text-ink/60">
          {String(item.km).replace(".", locale === "fi" ? "," : ".")} {t.away}
        </span>
      </button>
    </li>
  );

  const routes = nearby.filter((n) => n.kind === "route").sort((a, b) => a.km - b.km);
  const places = nearby.filter((n) => n.kind === "place").sort((a, b) => a.km - b.km);

  return (
    <div className="grid gap-6 lg:grid-cols-[340px_1fr] lg:items-start">
      <div ref={mapBox} className="min-w-0 scroll-mt-24 lg:order-2">
        <MapEmbed locale={locale} src={nearbyEmbed(locale)} title={title} frameRef={frame} frameClassName="h-[420px] sm:h-[520px]" />
      </div>
      <div className="min-w-0 lg:order-1">
        <p className="label px-3 text-ink/50">{t.routes}</p>
        <ul className="mt-1">{routes.map(row)}</ul>
        <p className="label mt-5 px-3 text-ink/50">{t.places}</p>
        <ul className="mt-1">{places.map(row)}</ul>
        <p className="mt-4 hidden px-3 text-xs text-ink/50 lg:block">{t.hint}</p>
      </div>
    </div>
  );
}
