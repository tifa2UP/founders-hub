/* eslint-disable @next/next/no-img-element -- video stills come straight from where each video is hosted */
import type { Metadata } from "next";

import SitePage from "@/components/site/SitePage";
import { LAUNCHES } from "@/content/launches";

export const metadata: Metadata = {
  title: "Launches",
  description: "Launch videos made by companies at Founders Hub Oslo. A short selection of the ones that travelled furthest.",
  alternates: { canonical: "/launches" },
};

export default function LaunchesPage() {
  return (
    <SitePage label="Launches" title="Launched from the hub.">
      <ul className="launches">
        {LAUNCHES.map((l) => (
          <li key={l.company}>
            {l.on === "file" ? (
              <video className="frame" src={`${l.href}#t=1`} controls preload="metadata" playsInline />
            ) : (
              <a
                className="frame"
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Watch ${l.company}’s launch on ${l.on}`}
              >
                {l.thumb ? (
                  <img src={l.thumb} alt="" loading="lazy" referrerPolicy="no-referrer" />
                ) : (
                  <span className="name">{l.company}</span>
                )}
                <span className="play" aria-hidden="true" />
              </a>
            )}
            <div className="meta mono">
              <span>{l.on === "file" ? "Plays here" : `Watch on ${l.on} ↗`}</span>
              {l.note && <span>{l.note}</span>}
            </div>
            <h2>{l.company}</h2>
            <p>{l.what}</p>
          </li>
        ))}
      </ul>
    </SitePage>
  );
}
