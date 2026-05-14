-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE membership_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE rsvps ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasting_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE reactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE loyalty_ledger ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE invitations ENABLE ROW LEVEL SECURITY;
ALTER TABLE knowledge_base ENABLE ROW LEVEL SECURITY;
ALTER TABLE journal_articles ENABLE ROW LEVEL SECURITY;

-- Profiles: public read, own write
CREATE POLICY "Public profiles are viewable by everyone" ON profiles
  FOR SELECT USING (is_public = true);

CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Membership plans: public read
CREATE POLICY "Anyone can view active plans" ON membership_plans
  FOR SELECT USING (is_active = true);

-- Subscriptions: own read
CREATE POLICY "Users can view own subscriptions" ON subscriptions
  FOR SELECT USING (auth.uid() = user_id);

-- Events: public read for published
CREATE POLICY "Anyone can view published events" ON events
  FOR SELECT USING (is_published = true);

CREATE POLICY "Admins can manage events" ON events
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'super_admin'))
  );

-- RSVPs: own read/write
CREATE POLICY "Users can view own RSVPs" ON rsvps
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create RSVPs" ON rsvps
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own RSVPs" ON rsvps
  FOR UPDATE USING (auth.uid() = user_id);

-- Tasting notes: public read, own write
CREATE POLICY "Public tasting notes are viewable" ON tasting_notes
  FOR SELECT USING (is_public = true OR auth.uid() = user_id);

CREATE POLICY "Users can create tasting notes" ON tasting_notes
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own tasting notes" ON tasting_notes
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own tasting notes" ON tasting_notes
  FOR DELETE USING (auth.uid() = user_id);

-- Reactions: authenticated read/write
CREATE POLICY "Authenticated can view reactions" ON reactions
  FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "Users can create reactions" ON reactions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own reactions" ON reactions
  FOR DELETE USING (auth.uid() = user_id);

-- Loyalty: own read
CREATE POLICY "Users can view own loyalty" ON loyalty_ledger
  FOR SELECT USING (auth.uid() = user_id);

-- Notifications: own read/write
CREATE POLICY "Users can view own notifications" ON notifications
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own notifications" ON notifications
  FOR UPDATE USING (auth.uid() = user_id);

-- Invitations: own read
CREATE POLICY "Users can view own invitations" ON invitations
  FOR SELECT USING (auth.uid() = inviter_id);

CREATE POLICY "Users can create invitations" ON invitations
  FOR INSERT WITH CHECK (auth.uid() = inviter_id);

-- Knowledge base: public read
CREATE POLICY "Anyone can read knowledge base" ON knowledge_base
  FOR SELECT USING (true);

-- Journal: public read for published
CREATE POLICY "Anyone can read published articles" ON journal_articles
  FOR SELECT USING (is_published = true);

CREATE POLICY "Admins can manage articles" ON journal_articles
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'super_admin'))
  );
