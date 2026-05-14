"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  CalendarDays,
  CreditCard,
  BarChart3,
  Bell,
  Star,
  ArrowLeft,
  Menu,
  X,
} from "lucide-react";

const ADMIN_NAV = [
  { label: "Overview", href: "/admin", icon: LayoutDashboard },
  { label: "Members", href: "/admin/members", icon: Users },
  { label: "Events", href: "/admin/events", icon: CalendarDays },
  { label: "Subscriptions", href: "/admin/subscriptions", icon: CreditCard },
  { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { label: "Notifications", href: "/admin/notifications", icon: Bell },
  { label: "Loyalty", href: "/admin/loyalty", icon: Star },
] as const;

function isActive(pathname: string, href: string) {
  if (href === "/admin") return pathname === "/admin";
  return pathname.startsWith(href);
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const sidebar = (
    <>
      <Link href="/admin" className="relative mb-10 inline-block h-10 w-28">
        <Image
          src="/images/logo.png"
          alt="Nosey Palate"
          fill
          className="object-contain object-left"
        />
      </Link>

      <div className="eyebrow mb-4">Administration</div>

      <nav className="flex flex-1 flex-col gap-1">
        {ADMIN_NAV.map((item) => {
          const active = isActive(pathname, item.href);
          return (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setSidebarOpen(false)}
              className={cn(
                "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all duration-200",
                active
                  ? "bg-gold/10 text-gold"
                  : "text-ivory/50 hover:bg-gold/5 hover:text-ivory/80"
              )}
            >
              <item.icon
                className={cn(
                  "h-4 w-4 shrink-0 transition-colors",
                  active ? "text-gold" : "text-ivory/40 group-hover:text-ivory/60"
                )}
              />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto border-t border-gold/10 pt-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm text-ivory/40 transition hover:text-ivory/70"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Site
        </Link>
      </div>
    </>
  );

  return (
    <div className="flex min-h-screen">
      {/* Desktop sidebar */}
      <aside className="glass-strong fixed inset-y-0 left-0 z-40 hidden w-60 flex-col p-6 lg:flex">
        {sidebar}
      </aside>

      {/* Mobile overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: -240 }}
              animate={{ x: 0 }}
              exit={{ x: -240 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="glass-strong fixed inset-y-0 left-0 z-50 flex w-60 flex-col p-6 lg:hidden"
            >
              <button
                onClick={() => setSidebarOpen(false)}
                className="absolute right-4 top-4 text-ivory/50 hover:text-ivory"
              >
                <X className="h-5 w-5" />
              </button>
              {sidebar}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className="flex flex-1 flex-col lg:ml-60">
        {/* Top header */}
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-gold/10 bg-background/80 px-6 py-4 backdrop-blur-md lg:px-10">
          <button
            onClick={() => setSidebarOpen(true)}
            className="rounded-lg p-2 text-ivory/60 hover:bg-gold/10 hover:text-ivory lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="hidden lg:block" />

          <div className="flex items-center gap-4">
            <button className="relative rounded-lg p-2 text-ivory/50 transition hover:bg-gold/10 hover:text-ivory">
              <Bell className="h-5 w-5" />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-gold" />
            </button>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-medium text-ivory">Admin</p>
                <p className="text-xs text-ivory/40">admin@noseypalate.com</p>
              </div>
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gold/20 text-sm font-medium text-gold">
                A
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 lg:p-10">{children}</main>
      </div>
    </div>
  );
}
