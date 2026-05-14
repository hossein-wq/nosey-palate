export type MembershipPlanSlug = "explorer" | "connoisseur" | "collector";
export type SubscriptionStatus = "active" | "past_due" | "canceled" | "incomplete" | "trialing" | "paused";
export type LoyaltyTier = "explorer" | "connoisseur" | "collector" | "grand_cru";

export interface MembershipPlan {
  id: string;
  name: string;
  slug: MembershipPlanSlug;
  price_monthly: number;
  price_annual: number | null;
  description: string | null;
  capabilities: string[];
  is_active: boolean;
}
