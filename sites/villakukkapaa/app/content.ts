// Every fact here comes from the owner's old site (villakukkapaa.fi, FI and EN pages, read 2026-11-03), his own
// video, his photos, or the Huts.fi place. Do not add numbers, distances or features that are not in those
// sources. Guest reviews from booking sites are NOT used as text on this site. Open questions live in the
// `ask` lists (preview only).

export type Locale = "fi" | "en";
export type PageId = "huvila" | "sauna" | "tekemista" | "historia";

export const SITE_URL = "https://www.villakukkapaa.fi";
export const HUTS = "https://www.huts.fi";

// next/image, <img> and <video> don't add the preview basePath, so file paths carry it themselves.
const BASE = process.env.BASE_PATH ?? "";

/** True only in the static preview build (PREVIEW_EXPORT=1); never on the live site. */
export const isPreview = process.env.PREVIEW_EXPORT === "1";

type Text = Record<Locale, string>;
type TextList = Record<Locale, string[]>;

export type Photo = { src: string; fi: string; en: string };

function photo(name: string, fi: string, en: string): Photo {
  return { src: `${BASE}/photos/${name}.webp`, fi, en };
}

/** 18 s loop cut from the drone and sauna shots in the owner's own 1080p guest video. */
export const heroVideo = `${BASE}/video/hero.mp4`;
export const heroPoster = photo("hero", "Saimaa ja Villa Kukkapään ranta ilmasta", "Lake Saimaa and Villa Kukkapää's shore from the air");

/** The owner's own guest video on how to heat the sauna and the fireplaces (1080p, on his current server). */
export const stoveVideo = "https://www.villakukkapaa.fi/videos/v5%20valmis.mp4";

export const business = {
  name: "Villa Kukkapää",
  owner: "Pentti Parkkinen",
  phone: "0400 312 802",
  phoneIntl: "+358400312802",
  phone2Name: "Kirsi",
  phone2: "0400 760 448",
  phone2Intl: "+358400760448",
  email: "pentti.parkkinen@fimnet.fi",
  street: "Vekarantie 462",
  postalCode: "58700",
  locality: "Sulkava",
  lat: 61.7696896,
  lng: 28.4346648,
  orgId: "13db0eed-161d-4f9b-bf0c-96cfffa24f91",
  booking: "https://www.lomarengas.fi/mokit/sulkava-villa-kukkapaa-13347",
  facebook: "https://www.facebook.com/VillaKukkapaa",
  instagram: "https://www.instagram.com/villakukkapaa/",
};

export const tel = `tel:${business.phoneIntl}`;
export const address = `${business.street}, ${business.postalCode} ${business.locality}`;

export type PathKey = "home" | PageId;
export const paths: Record<PathKey, Record<Locale, string>> = {
  home: { fi: "/", en: "/en" },
  huvila: { fi: "/huvila", en: "/en/villa" },
  sauna: { fi: "/rantasauna", en: "/en/lakeside-sauna" },
  tekemista: { fi: "/tekemista", en: "/en/things-to-do" },
  historia: { fi: "/historia", en: "/en/history" },
};

/** The four numbers a guest wants first, all from the owner's own pages. */
export const facts: { value: Text; label: Text }[] = [
  { value: { fi: "10 + 4", en: "10 + 4" }, label: { fi: "hengelle", en: "guests" } },
  { value: { fi: "200 m", en: "200 m" }, label: { fi: "omaa hiekkarantaa", en: "private sand beach" } },
  { value: { fi: "20 000 m²", en: "20,000 m²" }, label: { fi: "aidattu tontti", en: "fenced grounds" } },
  { value: { fi: "1904", en: "1904" }, label: { fi: "kunnostettu 2012", en: "renovated 2012" } },
];

export type Section = { title: Text; text: TextList; photo?: Photo };

export type Page = {
  id: PageId;
  name: Text;
  h1: Text;
  title: Text;
  description: Text;
  /** Owner's own words where he wrote them (FI word for word, typos fixed); English is his EN page or our translation. */
  intro: TextList;
  highlights?: TextList;
  sections?: Section[];
  photos: Photo[];
  ask: string[];
};

const huvilaPhotos: Photo[] = [
  photo("huvila-kesa", "Huvila ja pihapiiri kesällä", "The villa and its yard in summer"),
  photo("sali", "Olohuone ja avotakka", "Living room and open fireplace"),
  photo("keittio-saareke", "Keittiö ja liesisaareke", "Kitchen with a cooking island"),
  photo("ruokasali", "Ruokasali", "Dining room"),
  photo("sali-ikkunat", "Olohuoneen ikkunat järvelle", "Living room windows towards the lake"),
  photo("huvila-edesta", "Huvila edestä", "The villa from the front"),
  photo("keittio", "Keittiö", "Kitchen"),
  photo("ruokapoyta", "Ruokapöytä katettuna", "The dining table, laid"),
  photo("tv-huone", "TV-huone", "TV room"),
  photo("kaakeliuuni", "TV-huoneen kaakeliuuni", "Tiled stove in the TV room"),
  photo("kirjasto", "Kirjasto", "Library"),
  photo("leikkihuone", "Lasten leikkihuone", "Children's playroom"),
  photo("mh-1", "Makuuhuone", "Bedroom"),
  photo("mh-2", "Makuuhuone", "Bedroom"),
  photo("mh-3", "Makuuhuone", "Bedroom"),
  photo("mh-4", "Makuuhuone", "Bedroom"),
  photo("ylakerta-sali", "Yläkerran makuutila", "Upstairs sleeping room"),
  photo("eteinen", "Eteinen ja portaat", "Hall and stairs"),
  photo("wc-ala", "Alakerran WC", "Downstairs toilet"),
  photo("kylpyhuone-yla", "Yläkerran kylpyhuone", "Upstairs bathroom"),
  photo("talvi-huvila", "Huvila talvella", "The villa in winter"),
  photo("joulu", "Joulu huvilassa", "Christmas in the villa"),
  photo("talvi-ikkuna", "Talvi-ilta ikkunasta", "A winter evening through the window"),
  photo("talvi-keittio", "Keittiö talvi-iltana", "The kitchen on a winter evening"),
];

const saunaPhotos: Photo[] = [
  photo("sauna-ulkoa", "Rantasauna männikössä", "The lakeside sauna house among the pines"),
  photo("sauna-tupa", "Saunarakennuksen tupa", "The sauna house's main room"),
  photo("aitokiuas", "Sauna ja AitoKiuas", "The sauna and its AitoKiuas stove"),
  photo("sauna-terassi", "Katettu terassi järven äärellä", "Covered terrace by the lake"),
  photo("sauna-ruokailu", "Ruokailutila", "Dining area"),
  photo("sauna-pihalta", "Saunarakennus pihalta", "The sauna house from the yard"),
  photo("sauna-takka", "Oleskelutila ja takka", "Lounge and open fireplace"),
  photo("sauna-oleskelu", "Oleskelutila ja portaat parvelle", "Lounge and the stairs to the loft"),
  photo("sauna-keittio", "Keittonurkkaus", "Kitchenette"),
  photo("sauna-parvi", "Parvi", "The loft"),
  photo("saunan-lauteet", "Lauteet", "Sauna benches"),
  photo("sauna-pesuhuone", "Pesuhuone", "Washroom"),
  photo("grillaus", "Grillaus terassilla", "Grilling on the terrace"),
  photo("sauna-terassi-2", "Terassi", "Terrace"),
  photo("talvi-jarvi", "Talvinen järvi terassilta", "The frozen lake from the terrace"),
  photo("talvi-sauna", "Rantasauna talvella", "The sauna house in winter"),
];

const tekemistaPhotos: Photo[] = [
  photo("ranta", "Laituri ja hiekkaranta", "The pier and the sand beach"),
  photo("kajakit", "Polkupyörät ja kajakit rannalla", "Bikes and kayaks on the beach"),
  photo("hiekkaranta", "Oma hiekkaranta", "The private sand beach"),
  photo("soutuvene", "Soutuvene", "Rowing boat"),
  photo("kentta", "Nurmikenttä", "Grass field"),
  photo("kirkas-vesi", "Kirkasta vettä ja hiekkapohja", "Clear water over a sandy bottom"),
  photo("laituri", "Laituri", "The pier"),
  photo("liivit", "Pelastusliivit ja kypärät", "Life jackets and helmets"),
  photo("huvimaja", "Huvimaja", "The garden pavilion"),
  photo("uinti", "Uimassa Saimaalla", "Swimming in Lake Saimaa"),
  photo("miljoo", "Männikkö ja ranta", "Pines and the shore"),
];

const historiaPhotos: Photo[] = [
  photo("h-1920", "Isäntäväki Blomqvist Kukkapään sahan talon edessä 1920-luvun alussa ennen laajennusta", "The Blomqvists in front of the Kukkapää sawmill house in the early 1920s, before it was extended"),
  photo("h-konttori", "Isäntäpari Edith ja Gunnar B. sahan konttorissa 1920-luvulla", "Edith and Gunnar B. in the sawmill office in the 1920s"),
  photo("h-keinu", "Edith ja Hjördis B. etupihan puutarhakeinussa 1924", "Edith and Hjördis B. on the front-yard garden swing, 1924"),
  photo("h-joriinit", "Hjördis, Edith ja Gunnar B. ja talon edessä olevat hienot ”joriinit” 1930-luvun alkupuolella", "Hjördis, Edith and Gunnar B. by the fine dahlias in front of the house, early 1930s"),
  photo("h-saha", "Kukkapään saha (toiminnassa 1904–51) 1930-luvulla", "The Kukkapää sawmill (in use 1904–51) in the 1930s"),
  photo("h-konehuone", "Sahan konehuone työntekijöineen. Gunnar B. toinen vasemmalta.", "The sawmill engine room and its workers. Gunnar B. is second from the left."),
  photo("h-laituri", "Rannan laituri ja venevaja 1930-luvun lopulla", "The pier and boathouse in the late 1930s"),
  photo("h-haat", "Hääpari Hjördis B. ja Mikael (Mikko) Vihavainen vihittiin Kukkapään talon ruokasalissa 1938", "Hjördis B. and Mikael (Mikko) Vihavainen were married in the house's dining room in 1938"),
  photo("h-uimaranta", "Kukkapään hienoa uimarantaa. Kuvassa Ulla ja Leena V. (vas.) 1940-luvulta", "Kukkapää's fine beach, with Ulla and Leena V. (left), 1940s"),
  photo("h-osuuskauppa", "Talon vieressä oleva sahan oma osuuskauppa 1940-luvulla. Edessä Ulla ja Leena Vihavainen.", "The sawmill's own co-op shop next to the house, 1940s. Ulla and Leena Vihavainen in front."),
  photo("h-1948", "Kukkapään talo 1948", "The Kukkapää house in 1948"),
  photo("h-tyohuone", "Edith B. isännän työhuoneessa (pääovesta vasemmalle) 1948", "Edith B. in the manager's study (left of the front door), 1948"),
  photo("h-olohuone", "Edith ja Gunnar B. olohuoneessa (lasikuistin etualalla) 1948", "Edith and Gunnar B. in the living room (in front of the glazed porch), 1948"),
  photo("h-ruokasali", "Gunnar B. ruokasalissa 1948", "Gunnar B. in the dining room, 1948"),
];

export const pages: Record<PageId, Page> = {
  huvila: {
    id: "huvila",
    name: { fi: "Huvila", en: "The villa" },
    h1: { fi: "Huvila", en: "The villa" },
    title: { fi: "Huvila 10 hengelle Saimaan rannalla, Sulkava | Villa Kukkapää", en: "Lakeside villa for 10 on Lake Saimaa, Sulkava, Finland | Villa Kukkapää" },
    description: {
      fi: "250 m² historiallinen huvila vuodelta 1904, kunnostettu 2012: suuri keittiö, ruokapöytä 10 hengelle, kaakeliuuni, avotakka, kirjasto ja lasten leikkihuone. Talviasuttava.",
      en: "A 250 m² historic villa from 1904, renovated in 2012: big kitchen, dining table for 10, tiled stove, open fireplace, library and a children's playroom. Open all year.",
    },
    intro: {
      fi: [
        "250 m² huvilassa on hyvin varusteltu suuri keittiö, kaakeliuuni ja avotakka. Huvila on rakennettu 1904 ja kunnostettu 2012. Se on talviasuttava ja sähkölämmitteinen, ja polttopuut sisältyvät vuokrahintaan.",
        "Huvilassa on keittiö, ruokasali, olohuone, TV-huone, kirjasto ja lasten leikkihuone. Majoitus 10 hengelle.",
      ],
      en: [
        "The 250 m² villa has a big, well-equipped kitchen, a tiled stove and an open fireplace. It was built in 1904 and renovated in 2012. It is heated by electricity and open all year, and firewood is included in the rent.",
        "There is a kitchen, dining room, living room, TV room, library and a children's playroom. The villa sleeps 10.",
      ],
    },
    highlights: {
      fi: [
        "users|Majoitus 10 hengelle",
        "utensils|Ruokapöytä 10 hengelle",
        "flame|Kaakeliuuni ja avotakka, puut sisältyvät",
        "chef|Liesisaareke, amerikkalainen jääkaappi ja jääpalakone",
        "bath|2 WC:tä ja 2 suihkua",
        "book|Kirjasto ja lasten leikkihuone",
        "wind|Ilmalämpöpumppu",
        "wifi|Internet ja 2 TV:tä",
        "baby|Vauvasänky ja syöttötuoli",
        "shirt|Astianpesukone ja pyykinpesukone",
      ],
      en: [
        "users|Sleeps 10",
        "utensils|Dining table for 10",
        "flame|Tiled stove and open fireplace, wood included",
        "chef|Cooking island, American fridge and ice maker",
        "bath|2 toilets and 2 showers",
        "book|Library and children's playroom",
        "wind|Air-source heat pump",
        "wifi|Wi-Fi and 2 TVs",
        "baby|Baby cot and high chair",
        "shirt|Dishwasher and washing machine",
      ],
    },
    photos: huvilaPhotos,
    ask: [
      "Montako makuuhuonetta huvilassa on? Suomenkielinen sivu sanoo 5, englanninkielinen ja video 4 (3 parisänkyä ja yksi neljän hengen huone).",
      "Mitkä huoneet ovat yläkerrassa? Huoneiden nimet pohjapiirrokseen.",
      "Tulo- ja lähtöaika?",
    ],
  },
  sauna: {
    id: "sauna",
    name: { fi: "Rantasauna", en: "Lakeside sauna" },
    h1: { fi: "Rantasauna", en: "The lakeside sauna house" },
    title: { fi: "Rantasauna Saimaan rannalla, AitoKiuas ja sähkökiuas | Villa Kukkapää", en: "Lakeside sauna on Lake Saimaa with a wood-fired AitoKiuas | Villa Kukkapää" },
    description: {
      fi: "90 m² saunarakennus aivan Saimaan rannalla: puulämmitteinen AitoKiuas ja sähkökiuas, ruokailutila 10 hengelle, keittonurkkaus, takka, terassi ja majoitus 4 hengelle.",
      en: "A 90 m² sauna house right on Lake Saimaa: wood-fired AitoKiuas and an electric stove, dining for 10, kitchenette, fireplace, terrace and beds for 4.",
    },
    intro: {
      fi: [
        "Pihapiirissä on suuri saunarakennus aivan Saimaan rannalla. Saunassa on kaksi kiuasta, nopea sähkökiuas ja puulämmitteinen, elämyksellinen AitoKiuas. Saunarakennuksessa on majoitustilan lisäksi oma keittiö ja oleskelutilaa.",
        "Terassilta laituri johtaa hiekkarannan yli järveen.",
      ],
      en: [
        "Villa Kukkapää has a big sauna chalet right on Lake Saimaa. The sauna has two separate stoves: the traditional AitoKiuas heated by wood, and an electric stove for quick and easy use. Besides beds for four, the sauna house has its own kitchenette and lounge.",
        "From the terrace, a wooden pier reaches over the sand beach into the lake.",
      ],
    },
    highlights: {
      fi: [
        "flame|Puulämmitteinen AitoKiuas ja sähkökiuas",
        "utensils|Ruokailu- ja oleskelutila 10 hengelle",
        "bed|Majoitus 4 hengelle",
        "chef|Keittonurkkaus",
        "home|Avotakka ja terassi järvelle",
        "bath|Pesuhuone, 2 suihkua ja WC",
        "shirt|Kuivauskaappi",
        "snowflake|Myös talvikäytössä, ilmalämpöpumppu",
      ],
      en: [
        "flame|Wood-fired AitoKiuas and an electric stove",
        "utensils|Lounge and dining for 10",
        "bed|Beds for 4",
        "chef|Kitchenette",
        "home|Open fireplace and a terrace on the lake",
        "bath|Washroom with 2 showers and a toilet",
        "shirt|Drying cabinet",
        "snowflake|Used in winter too, air-source heat pump",
      ],
    },
    sections: [
      {
        title: { fi: "Saunan ja takkojen lämmitys", en: "Heating the sauna and fireplaces" },
        text: {
          fi: ["Pentti näyttää videolla, miten AitoKiuas, kaakeliuuni ja avotakka lämmitetään. AitoKiuas on kertalämmitteinen: lämmitä pari tuntia, ja sitten saunassa voi olla pitkään ilman lisäpuita."],
          en: ["In this video, Pentti shows how to heat the AitoKiuas, the tiled stove and the open fireplace. The AitoKiuas is a one-time-heated stove: heat it for a couple of hours, then enjoy the sauna for a long time without adding wood."],
        },
      },
    ],
    photos: saunaPhotos,
    ask: [
      "Saunan messinkilaatan mukaan sauna avattiin 5.6.1987. Kerrotko tarinan? Se sopisi tälle sivulle.",
      "Onko saunarakennus vuokrattavissa erikseen, esimerkiksi juhliin?",
      "Tehdäänkö talvella avanto?",
    ],
  },
  tekemista: {
    id: "tekemista",
    name: { fi: "Ranta ja tekeminen", en: "Beach and things to do" },
    h1: { fi: "Ranta ja tekeminen", en: "Beach and things to do" },
    title: { fi: "Hiekkaranta, soutu, kalastus ja Vilkaharju, Sulkava | Villa Kukkapää", en: "Sand beach, rowing, fishing and the Vilkaharju ridge, Sulkava | Villa Kukkapää" },
    description: {
      fi: "Yli 200 m omaa loivaa hiekkarantaa, soutuvene, kanootti ja nurmikenttä lentopallolle ja sulkapallolle. Kalastusta ympäri vuoden ja Vilkaharjun luontopolku 2 km päässä.",
      en: "Over 200 m of private, gently sloping sand beach, rowing boat, canoe and a grass field for volleyball and badminton. Fishing all year, and the Vilkaharju nature trail 2 km away.",
    },
    intro: {
      fi: ["Omaa loivaa, lapsiystävällistä hiekkarantaa on yli 200 m. 20 000 m²:n tontilla on mm. ruohokenttä sulkapallon ja lentopallon pelaamista varten."],
      en: [
        "The private sand beach runs for over 200 m, and the water grows gently deeper, so it suits small children too. The 20,000 m² grounds include a grass field for badminton and volleyball.",
      ],
    },
    highlights: {
      fi: [
        "waves|Yli 200 m omaa hiekkarantaa",
        "anchor|Laituri",
        "sailboat|Soutuvene ja kanootti",
        "bike|Polkupyörät",
        "volleyball|Nurmikenttä: lentopallo ja sulkapallo",
        "tent|Huvimaja ja grilli",
        "fence|20 000 m² puuaidattu tontti",
        "car|3 autopaikkaa",
      ],
      en: [
        "waves|Over 200 m of private sand beach",
        "anchor|Pier",
        "sailboat|Rowing boat and canoe",
        "bike|Bicycles",
        "volleyball|Grass field: volleyball and badminton",
        "tent|Garden pavilion and grill",
        "fence|20,000 m² grounds with a wooden fence",
        "car|3 parking spaces",
      ],
    },
    sections: [
      {
        title: { fi: "Kalastus", en: "Fishing" },
        photo: photo("soutuvene", "Soutuvene rannalla", "The rowing boat on the beach"),
        text: {
          fi: [
            "Lähivesillä on hyvin kalaa, erityisesti Vekaran alue on uistelijoiden suosiossa. Saaliskaloina saadaan mm. kuhaa, lohta, ahventa ja haukea. Mökillä käytössäsi on kaksi norppaturvallista katiskaa, ja saunan takana on kalanperkauspöytä juoksevalla järvivedellä.",
            "Soutuvene on vapaasti käytettävissä. Siihen voit vuokrata sähköperämoottorin 100 €/vk tai bensamoottorin 130 €/vk. Omalle veneelle löytyy laskupaikkoja kirkonkylästä tai Vekarasta.",
            "Onkiminen ja pilkkiminen ovat maksuttomia yleiskalastusoikeuksia. Viehekalastukseen yhdellä vavalla 18–64-vuotiaan tulee maksaa kalastonhoitomaksu (eraluvat.fi). Uisteluun useammalla vavalla tarvitset Sulkavan viehekalastusalueen luvan. Lupia myyvät Sulkavan Verkko ja Paita, Kioski Alanten Helmi ja Lohilahden Neste.",
          ],
          en: [
            "The nearby waters hold plenty of fish, and the Vekara area is popular for trolling. Catches include pikeperch, salmon, perch and pike. You have two seal-safe fish traps, and behind the sauna there is a fish-cleaning table with running lake water.",
            "The rowing boat is free to use. You can rent an electric outboard for €100 a week or a petrol outboard for €130 a week. You can launch your own boat in the village or at Vekara.",
            "Hook-and-line fishing and ice fishing are free public rights. Lure fishing with one rod needs the national fishing fee for ages 18–64 (eraluvat.fi). Trolling with several rods needs the Sulkava lure-fishing permit, sold by Sulkavan Verkko ja Paita, Kioski Alanten Helmi and Lohilahden Neste.",
          ],
        },
      },
      {
        title: { fi: "Vilkaharju", en: "Vilkaharju ridge" },
        photo: photo("miljoo", "Männikköä Vilkaharjun maisemissa", "Pine forest in the Vilkaharju landscape"),
        text: {
          fi: [
            "Vilkaharjun luontopolun lähtöpaikka on 2 km:n päässä. Polku esittelee alueen komeaa harjuluontoa, sen eläimistöä ja kasvistoa, geologiaa ja historiaa. Polun varrella on yksi Suomen suurimpia siirtolohkareita. Polku on kaksiosainen, ja toisella osalla on laavu.",
            "Vilkaharju on ollut luonnonsuojelualue vuodesta 1978, ja se on yksi Saimaa Geopark -kohteista. Siellä on helppo patikoida ja talvisin hiihtää tai liikkua lumikengillä.",
          ],
          en: [
            "The Vilkaharju nature trail starts 2 km from the villa. It shows the ridge's flora, fauna, geology and history, and passes one of Finland's biggest ice-age boulders. The trail has two parts, 3.1 km and 3.6 km, and one has a lean-to shelter.",
            "Vilkaharju has been a nature reserve since 1978 and is one of the Saimaa Geopark sites. It is easy hiking, and in winter you can ski or snowshoe there.",
          ],
        },
      },
      {
        title: { fi: "Soutu ja melonta", en: "Rowing and canoeing" },
        text: {
          fi: [
            "Sulkava on kuuluisa soutupitäjä. Soutuveneellä voi tehdä retkiä lähialueelle, ja koko porukalle voi tilata kirkkoveneen huvilalle.",
            "Juvan ja Sulkavan välinen Oravareitti on perhemelontaan sopiva noin 57 km:n kanoottireitti.",
          ],
          en: [
            "Sulkava is famous for rowing and hosts the Sulkava Rowing Race, Finland's biggest rowing event, every July. Take the villa's rowing boat out, or order a church boat for the whole group.",
            "The Oravareitti between Juva and Sulkava is a family-friendly canoe route of about 57 km.",
          ],
        },
      },
      {
        title: { fi: "Talvella", en: "In winter" },
        text: {
          fi: ["Sulkavalla on hyvin hoidettu latuverkosto, ja jäälle tehdään latuja mahdollisuuksien mukaan. Laskettelemaan pääsee Ruunarinteeseen Savonlinnaan (35 km) tai Hasamäkeen (30 km)."],
          en: ["Sulkava keeps a good network of ski trails, and tracks are made on the ice when conditions allow. For downhill skiing, Ruunarinne in Savonlinna is 35 km away and Hasamäki 30 km."],
        },
      },
      {
        title: { fi: "Ruoka ja elämykset tilauksesta", en: "Food and experiences to order" },
        text: {
          fi: [
            "Ruoat voi tilata valmiiksi: Pitopalvelu Höök (0400 884 271), Kahvila-Ravintola Majakka (015 673 171), Kahvila-Ravintola Pijot (040 513 1941) ja Kahvila-Puoti Alina (044 056 5677). Saimaan Viihdepalvelut tuo musiikin ja ravintolapalvelut paikan päälle.",
            "Vesille: Hooked Saimaa ja Saimaa Dreams järjestävät kalastus- ja risteilyretkiä sekä norppasafareita. Sulkavan Vene vuokraa soutuveneitä, myös toimitettuna huvilalle.",
          ],
          en: [
            "You can order ready-made food: Pitopalvelu Höök (+358 400 884 271), Café-Restaurant Majakka (+358 15 673 171), Café-Restaurant Pijot (+358 40 513 1941) and Kahvila-Puoti Alina (+358 44 056 5677). Saimaan Viihdepalvelut brings music and catering to the villa.",
            "On the water: Hooked Saimaa and Saimaa Dreams run fishing and cruise trips and Saimaa ringed seal safaris. Sulkavan Vene rents rowing boats and can deliver them to the villa.",
          ],
        },
      },
    ],
    photos: tekemistaPhotos,
    ask: [
      "Montako kajakkia, kanoottia ja polkupyörää vierailla on nyt käytössä? Entä SUP-lauta, mölkky tai tikkataulu?",
      "Onko pihalla oma frisbeegolfrata?",
      "Näkyykö Saimaan norppa rannasta? Jos sinulla on siitä kuva, se olisi upea.",
      "Ovatko ruokapalvelut ja retkiyritykset yhä toiminnassa samoilla numeroilla?",
    ],
  },
  historia: {
    id: "historia",
    name: { fi: "Historia", en: "History" },
    h1: { fi: "Sahan isännöitsijän talo", en: "The sawmill manager's house" },
    title: { fi: "Historia: Kukkapään sahan isännöitsijän talo 1922–1951 | Villa Kukkapää", en: "History: the Kukkapää sawmill manager's house, 1922–1951 | Villa Kukkapää" },
    description: {
      fi: "Villa Kukkapää oli Sulkavan sahan isännöitsijän Gunnar Blomqvistin virka-asunto ja sahan konttori 1922–1951. Valokuvia 1920–40-luvuilta.",
      en: "Villa Kukkapää was the home of sawmill manager Gunnar Blomqvist and the mill office from 1922 to 1951. Photos from the 1920s to the 1940s.",
    },
    intro: {
      fi: [
        "Aiemmin useilla Karjalan sahoilla isännöitsijänä toiminut Gunnar Blomqvist (1898–1967) muutti perheineen Sulkavalle vuonna 1922 ottaakseen vastaan Sulkavan Sahan isännöitsijän tehtävät. Perheeseen kuului vaimo Edith sekä vuonna 1917 syntynyt tytär Hjördis Margit. Ennen Sulkavalle muuttoa perhettä oli kohdannut järkyttävä onnettomuus, kun 7-vuotias esikoistytär Greta Ingeborg kuoli syötyään ketunmyrkyllä myrkytettyjä marjoja. Tämän jälkeen asuminen Viipurin lähellä sijaitsevalla Perkjärvellä tuntui mahdottomalta.",
        "Sulkavan Saha oli perustettu muutamaa vuotta aikaisemmin, ja Gunnar Blomqvistista tuli ensimmäinen varsinainen isännöitsijä. Nykyinen Villa Kukkapää toimi isännöitsijän virka-asuntona, jonka yhteydessä oli myös sahan konttori.",
        "Ruotsinkielisellä pariskunnalla oli alussa kielivaikeuksia savolaisten parissa, mutta hyvin he sopeutuivat. Tiiviissä ja hieman eristäytyneessäkin sahayhteisössä toimi kaksi kauppaa ja oma kansakoulu, jonka Blomqvist rakennutti 1924. Gunnar Blomqvist oli myös uranuurtaja uuden tekniikan käyttöönotossa: saha-alueelle hankittiin kunnan ensimmäiset sähkövalot, joita Sulkavan kirkonkylästä ihmetellen katseltiin. Lisäksi hän hankki seudun ensimmäisen radion, josta työväki saattoi sunnuntaisin kuunnella jumalanpalvelusta konttorin pihalla.",
        "Saha oli Sulkavan suurin työnantaja. 1920-luvulla sillä oli pari-kolmesataa työntekijää, ja töitä tehtiin kahdessa-kolmessa vuorossa. Palkat maksettiin kahden viikon välein, ja silloin sahalla oli aina vilkkaat markkinat.",
        "Edith Blomqvist oli aikanaan varsin poikkeuksellinen johtajan vaimo: hän toimi sahan konttorinhoitajana miltei 30 vuotta. Siteet Sulkavaan tiivistyivät entisestään, kun tytär solmi 1938 avioliiton paikkakunnalta kotoisin olevan lääkäri Mikael (Mikko) Vihavaisen kanssa.",
        "1940-luvun loppupuolella Kukkapään Saha koki monen muun keskikokoisen sahan tavoin vaikeita aikoja. Tämä johti lopulta toiminnan lakkauttamiseen 1951. Vuonna 1952 Blomqvistit muuttivat Korpilahdelle, jossa Gunnar toimi 3 vuotta isännöitsijänä Rauma-Repolan Iloniemen sahalla. Eläkepäivillään Blomqvistit muuttivat takaisin Sulkavan kirkonkylälle.",
      ],
      en: [
        "Gunnar Blomqvist (1898–1967), who had managed several sawmills in Karelia, moved to Sulkava with his family in 1922 to take over as manager of the Sulkava sawmill. With him came his wife Edith and their daughter Hjördis Margit, born in 1917. Before the move the family had suffered a terrible loss: their eldest daughter, Greta Ingeborg, aged seven, died after eating berries poisoned with fox bait. After that, living on at Perkjärvi near Vyborg felt impossible.",
        "The Sulkava sawmill had been founded a few years earlier, and Gunnar Blomqvist became its first real manager. Today's Villa Kukkapää was the manager's residence, and the mill's office was in the same house.",
        "The Swedish-speaking couple struggled with the language among the people of Savo at first, but they settled in well. The close and somewhat isolated mill community had two shops and its own primary school, which Blomqvist had built in 1924. He was also a pioneer of new technology: the mill got the municipality's first electric lights, which people in Sulkava village watched with wonder, and he bought the area's first radio, so on Sundays the workers could listen to the church service in the office yard.",
        "The sawmill was Sulkava's biggest employer. In the 1920s it had two to three hundred workers in two or three shifts. Wages were paid every two weeks, and on paydays the mill always had a lively market.",
        "Edith Blomqvist was an unusual manager's wife for her time: she ran the mill office for almost 30 years. The family's ties to Sulkava grew stronger still when their daughter married a local doctor, Mikael (Mikko) Vihavainen, in 1938.",
        "In the late 1940s the Kukkapää sawmill, like many mid-sized mills, fell on hard times, and it finally closed in 1951. In 1952 the Blomqvists moved to Korpilahti, where Gunnar managed Rauma-Repola's Iloniemi sawmill for three years. In retirement they moved back to Sulkava village.",
      ],
    },
    sections: [
      {
        title: { fi: "Myöhemmin", en: "Later" },
        text: {
          fi: ["Vuodesta 1953 evp Jorma Ränkipohja. 1970 Rauma-Repola/UPM. 2000-luvulla yksityisessä omistuksessa."],
          en: ["From 1953, retired officer Jorma Ränkipohja. From 1970, Rauma-Repola/UPM. Privately owned since the 2000s."],
        },
      },
    ],
    photos: historiaPhotos,
    ask: [
      "Milloin talo tuli teidän omistukseenne, ja miksi juuri Kukkapää? Pari lausetta omin sanoin.",
      "Mitä vuoden 2012 kunnostuksessa tehtiin?",
      "Saako Ulla Kiviahon kotialbumin kuvat näyttää uusilla sivuilla kuten nykyisillä?",
    ],
  },
};

export const pageList: Page[] = [pages.huvila, pages.sauna, pages.tekemista, pages.historia];

export const homePhotos = {
  villa: photo("huvila-kesa", "Huvila ja pihapiiri kesällä", "The villa and its yard in summer"),
  sauna: photo("sauna-ulkoa", "Rantasauna männikössä", "The lakeside sauna house among the pines"),
  beach: photo("ranta", "Laituri ja hiekkaranta", "The pier and the sand beach"),
  history: photo("h-1920", "Kukkapään sahan talo 1920-luvun alussa", "The Kukkapää sawmill house in the early 1920s"),
  hosts: photo("omistajat", "Omistajat Villa Kukkapään pihalla", "The owners in Villa Kukkapää's yard"),
  floorDown: photo("pohjapiirros-ala", "Alakerran pohjapiirros", "Ground floor plan"),
  floorUp: photo("pohjapiirros-yla", "Yläkerran pohjapiirros", "Upper floor plan"),
  stovePoster: photo("aitokiuas", "AitoKiuas", "The AitoKiuas stove"),
};

/** Home page cards: which pages, in which order. */
export const homeCards: { id: PageId; photo: Photo; text: Text }[] = [
  {
    id: "huvila",
    photo: homePhotos.villa,
    text: { fi: "250 m², kaakeliuuni ja avotakka, majoitus 10 hengelle", en: "250 m², tiled stove and fireplace, sleeps 10" },
  },
  {
    id: "sauna",
    photo: homePhotos.sauna,
    text: { fi: "AitoKiuas, ruokailutila 10 hengelle, majoitus 4 hengelle", en: "AitoKiuas stove, dining for 10, beds for 4" },
  },
];

/** A Huts.fi place or trail near the villa. Distances are straight lines from huts.fi coordinates (2026-11-03). */
export type Near = { id: string; kind: "place" | "route"; icon: string; name: Text; km: number; length?: number };

export const nearby: Near[] = [
  { id: "6cc496f6-f896-4b79-a827-a09e7c870461", kind: "route", icon: "footprints", name: { fi: "Hopeasaaren lenkki", en: "Hopeasaari circuit" }, km: 0.6, length: 3.5 },
  { id: "9ceb3339-89e5-4f02-a838-4110cae4d8ed", kind: "place", icon: "flame", name: { fi: "Hopeasaaren grillikota", en: "Hopeasaari grill hut" }, km: 1.1 },
  { id: "653371f2-2dba-4ea8-a54e-b073f6d0edff", kind: "route", icon: "footprints", name: { fi: "Vilkaharju, itäinen polku", en: "Vilkaharju east trail" }, km: 1.3, length: 2.9 },
  { id: "b8ed0d8e-badf-4945-9fdc-42702afc7e6d", kind: "route", icon: "footprints", name: { fi: "Vilkaharju, läntinen polku", en: "Vilkaharju west trail" }, km: 1.6, length: 3.4 },
  { id: "56c1ae70-2d4b-4a6b-8f51-28363139a0c5", kind: "place", icon: "landmark", name: { fi: "Rauhaniemen museoalue", en: "Rauhaniemi museum area" }, km: 1.6 },
  { id: "d3d71388-5ce2-48da-b7b1-5bce2526dcf0", kind: "place", icon: "mountain", name: { fi: "Vilkaharjun harjumaasto", en: "Vilkaharju esker" }, km: 2.0 },
  { id: "1aa373a7-ed47-4622-99ea-cbe5b35b165d", kind: "place", icon: "sailboat", name: { fi: "Sulkavan Soutustadion", en: "Sulkava rowing stadium" }, km: 3.1 },
  { id: "cbb76909-114b-4d18-bc85-0a10fd0a172a", kind: "place", icon: "coffee", name: { fi: "Tiittalan kartanon rantamakasiini", en: "Tiittala manor shore café" }, km: 3.7 },
  { id: "a1cac8d0-135d-4e88-900e-824104ff6815", kind: "place", icon: "disc", name: { fi: "Sulkavan frisbeegolfrata", en: "Sulkava disc golf course" }, km: 3.8 },
];

export const nearbyEmbed = (locale: Locale) =>
  `${HUTS}/embed/${locale === "fi" ? "suomi" : "finland"}/org/${business.orgId}?address=1&hideAttr=1&places=${nearby
    .filter((n) => n.kind === "place")
    .map((n) => n.id)
    .join(",")}&routes=${nearby
    .filter((n) => n.kind === "route")
    .map((n) => n.id)
    .join(",")}`;

export const km = (n: number, locale: Locale) => `${locale === "fi" ? String(n).replace(".", ",") : n} km`;

export function splitIcon(entry: string): [string, string] {
  const i = entry.indexOf("|");
  return i < 0 ? ["check", entry] : [entry.slice(0, i), entry.slice(i + 1)];
}

export const ui = {
  fi: {
    homeTitle: "Villa Kukkapää – historiallinen huvila Saimaan rannalla, Sulkava",
    homeDescription:
      "Vuokraa 250 m² huvila vuodelta 1904 Saimaan rannalta Sulkavalta: rantasauna AitoKiukaalla, yli 200 m omaa hiekkarantaa ja 20 000 m² aidattu tontti. 10 + 4 hengelle, alle 40 km Savonlinnasta.",
    h1: "Historiallinen huvila Saimaan rannalla",
    lead: [
      "Saimaan rannalla sijaitseva suuri ja viihtyisä Villa Kukkapää tarjoaa ainutlaatuiset puitteet unohtumattomalle lomalle. 1900-luvulla Sulkavan sahan pääkonttorina toiminut historiallinen huvila on kunnostettu vanhaa kunnioittaen ja varusteltu nykypäivän mukavuuksin.",
      "Huvilassa ja saunarakennuksessa majoittuu kätevästi jopa kymmenen henkeä, eli se soveltuu mainiosti suuremmallekin perheelle, pienelle ryhmälle tai vaikkapa kahdelle perheelle, jotka haluavat lomailla yhdessä. Savonlinnan keskustaan on matkaa alle 40 km, joten Villa Kukkapää on mainio vaihtoehto myös oopperavieraille.",
    ],
    book: "Varaa",
    bookLong: "Katso vapaat päivät ja varaa",
    call: "Soita",
    beachTitle: "Oma hiekkaranta",
    beachText: "Omaa loivaa, lapsiystävällistä hiekkarantaa on yli 200 m. Laituri, soutuvene, kanootti ja nurmikenttä lentopallolle ja sulkapallolle.",
    historyText: "Gunnar ja Edith Blomqvist asuivat talossa 1922–1951. Talossa oli myös sahan konttori, ja sen ruokasalissa vihittiin hääpari 1938.",
    hostsTitle: "Tervetuloa",
    hostsText: "Pentti ja Kirsi vastaavat kysymyksiin ja sopivat avaimenluovutuksesta.",
    bookTitle: "Varaa Villa Kukkapää",
    bookText: "Varaukset ja varausehdot Lomarenkaan kautta. Avaimenluovutuksesta ja opastuksesta sovitaan erikseen.",
    extrasTitle: "Lisäpalvelut",
    extras: [
      { what: "Liinavaatesetti (vuodevaatteet ja pyyhkeet)", price: "30 € / hlö" },
      { what: "Loppusiivous", price: "200 €" },
      { what: "Sähköperämoottori soutuveneeseen", price: "100 € / vk" },
      { what: "Bensamoottori soutuveneeseen", price: "130 € / vk" },
    ],
    rules: ["Pienikokoiset lemmikit sallittu", "Ei tupakointia sisällä", "Polttopuut sisältyvät hintaan"],
    contactTitle: "Yhteystiedot",
    mapTitle: "Lähellä",
    mapCredit: "Kartta:",
    trail: "km reitti",
    has: "Mitä löytyy",
    floorPlan: "Pohjapiirros",
    gallery: "Kaikki kuvat",
    close: "Sulje",
    prev: "Edellinen",
    next: "Seuraava",
    photoCredit: "Kuvat: Ulla Kiviahon kotialbumi.",
    faqTitle: "Usein kysyttyä",
    faq: [
      { q: "Montako henkeä Villa Kukkapäähän mahtuu?", a: "Huvilassa on majoitus 10 hengelle, ja rantasaunan rakennuksessa on lisäksi majoitus 4 hengelle." },
      { q: "Missä Villa Kukkapää on?", a: "Vekarantie 462, 58700 Sulkava, Saimaan rannalla Vilkaharjun maisemissa. Savonlinnan keskustaan on alle 40 km." },
      {
        q: "Voiko huvilaa vuokrata talvella?",
        a: "Voi. Huvila ja saunarakennus ovat talviasuttavia ja sähkölämmitteisiä, ja molemmissa on ilmalämpöpumppu. Polttopuut kaakeliuuniin ja takkoihin sisältyvät hintaan.",
      },
      { q: "Saako lemmikin tuoda?", a: "Pienikokoiset lemmikit ovat sallittuja. Tontti on 20 000 m² ja puuaidattu." },
      { q: "Miten varaan?", a: "Varaukset tehdään Lomarenkaan kautta, ja sieltä löytyvät myös varausehdot. Avaimenluovutuksesta ja opastuksesta sovitaan erikseen Pentin kanssa." },
      { q: "Paljonko liinavaatteet ja loppusiivous maksavat?", a: "Liinavaatesetti (vuodevaatteet ja pyyhkeet) on 30 € / hlö ja loppusiivous 200 €." },
    ],
    askTitle: "Kysytään Pentiltä",
    homeAsk: [
      "Instagramin ja Facebookin kuvat ja videot: lataa ne kerralla Metan ”Lataa tietosi” -toiminnolla ja pudota zip-tiedosto pudotussivullesi. Kuvatekstit tulevat mukana.",
      "Onko sinulla lisää drooni- tai ilmakuvia ja videoita? Kesä, talvi, syksy. Sivun alun video on tehty saunavideosi droonikuvista.",
      "Haluatko varauksia myös suoraan omilta sivuilta Lomarenkaan lisäksi?",
      "Y-tunnus sivun alalaitaan (Parmed Oy?).",
      "Oletteko pihan kuvassa sinä ja Kirsi?",
    ],
    madeBy: "Sivut:",
    home: "Etusivu",
  },
  en: {
    homeTitle: "Villa Kukkapää – historic lakeside villa on Lake Saimaa, Sulkava, Finland",
    homeDescription:
      "Rent a 250 m² villa from 1904 on Lake Saimaa in Sulkava, Finland: lakeside sauna with a wood-fired AitoKiuas, over 200 m of private sand beach and 20,000 m² of fenced grounds. Sleeps 10 + 4, under 40 km from Savonlinna.",
    h1: "A historic villa on Lake Saimaa",
    lead: [
      "The spacious and comfortable Villa Kukkapää is in Sulkava, on Lake Saimaa, 330 km from Helsinki. This historic villa, once the head office of the Sulkava sawmill, has been renovated with respect for the old and equipped for today.",
      "It suits smaller and bigger groups, and visitors to the Savonlinna Opera Festival are frequent guests thanks to the convenient location, under 40 km from Savonlinna.",
    ],
    book: "Book",
    bookLong: "See free dates and book",
    call: "Call",
    beachTitle: "A private sand beach",
    beachText:
      "Over 200 m of private sand beach where the water grows gently deeper, so it suits small children too. A pier, rowing boat, canoe and a grass field for volleyball and badminton.",
    historyText: "Gunnar and Edith Blomqvist lived here from 1922 to 1951. The mill office was in the house, and a couple was married in its dining room in 1938.",
    hostsTitle: "Welcome",
    hostsText: "Pentti and Kirsi answer your questions and arrange the key handover.",
    bookTitle: "Book Villa Kukkapää",
    bookText: "Bookings and booking terms through Lomarengas. The key handover and a short tour are arranged separately.",
    extrasTitle: "Extras",
    extras: [
      { what: "Linen set (bed linen and towels)", price: "€30 / person" },
      { what: "Final cleaning", price: "€200" },
      { what: "Electric outboard for the rowing boat", price: "€100 / week" },
      { what: "Petrol outboard for the rowing boat", price: "€130 / week" },
    ],
    rules: ["Small pets welcome", "No smoking indoors", "Firewood included"],
    contactTitle: "Contact",
    mapTitle: "Nearby",
    mapCredit: "Map powered by",
    trail: "km trail",
    has: "What's there",
    floorPlan: "Floor plan",
    gallery: "All photos",
    close: "Close",
    prev: "Previous",
    next: "Next",
    photoCredit: "Photos: Ulla Kiviaho's family album.",
    faqTitle: "Questions",
    faq: [
      { q: "How many people does Villa Kukkapää sleep?", a: "The villa sleeps 10, and the lakeside sauna house has beds for 4 more." },
      { q: "Where is Villa Kukkapää?", a: "Vekarantie 462, 58700 Sulkava, Finland, on Lake Saimaa in the Vilkaharju landscape. Savonlinna is under 40 km away and Helsinki 330 km." },
      {
        q: "Can I rent the villa in winter?",
        a: "Yes. The villa and the sauna house are both winterised, electrically heated and have air-source heat pumps. Firewood for the tiled stove and fireplaces is included.",
      },
      { q: "Can I bring a pet?", a: "Small pets are welcome. The 20,000 m² grounds have a wooden fence." },
      { q: "How do I book?", a: "Bookings go through Lomarengas, where you also find the booking terms. The key handover and a short tour are arranged with Pentti." },
      { q: "What do linen and cleaning cost?", a: "A linen set (bed linen and towels) is €30 per person, and final cleaning is €200." },
    ],
    askTitle: "Questions for Pentti",
    homeAsk: [
      "Photos and videos from Instagram and Facebook: download them all at once with Meta's \"Download your information\" and drop the zip on your drop page. Captions come with them.",
      "Do you have more drone or aerial photos and videos? Summer, winter, autumn. The video at the top is made from the drone shots in your sauna video.",
      "Would you also like bookings straight from your own site, not only through Lomarengas?",
      "Business ID for the footer (Parmed Oy?).",
      "Is that you and Kirsi in the yard photo?",
    ],
    madeBy: "Site by",
    home: "Home",
  },
};
