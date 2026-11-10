// Elämyslaiva: all copy and facts. Source: elamyslaiva.fi (Webnode), read 9.11.2026.
// Prices and bed counts disagree on the old site; the ask boxes ask the owner which is right.

export const SITE_URL = "https://www.elamyslaiva.fi";
const BASE = process.env.BASE_PATH ?? "";
export const isPreview = process.env.PREVIEW_EXPORT === "1";
export const photo = (name: string) => `${BASE}/photos/${name}.jpg`;
export const link = (path: string) => `${BASE}${path}`;

export const business = {
  name: "Elämyslaiva",
  booking: "https://calendly.com/elamyslaiva-info",
  email: "info@elamyslaiva.fi",
  phones: [
    { who: "Sakri", tel: "+358408481081", show: "040 848 1081" },
    { who: "Eemeli", tel: "+358407794157", show: "040 779 4157" },
  ],
  street: "Sahansaarenkatu 20",
  postalCode: "33250",
  city: "Tampere",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Sahansaarenkatu+20+Tampere",
  // huts.fi organisation "Elämyslaiva"
  hutsOrg: "65c8b33b-f99b-4c6f-9a5c-4dede27ade72",
  hutsUrl: "https://www.huts.fi/",
  social: {
    Instagram: "https://www.instagram.com/elamyslaiva.fi/",
    Facebook: "https://www.facebook.com/share/16raF2hM7i/",
    TikTok: "https://www.tiktok.com/@elamyslaiva.fi",
  },
  extremeTeam: "https://www.extremeteam.fi",
};

// The owners' own YouTube Shorts (vertical). Shorts embeds put YouTube's logo and buttons over the video,
// so the page shows a photo and plays the video on tap. With the original file, set `file` and it autoplays clean.
export const videos = {
  hero: { yt: "Fd2Qty58RCI", file: null as string | null, title: "Elämyslaiva Näsijärvellä", length: "0:41" },
  party: { yt: "gn8h_xAeA7I", title: "Bileet Elämyslaivalla" },
};

export const photos = {
  laiva: "Elämyslaiva Näsijärvellä, taustalla Näsinneula",
  hyppy: "Hyppy Näsijärveen laivan kannelta",
  poreallas: "Lämmitetty poreallas katetulla terassilla",
  sauna: "Laivan puusauna",
  terassi: "Kattoterassi ja järvinäkymä",
  loossi: "Ruoka- ja oleskelutila",
  vip: "VIP lounge",
  makuu: "Makuuhuone",
  sup: "Jättisuplauta ylhäältä kuvattuna",
  ilta: "Elämyslaiva auringonlaskussa",
  kalastus: "Kalastus laivan kannelta",
  sukellus: "Sukeltaja laivan vieressä",
  laituri: "Laiva omassa laiturissa Santalahden satamassa",
  varjoliito: "Tandem-varjoliito Näsijärven yllä",
} as const;
export type PhotoKey = keyof typeof photos;

export const gallery: PhotoKey[] = ["hyppy", "poreallas", "sauna", "terassi", "loossi", "vip", "makuu", "sup", "ilta", "kalastus", "sukellus", "laituri"];

export const offers = [
  { name: "Päivä", price: "490 €", note: "klo 14–21", text: "Sauna, poreallas ja koko laiva laiturissa." },
  { name: "Yö", price: "790 €", note: "/ vrk", text: "Makuupaikat 11 hengelle. Kysy tarjous useammasta päivästä." },
  { name: "Risteily", price: "alk. 1280 €", note: "4 h", text: "Kapteeni vie Näsijärvelle. Hyppää uimaan vaikka Siilinkarilla." },
];
export const vatNote = "Yrityksille laskutettaviin hintoihin lisätään alv.";

export const features: [string, string][] = [
  ["7 hengen", "puusauna"],
  ["5 (8) hengen", "poreallas"],
  ["11 hengen", "yöpyminen"],
  ["Katettu", "terassi ja kattoterassi"],
  ["Keittiö", "ja kaasugrilli"],
  ["Karaoke", "TV ja minibaari"],
  ["Jättisup", "8 melojalle"],
  ["Soutuvene", "sähkömoottorilla"],
];

export const included = ["Lämmitetty poreallas", "Karaoke", "Jättisuplauta", "Soutuvene sähkömoottorilla", "Peitot ja tyynyt"];
export const extras: [string, string][] = [
  ["Catering", "alk. 25 € / hlö"],
  ["Lakanat ja tyynyliina", "15 € / hlö"],
  ["Pyyhe", "5 € / hlö"],
  ["Moottorivene", "kysy tarjous"],
  ["Opastettu sukellus (min. 3 hlö)", "kysy tarjous"],
  ["Foilboard-koulutus (min. 3 hlö)", "kysy tarjous"],
];

export const faq: [string, string][] = [
  ["Missä Elämyslaiva on?", "Santalahden satamassa Tampereella, aallonmurtajan päässä, osoitteessa Sahansaarenkatu 20. Ratikkapysäkki on sataman kohdalla ja autolle on tilaa aallonmurtajalla."],
  ["Voiko laivalla yöpyä?", "Voi. Makuupaikkoja on 11 hengelle: kaksi makuuhuonetta tuplasängyillä, sohvat, kiinteä sänky ja patjarahit."],
  ["Saako omat ruoat ja juomat tuoda?", "Saa. Laivalla on keittiö ja laiturilla kaasugrilli. Cateringin voi myös tilata, alkaen 25 € hengeltä."],
  ["Voiko laivalla lähteä risteilylle?", "Voi. Risteilyt sovitaan erikseen toukokuun puolivälistä syyskuun alkuun, myös iltaristeilyinä."],
  ["Miten varaan?", "Katso vapaat päivät varauskalenterista ja lähetä varauspyyntö, tai soita Sakrille tai Eemelille."],
];

// Preview-only question boxes ("Kysytään teiltä"). Delete a line when the answer is on the page.
export const ask = {
  hero: [
    "Alkuperäiset videotiedostot puhelimesta tai kamerasta, erityisesti dronevideot. Video pyörii silloin terävänä ilman YouTuben merkkejä.",
  ],
  prices: [
    "Mitkä hinnat ovat oikeat? Vanhoilla sivuilla lukee eri kohdissa päivä 490 €, yö 790 € tai 549 €, risteily alk. 1280 € tai 1189 € ja etusivulla alk. 390 €.",
    "Montako henkeä mahtuu päiväksi ja risteilylle?",
  ],
  features: ["Montako voi yöpyä: 9, 11 vai 12? Vanhoilla sivuilla lukee kaikkia näitä."],
  gallery: [
    "Kaikki kuvat mitä teillä on: laiva järvellä, sisätilat, sauna, illat, risteilyt, talvi. Pudottakaa niin monta kuin jaksatte, me lajittelemme.",
  ],
  contact: [
    "Kuva ja pari lausetta teistä, jotka laivaa pyöritätte.",
    "Onko laiva käytössä myös talvella?",
    "Y-tunnus, jotta voimme kirjoittaa tietosuojaselosteen.",
  ],
};
