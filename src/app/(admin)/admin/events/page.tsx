"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  Plus,
  MoreHorizontal,
  Pencil,
  Globe,
  GlobeLock,
  Copy,
  Trash2,
  CalendarDays,
  Users,
} from "lucide-react";

type EventStatus = "published" | "draft" | "past";
type EventType = "Tasting" | "Dinner" | "Workshop" | "Tour" | "Masterclass" | "Social";

interface AdminEvent {
  id: string;
  title: string;
  type: EventType;
  date: string;
  capacity: number;
  rsvps: number;
  status: EventStatus;
  cover: string;
}

const EVENTS: AdminEvent[] = [
  { id: "1", title: "Bordeaux Grand Tasting", type: "Tasting", date: "2025-06-15", capacity: 60, rsvps: 48, status: "published", cover: "/images/events/bordeaux.jpg" },
  { id: "2", title: "Private Cellar Dinner", type: "Dinner", date: "2025-06-22", capacity: 24, rsvps: 24, status: "published", cover: "/images/events/dinner.jpg" },
  { id: "3", title: "Natural Wine Workshop", type: "Workshop", date: "2025-07-05", capacity: 30, rsvps: 12, status: "draft", cover: "/images/events/workshop.jpg" },
  { id: "4", title: "Champagne Region Tour", type: "Tour", date: "2025-07-18", capacity: 16, rsvps: 0, status: "draft", cover: "/images/events/tour.jpg" },
  { id: "5", title: "Sommelier Masterclass", type: "Masterclass", date: "2025-05-01", capacity: 40, rsvps: 38, status: "past", cover: "/images/events/masterclass.jpg" },
  { id: "6", title: "Spring Garden Social", type: "Social", date: "2025-04-20", capacity: 80, rsvps: 65, status: "past", cover: "/images/events/social.jpg" },
];

const STATUS_TABS: Array<EventStatus | "all"> = ["all", "published", "draft", "past"];

const statusBadge: Record<EventStatus, string> = {
  published: "bg-emerald-400/15 text-emerald-400",
  draft: "bg-amber-400/15 text-amber-400",
  past: "bg-ivory/10 text-ivory/40",
};

export default function AdminEventsPage() {
  const [tab, setTab] = useState<EventStatus | "all">("all");
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (tab === "all") return EVENTS;
    return EVENTS.filter((e) => e.status === tab);
  }, [tab]);

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-4xl text-ivory">
            Event <span className="italic text-gold-soft">Management</span>
          </h1>
          <p className="mt-2 text-sm text-ivory/50">{EVENTS.length} events total</p>
        </div>
        <Link
          href="/admin/events/new"
          className="flex items-center gap-2 rounded-lg bg-gold px-5 py-2.5 text-sm font-medium text-espresso transition hover:bg-gold-soft"
        >
          <Plus className="h-4 w-4" />
          Create Event
        </Link>
      </div>

      {/* Filter Tabs */}
      <div className="mb-6 flex gap-1 rounded-lg border border-gold/10 p-1 w-fit">
        {STATUS_TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              "rounded-md px-4 py-2 text-sm font-medium capitalize transition",
              tab === t ? "bg-gold/15 text-gold" : "text-ivory/50 hover:text-ivory/70"
            )}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="glass overflow-hidden rounded-xl">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gold/10">
                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-ivory/40">Event</th>
                <th className="hidden px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-ivory/40 md:table-cell">Type</th>
                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-ivory/40">Date</th>
                <th className="hidden px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-ivory/40 lg:table-cell">Capacity</th>
                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-ivory/40">Status</th>
                <th className="px-6 py-4 text-right text-xs font-medium uppercase tracking-wider text-ivory/40">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gold/5">
              {filtered.map((event) => (
                <tr key={event.id} className="transition hover:bg-gold/5">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-14 shrink-0 overflow-hidden rounded-md bg-espresso">
                        <div className="flex h-full w-full items-center justify-center">
                          <CalendarDays className="h-4 w-4 text-gold/40" />
                        </div>
                      </div>
                      <p className="text-sm font-medium text-ivory">{event.title}</p>
                    </div>
                  </td>
                  <td className="hidden px-6 py-4 text-sm text-ivory/50 md:table-cell">{event.type}</td>
                  <td className="px-6 py-4 text-sm text-ivory/50">
                    {new Date(event.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </td>
                  <td className="hidden px-6 py-4 lg:table-cell">
                    <div className="flex items-center gap-2 text-sm text-ivory/50">
                      <Users className="h-3.5 w-3.5" />
                      {event.rsvps}/{event.capacity}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn("rounded-full px-3 py-1 text-xs font-medium capitalize", statusBadge[event.status])}>
                      {event.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="relative inline-block">
                      <button
                        onClick={() => setOpenMenu(openMenu === event.id ? null : event.id)}
                        className="rounded-lg p-1.5 text-ivory/40 transition hover:bg-gold/10 hover:text-ivory"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                      {openMenu === event.id && (
                        <div className="glass-strong absolute right-0 top-full z-10 mt-1 w-48 rounded-lg py-1 shadow-xl">
                          <button className="flex w-full items-center gap-2 px-4 py-2 text-sm text-ivory/70 hover:bg-gold/10 hover:text-ivory">
                            <Pencil className="h-3.5 w-3.5" /> Edit
                          </button>
                          <button className="flex w-full items-center gap-2 px-4 py-2 text-sm text-ivory/70 hover:bg-gold/10 hover:text-ivory">
                            {event.status === "published" ? (
                              <><GlobeLock className="h-3.5 w-3.5" /> Unpublish</>
                            ) : (
                              <><Globe className="h-3.5 w-3.5" /> Publish</>
                            )}
                          </button>
                          <button className="flex w-full items-center gap-2 px-4 py-2 text-sm text-ivory/70 hover:bg-gold/10 hover:text-ivory">
                            <Copy className="h-3.5 w-3.5" /> Duplicate
                          </button>
                          <button className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-400/80 hover:bg-red-400/10 hover:text-red-400">
                            <Trash2 className="h-3.5 w-3.5" /> Delete
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
      </div>
    </motion.div>
  );
}
