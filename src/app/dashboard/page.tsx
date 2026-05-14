import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { DashboardContent } from "./dashboard-content";

export const metadata: Metadata = { title: "Dashboard" };

interface ProfileRow {
  display_name: string;
  avatar_url: string | null;
}

interface SubscriptionRow {
  status: string;
  plan_id: string;
}

interface LoyaltyRow {
  total_points: number;
  loyalty_tier: string;
}

interface PlanRow {
  name: string;
  slug: string;
}

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = (await supabase
    .from("profiles")
    .select("display_name, avatar_url")
    .eq("id", user.id)
    .single()) as { data: ProfileRow | null };

  const { data: subRows } = (await supabase
    .from("subscriptions")
    .select("status, plan_id")
    .eq("user_id", user.id)) as { data: SubscriptionRow[] | null };

  const subscription = subRows?.find((s) =>
    ["active", "trialing", "past_due"].includes(s.status),
  );

  const { count: upcomingCount } = await supabase
    .from("rsvps")
    .select("id", { count: "exact", head: true })
    .eq("user_id", user.id)
    .eq("status", "confirmed");

  const { data: loyalty } = (await supabase
    .from("member_loyalty")
    .select("total_points, loyalty_tier")
    .eq("user_id", user.id)
    .single()) as { data: LoyaltyRow | null };

  let planName: string | null = null;
  let planSlug: string | null = null;

  if (subscription?.plan_id) {
    const { data: planData } = (await supabase
      .from("membership_plans")
      .select("name, slug")
      .eq("id", subscription.plan_id)
      .single()) as { data: PlanRow | null };
    planName = planData?.name ?? null;
    planSlug = planData?.slug ?? null;
  }

  return (
    <DashboardContent
      displayName={profile?.display_name ?? user.email?.split("@")[0] ?? "Member"}
      planName={planName}
      planSlug={planSlug}
      subscriptionStatus={subscription?.status ?? null}
      upcomingEvents={upcomingCount ?? 0}
      loyaltyPoints={loyalty?.total_points ?? 0}
      loyaltyTier={loyalty?.loyalty_tier ?? "explorer"}
    />
  );
}
