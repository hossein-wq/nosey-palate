"use client";

import { useRef, useState, type MouseEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CardSpotlightProps {
  children: ReactNode;
  className?: string;
  radius?: number;
}

export function CardSpotlight({
  children,
  className,
  radius = 350,
}: CardSpotlightProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "group/spotlight relative overflow-hidden rounded-xl border border-white/10 bg-black/40 p-8",
        className
      )}
    >
      <div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300 group-hover/spotlight:opacity-100"
        style={{
          background: `radial-gradient(${radius}px circle at ${position.x}px ${position.y}px, rgba(201,162,76,0.12), transparent 60%)`,
        }}
      />
      {isHovered && (
        <div
          className="pointer-events-none absolute -inset-px rounded-xl"
          style={{
            background: `radial-gradient(${radius * 0.6}px circle at ${position.x}px ${position.y}px, rgba(201,162,76,0.06), transparent 50%)`,
          }}
        />
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
