"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wine } from "lucide-react";
import { cn } from "@/lib/utils";
import { LUXURY_EASE } from "@/lib/motion";
import { Reveal, Eyebrow, GoldHairline } from "@/components/shared/primitives";
import { EventCard } from "@/components/shared/event-card";
import type { EventSummary, EventType } from "@/types/events";

const FILTER_TABS: { label: string; value: EventType | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Tastings", value: "tasting" },
  { label: "Dinners", value: "dinner" },
  { label: "Journeys", value: "journey" },
  { label: "Experiences", value: "experience" },
];

interface EventsListingProps {
  events: EventSummary[];
}

export function EventsListing({ events }: EventsListingProps) {
  const [activeFilter, setActiveFilter] = useState<EventType | "all">("all");

  const filtered = activeFilter === "all"
    ? events
    : events.filter((e) => e.event_type === activeFilter);

  return (
    <>
      {/* Header */}
      <Reveal>
        <Eyebrow>Events</Eyebrow>
      </Reveal>

      <Reveal delay={0.1}>
        <h1 className="mt-6 font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.05] tracking-tight text-ivory">
          Experiences Worth{" "}
          <span className="italic text-gold-soft">Dressing Up For.</span>
        </h1>
      </Reveal>

      <Reveal delay={0.2}>
        <p className="mt-6 max-w-lg text-ivory/60 leading-relaxed">
          From intimate tastings in candlelit cellars to multi-day harvest
          journeys across Europe — every event is designed to deepen your
          connection to wine and the people who love it.
        </p>
      </Reveal>

      <GoldHairline className="mt-12" />

      {/* Filter tabs */}
      <Reveal delay={0.3}>
        <div className="mt-8 flex flex-wrap gap-2">
          {FILTER_TABS.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveFilter(tab.value)}
              className={cn(
                "relative rounded-full px-5 py-2 text-[13px] font-medium tracking-wide transition-all duration-300",
                activeFilter === tab.value
                  ? "text-espresso"
                  : "text-ivory/50 hover:text-ivory/80"
              )}
            >
              {activeFilter === tab.value && (
                <motion.div
                  layoutId="event-filter"
                  className="absolute inset-0 rounded-full bg-gold"
                  transition={{ duration: 0.4, ease: LUXURY_EASE }}
                />
              )}
              <span className="relative z-10">{tab.label}</span>
            </button>
          ))}
        </div>
      </Reveal>

      {/* Events grid */}
      <div className="mt-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: LUXURY_EASE }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filtered.map((event, i) => (
              <EventCard
                key={event.id}
                event={event}
                variant="marketing"
                index={i}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <Reveal>
            <div className="glass flex flex-col items-center justify-center rounded-lg py-24">
              <Wine className="mb-4 h-10 w-10 text-gold/40" />
              <p className="text-lg text-ivory/40">
                No {activeFilter} events scheduled yet.
              </p>
              <p className="mt-2 text-sm text-ivory/30">
                Check back soon or browse all events.
              </p>
            </div>
          </Reveal>
        )}
      </div>
    </>
  );
}
