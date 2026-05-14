"use client";

import { type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal, Eyebrow } from "./primitives";

interface SectionHeaderProps {
  eyebrow: string;
  heading: ReactNode;
  description?: string;
  className?: string;
  align?: "left" | "center";
}

export function SectionHeader({
  eyebrow,
  heading,
  description,
  className,
  align = "center",
}: SectionHeaderProps) {
  return (
    <Reveal
      className={cn(
        "max-w-3xl space-y-5",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="font-display text-[clamp(2rem,5vw,3.75rem)] leading-[1.1] tracking-tight text-ivory">
        {heading}
      </h2>
      {description && (
        <p className="text-lg leading-relaxed text-ivory/60">{description}</p>
      )}
    </Reveal>
  );
}
