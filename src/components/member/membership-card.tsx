"use client";

import { motion } from "framer-motion";
import { LUXURY_EASE } from "@/lib/motion";

interface MembershipCardProps {
  name: string;
  price: number;
  annualPrice?: number;
  tagline: string;
  perks: readonly string[];
  featured?: boolean;
  current?: boolean;
  billingCycle?: "monthly" | "annual";
  onSelect?: () => void;
  loading?: boolean;
  index?: number;
}

export function MembershipCard({
  name,
  price,
  annualPrice,
  tagline,
  perks,
  featured = false,
  current = false,
  billingCycle = "monthly",
  onSelect,
  loading = false,
  index = 0,
}: MembershipCardProps) {
  const displayPrice = billingCycle === "annual" && annualPrice ? annualPrice : price;

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 1, delay: index * 0.15, ease: LUXURY_EASE }}
      className={`relative flex flex-col rounded-lg p-8 transition-all duration-500 ${
        featured
          ? "glass-strong shadow-luxe ring-1 ring-gold/30 scale-[1.02]"
          : "glass hover:ring-1 hover:ring-gold/20"
      } ${current ? "ring-2 ring-gold/50" : ""}`}
    >
      {featured && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gold px-4 py-1 text-[11px] font-semibold uppercase tracking-widest text-espresso">
          Most Popular
        </span>
      )}

      {current && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full border border-gold/40 bg-espresso px-4 py-1 text-[11px] font-semibold uppercase tracking-widest text-gold">
          Your Plan
        </span>
      )}

      <div className="mb-6">
        <h3 className="font-display text-2xl text-ivory">{name}</h3>
        <p className="mt-1 text-sm text-ivory/50">{tagline}</p>
      </div>

      <div className="mb-8">
        <span className="font-display text-5xl text-ivory">
          ${displayPrice}
        </span>
        <span className="ml-1 text-sm text-ivory/40">
          /{billingCycle === "annual" ? "mo" : "mo"}
        </span>
        {billingCycle === "annual" && annualPrice && (
          <p className="mt-1 text-xs text-gold/70">
            Billed ${displayPrice * 12}/year &middot; Save 20%
          </p>
        )}
      </div>

      <ul className="mb-8 flex-1 space-y-3">
        {perks.map((perk) => (
          <li key={perk} className="flex items-start gap-3 text-sm text-ivory/70">
            <svg
              className="mt-0.5 h-4 w-4 shrink-0 text-gold"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
            {perk}
          </li>
        ))}
      </ul>

      <button
        onClick={onSelect}
        disabled={loading || current}
        className={`mt-auto w-full rounded-md py-3 text-sm font-medium tracking-wide uppercase transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
          featured
            ? "bg-gold text-espresso hover:shadow-glow-gold"
            : "border border-gold/30 text-gold hover:bg-gold/10"
        }`}
      >
        {loading
          ? "Processing..."
          : current
            ? "Current Plan"
            : featured
              ? "Join Now"
              : "Select Plan"}
      </button>
    </motion.div>
  );
}
