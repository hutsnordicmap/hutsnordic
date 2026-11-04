import { notFound } from "next/navigation";
import { Check, Search } from "lucide-react";
import { Header } from "@/app/components/Chrome";
import { isPreview, pageList, paths, SITE_URL, ui } from "@/app/content";

// A walkthrough for the owner, shown only in the preview build. It is not part of the live site.
export const metadata = { title: { absolute: "Mitä teimme Googlea varten – Villa Kukkapää" } };

const searches = [
  { q: "huvila Saimaa / vuokrahuvila Sulkava", page: "Etusivu ja huvilan sivu" },
  { q: "mökki isolle porukalle Saimaa / huvila 10 hengelle", page: "Etusivu ja huvilan sivu" },
  { q: "rantasauna Saimaa / mökki hiekkarannalla", page: "Rantasaunan ja rannan sivut" },
  { q: "majoitus Savonlinnan oopperajuhlat", page: "Etusivu" },
  { q: "Vilkaharju / tekemistä Sulkavalla", page: "Ranta ja tekeminen -sivu" },
  { q: "Kukkapään saha / Sulkavan historia", page: "Historia-sivu" },
  { q: "villa rental Lake Saimaa Finland", page: "Englanninkieliset sivut" },
];

const done = [
  {
    title: "Etusivulla video teidän omista droonikuvistanne",
    text: "Saimaa ilmasta, huvila ylhäältä, rantasauna ja tuli. Leikkasimme 18 sekunnin videon saunavideonne terävistä droonikuvista. Vanha esittelyvideo oli liian pieni koko näytölle.",
  },
  {
    title: "Oma sivu huvilalle, rantasaunalle, rannalle ja historialle",
    text: "Jokainen sivu vastaa omaan hakuun. Joku etsii rantasaunaa, toinen tekemistä Sulkavalla, kolmas Kukkapään sahan historiaa, ja jokainen päätyy suoraan oikealle sivulle.",
  },
  {
    title: "Vanhan sivun sisältö järjestettiin",
    text: "Teidän tekstinne sellaisenaan, 79 parasta kuvaa oikeille sivuilleen, pohjapiirrokset, lisäpalvelut hintoineen ja historian 14 vanhaa kuvaa kuvateksteineen.",
  },
  {
    title: "Tärkeimmät luvut heti näkyvissä",
    text: "10 + 4 hengelle, 200 m omaa hiekkarantaa, 20 000 m² aidattu tontti ja vuosi 1904. Isoa porukkaa kokoava näkee heti, että paikka sopii.",
  },
  {
    title: "Varaus yhdellä painalluksella",
    text: "Varaa-painike vie Lomarenkaan varauskalenteriin ja on puhelimella aina näkyvissä. Lisäpalvelut ja talon säännöt ovat heti vieressä.",
  },
  {
    title: "Tehty ensin puhelimelle",
    text: "Useimmat etsivät mökkiä puhelimella. Kuvia selataan pyyhkäisemällä, ja Soita-painike on aina peukalon ulottuvilla.",
  },
  {
    title: "Suomeksi ja englanniksi",
    text: "Kaikki sivut ovat molemmilla kielillä. Vanhat saksan-, ranskan- ja venäjänkieliset sivut ohjautuvat englanninkielisille sivuille.",
  },
  {
    title: "Tiedot Googlen ja tekoälyn kielellä",
    text: "Sivuilla on koneluettava käyntikortti: majoitus, osoite, varustelu, yhteystiedot ja usein kysytyt kysymykset. Lisäksi tiivis esittely tekoälyhauille. Google, ChatGPT ja muut tekoälyhaut lukevat ne suoraan.",
  },
  {
    title: "Vanhat osoitteet ohjataan uusiin",
    text: "Esimerkiksi /fi/historia ja /fi/kuvagalleria ohjautuvat uusille sivuille, joten Googlen nykyiset sijoitukset säilyvät eikä mikään linkki katkea.",
  },
  {
    title: "Kartta lähipaikoista",
    text: "Huts.fi-kartalla ovat Vilkaharjun polut, Hopeasaaren grillikota, Rauhaniemen museo, Soutustadion ja frisbeegolfrata etäisyyksineen.",
  },
  {
    title: "Värit talosta",
    text: "Saimaan sininen, laudoituksen okra ja sokkelin punainen. Sivut näyttävät Villa Kukkapäältä, eivät mallipohjalta.",
  },
  {
    title: "Vieraiden arviot jätettiin pois",
    text: "Varaussivustojen arviot ovat niiden omaa sisältöä, eikä Google pidä kopioiduista teksteistä. Kerroimme samat asiat omin sanoin: ranta, sauna, iso porukka, lemmikit.",
  },
];

const next = [
  { title: "Kysymykset sivuilla", text: "Jokaisella sivulla on oranssi laatikko ”Kysytään Pentiltä”. Kun vastaat, lisäämme tiedon sivulle ja poistamme kysymyksen." },
  { title: "Instagram ja Facebook", text: "Metan ”Lataa tietosi” antaa kaikki kuvat ja kuvatekstit yhtenä zip-tiedostona. Kuvatekstit auttavat kirjoittamaan sivuille lisää." },
  { title: "Lisää droonikuvia", text: "Talvi, syksy ja ruska ilmasta. Niistä saa myös vuodenaikojen mukaan vaihtuvan etusivun." },
  { title: "Google-arviot", text: "Näytämme Googlen tähdet sivuilla lähteineen. Emme koskaan keksi arvioita." },
];

export default function Page() {
  if (!isPreview) notFound();
  const host = SITE_URL.replace("https://", "");
  const results = [
    { url: host, title: ui.fi.homeTitle, desc: ui.fi.homeDescription },
    ...pageList.map((p) => ({ url: `${host}${paths[p.id].fi}`, title: p.title.fi, desc: p.description.fi })),
  ];
  return (
    <>
      <Header locale="fi" otherHref={paths.home.en} />
      <main className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
        <h1 className="text-balance font-serif text-5xl text-lake-deep">Mitä teimme, jotta teidät löydetään Googlesta</h1>
        <p className="mt-4 text-lg leading-relaxed text-ink/80">
          Tavoite on, että kun joku etsii huvilaa Saimaalta isolle porukalle, Villa Kukkapää näkyy kärjessä. Kuvat ja
          tekstit ovat teidän nykyisiltä sivuiltanne.
        </p>

        <h2 className="mt-14 font-serif text-3xl text-lake-deep">Haut, joihin tähtäämme</h2>
        <ul className="mt-5 divide-y divide-ink/10 rounded-2xl bg-white">
          {searches.map((s) => (
            <li key={s.q} className="flex flex-col gap-1 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
              <span className="inline-flex items-center gap-2 font-semibold text-lake-deep">
                <Search className="size-4 shrink-0 text-ink/40" aria-hidden />
                {s.q}
              </span>
              <span className="text-sm text-ink/65">{s.page}</span>
            </li>
          ))}
        </ul>

        <h2 className="mt-14 font-serif text-3xl text-lake-deep">Näin sivut näkyvät Googlessa</h2>
        <div className="mt-5 space-y-4">
          {results.map((r) => (
            <div key={r.url} className="rounded-2xl border border-ink/10 bg-white p-5 font-[arial,sans-serif]">
              <p className="text-sm text-[#4d5156]">{r.url}</p>
              <p className="mt-1 text-xl leading-snug text-[#1a0dab]">{r.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-[#4d5156]">{r.desc}</p>
            </div>
          ))}
        </div>

        <h2 className="mt-14 font-serif text-3xl text-lake-deep">Mitä sivuilla on tehty</h2>
        <ul className="mt-5 grid gap-4 sm:grid-cols-2">
          {done.map((d) => (
            <li key={d.title} className="rounded-2xl bg-white p-5">
              <p className="flex items-start gap-2 font-semibold text-lake-deep">
                <Check className="mt-0.5 size-5 shrink-0 text-ochre-dark" aria-hidden />
                {d.title}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-ink/75">{d.text}</p>
            </li>
          ))}
        </ul>

        <h2 className="mt-14 font-serif text-3xl text-lake-deep">Seuraavat askeleet yhdessä</h2>
        <ul className="mt-5 grid gap-4 sm:grid-cols-2">
          {next.map((d) => (
            <li key={d.title} className="rounded-2xl border-2 border-dashed border-[#e08a2c]/50 p-5">
              <p className="font-semibold text-lake-deep">{d.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-ink/75">{d.text}</p>
            </li>
          ))}
        </ul>

        <h2 className="mt-14 font-serif text-3xl text-lake-deep">Miten tuloksia seurataan</h2>
        <p className="mt-3 leading-relaxed text-ink/80">
          Kun sivut ovat julki, liitämme ne Googlen Search Console -palveluun. Sieltä näkyy, millä hauilla teidät
          löydetään ja kuinka moni klikkaa. Lähetämme lyhyen yhteenvedon.
        </p>
      </main>
    </>
  );
}
