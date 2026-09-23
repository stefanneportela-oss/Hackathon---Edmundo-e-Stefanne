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

// stage: 0 = dim, 1 = glowing (transient), 2 = lit white
export default function TextReveal() {
  const sectionRef = useRef(null);
  const raf = useRef(0);
  const [stages, setStages] = useState(() => WORDS.map(() => 0));

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) {
      setStages(WORDS.map(() => 2));
      return;
    }

    const compute = () => {
      raf.current = 0;
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight || 1;

      // Progress 0..1 across the middle band of the viewport. The reveal
      // completes a little before the section is fully scrolled past, so the
      // last word lights up while the phrase is still comfortably on screen.
      const start = vh * 0.85; // begin when the top passes 85% of the viewport
      const end = vh * 0.35; // finish when the top reaches 35%
      const progress = Math.min(
        1,
        Math.max(0, (start - rect.top) / (start - end))
      );

      setStages((prev) => {
        let changed = false;
        const next = prev.map((stage, i) => {
          // Even spread of thresholds across the words.
          const threshold = (i + 0.6) / WORDS.length;
          const glowBand = 0.06; // width of the transient glow window
          let s;
          if (progress >= threshold) s = 2; // fully lit
          else if (progress >= threshold - glowBand) s = 1; // glowing
          else s = 0; // dim
          if (s !== stage) changed = true;
          return s;
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
      className="relative flex w-full items-center justify-center bg-transparent px-6 py-36 sm:py-44 lg:py-52"
    >
      <p className="mx-auto max-w-5xl text-center font-display text-4xl font-bold leading-[1.15] tracking-tight sm:text-6xl lg:text-7xl">
        {WORDS.map((word, i) => (
          <span key={`${word}-${i}`} className="inline-block">
            <span
              className="reveal-word"
              data-stage={stages[i]}
              // Non-breaking space appended so words keep their spacing while
              // each stays an independent inline-block for the glow transform.
            >
              {word}
            </span>
            {i < WORDS.length - 1 ? "\u00A0" : ""}
          </span>
        ))}
      </p>
    </section>
  );
}
