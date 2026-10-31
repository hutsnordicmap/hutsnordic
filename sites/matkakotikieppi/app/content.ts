// Every fact here comes from the owner's old site (matkakotikieppi.fi, Finnish and English pages,
// read 2026-10-31), the photos he gave Huts.fi permission to use, or Huts.fi itself (nearby places and
// their straight-line distances from Vienantie 3). Do not add prices, distances, ratings or features that
// are not in those sources. Unknowns are listed in `ask` and only show as placeholders in the preview build.

export type Locale = "fi" | "en";
export type PageId = "majoitus" | "tyo" | "kuhmo";

export const SITE_URL = "https://www.matkakotikieppi.fi";
export const HUTS = "https://www.huts.fi";
export const isPreview = process.env.PREVIEW_EXPORT === "1";

/** Preview builds live under /preview/<site>; plain <img> and next/image need the prefix by hand. */
const BASE = process.env.BASE_PATH ?? "";
export const asset = (path: string) => `${BASE}${path}`;
const photo = (file: string) => asset(`/photos/${file}`);

type Text = Record<Locale, string>;
export type Photo = { src: string; fi: string; en: string };

export const business = {
  name: "Matkakoti Kieppi",
  owner: "Kari-Mikko Sarkkinen",
  street: "Vienantie 3",
  postalCode: "88900",
  town: "Kuhmo",
  region: { fi: "Kainuu", en: "Kainuu" },
  phone: "+358 40 199 8190",
  phoneLocal: "040 199 8190",
  email: "mmsarkkinen@gmail.com",
  facebook: "https://www.facebook.com/matkakotikieppi",
  booking: "https://www.booking.com/hotel/fi/motel-kieppi-kuhmo.html",
  rooms: 14,
  lat: 64.1244824,
  lng: 29.5142422,
};

export const tel = (phone: string) => `tel:${phone.replace(/\s/g, "")}`;
export const route = `https://www.google.com/maps/dir/?api=1&destination=${business.lat},${business.lng}`;

export const hutsPlace = {
  fi: "/suomi/kainuu/kuhmo/majoitus/matkakoti-kieppi-kuhmo",
  en: "/finland/kainuu/kuhmo/accommodation/matkakoti-kieppi-kuhmo",
};
export const mapEmbed = (locale: Locale) => `${HUTS}/embed${hutsPlace[locale]}?address=1&trails=1&hideAttr=1`;

export const photos = {
  outside: { src: photo("matkakoti-kieppi-ulkoa.jpg"), fi: "Matkakoti Kieppi ulkoa, Vienantie 3, Kuhmo", en: "Matkakoti Kieppi from outside, Vienantie 3, Kuhmo" },
  single: { src: photo("yhden-hengen-huone.jpg"), fi: "Tilava yhden hengen huone", en: "A spacious single room" },
  singleWindow: { src: photo("yhden-hengen-huone-ikkuna.jpg"), fi: "Yhden hengen huone ikkunan vierellä", en: "Single room by the window" },
  twin: { src: photo("kahden-hengen-huone.jpg"), fi: "Kahden hengen huone", en: "Twin room" },
  kitchen: { src: photo("asiakaskeittio.jpg"), fi: "Asiakaskeittiö", en: "The guest kitchen" },
  dining: { src: photo("ruokailutila.jpg"), fi: "Avara ruokailutila", en: "The spacious dining area" },
  breakfast: { src: photo("aamupala.jpg"), fi: "Monipuolinen aamupala", en: "A generous breakfast" },
  breakfastTable: { src: photo("aamupalapoyta.jpg"), fi: "Aamupalapöytä", en: "The breakfast table" },
  hall: { src: photo("kaytava-ja-keittio.jpg"), fi: "Käytävä ja yleiset tilat", en: "Corridor and common space" },
  showers: { src: photo("wc-ja-suihkukaytava.jpg"), fi: "WC- ja suihkukäytävä", en: "Toilets and showers" },
} satisfies Record<string, Photo>;

/** The one line Mikko changes most: shown above the header on every page. Empty string hides it. */
export const live = {
  notice: {
    fi: "Työmatkalla Kuhmossa? Kysy yritys- ja pitkäaikaismajoitusta",
    en: "Working in Kuhmo? Ask about company and long-term stays",
  },
};

export const paths = {
  home: { fi: "/", en: "/en" },
  majoitus: { fi: "/majoitus", en: "/en/accommodation" },
  tyo: { fi: "/tyo-ja-ryhmat", en: "/en/work-and-groups" },
  kuhmo: { fi: "/kuhmo", en: "/en/kuhmo" },
  contact: { fi: "/yhteystiedot", en: "/en/contact-us" },
} satisfies Record<string, Text>;

export const navOrder: PageId[] = ["majoitus", "tyo", "kuhmo"];

export const ui = {
  fi: {
    nav: { majoitus: "Huoneet", tyo: "Työ ja ryhmät", kuhmo: "Kuhmo", contact: "Yhteystiedot" },
    call: "Soita",
    email: "Sähköposti",
    route: "Reitti",
    ask: "Kysy huonetta",
    address: "Osoite",
    contactTitle: "Yhteystiedot",
    byCar: "Autolla",
    byCarText: "Vienantie 3, 88900 Kuhmo. Talvella auton lämmityspaikka kuuluu hintaan.",
    walk: "Kävellen",
    walkText: "Matkakoti on Kuhmon keskustassa. Juminkeko on 200 metrin päässä, ja keskustan ravintolat, kirjasto ja uimahalli ovat kävelymatkan päässä.",
    mapTitle: "Matkakoti Kieppi kartalla",
    mapCredit: "Kartta:",
    faqTitle: "Usein kysyttyä",
    findUs: "Sijainti",
    madeBy: "Sivut tehnyt ja ylläpitää",
    readMore: "Lue lisää",
    gallery: "Kuvat",
    allPhotos: "Kaikki kuvat",
    close: "Sulje",
    prev: "Edellinen",
    next: "Seuraava",
    askTitle: "Kysytään Mikolta",
    askNote: "Näkyy vain esikatselussa. Tähän tulee:",
    included: "Hintaan sisältyy",
    rooms: "huonetta",
    km: "km",
    m: "m",
    crow: "Etäisyydet linnuntietä Huts.fi-kartalta.",
    onHuts: "Huts.fi",
    alsoBooking: "Löydät meidät myös Booking.comista",
  },
  en: {
    nav: { majoitus: "Rooms", tyo: "Work & groups", kuhmo: "Kuhmo", contact: "Contact" },
    call: "Call",
    email: "Email",
    route: "Directions",
    ask: "Ask for a room",
    address: "Address",
    contactTitle: "Contact",
    byCar: "By car",
    byCarText: "Vienantie 3, 88900 Kuhmo, Finland. In winter, an electric car heater spot is included.",
    walk: "On foot",
    walkText: "We are in the centre of Kuhmo. Juminkeko is 200 metres away, and the town's restaurants, library and swimming hall are within walking distance.",
    mapTitle: "Matkakoti Kieppi on the map",
    mapCredit: "Map:",
    faqTitle: "Questions",
    findUs: "Location",
    madeBy: "Site built and maintained by",
    readMore: "Read more",
    gallery: "Photos",
    allPhotos: "All photos",
    close: "Close",
    prev: "Previous",
    next: "Next",
    askTitle: "To ask Mikko",
    askNote: "Only shown in the preview. This will hold:",
    included: "Included in the price",
    rooms: "rooms",
    km: "km",
    m: "m",
    crow: "Straight-line distances from the Huts.fi map.",
    onHuts: "Huts.fi",
    alsoBooking: "You can also find us on Booking.com",
  },
};

/* --------------------------- Shared facts --------------------------- */

/** What every room includes, word for word from the owner's own lists (Finnish and English pages). */
export const included: Record<Locale, string[]> = {
  fi: [
    "bed|Liinavaatteet ja pyyhkeet",
    "wifi|WiFi",
    "kitchen|Asiakaskeittiö ja ruokailutila käytössänne",
    "car|Ilmainen pysäköinti ja auton lämmityspaikka talvella",
    "lock|Lukittava huone, pesuallas ja peili huoneessa",
    "shower|WC ja suihku käytävällä yhteiskäytössä",
    "flame|Iltasauna tilauksesta",
    "coffee|Aamiainen juhannuksesta heinäkuun loppuun",
  ],
  en: [
    "bed|Towels and bed linen",
    "wifi|WiFi",
    "kitchen|Fully fitted guest kitchen and shared dining area",
    "car|Free parking and electric car heater spot",
    "lock|Lockable private room with washbasin and mirror",
    "shower|Shared toilets and showers on the corridor",
    "flame|Evening sauna on request",
    "coffee|Breakfast from Midsummer to the end of July",
  ],
};

export type Room = { id: string; name: Text; short: Text; text: Text; beds: Text; photo: Photo; photos: Photo[] };

export const rooms: Room[] = [
  {
    id: "yhden-hengen-huone",
    name: { fi: "Yhden hengen huone", en: "Single room" },
    short: { fi: "Varsin tilava huone yhdelle", en: "A quite spacious room for one" },
    text: {
      fi: "Matkakoti Kiepin yhden hengen huoneet ovat varsin tilavia. Huoneessa on oma pesuallas ja peili, ja oven saa lukkoon.",
      en: "Our single rooms are quite spacious. Each has its own washbasin and mirror, and the door locks.",
    },
    beds: { fi: "1 henkilö", en: "1 guest" },
    photo: photos.single,
    photos: [photos.single, photos.singleWindow],
  },
  {
    id: "kahden-hengen-huone",
    name: { fi: "Kahden hengen huone", en: "Twin room" },
    short: { fi: "Kaksi vuodetta, lisävuode mahdollinen", en: "Two beds, extra bed possible" },
    text: {
      fi: "Meillä majoitut mukavasti kahden hengen huoneissa, ja lisävuode on mahdollinen. Nyt saatavilla myös parivuoteellinen huone.",
      en: "Comfy rooms for two, with the option of an extra bed. A room with a double bed is now also available.",
    },
    beds: { fi: "2 henkeä + lisävuode", en: "2 guests + extra bed" },
    photo: photos.twin,
    photos: [photos.twin],
  },
];

export const commonPhotos: Photo[] = [photos.dining, photos.kitchen, photos.breakfast, photos.hall, photos.showers, photos.outside];

/**
 * The main places and routes near the guesthouse, picked by hand from huts.fi (ids are huts.fi place / route ids).
 * They show on the map next to the list; hovering or tapping a row highlights it on the map. No outbound links
 * (Jeff 2026-10-31: visitors should stay on the site). Straight lines from Vienantie 3, measured on huts.fi 2026-10-31.
 */
export type Nearby = { id: string; kind: "place" | "route"; name: Text; km: number; icon: string; text: Text; length?: number };
export const nearby: Nearby[] = [
  { id: "6e7cf632-c430-4583-a701-ed6b3b123438", kind: "route", km: 0.2, length: 4.8, icon: "footprints", name: { fi: "Kuhmon rantaraitti", en: "Kuhmo shore path" }, text: { fi: "Rantareitti keskustassa", en: "Lakeside path in town" } },
  { id: "7c9f7f41-2c69-4226-afe8-5e5cfc94810a", kind: "route", km: 0.6, length: 2.2, icon: "footprints", name: { fi: "Koskipolku", en: "Koskipolku rapids path" }, text: { fi: "Polku Pajakkakosken varrella", en: "Path along Pajakkakoski rapids" } },
  { id: "31283536-64b7-49ea-bc42-3aa3eabaf28a", kind: "route", km: 0.5, length: 11.8, icon: "waves", name: { fi: "Jämäksen melontareitti", en: "Jämäski canoe route" }, text: { fi: "Melontareitti", en: "Paddling route" } },
  { id: "b2c28514-b27a-4b23-9a08-cf6aecc7dc15", kind: "route", km: 0.5, length: 5.4, icon: "snow", name: { fi: "Unskin uran valaistu latu", en: "Unskin ura lit ski track" }, text: { fi: "Valaistu hiihtolatu", en: "Lit ski track" } },
  { id: "566623b0-c292-4168-b7f3-3774e6143d88", kind: "place", km: 0.2, icon: "book", name: { fi: "Juminkeko", en: "Juminkeko" }, text: { fi: "Kalevala-tietokeskus ja museo", en: "Kalevala information centre and museum" } },
  { id: "dbc89590-c2f0-4844-ab58-284c0ef3cba2", kind: "place", km: 0.5, icon: "utensils", name: { fi: "Eskobar", en: "Eskobar" }, text: { fi: "Ravintola keskustassa", en: "Restaurant in town" } },
  { id: "167783d7-6842-4dcd-90f6-6093efce5c39", kind: "place", km: 0.8, icon: "waves", name: { fi: "Ruukinrannan uimaranta", en: "Ruukinranta beach" }, text: { fi: "Uimaranta keskustassa", en: "Swimming beach in town" } },
  { id: "e4eefac4-20d0-41d1-94ce-5cb2fa0b296d", kind: "place", km: 0.8, icon: "waves", name: { fi: "Kuhmon uimahalli", en: "Kuhmo swimming hall" }, text: { fi: "Uimahalli", en: "Indoor swimming hall" } },
  { id: "6677498a-7a7a-4b43-897a-f7d58642ff78", kind: "place", km: 3.3, icon: "paw", name: { fi: "Luontokeskus Petola", en: "Petola nature centre" }, text: { fi: "Suurpedot ja luontopolku", en: "Large carnivores and a nature trail" } },
  { id: "ba20d635-7d1a-4962-aadf-6050681f3e72", kind: "place", km: 3.4, icon: "snow", name: { fi: "Kalevalan liikuntakeskus", en: "Kalevala sports centre" }, text: { fi: "Valaistut ladut, yhteys 80 km latuverkostoon", en: "Lit ski loops linked to an 80 km network" } },
];

/** The guesthouse map plus the hand-picked places and routes above (huts.fi embed params places= and routes=). */
export const nearbyEmbed = (locale: Locale) =>
  `${mapEmbed(locale)}&places=${nearby.filter((n) => n.kind === "place").map((n) => n.id).join(",")}&routes=${nearby.filter((n) => n.kind === "route").map((n) => n.id).join(",")}`;

/** Guest reviews go here once Jeff pastes them in: exact quote, first name, source and date read. Never as review schema. */
export type Review = { text: Text; name: string; source: "Booking.com" | "Google" | "Facebook"; date: string };
export const reviews: Review[] = [];

/* ------------------------------- Home ------------------------------- */

export const home = {
  fi: {
    title: "Matkakoti Kieppi – edullinen majoitus Kuhmon keskustassa",
    description:
      "Kodikasta ja edullista majoitusta Kuhmon keskustassa: 14 huonetta yhdelle tai kahdelle, liinavaatteet, WiFi, asiakaskeittiö ja auton lämmityspaikka. Yritys-, ryhmä- ja pitkäaikaismajoitus.",
    kicker: "Kuhmon keskusta · Kainuu",
    h1: "Kodikasta majoitusta Kuhmon keskustassa",
    lead: "Meillä on 14 kodikasta huonetta yhdelle tai kahdelle hengelle, ja lisävuode on mahdollinen. Liinavaatteet, WiFi ja asiakaskeittiö kuuluvat aina hintaan.",
    stats: [
      { value: "14", label: "huonetta" },
      { value: "200 m", label: "Juminkekoon" },
      { value: "1–3", label: "henkeä / huone" },
    ],
    includedTitle: "Kaikki tarpeellinen, ei mitään turhaa",
    includedText: "Sama hinta kattaa nämä jokaisessa huoneessa. Kysy edullisia pakettejamme!",
    roomsKicker: "Huoneet",
    roomsTitle: "Kaksi huonetyyppiä, sama kodikas talo",
    whoKicker: "Kenelle",
    whoTitle: "Kuhmoon töihin, konserttiin tai luontoon",
    who: [
      { icon: "music", title: "Kamarimusiikin vieraat", text: "Heinäkuussa Kuhmo täyttyy musiikista. Kesällä tarjolla myös aamiainen.", to: "kuhmo" },
      { icon: "briefcase", title: "Työmatkalaiset ja yritykset", text: "Majoitustarjouksia yritysten tarpeisiin. Auto lämpimänä aamulla.", to: "tyo" },
      { icon: "users", title: "Ryhmät", text: "Joukkueet, kuorot ja retkiryhmät. Aamiaisen voi tilata yli viidelle.", to: "tyo" },
      { icon: "calendar", title: "Pitkäaikainen majoitus", text: "Mahdollisuus myös pitkäaikaiseen majoittumiseen, keittiö käytössä.", to: "tyo" },
    ],
    commonKicker: "Yhteiset tilat",
    commonTitle: "Keittiö, ruokailutila ja aamupala",
    commonText:
      "Täysin varusteltu asiakaskeittiö ja avara ruokailutila ovat kaikkien vieraiden käytössä. Aamiainen on saatavilla pääsääntöisesti sesonkiaikaan eli juhannuksesta heinäkuun loppuun. Muina aikoina sen voi tilata erikseen yli viidelle hengelle.",
    reviewsKicker: "Vieraat sanovat",
    reviewsTitle: "Kodikas, siisti ja keskellä kaupunkia",
    nearbyKicker: "Lähellä",
    nearbyTitle: "Reitit ja paikat lähellä",
    hostKicker: "Isäntä",
    hostTitle: "Tervetuloa Kieppiin",
    hostPlaceholder: "Tähän tulee lyhyt esittely Mikosta ja kuva. Vieraat varaavat mieluummin, kun he tietävät kenen luo ovat tulossa.",
    ctaTitle: "Kysy vapaita huoneita",
    ctaText: "Soita tai lähetä sähköpostia, niin kerromme vapaat huoneet ja hinnan. Kysy myös ryhmä- ja yrityspaketteja.",
  },
  en: {
    title: "Matkakoti Kieppi – affordable rooms in the centre of Kuhmo, Finland",
    description:
      "Cosy, affordable private rooms in the heart of Kuhmo, Kainuu: 14 rooms for one or two, bed linen, WiFi, a guest kitchen and free parking with car heater. Company, group and long-term stays.",
    kicker: "Kuhmo town centre · Kainuu · Finland",
    h1: "Cosy private rooms in the heart of Kuhmo",
    lead: "We have 14 cosy rooms for one or two people, with an extra bed available. Towels and bed linen, WiFi and the guest kitchen are always included.",
    stats: [
      { value: "14", label: "rooms" },
      { value: "200 m", label: "to Juminkeko" },
      { value: "1–3", label: "guests / room" },
    ],
    includedTitle: "Everything you need, nothing you don't",
    includedText: "The same price covers all of this in every room. Ask about our special offers and packages!",
    roomsKicker: "Rooms",
    roomsTitle: "Two room types, one cosy house",
    whoKicker: "Who stays here",
    whoTitle: "In Kuhmo for work, music or nature",
    who: [
      { icon: "music", title: "Chamber music guests", text: "Every July Kuhmo fills with music. Breakfast is served in summer.", to: "kuhmo" },
      { icon: "briefcase", title: "Work trips and companies", text: "Offers for companies. Your car warm in the morning.", to: "tyo" },
      { icon: "users", title: "Groups", text: "Teams, choirs and outdoor groups. Breakfast on order for more than five.", to: "tyo" },
      { icon: "calendar", title: "Long-term stays", text: "Long-term accommodation is possible, with the kitchen to use.", to: "tyo" },
    ],
    commonKicker: "Shared spaces",
    commonTitle: "Kitchen, dining room and breakfast",
    commonText:
      "The fully fitted guest kitchen and the spacious dining area are open to all guests. Breakfast is mainly available in high season, from Midsummer to the end of July. At other times it can be ordered separately for more than five people.",
    reviewsKicker: "Guests say",
    reviewsTitle: "Cosy, clean and right in town",
    nearbyKicker: "Nearby",
    nearbyTitle: "Trails and places nearby",
    hostKicker: "Your host",
    hostTitle: "Welcome to Kieppi",
    hostPlaceholder: "A short introduction and a photo of Mikko goes here. Guests book more readily when they know who they are visiting.",
    ctaTitle: "Ask for a room",
    ctaText: "Call or email and we'll tell you the free rooms and the price. Ask about group and company packages too.",
  },
};

export const homeFaq: Record<Locale, { q: string; a: string }[]> = {
  fi: [
    { q: "Mitä huoneen hintaan sisältyy?", a: "Liinavaatteet ja pyyhkeet, WiFi, asiakaskeittiö ja ruokailutila, ilmainen pysäköinti ja talvella auton lämmityspaikka. Iltasaunan voi tilata erikseen." },
    { q: "Onko huoneissa oma kylpyhuone?", a: "Ei. Huoneessa on oma pesuallas ja peili, ja WC:t ja suihkut ovat käytävällä yhteiskäytössä." },
    { q: "Onko aamiaista?", a: "Aamiainen on saatavilla pääsääntöisesti juhannuksesta heinäkuun loppuun. Muina aikoina sen voi tilata erikseen yli viidelle hengelle." },
    { q: "Onko parivuoteellista huonetta?", a: "On. Kahden hengen huoneiden lisäksi meillä on nyt myös parivuoteellinen huone. Lisävuode on mahdollinen." },
    { q: "Majoitatteko yrityksiä ja ryhmiä?", a: "Kyllä. Teemme majoitustarjouksia yritysten ja ryhmien tarpeisiin, ja myös pitkäaikainen majoitus on mahdollista. Soita 040 199 8190." },
    { q: "Missä Matkakoti Kieppi on?", a: "Kuhmon keskustassa osoitteessa Vienantie 3, 88900 Kuhmo. Juminkeko on 200 metrin päässä." },
  ],
  en: [
    { q: "What does the room price include?", a: "Towels and bed linen, WiFi, the guest kitchen and dining area, free parking and an electric car heater spot. An evening sauna can be ordered separately." },
    { q: "Do rooms have a private bathroom?", a: "No. Each room has its own washbasin and mirror, and the toilets and showers are shared on the corridor." },
    { q: "Is breakfast served?", a: "Breakfast is mainly available from Midsummer to the end of July. At other times it can be ordered separately for more than five people." },
    { q: "Is there a double bed?", a: "Yes. Besides the twin rooms, a room with a double bed is now also available. An extra bed is possible." },
    { q: "Do you host companies and groups?", a: "Yes. We make accommodation offers for companies and groups, and long-term stays are possible too. Call +358 40 199 8190." },
    { q: "Where is Matkakoti Kieppi?", a: "In the centre of Kuhmo at Vienantie 3, 88900 Kuhmo, Finland. Juminkeko is 200 metres away." },
  ],
};

export const homeAsk: Record<Locale, string[]> = {
  fi: [
    "Kuva teistä ja pari lausetta: kuka Kieppiä pitää ja mistä lähtien",
    "Hinnat: yö yhdelle, yö kahdelle, lisävuode",
    "Tuloaika ja lähtöaika, ja miten avaimen saa myöhään illalla",
    "Lisää kuvia: talo kesällä ja talvella, piha ja parkkipaikka, sauna, parivuoteellinen huone",
    "Parhaat vieraiden kommentit (lisäämme lähteen kanssa)",
  ],
  en: [
    "A photo of you and a few lines: who runs Kieppi and since when",
    "Prices: a night for one, a night for two, extra bed",
    "Check-in and check-out times, and how late arrivals get the key",
    "More photos: the house in summer and winter, yard and parking, sauna, the double room",
    "Your best guest comments (we add them with the source)",
  ],
};

/* --------------------------- Content pages --------------------------- */

export type Section = { id?: string; title: string; text: string[] };
export type ContentPage = {
  title: string;
  description: string;
  kicker: string;
  h1: string;
  lead: string;
  hero: Photo;
  facts: string[];
  sections: Section[];
  faq: { q: string; a: string }[];
  ask: string[];
  photos: Photo[];
  cta: string;
};

export const pages: Record<PageId, Record<Locale, ContentPage>> = {
  majoitus: {
    fi: {
      title: "Huoneet – yhden ja kahden hengen huoneet Kuhmossa | Matkakoti Kieppi",
      description:
        "Matkakoti Kiepin yhden ja kahden hengen huoneet Kuhmon keskustassa. Parivuoteellinen huone ja lisävuode mahdollisia. Liinavaatteet, WiFi, asiakaskeittiö ja iltasauna tilauksesta.",
      kicker: "Huoneet",
      h1: "Yhden ja kahden hengen huoneet Kuhmon keskustassa",
      lead: "Huoneita yhdelle tai kahdelle hengelle, ja lisävuode on mahdollinen. Nyt saatavilla myös parivuoteellinen huone.",
      hero: photos.twin,
      facts: ["bed|14 huonetta", "users|1–2 henkeä + lisävuode", "wifi|WiFi ja liinavaatteet", "car|Auton lämmityspaikka"],
      sections: [
        {
          title: "Aamiainen",
          text: [
            "Aamiainen on saatavilla pääsääntöisesti sesonkiaikaan eli juhannuksesta heinäkuun loppuun. Muina aikoina erikseen tilattavissa yli viidelle hengelle.",
          ],
        },
        {
          title: "Iltasauna",
          text: ["Iltasaunan voi tilata erikseen. Kysy vuoroa, kun varaat huoneen."],
        },
        {
          title: "Keittiö ja yhteiset tilat",
          text: [
            "Asiakaskeittiömme on käytössänne. Siellä voi laittaa omat ruoat, ja avarassa ruokailutilassa mahtuu syömään isommallakin porukalla.",
            "WC- ja suihkutilat ovat käytävällä yhteiskäytössä. Huoneessa on oma pesuallas ja peili.",
          ],
        },
      ],
      faq: [
        { q: "Saako huoneeseen lisävuoteen?", a: "Kyllä, kahden hengen huoneisiin on mahdollista saada lisävuode. Kerro siitä varatessasi." },
        { q: "Onko huoneissa oma suihku?", a: "Ei, WC ja suihku ovat käytävällä yhteiskäytössä. Huoneessa on pesuallas ja peili." },
        { q: "Voinko laittaa itse ruokaa?", a: "Voit. Täysin varusteltu asiakaskeittiö ja ruokailutila ovat kaikkien vieraiden käytössä." },
      ],
      ask: [
        "Montako yhden hengen ja montako kahden hengen huonetta on, ja moneenko saa lisävuoteen?",
        "Onko huoneissa TV, jääkaappi tai vedenkeitin?",
        "Saako lemmikin tuoda?",
        "Aamiaisen hinta ja kellonaika kesällä",
        "Iltasaunan hinta ja milloin sitä voi tilata",
        "Kuva parivuoteellisesta huoneesta ja saunasta",
      ],
      photos: [photos.single, photos.singleWindow, photos.twin, photos.dining, photos.kitchen, photos.breakfast, photos.hall, photos.showers],
      cta: "Kysy vapaita huoneita",
    },
    en: {
      title: "Rooms – single and twin rooms in Kuhmo, Finland | Matkakoti Kieppi",
      description:
        "Single and twin rooms at Matkakoti Kieppi in the centre of Kuhmo, Finland. Double bed and extra bed available. Bed linen, WiFi, guest kitchen and evening sauna on request.",
      kicker: "Rooms",
      h1: "Single and twin rooms in the centre of Kuhmo",
      lead: "Rooms for one or two people, with an extra bed available. A room with a double bed is now also available.",
      hero: photos.twin,
      facts: ["bed|14 rooms", "users|1–2 guests + extra bed", "wifi|WiFi and bed linen", "car|Car heater spot"],
      sections: [
        {
          title: "Breakfast",
          text: [
            "Breakfast is mainly available in high season, from Midsummer to the end of July. At other times it can be ordered separately for more than five people.",
          ],
        },
        {
          title: "Evening sauna",
          text: ["An evening sauna can be ordered separately. Ask for a time when you book your room."],
        },
        {
          title: "Kitchen and shared spaces",
          text: [
            "The fully fitted guest kitchen is yours to use. Cook your own meals, and eat together in the spacious dining area.",
            "Toilets and showers are shared on the corridor. Each room has its own washbasin and mirror.",
          ],
        },
      ],
      faq: [
        { q: "Can I get an extra bed?", a: "Yes, an extra bed is possible in the twin rooms. Let us know when you book." },
        { q: "Do rooms have their own shower?", a: "No, toilets and showers are shared on the corridor. Each room has a washbasin and mirror." },
        { q: "Can I cook for myself?", a: "Yes. The fully fitted guest kitchen and dining area are open to all guests." },
      ],
      ask: [
        "How many single and twin rooms are there, and how many take an extra bed?",
        "Do rooms have a TV, fridge or kettle?",
        "Are pets allowed?",
        "Breakfast price and time in summer",
        "Evening sauna price and when it can be booked",
        "A photo of the double room and the sauna",
      ],
      photos: [photos.single, photos.singleWindow, photos.twin, photos.dining, photos.kitchen, photos.breakfast, photos.hall, photos.showers],
      cta: "Ask for a free room",
    },
  },
  tyo: {
    fi: {
      title: "Työmatka-, ryhmä- ja pitkäaikainen majoitus Kuhmossa | Matkakoti Kieppi",
      description:
        "Edullinen majoitus työmatkalaisille, yrityksille ja ryhmille Kuhmon keskustassa. Asiakaskeittiö, WiFi, auton lämmityspaikka ja mahdollisuus pitkäaikaiseen majoitukseen. Kysy tarjous.",
      kicker: "Työ ja ryhmät",
      h1: "Majoitus työmatkalaisille, yrityksille ja ryhmille",
      lead: "Majoitustarjouksia yritysten ja ryhmien tarpeisiin. Mahdollisuus myös pitkäaikaiseen majoittumiseen. Kysy: 040 199 8190!",
      hero: photos.dining,
      facts: ["briefcase|Yritystarjoukset", "calendar|Pitkäaikainen majoitus", "kitchen|Oma keittiö käytössä", "car|Auto lämpimänä aamulla"],
      sections: [
        {
          title: "Työmatkalle Kuhmoon",
          text: [
            "Keskustassa nukut rauhassa, laitat iltapalan asiakaskeittiössä ja WiFi toimii. Talvella auton lämmityspaikka kuuluu hintaan, joten aamulla pääsee suoraan liikkeelle.",
          ],
        },
        {
          title: "Ryhmät",
          text: [
            "Neljätoista huonetta riittää isommallekin porukalle. Aamiaisen voi tilata erikseen yli viidelle hengelle myös sesongin ulkopuolella, ja avarassa ruokailutilassa syödään yhdessä.",
          ],
        },
        {
          title: "Pitkäaikainen majoitus",
          text: [
            "Viikoksi, kuukaudeksi tai pidemmäksi aikaa. Kysy pitkäaikaisen majoituksen hintaa suoraan meiltä.",
          ],
        },
      ],
      faq: [
        { q: "Teettekö yrityksille tarjouksia?", a: "Kyllä. Kerro henkilömäärä ja ajankohta, niin teemme tarjouksen. Soita 040 199 8190 tai lähetä sähköpostia." },
        { q: "Voiko Kiepissä asua pidempään?", a: "Voi. Pitkäaikainen majoittuminen on mahdollista, ja asiakaskeittiö on käytössäsi." },
        { q: "Saako ryhmälle aamiaisen talvella?", a: "Kyllä, sesongin ulkopuolella aamiaisen voi tilata erikseen yli viidelle hengelle." },
      ],
      ask: [
        "Laskutatteko yrityksiä (verkkolasku tai paperilasku)?",
        "Viikko- ja kuukausihinta pitkäaikaiseen majoitukseen",
        "Onko pyykinpesumahdollisuutta?",
        "Voiko koko talon varata yhdelle ryhmälle?",
        "Ketkä teillä yleensä majoittuvat (esim. urakoitsijat, urheilujoukkueet, kuorot)?",
      ],
      photos: [photos.dining, photos.kitchen, photos.breakfastTable, photos.hall, photos.outside],
      cta: "Pyydä tarjous",
    },
    en: {
      title: "Work, group and long-term accommodation in Kuhmo | Matkakoti Kieppi",
      description:
        "Affordable rooms for work trips, companies and groups in the centre of Kuhmo, Finland. Guest kitchen, WiFi, car heater spot and long-term stays possible. Ask for an offer.",
      kicker: "Work & groups",
      h1: "Rooms for work trips, companies and groups",
      lead: "Accommodation offers for companies and groups. Long-term stays are possible as well. Call us: +358 40 199 8190!",
      hero: photos.dining,
      facts: ["briefcase|Company offers", "calendar|Long-term stays", "kitchen|Kitchen to use", "car|Car warm in the morning"],
      sections: [
        {
          title: "On a work trip to Kuhmo",
          text: [
            "Sleep in peace in the town centre, make your evening meal in the guest kitchen and stay online on the WiFi. In winter, the car heater spot is included, so you can set off straight away in the morning.",
          ],
        },
        {
          title: "Groups",
          text: [
            "Fourteen rooms fit a bigger group too. Breakfast can be ordered separately for more than five people outside the high season, and the spacious dining area seats everyone together.",
          ],
        },
        {
          title: "Long-term stays",
          text: ["For a week, a month or longer. Ask us directly for the long-term price."],
        },
      ],
      faq: [
        { q: "Do you make offers for companies?", a: "Yes. Tell us the number of people and the dates and we'll send an offer. Call +358 40 199 8190 or email us." },
        { q: "Can I stay long-term?", a: "Yes. Long-term accommodation is possible, and the guest kitchen is yours to use." },
        { q: "Can a group get breakfast in winter?", a: "Yes, outside the high season breakfast can be ordered separately for more than five people." },
      ],
      ask: [
        "Do you invoice companies (e-invoice or paper)?",
        "Weekly and monthly price for long-term stays",
        "Is there a laundry option?",
        "Can one group book the whole house?",
        "Who usually stays with you (contractors, sports teams, choirs…)?",
      ],
      photos: [photos.dining, photos.kitchen, photos.breakfastTable, photos.hall, photos.outside],
      cta: "Ask for an offer",
    },
  },
  kuhmo: {
    fi: {
      title: "Majoitus Kuhmon Kamarimusiikin ajaksi ja Kuhmon nähtävyydet | Matkakoti Kieppi",
      description:
        "Majoitu Kuhmon keskustassa Kamarimusiikin, Juminkekon ja Kainuun luonnon äärellä. Juminkeko 200 m, uimaranta ja uimahalli alle kilometrin, luontokeskus Petola ja ladut noin 3 km.",
      kicker: "Kuhmo",
      h1: "Kuhmon Kamarimusiikki, Kalevala ja Kainuun luonto",
      lead: "Matkakoti Kieppi on Kuhmon keskustassa. Kesällä tullaan musiikin, talvella latujen ja ympäri vuoden Kainuun luonnon takia.",
      hero: photos.outside,
      facts: ["music|Kamarimusiikki heinäkuussa", "book|Juminkeko 200 m", "paw|Petola noin 3 km", "snow|Ladut noin 3 km"],
      sections: [
        {
          id: "kamarimusiikki",
          title: "Kuhmon Kamarimusiikki",
          text: [
            "Kuhmon Kamarimusiikki on joka heinäkuu. Vuonna 2026 festivaali oli 12.–25.7. Festivaalin aikaan huoneet kannattaa kysyä ajoissa, ja aamiainen on tarjolla koko heinäkuun.",
          ],
        },
        {
          id: "kalevala",
          title: "Juminkeko ja Kalevala",
          text: [
            "Kalevala-tietokeskus Juminkeko on vain 200 metrin päässä. Keskustan ravintolat, kirjasto Atalante, uimahalli ja Ruukinrannan uimaranta ovat kaikki alle kilometrin päässä.",
          ],
        },
        {
          id: "luonto",
          title: "Luonto ja liikunta",
          text: [
            "Kuhmon luontokeskus Petola esittelee suurpetoja, ja sen luontopolku on noin kolmen kilometrin päässä. Kalevalan liikuntakeskuksen valaistuilta laduilta pääsee noin 80 kilometrin latuverkostoon.",
          ],
        },
      ],
      faq: [
        { q: "Pääseekö Kiepistä kävellen konsertteihin?", a: "Matkakoti on Kuhmon keskustassa, ja keskustan palvelut ovat kävelymatkan päässä. Juminkeko on 200 metrin päässä." },
        { q: "Kannattaako huone varata ajoissa Kamarimusiikin ajaksi?", a: "Kyllä. Festivaalin aikaan Kuhmossa on paljon vieraita, joten kysy huonetta hyvissä ajoin." },
        { q: "Mitä Kuhmossa voi tehdä talvella?", a: "Kalevalan liikuntakeskuksen valaistut ladut ovat noin 3 km päässä, ja uimahalli alle kilometrin päässä." },
      ],
      ask: [
        "Mitkä ovat teidän omat suosikkinne Kuhmossa? Minne neuvotte vieraita syömään tai retkelle?",
        "Teettekö yhteistyötä esimerkiksi karhunkatselun tai luontoretkien järjestäjien kanssa?",
        "Kuvia Kuhmosta eri vuodenaikoina, jos teillä on omia",
      ],
      photos: [photos.outside, photos.breakfast, photos.dining],
      cta: "Varaa huone ajoissa",
    },
    en: {
      title: "Where to stay for Kuhmo Chamber Music, and things to do in Kuhmo | Matkakoti Kieppi",
      description:
        "Stay in the centre of Kuhmo, Finland, for the Chamber Music Festival, Juminkeko and Kainuu nature. Juminkeko 200 m, beach and swimming hall under 1 km, Petola nature centre and ski trails about 3 km.",
      kicker: "Kuhmo",
      h1: "Kuhmo Chamber Music, the Kalevala and Kainuu nature",
      lead: "Matkakoti Kieppi is in the centre of Kuhmo. People come for the music in summer, the ski trails in winter and the Kainuu wilderness all year.",
      hero: photos.outside,
      facts: ["music|Chamber Music in July", "book|Juminkeko 200 m", "paw|Petola about 3 km", "snow|Ski trails about 3 km"],
      sections: [
        {
          id: "chamber-music",
          title: "Kuhmo Chamber Music",
          text: [
            "Kuhmo Chamber Music is held every July. In 2026 the festival ran from 12 to 25 July. Ask for rooms early for the festival weeks. Breakfast is served all through July.",
          ],
        },
        {
          id: "kalevala",
          title: "Juminkeko and the Kalevala",
          text: [
            "Juminkeko, the Kalevala information centre, is only 200 metres away. The town's restaurants, Atalante library, the swimming hall and Ruukinranta beach are all under a kilometre away.",
          ],
        },
        {
          id: "nature",
          title: "Nature and outdoor sports",
          text: [
            "Petola, Kuhmo's nature centre, presents Finland's large carnivores and has a nature trail, about three kilometres away. The lit loops at Kalevala sports centre link to a ski trail network of about 80 kilometres.",
          ],
        },
      ],
      faq: [
        { q: "Can I walk to the concerts?", a: "We are in the centre of Kuhmo, and the town's services are within walking distance. Juminkeko is 200 metres away." },
        { q: "Should I book early for Kuhmo Chamber Music?", a: "Yes. Kuhmo is busy during the festival, so ask for a room well in advance." },
        { q: "What is there to do in Kuhmo in winter?", a: "The lit ski loops of Kalevala sports centre are about 3 km away, and the swimming hall is under a kilometre away." },
      ],
      ask: [
        "Your own favourites in Kuhmo: where do you send guests to eat or explore?",
        "Do you work with bear-watching or nature-tour companies?",
        "Your own photos of Kuhmo in different seasons, if you have any",
      ],
      photos: [photos.outside, photos.breakfast, photos.dining],
      cta: "Book your room early",
    },
  },
};

export const contactPage = {
  fi: {
    title: "Yhteystiedot – Matkakoti Kieppi, Vienantie 3, Kuhmo",
    description: "Matkakoti Kieppi, Vienantie 3, 88900 Kuhmo. Puhelin 040 199 8190, sähköposti mmsarkkinen@gmail.com. Kysy edullisia pakettejamme!",
    h1: "Ota yhteyttä",
    lead: "Kysy edullisia pakettejamme! Vastaamme puhelimessa ja sähköpostilla.",
    ask: [
      "Y-tunnus sivun alalaitaan",
      "Vastaatteko myös tekstiviestiin tai WhatsAppiin?",
      "Ohjataanko varaukset Booking.comiin vai kaikki suoraan teille?",
    ],
  },
  en: {
    title: "Contact – Matkakoti Kieppi, Vienantie 3, Kuhmo, Finland",
    description: "Matkakoti Kieppi, Vienantie 3, 88900 Kuhmo, Finland. Phone +358 40 199 8190, email mmsarkkinen@gmail.com. Ask about our special offers and packages!",
    h1: "Contact us",
    lead: "Ask about our special offers and packages! We answer by phone and email.",
    ask: [
      "Business ID for the footer",
      "Do you also answer text messages or WhatsApp?",
      "Should bookings go to Booking.com, or all straight to you?",
    ],
  },
};

/** Copy for the enquiry form: opens the guest's email app with the details filled in. */
export const enquiry = {
  fi: {
    title: "Kysy vapaita huoneita",
    room: "Huone",
    any: "Mikä tahansa",
    arrive: "Tulopäivä",
    leave: "Lähtöpäivä",
    guests: "Henkeä",
    send: "Lähetä kysely",
    note: "Kysely avautuu sähköpostiisi valmiiksi täytettynä.",
    subject: "Huonekysely",
    body: (room: string, a: string, l: string, g: string) =>
      `Hei,\n\nHaluaisin kysyä vapaata huonetta.\n\nHuone: ${room}\nTulopäivä: ${a}\nLähtöpäivä: ${l}\nHenkeä: ${g}\n\nTerveisin,\n`,
  },
  en: {
    title: "Ask for a free room",
    room: "Room",
    any: "Any room",
    arrive: "Arrival",
    leave: "Departure",
    guests: "Guests",
    send: "Send enquiry",
    note: "Your email app opens with the enquiry filled in.",
    subject: "Room enquiry",
    body: (room: string, a: string, l: string, g: string) =>
      `Hello,\n\nI would like to ask about a free room.\n\nRoom: ${room}\nArrival: ${a}\nDeparture: ${l}\nGuests: ${g}\n\nBest regards,\n`,
  },
};

export function splitIcon(entry: string): [string, string] {
  const i = entry.indexOf("|");
  return i < 0 ? ["check", entry] : [entry.slice(0, i), entry.slice(i + 1)];
}

export function distance(km: number, locale: Locale) {
  if (km < 1) return `${Math.round(km * 1000)} m`;
  const n = locale === "fi" ? String(km).replace(".", ",") : String(km);
  return `${n} km`;
}
