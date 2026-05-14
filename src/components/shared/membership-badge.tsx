import { cn } from "@/lib/utils";
import type { LoyaltyTier } from "@/types/membership";

const TIER_STYLES: Record<LoyaltyTier, string> = {
  explorer: "bg-muted text-muted-foreground",
  connoisseur: "bg-burgundy text-champagne",
  collector:
    "bg-gradient-to-r from-gold/80 to-ember/70 text-espresso font-medium",
  grand_cru:
    "bg-gradient-to-r from-gold via-champagne to-gold text-espresso font-semibold shadow-[0_0_12px_color-mix(in_oklab,var(--gold)_30%,transparent)]",
};

const TIER_LABELS: Record<LoyaltyTier, string> = {
  explorer: "Explorer",
  connoisseur: "Connoisseur",
  collector: "Collector",
  grand_cru: "Grand Cru",
};

interface MembershipBadgeProps {
  tier: LoyaltyTier;
  className?: string;
}

export function MembershipBadge({ tier, className }: MembershipBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] uppercase tracking-[0.15em]",
        TIER_STYLES[tier],
        className,
      )}
    >
      {TIER_LABELS[tier]}
    </span>
  );
}
