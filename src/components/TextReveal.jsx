import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

/**
 * TextReveal — giant, scroll-driven word-by-word text reveal (Framer Motion).
 *
 * A dramatic transition section placed right before Services. The full
 * sentence starts nearly invisible (#1A1A1A); as the user scrolls through the
 * section, each word lights up individually left → right, synced to scroll
 * progress via useScroll + useTransform. Each word briefly glows in Primary
 * Blue (#0066FF) at the moment it activates, then settles into pure white.
 *
 * - Fully transparent so the global infinite background shows through.
 * - Respects prefers-reduced-motion (renders the phrase fully lit, static).
 */
const SENTENCE =
  "Soluções digitais para os desafios de hoje e as oportunidades de amanhã";

const WORDS = SENTENCE.split(" ");

export default function TextReveal() {
  const sectionRef = useRef(null);
  const reduced = useReducedMotion();

  // Drive the reveal so the phrase finishes lighting up exactly when the
  // section is centred on screen: start when its top enters from the bottom of
  // the viewport, reach full reveal when its centre meets the viewport centre.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"],
  });

  return (
    <section
      ref={sectionRef}
      id="manifesto"
      aria-label={SENTENCE}
      className="relative flex min-h-[90vh] w-full items-center justify-center bg-transparent px-6 py-36 sm:py-44 lg:py-56"
    >
      <p
        className="mx-auto max-w-4xl text-center font-display font-black leading-[1.1] tracking-tight text-3xl"
        style={{ fontSize: "clamp(1.75rem, 4.5vw, 4rem)" }}
      >
        {WORDS.map((word, i) => (
          <Word
            key={`${word}-${i}`}
            word={word}
            index={i}
            total={WORDS.length}
            progress={scrollYProgress}
            reduced={reduced}
            last={i === WORDS.length - 1}
          />
        ))}
      </p>
    </section>
  );
}

function Word({ word, index, total, progress, reduced, last }) {
  // Feathered slice for this word: overlaps neighbours so the reveal reads as
  // a smooth left-to-right gradient rather than discrete steps.
  const span = 1.8 / total;
  const startAt = (index / total) * (1 - span);
  const midAt = startAt + span / 2;
  const endAt = startAt + span;

  // Opacity: dim (0.15) → full white.
  const opacity = useTransform(progress, [startAt, endAt], [0.15, 1]);
  // Colour: #1A1A1A → white, with a blue tint at the mid (glow) point.
  const color = useTransform(
    progress,
    [startAt, midAt, endAt],
    ["rgb(26,26,26)", "rgb(120,180,255)", "rgb(255,255,255)"]
  );
  // Transient neon glow, peaking mid-reveal.
  const textShadow = useTransform(
    progress,
    [startAt, midAt, endAt],
    [
      "0 0 0px rgba(0,102,255,0)",
      "0 0 34px rgba(0,102,255,0.85), 0 0 12px rgba(0,102,255,0.6)",
      "0 0 0px rgba(0,102,255,0)",
    ]
  );

  // Reduced motion: render fully lit and static.
  const style = reduced
    ? { opacity: 1, color: "#ffffff" }
    : { opacity, color, textShadow };

  return (
    <span className="inline-block">
      <motion.span className="inline-block" style={style}>
        {word}
      </motion.span>
      {!last ? "\u00A0" : ""}
    </span>
  );
}
