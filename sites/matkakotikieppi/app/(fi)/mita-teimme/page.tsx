import { notFound } from "next/navigation";
import { Bot, Check, ClipboardList, Palette, Search } from "lucide-react";
import { Header } from "@/app/components/Chrome";
import { contactPage, home, homeAsk, isPreview, navOrder, pages, paths, SITE_URL } from "@/app/content";

// A walkthrough for the owner, shown only in the preview build. It is not part of the live site.
export const metadata = { title: { absolute: "Mitä teimme ja miksi – Matkakoti Kieppi" } };

const searches = [
  { q: "majoitus Kuhmo, edullinen majoitus Kuhmo", page: "Etusivu" },
  { q: "Kuhmon kamarimusiikki majoitus", page: "Kuhmo" },
  { q: "työmatkamajoitus Kuhmo, yritysmajoitus Kainuu", page: "Työ ja ryhmät" },
  { q: "pitkäaikainen majoitus Kuhmo", page: "Työ ja ryhmät" },
  { q: "ryhmämajoitus Kuhmo", page: "Työ ja ryhmät" },
  { q: "yhden hengen huone Kuhmo, halpa hotelli Kuhmo", page: "Huoneet" },
  { q: "Matkakoti Kieppi", page: "Yhteystiedot" },
  { q: "cheap accommodation Kuhmo Finland, Kuhmo festival accommodation", page: "Englanninkieliset sivut" },
];

const done = [
  {
    title: "Vanhat osoitteet säilyvät",
    text: "/majoitus, /yhteystiedot ja englanninkieliset /en/accommodation ja /en/contact-us pysyvät samoina, ja vanha /en/frontpage ohjautuu uuteen etusivuun. Googlen nykyinen arvostus säilyy.",
  },
  {
    title: "Kaksi uutta sivua hakuja varten",
    text: "\"Työ ja ryhmät\" vastaa hakuihin kuten \"työmatkamajoitus Kuhmo\" ja \"pitkäaikainen majoitus Kuhmo\". \"Kuhmo\" vastaa Kamarimusiikin ja Juminkekon kävijöiden hakuihin. Molemmat tekstit perustuvat teidän omiin sanoihinne nykyisiltä sivuilta.",
  },
  {
    title: "Mitä hintaan sisältyy, heti näkyvissä",
    text: "Liinavaatteet, WiFi, keittiö, auton lämmityspaikka, lukittava huone ja iltasauna tilauksesta. Edullista majoitusta hakeva haluaa tietää tämän ennen kuin soittaa.",
  },
  {
    title: "Kysely suoraan sähköpostiin",
    text: "Vieras valitsee huoneen, päivät ja henkilömäärän, ja kysely aukeaa hänen sähköpostiinsa valmiiksi täytettynä. Ei välikäsiä eikä Booking.comin provisiota.",
  },
  {
    title: "Tehty ensin puhelimelle",
    text: "Puhelimella sivun alareunassa on aina Soita-, Sähköposti- ja Reitti-painike. Kuvia selataan pyyhkäisemällä.",
  },
  {
    title: "Teidän oma kylttilogonne",
    text: "Piirsimme kylttilogon uudelleen niin, että se näkyy terävänä kaikilla näytöillä.",
  },
  {
    title: "Lähiseutu ja kartta Huts.fi:stä",
    text: "Juminkeko 200 m, uimaranta ja uimahalli alle kilometrin, Petola ja ladut noin 3 km. Etäisyydet ovat Huts.fi-kartalta, ja Huts.fi linkittää teidän sivuillenne.",
  },
  {
    title: "Suomeksi ja englanniksi",
    text: "Jokainen sivu on molemmilla kielillä. Ennen englanniksi oli vain etusivu, huoneet ja yhteystiedot.",
  },
];

const colours = [
  { title: "Kainuun kuusikko", text: "Tumma kuusenvihreä rauhoittaa ja kertoo heti, että ollaan Kainuussa, ei kaupungin ketjuhotellissa." },
  { title: "Puolukanpunainen", text: "Soita- ja Kysy-painikkeet ovat puolukanpunaisia, jotta ne löytyvät heti. Sama sävy on myös käytävänne matossa." },
  { title: "Pyöreät kuvat", text: "Huoneet esitellään pyöreissä kehyksissä kuten parhailla majoitussivuilla. Se näyttää kodikkaalta ja erottaa huonetyypit selvästi." },
];

const geo = [
  "Koneluettava käyntikortti (Googlen ja tekoälyjen kieli): osoite, sijainti, puhelin, 14 huonetta, kaksi huonetyyppiä ja mitä hintaan sisältyy. Ei keksittyjä tähtiä tai arvosteluja.",
  "Selkeät kysymys–vastaus-parit jokaisella sivulla, esimerkiksi \"Onko huoneissa oma kylpyhuone?\" ja \"Saako ryhmälle aamiaisen talvella?\". ChatGPT ja Googlen tekoälyvastaukset lainaavat juuri tällaisia.",
  "Tekoälyille oma tiivistelmä sivustosta (llms.txt) englanniksi.",
];

const next = [
  { title: "Hinnat näkyviin", text: "Edullinen hinta on teidän vahvuutenne. Kun hinta näkyy sivulla, vieras varaa helpommin eikä vertaile Booking.comissa." },
  { title: "Vieraiden arviot", text: "Lisäämme parhaat arviot Booking.comista ja Googlesta sanasta sanaan, lähde näkyvissä." },
  { title: "Google-yritysprofiili", text: "Kunnossa oleva profiili kuvineen on tärkein yksittäinen asia hauissa kuten \"majoitus Kuhmo\". Autamme siinä." },
  { title: "Varauskalenteri", text: "Halutessanne sivuille voi lisätä oikean varauskalenterin, jolloin vieras näkee vapaat huoneet itse." },
];

export default function Page() {
  if (!isPreview) notFound();
  const askCount = Object.values(pages).reduce((n, p) => n + p.fi.ask.length, 0) + homeAsk.fi.length + contactPage.fi.ask.length;
  const host = SITE_URL.replace("https://", "");
  const results = [
    { url: host, title: home.fi.title, desc: home.fi.description },
    ...navOrder.map((id) => ({ url: `${host}${paths[id].fi}`, title: pages[id].fi.title, desc: pages[id].fi.description })),
    { url: `${host}${paths.contact.fi}`, title: contactPage.fi.title, desc: contactPage.fi.description },
  ];
  return (
    <>
      <Header locale="fi" otherHref={paths.home.en} />
      <main className="mx-auto max-w-4xl px-4 pt-16 pb-28 sm:px-6">
        <p className="label text-lingon">Matkakoti Kieppi · esikatselu</p>
        <h1 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">Mitä teimme ja miksi</h1>
        <p className="mt-5 text-lg leading-relaxed text-ink/75">
          Kaikki tiedot on otettu nykyisiltä sivuiltanne. Emme ole keksineet hintoja, matkoja tai arvosteluja. Oranssilla katkoviivalla merkityissä
          laatikoissa ({askCount} kohtaa) on asioita, joita kysyisimme teiltä. Ne näkyvät vain tässä esikatselussa.
        </p>

        <h2 className="mt-14 font-display text-3xl">Haut, joihin sivut on kirjoitettu</h2>
        <div className="mt-6 divide-y divide-ink/10 border-y border-ink/10">
          {searches.map((s) => (
            <div key={s.q} className="flex flex-wrap items-baseline justify-between gap-2 py-3">
              <span className="inline-flex items-center gap-2 font-semibold">
                <Search className="size-4 text-lingon" aria-hidden />
                {s.q}
              </span>
              <span className="text-sm text-ink/60">{s.page}</span>
            </div>
          ))}
        </div>

        <h2 className="mt-14 font-display text-3xl">Näin sivut näkyvät Googlen hakutuloksissa</h2>
        <p className="mt-2 text-ink/70">Jokaisella sivulla on oma otsikko ja kuvaus, kirjoitettu yllä olevia hakuja varten.</p>
        <div className="mt-6 space-y-3">
          {results.map((r) => (
            <div key={r.url} className="rounded-xl border border-ink/10 bg-white p-5 font-[arial,sans-serif]">
              <p className="text-sm text-[#4d5156]">{r.url}</p>
              <p className="mt-1 text-xl leading-snug text-[#1a0dab]">{r.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-[#4d5156]">{r.desc}</p>
            </div>
          ))}
        </div>

        <h2 className="mt-14 font-display text-3xl">Mitä teimme</h2>
        <ul className="mt-6 space-y-6">
          {done.map((d) => (
            <li key={d.title} className="flex gap-4">
              <Check className="mt-1 size-5 shrink-0 text-lingon" aria-hidden />
              <div>
                <p className="font-semibold">{d.title}</p>
                <p className="mt-1 leading-relaxed text-ink/75">{d.text}</p>
              </div>
            </li>
          ))}
        </ul>

        <h2 className="mt-16 flex items-center gap-3 font-display text-3xl">
          <Bot className="size-7 text-lingon" aria-hidden />
          Tekoälyhaut (GEO)
        </h2>
        <p className="mt-3 leading-relaxed text-ink/75">
          Yhä useampi kysyy nykyään ChatGPT:ltä tai Googlen tekoälyltä esimerkiksi &quot;edullinen majoitus Kuhmon keskustassa&quot;. Jotta tekoäly
          suosittelee teitä, sen pitää löytää teistä selkeät ja luotettavat tiedot:
        </p>
        <ul className="mt-5 space-y-4">
          {geo.map((g) => (
            <li key={g} className="flex gap-4">
              <Check className="mt-1 size-5 shrink-0 text-lingon" aria-hidden />
              <p className="leading-relaxed text-ink/75">{g}</p>
            </li>
          ))}
        </ul>

        <h2 className="mt-16 flex items-center gap-3 font-display text-3xl">
          <Palette className="size-7 text-lingon" aria-hidden />
          Värit ja tyyli
        </h2>
        <p className="mt-3 leading-relaxed text-ink/75">Tämä on ehdotus, ei päätös. Värit vaihtuvat helposti.</p>
        <ul className="mt-5 grid gap-4 sm:grid-cols-3">
          {colours.map((d) => (
            <li key={d.title} className="rounded-2xl border border-ink/10 bg-white p-5">
              <p className="font-semibold">{d.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-ink/75">{d.text}</p>
            </li>
          ))}
        </ul>

        <div className="mt-16 rounded-2xl border-2 border-dashed border-[#d9772f]/60 bg-[#fff6ee] p-6 sm:p-8">
          <p className="flex items-center gap-2 font-display text-2xl text-lingon">
            <ClipboardList className="size-6" aria-hidden />
            Kysymyksiä teille jokaisella sivulla
          </p>
          <p className="mt-3 leading-relaxed text-ink/75">
            Jokaisen sivun alalaidassa on oranssi katkoviivalaatikko &quot;Kysytään Mikolta&quot;. Vastaa vapaamuotoisesti, sotkuinenkin vastaus
            käy, ja lähetä kuvia puhelimesta sellaisenaan. Lisäämme tiedot sivuille ja poistamme vastatut kysymykset.
          </p>
        </div>

        <h2 className="mt-16 font-display text-3xl">Seuraavat askeleet yhdessä</h2>
        <ul className="mt-5 grid gap-4 sm:grid-cols-2">
          {next.map((d) => (
            <li key={d.title} className="rounded-2xl border-2 border-dashed border-lingon/30 p-5">
              <p className="font-semibold">{d.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-ink/75">{d.text}</p>
            </li>
          ))}
        </ul>

        <div className="mt-16 rounded-3xl bg-spruce p-6 text-paper sm:p-10">
          <p className="label text-lingon-light">Hinta</p>
          <h2 className="mt-3 font-display text-3xl">Ensimmäinen vuosi ilmaiseksi</h2>
          <p className="mt-4 leading-relaxed text-paper/80">
            Teemme ja ylläpidämme sivut ensimmäisen vuoden ilmaiseksi, sen jälkeen 20 €/kk. Ei sitoumusta: jos haluatte joskus siirtyä muualle,
            saatte kaikki sivujen tiedostot.
          </p>
        </div>

        <h2 className="mt-16 font-display text-3xl">Miten tuloksia seurataan</h2>
        <p className="mt-3 leading-relaxed text-ink/75">
          Kun sivut ovat julki, liitämme ne Googlen Search Console -palveluun. Sieltä näkyy joka kuukausi, millä hauilla teidät löydetään,
          monennellako sijalla olette ja kuinka moni klikkaa. Lähetämme teille lyhyen yhteenvedon.
        </p>
      </main>
    </>
  );
}
