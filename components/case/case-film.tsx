"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Captions, CaptionsOff, Maximize2, Pause, Play, RotateCcw, Volume2, VolumeX } from "lucide-react";
import type { CaseFilmData, FilmEngine } from "@/data/films";
import { trackEvent } from "@/lib/track";
import { MosaicImage } from "@/components/fx/mosaic-image";
import { CASE_TONES, TONE_GROUT } from "@/components/case/case-kit";

/**
 * The narrated case-study film, as the hero media of a /work page. Poster
 * first (resolving from tiles like any hero image), click to play with sound,
 * nothing preloaded. The chapter rail is laid as tiles: each chapter's width
 * is its share of the running time, and the tile fills as the film plays.
 */

type Status = "idle" | "playing" | "paused" | "ended";

const SEEK_STEP = 5;

/* Kept here rather than in data/films.ts, whose loader is server-only. */
const ENGINE_NAMES: Record<FilmEngine, string> = {
  remotion: "Remotion",
  hyperframes: "HyperFrames",
  brag: "Brag",
};

function filmEngineName(film: Pick<CaseFilmData, "engine" | "engineVersion">): string {
  const name = ENGINE_NAMES[film.engine];
  return film.engineVersion ? `${name} ${film.engineVersion}` : name;
}

function formatTime(seconds: number): string {
  const whole = Math.max(0, Math.floor(seconds));
  return `${Math.floor(whole / 60)}:${String(whole % 60).padStart(2, "0")}`;
}

/** Index of the chapter playing at `time`. */
function chapterAt(chapters: CaseFilmData["chapters"], time: number): number {
  let index = 0;
  chapters.forEach((c, i) => { if (time >= c.start) index = i; });
  return index;
}

export function CaseFilm({ film }: { film: CaseFilmData }) {
  const video = useRef<HTMLVideoElement>(null);
  const root = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [time, setTime] = useState(0);
  const [captionsOn, setCaptionsOn] = useState(true);
  const [muted, setMuted] = useState(false);
  const tracked = useRef(false);
  const titleId = useId();
  const transcriptId = useId();

  const tone = CASE_TONES[film.slug] ?? "night";
  const started = status !== "idle";
  const current = chapterAt(film.chapters, time);
  const duration = film.duration;

  // The <track> is `default`, so the browser shows it until told otherwise;
  // the toggle writes straight to the track's mode.
  useEffect(() => {
    const track = video.current?.textTracks[0];
    if (track) track.mode = captionsOn ? "showing" : "hidden";
  }, [captionsOn, started]);

  const play = useCallback(() => {
    const el = video.current;
    if (!el) return;
    void el.play();
    if (!tracked.current) {
      tracked.current = true;
      trackEvent("film_play", { project: film.slug });
    }
  }, [film.slug]);

  const toggle = useCallback(() => {
    const el = video.current;
    if (!el) return;
    if (el.paused || el.ended) play();
    else el.pause();
  }, [play]);

  const seek = useCallback((to: number) => {
    const el = video.current;
    if (!el) return;
    el.currentTime = Math.min(Math.max(0, to), duration);
    setTime(el.currentTime);
    if (el.paused || el.ended) play();
  }, [duration, play]);

  const toggleMute = () => {
    const el = video.current;
    if (!el) return;
    el.muted = !el.muted;
    setMuted(el.muted);
  };

  const fullscreen = () => {
    const el = root.current;
    const v = video.current as (HTMLVideoElement & { webkitEnterFullscreen?: () => void }) | null;
    if (el?.requestFullscreen) void el.requestFullscreen();
    // iOS Safari only fullscreens the <video> itself.
    else v?.webkitEnterFullscreen?.();
  };

  // Keys act on the film while the video itself is focused; the buttons keep their own.
  const onKey = (e: React.KeyboardEvent<HTMLVideoElement>) => {
    const key = e.key.toLowerCase();
    if (key === " " || key === "k") { e.preventDefault(); toggle(); }
    else if (key === "arrowright") { e.preventDefault(); seek(time + SEEK_STEP); }
    else if (key === "arrowleft") { e.preventDefault(); seek(time - SEEK_STEP); }
    else if (key === "m") toggleMute();
    else if (key === "c") setCaptionsOn((v) => !v);
    else if (key === "f") fullscreen();
  };

  const credit = [
    `Film made with ${filmEngineName(film)}`,
    film.voice && `Voice: ${film.voice} (open source)`,
    film.music && `Music: ${film.music}`,
  ].filter(Boolean).join(" · ");

  return (
    <div ref={root} className="film" data-status={status}>
      <div className="film-stage">
        <video
          ref={video}
          className="film-video"
          preload="none"
          playsInline
          poster={film.poster}
          tabIndex={0}
          aria-labelledby={titleId}
          aria-describedby={transcriptId}
          onKeyDown={onKey}
          onClick={started ? toggle : undefined}
          onPlay={() => setStatus("playing")}
          onPause={() => setStatus((s) => (s === "ended" ? s : "paused"))}
          onEnded={() => setStatus("ended")}
          onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
          onSeeked={(e) => setTime(e.currentTarget.currentTime)}
        >
          <source src={film.src} type="video/mp4" />
          <track kind="captions" srcLang="en" label="English" src={film.captions} default />
        </video>

        {/* The poster resolves from tiles as the page arrives and lifts once the film starts. */}
        <div className="film-poster" aria-hidden={started || undefined}>
          <MosaicImage
            src={film.poster}
            alt=""
            sizes="(max-width: 860px) 100vw, 92vw"
            priority
            play="load"
            coarseness={26}
            grout={TONE_GROUT[tone]}
            objectPosition="center"
          />
        </div>

        {status !== "playing" && (
          <button type="button" className="film-play" onClick={status === "ended" ? () => seek(0) : play} data-cursor-label={status === "ended" ? "Replay" : "Play"}>
            <span className="film-play-tile" aria-hidden="true">
              {status === "ended" ? <RotateCcw size={28} strokeWidth={2.2} /> : <Play size={28} strokeWidth={2.2} fill="currentColor" />}
            </span>
            <span className="film-play-text">
              <span id={titleId} className="film-play-title">{status === "ended" ? "Watch again" : status === "paused" ? "Resume" : "Play the film"}</span>
              <span className="film-play-meta">{film.title} · {formatTime(duration)} · narrated, with sound</span>
            </span>
          </button>
        )}
      </div>

      <div className="film-rail" role="group" aria-label="Chapters">
        {film.chapters.map((chapter, i) => {
          const end = film.chapters[i + 1]?.start ?? duration;
          const span = Math.max(end - chapter.start, 1);
          const progress = Math.min(Math.max((time - chapter.start) / span, 0), 1);
          return (
            <button
              key={chapter.start}
              type="button"
              className="film-chapter"
              aria-current={current === i && started ? "true" : undefined}
              aria-label={`${chapter.label}, ${formatTime(chapter.start)}`}
              onClick={() => seek(chapter.start)}
              style={{ "--span": span, "--progress": progress } as React.CSSProperties}
            >
              <span className="film-chapter-tile" aria-hidden="true" />
              <span className="film-chapter-label" aria-hidden="true">{chapter.label}</span>
              <span className="film-chapter-time" aria-hidden="true">{formatTime(chapter.start)}</span>
            </button>
          );
        })}
      </div>

      <div className="film-bar">
        <div className="film-controls">
          <button type="button" className="film-button" onClick={toggle} aria-label={status === "playing" ? "Pause" : "Play"}>
            {status === "playing" ? <Pause size={16} aria-hidden="true" /> : <Play size={16} aria-hidden="true" fill="currentColor" />}
          </button>
          <p className="film-time" aria-live="off">
            <span>{formatTime(time)}</span><span aria-hidden="true"> / </span><span>{formatTime(duration)}</span>
          </p>
          <p className="film-now">
            <span className="visually-hidden">Chapter: </span>{started ? film.chapters[current]?.label : `${film.chapters.length} chapters`}
          </p>
        </div>
        <div className="film-controls">
          <button type="button" className="film-button" onClick={() => setCaptionsOn((v) => !v)} aria-pressed={captionsOn} aria-label="Captions">
            {captionsOn ? <Captions size={16} aria-hidden="true" /> : <CaptionsOff size={16} aria-hidden="true" />}
            <span>CC</span>
          </button>
          <button type="button" className="film-button" onClick={toggleMute} aria-pressed={muted} aria-label="Mute">
            {muted ? <VolumeX size={16} aria-hidden="true" /> : <Volume2 size={16} aria-hidden="true" />}
          </button>
          <button type="button" className="film-button" onClick={fullscreen} aria-label="Full screen">
            <Maximize2 size={16} aria-hidden="true" />
          </button>
        </div>
      </div>

      <details className="film-transcript">
        <summary>Transcript</summary>
        <p id={transcriptId}>{film.transcript}</p>
      </details>
      <p className="film-credit">{credit}</p>
    </div>
  );
}
