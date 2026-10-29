import type { Locale, OpenDay } from "@/app/content";

const weekday = { fi: ["su", "ma", "ti", "ke", "to", "pe", "la"], en: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] };

export function dayRange(d: OpenDay, locale: Locale) {
  const a = new Date(`${d.from}T12:00:00`);
  const b = new Date(`${d.to}T12:00:00`);
  const w = weekday[locale];
  const fmt = (x: Date) => (locale === "fi" ? `${x.getDate()}.${x.getMonth() + 1}.` : `${x.getDate()}/${x.getMonth() + 1}`);
  const first = d.days ? d.days[0] : a.getDay();
  const last = d.days ? d.days[d.days.length - 1] : b.getDay();
  const days = d.from === d.to ? w[first] : `${w[first]}–${w[last]}`;
  const dates = d.from === d.to ? fmt(a) : `${fmt(a)}–${fmt(b)}`;
  return `${days} ${dates}`;
}

/** Is the place open on this date (YYYY-MM-DD)? Respects `days` on long ranges. */
export function openOn(d: OpenDay, date: string) {
  if (date < d.from || date > d.to) return false;
  return !d.days || d.days.includes(new Date(`${date}T12:00:00`).getDay());
}

export const hoursText = (d: OpenDay, locale: Locale) => `${locale === "fi" ? "klo " : ""}${d.open.replace(":00", "")}–${d.close.replace(":00", "")}`;
