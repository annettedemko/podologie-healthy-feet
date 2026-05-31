import { useEffect, useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";
import { de as deLocale, enGB, ru as ruLocale } from "date-fns/locale";
import { AlertCircle, Loader2, Check, Calendar as CalendarIcon, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar } from "@/components/ui/calendar";
import { useIsMobile } from "@/hooks/use-mobile";
import { useLanguage } from "@/i18n";
import type { BookingInput } from "@/lib/booking/schema";
import { OPEN_WINDOWS, slotsForDate } from "@/lib/booking/config";

type RemoteSlot = {
  iso: string;
  date: string;
  time: string;
  capacity: number;
  taken: number;
  available: number;
};

const DATE_FNS_LOCALES = {
  de: deLocale,
  en: enGB,
  ru: ruLocale,
} as const;

function ymdLocal(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function dateFromYmd(ymd: string): Date {
  const [y, m, d] = ymd.split("-").map(Number);
  return new Date(y, m - 1, d, 12, 0, 0); // noon to dodge DST edges
}

function isInOpenWindow(ymd: string): boolean {
  for (const w of OPEN_WINDOWS) {
    if (ymd >= w.from && ymd <= w.to) return true;
  }
  return false;
}


const calendarBoundaries = (() => {
  const all = OPEN_WINDOWS.map((w) => w.from)
    .concat(OPEN_WINDOWS.map((w) => w.to))
    .sort();
  return {
    fromMonth: dateFromYmd(all[0]),
    toMonth: dateFromYmd(all[all.length - 1]),
  };
})();

export default function WunschterminStep() {
  const { t, lang } = useLanguage();
  const isMobile = useIsMobile();
  const form = useFormContext<BookingInput>();
  const selected = form.watch("slotTime");
  const error = form.formState.errors.slotTime;

  const initialDate: Date | undefined = selected
    ? dateFromYmd(selected.slice(0, 10))
    : dateFromYmd(OPEN_WINDOWS[0].from);

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(initialDate);

  const [slotsByDate, setSlotsByDate] = useState<Record<string, RemoteSlot[]> | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setLoadError(null);
    fetch("/api/availability", { headers: { Accept: "application/json" } })
      .then(async (r) => {
        if (!r.ok) throw new Error(`status ${r.status}`);
        return (await r.json()) as { slots: RemoteSlot[] };
      })
      .then((data) => {
        if (cancelled) return;
        const grouped: Record<string, RemoteSlot[]> = {};
        for (const s of data.slots) {
          if (!grouped[s.date]) grouped[s.date] = [];
          grouped[s.date].push(s);
        }
        setSlotsByDate(grouped);
        setLoading(false);
      })
      .catch(() => {
        if (cancelled) return;
        const fallback: Record<string, RemoteSlot[]> = {};
        for (const w of OPEN_WINDOWS) {
          for (let d = dateFromYmd(w.from); ymdLocal(d) <= w.to; d.setDate(d.getDate() + 1)) {
            const ymd = ymdLocal(d);
            const dow = d.getDay();
            if (dow === 0 || dow === 6) continue;
            fallback[ymd] = slotsForDate(ymd).map((s) => ({
              iso: s.iso, date: ymd, time: s.time,
              capacity: s.capacity, taken: 0, available: s.capacity,
            }));
          }
        }
        setSlotsByDate(fallback);
        setLoadError(t("booking.availabilityOffline"));
        setLoading(false);
      });
    return () => { cancelled = true; };
  }, [t]);

  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  // Mark days that are bookable (in window + weekday + not past + has any free slot)
  const bookableDates: Date[] = useMemo(() => {
    if (!slotsByDate) return [];
    const out: Date[] = [];
    for (const [ymd, slots] of Object.entries(slotsByDate)) {
      const totalFree = slots.reduce((s, x) => s + x.available, 0);
      if (totalFree > 0) out.push(dateFromYmd(ymd));
    }
    return out;
  }, [slotsByDate]);

  const fullyBookedDates: Date[] = useMemo(() => {
    if (!slotsByDate) return [];
    const out: Date[] = [];
    for (const [ymd, slots] of Object.entries(slotsByDate)) {
      const totalFree = slots.reduce((s, x) => s + x.available, 0);
      if (totalFree === 0) out.push(dateFromYmd(ymd));
    }
    return out;
  }, [slotsByDate]);

  const isDateDisabled = (date: Date): boolean => {
    if (date < today) return true;
    const dow = date.getDay();
    if (dow === 0 || dow === 6) return true;
    if (!isInOpenWindow(ymdLocal(date))) return true;
    // Mark fully-booked days as disabled too — but we want them visually distinct, so allow
    // selection only if the date appears in slotsByDate with available>0.
    if (slotsByDate) {
      const slots = slotsByDate[ymdLocal(date)];
      if (slots && slots.every((s) => s.available === 0)) return true;
    }
    return false;
  };

  const selectedYmd = selectedDate ? ymdLocal(selectedDate) : null;
  const daySlots = selectedYmd ? slotsByDate?.[selectedYmd] ?? [] : [];

  const pickSlot = (iso: string) => {
    form.setValue("slotTime", iso, { shouldValidate: true, shouldDirty: true });
  };

  // Auto-pick first open date once availability loads, if user hasn't picked yet
  useEffect(() => {
    if (!slotsByDate || selectedDate || selected) return;
    const first = bookableDates[0];
    if (first) setSelectedDate(first);
  }, [slotsByDate, selectedDate, selected, bookableDates]);

  // Sync `selected` from form (e.g. on bounce-back from slot_taken)
  useEffect(() => {
    if (selected && (!selectedDate || ymdLocal(selectedDate) !== selected.slice(0, 10))) {
      setSelectedDate(dateFromYmd(selected.slice(0, 10)));
    }
  }, [selected, selectedDate]);

  return (
    <div>
      <h2 className="text-xl sm:text-2xl font-serif font-bold text-foreground mb-1.5">
        {t("booking.step3Title")}
      </h2>
      <p className="text-sm text-muted-foreground mb-6">
        {t("booking.step3Description")}
      </p>

      {loadError && (
        <div className="mb-4 rounded-lg border border-amber-300 bg-amber-50 text-amber-900 p-3 text-xs">
          {loadError}
        </div>
      )}

      <label className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
        <CalendarIcon className="w-4 h-4 text-primary" />
        {t("booking.dateLabel")}
      </label>

      <div className="rounded-xl border border-border bg-background overflow-hidden flex justify-center mb-2">
        <Calendar
          mode="single"
          locale={DATE_FNS_LOCALES[lang]}
          weekStartsOn={1}
          numberOfMonths={isMobile ? 1 : 2}
          selected={selectedDate}
          onSelect={(d) => {
            if (d) setSelectedDate(d);
          }}
          disabled={isDateDisabled}
          fromMonth={calendarBoundaries.fromMonth}
          toMonth={calendarBoundaries.toMonth}
          defaultMonth={selectedDate ?? calendarBoundaries.fromMonth}
          modifiers={{
            bookable: bookableDates,
            fullyBooked: fullyBookedDates,
          }}
          modifiersClassNames={{
            bookable: "hf-day-bookable",
            fullyBooked: "hf-day-full",
          }}
          className="p-4"
        />
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 mb-6 text-[11px] text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-primary/20 border border-primary/60" />
          {t("booking.legendBookable")}
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-rose-100 border border-rose-300" />
          {t("booking.legendFull")}
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-muted border border-border" />
          {t("booking.legendClosed")}
        </span>
      </div>

      {/* Slots for selected date */}
      {selectedDate && !isDateDisabled(selectedDate) && (
        <>
          <label className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
            <Clock className="w-4 h-4 text-primary" />
            {t("booking.timeLabel")}
          </label>

          {loading ? (
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="h-14 rounded-xl bg-muted/50 animate-pulse" />
              ))}
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedYmd}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="grid grid-cols-3 sm:grid-cols-4 gap-2"
              >
                {daySlots.map((slot) => {
                  const isSelected = selected === slot.iso;
                  const isFull = slot.available === 0;
                  return (
                    <button
                      key={slot.iso}
                      type="button"
                      role="radio"
                      aria-checked={isSelected}
                      disabled={isFull}
                      onClick={() => pickSlot(slot.iso)}
                      className={`relative rounded-xl border-2 px-3 py-2.5 text-center transition-all ${
                        isSelected
                          ? "border-primary bg-primary text-primary-foreground shadow-md"
                          : isFull
                          ? "border-border bg-muted/40 text-muted-foreground/50 cursor-not-allowed"
                          : "border-border hover:border-primary/40 hover:bg-muted/30"
                      }`}
                    >
                      <p className={`font-semibold tabular-nums ${
                        isSelected ? "text-primary-foreground" : isFull ? "" : "text-foreground"
                      }`}>
                        {slot.time}
                      </p>
                      {isSelected && (
                        <Check className="w-3.5 h-3.5 absolute top-1.5 right-1.5 text-primary-foreground" />
                      )}
                      <p
                        className={`text-[10px] mt-0.5 ${
                          isSelected
                            ? "text-primary-foreground/80"
                            : isFull
                            ? "text-muted-foreground/60"
                            : "text-emerald-600"
                        }`}
                      >
                        {isFull
                          ? t("booking.slotFull")
                          : slot.available === 1 && slot.capacity > 1
                          ? t("booking.slotLast")
                          : `${slot.available}× ${t("booking.free")}`}
                      </p>
                    </button>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          )}
        </>
      )}

      {error && (
        <p className="mt-3 text-sm text-destructive flex items-center gap-1.5">
          <AlertCircle className="w-3.5 h-3.5" />
          {t("errors.slot")}
        </p>
      )}

      {loading && (
        <p className="mt-4 text-xs text-muted-foreground flex items-center gap-1.5">
          <Loader2 className="w-3 h-3 animate-spin" />
          {t("booking.loadingSlots")}
        </p>
      )}
    </div>
  );
}
