"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { ui, type Locale, type Photo } from "@/app/content";

/** Portrait photo strip (most of the mill's photos are tall): swipe or scroll, tap for the full-screen viewer. */
export function PhotoStrip({ photos, locale }: { photos: Photo[]; locale: Locale }) {
  const t = ui[locale];
  const [open, setOpen] = useState<number | null>(null);
  const strip = useRef<HTMLDivElement>(null);
  const nudge = (dir: number) => strip.current?.scrollBy({ left: dir * strip.current.clientWidth * 0.8, behavior: "smooth" });

  return (
    <div className="relative">
      <div
        ref={strip}
        className="flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:px-6 [&::-webkit-scrollbar]:hidden"
      >
        {photos.map((p, i) => (
          <button
            key={p.src}
            type="button"
            onClick={() => setOpen(i)}
            className="group relative aspect-[3/4] w-[72%] shrink-0 snap-start overflow-hidden bg-coal-soft sm:w-[300px]"
            aria-label={p[locale]}
          >
            <Image src={p.src} alt={p[locale]} fill sizes="(min-width: 640px) 300px, 72vw" className="object-cover transition duration-700 group-hover:scale-[1.04]" />
            <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-3 pt-8 pb-3 text-left text-xs text-white/90">
              {p[locale]}
            </span>
          </button>
        ))}
      </div>
      <div className="mt-4 hidden justify-end gap-2 px-6 md:flex">
        <button type="button" onClick={() => nudge(-1)} aria-label={t.prev} className="rounded-full border border-current/30 p-2.5 hover:bg-current/10">
          <ChevronLeft className="size-5" aria-hidden />
        </button>
        <button type="button" onClick={() => nudge(1)} aria-label={t.next} className="rounded-full border border-current/30 p-2.5 hover:bg-current/10">
          <ChevronRight className="size-5" aria-hidden />
        </button>
      </div>
      {open !== null ? <Lightbox photos={photos} start={open} locale={locale} onClose={() => setOpen(null)} /> : null}
    </div>
  );
}

function Lightbox({
  photos,
  start,
  locale,
  onClose,
}: {
  photos: Photo[];
  start: number;
  locale: Locale;
  onClose: () => void;
}) {
  const t = ui[locale];
  const track = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(start);

  const go = useCallback((i: number) => {
    const el = track.current;
    if (!el) return;
    const next = Math.max(0, Math.min(photos.length - 1, i));
    el.scrollTo({ left: next * el.clientWidth, behavior: "smooth" });
  }, [photos.length]);

  useEffect(() => {
    const el = track.current;
    if (el) el.scrollLeft = start * el.clientWidth;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [start]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(index + 1);
      if (e.key === "ArrowLeft") go(index - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, index, onClose]);

  return (
    <div role="dialog" aria-modal="true" aria-label={t.gallery} className="fixed inset-0 z-50 flex flex-col bg-black text-white">
      <div className="flex items-center justify-between px-4 py-3 text-sm">
        <span className="tabular-nums">
          {index + 1} / {photos.length}
        </span>
        <button type="button" onClick={onClose} className="rounded-full p-2 hover:bg-white/10" aria-label={t.close}>
          <X className="size-6" aria-hidden />
        </button>
      </div>
      <div
        ref={track}
        onScroll={(e) => setIndex(Math.round(e.currentTarget.scrollLeft / e.currentTarget.clientWidth))}
        className="flex flex-1 snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {photos.map((p) => (
          <figure key={p.src} className="relative flex h-full w-full shrink-0 snap-center flex-col">
            <div className="relative flex-1">
              <Image src={p.src} alt={p[locale]} fill sizes="100vw" className="object-contain" />
            </div>
            <figcaption className="px-4 py-4 text-center text-sm text-white/80">{p[locale]}</figcaption>
          </figure>
        ))}
      </div>
      <button
        type="button"
        onClick={() => go(index - 1)}
        disabled={index === 0}
        aria-label={t.prev}
        className="absolute left-3 top-1/2 hidden -translate-y-1/2 rounded-full bg-white/15 p-3 hover:bg-white/25 disabled:opacity-30 md:block"
      >
        <ChevronLeft className="size-6" aria-hidden />
      </button>
      <button
        type="button"
        onClick={() => go(index + 1)}
        disabled={index === photos.length - 1}
        aria-label={t.next}
        className="absolute right-3 top-1/2 hidden -translate-y-1/2 rounded-full bg-white/15 p-3 hover:bg-white/25 disabled:opacity-30 md:block"
      >
        <ChevronRight className="size-6" aria-hidden />
      </button>
    </div>
  );
}
