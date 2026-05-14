import { z } from "zod";

export const SERVICE_IDS = [
  "komplexbehandlung",
  "nagelpilzbehandlung",
  "eingewachsener-nagel",
  "warzenbehandlung",
  "nagelspangenbehandlung",
  "hornhaut-entfernen",
  "plasmatherapie",
  "beratung",
] as const;
export type ServiceId = (typeof SERVICE_IDS)[number];

export const INSURANCE_OPTIONS = ["kasse_verordnung", "privat"] as const;
export type InsuranceOption = (typeof INSURANCE_OPTIONS)[number];

const phoneRegex = /^[+\d\s()/.-]{6,40}$/;
const slotRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:00:00\+02:00$/;

export const bookingSchema = z.object({
  service: z.enum(SERVICE_IDS, { message: "errors.service" }),
  insurance: z.enum(INSURANCE_OPTIONS, { message: "errors.insurance" }),
  isFirstVisit: z.boolean().default(false),
  hasDiabetes: z.boolean().default(false),
  // Exact slot start as ISO with Berlin offset, e.g. "2026-05-20T09:00:00+02:00"
  slotTime: z.string().regex(slotRegex, { message: "errors.slot" }),
  name: z.string().trim().min(2, "errors.name").max(100, "errors.name"),
  phone: z
    .string()
    .trim()
    .min(6, "errors.phone")
    .max(40, "errors.phone")
    .regex(phoneRegex, "errors.phone"),
  email: z.string().trim().email("errors.email").max(200, "errors.email"),
  birthDate: z.string().trim().max(20).optional().or(z.literal("")),
  notes: z.string().trim().max(2000).optional().or(z.literal("")),
  consent: z
    .boolean()
    .refine((v) => v === true, { message: "errors.consent" }),
  // Honeypot — must stay empty.
  website: z.string().max(0).optional().or(z.literal("")),
});

export type BookingInput = z.input<typeof bookingSchema>;
export type Booking = z.output<typeof bookingSchema>;

export const STEP_FIELDS: Record<number, (keyof BookingInput)[]> = {
  0: ["service"],
  1: ["insurance", "isFirstVisit", "hasDiabetes"],
  2: ["slotTime"],
  3: ["name", "phone", "email", "birthDate", "notes", "consent", "website"],
};

export const TOTAL_STEPS = 4;
