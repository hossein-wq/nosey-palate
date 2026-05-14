"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Star,
  Trophy,
  Gift,
  TrendingUp,
  Award,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const tierDistribution = [
  { name: "Explorer", value: 1850, fill: "oklch(0.78 0.13 80)" },
  { name: "Connoisseur", value: 890, fill: "oklch(0.55 0.18 30)" },
  { name: "Collector", value: 240, fill: "oklch(0.86 0.09 85)" },
];

const pointsDistribution = [
  { range: "0–500", members: 620 },
  { range: "500–1k", members: 480 },
  { range: "1k–2.5k", members: 890 },
  { range: "2.5k–5k", members: 540 },
  { range: "5k–10k", members: 230 },
  { range: "10k+", members: 87 },
];

const pointsStats = [
  { label: "Total Points Issued", value: "4.2M", icon: Star },
  { label: "Points Redeemed", value: "1.8M", icon: Gift },
  { label: "Avg Points/Member", value: "1,475", icon: TrendingUp },
  { label: "Redemption Rate", value: "42.8%", icon: Trophy },
];

interface TopEarner {
  rank: number;
  name: string;
  avatar: string;
  tier: string;
  points: number;
  eventsAttended: number;
}

const topEarners: TopEarner[] = [
  { rank: 1, name: "James Chen", avatar: "JC", tier: "Collector", points: 12450, eventsAttended: 28 },
  { rank: 2, name: "Elena Vasquez", avatar: "EV", tier: "Collector", points: 11200, eventsAttended: 25 },
  { rank: 3, name: "Sophia Laurent", avatar: "SL", tier: "Connoisseur", points: 8900, eventsAttended: 22 },
  { rank: 4, name: "Isabelle Moreau", avatar: "IM", tier: "Connoisseur", points: 7650, eventsAttended: 19 },
  { rank: 5, name: "Marcus Reed", avatar: "MR", tier: "Explorer", points: 5200, eventsAttended: 14 },
  { rank: 6, name: "Amara Osei", avatar: "AO", tier: "Connoisseur", points: 4800, eventsAttended: 13 },
  { rank: 7, name: "Rafael Dumont", avatar: "RD", tier: "Explorer", points: 3400, eventsAttended: 9 },
  { rank: 8, name: "Oliver Blackwood", avatar: "OB", tier: "Explorer", points: 2100, eventsAttended: 6 },
];

const tierColor: Record<string, string> = {
  Explorer: "bg-gold/15 text-gold",
  Connoisseur: "bg-ember/15 text-ember",
  Collector: "bg-champagne/20 text-champagne",
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
          {entry.value.toLocaleString()} members
        </p>
      ))}
    </div>
  );
}

export default function AdminLoyaltyPage() {
  const [awardMember, setAwardMember] = useState("");
  const [awardPoints, setAwardPoints] = useState("");
  const [awardReason, setAwardReason] = useState("");

  return (
    <motion.div variants={container} initial="hidden" animate="show">
      <motion.div variants={item} className="mb-10">
        <h1 className="font-display text-4xl text-ivory">
          Loyalty <span className="italic text-gold-soft">Program</span>
        </h1>
        <p className="mt-2 text-sm text-ivory/50">Manage tiers, points, and member rewards.</p>
      </motion.div>

      {/* Points Stats */}
      <motion.div variants={item} className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {pointsStats.map((stat) => (
          <div key={stat.label} className="glass rounded-xl p-6">
            <div className="mb-3 flex items-center justify-between">
              <div className="eyebrow">{stat.label}</div>
              <div className="rounded-lg bg-gold/10 p-2">
                <stat.icon className="h-4 w-4 text-gold" />
              </div>
            </div>
            <p className="font-display text-3xl text-ivory">{stat.value}</p>
          </div>
        ))}
      </motion.div>

      {/* Charts Row */}
      <div className="mt-8 grid gap-6 xl:grid-cols-2">
        <motion.div variants={item} className="glass rounded-xl p-6">
          <div className="eyebrow mb-6">Tier Distribution</div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={tierDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {tierDistribution.map((entry) => (
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
          <div className="mt-4 grid grid-cols-3 gap-4 border-t border-gold/10 pt-4">
            {tierDistribution.map((tier) => (
              <div key={tier.name} className="text-center">
                <p className="text-xs text-ivory/40">{tier.name}</p>
                <p className="font-display text-lg text-ivory">{tier.value.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div variants={item} className="glass rounded-xl p-6">
          <div className="eyebrow mb-6">Points Distribution</div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={pointsDistribution}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.3 0.04 40 / 30%)" />
                <XAxis dataKey="range" tick={{ fill: "oklch(0.7 0.04 70)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "oklch(0.7 0.04 70)", fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip content={<ChartTooltip />} />
                <Bar dataKey="members" fill="oklch(0.78 0.13 80)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Top Earners + Award Form */}
      <div className="mt-8 grid gap-6 xl:grid-cols-3">
        <motion.div variants={item} className="glass overflow-hidden rounded-xl xl:col-span-2">
          <div className="border-b border-gold/10 px-6 py-4">
            <div className="eyebrow">Top Earning Members</div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gold/10">
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-ivory/40">Rank</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-ivory/40">Member</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-ivory/40">Tier</th>
                  <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-ivory/40">Points</th>
                  <th className="hidden px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-ivory/40 md:table-cell">Events</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gold/5">
                {topEarners.map((earner) => (
                  <tr key={earner.rank} className="transition hover:bg-gold/5">
                    <td className="px-6 py-3">
                      <span className={cn(
                        "inline-flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold",
                        earner.rank <= 3 ? "bg-gold/20 text-gold" : "text-ivory/30"
                      )}>
                        {earner.rank}
                      </span>
                    </td>
                    <td className="px-6 py-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold/15 text-xs font-medium text-gold">
                          {earner.avatar}
                        </div>
                        <p className="text-sm font-medium text-ivory">{earner.name}</p>
                      </div>
                    </td>
                    <td className="px-6 py-3">
                      <span className={cn("rounded-full px-3 py-1 text-xs font-medium", tierColor[earner.tier])}>
                        {earner.tier}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-right">
                      <span className="text-sm font-medium text-gold">{earner.points.toLocaleString()}</span>
                    </td>
                    <td className="hidden px-6 py-3 text-right text-sm text-ivory/50 md:table-cell">
                      {earner.eventsAttended}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        <motion.div variants={item} className="glass rounded-xl p-6">
          <div className="eyebrow mb-6 flex items-center gap-2">
            <Award className="h-4 w-4 text-gold" />
            Award Points
          </div>
          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-ivory/50">Member</label>
              <select
                value={awardMember}
                onChange={(e) => setAwardMember(e.target.value)}
                className="glass w-full rounded-lg bg-transparent px-4 py-2.5 text-sm text-ivory focus:outline-none focus:ring-1 focus:ring-gold/40"
              >
                <option value="">Select member...</option>
                {topEarners.map((e) => (
                  <option key={e.rank} value={e.name}>{e.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-ivory/50">Points</label>
              <input
                type="number"
                placeholder="e.g. 500"
                value={awardPoints}
                onChange={(e) => setAwardPoints(e.target.value)}
                className="glass w-full rounded-lg bg-transparent px-4 py-2.5 text-sm text-ivory placeholder:text-ivory/30 focus:outline-none focus:ring-1 focus:ring-gold/40"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-ivory/50">Reason</label>
              <textarea
                rows={3}
                placeholder="Reason for awarding..."
                value={awardReason}
                onChange={(e) => setAwardReason(e.target.value)}
                className="glass w-full rounded-lg bg-transparent px-4 py-2.5 text-sm text-ivory placeholder:text-ivory/30 focus:outline-none focus:ring-1 focus:ring-gold/40"
              />
            </div>
            <button
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-gold py-2.5 text-sm font-medium text-espresso transition hover:bg-gold-soft"
            >
              <Gift className="h-4 w-4" />
              Award Points
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
