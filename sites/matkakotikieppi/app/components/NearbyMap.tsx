"use client";

import { useRef } from "react";
import { MapEmbed } from "@/app/components/Blocks";
import { Glyph } from "@/app/components/Icon";
import { distance, nearby, nearbyEmbed, type Locale, type Nearby } from "@/app/content";

/** Must match HUTS_EMBED_HIGHLIGHT_MESSAGE / HUTS_EMBED_FOCUS_MESSAGE in the huts.fi embed. */
const HIGHLIGHT = "huts-embed-highlight";
const FOCUS = "huts-embed-focus";

const sorted = [...nearby].sort((a, b) => a.km - b.km);

/**
 * The guesthouse and a hand-picked list of trails and places on one map. Hover (or keyboard focus) on a row
 * highlights it on the map; a tap pans there and, on phones, scrolls up to the map. Nothing here links away.
 */
export function NearbyMap({ locale }: { locale: Locale }) {
  const frame = useRef<HTMLIFrameElement>(null);
  const mapBox = useRef<HTMLDivElement>(null);

  const send = (type: string, id: string | null) => frame.current?.contentWindow?.postMessage({ type, id }, "*");

  const onTap = (item: Nearby) => {
    if (window.matchMedia("(max-width: 1023px)").matches) mapBox.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    send(FOCUS, item.id);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[340px_1fr] lg:items-start">
      <div ref={mapBox} className="min-w-0 scroll-mt-24 lg:order-2">
        <MapEmbed locale={locale} src={nearbyEmbed(locale)} frameRef={frame} frameClassName="h-[420px] sm:h-[540px]" />
      </div>
      <ul className="min-w-0 lg:order-1">
        {sorted.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              onPointerEnter={(e) => e.pointerType === "mouse" && send(HIGHLIGHT, item.id)}
              onPointerLeave={(e) => e.pointerType === "mouse" && send(HIGHLIGHT, null)}
              onFocus={() => send(HIGHLIGHT, item.id)}
              onBlur={() => send(HIGHLIGHT, null)}
              onClick={() => onTap(item)}
              className="flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left transition hover:bg-birch focus-visible:bg-birch focus-visible:outline-none"
            >
              <span className={`grid size-9 shrink-0 place-items-center rounded-full ${item.kind === "route" ? "bg-spruce text-paper" : "bg-birch text-lingon"}`}>
                <Glyph name={item.icon} className="size-4" />
              </span>
              <span className="min-w-0 flex-1 truncate font-semibold">{item.name[locale]}</span>
              <span className="whitespace-nowrap font-display text-lg tabular-nums">{distance(item.km, locale)}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
