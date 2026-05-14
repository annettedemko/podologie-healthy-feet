import type { BookingInput } from "./schema";

const DRAFT_KEY = "hf_booking_draft_v2";

type StoredDraft = Partial<BookingInput> & { step?: number };

export function loadDraft():
  | { values: Partial<BookingInput>; step: number }
  | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(DRAFT_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw) as StoredDraft;
    const { step, ...values } = data;
    return { values: values as Partial<BookingInput>, step: typeof step === "number" ? step : 0 };
  } catch {
    return null;
  }
}

export function saveDraft(values: Partial<BookingInput>, step: number): void {
  if (typeof window === "undefined") return;
  try {
    const { consent: _c, website: _w, ...rest } = values;
    const payload: StoredDraft = { ...rest, step };
    window.localStorage.setItem(DRAFT_KEY, JSON.stringify(payload));
  } catch {
    // ignore quota / privacy mode errors
  }
}

export function clearDraft(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(DRAFT_KEY);
  } catch {
    // ignore
  }
}
