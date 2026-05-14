"use client";

import { motion } from "framer-motion";
import { LUXURY_EASE, viewportOnce, staggerContainer } from "@/lib/motion";
import { Reveal, Eyebrow } from "@/components/shared/primitives";
import { LOYALTY_TIERS } from "@/lib/constants";



export function Loyalty() {
  return (
    <section className="relative overflow-hidden py-32 lg:py-40">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_50%_60%,oklch(0.32_0.13_15/0.2),transparent)]"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-2">
          {/* Left column */}
          <Reveal>
            <Eyebrow>Loyalty &amp; Access</Eyebrow>
            <h2 className="mt-5 font-display text-[clamp(2rem,5vw,3.75rem)] leading-[1.1] tracking-tight text-ivory">
              The More You Join,{" "}
              <span className="font-serif italic text-gold-soft">
                The More You Unlock.
              </span>
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-ivory/60">
              Every event, every pour, every conversation earns you loyalty
              points — unlocking elevated tiers and exclusive access.
            </p>
          </Reveal>

          {/* Right column — tier grid */}
          <div className="relative">
            {/* Connecting line */}
            <div
              aria-hidden
              className="absolute left-0 right-0 top-12 hidden h-px bg-linear-to-r from-transparent via-gold/40 to-transparent lg:block"
            />

            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={viewportOnce}
              className="grid grid-cols-2 gap-6 lg:grid-cols-4"
            >
              {LOYALTY_TIERS.map((tier, i) => (
                <motion.div
                  key={tier.name}
                  variants={{
                    initial: { opacity: 0, y: 24 },
                    animate: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 1, delay: i * 0.12, ease: LUXURY_EASE },
                    },
                  }}
                  className="relative flex flex-col items-center text-center"
                >
                  {/* Glow orb */}
                  <div
                    aria-hidden
                    className="absolute -top-2 h-24 w-24 rounded-full opacity-30 blur-2xl"
                    style={{ background: tier.color }}
                  />

                  <div className="relative flex h-20 w-20 items-center justify-center rounded-full border border-gold/20 bg-background/60">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-8 w-8"
                      style={{ color: tier.color }}
                    >
                      <path d={tier.icon} />
                    </svg>
                  </div>

                  <p className="mt-4 font-serif text-sm italic text-ivory">
                    {tier.name}
                  </p>
                  <p className="mt-1 text-[0.65rem] text-muted-foreground">
                    {tier.range}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
