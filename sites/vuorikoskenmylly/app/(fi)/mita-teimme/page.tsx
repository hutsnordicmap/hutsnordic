import { notFound } from "next/navigation";
import { Check, PencilLine, Search } from "lucide-react";
import { Header } from "@/app/components/Chrome";
import { isPreview, pages, paths } from "@/app/content";

// A walkthrough for the owner, shown only in the preview build. It is not part of the live site.
export const metadata = { title: { absolute: "Mitä teimme ja miten päivität itse – Vuorikosken Mylly" } };

const searches = [
  { q: "kahvila Sammatti, kesäkahvila Lohja", page: "Etusivu ja Kahvila" },
  { q: "gluteeniton kahvila Lohja / Uusimaa", page: "Kahvila" },
  { q: "koiraystävällinen kahvila Lohja", page: "Kahvila" },
  { q: "vintage kauppa Lohja, second hand sisustus Uusimaa", page: "Putiikki" },
  { q: "joulupuoti Sammatti, joulumyyjäiset Lohja", page: "Putiikki ja ilmoituspalkki" },
  { q: "taidenäyttely Sammatti, näyttelytila taiteilijalle Uusimaa", page: "Galleria" },
  { q: "pieni juhlatila Lohja, kokoustila Sammatti", page: "Juhlatila" },
  { q: "aamiaismajoitus Sammatti, B&B Lohja, sähkötön mökki Uusimaa", page: "Majoitus" },
  { q: "Vuorikosken Mylly aukioloajat", page: "Aukiolo ja yhteys" },
  { q: "gluten-free café Finland, vintage shop Lohja", page: "Englanninkieliset sivut" },
];

const done = [
  {
    title: "Kahvila ja putiikki ensin, majoitus pienenä lisänä",
    text: "Kuten toivoit: etusivu kertoo ensin kahvilasta, putiikista ja galleriasta. Majoituksella on oma sivunsa, mutta etusivulla se on vain yksi kuva muiden joukossa.",
  },
  {
    title: "Oma sivu jokaiselle palvelulle",
    text: "Kahvila, putiikki, galleria, juhlatila ja majoitus saivat kukin oman sivun, otsikon ja kuvauksen. Google näyttää oikean sivun oikeaan hakuun, esimerkiksi \"gluteeniton kahvila Lohja\" vie suoraan kahvilan sivulle.",
  },
  {
    title: "Ei enää uusia välilehtiä",
    text: "Vanhalla sivulla Mutterimökki ja Rantayksiö aukesivat erillisille sivuille. Nyt molemmat ovat majoitussivulla vierekkäin, ja vanhat osoitteet ohjautuvat sinne.",
  },
  {
    title: "Aukiolo näkyy heti",
    text: "Jokaisen sivun ylälaidassa on ajankohtainen ilmoitus, ja sivut kertovat \"Avoinna tänään\" tai \"Seuraavaksi avoinna\" päivämäärän mukaan. Sama tieto on piilossa koneluettavana Googlelle, joten aukioloajat voivat näkyä suoraan hakutuloksessa.",
  },
  {
    title: "Gluteeniton ja lemmikit tervetulleita",
    text: "Nämä ovat juuri niitä asioita, joita ihmiset kysyvät Googlelta ja ChatGPT:ltä. Ne ovat nyt otsikoissa, vastauksissa ja koneluettavissa tiedoissa.",
  },
  {
    title: "Suomeksi ja englanniksi",
    text: "Jokainen sivu on molemmilla kielillä. Ulkomaiset vieraat löytävät englanninkielisen sivun suoraan.",
  },
  {
    title: "Tehty ensin puhelimelle",
    text: "Puhelimella sivun alareunassa on aina Soita-, WhatsApp- ja Reitti-painike. Kuvia selataan pyyhkäisemällä.",
  },
  {
    title: "Vanhat osoitteet ohjataan uusiin",
    text: "Esimerkiksi /aamiaismajoitus/ ja /galleria-info/ ohjautuvat automaattisesti uusille sivuille, joten Googlen nykyinen arvostus ja vanhat linkit säilyvät.",
  },
  {
    title: "Kartta ja linkit Huts.fi:stä",
    text: "Huts.fi-kartta näyttää myllyn, ja Huts.fi linkittää kahvilan, majoituksen, rantayksiön ja saunan sivuilta teidän sivuillenne.",
  },
];

const editing = [
  {
    title: "Ajankohtaista ja aukiolopäivät",
    text: "Kirjaudut puhelimella, kirjoitat esimerkiksi \"Joulupuoti avoinna la–su 28.–29.11. klo 11–16\" ja lisäät päivät. Sivut päivittyvät minuutissa.",
  },
  { title: "Hinnat", text: "Kahvilan, juhlatilan, majoituksen ja gallerian hinnat ovat yhdessä paikassa. Muutat luvun ja tallennat." },
  { title: "Majoituksen tilanne", text: "Esimerkiksi \"Kesän 2027 varaukset auki\" tai \"Loppuunmyyty\" yhdellä rivillä." },
  { title: "Kuvat", text: "Lisäät kuvan puhelimesta ja valitset sille paikan. Kuva pienennetään automaattisesti, jotta sivu pysyy nopeana." },
  {
    title: "Muut tekstit",
    text: "Isommat muutokset, kuten uusi palvelu, teemme me puolestasi samana päivänä. Näin hakukoneille kirjoitetut otsikot pysyvät kunnossa.",
  },
];

export default function Page() {
  if (!isPreview) notFound();
  const askCount = Object.values(pages).reduce((n, p) => n + p.fi.ask.length, 0);
  return (
    <>
      <Header locale="fi" otherHref={paths.home.en} />
      <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <p className="label text-rust">Vuorikosken Mylly · esikatselu</p>
        <h1 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">Mitä teimme ja miten päivität sivuja itse</h1>
        <p className="mt-5 text-lg leading-relaxed text-ink/80">
          Kaikki tiedot on otettu nykyisiltä sivuiltanne. Emme ole keksineet hintoja, matkoja tai arvosteluja. Oranssilla katkoviivalla merkityissä
          laatikoissa ({askCount} kohtaa) on asioita, joita kysyisimme teiltä. Ne näkyvät vain tässä esikatselussa.
        </p>

        <h2 className="mt-14 font-display text-3xl">Haut, joihin sivut on kirjoitettu</h2>
        <div className="mt-6 divide-y divide-ink/10 border-y border-ink/10">
          {searches.map((s) => (
            <div key={s.q} className="flex flex-wrap items-baseline justify-between gap-2 py-3">
              <span className="inline-flex items-center gap-2 font-semibold">
                <Search className="size-4 text-rust" aria-hidden />
                {s.q}
              </span>
              <span className="text-sm text-ink/60">{s.page}</span>
            </div>
          ))}
        </div>

        <h2 className="mt-14 font-display text-3xl">Mitä teimme</h2>
        <ul className="mt-6 space-y-6">
          {done.map((d) => (
            <li key={d.title} className="flex gap-4">
              <Check className="mt-1 size-5 shrink-0 text-rust" aria-hidden />
              <div>
                <p className="font-semibold">{d.title}</p>
                <p className="mt-1 leading-relaxed text-ink/75">{d.text}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-16 bg-coal p-6 text-flour sm:p-10">
          <p className="label text-rust-light">Päivität itse</p>
          <h2 className="mt-3 font-display text-3xl">Ei sähköposteja eikä odottelua</h2>
          <p className="mt-4 leading-relaxed text-flour/80">
            Kerroit, että ulkopuolinen ylläpito tuntui kankealta, kun jokaisesta muutoksesta piti erikseen meilata tai soittaa. Siksi useimmin muuttuvat
            tiedot ovat yhdessä paikassa, jota voit muokata itse puhelimella:
          </p>
          <ul className="mt-6 space-y-5">
            {editing.map((e) => (
              <li key={e.title} className="flex gap-4">
                <PencilLine className="mt-1 size-5 shrink-0 text-rust-light" aria-hidden />
                <div>
                  <p className="font-semibold">{e.title}</p>
                  <p className="mt-1 leading-relaxed text-flour/75">{e.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </>
  );
}
