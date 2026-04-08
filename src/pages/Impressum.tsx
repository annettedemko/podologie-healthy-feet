import SEOHead from "@/components/SEOHead";
import PageTransition from "@/components/PageTransition";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import { useLanguage, getLocalizedPath } from "@/i18n";

export default function Impressum() {
  const { t, lang } = useLanguage();

  return (
    <PageTransition>
      <SEOHead
        title={t("imprint.seoTitle")}
        description={t("imprint.seoDescription")}
        path={getLocalizedPath("imprint", lang)}
        routeKey="imprint"
      />

      <section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-8">
              {t("imprint.title")}
            </h1>

            <div className="prose max-w-none text-foreground space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-2">{t("imprint.tmgTitle")}</h2>
                <p className="text-muted-foreground">
                  Leo Schmidbauer<br />
                  Healthy Feet – Podologische Praxis<br />
                  (Einzelunternehmen)<br />
                  Baumkirchner Str. 19<br />
                  81673 München
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-2">{t("imprint.contactTitle")}</h2>
                <p className="text-muted-foreground">
                  {t("contact.phone")}: 0821 349 0642<br />
                  {t("contact.emailLabel")}: info@podologie-healthyfeet.de
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-2">{t("imprint.profTitle")}</h2>
                <p className="text-muted-foreground whitespace-pre-line">
                  {t("imprint.profText")}
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-2">{t("imprint.regulationsTitle")}</h2>
                <p className="text-muted-foreground whitespace-pre-line">
                  {t("imprint.regulationsText")}
                </p>
                <p className="text-muted-foreground mt-2">
                  {t("imprint.regulationsLink")}{" "}
                  <a
                    href="https://www.gesetze-im-internet.de/podg/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    www.gesetze-im-internet.de/podg
                  </a>
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-2">{t("imprint.authorityTitle")}</h2>
                <p className="text-muted-foreground whitespace-pre-line">
                  {t("imprint.authorityText")}
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-2">{t("imprint.insuranceTitle")}</h2>
                <p className="text-muted-foreground whitespace-pre-line">
                  {t("imprint.insuranceText")}
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-2">{t("imprint.disputeTitle")}</h2>
                <p className="text-muted-foreground">
                  {t("imprint.disputeText1")}{" "}
                  <a
                    href="https://ec.europa.eu/consumers/odr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    https://ec.europa.eu/consumers/odr
                  </a>
                </p>
                <p className="text-muted-foreground mt-2">
                  {t("imprint.disputeText2")}
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-2">{t("imprint.liabilityContentTitle")}</h2>
                <p className="text-muted-foreground">
                  {t("imprint.liabilityContentText")}
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-2">{t("imprint.liabilityLinksTitle")}</h2>
                <p className="text-muted-foreground">
                  {t("imprint.liabilityLinksText")}
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-2">{t("imprint.copyrightTitle")}</h2>
                <p className="text-muted-foreground">
                  {t("imprint.copyrightText")}
                </p>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </PageTransition>
  );
}
