import { Info, ArrowRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import SEOHead from "@/components/SEOHead";
import PageTransition from "@/components/PageTransition";
import { services } from "@/data/services";
import { locations } from "@/data/locations";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLanguage, LocalizedLink, getLocalizedPath } from "@/i18n";

export default function Leistungen() {
  const { hash } = useLocation();
  const { t, lang } = useLanguage();

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "center" }), 100);
      }
    }
  }, [hash]);

  return (
    <PageTransition>
      <SEOHead
        title={t("services.seoTitle")}
        description={t("services.seoDescription")}
        path={getLocalizedPath("services", lang)}
        routeKey="services"
      />

      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-xs font-medium tracking-widest uppercase text-primary mb-3">
              {t("services.label")}
            </p>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
              {t("services.title")}
            </h1>
            <p className="text-muted-foreground leading-relaxed">
              {t("services.description")}
            </p>
          </AnimateOnScroll>

          <AnimateOnScroll className="mb-10">
            <div className="glass-card rounded-2xl p-6 md:p-8 border-l-4 border-primary/30">
              <div className="flex gap-4">
                <Info className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-foreground mb-2">{t("services.hinweisTitle")}</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    {t("services.hinweisText")}
                  </p>
                </div>
              </div>
            </div>
          </AnimateOnScroll>

          <div className="space-y-8">
            {services.map((service, i) => (
              <AnimateOnScroll key={service.id} delay={i * 0.05}>
                <div
                  id={service.id}
                  className="glass-card rounded-2xl p-6 md:p-8 scroll-mt-32"
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="w-full md:w-56 h-48 md:h-40 rounded-xl overflow-hidden shrink-0">
                      <img src={service.image} alt={service.translations[lang].title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <h2 className="text-xl font-semibold text-foreground">
                          {service.translations[lang].title}
                        </h2>
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-600 text-xs font-medium">
                          {t("services.privatBadge")}
                        </span>
                        {service.mitVerordnung && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-green-50 text-green-600 text-xs font-medium">
                            {t("services.verordnungBadge")}
                          </span>
                        )}
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        {service.translations[lang].longDesc}
                      </p>
                    </div>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Unsere Praxen */}
      <section className="py-16 md:py-24 bg-[#F8FAFC]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-3">
              {t("services.praxenTitle")}
            </h2>
            <p className="text-muted-foreground">
              {t("services.praxenDescription")}
            </p>
          </AnimateOnScroll>

          <div className="grid md:grid-cols-2 gap-6">
            {locations.map((loc, i) => {
              const routeKey = loc.id === "muenchen" ? "locationMuenchen" as const : "locationAugsburg" as const;
              return (
                <AnimateOnScroll key={loc.id} delay={i * 0.1}>
                  <LocalizedLink to={routeKey} className="block">
                    <div className="glass-card rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-500">
                      <div className="w-full h-48 overflow-hidden">
                        <img
                          src={`/${loc.id === "muenchen" ? "muenchen" : "augsburg"}.jpg`}
                          alt={loc.city}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                        />
                      </div>
                      <div className="p-6">
                        <div className="flex items-center gap-2 mb-2">
                          <MapPin className="w-5 h-5 text-primary" />
                          <h3 className="text-xl font-semibold text-foreground">{loc.city}</h3>
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">{loc.address}, {loc.zip}</p>
                        <Button variant="outline" className="rounded-full px-6 gap-2 text-sm">
                          {t("services.praxenButton")} <ArrowRight className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </LocalizedLink>
                </AnimateOnScroll>
              );
            })}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
