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

interface Dimensions {
  width: number;
  height: number;
}

/**
 * Small L-shaped registration marks at each corner — the recurring
 * "selected artboard" motif reused across every frame in this case study
 * (hero cover, in-page screenshots, and the scrub canvas below).
 */
function CornerMarks({ className = '' }: { className?: string }) {
  const corner = 'absolute h-3 w-3 border-[#FF3D82]/70';
  return (
    <div className={`pointer-events-none absolute inset-2 ${className}`} aria-hidden="true">
      <span className={`${corner} left-0 top-0 border-l-2 border-t-2`} />
      <span className={`${corner} right-0 top-0 border-r-2 border-t-2`} />
      <span className={`${corner} bottom-0 left-0 border-b-2 border-l-2`} />
      <span className={`${corner} bottom-0 right-0 border-b-2 border-r-2`} />
    </div>
  );
}

/** Floating "frame name" tag — doubles as a section eyebrow and an image label. */
export function FrameTag({ index, name }: { index: string; name: string }) {
  return (
    <div className="mb-3 inline-flex items-center gap-2 border border-dashed border-white/15 bg-[#131114] px-2.5 py-1.5">
      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#FF3D82]">{index}</span>
      <span className="h-3 w-px bg-white/15" aria-hidden="true" />
      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-400">{name}</span>
    </div>
  );
}

function Lightbox({
  src,
  alt,
  dims,
  onClose,
}: {
  src: string;
  alt: string;
  dims: Dimensions;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0b0a0c]/92 p-4 backdrop-blur-md sm:p-10"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={alt}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 14 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97, y: 8 }}
        transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
        className="relative max-h-[88vh] w-full max-w-4xl overflow-auto border border-dashed border-[#FF3D82]/40 bg-[#131114] shadow-[0_40px_120px_rgba(0,0,0,0.55)]"
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
        type="button"
        onClick={onClose}
        aria-label="Close preview"
        className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition hover:border-[#FF3D82]/60 hover:text-[#FF3D82] sm:right-8 sm:top-8"
      >
        <X className="h-5 w-5" />
      </button>
    </motion.div>
  );
}

interface TiltFrameProps {
  index: string;
  name: string;
  src: string;
  alt: string;
  dims: Dimensions;
  aspectClassName?: string;
  caption?: string;
  priority?: boolean;
  sizes?: string;
}

/**
 * A screenshot framed as a selected canvas artboard: dashed border, corner
 * registration marks, a floating frame tag, a cursor-driven 3D tilt (the
 * "hover" half of this page's signature interaction), and a click-to-expand
 * lightbox (the "click" half). Reduced-motion visitors keep the click
 * behaviour and simply lose the pointer-driven tilt.
 */
export function TiltFrame({
  index,
  name,
  src,
  alt,
  dims,
  aspectClassName = 'aspect-[16/10]',
  caption,
  priority,
  sizes,
}: TiltFrameProps) {
  const prefersReducedMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const rawRotateX = useMotionValue(0);
  const rawRotateY = useMotionValue(0);
  const rotateX = useSpring(rawRotateX, { stiffness: 260, damping: 24 });
  const rotateY = useSpring(rawRotateY, { stiffness: 260, damping: 24 });

  const handlePointerMove = (e: ReactPointerEvent<HTMLButtonElement>) => {
    if (prefersReducedMotion || e.pointerType !== 'mouse') return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rawRotateY.set(px * 12);
    rawRotateX.set(py * -12);
  };

  const handlePointerLeave = () => {
    rawRotateX.set(0);
    rawRotateY.set(0);
  };

  return (
    <figure>
      <FrameTag index={index} name={name} />
      <motion.button
        type="button"
        onClick={() => setOpen(true)}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        whileHover={{ scale: 1.012 }}
        whileTap={{ scale: 0.99 }}
        style={{ rotateX, rotateY, transformPerspective: 1000 }}
        aria-label={`Expand ${alt}`}
        className="group relative block w-full overflow-hidden border border-dashed border-white/20 bg-[#131114] text-left transition-colors hover:border-[#FF3D82]/50"
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
          <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <CornerMarks className="opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <span className="pointer-events-none absolute bottom-4 right-4 inline-flex translate-y-2 items-center gap-1.5 border border-[#FF3D82]/50 bg-[#131114]/90 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-[#FF3D82] opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <Maximize2 className="h-3 w-3" /> Expand
          </span>
        </div>
      </motion.button>
      {caption && <figcaption className="mt-3 font-mono text-xs text-zinc-500">{caption}</figcaption>}

      <AnimatePresence>
        {open && <Lightbox src={src} alt={alt} dims={dims} onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </figure>
  );
}

interface ScrubCanvasProps {
  index: string;
  name: string;
  src: string;
  alt: string;
  dims: Dimensions;
  caption?: string;
}

/**
 * Pans a very tall full-page capture inside a fixed-height viewport — the
 * flagship interaction of this case study, replacing the original's
 * CSS-transition auto-scroll. Desktop: cursor Y position maps directly to
 * scroll depth (hover-scrub, spring-smoothed). Touch: press-and-hold
 * triggers a slow reveal, the same mechanism the original used, since a
 * free-drag would fight the page's own vertical scroll. Either way, the
 * "Full capture" chip opens the whole image in a scrollable lightbox — a
 * fully keyboard-reachable alternative the original never had.
 */
export function ScrubCanvas({ index, name, src, alt, dims, caption }: ScrubCanvasProps) {
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const holdControls = useRef<AnimationPlaybackControls | null>(null);
  const [maxTranslate, setMaxTranslate] = useState(0);
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);

  const progress = useMotionValue(0);
  const smoothProgress = useSpring(progress, { stiffness: 90, damping: 20 });
  const y = useTransform(smoothProgress, (p) => `${-p * maxTranslate}px`);
  const thumbY = useTransform(smoothProgress, (p) => `${p * 82}%`);

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
    };
  }, []);

  const handlePointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || e.pointerType !== 'mouse' || maxTranslate <= 0) return;
    const rect = containerRef.current!.getBoundingClientRect();
    const p = Math.min(1, Math.max(0, (e.clientY - rect.top) / rect.height));
    progress.set(p);
  };

  const handlePointerEnter = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'mouse') setActive(true);
  };

  const handlePointerLeave = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse') return;
    setActive(false);
    progress.set(0);
  };

  const handleTouchStart = () => {
    setActive(true);
    if (prefersReducedMotion || maxTranslate <= 0) return;
    holdControls.current?.stop();
    holdControls.current = animate(progress, 1, { duration: 9, ease: 'linear' });
  };

  const handleTouchEnd = () => {
    setActive(false);
    holdControls.current?.stop();
    holdControls.current = animate(progress, 0, { duration: 0.7, ease: [0.16, 1, 0.3, 1] });
  };

  return (
    <figure>
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <FrameTag index={index} name={name} />
        <span className="hidden items-center gap-2 font-mono text-[10px] uppercase tracking-[0.15em] text-zinc-500 sm:inline-flex">
          <MousePointer2 className="h-3 w-3 text-[#FF3D82]" /> Hover to scrub
          <span className="text-zinc-700">/</span>
          <Smartphone className="h-3 w-3 text-[#FF3D82]" /> Hold on mobile
        </span>
      </div>

      <div
        ref={containerRef}
        onPointerMove={handlePointerMove}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
        className="group relative h-[420px] w-full touch-none select-none overflow-hidden border border-dashed border-white/20 bg-[#131114] transition-colors hover:border-[#FF3D82]/50 sm:h-[480px] lg:h-[560px]"
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

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-[#0d0c0e] to-transparent" />
        <CornerMarks className={`transition-opacity duration-300 ${active ? 'opacity-100' : 'opacity-0'}`} />

        {/* position minimap, mirroring a design tool's canvas scroll indicator */}
        <div className="pointer-events-none absolute bottom-3 right-3 top-3 w-[3px] bg-white/10">
          <motion.div className="absolute inset-x-0 top-0 h-[18%] w-[3px] bg-[#FF3D82]" style={{ y: thumbY }} />
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setOpen(true);
          }}
          aria-label={`Expand ${alt}`}
          className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 border border-[#FF3D82]/50 bg-[#131114]/90 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-[#FF3D82] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        >
          <Maximize2 className="h-3 w-3" /> Full capture
        </button>
      </div>
      {caption && <figcaption className="mt-3 font-mono text-xs text-zinc-500">{caption}</figcaption>}

      <AnimatePresence>
        {open && <Lightbox src={src} alt={alt} dims={dims} onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </figure>
  );
}
