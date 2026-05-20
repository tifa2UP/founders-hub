#!/usr/bin/env node
import { writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { Resvg } from "@resvg/resvg-js";
import satori from "satori";

const ROOT = resolve(import.meta.dirname, "..");
const OUT = join(ROOT, "public/og.png");
const WIDTH = 1200;
const HEIGHT = 630;

const ACCENT = "#FF5722";
const BG = "#0a0a0a";
const FG = "#fafafa";
const MUTED = "#525252";
const SUBTLE = "#141414";

const FONT_URLS = {
  // Google Fonts API: family parameter -> font file URL
  // Resolved via the helper below.
  instrumentSerifItalic: {
    family: "Instrument Serif",
    style: "italic",
    weight: 400,
    css: "https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@1&display=swap",
  },
  instrumentSerif: {
    family: "Instrument Serif",
    style: "normal",
    weight: 400,
    css: "https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0&display=swap",
  },
  syneBold: {
    family: "Syne",
    style: "normal",
    weight: 700,
    css: "https://fonts.googleapis.com/css2?family=Syne:wght@700&display=swap",
  },
  spaceMono: {
    family: "Space Mono",
    style: "normal",
    weight: 400,
    css: "https://fonts.googleapis.com/css2?family=Space+Mono:wght@400&display=swap",
  },
};

async function fetchFont({ css }) {
  // Pretend to be a modern browser so Google sends woff2/ttf
  const cssText = await fetch(css, {
    headers: { "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)" },
  }).then((r) => r.text());
  const match = cssText.match(/url\((https:\/\/[^)]+\.(?:ttf|woff2?))\)/);
  if (!match) throw new Error(`Could not find font URL in CSS:\n${cssText}`);
  const arr = await fetch(match[1]).then((r) => r.arrayBuffer());
  return Buffer.from(arr);
}

async function loadFonts() {
  const entries = await Promise.all(
    Object.entries(FONT_URLS).map(async ([key, def]) => [
      key,
      { ...def, data: await fetchFont(def) },
    ]),
  );
  return Object.fromEntries(entries);
}

function template() {
  // JSX-free Satori tree. Using React.createElement-style objects.
  const h = (type, props, ...children) => ({
    type,
    props: { ...props, children: children.length === 1 ? children[0] : children },
  });

  return h(
    "div",
    {
      style: {
        width: WIDTH,
        height: HEIGHT,
        background: BG,
        color: FG,
        display: "flex",
        flexDirection: "column",
        position: "relative",
        fontFamily: "Syne",
        padding: 64,
      },
    },
    // Huge background "03" — decorative, behind everything
    h(
      "div",
      {
        style: {
          position: "absolute",
          right: 40,
          bottom: -160,
          fontSize: 560,
          fontFamily: "Instrument Serif",
          color: SUBTLE,
          lineHeight: 0.85,
          letterSpacing: "-0.04em",
          display: "flex",
        },
      },
      "03",
    ),

    // Top row: FH lockup + OSLO label
    h(
      "div",
      {
        style: {
          display: "flex",
          alignItems: "center",
          gap: 24,
          fontFamily: "Syne",
          fontWeight: 700,
          fontSize: 22,
          letterSpacing: "0.15em",
        },
      },
      h("span", { style: { color: FG } }, "FH"),
      h(
        "span",
        {
          style: {
            display: "flex",
            width: 1,
            height: 24,
            background: MUTED,
          },
        },
        "",
      ),
      h(
        "span",
        { style: { color: MUTED, fontFamily: "Space Mono", fontSize: 16, letterSpacing: "0.3em" } },
        "OSLO",
      ),
    ),

    // Spacer
    h("div", { style: { display: "flex", flexGrow: 1 } }, ""),

    // Headline block
    h(
      "div",
      { style: { display: "flex", flexDirection: "column", gap: 24 } },
      // Accent bar + meta
      h(
        "div",
        {
          style: { display: "flex", alignItems: "center", gap: 24 },
        },
        h("div", { style: { display: "flex", width: 60, height: 4, background: ACCENT } }, ""),
        h(
          "span",
          {
            style: {
              fontFamily: "Space Mono",
              fontSize: 16,
              letterSpacing: "0.3em",
              color: MUTED,
              textTransform: "uppercase",
            },
          },
          "Oslo — Est. 2026",
        ),
      ),
      // The big headline
      h(
        "div",
        {
          style: {
            display: "flex",
            flexDirection: "row",
            alignItems: "baseline",
            gap: 32,
            fontFamily: "Instrument Serif",
            fontSize: 200,
            lineHeight: 0.85,
            letterSpacing: "-0.03em",
          },
        },
        h("span", { style: { color: FG } }, "Founders"),
        h(
          "span",
          { style: { color: ACCENT, fontStyle: "italic", fontFamily: "Instrument Serif" } },
          "Hub.",
        ),
      ),
      // Tagline
      h(
        "div",
        {
          style: {
            fontFamily: "Syne",
            fontWeight: 700,
            fontSize: 24,
            color: MUTED,
            marginTop: 16,
            maxWidth: 720,
            lineHeight: 1.4,
            display: "flex",
          },
        },
        "Norway's home for the AI founders building world-class companies.",
      ),
    ),
  );
}

async function main() {
  console.log("✓ Loading fonts...");
  const fonts = await loadFonts();

  console.log("✓ Rendering SVG via satori...");
  const svg = await satori(template(), {
    width: WIDTH,
    height: HEIGHT,
    fonts: [
      { name: "Instrument Serif", data: fonts.instrumentSerif.data, weight: 400, style: "normal" },
      {
        name: "Instrument Serif",
        data: fonts.instrumentSerifItalic.data,
        weight: 400,
        style: "italic",
      },
      { name: "Syne", data: fonts.syneBold.data, weight: 700, style: "normal" },
      { name: "Space Mono", data: fonts.spaceMono.data, weight: 400, style: "normal" },
    ],
  });

  console.log("✓ Rasterizing to PNG via resvg...");
  const png = new Resvg(svg, {
    fitTo: { mode: "width", value: WIDTH },
  })
    .render()
    .asPng();

  writeFileSync(OUT, png);
  console.log(`✓ Wrote ${OUT} (${(png.length / 1024).toFixed(1)} KB)`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
