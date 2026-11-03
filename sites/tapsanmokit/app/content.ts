// Every fact here comes from the owner's old site (tapsanmokit.com, read 2026-11-03), the addresses he gave
// Huts.fi, or what his own photos show. Do not add numbers, distances or features that are not in those
// sources. Open questions live in the `ask` lists (preview only).

export type Locale = "fi" | "en";
export type UnitId = "huvila" | "mokki" | "huoneisto";

export const SITE_URL = "https://tapsanmokit.com";
export const HUTS = "https://www.huts.fi";

// next/image and <img> don't add the preview basePath, so photo paths carry it themselves.
const BASE = process.env.BASE_PATH ?? "";

/** True only in the static preview build (PREVIEW_EXPORT=1); never on the live site. */
export const isPreview = process.env.PREVIEW_EXPORT === "1";

type Text = Record<Locale, string>;
type TextList = Record<Locale, string[]>;

export type Photo = { src: string; fi: string; en: string };

function photo(name: string, fi: string, en: string): Photo {
  return { src: `${BASE}/photos/${name}.webp`, fi, en };
}

export const business = {
  name: "Tapsan Mökit",
  owner: "Tapani Nieminen",
  phone: "0400 244 406",
  phoneIntl: "+358400244406",
  email: "tapani.nieminen@tapsanmokit.com",
  orgId: "7c168985-5612-481c-bd44-de115e9650a9",
  region: { fi: "Keski-Suomi", en: "Central Finland" },
};

export const tel = `tel:${business.phoneIntl}`;

export const paths = {
  home: { fi: "/", en: "/en" },
  tub: { fi: "/kylpytynnyri", en: "/en/hot-tub" },
} as const;

export type PriceRow = { when: Text; price: number };

/** A huts.fi place or trail near a unit. Distances are straight lines from huts.fi coordinates (2026-11-03). */
export type Near = { id: string; icon: string; name: Text; km: number };

export type Unit = {
  id: UnitId;
  name: Text;
  slug: Record<Locale, string>;
  street: string;
  postalCode: string;
  locality: string;
  lat: number;
  lng: number;
  /** Shown big on the page: what you can say about capacity without guessing. */
  sleeps: Text;
  /** Owner's own words from the old site, word for word (typos fixed). */
  intro: TextList;
  sections?: { title: Text; text: TextList }[];
  highlights: TextList;
  priceFor: Text;
  prices: PriceRow[];
  /** The owner's existing public Google Calendar for this unit. */
  calendar: string;
  booking: string;
  photos: Photo[];
  near: Near[];
  ask: string[];
};

const gcal = (src: string) =>
  `https://calendar.google.com/calendar/embed?src=${encodeURIComponent(src)}&ctz=Europe%2FHelsinki&wkst=2&showTitle=0&showPrint=0&showTabs=0&showCalendars=0&showTz=0&mode=MONTH`;

const nearAll = {
  sarkilampi: { id: "5c0cd7d8-6d92-4c35-8b46-0f009b2b124e", icon: "bird", name: { fi: "Särkilammen lintutorni", en: "Särkilampi bird tower" } },
  konttivuori: { id: "7151d9ae-bbfa-4088-94fb-06e0ae6808e8", icon: "footprints", name: { fi: "Konttivuoren luontopolku", en: "Konttivuori nature trail" } },
  sivula: { id: "404ca6d3-833b-4676-bef7-cc5df16636cf", icon: "landmark", name: { fi: "Sivulan vanha mylly", en: "Sivula old mill" } },
  aittovuori: { id: "eaa31712-c9b9-4e73-9195-1b912c7301c2", icon: "snowflake", name: { fi: "Aittovuoren hiihtokeskus", en: "Aittovuori ski centre" } },
  nyrolaBeach: { id: "02aa66d7-0b91-4300-9eca-02b49021daa7", icon: "waves", name: { fi: "Nyrölän uimaranta", en: "Nyrölä beach" } },
  sorvanen: { id: "30b454f6-0427-49dd-b706-8155e0caaaff", icon: "bird", name: { fi: "Sorvasen lintutorni", en: "Sorvanen bird tower" } },
  nyrolaTrail: { id: "54380540-bbb5-454c-bdd3-be77087b3ed6", icon: "footprints", name: { fi: "Nyrölän luontopolku", en: "Nyrölä nature trail" } },
  sevenHills: { id: "2877c908-af00-45d6-be60-e692cdca0ca8", icon: "footprints", name: { fi: "Seitsemän kukkulan luontopolku", en: "Seven Hills nature trail" } },
  aviation: { id: "3be076c5-f3e3-48fc-85c3-780aa51b36b5", icon: "plane", name: { fi: "Suomen ilmailumuseo", en: "Finnish Aviation Museum" } },
};
const near = (k: keyof typeof nearAll, km: number): Near => ({ ...nearAll[k], km });

/** Trail ids among the picks (the map draws these as lines). */
export const nearRoutes = [nearAll.konttivuori.id, nearAll.nyrolaTrail.id, nearAll.sevenHills.id];
export const nearPlaces = Object.values(nearAll)
  .map((n) => n.id)
  .filter((id) => !nearRoutes.includes(id));

const commonAsk = ["Wifi? Saako lemmikin tuoda?", "Tulo- ja lähtöaika? Kuuluvatko liinavaatteet ja loppusiivous hintaan?"];

export const units: Record<UnitId, Unit> = {
  huvila: {
    id: "huvila",
    name: { fi: "Huvila Uurainen", en: "Villa Uurainen" },
    slug: { fi: "huvila-uurainen", en: "villa-uurainen" },
    street: "Täkylahdentie 42 B",
    postalCode: "41230",
    locality: "Uurainen",
    lat: 62.4615,
    lng: 25.414,
    sleeps: { fi: "3 mh + alkovi", en: "3 bedrooms + alcove" },
    intro: {
      fi: [
        "Uuraisten huvila on ainutlaatuinen ja tilava mökki, jonka alakerrasta löytyy takkahuone, saunatilat ja lasitettu terassi, keittiö ja 1 x mh. Yläkerrasta löytyy 2 x mh, alkovi, aula sekä parveke.",
      ],
      en: [
        "The Uurainen villa is a unique and spacious cottage. Downstairs you'll find a fireplace room, the sauna, a glazed terrace, the kitchen and one bedroom. Upstairs are two bedrooms, an alcove, a hall and a balcony.",
      ],
    },
    sections: [
      {
        title: { fi: "Ranta", en: "The shore" },
        text: {
          fi: [
            "Matala ranta, joka avautuu itään.",
            "Veden syvyys on 20 metrin päässä rannasta noin 1 metri ja ranta syvenee tasaisesti, joten se on ihanteellinen myös lapsiperheille.",
          ],
          en: [
            "A shallow shore that opens to the east.",
            "20 metres out the water is about 1 metre deep, and it deepens evenly, so it is ideal for families with children too.",
          ],
        },
      },
      {
        title: { fi: "Iso-Uurainen", en: "Lake Iso-Uurainen" },
        text: {
          fi: [
            "Iso-Uurainen järvi, jonka rannalla mökki sijaitsee, on kooltaan 2 km x 5 km. Järven kalalajit ovat: särki, hauki, ahven, kuha, siika, made.",
            "Järvessä on asumattomia saaria, joihin voi mökiltä mennä veneellä kalastamaan tai retkeilemään.",
          ],
          en: [
            "Lake Iso-Uurainen, on whose shore the cottage stands, is 2 km by 5 km. Its fish are roach, pike, perch, zander, whitefish and burbot.",
            "The lake has uninhabited islands you can reach by boat from the cottage, to fish or for a day trip.",
          ],
        },
      },
    ],
    highlights: {
      fi: [
        "flame|Takkahuone, lasiluukullinen takka",
        "bath|Saunatilat ja suihku",
        "sun|Lasitettu terassi ja parveke",
        "bed|3 makuuhuonetta ja alkovi",
        "waves|Matala, lapsiystävällinen ranta",
        "fish|Kalastusta ja saaria Iso-Uuraisella",
        "presentation|Yläkerta kokousasettelussa",
        "shirt|Pyykinpesukone",
      ],
      en: [
        "flame|Fireplace room with a glass-door fireplace",
        "bath|Sauna and shower",
        "sun|Glazed terrace and balcony",
        "bed|3 bedrooms and an alcove",
        "waves|Shallow, child-friendly shore",
        "fish|Fishing and islands on Lake Iso-Uurainen",
        "presentation|Upstairs can be set up for meetings",
        "shirt|Washing machine",
      ],
    },
    priceFor: { fi: "Hinnat alkaen, 1–4 henkeä", en: "Prices from, 1–4 guests" },
    prices: [
      { when: { fi: "1 vrk (arkisin)", en: "1 night (weekdays)" }, price: 285 },
      { when: { fi: "ma–pe", en: "Mon–Fri" }, price: 870 },
      { when: { fi: "pe–su", en: "Fri–Sun" }, price: 650 },
      { when: { fi: "Viikko (su–su)", en: "Week (Sun–Sun)" }, price: 1280 },
    ],
    calendar: gcal("ml20li57nprn09t6tglvv4p55g@group.calendar.google.com"),
    booking: "https://www.booking.com/hotel/fi/takylahden-loma-asunto.html",
    photos: [
      photo("huvila-ulkoa", "Huvila ja piha", "The villa and its yard"),
      photo("huvila-takka", "Lasiluukullinen takka", "Glass-door fireplace"),
      photo("huvila-terassi", "Näkymä lasitetulta terassilta", "View from the glazed terrace"),
      photo("huvila-sohva", "Alakerran sohvaryhmä", "Downstairs lounge"),
      photo("huvila-jarvi", "Maisema järvelle", "View over the lake"),
      photo("huvila-sauna", "Sauna", "Sauna"),
      photo("huvila-keittio", "Keittiö", "Kitchen"),
      photo("huvila-alakerta", "Alakerran takka ja televisio", "Downstairs fireplace and TV"),
      photo("huvila-mh1", "Yläkerran ensimmäinen makuuhuone", "First upstairs bedroom"),
      photo("huvila-mh2", "Yläkerran toinen makuuhuone", "Second upstairs bedroom"),
      photo("huvila-mh3", "Alakerran makuuhuone", "Downstairs bedroom"),
      photo("huvila-alkovi", "Kokousasettelu ja yläkerran alkovi", "Meeting layout and the upstairs alcove"),
      photo("huvila-kokous", "Yläkerta kokousasettelussa", "Upstairs set up for a meeting"),
      photo("huvila-parveke", "Tarjoilut parvekkeella", "Serving on the balcony"),
      photo("huvila-sisaankaynti", "Sisäänkäynti", "Entrance"),
      photo("huvila-suihku", "Suihku", "Shower"),
      photo("huvila-wc", "WC", "Toilet"),
      photo("huvila-pyykki", "Pyykinpesukone", "Washing machine"),
      photo("huvila-uimaranta", "Uimaranta", "The beach"),
    ],
    near: [near("sarkilampi", 1.6), near("konttivuori", 4.0), near("sivula", 4.5), near("aittovuori", 4.6)],
    ask: [
      "Montako henkeä huvilaan mahtuu yöpymään? Paljonko maksaa 5. henkilö ja siitä eteenpäin?",
      "Kokoukset: montako henkeä yläkerran kokoustilaan mahtuu? Onko näyttö tai tykki?",
      "Kuuluuko vene huvilaan?",
      ...commonAsk,
      "Isompi kuva rannasta, ja kuva huvilasta järveltä päin.",
    ],
  },
  mokki: {
    id: "mokki",
    name: { fi: "Mökki Jyväskylä", en: "Cottage Jyväskylä" },
    slug: { fi: "mokki-jyvaskyla", en: "cottage-jyvaskyla" },
    street: "Sikomäentie 365",
    postalCode: "41140",
    locality: "Kuikka",
    lat: 62.3824,
    lng: 25.524,
    sleeps: { fi: "4 + 2 ja piharakennus", en: "4 + 2, plus a guest house" },
    intro: {
      fi: [
        "Pyöröhirsimökki lammen rannalla. Kohteessa sähköt ja juokseva vesi. Tie perille saakka. Mökissä tupakeittiö, parvi, parveke ja kuisti. Nukkumapaikkoja 4+2. Rakennuksessa toisella sisäänkäynnillä WC, suihku ja sauna.",
      ],
      en: [
        "A round-log cottage on the shore of a pond, with electricity and running water and a road all the way. The cottage has a kitchen-living room, a loft, a balcony and a porch, and sleeps 4+2. A second entrance in the same building leads to the toilet, shower and sauna.",
      ],
    },
    sections: [
      {
        title: { fi: "Piharakennus ja grillikota", en: "Guest house and grill hut" },
        text: {
          fi: [
            "Kohteessa lisäksi umpinainen iso grillirakennus kotakeittiöllä (17 m²) sekä piharakennus, jossa nukkumapaikkoja yhteensä 4 + 2. Rauhallinen sijainti, lammen rannalla ei muita mökkejä.",
          ],
          en: [
            "There is also a large enclosed grill hut with a kota kitchen (17 m²) and a guest house sleeping 4 + 2 in all. A quiet spot: there are no other cottages on the pond.",
          ],
        },
      },
    ],
    highlights: {
      fi: [
        "home|Pyöröhirsimökki lammen rannalla",
        "bath|Sauna, suihku ja WC",
        "flame|Grillikota kotakeittiöllä, 17 m²",
        "bed|Piharakennus ja lisää nukkumapaikkoja",
        "sailboat|Vene",
        "car|Tie perille saakka",
        "utensils|Sähköhella, jääkaappi, mikro ja astianpesukone",
        "shirt|Pyykinpesukone, ulkogrilli ja varaava takka",
      ],
      en: [
        "home|Round-log cottage on a pond",
        "bath|Sauna, shower and toilet",
        "flame|Grill hut with a kota kitchen, 17 m²",
        "bed|Guest house with more beds",
        "sailboat|Boat",
        "car|Road all the way",
        "utensils|Electric stove, fridge, microwave and dishwasher",
        "shirt|Washing machine, outdoor grill and a heat-storing fireplace",
      ],
    },
    priceFor: { fi: "Hinnat alkaen, 1–4 henkeä", en: "Prices from, 1–4 guests" },
    prices: [
      { when: { fi: "1 vrk (arkisin)", en: "1 night (weekdays)" }, price: 140 },
      { when: { fi: "ma–pe", en: "Mon–Fri" }, price: 420 },
      { when: { fi: "pe–su", en: "Fri–Sun" }, price: 390 },
      { when: { fi: "Viikko (su–su)", en: "Week (Sun–Sun)" }, price: 530 },
    ],
    calendar: gcal("k06kc92dppmmvap7acf02u3qu4@group.calendar.google.com"),
    booking: "https://www.booking.com/hotel/fi/kuikan-mokki.html",
    photos: [
      photo("mokki-ilta", "Mökki ja kuisti illalla", "The cottage and porch in the evening"),
      photo("mokki-olohuone", "Olohuone", "Living room"),
      photo("mokki-keittio", "Keittiö ja varaava takka", "Kitchen and fireplace"),
      photo("mokki-kota-ulkoa", "Grillikota ulkoa", "The grill hut from outside"),
      photo("mokki-grillikota", "Grillikota", "Inside the grill hut"),
      photo("mokki-kota", "Mökki ja kota", "The cottage and the kota"),
      photo("mokki-parvi", "Parvi", "The loft"),
      photo("mokki-lauteet", "Saunan lauteet", "Sauna benches"),
      photo("mokki-pesuhuone", "WC, suihku ja sauna", "Toilet, shower and sauna"),
      photo("mokki-kotakeittio", "Grillikota, kotakeittiö", "The kota kitchen"),
      photo("mokki-piharakennus1", "Piharakennus, makuuhuone", "Guest house bedroom"),
      photo("mokki-piharakennus2", "Piharakennus, makuuhuone", "Guest house bedroom"),
    ],
    near: [near("nyrolaBeach", 1.2), near("sorvanen", 1.3), near("nyrolaTrail", 2.7), near("sevenHills", 4.5), near("aviation", 8.2)],
    ask: [
      "Montako nukkumapaikkaa on yhteensä (mökki 4+2 ja piharakennus 4+2)? Paljonko maksaa 5. henkilö ja siitä eteenpäin?",
      "Mikä lampi on nimeltään?",
      "Onko sauna puu- vai sähkölämmitteinen?",
      ...commonAsk,
      "Kesäkuva mökistä päivällä ja kuva lammelta.",
    ],
  },
  huoneisto: {
    id: "huoneisto",
    name: { fi: "Huoneisto Tikkakoski", en: "Apartment Tikkakoski" },
    slug: { fi: "huoneisto-tikkakoski", en: "apartment-tikkakoski" },
    street: "Tikkakoskentie 527",
    postalCode: "41140",
    locality: "Kuikka",
    lat: 62.38816,
    lng: 25.60673,
    sleeps: { fi: "5 henkeä", en: "Sleeps 5" },
    intro: {
      fi: [
        "Huoneisto sijaitsee Jyväskylän Tikkakoskella.",
        "Huoneistossa majoituspaikat viidelle hengelle. Yksi parivuode, kahden hengen makuuhuone ja yhden hengen makuuhuone.",
        "Hyvin varusteltu keittiö, jossa on jääkaappi, astianpesukone, keittolevy, uuni ja mikroaaltouuni. Lisäksi televisio ja kirjoituspöytä sekä ruokailuryhmä. Huoneistossa WC, suihku ja sauna Harvian aina valmiilla kiukaalla.",
        "Lähistöllä voi harrastaa hiihtoa.",
        "Jyväskylän keskusta on 18 km:n ja Jyväskylän lentoasema 4 km:n päässä huoneistolta.",
      ],
      en: [
        "The apartment is in Tikkakoski, Jyväskylä.",
        "It sleeps five: one double bed, a twin bedroom and a single bedroom.",
        "A well-equipped kitchen with a fridge, dishwasher, hob, oven and microwave. There is also a TV, a desk and a dining table. The apartment has its own toilet, shower and a sauna with an always-ready Harvia stove.",
        "You can go skiing nearby.",
        "Jyväskylä city centre is 18 km and Jyväskylä Airport 4 km away.",
      ],
    },
    highlights: {
      fi: [
        "users|Viidelle hengelle",
        "bed|Parivuode, 2 hh ja 1 hh",
        "flame|Oma sauna, Harvian aina valmis kiuas",
        "utensils|Keittiö: astianpesukone, uuni ja mikro",
        "monitor|TV ja kirjoituspöytä",
        "plane|Lentoasema 4 km, keskusta 18 km",
      ],
      en: [
        "users|Sleeps five",
        "bed|Double bed, twin and single rooms",
        "flame|Private sauna with an always-ready Harvia stove",
        "utensils|Kitchen with dishwasher, oven and microwave",
        "monitor|TV and a desk",
        "plane|Airport 4 km, city centre 18 km",
      ],
    },
    priceFor: { fi: "Hinnat alkaen, 1–3 henkeä", en: "Prices from, 1–3 guests" },
    prices: [{ when: { fi: "1 vrk", en: "1 night" }, price: 135 }],
    calendar: gcal("r7539s12j3mfou76malqtd9nog@group.calendar.google.com"),
    booking: "https://www.booking.com/hotel/fi/lahdelehdon-lomahuoneisto.html",
    photos: [
      photo("huoneisto-parisanky", "Parisänky", "Double bed"),
      photo("huoneisto-keittio", "Keittiö", "Kitchen"),
      photo("huoneisto-sohva", "Sohvaryhmä", "Lounge"),
      photo("huoneisto-sauna", "Sauna ja aina valmis Harvian kiuas", "Sauna with an always-ready Harvia stove"),
      photo("huoneisto-ruokailu", "Ruokailuryhmä", "Dining table"),
      photo("huoneisto-2hh", "Kahden hengen huone", "Twin room"),
      photo("huoneisto-1hh", "Yhden hengen makuuhuone", "Single room"),
      photo("huoneisto-tv", "TV ja kirjoituspöytä", "TV and desk"),
      photo("huoneisto-eteinen", "Eteinen", "Hallway"),
      photo("huoneisto-wc", "WC", "Toilet"),
    ],
    near: [near("sevenHills", 0.6), near("aviation", 3.9), near("sorvanen", 5.2), near("nyrolaBeach", 5.5), near("nyrolaTrail", 6.3)],
    ask: [
      "Hinta 4–5 hengelle? Viikko- tai kuukausihinta työmatkalaisille?",
      "Onko huoneisto omakotitalon yhteydessä? Kuva talosta ulkoa ja sisäänkäynnistä.",
      "Pysäköinti?",
      ...commonAsk,
    ],
  },
};

export const unitList: Unit[] = [units.huvila, units.mokki, units.huoneisto];

export const unitPath = (u: Unit, locale: Locale) => (locale === "fi" ? `/${u.slug.fi}` : `/en/${u.slug.en}`);
export const fromPrice = (u: Unit) => Math.min(...u.prices.map((p) => p.price));

export const tub = {
  name: { fi: "Kylpytynnyri", en: "Hot tub" },
  prices: [
    { when: { fi: "Arkisin", en: "Weekdays" }, price: 80 },
    { when: { fi: "Viikonloppuna", en: "Weekends" }, price: 140 },
  ] as PriceRow[],
  // Owner's words from the old site (typo "vuokrataaan" fixed).
  text: {
    fi: [
      "Vuokraamme siirrettävää paljua mökkivieraidemme lisäksi myös muille. Palju on noudettavissa tai halutessanne toimitamme kärryn perille asti. Kylpytynnyri vuokrataan aina puhdistettuna.",
      "Pidemmistä vuokrauksista ja mökkivarauksiin yhdistämisistä pyydä tarjous.",
    ],
    en: [
      "We rent out our mobile hot tub to our cottage guests and to anyone else. Pick it up yourself, or we deliver the trailer to your door. The tub is always cleaned before each rental.",
      "Ask us for a quote for longer rentals or to add it to a cottage booking.",
    ],
  },
  calendar: gcal("hfe1sfj7m7ovg4v82e5p503gmo@group.calendar.google.com"),
  photos: [photo("palju-karry", "Palju kärryssä", "The hot tub on its trailer"), photo("palju-sisalta", "Palju", "The hot tub")],
  ask: ["Montako henkeä paljuun mahtuu?", "Paljonko toimitus maksaa, ja kuinka kauas toimitatte?", "Onko palju puulämmitteinen? Kauanko lämmitys kestää?"],
};

export const embed = (locale: Locale) =>
  `${HUTS}/embed/${locale === "fi" ? "suomi" : "finland"}/org/${business.orgId}?address=1&hideAttr=1&places=${nearPlaces.join(",")}&routes=${nearRoutes.join(",")}`;

export const euro = (n: number, locale: Locale) => (locale === "fi" ? `${n} €` : `€${n}`);
export const km = (n: number, locale: Locale) => `${locale === "fi" ? String(n).replace(".", ",") : n} km`;

export function splitIcon(entry: string): [string, string] {
  const i = entry.indexOf("|");
  return i < 0 ? ["check", entry] : [entry.slice(0, i), entry.slice(i + 1)];
}

export const ui = {
  fi: {
    nav: { tub: "Kylpytynnyri", contact: "Yhteystiedot", book: "Pyydä tarjous" },
    homeTitle: "Mökit ja huoneisto Jyväskylässä ja Uuraisilla | Tapsan Mökit",
    homeDescription:
      "Vuokraa huvila Iso-Uuraisen rannalta, pyöröhirsimökki lammen rannalta Kuikasta tai saunallinen huoneisto Tikkakoskelta. Siirrettävä palju vuokralle Jyväskylässä. Varaa suoraan omistajalta.",
    h1: "Mökit ja huoneisto Jyväskylässä ja Uuraisilla",
    lead: "Huvila Iso-Uuraisen rannalla, pyöröhirsimökki lammen rannalla ja saunallinen huoneisto Tikkakoskella. Lisäksi siirrettävä palju vuokralle.",
    from: "alkaen",
    perNight: "/ vrk",
    perDay: "/ vrk",
    week: "Viikko",
    guests: "Majoitus",
    see: "Katso",
    tubTitle: "Kylpytynnyri vuokralle",
    tubLead: "Nouda itse tai toimitamme kärryn perille. Myös muille kuin mökkivieraille.",
    tubMeta: "Kylpytynnyrin vuokraus Jyväskylässä | Tapsan Mökit",
    tubDescription:
      "Siirrettävä palju vuokralle Jyväskylässä: 80 € / vrk arkisin, 140 € / vrk viikonloppuna. Nouto tai toimitus, aina puhdistettuna. Myös muille kuin mökkivieraille.",
    tubH1: "Kylpytynnyrin vuokraus Jyväskylässä",
    mapTitle: "Kartalla",
    mapCredit: "Kartta:",
    near: "Lähellä",
    prices: "Hinnasto",
    calendar: "Varaustilanne",
    has: "Mitä löytyy",
    others: "Muut kohteet",
    onBooking: "Myös Booking.comissa",
    directions: "Reittiohjeet",
    contactTitle: "Yhteystiedot",
    faqTitle: "Usein kysyttyä",
    faq: [
      {
        q: "Missä kohteet ovat?",
        a: "Huvila on Iso-Uuraisen rannalla, Täkylahdentie 42 B, Uurainen. Mökki on lammen rannalla, Sikomäentie 365, Kuikka. Huoneisto on Tikkakoskella, Tikkakoskentie 527, 18 km Jyväskylän keskustasta ja 4 km lentoasemalta.",
      },
      {
        q: "Montako henkeä kohteisiin mahtuu?",
        a: "Huoneistossa on majoitus viidelle. Mökissä on nukkumapaikat 4+2, ja piharakennuksessa lisää. Huvilassa on kolme makuuhuonetta ja alkovi. Isommalle porukalle pyydä tarjous.",
      },
      {
        q: "Voiko paljun vuokrata ilman mökkiä?",
        a: "Voi. Palju on 80 € / vrk arkisin ja 140 € / vrk viikonloppuna. Sen voi noutaa, tai toimitamme kärryn perille.",
      },
      {
        q: "Miten varaan?",
        a: "Soita 0400 244 406 tai lähetä tarjouspyyntö kohteen sivulta. Varaustilanteesta näet varatut päivät.",
      },
    ],
    inquiryTitle: "Tarjouspyyntö",
    which: "Kohde",
    arrive: "Tulopäivä",
    leave: "Lähtöpäivä",
    people: "Henkeä",
    purpose: "Käyttötarkoitus",
    purposes: ["Lomamatka", "Työmatka", "Juhla", "Muu"],
    day: "Päivä",
    pickup: "Nouto vai toimitus",
    pickups: ["Nouto", "Toimitus"],
    where: "Toimitusosoite",
    send: "Lähetä sähköpostilla",
    mailSubject: "Tarjouspyyntö",
    mailHello: "Hei,\n\nHaluaisin tarjouksen.\n\n",
    mailBye: "\nTerveisin,\n",
    sticky: { call: "Soita", book: "Pyydä tarjous" },
    close: "Sulje",
    prev: "Edellinen",
    next: "Seuraava",
    gallery: "Kaikki kuvat",
    askTitle: "Kysytään Tapanilta",
    hostsTitle: "Tervetuloa",
    hostsText: "Kuva sinusta ja pari lausetta: kuka vieraat ottaa vastaan.",
    previewTag: "Lisätään sinulta",
    homeAsk: [
      "Alkuperäiset kuvat puhelimesta tai kamerasta. Vanhan sivun kuvat ovat pieniä, ja isolla näytöllä ne näyttävät sumeilta.",
      "Ovatko hinnat voimassa vuonna 2027?",
      "Miten pidät Google-kalenterit ja Booking.comin samassa tahdissa? Kopioitko varaukset käsin?",
      "Oletko Booking.comin lisäksi Airbnb:ssä tai muualla?",
      "Lähetä Booking.comin kalenterin vientilinkki (iCal) jokaisesta kohteesta, niin Booking-varaukset näkyvät sivuilla itsestään.",
      "Haluatko, että vieras voi maksaa varauksen kortilla suoraan sivuilla?",
      "Y-tunnus sivun alalaitaan.",
    ],
    madeBy: "Sivut:",
    home: "Etusivu",
  },
  en: {
    nav: { tub: "Hot tub", contact: "Contact", book: "Ask for a quote" },
    homeTitle: "Holiday cottages and an apartment near Jyväskylä, Finland | Tapsan Mökit",
    homeDescription:
      "Rent a lakeside villa on Lake Iso-Uurainen, a round-log cottage on a quiet pond in Kuikka, or an apartment with a sauna in Tikkakoski, near Jyväskylä. Mobile hot tub for rent. Book direct with the owner.",
    h1: "Cottages and an apartment near Jyväskylä",
    lead: "A villa on Lake Iso-Uurainen, a round-log cottage on a quiet pond and an apartment with its own sauna in Tikkakoski. Plus a mobile hot tub for rent.",
    from: "from",
    perNight: "/ night",
    perDay: "/ day",
    week: "Week",
    guests: "Sleeps",
    see: "See",
    tubTitle: "Hot tub for rent",
    tubLead: "Pick it up or we deliver the trailer. Open to everyone, not just our guests.",
    tubMeta: "Hot tub rental in Jyväskylä, Finland | Tapsan Mökit",
    tubDescription:
      "Mobile hot tub for rent in Jyväskylä, Finland: €80 a day on weekdays, €140 a day at weekends. Pick-up or delivery, always cleaned. Open to everyone.",
    tubH1: "Hot tub rental in Jyväskylä",
    mapTitle: "On the map",
    mapCredit: "Map powered by",
    near: "Nearby",
    prices: "Prices",
    calendar: "Availability",
    has: "What's there",
    others: "Our other places",
    onBooking: "Also on Booking.com",
    directions: "Directions",
    contactTitle: "Contact",
    faqTitle: "Questions",
    faq: [
      {
        q: "Where are the places?",
        a: "The villa is on Lake Iso-Uurainen at Täkylahdentie 42 B, Uurainen. The cottage is on a pond at Sikomäentie 365, Kuikka. The apartment is in Tikkakoski at Tikkakoskentie 527, 18 km from Jyväskylä city centre and 4 km from the airport.",
      },
      {
        q: "How many people do they sleep?",
        a: "The apartment sleeps five. The cottage sleeps 4+2, with more beds in the guest house. The villa has three bedrooms and an alcove. For a bigger group, ask for a quote.",
      },
      {
        q: "Can I rent the hot tub on its own?",
        a: "Yes. It is €80 a day on weekdays and €140 a day at weekends. Pick it up, or we deliver the trailer.",
      },
      {
        q: "How do I book?",
        a: "Call +358 400 244 406 or send a quote request from the place's page. The availability calendar shows the booked days.",
      },
    ],
    inquiryTitle: "Ask for a quote",
    which: "Place",
    arrive: "Arrival",
    leave: "Departure",
    people: "Guests",
    purpose: "Purpose",
    purposes: ["Holiday", "Work trip", "Party", "Other"],
    day: "Date",
    pickup: "Pick-up or delivery",
    pickups: ["Pick-up", "Delivery"],
    where: "Delivery address",
    send: "Send by email",
    mailSubject: "Quote request",
    mailHello: "Hello,\n\nI would like a quote.\n\n",
    mailBye: "\nBest regards,\n",
    sticky: { call: "Call", book: "Ask for a quote" },
    close: "Close",
    prev: "Previous",
    next: "Next",
    gallery: "All photos",
    askTitle: "Questions for Tapani",
    hostsTitle: "Welcome",
    hostsText: "A photo of you and a few lines: who welcomes the guests.",
    previewTag: "To be added by you",
    homeAsk: [
      "Original photos from your phone or camera. The old site's photos are small and look blurry on a big screen.",
      "Are the prices valid in 2027?",
      "How do you keep your Google calendars in step with Booking.com? Do you copy bookings by hand?",
      "Besides Booking.com, are you on Airbnb or anywhere else?",
      "Send us Booking.com's calendar export link (iCal) for each place, and Booking.com bookings will show on the site by themselves.",
      "Would you like guests to be able to pay for a booking by card right on the site?",
      "Business ID for the footer.",
    ],
    madeBy: "Site by",
    home: "Home",
  },
};

export const unitMeta = (u: Unit, locale: Locale) => {
  const from = fromPrice(u);
  const fi = {
    huvila: {
      title: "Huvila Iso-Uuraisen rannalla, Uurainen | Tapsan Mökit",
      description: `Vuokraa tilava huvila Iso-Uuraisen rannalta: takkahuone, sauna, lasitettu terassi, 3 makuuhuonetta ja matala ranta. Alkaen ${from} € / vrk. Uurainen, Keski-Suomi.`,
    },
    mokki: {
      title: "Pyöröhirsimökki lammen rannalla, Jyväskylä | Tapsan Mökit",
      description: `Vuokramökki Jyväskylän Kuikassa: pyöröhirsimökki lammen rannalla, sauna, grillikota, piharakennus ja vene. Alkaen ${from} € / vrk, viikko 530 €.`,
    },
    huoneisto: {
      title: "Huoneisto saunalla, Tikkakoski, Jyväskylä | Tapsan Mökit",
      description: `Saunallinen huoneisto viidelle Tikkakoskella, 4 km Jyväskylän lentoasemalta ja 18 km keskustasta. Alkaen ${from} € / vrk. Sopii lomalle ja työmatkalle.`,
    },
  };
  const en = {
    huvila: {
      title: "Lakeside villa on Lake Iso-Uurainen, Uurainen, Finland | Tapsan Mökit",
      description: `Rent a spacious villa on Lake Iso-Uurainen: fireplace room, sauna, glazed terrace, 3 bedrooms and a shallow shore. From €${from} a night. Central Finland.`,
    },
    mokki: {
      title: "Round-log cottage on a pond near Jyväskylä, Finland | Tapsan Mökit",
      description: `A round-log cottage on a quiet pond in Kuikka, Jyväskylä: sauna, grill hut, guest house and boat. From €${from} a night, €530 a week.`,
    },
    huoneisto: {
      title: "Apartment with sauna in Tikkakoski, Jyväskylä, Finland | Tapsan Mökit",
      description: `An apartment with its own sauna for five in Tikkakoski, 4 km from Jyväskylä Airport and 18 km from the city centre. From €${from} a night.`,
    },
  };
  return (locale === "fi" ? fi : en)[u.id];
};
