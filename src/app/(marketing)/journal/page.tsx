import type { Metadata } from "next";
import {
  Reveal,
  Eyebrow,
  GoldHairline,
  Spotlight,
} from "@/components/shared/primitives";
import { JournalGrid } from "./journal-grid";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Wine stories, tasting notes, and dispatches from The Nosey Palate community. Expert guides, member stories, and behind-the-scenes insights.",
  alternates: { canonical: "/journal" },
  openGraph: {
    title: "Journal — The Nosey Palate",
    description: "Wine stories, tasting notes, and dispatches from our community.",
  },
};

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  coverGradient: string;
  coverEmoji: string;
};

const ARTICLES: Article[] = [
  {
    slug: "art-of-blind-tasting",
    title: "The Art of Blind Tasting: Trusting Your Palate",
    excerpt:
      "Strip away the labels and learn to listen to the wine itself. Our sommelier shares the techniques that separate casual sippers from confident tasters.",
    category: "Wine Knowledge",
    date: "May 8, 2026",
    readTime: "7 min read",
    coverGradient: "from-burgundy/50 via-espresso to-espresso",
    coverEmoji: "🍷",
  },
  {
    slug: "inside-burgundy-harvest",
    title: "Inside the Burgundy Harvest: A Photo Journal",
    excerpt:
      "We followed our members to Beaune during the 2025 vendange. Golden light, muddy boots, and the intoxicating scent of freshly pressed Pinot Noir.",
    category: "Behind the Scenes",
    date: "April 22, 2026",
    readTime: "5 min read",
    coverGradient: "from-gold/30 via-espresso to-espresso",
    coverEmoji: "🍇",
  },
  {
    slug: "member-spotlight-james-chen",
    title: "Member Spotlight: James Chen on Wine & Architecture",
    excerpt:
      "The Tokyo-based architect talks about how space shapes the way we taste — and why his best design ideas arrive mid-pour.",
    category: "Member Stories",
    date: "April 10, 2026",
    readTime: "6 min read",
    coverGradient: "from-champagne/20 via-espresso to-espresso",
    coverEmoji: "✨",
  },
  {
    slug: "beginners-guide-natural-wine",
    title: "A Beginner's Guide to Natural Wine",
    excerpt:
      "What makes a wine 'natural'? We unpack the movement, the misconceptions, and the bottles worth seeking out this spring.",
    category: "Tasting Guides",
    date: "March 28, 2026",
    readTime: "8 min read",
    coverGradient: "from-green-900/40 via-espresso to-espresso",
    coverEmoji: "🌿",
  },
  {
    slug: "evening-in-porto",
    title: "An Evening in Porto: Port, Fado, and Friendship",
    excerpt:
      "Our Douro Valley retreat ended with an unforgettable night in a centuries-old port lodge. Here's what happened when the music started.",
    category: "Behind the Scenes",
    date: "March 15, 2026",
    readTime: "5 min read",
    coverGradient: "from-amber-900/40 via-espresso to-espresso",
    coverEmoji: "🎶",
  },
  {
    slug: "five-wines-to-cellar",
    title: "Five Wines to Cellar Right Now (2026 Edition)",
    excerpt:
      "Our wine director picks five bottles under $80 that will reward patience — and explains exactly when to open them.",
    category: "Tasting Guides",
    date: "March 2, 2026",
    readTime: "6 min read",
    coverGradient: "from-burgundy/40 via-espresso to-espresso",
    coverEmoji: "🏷️",
  },
];

const CATEGORIES = [
  "All",
  "Wine Knowledge",
  "Behind the Scenes",
  "Member Stories",
  "Tasting Guides",
];

export default function JournalPage() {
  return (
    <div className="relative overflow-hidden">
      <Spotlight className="-top-40 right-1/3 h-[600px] w-[600px]" />

      {/* ── Hero ── */}
      <section className="mx-auto max-w-[1400px] px-6 pb-10 pt-32 md:px-10">
        <Eyebrow>Journal</Eyebrow>

        <Reveal>
          <h1 className="mt-6 font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.05] tracking-tight text-ivory">
            Stories from{" "}
            <span className="italic text-gold-soft">the Table.</span>
          </h1>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="mt-6 max-w-xl text-lg text-ivory/60 leading-relaxed">
            Wine stories, tasting notes, and dispatches from our community of
            curious drinkers.
          </p>
        </Reveal>
      </section>

      <GoldHairline className="mx-auto max-w-[1400px]" />

      {/* ── Articles (interactive filter + grid) ── */}
      <section className="mx-auto max-w-[1400px] px-6 py-24 md:px-10">
        <JournalGrid articles={ARTICLES} categories={CATEGORIES} />
      </section>
    </div>
  );
}
