import { notFound } from "next/navigation";
import Link from "next/link";
import { isPreview } from "@/app/content";

// A walkthrough for the owner, shown only in the preview build. It is not part of the live site.
export const metadata = { title: { absolute: "Mitä teimme Googlea varten – Elämyslaiva" } };

const searches = [
  ["saunalautta Tampere", "Etusivun otsikko ja kuvaus"],
  ["saunalaiva Näsijärvi", "Etusivun otsikko ja kuvaus"],
  ["polttarit sauna Tampere", "Polttarit, synttärit, firman ilta -osio"],
  ["virkistyspäivä sauna Tampere", "Hinnat ja usein kysyttyä"],
  ["risteily Näsijärvellä ryhmälle", "Risteily-hinta ja usein kysyttyä"],
  ["yöpyminen laivalla Tampere", "Yö-hinta ja usein kysyttyä"],
];

const done = [
  ["Video ensin, ilman tummennusta", "Sivu alkaa teidän omalla videollanne. Tekstit ovat videon alla, joten mitään ei tarvitse tummentaa. Kun saamme alkuperäiset videotiedostot, video pyörii itsestään terävänä ilman YouTuben merkkejä."],
  ["Kaikki yhdellä sivulla, puhelin edellä", "Useimmat etsivät saunailtaa puhelimella. Hinnat, mitä laivalla on, kuvat, videot ja yhteystiedot tulevat järjestyksessä yhdellä vierityksellä. Varaa- ja Soita-painikkeet ovat aina alareunassa."],
  ["Hinnat heti näkyvillä", "Päivä, yö ja risteily rinnakkain. Ihmiset vertaavat hintoja ennen kuin soittavat, ja Google näyttää mieluiten sivuja, joista vastaus löytyy suoraan."],
  ["Usein kysyttyä", "Viisi kysymystä, joita ihmiset kysyvät Googlelta ja tekoälyltä: missä laiva on, voiko yöpyä, saako omat ruoat, voiko lähteä risteilylle ja miten varataan. Vastaukset ovat teidän omista teksteistänne."],
  ["Yritystiedot Googlen ja tekoälyn kielellä", "Sivulla on koneluettava käyntikortti: nimi, osoite, puhelin, mitä laivalla on ja usein kysytyt kysymykset. Google, ChatGPT ja muut tekoälyhaut lukevat sen suoraan."],
  ["Tiivistelmä tekoälyhaulle", "Sivuston juuressa on tiedosto llms.txt: lyhyt tekstiversio laivasta, hinnoista ja yhteystiedoista tekoälyhakuja varten."],
  ["Kuvat, joita Google ymmärtää", "Jokaisella kuvalla on kuvaus (esimerkiksi ”Elämyslaiva Näsijärvellä, taustalla Näsinneula”). Ne auttavat kuvahaussa ja näkövammaisia käyttäjiä."],
  ["Kevyt ja nopea", "Sivu latautuu nopeasti myös satamassa heikolla verkolla. Google suosii nopeita sivuja puhelinhauissa."],
  ["Vanhat osoitteet ohjataan uusiin", "Vanhat sivut /varauskalenteri/ ja /galleria/ ohjautuvat uudelle sivulle. Google siirtää niiden arvon eteenpäin, eikä mikään linkki katkea."],
  ["Kartta", "Laiva näkyy huts.fi-kartalla sivun lopussa, ja Huts.fi linkittää takaisin teidän sivuillenne."],
];

const next = [
  ["Oranssit laatikot", "Sivulla on oransseja ”Kysytään teiltä” -laatikoita. Kun vastaatte, lisäämme tiedon sivulle ja poistamme kysymyksen."],
  ["Videot ja kuvat", "Alkuperäiset videot ja kaikki kuvat, erityisesti dronekuvat. Mitä enemmän, sitä parempi: me valitsemme parhaat."],
  ["Google-arviot", "Näytämme Googlen tähdet lähteineen, kun ne ovat käytössä. Emme koskaan keksi arvioita."],
  ["Search Console", "Kun sivut ovat julki, liitämme ne Googlen Search Consoleen. Siitä näkee, millä hauilla teidät löydetään ja monennellako sijalla olette."],
];

export default function Page() {
  if (!isPreview) notFound();
  return (
    <main className="wrap doc">
      <p><Link href="/">← Takaisin sivulle</Link></p>
      <h1>Mitä teimme, jotta teidät löydetään Googlesta</h1>
      <p className="muted">
        Tavoite on, että kun joku etsii saunalauttaa tai saunailtaa Tampereelta, Elämyslaiva näkyy kärjessä ja varaus
        on yhden napautuksen päässä. Tekstit, hinnat, kuvat ja videot ovat teidän nykyisiltä sivuiltanne.
      </p>

      <h2>Haut, joihin tähtäämme</h2>
      <ul className="list searches">
        {searches.map(([q, where]) => (
          <li key={q}><strong>{q}</strong><span>{where}</span></li>
        ))}
      </ul>

      <h2>Näin sivu näkyy Googlessa</h2>
      <div className="serp">
        <p className="u">www.elamyslaiva.fi</p>
        <p className="t">Elämyslaiva – saunalaiva Näsijärvellä, Tampere</p>
        <p className="d">Tampereen suurin risteilevä saunalaiva. Puusauna, poreallas, yöpyminen 11 hengelle ja risteilyt Näsijärvellä. Santalahden satama.</p>
      </div>

      <h2>Mitä sivulla on tehty</h2>
      <div className="cards">
        {done.map(([t, d]) => (
          <div key={t} className="card"><b>{t}</b><p>{d}</p></div>
        ))}
      </div>

      <h2>Seuraavat askeleet yhdessä</h2>
      <div className="cards">
        {next.map(([t, d]) => (
          <div key={t} className="card"><b>{t}</b><p>{d}</p></div>
        ))}
      </div>
    </main>
  );
}
