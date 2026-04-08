import { createContext, useContext } from "react";
import type { Language, Translations } from "./types";
import { de } from "./locales/de";
import { en } from "./locales/en";
import { ru } from "./locales/ru";

const translations: Record<Language, Translations> = { de, en, ru };

interface LanguageContextValue {
  lang: Language;
  t: (key: keyof Translations) => string;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: "de",
  t: (key) => de[key],
});

export function LanguageProvider({
  lang,
  children,
}: {
  lang: Language;
  children: React.ReactNode;
}) {
  const t = (key: keyof Translations): string => {
    return translations[lang][key] ?? translations.de[key] ?? key;
  };

  return (
    <LanguageContext.Provider value={{ lang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
