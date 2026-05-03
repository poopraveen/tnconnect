import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/Providers";

export const metadata: Metadata = {
  title: {
    default: "TrustNest – India's Most Trusted Real Estate Platform",
    template: "%s | TrustNest",
  },
  description:
    "Find your dream home with TrustNest. Buy, sell, or rent apartments, villas, plots, and commercial properties across India. Verified listings, AI recommendations, and transparent pricing.",
  keywords: [
    "real estate india", "buy property", "rent property", "apartments",
    "villas", "plots", "property listing", "housing", "home buying",
  ],
  authors: [{ name: "TrustNest" }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: process.env.NEXT_PUBLIC_APP_URL,
    siteName: "TrustNest",
    title: "TrustNest – India's Most Trusted Real Estate Platform",
    description: "Buy, sell, or rent verified properties across India.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "TrustNest – Real Estate Platform",
    description: "Find your dream home with TrustNest.",
  },
  robots: { index: true, follow: true },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
