import { useEffect, useMemo, useRef, useState } from "react";
import { useForm, FormProvider, type DefaultValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle } from "lucide-react";

import { useLanguage } from "@/i18n";
import {
  bookingSchema,
  STEP_FIELDS,
  TOTAL_STEPS,
  type Booking,
  type BookingInput,
} from "@/lib/booking/schema";
import { clearDraft, loadDraft, saveDraft } from "@/lib/booking/draft";

import BookingProgress from "./BookingProgress";
import BookingNavigation from "./BookingNavigation";
import BookingSuccess from "./BookingSuccess";
import AnlassStep from "./steps/AnlassStep";
import VersicherungStep from "./steps/VersicherungStep";
import WunschterminStep from "./steps/WunschterminStep";
import KontaktStep from "./steps/KontaktStep";

const baseDefaults: DefaultValues<BookingInput> = {
  isFirstVisit: false,
  hasDiabetes: false,
  name: "",
  phone: "",
  email: "",
  birthDate: "",
  notes: "",
  consent: false,
  website: "",
};

export default function BookingWizard() {
  const { t, lang } = useLanguage();
  const draft = useMemo(() => loadDraft(), []);

  const [step, setStep] = useState<number>(draft?.step ?? 0);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<{ ref?: string } | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const stepHeadingRef = useRef<HTMLDivElement>(null);

  const form = useForm<BookingInput>({
    resolver: zodResolver(bookingSchema),
    mode: "onTouched",
    defaultValues: { ...baseDefaults, ...(draft?.values ?? {}) } as DefaultValues<BookingInput>,
  });

  // Persist draft on changes
  useEffect(() => {
    const sub = form.watch((values) => {
      saveDraft(values as Partial<BookingInput>, step);
    });
    return () => sub.unsubscribe();
  }, [form, step]);

  // Save step changes too
  useEffect(() => {
    saveDraft(form.getValues() as Partial<BookingInput>, step);
  }, [step, form]);

  // Move focus to step heading when step changes
  useEffect(() => {
    stepHeadingRef.current?.focus();
  }, [step]);

  const goNext = async () => {
    const fields = STEP_FIELDS[step] ?? [];
    const valid = await form.trigger(fields);
    if (valid) {
      setStep((s) => Math.min(s + 1, TOTAL_STEPS - 1));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  const goBack = () => {
    setStep((s) => Math.max(s - 1, 0));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const jumpBack = (target: number) => {
    if (target < step) {
      setStep(target);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const onSubmit = async (data: Booking) => {
    setSubmitting(true);
    setServerError(null);
    try {
      const payload = {
        ...data,
        lang,
        // strip honeypot
        website: undefined,
      };
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        ref?: string;
        error?: string;
      };
      if (!res.ok || !json.ok) {
        if (json.error === "slot_taken") {
          setServerError(t("booking.errorSlotTaken"));
          // Bounce back to step 3 so user can re-pick
          form.setValue("slotTime", "" as unknown as Booking["slotTime"]);
          setStep(2);
          window.scrollTo({ top: 0, behavior: "smooth" });
          return;
        }
        throw new Error(json.error ?? "submit_failed");
      }
      clearDraft();
      setSuccess({ ref: json.ref });
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setServerError(t("booking.errorSubmit"));
    } finally {
      setSubmitting(false);
    }
  };

  if (success) return <BookingSuccess reference={success.ref} />;

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="glass-card rounded-2xl p-5 sm:p-8"
        noValidate
      >
        <BookingProgress current={step} onJumpBack={jumpBack} />

        <div
          ref={stepHeadingRef}
          tabIndex={-1}
          aria-live="polite"
          className="outline-none"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              {step === 0 && <AnlassStep />}
              {step === 1 && <VersicherungStep />}
              {step === 2 && <WunschterminStep />}
              {step === 3 && <KontaktStep />}
            </motion.div>
          </AnimatePresence>
        </div>

        {serverError && (
          <div className="mt-6 rounded-xl border border-destructive/40 bg-destructive/5 text-destructive p-4 flex items-start gap-3 text-sm">
            <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
            <span>{serverError}</span>
          </div>
        )}

        <BookingNavigation
          step={step}
          submitting={submitting}
          canGoNext={true}
          onBack={goBack}
          onNext={goNext}
        />

        {/* honeypot — hidden from real users */}
        <input
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...form.register("website")}
          className="hidden"
          aria-hidden="true"
        />
      </form>
    </FormProvider>
  );
}
