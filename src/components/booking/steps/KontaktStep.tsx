import { useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLanguage, LocalizedLink } from "@/i18n";
import { services } from "@/data/services";
import type { BookingInput, ServiceId } from "@/lib/booking/schema";

type Lang = "de" | "en" | "ru";

function BirthDatePicker({
  value,
  onChange,
  lang,
  t,
}: {
  value: string;
  onChange: (v: string) => void;
  lang: Lang;
  t: (k: "booking.birthDay" | "booking.birthMonth" | "booking.birthYear") => string;
}) {
  const [yPart, mPart, dPart] = value ? value.split("-") : ["", "", ""];

  const localeMap: Record<Lang, string> = { de: "de-DE", en: "en-GB", ru: "ru-RU" };

  const months = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        value: String(i + 1).padStart(2, "0"),
        label: new Intl.DateTimeFormat(localeMap[lang], { month: "long" }).format(
          new Date(2000, i, 1)
        ),
      })),
    [lang]
  );

  const currentYear = new Date().getFullYear();
  const years = useMemo(() => {
    const arr: string[] = [];
    for (let yr = currentYear; yr >= 1920; yr--) arr.push(String(yr));
    return arr;
  }, [currentYear]);

  const dayCount = useMemo(() => {
    if (!yPart || !mPart) return 31;
    return new Date(Number(yPart), Number(mPart), 0).getDate();
  }, [yPart, mPart]);

  const days = useMemo(
    () => Array.from({ length: dayCount }, (_, i) => String(i + 1).padStart(2, "0")),
    [dayCount]
  );

  const update = (year: string, month: string, day: string) => {
    if (year && month && day) {
      const dayNum = Number(day);
      const lastDay = new Date(Number(year), Number(month), 0).getDate();
      const validDay = Math.min(dayNum, lastDay);
      onChange(`${year}-${month.padStart(2, "0")}-${String(validDay).padStart(2, "0")}`);
    } else if (!year && !month && !day) {
      onChange("");
    } else {
      // Partial — store but mark invalid by leaving missing parts
      onChange(
        [year || "", (month || "").padStart(2, "0"), (day || "").padStart(2, "0")]
          .filter(Boolean)
          .join("-")
      );
    }
  };

  return (
    <div className="grid grid-cols-3 gap-2">
      <Select value={dPart} onValueChange={(v) => update(yPart, mPart, v)}>
        <SelectTrigger className="rounded-xl">
          <SelectValue placeholder={t("booking.birthDay")} />
        </SelectTrigger>
        <SelectContent>
          {days.map((dd) => (
            <SelectItem key={dd} value={dd}>
              {Number(dd)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select value={mPart} onValueChange={(v) => update(yPart, v, dPart)}>
        <SelectTrigger className="rounded-xl">
          <SelectValue placeholder={t("booking.birthMonth")} />
        </SelectTrigger>
        <SelectContent>
          {months.map((mo) => (
            <SelectItem key={mo.value} value={mo.value}>
              {mo.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select value={yPart} onValueChange={(v) => update(v, mPart, dPart)}>
        <SelectTrigger className="rounded-xl">
          <SelectValue placeholder={t("booking.birthYear")} />
        </SelectTrigger>
        <SelectContent className="max-h-[300px]">
          {years.map((yr) => (
            <SelectItem key={yr} value={yr}>
              {yr}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

function fieldError(message: string | undefined, t: (k: string) => string): string | null {
  if (!message) return null;
  return t(message) || message;
}

function serviceTitle(id: ServiceId, lang: "de" | "en" | "ru", t: (k: string) => string): string {
  if (id === "beratung") return t("booking.serviceBeratungTitle");
  return services.find((s) => s.id === id)?.translations[lang].title ?? id;
}

const LOCALE_MAP: Record<"de" | "en" | "ru", string> = {
  de: "de-DE",
  en: "en-GB",
  ru: "ru-RU",
};

function formatSlot(iso: string, lang: "de" | "en" | "ru"): string {
  const date = new Date(iso);
  const dayFmt = new Intl.DateTimeFormat(LOCALE_MAP[lang], {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "Europe/Berlin",
  });
  const timeFmt = new Intl.DateTimeFormat(LOCALE_MAP[lang], {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Berlin",
  });
  return `${dayFmt.format(date)} · ${timeFmt.format(date)}`;
}

export default function KontaktStep() {
  const { t, lang } = useLanguage();
  const form = useFormContext<BookingInput>();
  const errors = form.formState.errors;
  const consent = form.watch("consent");
  const values = form.watch();

  return (
    <div>
      <h2 className="text-xl sm:text-2xl font-serif font-bold text-foreground mb-1.5">
        {t("booking.step4Title")}
      </h2>
      <p className="text-sm text-muted-foreground mb-6">
        {t("booking.step4Description")}
      </p>

      {/* Summary of previous steps */}
      <div className="rounded-xl bg-primary/5 border border-primary/15 p-4 mb-6 space-y-2 text-sm">
        <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-1">
          {t("booking.summaryTitle")}
        </p>
        {values.service && (
          <div className="flex justify-between gap-4">
            <span className="text-muted-foreground">
              {t("booking.summaryService")}
            </span>
            <span className="font-medium text-foreground text-right">
              {serviceTitle(values.service as ServiceId, lang, t)}
            </span>
          </div>
        )}
        {values.insurance && (
          <div className="flex justify-between gap-4">
            <span className="text-muted-foreground">
              {t("booking.summaryInsurance")}
            </span>
            <span className="font-medium text-foreground text-right">
              {values.insurance === "kasse_verordnung"
                ? t("booking.insKasseShort")
                : t("booking.insPrivatShort")}
            </span>
          </div>
        )}
        {values.slotTime && (
          <div className="flex justify-between gap-4">
            <span className="text-muted-foreground">
              {t("booking.summaryDate")}
            </span>
            <span className="font-medium text-foreground text-right">
              {formatSlot(values.slotTime, lang)}
            </span>
          </div>
        )}
      </div>

      {/* Contact fields */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <label
            htmlFor="hf-name"
            className="text-sm font-medium text-foreground block mb-1.5"
          >
            {t("booking.nameLabel")} *
          </label>
          <Input
            id="hf-name"
            autoComplete="name"
            placeholder={t("booking.namePlaceholder")}
            className="rounded-xl"
            aria-invalid={!!errors.name}
            aria-describedby={t("booking.nameHint") ? "hf-name-hint" : undefined}
            {...form.register("name")}
          />
          {t("booking.nameHint") && (
            <p id="hf-name-hint" className="mt-1 text-xs text-muted-foreground">
              {t("booking.nameHint")}
            </p>
          )}
          {errors.name?.message && (
            <p className="mt-1 text-xs text-destructive flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              {fieldError(errors.name.message as string, t)}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="hf-phone"
            className="text-sm font-medium text-foreground block mb-1.5"
          >
            {t("booking.phoneLabel")} *
          </label>
          <Input
            id="hf-phone"
            type="tel"
            autoComplete="tel"
            placeholder={t("booking.phonePlaceholder")}
            className="rounded-xl"
            aria-invalid={!!errors.phone}
            {...form.register("phone")}
          />
          {errors.phone?.message && (
            <p className="mt-1 text-xs text-destructive flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              {fieldError(errors.phone.message as string, t)}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="hf-email"
            className="text-sm font-medium text-foreground block mb-1.5"
          >
            {t("booking.emailLabelStar")} *
          </label>
          <Input
            id="hf-email"
            type="email"
            autoComplete="email"
            placeholder={t("booking.emailPlaceholder")}
            className="rounded-xl"
            aria-invalid={!!errors.email}
            {...form.register("email")}
          />
          {errors.email?.message && (
            <p className="mt-1 text-xs text-destructive flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              {fieldError(errors.email.message as string, t)}
            </p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label className="text-sm font-medium text-foreground block mb-1.5">
            {t("booking.birthLabel")}
          </label>
          <BirthDatePicker
            value={form.watch("birthDate") ?? ""}
            onChange={(v) =>
              form.setValue("birthDate", v, { shouldValidate: true, shouldDirty: true })
            }
            lang={lang}
            t={t}
          />
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="hf-notes"
            className="text-sm font-medium text-foreground block mb-1.5"
          >
            {t("booking.notesLabel")}
          </label>
          <Textarea
            id="hf-notes"
            placeholder={t("booking.notesPlaceholder")}
            className="rounded-xl min-h-[100px]"
            {...form.register("notes")}
          />
        </div>
      </div>

      {/* DSGVO consent */}
      <div className="mt-6 rounded-xl bg-muted/40 p-4">
        <label className="flex items-start gap-3 cursor-pointer">
          <Checkbox
            checked={consent === true}
            onCheckedChange={(v) =>
              form.setValue("consent", v === true, {
                shouldValidate: true,
                shouldDirty: true,
              })
            }
            aria-invalid={!!errors.consent}
            className="mt-0.5"
          />
          <span className="text-xs text-muted-foreground leading-relaxed">
            {t("booking.consentLabel")}{" "}
            <LocalizedLink
              to="privacy"
              className="text-primary hover:underline"
            >
              {t("booking.consentLink")}
            </LocalizedLink>
            . *
          </span>
        </label>
        {errors.consent?.message && (
          <p className="mt-2 text-xs text-destructive flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            {t("errors.consent")}
          </p>
        )}
      </div>
    </div>
  );
}
