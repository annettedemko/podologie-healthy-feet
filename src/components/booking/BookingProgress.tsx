import { useLanguage } from "@/i18n";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { TOTAL_STEPS } from "@/lib/booking/schema";

const STEP_LABELS = [
  "booking.step1Label",
  "booking.step2Label",
  "booking.step3Label",
  "booking.step4Label",
] as const;

interface Props {
  current: number;
  onJumpBack: (step: number) => void;
}

export default function BookingProgress({ current, onJumpBack }: Props) {
  const { t } = useLanguage();
  const percent = ((current + 1) / TOTAL_STEPS) * 100;

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-2 text-xs text-muted-foreground">
        <span className="font-medium text-foreground">
          {t("booking.stepCounter")
            .replace("{current}", String(current + 1))
            .replace("{total}", String(TOTAL_STEPS))}
        </span>
        <span className="hidden sm:inline">
          {t(STEP_LABELS[current])}
        </span>
      </div>
      <div className="h-1.5 w-full bg-primary/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-primary rounded-full"
          initial={false}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>

      {/* step dots — clickable to jump back, never forward */}
      <div className="mt-4 grid grid-cols-4 gap-2">
        {STEP_LABELS.map((labelKey, i) => {
          const done = i < current;
          const active = i === current;
          const clickable = i < current;
          return (
            <button
              key={labelKey}
              type="button"
              disabled={!clickable}
              onClick={() => clickable && onJumpBack(i)}
              className={`flex items-center gap-2 text-left rounded-xl px-2.5 py-2 transition-colors ${
                clickable
                  ? "hover:bg-muted/60 cursor-pointer"
                  : "cursor-default"
              }`}
            >
              <span
                className={`shrink-0 w-6 h-6 rounded-full text-[11px] font-semibold flex items-center justify-center ${
                  done
                    ? "bg-primary text-primary-foreground"
                    : active
                    ? "bg-primary/15 text-primary ring-2 ring-primary"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {done ? <Check className="w-3.5 h-3.5" /> : i + 1}
              </span>
              <span
                className={`hidden md:block text-xs leading-tight truncate ${
                  active ? "text-foreground font-medium" : "text-muted-foreground"
                }`}
              >
                {t(labelKey)}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
