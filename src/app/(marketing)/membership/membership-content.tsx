"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { MEMBERSHIP_TIERS } from "@/lib/constants";
import { STRIPE_PLANS } from "@/lib/stripe/plans";
import { MembershipCard } from "@/components/member/membership-card";
import { Eyebrow, GoldHairline, Spotlight } from "@/components/shared/primitives";
import { LUXURY_EASE, viewportOnce } from "@/lib/motion";

type BillingCycle = "monthly" | "annual";
type PlanSlug = "explorer" | "connoisseur" | "collector";

const COMPARISON_FEATURES = [
  { label: "Access to community events", explorer: true, connoisseur: true, collector: true },
  { label: "Member community & forum", explorer: true, connoisseur: true, collector: true },
  { label: "Exclusive invitations", explorer: true, connoisseur: true, collector: true },
  { label: "Priority event access", explorer: false, connoisseur: true, collector: true },
  { label: "Private dinner invitations", explorer: false, connoisseur: true, collector: true },
  { label: "Member pricing on events", explorer: false, connoisseur: true, collector: true },
  { label: "VIP concierge access", explorer: false, connoisseur: false, collector: true },
  { label: "Exclusive tasting experiences", explorer: false, connoisseur: false, collector: true },
  { label: "Personalized wine support", explorer: false, connoisseur: false, collector: true },
] as const;

const FAQS = [
  {
    q: "Can I switch plans later?",
    a: "Absolutely. You can upgrade or downgrade your membership at any time through your dashboard. Changes take effect at the start of your next billing cycle.",
  },
  {
    q: "Is there a commitment period?",
    a: "No long-term commitment. Monthly plans can be cancelled anytime. Annual plans can be cancelled but will remain active until the end of the billing period.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept all major credit and debit cards through our secure payment partner, Stripe.",
  },
  {
    q: "Can I bring a guest to events?",
    a: "Connoisseur and Collector members can bring guests to select events. Explorer members can purchase guest passes when available.",
  },
  {
    q: "How do I access member events?",
    a: "Once subscribed, all eligible events appear in your dashboard. Simply RSVP and you'll receive confirmation with all the details.",
  },
];

export default function MembershipContent() {
  const [billing, setBilling] = useState<BillingCycle>("monthly");
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  async function handleSelectPlan(slug: PlanSlug) {
    const plan = STRIPE_PLANS[slug];
    const priceId = billing === "annual" ? plan.annual : plan.monthly;

    if (!priceId) return;

    setLoadingPlan(slug);
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
      setLoadingPlan(null);
    }
  }

  return (
    <div className="relative overflow-hidden">
      <Spotlight className="-top-40 right-1/4 h-[600px] w-[600px]" />

      {/* Hero */}
      <section className="mx-auto max-w-[1400px] px-6 pb-10 pt-32 md:px-10">
        <Eyebrow>Membership</Eyebrow>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.1, ease: LUXURY_EASE }}
          className="mt-6 font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.05] tracking-tight text-ivory"
        >
          More Than Access.{" "}
          <span className="italic text-gold-soft">It&apos;s Belonging.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.25, ease: LUXURY_EASE }}
          className="mt-6 max-w-lg text-ivory/60"
        >
          Choose the membership that fits your wine journey. Every tier unlocks
          curated experiences, community access, and exclusive perks.
        </motion.p>
      </section>

      {/* Billing Toggle */}
      <section className="mx-auto max-w-[1400px] px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: LUXURY_EASE }}
          className="flex items-center justify-center gap-4"
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
      </section>

      {/* Tier Cards */}
      <section className="mx-auto mt-12 max-w-[1200px] px-6 md:px-10">
        <div className="grid gap-6 md:grid-cols-3">
          {MEMBERSHIP_TIERS.map((tier, i) => (
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
              billingCycle={billing}
              loading={loadingPlan === tier.slug}
              onSelect={() => handleSelectPlan(tier.slug as PlanSlug)}
              index={i}
            />
          ))}
        </div>
      </section>

      <GoldHairline className="mx-auto mt-24 max-w-[1200px]" />

      {/* Comparison Table */}
      <section className="mx-auto mt-24 max-w-[1200px] px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 1, ease: LUXURY_EASE }}
          className="text-center"
        >
          <span className="eyebrow">Compare Plans</span>
          <h2 className="mt-4 font-display text-3xl text-ivory md:text-4xl">
            Find Your <span className="italic text-gold-soft">Perfect Fit</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 1, delay: 0.15, ease: LUXURY_EASE }}
          className="mt-12 overflow-hidden rounded-lg glass"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gold/15">
                  <th className="px-6 py-5 text-sm font-medium text-ivory/60">
                    Feature
                  </th>
                  {MEMBERSHIP_TIERS.map((tier) => (
                    <th
                      key={tier.slug}
                      className={`px-6 py-5 text-center text-sm font-medium ${
                        tier.featured ? "text-gold" : "text-ivory/80"
                      }`}
                    >
                      {tier.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARISON_FEATURES.map((feature, i) => (
                  <tr
                    key={feature.label}
                    className={
                      i < COMPARISON_FEATURES.length - 1
                        ? "border-b border-gold/8"
                        : ""
                    }
                  >
                    <td className="px-6 py-4 text-sm text-ivory/70">
                      {feature.label}
                    </td>
                    {(["explorer", "connoisseur", "collector"] as const).map(
                      (slug) => (
                        <td key={slug} className="px-6 py-4 text-center">
                          {feature[slug] ? (
                            <svg
                              className="mx-auto h-5 w-5 text-gold"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          ) : (
                            <span className="text-ivory/20">&mdash;</span>
                          )}
                        </td>
                      ),
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </section>

      <GoldHairline className="mx-auto mt-24 max-w-[1200px]" />

      {/* FAQ */}
      <section className="mx-auto mt-24 max-w-[800px] px-6 pb-32 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 1, ease: LUXURY_EASE }}
          className="text-center"
        >
          <span className="eyebrow">Questions</span>
          <h2 className="mt-4 font-display text-3xl text-ivory md:text-4xl">
            Frequently Asked
          </h2>
        </motion.div>

        <div className="mt-12 space-y-4">
          {FAQS.map((faq, i) => (
            <motion.details
              key={faq.q}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.8, delay: i * 0.08, ease: LUXURY_EASE }}
              className="group glass rounded-lg"
            >
              <summary className="flex cursor-pointer items-center justify-between px-6 py-5 text-sm font-medium text-ivory transition-colors hover:text-gold [&::-webkit-details-marker]:hidden">
                {faq.q}
                <svg
                  className="h-4 w-4 shrink-0 text-gold/60 transition-transform group-open:rotate-45"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </summary>
              <p className="px-6 pb-5 text-sm leading-relaxed text-ivory/60">
                {faq.a}
              </p>
            </motion.details>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 1, delay: 0.2, ease: LUXURY_EASE }}
          className="mt-16 text-center"
        >
          <p className="text-sm text-ivory/50">
            Still have questions?{" "}
            <Link
              href="/about"
              className="text-gold underline underline-offset-4 transition-colors hover:text-gold-soft"
            >
              Get in touch
            </Link>
          </p>
        </motion.div>
      </section>
    </div>
  );
}
