type EventProperties = Record<string, string | number | boolean | null>;

interface PostHogLike {
  capture: (name: string, props?: EventProperties) => void;
  identify: (id: string, traits?: EventProperties) => void;
}

function getPostHog(): PostHogLike | null {
  if (typeof window !== "undefined" && "posthog" in window) {
    return (window as unknown as { posthog: PostHogLike }).posthog;
  }
  return null;
}

export function trackEvent(eventName: string, properties?: EventProperties) {
  getPostHog()?.capture(eventName, properties);
}

export function identifyUser(userId: string, traits?: EventProperties) {
  getPostHog()?.identify(userId, traits);
}
