"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useUser } from "./use-user";

interface MembershipState {
  plan_slug: string | null;
  status: string | null;
  current_period_end: string | null;
}

export function useMembership() {
  const { user } = useUser();
  const [subscription, setSubscription] = useState<MembershipState | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setSubscription(null);
      setLoading(false);
      return;
    }

    const supabase = createClient();
    supabase
      .from("subscriptions")
      .select("status, current_period_end, plan_id")
      .eq("user_id", user.id)
      .eq("status", "active")
      .single()
      .then(async ({ data }) => {
        if (data) {
          const row = data as unknown as {
            status: string;
            current_period_end: string | null;
            plan_id: string;
          };
          const { data: plan } = await supabase
            .from("membership_plans")
            .select("slug")
            .eq("id", row.plan_id)
            .single();

          const planRow = plan as unknown as { slug: string } | null;
          setSubscription({
            plan_slug: planRow?.slug ?? null,
            status: row.status,
            current_period_end: row.current_period_end,
          });
        }
        setLoading(false);
      });
  }, [user]);

  return { subscription, loading, isActive: subscription?.status === "active" };
}
