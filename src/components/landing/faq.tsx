"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LUXURY_EASE, viewportOnce } from "@/lib/motion";
import { Reveal, Eyebrow } from "@/components/shared/primitives";



const FAQ_DATA = [
  {
    question: "What is Nosey Palate?",
    answer:
      "Nosey Palate is a members-only community for wine lovers, offering curated tastings, private dinners, and meaningful connections with fellow enthusiasts around the world.",
  },
  {
    question: "How do I become a member?",
    answer:
      "You can apply directly through our website. Our team reviews each application to ensure a vibrant, like-minded community. Once accepted, you'll choose your tier and gain immediate access.",
  },
  {
    question: "What's included in my membership?",
    answer:
      "Depending on your tier, you'll enjoy access to exclusive events, priority reservations, curated wine selections, private dinners, loyalty rewards, and a vibrant global network.",
  },
  {
    question: "Can I attend events in other cities?",
    answer:
      "Absolutely. Your membership is global. Whether you're in New York, London, or Lisbon, you're always welcome at any Nosey Palate gathering.",
  },
  {
    question: "Is there a commitment period?",
    answer:
      "Memberships are billed monthly with no long-term contract. You can pause or cancel anytime, though we hope the experience speaks for itself.",
  },
] as const;

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="relative overflow-hidden py-32 lg:py-40">
      <div className="mx-auto max-w-[1100px] px-6 lg:px-8">
        <Reveal className="mb-16 text-center">
          <Eyebrow>Frequently Asked</Eyebrow>
          <h2 className="mt-5 font-display text-[clamp(2rem,5vw,3.75rem)] leading-[1.1] tracking-tight text-ivory">
            Questions, Answered.
          </h2>
        </Reveal>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 1, ease: LUXURY_EASE }}
          className="divide-y divide-gold/20"
        >
          {FAQ_DATA.map((item, i) => {
            const isOpen = openIndex === i;

            return (
              <div key={i} className="border-t border-gold/20 first:border-t-0">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 py-6 text-left transition-colors duration-300"
                >
                  <span
                    className={`font-display text-lg tracking-tight transition-colors duration-300 md:text-xl ${
                      isOpen ? "text-gold-soft" : "text-ivory"
                    }`}
                  >
                    {item.question}
                  </span>
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gold/40 transition-transform duration-500 ${
                      isOpen ? "rotate-45" : "rotate-0"
                    }`}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      className="h-4 w-4 text-gold"
                    >
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: LUXURY_EASE }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 text-base leading-relaxed text-ivory/60">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
