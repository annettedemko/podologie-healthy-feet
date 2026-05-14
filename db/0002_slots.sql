-- Migrate from "request form" (time_slot/flexibility) to real-time slot booking.
-- preferred_date now stores the EXACT slot start (e.g. 2026-05-20 09:00:00+02).
-- Drop NOT NULL on legacy fields so older rows survive but new rows can omit them.

ALTER TABLE bookings ALTER COLUMN time_slot DROP NOT NULL;
ALTER TABLE bookings ALTER COLUMN flexibility DROP NOT NULL;

-- Index to speed up capacity lookups per slot.
CREATE INDEX IF NOT EXISTS idx_bookings_preferred_date ON bookings(preferred_date)
  WHERE status IN ('new', 'confirmed', 'rescheduled');
