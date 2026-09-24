import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import phonesImg from "../assets/about/phones.png";
import portalImg from "../assets/about/portal.png";
import vrImg from "../assets/about/vr.png";
import dashboardImg from "../assets/about/dashboard.png";
import SectionReveal from "./SectionReveal.jsx";

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

/**
 * About / "Quem Somos" — Bento Grid section.
 *
 * Layout (mirrors the reference, adapted to the Dark / Glassmorphism DS):
 *
 *   Centered header: [QUEM SOMOS] badge · "SENAI Soluções Digitais" · subtitle
 *
 *   ┌────────┬───────────────────────────┬──────────┐
 *   │        │  Card 2 — portal web       │ Card 3   │
 *   │ Card 1 │  "Desde 2007…"             │  20+     │
 *   │ phones ├───────────────────────────┴──────────┤
 *   │ + CTA  │  Card 4 — texto + dashboard           │
 *   └────────┴───────────────────────────────────────┘
 *
 * Design System:
 *  - Pure black background (#000).
 *  - Card surface: translucent glass (bg-white/5, backdrop-blur) with a
 *    subtle border (border-white/10).
 *  - Hover: soft lift (-translate-y-0.5 / scale), neon blue (#0066FF) gradient
 *    border and ambient glow shadow.
 *  - Bahnschrift typography (inherited globally).
 */

// Real SENAI mockups exported from the Figma "Imagens para usar" section.
const MOCK = {
  phones: phonesImg,
  portal: portalImg,
  vr: vrImg,
  dashboard: dashboardImg,
};

export default function About() {
  return (
    <section
      id="sobre"
      className="relative w-full overflow-hidden bg-transparent py-24 sm:py-28"
    >
      <SectionReveal className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" amount={0.5}>
        {/* ===== Centered header (Figma "section-header", VERTICAL gap 16) =====
            · badge: solid #1A1A1A, radius 20, padding 8/16, text "Quem Somos"
              12px Semi Bold in cyan (#00D2FF)
            · title: 50px Bahnschrift SemiBold, white
            · subtitle: 16px regular, muted (#A1A1AA), max ~720px */}
        <SectionReveal.Item className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
          <span className="inline-flex items-center rounded-[20px] bg-[#1A1A1A] px-4 py-2 font-display text-xs font-semibold text-[#00D2FF]">
            Quem Somos
          </span>

          <h2 className="font-display text-[2.25rem] font-semibold text-white sm:text-[50px]">
            SENAI Soluções Digitais
          </h2>

          <p className="max-w-[720px] text-base leading-relaxed text-muted">
            Somos a vanguarda da inovação tecnológica, dedicados a desenvolver
            softwares e soluções digitais que transformam a realidade da
            indústria e dos negócios.
          </p>
        </SectionReveal.Item>

        {/* ===== Bento Grid — nested structure mirroring Figma =====
            bento-grid (HORIZONTAL, gap 24):
              · card-1  (fixed left column, 380/1350 ≈ 28%)
              · right column (grows, VERTICAL, gap 24):
                  · right-top-row (HORIZONTAL, gap 24): card-2 (grows) + card-3 (fixed)
                  · card-4 (HORIZONTAL, gap 24) */}
        <div className="mt-14 flex flex-col gap-6 lg:flex-row">
          {/* --- Card 1: left column, phones (top) + text + CTA (bottom) --- */}
          <GlowCard className="lg:w-[28%] lg:shrink-0" revealDelay={0}>
            <div className="flex h-full flex-col p-6">
              {/* Phone mockup — fills the top, whole (contain) */}
              <div className="flex flex-1 items-center justify-center overflow-hidden">
                <img
                  src={MOCK.phones}
                  alt="Aplicativos móveis desenvolvidos pela SENAI Soluções Digitais"
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                  className="max-h-[360px] w-full object-contain transition-transform duration-500 ease-out group-hover:scale-105"
                />
              </div>

              <p className="mt-6 text-base leading-relaxed text-white">
                Tecnologia que evolui, pessoas que transformam, soluções que
                geram resultados.
              </p>

              <div className="mt-6">
                <a
                  href="#projetos"
                  className="group/cta inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-display text-sm font-semibold text-black transition-all duration-300 hover:bg-white/90 hover:shadow-[0_0_28px_-6px_rgba(255,255,255,0.6)] active:scale-95"
                >
                  Explore nossos projetos
                  <ArrowRight className="transition-transform duration-300 group-hover/cta:translate-x-1" />
                </a>
              </div>
            </div>
          </GlowCard>

          {/* --- Right column --- */}
          <div className="flex min-w-0 flex-1 flex-col gap-6">
            {/* Top row: card-2 (grows) + card-3 (fixed) */}
            <div className="flex flex-col gap-6 sm:flex-row">
              {/* Card 2: portal — image 153px + title/desc (gap 6px) */}
              <GlowCard className="min-w-0 flex-1" revealDelay={0.15}>
                <div className="flex h-full flex-col gap-5 p-6">
                  <div className="overflow-hidden rounded-lg">
                    <img
                      src={MOCK.portal}
                      alt="Portal web SESI/SENAI"
                      loading="lazy"
                      decoding="async"
                      draggable={false}
                      className="h-[153px] w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <h3 className="font-display text-base font-bold text-white">
                      Desde 2007, inovando para transformar.
                    </h3>
                    <p className="text-base leading-snug text-white">
                      Mais de 17 mil usuários por dia impactados pelas soluções
                      que desenvolvemos.
                    </p>
                  </div>
                </div>
              </GlowCard>

              {/* Card 3: "20+" metric. Figma: top-row image right-aligned
                  (143x146, rounded 8), gap 16, content bottom-aligned —
                  "20+" 48px white, "Projetos Ativos" 14px muted. --- */}
              <GlowCard className="sm:w-[240px] sm:shrink-0" revealDelay={0.3}>
                <div className="flex h-full flex-col gap-4 p-6">
                  {/* image aligned to the right, ~143px wide */}
                  <div className="flex justify-end">
                    <div className="overflow-hidden rounded-lg">
                      <img
                        src={MOCK.vr}
                        alt="Ambiente industrial em realidade virtual"
                        loading="lazy"
                        decoding="async"
                        draggable={false}
                        className="h-[146px] w-[143px] object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                      />
                    </div>
                  </div>
                  <div className="mt-auto flex flex-col gap-2">
                    <div className="font-display text-5xl font-bold leading-none text-white">
                      20+
                    </div>
                    <div className="text-sm text-muted">Projetos Ativos</div>
                  </div>
                </div>
              </GlowCard>
            </div>

            {/* Card 4: text (grows) + dashboard image (fixed 350×230) */}
            <GlowCard className="flex-1" revealDelay={0.45}>
              <div className="flex h-full flex-col items-center gap-6 p-8 sm:flex-row">
                <p className="flex-1 font-display text-base leading-relaxed text-white">
                  <span className="font-bold">
                    Transformamos tecnologia em valor
                  </span>
                  , unindo Inteligência Artificial, Automação, Big Data,
                  Desenvolvimento de Aplicações Mobile e Web para criar soluções
                  que fazem a diferença.
                </p>
                <div className="w-full shrink-0 overflow-hidden rounded-lg sm:w-[350px]">
                  <img
                    src={MOCK.dashboard}
                    alt="Dashboard de análise de dados"
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                    className="h-[230px] w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                </div>
              </div>
            </GlowCard>
          </div>
        </div>
      </SectionReveal>
    </section>
  );
}

/* ============================================================
   GlowCard — borderless glass surface with a soft ambient glow on
   hover (matches the borderless "reveal" feature cards in Projects).
   ============================================================ */
function GlowCard({ children, className = "", revealDelay = 0 }) {
  const reduced = useReducedMotion();
  const paused = useAnimationsPaused();
  const disabled = reduced || paused;

  const anim = disabled
    ? {}
    : {
        initial: { opacity: 0, y: 40 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: false, amount: 0.3 },
        transition: {
          duration: 0.7,
          ease: [0.21, 0.47, 0.32, 0.98],
          delay: revealDelay,
        },
      };

  return (
    <motion.div
      className={`group relative rounded-3xl transition-transform duration-300 ease-out hover:-translate-y-0.5 ${className}`}
      style={{ willChange: "transform, opacity" }}
      {...anim}
    >
      {/* Ambient neon glow — appears softly on hover (no border/frame) */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-0.5 rounded-[26px] opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: "rgba(0,102,255,0.22)" }}
      />
      {/* Glass surface — no border */}
      <div className="relative h-full overflow-hidden rounded-3xl bg-white/[0.04] backdrop-blur-xl">
        {children}
      </div>
    </motion.div>
  );
}

function ArrowRight({ className = "" }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}
