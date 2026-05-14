"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Wine,
  UtensilsCrossed,
  MapPin,
  GraduationCap,
  Sparkles,
  CalendarHeart,
} from "lucide-react";
import { LUXURY_EASE, viewportOnce } from "@/lib/motion";

const EXPERIENCES = [
  {
    icon: Wine,
    title: "Tastings",
    description:
      "Guided flights of rare and storied wines, led by master sommeliers in intimate settings.",
    href: "/events",
  },
  {
    icon: UtensilsCrossed,
    title: "Wine Dinners",
    description:
      "Multi-course pairing dinners where world-class chefs and winemakers collaborate at the table.",
    href: "/events",
  },
  {
    icon: MapPin,
    title: "Vineyard Journeys",
    description:
      "Travel to legendary wine regions — walk the terroir, meet the makers, taste from the barrel.",
    href: "/events",
  },
  {
    icon: GraduationCap,
    title: "Masterclasses",
    description:
      "Deep-dive sessions on varietals, regions, and techniques — from beginner palate training to advanced blind tasting.",
    href: "/events",
  },
  {
    icon: Sparkles,
    title: "Private Events",
    description:
      "Bespoke gatherings tailored to your circle — birthdays, milestones, or a quiet evening with extraordinary bottles.",
    href: "/events",
  },
  {
    icon: CalendarHeart,
    title: "Seasonal Celebrations",
    description:
      "Harvest festivals, New Year's Eve galas, and solstice dinners marking the rhythm of the vine.",
    href: "/events",
  },
];

export function ExperienceGrid() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {EXPERIENCES.map((exp, i) => (
        <motion.div
          key={exp.title}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.9, delay: i * 0.08, ease: LUXURY_EASE }}
        >
          <Link href={exp.href} className="group block h-full">
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.4, ease: LUXURY_EASE }}
              className="glass flex h-full flex-col rounded-lg p-8 transition-colors hover:border-gold/30"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/10">
                <exp.icon className="h-5 w-5 text-gold" />
              </div>
              <h3 className="mt-5 font-display text-xl text-ivory">
                {exp.title}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-ivory/50">
                {exp.description}
              </p>
              <span className="mt-6 inline-flex items-center gap-2 text-xs font-medium tracking-wide text-gold/70 uppercase transition-colors group-hover:text-gold">
                Explore
                <svg
                  className="h-3 w-3 transition-transform group-hover:translate-x-1"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </span>
            </motion.div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
