import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Apply for Residency",
  description:
    "Apply to join Founders Hub Oslo, a community and workspace for ambitious AI founders and builders.",
  alternates: {
    canonical: "/apply",
  },
};

export default function ApplyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
