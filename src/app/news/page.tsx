import type { Metadata } from "next";

import Link from "next/link";

import SitePage from "@/components/site/SitePage";
import { NEWS } from "@/content/news";

export const metadata: Metadata = {
  title: "News: YC admissions and funding rounds",
  description:
    "News from Founders Hub Oslo: Y Combinator admissions, funding rounds and partners. Ara, Audun, Native, Benford, Mimir and DNB.",
  alternates: { canonical: "/news" },
  openGraph: { title: "News from Founders Hub Oslo", description: "News from Founders Hub Oslo: Y Combinator admissions, funding rounds and partners. Ara, Audun, Native, Benford, Mimir and DNB.", url: "/news" },
  twitter: { card: "summary_large_image", title: "News from Founders Hub Oslo", description: "News from Founders Hub Oslo: Y Combinator admissions, funding rounds and partners. Ara, Audun, Native, Benford, Mimir and DNB." },
};

export default function NewsPage() {
  return (
    <SitePage label="News" title="From the hub.">
      <ul className="rows news">
        {NEWS.map((n) => (
          <li key={n.title}>
            <div>
              <span className="mono when">{n.when}</span>
              <h2>
                {n.story ? (
                  <Link href={n.story}>{n.title}</Link>
                ) : n.source ? (
                  <a href={n.source.href} target="_blank" rel="noopener noreferrer">
                    {n.title}
                  </a>
                ) : (
                  n.title
                )}
              </h2>
            </div>
            <div>
              <p>{n.summary}</p>
              {n.story && (
                <Link className="mono src" href={n.story}>
                  Read the story →
                </Link>
              )}
              {n.source && (
                <a className="mono src" href={n.source.href} target="_blank" rel="noopener noreferrer">
                  {n.source.label} ↗
                </a>
              )}
            </div>
          </li>
        ))}
      </ul>
    </SitePage>
  );
}
