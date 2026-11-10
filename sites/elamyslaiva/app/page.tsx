/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import { TapVideo } from "@/app/components/Video";
import {
  ask, business, extras, faq, features, gallery, included, isPreview, offers, photo, photos, SITE_URL, vatNote, videos,
} from "@/app/content";

const title = "Elämyslaiva – saunalaiva Näsijärvellä, Tampere";
const description =
  "Tampereen suurin risteilevä saunalaiva. Puusauna, poreallas, yöpyminen 11 hengelle ja risteilyt Näsijärvellä. Santalahden satama.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/" },
  openGraph: { title, description, url: "/", siteName: "Elämyslaiva", locale: "fi_FI", type: "website", images: [{ url: "/photos/laiva.jpg" }] },
};

const phone = business.phones[0];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["LocalBusiness", "TouristAttraction"],
      "@id": `${SITE_URL}/#laiva`,
      name: business.name,
      description,
      url: SITE_URL,
      image: `${SITE_URL}/photos/laiva.jpg`,
      telephone: phone.tel,
      email: business.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: business.street,
        postalCode: business.postalCode,
        addressLocality: business.city,
        addressCountry: "FI",
      },
      amenityFeature: features.map(([a, b]) => ({ "@type": "LocationFeatureSpecification", name: `${a} ${b}`, value: true })),
      makesOffer: offers.map((o) => ({ "@type": "Offer", name: o.name, description: o.text, priceCurrency: "EUR" })),
      sameAs: Object.values(business.social),
    },
    {
      "@type": "FAQPage",
      mainEntity: faq.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
    },
  ],
};

function Ask({ items }: { items: string[] }) {
  if (!isPreview || items.length === 0) return null;
  return (
    <div className="ask">
      <p className="ask-title">Kysytään teiltä</p>
      <ul>
        {items.map((i) => (
          <li key={i}>{i}</li>
        ))}
      </ul>
    </div>
  );
}

export default function Home() {
  const hero = videos.hero;
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <header className="top">
        <div className="wrap top-in">
          <a className="brand" href="#">Elämyslaiva</a>
          <a className="btn btn-neon btn-sm" href={business.booking} target="_blank" rel="noopener">Varaa</a>
        </div>
      </header>

      <main>
        <div className="hero">
          {hero.file ? (
            <div className="hero-media">
              <video src={hero.file} poster={photo("laiva")} autoPlay muted loop playsInline />
            </div>
          ) : (
            <TapVideo className="hero-media" id={hero.yt} title={hero.title} poster={photo("laiva")} alt={photos.laiva} label={`Katso video ${hero.length}`} />
          )}
          <div className="wrap hero-text">
            <h1>Tampereen suurin risteilevä saunalaiva</h1>
            <p className="muted">Santalahden satama, Näsijärvi</p>
            <div className="ctas">
              <a className="btn btn-neon" href={business.booking} target="_blank" rel="noopener">Katso vapaat päivät</a>
              <a className="btn btn-line" href={`tel:${phone.tel}`}>{phone.show}</a>
            </div>
            <Ask items={ask.hero} />
          </div>
        </div>

        <section id="hinnat" className="wrap">
          <h2>Hinnat</h2>
          <div className="offers">
            {offers.map((o) => (
              <article key={o.name} className="offer">
                <div className="offer-top">
                  <h3>{o.name}</h3>
                  <span className="price">{o.price} <small>{o.note}</small></span>
                </div>
                <p>{o.text}</p>
              </article>
            ))}
          </div>
          <p className="fine">{vatNote}</p>
          <Ask items={ask.prices} />
        </section>

        <section id="laivalla" className="wrap">
          <h2>Laivalla</h2>
          <div className="feats">
            {features.map(([b, s]) => (
              <div key={b} className="feat"><b>{b}</b><span>{s}</span></div>
            ))}
          </div>
          <Ask items={ask.features} />
        </section>

        <section id="kuvat" aria-label="Kuvia laivalta">
          <div className="strip">
            {gallery.map((k) => (
              <img key={k} src={photo(k)} alt={photos[k]} loading="lazy" decoding="async" />
            ))}
          </div>
          <div className="wrap"><Ask items={ask.gallery} /></div>
        </section>

        <section id="video" className="wrap party">
          <TapVideo className="lite" id={videos.party.yt} title={videos.party.title} poster={photo("bileet-video")} alt="" />
          <div className="stack">
            <h2>Polttarit, synttärit, firman ilta</h2>
            <p className="muted">Tuo omat ruoat tai tilaa catering. Grilli on laiturilla, karaoke sisällä.</p>
          </div>
        </section>

        <section id="lisat" className="wrap lists">
          <div>
            <h3 className="lh">Sisältyy hintaan</h3>
            <ul className="list">{included.map((i) => <li key={i}><span>{i}</span><span>✓</span></li>)}</ul>
          </div>
          <div>
            <h3 className="lh">Lisäpalvelut</h3>
            <ul className="list">{extras.map(([a, b]) => <li key={a}><span>{a}</span><span>{b}</span></li>)}</ul>
          </div>
        </section>

        <section id="varjoliito" className="wrap fly">
          <img src={photo("varjoliito")} alt={photos.varjoliito} loading="lazy" />
          <div className="stack">
            <h2>Varjoliito Näsijärven yllä</h2>
            <p className="muted">Tandemlento 600–900 metrissä laivan lähellä, Extreme Team Tampere ry:n kanssa. Lennot säävarauksella.</p>
            <p><a className="btn btn-line" href={business.extremeTeam} target="_blank" rel="noopener">extremeteam.fi</a></p>
          </div>
        </section>

        <section id="kysymykset" className="wrap">
          <h2>Usein kysyttyä</h2>
          <div className="faq">
            {faq.map(([q, a]) => (
              <details key={q}>
                <summary>{q}</summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </section>

        <section id="yhteys" className="wrap find">
          <div>
            <iframe
              className="map"
              src={`https://www.huts.fi/embed/suomi/org/${business.hutsOrg}?hideAttr=1`}
              title="Elämyslaiva kartalla"
              loading="lazy"
            />
            <p className="credit"><a href={business.hutsUrl}>Huts.fi</a> · © Maanmittauslaitos</p>
          </div>
          <div className="contact">
            <h2>Tervetuloa</h2>
            <p className="muted">Aallonmurtajan päässä Santalahden satamassa. Ratikkapysäkki sataman kohdalla, pysäköinti aallonmurtajalla.</p>
            <span className="lbl">Osoite</span>
            <a href={business.mapsUrl} target="_blank" rel="noopener">{business.street}, {business.postalCode} {business.city}</a>
            {business.phones.map((p) => (
              <span key={p.tel} className="pair"><span className="lbl">{p.who}</span><a href={`tel:${p.tel}`}>{p.show}</a></span>
            ))}
            <span className="lbl">Sähköposti</span>
            <a href={`mailto:${business.email}`}>{business.email}</a>
            <div className="social">
              {Object.entries(business.social).map(([name, url]) => (
                <a key={name} href={url} target="_blank" rel="noopener">{name}</a>
              ))}
            </div>
            <Ask items={ask.contact} />
          </div>
        </section>
      </main>

      <footer className="wrap foot">Elämyslaiva · {business.street}, {business.postalCode} {business.city}</footer>
      <nav className="bar" aria-label="Varaa tai soita">
        <a className="btn btn-neon" href={business.booking} target="_blank" rel="noopener">Varaa</a>
        <a className="btn btn-line" href={`tel:${phone.tel}`}>Soita</a>
      </nav>
    </>
  );
}
