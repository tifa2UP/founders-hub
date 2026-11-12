import type { Metadata } from "next";
import Link from "next/link";

import SitePage from "@/components/site/SitePage";
import { FAQ } from "@/content/faq";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "What Founders Hub Oslo is, who it is for, what a desk costs, where it is and how to apply for residency.",
  alternates: { canonical: "/faq" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function FaqPage() {
  return (
    <SitePage label="FAQ" title="Questions, answered.">
      <ul className="rows">
        {FAQ.map((f) => (
          <li key={f.q}>
            <h2>{f.q}</h2>
            <p>
              {f.a}
              {f.link && (
                <>
                  {" "}
                  {f.link.href.startsWith("/") ? (
                    <Link className="inline" href={f.link.href}>
                      {f.link.label} →
                    </Link>
                  ) : (
                    <a className="inline" href={f.link.href}>
                      {f.link.label} →
                    </a>
                  )}
                </>
              )}
            </p>
          </li>
        ))}
      </ul>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </SitePage>
  );
}
