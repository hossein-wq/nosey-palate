"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function Spotlight({
  className,
  fill,
}: {
  className?: string;
  fill?: string;
}) {
  return (
    <motion.div
      className={cn(
        "pointer-events-none absolute z-[1] h-[200%] w-[200%] rounded-full",
        className
      )}
      style={{
        background: `radial-gradient(closest-side, ${fill || "rgba(201,162,76,0.15)"}, transparent)`,
      }}
    />
  );
}
