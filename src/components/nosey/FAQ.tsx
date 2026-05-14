import { Eyebrow, Reveal } from "./primitives";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ITEMS = [
  { q: "How do I become a member?", a: "Submit a brief application. We review for fit, taste, and intent — most members are referred. We respond within 7 days." },
  { q: "What's included with my membership?", a: "Curated events, member-only invitations, sommelier-led tastings, private dinners, travel access, and our digital companion app." },
  { q: "Can I bring guests?", a: "Connoisseur and Collector members may bring a +1 to most events. Some intimate dinners are members-only." },
  { q: "Where are events held?", a: "Currently in New York, London, Lisbon, Milan, and Paris — with new chapters launching seasonally." },
  { q: "Can I cancel anytime?", a: "Yes. Memberships are month-to-month with no commitment, and we'll refund the unused portion of any annual plan." },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="relative bg-background py-28 md:py-36">
      <div className="mx-auto max-w-[1100px] px-6 md:px-10">
        <div className="mb-14 text-center">
          <Eyebrow>Frequently Asked</Eyebrow>
          <Reveal>
            <h2 className="mt-6 font-display text-[clamp(2.25rem,4.5vw,3.5rem)] leading-[1] tracking-tight text-ivory">
              Questions, <span className="italic">Answered.</span>
            </h2>
          </Reveal>
        </div>

        <div className="space-y-px">
          {ITEMS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q} className="border-t border-gold/15 last:border-b">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left transition-colors hover:text-gold"
                >
                  <span className={`font-display text-xl md:text-2xl transition-colors ${isOpen ? "text-gold-soft" : "text-ivory"}`}>
                    {item.q}
                  </span>
                  <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all ${isOpen ? "rotate-45 border-gold bg-gold/10 text-gold" : "border-gold/30 text-ivory/70"}`}>
                    +
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 pr-12 text-ivory/65 leading-relaxed">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
