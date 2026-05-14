"use client";

import { motion } from "framer-motion";
import { LUXURY_EASE, viewportOnce } from "@/lib/motion";
import { Reveal, Eyebrow } from "@/components/shared/primitives";



const EXPERIENCE_ICONS = [
  {
    label: "Sommelier-Led Tastings",
    path: "M8 2h8l-1 10a4 4 0 01-3 3.46V20h-2v-4.54A4 4 0 017 12L6 2h2zm4 0v10",
  },
  {
    label: "Private Winery Experiences",
    path: "M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6M9 9h.01M15 9h.01",
  },
  {
    label: "Chef Pairing Dinners",
    path: "M3 12h1m1-4h1M7 4v1m4-1v1m4 0V4m2 4h1m1 4h1M7 12a5 5 0 0010 0M4 20h16M12 12v8",
  },
  {
    label: "Global Wine Journeys",
    path: "M12 2a10 10 0 100 20 10 10 0 000-20zm0 0c2.5 0 4.5 4.5 4.5 10S14.5 22 12 22 7.5 17.5 7.5 12 9.5 2 12 2zM2 12h20",
  },
  {
    label: "Members-Only Invitations",
    path: "M3 8l9 6 9-6M3 8v10a2 2 0 002 2h14a2 2 0 002-2V8M3 8l9-4 9 4",
  },
] as const;

export function Experiences() {
  return (
    <section className="relative overflow-hidden py-32 lg:py-40">
      <img
        src="/images/lounge.jpg"
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-60 mix-blend-multiply"
      />

      <div
        aria-hidden
        className="absolute inset-0 bg-linear-to-t from-background via-background/85 to-background/70"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-burgundy/20 mix-blend-multiply"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="mb-6"><Eyebrow>Exclusive Experiences</Eyebrow></div>

            <Reveal>
              <h2 className="font-display text-3xl leading-tight tracking-tight md:text-4xl lg:text-5xl">
                Go Beyond
                <br />
                <span className="font-serif italic text-gold-soft">
                  the Glass.
                </span>
              </h2>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
                From intimate winery tours to multi-course pairings with
                celebrated chefs, our experiences are designed to educate,
                inspire, and connect.
              </p>
            </Reveal>

            <Reveal delay={0.24}>
              <a
                href="/experiences"
                className="mt-8 inline-block text-sm font-medium text-gold transition-colors hover:text-gold-soft"
              >
                See All Experiences →
              </a>
            </Reveal>
          </div>

          <div className="lg:col-span-8">
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
              {EXPERIENCE_ICONS.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewportOnce}
                  transition={{
                    duration: 1.1,
                    ease: LUXURY_EASE,
                    delay: i * 0.12,
                  }}
                  className="group flex flex-col items-center gap-4 text-center"
                >
                  <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-gold/15 transition-colors group-hover:border-gold/30">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="var(--gold)"
                      strokeWidth="1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-9 w-9"
                    >
                      <path d={item.path} />
                    </svg>
                    <div
                      aria-hidden
                      className="absolute inset-0 rounded-2xl bg-gold/0 blur-xl transition-all duration-500 group-hover:bg-gold/30"
                    />
                  </div>
                  <span className="font-display text-sm">{item.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
