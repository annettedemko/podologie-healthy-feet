import { Phone, Mail, MapPin, ExternalLink } from "lucide-react";
import { locations } from "@/data/locations";
import { useLanguage, LocalizedLink } from "@/i18n";

export default function ClinicFooter() {
  const { t, lang } = useLanguage();
  const augsburg = locations.find((l) => l.id === "augsburg")!;
  const muenchen = locations.find((l) => l.id === "muenchen")!;

  return (
    <footer className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand + Navigation */}
          <div>
            <div className="mb-4">
              <img
                src="/Healthy Feet Logo Color/Healthy Feet White Logo.svg"
                alt="Healthy Feet – Podologische Praxis"
                className="h-10 w-auto"
              />
            </div>
            <p className="text-sm opacity-60 leading-relaxed mb-6">
              {t("footer.description")}
            </p>
            <h4 className="font-semibold text-sm mb-3">{t("footer.navigation")}</h4>
            <nav className="flex flex-col gap-2">
              <LocalizedLink to="home" className="text-sm opacity-60 hover:opacity-100 transition-opacity">{t("nav.home")}</LocalizedLink>
              <LocalizedLink to="services" className="text-sm opacity-60 hover:opacity-100 transition-opacity">{t("nav.services")}</LocalizedLink>
              <LocalizedLink to="locations" className="text-sm opacity-60 hover:opacity-100 transition-opacity">{t("nav.locations")}</LocalizedLink>
              <LocalizedLink to="blog" className="text-sm opacity-60 hover:opacity-100 transition-opacity">{t("nav.blog")}</LocalizedLink>
              <LocalizedLink to="faq" className="text-sm opacity-60 hover:opacity-100 transition-opacity">{t("nav.faq")}</LocalizedLink>
              <LocalizedLink to="booking" className="text-sm opacity-60 hover:opacity-100 transition-opacity">{t("nav.booking")}</LocalizedLink>
            </nav>
          </div>

          {/* München */}
          <div>
            <h4 className="font-semibold text-sm mb-4">{t("footer.contactMunich")}</h4>
            <div className="flex flex-col gap-3">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${muenchen.address}, ${muenchen.zip}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 text-sm opacity-60 hover:opacity-100 transition-opacity"
              >
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" /> {muenchen.address}, {muenchen.zip}
              </a>
              <a href={`tel:${muenchen.phone}`} className="flex items-center gap-2 text-sm opacity-60 hover:opacity-100 transition-opacity">
                <Phone className="w-4 h-4" /> {muenchen.phoneDisplay}
              </a>
              <a href={`mailto:${muenchen.email}`} className="flex items-center gap-2 text-sm opacity-60 hover:opacity-100 transition-opacity">
                <Mail className="w-4 h-4" /> {muenchen.email}
              </a>
            </div>
            <div className="mt-4 text-sm opacity-60 space-y-1">
              {muenchen.hours[lang].map((h) => (
                <p key={h.days}>{h.days}: {h.time}</p>
              ))}
            </div>
          </div>

          {/* Augsburg */}
          <div>
            <h4 className="font-semibold text-sm mb-4">{t("footer.contactAugsburg")}</h4>
            <div className="flex flex-col gap-3">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${augsburg.address}, ${augsburg.zip}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 text-sm opacity-60 hover:opacity-100 transition-opacity"
              >
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" /> {augsburg.address}, {augsburg.zip}
              </a>
              <a href={`tel:${augsburg.phone}`} className="flex items-center gap-2 text-sm opacity-60 hover:opacity-100 transition-opacity">
                <Phone className="w-4 h-4" /> {augsburg.phoneDisplay}
              </a>
              <a href={`mailto:${augsburg.email}`} className="flex items-center gap-2 text-sm opacity-60 hover:opacity-100 transition-opacity">
                <Mail className="w-4 h-4" /> {augsburg.email}
              </a>
            </div>
            <div className="mt-4 text-sm opacity-60 space-y-1">
              {augsburg.hours[lang].map((h) => (
                <p key={h.days}>{h.days}: {h.time}</p>
              ))}
            </div>
            {augsburg.ownWebsite && (
              <a
                href={augsburg.ownWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 text-xs text-background/70 hover:text-background border border-background/20 hover:border-background/50 rounded-full px-3 py-1.5 transition-colors"
              >
                {t("locations.visitWebsite")}
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-sm mb-4">{t("footer.legal")}</h4>
            <nav className="flex flex-col gap-2">
              <LocalizedLink to="imprint" className="text-sm opacity-60 hover:opacity-100 transition-opacity">{t("footer.imprint")}</LocalizedLink>
              <LocalizedLink to="privacy" className="text-sm opacity-60 hover:opacity-100 transition-opacity">{t("footer.privacy")}</LocalizedLink>
            </nav>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-background/10 text-center">
          <p className="text-xs opacity-40">{t("footer.copyright").replace("{year}", String(new Date().getFullYear()))}</p>
        </div>
      </div>
    </footer>
  );
}
