"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Images, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { ui, type Locale, type Photo } from "@/app/content";

/** Cottage photos: swipe strip on phones, rounded 1 + 4 grid on desktop, full-screen swipe viewer for both. */
export function CottageGallery({ photos, locale }: { photos: Photo[]; locale: Locale }) {
  const t = ui[locale];
  const [open, setOpen] = useState<number | null>(null);
  const [stripIndex, setStripIndex] = useState(0);
  const strip = useRef<HTMLDivElement>(null);

  const onStripScroll = () => {
    const el = strip.current;
    if (el) setStripIndex(Math.round(el.scrollLeft / el.clientWidth));
  };

  return (
    <>
      {/* Phones: full-width swipe strip */}
      <div className="relative md:hidden">
        <div
          ref={strip}
          onScroll={onStripScroll}
          className="flex snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {photos.map((p, i) => (
            <button
              key={p.lg}
              type="button"
              onClick={() => setOpen(i)}
              className="relative aspect-[4/3] w-full shrink-0 snap-center"
              aria-label={p[locale]}
            >
              <Image src={p.lg} alt={p[locale]} fill sizes="100vw" priority={i === 0} className="object-cover" />
            </button>
          ))}
        </div>
        <span className="pointer-events-none absolute bottom-3 right-3 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white">
          {stripIndex + 1} / {photos.length}
        </span>
      </div>

      {/* Desktop: one large photo and four small ones */}
      <div className="relative hidden h-[540px] grid-cols-4 grid-rows-2 gap-3 md:grid">
        {photos.slice(0, 5).map((p, i) => (
          <button
            key={p.lg}
            type="button"
            onClick={() => setOpen(i)}
            className={`group relative overflow-hidden rounded-3xl ${i === 0 ? "col-span-2 row-span-2" : ""}`}
            aria-label={p[locale]}
          >
            <Image
              src={i === 0 ? p.lg : p.sm}
              alt={p[locale]}
              fill
              priority={i === 0}
              sizes={i === 0 ? "50vw" : "25vw"}
              className="object-cover transition duration-500 group-hover:scale-[1.03]"
            />
          </button>
        ))}
        <button
          type="button"
          onClick={() => setOpen(0)}
          className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-forest shadow-md hover:bg-moss"
        >
          <Images className="size-4" aria-hidden />
          {t.cottage.gallery} ({photos.length})
        </button>
      </div>

      {open !== null ? (
        <Lightbox photos={photos} start={open} locale={locale} onClose={() => setOpen(null)} />
      ) : null}
    </>
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
    <div role="dialog" aria-modal="true" aria-label={t.cottage.gallery} className="fixed inset-0 z-50 flex flex-col bg-black text-white">
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
          <figure key={p.lg} className="relative flex h-full w-full shrink-0 snap-center flex-col">
            <div className="relative flex-1">
              <Image src={p.lg} alt={p[locale]} fill sizes="100vw" className="object-contain" />
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
