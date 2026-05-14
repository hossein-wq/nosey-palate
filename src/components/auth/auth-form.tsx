"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

interface AuthFormProps {
  mode: "login" | "signup" | "reset";
}

export function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const supabase = createClient();

    try {
      if (mode === "login") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        router.push("/dashboard");
        router.refresh();
      } else if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { display_name: name },
            emailRedirectTo: `${window.location.origin}/callback`,
          },
        });
        if (error) throw error;
        setSuccess("Check your email to verify your account.");
      } else {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/callback?type=recovery`,
        });
        if (error) throw error;
        setSuccess("Check your email for a password reset link.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {mode === "signup" && (
        <div>
          <label htmlFor="name" className="eyebrow mb-2 block">
            Full Name
          </label>
          <input
            id="name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-md border border-gold/20 bg-espresso/50 px-4 py-3 text-sm text-ivory placeholder:text-ivory/40 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/50"
            placeholder="Your name"
          />
        </div>
      )}

      <div>
        <label htmlFor="email" className="eyebrow mb-2 block">
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-md border border-gold/20 bg-espresso/50 px-4 py-3 text-sm text-ivory placeholder:text-ivory/40 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/50"
          placeholder="you@example.com"
        />
      </div>

      {mode !== "reset" && (
        <div>
          <label htmlFor="password" className="eyebrow mb-2 block">
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-md border border-gold/20 bg-espresso/50 px-4 py-3 text-sm text-ivory placeholder:text-ivory/40 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/50"
            placeholder="Min 8 characters"
          />
        </div>
      )}

      {error && (
        <div className="rounded-md border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive-foreground">
          {error}
        </div>
      )}

      {success && (
        <div className="rounded-md border border-gold/30 bg-gold/10 px-4 py-3 text-sm text-gold">
          {success}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="group relative w-full overflow-hidden rounded-full bg-gold px-6 py-3.5 text-sm font-medium text-espresso transition-all hover:shadow-[0_0_40px_color-mix(in_oklab,var(--gold)_50%,transparent)] disabled:opacity-50"
      >
        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
        {loading
          ? "Please wait..."
          : mode === "login"
            ? "Sign In"
            : mode === "signup"
              ? "Create Account"
              : "Send Reset Link"}
      </button>

      <div className="text-center text-sm text-ivory/60">
        {mode === "login" && (
          <>
            <Link href="/reset-password" className="text-gold transition hover:text-gold-soft">
              Forgot password?
            </Link>
            <span className="mx-2">&middot;</span>
            <Link href="/signup" className="text-gold transition hover:text-gold-soft">
              Create account
            </Link>
          </>
        )}
        {mode === "signup" && (
          <>
            Already a member?{" "}
            <Link href="/login" className="text-gold transition hover:text-gold-soft">
              Sign in
            </Link>
          </>
        )}
        {mode === "reset" && (
          <Link href="/login" className="text-gold transition hover:text-gold-soft">
            Back to sign in
          </Link>
        )}
      </div>
    </form>
  );
}
