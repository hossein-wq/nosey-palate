CREATE TABLE tasting_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  event_id UUID REFERENCES events(id),
  wine_name TEXT NOT NULL,
  vintage INTEGER,
  region TEXT,
  rating SMALLINT CHECK (rating BETWEEN 1 AND 5),
  nose TEXT,
  palate TEXT,
  finish TEXT,
  notes TEXT,
  is_public BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE reactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  target_type TEXT NOT NULL CHECK (target_type IN ('tasting_note', 'event', 'article')),
  target_id UUID NOT NULL,
  reaction_type TEXT NOT NULL CHECK (reaction_type IN ('cheers', 'love', 'insightful')),
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE (user_id, target_type, target_id)
);

CREATE INDEX idx_tasting_notes_user ON tasting_notes(user_id);
CREATE INDEX idx_tasting_notes_event ON tasting_notes(event_id);
CREATE INDEX idx_reactions_target ON reactions(target_type, target_id);
