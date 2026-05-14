"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";
import { APP_URL } from "@/lib/constants";

export default function ResetPasswordForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const supabase = createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${APP_URL}/callback`,
    });

    if (error) {
      toast.error(error.message);
      setLoading(false);
      return;
    }

    setSent(true);
    setLoading(false);
  }

  if (sent) {
    return (
      <div className="glass rounded-2xl p-8 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-gold/30 bg-gold/10">
          <svg viewBox="0 0 24 24" className="h-6 w-6 text-gold" fill="none" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h1 className="font-display text-2xl text-ivory">Check Your Email</h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          If an account exists for{" "}
          <span className="text-gold">{email}</span>, you&apos;ll receive a
          password reset link shortly.
        </p>
        <Link
          href="/login"
          className="mt-6 inline-block text-sm text-gold transition-colors hover:text-gold-soft"
        >
          ← Back to login
        </Link>
      </div>
    );
  }

  return (
    <div className="glass rounded-2xl p-8">
      <h1 className="text-center font-display text-3xl text-ivory">
        Reset Password
      </h1>
      <p className="mt-2 text-center text-sm text-muted-foreground">
        Enter your email and we&apos;ll send you a reset link
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <div>
          <label
            htmlFor="email"
            className="mb-1.5 block text-xs uppercase tracking-wider text-muted-foreground"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-border bg-input px-4 py-3 text-sm text-ivory placeholder:text-muted-foreground focus:border-gold/60 focus:outline-none focus:ring-1 focus:ring-gold/40"
            placeholder="you@example.com"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="group relative w-full overflow-hidden rounded-full bg-gold py-3.5 text-sm font-medium text-background transition-all hover:shadow-glow-gold disabled:opacity-50"
        >
          <span className="relative z-10">
            {loading ? "Sending…" : "Send Reset Link"}
          </span>
          <span
            aria-hidden
            className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full"
          />
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Remember your password?{" "}
        <Link href="/login" className="text-gold transition-colors hover:text-gold-soft">
          Sign in
        </Link>
      </p>
    </div>
  );
}
