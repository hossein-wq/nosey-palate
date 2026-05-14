"use client";

import { motion } from "framer-motion";
import { LUXURY_EASE } from "@/lib/motion";

export function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background">
      <div className="grain pointer-events-none absolute inset-0" />

      <motion.div
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{
          duration: 2.4,
          repeat: Infinity,
          ease: LUXURY_EASE,
        }}
        className="flex flex-col items-center leading-none"
      >
        <span className="font-display text-3xl tracking-[0.3em] text-gold">
          NOSEY
        </span>
        <span className="font-serif text-lg italic text-ivory/80">Palate</span>
      </motion.div>
    </div>
  );
}
