CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  long_description TEXT,
  event_type TEXT NOT NULL CHECK (event_type IN ('tasting', 'dinner', 'journey', 'experience')),
  cover_image TEXT,
  gallery JSONB DEFAULT '[]',
  venue_name TEXT,
  venue_address TEXT,
  venue_city TEXT,
  venue_coordinates JSONB,
  starts_at TIMESTAMPTZ NOT NULL,
  ends_at TIMESTAMPTZ,
  capacity INTEGER,
  min_plan_slug TEXT,
  required_capabilities TEXT[] DEFAULT '{}',
  price_cents INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  host_id UUID REFERENCES profiles(id),
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_events_starts ON events(starts_at);
CREATE INDEX idx_events_published ON events(is_published);
CREATE INDEX idx_events_slug ON events(slug);

CREATE TRIGGER events_updated_at
  BEFORE UPDATE ON events
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
