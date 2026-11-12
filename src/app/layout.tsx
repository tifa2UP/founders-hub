import type { Metadata } from "next";
import { EMAIL, LINKEDIN } from "@/components/site/links";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.founder-hub.com"),
  title: {
    default: "Founders Hub Oslo — Olympiatoppen for founders",
    template: "%s | Founders Hub Oslo",
  },
  description:
    "A startup hub and workspace at Youngstorget in Oslo, for founders building very ambitious companies. Three into Y Combinator in the first year.",
  keywords: ["startup hub", "Oslo", "founders", "workspace", "coworking", "startups", "Norway", "AI"],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Founders Hub Oslo",
    description: "A startup hub and workspace at Youngstorget in Oslo, for founders building very ambitious companies. Three into Y Combinator in the first year.",
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
    description: "A startup hub and workspace at Youngstorget in Oslo, for founders building very ambitious companies. Three into Y Combinator in the first year.",
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.founder-hub.com/#organization",
      name: "Founders Hub Oslo",
      alternateName: "Founders Hub",
      url: "https://www.founder-hub.com",
      logo: "https://www.founder-hub.com/icon.png",
      image: "https://www.founder-hub.com/og.png",
      description:
        "A non-profit startup hub and workspace at Youngstorget in Oslo, for founders building very ambitious companies.",
      foundingDate: "2026-01",
      email: EMAIL,
      sameAs: [LINKEDIN],
      address: {
        "@type": "PostalAddress",
        name: "Mesh Youngstorget",
        addressLocality: "Oslo",
        addressCountry: "NO",
      },
      founder: ["Anders Mjåset", "Trond Haugå", "Erik Nymo Bohne", "Mikael Steenbuch"].map((name) => ({
        "@type": "Person",
        name,
      })),
    },
    {
      "@type": "WebSite",
      "@id": "https://www.founder-hub.com/#website",
      url: "https://www.founder-hub.com",
      name: "Founders Hub Oslo",
      inLanguage: "en",
      publisher: { "@id": "https://www.founder-hub.com/#organization" },
    },
  ],
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
      <body className="noise">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {children}
      </body>
    </html>
  );
}
