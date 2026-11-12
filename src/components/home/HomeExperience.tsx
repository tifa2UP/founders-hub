/* eslint-disable @next/next/no-img-element -- partner logos are small, pre-sized brand assets sized by CSS height */
"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

import SiteFooter from "../site/SiteFooter";
import { LINKEDIN } from "../site/links";
import { makeSun } from "./sunShader";
import "./home.css";

const CREED_LEAD = "Elite athletes have Olympiatoppen. Founders have this.";
const CREED_BODY =
  "Twenty-five of Norway’s most ambitious founders share one floor at Youngstorget. When one of them makes it,";
const CREED_ACCENT = "all of us move forward.";

const LINE_ONE = ["Norway", "has", "built", "industries", "before."];
const LINE_TWO = ["The", "next", "one", "is", "rising", "now"];

const MILESTONES: {
  when: string;
  title: string;
  note?: string;
  source?: { label: string; href: string };
  you?: boolean;
}[] = [
  {
    when: "Jan 2026",
    title: "The doors open.",
    source: {
      label: "Finansavisen",
      href: "https://www.finansavisen.no/teknologi/2025/11/15/8306979/anders-mjaseth-og-trond-hauga-vil-skape-olympiatoppen-for-gruendere-gjennom-den-nye-satsingen-founders-hub",
    },
  },
  {
    when: "Spring 2026",
    title: "Ara into Y Combinator.",
    source: { label: "Y Combinator", href: "https://www.ycombinator.com/companies/reason-machines" },
  },
  {
    when: "Summer 2026",
    title: "Audun into Y Combinator.",
    source: { label: "Y Combinator", href: "https://www.ycombinator.com/companies/audun" },
  },
  {
    when: "Sep 2026",
    title: "Benford raises €5M.",
    note: "Led by firstminute capital, with Global Founders Capital and Sondo.",
    source: {
      label: "Tech.eu",
      href: "https://tech.eu/2026/09/22/benford-raises-eur5m-to-rebuild-financial-audit-from-the-ground-up/",
    },
  },
  {
    when: "Autumn 2026",
    title: "Native into Y Combinator.",
    source: { label: "Nordic 9", href: "https://nordic9.com/news/native-norway-joined-y-combinator-fall-2026/" },
  },
  { when: "Nov 2026", title: "Norway’s first physical AI hackathon.", note: "With Anthropic and Atech." },
  { when: "Next", title: "You", you: true },
];

const PARTNERS = [
  { name: "DNB", href: "https://www.dnb.no", src: "/brand/partner-dnb.png", className: "dnb" },
  { name: "Verdane", href: "https://www.verdane.com", src: "/brand/partner-verdane.png" },
  { name: "Knowit", href: "https://www.knowit.no", src: "/brand/partner-knowit.png" },
  { name: "Amesto", href: "https://www.amesto.no", src: "/brand/partner-amesto.png" },
  { name: "Mesh Community", href: "https://www.meshcommunity.com", src: "/brand/partner-mesh.png" },
];

const FACTS = [
  { n: "25", label: "seats on one floor" },
  { n: "3", label: "companies into Y Combinator in the first year" },
  { n: "0%", label: "equity taken" },
];

// The hockey stick: flat for a long time, then steep. Milestones sit on it, evenly spaced,
// and the curve keeps climbing past the last one.
const hock = (x: number) => Math.pow(x, 3.2);
const msX = (i: number) => i / MILESTONES.length;
const HS_PATH = Array.from({ length: 81 }, (_, i) => {
  const x = i / 80;
  return `${i ? "L" : "M"}${(x * 1000).toFixed(1)} ${(1000 - 1000 * hock(x)).toFixed(1)}`;
}).join("");

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));

export default function HomeExperience() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const $ = <T extends Element = HTMLElement>(id: string) => el.querySelector(`#${id}`) as T;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const target = (node: Element) => {
      const r = node.getBoundingClientRect();
      const span = r.height - window.innerHeight;
      // A zero-height viewport (hidden tab or panel) would divide by zero and freeze the scenes.
      return span > 0 ? clamp(-r.top / span) : 0;
    };
    const onScreen = (node: Element) => {
      const r = node.getBoundingClientRect();
      return r.bottom > 0 && r.top < window.innerHeight;
    };

    // Suns
    const heroSun = makeSun($<HTMLCanvasElement>("bigSun"));
    const applySun = makeSun($<HTMLCanvasElement>("applySun"));
    const line1 = Array.from($("line1").querySelectorAll(".w"));
    const line2 = Array.from($("line2").querySelectorAll(".w"));
    const scenes = { dawn: $("dawn"), apply: $("apply") };
    const S = { dawn: 0, apply: 0 };
    const once = Array.from(el.querySelectorAll("[data-once]"));
    let last = performance.now();
    let raf = 0;

    const frame = (now: number) => {
      const dt = Math.min(64, now - last);
      last = now;
      const ease = reduce ? 1 : 1 - Math.pow(0.02, (dt / 1000) * 1.4);
      (Object.keys(S) as (keyof typeof S)[]).forEach((k) => {
        const t = reduce ? 1 : target(scenes[k]);
        S[k] = Number.isFinite(S[k]) ? S[k] + (t - S[k]) * ease : t;
      });
      const time = reduce ? 20 : now / 1000;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      $("progress").style.width = `${(window.scrollY / max) * 100}%`;

      // 1. Sunrise: the sun climbs, then rises out of frame into the creed
      const p = S.dawn;
      const ex = clamp((Math.max(p, reduce ? 0 : target(scenes.dawn)) - 0.76) / 0.22);
      const exE = ex * ex;
      const big = $("bigSun");
      big.style.transform = `translate(-50%, ${73 - p * 80 - exE * 70}%)`;
      big.style.opacity = String(1 - exE);
      if (heroSun && onScreen(scenes.dawn)) heroSun.draw(time, big.clientWidth * 0.5 * 0.714, window.innerWidth < 820 ? 1 : 1.25);
      // The sky is fully dark by the time the scene unpins, so no edge shows against the creed.
      $("sky").style.opacity = String(clamp(p * 1.3) * (1 - ex));
      $("lockup").style.opacity = String(1 - clamp(p * 6));
      $("cue").style.opacity = String(1 - clamp(p * 8));
      if (onScreen(scenes.dawn)) {
      line1.forEach((w, i) => w.classList.toggle("on", p > 0.1 + i * 0.04 && p < 0.42));
      line2.forEach((w, i) => w.classList.toggle("on", p > 0.5 + i * 0.04 && p < 0.93));
      }

      // 2–4. Creed, numbers and timeline are still: each appears once when it scrolls into view.
      for (let i = once.length - 1; i >= 0; i--) {
        if (reduce || once[i].getBoundingClientRect().top < window.innerHeight * 0.72) {
          once[i].classList.add("on");
          once.splice(i, 1);
        }
      }

      // 5. Build with us: the sun takes the screen
      const ap = S.apply;
      if (onScreen(scenes.apply)) {
        const cv = $<HTMLCanvasElement>("applySun");
        const w = cv.clientWidth;
        const h = cv.clientHeight;
        const e = clamp(ap / 0.7);
        const s = e * e * (3 - 2 * e);
        const rpx = Math.min(w, h) * 0.06 + (Math.hypot(w, h) * 0.56 - Math.min(w, h) * 0.06) * s;
        if (applySun) applySun.draw(time + 11, rpx, 1);
        else cv.style.transform = `scale(${0.2 + e * 5.6})`;
      }
      $("applyCopy").classList.toggle("on", ap > 0.6);

      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="fh-home" ref={root}>
      <div className="progress" id="progress" />
      <header className="nav">
        <a href="#top" className="brand">
          <b>FOUNDERS HUB</b>
        </a>
        <ul className="mono">
          <li>
            <Link href="/companies">Companies</Link>
          </li>
          <li>
            <Link href="/news">News</Link>
          </li>
          <li>
            <Link href="/faq">FAQ</Link>
          </li>
          <li className="nav-li">
            <a href={LINKEDIN} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </li>
          <li>
            <Link href="/apply">Apply</Link>
          </li>
        </ul>
      </header>

      {/* 1. Sunrise */}
      <section className="scene" id="dawn">
        <div className="pin" id="top">
          <div className="sky" id="sky" />
          <canvas className="big-sun" id="bigSun" aria-hidden="true" />
          <div className="lockup" id="lockup">
            <i className="sun" />
            <b>FOUNDERS HUB</b>
          </div>
          <div className="cue" id="cue">
            <span />
          </div>
          <h1 className="line" id="line1" aria-label="Norway has built industries before.">
            {LINE_ONE.map((w) => (
              <span key={w}>
                <span className="w">{w === "industries" ? <em>{w}</em> : w}</span>{" "}
              </span>
            ))}
          </h1>
          <h1 className="line" id="line2" aria-label="The next one is rising now.">
            {LINE_TWO.map((w, i) => (
              <span key={w}>
                <span className="w">
                  {w}
                  {i === LINE_TWO.length - 1 && <i className="sun dot" />}
                </span>{" "}
              </span>
            ))}
          </h1>
        </div>
      </section>

      {/* 2. Creed */}
      <section className="scene" id="creed">
        <div className="afterglow" aria-hidden="true" />
        <div className="wrap creed-copy reveal" data-once>
          <p className="creed-lead">{CREED_LEAD}</p>
          <p className="creed-body">
            {CREED_BODY} <span className="accent">{CREED_ACCENT}</span>
          </p>
        </div>
      </section>

      {/* 3. The numbers */}
      <section className="scene" id="facts">
        <div className="wrap reveal" data-once>
          <div className="facts">
            {FACTS.map((f) => (
              <div key={f.label} className="fact">
                <p className="n">{f.n}</p>
                <p className="l">{f.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Momentum: the whole curve on one screen */}
      <section className="scene" id="momentum">
        <div className="wrap">
          <div className="tl" data-once>
            <svg className="hs" viewBox="0 0 1000 1000" preserveAspectRatio="none" aria-hidden="true">
              <path className="hs-base" d={HS_PATH} />
              <path className="hs-trail" d={HS_PATH} />
            </svg>
            <ol>
              {MILESTONES.map((m, i) => (
                <li
                  key={m.when + m.title}
                  className={`ms${m.you ? " you" : ""}`}
                  style={{ left: `${msX(i) * 100}%`, top: `${(1 - hock(msX(i))) * 100}%` }}
                >
                  <i className="sun pt" aria-hidden="true" />
                  <span className="mono when">{m.when}</span>
                  <h3>
                    {m.title}
                    {m.you && <i className="sun dot" />}
                  </h3>
                  {m.note && <p>{m.note}</p>}
                  {m.source && (
                    <a className="mono src" href={m.source.href} target="_blank" rel="noopener noreferrer">
                      {m.source.label} ↗
                    </a>
                  )}
                </li>
              ))}
            </ol>
          </div>
          <Link className="mono src tl-more" href="/news">
            All news →
          </Link>
        </div>
      </section>

      {/* 5. Build with us */}
      <section className="scene" id="apply">
        <div className="pin">
          <canvas id="applySun" aria-hidden="true" />
          <div className="apply-copy" id="applyCopy">
            <h2>Build with us.</h2>
            <p>Few get in.</p>
            <Link className="apply-btn" href="/apply">
              Apply <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Credits */}
      <section className="credits wrap" aria-label="Partners">
        <div className="cr-row">
          <span className="mono">Backed by</span>
          <div className="cr-logos big">
            {PARTNERS.map((p) => (
              <a key={p.name} href={p.href} target="_blank" rel="noopener noreferrer">
                <img className={p.className} src={p.src} alt={p.name} />
              </a>
            ))}
          </div>
        </div>
        <div className="cr-row">
          <span className="mono">Building with</span>
          <div className="cr-logos small">
            <img src="/brand/support-google.svg" alt="Google" />
            <img src="/brand/support-aws.svg" alt="Amazon Web Services" className="aws" />
            <img src="/brand/support-microsoft.svg" alt="Microsoft" />
            <img src="/brand/support-anthropic.svg" alt="Anthropic" />
            <img src="/brand/support-aiven.svg" alt="Aiven" />
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
