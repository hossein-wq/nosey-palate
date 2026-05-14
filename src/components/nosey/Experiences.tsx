import loungeImg from "@/assets/lounge.jpg";
import { Eyebrow, Reveal } from "./primitives";
import { motion } from "framer-motion";

const ICONS = [
  { label: "Sommelier-Led Tastings", path: "M8 2h8M9 2v6a3 3 0 003 3v0a3 3 0 003-3V2M12 11v8m-3 3h6" },
  { label: "Private Winery Experiences", path: "M3 21h18M5 21V8l7-5 7 5v13M9 21v-7h6v7M10 11h4" },
  { label: "Chef Pairing Dinners", path: "M6 3v9m12-9v6a3 3 0 01-3 3v9M9 3v9m9 9H6" },
  { label: "Global Wine Journeys", path: "M12 2a10 10 0 100 20 10 10 0 000-20zm0 0a13 13 0 010 20M2 12h20" },
  { label: "Members-Only Invitations", path: "M5 7h14v12H5zM5 7l7 5 7-5M5 7V5h14v2" },
];

export function Experiences() {
  return (
    <section id="experiences" className="relative overflow-hidden py-24 md:py-32">
      <img src={loungeImg} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-60" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/30 to-background" />
      <div className="absolute inset-0 bg-burgundy/30 mix-blend-multiply" />

      <div className="relative mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <Eyebrow>Exclusive Experiences</Eyebrow>
            <Reveal>
              <h2 className="mt-6 font-display text-[clamp(2.25rem,4.5vw,3.5rem)] leading-[1] tracking-tight text-ivory">
                Go Beyond<br /><span className="italic">the Glass.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-5 text-ivory/65 max-w-sm">
                Our members go further. We create moments you can't get anywhere else.
              </p>
              <a href="#all" className="mt-6 inline-flex items-center gap-2 text-sm text-gold border-b border-gold/30 pb-1">
                See All Experiences <span>→</span>
              </a>
            </Reveal>
          </div>

          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {ICONS.map((icon, i) => (
              <motion.div
                key={icon.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="group flex flex-col items-center text-center"
              >
                <div className="relative flex h-16 w-16 items-center justify-center">
                  <div className="absolute inset-0 rounded-full bg-gold/0 blur-xl transition-all duration-500 group-hover:bg-gold/30" />
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" className="relative text-gold">
                    <path d={icon.path} />
                  </svg>
                </div>
                <span className="mt-4 text-sm font-display text-ivory leading-snug">{icon.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
