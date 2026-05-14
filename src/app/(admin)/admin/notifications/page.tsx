"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Send,
  Mail,
  Smartphone,
  MessageSquare,
  Eye,
  Clock,
  Users,
  CheckCircle2,
} from "lucide-react";

type NotificationType = "email" | "push" | "in-app";

interface Notification {
  id: string;
  title: string;
  type: NotificationType;
  recipients: number;
  sentDate: string;
  openRate: number;
  status: "delivered" | "sending" | "scheduled";
  template: string;
}

const NOTIFICATIONS: Notification[] = [
  { id: "1", title: "Bordeaux Tasting Reminder", type: "email", recipients: 48, sentDate: "2025-05-14T10:30:00", openRate: 72, status: "delivered", template: "Event Reminder" },
  { id: "2", title: "New Collector Tier Benefits", type: "email", recipients: 143, sentDate: "2025-05-13T14:00:00", openRate: 68, status: "delivered", template: "Tier Announcement" },
  { id: "3", title: "Event Starting in 1 Hour", type: "push", recipients: 38, sentDate: "2025-05-12T18:00:00", openRate: 91, status: "delivered", template: "Event Alert" },
  { id: "4", title: "Welcome to Nosey Palate", type: "email", recipients: 12, sentDate: "2025-05-12T09:00:00", openRate: 85, status: "delivered", template: "Welcome Series" },
  { id: "5", title: "Points Earned This Month", type: "in-app", recipients: 1923, sentDate: "2025-05-11T08:00:00", openRate: 45, status: "delivered", template: "Loyalty Update" },
  { id: "6", title: "June Events Preview", type: "email", recipients: 2847, sentDate: "2025-05-10T11:00:00", openRate: 58, status: "delivered", template: "Monthly Newsletter" },
  { id: "7", title: "Subscription Renewal Notice", type: "push", recipients: 320, sentDate: "2025-05-09T16:00:00", openRate: 76, status: "delivered", template: "Billing Alert" },
  { id: "8", title: "Community Spotlight", type: "in-app", recipients: 1923, sentDate: "2025-05-08T12:00:00", openRate: 38, status: "delivered", template: "Community Update" },
];

const TEMPLATES = [
  "Event Reminder",
  "Event Alert",
  "Welcome Series",
  "Tier Announcement",
  "Loyalty Update",
  "Monthly Newsletter",
  "Billing Alert",
  "Community Update",
];

type TabFilter = "all" | NotificationType;
const TABS: { label: string; value: TabFilter; icon: React.ElementType }[] = [
  { label: "All", value: "all", icon: MessageSquare },
  { label: "Email", value: "email", icon: Mail },
  { label: "Push", value: "push", icon: Smartphone },
  { label: "In-App", value: "in-app", icon: MessageSquare },
];

const typeIcon: Record<NotificationType, React.ElementType> = {
  email: Mail,
  push: Smartphone,
  "in-app": MessageSquare,
};

const typeBadge: Record<NotificationType, string> = {
  email: "bg-blue-400/15 text-blue-400",
  push: "bg-purple-400/15 text-purple-400",
  "in-app": "bg-gold/15 text-gold",
};

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function AdminNotificationsPage() {
  const [tab, setTab] = useState<TabFilter>("all");
  const [showCompose, setShowCompose] = useState(false);

  const filtered = useMemo(() => {
    if (tab === "all") return NOTIFICATIONS;
    return NOTIFICATIONS.filter((n) => n.type === tab);
  }, [tab]);

  const totalSent = NOTIFICATIONS.reduce((a, n) => a + n.recipients, 0);
  const avgOpenRate = Math.round(NOTIFICATIONS.reduce((a, n) => a + n.openRate, 0) / NOTIFICATIONS.length);

  return (
    <motion.div variants={container} initial="hidden" animate="show">
      <motion.div variants={item} className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-4xl text-ivory">
            Notification <span className="italic text-gold-soft">Center</span>
          </h1>
          <p className="mt-2 text-sm text-ivory/50">Manage and send notifications to members.</p>
        </div>
        <button
          onClick={() => setShowCompose(!showCompose)}
          className="flex items-center gap-2 rounded-lg bg-gold px-5 py-2.5 text-sm font-medium text-espresso transition hover:bg-gold-soft"
        >
          <Send className="h-4 w-4" />
          Send Notification
        </button>
      </motion.div>

      {/* Compose Panel */}
      {showCompose && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="mb-8 glass rounded-xl p-6"
        >
          <div className="eyebrow mb-4">Compose Notification</div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-ivory/50">Title</label>
              <input
                type="text"
                placeholder="Notification title..."
                className="glass w-full rounded-lg bg-transparent px-4 py-2.5 text-sm text-ivory placeholder:text-ivory/30 focus:outline-none focus:ring-1 focus:ring-gold/40"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-ivory/50">Template</label>
              <select className="glass w-full rounded-lg bg-transparent px-4 py-2.5 text-sm text-ivory focus:outline-none focus:ring-1 focus:ring-gold/40">
                <option value="">Select template...</option>
                {TEMPLATES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-ivory/50">Type</label>
              <div className="flex gap-2">
                {(["email", "push", "in-app"] as NotificationType[]).map((t) => {
                  const Icon = typeIcon[t];
                  return (
                    <button
                      key={t}
                      className="glass flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm capitalize text-ivory/60 transition hover:text-ivory"
                    >
                      <Icon className="h-3.5 w-3.5" />
                      {t}
                    </button>
                  );
                })}
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-ivory/50">Recipients</label>
              <select className="glass w-full rounded-lg bg-transparent px-4 py-2.5 text-sm text-ivory focus:outline-none focus:ring-1 focus:ring-gold/40">
                <option value="all">All Members (2,847)</option>
                <option value="explorer">Explorer Tier (1,850)</option>
                <option value="connoisseur">Connoisseur Tier (890)</option>
                <option value="collector">Collector Tier (240)</option>
              </select>
            </div>
          </div>
          <div className="mt-4">
            <label className="mb-1.5 block text-xs font-medium text-ivory/50">Message</label>
            <textarea
              rows={3}
              placeholder="Write your message..."
              className="glass w-full rounded-lg bg-transparent px-4 py-2.5 text-sm text-ivory placeholder:text-ivory/30 focus:outline-none focus:ring-1 focus:ring-gold/40"
            />
          </div>
          <div className="mt-4 flex justify-end gap-3">
            <button
              onClick={() => setShowCompose(false)}
              className="rounded-lg px-4 py-2 text-sm text-ivory/50 transition hover:text-ivory"
            >
              Cancel
            </button>
            <button className="flex items-center gap-2 rounded-lg bg-gold px-5 py-2.5 text-sm font-medium text-espresso transition hover:bg-gold-soft">
              <Send className="h-3.5 w-3.5" />
              Send Now
            </button>
          </div>
        </motion.div>
      )}

      {/* Quick Stats */}
      <motion.div variants={item} className="mb-8 grid gap-4 sm:grid-cols-3">
        <div className="glass rounded-xl p-5">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-gold/10 p-2.5"><Send className="h-4 w-4 text-gold" /></div>
            <div>
              <p className="text-xs text-ivory/40">Total Sent</p>
              <p className="font-display text-xl text-ivory">{totalSent.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="glass rounded-xl p-5">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-gold/10 p-2.5"><Eye className="h-4 w-4 text-gold" /></div>
            <div>
              <p className="text-xs text-ivory/40">Avg Open Rate</p>
              <p className="font-display text-xl text-ivory">{avgOpenRate}%</p>
            </div>
          </div>
        </div>
        <div className="glass rounded-xl p-5">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-gold/10 p-2.5"><CheckCircle2 className="h-4 w-4 text-gold" /></div>
            <div>
              <p className="text-xs text-ivory/40">Delivery Rate</p>
              <p className="font-display text-xl text-ivory">99.2%</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <motion.div variants={item} className="mb-6 flex gap-1 rounded-lg border border-gold/10 p-1 w-fit">
        {TABS.map((t) => (
          <button
            key={t.value}
            onClick={() => setTab(t.value)}
            className={cn(
              "flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition",
              tab === t.value ? "bg-gold/15 text-gold" : "text-ivory/50 hover:text-ivory/70"
            )}
          >
            <t.icon className="h-3.5 w-3.5" />
            {t.label}
          </button>
        ))}
      </motion.div>

      {/* Notification List */}
      <motion.div variants={item} className="glass overflow-hidden rounded-xl">
        <div className="divide-y divide-gold/5">
          {filtered.map((notif) => {
            const Icon = typeIcon[notif.type];
            return (
              <div key={notif.id} className="flex items-center gap-4 px-6 py-4 transition hover:bg-gold/5">
                <div className={cn("rounded-lg p-2.5", typeBadge[notif.type])}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="truncate text-sm font-medium text-ivory">{notif.title}</p>
                  <div className="mt-0.5 flex items-center gap-3 text-xs text-ivory/40">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {new Date(notif.sentDate).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" })}
                    </span>
                    <span className="capitalize">{notif.template}</span>
                  </div>
                </div>
                <div className="hidden items-center gap-6 sm:flex">
                  <div className="text-right">
                    <p className="flex items-center gap-1 text-xs text-ivory/40">
                      <Users className="h-3 w-3" />
                      {notif.recipients.toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-ivory">{notif.openRate}%</p>
                    <p className="text-xs text-ivory/40">open rate</p>
                  </div>
                </div>
                <span className="rounded-full bg-emerald-400/15 px-2.5 py-0.5 text-xs font-medium capitalize text-emerald-400">
                  {notif.status}
                </span>
              </div>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
}
