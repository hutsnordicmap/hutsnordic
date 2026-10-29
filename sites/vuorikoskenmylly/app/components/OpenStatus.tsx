"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { live, paths, ui, type Locale } from "@/app/content";
import { dayRange, hoursText, openOn } from "@/app/hours";

const noop = () => () => {};
function localToday() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}

/**
 * "Open today" / "Next open" line worked out in the visitor's browser from live.openDays,
 * so it stays right without anyone rebuilding the site. Before the browser runs it, the
 * first upcoming slot from build time is shown.
 */
export function OpenStatus({ locale, tone = "dark" }: { locale: Locale; tone?: "dark" | "light" }) {
  const t = ui[locale];
  // Today's date only exists in the browser; the static HTML uses the date the content was last updated.
  const today = useSyncExternalStore(noop, localToday, () => "");
  const day = live.openDays.find((d) => d.to >= (today || live.updated)) ?? null;
  const isToday = day && today && openOn(day, today);
  const muted = tone === "dark" ? "text-flour/60" : "text-ink/60";
  return (
    <div>
      <p className={`label ${muted}`}>{isToday ? t.openToday : t.openNext}</p>
      {day ? (
        <p className="mt-2 font-display text-2xl leading-tight sm:text-3xl">
          {isToday ? hoursText(day, locale) : `${dayRange(day, locale)} ${hoursText(day, locale)}`}
          <span className={`mt-1 block font-sans text-sm ${muted}`}>{day.label[locale]}</span>
        </p>
      ) : (
        <p className="mt-2 max-w-sm text-sm leading-relaxed">{live.offSeason[locale]}</p>
      )}
      <Link href={paths.contact[locale]} className={`mt-3 inline-block text-sm font-semibold underline-offset-4 hover:underline ${tone === "dark" ? "text-rust-light" : "text-rust"}`}>
        {t.allDays} →
      </Link>
    </div>
  );
}
