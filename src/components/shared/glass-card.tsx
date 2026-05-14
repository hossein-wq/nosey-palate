import { type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: "default" | "strong";
  hover?: boolean;
}

export function GlassCard({
  children,
  className,
  variant = "default",
  hover = true,
  ...props
}: GlassCardProps) {
  return (
    <div
      className={cn(
        "rounded-md transition-all duration-500",
        variant === "default" ? "glass" : "glass-strong",
        hover && "hover:-translate-y-2 hover:ring-1 hover:ring-gold/40",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
