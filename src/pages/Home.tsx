import { ArrowRight, Star, MapPin, Clock, Shield, Heart, Stethoscope, Sparkles, Quote } from "lucide-react";
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

  const allReviews = reviews[lang];
  const featuredReview = allReviews[0];
  const gridReviews = allReviews.slice(1, 5);

  return (
    <PageTransition>
      <SEOHead
        title={t("home.seoTitle")}
        description={t("home.seoDescription")}
        path={getLocalizedPath("home", lang)}
        routeKey="home"
      />

      {/* ═══ HERO ═══ */}
      <section className="relative h-dvh flex flex-col overflow-hidden -mt-[calc(1.875rem+4rem)] md:-mt-[calc(1.875rem+5rem)]">
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

        {/* Lighter overlays — let the video breathe */}
        <div className="absolute inset-0 z-[1] pointer-events-none" aria-hidden="true">
          <div className="absolute inset-0 bg-gradient-to-r from-white/50 via-white/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-[40%] bg-gradient-to-t from-white via-white/60 to-transparent" />
        </div>

        <div className="flex-1 flex items-center md:items-start pt-[calc(1.875rem+3rem)] md:pt-[calc(1.875rem+6rem)] pb-20 md:pb-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
            <div className="max-w-2xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-md border border-primary/15 text-primary text-xs sm:text-sm font-medium mb-3 sm:mb-4 shadow-sm"
              >
                <Shield className="w-4 h-4" />
                {t("home.badge")}
              </motion.div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.05 }}
                className="text-xs sm:text-base font-bold tracking-[0.4em] uppercase text-primary mb-2 sm:mb-3"
              >
                Podologie
              </motion.p>
              <AnimatedText
                text={`${t("home.heroTitle1")} ${t("home.heroTitle2")}`}
                as="h1"
                className="text-[3.375rem] sm:text-6xl lg:text-7xl xl:text-8xl font-serif font-bold text-foreground leading-[1.05] mb-3 sm:mb-5"
                delay={0.1}
                staggerChildren={0.05}
                once={false}
              />
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-sm sm:text-base md:text-lg text-foreground/70 leading-relaxed mb-4 sm:mb-6 max-w-lg"
              >
                {t("home.heroDescription")}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-3 items-start"
              >
                <MagneticButton strength={8}>
                  <LocalizedLink to="booking">
                    <Button size="lg" className="w-[240px] sm:w-auto rounded-full px-10 text-base gap-2 h-13 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/35 transition-all duration-500 bg-gradient-to-r from-primary to-[hsl(var(--clinic-green))] hover:brightness-110">
                      {t("header.bookAppointment")} <ArrowRight className="w-5 h-5" />
                    </Button>
                  </LocalizedLink>
                </MagneticButton>
                <MagneticButton strength={5}>
                  <LocalizedLink to="locations">
                    <Button variant="outline" size="lg" className="w-[240px] sm:w-auto rounded-full px-10 text-base gap-2 h-13 bg-white/70 backdrop-blur-md border-foreground/10 hover:bg-white/90 hover:shadow-lg transition-all duration-500">
                      <MapPin className="w-5 h-5" /> {t("home.ourLocations")}
                    </Button>
                  </LocalizedLink>
                </MagneticButton>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ TRUST BAR ═══ */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="relative z-20 -mt-16 pb-4"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-center gap-4 sm:gap-8 md:gap-16 text-xs sm:text-sm md:text-base text-muted-foreground/70">
          <div className="flex items-center gap-2"><Shield className="w-4 h-4 sm:w-5 sm:h-5 text-primary/50" /> {t("home.trustInsurance")}</div>
          <div className="flex items-center gap-2"><MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-primary/50" /> {t("home.trustLocations")}</div>
          <div className="flex items-center gap-2"><Clock className="w-4 h-4 sm:w-5 sm:h-5 text-primary/50" /> {t("home.trustFlexible")}</div>
        </div>
      </motion.div>

      {/* ═══ STATS ═══ */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-primary to-[hsl(var(--clinic-blue-dark))]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 text-center">
            {([
              { num: "5+", label: t("home.statsExperience") },
              { num: "1000+", label: t("home.statsPatients") },
              { num: "2", label: t("home.trustLocations") },
              { num: "4", label: t("home.statsTeam") },
            ]).map((stat, i) => (
              <AnimateOnScroll key={i} delay={i * 0.1}>
                <div>
                  <p className="text-4xl md:text-5xl font-serif font-bold text-white mb-1">{stat.num}</p>
                  <p className="text-sm text-white/70 font-medium">{stat.label}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ LOCATIONS ═══ */}
      <section id="standorte" className="py-24 md:py-32 relative overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-xs font-medium tracking-widest uppercase text-primary mb-3">
              {t("home.locationsLabel")}
            </p>
            <AnimatedText
              text={t("home.locationsTitle")}
              as="h2"
              className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4"
            />
          </AnimateOnScroll>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {locations.map((loc, i) => {
              const routeKey = loc.id === "augsburg" ? "locationAugsburg" as const : "locationMuenchen" as const;
              return (
                <AnimateOnScroll key={loc.id} delay={i * 0.1}>
                  <LocalizedLink to={routeKey} className="block group">
                    <div className="rounded-2xl overflow-hidden border border-border/50 shadow-lg hover:shadow-xl transition-all duration-500 bg-white">
                      <div className="w-full h-56 md:h-64 overflow-hidden relative">
                        <img
                          src={`/${loc.id === "muenchen" ? "muenchen" : "augsburg"}.jpg`}
                          alt={loc.city}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-black/30 to-transparent" />
                        <h3 className="absolute bottom-4 left-6 text-2xl font-serif font-bold text-white">{loc.city}</h3>
                      </div>
                      <div className="p-6">
                        <p className="text-sm text-muted-foreground mb-3">{loc.address}, {loc.zip}</p>
                        {loc.hours[lang].map((h) => (
                          <div key={h.days} className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                            <Clock className="w-3.5 h-3.5" /> {h.days}: {h.time}
                          </div>
                        ))}
                        {loc.phone && (
                          <p className="text-sm text-primary font-medium mt-3">{loc.phoneDisplay}</p>
                        )}
                        <div className="mt-4">
                          <span className="inline-flex items-center gap-1.5 text-sm text-primary font-medium group-hover:gap-2.5 transition-all">
                            {t("home.moreInfo")} <ArrowRight className="w-4 h-4" />
                          </span>
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

      {/* ═══ SERVICES ═══ */}
      <section id="leistungen" className="py-24 md:py-32 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #f0f7ff 0%, #ffffff 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-xs font-medium tracking-widest uppercase text-primary mb-3">
              {t("home.problemsLabel")}
            </p>
            <AnimatedText
              text={t("home.problemsTitle")}
              as="h2"
              className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4"
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
                  className="group block h-full"
                  onMouseMove={handleCardMouseMove}
                >
                  <div className="rounded-2xl overflow-hidden bg-white border border-border/50 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-500 h-full">
                    <div className="w-full h-48 overflow-hidden">
                      <img src={service.image} alt={service.translations[lang].title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">{service.translations[lang].title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{service.translations[lang].shortDesc}</p>
                      <div className="flex flex-wrap gap-2 mt-3">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 text-xs font-medium">
                          {t("services.privatBadge")}
                        </span>
                        {service.mitVerordnung && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[hsl(var(--clinic-green))]/10 text-[hsl(var(--clinic-green))] text-xs font-medium">
                            {t("services.verordnungBadge")}
                          </span>
                        )}
                      </div>
                    </div>
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

      {/* ═══ WHY US ═══ */}
      <section className="py-24 md:py-32 relative overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left — big headline */}
            <AnimateOnScroll>
              <p className="text-xs font-medium tracking-widest uppercase text-primary mb-3">
                {t("home.whyLabel")}
              </p>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6 leading-tight">
                {t("home.whyTitle")}
              </h2>
              <div className="flex items-center gap-4">
                <MagneticButton strength={8}>
                  <LocalizedLink to="booking">
                    <Button size="lg" className="rounded-full px-8 text-base gap-2 bg-gradient-to-r from-primary to-[hsl(var(--clinic-green))] hover:brightness-110 transition-all">
                      {t("home.ctaButton")} <ArrowRight className="w-5 h-5" />
                    </Button>
                  </LocalizedLink>
                </MagneticButton>
              </div>
            </AnimateOnScroll>

            {/* Right — features list */}
            <div className="space-y-4">
              {([
                { title: t("home.whyInsurance"), desc: t("home.whyInsuranceDesc"), icon: Shield },
                { title: t("home.whyMedical"), desc: t("home.whyMedicalDesc"), icon: Stethoscope },
                { title: t("home.whyModern"), desc: t("home.whyModernDesc"), icon: Sparkles },
                { title: t("home.whyGentle"), desc: t("home.whyGentleDesc"), icon: Heart },
                { title: t("home.whyLocations"), desc: t("home.whyLocationsDesc"), icon: MapPin },
              ] as const).map((item, i) => (
                <AnimateOnScroll key={i} delay={i * 0.06}>
                  <div className="flex gap-4 p-4 rounded-xl hover:bg-muted/50 transition-colors duration-300">
                    <div className="shrink-0 w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-0.5">{item.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ REVIEWS ═══ */}
      <section id="bewertungen" className="py-24 md:py-32 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #f8fafc 0%, #f0f7ff 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-xs font-medium tracking-widest uppercase text-primary mb-3">
              {t("home.reviewsLabel")}
            </p>
            <AnimatedText
              text={t("home.reviewsTitle")}
              as="h2"
              className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4"
            />
          </AnimateOnScroll>

          {/* Featured review — large */}
          {featuredReview && (
            <AnimateOnScroll className="max-w-3xl mx-auto mb-10">
              <div className="relative rounded-2xl bg-white border border-border/50 shadow-lg p-8 md:p-10">
                <Quote className="absolute top-6 right-6 w-10 h-10 text-primary/10" />
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: featuredReview.rating }).map((_, j) => (
                    <Star key={j} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-lg md:text-xl text-foreground leading-relaxed mb-6 font-serif italic">
                  "{featuredReview.text}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-sm font-bold text-primary">{featuredReview.name.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{featuredReview.name}</p>
                    <p className="text-xs text-muted-foreground">{featuredReview.date}</p>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
          )}

          {/* Grid reviews */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {gridReviews.map((review, i) => (
              <AnimateOnScroll key={review.name} delay={i * 0.08}>
                <div className="rounded-2xl bg-white border border-border/50 shadow-md p-5 h-full hover:shadow-lg transition-shadow duration-300">
                  <div className="flex gap-0.5 mb-3">
                    {Array.from({ length: review.rating }).map((_, j) => (
                      <Star key={j} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm text-foreground leading-relaxed mb-4">"{review.text}"</p>
                  <p className="text-xs text-muted-foreground">
                    <span className="font-medium text-foreground">{review.name}</span> · {review.date}
                  </p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="py-20 md:py-28 relative overflow-hidden bg-gradient-to-br from-primary via-[hsl(210,70%,40%)] to-[hsl(var(--clinic-blue-dark))]">
        {/* Decorative shapes */}
        <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-white/5 blur-3xl" aria-hidden="true" />
        <div className="absolute bottom-0 left-0 w-56 h-56 rounded-full bg-[hsl(var(--clinic-green))]/10 blur-3xl" aria-hidden="true" />

        <AnimateOnScroll className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-4 leading-tight">
            {t("home.ctaTitle")}
          </h2>
          <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto">
            {t("home.ctaDescription")}
          </p>
          <MagneticButton strength={8}>
            <LocalizedLink to="booking">
              <Button size="lg" className="rounded-full px-10 text-base gap-2 h-14 bg-white text-primary hover:bg-white/90 shadow-xl hover:shadow-2xl transition-all duration-500 font-semibold">
                {t("home.ctaButton")} <ArrowRight className="w-5 h-5" />
              </Button>
            </LocalizedLink>
          </MagneticButton>
        </AnimateOnScroll>
      </section>
    </PageTransition>
  );
}
