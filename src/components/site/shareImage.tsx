import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

// Link previews (LinkedIn, X): one image per page, with the page's own title in it.
export const shareSize = { width: 1200, height: 630 };
export const shareType = "image/png";

const font = (file: string) => readFile(join(process.cwd(), "src/assets/fonts", file));

export async function shareImage(label: string, title: string) {
  const [serif, mono, monoBold] = await Promise.all([
    font("InstrumentSerif-Regular.ttf"),
    font("SpaceMono-Regular.ttf"),
    font("SpaceMono-Bold.ttf"),
  ]);
  const sun = "radial-gradient(circle at 50% 50%, #F9431A 0%, #FA6316 58%, #FB8A22 80%, #FFA834 100%)";
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "relative",
          background: "#060605",
          color: "#F2EFEA",
          padding: "64px 72px",
        }}
      >
        {/* The sun, rising from the lower right corner */}
        <div
          style={{
            position: "absolute",
            right: -240,
            bottom: -400,
            width: 560,
            height: 560,
            borderRadius: 560,
            background: sun,
            boxShadow: "0 0 140px 30px rgba(250,99,22,.45)",
          }}
        />
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ width: 30, height: 30, borderRadius: 30, background: sun, marginRight: 16 }} />
          <div style={{ fontFamily: "Space Mono", fontWeight: 700, fontSize: 28, letterSpacing: 1 }}>FOUNDERS HUB</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 840 }}>
          <div
            style={{
              fontFamily: "Space Mono",
              fontSize: 22,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: "#FFA834",
              marginBottom: 22,
            }}
          >
            {label}
          </div>
          <div style={{ fontFamily: "Instrument Serif", fontSize: title.length > 34 ? 82 : 100, lineHeight: 1, letterSpacing: -2 }}>
            {title}
          </div>
        </div>
      </div>
    ),
    {
      ...shareSize,
      fonts: [
        { name: "Instrument Serif", data: serif, weight: 400, style: "normal" },
        { name: "Space Mono", data: mono, weight: 400, style: "normal" },
        { name: "Space Mono", data: monoBold, weight: 700, style: "normal" },
      ],
    },
  );
}
