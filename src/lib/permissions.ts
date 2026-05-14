export const CAPABILITIES = {
  "events.browse": true,
  "events.rsvp": true,
  "events.rsvp.priority": false,
  "events.rsvp.vip": false,
  "events.private_dinners": false,
  "events.guest_plus_one": false,

  "community.view": true,
  "community.post_tasting_notes": true,
  "community.react": true,

  "experiences.winery_tours": false,
  "experiences.chef_pairings": false,
  "experiences.global_journeys": false,

  "loyalty.earn_points": true,
  "loyalty.redeem": true,
  "loyalty.concierge": false,

  "support.ai_assistant": true,
  "support.concierge": false,
  "support.personalized_wine": false,
} as const;

export type Capability = keyof typeof CAPABILITIES;

export const PLAN_CAPABILITIES: Record<string, Capability[]> = {
  explorer: [
    "events.browse",
    "events.rsvp",
    "community.view",
    "community.post_tasting_notes",
    "community.react",
    "loyalty.earn_points",
    "loyalty.redeem",
    "support.ai_assistant",
  ],
  connoisseur: [
    "events.browse",
    "events.rsvp",
    "events.rsvp.priority",
    "events.private_dinners",
    "events.guest_plus_one",
    "community.view",
    "community.post_tasting_notes",
    "community.react",
    "loyalty.earn_points",
    "loyalty.redeem",
    "support.ai_assistant",
  ],
  collector: [
    "events.browse",
    "events.rsvp",
    "events.rsvp.priority",
    "events.rsvp.vip",
    "events.private_dinners",
    "events.guest_plus_one",
    "community.view",
    "community.post_tasting_notes",
    "community.react",
    "experiences.winery_tours",
    "experiences.chef_pairings",
    "experiences.global_journeys",
    "loyalty.earn_points",
    "loyalty.redeem",
    "loyalty.concierge",
    "support.ai_assistant",
    "support.concierge",
    "support.personalized_wine",
  ],
};

export function hasCapability(
  userCapabilities: Capability[],
  required: Capability,
): boolean {
  return userCapabilities.includes(required);
}

export function getCapabilitiesForPlan(planSlug: string): Capability[] {
  return PLAN_CAPABILITIES[planSlug] ?? [];
}
