import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { SiteHeader } from "@/components/site-header";
import { siteConfig } from "@/data/siteConfig";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // Resolves the Open Graph image and the canonical link against the real
  // address rather than the alias a visitor happened to land on.
  metadataBase: new URL(siteConfig.url),
  title: `${siteConfig.name} — ${siteConfig.role}`,
  description: siteConfig.intro,
  alternates: { canonical: "/" },
  openGraph: {
    url: "/",
    title: `${siteConfig.name} — ${siteConfig.role}`,
    description: siteConfig.intro,
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // The site is dark, full stop — `dark` is hard-coded rather than toggled.
    // `colorScheme` tells the browser to match its own furniture (scrollbars,
    // form controls, the flash before first paint) instead of assuming light.
    <html
      lang="en"
      className={`dark ${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
      style={{ colorScheme: "dark" }}
    >
      <body className="flex min-h-full flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
