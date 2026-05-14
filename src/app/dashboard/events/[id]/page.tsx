"use client";

import { use } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Calendar, Clock, Users } from "lucide-react";
import { LUXURY_EASE } from "@/lib/motion";
import { GoldHairline } from "@/components/shared/primitives";

const EVENT = {
  id: "1",
  title: "Burgundy with Friends",
  type: "Wine Tasting",
  image: "/images/event1.jpg",
  venue: "The Loft",
  city: "West Village, NY",
  date: "Saturday, June 15, 2026",
  time: "7:00 PM – 10:00 PM",
  capacity: 24,
  spotsLeft: 6,
  price: "Included with membership",
  description:
    "Join us for an intimate evening exploring the finest Burgundy wines with Master Sommelier Lena Marchetti. We'll taste through six exceptional bottles, from village-level gems to Grand Cru masterpieces, paired with carefully selected artisanal cheeses.",
  host: { name: "Lena Marchetti", role: "Head Sommelier", avatar: "https://i.pravatar.cc/80?img=5" },
};

export default function DashboardEventDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);

  return (
    <div className="mx-auto max-w-[1400px] px-6 py-12 md:px-10">
      <Link href="/dashboard/events" className="inline-flex items-center gap-2 text-sm text-ivory/60 transition hover:text-gold">
        <ArrowLeft className="h-4 w-4" /> Back to Events
      </Link>

      <div className="mt-8 grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: LUXURY_EASE }}
            className="relative aspect-video overflow-hidden rounded-2xl"
          >
            <img src={EVENT.image} alt={EVENT.title} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6">
              <span className="eyebrow">{EVENT.type}</span>
              <h1 className="mt-2 font-display text-4xl text-ivory">{EVENT.title}</h1>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: LUXURY_EASE, delay: 0.2 }}
            className="mt-8"
          >
            <h2 className="font-display text-2xl text-ivory">About This Event</h2>
            <p className="mt-4 text-sm leading-relaxed text-ivory/70">{EVENT.description}</p>

            <GoldHairline className="my-8" />

            <h3 className="font-display text-xl text-ivory">Your Host</h3>
            <div className="mt-4 flex items-center gap-4">
              <img src={EVENT.host.avatar} alt={EVENT.host.name} className="h-12 w-12 rounded-full" />
              <div>
                <p className="text-sm font-medium text-ivory">{EVENT.host.name}</p>
                <p className="text-xs text-gold">{EVENT.host.role}</p>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="lg:col-span-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: LUXURY_EASE, delay: 0.3 }}
            className="glass-strong sticky top-24 rounded-2xl p-6"
          >
            <h3 className="font-display text-xl text-ivory">Event Details</h3>
            <div className="mt-5 space-y-4">
              <div className="flex items-start gap-3">
                <Calendar className="mt-0.5 h-4 w-4 text-gold" />
                <div>
                  <p className="text-sm text-ivory">{EVENT.date}</p>
                  <p className="text-xs text-ivory/50">{EVENT.time}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 text-gold" />
                <div>
                  <p className="text-sm text-ivory">{EVENT.venue}</p>
                  <p className="text-xs text-ivory/50">{EVENT.city}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Users className="mt-0.5 h-4 w-4 text-gold" />
                <div>
                  <p className="text-sm text-ivory">{EVENT.spotsLeft} of {EVENT.capacity} spots left</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="mt-0.5 h-4 w-4 text-gold" />
                <p className="text-sm text-ivory">{EVENT.price}</p>
              </div>
            </div>

            <GoldHairline className="my-5" />

            <button className="group relative w-full overflow-hidden rounded-full bg-gold px-6 py-3.5 text-sm font-medium text-espresso transition-all hover:shadow-[0_0_40px_color-mix(in_oklab,var(--gold)_50%,transparent)]">
              <span className="relative z-10">RSVP Now</span>
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </button>

            <p className="mt-3 text-center text-xs text-ivory/40">
              Event ID: {resolvedParams.id} — Free cancellation up to 24h before
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
