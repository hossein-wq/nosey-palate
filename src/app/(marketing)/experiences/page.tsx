import type { Metadata } from "next";
import Link from "next/link";
import {
  Reveal,
  Eyebrow,
  GoldHairline,
  Spotlight,
} from "@/components/shared/primitives";
import { ExperienceGrid } from "./experience-grid";

export const metadata: Metadata = {
  title: "Experiences",
  description:
    "Sommelier-led tastings, private winery tours, chef pairing dinners, and wine journeys across the globe — curated exclusively for Nosey Palate members.",
  alternates: { canonical: "/experiences" },
  openGraph: {
    title: "Experiences — The Nosey Palate",
    description: "Sommelier-led tastings, private winery tours, chef pairing dinners, and wine journeys across the globe.",
  },
};

const FEATURED = {
  title: "Burgundy Harvest Retreat",
  subtitle: "October 12–18, 2026 · Beaune, France",
  description:
    "Walk the hallowed vineyards of Côte de Beaune during peak harvest. Spend six days alongside fourth-generation vignerons, taste barrel samples from legendary domaines, and share nightly dinners prepared by a Michelin-starred chef using hyper-local produce. Limited to twelve members — an intimate immersion into one of wine's most sacred landscapes.",
  highlights: [
    "Private cellar visits at Domaine Leflaive & Romanée-Conti",
    "Hands-on harvest day with local vignerons",
    "Six-course farewell dinner at a 17th-century château",
    "Curated tasting of 30+ Grand Cru vintages",
  ],
};

export default function ExperiencesPage() {
  return (
    <div className="relative overflow-hidden">
      <Spotlight className="-top-40 right-1/4 h-[600px] w-[600px]" />

      {/* ── Hero ── */}
      <section className="mx-auto max-w-[1400px] px-6 pb-10 pt-32 md:px-10">
        <Eyebrow>Experiences</Eyebrow>

        <Reveal>
          <h1 className="mt-6 font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.05] tracking-tight text-ivory">
            Go Beyond{" "}
            <span className="italic text-gold-soft">the Glass.</span>
          </h1>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="mt-6 max-w-xl text-lg text-ivory/60 leading-relaxed">
            Sommelier-led tastings, private winery tours, chef pairing dinners,
            and wine journeys across the globe — each moment designed to deepen
            your palate and your connections.
          </p>
        </Reveal>
      </section>

      <GoldHairline className="mx-auto max-w-[1400px]" />

      {/* ── Experience Categories (interactive grid) ── */}
      <section className="mx-auto max-w-[1400px] px-6 py-24 md:px-10">
        <Reveal>
          <div className="text-center">
            <span className="eyebrow inline-flex items-center gap-3">
              <span className="h-px w-8 bg-gold/60" />
              Curated for You
            </span>
            <h2 className="mt-4 font-display text-3xl text-ivory md:text-4xl">
              Ways to{" "}
              <span className="italic text-gold-soft">Experience Wine</span>
            </h2>
          </div>
        </Reveal>

        <div className="mt-16">
          <ExperienceGrid />
        </div>
      </section>

      <GoldHairline className="mx-auto max-w-[1400px]" />

      {/* ── Featured Experience ── */}
      <section className="mx-auto max-w-[1400px] px-6 py-24 md:px-10">
        <Reveal>
          <span className="eyebrow inline-flex items-center gap-3">
            <span className="h-px w-8 bg-gold/60" />
            Featured Journey
          </span>
        </Reveal>

        <div className="mt-10 grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <div className="relative aspect-4/3 overflow-hidden rounded-lg">
              <div className="absolute inset-0 bg-linear-to-br from-burgundy/40 via-espresso to-espresso" />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-8 text-center">
                <span className="text-6xl">🍇</span>
                <p className="text-sm tracking-widest text-gold/80 uppercase">
                  Côte de Beaune · Burgundy
                </p>
              </div>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <h3 className="font-display text-3xl text-ivory md:text-4xl">
                {FEATURED.title}
              </h3>
              <p className="mt-2 text-sm text-gold/80">{FEATURED.subtitle}</p>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-6 text-ivory/60 leading-relaxed">
                {FEATURED.description}
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <ul className="mt-8 space-y-3">
                {FEATURED.highlights.map((h) => (
                  <li
                    key={h}
                    className="flex items-start gap-3 text-sm text-ivory/70"
                  >
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-gold/70" />
                    {h}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.3}>
              <Link
                href="/membership"
                className="mt-10 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-8 py-3 text-sm font-medium text-gold transition-colors hover:bg-gold/20"
              >
                Reserve Your Place
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      <GoldHairline className="mx-auto max-w-[1400px]" />

      {/* ── Closing CTA ── */}
      <section className="mx-auto max-w-[1400px] px-6 py-32 md:px-10">
        <div className="relative mx-auto max-w-2xl text-center">
          <Spotlight className="-top-32 left-1/2 h-[400px] w-[400px] -translate-x-1/2" />

          <Reveal>
            <span className="eyebrow inline-flex items-center gap-3">
              <span className="h-px w-8 bg-gold/60" />
              Join Us
            </span>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="mt-6 font-display text-3xl text-ivory md:text-5xl">
              Your Next Chapter{" "}
              <span className="italic text-gold-soft">Starts Here</span>
            </h2>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="mt-6 text-ivory/60 leading-relaxed">
              Membership unlocks every experience — from intimate local tastings
              to grand vineyard retreats. Find the tier that fits your journey.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/membership"
                className="inline-flex items-center gap-2 rounded-full bg-gold px-8 py-3 text-sm font-semibold text-espresso transition-colors hover:bg-gold-soft"
              >
                Explore Membership
              </Link>
              <Link
                href="/events"
                className="inline-flex items-center gap-2 rounded-full border border-gold/30 px-8 py-3 text-sm font-medium text-gold transition-colors hover:bg-gold/10"
              >
                Browse Events
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
