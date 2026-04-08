import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import SEOHead from "@/components/SEOHead";
import PageTransition from "@/components/PageTransition";
import { locations, phoneDisplay, phoneHref } from "@/data/locations";
import { useState } from "react";
import { useLanguage, LocalizedLink, getLocalizedPath } from "@/i18n";

export default function Kontakt() {
  const { t, lang } = useLanguage();
  const [sent, setSent] = useState(false);
  const [gdprChecked, setGdprChecked] = useState(false);
  const muenchen = locations.find((l) => l.id === "muenchen")!;
  const augsburg = locations.find((l) => l.id === "augsburg")!;

  return (
    <PageTransition>
      <SEOHead
        title={t("contact.seoTitle")}
        description={t("contact.seoDescription")}
        path={getLocalizedPath("contact", lang)}
        routeKey="contact"
      />

      <section className="py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-2">
              {t("contact.title")}
            </h1>
            <p className="text-muted-foreground">
              {t("contact.description")}
            </p>
          </AnimateOnScroll>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <AnimateOnScroll>
              <div className="space-y-6">
                {[muenchen, augsburg].map((loc) => (
                  <div key={loc.id} className={loc.id === "augsburg" ? "pt-4 border-t border-border space-y-4" : "space-y-4"}>
                    <h2 className="text-lg font-semibold text-foreground">
                      {loc.id === "muenchen" ? t("contact.munich") : t("contact.praxisAugsburg")}
                    </h2>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <Phone className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground text-sm">{t("contact.phone")}</h3>
                        <a href={`tel:${loc.phone}`} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                          {loc.phoneDisplay}
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <Mail className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground text-sm">{t("contact.emailLabel")}</h3>
                        <a href={`mailto:${loc.email}`} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                          {loc.email}
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <MapPin className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground text-sm">{t("contact.address")}</h3>
                        <a
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(loc.address + ", " + loc.zip)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                          {loc.address}<br />{loc.zip}
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <Clock className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground text-sm">{t("contact.openingHours")}</h3>
                        {loc.hours[lang].map((h) => (
                          <p key={h.days} className="text-sm text-muted-foreground">{h.days}: {h.time}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </AnimateOnScroll>

            {/* Contact Form */}
            <AnimateOnScroll delay={0.1}>
              <div className="glass-card rounded-2xl p-6">
                {sent ? (
                  <div className="text-center py-8">
                    <p className="font-medium text-foreground mb-2">{t("contact.messageSent")}</p>
                    <p className="text-sm text-muted-foreground">
                      {t("contact.messageSentDesc")}
                    </p>
                  </div>
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setSent(true);
                    }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">{t("contact.nameLabel")}</label>
                      <Input required placeholder={t("contact.namePlaceholder")} className="rounded-xl" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">{t("contact.emailLabel")} *</label>
                      <Input required type="email" placeholder={t("contact.emailPlaceholder")} className="rounded-xl" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">{t("contact.phone")}</label>
                      <Input type="tel" placeholder={t("contact.phonePlaceholder")} className="rounded-xl" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">{t("contact.messageLabel")}</label>
                      <Textarea required placeholder={t("contact.messagePlaceholder")} className="rounded-xl min-h-[120px]" />
                    </div>
                    <div className="flex items-start gap-2">
                      <Checkbox
                        id="gdpr"
                        checked={gdprChecked}
                        onCheckedChange={(v) => setGdprChecked(v === true)}
                        className="mt-1"
                      />
                      <label htmlFor="gdpr" className="text-xs text-muted-foreground leading-relaxed">
                        {t("contact.gdprLabel")}{" "}
                        <LocalizedLink to="privacy" className="text-primary hover:underline">{t("contact.gdprLink")}</LocalizedLink>{" "}
                        zu. *
                      </label>
                    </div>
                    <Button
                      type="submit"
                      className="w-full rounded-full"
                      disabled={!gdprChecked}
                    >
                      {t("contact.sendButton")}
                    </Button>
                  </form>
                )}
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
