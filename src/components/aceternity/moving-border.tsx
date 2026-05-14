"use client";

import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface MovingBorderProps {
  children: ReactNode;
  duration?: number;
  className?: string;
  containerClassName?: string;
  borderRadius?: string;
  borderClassName?: string;
  as?: React.ElementType;
}

export function MovingBorder({
  children,
  duration = 2000,
  className,
  containerClassName,
  borderRadius = "1rem",
  borderClassName,
  as: Component = "button",
}: MovingBorderProps) {
  return (
    <Component
      className={cn(
        "relative h-12 overflow-hidden bg-transparent p-[1px] text-sm",
        containerClassName
      )}
      style={{ borderRadius }}
    >
      <div
        className={cn(
          "absolute inset-0 rounded-[inherit]",
          borderClassName
        )}
        style={{
          background:
            "conic-gradient(from var(--angle), transparent 60%, rgba(201,162,76,0.8) 80%, rgba(201,162,76,0.4) 90%, transparent 100%)",
          animation: `spin ${duration}ms linear infinite`,
        }}
      />

      <div
        className={cn(
          "relative flex h-full w-full items-center justify-center rounded-[inherit] bg-black/90 px-6 py-2 text-sm font-medium text-white backdrop-blur-xl",
          className
        )}
      >
        {children}
      </div>

      <style jsx>{`
        @property --angle {
          syntax: "<angle>";
          initial-value: 0deg;
          inherits: false;
        }
        @keyframes spin {
          from {
            --angle: 0deg;
          }
          to {
            --angle: 360deg;
          }
        }
      `}</style>
    </Component>
  );
}
