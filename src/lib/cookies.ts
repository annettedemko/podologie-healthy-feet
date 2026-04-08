const CONSENT_KEY = "hf-cookie-consent";

export type CookieConsent = "all" | "necessary" | null;

export function getConsent(): CookieConsent {
  const val = localStorage.getItem(CONSENT_KEY);
  if (val === "all" || val === "necessary") return val;
  return null;
}

export function setConsent(consent: "all" | "necessary") {
  localStorage.setItem(CONSENT_KEY, consent);
}

export function clearConsent() {
  localStorage.removeItem(CONSENT_KEY);
}

export function hasMapConsent(): boolean {
  return getConsent() === "all";
}
