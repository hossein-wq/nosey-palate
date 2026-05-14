"use client";

import { use } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  BookOpen,
  Ticket,
} from "lucide-react";
import { LUXURY_EASE } from "@/lib/motion";
import { Reveal, GoldHairline } from "@/components/shared/primitives";
import { MemberAvatar } from "@/components/shared/member-avatar";
import { MembershipBadge } from "@/components/shared/membership-badge";
import {
  TastingNoteCard,
  type TastingNoteData,
} from "@/components/member/tasting-note-card";
import type { LoyaltyTier } from "@/types/membership";

/* ─── Demo data keyed by member id ────────────────────────── */

interface MemberProfile {
  id: string;
  name: string;
  avatar: string;
  tier: LoyaltyTier;
  city: string;
  bio: string;
  member_since: string;
  events_attended: number;
  tasting_notes_count: number;
  notes: TastingNoteData[];
  recent_events: { title: string; date: string }[];
}

const PROFILES: Record<string, MemberProfile> = {
  "1": {
    id: "1",
    name: "Sofia R.",
    avatar: "https://i.pravatar.cc/120?img=1",
    tier: "connoisseur",
    city: "Brooklyn",
    bio: "Burgundy enthusiast and sommelier-in-training. I believe every bottle tells a story worth sharing.",
    member_since: "2024-03",
    events_attended: 12,
    tasting_notes_count: 28,
    notes: [
      {
        id: "s1",
        user: { name: "Sofia R.", avatar: "https://i.pravatar.cc/80?img=1", tier: "Connoisseur", city: "Brooklyn" },
        wine_name: "Domaine Leroy Musigny Grand Cru",
        vintage: 2019,
        rating: 5,
        nose: "Dark cherry, rose petal, earth",
        palate: "Silk and power, layers of fruit",
        finish: "Endless, mineral-driven",
        notes: "One of the most memorable wines of the year.",
        created_at: "2026-05-10",
      },
    ],
    recent_events: [
      { title: "Burgundy Grand Cru Masterclass", date: "2026-04-22" },
      { title: "Spring Allocation Preview", date: "2026-03-15" },
    ],
  },
  "2": {
    id: "2",
    name: "James P.",
    avatar: "https://i.pravatar.cc/120?img=3",
    tier: "collector",
    city: "London",
    bio: "Collector of fine Bordeaux and rare single malts. Passionate about the intersection of terroir and tradition.",
    member_since: "2023-09",
    events_attended: 24,
    tasting_notes_count: 54,
    notes: [
      {
        id: "j1",
        user: { name: "James P.", avatar: "https://i.pravatar.cc/80?img=3", tier: "Collector", city: "London" },
        wine_name: "Château Margaux 2015",
        vintage: 2015,
        rating: 5,
        nose: "Cassis, violets, graphite",
        palate: "Intense yet elegant, fine-grained tannins",
        finish: "Long, perfumed",
        notes: "Classic Margaux elegance.",
        created_at: "2026-05-08",
      },
    ],
    recent_events: [
      { title: "Bordeaux Futures Tasting", date: "2026-04-10" },
      { title: "Cellar Tour: London Edition", date: "2026-02-28" },
      { title: "New Year's Grand Cuvée Gala", date: "2025-12-31" },
    ],
  },
  "3": {
    id: "3",
    name: "Amara K.",
    avatar: "https://i.pravatar.cc/120?img=5",
    tier: "explorer",
    city: "Lisbon",
    bio: "Exploring the world one glass at a time. Lover of Port, natural wines, and hidden terroirs.",
    member_since: "2025-11",
    events_attended: 6,
    tasting_notes_count: 9,
    notes: [
      {
        id: "a1",
        user: { name: "Amara K.", avatar: "https://i.pravatar.cc/80?img=5", tier: "Explorer", city: "Lisbon" },
        wine_name: "Quinta do Noval Nacional 2017",
        vintage: 2017,
        rating: 4,
        nose: "Dark fruit, chocolate, spice",
        palate: "Rich and concentrated",
        finish: "Warming, long",
        notes: "A stunning Port experience.",
        created_at: "2026-05-05",
      },
    ],
    recent_events: [
      { title: "Port & Chocolate Pairing", date: "2026-04-18" },
    ],
  },
  "4": {
    id: "4",
    name: "Daniel V.",
    avatar: "https://i.pravatar.cc/120?img=8",
    tier: "collector",
    city: "Milan",
    bio: "Italian wines are in my blood. From Barolo to Brunello, exploring the depth of Italian winemaking heritage.",
    member_since: "2024-01",
    events_attended: 18,
    tasting_notes_count: 42,
    notes: [],
    recent_events: [
      { title: "Super Tuscan Evening", date: "2026-05-01" },
      { title: "Piedmont Producer Dinner", date: "2026-03-20" },
    ],
  },
  "5": {
    id: "5",
    name: "Priya S.",
    avatar: "https://i.pravatar.cc/120?img=9",
    tier: "connoisseur",
    city: "New York",
    bio: "Wine educator and WSET Diploma student. Fascinated by biodynamics and the science of fermentation.",
    member_since: "2024-06",
    events_attended: 15,
    tasting_notes_count: 37,
    notes: [],
    recent_events: [
      { title: "Biodynamic Wines Seminar", date: "2026-04-25" },
      { title: "Champagne Luncheon", date: "2026-03-08" },
    ],
  },
  "6": {
    id: "6",
    name: "Henri G.",
    avatar: "https://i.pravatar.cc/120?img=11",
    tier: "collector",
    city: "Paris",
    bio: "Third-generation wine collector. My cellar is my autobiography — every bottle a chapter.",
    member_since: "2023-04",
    events_attended: 30,
    tasting_notes_count: 78,
    notes: [],
    recent_events: [
      { title: "Salon des Grands Vins", date: "2026-05-03" },
      { title: "Vintage Champagne Vertical", date: "2026-04-12" },
      { title: "Loire Valley Discovery", date: "2026-02-14" },
    ],
  },
};

/* ─── Page ────────────────────────────────────────────────── */

export default function MemberProfilePage({
  params,
}: {
  params: Promise<{ memberId: string }>;
}) {
  const { memberId } = use(params);
  const member = PROFILES[memberId];

  if (!member) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-24 text-center md:px-10">
        <h1 className="font-display text-3xl text-ivory">Member not found</h1>
        <Link
          href="/dashboard/community"
          className="mt-4 inline-flex items-center gap-2 text-sm text-gold transition hover:text-gold-soft"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Community
        </Link>
      </div>
    );
  }

  const memberSinceFormatted = new Date(member.member_since).toLocaleDateString(
    "en-US",
    { month: "long", year: "numeric" },
  );

  return (
    <div className="mx-auto max-w-4xl px-6 py-12 md:px-10">
      {/* Back Link */}
      <Link
        href="/dashboard/community"
        className="mb-8 inline-flex items-center gap-2 text-sm text-ivory/40 transition hover:text-gold"
      >
        <ArrowLeft className="h-4 w-4" /> Community
      </Link>

      {/* Profile Header */}
      <Reveal>
        <div className="glass rounded-md p-6 md:p-8">
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
            <MemberAvatar
              src={member.avatar}
              name={member.name}
              size="lg"
              tier={member.tier}
            />
            <div className="flex-1 text-center sm:text-left">
              <div className="flex flex-col items-center gap-2 sm:flex-row">
                <h1 className="font-display text-3xl text-ivory">
                  {member.name}
                </h1>
                <MembershipBadge tier={member.tier} />
              </div>
              <p className="mt-1 flex items-center justify-center gap-1 text-sm text-ivory/40 sm:justify-start">
                <MapPin className="h-3.5 w-3.5" />
                {member.city}
              </p>
              <p className="mt-3 max-w-lg text-sm leading-relaxed text-ivory/60">
                {member.bio}
              </p>
            </div>
          </div>

          <GoldHairline className="my-6" />

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            {[
              {
                icon: Ticket,
                value: member.events_attended,
                label: "Events Attended",
              },
              {
                icon: BookOpen,
                value: member.tasting_notes_count,
                label: "Tasting Notes",
              },
              {
                icon: Calendar,
                value: memberSinceFormatted,
                label: "Member Since",
              },
            ].map(({ icon: Icon, value, label }) => (
              <div key={label} className="text-center">
                <Icon className="mx-auto h-5 w-5 text-gold/60" />
                <p className="mt-1 font-display text-xl text-ivory">
                  {value}
                </p>
                <p className="text-xs text-ivory/40">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Recent Tasting Notes */}
      <section className="mt-10">
        <h2 className="mb-5 font-display text-2xl text-ivory">
          Recent <span className="italic text-gold-soft">Tasting Notes</span>
        </h2>
        {member.notes.length > 0 ? (
          <div className="space-y-4">
            {member.notes.map((note, i) => (
              <TastingNoteCard
                key={note.id}
                note={note}
                showAuthor={false}
                index={i}
              />
            ))}
          </div>
        ) : (
          <div className="glass rounded-md p-8 text-center">
            <BookOpen className="mx-auto h-8 w-8 text-ivory/20" />
            <p className="mt-3 text-sm text-ivory/40">
              No public tasting notes yet.
            </p>
          </div>
        )}
      </section>

      {/* Recent Events */}
      <section className="mt-10">
        <h2 className="mb-5 font-display text-2xl text-ivory">
          Recent <span className="italic text-gold-soft">Events</span>
        </h2>
        <div className="space-y-3">
          {member.recent_events.map((event) => (
            <motion.div
              key={event.title}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: LUXURY_EASE }}
              className="glass flex items-center justify-between rounded-md px-5 py-4"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gold/10">
                  <Ticket className="h-4 w-4 text-gold" />
                </div>
                <span className="text-sm text-ivory">{event.title}</span>
              </div>
              <time className="text-xs text-ivory/30">
                {new Date(event.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </time>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
