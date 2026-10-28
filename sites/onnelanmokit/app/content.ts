// Every fact here comes from the owner's old site (onnelanmokit.com, read 2026-10-28)
// or from the photos they gave Huts.fi permission to use. Do not add numbers,
// distances or features that are not in those sources.

export type Locale = "fi" | "en";
export type VillaId = "onnela" | "suvikallio";

export const SITE_URL = "https://www.onnelanmokit.com";
export const HUTS = "https://www.huts.fi";

const IMG =
  "https://aqyqvkpbznygsbmrzfde.supabase.co/storage/v1/object/public/feature-images/partner";
const ONNELA_IMG = `${IMG}/0e95ccaf-9006-4759-8a9a-850d8b730651`;
const SUVI_IMG = `${IMG}/91a65cde-a654-4ff6-81ee-e2dd36a7ccd9`;

export const business = {
  name: "Onnelan mökit",
  owner: "Onnelan mökit / Fredin",
  street: "Nurmelantie 209",
  postalCode: "51430",
  village: "Läsäkoski",
  municipality: "Kangasniemi",
  region: { fi: "Etelä-Savo", en: "South Savo" },
  phones: ["+358 15 437 189", "+358 44 0939 365"],
  email: "varaukset@onnelanmokit.com",
  businessId: "1940821-7",
  lat: 61.9222,
  lng: 26.8477,
  mapEmbed: `${HUTS}/embed/suomi/org/onnelanmokit?address=1`,
};

export function tel(phone: string) {
  return `tel:${phone.replace(/\s/g, "")}`;
}

export type Photo = { src: string; fi: string; en: string };

type Text = Record<Locale, string>;
type TextList = Record<Locale, string[]>;

export type Villa = {
  id: VillaId;
  name: string;
  path: Record<Locale, string>;
  hutsPath: Record<Locale, string>;
  airbnb: string;
  tour: string;
  guests: Text;
  maxGuests: number;
  bedrooms: number;
  badge: Text;
  size: number;
  rooms: Text;
  built: number;
  tagline: Text;
  intro: Text;
  highlights: TextList;
  equipment: TextList;
  note?: Text;
  address: string;
  lat: number;
  lng: number;
  photos: Photo[];
};

export const villas: Record<VillaId, Villa> = {
  onnela: {
    id: "onnela",
    name: "Villa Onnela",
    path: { fi: "/villa-onnela", en: "/en/villa-onnela" },
    hutsPath: {
      fi: "/suomi/etela-savo/kangasniemi/lomamokit/villa-onnela-kangasniemi",
      en: "/finland/south-savo/kangasniemi/holiday-cabins/villa-onnela-kangasniemi",
    },
    airbnb: "https://www.airbnb.com/h/villaonnela",
    tour: "https://360.safetycon.fi/viewer/08d98969-7e90-4146-853b-cd14b3b0cd40",
    guests: { fi: "6 + 2 henkeä", en: "6 + 2 guests" },
    maxGuests: 8,
    bedrooms: 3,
    badge: { fi: "Valmistunut 2015", en: "Built 2015" },
    size: 145,
    rooms: {
      fi: "3 makuuhuonetta, olohuone, keittiö, kodinhoitohuone, sauna ja wc",
      en: "3 bedrooms, living room, kitchen, utility room, sauna and toilet",
    },
    built: 2015,
    tagline: {
      fi: "Uusi hirsihuvila ja lapsille sopiva hiekkaranta",
      en: "A new log villa with a child-friendly sandy beach",
    },
    intro: {
      fi: "Villa Onnela valmistui loppuvuodesta 2015. Kaikki tilat ovat yhdessä tasossa, ja ranta on hiekkapohjainen ja loivasti syvenevä, joten se sopii erinomaisesti lapsiperheille. Huvila on allergiavapaa, eikä sinne voi tuoda lemmikkejä.",
      en: "Villa Onnela was completed at the end of 2015. Everything is on one level, and the sandy beach deepens gently, so it is ideal for families with children. The villa is allergy-free, and pets cannot be brought along.",
    },
    highlights: {
      fi: [
        "snowflake|Talviasuttava, 200 mm hirsi",
        "flame|Erillinen puulämmitteinen rantasauna",
        "waves|Hiekkaranta, loivasti syvenevä",
        "tent|Nukkuma-aitta, grillikatos ja autokatos",
        "sailboat|Soutuvene",
        "leaf|Allergiavapaa, ei lemmikkejä",
      ],
      en: [
        "snowflake|Year-round, 200 mm log",
        "flame|Separate wood-heated shore sauna",
        "waves|Sandy, gently deepening beach",
        "tent|Sleeping cabin, barbecue shelter and carport",
        "sailboat|Rowing boat",
        "leaf|Allergy-free, no pets",
      ],
    },
    equipment: {
      fi: [
        "flame|Puulämmitteinen takka",
        "thermometer|Maalämpö",
        "flame|Sähkösauna",
        "cooking|Sähköhella ja mikro",
        "fridge|Jääkaappi ja pakastinkaappi",
        "sparkles|Astianpesukone",
        "washer|Pyykinpesukone ja kuivausrumpu",
        "coffee|Kahvinkeitin ja leivänpaahdin",
        "tv|TV, DVD-soitin ja CD-radio",
      ],
      en: [
        "flame|Wood-burning fireplace",
        "thermometer|Geothermal heating",
        "flame|Electric sauna",
        "cooking|Electric cooker and microwave",
        "fridge|Fridge and freezer",
        "sparkles|Dishwasher",
        "washer|Washing machine and tumble dryer",
        "coffee|Coffee maker and toaster",
        "tv|TV, DVD player and CD radio",
      ],
    },
    address: "Nurmelantie 209b, 51430 Läsäkoski",
    lat: 61.9232183,
    lng: 26.8473723,
    photos: [
      { src: `${ONNELA_IMG}/c8eac8be-5c24-49af-ab8e-56634c87ae07.jpg`, fi: "Villa Onnela ulkoa", en: "Villa Onnela from outside" },
      { src: `${ONNELA_IMG}/5aa4496a-285f-4932-a9ed-ff3c6d622ef4.jpg`, fi: "Ilmakuva rannasta ja huvilasta", en: "Aerial view of the shore and the villa" },
      { src: `${ONNELA_IMG}/63f3cd15-852c-4b4b-a108-8b4bc88bcbfc.jpg`, fi: "Järvinäkymä rannasta", en: "Lake view from the shore" },
      { src: `${ONNELA_IMG}/2cd68b6d-13da-4718-8588-084fab5706c2.jpg`, fi: "Olohuone ja takka", en: "Living room and fireplace" },
      { src: `${ONNELA_IMG}/f9582185-2790-42e5-a43c-271b41c021d6.jpg`, fi: "Keittiö ja ruokapöytä", en: "Kitchen and dining table" },
      { src: `${ONNELA_IMG}/bfd76508-37f2-46e5-8ffe-dc3eeed7041a.jpg`, fi: "Sauna", en: "Sauna" },
      { src: `${ONNELA_IMG}/617b48e1-e2e6-469f-ae76-3f03ddfbdd86.jpg`, fi: "Kylpyhuone", en: "Bathroom" },
      { src: `${ONNELA_IMG}/fe461b09-ff09-484a-927d-9cb49f965329.jpg`, fi: "Makuuhuone", en: "Bedroom" },
    ],
  },
  suvikallio: {
    id: "suvikallio",
    name: "Villa Suvikallio",
    path: { fi: "/villa-suvikallio", en: "/en/villa-suvikallio" },
    hutsPath: {
      fi: "/suomi/etela-savo/kangasniemi/lomamokit/villa-suvikallio-kangasniemi",
      en: "/finland/south-savo/kangasniemi/holiday-cabins/villa-suvikallio-kangasniemi",
    },
    airbnb: "https://www.airbnb.com/h/villasuvikallio",
    tour: "https://360.safetycon.fi/viewer/08d98d61-e6cd-4702-8060-37f2631a8c93",
    guests: { fi: "4 + 2 henkeä", en: "4 + 2 guests" },
    maxGuests: 6,
    bedrooms: 2,
    badge: { fi: "MALO ★★★★★", en: "MALO ★★★★★" },
    size: 90,
    rooms: {
      fi: "2 makuuhuonetta, olohuone, keittiö, sauna ja wc kahdessa kerroksessa",
      en: "2 bedrooms, living room, kitchen, sauna and toilet on two floors",
    },
    built: 2000,
    tagline: {
      fi: "Viiden tähden huvila kapean niemen kärjessä",
      en: "A five-star villa at the tip of a narrow cape",
    },
    intro: {
      fi: "Villa Suvikallio on rakennettu vuonna 2000. Huvila on kapean niemen kärjessä rauhallisella paikalla, ja järvi näkyy jokaisesta ikkunasta. MALO-luokitus on viisi tähteä.",
      en: "Villa Suvikallio was built in 2000. It stands in a quiet spot at the tip of a narrow cape, and the lake shows from every window. It holds a five-star MALO rating.",
    },
    highlights: {
      fi: [
        "star|MALO-luokitus 5 tähteä",
        "snowflake|Talviasuttava, 180 mm hirsi",
        "sun|Järvinäkymä kaikista ikkunoista",
        "flame|Erillinen puulämmitteinen rantasauna",
        "bath|Kylpytynnyri (lisähintaan)",
        "tent|Iso grillikota, rantalentopallokenttä ja soutuvene",
      ],
      en: [
        "star|Five-star MALO rating",
        "snowflake|Year-round, 180 mm log",
        "sun|Lake view from every window",
        "flame|Separate wood-heated shore sauna",
        "bath|Hot tub (extra charge)",
        "tent|Large grill hut, beach volleyball court and rowing boat",
      ],
    },
    equipment: {
      fi: [
        "flame|Puulämmitteinen takka",
        "fan|Ilmalämpöpumppu ja sähkölämmitys",
        "flame|Sähkösauna",
        "cooking|Sähköhella ja mikro",
        "fridge|Jääkaappipakastin",
        "sparkles|Astianpesukone",
        "washer|Pyykinpesukone",
        "coffee|Kahvinkeitin ja leivänpaahdin",
        "tv|TV, DVD-soitin ja CD-radio",
      ],
      en: [
        "flame|Wood-burning fireplace",
        "fan|Air heat pump and electric heating",
        "flame|Electric sauna",
        "cooking|Electric cooker and microwave",
        "fridge|Fridge-freezer",
        "sparkles|Dishwasher",
        "washer|Washing machine",
        "coffee|Coffee maker and toaster",
        "tv|TV, DVD player and CD radio",
      ],
    },
    note: {
      fi: "Kylpytynnyri on lisähintainen. Kysy hintaa varauksen yhteydessä.",
      en: "The hot tub costs extra. Ask for the price when you book.",
    },
    address: "Nurmelantie 209c, 51430 Läsäkoski",
    lat: 61.921161,
    lng: 26.848032,
    photos: [
      { src: `${SUVI_IMG}/32b513a7-6e5b-4a33-b086-7f05220180a6.jpg`, fi: "Villa Suvikallio ulkoa", en: "Villa Suvikallio from outside" },
      { src: `${SUVI_IMG}/a3da5ebf-fed3-4f95-ad51-9789cbaf7836.jpg`, fi: "Huvila järveltä katsottuna", en: "The villa seen from the lake" },
      { src: `${SUVI_IMG}/2a8494d2-b9eb-411c-a5e2-170180c50810.jpg`, fi: "Huvilan julkisivu ja terassi", en: "The villa's front and terrace" },
      { src: `${SUVI_IMG}/da14b936-d8a4-489d-85f3-a86cc6a70b7d.jpg`, fi: "Ruokailutila järvinäkymällä", en: "Dining area with a lake view" },
      { src: `${SUVI_IMG}/839a9391-ded7-45cc-b189-587a4e146244.jpg`, fi: "Keittiö", en: "Kitchen" },
      { src: `${SUVI_IMG}/dc1f1cab-fc08-4e88-9316-0e0e9679756c.jpg`, fi: "Sauna", en: "Sauna" },
      { src: `${SUVI_IMG}/e9a8d8d7-46d1-4eb9-8765-4da33dcdbeb7.jpg`, fi: "Kylpytynnyri ja järvimaisema", en: "Hot tub and lake view" },
      { src: `${SUVI_IMG}/a1cef56f-ff13-4480-97fb-7931661c9597.jpg`, fi: "Auringonlasku rannalla", en: "Sunset on the shore" },
    ],
  },
};

export const villaList = [villas.onnela, villas.suvikallio];

export const paths = {
  home: { fi: "/", en: "/en" },
  contact: { fi: "/yhteystiedot", en: "/en/contact" },
} as const;

export const ui = {
  fi: {
    nav: { villas: "Huvilat", contact: "Yhteystiedot", book: "Varaa" },
    otherLang: "In English",
    homeTitle: "Huvilat Puulan rannalla Kangasniemellä | Onnelan mökit",
    homeDescription:
      "Kaksi talviasuttavaa hirsihuvilaa Puulan rannalla Läsäkoskella, Kangasniemellä Etelä-Savossa. Villa Onnela 6+2 ja Villa Suvikallio 4+2 henkeä, rantasaunat ja soutuveneet.",
    heroKicker: "Kangasniemi · Etelä-Savo",
    heroTitle: "Huvilat Puulan rannalla Kangasniemellä",
    heroText:
      "Onnelan mökit vuokraa kahta korkeatasoista lomahuvilaa puhdasvetisen Puulan rannalla, Läsäkosken lähellä. Kalastusta, soutelua, uintia ja saunomista, syksyllä marja- ja sieniretkiä.",
    seeVillas: "Katso huvilat",
    villasTitle: "Kaksi huvilaa, sama rauhallinen ranta",
    villasText:
      "Molemmat huvilat ovat täysin varusteltuja ja talviasuttavia, ja kummassakin on oma puulämmitteinen rantasauna.",
    readMore: "Katso huvila",
    stats: { guests: "henkeä", size: "m²", built: "valmistunut" },
    lakeTitle: "Lomaa Puulan rannalla",
    lakeText: [
      "Puula on yksi Etelä-Savon suurista järvistä, ja sen vesi on puhdasta. Huvilat ovat Kangasniemen Läsäkoskella, Nurmelantien varrella, omassa rauhassaan rannalla.",
      "Kesällä soudetaan, kalastetaan ja uidaan. Syksyllä lähimetsistä löytyy marjoja ja sieniä, ja talvella hirsihuvila ja takka pitävät lämpimänä.",
    ],
    activities: ["Kalastus", "Soutelu", "Uinti", "Rantasauna", "Marjat ja sienet", "Talviloma"],
    mapTitle: "Sijainti",
    mapText: "Nurmelantie 209, 51430 Läsäkoski, Kangasniemi. Kartalla näkyvät molemmat huvilat.",
    mapCredit: "Kartta:",
    bookTitle: "Varaa suoraan tai Airbnb:stä",
    bookText:
      "Voit varata huvilan suoraan puhelimella tai sähköpostilla, tai Airbnb:n kautta.",
    bookAirbnb: "Varaa Airbnb:ssä",
    call: "Soita",
    email: "Sähköposti",
    faqTitle: "Usein kysyttyä",
    faq: [
      {
        q: "Montako henkeä huviloihin mahtuu?",
        a: "Villa Onnelaan mahtuu 6 + 2 henkeä ja Villa Suvikallioon 4 + 2 henkeä.",
      },
      {
        q: "Ovatko huvilat talviasuttavia?",
        a: "Ovat. Molemmat ovat talviasuttavia hirsihuviloita, joten niitä vuokrataan ympäri vuoden.",
      },
      {
        q: "Onko huviloissa rantasauna?",
        a: "On. Kummassakin huvilassa on sisällä sähkösauna ja lisäksi erillinen puulämmitteinen rantasauna.",
      },
      {
        q: "Saako lemmikin tuoda?",
        a: "Villa Onnela on allergiavapaa, eikä sinne voi tuoda lemmikkejä. Kysy Villa Suvikallion osalta varauksen yhteydessä.",
      },
      {
        q: "Missä huvilat ovat?",
        a: "Puulan rannalla Läsäkoskella, Kangasniemellä Etelä-Savossa. Osoite on Nurmelantie 209, 51430 Läsäkoski.",
      },
      {
        q: "Miten varaan?",
        a: "Soita tai lähetä sähköpostia osoitteeseen varaukset@onnelanmokit.com. Huvilat voi varata myös Airbnb:stä.",
      },
    ],
    villa: {
      facts: "Tiedot",
      rooms: "Tilat",
      equipment: "Varustus",
      tour: "Katso virtuaaliesittely",
      tourText: "Kierrä huvila 360°-esittelyssä.",
      gallery: "Kuvat",
      other: "Toinen huvilamme",
      onHuts: "Huvila Huts.fi:ssä",
      photoCredit: "Kuvat: Onnelan mökit",
    },
    contactTitle: "Yhteystiedot",
    contactDescription:
      "Onnelan mökit, Nurmelantie 209, 51430 Läsäkoski, Kangasniemi. Varaukset puhelimella, sähköpostilla tai Airbnb:stä.",
    businessId: "Y-tunnus",
    footerHuts: "Löydät huvilamme myös Huts.fi:stä",
    footerHutsLink: "Kangasniemen lomamökit Huts.fi:ssä",
    madeBy: "Sivut:",
    notFound: "Sivua ei löytynyt",
    backHome: "Etusivulle",
  },
  en: {
    nav: { villas: "Villas", contact: "Contact", book: "Book" },
    otherLang: "Suomeksi",
    homeTitle: "Lakeside villas on Lake Puula, Kangasniemi, Finland | Onnelan mökit",
    homeDescription:
      "Two year-round log villas on the shore of Lake Puula at Läsäkoski, Kangasniemi, South Savo, Finland. Villa Onnela sleeps 6+2 and Villa Suvikallio 4+2, each with a shore sauna and rowing boat.",
    heroKicker: "Kangasniemi · South Savo · Finland",
    heroTitle: "Lakeside villas on Lake Puula",
    heroText:
      "Onnelan mökit rents two high-quality holiday villas on the clear waters of Lake Puula, near Läsäkoski in Kangasniemi. Fishing, rowing, swimming and sauna, with berry and mushroom trips in autumn.",
    seeVillas: "See the villas",
    villasTitle: "Two villas, one quiet shore",
    villasText:
      "Both villas are fully equipped and built for year-round use, and each has its own wood-heated shore sauna.",
    readMore: "See the villa",
    stats: { guests: "guests", size: "m²", built: "built" },
    lakeTitle: "A holiday on Lake Puula",
    lakeText: [
      "Puula is one of the large lakes of South Savo, known for its clean water. The villas are at Läsäkoski in Kangasniemi, along Nurmelantie, in their own peace on the shore.",
      "Summer is for rowing, fishing and swimming. In autumn the nearby forests are full of berries and mushrooms, and in winter the log walls and fireplace keep you warm.",
    ],
    activities: ["Fishing", "Rowing", "Swimming", "Shore sauna", "Berries and mushrooms", "Winter holidays"],
    mapTitle: "Location",
    mapText: "Nurmelantie 209, 51430 Läsäkoski, Kangasniemi, Finland. The map shows both villas.",
    mapCredit: "Map powered by",
    bookTitle: "Book direct or on Airbnb",
    bookText: "You can book directly by phone or email, or through Airbnb.",
    bookAirbnb: "Book on Airbnb",
    call: "Call",
    email: "Email",
    faqTitle: "Questions",
    faq: [
      {
        q: "How many people do the villas sleep?",
        a: "Villa Onnela sleeps 6 + 2 and Villa Suvikallio sleeps 4 + 2.",
      },
      {
        q: "Are the villas open in winter?",
        a: "Yes. Both are winterised log villas and are rented all year round.",
      },
      {
        q: "Is there a lakeside sauna?",
        a: "Yes. Each villa has an electric sauna inside and a separate wood-heated sauna on the shore.",
      },
      {
        q: "Can I bring a pet?",
        a: "Villa Onnela is allergy-free and pets cannot be brought along. For Villa Suvikallio, please ask when you book.",
      },
      {
        q: "Where are the villas?",
        a: "On the shore of Lake Puula at Läsäkoski, in Kangasniemi, South Savo, Finland. The address is Nurmelantie 209, 51430 Läsäkoski.",
      },
      {
        q: "How do I book?",
        a: "Call us or email varaukset@onnelanmokit.com. You can also book both villas on Airbnb.",
      },
    ],
    villa: {
      facts: "Facts",
      rooms: "Rooms",
      equipment: "Equipment",
      tour: "Take the virtual tour",
      tourText: "Walk through the villa in a 360° tour.",
      gallery: "Photos",
      other: "Our other villa",
      onHuts: "The villa on Huts.fi",
      photoCredit: "Photos: Onnelan mökit",
    },
    contactTitle: "Contact",
    contactDescription:
      "Onnelan mökit, Nurmelantie 209, 51430 Läsäkoski, Kangasniemi, Finland. Book by phone, email or on Airbnb.",
    businessId: "Business ID",
    footerHuts: "You can also find our villas on Huts.fi",
    footerHutsLink: "Holiday cabins in Kangasniemi on Huts.fi",
    madeBy: "Site by",
    notFound: "Page not found",
    backHome: "Back to the home page",
  },
};

export const villaMeta = {
  onnela: {
    fi: {
      title: "Villa Onnela – hirsihuvila Puulan rannalla, Kangasniemi",
      description:
        "Villa Onnela on vuonna 2015 valmistunut 145 m² hirsihuvila Puulan rannalla Kangasniemellä. 6+2 henkeä, rantasauna, hiekkaranta, soutuvene. Allergiavapaa.",
    },
    en: {
      title: "Villa Onnela – log villa on Lake Puula, Kangasniemi",
      description:
        "Villa Onnela is a 145 m² log villa from 2015 on Lake Puula in Kangasniemi, Finland. Sleeps 6+2, shore sauna, sandy beach, rowing boat. Allergy-free.",
    },
  },
  suvikallio: {
    fi: {
      title: "Villa Suvikallio – viiden tähden huvila Puulan rannalla, Kangasniemi",
      description:
        "Villa Suvikallio on MALO 5 tähden hirsihuvila niemen kärjessä Puulan rannalla Kangasniemellä. 4+2 henkeä, rantasauna, kylpytynnyri, järvinäkymä joka ikkunasta.",
    },
    en: {
      title: "Villa Suvikallio – five-star villa on Lake Puula, Kangasniemi",
      description:
        "Villa Suvikallio is a five-star MALO log villa at the tip of a cape on Lake Puula in Kangasniemi, Finland. Sleeps 4+2, shore sauna, hot tub, lake view from every window.",
    },
  },
};

export function splitIcon(entry: string): [string, string] {
  const i = entry.indexOf("|");
  return i < 0 ? ["check", entry] : [entry.slice(0, i), entry.slice(i + 1)];
}

/** Copy for the conversion blocks: trust pills, book-direct band, inquiry, directions. */
export const more = {
  fi: {
    pills: ["Varaa suoraan omistajalta", "Talviasuttavat hirsihuvilat", "Omat rantasaunat"],
    inquiryTitle: "Kysy vapaita päiviä",
    villa: "Huvila",
    either: "Kumpi tahansa",
    arrive: "Tulopäivä",
    leave: "Lähtöpäivä",
    guests: "Henkeä",
    send: "Lähetä kysely",
    inquiryNote: "Kysely avautuu sähköpostiisi valmiiksi täytettynä. Vastaamme mahdollisimman pian.",
    mailSubject: "Varauskysely",
    mailBody: (villa: string, a: string, l: string, g: string) =>
      `Hei,\n\nHaluaisin kysyä vapaata ajankohtaa.\n\nHuvila: ${villa}\nTulopäivä: ${a}\nLähtöpäivä: ${l}\nHenkeä: ${g}\n\nTerveisin,\n`,
    benefits: [
      { icon: "waves", label: "Puulan ranta" },
      { icon: "flame", label: "Puulämmitteiset rantasaunat" },
      { icon: "sailboat", label: "Soutuveneet" },
      { icon: "snowflake", label: "Ympäri vuoden" },
      { icon: "fish", label: "Kalastus ja uinti" },
      { icon: "tree", label: "Marjat ja sienet" },
    ],
    directTitle: "Varaa suoraan meiltä",
    directKicker: "Suoraan omistajalta",
    directText: "Kun varaat suoraan, sovit kaikesta samojen ihmisten kanssa, jotka pitävät huvilat kunnossa.",
    direct: [
      { icon: "phone", title: "Puhelimella tai sähköpostilla", text: "Soita tai kirjoita, niin kerromme vapaat päivät ja hinnan." },
      { icon: "check", title: "Ei välikäsiä", text: "Varaus ja kysymykset suoraan omistajalle, ei varaussivuston kautta." },
      { icon: "calendar", title: "Joustavasti", text: "Kysy myös pidempiä lomia, viikonloppuja ja talviviikkoja." },
      { icon: "star", title: "Tai Airbnb:ssä", text: "Molemmat huvilat löytyvät myös Airbnb:stä, jos se on sinulle helpompi." },
    ],
    hostsKicker: "Isännät",
    hostsTitle: "Tervetuloa Puulalle",
    hostsPlaceholder: "Tähän tulee lyhyt esittely teistä ja kuva. Vieraat varaavat mieluummin, kun he tietävät kenen luo ovat tulossa.",
    previewTag: "Esikatselu: lisätään teiltä",
    directionsTitle: "Saapuminen",
    byCar: "Autolla",
    byCarText: "Navigaattoriin: Villa Onnela Nurmelantie 209b ja Villa Suvikallio Nurmelantie 209c, 51430 Läsäkoski.",
    route: "Reittiohjeet Google Mapsissa",
    parking: "Pysäköinti",
    parkingText: "Kummallakin huvilalla on oma autokatos.",
    gallery: "Näytä kaikki kuvat",
    photos: "kuvaa",
    close: "Sulje",
    prev: "Edellinen",
    next: "Seuraava",
    bedrooms: "makuuhuonetta",
    sticky: { call: "Soita", book: "Varaa" },
    included: "Mitä huvilasta löytyy",
  },
  en: {
    pills: ["Book direct with the owner", "Year-round log villas", "Private shore saunas"],
    inquiryTitle: "Check available dates",
    villa: "Villa",
    either: "Either villa",
    arrive: "Arrival",
    leave: "Departure",
    guests: "Guests",
    send: "Send enquiry",
    inquiryNote: "Your email app opens with the enquiry filled in. We reply as soon as we can.",
    mailSubject: "Booking enquiry",
    mailBody: (villa: string, a: string, l: string, g: string) =>
      `Hello,\n\nI would like to ask about availability.\n\nVilla: ${villa}\nArrival: ${a}\nDeparture: ${l}\nGuests: ${g}\n\nBest regards,\n`,
    benefits: [
      { icon: "waves", label: "On Lake Puula" },
      { icon: "flame", label: "Wood-heated shore saunas" },
      { icon: "sailboat", label: "Rowing boats" },
      { icon: "snowflake", label: "Open all year" },
      { icon: "fish", label: "Fishing and swimming" },
      { icon: "tree", label: "Berries and mushrooms" },
    ],
    directTitle: "Book directly with us",
    directKicker: "Straight from the owner",
    directText: "When you book direct, you deal with the same people who look after the villas.",
    direct: [
      { icon: "phone", title: "By phone or email", text: "Call or write and we tell you the free dates and the price." },
      { icon: "check", title: "No middleman", text: "Your booking and questions go straight to the owner, not through a booking site." },
      { icon: "calendar", title: "Flexible", text: "Ask about longer holidays, weekends and winter weeks too." },
      { icon: "star", title: "Or on Airbnb", text: "Both villas are also on Airbnb if that is easier for you." },
    ],
    hostsKicker: "Your hosts",
    hostsTitle: "Welcome to Lake Puula",
    hostsPlaceholder: "A short introduction and a photo of you goes here. Guests book more readily when they know who they are visiting.",
    previewTag: "Preview: to be added by you",
    directionsTitle: "Getting here",
    byCar: "By car",
    byCarText: "For your satnav: Villa Onnela is at Nurmelantie 209b and Villa Suvikallio at Nurmelantie 209c, 51430 Läsäkoski, Finland.",
    route: "Directions on Google Maps",
    parking: "Parking",
    parkingText: "Each villa has its own carport.",
    gallery: "Show all photos",
    photos: "photos",
    close: "Close",
    prev: "Previous",
    next: "Next",
    bedrooms: "bedrooms",
    sticky: { call: "Call", book: "Book" },
    included: "What the villa has",
  },
};

/** True only in the static preview build (PREVIEW_EXPORT=1); never on the live site. */
export const isPreview = process.env.PREVIEW_EXPORT === "1";
