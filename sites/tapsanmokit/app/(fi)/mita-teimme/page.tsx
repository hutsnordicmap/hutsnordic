import { notFound } from "next/navigation";
import { Check, Search } from "lucide-react";
import { Header } from "@/app/components/Chrome";
import { isPreview, paths, SITE_URL, ui, unitList, unitMeta, unitPath } from "@/app/content";

// A walkthrough for the owner, shown only in the preview build. It is not part of the live site.
export const metadata = { title: { absolute: "Mitä teimme Googlea varten – Tapsan Mökit" } };

const searches = [
  { q: "mökki Jyväskylä / vuokramökki Jyväskylä", page: "Etusivu ja mökin sivu" },
  { q: "mökki Uurainen / huvila järven rannalla Keski-Suomi", page: "Huvilan sivu" },
  { q: "majoitus Tikkakoski / majoitus lentoaseman lähellä", page: "Huoneiston sivu" },
  { q: "palju vuokralle Jyväskylä / kylpytynnyri vuokraus", page: "Kylpytynnyrin oma sivu" },
  { q: "kokouspaikka Uurainen / virkistyspäivä mökki", page: "Huvilan sivu" },
  { q: "cottage near Jyväskylä, Finland", page: "Englanninkieliset sivut" },
];

const done = [
  {
    title: "Jokaisella kohteella oma sivu",
    text: "Kuvat (pyyhkäise puhelimella), teidän omat tekstinne sellaisenaan, mitä kohteesta löytyy, hinnasto, varaustilanne ja lähellä olevat paikat.",
  },
  {
    title: "Varaustilanne pysyi ennallaan",
    text: "Teidän Google-kalenterinne näkyvät kohteiden sivuilla kuten ennenkin. Päivitätte niitä samalla tavalla, eikä mikään muutu.",
  },
  {
    title: "Tarjouspyyntö samoilla kysymyksillä",
    text: "Samat kysymykset kuin vanhassa lomakkeessa: ajankohta, henkimäärä ja käyttötarkoitus. Paljulle nouto tai toimitus. Viesti tulee suoraan sähköpostiinne.",
  },
  {
    title: "Palju omalle sivulleen",
    text: "Paljun voi vuokrata kuka tahansa, joten sillä on oma sivu. Se voi löytyä Googlesta niillekin, jotka eivät etsi mökkiä.",
  },
  {
    title: "Suomeksi ja englanniksi",
    text: "Ennen englanniksi oli vain linkit Booking.comiin. Nyt kaikki sivut ovat molemmilla kielillä.",
  },
  {
    title: "Tehty ensin puhelimelle",
    text: "Useimmat etsivät majoitusta puhelimella. Sivun alareunassa on aina Soita- ja Pyydä tarjous -painike.",
  },
  {
    title: "Tiedot Googlen ja tekoälyn kielellä",
    text: "Sivuilla on koneluettava käyntikortti: kohteet, osoitteet, hinnat ja yhteystiedot. Google, ChatGPT ja muut tekoälyhaut lukevat sen suoraan.",
  },
  {
    title: "Vanhat osoitteet ohjataan uusiin",
    text: "Vanhat sivut, kuten /mökki-jyväskylä ja /yhteystiedot, ohjautuvat uusille sivuille, eikä mikään linkki katkea.",
  },
];

const next = [
  { title: "Kysymykset sivuilla", text: "Jokaisella sivulla on oranssi laatikko ”Kysytään Tapanilta”. Kun vastaat, lisäämme tiedon sivulle ja poistamme kysymyksen." },
  { title: "Isommat kuvat", text: "Vanhan sivun kuvat ovat pieniä. Alkuperäiset puhelimesta tai kamerasta tekevät sivuista paljon näyttävämmät." },
  { title: "Kuva ja pari lausetta sinusta", text: "Vieraat varaavat mieluummin, kun tietävät kenen luo tulevat." },
  { title: "Google-arviot", text: "Näytämme Googlen tähdet sivuilla lähteineen. Emme koskaan keksi arvioita." },
];

export default function Page() {
  if (!isPreview) notFound();
  const host = SITE_URL.replace("https://", "");
  const results = [
    { url: host, title: ui.fi.homeTitle, desc: ui.fi.homeDescription },
    ...unitList.map((u) => ({ url: `${host}${unitPath(u, "fi")}`, title: unitMeta(u, "fi").title, desc: unitMeta(u, "fi").description })),
    { url: `${host}${paths.tub.fi}`, title: ui.fi.tubMeta, desc: ui.fi.tubDescription },
  ];
  return (
    <>
      <Header locale="fi" otherHref={paths.home.en} />
      <main className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
        <h1 className="text-balance font-serif text-5xl text-tar">Mitä teimme, jotta teidät löydetään Googlesta</h1>
        <p className="mt-4 text-lg leading-relaxed text-ink/80">
          Tavoite on, että kun joku etsii mökkiä tai paljua Jyväskylästä tai Uuraisilta, Tapsan Mökit näkyy kärjessä, ja
          vieras löytää helposti sopivan kohteen. Kuvat ja tekstit ovat teidän nykyisiltä sivuiltanne.
        </p>

        <h2 className="mt-14 font-serif text-3xl text-tar">Haut, joihin tähtäämme</h2>
        <ul className="mt-5 divide-y divide-ink/10 rounded-2xl bg-white">
          {searches.map((s) => (
            <li key={s.q} className="flex flex-col gap-1 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
              <span className="inline-flex items-center gap-2 font-semibold text-tar">
                <Search className="size-4 text-ink/40" aria-hidden />
                {s.q}
              </span>
              <span className="text-sm text-ink/65">{s.page}</span>
            </li>
          ))}
        </ul>

        <h2 className="mt-14 font-serif text-3xl text-tar">Näin sivut näkyvät Googlessa</h2>
        <div className="mt-5 space-y-4">
          {results.map((r) => (
            <div key={r.url} className="rounded-2xl border border-ink/10 bg-white p-5 font-[arial,sans-serif]">
              <p className="text-sm text-[#4d5156]">{r.url}</p>
              <p className="mt-1 text-xl leading-snug text-[#1a0dab]">{r.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-[#4d5156]">{r.desc}</p>
            </div>
          ))}
        </div>

        <h2 className="mt-14 font-serif text-3xl text-tar">Mitä sivuilla on tehty</h2>
        <ul className="mt-5 grid gap-4 sm:grid-cols-2">
          {done.map((d) => (
            <li key={d.title} className="rounded-2xl bg-white p-5">
              <p className="flex items-start gap-2 font-semibold text-tar">
                <Check className="mt-0.5 size-5 shrink-0 text-amber" aria-hidden />
                {d.title}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-ink/75">{d.text}</p>
            </li>
          ))}
        </ul>

        <h2 className="mt-14 font-serif text-3xl text-tar">Seuraavat askeleet yhdessä</h2>
        <ul className="mt-5 grid gap-4 sm:grid-cols-2">
          {next.map((d) => (
            <li key={d.title} className="rounded-2xl border-2 border-dashed border-amber/35 p-5">
              <p className="font-semibold text-tar">{d.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-ink/75">{d.text}</p>
            </li>
          ))}
        </ul>

        <h2 className="mt-14 font-serif text-3xl text-tar">Miten tuloksia seurataan</h2>
        <p className="mt-3 leading-relaxed text-ink/80">
          Kun sivut ovat julki, liitämme ne Googlen Search Console -palveluun. Sieltä näkyy, millä hauilla teidät
          löydetään ja kuinka moni klikkaa. Lähetämme lyhyen yhteenvedon.
        </p>
      </main>
    </>
  );
}
