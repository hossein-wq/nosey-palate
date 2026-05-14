"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";
import { APP_URL } from "@/lib/constants";

export default function SignupForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
        emailRedirectTo: `${APP_URL}/callback`,
      },
    });

    if (error) {
      toast.error(error.message);
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
  }

  if (success) {
    return (
      <div className="glass rounded-2xl p-8 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-gold/30 bg-gold/10">
          <svg
            viewBox="0 0 24 24"
            className="h-6 w-6 text-gold"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
            />
          </svg>
        </div>
        <h1 className="font-display text-2xl text-ivory">Check Your Email</h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          We sent a verification link to{" "}
          <span className="text-gold">{email}</span>. Click it to activate your
          account.
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
        Join the Community
      </h1>
      <p className="mt-2 text-center text-sm text-muted-foreground">
        Create your Nosey Palate account
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <div>
          <label
            htmlFor="fullName"
            className="mb-1.5 block text-xs uppercase tracking-wider text-muted-foreground"
          >
            Full Name
          </label>
          <input
            id="fullName"
            type="text"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full rounded-lg border border-border bg-input px-4 py-3 text-sm text-ivory placeholder:text-muted-foreground focus:border-gold/60 focus:outline-none focus:ring-1 focus:ring-gold/40"
            placeholder="Lena Marchetti"
          />
        </div>

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

        <div>
          <label
            htmlFor="password"
            className="mb-1.5 block text-xs uppercase tracking-wider text-muted-foreground"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-border bg-input px-4 py-3 text-sm text-ivory placeholder:text-muted-foreground focus:border-gold/60 focus:outline-none focus:ring-1 focus:ring-gold/40"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="group relative w-full overflow-hidden rounded-full bg-gold py-3.5 text-sm font-medium text-background transition-all hover:shadow-glow-gold disabled:opacity-50"
        >
          <span className="relative z-10">
            {loading ? "Creating account…" : "Create Account"}
          </span>
          <span
            aria-hidden
            className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full"
          />
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Already a member?{" "}
        <Link
          href="/login"
          className="text-gold transition-colors hover:text-gold-soft"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
