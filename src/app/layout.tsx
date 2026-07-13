import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.founder-hub.com"),
  title: {
    default: "Founders Hub Oslo — For Those Who Ship",
    template: "%s | Founders Hub Oslo",
  },
  description:
    "Oslo's home for AI builders. Free office space and #1 community for the ones that ship fast. If you're building something world-class, you belong here.",
  keywords: ["AI", "startups", "Oslo", "founders", "community", "coworking"],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Founders Hub Oslo",
    description: "Norway's home for the AI founders building world-class companies.",
    type: "website",
    url: "/",
    siteName: "Founders Hub Oslo",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Founders Hub — Oslo, Est. 2026",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Founders Hub Oslo",
    description: "Norway's home for the AI founders building world-class companies.",
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Syne:wght@400;500;600;700;800&family=Space+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="noise">{children}</body>
    </html>
  );
}
