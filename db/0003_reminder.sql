-- Reminder tracking — to avoid sending the day-before reminder twice.

ALTER TABLE bookings
  ADD COLUMN IF NOT EXISTS reminder_sent_at TIMESTAMPTZ;

CREATE INDEX IF NOT EXISTS idx_bookings_reminder_due ON bookings(preferred_date)
  WHERE reminder_sent_at IS NULL AND status IN ('new', 'confirmed', 'rescheduled');
