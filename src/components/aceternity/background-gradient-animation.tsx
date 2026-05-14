"use client";

import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface BackgroundGradientAnimationProps {
  children?: ReactNode;
  className?: string;
  containerClassName?: string;
}

export function BackgroundGradientAnimation({
  children,
  className,
  containerClassName,
}: BackgroundGradientAnimationProps) {
  return (
    <div className={cn("relative overflow-hidden", containerClassName)}>
      <div
        className={cn(
          "absolute inset-0",
          "[--gold:rgba(201,162,76,0.4)]",
          "[--burgundy:rgba(128,0,32,0.3)]",
          "[--ember:rgba(194,108,48,0.35)]",
          "[--dark-gold:rgba(139,110,38,0.3)]",
          "[--warm:rgba(180,130,60,0.25)]",
          className
        )}
      >
        <div className="absolute -left-[20%] -top-[20%] h-[60%] w-[60%] animate-[blob_7s_infinite] rounded-full bg-[radial-gradient(circle,var(--gold),transparent_60%)] opacity-70" />
        <div className="absolute -right-[15%] -top-[10%] h-[50%] w-[50%] animate-[blob_10s_infinite_2s] rounded-full bg-[radial-gradient(circle,var(--burgundy),transparent_60%)] opacity-60" />
        <div className="absolute -bottom-[20%] left-[20%] h-[55%] w-[55%] animate-[blob_8s_infinite_4s] rounded-full bg-[radial-gradient(circle,var(--ember),transparent_60%)] opacity-60" />
        <div className="absolute -bottom-[10%] -right-[20%] h-[45%] w-[45%] animate-[blob_12s_infinite_1s] rounded-full bg-[radial-gradient(circle,var(--dark-gold),transparent_60%)] opacity-50" />
        <div className="absolute left-[30%] top-[40%] h-[40%] w-[40%] animate-[blob_9s_infinite_3s] rounded-full bg-[radial-gradient(circle,var(--warm),transparent_60%)] opacity-50" />
      </div>
      <div className="relative z-10">{children}</div>

      <style jsx>{`
        @keyframes blob {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          25% {
            transform: translate(20px, -30px) scale(1.1);
          }
          50% {
            transform: translate(-10px, 20px) scale(0.95);
          }
          75% {
            transform: translate(15px, 10px) scale(1.05);
          }
        }
      `}</style>
    </div>
  );
}
