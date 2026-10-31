"use client";

import { Phone, Send } from "lucide-react";
import { useState } from "react";
import { business, enquiry, rooms, tel, type Locale } from "@/app/content";

/**
 * Room enquiry without a booking engine: opens the guest's email app with the
 * dates already written, addressed to the owner. Swap for a real calendar later.
 */
export function Inquiry({ locale, tone = "light" }: { locale: Locale; tone?: "light" | "dark" }) {
  const t = enquiry[locale];
  const [room, setRoom] = useState("any");
  const [arrive, setArrive] = useState("");
  const [leave, setLeave] = useState("");
  const [guests, setGuests] = useState("1");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const name = rooms.find((r) => r.id === room)?.name[locale] ?? t.any;
    const subject = `${t.subject}${arrive ? ` ${arrive}` : ""}`;
    window.location.href = `mailto:${business.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(t.body(name, arrive || "-", leave || "-", guests))}`;
  };

  const dark = tone === "dark";
  const field = "w-full rounded-xl border border-ink/15 bg-white px-3 py-2.5 text-base text-ink focus:border-lingon focus:outline-none focus:ring-2 focus:ring-lingon/20";
  const label = `mb-1 block text-xs font-semibold uppercase tracking-wider ${dark ? "text-paper/60" : "text-ink/60"}`;

  return (
    <form onSubmit={submit}>
      <p className={`font-display text-2xl ${dark ? "text-paper" : "text-ink"}`}>{t.title}</p>
      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="col-span-2">
          <label htmlFor={`${tone}-room`} className={label}>{t.room}</label>
          <select id={`${tone}-room`} value={room} onChange={(e) => setRoom(e.target.value)} className={field}>
            <option value="any">{t.any}</option>
            {rooms.map((r) => (
              <option key={r.id} value={r.id}>{r.name[locale]}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor={`${tone}-arrive`} className={label}>{t.arrive}</label>
          <input id={`${tone}-arrive`} type="date" value={arrive} onChange={(e) => setArrive(e.target.value)} className={field} />
        </div>
        <div>
          <label htmlFor={`${tone}-leave`} className={label}>{t.leave}</label>
          <input id={`${tone}-leave`} type="date" value={leave} min={arrive || undefined} onChange={(e) => setLeave(e.target.value)} className={field} />
        </div>
        <div className="col-span-2">
          <label htmlFor={`${tone}-guests`} className={label}>{t.guests}</label>
          <select id={`${tone}-guests`} value={guests} onChange={(e) => setGuests(e.target.value)} className={field}>
            {["1", "2", "3", "4", "5", "6", "7", "8", "9", "10+"].map((n) => (
              <option key={n}>{n}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="col-span-2 inline-flex items-center justify-center gap-2 rounded-full bg-lingon px-5 py-3.5 font-semibold text-white hover:bg-lingon-dark">
          <Send className="size-4" aria-hidden />
          {t.send}
        </button>
      </div>
      <p className={`mt-3 text-xs ${dark ? "text-paper/60" : "text-ink/60"}`}>{t.note}</p>
      <a href={tel(business.phone)} className={`mt-2 inline-flex items-center gap-1.5 text-sm font-semibold hover:underline ${dark ? "text-lingon-light" : "text-lingon"}`}>
        <Phone className="size-4" aria-hidden />
        {business.phoneLocal}
      </a>
    </form>
  );
}
