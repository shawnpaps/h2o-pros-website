# Your Friendly Neighborhood H2O Pros — Website

Static marketing site built with [Astro](https://astro.build) + Tailwind CSS. No client framework — the only JavaScript is the mobile nav toggle; the FAQ accordion uses native `<details>`.

## Commands

| Command           | Action                                     |
| ----------------- | ------------------------------------------ |
| `npm install`     | Install dependencies                       |
| `npm run dev`     | Dev server at `localhost:4321`             |
| `npm run build`   | Production build to `./dist/`              |
| `npm run preview` | Preview the production build locally       |

## Structure

- `src/data/*.ts` — all content: services, reviews, FAQs, NAP details, hours, counties, nav. Edit copy here, not in the pages.
- `src/layouts/BaseLayout.astro` — head, fonts (Archivo + Public Sans via Google Fonts), header/footer, skip link.
- `src/components/` — `Header` (`variant="dark"` over the home hero, `"light"` on interior pages), `Footer`, `Button`, `SectionHeading`, `FaqItem`, `ImagePlaceholder`, `Drop` (water-drop motif), `Stars`, `ReviewCard`, `CtaBand`, `PageHero`.
- `src/pages/` — `/`, `/our-services` (anchor ids: `#DrainandSewer`, `#WaterHeater`, `#Filtration`, `#LeakDetection`, `#ResidentialPlumbing`, `#GeneralPlumbing`, `#Maintenance`, `#Specialty`, `#EmergencyPlumbing`), `/reviews`, `/about-us` (`#CurrentOffersandSavings`, `#OurServiceArea`), `/gallery`, `/contact`.

## Design tokens

Defined in `tailwind.config.mjs`: `brand-red`, `brand-red-dark`, `ink`, `ink-deep`, `water`, `water-light`, `star`, plus neutrals `mist`/`fog`/`line`; `font-heading` (Archivo) and `font-sans` (Public Sans); radii `btn`/`card`/`panel`; shadows `card`/`soft`/`lift`.

## Swapping in real photos

Drop images into `src/assets/`, import them in the page, and replace each `<ImagePlaceholder label="…">` with `<Image>` from `astro:assets`. Every placeholder is labeled with the shot it's waiting for.

## TODO before launch

- Wire the contact form to a backend (Netlify Forms, Formspree, or similar) — it currently posts to `#`.
- Replace placeholder social URLs in `src/data/site.ts` with the real profiles.
- Replace image placeholders with real photos.
