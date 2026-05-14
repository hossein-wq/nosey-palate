"use client";

import { useState } from "react";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface NavItem {
  name: string;
  link: string;
  icon?: React.ReactNode;
}

interface FloatingNavbarProps {
  navItems: NavItem[];
  className?: string;
}

export function FloatingNavbar({ navItems, className }: FloatingNavbarProps) {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useMotionValueEvent(scrollY, "change", (current) => {
    if (current < 100) {
      setVisible(true);
    } else if (current < lastScrollY) {
      setVisible(true);
    } else {
      setVisible(false);
    }
    setLastScrollY(current);
  });

  return (
    <AnimatePresence mode="wait">
      {visible && (
        <motion.nav
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className={cn(
            "fixed inset-x-0 top-4 z-[5000] mx-auto flex max-w-fit items-center justify-center gap-1 rounded-full border border-white/10 bg-black/70 px-6 py-2.5 shadow-[0_4px_30px_rgba(0,0,0,0.3)] backdrop-blur-lg",
            className
          )}
        >
          {navItems.map((item) => (
            <Link
              key={item.link}
              href={item.link}
              className="relative flex items-center gap-1.5 px-3 py-1.5 text-sm text-neutral-300 transition-colors hover:text-[rgb(201,162,76)]"
            >
              {item.icon && <span className="text-sm">{item.icon}</span>}
              <span>{item.name}</span>
            </Link>
          ))}
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
