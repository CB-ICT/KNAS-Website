# KNAS-website

Website van de Koninklijke Nederlandse Algemene Schermbond (React + Vite + TypeScript).

## Lokaal draaien

Vereist: Node.js 22.

1. `npm install`
2. `npm run dev` (http://localhost:3000)

## Belangrijke scripts

- `npm run build` – haalt eerst nieuws (knas.nl) en de wedstrijdkalender (Nahouw) op en bouwt daarna naar `dist/`.
- `npm run lint` – typecontrole (`tsc --noEmit`).
- `npm run sync:news` / `npm run sync:calendar` – alleen de gegevens verversen.
- `npm run build:single` – optionele build als één HTML-bestand in `dist-single/`.

De GitHub Actions-workflow `.github/workflows/sync-knas-news.yml` ververst nieuws en kalender dagelijks en publiceert naar GitHub Pages.

## Structuur

- `src/components/` – pagina's (één view per route).
- `src/ui/` – design system: tokens, componenten (`k-`-prefix), templates en de sitemap (`navigation.ts`).
- `src/generated/` – automatisch opgehaalde nieuws- en kalenderdata (niet handmatig bewerken).
- `public/` – afbeeldingen en documenten.
- `archive/` – oude exports, back-ups en niet meer gebruikte componenten.

## Routing

De site gebruikt hash-routing (`#/wedstrijden/kalender`), zodat hij op elke statische host werkt. Interne links staan in de code als `/pad` en worden in de browser automatisch omgezet naar `#/pad` (`src/ui/hashLinks.ts`).
