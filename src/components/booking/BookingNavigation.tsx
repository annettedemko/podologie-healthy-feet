import { ArrowLeft, ArrowRight, Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n";
import { TOTAL_STEPS } from "@/lib/booking/schema";

interface Props {
  step: number;
  submitting: boolean;
  canGoNext: boolean;
  onBack: () => void;
  onNext: () => void;
}

export default function BookingNavigation({
  step,
  submitting,
  canGoNext,
  onBack,
  onNext,
}: Props) {
  const { t } = useLanguage();
  const isLast = step === TOTAL_STEPS - 1;

  return (
    <div className="mt-8 flex flex-col-reverse sm:flex-row gap-3 sm:justify-between">
      <Button
        type="button"
        variant="outline"
        onClick={onBack}
        disabled={step === 0 || submitting}
        className="rounded-full px-6 gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        {t("booking.back")}
      </Button>

      {isLast ? (
        <Button
          type="submit"
          disabled={!canGoNext || submitting}
          className="rounded-full px-8 gap-2"
        >
          {submitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              {t("booking.submitting")}
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              {t("booking.submit")}
            </>
          )}
        </Button>
      ) : (
        <Button
          type="button"
          onClick={onNext}
          disabled={submitting}
          className="rounded-full px-8 gap-2"
        >
          {t("booking.next")}
          <ArrowRight className="w-4 h-4" />
        </Button>
      )}
    </div>
  );
}
