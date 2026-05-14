import type { Language } from "@/i18n/types";

const LOCALE_MAP: Record<Language, string> = {
  de: "de-DE",
  en: "en-GB",
  ru: "ru-RU",
};

export function formatDate(date: Date, lang: Language): string {
  return new Intl.DateTimeFormat(LOCALE_MAP[lang], {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
}

export function formatDateShort(date: Date, lang: Language): string {
  return new Intl.DateTimeFormat(LOCALE_MAP[lang], {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}
