export const APP_NAME = "Nosey Palate";
export const APP_DESCRIPTION =
  "A members-only community for those who love wine, meaningful conversations, and unforgettable experiences.";
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export const NAV_ITEMS = [
  { label: "Membership", href: "/membership" },
  { label: "Events", href: "/events" },
  { label: "Experiences", href: "/experiences" },
  { label: "Community", href: "#community" },
  { label: "Journal", href: "/journal" },
  { label: "About", href: "/about" },
] as const;

export const MEMBERSHIP_TIERS = [
  {
    name: "Explorer",
    slug: "explorer",
    price: 29,
    tagline: "Perfect for those starting their wine journey.",
    featured: false,
    perks: ["Access to events", "Member community", "Exclusive invites"],
  },
  {
    name: "Connoisseur",
    slug: "connoisseur",
    price: 59,
    tagline: "For those who live for wine and experiences.",
    featured: true,
    perks: [
      "All Explorer benefits",
      "Priority event access",
      "Invitations to private dinners",
      "Member pricing",
    ],
  },
  {
    name: "Collector",
    slug: "collector",
    price: 99,
    tagline: "For the passionate and the discerning.",
    featured: false,
    perks: [
      "All Connoisseur benefits",
      "VIP concierge access",
      "Exclusive tasting experiences",
      "Personalized wine support",
    ],
  },
] as const;

export const LOYALTY_TIERS = [
  {
    name: "Explorer",
    range: "0 -- 499 pts",
    icon: "M7 2h10l-2 12a3 3 0 01-3 3v0a3 3 0 01-3-3L7 2zM12 17v5m-3 0h6",
    color: "var(--gold-soft)",
  },
  {
    name: "Connoisseur",
    range: "500 -- 1,499 pts",
    icon: "M3 9l3-5 6 4 6-4 3 5v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z",
    color: "oklch(0.7 0.22 18)",
  },
  {
    name: "Collector",
    range: "1,500 -- 2,999 pts",
    icon: "M12 2L2 9l10 13L22 9 12 2z",
    color: "oklch(0.7 0.22 290)",
  },
  {
    name: "Grand Cru",
    range: "3,000+ pts",
    icon: "M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z",
    color: "var(--gold)",
  },
] as const;
