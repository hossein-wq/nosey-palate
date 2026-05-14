"use client";

import { type ButtonHTMLAttributes, forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const luxuryButtonVariants = cva(
  "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-medium tracking-wide transition-all duration-500 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-gold text-espresso hover:shadow-[0_0_40px_color-mix(in_oklab,var(--gold)_35%,transparent)]",
        outline:
          "border border-gold/40 text-gold hover:bg-gold/10",
      },
      size: {
        default: "px-7 py-3 text-sm",
        sm: "px-5 py-2 text-xs",
        lg: "px-9 py-4 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

interface LuxuryButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof luxuryButtonVariants> {
  asChild?: boolean;
}

export const LuxuryButton = forwardRef<HTMLButtonElement, LuxuryButtonProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        ref={ref}
        className={cn(luxuryButtonVariants({ variant, size, className }))}
        {...props}
      >
        {!asChild && variant === "primary" && (
          <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
        )}
        <span className="relative z-10 flex items-center gap-2">
          {children}
          <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
            &rarr;
          </span>
        </span>
      </Comp>
    );
  },
);

LuxuryButton.displayName = "LuxuryButton";
