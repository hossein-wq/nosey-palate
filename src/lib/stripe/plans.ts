export const STRIPE_PLANS = {
  explorer: {
    name: "Explorer",
    monthly: process.env.STRIPE_PRICE_EXPLORER_MONTHLY,
    annual: process.env.STRIPE_PRICE_EXPLORER_ANNUAL,
  },
  connoisseur: {
    name: "Connoisseur",
    monthly: process.env.STRIPE_PRICE_CONNOISSEUR_MONTHLY,
    annual: process.env.STRIPE_PRICE_CONNOISSEUR_ANNUAL,
  },
  collector: {
    name: "Collector",
    monthly: process.env.STRIPE_PRICE_COLLECTOR_MONTHLY,
    annual: process.env.STRIPE_PRICE_COLLECTOR_ANNUAL,
  },
} as const;
