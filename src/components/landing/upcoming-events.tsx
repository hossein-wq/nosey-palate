"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { LUXURY_EASE, viewportOnce } from "@/lib/motion";
import { Reveal, Eyebrow } from "@/components/shared/primitives";



const EVENTS = [
  {
    title: "Burgundy with Friends",
    type: "Wine Tasting",
    location: "The Loft, West Village",
    spots: 20,
    month: "Jun",
    day: 15,
    image: "/images/event1.jpg",
  },
  {
    title: "Sommelier Dinner Series",
    type: "5 Course Pairing",
    location: "Private Location",
    spots: 12,
    month: "Jun",
    day: 22,
    image: "/images/event2.jpg",
  },
  {
    title: "Champagne & Oysters",
    type: "Tasting Experience",
    location: "The Williamsburg Hotel",
    spots: 15,
    month: "Jun",
    day: 29,
    image: "/images/event3.jpg",
  },
] as const;

export function UpcomingEvents() {
  return (
    <section className="relative overflow-hidden py-32 lg:py-40">
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(var(--gold) 1px, transparent 1px), linear-gradient(90deg, var(--gold) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-16 grid grid-cols-1 items-end gap-8 md:grid-cols-12">
          <div className="md:col-span-7">
            <div className="mb-6"><Eyebrow>Upcoming Events</Eyebrow></div>
            <Reveal>
              <h2 className="font-display text-3xl leading-tight tracking-tight md:text-4xl lg:text-5xl">
                Experiences Worth
                <br />
                <span className="font-serif italic text-gold-soft">
                  Dressing Up For.
                </span>
              </h2>
            </Reveal>
          </div>
          <div className="md:col-span-5 md:text-right">
            <Reveal delay={0.12}>
              <p className="text-base leading-relaxed text-muted-foreground">
                From intimate tastings to chef-curated dinners, every event is
                designed to bring people together over exceptional wine.
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <Link
                href="/events"
                className="mt-4 inline-block text-sm font-medium text-gold transition-colors hover:text-gold-soft"
              >
                View All Events &rarr;
              </Link>
            </Reveal>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {EVENTS.map((event, i) => (
            <motion.div
              key={event.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 1.1, ease: LUXURY_EASE, delay: i * 0.12 }}
              className="group relative aspect-3/4 overflow-hidden rounded-2xl"
            >
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="h-full w-full object-cover transition-transform duration-1500 ease-out group-hover:scale-110"
                />
              </div>

              <div
                aria-hidden
                className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-burgundy/0 transition-colors duration-500 group-hover:bg-burgundy/20"
              />

              <div className="glass absolute left-4 top-4 rounded-lg px-3 py-2 text-center">
                <span className="block text-[0.6rem] font-medium uppercase tracking-widest text-gold">
                  {event.month}
                </span>
                <span className="block font-display text-xl leading-none">
                  {event.day}
                </span>
              </div>

              <div className="absolute inset-x-0 bottom-0 p-5">
                <h3 className="font-display text-xl">{event.title}</h3>
                <p className="mt-1 text-sm text-foreground/70">{event.type}</p>
                <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="h-3.5 w-3.5"
                  >
                    <path
                      d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z"
                      fill="currentColor"
                    />
                  </svg>
                  {event.location}
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs text-gold">
                    {event.spots} Spots Left
                  </span>
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-gold/30 text-gold transition-colors group-hover:bg-gold group-hover:text-background">
                    <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5">
                      <path
                        d="M5 12h14m-6-6l6 6-6 6"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
