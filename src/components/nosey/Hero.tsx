import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import heroImg from "@/assets/hero.jpg";
import { Eyebrow } from "./primitives";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.55, 0.85]);

  return (
    <section ref={ref} className="relative h-[100svh] min-h-[760px] w-full overflow-hidden bg-background grain vignette">
      <motion.img
        src={heroImg}
        alt="Members at a candlelit wine bar"
        style={{ y: imgY }}
        className="absolute inset-0 h-[120%] w-full object-cover"
        fetchPriority="high"
      />
      <motion.div style={{ opacity: overlayOpacity }} className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-background/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-background/40" />

      {/* Spotlight glows */}
      <div className="absolute -left-40 top-1/2 h-[600px] w-[600px] -translate-y-1/2 rounded-full" style={{ background: "radial-gradient(closest-side, color-mix(in oklab, var(--burgundy) 60%, transparent), transparent 70%)", filter: "blur(60px)" }} />
      <div className="absolute right-[10%] top-[15%] h-[500px] w-[500px] rounded-full" style={{ background: "radial-gradient(closest-side, color-mix(in oklab, var(--ember) 35%, transparent), transparent 70%)", filter: "blur(80px)" }} />

      <motion.div style={{ y: textY }} className="relative mx-auto flex h-full max-w-[1400px] items-end px-6 pb-20 pt-28 md:items-center md:px-10 md:pb-0">
        <div className="grid w-full items-end gap-12 md:grid-cols-12 md:items-center">
          {/* Left content */}
          <div className="md:col-span-7 lg:col-span-6">
            <Eyebrow>A Private Wine Community</Eyebrow>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 font-display text-[clamp(2.75rem,7vw,5.75rem)] leading-[0.95] tracking-tight text-ivory"
            >
              Better Wine.<br />
              Better People.<br />
              <span className="font-serif italic text-gold-soft">Real Connection.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="mt-7 max-w-md text-[15px] leading-relaxed text-ivory/65"
            >
              Nosey Palate is a members-only community for those who love wine, meaningful conversations, and unforgettable experiences.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="mt-9 flex flex-wrap items-center gap-6"
            >
              <a href="#apply" className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gold px-7 py-4 text-sm font-medium text-espresso transition-all hover:shadow-[0_0_50px_color-mix(in_oklab,var(--gold)_55%,transparent)]">
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
                Apply for Membership
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </a>
              <button className="group inline-flex items-center gap-3 text-sm text-ivory/85">
                <span className="relative flex h-10 w-10 items-center justify-center rounded-full border border-gold/40 transition-all group-hover:border-gold group-hover:bg-gold/10">
                  <span className="absolute inset-0 animate-ping rounded-full border border-gold/30" />
                  <svg width="10" height="12" viewBox="0 0 10 12" fill="currentColor" className="text-gold ml-0.5"><path d="M0 0v12l10-6z" /></svg>
                </span>
                Watch the Experience
              </button>
            </motion.div>
          </div>

          {/* Neon italic accent */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 1.1 }}
            className="pointer-events-none absolute right-[6%] top-[18%] hidden md:block"
          >
            <p className="font-serif italic leading-[0.9] text-[clamp(2.5rem,5vw,4.5rem)]" style={{
              color: "oklch(0.85 0.18 15)",
              textShadow: "0 0 20px oklch(0.7 0.22 18 / 80%), 0 0 40px oklch(0.65 0.22 18 / 60%), 0 0 80px oklch(0.6 0.22 18 / 40%)",
            }}>
              Better Wine<br />Better People
            </p>
          </motion.div>

          {/* Next event card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1.3, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-5 md:col-start-8 lg:col-span-4 lg:col-start-9"
          >
            <div className="glass-strong group relative rounded-md p-6 transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-glow-gold)]">
              <div className="flex items-center justify-between">
                <span className="eyebrow">Next Event</span>
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold" />
              </div>
              <h3 className="mt-4 font-display text-2xl text-ivory">Burgundy with Friends</h3>
              <p className="mt-1 text-xs text-gold">Wine Tasting · 20 spots left</p>
              <div className="mt-5 space-y-2.5 text-sm text-ivory/75">
                <div className="flex items-center gap-2.5">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gold"><rect x="3" y="5" width="18" height="16" rx="1" /><path d="M3 9h18M8 3v4M16 3v4" /></svg>
                  Sat, Jun 15 · 7:00 PM
                </div>
                <div className="flex items-center gap-2.5">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gold"><path d="M12 22s8-7.5 8-13a8 8 0 10-16 0c0 5.5 8 13 8 13z" /><circle cx="12" cy="9" r="2.5" /></svg>
                  The Loft, West Village
                </div>
              </div>
              <div className="mt-5 border-t border-gold/15 pt-4">
                <a href="#event" className="group/cta flex items-center justify-between text-sm text-ivory">
                  <span>View Event</span>
                  <span className="flex h-7 w-7 items-center justify-center rounded-full border border-gold/30 transition-all group-hover/cta:border-gold group-hover/cta:bg-gold group-hover/cta:text-espresso">→</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 md:block"
      >
        <div className="flex h-10 w-6 justify-center rounded-full border border-gold/30 pt-2">
          <motion.span animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} className="h-1.5 w-px bg-gold" />
        </div>
      </motion.div>
    </section>
  );
}
