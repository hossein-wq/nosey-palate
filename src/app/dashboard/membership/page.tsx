"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { MEMBERSHIP_TIERS } from "@/lib/constants";
import { STRIPE_PLANS } from "@/lib/stripe/plans";
import { MembershipCard } from "@/components/member/membership-card";
import { Eyebrow, GoldHairline } from "@/components/shared/primitives";
import { LUXURY_EASE, viewportOnce } from "@/lib/motion";
type BillingCycle = "monthly" | "annual";
type PlanSlug = "explorer" | "connoisseur" | "collector";

interface SubscriptionRow {
  status: string;
  plan_id: string;
  current_period_end: string | null;
  cancel_at_period_end: boolean;
}

interface SubscriptionData {
  status: string;
  current_period_end: string | null;
  cancel_at_period_end: boolean;
  plan: {
    name: string;
    slug: string;
    price_monthly: number;
  };
}

export default function DashboardMembershipPage() {
  const [subscription, setSubscription] = useState<SubscriptionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [portalLoading, setPortalLoading] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState<string | null>(null);
  const [billing, setBilling] = useState<BillingCycle>("monthly");
  const [successMessage, setSuccessMessage] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("success") === "true") {
      setSuccessMessage(true);
      window.history.replaceState({}, "", "/dashboard/membership");
    }
  }, []);

  useEffect(() => {
    async function fetchSubscription() {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setLoading(false);
        return;
      }

      const { data: subRows } = (await supabase
        .from("subscriptions")
        .select("status, plan_id, current_period_end, cancel_at_period_end")
        .eq("user_id", user.id)) as { data: SubscriptionRow[] | null };

      const activeSub = subRows?.find((s) =>
        ["active", "trialing", "past_due"].includes(s.status),
      );

      if (activeSub) {
        const { data: planData } = await supabase
          .from("membership_plans")
          .select("name, slug, price_monthly")
          .eq("id", activeSub.plan_id)
          .single();

        if (planData) {
          setSubscription({
            status: activeSub.status,
            current_period_end: activeSub.current_period_end,
            cancel_at_period_end: activeSub.cancel_at_period_end,
            plan: planData,
          });
        }
      }

      setLoading(false);
    }

    fetchSubscription();
  }, []);

  async function handleManageSubscription() {
    setPortalLoading(true);
    try {
      const res = await fetch("/api/portal", { method: "POST" });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } finally {
      setPortalLoading(false);
    }
  }

  async function handleUpgrade(slug: PlanSlug) {
    const plan = STRIPE_PLANS[slug];
    const priceId = billing === "annual" ? plan.annual : plan.monthly;
    if (!priceId) return;

    setCheckoutLoading(slug);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId, planSlug: slug }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } finally {
      setCheckoutLoading(null);
    }
  }

  if (loading) {
    return (
      <div className="mx-auto max-w-[1200px] px-6 py-16 md:px-10">
        <div className="flex items-center justify-center py-24">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-gold/30 border-t-gold" />
        </div>
      </div>
    );
  }

  const currentSlug = subscription?.plan?.slug;

  return (
    <div className="mx-auto max-w-[1200px] px-6 py-12 md:px-10">
      <Eyebrow>Membership</Eyebrow>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.1, ease: LUXURY_EASE }}
        className="mt-4 font-display text-4xl text-ivory"
      >
        Your <span className="italic text-gold-soft">Membership</span>
      </motion.h1>

      {/* Success Message */}
      {successMessage && (
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 flex items-center gap-3 rounded-lg border border-gold/30 bg-gold/10 px-5 py-4"
        >
          <svg
            className="h-5 w-5 text-gold"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <p className="text-sm text-ivory">
            Welcome aboard! Your membership is now active.
          </p>
          <button
            onClick={() => setSuccessMessage(false)}
            className="ml-auto text-ivory/40 transition-colors hover:text-ivory"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </motion.div>
      )}

      {/* Current Plan Card */}
      {subscription && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: LUXURY_EASE }}
          className="mt-10 glass-strong rounded-lg p-8"
        >
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <span className="eyebrow">Current Plan</span>
              <h2 className="mt-3 font-display text-3xl text-ivory">
                {subscription.plan.name}
              </h2>
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${
                    subscription.status === "active"
                      ? "bg-gold/15 text-gold"
                      : subscription.status === "past_due"
                        ? "bg-ember/15 text-ember"
                        : "bg-ivory/10 text-ivory/50"
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      subscription.status === "active"
                        ? "bg-gold"
                        : subscription.status === "past_due"
                          ? "bg-ember"
                          : "bg-ivory/50"
                    }`}
                  />
                  {subscription.status === "active"
                    ? "Active"
                    : subscription.status === "past_due"
                      ? "Past Due"
                      : subscription.status.charAt(0).toUpperCase() +
                        subscription.status.slice(1)}
                </span>
                {subscription.cancel_at_period_end && (
                  <span className="rounded-full bg-ember/15 px-3 py-1 text-xs font-medium text-ember">
                    Cancels at period end
                  </span>
                )}
              </div>
              {subscription.current_period_end && (
                <p className="mt-3 text-sm text-ivory/50">
                  Next billing date:{" "}
                  {new Date(subscription.current_period_end).toLocaleDateString(
                    "en-US",
                    { month: "long", day: "numeric", year: "numeric" },
                  )}
                </p>
              )}
            </div>

            <button
              onClick={handleManageSubscription}
              disabled={portalLoading}
              className="shrink-0 rounded-md border border-gold/30 px-6 py-3 text-sm font-medium uppercase tracking-wide text-gold transition-all hover:bg-gold/10 disabled:opacity-50"
            >
              {portalLoading ? "Loading..." : "Manage Subscription"}
            </button>
          </div>
        </motion.div>
      )}

      {/* No Subscription */}
      {!subscription && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: LUXURY_EASE }}
          className="mt-10 glass rounded-lg p-8 text-center"
        >
          <h2 className="font-display text-2xl text-ivory">
            No Active Membership
          </h2>
          <p className="mt-3 text-sm text-ivory/50">
            Choose a plan below to unlock curated wine experiences and join our
            community.
          </p>
        </motion.div>
      )}

      <GoldHairline className="mt-16" />

      {/* Billing Toggle */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={viewportOnce}
        transition={{ duration: 0.8, ease: LUXURY_EASE }}
        className="mt-16 flex items-center justify-center gap-4"
      >
        <span
          className={`text-sm transition-colors ${
            billing === "monthly" ? "text-ivory" : "text-ivory/40"
          }`}
        >
          Monthly
        </span>
        <button
          onClick={() =>
            setBilling((b) => (b === "monthly" ? "annual" : "monthly"))
          }
          className="relative h-7 w-12 rounded-full border border-gold/30 bg-espresso transition-colors"
          aria-label="Toggle billing cycle"
        >
          <motion.div
            layout
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className="absolute top-0.5 h-5 w-5 rounded-full bg-gold"
            style={{ left: billing === "monthly" ? 2 : 22 }}
          />
        </button>
        <span
          className={`text-sm transition-colors ${
            billing === "annual" ? "text-ivory" : "text-ivory/40"
          }`}
        >
          Annual
        </span>
        {billing === "annual" && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-full bg-gold/15 px-3 py-0.5 text-xs font-medium text-gold"
          >
            Save 20%
          </motion.span>
        )}
      </motion.div>

      {/* Plan Cards */}
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {MEMBERSHIP_TIERS.map((tier, i) => {
          const isCurrent = currentSlug === tier.slug;

          return (
            <MembershipCard
              key={tier.slug}
              name={tier.name}
              price={tier.price}
              annualPrice={
                billing === "annual"
                  ? Math.round(tier.price * 0.8)
                  : undefined
              }
              tagline={tier.tagline}
              perks={tier.perks}
              featured={tier.featured}
              current={isCurrent}
              billingCycle={billing}
              loading={checkoutLoading === tier.slug}
              onSelect={
                isCurrent
                  ? undefined
                  : () => handleUpgrade(tier.slug as PlanSlug)
              }
              index={i}
            />
          );
        })}
      </div>

      {/* Portal Info */}
      {subscription && (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 0.8, ease: LUXURY_EASE }}
          className="mt-12 text-center text-sm text-ivory/40"
        >
          To cancel or update your payment method, use the{" "}
          <button
            onClick={handleManageSubscription}
            className="text-gold underline underline-offset-4 transition-colors hover:text-gold-soft"
          >
            Stripe Customer Portal
          </button>
          .
        </motion.p>
      )}

      {!subscription && (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportOnce}
          className="mt-12 text-center text-sm text-ivory/40"
        >
          Learn more on our{" "}
          <Link
            href="/membership"
            className="text-gold underline underline-offset-4 transition-colors hover:text-gold-soft"
          >
            membership page
          </Link>
          .
        </motion.p>
      )}
    </div>
  );
}
