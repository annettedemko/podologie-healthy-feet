import { ArrowRight, Info, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import SEOHead from "@/components/SEOHead";
import PageTransition from "@/components/PageTransition";
import DoctolibWidget from "@/components/DoctolibWidget";
import { getLocation } from "@/data/locations";
import { useLanguage, LocalizedLink, getLocalizedPath } from "@/i18n";

export default function Booking() {
  const { t, lang } = useLanguage();
  const muenchen = getLocation("muenchen");

  return (
    <PageTransition>
      <SEOHead
        title={t("booking.seoTitle")}
        description={t("booking.seoDescription")}
        path={getLocalizedPath("booking", lang)}
        routeKey="booking"
      />

      <section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-2">
              {t("booking.title")}
            </h1>
            <p className="text-muted-foreground">
              {t("booking.description")}
            </p>
          </AnimateOnScroll>

          {/* Munich-only notice — prominent */}
          <AnimateOnScroll delay={0.05} className="mb-6">
            <div className="rounded-2xl border-2 border-primary/30 bg-primary/5 backdrop-blur-sm p-5 sm:p-6 flex gap-4">
              <div className="shrink-0 w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center">
                <Info className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="font-semibold text-foreground mb-1">
                  {t("booking.munichOnlyTitle")}
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t("booking.munichOnlyText")}
                </p>
              </div>
            </div>
          </AnimateOnScroll>

          {/* Munich location card */}
          {muenchen && (
            <AnimateOnScroll delay={0.1} className="mb-8">
              <div className="glass-card rounded-2xl p-5 flex items-start gap-4">
                <div className="shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{muenchen.city}</h3>
                  <p className="text-sm text-muted-foreground">{muenchen.address}, {muenchen.zip}</p>
                </div>
              </div>
            </AnimateOnScroll>
          )}

          {/* OpticaViva Online-Terminbuchung */}
          <AnimateOnScroll delay={0.2}>
            <div className="glass-card rounded-2xl overflow-hidden">
              <iframe
                src="https://termine.opticaviva.de/b/ib7RM0pOBQ_WCBG4f0RNXHFqZfaF7xAu"
                title={t("booking.title")}
                className="w-full min-h-[700px] border-0"
                allow="clipboard-write"
              />
            </div>
            <div className="text-center mt-4">
              <a
                href="https://termine.opticaviva.de/a/ib7RM0pOBQ_WCBG4f0RNXHFqZfaF7xAu"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" className="rounded-full px-8 gap-2">
                  {t("booking.openExternal")} <ArrowRight className="w-4 h-4" />
                </Button>
              </a>
            </div>
          </AnimateOnScroll>

          {/* Additional info */}
          <AnimateOnScroll delay={0.3} className="mt-12">
            <div className="glass-card rounded-2xl p-6 text-center">
              <h3 className="font-semibold text-foreground mb-2">{t("booking.insuranceTitle")}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t("booking.insuranceDescription")}
              </p>
              <LocalizedLink to="services">
                <Button variant="outline" size="sm" className="rounded-full gap-2">
                  {t("booking.moreServices")} <ArrowRight className="w-3 h-3" />
                </Button>
              </LocalizedLink>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </PageTransition>
  );
}
