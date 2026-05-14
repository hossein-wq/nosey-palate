"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { LUXURY_EASE, viewportOnce } from "@/lib/motion";
import { Reveal, Eyebrow } from "@/components/shared/primitives";



const AVATARS = [
  "https://i.pravatar.cc/96?img=12",
  "https://i.pravatar.cc/96?img=32",
  "https://i.pravatar.cc/96?img=47",
  "https://i.pravatar.cc/96?img=58",
];

export function Community() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section
      ref={sectionRef}
      className="relative h-[80vh] min-h-[560px] overflow-hidden"
    >
      <motion.img
        src="/images/community.jpg"
        alt=""
        aria-hidden
        style={{ y: imgY }}
        className="pointer-events-none absolute inset-0 h-[120%] w-full object-cover"
      />

      <div
        aria-hidden
        className="absolute inset-0 bg-linear-to-r from-background via-background/70 to-transparent"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-linear-to-t from-background/60 via-transparent to-background/40"
      />

      <div className="relative z-10 flex h-full items-center">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <div className="max-w-xl">
            <div className="mb-6"><Eyebrow>Community</Eyebrow></div>

            <Reveal>
              <h2 className="font-display text-3xl leading-tight tracking-tight md:text-4xl lg:text-5xl">
                Good Wine.
                <br />
                <span className="font-serif italic text-gold-soft">
                  Great People.
                </span>
              </h2>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
                Our members are creatives, founders, and travelers united by
                curiosity and a love of great wine. This is where conversations
                go deeper and connections become lasting.
              </p>
            </Reveal>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 1.1, ease: LUXURY_EASE, delay: 0.24 }}
              className="mt-10 flex items-center gap-4"
            >
              <div className="flex -space-x-3">
                {AVATARS.map((src, i) => (
                  <motion.img
                    key={src}
                    src={src}
                    alt=""
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={viewportOnce}
                    transition={{
                      duration: 0.6,
                      ease: LUXURY_EASE,
                      delay: 0.36 + i * 0.12,
                    }}
                    className="h-10 w-10 rounded-full border-2 border-background object-cover"
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                2,500+ Members Worldwide
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
