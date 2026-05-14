import { CalendarCheck, MapPin, Phone, Sparkles, Clock, ExternalLink } from "lucide-react";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import SEOHead from "@/components/SEOHead";
import PageTransition from "@/components/PageTransition";
import BookingWizard from "@/components/booking/BookingWizard";
import { getLocation } from "@/data/locations";
import { useLanguage, getLocalizedPath } from "@/i18n";

export default function Booking() {
  const { t, lang } = useLanguage();
  const muenchen = getLocation("muenchen");
  const augsburg = getLocation("augsburg");

  return (
    <PageTransition>
      <SEOHead
        title={t("booking.seoTitle")}
        description={t("booking.seoDescription")}
        path={getLocalizedPath("booking", lang)}
        routeKey="booking"
      />

      <section className="py-12 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
              <CalendarCheck className="w-3.5 h-3.5" />
              {t("booking.munichOnlyTitle")}
            </div>
            <h1 className="text-3xl md:text-5xl font-serif font-bold text-foreground mb-3">
              {t("booking.title")}
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              {t("booking.description")}
            </p>
          </AnimateOnScroll>

          {/* Praxis Munich card */}
          {muenchen && (
            <AnimateOnScroll delay={0.05} className="mb-6">
              <div className="rounded-2xl bg-primary/5 border border-primary/15 p-4 sm:p-5 grid sm:grid-cols-3 gap-4 text-sm">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">
                      {muenchen.city}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      {muenchen.address}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">
                      {muenchen.hours[lang][0].days}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      {muenchen.hours[lang][0].time}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-foreground">
                      {t("locations.phone")}
                    </p>
                    <a
                      href={`tel:${muenchen.phone}`}
                      className="text-primary text-xs hover:underline truncate block"
                    >
                      {muenchen.phoneDisplay}
                    </a>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
          )}

          {/* The wizard */}
          <AnimateOnScroll delay={0.1}>
            <BookingWizard />
          </AnimateOnScroll>

          {/* Augsburg footnote */}
          {augsburg?.ownWebsite && (
            <AnimateOnScroll delay={0.12} className="mt-4">
              <a
                href={augsburg.ownWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-xl border border-border bg-background hover:border-primary/40 transition-colors p-3 text-center text-xs text-muted-foreground hover:text-foreground"
              >
                {t("booking.munichOnlyText")}{" "}
                <span className="text-primary font-medium inline-flex items-center gap-1">
                  {t("locations.visitWebsite")} <ExternalLink className="w-3 h-3" />
                </span>
              </a>
            </AnimateOnScroll>
          )}

          {/* How it works */}
          <AnimateOnScroll delay={0.15} className="mt-10">
            <div className="rounded-2xl bg-muted/30 p-5 sm:p-6">
              <p className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                {t("booking.howItWorksTitle")}
              </p>
              <ol className="grid sm:grid-cols-3 gap-3 sm:gap-4 text-sm">
                {[
                  t("booking.howItWorksStep1"),
                  t("booking.howItWorksStep2"),
                  t("booking.howItWorksStep3"),
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                      {i + 1}
                    </span>
                    <span className="text-muted-foreground leading-snug pt-0.5">
                      {step}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </PageTransition>
  );
}
