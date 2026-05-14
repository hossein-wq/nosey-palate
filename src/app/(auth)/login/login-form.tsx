"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast.error(error.message);
      setLoading(false);
      return;
    }

    router.push(redirect);
    router.refresh();
  }

  return (
    <div className="glass rounded-2xl p-8">
      <h1 className="text-center font-display text-3xl text-ivory">
        Welcome Back
      </h1>
      <p className="mt-2 text-center text-sm text-muted-foreground">
        Sign in to your account
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
            {loading ? "Signing in…" : "Sign In"}
          </span>
          <span
            aria-hidden
            className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full"
          />
        </button>
      </form>

      <div className="mt-6 flex flex-col items-center gap-3 text-sm">
        <Link
          href="/reset-password"
          className="text-muted-foreground transition-colors hover:text-gold"
        >
          Forgot your password?
        </Link>
        <p className="text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="text-gold transition-colors hover:text-gold-soft"
          >
            Apply
          </Link>
        </p>
      </div>
    </div>
  );
}
