import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Apply for Residency",
  description:
    "Apply to become a resident at Founders Hub Oslo, a workspace for founders building very ambitious companies.",
  alternates: {
    canonical: "/apply",
  },
  openGraph: { title: "Apply for Residency at Founders Hub Oslo", description: "Apply to become a resident at Founders Hub Oslo, a workspace for founders building very ambitious companies.", url: "/apply" },
  twitter: { card: "summary_large_image", title: "Apply for Residency at Founders Hub Oslo", description: "Apply to become a resident at Founders Hub Oslo, a workspace for founders building very ambitious companies." },
};

export default function ApplyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
