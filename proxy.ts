import { NextResponse, type NextRequest } from "next/server";

// Client site previews (public/preview/<site>/) are static exports built per site. An owner who opens the link
// must see at once that this is a draft of their new site, not their live site. Instead of rebuilding every
// site, this adds one banner to every preview page that carries the "not live yet" ribbon.
const BANNER = {
  fi: {
    title: "Tämä on luonnos uusista nettisivuistasi",
    text: "Tehty sinulle, ei vielä julkaistu. Nykyiset sivusi toimivat ennallaan. Kerro mitä muuttaisit, niin päivitämme.",
  },
  en: {
    title: "This is a draft of your new website",
    text: "Made for you, not live yet. Your current site keeps working as before. Tell us what you would change and we'll update it.",
  },
  sv: {
    title: "Det här är ett utkast till din nya webbplats",
    text: "Gjord för dig, inte publicerad än. Din nuvarande webbplats fungerar som förut. Berätta vad du vill ändra så uppdaterar vi.",
  },
};

// The pages hydrate with React, which removes unknown nodes from <body>, so the banner is drawn with CSS
// pseudo-elements (title on html::before, text on body::before) that React never touches.
const css = (v: string) => JSON.stringify(v).replace(/</g, "\\3C ");

function bannerStyle(lang: keyof typeof BANNER) {
  const b = BANNER[lang];
  const box = "display:block;background:#1b1d1a;text-align:center;padding:0 16px;font-family:system-ui,-apple-system,Segoe UI,sans-serif;";
  return `<style id="preview-banner">
html::before{content:${css(b.title)};${box}padding-top:14px;color:#c8f169;font-size:17px;font-weight:700;line-height:1.35}
body::before{content:${css(b.text)};${box}padding-bottom:14px;padding-top:3px;color:rgba(255,255,255,.85);font-size:15px;font-weight:500;line-height:1.45}
</style>`;
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const parts = pathname.split("/").filter(Boolean); // ["preview", site, ...page]
  if (parts.length < 2 || parts[parts.length - 1].includes(".")) return NextResponse.next();

  const file = parts.length === 2 ? `/${parts.join("/")}/index.html` : `/${parts.join("/")}.html`;
  const res = await fetch(new URL(file, request.url), { headers: { "x-preview-banner": "1" } });
  if (!res.ok) return NextResponse.next();
  const html = await res.text();
  if (!/ei vielä julkaistu|not live yet/i.test(html)) return NextResponse.next();

  const lang = (html.match(/<html[^>]*\blang="(fi|en|sv)"/)?.[1] ?? "fi") as keyof typeof BANNER;
  const out = html.replace("</head>", `${bannerStyle(lang)}</head>`);
  return new NextResponse(out, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "X-Robots-Tag": "noindex, nofollow, noarchive",
      "Cache-Control": "public, max-age=0, s-maxage=60, stale-while-revalidate=300",
    },
  });
}

export const config = { matcher: "/preview/:path*" };
