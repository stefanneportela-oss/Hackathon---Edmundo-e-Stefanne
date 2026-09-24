import { motion, useReducedMotion } from "framer-motion";

/**
 * AwsPartner — "Parceiro AWS Partner Network (APN)" — futuristic cloud CTA.
 *
 * Composition inspired by the "FOMO Boost" reference: concentric orbital rings
 * enclosing the whole block, six two-line floating cards (glass icon tile +
 * title + support line) orbiting the rings, and a centred stack (AWS badge +
 * wordmark → big multi-line title → subtitle with highlighted keywords → CTA).
 *
 * Recoloured to the SENAI blue/cyan palette (#0066FF / #00BCFF). The AWS mark
 * keeps the existing inline-SVG badge. Animated in with Framer Motion; ambient
 * motion (orbits, glow, levitation, drifting cards) via CSS keyframes.
 *
 * Transparent section over the global background.
 */

const EASE = [0.21, 0.47, 0.32, 0.98];

/* Scattered white dots drifting around the composition. Varied position,
   size, glow, opacity and animation delay so they never move in lockstep. */
const DOTS = [
  { left: "10%", top: "18%", size: "5px", glow: 12, opacity: 0.9, drift: "aws-dot-a", delay: "0s" },
  { left: "22%", top: "34%", size: "3px", glow: 8, opacity: 0.6, drift: "aws-dot-b", delay: "0.6s" },
  { left: "15%", top: "52%", size: "4px", glow: 10, opacity: 0.75, drift: "aws-dot-a", delay: "1.2s" },
  { left: "28%", top: "68%", size: "2px", glow: 6, opacity: 0.5, drift: "aws-dot-b", delay: "0.3s" },
  { left: "8%", top: "78%", size: "5px", glow: 12, opacity: 0.85, drift: "aws-dot-a", delay: "1.8s" },
  { left: "34%", top: "14%", size: "3px", glow: 8, opacity: 0.65, drift: "aws-dot-b", delay: "0.9s" },
  { left: "44%", top: "26%", size: "2px", glow: 6, opacity: 0.5, drift: "aws-dot-a", delay: "2.1s" },
  { left: "50%", top: "8%", size: "4px", glow: 10, opacity: 0.8, drift: "aws-dot-b", delay: "0.4s" },
  { left: "58%", top: "24%", size: "3px", glow: 8, opacity: 0.6, drift: "aws-dot-a", delay: "1.5s" },
  { left: "66%", top: "14%", size: "2px", glow: 6, opacity: 0.5, drift: "aws-dot-b", delay: "2.4s" },
  { left: "78%", top: "20%", size: "5px", glow: 12, opacity: 0.9, drift: "aws-dot-a", delay: "0.7s" },
  { left: "90%", top: "30%", size: "3px", glow: 8, opacity: 0.65, drift: "aws-dot-b", delay: "1.1s" },
  { left: "85%", top: "48%", size: "4px", glow: 10, opacity: 0.75, drift: "aws-dot-a", delay: "2.0s" },
  { left: "72%", top: "62%", size: "2px", glow: 6, opacity: 0.5, drift: "aws-dot-b", delay: "0.2s" },
  { left: "92%", top: "72%", size: "5px", glow: 12, opacity: 0.85, drift: "aws-dot-a", delay: "1.4s" },
  { left: "60%", top: "80%", size: "3px", glow: 8, opacity: 0.6, drift: "aws-dot-b", delay: "2.2s" },
  { left: "48%", top: "88%", size: "4px", glow: 10, opacity: 0.7, drift: "aws-dot-a", delay: "0.5s" },
  { left: "38%", top: "82%", size: "2px", glow: 6, opacity: 0.5, drift: "aws-dot-b", delay: "1.7s" },
];

/* Six floating feature cards orbiting the rings, mirroring the reference.
   Content taken from the official AWS competencies page
   (senaisolucoesdigitais.com.br/aws.html): icon + competency title + tag.
   Positioned absolutely around the block; hidden below `lg` where they'd
   collide with the centre text. */
const CARDS = [
  {
    icon: MigrateIcon,
    title: "Migração para AWS",
    sub: "Assessment • Cloud Migration",
    pos: "left-1/2 top-2 -translate-x-1/2 sm:top-4",
    drift: "aws-card-a",
  },
  {
    icon: CodeIcon,
    title: "Desenvolvimento Cloud Native",
    sub: "APIs • Microsserviços",
    pos: "left-2 top-[26%] xl:left-6",
    drift: "aws-card-b",
  },
  {
    icon: SparkIcon,
    title: "IA Generativa",
    sub: "Amazon Bedrock",
    pos: "right-2 top-[26%] xl:right-6",
    drift: "aws-card-a",
  },
  {
    icon: PipelineIcon,
    title: "DevOps e CI/CD",
    sub: "Pipelines • Automação",
    pos: "bottom-[26%] left-2 xl:left-6",
    drift: "aws-card-b",
  },
  {
    icon: DatabaseIcon,
    title: "Banco de Dados",
    sub: "Amazon RDS • Alta disponibilidade",
    pos: "bottom-[26%] right-2 xl:right-6",
    drift: "aws-card-a",
  },
  {
    icon: ShieldIcon,
    title: "Arquitetura de Soluções",
    sub: "Well-Architected • Segurança",
    pos: "bottom-2 left-1/2 -translate-x-1/2 sm:bottom-4",
    drift: "aws-card-b",
  },
];

export default function AwsPartner() {
  const reducedMotion = useReducedMotion();

  const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: EASE, delay: 0.05 + i * 0.08 },
    }),
  };

  const cardIn = {
    hidden: { opacity: 0, scale: 0.85 },
    visible: (i = 0) => ({
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: EASE, delay: 0.35 + i * 0.08 },
    }),
  };

  return (
    <section
      id="aws-partner"
      aria-label="Parceria AWS Partner Network"
      className="relative w-full bg-transparent py-16 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={reducedMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
          className="relative px-6 py-16 sm:px-10 sm:py-20 lg:min-h-[720px]"
        >
          {/* ---- Ambient layers ---------------------------------------- */}
          {/* Breathing central glow */}
          <div
            aria-hidden
            className="aws-glow pointer-events-none absolute left-1/2 top-1/2 z-0 h-[440px] w-[440px] max-w-[90%] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, rgba(0,188,255,0.16) 0%, rgba(0,102,255,0.05) 45%, transparent 100%)",
            }}
          />

          {/* Concentric orbital rings enclosing the whole block */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2"
          >
            <div className="aws-orbit h-[360px] w-[360px] rounded-full border border-brand-400/25 sm:h-[440px] sm:w-[440px]" />
            <div className="aws-orbit-rev absolute left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-500/15 sm:h-[620px] sm:w-[620px]" />
            <div className="aws-orbit absolute left-1/2 top-1/2 h-[760px] w-[760px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-500/[0.08] sm:h-[820px] sm:w-[820px]" />
          </div>

          {/* Drifting white dots scattered across the block */}
          {DOTS.map((d, i) => (
            <span
              key={i}
              aria-hidden
              className={`${d.drift} pointer-events-none absolute rounded-full bg-white`}
              style={{
                left: d.left,
                top: d.top,
                width: d.size,
                height: d.size,
                opacity: d.opacity,
                boxShadow: `0 0 ${d.glow}px ${d.glow / 4}px rgba(255,255,255,0.7)`,
                animationDelay: d.delay,
              }}
            />
          ))}

          {/* ---- Floating feature cards (orbiting) --------------------- */}
          {CARDS.map(({ icon: Icon, title, pos, drift }, i) => (
            <motion.div
              key={title}
              custom={i}
              variants={cardIn}
              className={`absolute z-10 hidden lg:block ${pos}`}
            >
              <div className={`${drift} flex w-[210px] items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] px-3.5 py-3 shadow-[0_8px_28px_rgba(0,0,0,0.4)] backdrop-blur-md`}>
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand-500/15 text-brand-300 shadow-[inset_0_0_0_1px_rgba(0,188,255,0.25)]">
                  <Icon />
                </span>
                <div className="min-w-0 text-left">
                  <p className="font-display text-[13px] font-semibold leading-tight text-white">{title}</p>
                </div>
              </div>
            </motion.div>
          ))}

          {/* ---- Centre stack ------------------------------------------ */}
          <div className="relative z-20 mx-auto flex min-h-[420px] max-w-2xl flex-col items-center justify-center py-8 text-center lg:min-h-[600px]">
            {/* AWS wordmark */}
            <motion.div variants={fadeUp} className="flex flex-col items-center">
              <p className="font-display text-2xl font-extrabold leading-none text-white sm:text-3xl">
                AWS <span className="text-gradient">Partner</span>
              </p>
              <p className="mt-1.5 font-display text-[11px] font-semibold uppercase tracking-[0.24em] text-brand-300">
                Partner Network
              </p>
            </motion.div>

            {/* Title */}
            <motion.h2
              variants={fadeUp}
              className="mt-8 font-display text-4xl font-extrabold leading-[1.05] text-white sm:text-5xl md:text-6xl"
            >
              Competências
              <br />
              e serviços em
              <br />
              <span className="text-gradient">Amazon Web Services</span>
            </motion.h2>

            {/* Subtitle with highlighted keywords */}
            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-lg font-display text-base font-medium text-muted sm:text-lg"
            >
              Modernização, migração e desenvolvimento{" "}
              <span className="font-semibold text-brand-300">cloud-native</span>{" "}
              com soluções{" "}
              <span className="font-semibold text-brand-300">seguras</span>,{" "}
              <span className="font-semibold text-brand-300">escaláveis</span> e{" "}
              <span className="font-semibold text-brand-300">resilientes</span>.
            </motion.p>

            {/* CTA — dedicated AWS partnership page (coming soon) */}
            <motion.a
              variants={fadeUp}
              href="/parceria-aws"
              className="group mt-9 inline-flex h-14 items-center gap-2.5 rounded-xl bg-gradient-to-r from-brand-500 to-brand-300 px-7 font-display text-[15px] font-bold text-[#04101f] shadow-[0_10px_28px_rgba(0,188,255,0.3)] transition-all duration-300 hover:shadow-[0_14px_36px_rgba(0,188,255,0.45)] active:scale-95"
            >
              Conheça a parceria AWS
              <ArrowRightIcon />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---- Icons (stroke = currentColor) ------------------------------------- */

function ShieldIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 2 4 5v6c0 5 3.5 8.5 8 11 4.5-2.5 8-6 8-11V5l-8-3Z" />
    </svg>
  );
}

function MigrateIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M18 8 22 12l-4 4" />
      <path d="M2 12h20" />
      <path d="M6 16 2 12l4-4" />
    </svg>
  );
}

function CodeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

function SparkIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4" />
      <path d="M12 8l1.6 2.4L16 12l-2.4 1.6L12 16l-1.6-2.4L8 12l2.4-1.6L12 8Z" />
    </svg>
  );
}

function PipelineIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="5" cy="6" r="2.5" />
      <circle cx="19" cy="6" r="2.5" />
      <circle cx="12" cy="18" r="2.5" />
      <path d="M7.5 6h9M5 8.5v3a3 3 0 0 0 3 3h1.5M19 8.5v3a3 3 0 0 1-3 3h-1.5" />
    </svg>
  );
}

function DatabaseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <ellipse cx="12" cy="5" rx="8" ry="3" />
      <path d="M4 5v6c0 1.66 3.58 3 8 3s8-1.34 8-3V5" />
      <path d="M4 11v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden>
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}
