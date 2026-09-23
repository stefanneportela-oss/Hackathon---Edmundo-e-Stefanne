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

const CARD_W = 200; // card width (px)
const STEP = 186; // wheel/drag sensitivity (px per card-unit)
const RADIUS = 520; // ring radius (px) — distance from center to each card

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
  // Which card is currently centered — changes trigger the swap animation
  const [activeIndex, setActiveIndex] = useState(0);

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

      // Idle autoscroll (slow, continuous) — halted when motion is paused
      const motionPaused =
        document.documentElement.classList.contains("animations-paused");
      if (autoplay.current && !prefersReduced && !motionPaused) {
        target.current += dt * 0.09; // cards per second
      }

      // Ease pos -> target (inertia / smoothing)
      pos.current += (target.current - pos.current) * Math.min(dt * 7, 1);

      // Which card is centered right now? (wrapped, rounded)
      const centered = ((Math.round(pos.current) % N) + N) % N;
      setActiveIndex((prev) => (prev === centered ? prev : centered));

      setTick((t) => (t + 1) % 1000000);
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, []);

  // ---- Drag to rotate (pointer / touch) ----
  // Wheel/scroll control was intentionally removed: the deck is driven only by
  // the continuous autoplay spin + manual drag. Page scroll now passes through
  // the carousel normally.
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
        style={{ perspective: "1400px", touchAction: "pan-y" }}
      >
        <div
          className="absolute left-1/2 top-1/2"
          style={{
            transformStyle: "preserve-3d",
            transform: `translateZ(-${RADIUS}px)`,
          }}
        >
          {solutions.map((s, i) => {
            const d = distFor(i); // signed shortest distance from center
            const abs = Math.abs(d);

            const isCenter = abs < 0.5;

            // RING CAROUSEL (Framer 3D-curved model): cards sit around a
            // cylinder. Each is placed at an even angular step, rotated out to
            // face the viewer, then pushed out by the radius. The whole ring
            // shares one scroll variable, so spacing is perfectly uniform and
            // the loop is seamless.
            const angleStep = 26; // degrees between adjacent cards
            const angle = d * angleStep; // this card's angle on the ring

            // Depth-based cues (closer to front = bigger / brighter)
            const rad = (angle * Math.PI) / 180;
            const frontness = Math.cos(rad); // 1 at center, →0 at the sides
            const scale = 0.82 + Math.max(0, frontness) * 0.28; // 0.82 → 1.1
            const opacity = frontness < -0.2 ? 0 : Math.max(0, 0.35 + frontness * 0.65);
            const z = 100 + Math.round(frontness * 60);

            // Hide the cards on the far/back side of the ring
            if (abs > 3.6) return null;

            return (
              <article
                key={s.id}
                onClick={() => {
                  if (drag.current.moved) return;
                  target.current = i; // clicking rotates this card to front
                  pauseAutoplay();
                }}
                className="group absolute -translate-x-1/2 -translate-y-1/2 will-change-transform"
                style={{
                  width: CARD_W,
                  transform: `rotateY(${angle}deg) translateZ(${RADIUS}px) scale(${scale})`,
                  opacity,
                  zIndex: z,
                }}
              >
                {/* Glass gradient border on the active card (bright, fading) */}
                {isCenter && (
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 z-20 rounded-[14px] p-px"
                    style={{
                      background:
                        "linear-gradient(150deg, rgba(0,188,255,0.9) 0%, rgba(0,120,255,0.5) 30%, rgba(255,255,255,0.06) 55%, rgba(0,120,255,0.5) 78%, rgba(0,188,255,0.9) 100%)",
                      WebkitMask:
                        "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                      WebkitMaskComposite: "xor",
                      maskComposite: "exclude",
                    }}
                  />
                )}

                <div
                  key={isCenter ? `active-${activeIndex}` : undefined}
                  className={`relative aspect-[3/4] overflow-hidden rounded-[14px] border border-white/12 transition-[transform,background-color] duration-300 ease-out group-hover:scale-[1.05] ${
                    isCenter ? "bg-[#050b1a] animate-card-swap" : "bg-ink-800"
                  }`}
                >
                  <img
                    src={s.src}
                    alt={s.title}
                    draggable={false}
                    loading="lazy"
                    className={`h-full w-full object-cover ${
                      isCenter ? "animate-card-zoom" : ""
                    }`}
                  />
                  {/* Legibility gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
                  {/* Blue hover sweep */}
                  <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: "linear-gradient(135deg, rgba(0,102,255,0.28) 0%, transparent 55%)" }} />

                  {/* Animated sheen sweep on the active card */}
                  {isCenter && (
                    <div className="pointer-events-none absolute inset-0 overflow-hidden">
                      <div
                        className="animate-card-sheen absolute inset-y-0 -left-1/3 w-1/3"
                        style={{
                          background:
                            "linear-gradient(90deg, transparent, rgba(180,235,255,0.35), transparent)",
                        }}
                      />
                    </div>
                  )}

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
    </div>
  );
}
