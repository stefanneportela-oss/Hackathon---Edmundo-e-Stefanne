import { useRef, useEffect, useState, useCallback } from "react";
import { solutions } from "../data/solutions.js";

/**
 * Scroll-driven 3D arc ("fisheye") carousel.
 *
 * Mechanics:
 * - A single virtual position `pos` (in card units) is animated every frame
 *   toward `targetPos` with a lerp, giving smooth momentum / inertia.
 * - Each card computes its distance from center and maps it to rotateY,
 *   translateZ, vertical arc offset and scale — producing the concave arc.
 * - Indices wrap modulo N, so the deck loops infinitely in both directions.
 * - Idle autoscroll advances `targetPos` slowly; any wheel / drag / touch
 *   interaction pauses it instantly and resumes after a short delay.
 */

const CARD_W = 190; // base card width (px) — controls spacing between cards
const GAP = 26;
const STEP = CARD_W + GAP;

export default function SolutionsCarousel() {
  const stageRef = useRef(null);
  const pos = useRef(0); // animated position (card units)
  const target = useRef(0); // where we're easing toward
  const raf = useRef(0);
  const autoplay = useRef(true);
  const resumeTimer = useRef(0);
  const drag = useRef({ down: false, startX: 0, startTarget: 0, moved: false });

  // Force re-render each frame so transforms update (cheap: transforms only)
  const [, setTick] = useState(0);

  const N = solutions.length;

  const pauseAutoplay = useCallback(() => {
    autoplay.current = false;
    window.clearTimeout(resumeTimer.current);
    resumeTimer.current = window.setTimeout(() => {
      autoplay.current = true;
    }, 2200);
  }, []);

  // ---- Animation loop ----
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let last = performance.now();
    const tick = (now) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      // Idle autoscroll
      if (autoplay.current && !prefersReduced) {
        target.current += dt * 0.35; // cards per second
      }

      // Ease pos -> target (inertia / smoothing)
      pos.current += (target.current - pos.current) * Math.min(dt * 7, 1);

      setTick((t) => (t + 1) % 1000000);
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, []);

  // ---- Wheel: vertical + horizontal scroll drive the carousel ----
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const onWheel = (e) => {
      const delta =
        Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (Math.abs(delta) < 1) return;
      e.preventDefault();
      target.current += delta / STEP; // convert px scroll to card units
      pauseAutoplay();
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [pauseAutoplay]);

  // ---- Drag to scroll (pointer / touch) ----
  const onPointerDown = (e) => {
    drag.current = {
      down: true,
      startX: e.clientX,
      startTarget: target.current,
      moved: false,
    };
    e.currentTarget.setPointerCapture?.(e.pointerId);
    pauseAutoplay();
  };
  const onPointerMove = (e) => {
    if (!drag.current.down) return;
    const dx = e.clientX - drag.current.startX;
    if (Math.abs(dx) > 4) drag.current.moved = true;
    target.current = drag.current.startTarget - dx / STEP;
    pauseAutoplay();
  };
  const endDrag = (e) => {
    e.currentTarget?.releasePointerCapture?.(e.pointerId);
    setTimeout(() => (drag.current.down = false), 0);
  };

  // ---- Render helpers ----
  // Signed shortest distance from center for a given card index, wrapped.
  const distFor = (i) => {
    let d = i - pos.current;
    d = ((d % N) + N) % N; // 0..N
    if (d > N / 2) d -= N; // shortest path
    return d;
  };

  return (
    <div className="relative w-full select-none">
      {/* Ambient blue glow behind the arc */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(45% 55% at 50% 42%, rgba(0,102,255,0.22) 0%, rgba(0,102,255,0.08) 40%, transparent 72%)",
        }}
      />

      {/* Stage */}
      <div
        ref={stageRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        className="relative mx-auto h-[380px] cursor-grab active:cursor-grabbing sm:h-[440px]"
        style={{ perspective: "1200px", touchAction: "pan-y" }}
      >
        <div
          className="absolute left-1/2 top-1/2"
          style={{ transformStyle: "preserve-3d" }}
        >
          {solutions.map((s, i) => {
            const d = distFor(i);
            const abs = Math.abs(d);
            // Hide cards too far from center (keeps the arc tidy)
            if (abs > 4.2) return null;

            const isCenter = abs < 0.5;
            const x = d * STEP;
            const rotateY = d * -18; // tilt sides inward
            const translateZ = -abs * 90; // push sides back
            const arcY = abs * abs * 12; // concave vertical curve
            const scale = Math.max(0.72, 1 - abs * 0.08);
            const opacity = abs > 3.4 ? 0 : 1 - abs * 0.14;
            const z = 100 - Math.round(abs * 10);

            return (
              <article
                key={s.id}
                onClick={() => {
                  if (drag.current.moved) return;
                  target.current = i; // clicking centers the card
                  pauseAutoplay();
                }}
                className="group absolute -translate-x-1/2 -translate-y-1/2 will-change-transform"
                style={{
                  width: CARD_W,
                  transform: `translate3d(${x}px, ${arcY}px, ${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                  opacity,
                  zIndex: z,
                }}
              >
                <div
                  className={`relative aspect-[3/4] overflow-hidden rounded-[24px] border bg-ink-800 transition-[transform,border-color,box-shadow] duration-300 ease-out group-hover:scale-[1.05] ${
                    isCenter
                      ? "border-primary shadow-[0_0_36px_-6px_rgba(0,102,255,0.7)]"
                      : "border-white/12"
                  } group-hover:border-primary group-hover:shadow-[0_0_42px_-4px_rgba(0,102,255,0.85)]`}
                >
                  <img
                    src={s.src}
                    alt={s.title}
                    draggable={false}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                  {/* Legibility gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
                  {/* Blue hover sweep */}
                  <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: "linear-gradient(135deg, rgba(0,102,255,0.28) 0%, transparent 55%)" }} />

                  {/* Caption */}
                  <div className="absolute inset-x-0 bottom-0 p-4 text-left">
                    <span className="inline-block rounded-full border border-primary/50 bg-black/50 px-2.5 py-0.5 text-[10px] font-medium text-white/85 backdrop-blur">
                      {s.tag}
                    </span>
                    <h3
                      className={`mt-2 font-display text-base leading-tight transition-colors duration-300 ${
                        isCenter ? "text-white" : "text-white/80"
                      } group-hover:text-primary`}
                    >
                      {s.title}
                    </h3>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Hint */}
      <p className="mt-4 text-center text-xs text-muted">
        Role, arraste ou use a roda do mouse para navegar
      </p>
    </div>
  );
}
