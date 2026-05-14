"use client";

import Link from "next/link";
import Image from "next/image";

const COLS = [
  {
    title: "Explore",
    links: [
      { label: "Membership", href: "/membership" },
      { label: "Events", href: "/events" },
      { label: "Experiences", href: "/experiences" },
      { label: "Community", href: "#community" },
      { label: "Journal", href: "/journal" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Careers", href: "#" },
      { label: "Press", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms", href: "#" },
      { label: "Privacy", href: "#" },
      { label: "Refund Policy", href: "#" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative border-t border-gold/15 bg-background pb-10 pt-20">
      <div className="mx-auto grid max-w-[1400px] gap-12 px-6 md:grid-cols-12 md:px-10">
        <div className="md:col-span-4">
          <Link href="/" className="relative inline-block h-12 w-32">
            <Image
              src="/images/logo.png"
              alt="Nosey Palate"
              fill
              className="object-contain object-left"
            />
          </Link>
          <p className="mt-5 max-w-xs text-sm text-ivory/55">
            A private members club for those who live for wine, conversation, and
            unforgettable evenings.
          </p>
          <div className="mt-6 flex gap-3">
            {["IG", "FB", "X", "in"].map((s) => (
              <a
                key={s}
                href="#"
                aria-label={s}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/25 text-xs text-ivory/70 transition hover:border-gold hover:text-gold"
              >
                {s}
              </a>
            ))}
          </div>
        </div>

        {COLS.map((col) => (
          <div key={col.title} className="md:col-span-2">
            <div className="eyebrow mb-5">{col.title}</div>
            <ul className="space-y-3">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-sm text-ivory/70 transition hover:text-gold"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="md:col-span-2">
          <div className="eyebrow mb-5">Stay in the Loop</div>
          <p className="mb-4 text-sm text-ivory/60">
            Get exclusive invites and updates.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="glass flex items-center rounded-full px-4 py-2"
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 bg-transparent text-sm text-ivory outline-none placeholder:text-ivory/40"
            />
            <button
              type="submit"
              aria-label="Subscribe"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-gold text-espresso transition hover:scale-105"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M2 21l21-9L2 3v7l15 2-15 2v7z" />
              </svg>
            </button>
          </form>
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-[1400px] px-6 md:px-10">
        <div className="hairline h-px w-full" />
        <div className="mt-6 text-center text-xs text-ivory/40">
          &copy; {new Date().getFullYear()} Nosey Palate. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
