// Every fact here comes from the owner's own site (kelomaja.fi, read 2026-11-03), his answers in the drop box
// (3.11.2026: check-in/out, keypad lock, parking, stove, Kuusisto rooms and sauna, lit tracks, payment), his own Nettimökki listings
// (descriptions, prices and distances he entered there), or huts.fi data for the nearby places (descriptions and
// coordinates, read 2026-11-03). Guest reviews were read only as private notes: never quote or store them here.
// Do not add numbers, distances or features that are not in those sources. Open questions live in `ask` (preview only).

export type Locale = "fi" | "en";
export type UnitId = "kelomaja" | "kuusisto";

export const SITE_URL = "https://www.kelomaja.fi";
export const HUTS = "https://www.huts.fi";
/** Where the map iframe comes from. Overridable only to test an unreleased huts.fi embed locally. */
export const HUTS_EMBED = process.env.HUTS_EMBED_ORIGIN || HUTS;

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
  name: "Kelomaja",
  owner: "Arvo Puhakka",
  phone: "050 539 4738",
  phoneIntl: "+358505394738",
  email: "arvo.puhakka@kelomaja.fi",
  instagram: "https://www.instagram.com/kelomaja.fi/",
  orgId: "31222a7a-97a4-4bef-8630-4f3aaf0f347c",
};

export const tel = `tel:${business.phoneIntl}`;

export const paths = {
  home: { fi: "/", en: "/en" },
  area: { fi: "/sallatunturi", en: "/en/sallatunturi" },
} as const;

export type PriceRow = { when: Text; price: number; extra?: boolean };
export type Distance = { icon: string; what: Text; m: number };

export type Unit = {
  id: UnitId;
  hutsId: string;
  name: Text;
  tagline: Text;
  slug: string;
  street: string;
  sleeps: Text;
  rooms: Text;
  /** The owner's own words from kelomaja.fi, word for word (Finnish); English is our translation. */
  intro: TextList;
  beds: TextList;
  highlights: TextList;
  kitchen: TextList;
  /** Owner-entered distances from his Nettimökki listing. */
  distances: Distance[];
  prices: PriceRow[];
  booking: string;
  photos: Photo[];
  ask: string[];
};

const nettimokki = (path: string) => `https://www.nettimokki.com/salla/${path}/`;

export const units: Record<UnitId, Unit> = {
  kelomaja: {
    id: "kelomaja",
    hutsId: "9f1055b7-7566-414b-b252-c58ece220b69",
    name: { fi: "Kelomaja", en: "Kelomaja" },
    tagline: { fi: "Kelohirsinen paritalomökki jopa kuudelle", en: "Kelo-log semi-detached cabin for up to six" },
    slug: "kelomaja",
    street: "Revontie 8 B",
    sleeps: { fi: "6 henkeä", en: "Sleeps 6" },
    rooms: { fi: "2 mh + parvi, 54 m²", en: "2 bedrooms + loft, 54 m²" },
    intro: {
      fi: [
        "Kelomaja on aito kelohirsimökki Sallatunturissa – lämminhenkinen ja tunnelmallinen paikka, jossa Lapin perinteinen tyyli kohtaa modernin mukavuuden. Paksut kelohirret, pehmeä valaistus ja luonnonläheinen sisustus luovat rauhallisen ympäristön, jossa on helppo irrottautua arjesta.",
        "Päivän ulkoilujen jälkeen voit sytyttää takan, rentoutua oman saunan lämmössä ja nauttia mökin rauhasta.",
        "Mökkiä on kunnostettu ja päivitetty vuosien varrella. Keittiö, sauna ja kylpyhuone on remontoitu, ja suuri osa kalusteista on uusittu.",
      ],
      en: [
        "Kelomaja is a genuine kelo-log cabin at Sallatunturi: a warm, cosy place where traditional Lapland style meets modern comfort. Thick kelo logs, soft lighting and natural interiors make it easy to leave everyday life behind.",
        "After a day outdoors, light the fireplace, warm up in your own sauna and enjoy the quiet.",
        "The cabin has been renovated over the years. The kitchen, sauna and bathroom are new, and most of the furniture has been replaced.",
      ],
    },
    beds: {
      fi: ["Makuuhuone 1: parisänky", "Makuuhuone 2: kerrossänky kahdelle", "Parvi: parisänky (korkeus 167 cm)"],
      en: ["Bedroom 1: double bed", "Bedroom 2: bunk bed for two", "Loft: double bed (height 167 cm)"],
    },
    highlights: {
      fi: [
        "flame|Varaava takka, polttopuut sisältyvät",
        "bath|Ikkunallinen sauna tunturinäkymällä",
        "wifi|Nopea Wi-Fi (5G, 200 Mbit/s)",
        "tv|42” Smart TV (Netflix ym. omilla tunnuksilla)",
        "thermometer|Lattialämmitys ja ilmalämpöpumppu",
        "shirt|Pyykinpesukone ja kuivauskaappi",
        "baby|Syöttötuoli ja matkasänky",
        "lock|Lukollinen varasto suksille",
        "sun|Terassi etelä–länteen",
        "car|Pihassa 1 autopaikka, viereisellä parkkipaikalla tilaa 4 autolle",
        "clock|Tulo klo 16, lähtö klo 12 mennessä",
        "key|Itsepalvelu: ovessa näppäinlukko",
        "dog|Lemmikit tervetulleita",
      ],
      en: [
        "flame|Heat-storing fireplace, firewood included",
        "bath|Sauna with a window to the fell",
        "wifi|Fast Wi-Fi (5G, 200 Mbit/s)",
        "tv|42” Smart TV (Netflix etc. with your own login)",
        "thermometer|Underfloor heating and air-source heat pump",
        "shirt|Washing machine and drying cabinet",
        "baby|High chair and travel cot",
        "lock|Lockable storage for skis",
        "sun|Terrace facing south-west",
        "car|1 parking space in the yard, room for 4 cars in the car park next door",
        "clock|Check-in 4 pm, check-out by 12 noon",
        "key|Self check-in with a keypad lock",
        "dog|Pets welcome",
      ],
    },
    kitchen: {
      fi: ["Liesi (teräksiset keittolevyt) ja uuni", "Astianpesukone", "Jääkaappi ja pakastin", "Mikroaaltouuni", "Kahvin- ja vedenkeitin, leivänpaahdin", "Astiasto 8 hengelle"],
      en: ["Stove with steel hotplates, and oven", "Dishwasher", "Fridge and freezer", "Microwave", "Coffee maker, kettle and toaster", "Tableware for 8"],
    },
    distances: [
      { icon: "snowflake", what: { fi: "Hiihtolatu", en: "Ski track" }, m: 40 },
      { icon: "mountain-snow", what: { fi: "Hiihtokeskus", en: "Ski resort" }, m: 100 },
      { icon: "cable-car", what: { fi: "Rinteet", en: "Slopes" }, m: 300 },
      { icon: "shopping-basket", what: { fi: "Kauppa", en: "Shop" }, m: 300 },
      { icon: "bus", what: { fi: "Bussipysäkki", en: "Bus stop" }, m: 300 },
      { icon: "store", what: { fi: "S- ja K-market (kirkonkylä)", en: "Supermarkets (Salla village)" }, m: 10000 },
    ],
    prices: [
      { when: { fi: "Vuorokausi", en: "Night" }, price: 90 },
      { when: { fi: "Viikko (7 vrk)", en: "Week (7 nights)" }, price: 490 },
      { when: { fi: "Viikko 3.10.–19.12.2026", en: "Week 3 Oct – 19 Dec 2026" }, price: 450 },
      { when: { fi: "Loppusiivous (lisäpalvelu)", en: "Final cleaning (optional extra)" }, price: 85, extra: true },
      { when: { fi: "Liinavaatteet / setti (lisäpalvelu)", en: "Bed linen per set (optional extra)" }, price: 25, extra: true },
    ],
    booking: nettimokki("kelomaja/52377"),
    photos: [
      photo("kelomaja-takka", "Varaava takka ja kelohirsiseinä", "Fireplace and kelo-log wall"),
      photo("kelomaja-tupa", "Tupa: ruokapöytä ja sohva", "Living room: dining table and sofa"),
      photo("kelomaja-tupakeittio", "Tupakeittiö", "Kitchen-living room"),
      photo("kelomaja-keittio", "Keittiö", "Kitchen"),
      photo("kelomaja-makuuhuone", "Makuuhuone", "Bedroom"),
      photo("kelomaja-parvi", "Parvi", "Loft"),
      photo("kelomaja-sauna", "Ikkunallinen sauna", "Sauna with a window"),
      photo("kelomaja-kiuas", "Kiuas", "Sauna stove"),
      photo("kelomaja-olohuone", "Tupa ylhäältä", "Living room from above"),
      photo("kelomaja-nurkkaus", "Sohvanurkkaus", "Sofa corner"),
      photo("kelomaja-suihku", "Suihku", "Shower"),
      photo("kelomaja-wc", "WC", "Toilet"),
      photo("kelomaja-eteinen", "Eteinen", "Hallway"),
    ],
    ask: [],
  },
  kuusisto: {
    id: "kuusisto",
    hutsId: "2c747db0-7f0b-4e8b-b71b-f6aa5d53343e",
    name: { fi: "Kuusisto", en: "Kuusisto" },
    tagline: { fi: "Täysin remontoitu paritalomökki latujen vieressä", en: "Fully renovated semi-detached cabin by the ski tracks" },
    slug: "kuusisto",
    street: "Tunturitie 10 A",
    sleeps: { fi: "4 + 2 henkeä", en: "Sleeps 4 + 2" },
    rooms: { fi: "1 mh + parvi, 54 m²", en: "1 bedroom + loft, 54 m²" },
    intro: {
      fi: [
        "Kuusisto on valoisa ja kodikas mökki aivan Sallatunturin tuntumassa – paikka, jossa loma alkaa heti ovesta astuessa. Suuret ikkunat tuovat luonnon lähelle ja täyttävät tilan pehmeällä valolla vuodenajasta riippumatta.",
        "Sijainti on yksi mökin suurimmista eduista – hiihtokeskus, ladut ja kansallispuiston retkeilyreitit löytyvät aivan läheltä.",
        "Hyvin varusteltu keittiö, viihtyisät oleskelutilat ja tunturin läheisyys tekevät Kuusistosta helpon ja huolettoman valinnan onnistuneeseen lomaan Sallassa.",
      ],
      en: [
        "Kuusisto is a bright, homely cabin right at the foot of Sallatunturi, where the holiday starts the moment you step inside. Big windows bring nature close and fill the room with soft light in every season.",
        "The location is one of its best features: the ski resort, ski tracks and the national park's hiking trails are all close by.",
        "A well-equipped kitchen, cosy living space and the fell next door make Kuusisto an easy, carefree choice for a holiday in Salla.",
      ],
    },
    beds: {
      fi: ["Makuuhuone: parisänky", "Parvi: 2 erillistä vuodetta (matala tila)", "Vuodesohva: 2 lisävuodetta"],
      en: ["Bedroom: double bed", "Loft: 2 single beds (low ceiling)", "Sofa bed: 2 extra beds"],
    },
    highlights: {
      fi: [
        "flame|Varaava takka, polttopuut sisältyvät",
        "bath|Oma pieni sauna neljälle",
        "wifi|Nopea Wi-Fi (5G, 200 Mbit/s)",
        "tv|42” Smart TV (Netflix ym. omilla tunnuksilla)",
        "thermometer|Lattialämmitys ja ilmalämpöpumppu",
        "shirt|Pyykinpesukone ja kuivauskaappi",
        "baby|Syöttötuoli ja matkasänky",
        "lock|Lukollinen ulkovarasto suksille",
        "sun|Etelään avautuva kuisti, grillikatos pihassa",
        "clock|Tulo klo 16, lähtö klo 12 mennessä",
        "key|Itsepalvelu: ovessa näppäinlukko",
        "dog|Lemmikit tervetulleita",
      ],
      en: [
        "flame|Heat-storing fireplace, firewood included",
        "bath|Small private sauna for four",
        "wifi|Fast Wi-Fi (5G, 200 Mbit/s)",
        "tv|42” Smart TV (Netflix etc. with your own login)",
        "thermometer|Underfloor heating and air-source heat pump",
        "shirt|Washing machine and drying cabinet",
        "baby|High chair and travel cot",
        "lock|Lockable outdoor storage for skis",
        "sun|South-facing porch, barbecue shelter in the yard",
        "clock|Check-in 4 pm, check-out by 12 noon",
        "key|Self check-in with a keypad lock",
        "dog|Pets welcome",
      ],
    },
    kitchen: {
      fi: ["Induktioliesi ja uuni", "Astianpesukone", "Jääkaappi ja pakastin", "Mikroaaltouuni", "Kahvin- ja vedenkeitin", "Astiasto 6 hengelle"],
      en: ["Induction stove and oven", "Dishwasher", "Fridge and freezer", "Microwave", "Coffee maker and kettle", "Tableware for 6"],
    },
    distances: [
      { icon: "snowflake", what: { fi: "Hiihtolatu", en: "Ski track" }, m: 70 },
      { icon: "waves", what: { fi: "Kylpylä", en: "Spa" }, m: 400 },
      { icon: "cable-car", what: { fi: "Rinteet", en: "Slopes" }, m: 500 },
      { icon: "bus", what: { fi: "Bussipysäkki", en: "Bus stop" }, m: 500 },
      { icon: "shopping-basket", what: { fi: "Kauppa", en: "Shop" }, m: 1100 },
      { icon: "store", what: { fi: "Kirkonkylän kaupat", en: "Salla village shops" }, m: 10000 },
    ],
    prices: [
      { when: { fi: "Vuorokausi", en: "Night" }, price: 90 },
      { when: { fi: "Viikko (7 vrk)", en: "Week (7 nights)" }, price: 480 },
      { when: { fi: "Viikko 3.10.–19.12.2026", en: "Week 3 Oct – 19 Dec 2026" }, price: 400 },
      { when: { fi: "Loppusiivous (lisäpalvelu)", en: "Final cleaning (optional extra)" }, price: 85, extra: true },
      { when: { fi: "Liinavaatteet / setti (lisäpalvelu)", en: "Bed linen per set (optional extra)" }, price: 25, extra: true },
    ],
    booking: nettimokki("kuusisto/51299"),
    photos: [
      photo("kuusisto-ulkoa", "Kuusisto ulkoa", "Kuusisto from outside"),
      photo("kuusisto-tupa", "Tupa: ruokailutila ja olohuone", "Living room and dining area"),
      photo("kuusisto-takka", "TV-nurkkaus ja takka", "TV corner and fireplace"),
      photo("kuusisto-keittio", "Keittiö", "Kitchen"),
      photo("kuusisto-ruokailu", "Ruokailutila", "Dining area"),
      photo("kuusisto-makuuhuone", "Makuuhuone", "Bedroom"),
      photo("kuusisto-parvelta", "Näkymä parvelta", "View from the loft"),
      photo("kuusisto-terassi", "Kuisti", "Porch"),
      photo("kuusisto-sauna", "Sauna", "Sauna"),
      photo("kuusisto-saunasuihku", "Sauna ja suihku", "Sauna and shower"),
      photo("kuusisto-suihku", "Suihku", "Shower"),
      photo("kuusisto-wc", "WC", "Toilet"),
    ],
    ask: [],
  },
};

export const unitList: Unit[] = [units.kelomaja, units.kuusisto];
export const unitPath = (u: Unit, locale: Locale) => (locale === "fi" ? `/${u.slug}` : `/en/${u.slug}`);
export const fromPrice = (u: Unit) => Math.min(...u.prices.filter((p) => !p.extra).map((p) => p.price));

// ── Sallatunturi: the owner's activity content, organised ──────────────────────────────────────────

/** The owner's ski-resort numbers from kelomaja.fi. */
export const skiStats: { value: string; label: Text }[] = [
  { value: "15", label: { fi: "rinnettä", en: "slopes" } },
  { value: "7", label: { fi: "hissiä", en: "lifts" } },
  { value: "1 300 m", label: { fi: "pisin rinne", en: "longest run" } },
  { value: "160 km", label: { fi: "latuja", en: "ski tracks" } },
];

export type Season = { id: string; title: Text; photo: Photo; lead: Text; groups: { title: Text; items: TextList }[] };

export const seasons: Season[] = [
  {
    id: "talvi",
    title: { fi: "Talvi", en: "Winter" },
    photo: photo("salla-laskija", "Laskettelija puuterilumessa Sallatunturilla", "Skier in powder snow at Sallatunturi"),
    lead: {
      fi: "Talvella Salla tunnetaan erityisesti hiihdosta ja laskettelusta, mutta tarjolla on myös paljon muuta tekemistä.",
      en: "In winter Salla is best known for skiing, both downhill and cross-country, but there is plenty more to do.",
    },
    groups: [
      {
        title: { fi: "Laskettelu", en: "Downhill" },
        items: {
          fi: ["Noin 15 rinnettä eri tasoisille laskijoille", "Perheystävällinen lastenalue", "FIS-kilparinne kokeneille", "Valaistut rinteet iltalaskuun", "Välinevuokraus, hiihtokoulu ja sport shop"],
          en: ["About 15 slopes for every level", "Family area for children", "FIS race slope for experienced skiers", "Lit slopes for evening skiing", "Rental, ski school and sport shop"],
        },
      },
      {
        title: { fi: "Hiihto", en: "Cross-country" },
        items: {
          fi: ["160 km hoidettuja latuja", "45 km valaistuja reittejä", "Lyhyistä lenkeistä koko päivän retkihiihtoon", "Latuverkostosta huolehtii Latupooli"],
          en: ["160 km of groomed tracks", "45 km lit", "From short loops to all-day ski tours", "Tracks kept in shape by Latupooli"],
        },
      },
      {
        title: { fi: "Muuta tekemistä", en: "More to do" },
        items: {
          fi: ["Lumikenkäily", "Moottorikelkkasafarit", "Husky- ja poroajelut"],
          en: ["Snowshoeing", "Snowmobile safaris", "Husky and reindeer rides"],
        },
      },
    ],
  },
  {
    id: "kesa",
    title: { fi: "Kesä ja syksy", en: "Summer and autumn" },
    photo: photo("salla-patikka", "Patikoija ja maastopyöräilijä tunturipolulla", "Hiker and mountain biker on a fell path"),
    lead: {
      fi: "Kesällä Salla muuttuu retkeilijän ja luonnossa liikkujan paratiisiksi. Yöttömän yön valo ja hiljaisuus tekevät kokemuksesta ainutlaatuisen, ja syksyllä ruska maalaa tunturit.",
      en: "In summer Salla turns into a paradise for hikers and anyone who loves the outdoors. The midnight sun and the silence make it special, and in autumn the ruska colours the fells.",
    },
    groups: [
      {
        title: { fi: "Patikointi", en: "Hiking" },
        items: {
          fi: ["Jopa 300 km merkittyjä reittejä", "Helpoista päiväretkistä vaativiin vaelluksiin", "Ruuhitunturin huikeat näkymät"],
          en: ["Up to 300 km of marked trails", "From easy day trips to demanding hikes", "Great views from Ruuhitunturi"],
        },
      },
      {
        title: { fi: "Maastopyöräily", en: "Mountain biking" },
        items: {
          fi: ["Reittejä aloittelijoista kokeneille", "Tunturipolkuja, metsiä ja pitkospuita", "Ruuhitunturin kierros, Sallatunturin polut, Naruskan erämaareitit"],
          en: ["Routes for beginners and experts", "Fell paths, forests and duckboards", "Ruuhitunturi loop, Sallatunturi paths, Naruska wilderness routes"],
        },
      },
      {
        title: { fi: "Muuta tekemistä", en: "More to do" },
        items: {
          fi: ["Melonta kirkasvetisillä järvillä", "Marjastus ja sienestys", "Uimapaikka muutaman sadan metrin päässä"],
          en: ["Paddling on clear lakes", "Berry and mushroom picking", "A swimming spot a few hundred metres away"],
        },
      },
    ],
  },
];

export const gallery: Photo[] = [
  photo("salla-tunturi", "Lumiset puut Sallatunturilla", "Snowy trees at Sallatunturi"),
  photo("salla-revontulet", "Revontulet lumisten kuusten yllä", "Northern lights over snowy spruces"),
  photo("salla-2", "Tykkylumiset kuuset", "Snow-laden spruces"),
  photo("salla-1", "Valaistu latu Sallatunturilla", "Lit ski track at Sallatunturi"),
  photo("salla-4", "Kota tunturin laella kesällä", "Hut on the fell top in summer"),
  photo("salla-latu", "Ulkoilureittien kota ja latu", "Hut and ski track on the outdoor trails"),
  photo("salla-7", "Viitta Sallatunturilla", "Signpost at Sallatunturi"),
  photo("salla-6", "Hillat", "Cloudberries"),
  photo("salla-8", "Laavut talvella", "Lean-to shelters in winter"),
  photo("salla-3", "Talvimetsä", "Winter forest"),
  photo("salla-5", "Tunturimaisema", "Fell view"),
];

export const arrive: TextList = {
  fi: ["Junalla Kemijärvelle (myös autojuna), sieltä linja-autolla Sallatunturille (n. 75 km)", "Lähin lentokenttä noin 90 km"],
  en: ["Train to Kemijärvi (car-carrier train too), then bus to Sallatunturi (about 75 km)", "Nearest airport about 90 km"],
};

// ── Nearby places: each gets its own page on the owner's site ───────────────────────────────────────
// Facts from huts.fi (descriptions read 2026-11-03), written in our own words. Distances are straight lines
// from Kelomaja's huts.fi pin.

export type Nearby = {
  key: string;
  id: string;
  kind: "place" | "route";
  icon: string;
  slug: string;
  name: Text;
  what: Text;
  km: number;
  lengthKm?: number;
  hutsPath: string;
  official?: { label: string; href: string };
  lead: Text;
  facts: TextList;
  tip: Text;
  photo?: Photo;
};

export const nearby: Nearby[] = [
  {
    key: "hiihtokeskus",
    id: "e6639183-a14e-45ba-a899-bb76e176c193",
    kind: "place",
    icon: "mountain-snow",
    slug: "sallan-hiihtokeskus",
    name: { fi: "Sallan hiihtokeskus", en: "Salla ski resort" },
    what: { fi: "Laskettelukeskus", en: "Ski resort" },
    km: 0.4,
    hutsPath: "/suomi/lappi/salla/laskettelukeskukset/sallan-hiihtokeskus",
    official: { label: "ski.salla.fi", href: "https://ski.salla.fi/" },
    lead: {
      fi: "Sallan hiihtokeskus on Sallatunturin rinteillä, muutaman sadan metrin päässä Kelomajasta ja Kuusistosta. Rinteille kävelee mökiltä, joten autoa ei tarvita.",
      en: "Salla ski resort is on the slopes of Sallatunturi, a few hundred metres from Kelomaja and Kuusisto. You walk to the lifts from the cabin, so there is no need for a car.",
    },
    facts: {
      fi: ["15 rinnettä ja 7 hissiä", "Pisin rinne 1 300 m", "Lastenalue, snowpark ja metsälaskualue", "Välinevuokraamo ja hiihtokoulu", "Valaistut rinteet iltalaskuun"],
      en: ["15 slopes and 7 lifts", "Longest run 1,300 m", "Children's area, snow park and off-piste area", "Rental shop and ski school", "Lit slopes for evening skiing"],
    },
    tip: {
      fi: "Väljät rinteet ja lyhyet jonot tekevät Sallasta hyvän paikan perheille ja rauhallista laskua arvostaville. Ajantasaiset rinne- ja lipputiedot löytyvät hiihtokeskuksen omilta sivuilta.",
      en: "Wide slopes and short queues make Salla a good fit for families and anyone who likes a calm day on the hill. Current slope and ticket info is on the resort's own site.",
    },
    photo: photo("salla-tunturi", "Sallatunturi talvella", "Sallatunturi in winter"),
  },
  {
    key: "kylpyla",
    id: "ebb05082-105b-4872-9425-c3e181032c69",
    kind: "place",
    icon: "waves",
    slug: "kylpyla-holiday-club-salla",
    name: { fi: "Kylpylä Holiday Club Salla", en: "Holiday Club Salla spa" },
    what: { fi: "Kylpylä", en: "Spa" },
    km: 0.3,
    hutsPath: "/suomi/lappi/salla/kylpylat/holiday-club-salla",
    official: { label: "holidayclubresorts.com", href: "https://www.holidayclubresorts.com/fi/kohteet/salla/kylpyla/" },
    lead: {
      fi: "Holiday Club Sallan tunturikylpylä on kävelymatkan päässä mökeiltä, hiihtokeskuksen vieressä. Suurista ikkunoista näkyy Sallatunturi.",
      en: "Holiday Club Salla's fell spa is a short walk from the cabins, next to the ski resort. Its big windows look out on Sallatunturi.",
    },
    facts: {
      fi: ["16 metrin kuntouintiallas", "Lastenallas, poreallas ja viihdeallas vesiputouksella", "Pieni ja rauhallinen kylpylä", "Kesäkuussa tauko, aukiolot kylpylän sivuilta"],
      en: ["16-metre lap pool", "Children's pool, bubble pool and fun pool with a waterfall", "Small and quiet", "Closed for a few weeks before midsummer; hours on the spa's site"],
    },
    tip: {
      fi: "Hyvä lopetus rinne- tai latupäivälle: uinti lämmittää ja mökille on lyhyt matka.",
      en: "A good end to a day on the slopes or tracks: a swim to warm up, and a short walk home.",
    },
  },
  {
    key: "uimapaikka",
    id: "220d4e8e-6989-49a2-83c4-29f453266e68",
    kind: "place",
    icon: "sun",
    slug: "sallatunturin-uimapaikka",
    name: { fi: "Sallatunturin uimapaikka", en: "Sallatunturi swimming beach" },
    what: { fi: "Uimaranta Keselmäjärvellä", en: "Beach on Lake Keselmäjärvi" },
    km: 1.0,
    hutsPath: "/suomi/lappi/salla/uimarannat/sallatunturin-uimapaikka",
    official: { label: "salla.fi", href: "https://www.salla.fi/palvelut/liikunta-ja-nuorisopalvelut/uimapaikat/" },
    lead: {
      fi: "Keselmäjärven uimaranta on Sallatunturin länsipuolella, noin kilometrin päässä mökeiltä. Kunta ylläpitää rantaa, ja se on maksuton.",
      en: "The Keselmäjärvi beach is on the west side of Sallatunturi, about a kilometre from the cabins. The municipality looks after it, and it is free.",
    },
    facts: {
      fi: ["Pukukopit ja vessat", "Kävelysilta saaren grillikodalle", "Lasten leikkipaikka", "Saarella revontulien ja yöttömän yön havaintopaikka"],
      en: ["Changing huts and toilets", "Footbridge to a barbecue hut on the island", "Playground for children", "Northern lights and midnight sun viewing spot on the island"],
    },
    tip: {
      fi: "Kesäillan uinnin jälkeen voi grillata saaren kodalla. Talvella samalta saarelta katsotaan revontulia.",
      en: "After an evening swim, grill at the island hut. In winter the same island is a place to watch the northern lights.",
    },
  },
  {
    key: "kota",
    id: "86935794-4545-44e8-b32f-5df8caf3d0f6",
    kind: "place",
    icon: "tent",
    slug: "sallatunturin-kota",
    name: { fi: "Sallatunturin kota", en: "Sallatunturi summit hut" },
    what: { fi: "Kota tunturin laella", en: "Hut on the fell top" },
    km: 1.0,
    hutsPath: "/suomi/lappi/salla/autiotuvat-laavut/sallatunturin-kota",
    official: { label: "salla.fi", href: "https://www.salla.fi" },
    lead: {
      fi: "Sallatunturin laella on maksuton päiväkota, jonne nousee kävellen mökeiltä. Huipulla on myös riippumatot ja kuuluisa ”Salla in the middle of nowhere” -kyltti.",
      en: "On top of Sallatunturi there is a free day hut you can walk up to from the cabins. The summit also has hammocks and the famous “Salla – in the middle of nowhere” sign.",
    },
    facts: {
      fi: ["Maksuton, päiväkäyttöön", "Kävelyreitti laelle rinteiden eteläpuolelta", "Riippumatot ja näköalat", "Kunnan ylläpitämä"],
      en: ["Free, for day use", "Walking route to the top from the south side of the slopes", "Hammocks and views", "Maintained by the municipality"],
    },
    tip: {
      fi: "Lyhyt ja palkitseva retki: aamukahvit mökillä ja eväät tunturin laella. Huipulla tuulee, joten ota lisävaate mukaan.",
      en: "A short, rewarding outing: coffee at the cabin, a packed lunch on the top. It can be windy up there, so take an extra layer.",
    },
    photo: photo("salla-4", "Kota tunturin laella", "Hut on the fell top"),
  },
  {
    key: "ruuhitunturi",
    id: "10facb4d-ff9d-42a6-ade7-547e53d873e8",
    kind: "place",
    icon: "binoculars",
    slug: "ruuhitunturi",
    name: { fi: "Ruuhitunturi ja luontotorni", en: "Ruuhitunturi and its viewing tower" },
    what: { fi: "Näköalatorni kansallispuistossa", en: "Viewing tower in the national park" },
    km: 4.7,
    hutsPath: "/suomi/lappi/salla/nakoalatornit/ruuhitunturi-luontotorni",
    official: { label: "luontoon.fi", href: "https://www.luontoon.fi/fi/reitit/ruuhitunturin-kierros-salla-26759" },
    lead: {
      fi: "Ruuhitunturin luontotorni on Sallan kansallispuistossa, noin viiden kilometrin päässä mökeiltä. Tornista näkyy Sallatunturi, vanhat tunturit itään ja kynttiläkuusikot.",
      en: "Ruuhitunturi's viewing tower is in Salla National Park, about five kilometres from the cabins. From the top you see Sallatunturi, old fells to the east and candle-shaped spruces.",
    },
    facts: {
      fi: ["Ruuhitunturin kierros on noin 14–18 km lähtöpaikasta riippuen", "Päivätupa omille eväille tornin alapuolella", "Erämaakahvila auki talvella helmikuun puolivälistä pääsiäiseen", "Perille suksilla, kävellen tai pyörällä"],
      en: ["The Ruuhitunturi loop is about 14–18 km depending on where you start", "Day hut for your own packed lunch below the tower", "Wilderness café open in late winter, mid-February to Easter", "Reach it on skis, on foot or by bike"],
    },
    tip: {
      fi: "Ruuhitunturi on yksi Sallan hienoimmista päiväretkistä. Talvella kahvilan munkit ja keitto ovat hyvä syy hiihtää perille.",
      en: "Ruuhitunturi is one of Salla's best day trips. In late winter the café's soup and doughnuts are a good reason to ski out there.",
    },
    photo: photo("salla-2", "Tykkylumiset kuuset", "Snow-laden spruces"),
  },
  {
    key: "ruuhireitti",
    id: "143385ec-0473-4d56-9f2e-fab963f129bf",
    kind: "route",
    icon: "footprints",
    slug: "ruuhitunturin-reitti",
    name: { fi: "Ruuhitunturin reitti", en: "Ruuhitunturi trail" },
    what: { fi: "Retkeilyreitti", en: "Hiking trail" },
    km: 0.3,
    lengthKm: 16.7,
    hutsPath: "/suomi/lappi/salla/routes/retkeilyreitit/ruuhitunturin-reitti",
    official: { label: "luontoon.fi", href: "https://www.luontoon.fi/fi/kohteet/sallan-kansallispuisto" },
    lead: {
      fi: "Ruuhitunturin reitti kulkee Sallatunturilta kansallispuiston metsien ja tunturien halki Ruuhitunturille. Reitille pääsee muutaman sadan metrin päästä mökeiltä.",
      en: "The Ruuhitunturi trail runs from Sallatunturi through the national park's forests and fells to Ruuhitunturi. You join it a few hundred metres from the cabins.",
    },
    facts: {
      fi: ["Noin 16,7 km, ei ympyrälenkki", "Varrella laavuja, kotia ja päivätupa", "Ruuhitunturin luontotorni reitin varrella", "Risteyksistä voi lyhentää tai pidentää päivää"],
      en: ["About 16.7 km, one way (not a loop)", "Lean-tos, huts and a day hut along the way", "Ruuhitunturi viewing tower on the route", "Junctions let you make the day shorter or longer"],
    },
    tip: {
      fi: "Talvella samaa maisemaa pitkin kulkee Ruuhitunturin latu. Kansallispuiston säännöt ja kausiohjeet löytyvät Luontoon.fi-sivustolta.",
      en: "In winter a ski track follows the same landscape. National park rules and seasonal advice are on Luontoon.fi.",
    },
    photo: photo("salla-8", "Laavut reitin varrella", "Lean-tos along the trail"),
  },
  {
    key: "latu",
    id: "60869fff-c47a-4886-85af-e954868b86d7",
    kind: "route",
    icon: "snowflake",
    slug: "tunturin-ympari-latu",
    name: { fi: "Tunturin ympäri -latu", en: "Round-the-fell ski track" },
    what: { fi: "Hiihtolatu", en: "Ski track" },
    km: 0.1,
    lengthKm: 7.7,
    hutsPath: "/suomi/lappi/salla/routes/hiihtoladut/tunturin-ympari-latu",
    official: { label: "salla.fi", href: "https://www.salla.fi" },
    lead: {
      fi: "Tunturin ympäri -latu kiertää Pienen Pyhätunturin ja lähtee hiihtokeskuksen luota. Mökeiltä ladulle on vain kymmeniä metrejä, joten sukset voi laittaa jalkaan pihassa.",
      en: "The round-the-fell track circles Pieni Pyhätunturi and starts by the ski resort. It is only tens of metres from the cabins, so you can put your skis on in the yard.",
    },
    facts: {
      fi: ["Noin 8–9 km lenkki", "Osittain valaistu", "Perinteinen ja vapaa tyyli", "Näkymiä kansallispuistoon ja Iso Pyhätunturille"],
      en: ["A loop of about 8–9 km", "Partly lit", "Classic and skate", "Views to the national park and Iso Pyhätunturi"],
    },
    tip: {
      fi: "Lenkin varrella on grillikatoksia ja kota taukoja varten. Ajantasainen latutilanne löytyy kunnan sivuilta.",
      en: "There are barbecue shelters and a hut along the way for breaks. Current track conditions are on the municipality's site.",
    },
    photo: photo("salla-latu", "Latu ja ulkoilureittien kota", "Ski track and trail hut"),
  },
  {
    key: "maisemareitti",
    id: "32e57a5c-f61f-483f-9676-31f353b7351f",
    kind: "route",
    icon: "bike",
    slug: "sallatunturin-maisemareitti",
    name: { fi: "Sallatunturin maisemareitti", en: "Sallatunturi scenic bike route" },
    what: { fi: "Pyöräilyreitti", en: "Bike route" },
    km: 0.1,
    lengthKm: 6.5,
    hutsPath: "/suomi/lappi/salla/routes/pyorailyreitit/sallatunturin-maisemareitti",
    official: { label: "visitsalla.fi", href: "https://www.visitsalla.fi/" },
    lead: {
      fi: "Sallatunturin maisemareitti on noin 6,5 kilometrin pyöräilyreitti tunturikeskuksen maastossa. Se kulkee aivan mökkien vierestä.",
      en: "The Sallatunturi scenic route is a bike ride of about 6.5 km around the fell resort. It passes right by the cabins.",
    },
    facts: {
      fi: ["Noin 6,5 km", "Ohi uimapaikan, kotien ja grillikatosten", "Pyöriä vuokralle hiihtokeskukselta kesällä", "Liittyy laajempaan reittiverkostoon"],
      en: ["About 6.5 km", "Past the beach, huts and barbecue shelters", "Bike rental at the ski resort in summer", "Links to the wider trail network"],
    },
    tip: {
      fi: "Helppo tapa tutustua Sallatunturiin ensimmäisenä kesäpäivänä. Pidemmälle haluaville alueella on satoja kilometrejä pyöräilyreittejä.",
      en: "An easy first-day ride to get to know Sallatunturi. For longer rides there are hundreds of kilometres of routes in the area.",
    },
  },
];

export const nearbyPath = (n: Nearby, locale: Locale) => `${paths.area[locale]}/${n.slug}`;

/** The huts.fi map: both cabins, the picks, and (?links=) clicks that open this site's own page for each. */
/** Both cabins on huts.fi (Kelomaja on Revontie, Kuusisto on Tunturitie) with the slopes, spa and beach. */
const CABINS = { lat: 66.7572, lng: 28.7747 };

export function mapEmbed(locale: Locale, only?: Nearby) {
  const picks = only ? [only] : nearby;
  const places = picks.filter((n) => n.kind === "place").map((n) => n.id);
  const routes = picks.filter((n) => n.kind === "route").map((n) => n.id);
  const links = [
    ...unitList.map((u) => `${u.hutsId}:${BASE}${unitPath(u, locale)}`),
    ...picks.map((n) => `${n.id}:${BASE}${nearbyPath(n, locale)}`),
  ];
  const q = new URLSearchParams({ address: "1", hideAttr: "1" });
  // The main map opens on the cabins, close enough to see the slopes, spa and beach around them.
  if (!only) {
    q.set("lat", String(CABINS.lat));
    q.set("lng", String(CABINS.lng));
    q.set("zoom", "13.6");
  }
  if (places.length) q.set("places", places.join(","));
  if (routes.length) q.set("routes", routes.join(","));
  q.set("links", links.join(","));
  return `${HUTS_EMBED}/embed/${locale === "fi" ? "suomi" : "finland"}/org/${business.orgId}?${q.toString()}`;
}

export const euro = (n: number, locale: Locale) => (locale === "fi" ? `${n} €` : `€${n}`);
export const km = (n: number, locale: Locale) => `${locale === "fi" ? String(n).replace(".", ",") : n} km`;
export const meters = (m: number, locale: Locale) => (m >= 1000 ? km(Math.round(m / 100) / 10, locale) : `${m} m`);

export function splitIcon(entry: string): [string, string] {
  const i = entry.indexOf("|");
  return i < 0 ? ["check", entry] : [entry.slice(0, i), entry.slice(i + 1)];
}

export const ui = {
  fi: {
    nav: { area: "Sallatunturi", book: "Varaa" },
    homeTitle: "Vuokramökit Sallatunturissa – Kelomaja ja Kuusisto | Salla, Lappi",
    homeDescription:
      "Kaksi viihtyisää mökkiä Sallatunturissa: kelohirsinen Kelomaja kuudelle ja remontoitu Kuusisto. Oma sauna, takka ja nopea Wi-Fi, ladut ja rinteet kävelymatkan päässä. Lemmikit tervetulleita.",
    h1: "Vuokramökit Sallatunturissa",
    lead: "Kelomaja ja Kuusisto: oma sauna, takka ja latu pihan vieressä. Rinteet, kylpylä ja kansallispuisto kävelymatkan päässä.",
    from: "alkaen",
    perNight: "/ vrk",
    week: "Viikko",
    see: "Katso",
    areaTitle: "Sallatunturi",
    areaMeta: "Tekemistä Sallatunturissa talvella ja kesällä | Kelomaja",
    areaDescription:
      "Laskettelu, 160 km latuja, Ruuhitunturi, kylpylä ja uimaranta: mitä Sallatunturissa voi tehdä talvella ja kesällä, ja kuinka kaukana kaikki on Kelomajasta ja Kuusistosta.",
    areaH1: "Tekemistä Sallatunturissa",
    areaLead: "Salla tarjoaa ulkoilua ympäri vuoden, ilman ruuhkia. Kaikki alla oleva on mökeiltä kävely- tai lyhyen ajomatkan päässä.",
    mapTitle: "Lähellä",
    mapCredit: "Kartta:",
    trails: "Reitit",
    places: "Paikat",
    fromCabins: "mökeiltä",
    length: "pituus",
    prices: "Hinnat",
    beds: "Nukkumapaikat",
    has: "Varustelu",
    kitchen: "Keittiö",
    distances: "Etäisyydet",
    others: "Toinen mökkimme",
    book: "Varaa Nettimökistä",
    directions: "Reittiohjeet",
    arrive: "Saapuminen",
    gallery: "Kuvia Sallasta",
    stay: "Majoitu lähellä",
    official: "Lisätiedot",
    onHuts: "Huts.fi:ssä",
    faqTitle: "Usein kysyttyä",
    faq: [
      { q: "Missä mökit ovat?", a: "Molemmat ovat Sallatunturissa: Kelomaja osoitteessa Revontie 8 B ja Kuusisto osoitteessa Tunturitie 10 A, 98900 Salla. Hiihtokeskus, ladut ja kylpylä ovat kävelymatkan päässä." },
      { q: "Montako henkeä mökkeihin mahtuu?", a: "Kelomajassa on nukkumapaikat kuudelle: kaksi makuuhuonetta ja parvi. Kuusistossa on makuuhuone ja parvi neljälle sekä vuodesohva kahdelle." },
      { q: "Saako lemmikin tuoda?", a: "Saa. Lemmikit ovat tervetulleita molempiin mökkeihin." },
      { q: "Miten varaan?", a: "Soita tai lähetä sähköpostia Arvolle: 050 539 4738, arvo.puhakka@kelomaja.fi. Mökit voi varata myös Nettimökistä." },
      { q: "Miten maksan?", a: "Tilisiirrolla tai MobilePaylla." },
      { q: "Milloin saavun ja lähden?", a: "Tulo klo 16 ja lähtö klo 12 mennessä. Molemmissa mökeissä on näppäinlukko ja itsepalvelu: tervetuloa aivan omaan tahtiin." },
      { q: "Kuuluvatko liinavaatteet ja loppusiivous hintaan?", a: "Eivät, mutta ne voi ostaa lisäpalveluna: loppusiivous 85 € ja liinavaatteet 25 € / setti." },
    ],
    sticky: { call: "Soita", email: "Sähköposti", nettimokki: "Nettimökki" },
    close: "Sulje",
    prev: "Edellinen",
    next: "Seuraava",
    askTitle: "Kysytään Arvolta",
    homeAsk: [],
    areaAsk: [
      "Mitkä ovat sinun omat suosikkisi lähellä? Kirjoitamme niille omat sivut.",
    ],
    madeBy: "Sivut:",
    home: "Etusivu",
  },
  en: {
    nav: { area: "Sallatunturi", book: "Book" },
    homeTitle: "Holiday cabins at Sallatunturi – Kelomaja and Kuusisto | Salla, Lapland",
    homeDescription:
      "Two cosy cabins at Sallatunturi, Finnish Lapland: Kelomaja, a kelo-log cabin for six, and the renovated Kuusisto. Private sauna, fireplace and fast Wi-Fi, with ski tracks and slopes a short walk away. Pets welcome.",
    h1: "Holiday cabins at Sallatunturi",
    lead: "Kelomaja and Kuusisto: your own sauna, a fireplace and the ski track next to the yard. Slopes, spa and national park within walking distance.",
    from: "from",
    perNight: "/ night",
    week: "Week",
    see: "See",
    areaTitle: "Sallatunturi",
    areaMeta: "Things to do at Sallatunturi, winter and summer | Kelomaja",
    areaDescription:
      "Downhill skiing, 160 km of ski tracks, Ruuhitunturi, a spa and a beach: what to do at Sallatunturi in Finnish Lapland, winter and summer, and how far it all is from Kelomaja and Kuusisto.",
    areaH1: "Things to do at Sallatunturi",
    areaLead: "Salla has outdoor life all year round, without the crowds. Everything below is a walk or a short drive from the cabins.",
    mapTitle: "Nearby",
    mapCredit: "Map powered by",
    trails: "Trails",
    places: "Places",
    fromCabins: "from the cabins",
    length: "length",
    prices: "Prices",
    beds: "Beds",
    has: "Amenities",
    kitchen: "Kitchen",
    distances: "Distances",
    others: "Our other cabin",
    book: "Book on Nettimökki",
    directions: "Directions",
    arrive: "Getting here",
    gallery: "Salla in pictures",
    stay: "Stay nearby",
    official: "More info",
    onHuts: "on Huts.fi",
    faqTitle: "Questions",
    faq: [
      { q: "Where are the cabins?", a: "Both are at Sallatunturi: Kelomaja at Revontie 8 B and Kuusisto at Tunturitie 10 A, 98900 Salla. The ski resort, ski tracks and spa are within walking distance." },
      { q: "How many people do they sleep?", a: "Kelomaja sleeps six in two bedrooms and a loft. Kuusisto sleeps four in a bedroom and a loft, plus two on a sofa bed." },
      { q: "Can I bring a pet?", a: "Yes. Pets are welcome in both cabins." },
      { q: "How do I book?", a: "Call or email Arvo: +358 50 539 4738, arvo.puhakka@kelomaja.fi. You can also book on Nettimökki." },
      { q: "How do I pay?", a: "By bank transfer or MobilePay." },
      { q: "When can I arrive and leave?", a: "Check-in is at 4 pm and check-out by 12 noon. Both cabins are self-service with a keypad lock: arrive entirely at your own pace." },
      { q: "Are bed linen and final cleaning included?", a: "No, but you can add them as extras: final cleaning €85 and bed linen €25 per set." },
    ],
    sticky: { call: "Call", email: "Email", nettimokki: "Nettimökki" },
    close: "Close",
    prev: "Previous",
    next: "Next",
    askTitle: "Questions for Arvo",
    homeAsk: [],
    areaAsk: [
      "What are your own favourite places nearby? We'll write a page for each.",
    ],
    madeBy: "Site by",
    home: "Home",
  },
};

export const unitMeta = (u: Unit, locale: Locale) => {
  const from = fromPrice(u);
  const fi = {
    kelomaja: {
      title: "Kelomaja – kelohirsimökki kuudelle, Sallatunturi | Salla",
      description: `Kelohirsinen paritalomökki Sallatunturissa: 2 makuuhuonetta ja parvi, sauna tunturinäkymällä, takka, nopea Wi-Fi. Latu 40 m, rinteet 300 m. Alkaen ${from} € / vrk. Lemmikit tervetulleita.`,
    },
    kuusisto: {
      title: "Kuusisto – remontoitu mökki latujen vieressä, Sallatunturi | Salla",
      description: `Täysin remontoitu paritalomökki Sallatunturissa: makuuhuone, parvi ja vuodesohva, oma sauna ja takka. Latu 70 m, kylpylä 400 m. Alkaen ${from} € / vrk. Lemmikit tervetulleita.`,
    },
  };
  const en = {
    kelomaja: {
      title: "Kelomaja – kelo-log cabin for six at Sallatunturi, Lapland",
      description: `A kelo-log cabin at Sallatunturi in Finnish Lapland: 2 bedrooms and a loft, sauna with a fell view, fireplace, fast Wi-Fi. Ski track 40 m, slopes 300 m. From €${from} a night. Pets welcome.`,
    },
    kuusisto: {
      title: "Kuusisto – renovated cabin by the ski tracks, Sallatunturi, Lapland",
      description: `A fully renovated cabin at Sallatunturi in Finnish Lapland: bedroom, loft and sofa bed, private sauna and fireplace. Ski track 70 m, spa 400 m. From €${from} a night. Pets welcome.`,
    },
  };
  return (locale === "fi" ? fi : en)[u.id];
};

export const nearbyMeta = (n: Nearby, locale: Locale) =>
  locale === "fi"
    ? {
        title: `${n.name.fi} – ${km(n.km, "fi")} Kelomajasta | Sallatunturi`,
        description: `${n.lead.fi.split(". ")[0]}. Majoitu lähellä: Kelomaja ja Kuusisto, Sallatunturi.`,
      }
    : {
        title: `${n.name.en} – ${km(n.km, "en")} from Kelomaja | Sallatunturi, Lapland`,
        description: `${n.lead.en.split(". ")[0]}. Stay nearby at Kelomaja and Kuusisto, Sallatunturi.`,
      };
