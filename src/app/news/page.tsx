import type { Metadata } from "next";

import SitePage from "@/components/site/SitePage";
import { NEWS } from "@/content/news";

export const metadata: Metadata = {
  title: "News",
  description:
    "News from Founders Hub Oslo: Y Combinator admissions, funding rounds and partners. Ara, Audun, Native, Benford, Mimir and DNB.",
  alternates: { canonical: "/news" },
};

export default function NewsPage() {
  return (
    <SitePage label="News" title="From the hub.">
      <ul className="rows news">
        {NEWS.map((n) => (
          <li key={n.title}>
            <div>
              <span className="mono when">{n.when}</span>
              <h2>{n.title}</h2>
            </div>
            <div>
              <p>{n.summary}</p>
              <a className="mono src" href={n.source.href} target="_blank" rel="noopener noreferrer">
                {n.source.label} ↗
              </a>
            </div>
          </li>
        ))}
      </ul>
    </SitePage>
  );
}
