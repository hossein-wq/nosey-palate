CREATE TABLE rsvps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  status TEXT NOT NULL CHECK (status IN (
    'confirmed', 'waitlisted', 'cancelled', 'checked_in', 'no_show'
  )),
  guest_name TEXT,
  guest_email TEXT,
  qr_code TEXT UNIQUE,
  checked_in_at TIMESTAMPTZ,
  waitlist_position INTEGER,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE (event_id, user_id)
);

CREATE INDEX idx_rsvps_event ON rsvps(event_id);
CREATE INDEX idx_rsvps_user ON rsvps(user_id);
CREATE INDEX idx_rsvps_qr ON rsvps(qr_code);
