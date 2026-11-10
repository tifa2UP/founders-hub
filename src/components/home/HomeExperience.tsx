/* eslint-disable @next/next/no-img-element -- partner logos are small, pre-sized brand assets sized by CSS height */
"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

import { makeSun } from "./sunShader";
import "./home.css";

const CREED_LEAD = "Elite athletes have Olympiatoppen. Founders have this.";
const CREED_BODY =
  "Forty of Norway’s most ambitious founders share one floor at Youngstorget. We take no equity. When one of them makes it,";
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
    when: "Jun 2026",
    title: "Mimir raises $600k.",
    note: "Led by Sondo Capital, with angels from VILLOID, Kry, Enode and Whitson.",
    source: {
      label: "BeBeez",
      href: "https://bebeez.eu/2026/06/12/profitable-oslo-based-ai-startup-mimir-raises-e518-3k-pre-seed-to-automate-e-commerce-operations/",
    },
  },
  {
    when: "Summer 2026",
    title: "Audun into Y Combinator.",
    source: { label: "Y Combinator", href: "https://www.ycombinator.com/companies/audun" },
  },
  {
    when: "Aug 2026",
    title: "DNB, Amesto and Mesh Community join.",
    source: {
      label: "Shifter",
      href: "https://www.shifter.no/nyheter/dnb-gar-inn-i-founders-hub-det-er-kanskje-litt-unorsk/474817",
    },
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
  { when: "Oct 2026", title: "Verdane and Knowit join." },
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

// Closest orbit = closest to the founders.
const PLANETS = ["Founders", "Technology", "Research", "Industry", "Community", "Capital", "Policy"];
// Where each planet rests on its orbit, in degrees (90 is nearest the viewer). Chosen by hand so
// no label touches the sun or another label, and all of them fit a phone screen.
const PLANET_ANGLES = [35, 215, 110, 300, 70, 250, 280];

const LINKEDIN = "https://www.linkedin.com/company/foundershuboslo/";
const EMAIL = "andreas@founder-hub.com";
const NS = "http://www.w3.org/2000/svg";

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
    const hubSun = makeSun($<HTMLCanvasElement>("hubSun"));

    // Solar system
    const C = { x: 450, y: 450 };
    const TILT = 0.3;
    const groups = ["orbits", "orbitsFront", "nodes", "nodesBack"].map((id) => $(id));
    const mk = (tag: string, cls?: string) => {
      const node = document.createElementNS(NS, tag) as SVGElement;
      if (cls) node.setAttribute("class", cls);
      return node;
    };
    const planets = PLANETS.map((k, i) => {
      const rx = 92 + i * 56;
      const ry = rx * TILT;
      const orbit = mk("ellipse", "ring");
      orbit.setAttribute("cx", "450");
      orbit.setAttribute("cy", "450");
      orbit.setAttribute("rx", String(rx));
      orbit.setAttribute("ry", String(ry));
      const front = mk("path", "ring");
      front.setAttribute("d", `M${450 + rx},450 A${rx},${ry} 0 0 1 ${450 - rx},450`);
      for (const o of [orbit, front]) {
        o.setAttribute("pathLength", "1");
        o.style.strokeDasharray = "1";
        o.style.strokeDashoffset = "1";
      }
      $("orbits").appendChild(orbit);
      $("orbitsFront").appendChild(front);
      const g = mk("g", "cat");
      const dot = mk("circle", i === 0 ? "planet first" : "planet");
      const tx = mk("text");
      tx.textContent = k;
      g.appendChild(dot);
      g.appendChild(tx);
      g.style.opacity = "0";
      // The system is drawn once and then rests: every planet has a fixed place on its orbit.
      const a = (PLANET_ANGLES[i] * Math.PI) / 180;
      const pt = { x: C.x + Math.cos(a) * rx, y: C.y + Math.sin(a) * ry };
      const z = Math.sin(a);
      const depth = (z + 1) / 2;
      const r = i === 0 ? 9 : 6.5 - i * 0.35;
      dot.setAttribute("cx", String(pt.x));
      dot.setAttribute("cy", String(pt.y));
      dot.setAttribute("r", String(r * (0.75 + depth * 0.45)));
      const left = pt.x < C.x;
      tx.setAttribute("x", String(pt.x + (left ? -1 : 1) * (r + 10)));
      tx.setAttribute("y", String(pt.y + 5));
      if (left) tx.setAttribute("text-anchor", "end");
      (z < 0 && Math.abs(pt.x - C.x) < 70 ? $("nodesBack") : $("nodes")).appendChild(g);
      return { orbit, front, g, depth };
    });
    // Hockey-stick timeline
    const track = $("track");
    const hsBase = $("hsBase");
    const hsTrail = $("hsTrail");
    const hsHead = $("hsHead");
    const hsSvg = $("hs");
    const msEls = Array.from(track.querySelectorAll<HTMLElement>(".ms"));
    const hock = (x: number) => Math.pow(clamp(x), 3.2);
    const TL = { W: 1, rise: 300, base: 400 };
    const curve = (x0: number, x1: number) => {
      let d = "";
      for (let i = 0; i <= 80; i++) {
        const x = x0 + ((x1 - x0) * i) / 80;
        const y = TL.base - TL.rise * hock(x / TL.W);
        d += (i ? "L" : "M") + x.toFixed(1) + " " + y.toFixed(1);
      }
      return d;
    };
    const layoutTL = () => {
      msEls.forEach((m) => (m.style.transform = ""));
      // Collapse the curve first so a previous (wider) layout can't inflate the measurement.
      hsSvg.setAttribute("width", "0");
      TL.W = track.scrollWidth;
      TL.rise = Math.min(window.innerHeight * 0.42, 400);
      TL.base = track.offsetHeight + 44;
      hsSvg.setAttribute("width", String(TL.W));
      hsSvg.setAttribute("height", String(TL.base + 40));
      msEls.forEach((m) => {
        const x = m.offsetLeft + m.offsetWidth * 0.1;
        m.style.transform = `translateY(${-TL.rise * hock(x / TL.W)}px)`;
      });
      hsBase.setAttribute("d", curve(0, TL.W));
    };
    if (!reduce) {
      layoutTL();
      window.addEventListener("resize", layoutTL);
      document.fonts?.ready.then(layoutTL);
    }

    const line1 = Array.from($("line1").querySelectorAll(".w"));
    const line2 = Array.from($("line2").querySelectorAll(".w"));
    const scenes = { dawn: $("dawn"), creed: $("creed"), connect: $("connect"), momentum: $("momentum"), apply: $("apply") };
    const S = { dawn: 0, momentum: 0, apply: 0 };
    let last = performance.now();
    let creedOn = false;
    let connectStart = 0;
    let connectSettled = false;
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

      // 2. Creed: still text that fades in once
      if (!creedOn && (reduce || scenes.creed.getBoundingClientRect().top < window.innerHeight * 0.6)) {
        creedOn = true;
        $("creedCopy").classList.add("on");
      }

      // 3. Solar system: draws itself once, then rests
      if (onScreen(scenes.connect)) {
        if (!connectStart && (reduce || scenes.connect.getBoundingClientRect().top < window.innerHeight * 0.5)) {
          connectStart = now;
          $("cH").classList.add("on");
        }
        if (connectStart && !connectSettled) {
          const k = reduce ? 1 : clamp((now - connectStart) / 2400);
          planets.forEach((pl, i) => {
            const d = clamp((k - i * 0.09) / 0.4);
            const e = d * d * (3 - 2 * d);
            pl.orbit.style.strokeDashoffset = String(1 - e);
            pl.front.style.strokeDashoffset = String(1 - e);
            pl.g.style.opacity = d > 0.98 ? String(0.6 + pl.depth * 0.4) : "0";
          });
          $("glowC").setAttribute("opacity", String(clamp(k * 2)));
          connectSettled = k >= 1;
        }
        // Map the system's centre (450,450 in viewBox units) onto the page.
        const net = $<SVGSVGElement>("net");
        const front = $<SVGSVGElement>("netFront");
        const hub = $<HTMLCanvasElement>("hubSun");
        const wrapBox = net.parentElement!.getBoundingClientRect();
        const netBox = net.getBoundingClientRect();
        const nl = netBox.left - wrapBox.left;
        const nt = netBox.top - wrapBox.top;
        const nw = netBox.width;
        const nh = netBox.height;
        const scale = Math.min(nw / 900, nh / 440);
        const cx = nl + (nw - 900 * scale) / 2 + 450 * scale;
        const cy = nt + (nh - 440 * scale) / 2 + (450 - 230) * scale;
        const box = 160 * scale;
        Object.assign(front.style, { left: `${nl}px`, top: `${nt}px`, width: `${nw}px`, height: `${nh}px` });
        Object.assign(hub.style, { left: `${cx - box / 2}px`, top: `${cy - box / 2}px`, width: `${box}px`, height: `${box}px` });
        if (hubSun) hubSun.draw(time + 5, 44 * scale, 2);
      }

      // 4. Momentum: the hockey stick
      if (!reduce && onScreen(scenes.momentum)) {
        const m = S.momentum;
        const dist = Math.max(0, TL.W - window.innerWidth + window.innerWidth * 0.1);
        const hx = Math.max(8, m * TL.W);
        const hy = TL.base - TL.rise * hock(hx / TL.W);
        track.style.transform = `translate(${-m * dist}px, ${TL.rise * hock(m) * 0.92}px)`;
        hsTrail.setAttribute("d", curve(0, hx));
        hsHead.style.transform = `translate(${hx}px, ${hy}px)`;
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
      window.removeEventListener("resize", layoutTL);
      groups.forEach((g) => g.replaceChildren());
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
        <div className="wrap creed-copy reveal" id="creedCopy">
          <p className="creed-lead">{CREED_LEAD}</p>
          <p className="creed-body">
            {CREED_BODY} <span className="accent">{CREED_ACCENT}</span>
          </p>
        </div>
      </section>

      {/* 3. Solar system */}
      <section className="scene" id="connect">
        <div className="pin wrap">
          <div className="connect-copy">
            <h2 className="reveal" id="cH">
              When the best meet, everyone accelerates.
            </h2>
          </div>
          <div className="net-wrap">
            <svg
              id="net"
              className="net-svg"
              viewBox="0 230 900 440"
              role="img"
              aria-label="Founders Hub at the centre of a system of founders, technology, research, industry, community, capital and policy"
            >
              <defs>
                <radialGradient id="halo" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(251,138,34,.45)" />
                  <stop offset="100%" stopColor="rgba(251,138,34,0)" />
                </radialGradient>
              </defs>
              <g id="orbits" />
              <g id="nodesBack" />
              <circle cx="450" cy="450" r="170" fill="url(#halo)" id="glowC" opacity="0" />
            </svg>
            {/* The sun is a plain canvas layered between the back and front of the system,
                so every browser (Safari included) puts it exactly at the centre. */}
            <canvas id="hubSun" aria-hidden="true" />
            <svg id="netFront" className="net-svg" viewBox="0 230 900 440" aria-hidden="true">
              <g id="orbitsFront" />
              <g id="nodes" />
            </svg>
          </div>
        </div>
      </section>

      {/* 4. Momentum */}
      <section className="scene" id="momentum">
        <div className="pin">
          <div className="tl-track" id="track">
            {MILESTONES.map((m) => (
              <div key={m.when + m.title} className={`ms${m.you ? " you" : ""}`}>
                <span className="mono when">
                  {m.when}
                </span>
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
              </div>
            ))}
            <svg className="hs" id="hs" aria-hidden="true">
              <path className="hs-base" id="hsBase" />
              <path className="hs-trail" id="hsTrail" />
            </svg>
            <i className="sun hs-head" id="hsHead" aria-hidden="true" />
          </div>
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

      <footer>
        <div className="foot mono" style={{ borderTop: "1px solid var(--line)" }}>
          <span>Ship fast. Build global.</span>
          <a href={`mailto:${EMAIL}`}>Contact</a>
          <a href={LINKEDIN} target="_blank" rel="noopener noreferrer">
            LinkedIn ↗
          </a>
          <span>Mesh Youngstorget, Oslo</span>
        </div>
      </footer>
    </div>
  );
}
