import { notFound } from "next/navigation";
import { Check, Search } from "lucide-react";
import { Header } from "@/app/components/Chrome";
import { isPreview, paths, SITE_URL, ui, villaList, villaMeta } from "@/app/content";

// A walkthrough for the owner, shown only in the preview build. It is not part of the live site.
export const metadata = { title: { absolute: "Mitä teimme Googlea varten – Onnelan mökit" } };

const searches = [
  { q: "huvila Kangasniemi", page: "Etusivu ja kummankin huvilan oma sivu" },
  { q: "mökki Kangasniemi", page: "Etusivu" },
  { q: "lomamökki Etelä-Savo", page: "Etusivu ja huvilasivut" },
  { q: "Puula mökki / huvila Puulan rannalla", page: "Kaikki sivut" },
  { q: "Villa Onnela, Villa Suvikallio", page: "Huviloiden omat sivut" },
  { q: "lake villa Finland, Lake Puula cottage", page: "Englanninkieliset sivut" },
];

const done = [
  {
    title: "Otsikot, jotka vastaavat hakuja",
    text: "Vanhoilla sivuilla otsikko oli muotoa \"Villa Onnela - WWW.ONNELANMOKIT.COM\". Nyt jokaisen sivun otsikossa ja kuvauksessa on paikka, järvi ja tärkeimmät tiedot, eli juuri ne sanat joilla huvilaa haetaan.",
  },
  {
    title: "Suomeksi ja englanniksi",
    text: "Jokainen sivu on molemmilla kielillä, ja Google tietää mikä sivu on kummankin kielinen versio. Ulkomaiset vieraat löytävät englanninkielisen sivun suoraan.",
  },
  {
    title: "Tehty ensin puhelimelle",
    text: "Useimmat etsivät mökkiä puhelimella. Sivun alareunassa on aina Soita- ja Varaa-painike, ja kuvia selataan pyyhkäisemällä.",
  },
  {
    title: "Varauskysely yhdellä napautuksella",
    text: "Vieras valitsee huvilan, päivät ja henkimäärän, ja sähköposti teille aukeaa valmiiksi kirjoitettuna. Vähemmän kirjoittamista tarkoittaa enemmän kyselyitä.",
  },
  {
    title: "Yritystiedot Googlen kielellä",
    text: "Sivuilla on piilossa koneluettava käyntikortti: nimi, osoite, puhelin, sijainti kartalla, huvilan koko, makuuhuoneet ja varusteet. Google ja tekoälyhaut lukevat sen suoraan.",
  },
  {
    title: "Usein kysytyt kysymykset",
    text: "Kysymykset kuten \"saako lemmikin tuoda\" ja \"onko rantasauna\" ovat juuri niitä, joita ihmiset kirjoittavat Googleen ja ChatGPT:hen. Vastaukset ovat nyt sivuilla.",
  },
  {
    title: "Vanhat osoitteet ohjataan uusiin",
    text: "Vanhat sivut, kuten villa-onnela.html, ohjautuvat automaattisesti uusille sivuille. Google siirtää vanhojen sivujen arvon uusille, eikä mikään linkki katkea.",
  },
  {
    title: "Kartta ja linkit Huts.fi:stä",
    text: "Huts.fi-kartta näyttää molemmat huvilat, ja Huts.fi linkittää teidän sivuillenne. Linkit toisilta sivustoilta ovat yksi Googlen tärkeimmistä sijoitusperusteista.",
  },
  {
    title: "Nopeat sivut",
    text: "Kuvat pakataan automaattisesti oikeaan kokoon kullekin laitteelle. Nopea sivu nousee Googlessa paremmin ja vieras ei lähde odottamaan.",
  },
];

const next = [
  { title: "Google-yritysprofiili", text: "Ilmainen profiili Google Mapsiin. Autamme sen tekemisessä. Se on tärkein yksittäinen asia paikallisissa hauissa." },
  { title: "Vieraiden arviot", text: "Pyydetään tyytyväisiltä vierailta arvio Googleen. Näytämme ne sivuilla vain lähteineen, emme keksi tähtiä." },
  { title: "Kuva ja pari lausetta teistä", text: "Vieraat varaavat mieluummin, kun tietävät kenen luo tulevat." },
  { title: "Hinnat \"alkaen\"", text: "Jos haluatte, lisätään huvilakortteihin hinta alkaen / yö. Hinnallinen kortti saa yleensä enemmän klikkauksia." },
];

export default function Page() {
  if (!isPreview) notFound();
  const results = [
    { url: SITE_URL.replace("https://", ""), title: ui.fi.homeTitle, desc: ui.fi.homeDescription },
    ...villaList.map((v) => ({
      url: `${SITE_URL.replace("https://", "")}${v.path.fi}`,
      title: villaMeta[v.id].fi.title,
      desc: villaMeta[v.id].fi.description,
    })),
  ];
  return (
    <>
      <Header locale="fi" otherHref={paths.home.en} solid />
      <main className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/55">Onnelan mökit · uudet verkkosivut</p>
        <h1 className="mt-2 text-balance font-serif text-4xl font-semibold text-lake sm:text-5xl">
          Mitä teimme, jotta teidät löydetään Googlesta
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-ink/80">
          Tavoite on, että kun joku etsii huvilaa tai mökkiä Kangasniemeltä tai Etelä-Savosta, Onnelan mökit
          näkyy kärjessä, ja että vieras pääsee varaamaan mahdollisimman helposti. Tässä lyhyesti mitä on tehty.
        </p>

        <h2 className="mt-14 font-serif text-2xl font-semibold text-lake">Haut, joihin tähtäämme</h2>
        <ul className="mt-5 divide-y divide-ink/10 rounded-2xl bg-white">
          {searches.map((s) => (
            <li key={s.q} className="flex flex-col gap-1 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
              <span className="inline-flex items-center gap-2 font-semibold text-lake">
                <Search className="size-4 text-ink/40" aria-hidden />
                {s.q}
              </span>
              <span className="text-sm text-ink/65">{s.page}</span>
            </li>
          ))}
        </ul>

        <h2 className="mt-14 font-serif text-2xl font-semibold text-lake">Näin sivut näkyvät Googlen hakutuloksissa</h2>
        <p className="mt-2 text-ink/70">Jokaisella sivulla on oma otsikko ja kuvaus. Ne kirjoitettiin näitä hakuja varten.</p>
        <div className="mt-5 space-y-4">
          {results.map((r) => (
            <div key={r.url} className="rounded-2xl border border-ink/10 bg-white p-5 font-[arial,sans-serif]">
              <p className="text-sm text-[#4d5156]">{r.url}</p>
              <p className="mt-1 text-xl leading-snug text-[#1a0dab]">{r.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-[#4d5156]">{r.desc}</p>
            </div>
          ))}
        </div>

        <h2 className="mt-14 font-serif text-2xl font-semibold text-lake">Mitä sivuilla on tehty</h2>
        <ul className="mt-5 grid gap-4 sm:grid-cols-2">
          {done.map((d) => (
            <li key={d.title} className="rounded-2xl bg-white p-5">
              <p className="flex items-start gap-2 font-semibold text-lake">
                <Check className="mt-0.5 size-5 shrink-0 text-pine" aria-hidden />
                {d.title}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-ink/75">{d.text}</p>
            </li>
          ))}
        </ul>

        <h2 className="mt-14 font-serif text-2xl font-semibold text-lake">Seuraavat askeleet yhdessä</h2>
        <ul className="mt-5 grid gap-4 sm:grid-cols-2">
          {next.map((d) => (
            <li key={d.title} className="rounded-2xl border-2 border-dashed border-pine/35 p-5">
              <p className="font-semibold text-lake">{d.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-ink/75">{d.text}</p>
            </li>
          ))}
        </ul>

        <h2 className="mt-14 font-serif text-2xl font-semibold text-lake">Miten tuloksia seurataan</h2>
        <p className="mt-3 leading-relaxed text-ink/80">
          Kun sivut ovat julki, liitämme ne Googlen Search Console -palveluun. Sieltä näkyy joka kuukausi, millä
          hauilla teidät löydetään, monennellako sijalla olette ja kuinka moni klikkaa. Lähetämme teille lyhyen
          yhteenvedon, ja Huts.fi:n kumppanisivulta näette lisäksi kohteidenne katselukerrat.
        </p>
      </main>
    </>
  );
}
