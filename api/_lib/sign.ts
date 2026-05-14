// HMAC signing for one-click admin actions in clinic notification emails.
// Secret = ADMIN_PASSWORD (already required in env). Token is truncated SHA-256.

import { createHmac, timingSafeEqual } from "node:crypto";

function getSecret(): string {
  const s = process.env.ADMIN_PASSWORD;
  if (!s) throw new Error("ADMIN_PASSWORD not set — required for HMAC signing");
  return s;
}

export function signQuickAction(ref: string, action: string): string {
  const mac = createHmac("sha256", getSecret())
    .update(`${ref}:${action}`)
    .digest("base64url");
  return mac.slice(0, 22); // truncated for shorter URLs (132 bits — plenty)
}

export function verifyQuickAction(ref: string, action: string, sig: string): boolean {
  if (!sig || sig.length !== 22) return false;
  const expected = signQuickAction(ref, action);
  // constant-time compare
  try {
    return timingSafeEqual(Buffer.from(expected), Buffer.from(sig));
  } catch {
    return false;
  }
}
