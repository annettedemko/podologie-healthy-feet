import { Shield } from "lucide-react";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import SEOHead from "@/components/SEOHead";
import PageTransition from "@/components/PageTransition";
import { services } from "@/data/services";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLanguage, getLocalizedPath } from "@/i18n";

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
                        {service.kassenleistung && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
                            <Shield className="w-3 h-3" /> {t("services.insuranceBadge")}
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
    </PageTransition>
  );
}
