# Case: Tapsan Mökit (tapsanmokit.com, Jyväskylä and Uurainen)

Owner Tapani "Tapsa" Nieminen, tapani.nieminen@tapsanmokit.com, 0400 244 406. Huts.fi organization
`7c168985-5612-481c-bd44-de115e9650a9`. Three rentals and a hot tub:
Huvila Uurainen (Täkylahdentie 42 B, 41230 Uurainen, on Lake Iso-Uurainen), Mökki Jyväskylä (Sikomäentie 365,
41140 Kuikka, round-log cottage on a pond), Huoneisto Tikkakoski (Tikkakoskentie 527, 41140 Kuikka), and a mobile
hot tub (kylpytynnyri). Old site: BaseKit (builder.misssite.com), 7 pages, 50 photos at 640 px, a public Google
Calendar per unit, English page = three Booking.com links.
Preview: https://hutsnordic.fi/preview/tapsanmokit. Source: `sites/tapsanmokit/`.
Drop box: https://hutsnordic.fi/drop/<token> (token kept out of git; slug `tapsanmokit`).

## What happened, in order

| When | What |
|---|---|
| 1.11. | Tapsa accepted the free site. Offer for him: 2 years free. |
| 3.11. | Preview built from the old site (FI + EN), his photos, his Google calendars and huts.fi nearby places. |
| 3.11. | Jeff: offer every client calendar sync and online card payments. Asked Tapsa how he keeps Google and Booking.com in step, whether he uses Airbnb, for each Booking.com iCal export link, and about card payments. |

## Build notes

- **Simple design (Jeff 3.11.):** no kickers, helper text or slogans. Dark tar-brown + amber (his old site's footer was
  orange), DM Serif Display + Inter, white paper. Different from Mökkiloma (green), Kieppi (spruce/red), Vuorikoski (black).
- **Photos:** only 640 px on the old site, so the home has no full-bleed hero: dark title band with the three unit
  cards overlapping it. Originals are the first home ask.
- **Availability:** each unit embeds his own public Google Calendar (ids from the old pages), so he keeps updating
  them as before.
- **Quote form:** the same questions as his old BaseKit form (dates, guests, purpose; hot tub: date, pick-up or
  delivery, address), sent as a pre-filled email.
- **Huts.fi data gap:** huts.fi has one place for this org ("Tapsan mökit", pin at Tikkakoskentie 527 = the
  apartment) but its text describes the log cottage, and the villa and apartment have no pins. So there is one
  map (home, org embed + picked places/trails); unit pages show a nearby list and a directions link.
- **Capacity unknowns:** prices are "from" for 1–4 guests (apartment 1–3). Cottage sleeps 4+2 plus a guest house
  with 4+2; villa has 3 bedrooms + alcove. Shown as written, totals asked.
- **Old URLs:** `/huoneisto-jyväskylä` → `/huoneisto-tikkakoski`, `/mökki-jyväskylä` → `/mokki-jyvaskyla`,
  `/huvila-uurainen` and `/kylpytynnyri` kept, `/yhteystiedot` → `/#yhteys`, `/inenglish` → `/en`.
