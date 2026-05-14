import { Eyebrow, Reveal } from "./primitives";
import { motion } from "framer-motion";

const TIERS = [
  { name: "Explorer", range: "0 – 499 pts", icon: "M7 2h10l-2 12a3 3 0 01-3 3v0a3 3 0 01-3-3L7 2zM12 17v5m-3 0h6", color: "var(--gold-soft)" },
  { name: "Connoisseur", range: "500 – 1499 pts", icon: "M3 9l3-5 6 4 6-4 3 5v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z", color: "oklch(0.7 0.22 18)" },
  { name: "Collector", range: "1500 – 2999 pts", icon: "M12 2L2 9l10 13L22 9 12 2z", color: "oklch(0.7 0.22 290)" },
  { name: "Grand Cru", range: "3000+ pts", icon: "M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z", color: "var(--gold)" },
];

export function Loyalty() {
  return (
    <section className="relative overflow-hidden bg-background py-28 md:py-36">
      <div className="absolute inset-0 opacity-40" style={{
        background: "radial-gradient(ellipse at 50% 60%, color-mix(in oklab, var(--burgundy) 55%, transparent), transparent 60%)",
      }} />

      <div className="relative mx-auto grid max-w-[1400px] items-center gap-12 px-6 md:grid-cols-12 md:px-10">
        <div className="md:col-span-4">
          <Eyebrow>Loyalty & Access</Eyebrow>
          <Reveal>
            <h2 className="mt-6 font-display text-[clamp(2.25rem,4.5vw,3.25rem)] leading-[1] tracking-tight text-ivory">
              The More You Join,<br /><span className="italic">The More You Unlock.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-5 max-w-sm text-ivory/65">
              Earn status, unlock perks, and get closer to unforgettable experiences with every event.
            </p>
          </Reveal>
        </div>

        <div className="md:col-span-8">
          <div className="relative">
            <div className="absolute left-0 right-0 top-9 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              {TIERS.map((t, i) => (
                <motion.div
                  key={t.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                  className="text-center"
                >
                  <div className="relative mx-auto flex h-20 w-20 items-center justify-center">
                    <div className="absolute inset-0 rounded-full" style={{ background: `radial-gradient(closest-side, ${t.color} 0%, transparent 70%)`, opacity: 0.4, filter: "blur(20px)" }} />
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={t.color} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" className="relative">
                      <path d={t.icon} />
                    </svg>
                  </div>
                  <div className="mt-5 font-display text-xl text-ivory italic">{t.name}</div>
                  <div className="mt-1 text-xs text-ivory/55">{t.range}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
