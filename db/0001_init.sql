-- Healthy Feet — bookings table
-- Run once after Neon is provisioned: psql $DATABASE_URL -f db/0001_init.sql
-- (or paste this into the Neon SQL Editor)

CREATE TABLE IF NOT EXISTS bookings (
  id              BIGSERIAL PRIMARY KEY,
  ref             TEXT UNIQUE NOT NULL,
  status          TEXT NOT NULL DEFAULT 'new', -- 'new' | 'confirmed' | 'cancelled' | 'rescheduled'
  service         TEXT NOT NULL,
  insurance       TEXT NOT NULL,
  is_first_visit  BOOLEAN NOT NULL DEFAULT FALSE,
  has_diabetes    BOOLEAN NOT NULL DEFAULT FALSE,
  preferred_date  TIMESTAMPTZ NOT NULL,
  time_slot       TEXT NOT NULL,
  flexibility     TEXT NOT NULL,
  name            TEXT NOT NULL,
  phone           TEXT NOT NULL,
  email           TEXT NOT NULL,
  birth_date      TEXT,
  notes           TEXT,
  lang            TEXT NOT NULL DEFAULT 'de',
  ip              TEXT,
  user_agent      TEXT,
  email_sent_at   TIMESTAMPTZ,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_created_at ON bookings(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_bookings_email ON bookings(email);
