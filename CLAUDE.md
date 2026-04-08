# Healthy Feet – Podologische Praxis

## Tech Stack
- React 18 + TypeScript, Vite, Tailwind CSS 3, shadcn/ui, Framer Motion
- React Router DOM 6, react-helmet-async, Zod, React Hook Form

## Commands
- `npm run dev` — dev server on localhost:8080
- `npm run build` — production build (TypeScript + Vite)
- `npm run lint` — ESLint

## Architecture
- `src/i18n/` — Custom i18n: types, routes, context, LanguageGuard, LocalizedLink, locale files
- `src/data/` — Centralized data: locations, services, reviews, blog posts, FAQs (all with 3-lang translations)
- `src/components/` — Reusable components (Layout, ClinicHeader, ClinicFooter, SEOHead, LanguageSwitcher, etc.)
- `src/pages/` — Route pages
- `src/lib/` — Utilities (cn helper, cookie consent utils)
- `public/` — Static assets, logos, sitemap, robots.txt

## i18n Architecture
- **3 languages**: German (de), English (en), Russian (ru)
- **URL structure**: `/:lang/slug` — e.g. `/de/leistungen`, `/en/services`, `/ru/uslugi`
- **Default**: `/` redirects to `/de/`
- **Translated slugs**: Each page has a unique slug per language (defined in `src/i18n/routes.ts`)
- **Translation keys**: ~200 flat keys in `src/i18n/locales/{de,en,ru}.ts`
- **Data translations**: services, locations (hours), reviews, blog posts, FAQs use `translations: Record<Language, {...}>`
- **Components**: Use `useLanguage()` hook for `t()` function and `lang` value
- **Links**: Use `<LocalizedLink to="routeKey">` instead of `<Link to="/path">`
- **SEO**: `<SEOHead routeKey="...">` generates hreflang tags; `<html lang>` is dynamic
- **Language switcher**: DE/EN/RU toggle in header, maps current page to equivalent in other language
- **Blog slugs**: Same across all languages (German slugs only)

## Conventions
- All user-facing text uses `t()` translation function
- Use Tailwind CSS utility classes; custom styles in `src/index.css`
- Use `cn()` from `@/lib/utils` for conditional class merging
- Animations via Framer Motion (`AnimateOnScroll` wrapper, `PageTransition`)
- SEO: each page gets `<SEOHead>` with unique title/description/og tags + hreflang
- Legal: Impressum (TMG §5) and Datenschutz (DSGVO) pages required
- Cookie consent: GDPR-compliant, blocks Maps until consent given
- Locations are data-driven from `src/data/locations.ts` — easy to add new branches
- Design: glass-morphism cards, premium blue tones, Inter + Playfair Display fonts
