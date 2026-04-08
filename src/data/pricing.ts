import type { Language } from "@/i18n/types";

export interface PriceItem {
  translations: Record<Language, { name: string; description: string }>;
  prices: Record<string, number | string>;
  highlight?: boolean;
}

export interface PriceCategory {
  translations: Record<Language, { title: string }>;
  items: PriceItem[];
}

export const pricing: PriceCategory[] = [
  {
    translations: {
      de: { title: "Kassenleistungen" },
      en: { title: "Insurance Services" },
      ru: { title: "\u0423\u0441\u043b\u0443\u0433\u0438 \u043f\u043e \u0441\u0442\u0440\u0430\u0445\u043e\u0432\u043a\u0435" },
    },
    items: [
      {
        translations: {
          de: { name: "Podologische Behandlung mit Heilmittelverordnung", description: "Medizinische Fu\u00dfpflege \u2013 Kosten \u00fcbernimmt die Krankenkasse" },
          en: { name: "Podiatric treatment with prescription", description: "Medical foot care \u2013 covered by health insurance" },
          ru: { name: "\u041f\u043e\u0434\u043e\u043b\u043e\u0433\u0438\u0447\u0435\u0441\u043a\u043e\u0435 \u043b\u0435\u0447\u0435\u043d\u0438\u0435 \u043f\u043e \u043d\u0430\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u0438\u044e", description: "\u041c\u0435\u0434\u0438\u0446\u0438\u043d\u0441\u043a\u0438\u0439 \u0443\u0445\u043e\u0434 \u0437\u0430 \u0441\u0442\u043e\u043f\u0430\u043c\u0438 \u2013 \u043e\u043f\u043b\u0430\u0447\u0438\u0432\u0430\u0435\u0442\u0441\u044f \u0441\u0442\u0440\u0430\u0445\u043e\u0432\u043e\u0439 \u043a\u0430\u0441\u0441\u043e\u0439" },
        },
        prices: { augsburg: "0 \u20ac", muenchen: "0 \u20ac" },
        highlight: true,
      },
    ],
  },
  {
    translations: {
      de: { title: "Privatleistungen" },
      en: { title: "Private Services" },
      ru: { title: "\u0427\u0430\u0441\u0442\u043d\u044b\u0435 \u0443\u0441\u043b\u0443\u0433\u0438" },
    },
    items: [
      {
        translations: {
          de: { name: "Medizinische Fu\u00dfpflege", description: "Komplette podologische Behandlung (Privatzahler)" },
          en: { name: "Medical Foot Care", description: "Complete podiatric treatment (private patients)" },
          ru: { name: "\u041c\u0435\u0434\u0438\u0446\u0438\u043d\u0441\u043a\u0438\u0439 \u0443\u0445\u043e\u0434 \u0437\u0430 \u0441\u0442\u043e\u043f\u0430\u043c\u0438", description: "\u041a\u043e\u043c\u043f\u043b\u0435\u043a\u0441\u043d\u0430\u044f \u043f\u043e\u0434\u043e\u043b\u043e\u0433\u0438\u0447\u0435\u0441\u043a\u0430\u044f \u043f\u0440\u043e\u0446\u0435\u0434\u0443\u0440\u0430 (\u0447\u0430\u0441\u0442\u043d\u044b\u0435 \u043f\u0430\u0446\u0438\u0435\u043d\u0442\u044b)" },
        },
        prices: { augsburg: 60, muenchen: 69 },
      },
      {
        translations: {
          de: { name: "Hornhaut entfernen", description: "Gezielte, schonende Abtragung" },
          en: { name: "Callus Removal", description: "Targeted, gentle removal" },
          ru: { name: "\u0423\u0434\u0430\u043b\u0435\u043d\u0438\u0435 \u043c\u043e\u0437\u043e\u043b\u0435\u0439", description: "\u0426\u0435\u043b\u0435\u043d\u0430\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u043d\u043e\u0435, \u0431\u0435\u0440\u0435\u0436\u043d\u043e\u0435 \u0443\u0434\u0430\u043b\u0435\u043d\u0438\u0435" },
        },
        prices: { augsburg: 49, muenchen: 55 },
      },
      {
        translations: {
          de: { name: "H\u00fchnerauge entfernen", description: "Druckfrei und schmerzarm" },
          en: { name: "Corn Removal", description: "Pressure-free and low-pain" },
          ru: { name: "\u0423\u0434\u0430\u043b\u0435\u043d\u0438\u0435 \u043c\u043e\u0437\u043e\u043b\u044f", description: "\u0411\u0435\u0437 \u0434\u0430\u0432\u043b\u0435\u043d\u0438\u044f \u0438 \u043f\u043e\u0447\u0442\u0438 \u0431\u0435\u0437\u0431\u043e\u043b\u0435\u0437\u043d\u0435\u043d\u043d\u043e" },
        },
        prices: { augsburg: 49, muenchen: 55 },
      },
      {
        translations: {
          de: { name: "Warze abtragen", description: "Klassische Behandlung" },
          en: { name: "Wart Removal", description: "Classic treatment" },
          ru: { name: "\u0423\u0434\u0430\u043b\u0435\u043d\u0438\u0435 \u0431\u043e\u0440\u043e\u0434\u0430\u0432\u043a\u0438", description: "\u041a\u043b\u0430\u0441\u0441\u0438\u0447\u0435\u0441\u043a\u043e\u0435 \u043b\u0435\u0447\u0435\u043d\u0438\u0435" },
        },
        prices: { augsburg: 49, muenchen: 55 },
      },
      {
        translations: {
          de: { name: "Eingewachsenen Nagel entfernen", description: "Teilresektion / Entlastung (ohne Spange)" },
          en: { name: "Ingrown Nail Removal", description: "Partial resection / relief (without brace)" },
          ru: { name: "\u0423\u0434\u0430\u043b\u0435\u043d\u0438\u0435 \u0432\u0440\u043e\u0441\u0448\u0435\u0433\u043e \u043d\u043e\u0433\u0442\u044f", description: "\u0427\u0430\u0441\u0442\u0438\u0447\u043d\u0430\u044f \u0440\u0435\u0437\u0435\u043a\u0446\u0438\u044f / \u0440\u0430\u0437\u0433\u0440\u0443\u0437\u043a\u0430 (\u0431\u0435\u0437 \u0441\u043a\u043e\u0431\u044b)" },
        },
        prices: { augsburg: 69, muenchen: 79 },
      },
      {
        translations: {
          de: { name: "Kinder Nagelschnitt", description: "Mit Eltern-Beratung" },
          en: { name: "Children\u2019s Nail Trim", description: "With parental consultation" },
          ru: { name: "\u0414\u0435\u0442\u0441\u043a\u0430\u044f \u0441\u0442\u0440\u0438\u0436\u043a\u0430 \u043d\u043e\u0433\u0442\u0435\u0439", description: "\u0421 \u043a\u043e\u043d\u0441\u0443\u043b\u044c\u0442\u0430\u0446\u0438\u0435\u0439 \u0434\u043b\u044f \u0440\u043e\u0434\u0438\u0442\u0435\u043b\u0435\u0439" },
        },
        prices: { augsburg: 49, muenchen: 55 },
      },
    ],
  },
  {
    translations: {
      de: { title: "Nagelpilzbehandlung" },
      en: { title: "Nail Fungus Treatment" },
      ru: { title: "\u041b\u0435\u0447\u0435\u043d\u0438\u0435 \u0433\u0440\u0438\u0431\u043a\u0430 \u043d\u043e\u0433\u0442\u0435\u0439" },
    },
    items: [
      {
        translations: {
          de: { name: "Nagelpilzbehandlung (klassisch)", description: "Mechanische + lokale Behandlung" },
          en: { name: "Nail Fungus Treatment (classic)", description: "Mechanical + topical treatment" },
          ru: { name: "\u041b\u0435\u0447\u0435\u043d\u0438\u0435 \u0433\u0440\u0438\u0431\u043a\u0430 (\u043a\u043b\u0430\u0441\u0441\u0438\u0447\u0435\u0441\u043a\u043e\u0435)", description: "\u041c\u0435\u0445\u0430\u043d\u0438\u0447\u0435\u0441\u043a\u043e\u0435 + \u043c\u0435\u0441\u0442\u043d\u043e\u0435 \u043b\u0435\u0447\u0435\u043d\u0438\u0435" },
        },
        prices: { augsburg: 49, muenchen: 55 },
      },
      {
        translations: {
          de: { name: "Nagelpilz \u2013 1. Sitzung Kaltplasma", description: "Vorbereitung zur modernen Plasma-Therapie" },
          en: { name: "Nail Fungus \u2013 1st Cold Plasma Session", description: "Preparation for modern plasma therapy" },
          ru: { name: "\u0413\u0440\u0438\u0431\u043e\u043a \u2013 1-\u0439 \u0441\u0435\u0430\u043d\u0441 \u043f\u043b\u0430\u0437\u043c\u044b", description: "\u041f\u043e\u0434\u0433\u043e\u0442\u043e\u0432\u043a\u0430 \u043a \u0441\u043e\u0432\u0440\u0435\u043c\u0435\u043d\u043d\u043e\u0439 \u043f\u043b\u0430\u0437\u043c\u043e\u0442\u0435\u0440\u0430\u043f\u0438\u0438" },
        },
        prices: { augsburg: 70, muenchen: 79 },
      },
      {
        translations: {
          de: { name: "Kaltplasma \u2013 6 Sitzungen", description: "Paketpreis \u00b7 5% Rabatt" },
          en: { name: "Cold Plasma \u2013 6 Sessions", description: "Package price \u00b7 5% discount" },
          ru: { name: "\u041f\u043b\u0430\u0437\u043c\u0430 \u2013 6 \u0441\u0435\u0430\u043d\u0441\u043e\u0432", description: "\u041f\u0430\u043a\u0435\u0442 \u00b7 \u0441\u043a\u0438\u0434\u043a\u0430 5%" },
        },
        prices: { augsburg: "332,50", muenchen: "375" },
      },
      {
        translations: {
          de: { name: "Kaltplasma \u2013 12 Sitzungen", description: "Paketpreis \u00b7 15% Rabatt" },
          en: { name: "Cold Plasma \u2013 12 Sessions", description: "Package price \u00b7 15% discount" },
          ru: { name: "\u041f\u043b\u0430\u0437\u043c\u0430 \u2013 12 \u0441\u0435\u0430\u043d\u0441\u043e\u0432", description: "\u041f\u0430\u043a\u0435\u0442 \u00b7 \u0441\u043a\u0438\u0434\u043a\u0430 15%" },
        },
        prices: { augsburg: "595", muenchen: "669" },
      },
    ],
  },
  {
    translations: {
      de: { title: "Nagelspangenbehandlung" },
      en: { title: "Nail Brace Treatment" },
      ru: { title: "\u041b\u0435\u0447\u0435\u043d\u0438\u0435 \u043d\u043e\u0433\u0442\u0435\u0432\u044b\u043c\u0438 \u0441\u043a\u043e\u0431\u0430\u043c\u0438" },
    },
    items: [
      {
        translations: {
          de: { name: "Spangenbehandlung \u2013 1. Sitzung", description: "Nagelvorbereitung, Biegen, Aufsetzen" },
          en: { name: "Nail Brace \u2013 1st Session", description: "Nail preparation, bending, application" },
          ru: { name: "\u0421\u043a\u043e\u0431\u0430 \u2013 1-\u0439 \u0441\u0435\u0430\u043d\u0441", description: "\u041f\u043e\u0434\u0433\u043e\u0442\u043e\u0432\u043a\u0430 \u043d\u043e\u0433\u0442\u044f, \u0441\u0433\u0438\u0431\u0430\u043d\u0438\u0435, \u0443\u0441\u0442\u0430\u043d\u043e\u0432\u043a\u0430" },
        },
        prices: { augsburg: 110, muenchen: 140 },
      },
      {
        translations: {
          de: { name: "Spangenbehandlung \u2013 Folgesitzung", description: "Kontrolle und Versetzung der Spange" },
          en: { name: "Nail Brace \u2013 Follow-up", description: "Check and repositioning of the brace" },
          ru: { name: "\u0421\u043a\u043e\u0431\u0430 \u2013 \u043f\u043e\u0432\u0442\u043e\u0440\u043d\u044b\u0439 \u0441\u0435\u0430\u043d\u0441", description: "\u041a\u043e\u043d\u0442\u0440\u043e\u043b\u044c \u0438 \u043f\u0435\u0440\u0435\u0441\u0442\u0430\u043d\u043e\u0432\u043a\u0430 \u0441\u043a\u043e\u0431\u044b" },
        },
        prices: { augsburg: 50, muenchen: 59 },
      },
    ],
  },
  {
    translations: {
      de: { title: "Hausbesuch" },
      en: { title: "Home Visit" },
      ru: { title: "\u0412\u044b\u0435\u0437\u0434 \u043d\u0430 \u0434\u043e\u043c" },
    },
    items: [
      {
        translations: {
          de: { name: "Mobile Medizinische Fu\u00dfpflege (Einzeln)", description: "Wir kommen zu Ihnen!" },
          en: { name: "Mobile Medical Foot Care (Single)", description: "We come to you!" },
          ru: { name: "\u041c\u043e\u0431\u0438\u043b\u044c\u043d\u044b\u0439 \u0443\u0445\u043e\u0434 (\u043e\u0434\u0438\u043d \u043f\u0430\u0446\u0438\u0435\u043d\u0442)", description: "\u041c\u044b \u043f\u0440\u0438\u0435\u0434\u0435\u043c \u043a \u0432\u0430\u043c!" },
        },
        prices: { augsburg: 85, muenchen: 95 },
      },
      {
        translations: {
          de: { name: "Mobile Medizinische Fu\u00dfpflege (Ab 2 Personen)", description: "Wir kommen zu Ihnen!" },
          en: { name: "Mobile Medical Foot Care (2+ People)", description: "We come to you!" },
          ru: { name: "\u041c\u043e\u0431\u0438\u043b\u044c\u043d\u044b\u0439 \u0443\u0445\u043e\u0434 (\u043e\u0442 2 \u0447\u0435\u043b\u043e\u0432\u0435\u043a)", description: "\u041c\u044b \u043f\u0440\u0438\u0435\u0434\u0435\u043c \u043a \u0432\u0430\u043c!" },
        },
        prices: { augsburg: 70, muenchen: 80 },
      },
    ],
  },
];
