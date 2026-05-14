import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Reveal,
  Eyebrow,
  GoldHairline,
  Spotlight,
} from "@/components/shared/primitives";

export const metadata: Metadata = {
  title: "About",
  description:
    "The story behind The Nosey Palate — a curated community for those who believe wine is best experienced together. Discover our values, team, and journey.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About — The Nosey Palate",
    description: "The story behind one of the world's most intimate wine communities.",
  },
};

const VALUES = [
  {
    title: "Curation",
    description:
      "Every experience is hand-selected. We partner only with winemakers, chefs, and venues that share our obsession with craft and story.",
  },
  {
    title: "Community",
    description:
      "Wine is a conversation. Our members form lasting bonds over shared tables, rare bottles, and honest curiosity.",
  },
  {
    title: "Excellence",
    description:
      "From the first pour to the final course, every detail is considered. We hold ourselves to the standard our members deserve.",
  },
  {
    title: "Intimacy",
    description:
      "We keep gatherings small by design. Great wine moments happen when the circle is tight and the atmosphere is warm.",
  },
];

const TEAM = [
  {
    name: "Isabelle Morel",
    role: "Founder & Head of Experiences",
    avatar: "https://i.pravatar.cc/300?img=32",
  },
  {
    name: "James Harrington",
    role: "Sommelier & Wine Director",
    avatar: "https://i.pravatar.cc/300?img=12",
  },
  {
    name: "Sofia Reis",
    role: "Community & Partnerships",
    avatar: "https://i.pravatar.cc/300?img=26",
  },
  {
    name: "Oliver Chen",
    role: "Creative Director",
    avatar: "https://i.pravatar.cc/300?img=60",
  },
];

const STATS = [
  { value: "500+", label: "Members" },
  { value: "200+", label: "Events Hosted" },
  { value: "50+", label: "Cities" },
  { value: "12", label: "Countries" },
];

export default function AboutPage() {
  return (
    <div className="relative overflow-hidden">
      <Spotlight className="-top-40 left-1/3 h-[600px] w-[600px]" />

      {/* ── Hero ── */}
      <section className="mx-auto max-w-[1400px] px-6 pb-10 pt-32 md:px-10">
        <Eyebrow>About</Eyebrow>

        <Reveal>
          <h1 className="mt-6 max-w-3xl font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.05] tracking-tight text-ivory">
            The Story Behind{" "}
            <span className="italic text-gold-soft">the Pour.</span>
          </h1>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="mt-6 max-w-2xl text-lg text-ivory/60 leading-relaxed">
            The Nosey Palate was born from a simple belief: that the best wine
            moments happen when great people gather around the same table.
            We&apos;re not a wine club. We&apos;re a community — curated,
            intimate, and built for connection.
          </p>
        </Reveal>
      </section>

      <GoldHairline className="mx-auto max-w-[1400px]" />

      {/* ── Founding Story ── */}
      <section className="mx-auto max-w-[1400px] px-6 py-24 md:px-10">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <span className="eyebrow inline-flex items-center gap-3">
              <span className="h-px w-8 bg-gold/60" />
              Our Beginning
            </span>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="mt-6 font-display text-3xl text-ivory md:text-4xl">
              A Table Set for{" "}
              <span className="italic text-gold-soft">Connection</span>
            </h2>
          </Reveal>

          <div className="mt-10 space-y-6 text-ivory/60 leading-[1.85]">
            <Reveal delay={0.15}>
              <p>
                It began in the autumn of 2019, in a candlelit Parisian cellar
                beneath the Marais. Twelve strangers sat down to dinner — each
                one drawn by a quiet invitation, a shared love of wine, and a
                restlessness with the world of pretension that so often surrounds
                it. By the second course, they were no longer strangers. By
                dessert, they were planning the next gathering.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <p>
                That evening became the blueprint for The Nosey Palate. Our
                founder, Isabelle Morel, had spent a decade in the wine trade —
                from the cellars of Burgundy to the auction floors of London —
                and she had grown weary of a culture that prized exclusivity over
                experience, labels over stories. She wanted to build something
                warmer. Something that honoured the craft of winemaking while
                making space for genuine human connection.
              </p>
            </Reveal>

            <Reveal delay={0.25}>
              <p>
                Today, The Nosey Palate brings together curious drinkers across
                fifty cities and twelve countries. Our events range from
                sun-drenched vineyard walks in the Douro Valley to blindfolded
                tastings in Brooklyn brownstones. What unites them is a shared
                ethos: great wine deserves great company, and the best moments
                can&apos;t be bought — only shared.
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <p className="font-medium text-gold/80">
                Every pour, every evening, every memory — crafted with care.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <GoldHairline className="mx-auto max-w-[1400px]" />

      {/* ── Values ── */}
      <section className="mx-auto max-w-[1400px] px-6 py-24 md:px-10">
        <Reveal>
          <div className="text-center">
            <span className="eyebrow inline-flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-gold/60" />
              Our Values
            </span>
            <h2 className="mt-4 font-display text-3xl text-ivory md:text-4xl">
              What We <span className="italic text-gold-soft">Stand For</span>
            </h2>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((value, i) => (
            <Reveal key={value.title} delay={i * 0.08}>
              <div className="glass rounded-lg p-8">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/10">
                  <span className="font-display text-lg text-gold">
                    {value.title.charAt(0)}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-xl text-ivory">
                  {value.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ivory/50">
                  {value.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <GoldHairline className="mx-auto max-w-[1400px]" />

      {/* ── Stats ── */}
      <section className="mx-auto max-w-[1400px] px-6 py-24 md:px-10">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {STATS.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.1}>
              <div className="text-center">
                <p className="font-display text-4xl text-gold md:text-5xl">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm tracking-wide text-ivory/50 uppercase">
                  {stat.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <GoldHairline className="mx-auto max-w-[1400px]" />

      {/* ── Team ── */}
      <section className="mx-auto max-w-[1400px] px-6 py-24 md:px-10">
        <Reveal>
          <div className="text-center">
            <span className="eyebrow inline-flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-gold/60" />
              The Hosts
            </span>
            <h2 className="mt-4 font-display text-3xl text-ivory md:text-4xl">
              The People Behind{" "}
              <span className="italic text-gold-soft">the Table</span>
            </h2>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {TEAM.map((member, i) => (
            <Reveal key={member.name} delay={i * 0.08}>
              <div className="group text-center">
                <div className="relative mx-auto h-48 w-48 overflow-hidden rounded-full border border-gold/15 transition-colors group-hover:border-gold/30">
                  <Image
                    src={member.avatar}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="192px"
                  />
                </div>
                <h3 className="mt-5 font-display text-lg text-ivory">
                  {member.name}
                </h3>
                <p className="mt-1 text-sm text-ivory/50">{member.role}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <GoldHairline className="mx-auto max-w-[1400px]" />

      {/* ── Closing CTA ── */}
      <section className="mx-auto max-w-[1400px] px-6 py-32 md:px-10">
        <div className="relative mx-auto max-w-2xl text-center">
          <Spotlight className="-top-32 left-1/2 h-[400px] w-[400px] -translate-x-1/2" />

          <Reveal>
            <span className="eyebrow inline-flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-gold/60" />
              Join the Table
            </span>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="mt-6 font-display text-3xl text-ivory md:text-5xl">
              Your Seat Is{" "}
              <span className="italic text-gold-soft">Waiting</span>
            </h2>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="mt-6 text-ivory/60 leading-relaxed">
              Whether you&apos;re a seasoned collector or simply someone who
              believes a great bottle deserves great company — there&apos;s a
              place for you here.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/membership"
                className="inline-flex items-center gap-2 rounded-full bg-gold px-8 py-3 text-sm font-semibold text-espresso transition-colors hover:bg-gold-soft"
              >
                Become a Member
              </Link>
              <Link
                href="/events"
                className="inline-flex items-center gap-2 rounded-full border border-gold/30 px-8 py-3 text-sm font-medium text-gold transition-colors hover:bg-gold/10"
              >
                View Upcoming Events
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
