/**
 * "Stage ready" signal shared by the tile curtain and page choreography.
 * Entrance animations wait for the curtain to start lifting, so the first
 * thing a visitor sees is the reveal itself rather than a half-played intro.
 */
type Listener = () => void;

let ready: boolean | null = null;
const listeners = new Set<Listener>();

function isReady() {
  if (ready === null) {
    // Before the curtain mounts, the inline head script is the source of truth.
    ready = typeof document === "undefined" || !document.documentElement.classList.contains("intro");
  }
  return ready;
}

/** Runs `fn` once the stage is visible. Returns an unsubscribe function. */
export function whenStageReady(fn: Listener): () => void {
  if (isReady()) {
    fn();
    return () => {};
  }
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function holdStage() {
  ready = false;
}

export function releaseStage() {
  ready = true;
  const pending = [...listeners];
  listeners.clear();
  pending.forEach((fn) => {
    try {
      fn();
    } catch (error) {
      console.error(error);
    }
  });
}

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && !window.matchMedia("(prefers-reduced-motion: no-preference)").matches;

export const hasFinePointer = () =>
  typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
