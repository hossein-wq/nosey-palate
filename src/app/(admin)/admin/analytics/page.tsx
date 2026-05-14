"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  TrendingUp,
  Users,
  BarChart3,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  FunnelChart,
  Funnel,
  LabelList,
  Cell,
} from "recharts";

const kpis = [
  { label: "Conversion Rate", value: "14.2%", change: "+1.8%", up: true, icon: TrendingUp },
  { label: "Avg Event Attendance", value: "87%", change: "+5%", up: true, icon: Users },
  { label: "Churn Rate", value: "2.1%", change: "-0.4%", up: false, icon: BarChart3 },
  { label: "ARPU", value: "$52.40", change: "+$3.20", up: true, icon: DollarSign },
];

const funnelData = [
  { name: "Site Visitors", value: 12400, fill: "oklch(0.4 0.04 40)" },
  { name: "Sign Up", value: 3200, fill: "oklch(0.55 0.18 30)" },
  { name: "Subscribe", value: 1923, fill: "oklch(0.78 0.13 80)" },
  { name: "Attend Event", value: 1240, fill: "oklch(0.86 0.09 85)" },
  { name: "Retain 6mo+", value: 980, fill: "oklch(0.9 0.06 85)" },
];

const cohortData = [
  { cohort: "Jan '25", month0: "100%", month1: "92%", month2: "88%", month3: "85%", month4: "82%" },
  { cohort: "Feb '25", month0: "100%", month1: "94%", month2: "89%", month3: "86%", month4: "—" },
  { cohort: "Mar '25", month0: "100%", month1: "91%", month2: "87%", month3: "—", month4: "—" },
  { cohort: "Apr '25", month0: "100%", month1: "93%", month2: "—", month3: "—", month4: "—" },
  { cohort: "May '25", month0: "100%", month1: "—", month2: "—", month3: "—", month4: "—" },
];

const topEvents = [
  { name: "Bordeaux Grand Tasting", attendance: 48, capacity: 60, rate: "80%" },
  { name: "Sommelier Masterclass", attendance: 38, capacity: 40, rate: "95%" },
  { name: "Spring Garden Social", attendance: 65, capacity: 80, rate: "81%" },
  { name: "Private Cellar Dinner", attendance: 24, capacity: 24, rate: "100%" },
  { name: "Natural Wine Workshop", attendance: 12, capacity: 30, rate: "40%" },
];

const engagementData = [
  { metric: "Event RSVPs", current: 348, previous: 290 },
  { metric: "Profile Views", current: 1240, previous: 980 },
  { metric: "Community Posts", current: 89, previous: 72 },
  { metric: "AI Assistant Queries", current: 456, previous: 320 },
  { metric: "Referrals", current: 67, previous: 48 },
];

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
          {entry.value.toLocaleString()}
        </p>
      ))}
    </div>
  );
}

function cohortCellIntensity(value: string): string {
  if (value === "—") return "text-ivory/20";
  const num = parseInt(value);
  if (num >= 95) return "bg-gold/20 text-gold";
  if (num >= 90) return "bg-gold/15 text-gold/80";
  if (num >= 85) return "bg-gold/10 text-ivory/70";
  return "bg-gold/5 text-ivory/50";
}

export default function AdminAnalyticsPage() {
  return (
    <motion.div variants={container} initial="hidden" animate="show">
      <motion.div variants={item} className="mb-10">
        <h1 className="font-display text-4xl text-ivory">
          Analytics <span className="italic text-gold-soft">Dashboard</span>
        </h1>
        <p className="mt-2 text-sm text-ivory/50">Deep dive into member behavior and platform performance.</p>
      </motion.div>

      {/* KPIs */}
      <motion.div variants={item} className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="glass rounded-xl p-6">
            <div className="mb-3 flex items-center justify-between">
              <div className="eyebrow">{kpi.label}</div>
              <div className="rounded-lg bg-gold/10 p-2">
                <kpi.icon className="h-4 w-4 text-gold" />
              </div>
            </div>
            <p className="font-display text-3xl text-ivory">{kpi.value}</p>
            <p className={cn("mt-1 flex items-center gap-1 text-xs", kpi.up ? "text-emerald-400" : "text-emerald-400")}>
              {kpi.up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
              {kpi.change} from last month
            </p>
          </div>
        ))}
      </motion.div>

      {/* Funnel + Top Events */}
      <div className="mt-8 grid gap-6 xl:grid-cols-2">
        <motion.div variants={item} className="glass rounded-xl p-6">
          <div className="eyebrow mb-6">Conversion Funnel</div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <FunnelChart>
                <Tooltip content={<ChartTooltip />} />
                <Funnel dataKey="value" data={funnelData} isAnimationActive>
                  <LabelList
                    position="right"
                    fill="oklch(0.96 0.02 80)"
                    stroke="none"
                    fontSize={12}
                    dataKey="name"
                  />
                  {funnelData.map((entry) => (
                    <Cell key={entry.name} fill={entry.fill} />
                  ))}
                </Funnel>
              </FunnelChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div variants={item} className="glass rounded-xl p-6">
          <div className="eyebrow mb-6">Top Events by Attendance</div>
          <div className="space-y-4">
            {topEvents.map((event, i) => (
              <div key={event.name} className="flex items-center gap-4">
                <span className="w-5 text-right text-xs font-medium text-ivory/30">{i + 1}</span>
                <div className="flex-1">
                  <div className="mb-1 flex items-center justify-between">
                    <p className="text-sm text-ivory">{event.name}</p>
                    <span className="text-xs text-ivory/50">{event.rate}</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-ivory/5">
                    <div
                      className="h-full rounded-full bg-gold/60"
                      style={{ width: `${(event.attendance / event.capacity) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Cohort Table */}
      <motion.div variants={item} className="mt-8 glass overflow-hidden rounded-xl p-6">
        <div className="eyebrow mb-6">Retention Cohorts</div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="pb-3 text-left text-xs font-medium uppercase tracking-wider text-ivory/40">Cohort</th>
                <th className="pb-3 text-center text-xs font-medium uppercase tracking-wider text-ivory/40">Month 0</th>
                <th className="pb-3 text-center text-xs font-medium uppercase tracking-wider text-ivory/40">Month 1</th>
                <th className="pb-3 text-center text-xs font-medium uppercase tracking-wider text-ivory/40">Month 2</th>
                <th className="pb-3 text-center text-xs font-medium uppercase tracking-wider text-ivory/40">Month 3</th>
                <th className="pb-3 text-center text-xs font-medium uppercase tracking-wider text-ivory/40">Month 4</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gold/5">
              {cohortData.map((row) => (
                <tr key={row.cohort}>
                  <td className="py-3 text-sm font-medium text-ivory">{row.cohort}</td>
                  {[row.month0, row.month1, row.month2, row.month3, row.month4].map((val, i) => (
                    <td key={i} className="py-3 text-center">
                      <span className={cn("inline-block rounded-md px-3 py-1 text-xs font-medium", cohortCellIntensity(val))}>
                        {val}
                      </span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Member Engagement */}
      <motion.div variants={item} className="mt-8 glass rounded-xl p-6">
        <div className="eyebrow mb-6">Member Engagement</div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={engagementData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.3 0.04 40 / 30%)" horizontal={false} />
              <XAxis type="number" tick={{ fill: "oklch(0.7 0.04 70)", fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="metric" tick={{ fill: "oklch(0.7 0.04 70)", fontSize: 11 }} axisLine={false} tickLine={false} width={130} />
              <Tooltip content={<ChartTooltip />} />
              <Bar dataKey="previous" name="Last Month" fill="oklch(0.3 0.04 40)" radius={[0, 4, 4, 0]} />
              <Bar dataKey="current" name="This Month" fill="oklch(0.78 0.13 80)" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </motion.div>
  );
}
