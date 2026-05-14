import type { Metadata } from "next";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { Hero } from "@/components/landing/hero";
import { MembershipTiers } from "@/components/landing/membership-tiers";
import { UpcomingEvents } from "@/components/landing/upcoming-events";
import { Community } from "@/components/landing/community";
import { Experiences } from "@/components/landing/experiences";
import { Editorial } from "@/components/landing/editorial";
import { Hosts } from "@/components/landing/hosts";
import { Testimonials } from "@/components/landing/testimonials";
import { AppPreview } from "@/components/landing/app-preview";
import { Loyalty } from "@/components/landing/loyalty";
import { FAQ } from "@/components/landing/faq";
import { FinalCTA } from "@/components/landing/final-cta";

export const metadata: Metadata = {
  title: "The Nosey Palate — Luxury Wine Membership & Curated Experiences",
  description:
    "Join an exclusive community of wine lovers. Sommelier-led tastings, private dinners, vineyard retreats, and a premium membership built around real connection.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "The Nosey Palate — Luxury Wine Membership & Curated Experiences",
    description:
      "Join an exclusive community of wine lovers. Sommelier-led tastings, private dinners, vineyard retreats, and a premium membership built around real connection.",
  },
};

export default function HomePage() {
  return (
    <main className="relative bg-background text-foreground">
      <Navbar />
      <Hero />
      <MembershipTiers />
      <UpcomingEvents />
      <Community />
      <Experiences />
      <Editorial />
      <Hosts />
      <Testimonials />
      <AppPreview />
      <Loyalty />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}
