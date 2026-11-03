"use client";

import { Phone, Send } from "lucide-react";
import { useState } from "react";
import { business, tel, ui, units, unitList, type Locale, type UnitId } from "@/app/content";

const field =
  "w-full rounded-xl border border-ink/15 bg-white px-3 py-2.5 text-base text-ink focus:border-tar focus:outline-none focus:ring-2 focus:ring-tar/20";
const label = "mb-1 block text-sm font-semibold text-ink/70";

function open(locale: Locale, subject: string, lines: [string, string][]) {
  const t = ui[locale];
  const body = `${t.mailHello}${lines.map(([k, v]) => `${k}: ${v || "-"}`).join("\n")}\n${t.mailBye}`;
  window.location.href = `mailto:${business.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function Footer({ locale }: { locale: Locale }) {
  return (
    <>
      <button type="submit" className="col-span-2 inline-flex items-center justify-center gap-2 rounded-full bg-amber px-6 py-3 font-semibold text-white hover:bg-[#9d5a0f]">
        <Send className="size-4" aria-hidden />
        {ui[locale].send}
      </button>
      <a href={tel} className="col-span-2 inline-flex items-center justify-center gap-1.5 text-sm font-semibold text-tar hover:underline">
        <Phone className="size-4" aria-hidden />
        {business.phone}
      </a>
    </>
  );
}

/** Same questions as the owner's old quote form; opens the guest's email app with them filled in. */
export function Inquiry({ locale, unit }: { locale: Locale; unit?: UnitId }) {
  const t = ui[locale];
  const [choice, setChoice] = useState<string>(unit ?? unitList[0].id);
  const [arrive, setArrive] = useState("");
  const [leave, setLeave] = useState("");
  const [people, setPeople] = useState("2");
  const [purpose, setPurpose] = useState(t.purposes[0]);
  const id = (s: string) => `${unit ?? "all"}-${s}`;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const name = units[choice as UnitId].name[locale];
    open(locale, `${t.mailSubject}: ${name}`, [
      [t.which, name],
      [t.arrive, arrive],
      [t.leave, leave],
      [t.people, people],
      [t.purpose, purpose],
    ]);
  };

  return (
    <form onSubmit={submit}>
      <p className="font-serif text-3xl text-tar">{t.inquiryTitle}</p>
      <div className="mt-4 grid grid-cols-2 gap-3">
        {unit ? null : (
          <div className="col-span-2">
            <label htmlFor={id("unit")} className={label}>{t.which}</label>
            <select id={id("unit")} value={choice} onChange={(e) => setChoice(e.target.value)} className={field}>
              {unitList.map((u) => (
                <option key={u.id} value={u.id}>{u.name[locale]}</option>
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
        <div>
          <label htmlFor={id("people")} className={label}>{t.people}</label>
          <input id={id("people")} type="number" min={1} value={people} onChange={(e) => setPeople(e.target.value)} className={field} />
        </div>
        <div>
          <label htmlFor={id("purpose")} className={label}>{t.purpose}</label>
          <select id={id("purpose")} value={purpose} onChange={(e) => setPurpose(e.target.value)} className={field}>
            {t.purposes.map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>
        </div>
        <Footer locale={locale} />
      </div>
    </form>
  );
}

/** Hot tub version of the owner's old form: date, pick-up or delivery, and where to. */
export function TubInquiry({ locale }: { locale: Locale }) {
  const t = ui[locale];
  const [day, setDay] = useState("");
  const [pickup, setPickup] = useState(t.pickups[0]);
  const [where, setWhere] = useState("");
  const delivery = pickup === t.pickups[1];

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    open(locale, `${t.mailSubject}: ${t.nav.tub}`, [
      [t.day, day],
      [t.pickup, pickup],
      ...(delivery ? ([[t.where, where]] as [string, string][]) : []),
    ]);
  };

  return (
    <form onSubmit={submit}>
      <p className="font-serif text-3xl text-tar">{t.inquiryTitle}</p>
      <div className="mt-4 grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="tub-day" className={label}>{t.day}</label>
          <input id="tub-day" type="date" value={day} onChange={(e) => setDay(e.target.value)} className={field} />
        </div>
        <div>
          <label htmlFor="tub-pickup" className={label}>{t.pickup}</label>
          <select id="tub-pickup" value={pickup} onChange={(e) => setPickup(e.target.value)} className={field}>
            {t.pickups.map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>
        </div>
        {delivery ? (
          <div className="col-span-2">
            <label htmlFor="tub-where" className={label}>{t.where}</label>
            <input id="tub-where" value={where} onChange={(e) => setWhere(e.target.value)} className={field} />
          </div>
        ) : null}
        <Footer locale={locale} />
      </div>
    </form>
  );
}
