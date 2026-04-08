import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { getConsent, setConsent } from "@/lib/cookies";
import { useLanguage, LocalizedLink } from "@/i18n";

export default function CookieConsent() {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!getConsent()) {
      const timer = setTimeout(() => setVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  if (!visible) return null;

  const accept = (type: "all" | "necessary") => {
    setConsent(type);
    setVisible(false);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] p-4">
      <div className="max-w-3xl mx-auto glass-card-strong rounded-2xl p-6 shadow-2xl">
        <h3 className="font-semibold text-foreground mb-2 text-sm">
          {t("cookie.title")}
        </h3>
        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
          {t("cookie.description")}{" "}
          <LocalizedLink to="privacy" className="text-primary hover:underline">
            {t("cookie.learnMore")}
          </LocalizedLink>
        </p>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button
            onClick={() => accept("all")}
            className="rounded-full px-6"
            size="sm"
          >
            {t("cookie.acceptAll")}
          </Button>
          <Button
            onClick={() => accept("necessary")}
            variant="outline"
            className="rounded-full px-6"
            size="sm"
          >
            {t("cookie.onlyNecessary")}
          </Button>
        </div>
      </div>
    </div>
  );
}
