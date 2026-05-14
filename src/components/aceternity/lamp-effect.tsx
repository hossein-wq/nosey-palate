"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface LampEffectProps {
  children: ReactNode;
  className?: string;
}

export function LampEffect({ children, className }: LampEffectProps) {
  return (
    <div
      className={cn(
        "relative flex min-h-[400px] flex-col items-center justify-center overflow-hidden rounded-md",
        className
      )}
    >
      <div className="relative flex w-full flex-1 items-center justify-center">
        <motion.div
          initial={{ opacity: 0.5, width: "8rem" }}
          whileInView={{ opacity: 1, width: "20rem" }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          style={{
            backgroundImage:
              "conic-gradient(var(--conic-position), rgba(201,162,76,0.3) 0%, transparent 60%)",
          }}
          className="bg-gradient-conic absolute inset-auto right-1/2 h-56 w-[20rem] overflow-visible [--conic-position:from_70deg_at_center_top]"
        >
          <div className="absolute bottom-0 left-0 z-20 h-40 w-full bg-background [mask-image:linear-gradient(to_top,white,transparent)]" />
          <div className="absolute bottom-0 left-0 z-20 h-full w-10 bg-background" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0.5, width: "8rem" }}
          whileInView={{ opacity: 1, width: "20rem" }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          style={{
            backgroundImage:
              "conic-gradient(var(--conic-position), transparent 60%, rgba(201,162,76,0.3) 100%)",
          }}
          className="bg-gradient-conic absolute inset-auto left-1/2 h-56 w-[20rem] overflow-visible [--conic-position:from_290deg_at_center_top]"
        >
          <div className="absolute bottom-0 right-0 z-20 h-full w-10 bg-background" />
          <div className="absolute bottom-0 right-0 z-20 h-40 w-full bg-background [mask-image:linear-gradient(to_top,white,transparent)]" />
        </motion.div>

        <div className="absolute top-1/2 h-48 w-full translate-y-12 bg-background blur-2xl" />
        <div className="absolute top-1/2 z-50 h-48 w-full bg-transparent opacity-10 backdrop-blur-md" />

        <motion.div
          initial={{ width: "6rem" }}
          whileInView={{ width: "16rem" }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-auto z-30 h-0.5 w-[16rem] -translate-y-[7rem] rounded-full bg-[rgba(201,162,76,0.6)]"
        />

        <motion.div
          initial={{ width: "10rem", opacity: 0.3 }}
          whileInView={{ width: "20rem", opacity: 0.6 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-auto z-40 h-36 -translate-y-[10rem] rounded-full bg-[rgba(201,162,76,0.08)] blur-3xl"
        />
      </div>

      <div className="relative z-50 -mt-32 flex flex-col items-center px-5">
        {children}
      </div>
    </div>
  );
}
