"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { LUXURY_EASE } from "@/lib/motion";
import { Eyebrow, Spotlight } from "@/components/shared/primitives";



export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section
      ref={sectionRef}
      className="relative h-svh min-h-[760px] overflow-hidden"
    >
      <motion.img
        src="/images/hero.jpg"
        alt=""
        aria-hidden
        style={{ y: bgY }}
        className="pointer-events-none absolute inset-0 h-[120%] w-full object-cover"
      />

      <div
        aria-hidden
        className="absolute inset-0 bg-linear-to-r from-background via-background/80 to-transparent"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-linear-to-t from-background via-background/40 to-transparent"
      />

      <div className="grain vignette absolute inset-0" />

      <Spotlight className="-left-40 top-1/4 bg-[radial-gradient(circle,oklch(0.32_0.13_15/0.3),transparent_70%)]" />
      <Spotlight className="-right-40 top-1/3 bg-[radial-gradient(circle,oklch(0.55_0.18_30/0.25),transparent_70%)]" />

      <div className="relative z-10 flex h-full items-center">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
            <div className="flex flex-col justify-center md:col-span-7">
              <div className="mb-6"><Eyebrow>A Private Wine Community</Eyebrow></div>

              <motion.h1
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: LUXURY_EASE, delay: 0.12 }}
                className="font-display text-4xl leading-[1.08] tracking-tight md:text-5xl lg:text-6xl xl:text-7xl"
              >
                Better Wine. Better People.
                <br />
                <span className="font-serif italic text-gold-soft">
                  Real Connection.
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.1, ease: LUXURY_EASE, delay: 0.24 }}
                className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground md:text-lg"
              >
                Nosey Palate is a members-only community for those who love
                wine, meaningful conversations, and unforgettable experiences.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: LUXURY_EASE, delay: 0.36 }}
                className="mt-10 flex flex-wrap items-center gap-4"
              >
                <Link
                  href="/membership"
                  className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gold px-7 py-3.5 text-sm font-medium text-background transition-all hover:shadow-glow-gold"
                >
                  <span className="relative z-10">
                    Apply for Membership &rarr;
                  </span>
                  <span
                    aria-hidden
                    className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full"
                  />
                </Link>

                <button
                  type="button"
                  className="inline-flex items-center gap-3 text-sm text-foreground/80 transition-colors hover:text-gold"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/40">
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="ml-0.5 h-4 w-4 text-gold"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                  Watch the Experience
                </button>
              </motion.div>
            </div>

            <div className="hidden items-center justify-end md:col-span-5 md:flex">
              <div className="relative flex flex-col items-end gap-8">
                <motion.p
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1.4, ease: LUXURY_EASE, delay: 0.5 }}
                  className="text-right font-serif text-3xl italic leading-snug lg:text-4xl xl:text-5xl"
                  style={{
                    color: "oklch(0.86 0.09 85 / 0.15)",
                    textShadow:
                      "0 0 60px oklch(0.78 0.13 80 / 0.25), 0 0 120px oklch(0.78 0.13 80 / 0.1)",
                  }}
                >
                  Better Wine
                  <br />
                  Better People
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.1, ease: LUXURY_EASE, delay: 0.6 }}
                  className="glass-strong w-72 rounded-2xl p-5"
                >
                  <p className="eyebrow mb-3 text-[0.65rem]">Next Event</p>
                  <h3 className="font-display text-lg">
                    Burgundy with Friends
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Wine Tasting
                  </p>
                  <div className="mt-3 flex flex-col gap-1.5 text-xs text-muted-foreground">
                    <span>Sat, Jun 15 · 7:00 PM</span>
                    <span>The Loft, West Village</span>
                  </div>
                  <Link
                    href="/events"
                    className="mt-4 inline-block text-xs font-medium text-gold transition-colors hover:text-gold-soft"
                  >
                    View Event &rarr;
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <div className="flex h-8 w-5 items-start justify-center rounded-full border border-gold/30 p-1">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="h-1.5 w-1 rounded-full bg-gold"
          />
        </div>
      </motion.div>
    </section>
  );
}
