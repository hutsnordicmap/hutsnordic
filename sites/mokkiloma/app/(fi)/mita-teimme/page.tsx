import { notFound } from "next/navigation";
import { Check, Search } from "lucide-react";
import { Header } from "@/app/components/Chrome";
import { cottageList, cottageMeta, cottagePath, isPreview, paths, SITE_URL, ui } from "@/app/content";

// A walkthrough for the owner, shown only in the preview build. It is not part of the live site.
export const metadata = { title: { absolute: "Mitä teimme Googlea varten – Elijärven Mökkilomat" } };

const searches = [
  { q: "mökki Yläne / mökki Pöytyä", page: "Etusivu ja mökkisivut" },
  { q: "lomamökki Elijärvi", page: "Kaikki sivut" },
  { q: "mökki 12 hengelle Varsinais-Suomi", page: "Elimäen sivu" },
  { q: "savusauna vuokralle Varsinais-Suomi", page: "Savusaunan oma sivu" },
  { q: "mökki Kuhankuono / Kurjenrahka", page: "Aktiviteetit ja etusivu" },
  { q: "virkistyspäivä mökki Turun lähellä", page: "Etusivu, Yrityksille-osio" },
  { q: "cottage near Turku, Finland", page: "Englanninkieliset sivut" },
];

const done = [
  {
    title: "Mökkien erot näkyvät heti",
    text: "Kuusi mökkiä oli vaikea erottaa toisistaan. Nyt jokaisella on oma lyhyt kuvaus (esimerkiksi ”pieni hirsimökki ja lasitettu terassi”), kenelle se sopii, sijainti ja hinta alkaen. Vieras voi valita henkimäärän, ja vertailutaulukko näyttää kaikki mökit rinnakkain.",
  },
  {
    title: "Video koko näytöllä",
    text: "Etusivu alkaa teidän omalla videollanne koko ruudun kokoisena, ilman tekstejä päällä. Puhelimella se vie heti tunnelmaan. Kun saamme alkuperäisen videotiedoston, se pyörii terävänä ilman YouTuben merkkejä.",
  },
  {
    title: "Jokaiselle mökille oma sivu",
    text: "Isot kuvat (pyyhkäise puhelimella), mitä mökistä löytyy, hinnat kausittain, hyvä tietää -asiat ja kartta. Sivun otsikko on kirjoitettu niillä sanoilla, joilla mökkiä haetaan.",
  },
  {
    title: "Savusauna omalle sivulleen",
    text: "Savusauna, rapulampi ja saaren grillikatos ovat harvinaisia. Omalla sivullaan ne voivat löytyä Googlesta myös niille, jotka etsivät vain saunailtaa tai rapujuhlia.",
  },
  {
    title: "Suomeksi ja englanniksi",
    text: "Vanhoilla sivuilla englanniksi oli vain etusivu. Nyt kaikki sivut ovat molemmilla kielillä, ja Google tietää, mikä sivu on kummankin kielinen versio.",
  },
  {
    title: "Tehty ensin puhelimelle",
    text: "Useimmat etsivät mökkiä puhelimella. Sivun alareunassa on aina Soita- ja Kysy vapaita -painike.",
  },
  {
    title: "Varauskysely yhdellä napautuksella",
    text: "Vieras valitsee mökin, päivät ja henkimäärän, ja sähköposti teille aukeaa valmiiksi kirjoitettuna.",
  },
  {
    title: "Yritystiedot Googlen ja tekoälyn kielellä",
    text: "Sivuilla on koneluettava käyntikortti: nimi, osoite, puhelin, mökkien sijainnit ja koko. Google, ChatGPT ja muut tekoälyhaut lukevat sen suoraan, ja usein kysytyt kysymykset vastaavat juuri niihin asioihin, joita ihmiset kysyvät.",
  },
  {
    title: "Vanhat osoitteet ohjataan uusiin",
    text: "Vanhat sivut, kuten /mokit/rantamaki/ ja /yhteystiedot/, ohjautuvat uusille sivuille. Google siirtää vanhojen sivujen arvon uusille, eikä mikään linkki katkea.",
  },
];

const next = [
  { title: "Kysymykset sivuilla", text: "Jokaisella sivulla on oranssi laatikko ”Kysytään Mikalta”. Kun vastaat, lisäämme tiedon sivulle ja poistamme kysymyksen." },
  { title: "Google-yritysprofiili ja arviot", text: "Näytämme Googlen tähdet sivuilla lähteineen. Emme koskaan keksi arvioita." },
  { title: "Kuva ja pari lausetta sinusta", text: "Vieraat varaavat mieluummin, kun tietävät kenen luo tulevat." },
  { title: "Varauskalenteri", text: "Jos haluat, sivuille voidaan lisätä kalenteri, josta vieras näkee vapaat viikot." },
];

export default function Page() {
  if (!isPreview) notFound();
  const host = SITE_URL.replace("https://", "");
  const results = [
    { url: host, title: ui.fi.homeTitle, desc: ui.fi.homeDescription },
    { url: `${host}${paths.cottages.fi}`, title: ui.fi.cottagesTitle, desc: ui.fi.cottagesDescription },
    ...cottageList.slice(0, 2).map((c) => ({ url: `${host}${cottagePath(c, "fi")}`, ...cottageMeta(c, "fi"), desc: cottageMeta(c, "fi").description })),
    { url: `${host}${paths.sauna.fi}`, title: ui.fi.saunaPageTitle, desc: ui.fi.saunaDescription },
  ];
  return (
    <>
      <Header locale="fi" otherHref={paths.home.en} />
      <main className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
        <p className="label text-copper">Elijärven Mökkilomat · uudet verkkosivut</p>
        <h1 className="mt-2 text-balance font-serif text-5xl font-semibold text-forest">Mitä teimme, jotta teidät löydetään Googlesta</h1>
        <p className="mt-4 text-lg leading-relaxed text-ink/80">
          Tavoite on, että kun joku etsii mökkiä Yläneeltä, Pöytyältä tai Turun läheltä, Elijärven Mökkilomat näkyy
          kärjessä, ja että vieras löytää helposti juuri sopivan mökin. Kuvat ja tekstit ovat teidän nykyisiltä
          sivuiltanne. Tässä lyhyesti mitä on tehty.
        </p>

        <h2 className="mt-14 font-serif text-3xl font-semibold text-forest">Haut, joihin tähtäämme</h2>
        <ul className="mt-5 divide-y divide-ink/10 rounded-2xl bg-white">
          {searches.map((s) => (
            <li key={s.q} className="flex flex-col gap-1 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
              <span className="inline-flex items-center gap-2 font-semibold text-forest">
                <Search className="size-4 text-ink/40" aria-hidden />
                {s.q}
              </span>
              <span className="text-sm text-ink/65">{s.page}</span>
            </li>
          ))}
        </ul>

        <h2 className="mt-14 font-serif text-3xl font-semibold text-forest">Näin sivut näkyvät Googlen hakutuloksissa</h2>
        <p className="mt-2 text-ink/70">Jokaisella sivulla on oma otsikko ja kuvaus, kirjoitettu näitä hakuja varten.</p>
        <div className="mt-5 space-y-4">
          {results.map((r) => (
            <div key={r.url} className="rounded-2xl border border-ink/10 bg-white p-5 font-[arial,sans-serif]">
              <p className="text-sm text-[#4d5156]">{r.url}</p>
              <p className="mt-1 text-xl leading-snug text-[#1a0dab]">{r.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-[#4d5156]">{r.desc}</p>
            </div>
          ))}
        </div>

        <h2 className="mt-14 font-serif text-3xl font-semibold text-forest">Mitä sivuilla on tehty</h2>
        <ul className="mt-5 grid gap-4 sm:grid-cols-2">
          {done.map((d) => (
            <li key={d.title} className="rounded-2xl bg-white p-5">
              <p className="flex items-start gap-2 font-semibold text-forest">
                <Check className="mt-0.5 size-5 shrink-0 text-copper" aria-hidden />
                {d.title}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-ink/75">{d.text}</p>
            </li>
          ))}
        </ul>

        <h2 className="mt-14 font-serif text-3xl font-semibold text-forest">Seuraavat askeleet yhdessä</h2>
        <ul className="mt-5 grid gap-4 sm:grid-cols-2">
          {next.map((d) => (
            <li key={d.title} className="rounded-2xl border-2 border-dashed border-copper/35 p-5">
              <p className="font-semibold text-forest">{d.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-ink/75">{d.text}</p>
            </li>
          ))}
        </ul>

        <h2 className="mt-14 font-serif text-3xl font-semibold text-forest">Miten tuloksia seurataan</h2>
        <p className="mt-3 leading-relaxed text-ink/80">
          Kun sivut ovat julki, liitämme ne Googlen Search Console -palveluun. Sieltä näkyy joka kuukausi, millä hauilla
          teidät löydetään, monennellako sijalla olette ja kuinka moni klikkaa. Lähetämme lyhyen yhteenvedon.
        </p>
      </main>
    </>
  );
}
