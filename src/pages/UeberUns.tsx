import { Heart, Shield, Users, Sparkles } from "lucide-react";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import SEOHead from "@/components/SEOHead";
import PageTransition from "@/components/PageTransition";
import { useLanguage, getLocalizedPath } from "@/i18n";
import type { Translations } from "@/i18n/types";

const valueKeys: { icon: typeof Heart; titleKey: keyof Translations; descKey: keyof Translations }[] = [
  { icon: Heart, titleKey: "about.valueEmpathyTitle", descKey: "about.valueEmpathyDesc" },
  { icon: Shield, titleKey: "about.valueExpertiseTitle", descKey: "about.valueExpertiseDesc" },
  { icon: Users, titleKey: "about.valueTrustTitle", descKey: "about.valueTrustDesc" },
  { icon: Sparkles, titleKey: "about.valueInnovationTitle", descKey: "about.valueInnovationDesc" },
];

export default function UeberUns() {
  const { t, lang } = useLanguage();

  return (
    <PageTransition>
      <SEOHead
        title={t("about.seoTitle")}
        description={t("about.seoDescription")}
        path={getLocalizedPath("about", lang)}
        routeKey="about"
      />

      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero */}
          <AnimateOnScroll className="text-center max-w-3xl mx-auto mb-20">
            <p className="text-xs font-medium tracking-widest uppercase text-primary mb-3">
              {t("about.label")}
            </p>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6">
              {t("about.title")}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t("about.description")}
            </p>
          </AnimateOnScroll>

          {/* Philosophy */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
            <AnimateOnScroll>
              <div className="glass-card rounded-2xl p-8">
                <h2 className="text-2xl font-serif font-bold text-foreground mb-4">
                  {t("about.philosophyTitle")}
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>{t("about.philosophyP1")}</p>
                  <p>{t("about.philosophyP2")}</p>
                </div>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll delay={0.1}>
              <div className="glass-card rounded-2xl p-8">
                <h2 className="text-2xl font-serif font-bold text-foreground mb-4">
                  {t("about.approachTitle")}
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>{t("about.approachP1")}</p>
                  <p>{t("about.approachP2")}</p>
                </div>
              </div>
            </AnimateOnScroll>
          </div>

          {/* Team placeholder */}
          <AnimateOnScroll className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-4">
              {t("about.teamTitle")}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {t("about.teamDescription")}
            </p>
          </AnimateOnScroll>

          <AnimateOnScroll className="glass-card rounded-2xl p-8 text-center max-w-2xl mx-auto mb-24">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Users className="w-10 h-10 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">{t("about.teamMemberName")}</h3>
            <p className="text-sm text-primary font-medium mb-3">{t("about.teamMemberRole")}</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t("about.teamMemberBio")}
            </p>
          </AnimateOnScroll>

          {/* Values */}
          <AnimateOnScroll className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-4">
              {t("about.valuesTitle")}
            </h2>
          </AnimateOnScroll>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {valueKeys.map((value, i) => (
              <AnimateOnScroll key={value.titleKey} delay={i * 0.08}>
                <div className="glass-card rounded-2xl p-6 text-center h-full">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{t(value.titleKey)}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{t(value.descKey)}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
