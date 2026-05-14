import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function Reveal({ children, delay = 0, y = 24, className }: { children: ReactNode; delay?: number; y?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function Spotlight({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute ${className}`}
      style={{
        background:
          "radial-gradient(closest-side, color-mix(in oklab, var(--gold) 35%, transparent) 0%, transparent 70%)",
        filter: "blur(40px)",
      }}
    />
  );
}

export function GoldHairline({ className = "" }: { className?: string }) {
  return <div className={`hairline h-px w-full ${className}`} />;
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <motion.span
      initial={{ opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="eyebrow inline-flex items-center gap-3"
    >
      <span className="h-px w-8 bg-gold/60" />
      {children}
    </motion.span>
  );
}
