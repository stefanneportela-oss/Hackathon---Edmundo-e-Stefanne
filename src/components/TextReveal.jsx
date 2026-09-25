import { useEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

/**
 * TextReveal — high-impact statement section.
 *
 * A monumental phrase ("Você chega até nós com desafios, nós os transformamos
 * em oportunidades") with the word "desafios" highlighted with a neon glow,
 * framed by floating glassmorphism testimonial/solution cards arranged
 * organically around the sentence. Everything animates on scroll:
 *  - the phrase sharpens (blur + opacity 20 → 100) as it enters view;
 *  - the cards rise in a staggered cascade (y 40 → 0, opacity 0 → 1);
 *  - left/right cards drift at slightly different speeds (subtle parallax).
 *
 * Fully transparent so the global infinite background (bg-grid + mouse glow)
 * shows through. Respects prefers-reduced-motion and the global
 * `animations-paused` switch (renders static when motion is off).
 */

const EASE = [0.21, 0.47, 0.32, 0.98];

// Word-by-word reveal (from the previous TextReveal): each word lights up
// dim → blue glow → white, in sequence.
const phraseContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const wordVariants = {
  hidden: {
    opacity: 0.15,
    color: "rgb(40,40,40)",
    textShadow: "0 0 0px rgba(0,102,255,0)",
  },
  visible: {
    opacity: [0.15, 1, 1],
    color: ["rgb(40,40,40)", "rgb(120,180,255)", "rgb(255,255,255)"],
    textShadow: [
      "0 0 0px rgba(0,102,255,0)",
      "0 0 34px rgba(0,102,255,0.85), 0 0 12px rgba(0,102,255,0.6)",
      "0 0 0px rgba(0,102,255,0)",
    ],
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

/** True when the site-wide "animations-paused" class is on <html>. */
function useAnimationsPaused() {
  const [paused, setPaused] = useState(
    () =>
      typeof document !== "undefined" &&
      document.documentElement.classList.contains("animations-paused")
  );
  useEffect(() => {
    const root = document.documentElement;
    const sync = () => setPaused(root.classList.contains("animations-paused"));
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);
  return paused;
}

// Floating testimonial / solution cards, arranged asymmetrically around the
// phrase. `side` drives the parallax direction; `depth` its intensity.
const CARDS = [
  {
    id: 1,
    icon: "layers",
    text: "Otimizamos processos e escalamos com segurança.",
    pos: "left-[8%] top-[26%]",
    side: "left",
    depth: 1,
    delay: 0.1,
    hideOnMobile: true,
  },
  {
    id: 2,
    icon: "brain",
    text: "Buscamos inteligência artificial aplicada ao nosso core business.",
    pos: "right-[9%] top-[14%]",
    side: "right",
    depth: 1.4,
    delay: 0.2,
    hideOnMobile: true,
  },
  {
    id: 3,
    icon: "code",
    text: "Entregamos ecossistemas digitais de alta performance e código limpo.",
    pos: "left-[14%] bottom-[12%]",
    side: "left",
    depth: 1.7,
    delay: 0.3,
    hideOnMobile: true,
  },
  {
    id: 4,
    icon: "rocket",
    text: "Estratégia, arquitetura moderna e impacto real no mercado.",
    pos: "right-[11%] bottom-[18%]",
    side: "right",
    depth: 1.2,
    delay: 0.4,
    hideOnMobile: true,
  },
];

export default function TextReveal() {
  const reduced = useReducedMotion();
  const paused = useAnimationsPaused();
  const disabled = reduced || paused;

  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Parallax: left cards and right cards drift at slightly different speeds.
  const leftY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const rightY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section
      ref={sectionRef}
      id="manifesto"
      aria-label="Soluções digitais para os desafios de hoje e as oportunidades de amanhã"
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-transparent px-6 py-28 sm:py-40 lg:py-48"
    >
      {/* ===== Orbiting particle field around the phrase (like the hero) ===== */}
      <ParticleField disabled={disabled} />

      {/* ===== Background layer: monumental phrase (word-by-word reveal) ===== */}
      <motion.h2
        className="relative z-0 mx-auto max-w-4xl text-center font-display font-black uppercase leading-[1.15] tracking-tight text-white"
        variants={disabled ? undefined : phraseContainer}
        initial={disabled ? undefined : "hidden"}
        whileInView={disabled ? undefined : "visible"}
        viewport={{ once: false, amount: 0.5 }}
      >
        <Line words="Soluções digitais para os" disabled={disabled} />
        {/* Highlighted words with the brand logo gradient (#0574D9 → #00BCFF) */}
        <motion.span
          className="my-1 block text-4xl italic text-transparent sm:text-5xl lg:text-6xl"
          variants={disabled ? undefined : { hidden: { opacity: 0.15 }, visible: { opacity: 1, transition: { duration: 0.7, ease: "easeOut" } } }}
          style={{
            backgroundImage: "linear-gradient(135deg, #0574D9 0%, #00BCFF 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            textShadow:
              "0 0 32px rgba(5,116,217,0.6), 0 0 70px rgba(0,188,255,0.4)",
          }}
        >
          desafios de hoje
        </motion.span>
        <Line words="e as oportunidades" disabled={disabled} />
        <Line words="de amanhã" disabled={disabled} />
      </motion.h2>

      {/* ===== Foreground layer: floating glass cards ===== */}
      {CARDS.map((card) => (
        <FloatingCard
          key={card.id}
          card={card}
          disabled={disabled}
          parallaxY={card.side === "left" ? leftY : rightY}
        />
      ))}
    </section>
  );
}

/* ============================================================
   ParticleField — luminous dots floating around the phrase, echoing the
   orbiting particles of the hero hologram (lightweight CSS version).
   ============================================================ */
const PARTICLES = [
  { top: "16%", left: "12%", size: 6, delay: 0, color: "#00e0ff" },
  { top: "24%", left: "82%", size: 5, delay: 0.8, color: "#0066ff" },
  { top: "40%", left: "6%", size: 4, delay: 1.6, color: "#7fefff" },
  { top: "52%", left: "90%", size: 7, delay: 0.4, color: "#00e0ff" },
  { top: "68%", left: "18%", size: 5, delay: 1.2, color: "#0066ff" },
  { top: "78%", left: "76%", size: 6, delay: 2, color: "#7fefff" },
  { top: "30%", left: "48%", size: 3, delay: 2.4, color: "#00e0ff" },
  { top: "62%", left: "40%", size: 4, delay: 0.6, color: "#0066ff" },
  { top: "12%", left: "58%", size: 4, delay: 1.4, color: "#7fefff" },
  { top: "84%", left: "52%", size: 5, delay: 1.9, color: "#00e0ff" },
  { top: "46%", left: "26%", size: 3, delay: 0.2, color: "#0066ff" },
  { top: "58%", left: "68%", size: 4, delay: 2.6, color: "#7fefff" },
];

const DRIFTS = ["tr-drift-a", "tr-drift-b", "tr-drift-c"];

function ParticleField({ disabled }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
      {PARTICLES.map((p, i) => (
        <span
          key={i}
          className={`absolute rounded-full ${disabled ? "" : DRIFTS[i % DRIFTS.length]}`}
          style={{
            top: p.top,
            left: p.left,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            boxShadow: `0 0 ${p.size * 2.5}px ${p.size}px ${p.color}`,
            opacity: 0.75,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

/* ============================================================
   Line — a phrase line rendered word-by-word for the reveal.
   ============================================================ */
function Line({ words, disabled }) {
  return (
    <span className="block text-3xl sm:text-4xl lg:text-5xl">
      {words.split(" ").map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block">
          <motion.span
            className="inline-block"
            variants={disabled ? undefined : wordVariants}
            style={disabled ? { color: "#fff" } : undefined}
          >
            {word}
          </motion.span>
          {"\u00A0"}
        </span>
      ))}
    </span>
  );
}

/* ============================================================
   Floating glassmorphism card
   ============================================================ */
function FloatingCard({ card, disabled, parallaxY }) {
  const { pos, text, icon, delay, depth, hideOnMobile } = card;

  return (
    <motion.div
      className={`absolute z-10 w-52 sm:w-60 ${pos} ${
        hideOnMobile ? "hidden lg:block" : ""
      }`}
      style={disabled ? undefined : { y: parallaxY }}
      initial={disabled ? undefined : { opacity: 0, y: 40 }}
      whileInView={disabled ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.4 }}
      transition={{ duration: 0.7, ease: EASE, delay }}
    >
      <div className="group relative rounded-2xl border border-white/10 bg-white/5 p-5 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-blue-500/50 hover:shadow-[0_0_28px_-6px_rgba(0,102,255,0.8)]">
        {/* Corner neon badge */}
        <span className="absolute -right-2 -top-2 inline-flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-white shadow-[0_0_16px_-4px_rgba(0,102,255,0.9)]">
          <ArrowUpRight />
        </span>

        {/* Watermark icon */}
        <div className="mb-3 text-white/70">
          <CardIcon name={icon} />
        </div>

        {/* Quote */}
        <p className="font-display text-sm leading-relaxed text-white/85">
          <span className="mr-1 text-lg font-bold text-primary">
            &ldquo;
          </span>
          {text}
        </p>
      </div>
    </motion.div>
  );
}

/* ============================================================
   Icons
   ============================================================ */
function CardIcon({ name }) {
  const p = {
    width: 26,
    height: 26,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  };
  switch (name) {
    case "layers":
      return (
        <svg {...p}>
          <path d="m12 2 9 5-9 5-9-5 9-5z" />
          <path d="m3 12 9 5 9-5M3 17l9 5 9-5" />
        </svg>
      );
    case "brain":
      return (
        <svg {...p}>
          <path d="M12 5a3 3 0 0 0-3 3 3 3 0 0 0-3 3 3 3 0 0 0 1 5 3 3 0 0 0 5 1 3 3 0 0 0 5-1 3 3 0 0 0 1-5 3 3 0 0 0-3-3 3 3 0 0 0-3-3z" />
          <path d="M12 5v13" />
        </svg>
      );
    case "code":
      return (
        <svg {...p}>
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      );
    case "rocket":
    default:
      return (
        <svg {...p}>
          <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
          <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
          <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
        </svg>
      );
  }
}

function ArrowUpRight() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  );
}
