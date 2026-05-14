import editorial1 from "@/assets/editorial1.jpg";
import editorial2 from "@/assets/editorial2.jpg";
import { Eyebrow, Reveal } from "./primitives";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function Editorial() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["-5%", "15%"]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-background py-28 md:py-40">
      <div className="mx-auto grid max-w-[1400px] gap-10 px-6 md:grid-cols-12 md:gap-14 md:px-10">
        <div className="md:col-span-3 md:pt-20">
          <motion.div style={{ y: y2 }} className="overflow-hidden rounded-md">
            <img src={editorial1} alt="" loading="lazy" className="h-[420px] w-full object-cover md:h-[520px]" />
          </motion.div>
          <Reveal delay={0.15}>
            <p className="mt-5 text-[11px] uppercase tracking-[0.25em] text-ivory/40">
              Issue 04 · Tasting Notes
            </p>
          </Reveal>
        </div>

        <div className="md:col-span-6 md:pt-32">
          <Eyebrow>Journal</Eyebrow>
          <Reveal>
            <p className="mt-8 font-display text-[clamp(1.75rem,3.6vw,3rem)] leading-[1.1] tracking-tight text-ivory">
              <span className="text-gold-soft italic">"</span>
              A great bottle is never about the wine alone — it's about the silence between sips, the people across the table, the night that becomes a story.
              <span className="text-gold-soft italic">"</span>
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-10 flex items-center gap-4 text-sm text-ivory/60">
              <span className="h-px w-10 bg-gold/50" />
              <span>Lena Marchetti, Head Sommelier</span>
            </div>
          </Reveal>
        </div>

        <div className="md:col-span-3 md:pt-44">
          <motion.div style={{ y: y1 }} className="overflow-hidden rounded-md">
            <img src={editorial2} alt="" loading="lazy" className="h-[340px] w-full object-cover md:h-[400px]" />
          </motion.div>
          <Reveal delay={0.2}>
            <p className="mt-5 text-[11px] uppercase tracking-[0.25em] text-ivory/40">
              Pairing · Burgundy & Comté
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
