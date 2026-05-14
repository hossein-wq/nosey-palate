"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import type { LoyaltyTier } from "@/types/membership";
import { MembershipBadge } from "./membership-badge";

const SIZE_MAP = {
  sm: "h-9 w-9",
  md: "h-12 w-12",
  lg: "h-20 w-20",
} as const;

const RING_MAP: Record<LoyaltyTier, string> = {
  explorer: "ring-muted-foreground/40",
  connoisseur: "ring-burgundy",
  collector: "ring-gold",
  grand_cru: "ring-gold shadow-glow-gold",
};

interface MemberAvatarProps {
  src?: string | null;
  name: string;
  size?: keyof typeof SIZE_MAP;
  tier?: LoyaltyTier;
  showTier?: boolean;
  className?: string;
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function MemberAvatar({
  src,
  name,
  size = "md",
  tier = "explorer",
  showTier = false,
  className,
}: MemberAvatarProps) {
  return (
    <div className={cn("flex flex-col items-center gap-1.5", className)}>
      <div
        className={cn(
          "relative shrink-0 overflow-hidden rounded-full ring-2",
          SIZE_MAP[size],
          RING_MAP[tier],
        )}
      >
        {src ? (
          <Image
            src={src}
            alt={name}
            fill
            className="object-cover"
            sizes={size === "lg" ? "80px" : size === "md" ? "48px" : "36px"}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-burgundy to-espresso text-ivory/80">
            <span
              className={cn(
                "font-display",
                size === "lg"
                  ? "text-xl"
                  : size === "md"
                    ? "text-sm"
                    : "text-xs",
              )}
            >
              {getInitials(name)}
            </span>
          </div>
        )}
      </div>
      {showTier && <MembershipBadge tier={tier} />}
    </div>
  );
}
