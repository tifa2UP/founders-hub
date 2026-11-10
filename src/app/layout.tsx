import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.founder-hub.com"),
  title: {
    default: "Founders Hub Oslo — Olympiatoppen for founders",
    template: "%s | Founders Hub Oslo",
  },
  description:
    "A workspace in Oslo for founders building very ambitious companies. Three into Y Combinator in the first year.",
  keywords: ["AI", "startups", "Oslo", "founders", "community", "coworking"],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Founders Hub Oslo",
    description: "A workspace in Oslo for founders building very ambitious companies. Three into Y Combinator in the first year.",
    type: "website",
    url: "/",
    siteName: "Founders Hub Oslo",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Founders Hub, a sun rising over the horizon",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Founders Hub Oslo",
    description: "A workspace in Oslo for founders building very ambitious companies. Three into Y Combinator in the first year.",
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
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter+Tight:wght@400;500&family=Syne:wght@400;500;600;700;800&family=Space+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="noise">{children}</body>
    </html>
  );
}
