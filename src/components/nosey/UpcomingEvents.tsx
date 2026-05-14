import event1 from "@/assets/event1.jpg";
import event2 from "@/assets/event2.jpg";
import event3 from "@/assets/event3.jpg";
import { Eyebrow, Reveal } from "./primitives";
import { motion } from "framer-motion";

const EVENTS = [
  { date: "JUN 15", title: "Burgundy with Friends", type: "Wine Tasting", loc: "The Loft, West Village", spots: "20 Spots Left", img: event1 },
  { date: "JUN 22", title: "Sommelier Dinner Series", type: "5 Course Pairing", loc: "Private Location", spots: "12 Spots Left", img: event2 },
  { date: "JUN 29", title: "Champagne & Oysters", type: "Tasting Experience", loc: "The Williamsburg Hotel", spots: "15 Spots Left", img: event3 },
];

export function UpcomingEvents() {
  return (
    <section id="events" className="relative overflow-hidden bg-background py-28 md:py-40">
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: "linear-gradient(color-mix(in oklab, var(--gold) 8%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in oklab, var(--gold) 8%, transparent) 1px, transparent 1px)",
        backgroundSize: "80px 80px",
        maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
      }} />

      <div className="relative mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid items-end gap-10 md:grid-cols-12 mb-14">
          <div className="md:col-span-5">
            <Eyebrow>Upcoming Events</Eyebrow>
            <Reveal>
              <h2 className="mt-6 font-display text-[clamp(2.5rem,5vw,4rem)] leading-[1] tracking-tight text-ivory">
                Experiences Worth<br /><span className="italic">Dressing Up For.</span>
              </h2>
            </Reveal>
          </div>
          <div className="md:col-span-5 md:col-start-7">
            <Reveal delay={0.15}>
              <p className="text-ivory/60 max-w-md">
                Handpicked evenings designed for connection, discovery, and moments you'll talk about for years.
              </p>
              <a href="#all" className="mt-5 inline-flex items-center gap-2 text-sm text-gold border-b border-gold/30 pb-1">
                View All Events <span>→</span>
              </a>
            </Reveal>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {EVENTS.map((e, i) => (
            <motion.article
              key={e.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.1, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="group relative aspect-[3/4] overflow-hidden rounded-md"
            >
              <img src={e.img} alt={e.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-tr from-burgundy/30 via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

              <div className="absolute left-5 top-5 glass rounded-sm px-3 py-2 text-center">
                <div className="text-[10px] text-gold tracking-[0.2em]">{e.date.split(" ")[0]}</div>
                <div className="font-display text-2xl leading-none text-ivory">{e.date.split(" ")[1]}</div>
              </div>

              <div className="absolute inset-x-0 bottom-0 p-6">
                <div className="font-display text-xl text-ivory">{e.title}</div>
                <div className="mt-1 text-xs text-gold-soft/80">{e.type}</div>
                <div className="mt-3 flex items-center gap-1.5 text-xs text-ivory/70">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-7.5 8-13a8 8 0 10-16 0c0 5.5 8 13 8 13z" /></svg>
                  {e.loc}
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-gold/15 pt-4">
                  <span className="text-xs text-ivory/65">{e.spots}</span>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold text-espresso transition-all group-hover:scale-110 group-hover:shadow-[0_0_25px_color-mix(in_oklab,var(--gold)_60%,transparent)]">→</span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
