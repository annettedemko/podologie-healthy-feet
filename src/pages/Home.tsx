import { ArrowRight, Star, MapPin, Clock, Shield, Heart, Stethoscope, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import AnimatedText from "@/components/AnimatedText";
import ParallaxLayer from "@/components/ParallaxLayer";
import MagneticButton from "@/components/MagneticButton";
import SEOHead from "@/components/SEOHead";
import PageTransition from "@/components/PageTransition";
import { services } from "@/data/services";
import { locations } from "@/data/locations";
import { reviews } from "@/data/reviews";
import { motion } from "framer-motion";
import { useLanguage, LocalizedLink, getLocalizedPath } from "@/i18n";
import { useEffect, useRef, useCallback } from "react";

export default function Home() {
  const { t, lang } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);

  // Track mouse position on premium cards for radial glow
  const handleCardMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--mouse-x", `${((e.clientX - rect.left) / rect.width) * 100}%`);
    card.style.setProperty("--mouse-y", `${((e.clientY - rect.top) / rect.height) * 100}%`);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.setAttribute("muted", "");
      video.setAttribute("playsinline", "");
      video.setAttribute("webkit-playsinline", "");
      video.load();
      const tryPlay = () => {
        video.play().catch(() => {
          // Retry on user interaction
          const handler = () => {
            video.play().catch(() => {});
            document.removeEventListener("click", handler);
            document.removeEventListener("touchstart", handler);
          };
          document.addEventListener("click", handler);
          document.addEventListener("touchstart", handler);
        });
      };
      if (video.readyState >= 2) {
        tryPlay();
      } else {
        video.addEventListener("loadeddata", tryPlay, { once: true });
      }
    }
  }, []);

  return (
    <PageTransition>
      <SEOHead
        title={t("home.seoTitle")}
        description={t("home.seoDescription")}
        path={getLocalizedPath("home", lang)}
        routeKey="home"
      />

      {/* Hero — full viewport */}
      <section className="relative h-dvh flex flex-col overflow-hidden -mt-[calc(1.875rem+4rem)] md:-mt-[calc(1.875rem+5rem)]">
        {/* Background Video */}
        {/* @ts-expect-error webkit-playsinline is a non-standard attribute */}
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          webkit-playsinline=""
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src="/ripples-hero.mp4" type="video/mp4" />
        </video>

        {/* Gradient overlays for premium feel */}
        <div className="absolute inset-0 z-[1] pointer-events-none" aria-hidden="true">
          {/* Left readability zone — blue tint */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#dbeafe]/60 via-[#dbeafe]/25 to-transparent" />
          {/* Overall blue tint */}
          <div className="absolute inset-0 bg-[#3b82f6]/[0.08]" />
          {/* Bottom fade to white — long soft gradient */}
          <div className="absolute bottom-0 left-0 right-0 h-[55%] bg-gradient-to-t from-white via-white/50 via-30% to-transparent" />
        </div>

        {/* Main hero content — left-aligned, vertically centered */}
        <div className="flex-1 flex items-center pt-[calc(1.875rem+4rem)] md:pt-[calc(1.875rem+5rem)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
            <div className="max-w-2xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/70 backdrop-blur-sm border border-primary/10 text-primary text-sm font-medium mb-6"
              >
                <Shield className="w-4 h-4" />
                {t("home.badge")}
              </motion.div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.05 }}
                className="text-sm sm:text-base font-bold tracking-[0.4em] uppercase text-primary mb-5"
              >
                Podologie
              </motion.p>
              <AnimatedText
                text={`${t("home.heroTitle1")} ${t("home.heroTitle2")}`}
                as="h1"
                className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-serif font-bold text-foreground leading-[1.05] mb-8"
                delay={0.1}
                staggerChildren={0.05}
                once={false}
              />
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-lg md:text-xl text-muted-foreground/80 leading-relaxed mb-8 max-w-lg"
              >
                {t("home.heroDescription")}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <MagneticButton strength={8}>
                  <LocalizedLink to="booking">
                    <Button size="lg" className="rounded-full px-12 text-lg gap-2 h-14 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-500">
                      {t("header.bookAppointment")} <ArrowRight className="w-5 h-5" />
                    </Button>
                  </LocalizedLink>
                </MagneticButton>
                <MagneticButton strength={5}>
                  <LocalizedLink to="locations">
                    <Button variant="outline" size="lg" className="rounded-full px-12 text-lg gap-2 h-14 bg-white/60 backdrop-blur-sm hover:bg-white/80 hover:shadow-lg transition-all duration-500">
                      <MapPin className="w-5 h-5" /> {t("home.ourLocations")}
                    </Button>
                  </LocalizedLink>
                </MagneticButton>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Trust Bar — pinned to bottom of hero */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="relative z-10 pb-6"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-center gap-8 md:gap-16 text-sm md:text-base text-muted-foreground/70">
            <div className="flex items-center gap-2.5"><Shield className="w-5 h-5 text-primary/50" /> {t("home.trustInsurance")}</div>
            <div className="flex items-center gap-2.5"><MapPin className="w-5 h-5 text-primary/50" /> {t("home.trustLocations")}</div>
            <div className="flex items-center gap-2.5"><Clock className="w-5 h-5 text-primary/50" /> {t("home.trustFlexible")}</div>
          </div>
        </motion.div>
      </section>

      {/* Locations */}
      <section id="standorte" className="py-24 md:py-32 relative overflow-hidden bg-white">
        <ParallaxLayer speed={0.35} className="absolute -bottom-16 -left-24 pointer-events-none">
          <div className="w-48 h-48 rounded-full bg-primary/[0.04] blur-2xl" aria-hidden="true" />
        </ParallaxLayer>
        <ParallaxLayer speed={-0.2} className="absolute top-1/3 -right-16 pointer-events-none">
          <div className="w-32 h-32 rounded-full bg-clinic-teal/[0.04] blur-2xl" aria-hidden="true" />
        </ParallaxLayer>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-xs font-medium tracking-widest uppercase text-primary mb-3">
              {t("home.locationsLabel")}
            </p>
            <AnimatedText
              text={t("home.locationsTitle")}
              as="h2"
              className="text-5xl md:text-6xl font-serif font-bold text-foreground mb-4"
            />
          </AnimateOnScroll>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {locations.map((loc, i) => {
              const routeKey = loc.id === "augsburg" ? "locationAugsburg" as const : "locationMuenchen" as const;
              return (
                <AnimateOnScroll key={loc.id} delay={i * 0.1}>
                  <LocalizedLink to={routeKey} className="block">
                    <div className="premium-card overflow-hidden" onMouseMove={handleCardMouseMove}>
                      <div className="w-full h-56 md:h-64 overflow-hidden">
                        <img
                          src={`/${loc.id === "muenchen" ? "muenchen" : "augsburg"}.jpg`}
                          alt={loc.city}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                        />
                      </div>
                      <div className="p-8">
                        <h3 className="text-2xl font-serif font-bold text-foreground mb-1">{loc.city}</h3>
                        <p className="text-sm text-muted-foreground mb-4">{loc.address}, {loc.zip}</p>
                        {loc.hours[lang].map((h) => (
                          <div key={h.days} className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                            <Clock className="w-3.5 h-3.5" /> {h.days}: {h.time}
                          </div>
                        ))}
                        {loc.phone && (
                          <p className="text-sm text-primary font-medium mt-3">
                            {loc.phoneDisplay}
                          </p>
                        )}
                        <div className="mt-5">
                          <Button variant="outline" className="rounded-full px-6 gap-2 text-sm">
                            {t("home.moreInfo")} <ArrowRight className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </LocalizedLink>
                </AnimateOnScroll>
              );
            })}
          </div>
        </div>
      </section>

      {/* Problems / Services — what brings people here */}
      <section id="leistungen" className="py-24 md:py-32 relative overflow-hidden bg-white">
        {/* Parallax background blobs */}
        <ParallaxLayer speed={0.4} className="absolute -top-20 -right-32 pointer-events-none">
          <div className="w-64 h-64 rounded-full bg-primary/[0.04] blur-3xl" aria-hidden="true" />
        </ParallaxLayer>
        <ParallaxLayer speed={-0.2} className="absolute bottom-0 -left-20 pointer-events-none">
          <div className="w-48 h-48 rounded-full bg-clinic-teal/[0.03] blur-3xl" aria-hidden="true" />
        </ParallaxLayer>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-xs font-medium tracking-widest uppercase text-primary mb-3">
              {t("home.problemsLabel")}
            </p>
            <AnimatedText
              text={t("home.problemsTitle")}
              as="h2"
              className="text-5xl md:text-6xl font-serif font-bold text-foreground mb-4"
            />
            <p className="text-muted-foreground leading-relaxed">
              {t("home.problemsDescription")}
            </p>
          </AnimateOnScroll>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.slice(0, 6).map((service, i) => (
              <AnimateOnScroll key={service.id} delay={i * 0.08}>
                <LocalizedLink
                  to="services"
                  hash={service.id}
                  className="premium-card block h-full overflow-hidden"
                  onMouseMove={handleCardMouseMove}
                >
                  <div className="w-full h-48 overflow-hidden">
                    <img src={service.image} alt={service.translations[lang].title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-2">{service.translations[lang].title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{service.translations[lang].shortDesc}</p>
                  {service.kassenleistung && (
                    <span className="inline-flex items-center gap-1 mt-3 text-xs text-primary font-medium">
                      <Shield className="w-3 h-3" /> {t("home.insuranceBadge")}
                    </span>
                  )}
                  </div>
                </LocalizedLink>
              </AnimateOnScroll>
            ))}
          </div>

          <div className="text-center mt-12">
            <LocalizedLink to="services">
              <Button variant="outline" className="rounded-full px-8 gap-2">
                {t("home.showAllServices")} <ArrowRight className="w-4 h-4" />
              </Button>
            </LocalizedLink>
          </div>
        </div>
      </section>

      {/* Why Healthy Feet — trust block */}
      <section className="py-24 md:py-32 relative overflow-hidden bg-white">
        <ParallaxLayer speed={0.3} className="absolute -top-10 left-1/4 pointer-events-none">
          <div className="w-48 h-48 rounded-full bg-primary/[0.04] blur-3xl" aria-hidden="true" />
        </ParallaxLayer>
        <ParallaxLayer speed={-0.25} className="absolute bottom-10 right-1/4 pointer-events-none">
          <div className="w-36 h-36 rounded-full bg-clinic-teal/[0.04] blur-3xl" aria-hidden="true" />
        </ParallaxLayer>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-xs font-medium tracking-widest uppercase text-primary mb-3">
              {t("home.whyLabel")}
            </p>
            <AnimatedText
              text={t("home.whyTitle")}
              as="h2"
              className="text-5xl md:text-6xl font-serif font-bold text-foreground mb-4"
            />
          </AnimateOnScroll>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {([
              { title: t("home.whyInsurance"), desc: t("home.whyInsuranceDesc"), icon: Shield },
              { title: t("home.whyMedical"), desc: t("home.whyMedicalDesc"), icon: Stethoscope },
              { title: t("home.whyModern"), desc: t("home.whyModernDesc"), icon: Sparkles },
              { title: t("home.whyGentle"), desc: t("home.whyGentleDesc"), icon: Heart },
              { title: t("home.whyLocations"), desc: t("home.whyLocationsDesc"), icon: MapPin },
            ] as const).map((item, i) => (
              <AnimateOnScroll key={i} delay={i * 0.08}>
                <div className="premium-card p-6 text-center" onMouseMove={handleCardMouseMove}>
                  <div className="card-icon w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>


      {/* Reviews — white */}
      <section id="bewertungen" className="py-24 md:py-32 relative overflow-hidden bg-white">
        {/* Animated shimmer divider */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] shimmer-line pointer-events-none" aria-hidden="true" />
        <ParallaxLayer speed={0.2} className="absolute -top-10 right-1/4 pointer-events-none">
          <div className="w-40 h-40 rounded-full bg-primary/[0.03] blur-3xl" aria-hidden="true" />
        </ParallaxLayer>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-xs font-medium tracking-widest uppercase text-primary mb-3">
              {t("home.reviewsLabel")}
            </p>
            <AnimatedText
              text={t("home.reviewsTitle")}
              as="h2"
              className="text-5xl md:text-6xl font-serif font-bold text-foreground mb-4"
            />
          </AnimateOnScroll>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews[lang].slice(0, 6).map((review, i) => (
              <AnimateOnScroll key={review.name} delay={i * 0.08}>
                <div className="premium-card p-6" onMouseMove={handleCardMouseMove}>
                  <div className="flex gap-0.5 mb-3">
                    {Array.from({ length: review.rating }).map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-sm text-foreground leading-relaxed mb-4">"{review.text}"</p>
                  <div className="text-xs text-muted-foreground">
                    <span className="font-medium text-foreground">{review.name}</span> · {review.date}
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — blue gradient */}
      <section className="py-24 md:py-32 relative overflow-hidden" style={{ background: '#F8FAFC' }}>
        <ParallaxLayer speed={0.4} className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none">
          <div className="w-72 h-72 rounded-full bg-[#3b82f6]/[0.06] blur-[80px]" aria-hidden="true" />
        </ParallaxLayer>
        <ParallaxLayer speed={-0.3} className="absolute top-10 -left-20 pointer-events-none">
          <div className="w-40 h-40 rounded-full bg-clinic-teal/[0.04] blur-[60px]" aria-hidden="true" />
        </ParallaxLayer>
        <AnimateOnScroll className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <AnimatedText
            text={t("home.ctaTitle")}
            as="h2"
            className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4"
          />
          <p className="text-muted-foreground mb-4">
            {t("home.ctaDescription")}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <MagneticButton strength={8}>
              <LocalizedLink to="booking">
                <Button size="lg" className="rounded-full px-8 text-base gap-2 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-shadow duration-500">
                  {t("home.ctaButton")} <ArrowRight className="w-4 h-4" />
                </Button>
              </LocalizedLink>
            </MagneticButton>
          </div>
        </AnimateOnScroll>
      </section>
    </PageTransition>
  );
}
