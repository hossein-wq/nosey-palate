"use client";

import Link from "next/link";

export default function VerifyContent() {
  return (
    <div className="glass rounded-2xl p-8 text-center">
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-gold/30 bg-gold/10">
        <svg viewBox="0 0 24 24" className="h-6 w-6 text-gold" fill="none" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
        </svg>
      </div>
      <h1 className="font-display text-3xl text-ivory">Check Your Email</h1>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        We sent you a verification link. Click it to activate your account.
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
