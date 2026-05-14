"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Calendar } from "lucide-react";
import { LUXURY_EASE } from "@/lib/motion";
import { Reveal } from "@/components/shared/primitives";

const DEMO_EVENTS = [
  { id: "1", title: "Burgundy with Friends", type: "tasting", image: "/images/event1.jpg", venue: "The Loft, West Village", date: "Jun 15, 2026", spots: 6, rsvp: "confirmed" as const },
  { id: "2", title: "Sommelier's Table", type: "dinner", image: "/images/event2.jpg", venue: "Maison Lumière, Tribeca", date: "Jun 22, 2026", spots: 2, rsvp: null },
  { id: "3", title: "Tuscan Harvest Journey", type: "journey", image: "/images/event3.jpg", venue: "Villa Marchetti, Tuscany", date: "Sep 10, 2026", spots: 8, rsvp: "waitlisted" as const },
];

const TABS = ["Upcoming", "Discover", "Past"] as const;

export default function DashboardEventsPage() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("Discover");

  return (
    <div className="mx-auto max-w-[1400px] px-6 py-12 md:px-10">
      <h1 className="font-display text-4xl text-ivory">
        Your <span className="italic text-gold-soft">Events</span>
      </h1>
      <p className="mt-2 text-sm text-ivory/60">Browse, RSVP, and relive your wine experiences.</p>

      <div className="mt-8 flex gap-1 rounded-full border border-gold/20 bg-espresso/30 p-1 w-fit">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`rounded-full px-5 py-2 text-xs transition ${
              tab === t ? "bg-gold text-espresso font-medium" : "text-ivory/60 hover:text-ivory"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {DEMO_EVENTS.map((event, i) => (
          <Reveal key={event.id} delay={i * 0.1}>
            <Link href={`/dashboard/events/${event.id}`} className="group block">
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3, ease: LUXURY_EASE }}
                className="relative aspect-[3/4] overflow-hidden rounded-2xl"
              >
                <img src={event.image} alt={event.title} className="h-full w-full object-cover transition-transform duration-[1500ms] group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute left-4 top-4 glass rounded-lg px-3 py-1.5">
                  <p className="text-xs font-medium text-ivory">{event.date}</p>
                </div>
                {event.rsvp && (
                  <div className={`absolute right-4 top-4 rounded-full px-3 py-1 text-[10px] uppercase tracking-wider font-medium ${
                    event.rsvp === "confirmed" ? "bg-gold text-espresso" : "bg-ivory/20 text-ivory"
                  }`}>
                    {event.rsvp}
                  </div>
                )}
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <span className="eyebrow text-[10px]">{event.type}</span>
                  <h3 className="mt-1 font-display text-xl text-ivory">{event.title}</h3>
                  <div className="mt-2 flex items-center gap-1.5 text-xs text-ivory/60">
                    <MapPin className="h-3 w-3" />
                    {event.venue}
                  </div>
                  <div className="mt-1 flex items-center gap-1.5 text-xs text-ivory/60">
                    <Calendar className="h-3 w-3" />
                    {event.spots} spots left
                  </div>
                </div>
              </motion.div>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
