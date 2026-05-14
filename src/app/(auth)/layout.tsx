import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-background px-6 py-12">
      <div className="grain pointer-events-none absolute inset-0" />

      <Link
        href="/"
        className="relative z-10 mb-10 flex flex-col items-center leading-none"
      >
        <span className="font-display text-2xl tracking-[0.2em] text-gold">
          NOSEY
        </span>
        <span className="font-serif text-base italic text-ivory/80">
          Palate
        </span>
      </Link>

      <div className="relative z-10 w-full max-w-md">{children}</div>
    </div>
  );
}
