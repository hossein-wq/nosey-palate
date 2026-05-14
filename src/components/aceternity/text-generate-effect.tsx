"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface TextGenerateEffectProps {
  words: string;
  className?: string;
  duration?: number;
  delayPerWord?: number;
}

export function TextGenerateEffect({
  words,
  className,
  duration = 0.5,
  delayPerWord = 0.1,
}: TextGenerateEffectProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const wordArray = words.split(" ");

  return (
    <div ref={ref} className={cn("font-bold", className)}>
      {wordArray.map((word, idx) => (
        <motion.span
          key={`${word}-${idx}`}
          className="inline-block"
          initial={{ opacity: 0, filter: "blur(4px)" }}
          animate={isInView ? { opacity: 1, filter: "blur(0px)" } : {}}
          transition={{
            duration,
            delay: idx * delayPerWord,
            ease: "easeOut",
          }}
        >
          {word}
          {idx < wordArray.length - 1 && "\u00A0"}
        </motion.span>
      ))}
    </div>
  );
}
