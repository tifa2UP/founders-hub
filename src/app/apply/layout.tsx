import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Apply for Residency",
  description:
    "Apply to become a resident at Founders Hub Oslo, a workspace for founders building very ambitious companies.",
  alternates: {
    canonical: "/apply",
  },
};

export default function ApplyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
