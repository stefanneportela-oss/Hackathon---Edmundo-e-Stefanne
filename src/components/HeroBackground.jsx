import { useRef, useEffect } from "react";

/**
 * Cursor-driven gradient background for the Hero.
 *
 * The blue glow is INVISIBLE at rest. It fades in and follows the cursor's
 * position as the user moves the mouse, then fades back out when the mouse
 * stops moving or leaves the section. Reinterprets the reference in the SENAI
 * blue palette on a pure-black base.
 *
 * Performance notes:
 * - Only updates CSS custom properties (position + opacity) — no React
 *   re-render per frame, and the paint is a single GPU-composited layer.
 * - Movement is sampled with requestAnimationFrame.
 * - The idle fade-out is driven by a short timer that lowers opacity.
 */
export default function HeroBackground() {
  const glowRef = useRef(null);
  const raf = useRef(0);
  const idleTimer = useRef(0);
  const pending = useRef(null);

  useEffect(() => {
    const el = glowRef.current;
    if (!el) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // The section is the nearest positioned ancestor we track against.
    const section = el.closest("section") || el.parentElement;

    const apply = () => {
      raf.current = 0;
      const p = pending.current;
      if (!p || !glowRef.current) return;
      glowRef.current.style.setProperty("--mx", `${p.x}px`);
      glowRef.current.style.setProperty("--my", `${p.y}px`);
      // Reveal on movement
      glowRef.current.style.setProperty("--glow-opacity", "1");
    };

    const onMove = (e) => {
      const rect = section.getBoundingClientRect();
      pending.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
      if (!raf.current) raf.current = requestAnimationFrame(apply);

      // Reset the idle fade-out timer on every move
      window.clearTimeout(idleTimer.current);
      if (!prefersReduced) {
        idleTimer.current = window.setTimeout(() => {
          glowRef.current?.style.setProperty("--glow-opacity", "0");
        }, 260);
      }
    };

    const onLeave = () => {
      window.clearTimeout(idleTimer.current);
      glowRef.current?.style.setProperty("--glow-opacity", "0");
    };

    section.addEventListener("pointermove", onMove, { passive: true });
    section.addEventListener("pointerleave", onLeave);
    return () => {
      section.removeEventListener("pointermove", onMove);
      section.removeEventListener("pointerleave", onLeave);
      if (raf.current) cancelAnimationFrame(raf.current);
      window.clearTimeout(idleTimer.current);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-black"
    >
      {/* Cursor-following glow — hidden until the mouse moves */}
      <div ref={glowRef} className="hero-cursor-glow absolute inset-0" />
    </div>
  );
}
