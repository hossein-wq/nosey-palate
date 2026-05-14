"use client";

import { motion } from "framer-motion";
import { Reveal, Eyebrow } from "@/components/shared/primitives";
import { viewportOnce, LUXURY_EASE } from "@/lib/motion";

const TESTIMONIALS = [
  { name: "Sofia R.", tier: "Connoisseur", city: "Brooklyn", text: "I've found my people. Every dinner feels like the start of a new chapter." },
  { name: "James P.", tier: "Collector", city: "London", text: "The pours are extraordinary. The conversations, even better." },
  { name: "Amara K.", tier: "Connoisseur", city: "Lisbon", text: "Nosey Palate didn't just teach me about wine. It widened my world." },
  { name: "Daniel V.", tier: "Collector", city: "Milan", text: "It's the only Saturday night I never want to miss." },
  { name: "Priya S.", tier: "Explorer", city: "New York", text: "I came for the wine. I stayed for the stories." },
  { name: "Henri G.", tier: "Collector", city: "Paris", text: "The closest thing to a salon I've found in this century." },
] as const;

export function Testimonials() {
  const doubled = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section className="relative overflow-hidden py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal className="mb-16 text-center">
          <Eyebrow>Members Speak</Eyebrow>
          <h2 className="mt-5 font-display text-[clamp(2rem,5vw,3.75rem)] leading-[1.1] tracking-tight text-ivory">
            What Belonging Sounds Like.
          </h2>
        </Reveal>
      </div>

      <div className="relative">
        <div
          aria-hidden
          className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-linear-to-r from-background to-transparent md:w-40"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-linear-to-l from-background to-transparent md:w-40"
        />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 1, ease: LUXURY_EASE }}
          className="marquee-wrapper"
        >
          <div className="marquee-track flex w-max gap-6">
            {doubled.map((t, i) => (
              <article
                key={`${t.name}-${i}`}
                className="glass w-[360px] shrink-0 rounded-2xl p-6 sm:w-[420px]"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="mb-4 h-6 w-6 text-gold/60"
                  aria-hidden
                >
                  <path
                    d="M10 8c-1.1 0-2 .9-2 2v3c0 1.1.9 2 2 2h1l-1 3h2l1-3c1.1 0 2-.9 2-2v-3c0-1.1-.9-2-2-2h-3zM3 8c-1.1 0-2 .9-2 2v3c0 1.1.9 2 2 2h1l-1 3h2l1-3c1.1 0 2-.9 2-2v-3c0-1.1-.9-2-2-2H3z"
                    fill="currentColor"
                  />
                </svg>
                <blockquote className="text-base leading-relaxed text-ivory/90">
                  &ldquo;{t.text}&rdquo;
                </blockquote>
                <div className="mt-5 flex items-center gap-3">
                  <div>
                    <p className="text-sm font-medium text-ivory">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.city}</p>
                  </div>
                  <span className="ml-auto rounded-full border border-gold/40 px-3 py-0.5 text-[0.6rem] uppercase tracking-widest text-gold">
                    {t.tier}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        .marquee-track {
          animation: marquee 60s linear infinite;
        }
        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
