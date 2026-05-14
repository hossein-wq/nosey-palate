"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { LUXURY_EASE } from "@/lib/motion";
import type { EventSummary, EventWithRSVP, RSVPStatus } from "@/types/events";

const TYPE_STYLES: Record<string, { bg: string; text: string; label: string }> = {
  tasting: { bg: "bg-gold/20", text: "text-gold", label: "Tasting" },
  dinner: { bg: "bg-burgundy/40", text: "text-champagne", label: "Dinner" },
  journey: { bg: "bg-ember/25", text: "text-champagne", label: "Journey" },
  experience: { bg: "bg-champagne/15", text: "text-champagne", label: "Experience" },
};

const RSVP_BADGE: Record<RSVPStatus, { bg: string; text: string; label: string }> = {
  confirmed: { bg: "bg-green-500/20", text: "text-green-400", label: "Confirmed" },
  waitlisted: { bg: "bg-amber-500/20", text: "text-amber-400", label: "Waitlisted" },
  cancelled: { bg: "bg-red-500/20", text: "text-red-400", label: "Cancelled" },
  checked_in: { bg: "bg-green-500/20", text: "text-green-400", label: "Checked In" },
  no_show: { bg: "bg-red-500/20", text: "text-red-400", label: "No Show" },
};

function formatEventDate(dateStr: string) {
  const d = new Date(dateStr);
  return {
    month: d.toLocaleDateString("en-US", { month: "short" }).toUpperCase(),
    day: d.getDate().toString(),
    full: d.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    }),
    time: d.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    }),
  };
}

interface EventCardProps {
  event: EventSummary | EventWithRSVP;
  variant?: "marketing" | "member";
  showRSVP?: boolean;
  index?: number;
}

export function EventCard({ event, variant = "marketing", showRSVP = false, index = 0 }: EventCardProps) {
  const date = formatEventDate(event.starts_at);
  const typeStyle = TYPE_STYLES[event.event_type] ?? TYPE_STYLES.tasting;
  const spotsLeft = event.capacity != null && event.rsvp_count != null
    ? event.capacity - event.rsvp_count
    : null;
  const rsvpStatus = "rsvp_status" in event ? (event as EventWithRSVP).rsvp_status : null;

  const href = variant === "marketing"
    ? `/events/${event.slug}`
    : `/dashboard/events/${event.id}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: LUXURY_EASE }}
    >
      <Link href={href} className="group block">
        <div className="relative aspect-3/4 overflow-hidden rounded-lg">
          {/* Cover image */}
          <Image
            src={event.cover_image ?? "/images/event1.jpg"}
            alt={event.title}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-transparent" />

          {/* Top badges */}
          <div className="absolute left-3 right-3 top-3 flex items-start justify-between">
            <span className={cn(
              "rounded-full px-3 py-1 text-[10px] font-medium uppercase tracking-widest backdrop-blur-sm",
              typeStyle.bg, typeStyle.text
            )}>
              {typeStyle.label}
            </span>

            {event.is_featured && (
              <span className="rounded-full bg-gold/20 px-3 py-1 text-[10px] font-medium uppercase tracking-widest text-gold backdrop-blur-sm">
                Featured
              </span>
            )}
          </div>

          {/* Date badge */}
          <div className="absolute right-3 top-12 flex flex-col items-center rounded-md bg-black/60 px-3 py-2 backdrop-blur-sm">
            <span className="text-[10px] font-medium uppercase tracking-wider text-gold">{date.month}</span>
            <span className="font-display text-2xl leading-none text-ivory">{date.day}</span>
          </div>

          {/* RSVP status badge */}
          {showRSVP && rsvpStatus && RSVP_BADGE[rsvpStatus] && (
            <div className="absolute left-3 top-12">
              <span className={cn(
                "rounded-full px-3 py-1 text-[10px] font-medium uppercase tracking-widest backdrop-blur-sm",
                RSVP_BADGE[rsvpStatus].bg, RSVP_BADGE[rsvpStatus].text,
              )}>
                {RSVP_BADGE[rsvpStatus].label}
              </span>
            </div>
          )}

          {/* Bottom content */}
          <div className="absolute inset-x-0 bottom-0 p-4">
            <h3 className="font-display text-xl leading-tight text-ivory transition-colors group-hover:text-gold-soft md:text-2xl">
              {event.title}
            </h3>

            <div className="mt-3 flex flex-col gap-1.5">
              {event.venue_name && (
                <div className="flex items-center gap-2 text-xs text-ivory/60">
                  <MapPin className="h-3.5 w-3.5 shrink-0 text-gold/60" />
                  <span className="truncate">{event.venue_name}, {event.venue_city}</span>
                </div>
              )}
              <div className="flex items-center gap-2 text-xs text-ivory/60">
                <Calendar className="h-3.5 w-3.5 shrink-0 text-gold/60" />
                <span>{date.full} &middot; {date.time}</span>
              </div>
            </div>

            {/* Spots remaining */}
            {spotsLeft != null && (
              <div className="mt-3 flex items-center gap-2">
                <Users className="h-3.5 w-3.5 text-gold/60" />
                <div className="flex-1">
                  <div className="h-1 overflow-hidden rounded-full bg-ivory/10">
                    <div
                      className="h-full rounded-full bg-gold/60 transition-all duration-500"
                      style={{ width: `${Math.min(100, ((event.rsvp_count ?? 0) / (event.capacity ?? 1)) * 100)}%` }}
                    />
                  </div>
                </div>
                <span className={cn(
                  "text-[11px] font-medium",
                  spotsLeft <= 3 ? "text-ember" : "text-ivory/50"
                )}>
                  {spotsLeft <= 0 ? "Waitlist" : `${spotsLeft} spots left`}
                </span>
              </div>
            )}
          </div>

          {/* Hover glow */}
          <div className="pointer-events-none absolute inset-0 rounded-lg ring-1 ring-inset ring-gold/0 transition-all duration-500 group-hover:ring-gold/25" />
        </div>
      </Link>
    </motion.div>
  );
}
