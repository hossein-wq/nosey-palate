CREATE TABLE membership_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  stripe_product_id TEXT UNIQUE NOT NULL,
  stripe_price_id_monthly TEXT,
  stripe_price_id_annual TEXT,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  price_monthly INTEGER NOT NULL,
  price_annual INTEGER,
  capabilities JSONB NOT NULL DEFAULT '[]',
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  plan_id UUID NOT NULL REFERENCES membership_plans(id),
  stripe_subscription_id TEXT UNIQUE,
  stripe_customer_id TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN (
    'active', 'past_due', 'canceled', 'incomplete', 'trialing', 'paused'
  )),
  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  cancel_at_period_end BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_subscriptions_user ON subscriptions(user_id);
CREATE INDEX idx_subscriptions_status ON subscriptions(status);
CREATE INDEX idx_subscriptions_stripe ON subscriptions(stripe_subscription_id);

CREATE TRIGGER subscriptions_updated_at
  BEFORE UPDATE ON subscriptions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Seed default plans
INSERT INTO membership_plans (stripe_product_id, name, slug, description, price_monthly, capabilities, sort_order)
VALUES
  ('prod_explorer', 'Explorer', 'explorer', 'Perfect for those starting their wine journey.', 2900,
   '["events.browse","events.rsvp","community.view","community.post_tasting_notes","community.react","loyalty.earn_points","loyalty.redeem","support.ai_assistant"]', 1),
  ('prod_connoisseur', 'Connoisseur', 'connoisseur', 'For those who live for wine and experiences.', 5900,
   '["events.browse","events.rsvp","events.rsvp.priority","events.private_dinners","events.guest_plus_one","community.view","community.post_tasting_notes","community.react","loyalty.earn_points","loyalty.redeem","support.ai_assistant"]', 2),
  ('prod_collector', 'Collector', 'collector', 'For the passionate and the discerning.', 9900,
   '["events.browse","events.rsvp","events.rsvp.priority","events.rsvp.vip","events.private_dinners","events.guest_plus_one","community.view","community.post_tasting_notes","community.react","experiences.winery_tours","experiences.chef_pairings","experiences.global_journeys","loyalty.earn_points","loyalty.redeem","loyalty.concierge","support.ai_assistant","support.concierge","support.personalized_wine"]', 3);
