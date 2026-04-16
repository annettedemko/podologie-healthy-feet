import { ArrowRight, Star, MapPin, Clock, Shield, ShieldCheck, Award, Languages, Heart, Stethoscope, Sparkles, Quote, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import AnimatedText from "@/components/AnimatedText";
import MagneticButton from "@/components/MagneticButton";
import SEOHead from "@/components/SEOHead";
import PageTransition from "@/components/PageTransition";
import TiltCard from "@/components/TiltCard";
import CountUp from "@/components/CountUp";
import Marquee from "@/components/Marquee";
import { services } from "@/data/services";
import { locations } from "@/data/locations";
import { reviews } from "@/data/reviews";
import { motion } from "framer-motion";
import { useLanguage, LocalizedLink, getLocalizedPath } from "@/i18n";
import { useEffect, useRef } from "react";

export default function Home() {
  const { t, lang } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);

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

  // Marquee items — treatment names flow between sections
  const marqueeItems = [
    "Podologie",
    "Nagelkorrektur",
    "Diabetischer Fuß",
    "Komplexbehandlung",
    "Plasmatherapie",
    "Orthonyxie",
    "Warzenbehandlung",
  ];

  return (
    <PageTransition>
      <SEOHead
        title={t("home.seoTitle")}
        description={t("home.seoDescription")}
        path={getLocalizedPath("home", lang)}
        routeKey="home"
      />

      {/* ═══ HERO — video only in hero section ═══ */}
      <section className="relative h-dvh flex flex-col overflow-hidden -mt-[calc(1.875rem+4rem)] md:-mt-[calc(1.875rem+5rem)]">
        {/* Video background — contained to hero */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {/* @ts-expect-error webkit-playsinline is a non-standard attribute */}
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            webkit-playsinline=""
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover animate-slow-zoom"
            style={{
              filter: "saturate(1.35) hue-rotate(-4deg) contrast(1.05)",
            }}
          >
            <source src="/ripples-hero.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Readability overlays */}
        <div className="absolute inset-0 z-[1] pointer-events-none" aria-hidden="true">
          <div className="absolute inset-y-0 left-0 w-full md:w-2/3 bg-gradient-to-r from-white/45 via-white/10 to-transparent" />
          {/* Bottom fade to white */}
          <div className="absolute bottom-0 left-0 right-0 h-[40%] bg-gradient-to-t from-white via-white/50 to-transparent" />
        </div>

        {/* Film grain — premium texture */}
        <div className="film-grain z-[2]" aria-hidden="true" />

        {/* Main content */}
        <div className="flex-1 flex items-center md:items-start pt-[calc(1.875rem+3rem)] md:pt-[calc(1.875rem+6rem)] pb-20 md:pb-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
            <div className="max-w-2xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-md border border-primary/10 text-primary text-xs sm:text-sm font-medium mb-3 sm:mb-4 shadow-sm"
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
                className="text-sm sm:text-base md:text-lg text-muted-foreground/80 leading-relaxed mb-4 sm:mb-6 max-w-lg"
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
                    <Button size="lg" className="w-[240px] sm:w-auto rounded-full px-10 text-base gap-2 h-12 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40 transition-all duration-500">
                      {t("header.bookAppointment")} <ArrowRight className="w-5 h-5" />
                    </Button>
                  </LocalizedLink>
                </MagneticButton>
                <MagneticButton strength={5}>
                  <LocalizedLink to="locations">
                    <Button variant="outline" size="lg" className="w-[240px] sm:w-auto rounded-full px-10 text-base gap-2 h-12 bg-white/60 backdrop-blur-sm hover:bg-white/80 hover:shadow-lg transition-all duration-500">
                      <MapPin className="w-5 h-5" /> {t("home.ourLocations")}
                    </Button>
                  </LocalizedLink>
                </MagneticButton>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-24 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-2 text-primary/60"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </motion.div>
      </section>

      {/* ═══ STATS — 6 credentials ═══ */}
      <section className="py-20 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-y-10 gap-x-6 text-center">
            {/* Kassenzugelassen */}
            <AnimateOnScroll delay={0}>
              <div>
                <div className="w-20 h-20 mx-auto mb-3 rounded-full bg-gradient-to-br from-primary to-clinic-teal flex items-center justify-center shadow-lg shadow-primary/20">
                  <ShieldCheck className="w-10 h-10 text-white" strokeWidth={1.8} />
                </div>
                <p className="text-sm md:text-base text-foreground font-medium">
                  {t("home.trustInsurance")}
                </p>
              </div>
            </AnimateOnScroll>

            {/* Privatpatienten */}
            <AnimateOnScroll delay={0.08}>
              <div>
                <div className="w-20 h-20 mx-auto mb-3 rounded-full bg-gradient-to-br from-primary to-clinic-teal flex items-center justify-center shadow-lg shadow-primary/20">
                  <Award className="w-10 h-10 text-white" strokeWidth={1.8} />
                </div>
                <p className="text-sm md:text-base text-foreground font-medium">
                  {t("home.statsPrivate")}
                </p>
              </div>
            </AnimateOnScroll>

            {/* 2 Standorte */}
            <AnimateOnScroll delay={0.16}>
              <div>
                <CountUp
                  end={2}
                  className="text-5xl md:text-6xl font-serif font-bold bg-gradient-to-br from-primary to-clinic-teal bg-clip-text text-transparent block mb-2 leading-none"
                />
                <p className="text-sm md:text-base text-foreground font-medium">
                  {t("home.trustLocations")}
                </p>
              </div>
            </AnimateOnScroll>

            {/* 500+ Zufriedene Patienten */}
            <AnimateOnScroll delay={0.24}>
              <div>
                <CountUp
                  end={500}
                  suffix="+"
                  className="text-5xl md:text-6xl font-serif font-bold bg-gradient-to-br from-primary to-clinic-teal bg-clip-text text-transparent block mb-2 leading-none"
                />
                <p className="text-sm md:text-base text-foreground font-medium">
                  {t("home.statsPatients")}
                </p>
              </div>
            </AnimateOnScroll>

            {/* Flexible Termine */}
            <AnimateOnScroll delay={0.32}>
              <div>
                <div className="w-20 h-20 mx-auto mb-3 rounded-full bg-gradient-to-br from-primary to-clinic-teal flex items-center justify-center shadow-lg shadow-primary/20">
                  <Clock className="w-10 h-10 text-white" strokeWidth={1.8} />
                </div>
                <p className="text-sm md:text-base text-foreground font-medium">
                  {t("home.trustFlexible")}
                </p>
              </div>
            </AnimateOnScroll>

            {/* Sprachen */}
            <AnimateOnScroll delay={0.4}>
              <div>
                <div className="w-20 h-20 mx-auto mb-3 rounded-full bg-gradient-to-br from-primary to-clinic-teal flex items-center justify-center shadow-lg shadow-primary/20">
                  <Languages className="w-10 h-10 text-white" strokeWidth={1.8} />
                </div>
                <p className="text-sm md:text-base text-foreground font-medium">
                  DE · EN · RU · UA
                </p>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* ═══ MARQUEE — treatment names flowing ═══ */}
      <div className="border-y border-primary/10 bg-white">
        <Marquee items={marqueeItems} duration={45} />
      </div>

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
                  <LocalizedLink to={routeKey} className="block group" style={{ perspective: "1000px" }}>
                    <TiltCard className="rounded-2xl overflow-hidden border border-border/50 shadow-lg hover:shadow-2xl transition-shadow duration-500 bg-white">
                      <div className="w-full h-56 md:h-64 overflow-hidden relative">
                        <img
                          src={`/${loc.id === "muenchen" ? "muenchen" : "augsburg"}.jpg`}
                          alt={loc.city}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-black/40 to-transparent" />
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
                    </TiltCard>
                  </LocalizedLink>
                </AnimateOnScroll>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ SERVICES — Bento grid (varied sizes) ═══ */}
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

          {/* Bento grid: first card spans 2 columns on lg */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 auto-rows-[minmax(260px,auto)]">
            {services.slice(0, 6).map((service, i) => {
              // First card: 2x wide (lg:col-span-2), larger
              const isFeatured = i === 0;
              return (
                <AnimateOnScroll
                  key={service.id}
                  delay={i * 0.08}
                  className={isFeatured ? "lg:col-span-2 lg:row-span-2" : ""}
                >
                  <LocalizedLink
                    to="services"
                    hash={service.id}
                    className="block h-full"
                    style={{ perspective: "1000px" }}
                  >
                    <TiltCard className="group rounded-2xl overflow-hidden bg-white border border-border/50 shadow-md hover:shadow-2xl transition-shadow duration-500 h-full flex flex-col">
                      <div className={`w-full overflow-hidden ${isFeatured ? "h-64 lg:h-80" : "h-40"}`}>
                        <img
                          src={service.image}
                          alt={service.translations[lang].title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                      </div>
                      <div className={`flex-1 ${isFeatured ? "p-7" : "p-5"}`}>
                        <h3 className={`font-semibold text-foreground mb-2 group-hover:text-primary transition-colors ${isFeatured ? "text-2xl font-serif" : "text-lg"}`}>
                          {service.translations[lang].title}
                        </h3>
                        <p className={`text-muted-foreground leading-relaxed ${isFeatured ? "text-base" : "text-sm"}`}>
                          {service.translations[lang].shortDesc}
                        </p>
                        <div className="flex flex-wrap gap-2 mt-3">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 text-xs font-medium">
                            {t("services.privatBadge")}
                          </span>
                          {service.mitVerordnung && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-50 text-green-600 text-xs font-medium">
                              {t("services.verordnungBadge")}
                            </span>
                          )}
                        </div>
                      </div>
                    </TiltCard>
                  </LocalizedLink>
                </AnimateOnScroll>
              );
            })}
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

      {/* ═══ WHY US — 2-column ═══ */}
      <section className="py-24 md:py-32 relative overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <AnimateOnScroll>
              <p className="text-xs font-medium tracking-widest uppercase text-primary mb-3">
                {t("home.whyLabel")}
              </p>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6 leading-tight">
                {t("home.whyTitle")}
              </h2>
              <MagneticButton strength={8}>
                <LocalizedLink to="booking">
                  <Button size="lg" className="rounded-full px-8 text-base gap-2">
                    {t("home.ctaButton")} <ArrowRight className="w-5 h-5" />
                  </Button>
                </LocalizedLink>
              </MagneticButton>
            </AnimateOnScroll>

            <div className="space-y-3">
              {([
                { title: t("home.whyInsurance"), desc: t("home.whyInsuranceDesc"), icon: Shield },
                { title: t("home.whyMedical"), desc: t("home.whyMedicalDesc"), icon: Stethoscope },
                { title: t("home.whyModern"), desc: t("home.whyModernDesc"), icon: Sparkles },
                { title: t("home.whyGentle"), desc: t("home.whyGentleDesc"), icon: Heart },
                { title: t("home.whyLocations"), desc: t("home.whyLocationsDesc"), icon: MapPin },
              ] as const).map((item, i) => (
                <AnimateOnScroll key={i} delay={i * 0.06}>
                  <div className="flex gap-4 p-4 rounded-xl hover:bg-primary/5 transition-colors duration-300">
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

          {featuredReview && (
            <AnimateOnScroll className="max-w-3xl mx-auto mb-10">
              <div style={{ perspective: "1200px" }}>
                <TiltCard maxTilt={4} className="relative rounded-2xl bg-white border border-border/50 shadow-xl p-8 md:p-10">
                  <Quote className="absolute top-6 right-6 w-12 h-12 text-primary/10" />
                  <div className="flex gap-0.5 mb-4">
                    {Array.from({ length: featuredReview.rating }).map((_, j) => (
                      <Star key={j} className="w-5 h-5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-lg md:text-xl text-foreground leading-relaxed mb-6 font-serif italic">
                    "{featuredReview.text}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-clinic-teal flex items-center justify-center">
                      <span className="text-sm font-bold text-white">{featuredReview.name.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{featuredReview.name}</p>
                      <p className="text-xs text-muted-foreground">{featuredReview.date}</p>
                    </div>
                  </div>
                </TiltCard>
              </div>
            </AnimateOnScroll>
          )}

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {gridReviews.map((review, i) => (
              <AnimateOnScroll key={review.name} delay={i * 0.08}>
                <div style={{ perspective: "800px" }}>
                  <TiltCard maxTilt={5} className="rounded-2xl bg-white border border-border/50 shadow-md p-5 h-full hover:shadow-xl transition-shadow duration-300">
                    <div className="flex gap-0.5 mb-3">
                      {Array.from({ length: review.rating }).map((_, j) => (
                        <Star key={j} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <p className="text-sm text-foreground leading-relaxed mb-4">"{review.text}"</p>
                    <p className="text-xs text-muted-foreground">
                      <span className="font-medium text-foreground">{review.name}</span> · {review.date}
                    </p>
                  </TiltCard>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="py-24 md:py-32 relative overflow-hidden" style={{ background: '#F8FAFC' }}>
        <AnimateOnScroll className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <AnimatedText
            text={t("home.ctaTitle")}
            as="h2"
            className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4"
          />
          <p className="text-muted-foreground mb-6">
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
