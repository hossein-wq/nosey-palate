"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Wine, Heart, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { LUXURY_EASE } from "@/lib/motion";
import { MemberAvatar } from "@/components/shared/member-avatar";
import { MembershipBadge } from "@/components/shared/membership-badge";
import type { LoyaltyTier } from "@/types/membership";

export interface TastingNoteAuthor {
  name: string;
  avatar?: string;
  tier: string;
  city?: string;
}

export interface TastingNoteData {
  id: string;
  user: TastingNoteAuthor;
  wine_name: string;
  vintage: number;
  rating: number;
  nose?: string;
  palate?: string;
  finish?: string;
  notes?: string;
  created_at: string;
  reactions?: { cheers: number; love: number; insightful: number };
}

interface TastingNoteCardProps {
  note: TastingNoteData;
  showAuthor?: boolean;
  index?: number;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  className?: string;
}

function RatingGlasses({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Wine
          key={i}
          className={cn(
            "h-3.5 w-3.5",
            i < rating ? "fill-gold/80 text-gold" : "text-ivory/20",
          )}
        />
      ))}
    </div>
  );
}

function ReactionButton({
  icon: Icon,
  count,
  label,
}: {
  icon: typeof Heart;
  count: number;
  label: string;
}) {
  const [active, setActive] = useState(false);
  return (
    <button
      onClick={() => setActive(!active)}
      className={cn(
        "flex items-center gap-1.5 rounded-full px-3 py-1 text-xs transition-all duration-300",
        active
          ? "bg-gold/15 text-gold"
          : "bg-ivory/5 text-ivory/40 hover:bg-ivory/10 hover:text-ivory/60",
      )}
      aria-label={label}
    >
      <Icon className="h-3.5 w-3.5" />
      <span>{active ? count + 1 : count}</span>
    </button>
  );
}

export function TastingNoteCard({
  note,
  showAuthor = true,
  index = 0,
  onEdit,
  onDelete,
  className,
}: TastingNoteCardProps) {
  const reactions = note.reactions ?? { cheers: 3, love: 1, insightful: 2 };
  const tierKey = note.user.tier.toLowerCase().replace(" ", "_") as LoyaltyTier;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.08, ease: LUXURY_EASE }}
      className={cn("glass rounded-md p-5 md:p-6", className)}
    >
      {showAuthor && (
        <div className="mb-4 flex items-center gap-3">
          <MemberAvatar
            src={note.user.avatar}
            name={note.user.name}
            size="sm"
            tier={tierKey}
          />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="truncate text-sm font-medium text-ivory">
                {note.user.name}
              </span>
              <MembershipBadge tier={tierKey} />
            </div>
            {note.user.city && (
              <p className="text-xs text-ivory/40">{note.user.city}</p>
            )}
          </div>
          <time className="shrink-0 text-xs text-ivory/30">
            {new Date(note.created_at).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}
          </time>
        </div>
      )}

      <div className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-display text-xl leading-tight text-ivory">
              {note.wine_name}
            </h3>
            <span className="text-xs text-gold/70">{note.vintage}</span>
          </div>
          <RatingGlasses rating={note.rating} />
        </div>

        <div className="grid gap-2 text-sm">
          {note.nose && (
            <div className="flex gap-2">
              <span className="shrink-0 text-xs uppercase tracking-wider text-gold/60">
                Nose
              </span>
              <span className="text-ivory/60">{note.nose}</span>
            </div>
          )}
          {note.palate && (
            <div className="flex gap-2">
              <span className="shrink-0 text-xs uppercase tracking-wider text-gold/60">
                Palate
              </span>
              <span className="text-ivory/60">{note.palate}</span>
            </div>
          )}
          {note.finish && (
            <div className="flex gap-2">
              <span className="shrink-0 text-xs uppercase tracking-wider text-gold/60">
                Finish
              </span>
              <span className="text-ivory/60">{note.finish}</span>
            </div>
          )}
        </div>

        {note.notes && (
          <p className="border-l-2 border-gold/20 pl-3 text-sm italic text-ivory/50">
            {note.notes}
          </p>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex gap-2">
          <ReactionButton icon={Wine} count={reactions.cheers} label="Cheers" />
          <ReactionButton icon={Heart} count={reactions.love} label="Love" />
          <ReactionButton
            icon={Sparkles}
            count={reactions.insightful}
            label="Insightful"
          />
        </div>

        {(onEdit || onDelete) && (
          <div className="flex gap-2">
            {onEdit && (
              <button
                onClick={() => onEdit(note.id)}
                className="text-xs text-ivory/30 transition hover:text-gold"
              >
                Edit
              </button>
            )}
            {onDelete && (
              <button
                onClick={() => onDelete(note.id)}
                className="text-xs text-ivory/30 transition hover:text-red-400"
              >
                Delete
              </button>
            )}
          </div>
        )}
      </div>
    </motion.article>
  );
}
