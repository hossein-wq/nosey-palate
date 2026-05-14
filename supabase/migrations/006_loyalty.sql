CREATE TABLE loyalty_ledger (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  points INTEGER NOT NULL,
  reason TEXT NOT NULL,
  event_id UUID REFERENCES events(id),
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_loyalty_user ON loyalty_ledger(user_id);

CREATE VIEW member_loyalty AS
SELECT
  user_id,
  COALESCE(SUM(points), 0) as total_points,
  CASE
    WHEN COALESCE(SUM(points), 0) >= 3000 THEN 'grand_cru'
    WHEN COALESCE(SUM(points), 0) >= 1500 THEN 'collector'
    WHEN COALESCE(SUM(points), 0) >= 500 THEN 'connoisseur'
    ELSE 'explorer'
  END as loyalty_tier
FROM loyalty_ledger
GROUP BY user_id;
