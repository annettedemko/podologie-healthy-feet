import { neon } from "@neondatabase/serverless";

let _sql: ReturnType<typeof neon> | null = null;

export function getSql() {
  if (_sql) return _sql;
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("DATABASE_URL is not set. Provision Neon via Vercel Marketplace.");
  }
  _sql = neon(url);
  return _sql;
}

export interface DbBookingRow {
  id: number;
  ref: string;
  status: string;
  service: string;
  insurance: string;
  is_first_visit: boolean;
  has_diabetes: boolean;
  preferred_date: string;
  time_slot: string;
  flexibility: string;
  name: string;
  phone: string;
  email: string;
  birth_date: string | null;
  notes: string | null;
  lang: string;
  ip: string | null;
  user_agent: string | null;
  email_sent_at: string | null;
  reminder_sent_at: string | null;
  created_at: string;
  updated_at: string;
}
