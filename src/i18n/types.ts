export type Language = "de" | "en" | "ru";

export const languages: Language[] = ["de", "en", "ru"];

export const languageNames: Record<Language, string> = {
  de: "Deutsch",
  en: "English",
  ru: "Русский",
};

export interface Translations {
  // Header
  "header.announcement": string;
  "header.podologischePraxis": string;
  "header.bookAppointment": string;
  "header.menuOpen": string;

  // Nav
  "nav.home": string;
  "nav.services": string;
  "nav.locations": string;
  "nav.about": string;
  "nav.blog": string;
  "nav.contact": string;
  "nav.faq": string;
  "nav.booking": string;

  // Footer
  "footer.description": string;
  "footer.navigation": string;
  "footer.contactAugsburg": string;
  "footer.munich": string;
  "footer.munichComingSoon": string;
  "footer.contactMunich": string;
  "footer.openingHours": string;
  "footer.legal": string;
  "footer.imprint": string;
  "footer.privacy": string;
  "footer.copyright": string;

  // Cookie Consent
  "cookie.title": string;
  "cookie.description": string;
  "cookie.learnMore": string;
  "cookie.acceptAll": string;
  "cookie.onlyNecessary": string;

  // Doctolib Widget
  "doctolib.iframeTitle": string;
  "doctolib.bookTitle": string;
  "doctolib.bookDescription": string;
  "doctolib.contactForm": string;

  // Home Page
  "home.seoTitle": string;
  "home.seoDescription": string;
  "home.badge": string;
  "home.heroTitle1": string;
  "home.heroTitle2": string;
  "home.heroDescription": string;
  "home.trustInsurance": string;
  "home.trustLocations": string;
  "home.trustFlexible": string;
  "home.problemsLabel": string;
  "home.problemsTitle": string;
  "home.problemsDescription": string;
  "home.servicesLabel": string;
  "home.servicesTitle": string;
  "home.servicesDescription": string;
  "home.whyLabel": string;
  "home.whyTitle": string;
  "home.whyInsurance": string;
  "home.whyInsuranceDesc": string;
  "home.whyMedical": string;
  "home.whyMedicalDesc": string;
  "home.whyModern": string;
  "home.whyModernDesc": string;
  "home.whyGentle": string;
  "home.whyGentleDesc": string;
  "home.whyLocations": string;
  "home.whyLocationsDesc": string;
  "home.insuranceBadge": string;
  "home.showAllServices": string;
  "home.ourLocations": string;
  "home.moreInfo": string;
  "home.locationsLabel": string;
  "home.locationsTitle": string;
  "home.comingSoon": string;
  "home.openingComingSoon": string;
  "home.reviewsLabel": string;
  "home.reviewsTitle": string;
  "home.ctaTitle": string;
  "home.ctaDescription": string;
  "home.ctaButton": string;

  // Services Page
  "services.seoTitle": string;
  "services.seoDescription": string;
  "services.label": string;
  "services.title": string;
  "services.description": string;
  "services.insuranceBadge": string;
  "services.privatBadge": string;
  "services.verordnungBadge": string;
  "services.hinweisTitle": string;
  "services.hinweisText": string;
  "services.praxenTitle": string;
  "services.praxenDescription": string;
  "services.praxenButton": string;

  // Locations Page
  "locations.seoTitle": string;
  "locations.seoDescription": string;
  "locations.label": string;
  "locations.title": string;
  "locations.description": string;
  "locations.address": string;
  "locations.phone": string;
  "locations.email": string;
  "locations.openingHours": string;
  "locations.opening2026": string;
  "locations.munichPlanning": string;
  "locations.munichDetails": string;
  "locations.mapTitle": string;
  "locations.enableCookies": string;
  "locations.openInGoogleMaps": string;
  "locations.mapComingSoon": string;

  // Location Detail Page
  "locationDetail.heroTitle": string;
  "locationDetail.heroDescription": string;
  "locationDetail.contactTitle": string;
  "locationDetail.comingSoon": string;
  "locationDetail.servicesTitle": string;
  "locationDetail.servicesDescription": string;
  "locationDetail.pricingTitle": string;
  "locationDetail.pricingDescription": string;
  "locationDetail.pricingNote": string;
  "locationDetail.ctaTitle": string;
  "locationDetail.ctaDescription": string;

  // Booking Page
  "booking.seoTitle": string;
  "booking.seoDescription": string;
  "booking.title": string;
  "booking.description": string;
  "booking.comingSoon": string;
  "booking.insuranceTitle": string;
  "booking.insuranceDescription": string;
  "booking.moreServices": string;
  "booking.openExternal": string;

  // About Page
  "about.seoTitle": string;
  "about.seoDescription": string;
  "about.label": string;
  "about.title": string;
  "about.description": string;
  "about.philosophyTitle": string;
  "about.philosophyP1": string;
  "about.philosophyP2": string;
  "about.approachTitle": string;
  "about.approachP1": string;
  "about.approachP2": string;
  "about.teamTitle": string;
  "about.teamDescription": string;
  "about.teamMemberName": string;
  "about.teamMemberRole": string;
  "about.teamMemberBio": string;
  "about.valuesTitle": string;
  "about.valueEmpathyTitle": string;
  "about.valueEmpathyDesc": string;
  "about.valueExpertiseTitle": string;
  "about.valueExpertiseDesc": string;
  "about.valueTrustTitle": string;
  "about.valueTrustDesc": string;
  "about.valueInnovationTitle": string;
  "about.valueInnovationDesc": string;

  // Blog Page
  "blog.seoTitle": string;
  "blog.seoDescription": string;
  "blog.label": string;
  "blog.title": string;
  "blog.description": string;
  "blog.readMore": string;
  "blog.allCategory": string;

  // Blog Article Page
  "blogArticle.backToBlog": string;
  "blogArticle.ctaTitle": string;
  "blogArticle.ctaDescription": string;
  "blogArticle.ctaButton": string;

  // Contact Page
  "contact.seoTitle": string;
  "contact.seoDescription": string;
  "contact.title": string;
  "contact.description": string;
  "contact.praxisAugsburg": string;
  "contact.phone": string;
  "contact.emailLabel": string;
  "contact.address": string;
  "contact.openingHours": string;
  "contact.munich": string;
  "contact.munichComingSoon": string;
  "contact.messageSent": string;
  "contact.messageSentDesc": string;
  "contact.nameLabel": string;
  "contact.namePlaceholder": string;
  "contact.emailPlaceholder": string;
  "contact.phonePlaceholder": string;
  "contact.messageLabel": string;
  "contact.messagePlaceholder": string;
  "contact.gdprLabel": string;
  "contact.gdprLink": string;
  "contact.sendButton": string;

  // FAQ Page
  "faq.seoTitle": string;
  "faq.seoDescription": string;
  "faq.label": string;
  "faq.title": string;
  "faq.description": string;
  "faq.moreQuestionsTitle": string;
  "faq.moreQuestionsDesc": string;
  "faq.contactButton": string;

  // Imprint Page
  "imprint.seoTitle": string;
  "imprint.seoDescription": string;
  "imprint.title": string;
  "imprint.tmgTitle": string;
  "imprint.contactTitle": string;
  "imprint.profTitle": string;
  "imprint.profText": string;
  "imprint.regulationsTitle": string;
  "imprint.regulationsText": string;
  "imprint.regulationsLink": string;
  "imprint.authorityTitle": string;
  "imprint.authorityText": string;
  "imprint.insuranceTitle": string;
  "imprint.insuranceText": string;
  "imprint.disputeTitle": string;
  "imprint.disputeText1": string;
  "imprint.disputeText2": string;
  "imprint.liabilityContentTitle": string;
  "imprint.liabilityContentText": string;
  "imprint.liabilityLinksTitle": string;
  "imprint.liabilityLinksText": string;
  "imprint.copyrightTitle": string;
  "imprint.copyrightText": string;

  // Privacy Page
  "privacy.seoTitle": string;
  "privacy.seoDescription": string;
  "privacy.title": string;
  "privacy.s1Title": string;
  "privacy.s1Subtitle": string;
  "privacy.s1Text": string;
  "privacy.s2Title": string;
  "privacy.s2Text1": string;
  "privacy.s2Text2": string;
  "privacy.s3Title": string;
  "privacy.s3CookieTitle": string;
  "privacy.s3CookieText": string;
  "privacy.s3CookieStrong": string;
  "privacy.s3ServerTitle": string;
  "privacy.s3ServerText": string;
  "privacy.s3FormTitle": string;
  "privacy.s3FormText": string;
  "privacy.s4Title": string;
  "privacy.s4Text1": string;
  "privacy.s4Text2": string;
  "privacy.s5Title": string;
  "privacy.s5Text1": string;
  "privacy.s5Text2": string;
  "privacy.s5Right1": string;
  "privacy.s5Right2": string;
  "privacy.s5Right3": string;
  "privacy.s5Right4": string;
  "privacy.s5Right5": string;
  "privacy.s5Right6": string;
  "privacy.s6Title": string;
  "privacy.s6Text": string;
  "privacy.s6Authority": string;
  "privacy.s7Title": string;
  "privacy.s7Text": string;

  // 404 Page
  "notFound.seoTitle": string;
  "notFound.seoDescription": string;
  "notFound.title": string;
  "notFound.description": string;
  "notFound.backHome": string;
}
