import { Helmet } from "react-helmet-async";
import { useLanguage } from "@/i18n";

type StructuredDataType =
  | "organization"
  | "faqPage"
  | "article"
  | "breadcrumb";

interface StructuredDataProps {
  type: StructuredDataType;
  data?: Record<string, unknown>;
}

function getOrganizationData(lang: string) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    name: "Healthy Feet – Podologische Praxis",
    description:
      "Kassenzugelassene Podologie in München und Augsburg. Komplexbehandlung, Nagelkorrektur, Diabetische Fußpflege, Kryotherapie und mehr.",
    url: "https://podologie-healthyfeet.de",
    telephone: "+498213490642",
    email: "muenchen@podologie-healthyfeet.de",
    address: [
      {
        "@type": "PostalAddress",
        streetAddress: "Baumkirchner Str. 19",
        addressLocality: "München",
        postalCode: "81673",
        addressCountry: "DE",
      },
      {
        "@type": "PostalAddress",
        streetAddress: "Donauwörther Str. 49",
        addressLocality: "Augsburg",
        postalCode: "86154",
        addressCountry: "DE",
      },
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "17:00",
      },
    ],
    medicalSpecialty: "Podiatry",
    priceRange: "€-€€",
    inLanguage: lang,
    availableLanguage: ["de", "en", "ru"],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "47",
    },
  };
}

export default function StructuredData({ type, data }: StructuredDataProps) {
  const { lang } = useLanguage();
  let jsonLd: Record<string, unknown>;

  switch (type) {
    case "organization":
      jsonLd = getOrganizationData(lang);
      break;
    case "faqPage":
      jsonLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        inLanguage: lang,
        ...(data || {}),
      };
      break;
    case "article":
      jsonLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        inLanguage: lang,
        ...(data || {}),
      };
      break;
    case "breadcrumb":
      jsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        ...(data || {}),
      };
      break;
    default:
      return null;
  }

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Helmet>
  );
}
