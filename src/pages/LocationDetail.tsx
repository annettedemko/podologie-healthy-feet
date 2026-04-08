import { Navigate } from "react-router-dom";
import { MapPin, Phone, Clock, Mail, ArrowRight, ExternalLink, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import SEOHead from "@/components/SEOHead";
import PageTransition from "@/components/PageTransition";
import { locations, type Location } from "@/data/locations";
import { hasMapConsent } from "@/lib/cookies";
import { useLanguage, LocalizedLink, getLocalizedPath, type RouteKey } from "@/i18n";
import { services } from "@/data/services";
import { pricing } from "@/data/pricing";
import { motion } from "framer-motion";

function LocationPage({ location: loc, routeKey }: { location: Location; routeKey: RouteKey }) {
  const mapsAllowed = hasMapConsent();
  const { t, lang } = useLanguage();

  return (
    <PageTransition>
      <SEOHead
        title={`Healthy Feet ${loc.city} – ${t("locations.seoTitle")}`}
        description={`${t("home.heroDescription")} ${loc.address}, ${loc.zip}`}
        path={getLocalizedPath(routeKey, lang)}
        routeKey={routeKey}
      />

      {/* Hero */}
      <section className="relative bg-[#eef4ff] py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute -top-20 -right-20 w-[400px] h-[400px] rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute bottom-0 -left-20 w-[300px] h-[300px] rounded-full bg-clinic-teal/5 blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium mb-6">
              <MapPin className="w-3.5 h-3.5" />
              Healthy Feet {loc.city}
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-foreground leading-[1.1] mb-6">
              {t("locationDetail.heroTitle").replace("{city}", loc.city)}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-lg">
              {t("locationDetail.heroDescription").replace("{city}", loc.city)}
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <LocalizedLink to="booking">
                <Button size="lg" className="rounded-full px-8 text-base gap-2">
                  {t("header.bookAppointment")} <ArrowRight className="w-4 h-4" />
                </Button>
              </LocalizedLink>
              {loc.phone && (
                <a href={`tel:${loc.phone}`}>
                  <Button variant="outline" size="lg" className="rounded-full px-8 text-base">
                    {loc.phoneDisplay}
                  </Button>
                </a>
              )}
              {loc.doctolibUrl && (
                <a href={loc.doctolibUrl} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="lg" className="rounded-full px-8 text-base gap-2">
                    Doctolib <ExternalLink className="w-4 h-4" />
                  </Button>
                </a>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Details + Map */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10">
            {/* Info Card */}
            <AnimateOnScroll>
              <div className="glass-card rounded-2xl p-8">
                <h2 className="text-2xl font-serif font-bold text-foreground mb-6">
                  {t("locationDetail.contactTitle")}
                </h2>

                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground mb-1">{t("locations.address")}</p>
                      <p className="text-muted-foreground">{loc.address}</p>
                      <p className="text-muted-foreground">{loc.zip}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground mb-1">{t("locations.phone")}</p>
                      {loc.phone ? (
                        <a href={`tel:${loc.phone}`} className="text-primary hover:underline">{loc.phoneDisplay}</a>
                      ) : (
                        <p className="text-muted-foreground">{t("locationDetail.comingSoon")}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground mb-1">{t("locations.email")}</p>
                      <a href={`mailto:${loc.email}`} className="text-primary hover:underline">{loc.email}</a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground mb-1">{t("locations.openingHours")}</p>
                      {loc.hours[lang].map((h) => (
                        <p key={h.days} className="text-muted-foreground">{h.days}: {h.time}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>

            {/* Map */}
            <AnimateOnScroll delay={0.1}>
              <div className="glass-card rounded-2xl overflow-hidden min-h-[400px]">
                {mapsAllowed && loc.googleMapsUrl ? (
                  <iframe
                    src={loc.googleMapsUrl}
                    className="w-full h-full min-h-[400px] border-0"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`Karte – ${loc.name}`}
                  />
                ) : (
                  <div className="flex items-center justify-center h-full min-h-[400px] p-8">
                    <div className="text-center">
                      <MapPin className="w-10 h-10 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground mb-3">{t("locations.enableCookies")}</p>
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(loc.address + ", " + loc.zip)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        {t("locations.openInGoogleMaps")}
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 md:py-24" style={{ background: '#F6FAFF' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
              {t("locationDetail.pricingTitle").replace("{city}", loc.city)}
            </h2>
            <p className="text-muted-foreground">{t("locationDetail.pricingDescription")}</p>
          </AnimateOnScroll>

          <div className="space-y-10">
            {pricing.map((category, ci) => (
              <AnimateOnScroll key={ci} delay={ci * 0.05}>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    {ci === 0 && <Shield className="w-5 h-5 text-primary" />}
                    {category.translations[lang].title}
                  </h3>
                  <div className="glass-card rounded-2xl overflow-hidden">
                    {category.items.map((item, ii) => {
                      const price = item.prices[loc.id];
                      const displayPrice = typeof price === "number" ? `${price} \u20ac` : price;
                      return (
                        <div
                          key={ii}
                          className={`flex items-center justify-between px-6 py-4 ${
                            ii !== category.items.length - 1 ? "border-b border-border/50" : ""
                          } ${item.highlight ? "bg-primary/5" : ""}`}
                        >
                          <div className="min-w-0 mr-4">
                            <p className={`font-medium text-foreground ${item.highlight ? "text-primary" : ""}`}>
                              {item.translations[lang].name}
                            </p>
                            <p className="text-sm text-muted-foreground">{item.translations[lang].description}</p>
                          </div>
                          <span className={`text-lg font-bold whitespace-nowrap ${item.highlight ? "text-primary" : "text-foreground"}`}>
                            {displayPrice}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>

          <p className="text-xs text-muted-foreground text-center mt-8">
            {t("locationDetail.pricingNote")}
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-serif font-bold text-foreground mb-4">
              {t("locationDetail.servicesTitle").replace("{city}", loc.city)}
            </h2>
            <p className="text-muted-foreground">{t("locationDetail.servicesDescription")}</p>
          </AnimateOnScroll>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.slice(0, 6).map((service, i) => (
              <AnimateOnScroll key={service.id} delay={i * 0.08}>
                <LocalizedLink
                  to="services"
                  hash={service.id}
                  className="glass-card rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-500 block h-full"
                >
                  <div className="w-full h-48 overflow-hidden">
                    <img src={service.image} alt={service.translations[lang].title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-6">
                    <h3 className="font-semibold text-foreground mb-2">{service.translations[lang].title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{service.translations[lang].shortDesc}</p>
                  </div>
                </LocalizedLink>
              </AnimateOnScroll>
            ))}
          </div>

          <div className="text-center mt-10">
            <LocalizedLink to="services">
              <Button variant="outline" className="rounded-full px-8 gap-2">
                {t("home.showAllServices")} <ArrowRight className="w-4 h-4" />
              </Button>
            </LocalizedLink>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-clinic-teal/5" />
        <AnimateOnScroll className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
            {t("locationDetail.ctaTitle").replace("{city}", loc.city)}
          </h2>
          <p className="text-muted-foreground mb-8">
            {t("locationDetail.ctaDescription")}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <LocalizedLink to="booking">
              <Button size="lg" className="rounded-full px-8 text-base gap-2">
                {t("home.ctaButton")} <ArrowRight className="w-4 h-4" />
              </Button>
            </LocalizedLink>
            <LocalizedLink to="contact">
              <Button variant="outline" size="lg" className="rounded-full px-8 text-base">
                {t("nav.contact")}
              </Button>
            </LocalizedLink>
          </div>
        </AnimateOnScroll>
      </section>
    </PageTransition>
  );
}

export function LocationAugsburg() {
  const loc = locations.find((l) => l.id === "augsburg");
  if (!loc) return <Navigate to="/de/" replace />;
  return <LocationPage location={loc} routeKey="locationAugsburg" />;
}

export function LocationMuenchen() {
  const loc = locations.find((l) => l.id === "muenchen");
  if (!loc) return <Navigate to="/de/" replace />;
  return <LocationPage location={loc} routeKey="locationMuenchen" />;
}
