import React from "react";
import {
  AbsoluteFill,
  Img,
  Sequence,
  staticFile,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const FPS = 30;

// ── Brand tokens (echo the D-Talk case-study page: dark, magenta accent) ──
const BG = "#0c0a0f";
const ACCENT = "#e11d74";
const INK = "#f6f3ef";
const MUTED = "#a49aa2";
const SANS =
  '"Inter Tight", Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif';
const MONO = 'ui-monospace, "JetBrains Mono", "SF Mono", Menlo, monospace';

// ── Timeline (30fps) ──
const INTRO = 90; // 3s
const SHOT = 180; // 6s each
const OUTRO = 90; // 3s

type Shot = { src: string; caption: string; kicker: string };

const SHOTS: Shot[] = [
  {
    src: "dtalk-landing-full.webp",
    kicker: "01 — Marketplace",
    caption: "Designers sell artwork & garment templates to brand accounts",
  },
  {
    src: "dtalk-service.webp",
    kicker: "02 — Customize",
    caption: "Brands customize on a real-time, multiplayer canvas editor",
  },
  {
    src: "dtalk-ai.webp",
    kicker: "03 — Discover",
    caption: "A guided finder surfaces matching designs from the catalogue",
  },
  {
    src: "dtalk-about-us.webp",
    kicker: "04 — Operate",
    caption: "Deposit for a sample, approve it, then pay to start bulk production",
  },
];

export const DTALK_DURATION = INTRO + SHOTS.length * SHOT + OUTRO;

// Subtle film grain + vignette so flat screenshots sit in an atmosphere.
const Atmosphere: React.FC = () => (
  <AbsoluteFill style={{ pointerEvents: "none" }}>
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(120% 90% at 50% 0%, rgba(225,29,116,0.14), transparent 55%)",
      }}
    />
    <AbsoluteFill
      style={{
        boxShadow: "inset 0 0 320px 90px rgba(0,0,0,0.75)",
      }}
    />
  </AbsoluteFill>
);

const Chrome: React.FC = () => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [0, DTALK_DURATION - 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <>
      <div
        style={{
          position: "absolute",
          top: 56,
          left: 64,
          fontFamily: MONO,
          fontSize: 24,
          letterSpacing: 6,
          color: INK,
          textTransform: "uppercase",
        }}
      >
        D<span style={{ color: ACCENT }}>·</span>Talk
      </div>
      <div
        style={{
          position: "absolute",
          top: 66,
          right: 64,
          fontFamily: MONO,
          fontSize: 18,
          letterSpacing: 3,
          color: MUTED,
        }}
      >
        B2B FASHION MARKETPLACE
      </div>
      {/* progress filament */}
      <div
        style={{
          position: "absolute",
          left: 0,
          bottom: 0,
          height: 4,
          width: `${progress * 100}%`,
          background: ACCENT,
        }}
      />
    </>
  );
};

const ShotScene: React.FC<Shot & { index: number }> = ({ src, caption, kicker, index }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Ken Burns: slow zoom + drift, alternating direction per shot.
  const dir = index % 2 === 0 ? 1 : -1;
  const scale = interpolate(frame, [0, SHOT], [1.06, 1.14]);
  const driftX = interpolate(frame, [0, SHOT], [0, 26 * dir]);

  const fade = interpolate(
    frame,
    [0, 16, SHOT - 18, SHOT],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const capRise = spring({ frame: frame - 10, fps, config: { damping: 200 } });
  const capY = interpolate(capRise, [0, 1], [40, 0]);

  return (
    <AbsoluteFill style={{ opacity: fade }}>
      <AbsoluteFill
        style={{ transform: `scale(${scale}) translateX(${driftX}px)` }}
      >
        <Img
          src={staticFile(src)}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </AbsoluteFill>
      {/* legibility gradient */}
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(0deg, rgba(12,10,15,0.92) 0%, rgba(12,10,15,0.35) 34%, transparent 62%)",
        }}
      />
      {/* lower-left caption */}
      <div
        style={{
          position: "absolute",
          left: 72,
          bottom: 96,
          maxWidth: 1180,
          transform: `translateY(${capY}px)`,
          opacity: capRise,
        }}
      >
        <div
          style={{
            fontFamily: MONO,
            fontSize: 22,
            letterSpacing: 4,
            color: ACCENT,
            textTransform: "uppercase",
            marginBottom: 18,
          }}
        >
          {kicker}
        </div>
        <div style={{ display: "flex", gap: 26 }}>
          <div style={{ width: 5, background: ACCENT, borderRadius: 4 }} />
          <div
            style={{
              fontFamily: SANS,
              fontSize: 58,
              lineHeight: 1.1,
              fontWeight: 600,
              color: INK,
              letterSpacing: -0.5,
            }}
          >
            {caption}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const TitleCard: React.FC<{ outro?: boolean }> = ({ outro }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const rise = spring({ frame, fps, config: { damping: 200 } });
  const y = interpolate(rise, [0, 1], [60, 0]);
  const len = outro ? OUTRO : INTRO;
  const fade = interpolate(
    frame,
    [0, 14, len - 14, len],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        opacity: fade,
      }}
    >
      <div style={{ transform: `translateY(${y}px)`, textAlign: "center" }}>
        <div
          style={{
            fontFamily: SANS,
            fontSize: 168,
            fontWeight: 700,
            letterSpacing: -4,
            color: INK,
          }}
        >
          D<span style={{ color: ACCENT }}>·</span>Talk
        </div>
        <div
          style={{
            fontFamily: MONO,
            fontSize: 30,
            letterSpacing: 8,
            color: MUTED,
            textTransform: "uppercase",
            marginTop: 10,
          }}
        >
          {outro ? "demo.d-talk.co" : "A B2B fashion-tech marketplace"}
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const DtalkDemo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: BG }}>
      <Sequence durationInFrames={INTRO}>
        <TitleCard />
      </Sequence>

      {SHOTS.map((shot, i) => (
        <Sequence
          key={shot.src}
          from={INTRO + i * SHOT}
          durationInFrames={SHOT}
        >
          <ShotScene {...shot} index={i} />
        </Sequence>
      ))}

      <Sequence from={INTRO + SHOTS.length * SHOT} durationInFrames={OUTRO}>
        <TitleCard outro />
      </Sequence>

      <Atmosphere />
      <Chrome />
    </AbsoluteFill>
  );
};
