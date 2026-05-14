"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2, Eye, EyeOff, Bell, Shield, LogOut } from "lucide-react";
import { toast } from "sonner";
import { LUXURY_EASE } from "@/lib/motion";
import { Reveal, GoldHairline } from "@/components/shared/primitives";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [saving, setSaving] = useState(false);
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [pushNotifs, setPushNotifs] = useState(true);
  const [eventReminders, setEventReminders] = useState(true);
  const [communityUpdates, setCommunityUpdates] = useState(false);

  async function handlePasswordReset() {
    setSaving(true);
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user?.email) throw new Error("Not authenticated");

      await supabase.auth.resetPasswordForEmail(user.email, {
        redirectTo: `${window.location.origin}/callback?type=recovery`,
      });
      toast.success("Password reset email sent");
    } catch {
      toast.error("Failed to send reset email");
    } finally {
      setSaving(false);
    }
  }

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-12 md:px-10">
      <Reveal>
        <span className="eyebrow inline-flex items-center gap-3">
          <span className="h-px w-8 bg-gold/60" />
          Settings
        </span>
        <h1 className="mt-4 font-display text-4xl text-ivory">
          Account <span className="italic text-gold-soft">Settings</span>
        </h1>
      </Reveal>

      {/* Security */}
      <Reveal delay={0.1}>
        <section className="mt-10">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="h-5 w-5 text-gold" />
            <h2 className="font-display text-xl text-ivory">Security</h2>
          </div>
          <div className="glass rounded-xl p-6 space-y-6">
            <div>
              <label className="block text-sm text-ivory/60 mb-2">Password</label>
              <div className="flex items-center gap-3">
                <input
                  type={showPassword ? "text" : "password"}
                  value="••••••••••"
                  readOnly
                  className="flex-1 rounded-lg border border-gold/15 bg-espresso/30 px-4 py-3 text-sm text-ivory/50"
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="rounded-lg border border-gold/15 p-3 text-ivory/40 transition hover:text-gold"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              <button
                onClick={handlePasswordReset}
                disabled={saving}
                className="mt-3 text-sm text-gold underline underline-offset-4 transition hover:text-gold-soft disabled:opacity-50"
              >
                {saving ? (
                  <span className="flex items-center gap-2"><Loader2 className="h-3 w-3 animate-spin" /> Sending...</span>
                ) : (
                  "Send password reset email"
                )}
              </button>
            </div>
          </div>
        </section>
      </Reveal>

      <GoldHairline className="my-8" />

      {/* Notifications */}
      <Reveal delay={0.15}>
        <section>
          <div className="flex items-center gap-3 mb-6">
            <Bell className="h-5 w-5 text-gold" />
            <h2 className="font-display text-xl text-ivory">Notifications</h2>
          </div>
          <div className="glass rounded-xl p-6 space-y-5">
            {[
              { label: "Email Notifications", desc: "Receive updates via email", value: emailNotifs, set: setEmailNotifs },
              { label: "Push Notifications", desc: "Browser push alerts", value: pushNotifs, set: setPushNotifs },
              { label: "Event Reminders", desc: "Get reminded before RSVPed events", value: eventReminders, set: setEventReminders },
              { label: "Community Updates", desc: "New tasting notes and reactions", value: communityUpdates, set: setCommunityUpdates },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-ivory">{item.label}</p>
                  <p className="text-xs text-ivory/40">{item.desc}</p>
                </div>
                <button
                  onClick={() => item.set(!item.value)}
                  className="relative h-6 w-11 rounded-full border border-gold/20 bg-espresso/30 transition"
                  aria-label={`Toggle ${item.label}`}
                >
                  <motion.div
                    layout
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className="absolute top-0.5 h-4 w-4 rounded-full bg-gold"
                    style={{ left: item.value ? 22 : 2 }}
                  />
                </button>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      <GoldHairline className="my-8" />

      {/* Sign Out */}
      <Reveal delay={0.2}>
        <section>
          <div className="flex items-center gap-3 mb-6">
            <LogOut className="h-5 w-5 text-gold" />
            <h2 className="font-display text-xl text-ivory">Session</h2>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2, ease: LUXURY_EASE }}
            onClick={handleSignOut}
            className="rounded-lg border border-ember/30 px-6 py-3 text-sm text-ember transition hover:bg-ember/10"
          >
            Sign Out
          </motion.button>
        </section>
      </Reveal>
    </div>
  );
}
