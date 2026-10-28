import type { Locale, OpenDay } from "@/app/content";

const weekday = { fi: ["su", "ma", "ti", "ke", "to", "pe", "la"], en: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] };

export function dayRange(d: OpenDay, locale: Locale) {
  const a = new Date(`${d.from}T12:00:00`);
  const b = new Date(`${d.to}T12:00:00`);
  const w = weekday[locale];
  const fmt = (x: Date) => (locale === "fi" ? `${x.getDate()}.${x.getMonth() + 1}.` : `${x.getDate()}/${x.getMonth() + 1}`);
  const days = d.from === d.to ? w[a.getDay()] : `${w[a.getDay()]}–${w[b.getDay()]}`;
  const dates = d.from === d.to ? fmt(a) : `${fmt(a)}–${fmt(b)}`;
  return `${days} ${dates}`;
}

export const hoursText = (d: OpenDay, locale: Locale) => `${locale === "fi" ? "klo " : ""}${d.open.replace(":00", "")}–${d.close.replace(":00", "")}`;
