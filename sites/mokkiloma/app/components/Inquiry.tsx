"use client";

import { Phone, Send } from "lucide-react";
import { useState } from "react";
import { business, cottageList, cottages, tel, ui, type CottageId, type Locale } from "@/app/content";

/**
 * Booking enquiry without a booking engine: opens the guest's email app with the
 * dates already written, addressed to the owner. Swap for a real calendar later.
 */
export function Inquiry({ locale, cottage, compact = false }: { locale: Locale; cottage?: CottageId; compact?: boolean }) {
  const t = ui[locale];
  const [choice, setChoice] = useState<string>(cottage ?? "any");
  const [arrive, setArrive] = useState("");
  const [leave, setLeave] = useState("");
  const [guests, setGuests] = useState("2");
  const max = cottage ? cottages[cottage].guests : 12;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const name = cottageList.find((c) => c.id === choice)?.name ?? t.any;
    const subject = `${t.mailSubject}: ${name}${arrive ? ` ${arrive}` : ""}`;
    const body = t.mailBody(name, arrive || "-", leave || "-", guests);
    window.location.href = `mailto:${business.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const field = "w-full rounded-xl border border-ink/15 bg-white px-3 py-2.5 text-base text-ink focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/20";
  const label = "mb-1 block text-xs font-semibold uppercase tracking-wider text-ink/60";
  const id = (s: string) => `${cottage ?? "all"}-${s}`;

  return (
    <form onSubmit={submit} className="text-ink">
      <p className="font-serif text-2xl font-semibold text-forest">{t.inquiryTitle}</p>
      <div className={`mt-4 grid gap-3 ${compact ? "grid-cols-2" : "grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_0.7fr_auto] lg:items-end"}`}>
        {cottage ? null : (
          <div className="col-span-2 lg:col-span-1">
            <label htmlFor={id("cottage")} className={label}>{t.which}</label>
            <select id={id("cottage")} value={choice} onChange={(e) => setChoice(e.target.value)} className={field}>
              <option value="any">{t.any}</option>
              {cottageList.map((c) => (
                <option key={c.id} value={c.id}>{c.name} ({c.guests})</option>
              ))}
            </select>
          </div>
        )}
        <div>
          <label htmlFor={id("arrive")} className={label}>{t.arrive}</label>
          <input id={id("arrive")} type="date" value={arrive} onChange={(e) => setArrive(e.target.value)} className={field} />
        </div>
        <div>
          <label htmlFor={id("leave")} className={label}>{t.leave}</label>
          <input id={id("leave")} type="date" value={leave} min={arrive || undefined} onChange={(e) => setLeave(e.target.value)} className={field} />
        </div>
        <div className={compact ? "col-span-2" : "col-span-2 lg:col-span-1"}>
          <label htmlFor={id("guests")} className={label}>{t.guests}</label>
          <select id={id("guests")} value={guests} onChange={(e) => setGuests(e.target.value)} className={field}>
            {Array.from({ length: max }, (_, i) => `${i + 1}`).map((n) => (
              <option key={n}>{n}</option>
            ))}
          </select>
        </div>
        <button type="submit" className={`col-span-2 inline-flex items-center justify-center gap-2 rounded-full bg-copper px-6 py-3 font-semibold text-white hover:bg-[#9a5330] ${compact ? "" : "lg:col-span-1"}`}>
          <Send className="size-4" aria-hidden />
          {t.send}
        </button>
      </div>
      <p className="mt-3 text-xs text-ink/60">{t.inquiryNote}</p>
      <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm">
        {business.phones.map((p, i) => (
          <a key={p} href={tel(i)} className="inline-flex items-center gap-1.5 font-semibold text-forest hover:underline">
            <Phone className="size-4" aria-hidden />
            {p}
          </a>
        ))}
      </p>
    </form>
  );
}
