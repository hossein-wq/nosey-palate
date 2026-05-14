import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-8xl text-gold">404</h1>
        <h2 className="mt-4 font-display text-2xl text-ivory">Page not found</h2>
        <p className="mt-3 text-sm text-ivory/60">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-medium text-espresso transition hover:shadow-[0_0_30px_color-mix(in_oklab,var(--gold)_45%,transparent)]"
          >
            Go Home &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
