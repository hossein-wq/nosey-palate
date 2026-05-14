"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Search,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  UserCog,
  ShieldOff,
  Eye,
} from "lucide-react";

type Tier = "Explorer" | "Connoisseur" | "Collector" | "Admin";

interface Member {
  id: string;
  name: string;
  email: string;
  avatar: string;
  tier: Tier;
  joined: string;
  status: "active" | "inactive" | "suspended";
}

const MEMBERS: Member[] = [
  { id: "1", name: "Sophia Laurent", email: "sophia@example.com", avatar: "SL", tier: "Connoisseur", joined: "2024-11-15", status: "active" },
  { id: "2", name: "James Chen", email: "james.c@example.com", avatar: "JC", tier: "Collector", joined: "2024-08-22", status: "active" },
  { id: "3", name: "Elena Vasquez", email: "elena.v@example.com", avatar: "EV", tier: "Collector", joined: "2024-06-10", status: "active" },
  { id: "4", name: "Marcus Reed", email: "marcus@example.com", avatar: "MR", tier: "Explorer", joined: "2025-01-03", status: "active" },
  { id: "5", name: "Isabelle Moreau", email: "isabelle@example.com", avatar: "IM", tier: "Connoisseur", joined: "2024-09-28", status: "active" },
  { id: "6", name: "Oliver Blackwood", email: "oliver.b@example.com", avatar: "OB", tier: "Explorer", joined: "2025-02-17", status: "inactive" },
  { id: "7", name: "Amara Osei", email: "amara@example.com", avatar: "AO", tier: "Admin", joined: "2024-01-01", status: "active" },
  { id: "8", name: "Rafael Dumont", email: "rafael.d@example.com", avatar: "RD", tier: "Explorer", joined: "2025-03-08", status: "suspended" },
];

const TIER_FILTERS: Array<Tier | "All"> = ["All", "Explorer", "Connoisseur", "Collector", "Admin"];

const tierColor: Record<Tier, string> = {
  Explorer: "bg-gold/15 text-gold",
  Connoisseur: "bg-ember/15 text-ember",
  Collector: "bg-champagne/20 text-champagne",
  Admin: "bg-ivory/10 text-ivory",
};

const statusColor: Record<string, string> = {
  active: "bg-emerald-400/15 text-emerald-400",
  inactive: "bg-ivory/10 text-ivory/50",
  suspended: "bg-red-400/15 text-red-400",
};

const PAGE_SIZE = 5;

export default function AdminMembersPage() {
  const [search, setSearch] = useState("");
  const [tierFilter, setTierFilter] = useState<Tier | "All">("All");
  const [page, setPage] = useState(1);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return MEMBERS.filter((m) => {
      const matchesSearch =
        m.name.toLowerCase().includes(search.toLowerCase()) ||
        m.email.toLowerCase().includes(search.toLowerCase());
      const matchesTier = tierFilter === "All" || m.tier === tierFilter;
      return matchesSearch && matchesTier;
    });
  }, [search, tierFilter]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <div className="mb-10">
        <h1 className="font-display text-4xl text-ivory">
          Member <span className="italic text-gold-soft">Management</span>
        </h1>
        <p className="mt-2 text-sm text-ivory/50">{MEMBERS.length} total members across all tiers</p>
      </div>

      {/* Search & Filters */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="glass relative flex items-center rounded-lg">
          <Search className="absolute left-3 h-4 w-4 text-ivory/40" />
          <input
            type="text"
            placeholder="Search members..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="w-full bg-transparent py-2.5 pl-10 pr-4 text-sm text-ivory placeholder:text-ivory/30 focus:outline-none sm:w-80"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {TIER_FILTERS.map((t) => (
            <button
              key={t}
              onClick={() => { setTierFilter(t); setPage(1); }}
              className={cn(
                "rounded-full px-4 py-1.5 text-xs font-medium transition",
                tierFilter === t
                  ? "bg-gold text-espresso"
                  : "glass text-ivory/60 hover:text-ivory"
              )}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="glass overflow-hidden rounded-xl">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gold/10">
                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-ivory/40">Member</th>
                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-ivory/40">Tier</th>
                <th className="hidden px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-ivory/40 md:table-cell">Joined</th>
                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-ivory/40">Status</th>
                <th className="px-6 py-4 text-right text-xs font-medium uppercase tracking-wider text-ivory/40">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gold/5">
              {paginated.map((member) => (
                <tr key={member.id} className="transition hover:bg-gold/5">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold/15 text-xs font-medium text-gold">
                        {member.avatar}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-ivory">{member.name}</p>
                        <p className="text-xs text-ivory/40">{member.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn("rounded-full px-3 py-1 text-xs font-medium", tierColor[member.tier])}>
                      {member.tier}
                    </span>
                  </td>
                  <td className="hidden px-6 py-4 text-sm text-ivory/50 md:table-cell">
                    {new Date(member.joined).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn("rounded-full px-3 py-1 text-xs font-medium capitalize", statusColor[member.status])}>
                      {member.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="relative inline-block">
                      <button
                        onClick={() => setOpenMenu(openMenu === member.id ? null : member.id)}
                        className="rounded-lg p-1.5 text-ivory/40 transition hover:bg-gold/10 hover:text-ivory"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                      {openMenu === member.id && (
                        <div className="glass-strong absolute right-0 top-full z-10 mt-1 w-48 rounded-lg py-1 shadow-xl">
                          <button className="flex w-full items-center gap-2 px-4 py-2 text-sm text-ivory/70 hover:bg-gold/10 hover:text-ivory">
                            <Eye className="h-3.5 w-3.5" /> View Profile
                          </button>
                          <button className="flex w-full items-center gap-2 px-4 py-2 text-sm text-ivory/70 hover:bg-gold/10 hover:text-ivory">
                            <UserCog className="h-3.5 w-3.5" /> Change Role
                          </button>
                          <button className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-400/80 hover:bg-red-400/10 hover:text-red-400">
                            <ShieldOff className="h-3.5 w-3.5" /> Disable Account
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {paginated.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-sm text-ivory/40">
                    No members found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-gold/10 px-6 py-4">
            <p className="text-xs text-ivory/40">
              Showing {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page === 1}
                className="rounded-lg p-1.5 text-ivory/40 transition hover:bg-gold/10 hover:text-ivory disabled:opacity-30"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={cn(
                    "h-8 w-8 rounded-lg text-xs font-medium transition",
                    p === page ? "bg-gold text-espresso" : "text-ivory/50 hover:bg-gold/10"
                  )}
                >
                  {p}
                </button>
              ))}
              <button
                onClick={() => setPage(Math.min(totalPages, page + 1))}
                disabled={page === totalPages}
                className="rounded-lg p-1.5 text-ivory/40 transition hover:bg-gold/10 hover:text-ivory disabled:opacity-30"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
