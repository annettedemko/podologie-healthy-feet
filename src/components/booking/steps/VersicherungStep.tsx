import { useFormContext } from "react-hook-form";
import { Check, Shield, Wallet, Sparkles, AlertCircle } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { useLanguage } from "@/i18n";
import {
  INSURANCE_OPTIONS,
  type BookingInput,
  type InsuranceOption,
} from "@/lib/booking/schema";

export default function VersicherungStep() {
  const { t } = useLanguage();
  const form = useFormContext<BookingInput>();
  const selected = form.watch("insurance");
  const isFirstVisit = form.watch("isFirstVisit");
  const hasDiabetes = form.watch("hasDiabetes");
  const error = form.formState.errors.insurance;

  const options: {
    id: InsuranceOption;
    icon: typeof Shield;
    titleKey: Parameters<typeof t>[0];
    descKey: Parameters<typeof t>[0];
    badgeKey: Parameters<typeof t>[0];
    badgeColor: "green" | "blue";
  }[] = [
    {
      id: "kasse_verordnung",
      icon: Shield,
      titleKey: "booking.insKasseTitle",
      descKey: "booking.insKasseDesc",
      badgeKey: "booking.insKasseBadge",
      badgeColor: "green",
    },
    {
      id: "privat",
      icon: Wallet,
      titleKey: "booking.insPrivatTitle",
      descKey: "booking.insPrivatDesc",
      badgeKey: "booking.insPrivatBadge",
      badgeColor: "blue",
    },
  ].filter((o) => INSURANCE_OPTIONS.includes(o.id));

  return (
    <div>
      <h2 className="text-xl sm:text-2xl font-serif font-bold text-foreground mb-1.5">
        {t("booking.step2Title")}
      </h2>
      <p className="text-sm text-muted-foreground mb-6">
        {t("booking.step2Description")}
      </p>

      <div role="radiogroup" className="space-y-3">
        {options.map((opt) => {
          const Icon = opt.icon;
          const isSelected = selected === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() =>
                form.setValue("insurance", opt.id, {
                  shouldValidate: true,
                  shouldDirty: true,
                })
              }
              className={`w-full text-left rounded-xl border-2 p-5 transition-all ${
                isSelected
                  ? "border-primary bg-primary/5 shadow-sm"
                  : "border-border hover:border-primary/40 hover:bg-muted/30"
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 ${
                    isSelected
                      ? "bg-primary text-primary-foreground"
                      : "bg-primary/10 text-primary"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <p className="font-semibold text-foreground">
                      {t(opt.titleKey)}
                    </p>
                    <span
                      className={`text-[11px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap ${
                        opt.badgeColor === "green"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {t(opt.badgeKey)}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-snug">
                    {t(opt.descKey)}
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
        <p className="mt-3 text-sm text-destructive flex items-center gap-1.5">
          <AlertCircle className="w-3.5 h-3.5" />
          {t("errors.insurance")}
        </p>
      )}

      <div className="mt-8 space-y-4">
        <p className="text-sm font-medium text-foreground flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-primary" />
          {t("booking.extrasTitle")}
        </p>

        <label className="flex items-start gap-3 cursor-pointer group">
          <Checkbox
            checked={isFirstVisit}
            onCheckedChange={(v) =>
              form.setValue("isFirstVisit", v === true, { shouldDirty: true })
            }
            className="mt-0.5"
          />
          <div className="text-sm">
            <span className="font-medium text-foreground group-hover:text-primary transition-colors">
              {t("booking.firstVisitLabel")}
            </span>
            <p className="text-xs text-muted-foreground mt-0.5">
              {t("booking.firstVisitDesc")}
            </p>
          </div>
        </label>

        <label className="flex items-start gap-3 cursor-pointer group">
          <Checkbox
            checked={hasDiabetes}
            onCheckedChange={(v) =>
              form.setValue("hasDiabetes", v === true, { shouldDirty: true })
            }
            className="mt-0.5"
          />
          <div className="text-sm">
            <span className="font-medium text-foreground group-hover:text-primary transition-colors">
              {t("booking.diabetesLabel")}
            </span>
            <p className="text-xs text-muted-foreground mt-0.5">
              {t("booking.diabetesDesc")}
            </p>
          </div>
        </label>
      </div>
    </div>
  );
}
