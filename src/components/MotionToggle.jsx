import { useState, useEffect, useCallback } from "react";

/**
 * Floating accessibility control that pauses / resumes all site animations.
 *
 * How it works:
 * - Toggling adds/removes the `animations-paused` class on <html>.
 * - A single global CSS rule freezes every animation, transition and the
 *   carousel autoscroll while that class is present (see index.css).
 * - The choice is persisted in localStorage; if the user has the OS-level
 *   "reduce motion" preference on, animations start paused by default.
 */
const STORAGE_KEY = "senai:animations-paused";

function getInitialPaused() {
  if (typeof window === "undefined") return false;
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored !== null) return stored === "true";
  // Default to paused when the OS asks for reduced motion
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function MotionToggle() {
  const [paused, setPaused] = useState(getInitialPaused);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("animations-paused", paused);
    localStorage.setItem(STORAGE_KEY, String(paused));
  }, [paused]);

  const toggle = useCallback(() => setPaused((p) => !p), []);

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={paused}
      aria-label={paused ? "Retomar animações" : "Pausar animações"}
      title={paused ? "Retomar animações" : "Pausar animações"}
      className="group fixed bottom-5 right-5 z-[60] inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-black/50 text-white shadow-lg backdrop-blur-md transition-all duration-300 hover:border-brand-300/60 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-300 sm:h-14 sm:w-14"
    >
      {paused ? <PlayIcon /> : <PauseIcon />}
      <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-md border border-white/10 bg-black/80 px-2.5 py-1 text-xs font-medium text-white opacity-0 backdrop-blur transition-opacity duration-200 group-hover:opacity-100">
        {paused ? "Retomar animações" : "Pausar animações"}
      </span>
    </button>
  );
}

function PauseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <rect x="6" y="5" width="4" height="14" rx="1" />
      <rect x="14" y="5" width="4" height="14" rx="1" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M8 5.14v13.72a1 1 0 0 0 1.54.84l10.29-6.86a1 1 0 0 0 0-1.68L9.54 4.3A1 1 0 0 0 8 5.14z" />
    </svg>
  );
}
