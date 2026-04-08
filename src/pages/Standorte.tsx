import { MapPin, Phone, Clock, Mail, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import SEOHead from "@/components/SEOHead";
import PageTransition from "@/components/PageTransition";
import { locations } from "@/data/locations";
import { hasMapConsent } from "@/lib/cookies";
import { useLanguage, LocalizedLink, getLocalizedPath } from "@/i18n";

export default function Standorte() {
  const mapsAllowed = hasMapConsent();
  const { t, lang } = useLanguage();

  return (
    <PageTransition>
      <SEOHead
        title={t("locations.seoTitle")}
        description={t("locations.seoDescription")}
        path={getLocalizedPath("locations", lang)}
        routeKey="locations"
      />

      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-xs font-medium tracking-widest uppercase text-primary mb-3">
              {t("locations.label")}
            </p>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
              {t("locations.title")}
            </h1>
            <p className="text-muted-foreground leading-relaxed">
              {t("locations.description")}
            </p>
          </AnimateOnScroll>

          <div className="space-y-12">
            {locations.map((loc, i) => (
              <AnimateOnScroll key={loc.id} delay={i * 0.1}>
                <div className="glass-card rounded-2xl overflow-hidden">
                  <div className="grid md:grid-cols-2">
                    {/* Info */}
                    <div className="p-8">
                      <LocalizedLink
                        to={loc.id === "muenchen" ? "locationMuenchen" : "locationAugsburg"}
                        className="flex items-center gap-3 mb-6 group"
                      >
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <MapPin className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h2 className="text-2xl font-serif font-bold text-foreground group-hover:text-primary transition-colors">{loc.city}</h2>
                          <span className="text-sm text-muted-foreground">{loc.name}</span>
                        </div>
                        <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors ml-auto" />
                      </LocalizedLink>

                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <MapPin className="w-4 h-4 text-muted-foreground mt-1 shrink-0" />
                          <div>
                            <p className="text-sm font-medium text-foreground">{t("locations.address")}</p>
                            <a
                              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(loc.address + ", " + loc.zip)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-muted-foreground hover:text-primary transition-colors"
                            >
                              {loc.address}, {loc.zip}
                            </a>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Phone className="w-4 h-4 text-muted-foreground mt-1 shrink-0" />
                          <div>
                            <p className="text-sm font-medium text-foreground">{t("locations.phone")}</p>
                            <a href={`tel:${loc.phone}`} className="text-sm text-primary hover:underline">{loc.phoneDisplay}</a>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Mail className="w-4 h-4 text-muted-foreground mt-1 shrink-0" />
                          <div>
                            <p className="text-sm font-medium text-foreground">{t("locations.email")}</p>
                            <a href={`mailto:${loc.email}`} className="text-sm text-primary hover:underline">{loc.email}</a>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Clock className="w-4 h-4 text-muted-foreground mt-1 shrink-0" />
                          <div>
                            <p className="text-sm font-medium text-foreground">{t("locations.openingHours")}</p>
                            {loc.hours[lang].map((h) => (
                              <p key={h.days} className="text-sm text-muted-foreground">{h.days}: {h.time}</p>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 flex gap-3">
                        <LocalizedLink to="booking">
                          <Button className="rounded-full px-6 gap-2">
                            {t("header.bookAppointment")} <ArrowRight className="w-4 h-4" />
                          </Button>
                        </LocalizedLink>
                        {loc.doctolibUrl && (
                          <a href={loc.doctolibUrl} target="_blank" rel="noopener noreferrer">
                            <Button variant="outline" className="rounded-full px-6">
                              Doctolib
                            </Button>
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Map */}
                    <div className="min-h-[350px] bg-muted/50 flex items-center justify-center">
                      {mapsAllowed && loc.googleMapsUrl ? (
                        <iframe
                          src={loc.googleMapsUrl}
                          className="w-full h-full min-h-[350px] border-0"
                          allowFullScreen
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                          title={`${t("locations.mapTitle")} ${loc.name}`}
                        />
                      ) : (
                        <div className="text-center p-8">
                          <MapPin className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
                          <p className="text-sm text-muted-foreground">
                            {t("locations.enableCookies")}
                          </p>
                          <a
                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(loc.address + ", " + loc.zip)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-primary hover:underline mt-2 inline-block"
                          >
                            {t("locations.openInGoogleMaps")}
                          </a>
                        </div>
                      )}
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
