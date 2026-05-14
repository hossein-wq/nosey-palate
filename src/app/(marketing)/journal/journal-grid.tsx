"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";
import { LUXURY_EASE } from "@/lib/motion";
import type { Article } from "./page";

export function JournalGrid({
  articles,
  categories,
}: {
  articles: Article[];
  categories: string[];
}) {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? articles
      : articles.filter((a) => a.category === activeCategory);

  return (
    <>
      {/* Filter Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: LUXURY_EASE }}
        className="flex flex-wrap gap-2"
      >
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`rounded-full border px-5 py-2 text-xs font-medium tracking-wide transition-all ${
              activeCategory === cat
                ? "border-gold/40 bg-gold/15 text-gold"
                : "border-gold/10 text-ivory/50 hover:border-gold/25 hover:text-ivory/70"
            }`}
          >
            {cat}
          </button>
        ))}
      </motion.div>

      {/* Article Grid */}
      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((article, i) => (
            <motion.article
              key={article.slug}
              layout
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.6, delay: i * 0.06, ease: LUXURY_EASE }}
            >
              <Link
                href={`/journal/${article.slug}`}
                className="group block h-full"
              >
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.4, ease: LUXURY_EASE }}
                  className="glass flex h-full flex-col overflow-hidden rounded-lg transition-colors hover:border-gold/30"
                >
                  {/* Cover */}
                  <div
                    className={`relative flex h-48 items-center justify-center bg-linear-to-br ${article.coverGradient}`}
                  >
                    <span className="text-5xl">{article.coverEmoji}</span>
                    <span className="absolute left-4 top-4 rounded-full bg-espresso/60 px-3 py-1 text-[10px] font-medium tracking-wider text-gold/80 uppercase backdrop-blur-sm">
                      {article.category}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-center gap-3 text-xs text-ivory/40">
                      <time>{article.date}</time>
                      <span className="h-1 w-1 rounded-full bg-ivory/20" />
                      <span className="inline-flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {article.readTime}
                      </span>
                    </div>

                    <h3 className="mt-3 font-display text-lg leading-snug text-ivory transition-colors group-hover:text-gold-soft">
                      {article.title}
                    </h3>

                    <p className="mt-3 flex-1 text-sm leading-relaxed text-ivory/45">
                      {article.excerpt}
                    </p>

                    <span className="mt-5 inline-flex items-center gap-2 text-xs font-medium tracking-wide text-gold/60 uppercase transition-colors group-hover:text-gold">
                      Read Article
                      <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </motion.div>
              </Link>
            </motion.article>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
}
