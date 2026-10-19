'use client';

import { useEffect, useRef, useState } from 'react';
import type { PointerEvent as ReactPointerEvent } from 'react';
import Image from 'next/image';
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion';
import type { AnimationPlaybackControls } from 'framer-motion';
import { Maximize2, MousePointer2, Smartphone, X } from 'lucide-react';

export interface MediaDimensions {
  width: number;
  height: number;
}

/**
 * Per-case-study theming so every page gets the same image interactions
 * (hover motion, lightbox, scrub) without sharing a visual identity.
 */
export interface MediaTheme {
  /** Accent color (hex) — scroll thumb, hover hints. */
  accent: string;
  /** Ink color (hex) — expand-pill background. */
  ink: string;
  /** Page surface color (hex) — scrub fade gradient base. */
  surface: string;
  /** Muted text class for captions and hint rows, e.g. 'text-[#9a948b]'. */
  captionClass?: string;
  /** Scrub track color (any CSS color). Defaults to a soft black. */
  trackColor?: string;
}

const DEFAULT_THEME: MediaTheme = {
  accent: '#c41e6b',
  ink: '#1c1917',
  surface: '#ffffff',
  captionClass: 'text-[#9a948b]',
  trackColor: 'rgba(0,0,0,0.08)',
};

export function Lightbox({
  src,
  alt,
  dims,
  onClose,
}: {
  src: string;
  alt: string;
  dims: MediaDimensions;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      // Only one control lives in the dialog, so keep Tab on it rather than the page behind.
      if (e.key === 'Tab') {
        e.preventDefault();
        closeRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    // Lock the root scroller: <html> clips overflow-x in globals.css, so a body-only
    // overflow:hidden never reaches the viewport.
    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    const previousFocus = document.activeElement as HTMLElement | null;
    root.style.overflow = 'hidden';
    // Pages with smooth scrolling ignore overflow:hidden; pause the scroller too.
    window.__lenis?.stop();
    closeRef.current?.focus({ preventScroll: true });
    return () => {
      window.removeEventListener('keydown', onKey);
      root.style.overflow = previousOverflow;
      window.__lenis?.start();
      previousFocus?.focus({ preventScroll: true });
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#100e0d]/90 p-4 backdrop-blur-md sm:p-10"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={alt}
      data-lenis-prevent=""
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 14 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97, y: 8 }}
        transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
        className="relative max-h-[88vh] w-full max-w-4xl overflow-auto rounded-2xl border border-black/10 bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={src}
          alt={alt}
          width={dims.width}
          height={dims.height}
          className="block h-auto w-full"
          sizes="(max-width: 896px) 100vw, 896px"
          quality={92}
        />
      </motion.div>
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label="Close preview"
        className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20 sm:right-8 sm:top-8"
      >
        <X className="h-5 w-5" />
      </button>
    </motion.div>
  );
}

export interface ProductFigureProps {
  src: string;
  alt: string;
  dims: MediaDimensions;
  aspectClassName?: string;
  /** Frame styling so each case study keeps its own visual identity. */
  frameClassName?: string;
  caption?: string;
  priority?: boolean;
  sizes?: string;
  theme?: MediaTheme;
}

export function ProductFigure({
  src,
  alt,
  dims,
  aspectClassName = 'aspect-[16/10]',
  frameClassName = 'rounded-[1.75rem] border border-black/10 bg-white shadow-sm hover:shadow-xl hover:shadow-black/5',
  caption,
  priority,
  sizes,
  theme = DEFAULT_THEME,
}: ProductFigureProps) {
  const [open, setOpen] = useState(false);

  return (
    <figure>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Expand ${alt}`}
        className={`group relative block w-full overflow-hidden text-left transition hover:-translate-y-0.5 ${frameClassName}`}
      >
        <div className={`relative ${aspectClassName}`}>
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes ?? '(max-width: 768px) 100vw, 50vw'}
            className="object-cover object-top"
            quality={90}
            priority={priority}
          />
          <span
            className="pointer-events-none absolute bottom-4 right-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
            style={{ backgroundColor: `${theme.ink}cc` }}
          >
            <Maximize2 className="h-3.5 w-3.5" /> Expand
          </span>
        </div>
      </button>
      {caption && (
        <figcaption className={`mt-3 text-xs ${theme.captionClass ?? DEFAULT_THEME.captionClass}`}>
          {caption}
        </figcaption>
      )}

      <AnimatePresence>
        {open && <Lightbox src={src} alt={alt} dims={dims} onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </figure>
  );
}

export interface ScrubCanvasProps {
  src: string;
  alt: string;
  dims: MediaDimensions;
  caption?: string;
  label?: string;
  frameClassName?: string;
  theme?: MediaTheme;
}

const AUTO_SCROLL_DURATION_S = 9;

/**
 * Tall full-page capture that auto-scrolls inside a fixed frame on hover
 * (hold on touch), with a progress thumb and a lightbox for the full image.
 */
export function ScrubCanvas({
  src,
  alt,
  dims,
  caption,
  label = 'Full page capture',
  frameClassName = 'rounded-[1.75rem] border border-black/10 bg-white shadow-sm hover:shadow-lg',
  theme = DEFAULT_THEME,
}: ScrubCanvasProps) {
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const autoScrollControls = useRef<AnimationPlaybackControls | null>(null);
  const hoverRef = useRef(false);
  const [maxTranslate, setMaxTranslate] = useState(0);
  const [open, setOpen] = useState(false);

  const progress = useMotionValue(0);
  const smoothProgress = useSpring(progress, { stiffness: 90, damping: 20 });
  const y = useTransform(smoothProgress, (p) => `${-p * maxTranslate}px`);
  const thumbY = useTransform(smoothProgress, (p) => `${p * 82}%`);

  const stopAutoScroll = () => {
    autoScrollControls.current?.stop();
    autoScrollControls.current = null;
  };

  const startAutoScroll = () => {
    if (prefersReducedMotion || maxTranslate <= 0 || !hoverRef.current || autoScrollControls.current) return;
    const remaining = 1 - progress.get();
    if (remaining <= 0.001) return;
    autoScrollControls.current = animate(progress, 1, {
      duration: remaining * AUTO_SCROLL_DURATION_S,
      ease: 'linear',
    });
  };

  useEffect(() => {
    const measure = () => {
      if (!containerRef.current || !imageWrapRef.current) return;
      const containerHeight = containerRef.current.clientHeight;
      const imageHeight = imageWrapRef.current.scrollHeight;
      setMaxTranslate(Math.max(0, imageHeight - containerHeight));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (containerRef.current) ro.observe(containerRef.current);
    window.addEventListener('orientationchange', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('orientationchange', measure);
      stopAutoScroll();
    };
  }, []);

  useEffect(() => {
    startAutoScroll();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- restart only when the measured range changes
  }, [maxTranslate]);

  const handlePointerEnter = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse') return;
    hoverRef.current = true;
    startAutoScroll();
  };

  const handlePointerLeave = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse') return;
    hoverRef.current = false;
    stopAutoScroll();
    progress.set(0);
  };

  const handleTouchStart = () => {
    if (prefersReducedMotion || maxTranslate <= 0) return;
    stopAutoScroll();
    autoScrollControls.current = animate(progress, 1, { duration: AUTO_SCROLL_DURATION_S, ease: 'linear' });
  };

  const handleTouchEnd = () => {
    stopAutoScroll();
    autoScrollControls.current = animate(progress, 0, { duration: 0.7, ease: [0.16, 1, 0.3, 1] });
  };

  const captionClass = theme.captionClass ?? DEFAULT_THEME.captionClass;

  return (
    <figure>
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <span className={`text-xs uppercase tracking-[0.24em] ${captionClass}`}>{label}</span>
        <span className={`hidden items-center gap-2 text-xs sm:inline-flex ${captionClass}`}>
          <MousePointer2 className="h-3.5 w-3.5" style={{ color: theme.accent }} /> Hover to scroll
          <span aria-hidden="true">/</span>
          <Smartphone className="h-3.5 w-3.5" style={{ color: theme.accent }} /> Hold on mobile
        </span>
      </div>

      <div
        ref={containerRef}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
        className={`group relative h-[420px] w-full touch-none select-none overflow-hidden transition sm:h-[480px] lg:h-[560px] ${frameClassName}`}
      >
        <motion.div ref={imageWrapRef} style={{ y }} className="absolute inset-x-0 top-0">
          <Image
            src={src}
            alt={alt}
            width={dims.width}
            height={dims.height}
            className="block h-auto w-full"
            sizes="(max-width: 1024px) 100vw, 1024px"
            quality={90}
            priority
          />
        </motion.div>

        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-24"
          style={{ background: `linear-gradient(to top, ${theme.surface}, transparent)` }}
        />

        <div
          className="pointer-events-none absolute bottom-3 right-3 top-3 w-[3px] rounded-full"
          style={{ backgroundColor: theme.trackColor ?? DEFAULT_THEME.trackColor }}
        >
          <motion.div
            className="absolute inset-x-0 top-0 h-[18%] w-[3px] rounded-full"
            style={{ y: thumbY, backgroundColor: theme.accent }}
          />
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setOpen(true);
          }}
          aria-label={`Expand ${alt}`}
          className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-white opacity-0 transition-opacity focus-visible:opacity-100 group-hover:opacity-100"
          style={{ backgroundColor: `${theme.ink}cc` }}
        >
          <Maximize2 className="h-3.5 w-3.5" /> Full page
        </button>
      </div>
      {caption && <figcaption className={`mt-3 text-xs ${captionClass}`}>{caption}</figcaption>}

      <AnimatePresence>
        {open && <Lightbox src={src} alt={alt} dims={dims} onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </figure>
  );
}
