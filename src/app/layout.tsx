import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "Founders Hub Oslo | For the Wildly Ambitious Building Global AI Impact",
  description:
    "Oslo's home for AI builders. Free office space and #1 community for the ones that ship fast. If you're building something world-class, you belong here.",
  keywords: ["AI", "startups", "Oslo", "founders", "community", "coworking", "accelerator"],
  openGraph: {
    title: "Founders Hub Oslo",
    description: "For the wildly ambitious building global AI impact",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased grain scanlines`}
      >
        {children}
      </body>
    </html>
  );
}
