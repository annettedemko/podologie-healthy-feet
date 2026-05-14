import { useFormContext } from "react-hook-form";
import { HelpCircle, Check } from "lucide-react";
import { useLanguage } from "@/i18n";
import { services } from "@/data/services";
import {
  SERVICE_IDS,
  type BookingInput,
  type ServiceId,
} from "@/lib/booking/schema";

const beratungOption = {
  id: "beratung" as ServiceId,
  icon: HelpCircle,
  image: "",
};

export default function AnlassStep() {
  const { t, lang } = useLanguage();
  const form = useFormContext<BookingInput>();
  const selected = form.watch("service");
  const error = form.formState.errors.service;

  const allOptions = [
    ...services.map((s) => ({
      id: s.id as ServiceId,
      icon: s.icon,
      title: s.translations[lang].title,
      desc: s.translations[lang].shortDesc,
    })),
    {
      id: beratungOption.id,
      icon: beratungOption.icon,
      title: t("booking.serviceBeratungTitle"),
      desc: t("booking.serviceBeratungDesc"),
    },
  ].filter((o) => SERVICE_IDS.includes(o.id));

  const select = (id: ServiceId) => {
    form.setValue("service", id, { shouldValidate: true, shouldDirty: true });
  };

  return (
    <div>
      <h2 className="text-xl sm:text-2xl font-serif font-bold text-foreground mb-1.5">
        {t("booking.step1Title")}
      </h2>
      <p className="text-sm text-muted-foreground mb-6">
        {t("booking.step1Description")}
      </p>

      <div
        role="radiogroup"
        aria-labelledby="anlass-heading"
        className="grid sm:grid-cols-2 gap-3"
      >
        {allOptions.map((opt) => {
          const Icon = opt.icon;
          const isSelected = selected === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => select(opt.id)}
              className={`group relative text-left rounded-xl border-2 p-4 transition-all ${
                isSelected
                  ? "border-primary bg-primary/5 shadow-sm"
                  : "border-border hover:border-primary/40 hover:bg-muted/30"
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                    isSelected
                      ? "bg-primary text-primary-foreground"
                      : "bg-primary/10 text-primary"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-foreground text-sm leading-tight mb-1">
                    {opt.title}
                  </p>
                  <p className="text-xs text-muted-foreground line-clamp-2 leading-snug">
                    {opt.desc}
                  </p>
                </div>
                {isSelected && (
                  <Check className="w-4 h-4 text-primary shrink-0 mt-1" />
                )}
              </div>
            </button>
          );
        })}
      </div>

      {error && (
        <p className="mt-3 text-sm text-destructive">
          {t(error.message as Parameters<typeof t>[0]) || t("errors.service")}
        </p>
      )}
    </div>
  );
}
