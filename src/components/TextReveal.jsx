import { motion, useReducedMotion } from "framer-motion";

/**
 * TextReveal — word-by-word text reveal that plays automatically when the
 * section scrolls into view (no scroll-scrubbing needed).
 *
 * The phrase starts nearly invisible (#1A1A1A). As soon as the section enters
 * the viewport, each word lights up in sequence (staggered), briefly glowing
 * in Primary Blue (#0066FF) before settling into pure white.
 *
 * - Fully transparent so the global infinite background shows through.
 * - Respects prefers-reduced-motion (renders the phrase fully lit, static).
 */
const SENTENCE =
  "Soluções digitais para os desafios de hoje e as oportunidades de amanhã";

const WORDS = SENTENCE.split(" ");

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const wordVariants = {
  hidden: {
    opacity: 0.15,
    color: "rgb(26,26,26)",
    textShadow: "0 0 0px rgba(0,102,255,0)",
  },
  visible: {
    opacity: [0.15, 1, 1],
    color: ["rgb(26,26,26)", "rgb(120,180,255)", "rgb(255,255,255)"],
    textShadow: [
      "0 0 0px rgba(0,102,255,0)",
      "0 0 34px rgba(0,102,255,0.85), 0 0 12px rgba(0,102,255,0.6)",
      "0 0 0px rgba(0,102,255,0)",
    ],
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

export default function TextReveal() {
  const reduced = useReducedMotion();

  return (
    <section
      id="manifesto"
      aria-label={SENTENCE}
      className="relative flex min-h-[80vh] w-full items-center justify-center bg-transparent px-6 py-36 sm:py-44 lg:py-52"
    >
      <motion.p
        className="mx-auto max-w-4xl text-center font-display font-black leading-[1.1] tracking-tight text-3xl"
        style={{ fontSize: "clamp(1.75rem, 4.5vw, 4rem)" }}
        variants={reduced ? undefined : container}
        initial={reduced ? undefined : "hidden"}
        whileInView={reduced ? undefined : "visible"}
        viewport={{ once: true, amount: 0.5 }}
      >
        {WORDS.map((word, i) => (
          <span key={`${word}-${i}`} className="inline-block">
            <motion.span
              className="inline-block"
              variants={reduced ? undefined : wordVariants}
              style={reduced ? { color: "#fff", opacity: 1 } : undefined}
            >
              {word}
            </motion.span>
            {i < WORDS.length - 1 ? "\u00A0" : ""}
          </span>
        ))}
      </motion.p>
    </section>
  );
}
