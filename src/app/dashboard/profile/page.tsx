"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Camera, Save, Loader2, User, MapPin, Globe, Wine } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { LUXURY_EASE } from "@/lib/motion";
import { Reveal, Eyebrow, GoldHairline } from "@/components/shared/primitives";
import { MemberAvatar } from "@/components/shared/member-avatar";
import { MembershipBadge } from "@/components/shared/membership-badge";

/* ─── Types ───────────────────────────────────────────────── */

interface ProfileFormValues {
  display_name: string;
  bio: string;
  city: string;
  country: string;
  wine_preferences: string;
}

/* ─── Page ────────────────────────────────────────────────── */

const inputClass =
  "w-full rounded-md border border-gold/15 bg-ivory/5 px-4 py-2.5 text-sm text-ivory placeholder:text-ivory/30 outline-none transition-colors focus:border-gold/40 focus:bg-ivory/[0.07]";

export default function ProfilePage() {
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<ProfileFormValues>({
    display_name: "Alex T.",
    bio: "Wine lover, food adventurer, and perpetual student of terroir. Based in the Pacific Northwest.",
    city: "Portland",
    country: "United States",
    wine_preferences:
      "Burgundy Pinot Noir, Barolo, natural wines, aged Riesling",
  });

  function set<K extends keyof ProfileFormValues>(
    key: K,
    val: ProfileFormValues[K],
  ) {
    setForm((prev) => ({ ...prev, [key]: val }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    await new Promise((r) => setTimeout(r, 1200));
    setSaving(false);
    toast.success("Profile updated", {
      description: "Your changes have been saved.",
    });
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-12 md:px-10">
      <Reveal>
        <Eyebrow>Profile</Eyebrow>
        <h1 className="mt-4 font-display text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.08] text-ivory">
          Your <span className="italic text-gold-soft">Profile</span>
        </h1>
        <p className="mt-3 text-ivory/50">
          Manage your public identity across the community.
        </p>
      </Reveal>

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.15, ease: LUXURY_EASE }}
        onSubmit={handleSubmit}
        className="mt-10 space-y-8"
      >
        {/* Avatar Section */}
        <div className="glass rounded-md p-6 md:p-8">
          <div className="flex items-center gap-6">
            <div className="relative">
              <MemberAvatar
                src="https://i.pravatar.cc/120?img=12"
                name={form.display_name}
                size="lg"
                tier="connoisseur"
              />
              <button
                type="button"
                className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full border border-gold/30 bg-espresso text-ivory/60 transition hover:border-gold hover:text-gold"
                aria-label="Change avatar"
              >
                <Camera className="h-4 w-4" />
              </button>
            </div>
            <div>
              <h3 className="font-display text-xl text-ivory">
                {form.display_name}
              </h3>
              <MembershipBadge tier="connoisseur" className="mt-1" />
              <p className="mt-1 text-xs text-ivory/40">
                Click the camera icon to upload a new photo
              </p>
            </div>
          </div>
        </div>

        {/* Details Form */}
        <div className="glass rounded-md p-6 md:p-8">
          <h3 className="mb-6 font-display text-xl text-ivory">
            Personal <span className="italic text-gold-soft">Details</span>
          </h3>

          <div className="grid gap-5 sm:grid-cols-2">
            {/* Display Name */}
            <div className="sm:col-span-2">
              <label className="mb-1.5 flex items-center gap-2 text-xs uppercase tracking-wider text-gold/60">
                <User className="h-3.5 w-3.5" />
                Display Name
              </label>
              <input
                type="text"
                value={form.display_name}
                onChange={(e) => set("display_name", e.target.value)}
                placeholder="Your name"
                className={inputClass}
              />
            </div>

            {/* Bio */}
            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-xs uppercase tracking-wider text-gold/60">
                Bio
              </label>
              <textarea
                rows={3}
                value={form.bio}
                onChange={(e) => set("bio", e.target.value)}
                placeholder="Tell the community about yourself…"
                className={cn(inputClass, "resize-none")}
              />
              <p className="mt-1 text-right text-xs text-ivory/25">
                {form.bio.length}/280
              </p>
            </div>

            {/* City */}
            <div>
              <label className="mb-1.5 flex items-center gap-2 text-xs uppercase tracking-wider text-gold/60">
                <MapPin className="h-3.5 w-3.5" />
                City
              </label>
              <input
                type="text"
                value={form.city}
                onChange={(e) => set("city", e.target.value)}
                placeholder="e.g. Brooklyn"
                className={inputClass}
              />
            </div>

            {/* Country */}
            <div>
              <label className="mb-1.5 flex items-center gap-2 text-xs uppercase tracking-wider text-gold/60">
                <Globe className="h-3.5 w-3.5" />
                Country
              </label>
              <input
                type="text"
                value={form.country}
                onChange={(e) => set("country", e.target.value)}
                placeholder="e.g. United States"
                className={inputClass}
              />
            </div>

            <GoldHairline className="sm:col-span-2" />

            {/* Wine Preferences */}
            <div className="sm:col-span-2">
              <label className="mb-1.5 flex items-center gap-2 text-xs uppercase tracking-wider text-gold/60">
                <Wine className="h-3.5 w-3.5" />
                Wine Preferences
              </label>
              <textarea
                rows={2}
                value={form.wine_preferences}
                onChange={(e) => set("wine_preferences", e.target.value)}
                placeholder="Regions, grapes, styles you love…"
                className={cn(inputClass, "resize-none")}
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-full bg-gold px-8 py-3 text-sm font-medium text-espresso transition-all duration-500 hover:shadow-[0_0_40px_color-mix(in_oklab,var(--gold)_35%,transparent)] disabled:opacity-50"
          >
            {saving ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            {saving ? "Saving…" : "Save Changes"}
          </button>
        </div>
      </motion.form>
    </div>
  );
}
