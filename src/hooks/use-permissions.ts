"use client";

import { useMemo } from "react";
import { type Capability, hasCapability, getCapabilitiesForPlan } from "@/lib/permissions";
import { useMembership } from "./use-membership";

export function usePermissions() {
  const { subscription } = useMembership();

  const capabilities = useMemo(() => {
    if (!subscription?.plan_slug) return [];
    return getCapabilitiesForPlan(subscription.plan_slug);
  }, [subscription?.plan_slug]);

  const can = (capability: Capability) => hasCapability(capabilities, capability);

  return { can, capabilities };
}
