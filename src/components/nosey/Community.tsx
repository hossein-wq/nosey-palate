import communityImg from "@/assets/community.jpg";
import { Eyebrow, Reveal } from "./primitives";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const AVATARS = [
  "https://i.pravatar.cc/120?img=12",
  "https://i.pravatar.cc/120?img=32",
  "https://i.pravatar.cc/120?img=47",
  "https://i.pravatar.cc/120?img=58",
];

export function Community() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section id="community" ref={ref} className="relative h-[80vh] min-h-[560px] w-full overflow-hidden">
      <motion.img style={{ y }} src={communityImg} alt="Members toasting at sunset" loading="lazy" className="absolute inset-0 h-[120%] w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background/70" />

      <div className="relative mx-auto flex h-full max-w-[1400px] items-center px-6 md:px-10">
        <div className="max-w-lg">
          <Eyebrow>Community</Eyebrow>
          <Reveal>
            <h2 className="mt-6 font-display text-[clamp(2.5rem,5vw,4rem)] leading-[1] tracking-tight text-ivory">
              Good Wine.<br /><span className="italic">Great People.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-6 text-ivory/70">
              Our members aren't just wine lovers — they're creatives, founders, travelers, and tastemakers gathered around the same table.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-8 flex items-center gap-4">
              <div className="flex -space-x-3">
                {AVATARS.map((src, i) => (
                  <motion.img
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + i * 0.08 }}
                    src={src} alt="" loading="lazy"
                    className="h-11 w-11 rounded-full border-2 border-background object-cover"
                  />
                ))}
              </div>
              <span className="text-sm text-ivory/80">2,500+ Members Worldwide</span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
