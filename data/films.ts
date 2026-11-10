import { readFile, stat } from "node:fs/promises";
import path from "node:path";

/**
 * Case-study films. Each lives in public/videos/<slug>/ with a fixed set of
 * files (film.mp4, poster.jpg, captions.en.vtt, film.json) produced by the
 * video pipeline. Read on the server at build time so the page stays static,
 * and absent until the pipeline delivers: pages fall back to their hero image.
 */

export type FilmEngine = "remotion" | "hyperframes" | "brag";

export interface FilmChapter {
  /** Seconds from the start of the film. */
  start: number;
  label: string;
}

export interface CaseFilmData {
  slug: string;
  title: string;
  /** Seconds. */
  duration: number;
  engine: FilmEngine;
  engineVersion?: string;
  workflow?: string;
  voice?: string;
  music?: string;
  chapters: FilmChapter[];
  transcript: string;
  /** ISO date; from film.json when set, else the render's modification time. */
  uploadDate: string;
  src: string;
  poster: string;
  captions: string;
}

/** Seconds → ISO 8601 duration, as schema.org expects (PT1M2S). */
export function isoDuration(seconds: number): string {
  const whole = Math.round(seconds);
  const m = Math.floor(whole / 60);
  const s = whole % 60;
  return `PT${m ? `${m}M` : ""}${s}S`;
}

function isEngine(value: unknown): value is FilmEngine {
  return value === "remotion" || value === "hyperframes" || value === "brag";
}

function isChapter(value: unknown): value is FilmChapter {
  return (
    typeof value === "object" && value !== null &&
    typeof (value as FilmChapter).start === "number" && Number.isFinite((value as FilmChapter).start) &&
    typeof (value as FilmChapter).label === "string"
  );
}

/** Loads a case-study film, or null when the pipeline hasn't delivered one yet. Server only. */
export async function loadCaseFilm(slug: string): Promise<CaseFilmData | null> {
  const dir = path.join(process.cwd(), "public", "videos", slug);
  const file = (name: string) => path.join(dir, name);
  let raw: string;
  let renderedAt: Date;
  try {
    // All four files must exist; a half-delivered folder is treated as no film.
    const [json, video] = await Promise.all([
      readFile(file("film.json"), "utf8"),
      stat(file("film.mp4")),
      stat(file("poster.jpg")),
      stat(file("captions.en.vtt")),
    ]);
    raw = json;
    renderedAt = video.mtime;
  } catch {
    return null;
  }

  let meta: Record<string, unknown>;
  try {
    meta = JSON.parse(raw);
  } catch {
    console.warn(`[films] ${slug}/film.json is not valid JSON; skipping the film.`);
    return null;
  }

  const { title, duration, engine, chapters, transcript } = meta;
  if (
    typeof title !== "string" || typeof duration !== "number" || !Number.isFinite(duration) || duration <= 0 ||
    !isEngine(engine) || !Array.isArray(chapters) || !chapters.every(isChapter) || typeof transcript !== "string"
  ) {
    console.warn(`[films] ${slug}/film.json is missing required fields; skipping the film.`);
    return null;
  }

  const optional = (key: string) => (typeof meta[key] === "string" ? (meta[key] as string) : undefined);
  const base = `/videos/${slug}`;
  return {
    slug,
    title,
    duration,
    engine,
    engineVersion: optional("engineVersion"),
    workflow: optional("workflow"),
    voice: optional("voice"),
    music: optional("music"),
    chapters: [...chapters].sort((a, b) => a.start - b.start),
    transcript,
    uploadDate: optional("uploadDate") ?? renderedAt.toISOString().slice(0, 10),
    src: `${base}/film.mp4`,
    poster: `${base}/poster.jpg`,
    captions: `${base}/captions.en.vtt`,
  };
}
