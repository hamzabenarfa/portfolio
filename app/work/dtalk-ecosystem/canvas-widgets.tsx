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

const ACCENT = '#c41e6b';
const INK = '#1c1917';

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
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#1c1917]/90 p-4 backdrop-blur-md sm:p-10"
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

interface ProductFigureProps {
  src: string;
  alt: string;
  dims: Dimensions;
  aspectClassName?: string;
  caption?: string;
  priority?: boolean;
  sizes?: string;
}

export function ProductFigure({
  src,
  alt,
  dims,
  aspectClassName = 'aspect-[16/10]',
  caption,
  priority,
  sizes,
}: ProductFigureProps) {
  const [open, setOpen] = useState(false);

  return (
    <figure>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Expand ${alt}`}
        className="group relative block w-full overflow-hidden rounded-[1.75rem] border border-black/10 bg-white text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/5"
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
            className="pointer-events-none absolute bottom-4 right-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-white opacity-0 transition-opacity group-hover:opacity-100"
            style={{ backgroundColor: `${INK}cc` }}
          >
            <Maximize2 className="h-3.5 w-3.5" /> Expand
          </span>
        </div>
      </button>
      {caption && <figcaption className="mt-3 text-xs text-[#9a948b]">{caption}</figcaption>}

      <AnimatePresence>
        {open && <Lightbox src={src} alt={alt} dims={dims} onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </figure>
  );
}

interface ScrubCanvasProps {
  src: string;
  alt: string;
  dims: Dimensions;
  caption?: string;
}

const AUTO_SCROLL_DURATION_S = 9;

export function ScrubCanvas({ src, alt, dims, caption }: ScrubCanvasProps) {
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

  return (
    <figure>
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <span className="text-xs uppercase tracking-[0.24em] text-[#9a948b]">Full landing capture</span>
        <span className="hidden items-center gap-2 text-xs text-[#9a948b] sm:inline-flex">
          <MousePointer2 className="h-3.5 w-3.5" style={{ color: ACCENT }} /> Hover to scroll
          <span className="text-[#d4cfc8]">/</span>
          <Smartphone className="h-3.5 w-3.5" style={{ color: ACCENT }} /> Hold on mobile
        </span>
      </div>

      <div
        ref={containerRef}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
        className="group relative h-[420px] w-full touch-none select-none overflow-hidden rounded-[1.75rem] border border-black/10 bg-white shadow-sm transition hover:shadow-lg sm:h-[480px] lg:h-[560px]"
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

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-white to-transparent" />

        <div className="pointer-events-none absolute bottom-3 right-3 top-3 w-[3px] rounded-full bg-black/8">
          <motion.div
            className="absolute inset-x-0 top-0 h-[18%] w-[3px] rounded-full"
            style={{ y: thumbY, backgroundColor: ACCENT }}
          />
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setOpen(true);
          }}
          aria-label={`Expand ${alt}`}
          className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-white opacity-0 transition-opacity group-hover:opacity-100"
          style={{ backgroundColor: `${INK}cc` }}
        >
          <Maximize2 className="h-3.5 w-3.5" /> Full page
        </button>
      </div>
      {caption && <figcaption className="mt-3 text-xs text-[#9a948b]">{caption}</figcaption>}

      <AnimatePresence>
        {open && <Lightbox src={src} alt={alt} dims={dims} onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </figure>
  );
}
