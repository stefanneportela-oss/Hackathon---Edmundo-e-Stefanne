import { motion, useReducedMotion } from "framer-motion";

/**
 * TextReveal — word-by-word text reveal that plays automatically when the
 * section scrolls into view, framed by floating portrait cards (like the
 * reference). Portraits sit around the edges and drift gently; the phrase
 * lights up word by word (dim → blue glow → white).
 *
 * - Fully transparent so the global infinite background shows through.
 * - Respects prefers-reduced-motion (static, fully-lit phrase; no drifting).
 */
const SENTENCE =
  "Soluções digitais para os desafios de hoje e as oportunidades de amanhã";

const WORDS = SENTENCE.split(" ");

// Floating portrait cards. Positions are placed toward the corners/sides so
// they frame the centred text (matching the reference). `hideOnMobile` trims
// the busier ones on small screens. Free-to-use Unsplash portraits.
const u = (id) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=320&h=380&q=80`;

const PORTRAITS = [
  { src: u("photo-1494790108377-be9c29b29330"), pos: "left-[3%] top-[6%]", size: "h-24 w-20 sm:h-28 sm:w-24", delay: 0.1 },
  { src: u("photo-1500648767791-00dcc994a43e"), pos: "left-[9%] top-[42%]", size: "h-24 w-20 sm:h-32 sm:w-28", delay: 0.25, hideOnMobile: true },
  { src: u("photo-1544005313-94ddf0286df2"), pos: "right-[3%] top-[4%]", size: "h-24 w-20 sm:h-28 sm:w-24", delay: 0.18 },
  { src: u("photo-1519085360753-af0119f7cbe7"), pos: "right-[8%] top-[40%]", size: "h-24 w-20 sm:h-32 sm:w-28", delay: 0.32, hideOnMobile: true },
  { src: u("photo-1507003211169-0a1dd7228f2d"), pos: "left-[6%] bottom-[6%]", size: "h-24 w-20 sm:h-28 sm:w-24", delay: 0.4, hideOnMobile: true },
  { src: u("photo-1506794778202-cad84cf45f1d"), pos: "right-[5%] bottom-[7%]", size: "h-24 w-20 sm:h-28 sm:w-24", delay: 0.48 },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
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

const portraitVariants = {
  hidden: { opacity: 0, scale: 0.85, y: 20 },
  visible: (delay) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", delay },
  }),
};

export default function TextReveal() {
  const reduced = useReducedMotion();

  return (
    <section
      id="manifesto"
      aria-label={SENTENCE}
      className="relative flex min-h-[80vh] w-full items-center justify-center overflow-hidden bg-transparent px-6 py-36 sm:py-44 lg:py-52"
    >
      {/* ===== Floating portrait cards (frame the text) ===== */}
      {PORTRAITS.map((p, i) => (
        <motion.div
          key={i}
          aria-hidden
          className={`pointer-events-none absolute z-0 ${p.pos} ${p.size} ${
            p.hideOnMobile ? "hidden lg:block" : ""
          }`}
          variants={reduced ? undefined : portraitVariants}
          custom={p.delay}
          initial={reduced ? undefined : "hidden"}
          whileInView={reduced ? undefined : "visible"}
          viewport={{ amount: 0.4 }}
        >
          <div className={reduced ? "" : "tr-float"} style={{ animationDelay: `${i * 0.7}s` }}>
            <div className="relative h-full w-full overflow-hidden rounded-2xl border border-white/10 shadow-[0_10px_40px_-12px_rgba(0,0,0,0.8)]">
              <img
                src={p.src}
                alt=""
                loading="lazy"
                draggable={false}
                className="h-full w-full object-cover"
              />
              {/* subtle dark tint to sit in the DS */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
          </div>
        </motion.div>
      ))}

      {/* ===== Centered reveal text ===== */}
      <motion.p
        className="relative z-10 mx-auto max-w-4xl text-center font-display font-black leading-[1.1] tracking-tight text-3xl"
        style={{ fontSize: "clamp(1.75rem, 4.5vw, 4rem)" }}
        variants={reduced ? undefined : container}
        initial={reduced ? undefined : "hidden"}
        whileInView={reduced ? undefined : "visible"}
        // No `once` → the reveal replays every time the section re-enters view.
        viewport={{ amount: 0.5 }}
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
