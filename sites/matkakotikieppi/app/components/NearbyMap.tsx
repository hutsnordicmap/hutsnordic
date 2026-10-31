"use client";

import { useRef } from "react";
import { MapEmbed } from "@/app/components/Blocks";
import { Glyph } from "@/app/components/Icon";
import { distance, nearby, nearbyEmbed, ui, type Locale, type Nearby } from "@/app/content";

/** Must match HUTS_EMBED_HIGHLIGHT_MESSAGE / HUTS_EMBED_FOCUS_MESSAGE in the huts.fi embed. */
const HIGHLIGHT = "huts-embed-highlight";
const FOCUS = "huts-embed-focus";

const copy = {
  fi: { routes: "Reitit lähellä", places: "Paikat lähellä", trail: "km reitti", hint: "Vie hiiri rivin päälle, niin kohde näkyy kartalla." },
  en: { routes: "Trails nearby", places: "Places nearby", trail: "km trail", hint: "Hover a row to see it on the map." },
};

/**
 * The guesthouse plus a short, hand-picked list of routes and places, all on one map.
 * Desktop: hovering a row highlights it on the map. Phones: the map comes first, and tapping a row
 * scrolls up to it, pans to the spot and opens its card. Nothing here links away.
 */
export function NearbyMap({ locale }: { locale: Locale }) {
  const frame = useRef<HTMLIFrameElement>(null);
  const mapBox = useRef<HTMLDivElement>(null);
  const t = copy[locale];

  const send = (type: string, id: string | null) => frame.current?.contentWindow?.postMessage({ type, id }, "*");

  const onTap = (item: Nearby) => {
    if (window.matchMedia("(max-width: 1023px)").matches) mapBox.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    send(FOCUS, item.id);
  };

  const row = (item: Nearby) => (
    <li key={item.id}>
      <button
        type="button"
        onPointerEnter={(e) => e.pointerType === "mouse" && send(HIGHLIGHT, item.id)}
        onPointerLeave={(e) => e.pointerType === "mouse" && send(HIGHLIGHT, null)}
        onFocus={() => send(HIGHLIGHT, item.id)}
        onBlur={() => send(HIGHLIGHT, null)}
        onClick={() => onTap(item)}
        className="flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left transition hover:bg-birch focus-visible:bg-birch focus-visible:outline-none"
      >
        <span className={`grid size-9 shrink-0 place-items-center rounded-full ${item.kind === "route" ? "bg-spruce text-paper" : "bg-birch text-lingon"}`}>
          <Glyph name={item.icon} className="size-4" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate font-semibold">{item.name[locale]}</span>
          <span className="block truncate text-sm text-ink/60">
            {item.length ? `${String(item.length).replace(".", locale === "fi" ? "," : ".")} ${t.trail}` : item.text[locale]}
          </span>
        </span>
        <span className="whitespace-nowrap font-display text-lg tabular-nums">{distance(item.km, locale)}</span>
      </button>
    </li>
  );

  const routes = nearby.filter((n) => n.kind === "route").sort((a, b) => a.km - b.km);
  const places = nearby.filter((n) => n.kind === "place").sort((a, b) => a.km - b.km);

  return (
    <div className="grid gap-6 lg:grid-cols-[360px_1fr] lg:items-start">
      <div ref={mapBox} className="min-w-0 scroll-mt-24 lg:order-2">
        <MapEmbed locale={locale} src={nearbyEmbed(locale)} frameRef={frame} frameClassName="h-[420px] sm:h-[540px]" />
      </div>
      <div className="min-w-0 lg:order-1">
        <p className="label px-3 text-ink/50">{t.routes}</p>
        <ul className="mt-1">{routes.map(row)}</ul>
        <p className="label mt-5 px-3 text-ink/50">{t.places}</p>
        <ul className="mt-1">{places.map(row)}</ul>
        <p className="mt-4 px-3 text-xs text-ink/50">
          <span className="hidden lg:inline">{t.hint} </span>
          {ui[locale].crow}
        </p>
      </div>
    </div>
  );
}
