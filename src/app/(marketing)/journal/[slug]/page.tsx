import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import {
  Reveal,
  GoldHairline,
  Spotlight,
} from "@/components/shared/primitives";

type ArticleData = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  coverGradient: string;
  coverEmoji: string;
  author: { name: string; role: string; avatar: string };
  body: string[];
};

const ARTICLES: Record<string, ArticleData> = {
  "art-of-blind-tasting": {
    slug: "art-of-blind-tasting",
    title: "The Art of Blind Tasting: Trusting Your Palate",
    excerpt:
      "Strip away the labels and learn to listen to the wine itself.",
    category: "Wine Knowledge",
    date: "May 8, 2026",
    readTime: "7 min read",
    coverGradient: "from-burgundy/50 via-espresso to-espresso",
    coverEmoji: "🍷",
    author: {
      name: "James Harrington",
      role: "Sommelier & Wine Director",
      avatar: "https://i.pravatar.cc/300?img=12",
    },
    body: [
      "There is a particular kind of silence that falls over a room during a blind tasting. It is not the silence of intimidation — though the uninitiated might mistake it for that. It is the silence of concentration, the hush of a dozen palates reaching toward something just beyond language.",
      "I have been conducting blind tastings for The Nosey Palate since our earliest days, and I can tell you this: the transformation that happens when you remove the label is one of the most honest things in wine. Without the reassurance of a famous name or a prestigious vintage, you are left with only the liquid in the glass and the truth of your own senses.",
      "The first step is colour. Hold the glass against a white surface — a napkin will do — and tilt it slightly away from you. A young red will show vivid purple at its core and a bright, almost electric rim. An older wine will have mellowed toward garnet, tawny at the edges. These are not just pretty details; they are clues. They tell you about grape variety, winemaking technique, and age before you have even lifted the glass to your nose.",
      "Then comes the nose — and here is where most people rush. I tell our members: give the wine thirty seconds of stillness before your first swirl. That initial, quiet aroma can reveal the most delicate notes — white flowers on a Riesling, the faintest whisper of truffle on an aged Nebbiolo — that vigorous swirling might scatter.",
      "The palate itself is where confidence is built. Structure first: is the wine light-bodied or full? Does the acidity make your mouth water or does tannin grip your gums? Then flavour: primary fruit, secondary complexity from fermentation, tertiary character from ageing. Each layer adds a word to the sentence the wine is trying to speak.",
      "I have watched members who arrived convinced they 'knew nothing about wine' correctly identify a Left Bank Bordeaux on their second attempt. The palate knows more than we give it credit for. The trick is learning to listen — and blind tasting is the most effective way I know to quiet the noise and let the wine speak.",
    ],
  },
  "inside-burgundy-harvest": {
    slug: "inside-burgundy-harvest",
    title: "Inside the Burgundy Harvest: A Photo Journal",
    excerpt:
      "We followed our members to Beaune during the 2025 vendange.",
    category: "Behind the Scenes",
    date: "April 22, 2026",
    readTime: "5 min read",
    coverGradient: "from-gold/30 via-espresso to-espresso",
    coverEmoji: "🍇",
    author: {
      name: "Sofia Reis",
      role: "Community & Partnerships",
      avatar: "https://i.pravatar.cc/300?img=26",
    },
    body: [
      "The alarm went off at five thirty. Through the window of our gîte, the Côte d'Or was still wrapped in the particular blue haze that arrives with late September. Somewhere beyond the stone wall, the sound of a tractor engine coughing to life. This was vendange morning in Beaune, and our twelve members — still half-asleep, still smiling — were about to get their hands dirty.",
      "Harvest in Burgundy is not merely agricultural. It is ceremonial. The vignerons we visited — families who have tended the same parcels for three, sometimes four generations — speak about their vines the way a parent speaks about a child. Each cluster of Pinot Noir was examined before cutting; the unripe, the damaged, gently set aside. Only the best made it into the hotte, the traditional wicker basket strapped to the porter's back.",
      "By midday, the sun had burned through the mist and the slopes glowed that impossible Burgundian gold. Our members worked row by row alongside the estate's seasonal workers, trading stories and broken French over shared lunches of jambon persillé and Époisses spread on thick bread. There was wine, of course — a simple Bourgogne Blanc, cold from the cave, tasting better than any Grand Cru ever could in that moment.",
      "The afternoons were for cellars. We descended into the cool limestone caves of three domaines, tasting barrel samples of the incoming vintage straight from the cask. The juice was still cloudy, still wild — months from the polished bottles that would eventually find their way onto collectors' shelves. But the character was already there: bright acidity, silky tannin, the unmistakable Burgundian terroir that no other region on earth can replicate.",
      "On the final evening, our hosts prepared a long table under the plane trees outside the winery. Candles in jars, white linen that billowed in the breeze, and bottles brought up from deep in the cellar — wines from years when the grandparents were young, now opened in honour of new friendships. As darkness fell and the stars came out over the vineyards, I watched our members — strangers seven days earlier — raise their glasses to each other like old friends. This is why we do what we do.",
    ],
  },
  "beginners-guide-natural-wine": {
    slug: "beginners-guide-natural-wine",
    title: "A Beginner's Guide to Natural Wine",
    excerpt:
      "What makes a wine 'natural'? We unpack the movement and the bottles worth seeking out.",
    category: "Tasting Guides",
    date: "March 28, 2026",
    readTime: "8 min read",
    coverGradient: "from-green-900/40 via-espresso to-espresso",
    coverEmoji: "🌿",
    author: {
      name: "Isabelle Morel",
      role: "Founder & Head of Experiences",
      avatar: "https://i.pravatar.cc/300?img=32",
    },
    body: [
      "Let us start by saying what natural wine is not. It is not a fad. It is not a marketing gimmick. And it is emphatically not an excuse for flawed winemaking, though its critics — and it has many — often frame it that way. Natural wine is, at its core, an attempt to let the grape and the place speak without heavy-handed intervention.",
      "The loose consensus defines natural wine as wine made from organically or biodynamically farmed grapes, fermented with native yeasts, and bottled with minimal or no added sulphites. There is no legal definition in most countries, which is both its charm and its Achilles heel. Without regulation, the category stretches to include wines of extraordinary purity alongside bottles that are, frankly, difficult to enjoy.",
      "The movement has its roots in the Loire Valley and Beaujolais, where a handful of idealistic vignerons in the 1980s began farming without chemicals and making wine without the safety net of modern oenology. Marcel Lapierre, Pierre Overnoy, and others became patron saints of the movement, proving that hands-off winemaking could produce wines of real depth and beauty — not despite the lack of intervention, but because of it.",
      "For the curious beginner, I recommend starting with producers who balance philosophy with craft. In Beaujolais, look for Yvon Métras or Jean Foillard. In the Loire, Domaine de la Coulée de Serrant remains a benchmark. Closer to home, producers in Oregon, South Australia, and even parts of England are making natural wines that pair conviction with consistency.",
      "A word of caution: natural wine should still taste good. If a bottle smells like a barnyard floor or tastes aggressively of cider vinegar, that is not 'character' — it is a fault. The best natural wines are alive, complex, and often wildly aromatic, with a freshness and energy that can make conventional wines seem muted by comparison. Trust your palate. If it brings you joy, it is doing its job.",
      "At The Nosey Palate, we dedicate several events each year to natural wine exploration. Our blind tasting evenings, in particular, are a wonderful equaliser — stripped of labels and preconceptions, members consistently discover that their palates are more adventurous than they imagined.",
    ],
  },
};

const RELATED = [
  {
    slug: "art-of-blind-tasting",
    title: "The Art of Blind Tasting",
    category: "Wine Knowledge",
  },
  {
    slug: "inside-burgundy-harvest",
    title: "Inside the Burgundy Harvest",
    category: "Behind the Scenes",
  },
  {
    slug: "beginners-guide-natural-wine",
    title: "A Beginner's Guide to Natural Wine",
    category: "Tasting Guides",
  },
];

export async function generateStaticParams() {
  return Object.keys(ARTICLES).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = ARTICLES[slug];
  if (!article) return { title: "Article — The Nosey Palate" };
  return {
    title: `${article.title} — The Nosey Palate`,
    description: article.excerpt,
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = ARTICLES[slug];

  if (!article) {
    return (
      <div className="mx-auto max-w-3xl px-6 pb-20 pt-32 text-center md:px-10">
        <h1 className="font-display text-4xl text-ivory">Article Not Found</h1>
        <p className="mt-4 text-ivory/50">
          This article doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/journal"
          className="mt-8 inline-flex items-center gap-2 text-sm text-gold transition-colors hover:text-gold-soft"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Journal
        </Link>
      </div>
    );
  }

  const related = RELATED.filter((r) => r.slug !== slug).slice(0, 2);

  return (
    <div className="relative overflow-hidden">
      <Spotlight className="-top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2" />

      {/* ── Back Link ── */}
      <div className="mx-auto max-w-3xl px-6 pt-28 md:px-10">
        <Reveal>
          <Link
            href="/journal"
            className="inline-flex items-center gap-2 text-sm text-ivory/40 transition-colors hover:text-gold"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Journal
          </Link>
        </Reveal>
      </div>

      {/* ── Hero Cover ── */}
      <div className="mx-auto mt-8 max-w-4xl px-6 md:px-10">
        <Reveal>
          <div
            className={`relative flex h-64 items-center justify-center rounded-xl bg-linear-to-br sm:h-80 md:h-96 ${article.coverGradient}`}
          >
            <span className="text-7xl sm:text-8xl">{article.coverEmoji}</span>
            <span className="absolute left-6 top-6 rounded-full bg-espresso/60 px-4 py-1.5 text-xs font-medium tracking-wider text-gold/80 uppercase backdrop-blur-sm">
              {article.category}
            </span>
          </div>
        </Reveal>
      </div>

      {/* ── Article Header ── */}
      <header className="mx-auto max-w-3xl px-6 pt-12 md:px-10">
        <Reveal>
          <h1 className="font-display text-3xl leading-tight text-ivory sm:text-4xl md:text-5xl">
            {article.title}
          </h1>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-6 flex flex-wrap items-center gap-5 text-sm text-ivory/40">
            <div className="flex items-center gap-3">
              <div className="relative h-10 w-10 overflow-hidden rounded-full border border-gold/15">
                <Image
                  src={article.author.avatar}
                  alt={article.author.name}
                  fill
                  className="object-cover"
                  sizes="40px"
                />
              </div>
              <div>
                <p className="font-medium text-ivory/70">
                  {article.author.name}
                </p>
                <p className="text-xs text-ivory/35">{article.author.role}</p>
              </div>
            </div>

            <span className="hidden h-4 w-px bg-ivory/15 sm:block" />

            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              {article.date}
            </span>

            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              {article.readTime}
            </span>
          </div>
        </Reveal>
      </header>

      <GoldHairline className="mx-auto mt-10 max-w-3xl" />

      {/* ── Article Body ── */}
      <article className="mx-auto max-w-3xl px-6 py-16 md:px-10">
        <div className="space-y-7">
          {article.body.map((paragraph, i) => (
            <Reveal key={i} delay={i * 0.04}>
              <p className="text-[1.05rem] leading-[1.9] text-ivory/65">
                {paragraph}
              </p>
            </Reveal>
          ))}
        </div>
      </article>

      <GoldHairline className="mx-auto max-w-3xl" />

      {/* ── Author Bio ── */}
      <section className="mx-auto max-w-3xl px-6 py-16 md:px-10">
        <Reveal>
          <div className="glass flex flex-col items-center gap-6 rounded-lg p-8 sm:flex-row sm:items-start">
            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full border border-gold/15">
              <Image
                src={article.author.avatar}
                alt={article.author.name}
                fill
                className="object-cover"
                sizes="80px"
              />
            </div>
            <div className="text-center sm:text-left">
              <p className="text-xs tracking-widest text-gold/60 uppercase">
                Written by
              </p>
              <p className="mt-1 font-display text-lg text-ivory">
                {article.author.name}
              </p>
              <p className="mt-0.5 text-sm text-ivory/40">
                {article.author.role}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ivory/50">
                {article.author.name} brings years of expertise and passion to
                The Nosey Palate community. When not writing, you&apos;ll find
                them exploring the world&apos;s great wine regions, glass in
                hand.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      <GoldHairline className="mx-auto max-w-3xl" />

      {/* ── Related Articles ── */}
      <section className="mx-auto max-w-3xl px-6 py-16 md:px-10">
        <Reveal>
          <span className="eyebrow inline-flex items-center gap-3">
            <span className="h-px w-8 bg-gold/60" />
            Continue Reading
          </span>
          <h2 className="mt-4 font-display text-2xl text-ivory">
            More from the Journal
          </h2>
        </Reveal>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {related.map((r, i) => (
            <Reveal key={r.slug} delay={i * 0.08}>
              <Link href={`/journal/${r.slug}`} className="group block">
                <div className="glass rounded-lg p-6 transition-colors hover:border-gold/30">
                  <span className="text-[10px] font-medium tracking-wider text-gold/60 uppercase">
                    {r.category}
                  </span>
                  <h3 className="mt-2 font-display text-lg text-ivory transition-colors group-hover:text-gold-soft">
                    {r.title}
                  </h3>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium tracking-wide text-gold/50 uppercase transition-colors group-hover:text-gold">
                    Read Article →
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="mx-auto max-w-3xl px-6 pb-32 pt-8 md:px-10">
        <Reveal>
          <div className="relative text-center">
            <Spotlight className="-top-24 left-1/2 h-[300px] w-[300px] -translate-x-1/2" />
            <p className="text-sm text-ivory/40">
              Enjoying the Journal?{" "}
              <Link
                href="/membership"
                className="text-gold underline underline-offset-4 transition-colors hover:text-gold-soft"
              >
                Become a member
              </Link>{" "}
              for full access to all stories, events, and experiences.
            </p>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
