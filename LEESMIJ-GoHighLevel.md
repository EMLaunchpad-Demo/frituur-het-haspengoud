# Frituur Het Haspengoud — Plaatsingsinstructies (GoHighLevel)

## Bestanden in dit pakket
- `styles.css` — gedeelde opmaak (1 bestand voor alle pagina's)
- `scripts.js` — gedeelde JavaScript (1 bestand voor alle pagina's)
- `index.html` — Home
- `menu.html` — Menukaart (met tabbladen)
- `over-ons.html` — Over ons
- `contact.html` — Contact, route, openingsuren, FAQ + formulier

---

## Stap 1 — CSS & JS één keer centraal plaatsen
In GoHighLevel: **Sites → (jouw site) → Settings → Custom Code / Header & Footer tracking code.**

- **In de `<head>` (Header code):** plak de volledige inhoud van `styles.css` tussen:
  ```html
  <style>
    ... hier de inhoud van styles.css ...
  </style>
  ```
- **Vóór `</body>` (Footer code):** plak de volledige inhoud van `scripts.js` tussen:
  ```html
  <script>
    ... hier de inhoud van scripts.js ...
  </script>
  ```

> Zo hoef je CSS/JS maar één keer te plaatsen en werkt het op elke pagina.
> Plak je liever per pagina? Zet dan bovenaan elke HTML een `<style>`-blok en onderaan een `<script>`-blok.

## Stap 2 — HTML per pagina plaatsen
Maak in GoHighLevel 4 pagina's aan en gebruik telkens een **Custom HTML / Code**-element:
| Pagina in GHL | Plak dit bestand | URL-slug |
|---|---|---|
| Home | `index.html` | `/` |
| Menu | `menu.html` | `/menu` |
| Over ons | `over-ons.html` | `/over-ons` |
| Contact | `contact.html` | `/contact` |

> Als je CSS/JS al centraal plaatste (Stap 1), mag je de regels
> `<link rel="stylesheet" href="styles.css">` en `<script src="scripts.js"></script>`
> uit de HTML verwijderen. Laat je ze staan, zorg dan dat beide bestanden op dezelfde plek staan.

## Stap 3 — Nog aan te passen (zoek & vervang)
Deze placeholders staan bewust duidelijk in de code:
- **Telefoonnummer:** `+3211000000` en `011 00 00 00` → jouw échte nummer (op alle pagina's)
- **Adres:** `Dorpsstraat 00, 3870 Heks (Heers)` → jouw échte straat + huisnummer
- **E-mail:** `info@hethaspengoud.be` → jouw échte e-mailadres
- **Openingsuren:** blokken met `hours__row` → jouw échte uren
- **Foto's:** staan lokaal in de map `images/` (frieten, stoofvlees, snacks, frituur-sfeer). Vervang ze gerust door je eigen foto's — behoud dezelfde bestandsnamen, dan hoef je niets in de HTML aan te passen. In GoHighLevel upload je ze via de mediabibliotheek en pas je de `src="images/..."`-paden aan naar de GHL-URL's.
- **Iconen:** dit zijn ingebouwde SVG-vectoriconen (bovenaan elke pagina in een verborgen `<svg>`-sprite). Niets aan te passen — ze schalen mee en nemen de kleuren van de site over.
- **Social media:** `href="#"` bij Facebook/Instagram → jouw échte links
- **Google Maps:** in `contact.html` het `<iframe>` vervangen door je échte embed
  (Google Maps → je frituur zoeken → Delen → Kaart insluiten → `<iframe>` kopiëren)
- **Prijzen in `menu.html`:** aanpassen naar je actuele prijzen

## Stap 4 — Contactformulier koppelen
Het formulier in `contact.html` toont nu een bevestiging in de browser (demo).
Voor échte inzendingen: vervang het `<form id="contact-form">`-blok door een
**GoHighLevel Form/Survey**-element, zodat inzendingen in je CRM binnenkomen.

---
Klaar! De site is volledig responsive (mobiel/tablet/desktop) en gebruikt geen externe frameworks.
