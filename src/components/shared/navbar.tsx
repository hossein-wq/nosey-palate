"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import { NAV_ITEMS } from "@/lib/constants";

export function Navbar() {
  const { scrollY } = useScroll();
  const bg = useTransform(scrollY, [0, 200], ["rgba(15,8,6,0)", "rgba(15,8,6,0.75)"]);
  const border = useTransform(
    scrollY,
    [0, 200],
    ["rgba(201,162,76,0)", "rgba(201,162,76,0.18)"],
  );
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <motion.header
      style={{ backgroundColor: bg, borderBottomColor: border }}
      className="fixed inset-x-0 top-0 z-50 border-b backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5 md:px-10">
        <Link href="/" className="relative h-10 w-24">
          <Image
            src="/images/logo.png"
            alt="Nosey Palate"
            fill
            className="object-contain object-left"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="group relative text-[13px] tracking-wide text-ivory/70 transition-colors hover:text-ivory"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold transition-all duration-500 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <Link
            href="/login"
            className="text-[13px] text-ivory/70 transition hover:text-ivory"
          >
            Log in
          </Link>
          <Link
            href="/signup"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gold px-5 py-2.5 text-[13px] font-medium text-espresso transition-all hover:shadow-[0_0_30px_color-mix(in_oklab,var(--gold)_45%,transparent)]"
          >
            Apply for Membership
            <span className="transition-transform group-hover:translate-x-0.5">
              &rarr;
            </span>
          </Link>
        </div>

        <button
          aria-label="Menu"
          onClick={() => setMobileOpen((o) => !o)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
        >
          <span
            className={`h-px w-6 bg-ivory transition-all ${mobileOpen ? "translate-y-[7px] rotate-45" : ""}`}
          />
          <span
            className={`h-px w-6 bg-ivory transition-all ${mobileOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`h-px w-6 bg-ivory transition-all ${mobileOpen ? "-translate-y-[7px] -rotate-45" : ""}`}
          />
        </button>
      </div>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-strong absolute inset-x-0 top-full border-t border-gold/20 lg:hidden"
        >
          <div className="flex flex-col gap-1 px-6 py-6">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="py-2 font-display text-2xl text-ivory/85"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/signup"
              className="mt-4 inline-flex items-center justify-center rounded-full bg-gold px-5 py-3 text-sm font-medium text-espresso"
            >
              Apply for Membership &rarr;
            </Link>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}
