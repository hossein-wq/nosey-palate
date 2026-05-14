"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { LUXURY_EASE, viewportOnce } from "@/lib/motion";
import { Reveal, Eyebrow } from "@/components/shared/primitives";
import { MEMBERSHIP_TIERS } from "@/lib/constants";



export function MembershipTiers() {
  return (
    <section className="relative overflow-hidden py-32 lg:py-40">
      <img
        src="/images/vineyard.jpg"
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-50"
      />

      <div
        aria-hidden
        className="absolute inset-0 bg-linear-to-t from-background via-background/90 to-background/70"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-linear-to-r from-background/80 to-transparent"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          <div className="lg:sticky lg:top-32 lg:col-span-4 lg:self-start">
            <div className="mb-6"><Eyebrow>Membership</Eyebrow></div>

            <Reveal>
              <h2 className="font-display text-3xl leading-tight tracking-tight md:text-4xl lg:text-5xl">
                More Than Access.
                <br />
                <span className="font-serif italic text-gold-soft">
                  It&apos;s Belonging.
                </span>
              </h2>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
                Three tiers designed for every stage of your wine journey. Each
                one unlocks a deeper layer of community, access, and experience.
              </p>
            </Reveal>

            <Reveal delay={0.24}>
              <a
                href="/membership"
                className="mt-8 inline-block text-sm font-medium text-gold transition-colors hover:text-gold-soft"
              >
                Explore Membership →
              </a>
            </Reveal>
          </div>

          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {MEMBERSHIP_TIERS.map((tier, i) => (
                <motion.div
                  key={tier.slug}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewportOnce}
                  transition={{
                    duration: 1.1,
                    ease: LUXURY_EASE,
                    delay: i * 0.12,
                  }}
                  className={cn(
                    "glass flex flex-col rounded-2xl p-6",
                    tier.featured &&
                      "mt-0 ring-1 ring-gold/60 shadow-luxe lg:-mt-6",
                  )}
                >
                  {tier.featured && (
                    <span className="mb-4 inline-flex self-start rounded-full bg-gold/15 px-3 py-1 text-[0.65rem] font-medium uppercase tracking-widest text-gold">
                      Most Popular
                    </span>
                  )}

                  <h3 className="font-display text-xl italic">{tier.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {tier.tagline}
                  </p>

                  <div className="mt-6">
                    <span className="font-display text-4xl tracking-tight">
                      ${tier.price}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      /month
                    </span>
                  </div>

                  <ul className="mt-6 flex flex-col gap-3">
                    {tier.perks.map((perk) => (
                      <li
                        key={perk}
                        className="flex items-start gap-2.5 text-sm text-foreground/80"
                      >
                        <svg
                          viewBox="0 0 20 20"
                          fill="none"
                          className="mt-0.5 h-4 w-4 shrink-0"
                        >
                          <path
                            d="M6 10l3 3 5-6"
                            stroke="var(--gold)"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        {perk}
                      </li>
                    ))}
                  </ul>

                  <a
                    href={`/membership?tier=${tier.slug}`}
                    className={cn(
                      "mt-8 inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium transition-all",
                      tier.featured
                        ? "bg-gold text-background hover:shadow-glow-gold"
                        : "border border-gold/30 text-gold hover:bg-gold/10",
                    )}
                  >
                    Join Now
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
