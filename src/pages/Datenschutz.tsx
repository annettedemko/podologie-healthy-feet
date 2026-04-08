import SEOHead from "@/components/SEOHead";
import PageTransition from "@/components/PageTransition";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import { useLanguage, getLocalizedPath } from "@/i18n";

export default function Datenschutz() {
  const { t, lang } = useLanguage();

  return (
    <PageTransition>
      <SEOHead
        title={t("privacy.seoTitle")}
        description={t("privacy.seoDescription")}
        path={getLocalizedPath("privacy", lang)}
        routeKey="privacy"
      />

      <section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-8">
              {t("privacy.title")}
            </h1>

            <div className="prose max-w-none text-foreground space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-2">{t("privacy.s1Title")}</h2>
                <h3 className="text-lg font-medium mb-1">{t("privacy.s1Subtitle")}</h3>
                <p className="text-muted-foreground">
                  {t("privacy.s1Text")}
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-2">{t("privacy.s2Title")}</h2>
                <p className="text-muted-foreground">
                  {t("privacy.s2Text1")}
                </p>
                <p className="text-muted-foreground mt-2 whitespace-pre-line">
                  {t("privacy.s2Text2")}
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-2">{t("privacy.s3Title")}</h2>

                <h3 className="text-lg font-medium mb-1 mt-4">{t("privacy.s3CookieTitle")}</h3>
                <p className="text-muted-foreground">
                  {t("privacy.s3CookieText")}
                </p>
                <p className="text-muted-foreground mt-2">
                  <strong>{t("privacy.s3CookieStrong")}</strong>
                </p>

                <h3 className="text-lg font-medium mb-1 mt-4">{t("privacy.s3ServerTitle")}</h3>
                <p className="text-muted-foreground">
                  {t("privacy.s3ServerText")}
                </p>

                <h3 className="text-lg font-medium mb-1 mt-4">{t("privacy.s3FormTitle")}</h3>
                <p className="text-muted-foreground">
                  {t("privacy.s3FormText")}
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-2">{t("privacy.s4Title")}</h2>
                <p className="text-muted-foreground">
                  {t("privacy.s4Text1")}
                </p>
                <p className="text-muted-foreground mt-2">
                  {t("privacy.s4Text2")}{" "}
                  <a
                    href="https://policies.google.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    https://policies.google.com/privacy
                  </a>
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-2">{t("privacy.s5Title")}</h2>
                <p className="text-muted-foreground">
                  {t("privacy.s5Text1")}
                </p>
                <p className="text-muted-foreground mt-2">
                  {t("privacy.s5Text2")}
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-1 mt-2">
                  <li><strong>{t("privacy.s5Right1")}</strong></li>
                  <li><strong>{t("privacy.s5Right2")}</strong></li>
                  <li><strong>{t("privacy.s5Right3")}</strong></li>
                  <li><strong>{t("privacy.s5Right4")}</strong></li>
                  <li><strong>{t("privacy.s5Right5")}</strong></li>
                  <li><strong>{t("privacy.s5Right6")}</strong></li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-2">{t("privacy.s6Title")}</h2>
                <p className="text-muted-foreground">
                  {t("privacy.s6Text")}
                </p>
                <p className="text-muted-foreground mt-2 whitespace-pre-line">
                  {t("privacy.s6Authority")}
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-2">{t("privacy.s7Title")}</h2>
                <p className="text-muted-foreground">
                  {t("privacy.s7Text")}
                </p>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </PageTransition>
  );
}
