import { Calendar, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { locations, phoneDisplay, phoneHref } from "@/data/locations";
import { useLanguage, LocalizedLink } from "@/i18n";

interface DoctolibWidgetProps {
  locationId?: string;
}

export default function DoctolibWidget({ locationId }: DoctolibWidgetProps) {
  const { t } = useLanguage();
  const location = locationId
    ? locations.find((l) => l.id === locationId)
    : locations.find((l) => l.status === "active");

  if (!location) return null;

  // Doctolib integration placeholder - will be replaced with actual embed
  const hasDoctolibUrl = location.doctolibUrl;

  if (hasDoctolibUrl) {
    return (
      <div className="glass-card rounded-2xl p-6">
        <iframe
          src={location.doctolibUrl}
          title={t("doctolib.iframeTitle")}
          className="w-full h-[600px] rounded-xl border-0"
        />
      </div>
    );
  }

  return (
    <div className="glass-card rounded-2xl p-8 text-center">
      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
        <Calendar className="w-8 h-8 text-primary" />
      </div>
      <h3 className="text-xl font-semibold text-foreground mb-2">
        {t("doctolib.bookTitle")}
      </h3>
      <p className="text-muted-foreground mb-6 max-w-md mx-auto">
        {t("doctolib.bookDescription")}
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-3">
        <a href={phoneHref}>
          <Button size="lg" className="rounded-full px-8 gap-2">
            <Phone className="w-4 h-4" />
            {phoneDisplay}
          </Button>
        </a>
        <LocalizedLink to="contact">
          <Button size="lg" variant="outline" className="rounded-full px-8">
            {t("doctolib.contactForm")}
          </Button>
        </LocalizedLink>
      </div>
    </div>
  );
}
