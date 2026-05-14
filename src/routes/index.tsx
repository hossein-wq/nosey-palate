import { createFileRoute } from "@tanstack/react-router";
import heroImg from "@/assets/hero.jpg";
import { Navbar } from "@/components/nosey/Navbar";
import { Hero } from "@/components/nosey/Hero";
import { MembershipTiers } from "@/components/nosey/MembershipTiers";
import { UpcomingEvents } from "@/components/nosey/UpcomingEvents";
import { Community } from "@/components/nosey/Community";
import { Experiences } from "@/components/nosey/Experiences";
import { Editorial } from "@/components/nosey/Editorial";
import { Hosts } from "@/components/nosey/Hosts";
import { Testimonials } from "@/components/nosey/Testimonials";
import { AppPreview } from "@/components/nosey/AppPreview";
import { Loyalty } from "@/components/nosey/Loyalty";
import { FAQ } from "@/components/nosey/FAQ";
import { FinalCTA } from "@/components/nosey/FinalCTA";
import { Footer } from "@/components/nosey/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nosey Palate — A Private Wine Community" },
      { name: "description", content: "Better wine. Better people. Real connection. A members-only club for curated tastings, private dinners, and unforgettable evenings." },
      { property: "og:title", content: "Nosey Palate — A Private Wine Community" },
      { property: "og:description", content: "Members-only wine community. Curated events, sommelier-led tastings, private dinners worldwide." },
      { property: "og:image", content: heroImg },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

function Home() {
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
