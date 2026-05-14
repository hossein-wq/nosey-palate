"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { LUXURY_EASE } from "@/lib/motion";
import { Reveal, Eyebrow } from "@/components/shared/primitives";

const viewportOnce = { once: true, margin: "-80px" as const };

export function FinalCTA() {
  return (
    <section className="relative flex h-[80vh] min-h-[560px] items-center overflow-hidden">
      <Image
        src="/images/skyline.jpg"
        alt=""
        fill
        sizes="100vw"
        className="pointer-events-none object-cover"
        priority={false}
      />

      <div
        aria-hidden
        className="absolute inset-0 bg-linear-to-r from-background via-background/80 to-transparent"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-linear-to-t from-background via-background/40 to-transparent"
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-8">
        <div className="max-w-xl">
          <Reveal>
            <Eyebrow>Ready to Elevate</Eyebrow>
          </Reveal>
          <Reveal>
            <h2 className="mt-4 font-display text-3xl md:text-5xl lg:text-6xl">
              Your Wine Life{" "}
              <span className="font-serif italic text-gold-soft">
                Starts Here.
              </span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">
              Join a global community of wine lovers, creators, and curious
              minds. Your first pour is waiting.
            </p>
          </Reveal>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 1, ease: LUXURY_EASE, delay: 0.2 }}
            className="mt-10"
          >
            <a
              href="/membership"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gold px-8 py-4 text-sm font-medium text-background transition-all hover:shadow-glow-gold"
            >
              <span className="relative z-10">
                Apply for Membership →
              </span>
              <span
                aria-hidden
                className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full"
              />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
