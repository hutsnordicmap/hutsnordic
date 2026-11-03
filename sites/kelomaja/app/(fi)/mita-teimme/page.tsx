import { notFound } from "next/navigation";
import { Check, Search } from "lucide-react";
import { Header } from "@/app/components/Chrome";
import { isPreview, nearby, nearbyMeta, nearbyPath, paths, SITE_URL, ui, unitList, unitMeta, unitPath } from "@/app/content";

// A walkthrough for the owner, shown only in the preview build. It is not part of the live site.
export const metadata = { title: { absolute: "Mitä teimme Googlea varten – Kelomaja" } };

const searches = [
  { q: "mökki Sallatunturi / vuokramökki Salla", page: "Etusivu ja mökkien sivut" },
  { q: "kelohirsimökki Lappi / mökki kuudelle Salla", page: "Kelomajan sivu" },
  { q: "mökki lemmikin kanssa Lappi", page: "Mökkien sivut" },
  { q: "tekemistä Sallatunturissa / Ruuhitunturi / Sallan hiihtokeskus", page: "Sallatunturi-sivu ja paikkojen omat sivut" },
  { q: "cabin Salla Lapland / Sallatunturi accommodation", page: "Englanninkieliset sivut" },
];

const done = [
  {
    title: "Huts.fi-kartta, joka pitää vieraat teidän sivuillanne",
    text: "Kartalla ovat mökit, lähimmät ladut, reitit, kylpylä, rinteet ja Ruuhitunturi. Kun paikkaa klikkaa, aukeaa teidän oma sivunne siitä paikasta, ei huts.fi. Rakensimme tämän ensimmäisenä teille.",
  },
  {
    title: "Jokaiselle lähipaikalle oma sivu",
    text: "Hiihtokeskus, kylpylä, uimaranta, tunturin kota, Ruuhitunturi, latu ja reitit saivat omat sivunsa: etäisyys mökeiltä, tärkeimmät tiedot ja linkit. Kun joku etsii ”Ruuhitunturi”, Google voi näyttää teidän sivunne, ja sivulla on heti Kelomaja ja Kuusisto.",
  },
  {
    title: "Teidän hyvä aluetekstinne järjestettiin",
    text: "Aktiviteetit-sivun sisältö on tallella, nyt talvi ja kesä omina osioinaan ja samalla sivulla kartan kanssa. Vanha osoite /aktiviteetit ohjautuu uudelle sivulle.",
  },
  {
    title: "Mökkien tiedot yhdellä silmäyksellä",
    text: "Nukkumapaikat, hinta ja matka ladulle näkyvät heti ylhäällä. Varustelu, keittiö ja etäisyydet ovat selkeinä listoina, ja Varaa-painike on aina näkyvissä.",
  },
  {
    title: "Suomeksi ja englanniksi",
    text: "Kaikki sivut ovat molemmilla kielillä. Sallaan tulee paljon ulkomaisia vieraita.",
  },
  {
    title: "Tiedot Googlen ja tekoälyn kielellä",
    text: "Sivuilla on koneluettava käyntikortti: mökit, osoitteet, varustelu ja yhteystiedot. Google, ChatGPT ja muut tekoälyhaut lukevat sen suoraan.",
  },
];

const next = [
  { title: "Kysymykset sivuilla", text: "Sivuilla on oransseja laatikoita ”Kysytään Arvolta”. Kun vastaat, lisäämme tiedon sivulle ja poistamme kysymyksen." },
  { title: "Ulkokuvat mökeistä", text: "Kuva Kelomajasta ulkoa puuttuu vielä. Puhelimella otettu kuva riittää hyvin." },
  { title: "Omat suosikkipaikkasi", text: "Kerro paikoista, joita suosittelet vieraille. Teemme jokaiselle oman sivun." },
  { title: "Varaukset ja maksut", text: "Voimme auttaa, jos haluat vieraiden varaavan ja maksavan suoraan sivuilla, tai kalenterit samaan tahtiin Nettimökin kanssa." },
];

export default function Page() {
  if (!isPreview) notFound();
  const host = SITE_URL.replace("https://", "");
  const results = [
    { url: host, title: ui.fi.homeTitle, desc: ui.fi.homeDescription },
    ...unitList.map((u) => ({ url: `${host}${unitPath(u, "fi")}`, title: unitMeta(u, "fi").title, desc: unitMeta(u, "fi").description })),
    { url: `${host}${paths.area.fi}`, title: ui.fi.areaMeta, desc: ui.fi.areaDescription },
    ...nearby.slice(4, 5).map((n) => ({ url: `${host}${nearbyPath(n, "fi")}`, title: nearbyMeta(n, "fi").title, desc: nearbyMeta(n, "fi").description })),
  ];
  return (
    <>
      <Header locale="fi" otherHref={paths.home.en} />
      <main className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
        <h1 className="text-balance font-serif text-5xl text-night">Mitä teimme, jotta teidät löydetään Googlesta</h1>
        <p className="mt-4 text-lg leading-relaxed text-ink/80">
          Tavoite on, että kun joku etsii mökkiä Sallatunturista tai tekemistä Sallasta, Kelomaja ja Kuusisto näkyvät
          kärjessä. Kuvat ja tekstit ovat teidän nykyisiltä sivuiltanne.
        </p>

        <h2 className="mt-14 font-serif text-3xl text-night">Haut, joihin tähtäämme</h2>
        <ul className="mt-5 divide-y divide-ink/10 rounded-2xl bg-white">
          {searches.map((s) => (
            <li key={s.q} className="flex flex-col gap-1 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
              <span className="inline-flex items-center gap-2 font-semibold text-night">
                <Search className="size-4 text-ink/40" aria-hidden />
                {s.q}
              </span>
              <span className="text-sm text-ink/65">{s.page}</span>
            </li>
          ))}
        </ul>

        <h2 className="mt-14 font-serif text-3xl text-night">Näin sivut näkyvät Googlessa</h2>
        <div className="mt-5 space-y-4">
          {results.map((r) => (
            <div key={r.url} className="rounded-2xl border border-ink/10 bg-white p-5 font-[arial,sans-serif]">
              <p className="text-sm text-[#4d5156]">{r.url}</p>
              <p className="mt-1 text-xl leading-snug text-[#1a0dab]">{r.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-[#4d5156]">{r.desc}</p>
            </div>
          ))}
        </div>

        <h2 className="mt-14 font-serif text-3xl text-night">Mitä sivuilla on tehty</h2>
        <ul className="mt-5 grid gap-4 sm:grid-cols-2">
          {done.map((d) => (
            <li key={d.title} className="rounded-2xl bg-white p-5">
              <p className="flex items-start gap-2 font-semibold text-night">
                <Check className="mt-0.5 size-5 shrink-0 text-kelo" aria-hidden />
                {d.title}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-ink/75">{d.text}</p>
            </li>
          ))}
        </ul>

        <h2 className="mt-14 font-serif text-3xl text-night">Seuraavat askeleet yhdessä</h2>
        <ul className="mt-5 grid gap-4 sm:grid-cols-2">
          {next.map((d) => (
            <li key={d.title} className="rounded-2xl border-2 border-dashed border-kelo/35 p-5">
              <p className="font-semibold text-night">{d.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-ink/75">{d.text}</p>
            </li>
          ))}
        </ul>

        <h2 className="mt-14 font-serif text-3xl text-night">Miten tuloksia seurataan</h2>
        <p className="mt-3 leading-relaxed text-ink/80">
          Kun sivut ovat julki, liitämme ne Googlen Search Console -palveluun. Sieltä näkyy, millä hauilla teidät
          löydetään ja kuinka moni klikkaa. Lähetämme lyhyen yhteenvedon.
        </p>
      </main>
    </>
  );
}
