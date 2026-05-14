"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Plus, Users, BookOpen, MessageSquare, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { LUXURY_EASE } from "@/lib/motion";
import { Reveal, Eyebrow, GoldHairline } from "@/components/shared/primitives";
import { MemberAvatar } from "@/components/shared/member-avatar";
import { MembershipBadge } from "@/components/shared/membership-badge";
import {
  TastingNoteCard,
  type TastingNoteData,
} from "@/components/member/tasting-note-card";
import { TastingNoteForm } from "@/components/member/tasting-note-form";
import type { LoyaltyTier } from "@/types/membership";

/* ─── Demo data ───────────────────────────────────────────── */

const DEMO_NOTES: TastingNoteData[] = [
  {
    id: "1",
    user: {
      name: "Sofia R.",
      avatar: "https://i.pravatar.cc/80?img=1",
      tier: "Connoisseur",
      city: "Brooklyn",
    },
    wine_name: "Domaine Leroy Musigny Grand Cru",
    vintage: 2019,
    rating: 5,
    nose: "Dark cherry, rose petal, earth",
    palate: "Silk and power, layers of fruit",
    finish: "Endless, mineral-driven",
    notes: "One of the most memorable wines of the year.",
    created_at: "2026-05-10",
  },
  {
    id: "2",
    user: {
      name: "James P.",
      avatar: "https://i.pravatar.cc/80?img=3",
      tier: "Collector",
      city: "London",
    },
    wine_name: "Château Margaux 2015",
    vintage: 2015,
    rating: 5,
    nose: "Cassis, violets, graphite",
    palate: "Intense yet elegant, fine-grained tannins",
    finish: "Long, perfumed",
    notes: "Classic Margaux elegance.",
    created_at: "2026-05-08",
  },
  {
    id: "3",
    user: {
      name: "Amara K.",
      avatar: "https://i.pravatar.cc/80?img=5",
      tier: "Explorer",
      city: "Lisbon",
    },
    wine_name: "Quinta do Noval Nacional 2017",
    vintage: 2017,
    rating: 4,
    nose: "Dark fruit, chocolate, spice",
    palate: "Rich and concentrated",
    finish: "Warming, long",
    notes: "A stunning Port experience.",
    created_at: "2026-05-05",
  },
];

interface DemoMember {
  id: string;
  name: string;
  avatar: string;
  tier: LoyaltyTier;
  city: string;
  events_attended: number;
}

const DEMO_MEMBERS: DemoMember[] = [
  { id: "1", name: "Sofia R.", avatar: "https://i.pravatar.cc/120?img=1", tier: "connoisseur", city: "Brooklyn", events_attended: 12 },
  { id: "2", name: "James P.", avatar: "https://i.pravatar.cc/120?img=3", tier: "collector", city: "London", events_attended: 24 },
  { id: "3", name: "Amara K.", avatar: "https://i.pravatar.cc/120?img=5", tier: "explorer", city: "Lisbon", events_attended: 6 },
  { id: "4", name: "Daniel V.", avatar: "https://i.pravatar.cc/120?img=8", tier: "collector", city: "Milan", events_attended: 18 },
  { id: "5", name: "Priya S.", avatar: "https://i.pravatar.cc/120?img=9", tier: "connoisseur", city: "New York", events_attended: 15 },
  { id: "6", name: "Henri G.", avatar: "https://i.pravatar.cc/120?img=11", tier: "collector", city: "Paris", events_attended: 30 },
];

/* ─── Tabs ────────────────────────────────────────────────── */

const TABS = [
  { key: "feed", label: "Feed", icon: MessageSquare },
  { key: "members", label: "Members", icon: Users },
  { key: "my-notes", label: "My Notes", icon: BookOpen },
] as const;

type TabKey = (typeof TABS)[number]["key"];

/* ─── Page ────────────────────────────────────────────────── */

export default function CommunityPage() {
  const [tab, setTab] = useState<TabKey>("feed");
  const [showForm, setShowForm] = useState(false);
  const [myNotes, setMyNotes] = useState<TastingNoteData[]>([
    {
      id: "own-1",
      user: {
        name: "You",
        avatar: "https://i.pravatar.cc/80?img=12",
        tier: "Connoisseur",
      },
      wine_name: "Opus One 2018",
      vintage: 2018,
      rating: 4,
      nose: "Blackcurrant, cedar, mocha",
      palate: "Full-bodied, velvety tannins",
      finish: "Persistent, with dark chocolate",
      notes: "A Napa Valley classic worth every sip.",
      created_at: "2026-05-12",
    },
  ]);

  function handleDeleteNote(id: string) {
    setMyNotes((prev) => prev.filter((n) => n.id !== id));
  }

  return (
    <div className="mx-auto max-w-[1400px] px-6 py-12 md:px-10">
      {/* Header */}
      <Reveal>
        <Eyebrow>Community</Eyebrow>
        <h1 className="mt-4 font-display text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.08] text-ivory">
          The{" "}
          <span className="italic text-gold-soft">Community</span>
        </h1>
        <p className="mt-3 max-w-xl text-ivory/50">
          Share tasting notes, discover members, and connect with fellow
          connoisseurs across the globe.
        </p>
      </Reveal>

      {/* Tabs */}
      <div className="mt-10 flex gap-1 rounded-full border border-gold/15 bg-ivory/3 p-1 w-fit">
        {TABS.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={cn(
              "relative flex items-center gap-2 rounded-full px-5 py-2 text-sm transition-all duration-300",
              tab === key
                ? "text-espresso"
                : "text-ivory/50 hover:text-ivory/80",
            )}
          >
            {tab === key && (
              <motion.div
                layoutId="community-tab"
                className="absolute inset-0 rounded-full bg-gold"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-2">
              <Icon className="h-4 w-4" />
              {label}
            </span>
          </button>
        ))}
      </div>

      <GoldHairline className="mt-8" />

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        {tab === "feed" && (
          <motion.div
            key="feed"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: LUXURY_EASE }}
            className="mt-8 space-y-5"
          >
            {DEMO_NOTES.map((note, i) => (
              <TastingNoteCard key={note.id} note={note} index={i} />
            ))}
          </motion.div>
        )}

        {tab === "members" && (
          <motion.div
            key="members"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: LUXURY_EASE }}
            className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {DEMO_MEMBERS.map((member, i) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.06,
                  ease: LUXURY_EASE,
                }}
              >
                <Link
                  href={`/dashboard/community/${member.id}`}
                  className="glass group block rounded-md p-5 transition-all duration-500 hover:-translate-y-1 hover:ring-1 hover:ring-gold/40"
                >
                  <div className="flex items-center gap-4">
                    <MemberAvatar
                      src={member.avatar}
                      name={member.name}
                      size="md"
                      tier={member.tier}
                    />
                    <div className="min-w-0 flex-1">
                      <h3 className="truncate font-display text-lg text-ivory group-hover:text-gold-soft transition-colors">
                        {member.name}
                      </h3>
                      <div className="mt-1 flex items-center gap-2">
                        <MembershipBadge tier={member.tier} />
                        <span className="flex items-center gap-1 text-xs text-ivory/40">
                          <MapPin className="h-3 w-3" />
                          {member.city}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-4 border-t border-gold/10 pt-3 text-xs text-ivory/40">
                    <span>
                      <strong className="text-ivory/60">
                        {member.events_attended}
                      </strong>{" "}
                      events
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}

        {tab === "my-notes" && (
          <motion.div
            key="my-notes"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: LUXURY_EASE }}
            className="mt-8 space-y-6"
          >
            <AnimatePresence>
              {showForm && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4, ease: LUXURY_EASE }}
                >
                  <TastingNoteForm
                    onSubmit={(values) => {
                      setMyNotes((prev) => [
                        {
                          id: `own-${Date.now()}`,
                          user: {
                            name: "You",
                            avatar: "https://i.pravatar.cc/80?img=12",
                            tier: "Connoisseur",
                          },
                          wine_name: values.wine_name,
                          vintage: parseInt(values.vintage) || 0,
                          rating: values.rating,
                          nose: values.nose,
                          palate: values.palate,
                          finish: values.finish,
                          notes: values.notes,
                          created_at: new Date().toISOString().slice(0, 10),
                        },
                        ...prev,
                      ]);
                      setShowForm(false);
                    }}
                    onCancel={() => setShowForm(false)}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {myNotes.length === 0 ? (
              <div className="glass rounded-md p-12 text-center">
                <BookOpen className="mx-auto h-10 w-10 text-ivory/20" />
                <p className="mt-4 font-display text-xl text-ivory/40">
                  No tasting notes yet
                </p>
                <p className="mt-1 text-sm text-ivory/30">
                  Add your first note to start building your wine journal.
                </p>
              </div>
            ) : (
              myNotes.map((note, i) => (
                <TastingNoteCard
                  key={note.id}
                  note={note}
                  showAuthor={false}
                  index={i}
                  onEdit={() => {}}
                  onDelete={handleDeleteNote}
                />
              ))
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Add Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 200, damping: 20 }}
        onClick={() => {
          setTab("my-notes");
          setShowForm(true);
        }}
        className="fixed bottom-8 right-8 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-gold text-espresso shadow-[0_0_40px_color-mix(in_oklab,var(--gold)_35%,transparent)] transition-transform duration-300 hover:scale-110 md:h-auto md:w-auto md:px-6 md:py-3.5 md:gap-2"
        aria-label="Add Tasting Note"
      >
        <Plus className="h-5 w-5" />
        <span className="hidden text-sm font-medium md:inline">
          Add Tasting Note
        </span>
      </motion.button>
    </div>
  );
}
