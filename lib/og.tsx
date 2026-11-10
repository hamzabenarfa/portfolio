import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import sharp from "sharp";
import { PROJECTS } from "@/data/consts";
import { PROJECT_CONTENT } from "@/data/project-content";

/**
 * Social share cards (Open Graph / X / LinkedIn / WhatsApp / Slack…) drawn in
 * the Tessera system: limewash ground, Sidi Bou blue, night, saffron, and a
 * mosaic of tiles. Every route's `opengraph-image.tsx` calls into this file so
 * the cards stay one family.
 */

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

const C = {
  wash: "#f2f3ef",
  wash2: "#e7e9e2",
  ink: "#0f1a36",
  ink2: "#4a5470",
  sidi: "#1a4fc4",
  night: "#0a2257",
  saffron: "#e8a93a",
  bloom: "#c7387a",
  onDark: "#f4f5f1",
};

const TONE: Record<string, string> = {
  b: C.sidi,
  n: C.night,
  s: C.saffron,
  r: C.bloom,
  w: C.wash2,
};

const fontFile = (name: string) => readFile(join(process.cwd(), "app/fonts", name));

async function loadFonts() {
  const [display, body, serif, mono] = await Promise.all([
    fontFile("inter-tight-normal-800.ttf"),
    fontFile("inter-tight-normal-500.ttf"),
    fontFile("instrument-serif-italic-400.ttf"),
    fontFile("jetbrains-mono-normal-500.ttf"),
  ]);
  return [
    { name: "Inter Tight", data: display, weight: 800 as const, style: "normal" as const },
    { name: "Inter Tight", data: body, weight: 500 as const, style: "normal" as const },
    { name: "Instrument Serif", data: serif, weight: 400 as const, style: "italic" as const },
    { name: "JetBrains Mono", data: mono, weight: 500 as const, style: "normal" as const },
  ];
}

/** Satori can't decode WebP, so screenshots are converted to a lean JPEG data URL. */
async function screenshot(publicPath: string): Promise<string | null> {
  try {
    const buf = await sharp(join(process.cwd(), "public", publicPath.replace(/^\//, "")))
      .resize({ width: 1100, withoutEnlargement: true })
      .jpeg({ quality: 82 })
      .toBuffer();
    return `data:image/jpeg;base64,${buf.toString("base64")}`;
  } catch {
    return null;
  }
}

/** Brand mark — the same 2×2 tile glyph as the site header (`bs/nb`). */
function Mark({ tile = 18 }: { tile?: number }) {
  const rows = ["bs", "nb"];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {rows.map((row, r) => (
        <div key={r} style={{ display: "flex", gap: 3 }}>
          {row.split("").map((t, i) => (
            <div key={i} style={{ width: tile, height: tile, background: TONE[t], borderRadius: 2 }} />
          ))}
        </div>
      ))}
    </div>
  );
}

/**
 * Deterministic mosaic: a field of tiles in the brand tones, denser toward the
 * outer edge, so the panel reads as tilework rather than noise.
 */
function Mosaic({ cols, rows, tile, gap, seed = 7 }: { cols: number; rows: number; tile: number; gap: number; seed?: number }) {
  // Pure hash-based noise in [0, 1): deterministic per tile and seed.
  const rand = (n: number) => {
    const x = Math.sin(n * 12.9898 + seed * 78.233) * 43758.5453;
    return x - Math.floor(x);
  };
  const palette = ["b", "b", "b", "n", "n", "s", "w", "w", "r"];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap }}>
      {Array.from({ length: rows }, (_, r) => (
        <div key={r} style={{ display: "flex", gap }}>
          {Array.from({ length: cols }, (_, c) => {
            const edge = c / (cols - 1); // 0 = inner edge, 1 = outer edge
            const i = r * cols + c;
            const empty = rand(i) > 0.25 + edge * 0.75;
            const tone = palette[Math.floor(rand(i + 1000) * palette.length)];
            return (
              <div
                key={c}
                style={{
                  width: tile,
                  height: tile,
                  borderRadius: 3,
                  background: empty ? "transparent" : TONE[tone],
                }}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}

interface CardProps {
  /** Small mono line above the title, e.g. "Case study · 2026". */
  eyebrow: string;
  /** Headline. Wrap a word in *asterisks* to set it in the italic serif accent. */
  title: string;
  description: string;
  /** Mono chips along the bottom (stack, location…). */
  tags?: string[];
  /** Public path of a screenshot; when set it replaces the mosaic panel. */
  image?: string | null;
}

function Headline({ text, size }: { text: string; size: number }) {
  const parts = text.split(/(\*[^*]+\*)/g).filter(Boolean);
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        fontFamily: "Inter Tight",
        fontWeight: 800,
        fontSize: size,
        lineHeight: 0.98,
        letterSpacing: -size * 0.035,
        color: C.ink,
      }}
    >
      {parts.map((p, i) =>
        p.startsWith("*") ? (
          <span
            key={i}
            style={{
              fontFamily: "Instrument Serif",
              fontStyle: "italic",
              fontWeight: 400,
              letterSpacing: -size * 0.01,
              color: C.sidi,
              fontSize: size * 1.08,
              marginRight: size * 0.22,
            }}
          >
            {p.slice(1, -1)}
          </span>
        ) : (
          p.split(" ").filter(Boolean).map((w, j) => (
            <span key={`${i}-${j}`} style={{ marginRight: size * 0.22 }}>
              {w}
            </span>
          ))
        ),
      )}
    </div>
  );
}

export async function renderOgCard({ eyebrow, title, description, tags = [], image }: CardProps) {
  const [fonts, shot] = await Promise.all([loadFonts(), image ? screenshot(image) : Promise.resolve(null)]);
  const plain = title.replace(/\*/g, "");
  const titleSize = plain.length > 30 ? 66 : plain.length > 18 ? 78 : 92;
  const leftWidth = shot ? 600 : 700;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: C.wash,
          fontFamily: "Inter Tight",
          overflow: "hidden",
        }}
      >
        {/* Right panel: night ground + mosaic accents (screenshot is drawn last, on top) */}
        {shot ? (
          <div style={{ position: "absolute", top: 0, right: 0, width: 500, height: 630, display: "flex", background: C.night }}>
            <div style={{ position: "absolute", top: 28, right: 28, display: "flex" }}>
              <Mosaic cols={6} rows={2} tile={20} gap={6} seed={11} />
            </div>
            <div style={{ position: "absolute", left: 140, bottom: 28, display: "flex" }}>
              <Mosaic cols={12} rows={2} tile={20} gap={6} seed={23} />
            </div>
          </div>
        ) : (
          <div style={{ position: "absolute", top: 34, right: 34, display: "flex" }}>
            <Mosaic cols={9} rows={11} tile={44} gap={8} seed={5} />
          </div>
        )}

        {/* Left column: text */}
        <div
          style={{
            width: leftWidth,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "56px 0 52px 64px",
            position: "relative",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <Mark />
            <div style={{ display: "flex", fontFamily: "JetBrains Mono", fontSize: 20, letterSpacing: 2, color: C.ink }}>
              HAMZA BENARFA
            </div>
            <div style={{ display: "flex", fontFamily: "JetBrains Mono", fontSize: 18, color: C.ink2 }}>/ benarfa.com</div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 26, paddingRight: 40 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                fontFamily: "JetBrains Mono",
                fontSize: 19,
                letterSpacing: 2,
                color: C.sidi,
                textTransform: "uppercase",
              }}
            >
              <div style={{ width: 12, height: 12, background: C.saffron, borderRadius: 2 }} />
              {eyebrow}
            </div>
            <Headline text={title} size={titleSize} />
            <div style={{ display: "flex", fontSize: 26, lineHeight: 1.38, color: C.ink2, fontWeight: 500 }}>
              {description}
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
            {tags.slice(0, 4).map((t) => (
              <div
                key={t}
                style={{
                  display: "flex",
                  fontFamily: "JetBrains Mono",
                  fontSize: 17,
                  color: C.ink,
                  padding: "7px 13px",
                  borderRadius: 6,
                  border: "1.5px solid rgba(15, 26, 54, 0.22)",
                }}
              >
                {t}
              </div>
            ))}
          </div>
        </div>

        {shot && (
          <div
            style={{
              position: "absolute",
              left: 630,
              top: 104,
              width: 640,
              height: 422,
              display: "flex",
              borderRadius: 14,
              overflow: "hidden",
              border: `6px solid ${C.onDark}`,
              boxShadow: "0 30px 70px rgba(10, 34, 87, 0.5)",
              background: C.onDark,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={shot} width={640} height={422} style={{ objectFit: "cover", objectPosition: "top left" }} alt="" />
          </div>
        )}
      </div>
    ),
    { ...OG_SIZE, fonts },
  );
}

/** Card for a `/work/<slug>` case study, built from the project data. */
export function renderCaseOg(slug: string) {
  const meta = PROJECTS.find((p) => p.slug === slug);
  const content = PROJECT_CONTENT[slug];
  return renderOgCard({
    eyebrow: `Case study${meta?.year ? ` · ${meta.year}` : ""}`,
    title: content?.title ?? slug,
    description: content?.subtitle ?? "",
    tags: meta?.tech.slice(0, 3) ?? [],
    image: meta?.image,
  });
}

export function caseOgAlt(slug: string) {
  const content = PROJECT_CONTENT[slug];
  return content ? `${content.title} — ${content.subtitle}, a case study by Hamza Benarfa` : "Hamza Benarfa — case study";
}
