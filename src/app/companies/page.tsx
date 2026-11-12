/* eslint-disable @next/next/no-img-element -- video thumbnails come straight from YouTube at a fixed size */
import type { Metadata } from "next";

import SitePage from "@/components/site/SitePage";
import { COMPANIES, youtubeId } from "@/content/companies";

export const metadata: Metadata = {
  title: "Companies",
  description:
    "The companies built by residents at Founders Hub Oslo: what they make, their launch videos and posts, and their biggest milestones.",
  alternates: { canonical: "/companies" },
};

export default function CompaniesPage() {
  return (
    <SitePage label="Companies" title="Built at the hub.">
      <ul className="rows companies">
        {COMPANIES.map((c) => {
          const yt = youtubeId(c.video);
          const links = [
            c.video && { label: c.videoLabel ?? "Launch video", href: c.video },
            c.launchPost && { label: "Launch post", href: c.launchPost },
            c.linkedin && { label: "LinkedIn", href: c.linkedin },
            c.x && { label: "X", href: c.x },
            c.website && { label: "Website", href: c.website },
          ].filter(Boolean) as { label: string; href: string }[];
          return (
            <li key={c.name}>
              <div>
                <h2>{c.name}</h2>
                <p className="what">{c.what}</p>
              </div>
              <div>
                {yt && (
                  <a
                    className="video"
                    href={c.video}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Watch ${c.name}’s ${(c.videoLabel ?? "Launch video").toLowerCase()}`}
                  >
                    <img
                      src={`https://i.ytimg.com/vi/${yt}/hqdefault.jpg`}
                      alt=""
                      width={480}
                      height={360}
                      loading="lazy"
                    />
                    <span className="play" aria-hidden="true" />
                  </a>
                )}
                {c.milestones && (
                  <ul className="marks">
                    {c.milestones.map((m) => (
                      <li key={m.when + m.text}>
                        <span className="mono when">{m.when}</span>
                        {m.href ? (
                          <a className="inline" href={m.href} target="_blank" rel="noopener noreferrer">
                            {m.text}
                          </a>
                        ) : (
                          <span>{m.text}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
                <div className="links mono">
                  {links.map((l) => (
                    <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer">
                      {l.label} ↗
                    </a>
                  ))}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </SitePage>
  );
}
