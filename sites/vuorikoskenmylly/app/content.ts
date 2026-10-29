// Every fact here comes from the owner's old site (vuorikoskenmylly.com, read 2026-10-28)
// or from the photos he gave Huts.fi permission to use. Do not add numbers, distances,
// prices or features that are not in those sources. Unknowns are listed in `ask` and only
// show as placeholders in the preview build.

export type Locale = "fi" | "en";
export type PageId = "kahvila" | "putiikki" | "galleria" | "juhlatila" | "majoitus";

export const SITE_URL = "https://www.vuorikoskenmylly.com";
export const HUTS = "https://www.huts.fi";
export const isPreview = process.env.PREVIEW_EXPORT === "1";

/** Preview builds live under /preview/<site>; plain <img> and next/image need the prefix by hand. */
const BASE = process.env.BASE_PATH ?? "";
export const asset = (path: string) => `${BASE}${path}`;
const photo = (file: string) => asset(`/photos/${file}`);

/** Google rating, read from Google Maps by Jeff on 2026-10-29. Shown as text with a link only, never as review markup. */
export const googleRating = {
  score: 4.9,
  count: 162,
  checked: "2026-10-29",
  url: "https://www.google.com/maps/search/?api=1&query=Vuorikosken+Mylly+Tavolantie+18+Sammatti",
  text: { fi: "Googlessa", en: "on Google" },
  reviews: { fi: "arvostelua", en: "reviews" },
};

export const business = {
  name: "Vuorikosken Mylly",
  businessId: "1770144-7",
  vatId: "FI17701447",
  short: "VKM",
  founded: 1893,
  street: "Tavolantie 18",
  postalCode: "09220",
  village: "Sammatti",
  municipality: "Lohja",
  region: { fi: "Uusimaa", en: "Uusimaa" },
  phone: "+358 44 016 5047",
  phoneLocal: "044 016 5047",
  whatsapp: "https://wa.me/358440165047",
  email: "antti.jakola@hotmail.com",
  facebook: "https://www.facebook.com/vuorikoskenmylly",
  lat: 60.320835,
  lng: 23.8757639,
  mapEmbed: `${HUTS}/embed/suomi/org/vuorikosken-mylly?address=1`,
  history: "https://digi.kansalliskirjasto.fi/aikakausi/titles/0047-3677?display=THUMB&year=1932",
};

export const tel = (phone: string) => `tel:${phone.replace(/\s/g, "")}`;
export const route = `https://www.google.com/maps/dir/?api=1&destination=${business.lat},${business.lng}`;

type Text = Record<Locale, string>;
export type Photo = { src: string; fi: string; en: string };

export const photos = {
  porch: { src: photo("mylly-kuisti-galleria.jpg"), fi: "Myllyn kuisti kukkineen ja ovi galleriaan", en: "The mill porch with flowers and the door to the gallery" },
  cake: { src: photo("kahvila-gluteeniton-kakku.jpg"), fi: "Suklaakakku myllyn kahvilassa", en: "Chocolate cake in the mill café" },
  shop: { src: photo("sisustusputiikki.jpg"), fi: "Second hand -sisustusputiikki myllyssä", en: "The second-hand interior shop inside the mill" },
  wheel: { src: photo("myllyn-vesiratas.jpg"), fi: "Myllyn vesiratas ja koski", en: "The mill's water wheel and rapids" },
  rapids: { src: photo("vuorikoski-syksylla.jpg"), fi: "Vuorikoski syksyllä", en: "Vuorikoski rapids in autumn" },
  pond: { src: photo("myllylampi-kesailta.jpg"), fi: "Myllylampi kesäiltana", en: "The mill pond on a summer evening" },
  breakfast: { src: photo("aamiainen-kahvilassa.jpg"), fi: "Lautasaamiainen ja juhlatilan pitkä pöytä", en: "Plated breakfast and the long table in the event room" },
  nutHut: { src: photo("mutterimokki-lammella.jpg"), fi: "Mutterimökki myllylammen rannalla", en: "The Mutteri cabin on the mill pond shore" },
  lantern: { src: photo("mokki-lyhdyn-valossa.jpg"), fi: "Mökki lyhdyn valossa", en: "A cabin by lantern light" },
  bed: { src: photo("mokki-sanky.jpg"), fi: "Mutterimökin sänky ja led-lyhty", en: "The Mutteri cabin bed and LED lantern" },
  studio: { src: photo("rantayksio-sisalta.jpg"), fi: "Rantayksiö sisältä", en: "Inside the Beach studio" },
  // From the mill's Facebook page (owner's permission 2026-10-28), picked and captioned from the post texts.
  sign: { src: photo("mylly-kyltti-vintage-shop.jpg"), fi: "Vuorikosken Myllyn kyltti pihalla: Vintage Shop to–su 11–17", en: "The Vuorikosken Mylly sign in the yard: Vintage Shop Thu–Sun 11–17" },
  spring: { src: photo("mylly-kevaalla.jpg"), fi: "Vuorikosken mylly keväällä", en: "Vuorikosken Mylly in spring" },
  yard: { src: photo("myllyn-piha-kesalla.jpg"), fi: "Myllyn piha ja kukat kesällä", en: "The mill yard and flowers in summer" },
  summer: { src: photo("kesa-vuorikoskella.jpg"), fi: "Kesä Vuorikoskella: terassi, mylly ja koski", en: "Summer at Vuorikoski: terrace, mill and rapids" },
  autumn: { src: photo("syksy-vuorikoskella.jpg"), fi: "Syksyinen Vuorikoski", en: "Vuorikoski in autumn" },
  christmas: { src: photo("joulu-myllyn-ovella.jpg"), fi: "Joulun valot myllyn ovella", en: "Christmas lights at the mill door" },
  winter: { src: photo("mylly-talvella.jpg"), fi: "Mylly talvella", en: "The mill in winter" },
  skis: { src: photo("sukset-talvella.jpg"), fi: "Vanhat sukset myllyn seinällä", en: "Old skis against the mill wall" },
  aerial: { src: photo("vanha-ilmakuva.jpg"), fi: "Vanha ilmakuva Vuorikoskelta", en: "An old aerial photo of Vuorikoski" },
  window: { src: photo("myllyn-ikkuna.jpg"), fi: "Myllyn ikkuna pihalle", en: "A mill window onto the yard" },
  rapidsSummer: { src: photo("koski-kesalla.jpg"), fi: "Vuorikoski kesällä (kuva: Satu Posti)", en: "Vuorikoski rapids in summer (photo: Satu Posti)" },
  yard2: { src: photo("piha-kesalla.jpg"), fi: "Pihapiiri kesällä", en: "The farmyard in summer" },
  buns: { src: photo("puustit.jpg"), fi: "Päivän tuoreet puustit", en: "Fresh cinnamon buns of the day" },
  pies: { src: photo("herkkupoyta-piiraat.jpg"), fi: "Gluteeniton herkkupöytä: piiraat ja kakut", en: "The gluten-free spread: pies and cakes" },
  cakes: { src: photo("kakut.jpg"), fi: "Kakkuja myllyn keittiöstä", en: "Cakes from the mill kitchen" },
  savoury: { src: photo("suolaiset-piiraat.jpg"), fi: "Suolaisia ja makeita herkkuja", en: "Savoury and sweet bakes" },
  spread: { src: photo("herkkupoyta.jpg"), fi: "Kahvilan herkkupöytä", en: "The café spread" },
  shelves: { src: photo("putiikki-hyllyt.jpg"), fi: "Putiikin hyllyt ja artesaaniherkut", en: "Shop shelves and artisan treats" },
  lamps: { src: photo("putiikki-valaisimet.jpg"), fi: "Valaisimia ja kristallia putiikissa", en: "Lamps and crystal in the shop" },
  pillow: { src: photo("sammatti-tyyny-ja-tuotteet.jpg"), fi: "Sammatti-tyyny ja putiikin tuotteita", en: "The Sammatti cushion and other shop items" },
  shopEvening: { src: photo("putiikki-iltavalossa.jpg"), fi: "Putiikki iltavalossa", en: "The shop in the evening light" },
  homeGoods: { src: photo("kesakodin-tuotteet.jpg"), fi: "Pellavaa, tuoksupusseja ja siivoussuihkeita", en: "Linen, scent sachets and cleaning sprays" },
  soaps: { src: photo("saippuat.jpg"), fi: "Oliiviöljypohjaiset saippuat Ranskasta", en: "Olive oil soaps from France" },
  knives: { src: photo("kasintehdyt-puukot.jpg"), fi: "Timo Laurilan käsintehdyt puukot", en: "Handmade knives by Timo Laurila" },
  jars: { src: photo("artesaaniherkut.jpg"), fi: "Vuorikosken artesaaniherkut", en: "Vuorikoski's artisan treats" },
  cabinet: { src: photo("antiikkikabinetti-joulu.jpg"), fi: "Joulumallisto myllyn antiikkikabinetissa", en: "The Christmas range in the mill's antique room" },
  galleryRoom: { src: photo("galleria-nayttely.jpg"), fi: "Näyttely myllyn galleriassa", en: "An exhibition in the mill gallery" },
  galleryArtist: { src: photo("galleria-tiina-kuusisto.jpg"), fi: "Tiina Kuusiston Väri ja muoto -näyttely", en: "Tiina Kuusisto's Colour and Form exhibition" },
  oldTools: { src: photo("wanhat-vehkeet.jpg"), fi: "Wanhat vehkeet: entisajan käyttöesineitä galleriassa", en: "Old tools: everyday objects of the past in the gallery" },
  longTable: { src: photo("juhlatila-pitka-poyta.jpg"), fi: "Juhlatilan pitkä pöytä myllyn alasiivessä", en: "The long table in the mill's lower wing" },
  partySet: { src: photo("juhlatila-katettu.jpg"), fi: "Juhlatila katettuna juhliin", en: "The event room set for a party" },
  chandelier: { src: photo("juhlatila-kynttilakruunu.jpg"), fi: "Juhlatila ja kynttiläkruunu", en: "The event room and chandelier" },
  partyFood: { src: photo("juhlatila-ja-sima.jpg"), fi: "Simaa, piirakkaa ja juhlatila", en: "Mead, pies and the event room" },
  cabinNight: { src: photo("mokki-kynttilanvalossa.jpg"), fi: "Mökki kynttilänvalossa", en: "A cabin by candlelight" },
  fireRoom: { src: photo("kahvila-takkahuone.jpg"), fi: "Hirsiseinäinen takkahuone myllyssä", en: "The log-walled fireplace room in the mill" },
  cafeRoom: { src: photo("kahvila-sisatila.jpg"), fi: "Myllyn kahvilan sisätila: antiikkituoleja, lamppuja ja lankkuseinät", en: "Inside the mill café: antique chairs, lamps and plank walls" },
  glogi: { src: photo("glogi.jpg"), fi: "Vuorikosken oma glögi", en: "Vuorikoski's own glögi" },
  sammattiPillows: { src: photo("sammatti-tyynyt.jpg"), fi: "Sammatti-tyynyt, Vuorikosken omaa tuotantoa", en: "Sammatti cushions, made by Vuorikoski" },
  ownJams: { src: photo("omat-hillot.jpg"), fi: "Vuorikosken omat hillot", en: "Vuorikoski's own jams" },
  shopShelves: { src: photo("putiikki-hyllyt.jpg"), fi: "Tuoksuvia kodintuotteita ja hillopurkkeja putiikin hyllyillä", en: "Scented home products and jars on the shop shelves" },
} satisfies Record<string, Photo>;

/* ------------------------------------------------------------------ */
/* What Antti edits himself (opening days, notices, lodging status).   */
/* Kept apart from the page copy so an editor can swap this one block. */
/* ------------------------------------------------------------------ */

// `days` (0 = Sunday … 6 = Saturday) limits a long range to some weekdays, e.g. summer Thu–Sun.
export type OpenDay = { from: string; to: string; open: string; close: string; label: Text; days?: number[] };
export type MillEvent = { from: string; to: string; open: string; close: string; name: string; text: Text };

const d = (from: string, to: string, close: string, fi: string, en: string, days?: number[]): OpenDay => ({
  from, to, open: "11:00", close, label: { fi, en }, ...(days ? { days } : {}),
});

export const live = {
  updated: "2026-10-29",
  // Shown in the black bar on every page. Empty string hides it.
  notice: {
    fi: "Avoinna pyhäinpäivänä la–su 31.10.–1.11. klo 11–16 · Joulupuoti adventtiviikonloppuina",
    en: "Open on All Saints' weekend, Sat–Sun 31 Oct–1 Nov, 11–16 · Christmas shop on Advent weekends",
  },
  // Café and vintage shop opening days. Antti's 2027 list, 29.10.2026.
  openDays: [
    d("2026-10-31", "2026-11-01", "16:00", "Pyhäinpäivä", "All Saints' weekend"),
    d("2026-11-07", "2026-11-08", "16:00", "Isänpäivä", "Father's Day weekend"),
    d("2026-11-28", "2026-11-29", "16:00", "Joulupuoti", "Christmas shop"),
    d("2026-12-05", "2026-12-06", "16:00", "Joulupuoti", "Christmas shop"),
    d("2026-12-12", "2026-12-13", "16:00", "Joulupuoti", "Christmas shop"),
    d("2026-12-19", "2026-12-20", "16:00", "Joulupuoti", "Christmas shop"),
    d("2027-03-27", "2027-03-29", "17:00", "Pääsiäinen", "Easter"),
    d("2027-05-01", "2027-05-02", "17:00", "Vappu", "May Day"),
    d("2027-05-08", "2027-05-09", "17:00", "Äitienpäivä", "Mother's Day"),
    d("2027-06-05", "2027-06-06", "17:00", "Koulujen päättäjäiset", "End of the school year"),
    d("2027-06-12", "2027-06-13", "17:00", "Kesäviikonloppu", "Summer weekend"),
    d("2027-06-17", "2027-08-08", "17:00", "Kesän pitkät viikonloput, ma–ke suljettu", "Summer long weekends, closed Mon–Wed", [4, 5, 6, 0]),
    d("2027-08-14", "2027-08-15", "17:00", "Kesäviikonloppu", "Summer weekend"),
    d("2027-08-21", "2027-08-22", "17:00", "Kesäviikonloppu", "Summer weekend"),
    d("2027-08-28", "2027-08-29", "17:00", "Venetsialaiset, kesäkausi päättyy", "Venetian night, last summer weekend"),
    d("2027-10-30", "2027-10-31", "16:00", "Pyhäinpäivä", "All Saints' weekend"),
    d("2027-11-13", "2027-11-14", "16:00", "Isänpäivä", "Father's Day weekend"),
    d("2027-11-27", "2027-11-28", "16:00", "Joulunavaus, joulupuoti aukeaa", "Christmas opening, the Christmas shop opens"),
    d("2027-12-04", "2027-12-05", "16:00", "Joulupuoti", "Christmas shop"),
    d("2027-12-11", "2027-12-12", "16:00", "Joulupuoti", "Christmas shop"),
    d("2027-12-18", "2027-12-19", "16:00", "Joulupuoti", "Christmas shop"),
  ] satisfies OpenDay[],
  // Breaks between the opening days, shown under the list.
  breaks: {
    fi: "Syystauko 30.8.–29.10.2027 · Talvitauko 20.12.2027–14.4.2028",
    en: "Autumn break 30 Aug–29 Oct 2027 · Winter break 20 Dec 2027–14 Apr 2028",
  },
  // Shown when every date above has passed.
  offSeason: {
    fi: "Mylly on talvitauolla 14.4.2028 asti. Kevään aukiolopäivät päivitetään tänne.",
    en: "The mill is on its winter break until 14 April 2028. The spring opening days will be posted here.",
  },
  lodgingStatus: {
    fi: "Kesä 2026 on loppuunmyyty. Kesän 2027 varauskalenteri (15.5.–15.8.) avautuu pääsiäisenä 27.3.2027.",
    en: "Summer 2026 is fully booked. Bookings for summer 2027 (15 May–15 Aug) open at Easter, 27 March 2027.",
  },
  // Events at the mill in 2027 (Antti, 29.10.2026). Also published as schema.org Events.
  events: [
    { from: "2027-03-27", to: "2027-03-29", open: "11:00", close: "17:00", name: "Pääsiäisherkuttelut", text: { fi: "Pääsiäisen herkkuja kahvilassa", en: "Easter treats in the café" } },
    { from: "2027-05-01", to: "2027-05-02", open: "11:00", close: "17:00", name: "Vuorikosken Simaralli", text: { fi: "Simaa ja munkkeja vappuna", en: "Mead and doughnuts on May Day" } },
    { from: "2027-05-08", to: "2027-05-09", open: "11:00", close: "17:00", name: "Onnea Äiti", text: { fi: "Äitienpäiväviikonloppu", en: "Mother's Day weekend" } },
    { from: "2027-06-05", to: "2027-06-06", open: "11:00", close: "17:00", name: "School's out Party", text: { fi: "Koulujen päättäjäisviikonloppu", en: "End-of-school weekend" } },
    { from: "2027-07-24", to: "2027-07-25", open: "11:00", close: "17:00", name: "Christmas in July", text: { fi: "Joulumallisto ennakkoon keskellä kesää", en: "The Christmas range early, in midsummer" } },
    { from: "2027-08-28", to: "2027-08-29", open: "11:00", close: "17:00", name: "Vuorikosken Venetsialaiset", text: { fi: "Kesäkauden päätös", en: "The end of the summer season" } },
    { from: "2027-10-30", to: "2027-10-31", open: "11:00", close: "16:00", name: "Pyhäinpäivä", text: { fi: "Pyhäinpäivän viikonloppu", en: "All Saints' weekend" } },
    { from: "2027-11-13", to: "2027-11-14", open: "11:00", close: "16:00", name: "Onnea Isä", text: { fi: "Isänpäiväviikonloppu", en: "Father's Day weekend" } },
    { from: "2027-11-27", to: "2027-11-28", open: "11:00", close: "16:00", name: "Vuorikosken Joulunavaus", text: { fi: "Joulupuoti aukeaa", en: "The Christmas shop opens" } },
  ] satisfies MillEvent[],
};

/* ------------------------------------------------------------------ */

export const paths = {
  home: { fi: "/", en: "/en" },
  kahvila: { fi: "/kahvila", en: "/en/cafe" },
  putiikki: { fi: "/putiikki", en: "/en/vintage-shop" },
  galleria: { fi: "/galleria", en: "/en/art-gallery" },
  juhlatila: { fi: "/juhlatila", en: "/en/event-room" },
  majoitus: { fi: "/majoitus", en: "/en/stay" },
  contact: { fi: "/yhteystiedot", en: "/en/contact" },
} satisfies Record<string, Text>;

export const hutsLinks: { label: Text; fi: string; en: string }[] = [
  { label: { fi: "Kahvila Huts.fi:ssä", en: "Café on Huts.fi" }, fi: "/suomi/uusimaa/lohja/erakahvilat/vuorikosken-mylly-kahvio-lohja", en: "/finland/uusimaa/lohja/wilderness-cafes/vuorikosken-mylly-wilderness-cafe-lohja" },
  { label: { fi: "Majoitus Huts.fi:ssä", en: "Stay on Huts.fi" }, fi: "/suomi/uusimaa/lohja/lomamokit/vuorikosken-mylly-lohja", en: "/finland/uusimaa/lohja/holiday-cabins/vuorikosken-mylly-lohja" },
  { label: { fi: "Rantayksiö Huts.fi:ssä", en: "Beach studio on Huts.fi" }, fi: "/suomi/uusimaa/lohja/lomamokit/rantayksio-vuorikosken-mylly-lohja", en: "/finland/uusimaa/lohja/holiday-cabins/beach-studio-vuorikosken-mylly-lohja" },
  { label: { fi: "Rantasauna Huts.fi:ssä", en: "Shore sauna on Huts.fi" }, fi: "/suomi/uusimaa/lohja/saunat/vuorikosken-myllyn-rantasauna-lohja", en: "/finland/uusimaa/lohja/saunas/vuorikosken-mylly-beach-sauna-lohja" },
];

export const ui = {
  fi: {
    nav: { kahvila: "Kahvila", putiikki: "Putiikki", galleria: "Galleria", juhlatila: "Juhlatila", majoitus: "Majoitus", contact: "Aukiolo ja yhteys" },
    call: "Soita",
    route: "Reitti",
    whatsapp: "WhatsApp",
    openToday: "Avoinna tänään",
    openNext: "Seuraavaksi avoinna",
    allDays: "Kaikki aukiolopäivät",
    hours: "Aukiolo",
    address: "Osoite",
    contactTitle: "Yhteystiedot",
    byCar: "Autolla",
    byCarText: "Tavolantie 18, 09220 Sammatti (Lohja). Navigaattoriin osoite tai karttalinkki alta.",
    byBus: "Bussilla",
    byBusText: "Lohjalta Sammattiin, Myllykylän pysäkille. Pysäkiltä on 200 metrin kävely. Katso ajantasaiset aikataulut Matkahuollon sivuilta.",
    mapTitle: "Vuorikosken Mylly kartalla",
    mapCredit: "Kartta:",
    faqTitle: "Usein kysyttyä",
    findUs: "Löydä perille",
    madeBy: "Sivut tehnyt ja ylläpitää",
    readMore: "Lue lisää",
    backHome: "Etusivulle",
    gallery: "Kuvat",
    close: "Sulje",
    prev: "Edellinen",
    next: "Seuraava",
    prices: "Hinnat",
    askTitle: "Kysytään Antilta",
    askNote: "Näkyy vain esikatselussa. Tähän tulee:",
  },
  en: {
    nav: { kahvila: "Café", putiikki: "Vintage shop", galleria: "Gallery", juhlatila: "Event room", majoitus: "Stay", contact: "Hours & contact" },
    call: "Call",
    route: "Directions",
    whatsapp: "WhatsApp",
    openToday: "Open today",
    openNext: "Next open",
    allDays: "All opening days",
    hours: "Opening hours",
    address: "Address",
    contactTitle: "Contact",
    byCar: "By car",
    byCarText: "Tavolantie 18, 09220 Sammatti (Lohja). Use the address or the map link below.",
    byBus: "By bus",
    byBusText: "From Lohja to Sammatti, Myllykylä stop. It is a 200 metre walk from the stop. Check current timetables on the Matkahuolto site.",
    mapTitle: "Vuorikosken Mylly on the map",
    mapCredit: "Map:",
    faqTitle: "Questions",
    findUs: "Find us",
    madeBy: "Site built and maintained by",
    readMore: "Read more",
    backHome: "Home",
    gallery: "Photos",
    close: "Close",
    prev: "Previous",
    next: "Next",
    prices: "Prices",
    askTitle: "To ask Antti",
    askNote: "Only shown in the preview. This will hold:",
  },
};

export const navOrder: PageId[] = ["kahvila", "putiikki", "galleria", "juhlatila", "majoitus"];

// The Huts.fi place each page shows on its map. Shop and gallery have no place of their own, so they show the whole mill.
const millOrg = { fi: "/suomi/org/vuorikosken-mylly", en: "/finland/org/vuorikosken-mylly" };
export const mapPlaces: Record<PageId, Text> = {
  kahvila: { fi: "/suomi/uusimaa/lohja/erakahvilat/vuorikosken-mylly-kahvio-lohja", en: "/finland/uusimaa/lohja/wilderness-cafes/vuorikosken-mylly-wilderness-cafe-lohja" },
  putiikki: millOrg,
  galleria: millOrg,
  juhlatila: { fi: "/suomi/uusimaa/lohja/kokous-ja-tapahtumatilat/vuorikosken-myllyn-juhlatila-lohja", en: "/finland/uusimaa/lohja/meeting-event-hire/vuorikosken-mylly-event-room-lohja" },
  majoitus: { fi: "/suomi/uusimaa/lohja/lomamokit/vuorikosken-mylly-lohja", en: "/finland/uusimaa/lohja/holiday-cabins/vuorikosken-mylly-lohja" },
};

/* ------------------------------- Home ------------------------------- */

export const home = {
  fi: {
    title: "Vuorikosken Mylly – kahvila, vintage-putiikki ja galleria Sammatissa, Lohja",
    description:
      "Vuonna 1893 rakennettu mylly Sammatissa, Lohjalla: gluteeniton kahvila, second hand -sisustusputiikki ja vintage-vaatteet, kesän taidenäyttelyt, juhlatila ja pieni aamiaismajoitus myllylammen rannalla.",
    kicker: "Sammatti · Lohja · Vuodesta 1893",
    h1: "Kahvila, vintage-putiikki ja galleria vanhassa myllyssä",
    lead: "Elämyskohde perinteisessä myllymiljöössä Sammatin Myllykylässä. Gluteenittomat herkut, persoonalliset löydöt ja kesän taidenäyttelyt, kaikki saman katon alla.",
    wordTitle: "mylly",
    wordClass: "subst.",
    word: [
      { id: "kahvila", title: "Kahvila", text: "Tuoretta kahvia, teetä, gluteeniton herkkupöytä ja päivän puustit. Lemmikit ovat tervetulleita." },
      { id: "putiikki", title: "Sisustusputiikki", text: "Second hand -löytöjä itselle tai lahjaksi, tilan omia artesaaniherkkuja, paikallisten kädentaitajien töitä sekä vintage-vaatteita." },
      { id: "galleria", title: "Galleria", text: "Kesäisin neljä erilaista taiteentekijää omissa näyttelyissään myllyn galleriassa." },
      { id: "juhlatila", title: "Juhlatila", text: "Pitkä pöytä kokouksille ja pienille perhejuhlille kesäkauden ajan." },
    ] satisfies { id: PageId; title: string; text: string }[],
    cafeKicker: "Myllyn kahvila",
    cafeTitle: "Gluteeniton herkkupöytä ja päivän puustit",
    cafeText:
      "Kahvilassa on tarjolla tuoretta kahvia, teetä ja tilalla leivottuja gluteenittomia ja laktoosittomia makeita ja suolaisia herkkuja, päivittäin myös vegaaninen vaihtoehto. Pikkupöydässä odottavat päivän tuoreet vehnäiset puustit. Kuumana kesäpäivänä viilentävät Vuorikosken oma mango-sitrus-jäätee ja icelatte.",
    cafePills: ["wheat|Gluteeniton herkkupöytä", "chef|Leivottu tilalla", "dog|Lemmikit tervetulleita", "cup|Oma jäätee ja icelatte"],
    shopKicker: "Sisustusputiikki",
    shopTitle: "Persoonallisia löytöjä järkevään hintaan",
    shopText:
      "Second hand -sisustusputiikki on täynnä löytöjä itselle tai lahjaksi. Jokainen esine puhdistetaan huolellisesti ja kunnostetaan tarpeen mukaan, ja valaisimet saavat käsintehdyt varjostimet. Vuorikosken omat hillot, glögit ja Sammatti-tekstiilit, lähialueen artesaanien työt ja vintage-vaatteet täydentävät valikoimaa.",
    splitTitle: "Muutakin myllyllä",
    splitEvents: { kicker: "Juhlat ja kokoukset", title: "Pitkän pöydän juhlatila", text: "Kokouksiin ja pieniin perhejuhliin kesäkaudella, 50 € tunnilta." },
    splitStay: { kicker: "Yöksi myllylle", title: "Kaksi pientä mökkiä lammen rannalla", text: "Sähköttömät kesämökit, rantasauna ja lautasaamiainen kahvilassa." },
    historyKicker: "Historia",
    historyTitle: "Mylly jauhoi, sahasi ja teki sähköä",
    historyText: [
      "Sammatin maalaisidylliin vuonna 1893 rakennettu mylly jauhoi osuuskuntalaisten viljat, sahasi puutavarat ja tuotti vielä sähköäkin kyläläisten tarpeisiin. Sittemmin yksityisomistukseen siirtynyt tila sai nimekseen Vuorikoski silloisen omistajansa mukaan.",
      "Tänä päivänä tilalla asuu visuaalisilla aloilla toimiva yrittäjäpariskunta. Alkuperäiseen asuunsa palautettu mylly on avoinna kesäkaudella ja joulun alla adventtiviikonloppuina. Vuonna 2023 myllyn rakentamisesta tuli kuluneeksi 130 vuotta, ja kesällä 2026 viisi vuotta siitä, kun kyltti kannettiin tienvarteen ja Vuorikosken nykyinen tarina alkoi.",
    ],
    historyLink: "Lisää Sammatin ja Myllykylän myllyjen historiasta (Kansalliskirjasto)",
    eventsKicker: "Tapahtumat",
    eventsTitle: "Tapahtumat 2027",
    eventsText: "Pääsiäisestä joulunavaukseen. Aiempina kesinä pihalla on ollut myös sunnuntaisoittoja, pihakirppiksiä ja Löytölän euron pöytä. Uudet tapahtumat ilmoitetaan tällä sivulla ja Facebookissa.",
    seasonsTitle: "Mylly vuoden ympäri",
    visitTitle: "Tule käymään",
    ctaTitle: "Nähdään myllyllä",
    ctaText: "Kysy juhlatilasta, majoituksesta tai näyttelypaikasta puhelimella tai WhatsAppilla.",
  },
  en: {
    title: "Vuorikosken Mylly – café, vintage shop and art gallery in Sammatti, Lohja, Finland",
    description:
      "A water mill built in 1893 in Sammatti, Lohja: a gluten-free café, second-hand interior and vintage clothing shop, summer art exhibitions, an event room and small B&B cabins by the mill pond.",
    kicker: "Sammatti · Lohja · Since 1893",
    h1: "A café, vintage shop and gallery in an old water mill",
    lead: "A countryside destination in a traditional mill setting in Myllykylä, Sammatti. Gluten-free bakes, one-of-a-kind finds and summer art shows, all under one roof.",
    wordTitle: "mylly",
    wordClass: "noun, Finnish for mill",
    word: [
      { id: "kahvila", title: "Café", text: "Fresh coffee, tea, a gluten-free spread of bakes and the day's cinnamon buns. Pets are welcome." },
      { id: "putiikki", title: "Interior shop", text: "Second-hand finds for yourself or as gifts, the farm's own artisan treats, local crafts and vintage clothing." },
      { id: "galleria", title: "Gallery", text: "Every summer, four different artists show their work in the mill gallery." },
      { id: "juhlatila", title: "Event room", text: "A long table for meetings and small family parties in the summer season." },
    ] satisfies { id: PageId; title: string; text: string }[],
    cafeKicker: "The mill café",
    cafeTitle: "A gluten-free spread and fresh cinnamon buns",
    cafeText:
      "The café serves fresh coffee, tea and gluten-free, lactose-free sweet and savoury bakes made on the farm, with a vegan option every day. A small side table holds the day's fresh wheat cinnamon buns. On hot summer days, Vuorikoski's own mango-citrus iced tea and iced latte cool you down.",
    cafePills: ["wheat|Gluten-free spread", "chef|Baked on the farm", "dog|Pets welcome", "cup|Own iced tea and iced latte"],
    shopKicker: "Interior shop",
    shopTitle: "One-of-a-kind finds at fair prices",
    shopText:
      "The second-hand interior shop is full of finds for yourself or as gifts. Every piece is carefully cleaned and restored where needed, and lamps get handmade shades. Vuorikoski's own jams, glögi and Sammatti textiles, work by local artisans and vintage clothing complete the range.",
    splitTitle: "More at the mill",
    splitEvents: { kicker: "Parties and meetings", title: "The long-table event room", text: "For meetings and small family parties in the summer season, €50 per hour." },
    splitStay: { kicker: "Stay the night", title: "Two small cabins by the pond", text: "Off-grid summer cabins, a shore sauna and plated breakfast in the café." },
    historyKicker: "History",
    historyTitle: "The mill ground grain, sawed timber and made electricity",
    historyText: [
      "Built in 1893 in the Sammatti countryside, the mill ground grain for the cooperative's members, sawed timber and even produced electricity for the village. The farm later passed into private hands and took the name Vuorikoski after its owner at the time.",
      "Today the farm is home to an entrepreneur couple working in visual fields. Restored to its original look, the mill is open in the summer season and on Advent weekends before Christmas. In 2023 the mill turned 130, and summer 2026 marked five years since the sign went up by the road and today's Vuorikoski began.",
    ],
    historyLink: "More on the history of Sammatti and the Myllykylä mills (National Library, in Finnish)",
    eventsKicker: "Events",
    eventsTitle: "Events in 2027",
    eventsText: "From Easter to the Christmas opening. Past summers have also brought Sunday music in the yard, yard flea markets and the one-euro Löytölä table. New events are posted on this page and on Facebook.",
    seasonsTitle: "The mill through the year",
    visitTitle: "Visit",
    ctaTitle: "See you at the mill",
    ctaText: "Ask about the event room, the cabins or an exhibition slot by phone or WhatsApp.",
  },
};

export const homeFaq: Record<Locale, { q: string; a: string }[]> = {
  fi: [
    { q: "Onko kahvilassa gluteenitonta?", a: "On. Tilalla leivotut makeat ja suolaiset herkut ovat gluteenittomia ja laktoosittomia, ja päivittäin on vähintään yksi vegaaninen vaihtoehto. Erillisessä pikkupöydässä on lisäksi päivän tuoreita vehnäisiä puusteja." },
    { q: "Saako koiran tuoda kahvilaan?", a: "Saa. Lemmikit ovat tervetulleita kahvilaan. Terassilla on raikasta juomavettä, ja puristekalkkuna-namit tarjoillaan kassalta." },
    { q: "Milloin Vuorikosken Mylly on auki?", a: "Pääsiäisestä elokuun loppuun juhlaviikonloppuina klo 11–17 ja 17.6.–8.8. joka to–su, syksyllä pyhäinpäivänä ja isänpäivänä sekä joulupuotina adventtiviikonloppuina klo 11–16. Kaikki päivät ovat Aukiolo ja yhteys -sivulla." },
    { q: "Missä mylly on?", a: "Osoitteessa Tavolantie 18, 09220 Sammatti. Sammatti kuuluu Lohjan kaupunkiin Länsi-Uudellamaalla." },
    { q: "Pääseekö myllylle bussilla?", a: "Pääsee. Lohjalta kulkee bussi Sammattiin Myllykylän pysäkille, josta on 200 metrin kävely." },
    { q: "Voiko myllyllä yöpyä?", a: "Voi. Myllylammen rannalla on kaksi pientä sähkötöntä kesämökkiä 1–2 hengelle, ja lisäksi voi varata rantasaunan ja aamiaisen. Kysy vapaita päiviä puhelimella tai WhatsAppilla." },
  ],
  en: [
    { q: "Is there gluten-free food in the café?", a: "Yes. The sweet and savoury bakes made on the farm are gluten-free and lactose-free, and there is at least one vegan option every day. A separate small table also has the day's fresh wheat cinnamon buns." },
    { q: "Can I bring my dog to the café?", a: "Yes. Pets are welcome in the café. There is fresh drinking water on the terrace and pressed turkey treats at the counter." },
    { q: "When is Vuorikosken Mylly open?", a: "From Easter to the end of August on holiday weekends 11–17 and every Thu–Sun from 17 June to 8 August, then on All Saints' and Father's Day weekends and as a Christmas shop on Advent weekends, 11–16. All the days are on the Hours & contact page." },
    { q: "Where is the mill?", a: "At Tavolantie 18, 09220 Sammatti. Sammatti is part of the town of Lohja in West Uusimaa, Finland." },
    { q: "Can I get there by bus?", a: "Yes. A bus runs from Lohja to Sammatti, to the Myllykylä stop, which is a 200 metre walk from the mill." },
    { q: "Can I stay overnight?", a: "Yes. There are two small off-grid summer cabins for 1–2 people by the mill pond, and you can add the shore sauna and breakfast. Ask for free dates by phone or WhatsApp." },
  ],
};

/* --------------------------- Service pages --------------------------- */

export type Section = { id?: string; title: string; text: string[] };
export type PriceRow = { item: string; price: string };
export type Unit = { id: string; name: string; photo: Photo; beds: string; text: string; hutsPath?: { fi: string; en: string } };

export type ServicePage = {
  title: string;
  description: string;
  kicker: string;
  h1: string;
  lead: string;
  hero: Photo;
  facts: string[];
  sections: Section[];
  units?: Unit[];
  prices?: { title: string; rows: PriceRow[]; note?: string };
  photos: Photo[];
  faq: { q: string; a: string }[];
  ask: string[];
  cta: string;
};

export const pages: Record<PageId, Record<Locale, ServicePage>> = {
  kahvila: {
    fi: {
      title: "Gluteeniton kahvila Sammatissa, Lohja | Vuorikosken Myllyn kahvila",
      description:
        "Kahvila vanhassa myllyssä Sammatissa, Lohjalla. Gluteenittomat ja laktoosittomat tilalla leivotut kakut ja piiraat 5,90 €, päivittäin vegaaninen vaihtoehto, puustit, kakkutilaukset ja koskiterassi. Koirat tervetulleita.",
      kicker: "Myllyn kahvila · Sammatti",
      h1: "Gluteeniton kahvila vanhassa myllyssä",
      lead: "Tuoretta kahvia, teetä ja tilalla leivottuja gluteenittomia ja laktoosittomia makeita ja suolaisia herkkuja perinteisessä myllymiljöössä. Nauti paikan päällä tai ota mukaan.",
      hero: photos.cafeRoom,
      facts: ["wheat|Gluteeniton ja laktoositon", "leaf|Päivittäin vegaaninen vaihtoehto", "users|50 asiakaspaikkaa, terassit mukaan lukien", "dog|Lemmikit tervetulleita"],
      sections: [
        {
          title: "Tilalla leivottua, gluteenitonta ja laktoositonta",
          text: [
            "Paikan päällä leivotut tuotteemme ovat laktoosittomia ja gluteenittomia. Poikkeuksen tekevät puustit, jotka valmistuvat perinteisestä vehnätaikinasta ja odottavat omassa pikkupöydässään.",
            "Makeista valitset vaikkapa maailman parhaan porkkanakakun, konjakkisuklaan tai vegaanisen mustikkapiirakan vaniljakastikkeen kera. Suolaisia suosikkeja ovat kylmäsavuporo-, sienimestari- ja kolmen juuston piiras.",
            "Tarjolla on päivittäin vähintään yksi vegaaninen vaihtoehto, joka ei sisällä maitoa, kanamunaa eikä muitakaan eläinperäisiä raaka-aineita. Kysy lisää allergeeneistä henkilökunnalta.",
            "Palan painikkeeksi kahvi, tee tai kaakao. Kesäkeleillä viilentävät talon oma mango-sitrus-jäätee ja icelatte. Herkut voi nauttia paikan päällä tai ostaa mukaan kotiin.",
          ],
        },
        {
          id: "tilaukset",
          title: "Tilaa herkut omiin juhliin",
          text: ["Voit tilata minkä tahansa makean herkun tai suolaisen piiraan kahvilan valikoimista omiin juhliisi. Kokonainen kakku maksaa 39 € ja riittää 12 herkuttelijalle. Tilaustuotteiden toimitusaika on kaksi viikkoa. Tilaa tekstiviestillä tai WhatsAppilla 044 016 5047."],
        },
        {
          title: "Sisällä ja koskiterassilla",
          text: ["Sisällä on 20 asiakaspaikkaa, ja aurinko- ja koskiterassi mukaan lukien paikkoja on yhteensä 50. Pihassa on parkkitilaa 20 autolle. Myllyyn kuljetaan luiskaa pitkin, ja oviaukossa on matala kynnys."],
        },
        {
          title: "Koira mukaan",
          text: ["Myös lemmikit ovat tervetulleita kahvilaan. Terassilla on tarjolla raikasta juomavettä, ja puristekalkkuna-namit tarjoillaan kassalta."],
        },
        {
          title: "Aamiainen majoittujille",
          text: ["Myllyn majoituksessa yöpyvät voivat tilata lautasaamiaisen, joka tarjoillaan kahvilassa sovittuna aikana ja räätälöidään jokaisen ruokavalioon sopivaksi."],
        },
      ],
      prices: {
        title: "Hinnat",
        rows: [
          { item: "Kakut ja makeat piiraat", price: "5,90 € / pala" },
          { item: "Suolaiset piiraat", price: "5,90 € / pala" },
          { item: "Kahvi, tee tai kaakao", price: "2,90 €" },
          { item: "Oma jäätee tai icelatte", price: "2,40 € / lasi" },
          { item: "Kokonainen kakku tilauksesta (12 hlö)", price: "39 €" },
        ],
        note: "Maksu kortilla, käteisellä tai MobilePaylla.",
      },
      photos: [photos.cafeRoom, photos.pies, photos.fireRoom, photos.buns, photos.cakes, photos.savoury, photos.spread, photos.cake, photos.breakfast, photos.summer],
      faq: [
        { q: "Onko kaikki gluteenitonta?", a: "Paikan päällä leivotut tuotteet ovat gluteenittomia ja laktoosittomia. Poikkeuksena ovat puustit, jotka tehdään perinteisestä vehnätaikinasta." },
        { q: "Onko vegaanista?", a: "On. Tarjolla on päivittäin vähintään yksi vegaaninen vaihtoehto, esimerkiksi vegaaninen mustikkapiirakka vaniljakastikkeen kera." },
        { q: "Voiko kakun tilata?", a: "Voi. Minkä tahansa kahvilan makean herkun tai suolaisen piiraan voi tilata omiin juhliin. Kakku maksaa 39 € ja riittää 12 hengelle. Toimitusaika on kaksi viikkoa." },
        { q: "Miten voi maksaa?", a: "Kortilla, käteisellä tai MobilePaylla." },
        { q: "Saako koiran tuoda sisälle?", a: "Lemmikit ovat tervetulleita kahvilaan. Terassilla on vettä ja kassalta saa puristekalkkuna-namin." },
        { q: "Milloin kahvila on auki?", a: "Pääsiäisestä elokuun loppuun juhlaviikonloppuina klo 11–17 ja 17.6.–8.8. joka to–su, syksyllä pyhäinpäivänä ja isänpäivänä sekä joulupuotina adventtiviikonloppuina klo 11–16. Kaikki päivät ovat Aukiolo ja yhteys -sivulla." },
      ],
      ask: [],
      cta: "Tule kahville myllylle",
    },
    en: {
      title: "Gluten-free café in Sammatti, Lohja | Vuorikosken Mylly café",
      description:
        "A café in an old water mill in Sammatti, Lohja, Finland. Gluten-free and lactose-free cakes and pies baked on the farm, €5.90 a slice, a vegan option every day, cinnamon buns, cake orders and a riverside terrace. Dogs welcome.",
      kicker: "The mill café · Sammatti",
      h1: "A gluten-free café in an old water mill",
      lead: "Fresh coffee, tea and gluten-free, lactose-free sweet and savoury bakes made on the farm, in a traditional mill setting. Enjoy them here or take them home.",
      hero: photos.cafeRoom,
      facts: ["wheat|Gluten-free and lactose-free", "leaf|A vegan option every day", "users|50 seats with the terraces", "dog|Pets welcome"],
      sections: [
        {
          title: "Baked on the farm, gluten-free and lactose-free",
          text: [
            "Everything baked here is lactose-free and gluten-free. The exception is the cinnamon buns, made from traditional wheat dough, which wait on their own small table.",
            "On the sweet side, try the world's best carrot cake, cognac chocolate cake or vegan blueberry pie with vanilla sauce. Savoury favourites are the cold-smoked reindeer, mushroom and three-cheese pies.",
            "There is at least one vegan option every day, with no milk, egg or other animal products. Ask the staff about allergens.",
            "Have it with coffee, tea or cocoa. On hot days, the house mango-citrus iced tea and iced latte cool you down. Enjoy everything here or take it home.",
          ],
        },
        {
          id: "tilaukset",
          title: "Order bakes for your party",
          text: ["You can order any sweet bake or savoury pie from the café's range for your own celebration. A whole cake costs €39 and serves 12. Orders take two weeks. Order by text message or WhatsApp, +358 44 016 5047."],
        },
        {
          title: "Indoors and on the riverside terrace",
          text: ["There are 20 seats indoors and 50 in all with the sun terrace and the riverside terrace. The yard has parking for 20 cars. A ramp leads into the mill, with a low threshold at the door."],
        },
        { title: "Bring the dog", text: ["Pets are welcome in the café too. There is fresh drinking water on the terrace, and pressed turkey treats are handed out at the counter."] },
        { title: "Breakfast for overnight guests", text: ["Guests staying in the mill cabins can order a plated breakfast, served in the café at an agreed time and tailored to each guest's diet."] },
      ],
      prices: {
        title: "Prices",
        rows: [
          { item: "Cakes and sweet pies", price: "€5.90 / slice" },
          { item: "Savoury pies", price: "€5.90 / slice" },
          { item: "Coffee, tea or cocoa", price: "€2.90" },
          { item: "House iced tea or iced latte", price: "€2.40 / glass" },
          { item: "Whole cake to order (serves 12)", price: "€39" },
        ],
        note: "Pay by card, cash or MobilePay.",
      },
      photos: [photos.cafeRoom, photos.pies, photos.fireRoom, photos.buns, photos.cakes, photos.savoury, photos.spread, photos.cake, photos.breakfast, photos.summer],
      faq: [
        { q: "Is everything gluten-free?", a: "Everything baked here is gluten-free and lactose-free, except the cinnamon buns, which are made from traditional wheat dough." },
        { q: "Is there anything vegan?", a: "Yes. There is at least one vegan option every day, such as vegan blueberry pie with vanilla sauce." },
        { q: "Can I order a cake?", a: "Yes. You can order any sweet bake or savoury pie from the café's range. A cake costs €39 and serves 12. Orders take two weeks." },
        { q: "How can I pay?", a: "By card, cash or MobilePay." },
        { q: "Can I bring my dog inside?", a: "Pets are welcome in the café. There is water on the terrace and a turkey treat at the counter." },
        { q: "When is the café open?", a: "From Easter to the end of August on holiday weekends 11–17 and every Thu–Sun from 17 June to 8 August, then on All Saints' and Father's Day weekends and as a Christmas shop on Advent weekends, 11–16. All the days are on the Hours & contact page." },
      ],
      ask: [],
      cta: "Come for coffee at the mill",
    },
  },
  putiikki: {
    fi: {
      title: "Vintage- ja sisustusputiikki Sammatissa, Lohja | Vuorikosken Mylly",
      description:
        "Second hand -sisustusputiikki vanhassa myllyssä Sammatissa, Lohjalla: kunnostettuja löytöjä, käsintehdyin varjostimin tehtyjä valaisimia, vintage-vaatteita, Vuorikosken omia hilloja, glögiä ja Sammatti-tekstiilejä. Joulupuoti adventtiviikonloppuina.",
      kicker: "Sisustusputiikki · Sammatti",
      h1: "Vintage- ja sisustusputiikki myllyssä",
      lead: "Second hand -sisustusputiikki täynnä persoonallisia löytöjä itselle tai lahjaksi. Kaikki saman katon alta järkevään hintaan.",
      hero: photos.lamps,
      facts: ["lamp|Valaisimet käsintehdyin varjostimin", "shirt|Vintage-vaatteet", "jar|Omat hillot, säilykkeet ja glögit", "hand|Lähialueen artesaanien työt"],
      sections: [
        {
          title: "Löytöjä itselle tai lahjaksi",
          text: [
            "Myllyn putiikin valikoima koostuu tarkoin valituista second hand -sisustustavaroista, jotka puhdistetaan huolellisesti ja kunnostetaan tarpeen mukaan. Välillä pintaan tarvitaan uutta väriä, toisinaan materiaalista muokataan jotain täysin uutta.",
            "Sisustusvalaisimet käsintehtyine varjostimineen ovat putiikin suosituimpia tuotteita. Valikoimaa täydentävät valikoidut vintage-vaatteet.",
            "Valtaosa tavarasta löytyy ostomatkoilta Etelä-Suomesta: kirpputoreilta, osto- ja myyntiliikkeistä ja hyväntekeväisyysjärjestöiltä. Pieni oma maahantuonti täydentää valikoimaa, esimerkiksi lasisilla joulukoristeilla suoraan Euroopasta ja erikoispolttimoilla sisustusvalaisimiin.",
          ],
        },
        {
          title: "Vuorikosken omaa tuotantoa",
          text: [
            "Sammatti-tekstiilit, makeat ja suolaiset herkkusäilykkeet, glögit ja tuoksuvat kodintuotteet ovat Vuorikosken omaa tuotantoa. Luonnonkosmetiikkaa, käsin tehtyjä postikortteja ja puukkoja, kuten Timo Laurilan puukot, valmistavat lähialueen artesaanit.",
            "Löytölän pöydässä aarteita on ollut tarjolla eurolla kappale.",
          ],
        },
        { id: "myy-meille", title: "Lahjoita tai myy meille", text: ["Otamme vastaan isompaa ja pienempää kodintavaraa lahjoituksina, ja ostamme jonkin verran tuotteita myös yksityishenkilöiltä. Kysy tekstiviestillä tai WhatsAppilla 044 016 5047."] },
        { id: "joulupuoti", title: "Joulupuoti adventtiviikonloppuina", text: ["Joulun alla mylly avautuu joulupuodiksi adventtiviikonloppuina. Ajantasaiset päivät ja kellonajat ovat sivun ylälaidassa.", "Heinäkuussa Christmas in July -tapahtumassa koko joulumallisto on ollut ennakkomyynnissä myllyn antiikkikabinetissa."] },
      ],
      photos: [photos.lamps, photos.shopShelves, photos.sammattiPillows, photos.ownJams, photos.glogi, photos.shelves, photos.shopEvening, photos.homeGoods, photos.knives, photos.soaps, photos.cabinet, photos.shop],
      faq: [
        { q: "Mitä putiikista löytyy?", a: "Kunnostettua second hand -sisustustavaraa, valaisimia käsintehdyin varjostimin, vintage-vaatteita, Vuorikosken omia hilloja, glögejä ja Sammatti-tekstiilejä sekä lähialueen artesaanien töitä." },
        { q: "Ostatteko tavaraa?", a: "Otamme vastaan kodintavaraa lahjoituksina ja ostamme jonkin verran tuotteita myös yksityishenkilöiltä." },
        { q: "Miten voi maksaa?", a: "Kortilla, käteisellä tai MobilePaylla." },
        { q: "Onko putiikki auki jouluna?", a: "Joulupuoti on avoinna adventtiviikonloppuina. Katso päivät sivun ylälaidasta." },
      ],
      ask: ["Muutama esimerkki tuotteista ja hintahaarukka", "Kuvia vintage-vaatteista"],
      cta: "Tule tekemään löytöjä",
    },
    en: {
      title: "Vintage and interior shop in Sammatti, Lohja | Vuorikosken Mylly",
      description:
        "A second-hand interior shop in an old water mill in Sammatti, Lohja, Finland: restored finds, lamps with handmade shades, vintage clothing, Vuorikoski's own jams, glögi and Sammatti textiles. Christmas shop on Advent weekends.",
      kicker: "Interior shop · Sammatti",
      h1: "A vintage and interior shop in the mill",
      lead: "A second-hand interior shop full of one-of-a-kind finds for yourself or as gifts. All under one roof at fair prices.",
      hero: photos.lamps,
      facts: ["lamp|Lamps with handmade shades", "shirt|Vintage clothing", "jar|Own jams, preserves and glögi", "hand|Work by local artisans"],
      sections: [
        {
          title: "Finds for yourself or as gifts",
          text: [
            "The shop's range is carefully chosen second-hand interior pieces, each one thoroughly cleaned and restored where needed. Sometimes a piece gets a new coat of paint, and sometimes the material becomes something completely new.",
            "Lamps with handmade shades are among the shop's most popular items. Selected vintage clothing completes the range.",
            "Most pieces are found on buying trips around southern Finland: at flea markets, second-hand dealers and charity shops. A small import of our own adds to the range, such as glass Christmas ornaments straight from Europe and special bulbs for decorative lamps.",
          ],
        },
        {
          title: "Made at Vuorikoski",
          text: [
            "Sammatti textiles, sweet and savoury preserves, glögi and scented home products are made by Vuorikoski. Natural cosmetics, handmade postcards and knives, such as Timo Laurila's knives, come from local artisans.",
            "The Löytölä table has offered treasures at one euro each.",
          ],
        },
        { id: "myy-meille", title: "Donate or sell to us", text: ["We take larger and smaller household items as donations, and we also buy some items from private sellers. Ask by text message or WhatsApp, +358 44 016 5047."] },
        { id: "joulupuoti", title: "Christmas shop on Advent weekends", text: ["Before Christmas the mill opens as a Christmas shop on Advent weekends. Current days and times are at the top of the page.", "In July, at the Christmas in July event, the whole Christmas range has been on early sale in the mill's antique room."] },
      ],
      photos: [photos.lamps, photos.shopShelves, photos.sammattiPillows, photos.ownJams, photos.glogi, photos.shelves, photos.shopEvening, photos.homeGoods, photos.knives, photos.soaps, photos.cabinet, photos.shop],
      faq: [
        { q: "What does the shop sell?", a: "Restored second-hand interior pieces, lamps with handmade shades, vintage clothing, Vuorikoski's own jams, glögi and Sammatti textiles, and work by local artisans." },
        { q: "Do you buy items?", a: "We take household items as donations and also buy some items from private sellers." },
        { q: "How can I pay?", a: "By card, cash or MobilePay." },
        { q: "Is the shop open at Christmas?", a: "The Christmas shop is open on Advent weekends. See the days at the top of the page." },
      ],
      ask: ["A few example items and a price range", "Photos of the vintage clothing"],
      cta: "Come and find something",
    },
  },
  galleria: {
    fi: {
      title: "Taidenäyttelyt Sammatissa – myllyn galleria, Lohja | Vuorikosken Mylly",
      description:
        "Kesän taidenäyttelyt vanhassa myllyssä Sammatissa, Lohjalla. Galleria auki kesällä to–su. Kesän 2028 näyttelyjaksot haettavana 17.6.–8.8.2027: tilavuokra 100 € / 8 päivää, myyntiprovisio 25 %.",
      kicker: "Galleria · Sammatti",
      h1: "Kesän taidenäyttelyt myllyn galleriassa",
      lead: "Joka kesä myllyn galleriassa esittäytyy neljä erilaista taiteentekijää. Kesällä 2027 galleria on auki 17.6.–8.8. torstaista sunnuntaihin klo 11–17.",
      hero: photos.galleryRoom,
      facts: ["frame|Neljä näyttelyä kesässä", "calendar|8 päivän näyttelyjaksot", "euro|Tilavuokra 100 €", "percent|Myyntiprovisio 25 %"],
      sections: [
        { title: "Galleriakesä 2027", text: ["Galleria on auki 17.6.–8.8.2027 to–su klo 11–17, ma–ke suljettu. Kesän 2027 näyttelyjen haku päättyi 9.8.2026, ja lopulliset valinnat tehdään vuodenvaihteessa. Kesän taiteilijat esitellään täällä, kun ne ovat selvillä."] },
        {
          id: "naeyttelyt",
          title: "Menneet näyttelyt 2023–2026",
          text: [
            "2026: Suvi Koivisto-Kanervo, Franco Figari (valokuvia) ja Nina Haatio (grafiikka).",
            "2025: Sirkku Salo, Mia Nurmi, Heidi Krogerus ja Leo Vuorinen (Katse metsästä, valokuvia).",
            "2024: Tiina Kuusisto (Väri ja muoto), Ritva Korhonen, Nina Haatio ja Marika Raunio.",
            "2023: Inga-lill Sundqvist, Terttu Ahola, Nina Haatio ja Mika Törönen.",
            "Wanhat vehkeet -näyttelyssä esillä oli lisäksi entisajan käyttöesineitä puusepänverstaasta keittiötöihin ja metsätöistä kelkkamäkeen, osa myytävänä.",
          ],
        },
        {
          id: "taiteilijoille",
          title: "Taiteilijoille: hae näyttelypaikkaa kesälle 2028",
          text: [
            "Kesän 2028 näyttelyjaksot ovat haettavissa 17.6.–8.8.2027. Näyttelypaikkaa haetaan vapaamuotoisella hakemuksella muutamien havainnekuvien kera. Lähetä viesti sähköpostilla tai WhatsAppilla. Galleristi pidättää oikeuden valikoida edustamansa taiteilijat ja esiteltävät teokset.",
            "Pystytyspäivät ovat näyttelyä edeltävät maanantai–keskiviikko, ja tarkemmat ajankohdat sovitaan tilannekohtaisesti. Taiteilija pystyttää näyttelynsä itse. Näyttelykohtainen ovikyltti, rautalanka, leikkurit ja muut tarvikkeet sisältyvät tilanvuokraan.",
            "Kaikkien töiden tulee olla myytävissä, ellei toisin sovita etukäteen. Taiteilija toimittaa teoslistan hintoineen pdf-muodossa tai valmiina tulosteina. Teosnumerotarrat ja myytyjen töiden tarratäplät löytyvät paikan päältä. Vieraskirja, käyntikortit ja ansioluettelo ovat toivottavia mutta vapaaehtoisia, samoin paikalla olo osan näyttelypäivistä. Galleristi ei valvo näyttelytilaa jatkuvasti.",
            "Galleristi avaa ja sulkee näyttelytilan päivittäin, huolehtii siisteydestä, mainostaa näyttelyä sosiaalisen median kanavissaan, myy teokset ja ilmoittaa ostajille noutoajat tekstiviestillä. Myös taiteilija saa jakaa tietoa näyttelystä eri alustoilla.",
          ],
        },
      ],
      prices: {
        title: "Näyttelyn hinnat",
        rows: [
          { item: "Tilavuokra, 8 näyttelypäivää", price: "100 €" },
          { item: "Varausmaksu näyttelyn varmistuessa (osa tilavuokraa)", price: "50 €" },
          { item: "Loppuosa pystytyksen yhteydessä", price: "50 €" },
          { item: "Myyntiprovisio", price: "25 %" },
          { item: "Galleristin tekemä pystytys, alkava tunti", price: "47 €" },
        ],
        note: "Varausmaksu on sitova, eikä sitä palauteta, vaikka näyttely ei toteutuisi meistä riippumattomista syistä. Tilitykset myynneistä näyttelyjakson päätyttyä tilisiirtona tai käteisellä. Maksu kortilla tai käteisellä.",
      },
      photos: [photos.galleryRoom, photos.galleryArtist, photos.oldTools, photos.porch],
      faq: [
        { q: "Milloin näyttelypaikkaa voi hakea?", a: "Kesän 2028 näyttelyihin 17.6.–8.8.2027. Kesän 2027 haku päättyi 9.8.2026." },
        { q: "Miten näyttelypaikkaa haetaan?", a: "Vapaamuotoisella viestillä ja muutamalla havainnekuvalla sähköpostiin antti.jakola@hotmail.com tai WhatsAppiin 044 016 5047." },
        { q: "Paljonko näyttely maksaa?", a: "Tilavuokra on 100 € kahdeksalta näyttelypäivältä ja myyntiprovisio 25 %." },
        { q: "Pitääkö taiteilijan olla paikalla?", a: "Ei ole pakko, mutta paikalla olo osan näyttelypäivistä on suotavaa." },
      ],
      ask: ["Kesän 2027 taiteilijat, kun valinnat on tehty vuodenvaihteessa", "Kuva kustakin menneestä näyttelystä, jos löytyy (arkistoon)", "Kuvia galleriatilasta sisältä"],
      cta: "Hae näyttelypaikkaa",
    },
    en: {
      title: "Art exhibitions in Sammatti – the mill gallery, Lohja | Vuorikosken Mylly",
      description:
        "Summer art exhibitions in an old water mill in Sammatti, Lohja, Finland. Open Thu–Sun in summer. Slots for summer 2028 open 17 June–8 August 2027: €100 for 8 days, 25% sales commission.",
      kicker: "Gallery · Sammatti",
      h1: "Summer art exhibitions in the mill gallery",
      lead: "Every summer, four different artists show their work in the mill gallery. In summer 2027 the gallery is open from 17 June to 8 August, Thursday to Sunday, 11–17.",
      hero: photos.galleryRoom,
      facts: ["frame|Four shows a summer", "calendar|8-day exhibition periods", "euro|Room hire €100", "percent|25% sales commission"],
      sections: [
        { title: "Gallery summer 2027", text: ["The gallery is open 17 June–8 August 2027, Thu–Sun 11–17, closed Mon–Wed. Applications for 2027 closed on 9 August 2026, and the final choices are made around the turn of the year. The summer's artists will be presented here once confirmed."] },
        {
          id: "naeyttelyt",
          title: "Past exhibitions 2023–2026",
          text: [
            "2026: Suvi Koivisto-Kanervo, Franco Figari (photographs) and Nina Haatio (prints).",
            "2025: Sirkku Salo, Mia Nurmi, Heidi Krogerus and Leo Vuorinen (A Gaze from the Forest, photographs).",
            "2024: Tiina Kuusisto (Colour and Form), Ritva Korhonen, Nina Haatio and Marika Raunio.",
            "2023: Inga-lill Sundqvist, Terttu Ahola, Nina Haatio and Mika Törönen.",
            "The Old Tools show also displayed everyday objects of the past, from the joiner's workshop and the kitchen to forestry and the sledging hill, some of them for sale.",
          ],
        },
        {
          id: "taiteilijoille",
          title: "For artists: apply for summer 2027",
          text: [
            "Apply with a free-form message and a few sample images, by email or WhatsApp. The gallerist chooses the artists and the works on show.",
            "Hanging days are the Monday to Wednesday before the show, with exact times agreed case by case. Artists hang their own show. A door sign, hanging wire, cutters and other supplies are included in the hire.",
            "All works must be for sale unless agreed otherwise in advance. The artist provides a priced list of works as a PDF or printed. Number stickers and sold dots are provided. A guest book, business cards and a CV are welcome but optional, as is being present on some of the days. The room is not supervised at all times.",
            "The gallerist opens and closes the room daily, keeps it tidy, promotes the show on the mill's social media, sells the works and texts buyers their pick-up times. Artists are free to share the show on their own channels too.",
          ],
        },
      ],
      prices: {
        title: "Exhibition prices",
        rows: [
          { item: "Room hire, 8 exhibition days", price: "€100" },
          { item: "Booking deposit when the show is confirmed (part of the hire)", price: "€50" },
          { item: "Balance when hanging", price: "€50" },
          { item: "Sales commission", price: "25%" },
          { item: "Hanging by the gallerist, per hour started", price: "€47" },
        ],
        note: "The deposit is binding and is not refunded if the show does not go ahead for reasons outside our control. Sales are settled after the show by bank transfer or cash. Payment by card or cash.",
      },
      photos: [photos.galleryRoom, photos.galleryArtist, photos.oldTools, photos.porch],
      faq: [
        { q: "When can I apply?", a: "For summer 2028, from 17 June to 8 August 2027. Applications for 2027 closed on 9 August 2026." },
        { q: "How do I apply?", a: "Send a free-form message with a few sample images to antti.jakola@hotmail.com or WhatsApp +358 44 016 5047." },
        { q: "What does a show cost?", a: "Room hire is €100 for eight exhibition days, and the sales commission is 25%." },
        { q: "Do I need to be there?", a: "It is not required, but being present on some of the days is recommended." },
      ],
      ask: ["The 2027 artists once chosen around the turn of the year", "A photo of each past show, if you have one (archive)", "Photos of the gallery room"],
      cta: "Apply for an exhibition",
    },
  },
  juhlatila: {
    fi: {
      title: "Pieni juhlatila ja kokoustila Sammatissa, Lohja | Vuorikosken Mylly",
      description:
        "Vuokraa vanhan myllyn juhlatila Sammatista, Lohjalta: paikat 25 hengelle pitkässä pöydässä tai noutopöytä ja tanssitilaa, 50 €/h. Omat tarjoilut, pitopalvelu tai myllyn kahvilan herkut.",
      kicker: "Juhlatila · Sammatti",
      h1: "Pieni juhla- ja kokoustila vanhassa myllyssä",
      lead: "Myllyn alasiiven juhlatilassa on paikat 25 hengelle. Kaikki mahtuvat samaan pitkään pöytään, tai pöytä kääntyy noutopöydäksi ja tilaan tulee puutarhatunnelmaa ja tilaa tanssille.",
      hero: photos.longTable,
      facts: ["users|25 hengelle", "euro|50 € / tunti", "sun|Varattavissa 15.5.–15.8.", "cup|Kahviastiat 32 hengelle"],
      sections: [
        {
          title: "Tarjoilut niin kuin haluat",
          text: [
            "Astiat, syötävät ja juotavat voi tuoda itse, käyttää ulkopuolista pitopalvelua tai hyödyntää myllyn kahvilan monipuolista tarjontaa. Kahvilan herkkupöydän leivonnaiset ovat gluteenittomia.",
            "Kahviastiat 32 hengelle voi vuokrata meiltä 0,50 €/setti (tiskausmaksu). Setti sisältää leipälautasen, asetin, kahvikupin ja kahvilusikan.",
            "Tilassa on pakastelokerollinen jenkkijääkaappi. Keittiötä tai ruoanlaittomahdollisuutta ei ole, eikä videotykkiä.",
          ],
        },
        {
          title: "Kaksi tapaa kattaa",
          text: [
            "Kaikki 25 vierasta voivat istua yhdessä pitkässä pöydässä. Vaihtoehtoisesti pitkä pöytä kääntyy tilan perälle noutopöydäksi, ja tilaan tuodaan puutarhatunnelmaa keveillä terassituoleilla ja lasipöydillä. Tämä vaihtoehto jättää tilaa myös tanssille.",
          ],
        },
        { title: "Kokouksiin ja perhejuhliin", text: ["Tila sopii kokouksiin, syntymäpäiville ja muihin pieniin perhejuhliin. Juhlatilassa on vietetty esimerkiksi kaksien 80-vuotisjuhlien yhteiset kestit. Tila on varattavissa 15.5.–15.8. sopimuksen mukaan. Kysy vapaita päiviä tekstiviestillä tai WhatsAppilla 044 016 5047. Juhlatila on esteetön, ja sinne pääsee ilman portaita."] },
      ],
      prices: {
        title: "Hinnat",
        rows: [
          { item: "Juhlatila, kesäkaudella", price: "50 € / h" },
          { item: "Kahviastiat, setti (leipälautanen, asetti, kuppi, lusikka)", price: "0,50 €" },
        ],
      },
      photos: [photos.longTable, photos.partySet, photos.chandelier, photos.partyFood, photos.breakfast],
      faq: [
        { q: "Paljonko juhlatila maksaa?", a: "50 € tunnilta kesäkaudella." },
        { q: "Montako henkeä tilaan mahtuu?", a: "25 henkeä, kaikki samaan pitkään pöytään. Noutopöytäjärjestelyllä tilaan jää myös tanssitilaa." },
        { q: "Onko tilassa keittiö?", a: "Ei. Tilassa on pakastelokerollinen jääkaappi ja kahviastiat 32 hengelle, mutta ei keittiötä eikä videotykkiä." },
        { q: "Saako omat tarjoilut tuoda?", a: "Saa. Voit tuoda omat astiat ja tarjoilut, käyttää pitopalvelua tai tilata herkut myllyn kahvilasta." },
      ],
      ask: [],
      cta: "Kysy vapaita päiviä",
    },
    en: {
      title: "Small party and meeting room in Sammatti, Lohja | Vuorikosken Mylly",
      description:
        "Hire the event room in an old water mill in Sammatti, Lohja, Finland: seats 25 at one long table, or a buffet with room to dance, €50 per hour. Bring your own food, use a caterer or order from the mill café.",
      kicker: "Event room · Sammatti",
      h1: "A small party and meeting room in an old mill",
      lead: "The event room in the mill's lower wing seats 25. Everyone fits at one long table, or the table becomes a buffet and the room gets a garden feel with space to dance.",
      hero: photos.longTable,
      facts: ["users|Seats 25", "euro|€50 per hour", "sun|Bookable 15 May–15 Aug", "cup|Coffee sets for 32"],
      sections: [
        {
          title: "Catering your way",
          text: [
            "Bring your own tableware, food and drinks, use an outside caterer, or order from the mill café. The bakes on the café's main spread are gluten-free.",
            "Coffee sets for 32 people can be hired for €0.50 per set (washing-up fee). A set is a side plate, saucer, coffee cup and spoon.",
            "The room has an American-style fridge with a freezer. There is no kitchen or cooking, and no projector.",
          ],
        },
        {
          title: "Two ways to set the room",
          text: [
            "All 25 guests can sit together at one long table. Or the long table turns into a buffet at the back of the room, and light terrace chairs and glass tables bring in a garden feel. This layout also leaves room for dancing.",
          ],
        },
        { title: "Meetings and family occasions", text: ["The room suits meetings, birthdays and other small family occasions. It has hosted, for example, a joint party for two 80th birthdays. The room can be booked from 15 May to 15 August by arrangement. Ask for free dates by text message or WhatsApp, +358 44 016 5047. The event room is step-free."] },
      ],
      prices: {
        title: "Prices",
        rows: [
          { item: "Event room, summer season", price: "€50 / h" },
          { item: "Coffee set (side plate, saucer, cup, spoon)", price: "€0.50" },
        ],
      },
      photos: [photos.longTable, photos.partySet, photos.chandelier, photos.partyFood, photos.breakfast],
      faq: [
        { q: "What does the room cost?", a: "€50 per hour in the summer season." },
        { q: "How many people fit?", a: "25, all at one long table. With a buffet layout there is also room to dance." },
        { q: "Is there a kitchen?", a: "No. There is a fridge with a freezer and coffee sets for 32, but no kitchen and no projector." },
        { q: "Can I bring my own food?", a: "Yes. Bring your own, use a caterer or order bakes from the mill café." },
      ],
      ask: [],
      cta: "Ask for free dates",
    },
  },
  majoitus: {
    fi: {
      title: "Aamiaismajoitus Sammatissa, Lohja – mökit myllylammen rannalla | Vuorikosken Mylly",
      description:
        "Pieni B&B Sammatissa, Lohjalla: kaksi sähkötöntä kesämökkiä 1–2 hengelle myllylammen rannalla, 59 €/yö liinavaatteineen. Puusauna ja lautasaamiainen myllyn kahvilassa.",
      kicker: "Aamiaismajoitus · Sammatti",
      h1: "Yöksi myllylammen rannalle",
      lead: "Kaksi pientä kesämökkiä rauhallisen myllylammen rannalla. Sähköttömät, kesälämpimät ja tunnelmalliset, ja aamulla aamiainen myllyn kahvilassa.",
      hero: photos.nutHut,
      facts: ["users|1–2 hengelle", "euro|59 € / yö", "bolt|Sähkötön mökki", "flame|Puusauna lammen rannalla"],
      units: [
        {
          id: "mutterimokki",
          name: "Mutterimökki",
          photo: photos.bed,
          beds: "140 cm sänky joustinpatjalla, 1–2 hlö",
          text: "Kotatyylinen mökki lammen rannalla. Liinavaatteet, yöpöytä, naulakko ja led-lyhty. Juomavesipullo ja lasit.",
        },
        {
          id: "rantayksio",
          name: "Rantayksiö",
          photo: photos.studio,
          beds: "120 cm sänky joustinpatjalla, 1–2 hlö",
          text: "Vaalea yksiö rannalla. Liinavaatteet, säilytystilaa laatikostossa, naulakko ja tuoli. Juomavesipullo ja lasit.",
          hutsPath: { fi: "/suomi/uusimaa/lohja/lomamokit/rantayksio-vuorikosken-mylly-lohja", en: "/finland/uusimaa/lohja/holiday-cabins/beach-studio-vuorikosken-mylly-lohja" },
        },
      ],
      sections: [
        {
          title: "Majoitus",
          text: [
            "Mökit ovat kesälämpimiä ja sähköttömiä. Alueella on wc ja mahdollisuus ladata puhelin. Hintaan sisältyvät liinavaatteet ja juomavesipullo.",
            "Tulipaikalla voi grillata lämpimät välipalat maastopalovaroitukset huomioon ottaen. Omat grillipuut voi tuoda tai ostaa meiltä puukorin. Makkaratikut ja grilliritilä löytyvät talon puolesta. Viileää säilytystä varten ota kylmälaukku mukaan. Sale Sammatti on 2,5 kilometrin päässä.",
          ],
        },
        {
          id: "aamiainen",
          title: "Lautasaamiainen",
          text: ["Maittava lautasaamiainen räätälöidään jokaisen ruokavalioon sopivaksi ja tarjoillaan myllyn kahvilassa sovittuna aikana. Juomaksi kahvia tai teetä. Voit myös mökkeillä omin eväin."],
        },
        {
          id: "rantasauna",
          title: "Rantasauna",
          text: ["Puusaunan pehmeät löylyt täydentävät yön. Hintaan sisältyvät polttopuut, laudeliinat, pyyhkeet ja pesuaineet. Kantovesi tulee viereisestä lammesta, jossa voi myös kastautua. Saunan voi varata ympäri vuoden sopimuksen mukaan, myös ilman majoitusta."],
        },
        {
          id: "saapuminen",
          title: "Saapuminen ja ehdot",
          text: [
            "Autolla osoitteeseen Tavolantie 18, 09220 Sammatti. Bussilla Lohjalta Sammattiin Myllykylän pysäkille, josta on 200 metrin kävely.",
            "Sisäänkirjaus saapumispäivänä klo 15 alkaen, uloskirjaus lähtöpäivänä klo 12 mennessä. Majoitus ja lisäpalvelut maksetaan saavuttaessa kortilla, käteisellä tai MobilePaylla. Peruutus maksutta viimeistään kaksi vuorokautta ennen saapumista.",
          ],
        },
      ],
      prices: {
        title: "Hinnat",
        rows: [
          { item: "Mutterimökki tai rantayksiö, 1–2 hlö, sis. liinavaatteet", price: "59 € / yö" },
          { item: "Lisäpatja liinavaatteineen", price: "15 €" },
          { item: "Lautasaamiainen", price: "10 € / hlö" },
          { item: "Rantasauna yöpymisen yhteydessä", price: "7 € / hlö" },
          { item: "Rantasauna ilman majoitusta", price: "10 € / hlö" },
          { item: "Puukori grilliin", price: "5 €" },
        ],
        note: "Tiedustelut ja varaukset puhelimella tai WhatsAppilla 044 016 5047.",
      },
      photos: [photos.nutHut, photos.bed, photos.cabinNight, photos.lantern, photos.studio, photos.pond, photos.breakfast, photos.rapidsSummer],
      faq: [
        { q: "Onko mökeissä sähköä?", a: "Ei. Mökit ovat sähköttömiä ja kesälämpimiä. Alueella voi ladata puhelimen ja käytössä on wc." },
        { q: "Mitä majoitus maksaa?", a: "59 € yöltä 1–2 hengelle liinavaatteineen. Lisäpatja 15 €, aamiainen 10 € / hlö ja sauna 7 € / hlö." },
        { q: "Miten varaan?", a: "Tekstiviestillä tai WhatsAppilla 044 016 5047. Mökit ovat varattavissa 15.5.–15.8., ja kesän 2027 varauskalenteri avautuu pääsiäisenä 27.3.2027." },
        { q: "Voiko rantasaunan varata talvella?", a: "Voi. Rantasauna on varattavissa ympäri vuoden sopimuksen mukaan, myös ilman majoitusta." },
      ],
      ask: ["Kuva rantasaunasta ja tulipaikasta"],
      cta: "Kysy vapaita öitä",
    },
    en: {
      title: "B&B in Sammatti, Lohja – cabins by the mill pond | Vuorikosken Mylly",
      description:
        "A small B&B in Sammatti, Lohja, Finland: two off-grid summer cabins for 1–2 people by the mill pond, €59 a night with bed linen. Wood-fired sauna and plated breakfast in the mill café.",
      kicker: "Bed & breakfast · Sammatti",
      h1: "A night by the mill pond",
      lead: "Two small summer cabins on the shore of a quiet mill pond. Off-grid, summer-warm and atmospheric, with breakfast in the mill café in the morning.",
      hero: photos.nutHut,
      facts: ["users|For 1–2 people", "euro|€59 a night", "bolt|Off-grid cabins", "flame|Wood sauna by the pond"],
      units: [
        { id: "mutterimokki", name: "Mutterimökki", photo: photos.bed, beds: "140 cm sprung bed, 1–2 people", text: "A kota-style cabin by the pond. Bed linen, bedside table, coat rack and LED lantern. Drinking water bottle and glasses." },
        {
          id: "rantayksio",
          name: "Rantayksiö (Beach studio)",
          photo: photos.studio,
          beds: "120 cm sprung bed, 1–2 people",
          text: "A light studio on the shore. Bed linen, chest of drawers, coat rack and chair. Drinking water bottle and glasses.",
          hutsPath: { fi: "/suomi/uusimaa/lohja/lomamokit/rantayksio-vuorikosken-mylly-lohja", en: "/finland/uusimaa/lohja/holiday-cabins/beach-studio-vuorikosken-mylly-lohja" },
        },
      ],
      sections: [
        {
          title: "The cabins",
          text: [
            "The cabins are for summer use and have no electricity. There is a toilet on site and a place to charge your phone. Bed linen and a bottle of drinking water are included.",
            "You can grill snacks at the fire place, minding any wildfire warnings. Bring your own firewood or buy a basket from us. Sausage sticks and a grill grate are provided. Bring a cool bag for food. Sale Sammatti grocery is 2.5 km away.",
          ],
        },
        { id: "aamiainen", title: "Plated breakfast", text: ["Breakfast is tailored to each guest's diet and served in the mill café at an agreed time, with coffee or tea. You are also welcome to bring your own food."] },
        { id: "rantasauna", title: "Shore sauna", text: ["Finish the day with soft wood-fired sauna steam. Firewood, seat covers, towels and toiletries are included. Water is carried from the pond next door, where you can also take a dip. The sauna can be booked all year round by arrangement, also without a stay."] },
        {
          id: "saapuminen",
          title: "Arrival and terms",
          text: [
            "By car to Tavolantie 18, 09220 Sammatti. By bus from Lohja to Sammatti, Myllykylä stop, then a 200 metre walk.",
            "Check-in from 15:00 on arrival day, check-out by 12:00 on departure day. Pay on arrival by card, cash or MobilePay. Free cancellation up to two days before arrival.",
          ],
        },
      ],
      prices: {
        title: "Prices",
        rows: [
          { item: "Mutterimökki or Rantayksiö, 1–2 people, bed linen included", price: "€59 / night" },
          { item: "Extra mattress with bed linen", price: "€15" },
          { item: "Plated breakfast", price: "€10 / person" },
          { item: "Shore sauna with a stay", price: "€7 / person" },
          { item: "Shore sauna without a stay", price: "€10 / person" },
          { item: "Basket of firewood", price: "€5" },
        ],
        note: "Enquiries and bookings by phone or WhatsApp +358 44 016 5047.",
      },
      photos: [photos.nutHut, photos.bed, photos.cabinNight, photos.lantern, photos.studio, photos.pond, photos.breakfast, photos.rapidsSummer],
      faq: [
        { q: "Do the cabins have electricity?", a: "No. They are off-grid summer cabins. You can charge your phone on site and there is a toilet." },
        { q: "What does a night cost?", a: "€59 a night for 1–2 people with bed linen. Extra mattress €15, breakfast €10 per person and sauna €7 per person." },
        { q: "How do I book?", a: "By text message or WhatsApp, +358 44 016 5047. The cabins can be booked for 15 May–15 August, and bookings for summer 2027 open at Easter, 27 March 2027." },
        { q: "Can I book the shore sauna in winter?", a: "Yes. The shore sauna can be booked all year round by arrangement, also without a stay." },
      ],
      ask: ["A photo of the shore sauna and the fire place"],
      cta: "Ask for free nights",
    },
  },
};

export const contactPage = {
  fi: {
    title: "Aukioloajat ja yhteystiedot | Vuorikosken Mylly, Sammatti, Lohja",
    description: "Vuorikosken Myllyn aukioloajat, osoite (Tavolantie 18, 09220 Sammatti), puhelin, WhatsApp, ajo-ohjeet ja bussiyhteys Lohjalta.",
    h1: "Aukiolo ja yhteystiedot",
    lead: "Kahvila ja vintage-putiikki ovat auki pääsiäisestä elokuun loppuun juhlaviikonloppuina ja 17.6.–8.8. joka to–su klo 11–17, syksyllä pyhäinpäivänä ja isänpäivänä sekä joulupuotina adventtiviikonloppuina klo 11–16. Pihassa on parkkitilaa 20 autolle.",
    accessTitle: "Esteettömyys",
    access: "Pihassa on parkkitilaa 20 autolle. Parkkialue, pihakäytävät, ulkoasiakaspaikat ja juhlatila ovat esteettömiä. Myllyyn kuljetaan luiskaa pitkin, ja oviaukossa on matala kynnys. Galleria, wc sekä sauna- ja majoitustilat ovat portaiden takana, joten ne eivät sovellu liikuntarajoitteisille.",
    ask: [],
  },
  en: {
    title: "Opening hours and contact | Vuorikosken Mylly, Sammatti, Lohja",
    description: "Vuorikosken Mylly opening hours, address (Tavolantie 18, 09220 Sammatti, Finland), phone, WhatsApp, directions and the bus from Lohja.",
    h1: "Hours and contact",
    lead: "The café and vintage shop are open from Easter to the end of August on holiday weekends and every Thu–Sun from 17 June to 8 August, 11–17, then on All Saints' and Father's Day weekends and as a Christmas shop on Advent weekends, 11–16. The yard has parking for 20 cars.",
    accessTitle: "Accessibility",
    access: "The yard has parking for 20 cars. The parking area, yard paths, outdoor seating and the event room are step-free. A ramp leads into the mill, with a low threshold at the door. The gallery, toilet, sauna and cabins are up or down steps, so they do not suit visitors with limited mobility.",
    ask: [],
  },
};

export const homeAsk = {
  fi: ["Kuva teistä kahdesta ja pari lausetta: keitä olette ja miksi mylly (vieraat tulevat mielellään ihmisten luo)", "Instagram- ja TikTok-tilien nimet (lisätään sivujen alalaitaan)", "Isompi kuvasatsi OneDriven kautta, kun ehdit (alkuperäiset täysikokoiset kuvat)"],
  en: ["A photo of the two of you and a couple of sentences about who you are", "Instagram and TikTok account names (for the footer)", "The bigger photo batch via OneDrive when you have time (original full-size photos)"],
};
