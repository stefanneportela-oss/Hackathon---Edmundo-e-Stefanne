import { useRef, useEffect, useState } from "react";

/**
 * GlobalBackground — one continuous, infinite background for the whole site.
 *
 * A single fixed canvas behind all sections (fixed inset-0 z-0) so there are
 * no seams, cut lines or colour changes between Hero / Serviços / Projetos /
 * Sobre / Footer. Every section renders transparently on top of it.
 *
 * Layers (bottom → top):
 *  1. Pure-black base (#000).
 *  2. Cursor-tracked neon-blue glow (#0066FF). Invisible at rest; fades in and
 *     follows the pointer on movement; fades out (500ms) when the pointer
 *     stops or leaves the window.
 *  3. Subtle technical grid (.bg-grid) with a radial mask for soft edges.
 *
 * Touch / mobile:
 *  - Devices without a fine pointer never fire `pointermove`, so the cursor
 *    glow stays invisible and the backdrop would be a flat black grid.
 *    On those devices we swap the cursor glow for a set of slowly drifting
 *    "aurora" orbs, keeping the living neon atmosphere without a mouse.
 *
 * Performance:
 *  - pointer-events: none on the whole canvas so it never blocks clicks on
 *    buttons/cards above it.
 *  - Only CSS custom properties are written per frame (no React re-render);
 *    the paint stays on a single GPU-composited layer, sampled with rAF.
 *  - Tracks pointer at the window level (position: fixed → client coords map
 *    1:1 to the glow's coordinate space).
 */
export default function GlobalBackground() {
  const glowRef = useRef(null);
  const raf = useRef(0);
  const idleTimer = useRef(0);
  const pending = useRef(null);

  // Detect a real mouse. `(hover: hover) and (pointer: fine)` is true on
  // laptops/desktops and false on phones/tablets — where we show the aurora.
  const [hasMouse, setHasMouse] = useState(() =>
    typeof window === "undefined"
      ? true
      : window.matchMedia("(hover: hover) and (pointer: fine)").matches
  );

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => setHasMouse(mq.matches);
    sync();
    mq.addEventListener?.("change", sync);
    return () => mq.removeEventListener?.("change", sync);
  }, []);

  useEffect(() => {
    // Only track the cursor when a mouse is present.
    if (!hasMouse) return;
    const el = glowRef.current;
    if (!el) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const apply = () => {
      raf.current = 0;
      const p = pending.current;
      if (!p || !glowRef.current) return;
      glowRef.current.style.setProperty("--mx", `${p.x}px`);
      glowRef.current.style.setProperty("--my", `${p.y}px`);
      glowRef.current.style.setProperty("--glow-opacity", "1");
    };

    const onMove = (e) => {
      // Fixed layer → viewport (client) coordinates map directly.
      pending.current = { x: e.clientX, y: e.clientY };
      if (!raf.current) raf.current = requestAnimationFrame(apply);

      // Fade the glow out shortly after the pointer stops moving.
      window.clearTimeout(idleTimer.current);
      if (!prefersReduced) {
        idleTimer.current = window.setTimeout(() => {
          glowRef.current?.style.setProperty("--glow-opacity", "0");
        }, 320);
      }
    };

    const onLeave = () => {
      window.clearTimeout(idleTimer.current);
      glowRef.current?.style.setProperty("--glow-opacity", "0");
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    // Fade out when the cursor leaves the document/window entirely.
    document.addEventListener("pointerleave", onLeave);
    window.addEventListener("blur", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("blur", onLeave);
      if (raf.current) cancelAnimationFrame(raf.current);
      window.clearTimeout(idleTimer.current);
    };
  }, [hasMouse]);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-black"
    >
      {hasMouse ? (
        /* Desktop: cursor-following glow — hidden until the mouse moves */
        <div ref={glowRef} className="hero-cursor-glow absolute inset-0" />
      ) : (
        /* Touch / mobile: self-animating aurora orbs so the backdrop stays
           alive without a cursor. */
        <div className="absolute inset-0">
          <div
            className="aurora-orb aurora-a"
            style={{
              top: "-8%",
              left: "-10%",
              width: "70vw",
              height: "70vw",
              background:
                "radial-gradient(circle, rgba(0,188,255,0.28) 0%, rgba(0,188,255,0) 70%)",
            }}
          />
          <div
            className="aurora-orb aurora-b"
            style={{
              top: "30%",
              right: "-20%",
              width: "80vw",
              height: "80vw",
              background:
                "radial-gradient(circle, rgba(5,116,217,0.26) 0%, rgba(5,116,217,0) 70%)",
            }}
          />
          <div
            className="aurora-orb aurora-c"
            style={{
              bottom: "-15%",
              left: "10%",
              width: "60vw",
              height: "60vw",
              background:
                "radial-gradient(circle, rgba(0,102,255,0.22) 0%, rgba(0,102,255,0) 70%)",
            }}
          />
        </div>
      )}
      {/* Technical grid overlay with a soft radial mask */}
      <div className="bg-grid bg-grid--global absolute inset-0" />
    </div>
  );
}
