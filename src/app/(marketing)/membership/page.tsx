import type { Metadata } from "next";
import MembershipContent from "./membership-content";

export const metadata: Metadata = {
  title: "Membership",
  description:
    "Explore The Nosey Palate membership tiers. Access curated wine tastings, private dinners, VIP concierge, and a global community of wine enthusiasts.",
  alternates: { canonical: "/membership" },
  openGraph: {
    title: "Membership — The Nosey Palate",
    description:
      "Explore membership tiers and join a luxury wine community. Curated tastings, private dinners, and exclusive experiences.",
  },
};

export default function MembershipPage() {
  return <MembershipContent />;
}
