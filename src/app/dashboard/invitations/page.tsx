"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Clock, Check, X, Plus, Copy } from "lucide-react";
import { toast } from "sonner";
import { LUXURY_EASE } from "@/lib/motion";
import { Reveal, GoldHairline } from "@/components/shared/primitives";

interface Invitation {
  id: string;
  name: string;
  email: string;
  event: string | null;
  status: "pending" | "accepted" | "expired";
  sent_at: string;
}

const DEMO_INVITATIONS: Invitation[] = [
  { id: "1", name: "Marcus L.", email: "marcus@example.com", event: "Burgundy with Friends", status: "accepted", sent_at: "2026-05-08" },
  { id: "2", name: "Elena V.", email: "elena@example.com", event: "Sommelier's Table", status: "pending", sent_at: "2026-05-12" },
  { id: "3", name: "Thomas R.", email: "thomas@example.com", event: null, status: "expired", sent_at: "2026-04-20" },
];

const STATUS_CONFIG = {
  pending: { icon: Clock, color: "text-gold", bg: "bg-gold/10", label: "Pending" },
  accepted: { icon: Check, color: "text-emerald-400", bg: "bg-emerald-400/10", label: "Accepted" },
  expired: { icon: X, color: "text-ivory/40", bg: "bg-ivory/5", label: "Expired" },
} as const;

export default function InvitationsPage() {
  const [invitations] = useState<Invitation[]>(DEMO_INVITATIONS);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  function handleSendInvite(e: React.FormEvent) {
    e.preventDefault();
    toast.success(`Invitation sent to ${name}`);
    setName("");
    setEmail("");
    setShowForm(false);
  }

  function handleCopyLink(id: string) {
    navigator.clipboard.writeText(`${window.location.origin}/invite/${id}`);
    toast.success("Invitation link copied");
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-12 md:px-10">
      <div className="flex items-start justify-between">
        <Reveal>
          <span className="eyebrow inline-flex items-center gap-3">
            <span className="h-px w-8 bg-gold/60" />
            Invitations
          </span>
          <h1 className="mt-4 font-display text-4xl text-ivory">
            Guest <span className="italic text-gold-soft">Invitations</span>
          </h1>
          <p className="mt-3 text-sm text-ivory/50">
            Invite friends to join you at exclusive events or become members.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <button
            onClick={() => setShowForm(!showForm)}
            className="mt-4 flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-medium text-espresso transition hover:bg-gold-soft"
          >
            <Plus className="h-4 w-4" />
            Invite
          </button>
        </Reveal>
      </div>

      {/* Invite Form */}
      <AnimatePresence>
        {showForm && (
          <motion.form
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: LUXURY_EASE }}
            onSubmit={handleSendInvite}
            className="mt-8 overflow-hidden"
          >
            <div className="glass-strong rounded-xl p-6">
              <h3 className="font-display text-lg text-ivory">Send an Invitation</h3>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs text-ivory/50 mb-1.5">Name</label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Their name"
                    required
                    className="w-full rounded-lg border border-gold/15 bg-espresso/30 px-4 py-3 text-sm text-ivory placeholder:text-ivory/30 focus:border-gold/40 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs text-ivory/50 mb-1.5">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="their@email.com"
                    required
                    className="w-full rounded-lg border border-gold/15 bg-espresso/30 px-4 py-3 text-sm text-ivory placeholder:text-ivory/30 focus:border-gold/40 focus:outline-none"
                  />
                </div>
              </div>
              <div className="mt-4 flex items-center gap-3">
                <button
                  type="submit"
                  className="flex items-center gap-2 rounded-lg bg-gold px-5 py-2.5 text-sm font-medium text-espresso transition hover:bg-gold-soft"
                >
                  <Send className="h-3.5 w-3.5" /> Send
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="rounded-lg border border-gold/15 px-5 py-2.5 text-sm text-ivory/50 transition hover:text-ivory"
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      <GoldHairline className="my-8" />

      {/* Invitations List */}
      <div className="space-y-3">
        {invitations.map((inv, i) => {
          const config = STATUS_CONFIG[inv.status];
          const StatusIcon = config.icon;
          return (
            <Reveal key={inv.id} delay={i * 0.05}>
              <div className="glass flex items-center justify-between rounded-xl px-5 py-4">
                <div className="flex items-center gap-4">
                  <div className={`flex h-9 w-9 items-center justify-center rounded-full ${config.bg}`}>
                    <StatusIcon className={`h-4 w-4 ${config.color}`} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-ivory">{inv.name}</p>
                    <p className="text-xs text-ivory/40">{inv.email}</p>
                    {inv.event && (
                      <p className="mt-0.5 text-xs text-gold/60">{inv.event}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs font-medium ${config.color}`}>{config.label}</span>
                  <button
                    onClick={() => handleCopyLink(inv.id)}
                    className="rounded-lg p-2 text-ivory/30 transition hover:text-gold"
                    aria-label="Copy invitation link"
                  >
                    <Copy className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>

      {invitations.length === 0 && (
        <div className="glass rounded-xl p-12 text-center">
          <Send className="mx-auto h-10 w-10 text-ivory/20" />
          <p className="mt-4 text-sm text-ivory/40">No invitations sent yet.</p>
        </div>
      )}
    </div>
  );
}
