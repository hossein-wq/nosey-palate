"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface InfiniteMovingCardsProps {
  items: {
    quote: string;
    name: string;
    title: string;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}

export function InfiniteMovingCards({
  items,
  direction = "left",
  speed = "normal",
  pauseOnHover = true,
  className,
}: InfiniteMovingCardsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLUListElement>(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    if (!containerRef.current || !scrollerRef.current) return;

    const scrollerContent = Array.from(scrollerRef.current.children);
    scrollerContent.forEach((item) => {
      const duplicatedItem = item.cloneNode(true);
      scrollerRef.current?.appendChild(duplicatedItem);
    });

    setStart(true);
  }, []);

  const speedMap = { fast: "20s", normal: "40s", slow: "60s" };
  const duration = speedMap[speed];

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max min-w-full shrink-0 gap-4 py-4",
          start && "animate-[scroll_var(--duration)_linear_infinite]",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
        style={
          {
            "--duration": duration,
            "--direction": direction === "left" ? "normal" : "reverse",
          } as React.CSSProperties
        }
      >
        {items.map((item, idx) => (
          <li
            key={`${item.name}-${idx}`}
            className="relative w-[350px] max-w-full shrink-0 rounded-2xl border border-white/10 bg-gradient-to-br from-black/60 to-black/40 px-8 py-6 backdrop-blur-sm md:w-[450px]"
          >
            <blockquote>
              <p className="relative z-20 text-sm leading-relaxed text-neutral-200">
                &ldquo;{item.quote}&rdquo;
              </p>
              <div className="relative z-20 mt-6 flex flex-row items-center gap-3">
                <div className="h-px flex-1 bg-gradient-to-r from-[rgba(201,162,76,0.4)] to-transparent" />
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-[rgb(201,162,76)]">
                    {item.name}
                  </span>
                  <span className="text-xs text-neutral-400">{item.title}</span>
                </div>
              </div>
            </blockquote>
          </li>
        ))}
      </ul>

      <style jsx>{`
        @keyframes scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(calc(-50% - 0.5rem));
          }
        }
        .animate-\\[scroll_var\\(--duration\\)_linear_infinite\\] {
          animation: scroll var(--duration) linear infinite;
          animation-direction: var(--direction);
        }
      `}</style>
    </div>
  );
}
