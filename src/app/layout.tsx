import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Fraunces, Inter_Tight } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export const metadata: Metadata = {
  title: {
    default: "The Nosey Palate — A Private Wine Community",
    template: "%s | The Nosey Palate",
  },
  description:
    "Better wine. Better people. Real connection. A members-only club for curated tastings, private dinners, and unforgettable evenings.",
  metadataBase: new URL(siteUrl),
  keywords: [
    "wine membership",
    "luxury wine club",
    "private wine community",
    "curated wine tastings",
    "sommelier-led events",
    "wine experiences",
    "private dining",
    "wine education",
    "fine wine",
    "The Nosey Palate",
  ],
  authors: [{ name: "The Nosey Palate" }],
  creator: "The Nosey Palate",
  publisher: "The Nosey Palate",
  formatDetection: { telephone: false },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "The Nosey Palate",
    title: "The Nosey Palate — A Private Wine Community",
    description:
      "Members-only wine community. Curated events, sommelier-led tastings, private dinners worldwide.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "The Nosey Palate — A Private Wine Community",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Nosey Palate — A Private Wine Community",
    description:
      "Members-only wine community. Curated events, sommelier-led tastings, private dinners worldwide.",
    images: ["/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#1a0f0a",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "The Nosey Palate",
  url: siteUrl,
  logo: `${siteUrl}/images/og-image.jpg`,
  description:
    "A members-only wine community for curated tastings, private dinners, and unforgettable evenings.",
  sameAs: [],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${fraunces.variable} ${interTight.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-gold focus:px-6 focus:py-3 focus:text-sm focus:font-medium focus:text-espresso"
        >
          Skip to content
        </a>
        <main id="main-content">
          {children}
        </main>
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "hsl(20 30% 8%)",
              border: "1px solid oklch(0.72 0.1 85 / 0.2)",
              color: "oklch(0.95 0.02 85)",
              fontFamily: "var(--font-sans)",
            },
          }}
        />
      </body>
    </html>
  );
}
