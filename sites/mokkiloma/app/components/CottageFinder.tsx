"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, Users } from "lucide-react";
import { useRef, useState } from "react";
import { cottageList, cottagePath, euro, lowestWeek, ui, type Cottage, type Locale } from "@/app/content";

const groups = [
  { label: "2–5", min: 1 },
  { label: "6", min: 6 },
  { label: "7–8", min: 7 },
  { label: "9–12", min: 9 },
];

/** Card list with a group-size filter, like arctichomes.rentals: photo swipe, "from" price, who it suits. */
export function CottageFinder({ locale }: { locale: Locale }) {
  const t = ui[locale];
  const [min, setMin] = useState(0);
  const shown = cottageList.filter((c) => c.guests >= min);
  const chip = (active: boolean) =>
    `rounded-full px-4 py-2 text-sm font-semibold transition ${active ? "bg-forest text-white" : "bg-white text-forest hover:bg-moss"}`;

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        <span className="mr-1 text-sm font-semibold text-ink/70">{t.howMany}</span>
        <button type="button" onClick={() => setMin(0)} className={chip(min === 0)} aria-pressed={min === 0}>
          {t.all}
        </button>
        {groups.map((g) => (
          <button key={g.label} type="button" onClick={() => setMin(g.min)} className={chip(min === g.min)} aria-pressed={min === g.min}>
            <Users className="-mt-0.5 mr-1 inline size-4" aria-hidden />
            {g.label}
          </button>
        ))}
      </div>
      {shown.length === 0 ? <p className="mt-8 text-ink/70">{t.none}</p> : null}
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((c) => (
          <CottageCard key={c.id} cottage={c} locale={locale} />
        ))}
      </div>
    </div>
  );
}

export function CottageCard({ cottage: c, locale }: { cottage: Cottage; locale: Locale }) {
  const t = ui[locale];
  const strip = useRef<HTMLDivElement>(null);
  const [i, setI] = useState(0);
  const photos = c.photos.slice(0, 5);
  const href = cottagePath(c, locale);

  return (
    <article className="flex flex-col overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-ink/5">
      <div className="relative">
        <div
          ref={strip}
          onScroll={(e) => setI(Math.round(e.currentTarget.scrollLeft / e.currentTarget.clientWidth))}
          className="no-scrollbar flex aspect-[4/3] snap-x snap-mandatory overflow-x-auto"
        >
          {photos.map((p, n) => (
            <Link key={p.sm} href={href} className="relative h-full w-full shrink-0 snap-center" tabIndex={n === 0 ? 0 : -1}>
              <Image src={p.sm} alt={p[locale]} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />
            </Link>
          ))}
        </div>
        <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs text-ink/70 shadow">
          {t.from} <strong className="text-sm text-forest">{euro(lowestWeek(c), locale)}</strong> {t.perWeek}
        </span>
        <span className="pointer-events-none absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-forest/90 px-3 py-1 text-xs font-semibold text-white">
          <Users className="size-3.5" aria-hidden />
          {c.guests}
        </span>
        <div className="pointer-events-none absolute inset-x-0 bottom-3 flex justify-center gap-1.5">
          {photos.map((p, n) => (
            <span key={p.sm} className={`size-1.5 rounded-full ${n === i ? "bg-white" : "bg-white/50"}`} />
          ))}
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-serif text-3xl font-semibold leading-tight text-forest">
          <Link href={href} className="hover:underline">
            {c.name}
          </Link>
        </h3>
        <p className="mt-1 text-ink/80">{c.tagline[locale]}</p>
        <p className="mt-3 text-sm text-ink/60">
          <strong className="font-semibold text-ink/75">{t.cottage.bestFor}:</strong> {c.bestFor[locale].charAt(0).toLowerCase() + c.bestFor[locale].slice(1)}
        </p>
        <p className="mt-1 flex items-start gap-1.5 text-sm text-ink/60">
          <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden />
          {c.where[locale]}
        </p>
        <div className="mt-auto flex items-center justify-between gap-3 pt-5">
          <span className="whitespace-nowrap text-sm text-ink/60">
            {t.weekend} {euro(c.weekend, locale)}
          </span>
          <Link href={href} className="whitespace-nowrap rounded-full bg-forest px-5 py-2.5 text-sm font-semibold text-white hover:bg-forest-deep">
            {t.see} →
          </Link>
        </div>
      </div>
    </article>
  );
}
