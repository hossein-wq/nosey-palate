"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { LUXURY_EASE, viewportOnce } from "@/lib/motion";
import { Reveal, Eyebrow } from "@/components/shared/primitives";



export function Editorial() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const leftImgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const rightImgY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-32 lg:py-40"
    >
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
          <div className="pt-20 md:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 1.1, ease: LUXURY_EASE }}
              className="relative aspect-[3/4] overflow-hidden rounded-2xl"
            >
              <motion.img
                src="/images/editorial1.jpg"
                alt="Tasting notes editorial"
                style={{ y: leftImgY }}
                className="pointer-events-none absolute inset-0 h-[120%] w-full object-cover"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"
              />
            </motion.div>
            <Reveal delay={0.12}>
              <p className="mt-4 text-xs tracking-wide text-muted-foreground">
                Issue 04 · Tasting Notes
              </p>
            </Reveal>
          </div>

          <div className="flex flex-col justify-center pt-32 md:col-span-6">
            <div className="mx-auto max-w-lg text-center">
              <Eyebrow>Journal</Eyebrow>

              <Reveal delay={0.12}>
                <blockquote className="mt-8 font-serif text-2xl italic leading-relaxed tracking-tight md:text-3xl lg:text-4xl">
                  &ldquo;Wine is the only artwork you can drink. Every glass
                  tells the story of a place, a season, and the hands that
                  shaped it.&rdquo;
                </blockquote>
              </Reveal>

              <Reveal delay={0.24}>
                <div className="mt-8 flex flex-col items-center gap-1">
                  <span className="text-sm font-medium text-gold">
                    Lena Marchetti
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Head Sommelier
                  </span>
                </div>
              </Reveal>
            </div>
          </div>

          <div className="pt-44 md:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 1.1, ease: LUXURY_EASE, delay: 0.2 }}
              className="relative aspect-[3/4] overflow-hidden rounded-2xl"
            >
              <motion.img
                src="/images/editorial2.jpg"
                alt="Burgundy and Comté pairing"
                style={{ y: rightImgY }}
                className="pointer-events-none absolute inset-0 h-[120%] w-full object-cover"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"
              />
            </motion.div>
            <Reveal delay={0.32}>
              <p className="mt-4 text-xs tracking-wide text-muted-foreground">
                Pairing · Burgundy &amp; Comté
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
