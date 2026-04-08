import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { phoneDisplay, phoneHref } from "@/data/locations";
import { useLanguage, LocalizedLink, type RouteKey } from "@/i18n";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const navLinks: { labelKey: "nav.home" | "nav.services" | "nav.locations" | "nav.about" | "nav.blog" | "nav.contact"; routeKey: RouteKey }[] = [
  { labelKey: "nav.home", routeKey: "home" },
  { labelKey: "nav.services", routeKey: "services" },
  { labelKey: "nav.locations", routeKey: "locations" },
  { labelKey: "nav.about", routeKey: "about" },
  { labelKey: "nav.blog", routeKey: "blog" },
  { labelKey: "nav.contact", routeKey: "contact" },
];

export default function ClinicHeader() {
  const { t, lang } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  return (
    <>
      {/* Announcement Bar for Munich opening */}
      <div className="bg-primary text-primary-foreground text-center text-xs py-1.5 px-4 font-medium">
        {t("header.announcement")}
      </div>

      <header
        className={`fixed top-7 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-background/80 backdrop-blur-xl shadow-sm border-b border-border/50"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <LocalizedLink to="home" className="flex items-center">
              <img
                src="/Healthy Feet Logo Color/Healthy Feet Color Logo.svg"
                alt="Healthy Feet – Podologische Praxis"
                className="h-14 md:h-16 w-auto"
              />
            </LocalizedLink>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const path = `/${lang}/${link.routeKey === "home" ? "" : ""}`;
                return (
                  <LocalizedLink
                    key={link.labelKey}
                    to={link.routeKey}
                    className={`px-3 py-2 text-base transition-colors rounded-lg hover:bg-muted/50 ${
                      location.pathname === path
                        ? "text-primary font-medium"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {t(link.labelKey)}
                  </LocalizedLink>
                );
              })}
            </nav>

            <div className="hidden lg:flex items-center gap-3">
              <LanguageSwitcher />
              <a
                href={phoneHref}
                className="flex items-center gap-1.5 text-base text-muted-foreground hover:text-foreground transition-colors"
              >
                <Phone className="w-4 h-4" />
                {phoneDisplay}
              </a>
              <LocalizedLink to="booking">
                <Button size="sm" className="rounded-full px-5">
                  {t("header.bookAppointment")}
                </Button>
              </LocalizedLink>
            </div>

            {/* Mobile */}
            <div className="flex items-center gap-2 lg:hidden">
              <LanguageSwitcher />
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="p-2 text-foreground"
                aria-label={t("header.menuOpen")}
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-background/95 backdrop-blur-xl border-b border-border">
            <nav className="flex flex-col px-4 py-4 gap-1">
              {navLinks.map((link) => (
                <LocalizedLink
                  key={link.labelKey}
                  to={link.routeKey}
                  className="px-4 py-3 text-sm rounded-lg text-foreground hover:bg-muted"
                >
                  {t(link.labelKey)}
                </LocalizedLink>
              ))}
              <div className="flex items-center gap-2 px-4 py-3 text-sm text-muted-foreground">
                <Phone className="w-4 h-4" />
                <a href={phoneHref}>{phoneDisplay}</a>
              </div>
              <LocalizedLink to="booking" className="mt-2">
                <Button className="w-full rounded-full">{t("header.bookAppointment")}</Button>
              </LocalizedLink>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
