import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { siteConfig } from "@/lib/site";
import "./globals.css";

/*
  next/font downloads both faces at build time and self-hosts them, so there is no
  request to Google at runtime and no layout shift from a late-arriving font.
  Sans carries the reading; mono carries labels, status, and metadata — the small
  signal that this portfolio was built rather than assembled.
*/
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const description = `${siteConfig.positioning} ${siteConfig.intro}`;

export const metadata: Metadata = {
  title: `${siteConfig.name} — ${siteConfig.role}`,
  description,
  openGraph: {
    title: `${siteConfig.name} — ${siteConfig.role}`,
    description,
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">
        {/*
          First thing in the tab order: a skip link that is off-screen until it has
          focus, so a keyboard user does not have to tab through the whole header to
          reach the content.
        */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-paper"
        >
          Skip to main content
        </a>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
