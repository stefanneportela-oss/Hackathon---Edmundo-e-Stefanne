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

const DIM = 0.18; // resting opacity of an un-revealed word

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
      className="relative flex w-full items-center justify-center bg-transparent px-6 py-36 sm:py-44 lg:py-52"
    >
      <p className="mx-auto max-w-5xl text-center font-display text-4xl font-bold leading-[1.2] tracking-tight sm:text-6xl lg:text-7xl">
        {WORDS.map((word, i) => {
          const amount = reveal[i];
          // Opacity ramps from DIM → 1. A transient blue glow peaks while the
          // word is mid-reveal, then fades as it settles into white.
          const opacity = DIM + (1 - DIM) * amount;
          const glow = Math.sin(Math.min(1, amount) * Math.PI); // 0→1→0
          return (
            <span key={`${word}-${i}`} className="inline-block">
              <span
                className="reveal-word"
                style={{
                  opacity,
                  color: `rgb(${Math.round(207 + 48 * (1 - glow))} ${Math.round(
                    228 + 27 * (1 - glow)
                  )} 255)`,
                  textShadow:
                    glow > 0.02
                      ? `0 0 ${(18 * glow).toFixed(1)}px rgba(0,102,255,${(
                          0.75 * glow
                        ).toFixed(2)})`
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
