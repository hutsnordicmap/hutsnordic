// Every fact here comes from the owner's old site (mokkiloma.fi, read 2026-10-31), his emails to Huts.fi
// (addresses of each cottage, 30.10.2026) or what his own photos show. Do not add numbers, distances or
// features that are not in those sources. Open questions live in the `ask` lists (preview only).

export type Locale = "fi" | "en";
export type CottageId = "elimaki" | "meritahti" | "merenneito" | "meripoika" | "poytakallio" | "fransula";

export const SITE_URL = "https://www.mokkiloma.fi";
export const HUTS = "https://www.huts.fi";

// next/image and <img> don't add the preview basePath, so photo paths carry it themselves.
const BASE = process.env.BASE_PATH ?? "";

/** True only in the static preview build (PREVIEW_EXPORT=1); never on the live site. */
export const isPreview = process.env.PREVIEW_EXPORT === "1";

type Text = Record<Locale, string>;
type TextList = Record<Locale, string[]>;

export type Photo = { lg: string; sm: string; fi: string; en: string };

function photo(name: string, fi: string, en: string): Photo {
  return { lg: `${BASE}/photos/lg/${name}.webp`, sm: `${BASE}/photos/sm/${name}.webp`, fi, en };
}

export const business = {
  name: "Elijärven Mökkilomat",
  owner: "Mika Merilä",
  street: "Meriläntie 24",
  postalCode: "21900",
  village: "Yläne",
  municipality: "Pöytyä",
  region: { fi: "Varsinais-Suomi", en: "Southwest Finland" },
  phones: ["0400 534 973", "(02) 256 8604"],
  phonesIntl: ["+358400534973", "+35822568604"],
  email: "mikameri@netti.fi",
  lat: 60.881566,
  lng: 22.258267,
  orgId: "3558662c-fa25-4783-939d-b9526173a074",
  youtube: "l_uFxbHQtfQ",
  youtubeStart: 26,
};

export const tel = (i: number) => `tel:${business.phonesIntl[i]}`;

export const paths = {
  home: { fi: "/", en: "/en" },
  cottages: { fi: "/mokit", en: "/en/cottages" },
  activities: { fi: "/aktiviteetit", en: "/en/activities" },
  sauna: { fi: "/aktiviteetit/savusauna", en: "/en/activities/smoke-sauna" },
  booking: { fi: "/varaus", en: "/en/booking" },
} as const;

export type Season = { when: Text; price: number };

export type Cottage = {
  id: CottageId;
  name: string;
  slug: Record<Locale, string>;
  hutsSlug: string;
  guests: number;
  tagline: Text;
  bestFor: Text;
  where: Text;
  address: string;
  lat: number;
  lng: number;
  intro: Text;
  highlights: TextList;
  weeks: Season[];
  weekend: number;
  extras?: TextList;
  photos: Photo[];
  ask: string[];
};

export const priceNote = {
  fi: "Vuorokausihinnat sopimuksen mukaan.",
  en: "Nightly prices by agreement.",
};

const standardWeeks = (high: number, mid: number, low: number): Season[] => [
  { when: { fi: "Kesä, viikot 25–32", en: "Summer, weeks 25–32" }, price: high },
  {
    when: { fi: "Viikot 1–2, 8–9, 24, 33–34 ja 52–53", en: "Weeks 1–2, 8–9, 24, 33–34 and 52–53" },
    price: mid,
  },
  { when: { fi: "Muut viikot", en: "All other weeks" }, price: low },
];

const commonAsk = [
  "Montako makuuhuonetta ja millaiset sängyt?",
  "Onko mökissä oma sauna, ja onko se puu- vai sähkökiuas?",
  "Matka rantaan metreinä, ja onko oma laituri?",
  "Wifi? Saako lemmikin tuoda? Onko mökki talviasuttava?",
];

export const cottages: Record<CottageId, Cottage> = {
  elimaki: {
    id: "elimaki",
    name: "Elimäki",
    slug: { fi: "elimaki", en: "elimaki" },
    hutsSlug: "elimaki-elijarven-mokkilomat-poytya",
    guests: 12,
    tagline: {
      fi: "Pyöröhirsihuvila korkealla mäellä ja oma rantasauna",
      en: "A round-log villa high on a hill, with its own shore sauna",
    },
    bestFor: {
      fi: "Suvuille, isoille porukoille ja yritysten virkistyspäiviin",
      en: "Big families, groups of friends and company days",
    },
    where: { fi: "Hauenkuonontie 128, Elijärven ranta", en: "Hauenkuonontie 128, on the shore of Lake Elijärvi" },
    address: "Hauenkuonontie 128, 21900 Yläne",
    lat: 60.88758,
    lng: 22.273922,
    // The owner's own words from the old site, kept word for word (typos fixed).
    intro: {
      fi: "Tämä pyöröhirsihuvila on mökkiemme ”kruunu”! Korkealla mäellä sijaitseva rakennus ja erillinen rantasauna. Majoitustilaa on 12 henkilölle. Viihtyisä oleskelutila, jossa ”tähtitaivas” kattona ja liuskekivinen suuri takka. Kaksi katettua terassia. Rantasaunan tilavassa pukuhuoneessa avotakka.",
      en: "This round-log villa is the “crown” of our cottages! The house stands high on a hill, with a separate sauna down on the shore. It sleeps 12. The cosy living room has a “starry sky” ceiling and a large slate fireplace. Two covered terraces. The roomy changing room of the shore sauna has an open fireplace.",
    },
    highlights: {
      fi: [
        "users|Majoitus 12 hengelle",
        "flame|Erillinen rantasauna, pukuhuoneessa avotakka",
        "sparkles|”Tähtitaivas”-katto ja liuskekivitakka",
        "sun|Kaksi katettua terassia",
        "bath|Oma palju 11 hengelle (lisähinta)",
        "sailboat|Vene ja polttopuut kuuluvat hintaan",
      ],
      en: [
        "users|Sleeps 12",
        "flame|Separate shore sauna, open fireplace in the changing room",
        "sparkles|“Starry sky” ceiling and a slate fireplace",
        "sun|Two covered terraces",
        "bath|Private hot tub for 11 (extra charge)",
        "sailboat|Boat and firewood included",
      ],
    },
    weeks: standardWeeks(950, 800, 650),
    weekend: 330,
    extras: {
      fi: ["Elimäen palju 11 hengelle 150 €"],
      en: ["Elimäki hot tub for 11, €150"],
    },
    photos: [
      photo("elimaki-26", "Elimäki ja katettu terassi", "Elimäki and its covered terrace"),
      photo("elimaki-02", "Oleskelutila, ruokapöytä ja liuskekivitakka", "Living room, dining table and slate fireplace"),
      photo("elimaki-19", "Palju ja näkymä Elijärvelle", "The hot tub and the view over Lake Elijärvi"),
      photo("elimaki-03", "Ruokailutila", "Dining area"),
      photo("elimaki-09", "Keittiö", "Kitchen"),
      photo("elimaki-25", "Huvila mäellä männikössä", "The villa on its pine-covered hill"),
      photo("elimaki-08", "Makuuhuone", "Bedroom"),
      photo("elimaki-07", "Kerrossängyt", "Bunk beds"),
      photo("elimaki-12", "Parvi ja vuoteet", "Loft with beds"),
      photo("elimaki-13", "Parven nukkumatilaa", "Sleeping space in the loft"),
      photo("elimaki-14", "Makuuhuone parvella", "Bedroom in the loft"),
      photo("elimaki-11", "Parvi", "The loft"),
      photo("elimaki-04", "Aula ja sohvat", "Lounge with sofas"),
      photo("elimaki-10", "Keittiön kodinkoneet", "Kitchen appliances"),
      photo("elimaki-15", "Terassi ja grilli järvelle päin", "Terrace and grill facing the lake"),
      photo("elimaki-16", "Terassi ulkoa", "The terrace from outside"),
      photo("elimaki-17", "Palju terassilla", "Hot tub on the deck"),
      photo("elimaki-18", "Palju ja järvi puiden takana", "Hot tub with the lake behind the trees"),
      photo("elimaki-20", "Rantasaunan löylyhuone", "Shore sauna"),
      photo("elimaki-21", "Rantasaunan pukuhuone ja avotakka", "Shore sauna changing room with open fireplace"),
      photo("elimaki-22", "Rantasaunan pukuhuone", "Shore sauna changing room"),
      photo("elimaki-23", "Sisäänkäynti", "Entrance"),
      photo("elimaki-24", "Huvila pihalta", "The villa from the yard"),
      photo("elimaki-01", "Rantasauna mäen alla järven rannassa", "Shore sauna below the hill, by the lake"),
      photo("elimaki-06", "WC", "Toilet"),
      photo("elimaki-27", "Terassi", "Terrace"),
    ],
    ask: [
      "Montako makuuhuonetta, ja montako vuodetta kussakin (myös parvella)?",
      "Onko huvilassa sisäsauna rantasaunan lisäksi?",
      "Matka huvilalta rantaan, ja onko oma laituri?",
      "Wifi? Saako lemmikin tuoda? Onko talviasuttava?",
    ],
  },
  meritahti: {
    id: "meritahti",
    name: "Meritähti",
    slug: { fi: "meritahti", en: "meritahti" },
    hutsSlug: "meritahti-elijarven-mokkilomat-poytya",
    guests: 8,
    tagline: {
      fi: "Kaksikerroksinen hirsimökki ja parveke Kotolahdella",
      en: "A two-storey log cottage with a balcony at Kotolahti",
    },
    bestFor: {
      fi: "Kahdelle perheelle tai kaveriporukalle",
      en: "Two families or a group of friends",
    },
    where: {
      fi: "Kotolahti, Meriläntien päässä (yksi kolmesta mökistä)",
      en: "Kotolahti, at the end of Meriläntie (one of three cottages)",
    },
    address: "Meriläntie 24, 21900 Yläne",
    lat: 60.882582,
    lng: 22.260076,
    intro: {
      fi: "Meritähti majoittaa 8 henkeä. Se on yksi Kotolahden kolmesta mökistä Meriläntien päässä. Alakerrassa on avara tupa, jossa keittiö, pitkä ruokapöytä penkkeineen ja sohvanurkkaus. Yläkerran parvelta pääsee parvekkeelle, josta näkyy pihan yli.",
      en: "Meritähti sleeps 8. It is one of the three cottages at Kotolahti, at the end of Meriläntie. Downstairs is an open living room with the kitchen, a long dining table with benches and a sofa corner. The loft upstairs opens onto a balcony that looks out over the yard.",
    },
    highlights: {
      fi: [
        "users|Majoitus 8 hengelle",
        "home|Avara tupa: keittiö, pitkä pöytä ja sohvat",
        "sun|Parveke yläkerrassa ja katettu kuisti",
        "tree|Iso nurmipiha metsän laidalla",
        "sailboat|Vene ja polttopuut kuuluvat hintaan",
      ],
      en: [
        "users|Sleeps 8",
        "home|Open living room: kitchen, long table and sofas",
        "sun|Upstairs balcony and a covered porch",
        "tree|Large lawn at the edge of the forest",
        "sailboat|Boat and firewood included",
      ],
    },
    weeks: standardWeeks(700, 650, 450),
    weekend: 250,
    photos: [
      photo("meritahti-02", "Meritähti pihalta", "Meritähti from the yard"),
      photo("meritahti-07", "Tupa: keittiö, ruokapöytä ja sohvat", "Living room: kitchen, dining table and sofas"),
      photo("meritahti-13", "Parvekkeelta pihalle", "View from the balcony"),
      photo("meritahti-08", "Pitkä ruokapöytä ja keittiö", "Long dining table and kitchen"),
      photo("meritahti-09", "Makuuhuone", "Bedroom"),
      photo("meritahti-03", "Mökki ja piha-alue", "The cottage and its yard"),
      photo("meritahti-10", "Tupa ikkunoiden puolelta", "The living room from the window side"),
      photo("meritahti-06", "Tupa ja parvi", "Living room and loft"),
      photo("meritahti-11", "Parven vuoteet", "Beds in the loft"),
      photo("meritahti-12", "Parvi", "The loft"),
      photo("meritahti-01", "Parveke", "Balcony"),
      photo("meritahti-05", "Katettu kuisti", "Covered porch"),
      photo("meritahti-04", "Mökki kesällä", "The cottage in summer"),
    ],
    ask: [...commonAsk, "Mikä on suurin ero Meritähden ja Merenneidon välillä? Ne näyttävät kuvissa samanlaisilta."],
  },
  merenneito: {
    id: "merenneito",
    name: "Merenneito",
    slug: { fi: "merenneito", en: "merenneito" },
    hutsSlug: "merenneito-elijarven-mokkilomat-poytya",
    guests: 8,
    tagline: {
      fi: "Hirsimökki Kotolahdella, sauna sisällä ja parveke",
      en: "A log cottage at Kotolahti with an indoor sauna and a balcony",
    },
    bestFor: {
      fi: "Isolle perheelle tai pienelle kaveriporukalle",
      en: "A big family or a small group of friends",
    },
    where: {
      fi: "Kotolahti, Meriläntien päässä (yksi kolmesta mökistä)",
      en: "Kotolahti, at the end of Meriläntie (one of three cottages)",
    },
    address: "Meriläntie 24, 21900 Yläne",
    lat: 60.882225,
    lng: 22.259695,
    intro: {
      fi: "Merenneito majoittaa 8 henkeä. Se on Kotolahden kolmesta mökistä yksi, Meriläntien päässä. Tuvassa on keittiö, ruokapöytä ja sohvanurkkaus, ja saman katon alla on sauna ja suihku. Yläkerrassa on parvi ja parveke. Kotolahden rannassa on laituri ja soutuvene.",
      en: "Merenneito sleeps 8. It is one of the three cottages at Kotolahti, at the end of Meriläntie. The living room has the kitchen, a dining table and a sofa corner, and the sauna and shower are under the same roof. Upstairs is a loft with a balcony. The Kotolahti shore has a jetty and a rowing boat.",
    },
    highlights: {
      fi: [
        "users|Majoitus 8 hengelle",
        "flame|Sauna ja suihku sisällä",
        "sun|Parvi, parveke ja katettu terassi",
        "waves|Kotolahden ranta, laituri ja soutuvene",
        "tree|Nurmipiha ja keinu",
        "sailboat|Vene ja polttopuut kuuluvat hintaan",
      ],
      en: [
        "users|Sleeps 8",
        "flame|Indoor sauna and shower",
        "sun|Loft, balcony and covered terrace",
        "waves|Kotolahti shore with a jetty and rowing boat",
        "tree|Lawn with a swing",
        "sailboat|Boat and firewood included",
      ],
    },
    weeks: standardWeeks(700, 650, 450),
    weekend: 250,
    photos: [
      photo("merenneito-02", "Merenneito pihalta", "Merenneito from the yard"),
      photo("merenneito-06", "Tupa, keittiö ja parvi", "Living room, kitchen and loft"),
      photo("merenneito-21", "Kotolahden laituri", "The Kotolahti jetty"),
      photo("merenneito-15", "Sauna", "Sauna"),
      photo("merenneito-08", "Makuuhuone", "Bedroom"),
      photo("merenneito-20", "Ranta ja soutuvene", "The shore and rowing boat"),
      photo("merenneito-07", "Ruokapöytä ja sohvat", "Dining table and sofas"),
      photo("merenneito-10", "Keittiö", "Kitchen"),
      photo("merenneito-05", "Sohvanurkkaus", "Sofa corner"),
      photo("merenneito-11", "Tupa ja ulko-ovi", "Living room and front door"),
      photo("merenneito-09", "Keittiö ja ruokapöytä", "Kitchen and dining table"),
      photo("merenneito-16", "Parvi", "The loft"),
      photo("merenneito-17", "Parven vuoteet", "Beds in the loft"),
      photo("merenneito-19", "Portaat parvelle", "Stairs to the loft"),
      photo("merenneito-18", "Parveke", "Balcony"),
      photo("merenneito-14", "Saunan lauteet", "Sauna benches"),
      photo("merenneito-13", "Pesuhuone", "Washroom"),
      photo("merenneito-12", "WC", "Toilet"),
      photo("merenneito-04", "Katettu terassi", "Covered terrace"),
      photo("merenneito-01", "Mökki ja piha", "The cottage and yard"),
      photo("merenneito-03", "Piha ja keinu", "The yard and swing"),
    ],
    ask: [
      "Montako makuuhuonetta ja millaiset sängyt?",
      "Onko saunassa puu- vai sähkökiuas?",
      "Matka mökiltä Kotolahden rantaan? Onko laituri yhteinen kolmelle mökille?",
      "Wifi? Saako lemmikin tuoda? Onko mökki talviasuttava?",
    ],
  },
  meripoika: {
    id: "meripoika",
    name: "Meripoika",
    slug: { fi: "meripoika", en: "meripoika" },
    hutsSlug: "meripoika-elijarven-mokkilomat-poytya",
    guests: 5,
    tagline: {
      fi: "Pieni hirsimökki ja lasitettu terassi",
      en: "A small log cottage with a glazed terrace",
    },
    bestFor: {
      fi: "Pariskunnalle tai pienelle perheelle",
      en: "A couple or a small family",
    },
    where: {
      fi: "Kotolahti, Meriläntien päässä (yksi kolmesta mökistä)",
      en: "Kotolahti, at the end of Meriläntie (one of three cottages)",
    },
    address: "Meriläntie 24, 21900 Yläne",
    lat: 60.881567,
    lng: 22.259602,
    intro: {
      fi: "Meripoika majoittaa 5 henkeä, ja se on mökeistämme edullisimpia. Lasitetulla terassilla on iso pöytä, sohvat ja terassilämmitin, joten siellä istutaan iltaa myös viileällä säällä. Sisällä on tupa, keittiö, sauna ja suihku sekä parvi.",
      en: "Meripoika sleeps 5 and is one of our most affordable cottages. The glazed terrace has a big table, sofas and a patio heater, so evenings outside work even when it's cool. Inside are the living room, kitchen, sauna and shower, and a sleeping loft.",
    },
    highlights: {
      fi: [
        "users|Majoitus 5 hengelle",
        "sun|Lasitettu terassi ja terassilämmitin",
        "flame|Sauna ja suihku sisällä",
        "tree|Pihakalusteet nurmella",
        "sailboat|Vene ja polttopuut kuuluvat hintaan",
      ],
      en: [
        "users|Sleeps 5",
        "sun|Glazed terrace with a patio heater",
        "flame|Indoor sauna and shower",
        "tree|Garden furniture on the lawn",
        "sailboat|Boat and firewood included",
      ],
    },
    weeks: standardWeeks(550, 500, 400),
    weekend: 200,
    photos: [
      photo("meripoika-04", "Meripoika ja terassi", "Meripoika and its terrace"),
      photo("meripoika-09", "Lasitettu terassi", "The glazed terrace"),
      photo("meripoika-15", "Keittiö ja ruokapöytä", "Kitchen and dining table"),
      photo("meripoika-11", "Tupa", "Living room"),
      photo("meripoika-12", "Sauna ja suihku", "Sauna and shower"),
      photo("meripoika-07", "Pihakalusteet", "Garden furniture"),
      photo("meripoika-08", "Terassin sohvat ja lämmitin", "Terrace sofas and heater"),
      photo("meripoika-16", "Keittiö", "Kitchen"),
      photo("meripoika-17", "Parvi", "The loft"),
      photo("meripoika-18", "Parven vuode", "Bed in the loft"),
      photo("meripoika-02", "Mökki edestä", "The cottage from the front"),
      photo("meripoika-01", "Mökki ja polttopuut", "The cottage and firewood"),
      photo("meripoika-03", "Piha", "The yard"),
      photo("meripoika-06", "Joenranta mökin lähellä", "The riverbank near the cottage"),
      photo("meripoika-05", "Mökin pääty", "The cottage gable"),
      photo("meripoika-10", "Eteinen", "Hallway"),
      photo("meripoika-13", "WC", "Toilet"),
      photo("meripoika-14", "Pesuhuone", "Washroom"),
    ],
    ask: [
      "Montako makuuhuonetta ja millaiset sängyt (sohvat + parvi)?",
      "Saunan kiuas: puu vai sähkö?",
      "Kuvassa näkyy joki: onko se lähellä mökkiä, ja voiko siinä uida?",
      "Wifi? Saako lemmikin tuoda? Onko mökki talviasuttava?",
    ],
  },
  poytakallio: {
    id: "poytakallio",
    name: "Pöytäkallio",
    slug: { fi: "poytakallio", en: "poytakallio" },
    hutsSlug: "poytakallio-elijarven-mokkilomat-poytya",
    guests: 6,
    tagline: {
      fi: "Kalliomökki männikössä ja järvinäkymä",
      en: "A cottage on the rocks among pines, with a lake view",
    },
    bestFor: {
      fi: "Perheelle tai kaveriporukalle, joka haluaa rauhaa",
      en: "A family or friends who want peace and quiet",
    },
    where: { fi: "Jävänlahdentie 9, Elijärven ranta", en: "Jävänlahdentie 9, by Lake Elijärvi" },
    address: "Jävänlahdentie 9, 21900 Yläne",
    lat: 60.88651,
    lng: 22.271654,
    intro: {
      fi: "Pöytäkallio majoittaa 6 henkeä. Mökki on kallioisessa männikössä, ja pitkältä kuistilta näkyy järvelle. Sisällä on tupa, jossa tiilinen avotakka, keittiö ja makuutilat, ja saunassa on puukiuas.",
      en: "Pöytäkallio sleeps 6. The cottage sits among pines on rocky ground, and the long porch looks out to the lake. Inside are a living room with a brick open fireplace, the kitchen and sleeping rooms, and the sauna has a wood-burning stove.",
    },
    highlights: {
      fi: [
        "users|Majoitus 6 hengelle",
        "waves|Järvinäkymä ja kallioinen ranta",
        "flame|Tiilinen avotakka ja puukiuassauna",
        "sun|Pitkä katettu kuisti",
        "sailboat|Vene ja polttopuut kuuluvat hintaan",
      ],
      en: [
        "users|Sleeps 6",
        "waves|Lake view and a rocky shore",
        "flame|Brick open fireplace and a wood-fired sauna",
        "sun|Long covered porch",
        "sailboat|Boat and firewood included",
      ],
    },
    weeks: [
      { when: { fi: "Kesä, viikot 25–32", en: "Summer, weeks 25–32" }, price: 500 },
      { when: { fi: "Viikot 24 ja 33–34", en: "Weeks 24 and 33–34" }, price: 450 },
      { when: { fi: "Muut viikot", en: "All other weeks" }, price: 400 },
    ],
    weekend: 200,
    photos: [
      photo("poytakallio-03", "Pöytäkallio männikössä", "Pöytäkallio among the pines"),
      photo("poytakallio-06", "Järvi ja kallioranta", "The lake and rocky shore"),
      photo("poytakallio-11", "Tupa ja ruokapöytä", "Living room and dining table"),
      photo("poytakallio-04", "Kuisti ja järvinäkymä", "Porch with a lake view"),
      photo("poytakallio-09", "Avotakka", "Open fireplace"),
      photo("poytakallio-07", "Tupa", "Living room"),
      photo("poytakallio-12", "Keittiö", "Kitchen"),
      photo("poytakallio-08", "Makuutila", "Sleeping room"),
      photo("poytakallio-10", "Makuuhuone", "Bedroom"),
      photo("poytakallio-13", "Pieni makuuhuone", "Small bedroom"),
      photo("poytakallio-01", "Puukiuassauna", "Wood-fired sauna"),
      photo("poytakallio-05", "Kuisti ja grilli", "Porch and grill"),
      photo("poytakallio-02", "Mökki kalliolla", "The cottage on the rocks"),
    ],
    ask: [
      "Montako makuuhuonetta ja millaiset sängyt?",
      "Matka rantaan, ja onko oma laituri?",
      "Wifi? Saako lemmikin tuoda? Onko mökki talviasuttava?",
      "Hinnat: mökkilistassa Pöytäkallion hinnat oli merkitty eri tavalla kuin sen omalla sivulla. Ovatko nämä oikein?",
    ],
  },
  fransula: {
    id: "fransula",
    name: "Fransula",
    slug: { fi: "fransula", en: "fransula" },
    hutsSlug: "fransula-elijarven-mokkilomat-poytya",
    guests: 6,
    tagline: {
      fi: "Edullinen mökki kallion kupeessa Säkylän puolella",
      en: "Our most affordable cottage, beside a rock on the Säkylä side",
    },
    bestFor: {
      fi: "Pienelle perheelle tai porukalle, joka haluaa edullisen loman",
      en: "A small family or group looking for a low-cost holiday",
    },
    where: {
      fi: "Koivulantie, Säkylä (noin 300 m Kolvaantieltä)",
      en: "Koivulantie, Säkylä (about 300 m from Kolvaantie)",
    },
    address: "Koivulantie, 27800 Säkylä",
    lat: 60.929272,
    lng: 22.294192,
    intro: {
      fi: "Fransula majoittaa 6 henkeä, ja se on mökeistämme edullisin. Mökki on Säkylän puolella Koivulantien ensimmäinen rakennus oikealla, kallion vieressä, noin 300 metriä Kolvaantieltä. Tuvassa on ruokapöytä ja sohva, ja mökissä on oma sauna.",
      en: "Fransula sleeps 6 and is our most affordable cottage. It is on the Säkylä side, the first building on the right along Koivulantie, next to a rock, about 300 metres from Kolvaantie. The living room has a dining table and a sofa, and the cottage has its own sauna.",
    },
    highlights: {
      fi: [
        "users|Majoitus 6 hengelle",
        "tag|Mökeistämme edullisin",
        "flame|Oma sauna",
        "tree|Rauhallinen paikka kallion vieressä",
        "sailboat|Vene ja polttopuut kuuluvat hintaan",
      ],
      en: [
        "users|Sleeps 6",
        "tag|Our most affordable cottage",
        "flame|Its own sauna",
        "tree|A quiet spot beside a rock",
        "sailboat|Boat and firewood included",
      ],
    },
    weeks: [
      { when: { fi: "Viikot 1–2, 8–11, 23–35 ja 52–53", en: "Weeks 1–2, 8–11, 23–35 and 52–53" }, price: 350 },
      { when: { fi: "Viikot 18–40", en: "Weeks 18–40" }, price: 300 },
    ],
    weekend: 150,
    photos: [
      photo("fransula-ulkoa", "Fransula ulkoa", "Fransula from outside"),
      photo("fransula-olo", "Tupa ja ruokapöytä", "Living room and dining table"),
      photo("fransula-yleis", "Makuuhuone ja keittiö", "Bedroom and kitchen"),
      photo("fransula-sauna", "Sauna", "Sauna"),
      photo("fransula-nakuma", "Mökki ja piha ylhäältä", "The cottage and yard from above"),
    ],
    ask: [
      "Uudet kuvat Fransulasta (nykyiset ovat pieniä ja vuodelta 2020). Puhelinkuvatkin käyvät.",
      "Hinnat: viikot 23–35 (350 €) ja 18–40 (300 €) menevät päällekkäin. Mikä on oikea hinta milläkin viikolla?",
      "Onko mökki järven rannalla, ja mikä järvi?",
      "Montako makuuhuonetta ja millaiset sängyt? Wifi, lemmikit, talvikäyttö?",
    ],
  },
};

export const cottageList: Cottage[] = [
  cottages.elimaki,
  cottages.meritahti,
  cottages.merenneito,
  cottages.meripoika,
  cottages.poytakallio,
  cottages.fransula,
];

export const cottagePath = (c: Cottage, locale: Locale) => `${paths.cottages[locale]}/${c.slug[locale]}`;

export const hutsCottageUrl = (c: Cottage, locale: Locale) =>
  locale === "fi"
    ? `${HUTS}/suomi/varsinais-suomi/poytya/lomamokit/${c.hutsSlug}`
    : `${HUTS}/finland/southwest-finland/poytya/holiday-cabins/${c.hutsSlug}`;

export const cottageEmbed = (c: Cottage, locale: Locale) =>
  locale === "fi"
    ? `${HUTS}/embed/suomi/varsinais-suomi/poytya/lomamokit/${c.hutsSlug}?address=1&trails=1&hideAttr=1&routes=${NEAREST_TRAIL}`
    : `${HUTS}/embed/finland/varsinais-suomi/poytya/holiday-cabins/${c.hutsSlug}?address=1&trails=1&hideAttr=1&routes=${NEAREST_TRAIL}`;

export const orgEmbed = (locale: Locale) =>
  `${HUTS}/embed/${locale === "fi" ? "suomi" : "finland"}/org/${business.orgId}?address=1&trails=1&hideAttr=1`;

/**
 * The few nearby places and trails worth a guest's day, picked by hand from huts.fi (ids are huts.fi
 * place / route UUIDs). They show on the map next to the list; hovering or tapping a row highlights it.
 * Distances are as the crow flies from the farm, measured from huts.fi coordinates on 2026-10-31.
 */
export type NearbyItem = {
  id: string;
  kind: "place" | "route";
  icon: string;
  name: Record<Locale, string>;
  what: Record<Locale, string>;
  km: number;
  /** Trail length in km (routes only), from huts.fi. */
  length?: number;
};

export const nearby: NearbyItem[] = [
  { id: "55c4d394-a86d-4974-9b69-56cc5c9ccd95", kind: "route", icon: "footprints", km: 2.5, length: 20.1, name: { fi: "Vaskijärven reitti", en: "Vaskijärvi trail" }, what: { fi: "Retkeilyreitti luonnonpuiston läpi", en: "Hiking trail through the nature reserve" } },
  { id: "a12b80b8-76bc-4165-8efc-dd2d8e1c6be6", kind: "route", icon: "sailboat", km: 6.6, length: 30.1, name: { fi: "Yläneenjoen melontareitti", en: "Yläneenjoki canoe route" }, what: { fi: "Melontareitti Pyhäjärvelle", en: "Paddling route down to Lake Pyhäjärvi" } },
  { id: "05c5ab5d-7202-4d9e-a5b2-9b0612a90af8", kind: "route", icon: "tree", km: 9.9, length: 6.6, name: { fi: "Koskeljärven vaellusreitti", en: "Koskeljärvi hiking trail" }, what: { fi: "Lyhyempi metsäpolku", en: "A shorter forest trail" } },
  { id: "603fa53c-1e19-4c6e-9a06-bbdc6fffee45", kind: "place", icon: "flame", km: 2.6, name: { fi: "Valastenmaan tulipaikka", en: "Valastenmaa campfire site" }, what: { fi: "Nuotiopaikka", en: "Campfire site" } },
  { id: "171ea499-3c25-473f-b63f-41ddb0e72c7a", kind: "place", icon: "waves", km: 5.2, name: { fi: "Valasrannan uimapaikka", en: "Valasranta beach" }, what: { fi: "Uimaranta", en: "Swimming beach" } },
  { id: "91ad64ec-af33-4365-8db8-451bd11dda55", kind: "place", icon: "bath", km: 6.3, name: { fi: "Kaunisrannan sauna ja uimaranta", en: "Kaunisranta sauna and beach" }, what: { fi: "Sauna ja uimaranta", en: "Sauna and beach" } },
  { id: "2254020c-86d3-492e-87ab-22d3469e2e87", kind: "place", icon: "tag", km: 8.6, name: { fi: "Yläneen frisbeegolfpuisto", en: "Yläne disc golf park" }, what: { fi: "Frisbeegolf", en: "Disc golf" } },
  { id: "3e50ed6b-31fa-4bb5-8367-1373cf8b1be7", kind: "place", icon: "sun", km: 9.6, name: { fi: "Latosaaren lintutorni", en: "Latosaari bird tower" }, what: { fi: "Lintutorni", en: "Bird-watching tower" } },
];

/** Org map + the hand-picked places and trails above. */
export const nearbyEmbed = (locale: Locale) =>
  `${orgEmbed(locale)}&places=${nearby.filter((n) => n.kind === "place").map((n) => n.id).join(",")}&routes=${nearby.filter((n) => n.kind === "route").map((n) => n.id).join(",")}`;

/** Single-place maps (cottages, sauna) only add the nearest trail, so they stay zoomed in on the place. */
export const NEAREST_TRAIL = "55c4d394-a86d-4974-9b69-56cc5c9ccd95";

export const lowestWeek = (c: Cottage) => Math.min(...c.weeks.map((w) => w.price));
export const highestWeek = (c: Cottage) => Math.max(...c.weeks.map((w) => w.price));

export const shared = {
  hero: photo("aerial-lake", "Elijärvi ilmasta", "Lake Elijärvi from the air"),
  aerialMap: photo(
    "aerial-map",
    "Ilmakuva: Elimäki, Pöytäkallio, Meritähti, Merenneito ja Meripoika",
    "Aerial view: Elimäki, Pöytäkallio, Meritähti, Merenneito and Meripoika",
  ),
  aerialKotolahti: photo("aerial-kotolahti", "Kotolahti ja lampi ilmasta", "Kotolahti and the pond from the air"),
  sup: photo("sup", "SUP-lautailua järvellä", "Stand-up paddling on the lake"),
  palju: photo("elimaki-palju", "Elimäen palju järven yllä", "Elimäki hot tub above the lake"),
};

export const sauna = {
  maxGuests: 10,
  price: 160,
  hutsUrl: {
    fi: `${HUTS}/suomi/varsinais-suomi/poytya/saunat/savusauna-elijarven-mokkilomat-poytya`,
    en: `${HUTS}/finland/southwest-finland/poytya/saunas/smoke-sauna-elijarven-mokkilomat-poytya`,
  },
  embed: {
    fi: `${HUTS}/embed/suomi/varsinais-suomi/poytya/saunat/savusauna-elijarven-mokkilomat-poytya?address=1&trails=1&hideAttr=1&routes=${NEAREST_TRAIL}`,
    en: `${HUTS}/embed/finland/varsinais-suomi/poytya/saunas/smoke-sauna-elijarven-mokkilomat-poytya?address=1&trails=1&hideAttr=1&routes=${NEAREST_TRAIL}`,
  },
  lat: 60.880817,
  lng: 22.254731,
  // Owner's words from the old site, word for word (typos fixed).
  text: {
    fi: "Tilalla on oma lampi, jonka rannassa on savusauna. Lammessa on saari, missä viihtyisä grillikatos; saareen pääsee ”romanttista” kaarisiltaa pitkin. Lammessa kasvatetaan rapuja, joten meillä on aina mahdollista ravustaa. Nämä tilat ovat vuokrattavissa erikseen. Voit siis viettää yrityksesi henkilökunnan tai ystäviesi kanssa ikimuistettavan päivän tai illan, esimerkiksi pitämällä rapujuhlat. Savusaunasta ja pihasaunasta pääsee uimaan rapujen kanssa tai ikisulaan merijokeen.",
    en: "The farm has its own pond with a smoke sauna on its shore. In the pond is an island with a cosy grill shelter, reached by a “romantic” arched bridge. We farm crayfish in the pond, so crayfishing is always possible. These can be rented separately, so you can spend an unforgettable day or evening with your staff or friends, for example at a crayfish party. From the smoke sauna and the yard sauna you can swim with the crayfish, or in the river that never freezes.",
  },
  photos: [
    photo("savusauna-05", "Savusauna ja terassi", "The smoke sauna and its deck"),
    photo("savusauna-08", "Grillikatos lammen saarella", "Grill shelter on the island in the pond"),
    photo("savusauna-02", "Terassi lammen rannalla", "Deck on the pond shore"),
    photo("savusauna-10", "Savusaunan lauteet", "Inside the smoke sauna"),
    photo("savusauna-04", "Savusauna rannalta", "The smoke sauna from the shore"),
    photo("savusauna-06", "Halkopino ja lampi", "Firewood stack and the pond"),
    photo("savusauna-03", "Savusaunan ovi", "The smoke sauna door"),
    photo("savusauna-11", "Pukuhuone", "Changing room"),
    photo("savusauna-09", "Grillikatos", "Grill shelter"),
    photo("savusauna-01", "Istumapaikka", "Seating on the deck"),
    photo("savusauna-07", "Polku metsässä", "Forest path"),
  ],
  ask: [
    "Kuva kaarisillasta ja rapujuhlista (tai ravustuksesta)",
    "Kylpytynnyri (150 €, 12 hengelle): onko se savusaunan vieressä? Onko se sama kuin varaussivun ”paljukärry 150 € / 2 vrk”?",
    "Voiko savusaunan varata myös talvella?",
  ],
};

export type Extra = { icon: string; name: Text; price: Text };

export const extras: Extra[] = [
  { icon: "flame", name: { fi: "Savusauna (max 10 henkeä)", en: "Smoke sauna (max 10 people)" }, price: { fi: "160 € / kerta", en: "€160 per time" } },
  { icon: "bath", name: { fi: "Kylpytynnyri (max 12 henkeä)", en: "Hot tub barrel (max 12 people)" }, price: { fi: "150 € / kerta", en: "€150 per time" } },
  { icon: "bath", name: { fi: "Paljukärry", en: "Hot tub trailer" }, price: { fi: "150 € / 2 vrk", en: "€150 for 2 days" } },
  { icon: "bath", name: { fi: "Elimäen palju (11 hengelle)", en: "Elimäki hot tub (for 11)" }, price: { fi: "150 €", en: "€150" } },
  { icon: "sailboat", name: { fi: "Kanootti (2 henkeä)", en: "Canoe (2 people)" }, price: { fi: "20 € / vrk tai 75 € / viikko", en: "€20 a day or €75 a week" } },
  { icon: "waves", name: { fi: "SUP-lauta", en: "SUP board" }, price: { fi: "25 € / vrk", en: "€25 a day" } },
  { icon: "anchor", name: { fi: "Perämoottori", en: "Outboard motor" }, price: { fi: "15 € / vrk + polttoaine", en: "€15 a day + fuel" } },
  { icon: "fish", name: { fi: "Kalastusvälineet", en: "Fishing gear" }, price: { fi: "3,50 € / h", en: "€3.50 an hour" } },
  { icon: "bike", name: { fi: "Polkupyörä", en: "Bicycle" }, price: { fi: "15 € / vrk", en: "€15 a day" } },
  { icon: "bed", name: { fi: "Liinavaatteet", en: "Bed linen" }, price: { fi: "12,50 € / henkilö", en: "€12.50 per person" } },
  { icon: "sparkles", name: { fi: "Loppusiivous", en: "Final cleaning" }, price: { fi: "65–95 €", en: "€65–95" } },
];

export const byAgreement: TextList = {
  fi: ["Opastetut retket", "Seikkailupalvelut", "Ravustus", "Ruokapalvelut"],
  en: ["Guided trips", "Adventure services", "Crayfishing", "Catering"],
};

export const terms = {
  fi: [
    "Viikkovarauksissa vaihtopäivä on lauantai.",
    "Mökki on käytössä tulopäivästä klo 16 lähtöpäivään klo 12.",
    "Viikonloppuvaraus päättyy sunnuntaina klo 15.",
    "Mökin hintaan kuuluvat vene ja polttopuut.",
  ],
  en: [
    "Weekly stays change over on Saturdays.",
    "The cottage is yours from 4 pm on arrival day until noon on departure day.",
    "Weekend stays end at 3 pm on Sunday.",
    "A boat and firewood are included in the price.",
  ],
};

export const activities = {
  kuhankuono: {
    fi: "Kuhankuonon reitistön polut kulkevat Etelä-Suomen oloissa poikkeuksellisen laajoilla ja yhtenäisillä metsäalueilla, kallioilla ja keidassoilla. Reitit johtavat muun muassa Vaskijärven luonnonpuistoon ja Kurjenrahkan kansallispuistoon sekä siihen kuuluvaan Pukkipalon aarnimetsään.",
    en: "The Kuhankuono trail network runs through forests, rocks and raised bogs that are unusually large and unbroken for southern Finland. The trails lead to places like the Vaskijärvi Strict Nature Reserve, Kurjenrahka National Park and its Pukkipalo old-growth forest.",
  },
  kuhankuonoUrl: "https://www.kuhankuono.fi/",
  intro: {
    fi: "Mökit ovat Kuhankuonon laajojen retkeilyreitistöjen välittömässä läheisyydessä. Meillä on hyvät yhteydet muihin paikallisiin matkailualan yrittäjiin, joten voit liittää lomaasi järjestetyn vaelluksen tai melonnan. Kaiken tämän voit tehdä myös omatoimisesti ja omalla aikataululla: me hankimme tarvittavat välineet.",
    en: "The cottages are right next to the large Kuhankuono trail network. We work closely with other local tourism businesses, so you can add a guided hike or paddling trip to your holiday. You can also do all of it on your own and at your own pace: we will get you the gear you need.",
  },
};

export const ui = {
  fi: {
    nav: { cottages: "Mökit", sauna: "Savusauna", activities: "Aktiviteetit", booking: "Hinnat ja varaus", book: "Kysy vapaita" },
    kicker: "Yläne · Pöytyä · Varsinais-Suomi",
    homeTitle: "Mökit Elijärven rannalla, Yläne | Elijärven Mökkilomat",
    homeDescription:
      "Kuusi vuokramökkiä 5–12 hengelle Yläneen Elijärven rannalla Pöytyällä, 65 km Turusta. Savusauna ja rapulampi, vene ja polttopuut hinnassa, Kuhankuonon reitit vieressä.",
    h1: "Mökit Elijärven rannalla Yläneellä",
    lead: "Kuusi tasokasta mökkiä 5–12 hengelle kallioisessa metsämaastossa, 12 km Yläneen keskustasta ja 65 km Turusta. Tule viikonlopuksi, viikoksi tai koko lomaksi.",
    pills: ["Vene ja polttopuut hinnassa", "Oma savusauna ja rapulampi", "Varaa suoraan omistajalta"],
    scroll: "Vieritä alas",
    finderKicker: "Kuusi mökkiä",
    finderTitle: "Löydä teille sopiva mökki",
    finderText: "Valitse henkimäärä, niin näet sopivat mökit. Kaikissa on vene ja polttopuut.",
    howMany: "Montako teitä on?",
    all: "Kaikki",
    upTo: (n: number) => `${n} hengelle`,
    from: "alkaen",
    perWeek: "/ vko",
    weekend: "Viikonloppu",
    see: "Katso mökki",
    ask: "Kysy vapaita",
    none: "Ei yhtä mökkiä näin isolle porukalle. Soita, niin keksitään ratkaisu, esimerkiksi kaksi mökkiä vierekkäin.",
    compareTitle: "Mökit rinnakkain",
    compareText: "Viikkohinnat. Viikonloppuhinta on muina kuin sesonkiviikkoina.",
    colCottage: "Mökki",
    colGuests: "Henkeä",
    colHigh: "Kesä vk 25–32",
    colLow: "Edullisin viikko",
    colWeekend: "Viikonloppu",
    colBest: "Sopii",
    mapTitle: "Missä mökit ovat",
    mapText:
      "Elimäki ja Pöytäkallio ovat Elijärven rannalla, Meritähti, Merenneito ja Meripoika Kotolahdella Meriläntien päässä, ja savusauna tilan lammen rannalla. Fransula on vähän pohjoisempana Säkylän puolella.",
    mapCredit: "Kartta:",
    saunaKicker: "Vuokrattavissa erikseen",
    saunaTitle: "Savusauna, rapulampi ja saari",
    saunaLead: "Lammen rannalla savusauna, saarella grillikatos ja sinne kaarisilta. Lammessa kasvaa rapuja.",
    saunaCta: "Lue savusaunasta",
    activitiesTitle: "Tekemistä joka päivälle",
    activitiesCta: "Kaikki aktiviteetit",
    companiesTitle: "Yrityksille",
    companiesText:
      "Mökit sopivat myös yritysten kokous- ja virkistyskäyttöön. Savusaunan, saaren grillikatoksen ja rapujuhlat voi varata samaan päivään.",
    directKicker: "Suoraan omistajalta",
    directTitle: "Varaa suoraan Mikalta",
    direct: [
      { icon: "phone", title: "Soita tai kirjoita", text: "Kerromme vapaat päivät ja hinnan saman tien." },
      { icon: "check", title: "Ei välikäsiä", text: "Sovit kaikesta suoraan omistajan kanssa." },
      { icon: "sailboat", title: "Vene ja polttopuut", text: "Kuuluvat jokaisen mökin hintaan." },
      { icon: "calendar", title: "Joustavasti", text: "Viikko, viikonloppu tai vuorokausihinta sopimuksen mukaan." },
    ],
    hostsKicker: "Isäntä",
    hostsTitle: "Tervetuloa Elijärvelle",
    hostsPlaceholder:
      "Tähän tulee kuva ja muutama lause sinusta ja tilan tarinasta. Vieraat varaavat mieluummin, kun he tietävät kenen luo ovat tulossa.",
    previewTag: "Esikatselu: lisätään sinulta",
    faqTitle: "Usein kysyttyä",
    faq: [
      { q: "Montako henkeä mökkeihin mahtuu?", a: "Elimäkeen 12, Meritähteen ja Merenneitoon 8, Pöytäkallioon ja Fransulaan 6 ja Meripoikaan 5 henkeä." },
      { q: "Mitä mökin hintaan kuuluu?", a: "Vene ja polttopuut. Liinavaatteet ovat 12,50 € / henkilö ja loppusiivous 65–95 €." },
      {
        q: "Milloin mökkiin pääsee ja milloin se pitää luovuttaa?",
        a: "Viikkovarauksissa vaihtopäivä on lauantai. Mökki on käytössä tulopäivästä klo 16 lähtöpäivään klo 12. Viikonloppuvaraus päättyy sunnuntaina klo 15.",
      },
      {
        q: "Voiko savusaunan vuokrata erikseen?",
        a: "Voi. Savusauna lammen rannalla on enintään 10 hengelle, ja se maksaa 160 € kerralta. Samaan voi yhdistää saaren grillikatoksen ja ravustuksen.",
      },
      {
        q: "Missä mökit ovat?",
        a: "Yläneellä Pöytyällä, Elijärven ympärillä, noin 12 km Yläneen keskustasta ja 65 km Turusta. Fransula on Säkylän puolella Koivulantiellä.",
      },
      {
        q: "Sopivatko mökit yrityksille?",
        a: "Sopivat. Mökit soveltuvat yritysten kokous- ja virkistyskäyttöön, ja savusaunan, grillikatoksen ja rapujuhlat voi varata samaan päivään.",
      },
      { q: "Miten varaan?", a: "Soita 0400 534 973 tai lähetä sähköpostia osoitteeseen mikameri@netti.fi. Kerro mökki, päivät ja henkimäärä." },
    ],
    cottage: {
      included: "Mitä mökistä löytyy",
      prices: "Viikkohinnat",
      weekendRow: "Viikonloppu muina viikkoina",
      extras: "Lisäpalvelut tälle mökille",
      where: "Sijainti",
      onHuts: "Mökki Huts.fi:ssä",
      others: "Muut mökit",
      bestFor: "Sopii",
      gallery: "Kaikki kuvat",
      allExtras: "Kaikki lisäpalvelut ja hinnat",
    },
    extrasTitle: "Lisäpalvelut ja vuokravälineet",
    byAgreementTitle: "Sopimuksen mukaan",
    termsTitle: "Hyvä tietää",
    bookingTitle: "Hinnat ja varaus",
    bookingLead:
      "Vuokraa tasokas mökki kaikilla mukavuuksilla. Mökit soveltuvat myös yritysten kokous- ja virkistyskäyttöön. Kysy vapaita aikoja puhelimella tai sähköpostilla.",
    bookingPageTitle: "Hinnat ja varaus | Elijärven Mökkilomat, Yläne",
    bookingDescription:
      "Elijärven Mökkilomien viikko- ja viikonloppuhinnat, lisäpalvelut ja varausehdot. Varaa suoraan omistajalta: 0400 534 973, mikameri@netti.fi.",
    contactTitle: "Yhteystiedot",
    cottagesTitle: "Vuokramökit Yläneellä 5–12 hengelle | Elijärven Mökkilomat",
    cottagesDescription:
      "Vertaa Elijärven Mökkilomien kuutta mökkiä: Elimäki 12, Meritähti ja Merenneito 8, Pöytäkallio ja Fransula 6 sekä Meripoika 5 henkeä. Hinnat, kuvat ja sijainnit.",
    cottagesH1: "Mökit",
    cottagesLead: "Kuusi mökkiä 5–12 hengelle Elijärven ympärillä. Vene ja polttopuut kuuluvat jokaisen hintaan.",
    activitiesPageTitle: "Aktiviteetit: Kuhankuono, melonta, SUP ja palju – Yläne | Elijärven Mökkilomat",
    activitiesDescription:
      "Kuhankuonon retkeilyreitit, Kurjenrahkan kansallispuisto, kanootti, SUP-lauta, palju, savusauna ja ravustus Elijärven Mökkilomilla Yläneellä.",
    activitiesH1: "Aktiviteetit",
    saunaPageTitle: "Savusauna ja rapulampi vuokralle, Yläne | Elijärven Mökkilomat",
    saunaDescription:
      "Vuokraa savusauna tilan oman lammen rannalta Yläneeltä: saaren grillikatos, kaarisilta ja ravustus. Enintään 10 henkeä, 160 € / kerta. Sopii rapujuhliin ja virkistyspäiviin.",
    saunaH1: "Savusauna ja rapulampi",
    saunaFacts: ["Enintään 10 henkeä", "160 € / kerta", "Saaren grillikatos ja kaarisilta", "Ravustus omassa lammessa"],
    hikeTitle: "Erävaellus Kuhankuonon reiteillä",
    hikeGuided: "Opastetut retket sopimuksen mukaan.",
    hikeLink: "Kuhankuonon retkeilyreitistö",
    paddleTitle: "Melonta ja SUP",
    paddleText: "Kanootti (2 henkeä) 20 € / vrk tai 75 € / viikko. SUP-lauta 25 € / vrk.",
    tubTitle: "Palju ja kylpytynnyri",
    tubText: "Kylpytynnyri 150 € / kerta, enintään 12 henkeä. Elimäen oma palju 11 hengelle 150 €.",
    actTiles: [
      { icon: "footprints", label: "Kuhankuonon reitit" },
      { icon: "flame", label: "Savusauna" },
      { icon: "sailboat", label: "Kanootti ja vene" },
      { icon: "waves", label: "SUP-lauta" },
      { icon: "bath", label: "Palju" },
      { icon: "fish", label: "Kalastus ja ravustus" },
    ],
    inquiryTitle: "Kysy vapaita päiviä",
    which: "Mökki",
    any: "Mikä tahansa sopiva",
    arrive: "Tulopäivä",
    leave: "Lähtöpäivä",
    guests: "Henkeä",
    send: "Lähetä kysely",
    inquiryNote: "Kysely avautuu sähköpostiisi valmiiksi täytettynä. Mika vastaa mahdollisimman pian.",
    mailSubject: "Varauskysely",
    mailBody: (c: string, a: string, l: string, g: string) =>
      `Hei,\n\nHaluaisin kysyä vapaata ajankohtaa.\n\nMökki: ${c}\nTulopäivä: ${a}\nLähtöpäivä: ${l}\nHenkeä: ${g}\n\nTerveisin,\n`,
    sticky: { call: "Soita", book: "Kysy vapaita" },
    close: "Sulje",
    prev: "Edellinen",
    next: "Seuraava",
    askTitle: "Kysytään Mikalta",
    askNote: "Näkyy vain esikatselussa. Vastaa sähköpostilla, niin päivitämme sivun ja poistamme kysymyksen.",
    homeAsk: [
      "Alkuperäinen esittelyvideo tiedostona. Nyt video tulee YouTubesta, joka näyttää alussa oman logonsa; omana tiedostona se pyörii terävänä ilman merkkejä.",
      "Ovatko hinnat vuoden 2026 vai 2027? Mitkä ovat 2027 hinnat?",
      "Viikonloppuvaraus: varaussivulla lukee sunnuntaina klo 18, mökkisivuilla klo 15. Kumpi on oikein?",
      "Kanootti: suomeksi 20 € / vrk, englanniksi 30 € / day. Kumpi on oikein?",
      "Onko varauskalenteria, vai varataanko aina puhelimella tai sähköpostilla?",
      "Talvikuvia mökeistä ja järvestä, jos löytyy.",
    ],
    elyNote:
      "Yritys on mukana Eteläisen Pyhäjärviseudun yhteismarkkinointi-yritysryhmähankkeessa, joka saa rahoitusta markkinointiin Manner-Suomen maaseudun kehittämisohjelmasta Satakunnan ELY-keskuksen kautta.",
    madeBy: "Sivut:",
    home: "Etusivu",
  },
  en: {
    nav: { cottages: "Cottages", sauna: "Smoke sauna", activities: "Activities", booking: "Prices & booking", book: "Check dates" },
    kicker: "Yläne · Pöytyä · Southwest Finland",
    homeTitle: "Lakeside cottages on Lake Elijärvi, Yläne, Finland | Elijärven Mökkilomat",
    homeDescription:
      "Six holiday cottages for 5–12 guests on Lake Elijärvi in Yläne, Pöytyä, 65 km from Turku, Finland. Smoke sauna and crayfish pond, boat and firewood included, Kuhankuono trails next door.",
    h1: "Cottages on the shores of Lake Elijärvi",
    lead: "Six well-equipped cottages for 5–12 guests in rocky forest country, 12 km from Yläne village and 65 km from Turku. Come for a weekend, a week or your whole holiday.",
    pills: ["Boat and firewood included", "Our own smoke sauna and crayfish pond", "Book direct with the owner"],
    scroll: "Scroll down",
    finderKicker: "Six cottages",
    finderTitle: "Find the right cottage",
    finderText: "Pick your group size to see the cottages that fit. Every one comes with a boat and firewood.",
    howMany: "How many of you?",
    all: "All",
    upTo: (n: number) => `Sleeps ${n}`,
    from: "from",
    perWeek: "/ wk",
    weekend: "Weekend",
    see: "See the cottage",
    ask: "Check dates",
    none: "No single cottage sleeps that many. Call us and we'll find a way, for example two cottages side by side.",
    compareTitle: "The cottages side by side",
    compareText: "Weekly prices. Weekend prices apply outside the peak weeks.",
    colCottage: "Cottage",
    colGuests: "Guests",
    colHigh: "Summer wk 25–32",
    colLow: "Lowest week",
    colWeekend: "Weekend",
    colBest: "Best for",
    mapTitle: "Where the cottages are",
    mapText:
      "Elimäki and Pöytäkallio are on the shore of Lake Elijärvi, Meritähti, Merenneito and Meripoika at Kotolahti at the end of Meriläntie, and the smoke sauna by the farm's pond. Fransula is a little further north, on the Säkylä side.",
    mapCredit: "Map powered by",
    saunaKicker: "Can be rented separately",
    saunaTitle: "Smoke sauna, crayfish pond and island",
    saunaLead: "A smoke sauna on the pond shore, a grill shelter on the island and an arched bridge to reach it. Crayfish live in the pond.",
    saunaCta: "About the smoke sauna",
    activitiesTitle: "Something for every day",
    activitiesCta: "All activities",
    companiesTitle: "For companies",
    companiesText:
      "The cottages also suit company meetings and recreation days. The smoke sauna, the island grill shelter and a crayfish party can be booked for the same day.",
    directKicker: "Straight from the owner",
    directTitle: "Book directly with Mika",
    direct: [
      { icon: "phone", title: "Call or write", text: "We tell you the free dates and the price right away." },
      { icon: "check", title: "No middleman", text: "You agree everything directly with the owner." },
      { icon: "sailboat", title: "Boat and firewood", text: "Included with every cottage." },
      { icon: "calendar", title: "Flexible", text: "A week, a weekend, or nightly prices by agreement." },
    ],
    hostsKicker: "Your host",
    hostsTitle: "Welcome to Lake Elijärvi",
    hostsPlaceholder: "A photo and a few lines about you and the farm go here. Guests book more readily when they know who they are visiting.",
    previewTag: "Preview: to be added by you",
    faqTitle: "Questions",
    faq: [
      { q: "How many people do the cottages sleep?", a: "Elimäki sleeps 12, Meritähti and Merenneito 8, Pöytäkallio and Fransula 6, and Meripoika 5." },
      { q: "What is included in the price?", a: "A boat and firewood. Bed linen is €12.50 per person and final cleaning is €65–95." },
      {
        q: "What are the check-in and check-out times?",
        a: "Weekly stays change over on Saturdays. The cottage is yours from 4 pm on arrival day until noon on departure day. Weekend stays end at 3 pm on Sunday.",
      },
      {
        q: "Can I rent the smoke sauna on its own?",
        a: "Yes. The smoke sauna by the pond takes up to 10 people and costs €160 per time. You can add the island grill shelter and crayfishing.",
      },
      {
        q: "Where are the cottages?",
        a: "In Yläne, Pöytyä, around Lake Elijärvi, about 12 km from Yläne village and 65 km from Turku, Finland. Fransula is on the Säkylä side, on Koivulantie.",
      },
      {
        q: "Do the cottages suit company events?",
        a: "Yes. They suit company meetings and recreation days, and the smoke sauna, grill shelter and a crayfish party can be booked for the same day.",
      },
      { q: "How do I book?", a: "Call +358 400 534 973 or email mikameri@netti.fi with the cottage, your dates and the number of guests." },
    ],
    cottage: {
      included: "What the cottage has",
      prices: "Weekly prices",
      weekendRow: "Weekend outside peak weeks",
      extras: "Extras for this cottage",
      where: "Location",
      onHuts: "The cottage on Huts.fi",
      others: "Our other cottages",
      bestFor: "Best for",
      gallery: "All photos",
      allExtras: "All extras and prices",
    },
    extrasTitle: "Extras and rentals",
    byAgreementTitle: "By agreement",
    termsTitle: "Good to know",
    bookingTitle: "Prices and booking",
    bookingLead:
      "Rent a well-equipped cottage with every comfort. The cottages also suit company meetings and recreation days. Ask for free dates by phone or email.",
    bookingPageTitle: "Prices and booking | Elijärven Mökkilomat, Yläne, Finland",
    bookingDescription:
      "Weekly and weekend prices, extras and booking terms for Elijärven Mökkilomat in Yläne, Finland. Book directly with the owner: +358 400 534 973, mikameri@netti.fi.",
    contactTitle: "Contact",
    cottagesTitle: "Holiday cottages in Yläne, Finland for 5–12 guests | Elijärven Mökkilomat",
    cottagesDescription:
      "Compare six cottages at Lake Elijärvi: Elimäki sleeps 12, Meritähti and Merenneito 8, Pöytäkallio and Fransula 6, and Meripoika 5. Prices, photos and locations.",
    cottagesH1: "Cottages",
    cottagesLead: "Six cottages for 5–12 guests around Lake Elijärvi. A boat and firewood come with every one.",
    activitiesPageTitle: "Activities: Kuhankuono trails, canoeing, SUP and hot tubs – Yläne | Elijärven Mökkilomat",
    activitiesDescription:
      "Kuhankuono hiking trails, Kurjenrahka National Park, canoe and SUP rental, hot tubs, a smoke sauna and crayfishing at Elijärven Mökkilomat in Yläne, Finland.",
    activitiesH1: "Activities",
    saunaPageTitle: "Smoke sauna and crayfish pond for rent, Yläne, Finland | Elijärven Mökkilomat",
    saunaDescription:
      "Rent a traditional smoke sauna on the farm's own pond in Yläne, Finland, with an island grill shelter, an arched bridge and crayfishing. Up to 10 people, €160 per time.",
    saunaH1: "Smoke sauna and crayfish pond",
    saunaFacts: ["Up to 10 people", "€160 per time", "Island grill shelter and arched bridge", "Crayfishing in our own pond"],
    hikeTitle: "Hiking on the Kuhankuono trails",
    hikeGuided: "Guided trips by agreement.",
    hikeLink: "Kuhankuono trail network",
    paddleTitle: "Canoeing and SUP",
    paddleText: "Canoe (2 people) €20 a day or €75 a week. SUP board €25 a day.",
    tubTitle: "Hot tubs",
    tubText: "Hot tub barrel €150 per time, up to 12 people. Elimäki's own hot tub for 11, €150.",
    actTiles: [
      { icon: "footprints", label: "Kuhankuono trails" },
      { icon: "flame", label: "Smoke sauna" },
      { icon: "sailboat", label: "Canoe and boat" },
      { icon: "waves", label: "SUP board" },
      { icon: "bath", label: "Hot tub" },
      { icon: "fish", label: "Fishing and crayfish" },
    ],
    inquiryTitle: "Check available dates",
    which: "Cottage",
    any: "Any that fits",
    arrive: "Arrival",
    leave: "Departure",
    guests: "Guests",
    send: "Send enquiry",
    inquiryNote: "Your email app opens with the enquiry filled in. Mika replies as soon as he can.",
    mailSubject: "Booking enquiry",
    mailBody: (c: string, a: string, l: string, g: string) =>
      `Hello,\n\nI would like to ask about availability.\n\nCottage: ${c}\nArrival: ${a}\nDeparture: ${l}\nGuests: ${g}\n\nBest regards,\n`,
    sticky: { call: "Call", book: "Check dates" },
    close: "Close",
    prev: "Previous",
    next: "Next",
    askTitle: "Questions for Mika",
    askNote: "Shown only in the preview. Answer by email and we update the page and remove the question.",
    homeAsk: [
      "The original intro video as a file. It now plays from YouTube, which shows its own logo at the start; as a file it plays sharp with no branding.",
      "Are these the 2026 or 2027 prices? What are the 2027 prices?",
      "Weekend stays: the booking page says Sunday 6 pm, the cottage pages say 3 pm. Which is right?",
      "Canoe: €20 a day in Finnish, €30 in English. Which is right?",
      "Is there a booking calendar, or is it always by phone or email?",
      "Winter photos of the cottages and the lake, if you have them.",
    ],
    elyNote:
      "The company takes part in the Southern Pyhäjärvi region joint marketing project, which receives marketing funding from the Rural Development Programme for Mainland Finland through the Satakunta ELY Centre.",
    madeBy: "Site by",
    home: "Home",
  },
};

export const cottageMeta = (c: Cottage, locale: Locale) => {
  const low = lowestWeek(c);
  const tag = c.tagline[locale];
  const lower = `${tag.charAt(0).toLowerCase()}${tag.slice(1)}`;
  if (locale === "fi") {
    return {
      title: `${c.name} – mökki ${c.guests} hengelle, Elijärvi, Yläne | Elijärven Mökkilomat`,
      description: `${c.name}: ${lower}. ${c.guests} henkeä, viikko alkaen ${low} €, viikonloppu ${c.weekend} €. Vene ja polttopuut hinnassa. Yläne, Pöytyä.`,
    };
  }
  return {
    title: `${c.name} – cottage for ${c.guests}, Lake Elijärvi, Yläne, Finland`,
    description: `${c.name}: ${lower}. Sleeps ${c.guests}, from €${low} a week, weekend €${c.weekend}. Boat and firewood included. Yläne, Finland.`,
  };
};

export function splitIcon(entry: string): [string, string] {
  const i = entry.indexOf("|");
  return i < 0 ? ["check", entry] : [entry.slice(0, i), entry.slice(i + 1)];
}

export const euro = (n: number, locale: Locale) => (locale === "fi" ? `${n} €` : `€${n}`);
