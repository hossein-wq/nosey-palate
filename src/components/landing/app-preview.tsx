"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { LUXURY_EASE } from "@/lib/motion";
import { Reveal, Eyebrow } from "@/components/shared/primitives";

const viewportOnce = { once: true, margin: "-80px" as const };

export function AppPreview() {
  return (
    <section className="relative overflow-hidden py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <div>
            <Reveal>
              <Eyebrow>Your Experience</Eyebrow>
            </Reveal>
            <Reveal>
              <h2 className="mt-4 font-display text-3xl md:text-5xl lg:text-6xl">
                Your Membership.{" "}
                <span className="font-serif italic text-gold-soft">
                  In Your Pocket.
                </span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">
                Browse upcoming events, manage your membership, connect with
                fellow members, and carry your digital membership card — all
                from the Nosey Palate app.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-10 flex flex-wrap gap-4">
                <a
                  href="#"
                  className="glass inline-flex items-center gap-3 rounded-xl px-5 py-3 transition-colors hover:bg-gold/10"
                >
                  <svg viewBox="0 0 24 24" className="h-7 w-7 text-ivory">
                    <path
                      fill="currentColor"
                      d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"
                    />
                  </svg>
                  <div className="text-left">
                    <p className="text-[0.6rem] uppercase tracking-wider text-muted-foreground">
                      Download on the
                    </p>
                    <p className="text-sm font-medium text-ivory">App Store</p>
                  </div>
                </a>
                <a
                  href="#"
                  className="glass inline-flex items-center gap-3 rounded-xl px-5 py-3 transition-colors hover:bg-gold/10"
                >
                  <svg viewBox="0 0 24 24" className="h-7 w-7 text-ivory">
                    <path
                      fill="currentColor"
                      d="M3 20.5v-17c0-.59.34-1.11.84-1.35L13.69 12l-9.85 9.85c-.5-.24-.84-.76-.84-1.35zm13.81-5.38L6.05 21.34l8.49-8.49 2.27 2.27zm.91-.91L19.59 12 17.72 10.5l-2.45 2.45 2.45 1.26zm-1.28-5.76L6.05 2.66l10.76 6.22-1.27 .57z"
                    />
                  </svg>
                  <div className="text-left">
                    <p className="text-[0.6rem] uppercase tracking-wider text-muted-foreground">
                      Get it on
                    </p>
                    <p className="text-sm font-medium text-ivory">
                      Google Play
                    </p>
                  </div>
                </a>
              </div>
            </Reveal>
          </div>

          <div className="relative flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, x: 40, rotate: 18 }}
              whileInView={{ opacity: 1, x: 60, rotate: 18 }}
              viewport={viewportOnce}
              transition={{ duration: 1.4, ease: LUXURY_EASE, delay: 0.2 }}
              className="absolute h-[420px] w-[260px] rounded-2xl border border-gold/30 bg-linear-to-br from-espresso via-background to-espresso p-6 shadow-luxe md:h-[480px] md:w-[300px]"
            >
              <div className="flex h-full flex-col items-center justify-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border border-gold/40">
                  <span className="font-display text-xl tracking-[0.2em] text-gold">
                    NP
                  </span>
                </div>
                <p className="mt-4 text-xs uppercase tracking-[0.3em] text-gold/80">
                  Connoisseur Member
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 1.2, ease: LUXURY_EASE }}
              className="relative z-10 w-[280px] rounded-[44px] border border-gold/20 bg-espresso p-3 shadow-luxe md:w-[320px]"
            >
              <div className="overflow-hidden rounded-[34px] bg-background">
                <div className="relative flex h-[540px] flex-col md:h-[600px]">
                  <div className="mx-auto mt-3 h-6 w-28 rounded-full bg-espresso" />

                  <div className="flex items-center justify-center py-4">
                    <div className="flex flex-col items-center leading-none">
                      <span className="font-display text-sm tracking-[0.2em] text-gold">
                        NOSEY
                      </span>
                      <span className="font-serif text-[0.65rem] italic text-ivory/80">
                        Palate
                      </span>
                    </div>
                  </div>

                  <div className="flex-1 space-y-4 px-4 pb-4">
                    <div className="glass rounded-xl p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/20">
                          <span className="text-xs font-medium text-gold">
                            LM
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-ivory">
                            Lena M.
                          </p>
                          <p className="text-[0.65rem] text-gold">
                            Connoisseur
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="glass rounded-xl p-4">
                      <p className="eyebrow mb-2 text-[0.55rem]">Next Event</p>
                      <p className="font-display text-sm text-ivory">
                        Burgundy with Friends
                      </p>
                      <p className="mt-1 text-[0.65rem] text-muted-foreground">
                        Sat, Jun 15 · 7:00 PM
                      </p>
                      <div className="mt-3 rounded-lg bg-gold/10 px-3 py-1.5 text-center text-[0.65rem] font-medium text-gold">
                        RSVP
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-around border-t border-border px-2 py-3">
                    {["Home", "Events", "Card", "Profile"].map((tab) => (
                      <div
                        key={tab}
                        className="flex flex-col items-center gap-1"
                      >
                        <div
                          className={cn(
                            "h-4 w-4 rounded-full",
                            tab === "Home"
                              ? "bg-gold"
                              : "bg-muted-foreground/30",
                          )}
                        />
                        <span
                          className={cn(
                            "text-[0.55rem]",
                            tab === "Home"
                              ? "text-gold"
                              : "text-muted-foreground",
                          )}
                        >
                          {tab}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
