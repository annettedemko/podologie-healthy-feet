import type { Language } from "./types";
import { languages } from "./types";

export type RouteKey =
  | "home"
  | "services"
  | "locations"
  | "locationAugsburg"
  | "locationMuenchen"
  | "booking"
  | "about"
  | "blog"
  | "blogArticle"
  | "contact"
  | "faq"
  | "imprint"
  | "privacy";

const routeSlugs: Record<RouteKey, Record<Language, string>> = {
  home: { de: "", en: "", ru: "" },
  services: { de: "leistungen", en: "services", ru: "uslugi" },
  locations: { de: "standorte", en: "locations", ru: "lokatsii" },
  locationAugsburg: { de: "standorte/augsburg", en: "locations/augsburg", ru: "lokatsii/augsburg" },
  locationMuenchen: { de: "standorte/muenchen", en: "locations/munich", ru: "lokatsii/myunkhen" },
  booking: { de: "termin", en: "appointment", ru: "zapis" },
  about: { de: "ueber-uns", en: "about-us", ru: "o-nas" },
  blog: { de: "blog", en: "blog", ru: "blog" },
  blogArticle: { de: "blog/:slug", en: "blog/:slug", ru: "blog/:slug" },
  contact: { de: "kontakt", en: "contact", ru: "kontakty" },
  faq: { de: "faq", en: "faq", ru: "voprosy" },
  imprint: { de: "impressum", en: "imprint", ru: "impressum" },
  privacy: {
    de: "datenschutz",
    en: "privacy-policy",
    ru: "politika-konfidentsialnosti",
  },
};

/** Get the localized path for a route key (without /:lang prefix) */
export function getSlug(routeKey: RouteKey, lang: Language): string {
  return routeSlugs[routeKey][lang];
}

/** Get the full localized path including /:lang prefix */
export function getLocalizedPath(
  routeKey: RouteKey,
  lang: Language,
  params?: Record<string, string>
): string {
  let slug = routeSlugs[routeKey][lang];
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      slug = slug.replace(`:${key}`, value);
    }
  }
  return `/${lang}/${slug}`;
}

/** Get all language versions of a route (for hreflang tags) */
export function getAllLanguageUrls(
  routeKey: RouteKey,
  params?: Record<string, string>
): Record<Language, string> {
  const result = {} as Record<Language, string>;
  for (const lang of languages) {
    result[lang] = getLocalizedPath(routeKey, lang, params);
  }
  return result;
}

/** Resolve a pathname slug to a RouteKey (for language switcher) */
export function resolveRouteKey(
  slug: string
): { routeKey: RouteKey; params?: Record<string, string> } | null {
  // Check for blog article first (blog/:slug pattern)
  for (const lang of languages) {
    const blogSlug = routeSlugs.blog[lang];
    if (slug.startsWith(blogSlug + "/")) {
      const articleSlug = slug.slice(blogSlug.length + 1);
      return { routeKey: "blogArticle", params: { slug: articleSlug } };
    }
  }

  // Check all routes (longer slugs first to match nested routes like standorte/augsburg before standorte)
  const entries = Object.entries(routeSlugs).sort(
    (a, b) => b[1].de.length - a[1].de.length
  );
  for (const [key, slugs] of entries) {
    if (key === "blogArticle") continue;
    for (const lang of languages) {
      if (slugs[lang as Language] === slug) {
        return { routeKey: key as RouteKey };
      }
    }
  }

  return null;
}

/** Get all slug variants for a route key (for React Router registration) */
export function getAllSlugsForRoute(routeKey: RouteKey): string[] {
  const slugs = new Set<string>();
  for (const lang of languages) {
    slugs.add(routeSlugs[routeKey][lang]);
  }
  return Array.from(slugs);
}
