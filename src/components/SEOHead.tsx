import { Helmet } from "react-helmet-async";
import { useLanguage, getAllLanguageUrls, type RouteKey } from "@/i18n";

interface SEOHeadProps {
  title: string;
  description: string;
  path?: string;
  ogImage?: string;
  type?: string;
  routeKey?: RouteKey;
  routeParams?: Record<string, string>;
}

const BASE_URL = "https://podologie-healthyfeet.de";

export default function SEOHead({
  title,
  description,
  path = "/",
  ogImage,
  type = "website",
  routeKey,
  routeParams,
}: SEOHeadProps) {
  const { lang } = useLanguage();
  const fullTitle = title.includes("Healthy Feet")
    ? title
    : `${title} | Healthy Feet Podologie`;
  const url = `${BASE_URL}${path}`;

  const hreflangUrls = routeKey
    ? getAllLanguageUrls(routeKey, routeParams)
    : null;

  return (
    <Helmet>
      <html lang={lang} />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      {ogImage && <meta property="og:image" content={ogImage} />}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {ogImage && <meta name="twitter:image" content={ogImage} />}

      {hreflangUrls && (
        <>
          <link rel="alternate" hrefLang="de" href={`${BASE_URL}${hreflangUrls.de}`} />
          <link rel="alternate" hrefLang="en" href={`${BASE_URL}${hreflangUrls.en}`} />
          <link rel="alternate" hrefLang="ru" href={`${BASE_URL}${hreflangUrls.ru}`} />
          <link rel="alternate" hrefLang="x-default" href={`${BASE_URL}${hreflangUrls.de}`} />
        </>
      )}
    </Helmet>
  );
}
