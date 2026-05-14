"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  Users,
  CreditCard,
  CalendarDays,
  DollarSign,
  Plus,
  Bell,
  Eye,
  TrendingUp,
  UserPlus,
  Ticket,
  ArrowUpRight,
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const revenueData = [
  { month: "Jan", revenue: 98000 },
  { month: "Feb", revenue: 112000 },
  { month: "Mar", revenue: 125000 },
  { month: "Apr", revenue: 138000 },
  { month: "May", revenue: 148200 },
];

const memberData = [
  { month: "Jan", explorer: 1200, connoisseur: 650, collector: 180 },
  { month: "Feb", explorer: 1350, connoisseur: 710, collector: 195 },
  { month: "Mar", explorer: 1520, connoisseur: 780, collector: 210 },
  { month: "Apr", explorer: 1680, connoisseur: 840, collector: 225 },
  { month: "May", explorer: 1850, connoisseur: 890, collector: 240 },
];

const stats = [
  { label: "Total Members", value: "2,847", change: "+12.5%", icon: Users },
  { label: "Active Subscriptions", value: "1,923", change: "+8.2%", icon: CreditCard },
  { label: "Upcoming Events", value: "12", change: "+3", icon: CalendarDays },
  { label: "Revenue MTD", value: "$148,200", change: "+7.4%", icon: DollarSign },
];

const recentActivity = [
  { id: 1, type: "signup", text: "Sophia Laurent joined as Connoisseur", time: "2 min ago", icon: UserPlus },
  { id: 2, type: "rsvp", text: "James Chen RSVP'd to Bordeaux Grand Tasting", time: "15 min ago", icon: Ticket },
  { id: 3, type: "subscription", text: "Elena Vasquez upgraded to Collector", time: "1 hr ago", icon: TrendingUp },
  { id: 4, type: "signup", text: "Marcus Reed joined as Explorer", time: "2 hrs ago", icon: UserPlus },
  { id: 5, type: "rsvp", text: "Isabelle Moreau RSVP'd to Private Cellar Dinner", time: "3 hrs ago", icon: Ticket },
];

const quickActions = [
  { label: "Create Event", href: "/admin/events", icon: Plus },
  { label: "Send Notification", href: "/admin/notifications", icon: Bell },
  { label: "View Members", href: "/admin/members", icon: Eye },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

function GoldTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; name: string; color: string }>; label?: string }) {
  if (!active || !payload) return null;
  return (
    <div className="glass-strong rounded-lg px-4 py-3 shadow-xl">
      <p className="text-xs font-medium text-ivory/60">{label}</p>
      {payload.map((entry) => (
        <p key={entry.name} className="text-sm font-medium text-ivory" style={{ color: entry.color }}>
          {entry.name}: {typeof entry.value === "number" && entry.name === "revenue"
            ? `$${(entry.value / 1000).toFixed(0)}k`
            : entry.value.toLocaleString()}
        </p>
      ))}
    </div>
  );
}

export default function AdminPage() {
  return (
    <motion.div variants={container} initial="hidden" animate="show">
      <motion.div variants={item} className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-4xl text-ivory">
            Admin <span className="italic text-gold-soft">Overview</span>
          </h1>
          <p className="mt-2 text-sm text-ivory/50">Welcome back. Here&apos;s what&apos;s happening today.</p>
        </div>
        <div className="flex gap-3">
          {quickActions.map((action) => (
            <Link
              key={action.label}
              href={action.href}
              className={cn(
                "flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition",
                action.label === "Create Event"
                  ? "bg-gold text-espresso hover:bg-gold-soft"
                  : "glass text-ivory/70 hover:text-ivory"
              )}
            >
              <action.icon className="h-4 w-4" />
              {action.label}
            </Link>
          ))}
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div variants={item} className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="glass group rounded-xl p-6 transition hover:border-gold/30">
            <div className="mb-4 flex items-center justify-between">
              <div className="eyebrow">{stat.label}</div>
              <div className="rounded-lg bg-gold/10 p-2">
                <stat.icon className="h-4 w-4 text-gold" />
              </div>
            </div>
            <p className="font-display text-3xl text-ivory">{stat.value}</p>
            <p className="mt-1 flex items-center gap-1 text-xs text-emerald-400">
              <ArrowUpRight className="h-3 w-3" />
              {stat.change} from last month
            </p>
          </div>
        ))}
      </motion.div>

      {/* Charts */}
      <div className="mt-8 grid gap-6 xl:grid-cols-2">
        {/* Revenue Chart */}
        <motion.div variants={item} className="glass rounded-xl p-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <div className="eyebrow mb-1">Revenue</div>
              <p className="font-display text-2xl text-ivory">$148,200</p>
            </div>
            <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-400">
              +7.4%
            </span>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.78 0.13 80)" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="oklch(0.78 0.13 80)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.3 0.04 40 / 30%)" />
                <XAxis dataKey="month" tick={{ fill: "oklch(0.7 0.04 70)", fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "oklch(0.7 0.04 70)", fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v: number) => `$${v / 1000}k`} />
                <Tooltip content={<GoldTooltip />} />
                <Area type="monotone" dataKey="revenue" stroke="oklch(0.78 0.13 80)" strokeWidth={2} fill="url(#goldGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Membership Growth Chart */}
        <motion.div variants={item} className="glass rounded-xl p-6">
          <div className="mb-6">
            <div className="eyebrow mb-1">Membership Growth</div>
            <p className="font-display text-2xl text-ivory">2,980 total</p>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={memberData}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.3 0.04 40 / 30%)" />
                <XAxis dataKey="month" tick={{ fill: "oklch(0.7 0.04 70)", fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "oklch(0.7 0.04 70)", fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip content={<GoldTooltip />} />
                <Legend wrapperStyle={{ fontSize: 12, color: "oklch(0.7 0.04 70)" }} />
                <Bar dataKey="explorer" name="Explorer" fill="oklch(0.78 0.13 80)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="connoisseur" name="Connoisseur" fill="oklch(0.55 0.18 30)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="collector" name="Collector" fill="oklch(0.86 0.09 85)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div variants={item} className="mt-8 glass rounded-xl p-6">
        <div className="mb-6 flex items-center justify-between">
          <div className="eyebrow">Recent Activity</div>
          <Link href="/admin/analytics" className="text-xs text-gold/70 transition hover:text-gold">
            View all
          </Link>
        </div>
        <div className="divide-y divide-gold/10">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="flex items-center gap-4 py-4 first:pt-0 last:pb-0">
              <div className="rounded-lg bg-gold/10 p-2.5">
                <activity.icon className="h-4 w-4 text-gold" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-ivory">{activity.text}</p>
                <p className="text-xs text-ivory/40">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
