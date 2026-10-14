import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";

import { siteConfig } from "@/lib/config/site";
import { absoluteUrl } from "@/lib/utils";

import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Apex Technology | Software Development in the Philippines",
    template: "%s | Apex Technology",
  },
  description: siteConfig.description,
  keywords: [...siteConfig.seoKeywords],
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name, url: absoluteUrl("/") }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: "technology",
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    title: "Apex Technology | Software Development in the Philippines",
    description: siteConfig.description,
    url: absoluteUrl("/"),
    locale: "en_PH",
    images: [{ url: "/opengraph-image", alt: siteConfig.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Apex Technology | Software Development in the Philippines",
    description: siteConfig.description,
    images: ["/opengraph-image"],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-PH" className={jakarta.variable}>
      <body className="min-h-screen bg-[var(--background-primary)] font-sans text-[var(--text-primary)] antialiased">
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-white focus:px-3 focus:py-2"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
