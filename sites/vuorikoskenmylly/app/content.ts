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

export const business = {
  name: "Vuorikosken Mylly",
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
  cake: { src: photo("kahvila-gluteeniton-kakku.jpg"), fi: "Gluteeniton suklaakakku myllyn kahvilassa", en: "Gluten-free chocolate cake in the mill café" },
  shop: { src: photo("sisustusputiikki.jpg"), fi: "Second hand -sisustusputiikki myllyssä", en: "The second-hand interior shop inside the mill" },
  wheel: { src: photo("myllyn-vesiratas.jpg"), fi: "Myllyn vesiratas ja koski", en: "The mill's water wheel and rapids" },
  rapids: { src: photo("vuorikoski-syksylla.jpg"), fi: "Vuorikoski syksyllä", en: "Vuorikoski rapids in autumn" },
  pond: { src: photo("myllylampi-kesailta.jpg"), fi: "Myllylampi kesäiltana", en: "The mill pond on a summer evening" },
  breakfast: { src: photo("aamiainen-kahvilassa.jpg"), fi: "Lautasaamiainen ja juhlatilan pitkä pöytä", en: "Plated breakfast and the long table in the event room" },
  nutHut: { src: photo("mutterimokki-lammella.jpg"), fi: "Mutterimökki myllylammen rannalla", en: "The Mutteri cabin on the mill pond shore" },
  lantern: { src: photo("mokki-lyhdyn-valossa.jpg"), fi: "Mökki lyhdyn valossa", en: "A cabin by lantern light" },
  bed: { src: photo("mokki-sanky.jpg"), fi: "Mutterimökin sänky ja led-lyhty", en: "The Mutteri cabin bed and LED lantern" },
  studio: { src: photo("rantayksio-sisalta.jpg"), fi: "Rantayksiö sisältä", en: "Inside the Beach studio" },
} satisfies Record<string, Photo>;

/* ------------------------------------------------------------------ */
/* What Antti edits himself (opening days, notices, lodging status).   */
/* Kept apart from the page copy so an editor can swap this one block. */
/* ------------------------------------------------------------------ */

export type OpenDay = { from: string; to: string; open: string; close: string; label: Text };

export const live = {
  updated: "2026-10-28",
  // Shown in the black bar on every page. Empty string hides it.
  notice: {
    fi: "Avoinna pyhäinpäivänä la–su 31.10.–1.11. klo 11–16 · Joulupuoti adventtiviikonloppuina",
    en: "Open on All Saints' weekend, Sat–Sun 31 Oct–1 Nov, 11–16 · Christmas shop on Advent weekends",
  },
  openDays: [
    { from: "2026-10-31", to: "2026-11-01", open: "11:00", close: "16:00", label: { fi: "Pyhäinpäivä", en: "All Saints' weekend" } },
    { from: "2026-11-28", to: "2026-11-29", open: "11:00", close: "16:00", label: { fi: "Joulupuoti", en: "Christmas shop" } },
    { from: "2026-12-05", to: "2026-12-06", open: "11:00", close: "16:00", label: { fi: "Joulupuoti", en: "Christmas shop" } },
    { from: "2026-12-12", to: "2026-12-13", open: "11:00", close: "16:00", label: { fi: "Joulupuoti", en: "Christmas shop" } },
    { from: "2026-12-19", to: "2026-12-20", open: "11:00", close: "16:00", label: { fi: "Joulupuoti", en: "Christmas shop" } },
  ] satisfies OpenDay[],
  // Shown when every date above has passed.
  offSeason: {
    fi: "Mylly on avoinna kesäkaudella ja joulun alla adventtiviikonloppuina. Seuraavat aukiolopäivät päivitetään tänne.",
    en: "The mill is open in the summer season and on Advent weekends before Christmas. The next opening days will be posted here.",
  },
  lodgingStatus: {
    fi: "Kesän 2026 majoituspaikat on loppuunmyyty.",
    en: "Summer 2026 is fully booked.",
  },
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
    alsoOn: "Löydät meidät myös",
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
    alsoOn: "Also find us on",
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
      { id: "kahvila", title: "Kahvila", text: "Tuoretta kahvia, teetä ja tilalla leivottuja gluteenittomia makeita ja suolaisia herkkuja. Lemmikit ovat tervetulleita." },
      { id: "putiikki", title: "Sisustusputiikki", text: "Second hand -löytöjä itselle tai lahjaksi, tilan omia artesaaniherkkuja, paikallisten kädentaitajien töitä sekä vintage-vaatteita ja koruja." },
      { id: "galleria", title: "Galleria", text: "Kesäisin neljä erilaista taiteentekijää omissa näyttelyissään myllyn galleriassa." },
      { id: "juhlatila", title: "Juhlatila", text: "Pitkä pöytä kokouksille ja pienille perhejuhlille kesäkauden ajan." },
    ] satisfies { id: PageId; title: string; text: string }[],
    cafeKicker: "Myllyn kahvila",
    cafeTitle: "Kaikki leivonnaiset gluteenittomia",
    cafeText:
      "Kahvilassa on tarjolla tuoretta kahvia, teetä ja tilalla leivottuja gluteenittomia makeita ja suolaisia herkkuja. Kuumana kesäpäivänä viilentävät Vuorikosken oma mango-sitrus-jäätee ja icelatte.",
    cafePills: ["wheat|Gluteeniton leivonta", "dog|Lemmikit tervetulleita", "cup|Oma jäätee ja icelatte"],
    shopKicker: "Sisustusputiikki",
    shopTitle: "Persoonallisia löytöjä järkevään hintaan",
    shopText:
      "Second hand -sisustusputiikki on täynnä löytöjä itselle tai lahjaksi. Tilan omat artesaaniherkut ja paikallisten kädentaitajien taidonnäytteet täydentävät valikoimaa, ja uutuutena ovat valikoidut vintage-vaatteet ja korut.",
    splitTitle: "Muutakin myllyllä",
    splitEvents: { kicker: "Juhlat ja kokoukset", title: "Pitkän pöydän juhlatila", text: "Kokouksiin ja pieniin perhejuhliin kesäkaudella, 50 € tunnilta." },
    splitStay: { kicker: "Yöksi myllylle", title: "Kaksi pientä mökkiä lammen rannalla", text: "Sähköttömät kesämökit, rantasauna ja lautasaamiainen kahvilassa." },
    historyKicker: "Historia",
    historyTitle: "Mylly jauhoi, sahasi ja teki sähköä",
    historyText: [
      "Sammatin maalaisidylliin vuonna 1893 rakennettu mylly jauhoi osuuskuntalaisten viljat, sahasi puutavarat ja tuotti vielä sähköäkin kyläläisten tarpeisiin. Sittemmin yksityisomistukseen siirtynyt tila sai nimekseen Vuorikoski silloisen omistajansa mukaan.",
      "Tänä päivänä tilalla asuu visuaalisilla aloilla toimiva yrittäjäpariskunta. Alkuperäiseen asuunsa palautettu mylly on avoinna kesäkaudella ja joulun alla adventtiviikonloppuina. Vuonna 2023 myllyn rakentamisesta tuli kuluneeksi 130 vuotta.",
    ],
    historyLink: "Lisää Sammatin ja Myllykylän myllyjen historiasta (Kansalliskirjasto)",
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
      { id: "kahvila", title: "Café", text: "Fresh coffee, tea and gluten-free sweet and savoury bakes made on the farm. Pets are welcome." },
      { id: "putiikki", title: "Interior shop", text: "Second-hand finds for yourself or as gifts, the farm's own artisan treats, local crafts, and vintage clothing and jewellery." },
      { id: "galleria", title: "Gallery", text: "Every summer, four different artists show their work in the mill gallery." },
      { id: "juhlatila", title: "Event room", text: "A long table for meetings and small family parties in the summer season." },
    ] satisfies { id: PageId; title: string; text: string }[],
    cafeKicker: "The mill café",
    cafeTitle: "Every bake is gluten-free",
    cafeText:
      "The café serves fresh coffee, tea and gluten-free sweet and savoury bakes made on the farm. On hot summer days, Vuorikoski's own mango-citrus iced tea and iced latte cool you down.",
    cafePills: ["wheat|Gluten-free baking", "dog|Pets welcome", "cup|Own iced tea and iced latte"],
    shopKicker: "Interior shop",
    shopTitle: "One-of-a-kind finds at fair prices",
    shopText:
      "The second-hand interior shop is full of finds for yourself or as gifts. The farm's own artisan treats and work by local craftspeople complete the range, and new in the shop are selected vintage clothes and jewellery.",
    splitTitle: "More at the mill",
    splitEvents: { kicker: "Parties and meetings", title: "The long-table event room", text: "For meetings and small family parties in the summer season, €50 per hour." },
    splitStay: { kicker: "Stay the night", title: "Two small cabins by the pond", text: "Off-grid summer cabins, a shore sauna and plated breakfast in the café." },
    historyKicker: "History",
    historyTitle: "The mill ground grain, sawed timber and made electricity",
    historyText: [
      "Built in 1893 in the Sammatti countryside, the mill ground grain for the cooperative's members, sawed timber and even produced electricity for the village. The farm later passed into private hands and took the name Vuorikoski after its owner at the time.",
      "Today the farm is home to an entrepreneur couple working in visual fields. Restored to its original look, the mill is open in the summer season and on Advent weekends before Christmas. In 2023 the mill turned 130.",
    ],
    historyLink: "More on the history of Sammatti and the Myllykylä mills (National Library, in Finnish)",
    visitTitle: "Visit",
    ctaTitle: "See you at the mill",
    ctaText: "Ask about the event room, the cabins or an exhibition slot by phone or WhatsApp.",
  },
};

export const homeFaq: Record<Locale, { q: string; a: string }[]> = {
  fi: [
    { q: "Ovatko kahvilan leivonnaiset gluteenittomia?", a: "Kyllä. Kaikki tilalla leivotut makeat ja suolaiset herkut ovat gluteenittomia." },
    { q: "Saako koiran tuoda kahvilaan?", a: "Saa. Lemmikit ovat tervetulleita kahvilaan. Terassilla on raikasta juomavettä, ja puristekalkkuna-namit tarjoillaan kassalta." },
    { q: "Milloin Vuorikosken Mylly on auki?", a: "Kesäkaudella sekä joulun alla adventtiviikonloppuina. Ajantasaiset aukiolopäivät ovat tämän sivun ylälaidassa ja Aukiolo ja yhteys -sivulla." },
    { q: "Missä mylly on?", a: "Osoitteessa Tavolantie 18, 09220 Sammatti. Sammatti kuuluu Lohjan kaupunkiin Länsi-Uudellamaalla." },
    { q: "Pääseekö myllylle bussilla?", a: "Pääsee. Lohjalta kulkee bussi Sammattiin Myllykylän pysäkille, josta on 200 metrin kävely." },
    { q: "Voiko myllyllä yöpyä?", a: "Voi. Myllylammen rannalla on kaksi pientä sähkötöntä kesämökkiä 1–2 hengelle, ja lisäksi voi varata rantasaunan ja aamiaisen. Kysy vapaita päiviä puhelimella tai WhatsAppilla." },
  ],
  en: [
    { q: "Are the café's bakes gluten-free?", a: "Yes. All the sweet and savoury bakes made on the farm are gluten-free." },
    { q: "Can I bring my dog to the café?", a: "Yes. Pets are welcome in the café. There is fresh drinking water on the terrace and pressed turkey treats at the counter." },
    { q: "When is Vuorikosken Mylly open?", a: "In the summer season and on Advent weekends before Christmas. Current opening days are at the top of this page and on the Hours & contact page." },
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
        "Kesäkahvila vanhassa myllyssä Sammatissa, Lohjalla. Kaikki leivonnaiset gluteenittomia ja tilalla leivottuja. Oma mango-sitrus-jäätee, icelatte, koiraystävällinen terassi.",
      kicker: "Myllyn kahvila · Sammatti",
      h1: "Gluteeniton kahvila vanhassa myllyssä",
      lead: "Tuoretta kahvia, teetä ja tilalla leivottuja gluteenittomia makeita ja suolaisia herkkuja perinteisessä myllymiljöössä.",
      hero: photos.cake,
      facts: ["wheat|Kaikki leivonnaiset gluteenittomia", "chef|Leivottu tilalla", "cup|Oma mango-sitrus-jäätee ja icelatte", "dog|Lemmikit tervetulleita"],
      sections: [
        {
          title: "Tilalla leivottua, gluteenitonta",
          text: [
            "Myllyn kahvilassa kaikki makeat ja suolaiset herkut leivotaan tilalla, ja ne ovat gluteenittomia. Keliaakikon ei tarvitse kysellä erikseen, mitä vitriinistä voi ottaa.",
            "Kuumana kesäpäivänä viilentävät Vuorikosken oma mango-sitrus-jäätee ja icelatte.",
          ],
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
      photos: [photos.cake, photos.breakfast, photos.porch, photos.shop],
      faq: [
        { q: "Onko kaikki gluteenitonta?", a: "Kaikki tilalla leivotut makeat ja suolaiset herkut ovat gluteenittomia." },
        { q: "Saako koiran tuoda sisälle?", a: "Lemmikit ovat tervetulleita kahvilaan. Terassilla on vettä ja kassalta saa puristekalkkuna-namin." },
        { q: "Milloin kahvila on auki?", a: "Kesäkaudella ja joulun alla adventtiviikonloppuina. Katso ajantasaiset päivät sivun ylälaidasta." },
      ],
      ask: ["Kesän 2027 aukioloajat", "Esimerkkejä kahvilan tuotteista ja hinnoista (esim. 5–8 herkkua)", "Onko myös maidottomia tai vegaanisia vaihtoehtoja?", "Maksutavat kahvilassa", "Lisää kuvia kahvilasta ja terassilta"],
      cta: "Tule kahville myllylle",
    },
    en: {
      title: "Gluten-free café in Sammatti, Lohja | Vuorikosken Mylly café",
      description:
        "A summer café in an old water mill in Sammatti, Lohja, Finland. Every bake is gluten-free and made on the farm. Own mango-citrus iced tea, iced latte and a dog-friendly terrace.",
      kicker: "The mill café · Sammatti",
      h1: "A gluten-free café in an old water mill",
      lead: "Fresh coffee, tea and gluten-free sweet and savoury bakes made on the farm, in a traditional mill setting.",
      hero: photos.cake,
      facts: ["wheat|Every bake gluten-free", "chef|Baked on the farm", "cup|Own mango-citrus iced tea and iced latte", "dog|Pets welcome"],
      sections: [
        {
          title: "Baked on the farm, gluten-free",
          text: [
            "Every sweet and savoury bake in the mill café is made on the farm, and all of them are gluten-free. If you are coeliac, you do not need to ask what you can have.",
            "On hot summer days, Vuorikoski's own mango-citrus iced tea and iced latte cool you down.",
          ],
        },
        { title: "Bring the dog", text: ["Pets are welcome in the café too. There is fresh drinking water on the terrace, and pressed turkey treats are handed out at the counter."] },
        { title: "Breakfast for overnight guests", text: ["Guests staying in the mill cabins can order a plated breakfast, served in the café at an agreed time and tailored to each guest's diet."] },
      ],
      photos: [photos.cake, photos.breakfast, photos.porch, photos.shop],
      faq: [
        { q: "Is everything gluten-free?", a: "All the sweet and savoury bakes made on the farm are gluten-free." },
        { q: "Can I bring my dog inside?", a: "Pets are welcome in the café. There is water on the terrace and a turkey treat at the counter." },
        { q: "When is the café open?", a: "In the summer season and on Advent weekends before Christmas. See the current days at the top of the page." },
      ],
      ask: ["Summer 2027 opening hours", "A few café items and prices", "Dairy-free or vegan options?", "Payment methods in the café", "More photos of the café and terrace"],
      cta: "Come for coffee at the mill",
    },
  },
  putiikki: {
    fi: {
      title: "Vintage- ja sisustusputiikki Sammatissa, Lohja | Vuorikosken Mylly",
      description:
        "Second hand -sisustusputiikki vanhassa myllyssä Sammatissa, Lohjalla: persoonallisia löytöjä, vintage-vaatteita ja koruja, tilan omia artesaaniherkkuja ja paikallista käsityötä. Joulupuoti adventtiviikonloppuina.",
      kicker: "Sisustusputiikki · Sammatti",
      h1: "Vintage- ja sisustusputiikki myllyssä",
      lead: "Second hand -sisustusputiikki täynnä persoonallisia löytöjä itselle tai lahjaksi. Kaikki saman katon alta järkevään hintaan.",
      hero: photos.shop,
      facts: ["lamp|Second hand -sisustus", "shirt|Vintage-vaatteet ja korut", "jar|Tilan omat artesaaniherkut", "hand|Paikallisten kädentaitajien työt"],
      sections: [
        {
          title: "Löytöjä itselle tai lahjaksi",
          text: [
            "Myllyn sisustusputiikki on täynnä persoonallisia second hand -löytöjä. Tilan omat artesaaniherkut ja paikallisten kädentaitajien taidonnäytteet täydentävät valikoiman.",
            "Uutuutena putiikissa ovat valikoidut vintage-vaatteet ja korut.",
          ],
        },
        { id: "joulupuoti", title: "Joulupuoti adventtiviikonloppuina", text: ["Joulun alla mylly avautuu joulupuodiksi adventtiviikonloppuina. Ajantasaiset päivät ja kellonajat ovat sivun ylälaidassa."] },
      ],
      photos: [photos.shop, photos.porch, photos.wheel, photos.cake],
      faq: [
        { q: "Mitä putiikista löytyy?", a: "Second hand -sisustustavaraa, valikoituja vintage-vaatteita ja koruja, tilan omia artesaaniherkkuja ja paikallisten kädentaitajien töitä." },
        { q: "Onko putiikki auki jouluna?", a: "Joulupuoti on avoinna adventtiviikonloppuina. Katso päivät sivun ylälaidasta." },
      ],
      ask: ["Muutama esimerkki tuotteista ja hintahaarukka", "Otatteko vastaan tavaraa myyntiin tai ostatteko vintagea?", "Instagram-tili, jos sellainen on", "Lisää kuvia putiikista, vaatteista ja koruista", "Maksutavat"],
      cta: "Tule tekemään löytöjä",
    },
    en: {
      title: "Vintage and interior shop in Sammatti, Lohja | Vuorikosken Mylly",
      description:
        "A second-hand interior shop in an old water mill in Sammatti, Lohja, Finland: one-of-a-kind finds, vintage clothing and jewellery, the farm's own artisan treats and local crafts. Christmas shop on Advent weekends.",
      kicker: "Interior shop · Sammatti",
      h1: "A vintage and interior shop in the mill",
      lead: "A second-hand interior shop full of one-of-a-kind finds for yourself or as gifts. All under one roof at fair prices.",
      hero: photos.shop,
      facts: ["lamp|Second-hand interiors", "shirt|Vintage clothing and jewellery", "jar|The farm's own artisan treats", "hand|Local crafts"],
      sections: [
        {
          title: "Finds for yourself or as gifts",
          text: [
            "The mill's interior shop is full of one-of-a-kind second-hand finds. The farm's own artisan treats and work by local craftspeople complete the range.",
            "New in the shop: selected vintage clothes and jewellery.",
          ],
        },
        { id: "joulupuoti", title: "Christmas shop on Advent weekends", text: ["Before Christmas the mill opens as a Christmas shop on Advent weekends. Current days and times are at the top of the page."] },
      ],
      photos: [photos.shop, photos.porch, photos.wheel, photos.cake],
      faq: [
        { q: "What does the shop sell?", a: "Second-hand interior pieces, selected vintage clothing and jewellery, the farm's own artisan treats and local crafts." },
        { q: "Is the shop open at Christmas?", a: "The Christmas shop is open on Advent weekends. See the days at the top of the page." },
      ],
      ask: ["A few example items and a price range", "Do you take items on consignment or buy vintage?", "Instagram account, if any", "More photos of the shop, clothes and jewellery", "Payment methods"],
      cta: "Come and find something",
    },
  },
  galleria: {
    fi: {
      title: "Taidenäyttelyt Sammatissa – myllyn galleria, Lohja | Vuorikosken Mylly",
      description:
        "Kesän taidenäyttelyt vanhassa myllyssä Sammatissa, Lohjalla. Neljä taiteentekijää joka kesä. Kesän 2027 näyttelyjaksot haettavana: tilavuokra 100 € / 10 päivää, myyntiprovisio 25 %.",
      kicker: "Galleria · Sammatti",
      h1: "Kesän taidenäyttelyt myllyn galleriassa",
      lead: "Joka kesä myllyn galleriassa esittäytyy neljä erilaista taiteentekijää. Galleriakesä 2026 on päättynyt, ja kesän 2027 näyttelyjaksot ovat nyt haettavana.",
      hero: photos.porch,
      facts: ["frame|Neljä näyttelyä kesässä", "calendar|10 päivän näyttelyjaksot", "euro|Tilavuokra 100 €", "percent|Myyntiprovisio 25 %"],
      sections: [
        { title: "Galleriakesä", text: ["Galleriakesä 2026 on päättynyt. Ensi vuonna esittelemme jälleen neljä erilaista taiteentekijää."] },
        {
          id: "taiteilijoille",
          title: "Taiteilijoille: hae näyttelypaikkaa kesälle 2027",
          text: [
            "Näyttelypaikkaa haetaan vapaamuotoisella hakemuksella muutamien havainnekuvien kera. Lähetä viesti sähköpostilla tai WhatsAppilla. Galleristi pidättää oikeuden valikoida edustamansa taiteilijat ja esiteltävät teokset.",
            "Pystytyspäivät ovat näyttelyä edeltävät maanantai–keskiviikko, ja tarkemmat ajankohdat sovitaan tilannekohtaisesti. Taiteilija pystyttää näyttelynsä itse. Näyttelykohtainen ovikyltti, rautalanka, leikkurit ja muut tarvikkeet sisältyvät tilanvuokraan.",
            "Kaikkien töiden tulee olla myytävissä, ellei toisin sovita etukäteen. Taiteilija toimittaa teoslistan hintoineen pdf-muodossa tai valmiina tulosteina. Teosnumerotarrat ja myytyjen töiden tarratäplät löytyvät paikan päältä. Vieraskirja, käyntikortit ja ansioluettelo ovat toivottavia mutta vapaaehtoisia, samoin paikalla olo osan näyttelypäivistä. Galleristi ei valvo näyttelytilaa jatkuvasti.",
            "Galleristi avaa ja sulkee näyttelytilan päivittäin, huolehtii siisteydestä, mainostaa näyttelyä sosiaalisen median kanavissaan, myy teokset ja ilmoittaa ostajille noutoajat tekstiviestillä. Myös taiteilija saa jakaa tietoa näyttelystä eri alustoilla.",
          ],
        },
      ],
      prices: {
        title: "Näyttelyn hinnat",
        rows: [
          { item: "Tilavuokra, 10 näyttelypäivää", price: "100 €" },
          { item: "Varausmaksu näyttelyn varmistuessa (osa tilavuokraa)", price: "50 €" },
          { item: "Loppuosa pystytyksen yhteydessä", price: "50 €" },
          { item: "Myyntiprovisio", price: "25 %" },
          { item: "Galleristin tekemä pystytys, alkava tunti", price: "47 €" },
        ],
        note: "Varausmaksu on sitova, eikä sitä palauteta, vaikka näyttely ei toteutuisi meistä riippumattomista syistä. Tilitykset myynneistä näyttelyjakson päätyttyä tilisiirtona tai käteisellä. Maksu kortilla tai käteisellä.",
      },
      photos: [photos.porch, photos.wheel, photos.shop],
      faq: [
        { q: "Miten näyttelypaikkaa haetaan?", a: "Vapaamuotoisella viestillä ja muutamalla havainnekuvalla sähköpostiin antti.jakola@hotmail.com tai WhatsAppiin 044 016 5047." },
        { q: "Paljonko näyttely maksaa?", a: "Tilavuokra on 100 € kymmeneltä näyttelypäivältä ja myyntiprovisio 25 %." },
        { q: "Pitääkö taiteilijan olla paikalla?", a: "Ei ole pakko, mutta paikalla olo osan näyttelypäivistä on suotavaa." },
      ],
      ask: ["Kesän 2026 taiteilijat ja kuva jokaisen näyttelystä (arkisto)", "Kesän 2027 näyttelijät, kun ne ovat selvillä", "Kuvia galleriatilasta sisältä", "Hakuaika kesälle 2027 (päättymispäivä)", "Järjestetäänkö kursseja, esim. keramiikkaa?"],
      cta: "Hae näyttelypaikkaa",
    },
    en: {
      title: "Art exhibitions in Sammatti – the mill gallery, Lohja | Vuorikosken Mylly",
      description:
        "Summer art exhibitions in an old water mill in Sammatti, Lohja, Finland. Four artists every summer. Exhibition slots for summer 2027 open now: €100 for 10 days, 25% sales commission.",
      kicker: "Gallery · Sammatti",
      h1: "Summer art exhibitions in the mill gallery",
      lead: "Every summer, four different artists show their work in the mill gallery. The 2026 gallery summer is over, and slots for summer 2027 are open for applications.",
      hero: photos.porch,
      facts: ["frame|Four shows a summer", "calendar|10-day exhibition periods", "euro|Room hire €100", "percent|25% sales commission"],
      sections: [
        { title: "Gallery summer", text: ["The 2026 gallery summer is over. Next year we will again present four different artists."] },
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
          { item: "Room hire, 10 exhibition days", price: "€100" },
          { item: "Booking deposit when the show is confirmed (part of the hire)", price: "€50" },
          { item: "Balance when hanging", price: "€50" },
          { item: "Sales commission", price: "25%" },
          { item: "Hanging by the gallerist, per hour started", price: "€47" },
        ],
        note: "The deposit is binding and is not refunded if the show does not go ahead for reasons outside our control. Sales are settled after the show by bank transfer or cash. Payment by card or cash.",
      },
      photos: [photos.porch, photos.wheel, photos.shop],
      faq: [
        { q: "How do I apply?", a: "Send a free-form message with a few sample images to antti.jakola@hotmail.com or WhatsApp +358 44 016 5047." },
        { q: "What does a show cost?", a: "Room hire is €100 for ten exhibition days, and the sales commission is 25%." },
        { q: "Do I need to be there?", a: "It is not required, but being present on some of the days is recommended." },
      ],
      ask: ["The 2026 artists with a photo of each show (archive)", "The 2027 artists once confirmed", "Photos of the gallery room", "Application deadline for 2027", "Do you run workshops, such as ceramics?"],
      cta: "Apply for an exhibition",
    },
  },
  juhlatila: {
    fi: {
      title: "Pieni juhlatila ja kokoustila Sammatissa, Lohja | Vuorikosken Mylly",
      description:
        "Vuokraa vanhan myllyn juhlatila Sammatista, Lohjalta: pitkä pöytä kokouksiin ja pieniin perhejuhliin kesäkaudella, 50 €/h. Omat tarjoilut, pitopalvelu tai myllyn kahvilan herkut.",
      kicker: "Juhlatila · Sammatti",
      h1: "Pieni juhla- ja kokoustila vanhassa myllyssä",
      lead: "Juhlatilan pitkä pöytä istuttaa kokoustajat ja pienet perhejuhlat kesäkauden ajan.",
      hero: photos.breakfast,
      facts: ["table|Pitkä pöytä", "euro|50 € / tunti", "sun|Kesäkaudella", "cup|Kahvikupit ja lautaset 32 hengelle"],
      sections: [
        {
          title: "Tarjoilut niin kuin haluat",
          text: [
            "Astiat, syötävät ja juotavat voi tuoda itse, käyttää ulkopuolista pitopalvelua tai hyödyntää myllyn kahvilan monipuolista tarjontaa. Kaikki kahvilan leivonnaiset ovat gluteenittomia, joten kaikki vieraat voivat syödä samaa.",
            "Kahvikupit, leipälautaset ja lusikat 32 hengelle voi vuokrata meiltä edullisesti.",
          ],
        },
        { title: "Kokouksiin ja perhejuhliin", text: ["Tila sopii kokouksiin, syntymäpäiville, muistotilaisuuksiin ja muihin pieniin perhejuhliin. Kysy vapaita päiviä puhelimella tai WhatsAppilla."] },
      ],
      prices: {
        title: "Hinnat",
        rows: [
          { item: "Juhlatila, kesäkaudella", price: "50 € / h" },
          { item: "Kahvikupit, leipälautaset ja lusikat (32 hlö)", price: "Kysy" },
        ],
      },
      photos: [photos.breakfast, photos.porch, photos.cake],
      faq: [
        { q: "Paljonko juhlatila maksaa?", a: "50 € tunnilta kesäkaudella." },
        { q: "Saako omat tarjoilut tuoda?", a: "Saa. Voit tuoda omat astiat ja tarjoilut, käyttää pitopalvelua tai tilata herkut myllyn kahvilasta." },
      ],
      ask: ["Montako henkeä pöytään mahtuu istumaan", "Astiavuokran hinta", "Onko tilassa käytössä keittiö, jääkaappi tai videotykki", "Onko tila käytössä myös kesäkauden ulkopuolella", "Kuvia tilasta katettuna juhlaan"],
      cta: "Kysy vapaita päiviä",
    },
    en: {
      title: "Small party and meeting room in Sammatti, Lohja | Vuorikosken Mylly",
      description:
        "Hire the event room in an old water mill in Sammatti, Lohja, Finland: a long table for meetings and small family parties in the summer season, €50 per hour. Bring your own food, use a caterer or order from the mill café.",
      kicker: "Event room · Sammatti",
      h1: "A small party and meeting room in an old mill",
      lead: "The long table in the event room seats meetings and small family parties in the summer season.",
      hero: photos.breakfast,
      facts: ["table|One long table", "euro|€50 per hour", "sun|Summer season", "cup|Cups and plates for 32"],
      sections: [
        {
          title: "Catering your way",
          text: [
            "Bring your own tableware, food and drinks, use an outside caterer, or order from the mill café. Every bake in the café is gluten-free, so all guests can eat the same.",
            "Coffee cups, side plates and spoons for 32 people can be hired from us at a small cost.",
          ],
        },
        { title: "Meetings and family occasions", text: ["The room suits meetings, birthdays, memorials and other small family occasions. Ask for free dates by phone or WhatsApp."] },
      ],
      prices: {
        title: "Prices",
        rows: [
          { item: "Event room, summer season", price: "€50 / h" },
          { item: "Coffee cups, side plates and spoons (32 people)", price: "Ask" },
        ],
      },
      photos: [photos.breakfast, photos.porch, photos.cake],
      faq: [
        { q: "What does the room cost?", a: "€50 per hour in the summer season." },
        { q: "Can I bring my own food?", a: "Yes. Bring your own, use a caterer or order bakes from the mill café." },
      ],
      ask: ["How many people the table seats", "Price of the tableware hire", "Kitchen, fridge or projector available?", "Is the room available outside the summer season?", "Photos of the room set for a party"],
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
          text: ["Puusaunan pehmeät löylyt täydentävät yön. Hintaan sisältyvät polttopuut, laudeliinat, pyyhkeet ja pesuaineet. Kantovesi tulee viereisestä lammesta, jossa voi myös kastautua. Saunan voi varata myös ilman majoitusta."],
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
      photos: [photos.nutHut, photos.bed, photos.lantern, photos.studio, photos.pond, photos.breakfast],
      faq: [
        { q: "Onko mökeissä sähköä?", a: "Ei. Mökit ovat sähköttömiä ja kesälämpimiä. Alueella voi ladata puhelimen ja käytössä on wc." },
        { q: "Mitä majoitus maksaa?", a: "59 € yöltä 1–2 hengelle liinavaatteineen. Lisäpatja 15 €, aamiainen 10 € / hlö ja sauna 7 € / hlö." },
        { q: "Miten varaan?", a: "Puhelimella tai WhatsAppilla 044 016 5047." },
      ],
      ask: ["Kesän 2027 majoituskausi ja milloin varaukset aukeavat", "Kuva rantasaunasta ja tulipaikasta", "Haluatko varauskalenterin tai varauslomakkeen, vai riittääkö puhelin ja WhatsApp?"],
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
        { id: "rantasauna", title: "Shore sauna", text: ["Finish the day with soft wood-fired sauna steam. Firewood, seat covers, towels and toiletries are included. Water is carried from the pond next door, where you can also take a dip. The sauna can be booked without a stay too."] },
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
      photos: [photos.nutHut, photos.bed, photos.lantern, photos.studio, photos.pond, photos.breakfast],
      faq: [
        { q: "Do the cabins have electricity?", a: "No. They are off-grid summer cabins. You can charge your phone on site and there is a toilet." },
        { q: "What does a night cost?", a: "€59 a night for 1–2 people with bed linen. Extra mattress €15, breakfast €10 per person and sauna €7 per person." },
        { q: "How do I book?", a: "By phone or WhatsApp, +358 44 016 5047." },
      ],
      ask: ["The 2027 lodging season and when bookings open", "A photo of the shore sauna and the fire place", "Do you want a booking calendar or form, or are phone and WhatsApp enough?"],
      cta: "Ask for free nights",
    },
  },
};

export const contactPage = {
  fi: {
    title: "Aukioloajat ja yhteystiedot | Vuorikosken Mylly, Sammatti, Lohja",
    description: "Vuorikosken Myllyn aukioloajat, osoite (Tavolantie 18, 09220 Sammatti), puhelin, WhatsApp, ajo-ohjeet ja bussiyhteys Lohjalta.",
    h1: "Aukiolo ja yhteystiedot",
    lead: "Mylly on avoinna kesäkaudella ja joulun alla adventtiviikonloppuina.",
    ask: ["Y-tunnus ja yrityksen virallinen nimi", "Kesän 2027 aukioloajat", "Pysäköinti: missä autot seisovat?", "Esteettömyys: pääseekö pyörätuolilla kahvilaan ja wc:hen?"],
  },
  en: {
    title: "Opening hours and contact | Vuorikosken Mylly, Sammatti, Lohja",
    description: "Vuorikosken Mylly opening hours, address (Tavolantie 18, 09220 Sammatti, Finland), phone, WhatsApp, directions and the bus from Lohja.",
    h1: "Hours and contact",
    lead: "The mill is open in the summer season and on Advent weekends before Christmas.",
    ask: ["Business ID and official company name", "Summer 2027 opening hours", "Parking: where do cars go?", "Accessibility: wheelchair access to the café and toilet?"],
  },
};

export const homeAsk = {
  fi: ["Kuva teistä kahdesta ja pari lausetta: keitä olette ja miksi mylly (vieraat tulevat mielellään ihmisten luo)", "Google-yritysprofiili ja luvat näyttää sen arviot lähteineen", "Instagram, jos sellainen on", "Kymmeniä kuvia lisää Facebookista: kahvila, putiikki, galleria, lampi ja koski eri vuodenaikoina"],
  en: ["A photo of the two of you and a couple of sentences about who you are", "Google Business Profile, and OK to show its reviews with the source", "Instagram, if any", "More photos from Facebook: café, shop, gallery, pond and rapids through the seasons"],
};
