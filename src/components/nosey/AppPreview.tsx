import { Eyebrow, Reveal } from "./primitives";
import { motion } from "framer-motion";

export function AppPreview() {
  return (
    <section className="relative overflow-hidden bg-background py-28 md:py-40">
      <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full" style={{
        background: "radial-gradient(closest-side, color-mix(in oklab, var(--burgundy) 40%, transparent), transparent 70%)",
        filter: "blur(80px)",
      }} />

      <div className="relative mx-auto grid max-w-[1400px] items-center gap-16 px-6 md:grid-cols-2 md:px-10">
        <div>
          <Eyebrow>Your Experience</Eyebrow>
          <Reveal>
            <h2 className="mt-6 font-display text-[clamp(2.25rem,4.5vw,3.5rem)] leading-[1] tracking-tight text-ivory">
              Your Membership.<br /><span className="italic text-gold-soft">In Your Pocket.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-md text-ivory/65">
              RSVP in one tap, unlock exclusive perks, and stay connected wherever you go — your invitations travel with you.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-8 flex flex-wrap gap-3">
              {["App Store", "Google Play"].map((s) => (
                <a key={s} href="#" className="glass flex items-center gap-3 rounded-md px-5 py-3 transition hover:border-gold/50">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-ivory">
                    {s === "App Store" ? <path d="M17.05 20.28c-.98.95-2.05.86-3.08.43-1.09-.46-2.09-.48-3.24 0-1.44.6-2.2.4-3.06-.43C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.78 1.18-.18 2.31-.86 3.51-.78 1.42.13 2.5.7 3.21 1.7-2.91 1.74-2.42 5.94.42 7.2-.65 1.59-1.43 3.18-2.22 4.07zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" /> : <path d="M3 20.5V3.5l9.5 8.5L3 20.5zm10.5-7.5l3.6 3.6-9.6 5.4 6-9zm0-3l-6-9 9.6 5.4-3.6 3.6zm6.7 4.6L17 12l3.2-2.6c.7.4.7 5.2 0 5.6z" />}
                  </svg>
                  <div className="text-left leading-tight">
                    <div className="text-[9px] uppercase tracking-wider text-ivory/55">Get it on</div>
                    <div className="text-sm text-ivory">{s}</div>
                  </div>
                </a>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Phone + card mockup */}
        <div className="relative flex h-[560px] items-center justify-center">
          {/* Membership card behind */}
          <motion.div
            initial={{ opacity: 0, rotate: 0, x: 0 }}
            whileInView={{ opacity: 1, rotate: 18, x: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-2 top-12 h-[260px] w-[420px] rounded-2xl shadow-[0_30px_80px_rgba(0,0,0,0.6),0_0_60px_color-mix(in_oklab,var(--gold)_25%,transparent)]"
            style={{
              background: "linear-gradient(135deg, oklch(0.18 0.03 30), oklch(0.12 0.02 30))",
              border: "1px solid color-mix(in oklab, var(--gold) 40%, transparent)",
            }}
          >
            <div className="flex h-full flex-col justify-between p-7 text-ivory">
              <div className="text-center">
                <div className="font-display text-xl tracking-wide">NOSEY</div>
                <div className="-mt-1 font-serif italic text-lg text-gold-soft">Palate</div>
              </div>
              <svg width="70" height="70" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1" className="self-center text-gold/70">
                <circle cx="50" cy="50" r="40" />
                <text x="50" y="60" textAnchor="middle" fontFamily="serif" fontSize="32" fill="currentColor" stroke="none">NP</text>
              </svg>
              <div className="text-center text-[10px] uppercase tracking-[0.4em] text-gold-soft/80">Connoisseur Member</div>
            </div>
          </motion.div>

          {/* Phone */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative h-[540px] w-[270px] rounded-[44px] p-[10px] shadow-[0_40px_100px_rgba(0,0,0,0.7),0_0_80px_color-mix(in_oklab,var(--gold)_30%,transparent)]"
            style={{
              background: "linear-gradient(180deg, oklch(0.22 0.02 30), oklch(0.08 0.01 30))",
              border: "1px solid color-mix(in oklab, var(--gold) 35%, transparent)",
            }}
          >
            <div className="relative h-full w-full overflow-hidden rounded-[34px] bg-espresso text-ivory">
              <div className="absolute left-1/2 top-2 z-10 h-5 w-20 -translate-x-1/2 rounded-full bg-black" />
              <div className="px-5 pt-10">
                <div className="text-center">
                  <div className="font-display text-base">NOSEY</div>
                  <div className="-mt-0.5 font-serif italic text-sm text-gold-soft">Palate</div>
                </div>
                <div className="mt-5 glass rounded-lg p-3">
                  <div className="flex items-center gap-2.5">
                    <div className="h-9 w-9 rounded-full bg-gold/30" />
                    <div className="text-[11px] leading-tight">
                      <div>Alex Morgan</div>
                      <div className="text-[9px] text-gold">Connoisseur</div>
                      <div className="text-[8px] text-ivory/50">Member since May 2023</div>
                    </div>
                  </div>
                </div>
                <div className="mt-3 glass rounded-lg p-3">
                  <div className="text-[8px] uppercase tracking-wider text-gold">Next Event</div>
                  <div className="mt-1 text-xs">Sommelier Dinner Series</div>
                  <div className="text-[9px] text-ivory/55">Jun 22 · 7:30 PM</div>
                  <div className="text-[9px] text-ivory/55">Private Location</div>
                  <div className="mt-2 grid h-12 w-12 place-items-center rounded bg-ivory/10">
                    <div className="h-9 w-9 bg-[radial-gradient(circle,var(--ivory)_1px,transparent_1px)] bg-[length:3px_3px] opacity-80" />
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <div className="text-[10px] text-ivory/70">Upcoming Events</div>
                  <div className="text-[9px] text-gold">View All</div>
                </div>
              </div>
              <div className="absolute inset-x-3 bottom-3 flex items-center justify-around glass rounded-full py-2 text-[9px]">
                {["Home", "Events", "Community", "Profile"].map((t, i) => (
                  <div key={t} className={i === 0 ? "text-gold" : "text-ivory/60"}>{t}</div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
