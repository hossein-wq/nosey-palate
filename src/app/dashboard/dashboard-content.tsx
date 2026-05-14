"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { LUXURY_EASE } from "@/lib/motion";

const QUICK_ACTIONS = [
  {
    label: "View Events",
    description: "Browse upcoming tastings and dinners",
    href: "/dashboard/events",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
  },
  {
    label: "Community",
    description: "Connect with fellow members",
    href: "/dashboard/community",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87" />
        <path d="M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
  },
  {
    label: "Manage Membership",
    description: "Upgrade, billing & subscription",
    href: "/dashboard/membership",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
        <rect x="1" y="4" width="22" height="16" rx="2" />
        <line x1="1" y1="10" x2="23" y2="10" />
      </svg>
    ),
  },
  {
    label: "AI Concierge",
    description: "Your personal wine advisor",
    href: "/dashboard/assistant",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
        <path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z" />
      </svg>
    ),
  },
];

interface DashboardContentProps {
  displayName: string;
  planName: string | null;
  planSlug: string | null;
  subscriptionStatus: string | null;
  upcomingEvents: number;
  loyaltyPoints: number;
  loyaltyTier: string;
}

export function DashboardContent({
  displayName,
  planName,
  subscriptionStatus,
  upcomingEvents,
  loyaltyPoints,
  loyaltyTier,
}: DashboardContentProps) {
  const tierLabel = loyaltyTier
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return (
    <div className="mx-auto max-w-[1400px] px-6 py-12 md:px-10">
      <motion.div
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: LUXURY_EASE }}
      >
        <span className="eyebrow inline-flex items-center gap-3">
          <span className="h-px w-8 bg-gold/60" />
          Welcome Back
        </span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.1, ease: LUXURY_EASE }}
        className="mt-4 font-display text-4xl text-ivory md:text-5xl"
      >
        Hello,{" "}
        <span className="italic text-gold-soft">{displayName}</span>
      </motion.h1>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: LUXURY_EASE }}
          className="glass rounded-lg p-6"
        >
          <div className="eyebrow mb-3">Upcoming Events</div>
          <p className="font-display text-4xl text-ivory">{upcomingEvents}</p>
          <p className="mt-1 text-sm text-ivory/50">
            {upcomingEvents === 1 ? "RSVP" : "RSVPs"} confirmed
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: LUXURY_EASE }}
          className="glass rounded-lg p-6"
        >
          <div className="eyebrow mb-3">Loyalty Points</div>
          <p className="font-display text-4xl text-ivory">
            {loyaltyPoints.toLocaleString()}
          </p>
          <p className="mt-1 text-sm text-ivory/50">{tierLabel} tier</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: LUXURY_EASE }}
          className="glass rounded-lg p-6 sm:col-span-2 lg:col-span-1"
        >
          <div className="eyebrow mb-3">Membership</div>
          {planName ? (
            <>
              <p className="font-display text-4xl text-gold">{planName}</p>
              <p className="mt-1 text-sm text-ivory/50">
                {subscriptionStatus === "active"
                  ? "Active"
                  : subscriptionStatus === "past_due"
                    ? "Past due"
                    : "Inactive"}
              </p>
            </>
          ) : (
            <>
              <p className="font-display text-2xl text-ivory/50">No Plan</p>
              <Link
                href="/dashboard/membership"
                className="mt-2 inline-block text-sm text-gold underline underline-offset-4 transition-colors hover:text-gold-soft"
              >
                Choose a plan
              </Link>
            </>
          )}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5, ease: LUXURY_EASE }}
        className="mt-12"
      >
        <h2 className="font-display text-2xl text-ivory">Quick Actions</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {QUICK_ACTIONS.map((action, i) => (
            <motion.div
              key={action.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.6 + i * 0.1,
                ease: LUXURY_EASE,
              }}
            >
              <Link
                href={action.href}
                className="group flex h-full flex-col rounded-lg glass p-6 transition-all duration-300 hover:ring-1 hover:ring-gold/25 hover:shadow-luxe"
              >
                <div className="mb-4 text-gold/70 transition-colors group-hover:text-gold">
                  {action.icon}
                </div>
                <h3 className="font-display text-lg text-ivory transition-colors group-hover:text-gold-soft">
                  {action.label}
                </h3>
                <p className="mt-1 text-xs text-ivory/40">
                  {action.description}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.8, ease: LUXURY_EASE }}
        className="mt-12 glass rounded-lg p-8"
      >
        <h2 className="font-display text-2xl text-ivory">Recent Activity</h2>
        <p className="mt-4 text-sm text-ivory/50">
          Your event history, tasting notes, and community activity will appear
          here.
        </p>
      </motion.div>
    </div>
  );
}
