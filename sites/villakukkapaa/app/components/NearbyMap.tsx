"use client";

import { useRef } from "react";
import { Icon } from "@/app/components/Icon";
import { HUTS, km, nearby, nearbyEmbed, ui, type Locale, type Near } from "@/app/content";

/** Must match HUTS_EMBED_HIGHLIGHT_MESSAGE / HUTS_EMBED_FOCUS_MESSAGE in the huts.fi embed. */
const HIGHLIGHT = "huts-embed-highlight";
const FOCUS = "huts-embed-focus";

/** The villa plus a few hand-picked trails and places on one Huts.fi map. Hover highlights, tap focuses. */
export function NearbyMap({ locale }: { locale: Locale }) {
  const frame = useRef<HTMLIFrameElement>(null);
  const mapBox = useRef<HTMLDivElement>(null);
  const t = ui[locale];
  const send = (type: string, id: string | null) => frame.current?.contentWindow?.postMessage({ type, id }, "*");

  const onTap = (n: Near) => {
    if (window.matchMedia("(max-width: 1023px)").matches) mapBox.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    send(FOCUS, n.id);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[340px_1fr] lg:items-start">
      <div ref={mapBox} className="min-w-0 scroll-mt-24 lg:order-2">
        <iframe ref={frame} src={nearbyEmbed(locale)} title={t.mapTitle} loading="lazy" className="block h-[420px] w-full rounded-3xl border-0 bg-panel sm:h-[520px]" allowFullScreen />
        <p className="py-2 text-right text-xs text-ink/70">
          {t.mapCredit}{" "}
          <a href={HUTS} className="font-bold text-[#FF6B00]">
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
      <ul className="min-w-0 lg:order-1">
        {nearby.map((n) => (
          <li key={n.id}>
            <button
              type="button"
              onPointerEnter={(e) => e.pointerType === "mouse" && send(HIGHLIGHT, n.id)}
              onPointerLeave={(e) => e.pointerType === "mouse" && send(HIGHLIGHT, null)}
              onFocus={() => send(HIGHLIGHT, n.id)}
              onBlur={() => send(HIGHLIGHT, null)}
              onClick={() => onTap(n)}
              className="flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left transition hover:bg-white focus-visible:bg-white focus-visible:outline-none"
            >
              <span className={`flex size-9 shrink-0 items-center justify-center rounded-full ${n.kind === "route" ? "bg-lake text-white" : "bg-panel text-lake"}`}>
                <Icon name={n.icon} className="size-4" />
              </span>
              <span className="min-w-0 flex-1 truncate font-medium text-lake-deep">{n.name[locale]}</span>
              <span className="whitespace-nowrap text-sm text-ink/60">{km(n.km, locale)}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
