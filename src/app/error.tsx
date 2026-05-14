"use client";

import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-2xl text-ivory">Something went wrong</h1>
        <p className="mt-3 text-sm text-ivory/60">
          {error.message || "An unexpected error occurred. Please try again."}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            onClick={reset}
            className="rounded-full bg-gold px-6 py-3 text-sm font-medium text-espresso transition hover:shadow-[0_0_30px_color-mix(in_oklab,var(--gold)_45%,transparent)]"
          >
            Try again
          </button>
          <Link
            href="/"
            className="rounded-full border border-gold/30 px-6 py-3 text-sm text-ivory transition hover:border-gold hover:bg-gold/10"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}
