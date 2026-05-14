"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  CreditCard,
  AlertTriangle,
  XCircle,
  DollarSign,
  MoreHorizontal,
  Eye,
  RefreshCw,
  Ban,
} from "lucide-react";
import {
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useState } from "react";

const stats = [
  { label: "Active", value: "1,923", change: "+82", icon: CreditCard, color: "text-emerald-400" },
  { label: "Past Due", value: "47", change: "-3", icon: AlertTriangle, color: "text-amber-400" },
  { label: "Canceled", value: "156", change: "+12", icon: XCircle, color: "text-red-400" },
  { label: "Total Revenue", value: "$742,800", change: "+$48.2k", icon: DollarSign, color: "text-gold" },
];

const mrrData = [
  { month: "Jan", mrr: 68000 },
  { month: "Feb", mrr: 72000 },
  { month: "Mar", mrr: 78500 },
  { month: "Apr", mrr: 84000 },
  { month: "May", mrr: 91200 },
];

const planDistribution = [
  { name: "Explorer", value: 1200, fill: "oklch(0.78 0.13 80)" },
  { name: "Connoisseur", value: 580, fill: "oklch(0.55 0.18 30)" },
  { name: "Collector", value: 143, fill: "oklch(0.86 0.09 85)" },
];

interface Subscription {
  id: string;
  member: string;
  email: string;
  plan: "Explorer" | "Connoisseur" | "Collector";
  status: "active" | "past_due" | "canceled";
  periodStart: string;
  periodEnd: string;
}

const subscriptions: Subscription[] = [
  { id: "1", member: "Sophia Laurent", email: "sophia@example.com", plan: "Connoisseur", status: "active", periodStart: "2025-05-01", periodEnd: "2025-06-01" },
  { id: "2", member: "James Chen", email: "james.c@example.com", plan: "Collector", status: "active", periodStart: "2025-05-10", periodEnd: "2025-06-10" },
  { id: "3", member: "Oliver Blackwood", email: "oliver.b@example.com", plan: "Explorer", status: "past_due", periodStart: "2025-04-15", periodEnd: "2025-05-15" },
  { id: "4", member: "Elena Vasquez", email: "elena.v@example.com", plan: "Collector", status: "active", periodStart: "2025-05-05", periodEnd: "2025-06-05" },
  { id: "5", member: "Rafael Dumont", email: "rafael.d@example.com", plan: "Explorer", status: "canceled", periodStart: "2025-03-08", periodEnd: "2025-04-08" },
  { id: "6", member: "Isabelle Moreau", email: "isabelle@example.com", plan: "Connoisseur", status: "active", periodStart: "2025-05-12", periodEnd: "2025-06-12" },
];

const planColor: Record<string, string> = {
  Explorer: "bg-gold/15 text-gold",
  Connoisseur: "bg-ember/15 text-ember",
  Collector: "bg-champagne/20 text-champagne",
};

const subStatusColor: Record<string, string> = {
  active: "bg-emerald-400/15 text-emerald-400",
  past_due: "bg-amber-400/15 text-amber-400",
  canceled: "bg-red-400/15 text-red-400",
};

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

function ChartTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; name: string }>; label?: string }) {
  if (!active || !payload) return null;
  return (
    <div className="glass-strong rounded-lg px-4 py-3 shadow-xl">
      <p className="text-xs font-medium text-ivory/60">{label}</p>
      {payload.map((entry) => (
        <p key={entry.name} className="text-sm font-medium text-ivory">
          ${(entry.value / 1000).toFixed(1)}k
        </p>
      ))}
    </div>
  );
}

export default function AdminSubscriptionsPage() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  return (
    <motion.div variants={container} initial="hidden" animate="show">
      <motion.div variants={item} className="mb-10">
        <h1 className="font-display text-4xl text-ivory">
          Subscription <span className="italic text-gold-soft">Overview</span>
        </h1>
        <p className="mt-2 text-sm text-ivory/50">Manage billing, plans, and subscription lifecycle.</p>
      </motion.div>

      {/* Stats */}
      <motion.div variants={item} className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="glass rounded-xl p-6">
            <div className="mb-3 flex items-center justify-between">
              <div className="eyebrow">{stat.label}</div>
              <div className="rounded-lg bg-gold/10 p-2">
                <stat.icon className={cn("h-4 w-4", stat.color)} />
              </div>
            </div>
            <p className="font-display text-3xl text-ivory">{stat.value}</p>
            <p className={cn("mt-1 text-xs", stat.color)}>{stat.change} this month</p>
          </div>
        ))}
      </motion.div>

      {/* Charts Row */}
      <div className="mt-8 grid gap-6 xl:grid-cols-3">
        <motion.div variants={item} className="glass rounded-xl p-6 xl:col-span-2">
          <div className="mb-6">
            <div className="eyebrow mb-1">Monthly Recurring Revenue</div>
            <p className="font-display text-2xl text-ivory">$91,200</p>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mrrData}>
                <defs>
                  <linearGradient id="mrrGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.78 0.13 80)" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="oklch(0.78 0.13 80)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.3 0.04 40 / 30%)" />
                <XAxis dataKey="month" tick={{ fill: "oklch(0.7 0.04 70)", fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "oklch(0.7 0.04 70)", fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v: number) => `$${v / 1000}k`} />
                <Tooltip content={<ChartTooltip />} />
                <Area type="monotone" dataKey="mrr" stroke="oklch(0.78 0.13 80)" strokeWidth={2} fill="url(#mrrGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div variants={item} className="glass rounded-xl p-6">
          <div className="eyebrow mb-4">Plan Distribution</div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={planDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {planDistribution.map((entry) => (
                    <Cell key={entry.name} fill={entry.fill} />
                  ))}
                </Pie>
                <Legend
                  verticalAlign="bottom"
                  formatter={(value: string) => <span className="text-xs text-ivory/60">{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Subscriptions Table */}
      <motion.div variants={item} className="mt-8 glass overflow-hidden rounded-xl">
        <div className="border-b border-gold/10 px-6 py-4">
          <div className="eyebrow">Recent Subscriptions</div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gold/10">
                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-ivory/40">Member</th>
                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-ivory/40">Plan</th>
                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-ivory/40">Status</th>
                <th className="hidden px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-ivory/40 md:table-cell">Period</th>
                <th className="px-6 py-4 text-right text-xs font-medium uppercase tracking-wider text-ivory/40">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gold/5">
              {subscriptions.map((sub) => (
                <tr key={sub.id} className="transition hover:bg-gold/5">
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-ivory">{sub.member}</p>
                    <p className="text-xs text-ivory/40">{sub.email}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn("rounded-full px-3 py-1 text-xs font-medium", planColor[sub.plan])}>
                      {sub.plan}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn("rounded-full px-3 py-1 text-xs font-medium capitalize", subStatusColor[sub.status])}>
                      {sub.status.replace("_", " ")}
                    </span>
                  </td>
                  <td className="hidden px-6 py-4 text-sm text-ivory/50 md:table-cell">
                    {new Date(sub.periodStart).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    {" – "}
                    {new Date(sub.periodEnd).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="relative inline-block">
                      <button
                        onClick={() => setOpenMenu(openMenu === sub.id ? null : sub.id)}
                        className="rounded-lg p-1.5 text-ivory/40 transition hover:bg-gold/10 hover:text-ivory"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                      {openMenu === sub.id && (
                        <div className="glass-strong absolute right-0 top-full z-10 mt-1 w-44 rounded-lg py-1 shadow-xl">
                          <button className="flex w-full items-center gap-2 px-4 py-2 text-sm text-ivory/70 hover:bg-gold/10 hover:text-ivory">
                            <Eye className="h-3.5 w-3.5" /> View Details
                          </button>
                          <button className="flex w-full items-center gap-2 px-4 py-2 text-sm text-ivory/70 hover:bg-gold/10 hover:text-ivory">
                            <RefreshCw className="h-3.5 w-3.5" /> Retry Payment
                          </button>
                          <button className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-400/80 hover:bg-red-400/10 hover:text-red-400">
                            <Ban className="h-3.5 w-3.5" /> Cancel
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
}
