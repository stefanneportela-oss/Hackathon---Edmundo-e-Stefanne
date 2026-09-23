import { useEffect, useRef, useState } from "react";

/**
 * TextReveal — scroll-driven, word-by-word text reveal.
 *
 * A minimalist transition section placed right before Services. The full
 * sentence starts dim (near-invisible); as the user scrolls through the
 * section, each word lights up individually from left to right, synced to the
 * scroll progress. The word crossing the "active" threshold briefly glows in
 * Primary Blue (#0066FF) before settling into pure white.
 *
 * Implementation notes:
 *  - No animation library needed: a lightweight scroll listener (throttled with
 *    requestAnimationFrame) maps the section's position in the viewport to a
 *    0..1 progress value, and each word compares its own threshold against it.
 *  - Per-word reveal state lives in a single React state array, updated only
 *    when a word's stage actually changes (dim → glow → lit), so there's no
 *    churn on every frame.
 *  - Fully transparent so the global infinite background shows through.
 *  - Respects prefers-reduced-motion (reveals everything immediately).
 */
const SENTENCE =
  "Soluções digitais para os desafios de hoje e as oportunidades de amanhã";

const WORDS = SENTENCE.split(" ");

const DIM = 0.15; // resting opacity of an un-revealed word (nearly invisible)
// Base RGB of an un-revealed word (#1A1A1A) → interpolated to pure white.
const DARK = [26, 26, 26];

export default function TextReveal() {
  const sectionRef = useRef(null);
  const raf = useRef(0);
  // Continuous 0..1 reveal amount per word (0 = dim, 1 = fully white).
  const [reveal, setReveal] = useState(() => WORDS.map(() => 0));

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) {
      setReveal(WORDS.map(() => 1));
      return;
    }

    const compute = () => {
      raf.current = 0;
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight || 1;

      // Overall scroll progress across the section (0..1).
      const start = vh * 0.85; // begin when the top passes 85% of the viewport
      const end = vh * 0.3; // finish when the top reaches 30%
      const progress = Math.min(
        1,
        Math.max(0, (start - rect.top) / (start - end))
      );

      // Spread the progress across the words. Each word occupies a slice; a
      // word reveals CONTINUOUSLY as the progress sweeps through its slice, and
      // the reveal is intentionally wider than one slice so neighbouring words
      // fade together — giving the soft left-to-right gradient of the reference.
      const span = 1.8 / WORDS.length; // fade width per word (feathered)
      setReveal((prev) => {
        let changed = false;
        const next = prev.map((v, i) => {
          const wordStart = (i / WORDS.length) * (1 - span);
          const local = (progress - wordStart) / span;
          const amount = Math.min(1, Math.max(0, local));
          if (Math.abs(amount - v) > 0.001) changed = true;
          return amount;
        });
        return changed ? next : prev;
      });
    };

    const onScroll = () => {
      if (!raf.current) raf.current = requestAnimationFrame(compute);
    };

    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="manifesto"
      aria-label={SENTENCE}
      className="relative flex min-h-[90vh] w-full items-center justify-center bg-transparent px-6 py-40 sm:py-52 lg:py-64"
    >
      <p
        className="mx-auto max-w-6xl text-center font-display font-black leading-[1.05] tracking-tight text-5xl"
        style={{ fontSize: "clamp(3rem, 8vw, 7.5rem)" }}
      >
        {WORDS.map((word, i) => {
          const amount = reveal[i];
          // Opacity ramps from DIM → 1 as the word reveals.
          const opacity = DIM + (1 - DIM) * amount;
          // Transient blue glow that peaks mid-reveal, then settles to white.
          const glow = Math.sin(Math.min(1, amount) * Math.PI); // 0→1→0
          // Colour interpolates dark(#1A1A1A) → white, with a blue tint at the
          // glow peak for the cinematic accent.
          const r = Math.round(DARK[0] + (255 - DARK[0]) * amount);
          const g = Math.round(DARK[1] + (255 - DARK[1]) * amount);
          const b = Math.round(
            DARK[2] + (255 - DARK[2]) * amount + 40 * glow // push toward blue at peak
          );
          return (
            <span key={`${word}-${i}`} className="inline-block">
              <span
                className="reveal-word"
                style={{
                  opacity,
                  color: `rgb(${r} ${g} ${Math.min(255, b)})`,
                  textShadow:
                    glow > 0.02
                      ? `0 0 ${(34 * glow).toFixed(1)}px rgba(0,102,255,${(
                          0.85 * glow
                        ).toFixed(2)}), 0 0 ${(12 * glow).toFixed(
                          1
                        )}px rgba(0,102,255,${(0.6 * glow).toFixed(2)})`
                      : "none",
                }}
              >
                {word}
              </span>
              {i < WORDS.length - 1 ? "\u00A0" : ""}
            </span>
          );
        })}
      </p>
    </section>
  );
}
