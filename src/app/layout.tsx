import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

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

/*
  Link preview metadata. The picture itself is `opengraph-image.tsx`; Next.js finds
  it by filename and writes the og:image tags, so it is not named here.

  `metadataBase` is the prefix that turns the image's path into the absolute URL a
  messaging app can fetch. Until `siteConfig.url` is set, Next.js falls back to the
  Vercel deployment URL in production — correct on Vercel, and the reason the local
  build prints a "metadataBase is not set" notice rather than failing.

  `twitter` only needs the card shape: Next.js copies the title, description, and
  image across from `openGraph`. `summary_large_image` is what makes X, Slack, and
  iMessage show the wide picture instead of a thumbnail beside the text.
*/
export const metadata: Metadata = {
  metadataBase: siteConfig.url ? new URL(siteConfig.url) : undefined,
  title: `${siteConfig.name} — ${siteConfig.role}`,
  description,
  openGraph: {
    title: `${siteConfig.name} — ${siteConfig.role}`,
    description,
    type: "website",
    siteName: siteConfig.name,
    url: siteConfig.url ?? undefined,
  },
  twitter: {
    card: "summary_large_image",
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
        {/*
          Header and footer are not here. They belong to the portfolio route
          group. The Anthem prototype is its own route group and must not
          inherit the portfolio chrome.
        */}
        {children}
      </body>
    </html>
  );
}
