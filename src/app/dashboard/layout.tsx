import Link from "next/link";
import Image from "next/image";

const MEMBER_NAV = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Events", href: "/dashboard/events" },
  { label: "Community", href: "/dashboard/community" },
  { label: "Profile", href: "/dashboard/profile" },
  { label: "Membership", href: "/dashboard/membership" },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <header className="glass-strong fixed inset-x-0 top-0 z-50 border-b border-gold/15">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4 md:px-10">
          <Link href="/dashboard" className="relative h-8 w-20">
            <Image
              src="/images/logo.png"
              alt="Nosey Palate"
              fill
              className="object-contain object-left"
            />
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            {MEMBER_NAV.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-[13px] text-ivory/70 transition hover:text-gold"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <Link
            href="/dashboard/profile/settings"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/30 text-xs text-ivory/70 transition hover:border-gold hover:text-gold"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="8" r="4" />
              <path d="M6 21v-2a4 4 0 014-4h4a4 4 0 014 4v2" />
            </svg>
          </Link>
        </div>
      </header>
      <main className="pt-20">{children}</main>
    </div>
  );
}
