import HeroBackground from "./HeroBackground.jsx";
import phonesImg from "../assets/about/phones.png";
import portalImg from "../assets/about/portal.png";
import vrImg from "../assets/about/vr.png";
import dashboardImg from "../assets/about/dashboard.png";

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
      className="relative w-full overflow-hidden bg-black py-24 sm:py-28"
    >
      {/* Same animated background as the Projects section */}
      <HeroBackground />
      <div className="bg-grid pointer-events-none absolute inset-0 z-0" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ===== Centered header ===== */}
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <span className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-4 py-1.5 font-display text-xs font-semibold uppercase tracking-[0.18em] text-brand-300 backdrop-blur-md">
            Quem Somos
          </span>

          <h2 className="mt-6 text-white">SENAI Soluções Digitais</h2>

          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            Somos a vanguarda da inovação tecnológica, dedicados a desenvolver
            softwares e soluções digitais que transformam a realidade da
            indústria e dos negócios.
          </p>
        </div>

        {/* ===== Bento Grid ===== */}
        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-6 lg:grid-cols-12">
          {/* --- Card 1: vertical, phones + CTA (left, spans full height) --- */}
          <GlowCard className="md:col-span-2 md:row-span-2 lg:col-span-4">
            <div className="flex h-full flex-col p-6">
              {/* Phone mockup — shown whole (contain), floating on the dark card */}
              <div className="relative flex flex-1 items-center justify-center overflow-hidden rounded-2xl">
                <img
                  src={MOCK.phones}
                  alt="Aplicativos móveis desenvolvidos pela SENAI Soluções Digitais"
                  loading="lazy"
                  draggable={false}
                  className="h-full max-h-[320px] w-full object-contain transition-transform duration-500 ease-out group-hover:scale-105"
                />
              </div>

              <p className="mt-6 text-sm leading-relaxed text-white/70">
                Tecnologia que evolui, pessoas que transformam, soluções que
                geram resultados.
              </p>

              {/* White solid pill CTA */}
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

          {/* --- Card 2: horizontal, web portal (center-top) --- */}
          <GlowCard className="md:col-span-4 lg:col-span-5">
            <div className="flex h-full flex-col p-6">
              <div className="relative overflow-hidden rounded-2xl bg-black/20">
                <img
                  src={MOCK.portal}
                  alt="Portal web SESI/SENAI"
                  loading="lazy"
                  draggable={false}
                  className="h-44 w-full object-contain transition-transform duration-500 ease-out group-hover:scale-105 sm:h-48"
                />
              </div>
              <h3 className="mt-7 font-display text-lg font-bold text-white">
                Desde 2007, inovando para transformar.
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Mais de 17 mil usuários por dia impactados pelas soluções que
                desenvolvemos.
              </p>
            </div>
          </GlowCard>

          {/* --- Card 3: square, "20+" metric (right-top) --- */}
          <GlowCard className="md:col-span-2 lg:col-span-3">
            <div className="flex h-full flex-col p-6">
              <div className="relative overflow-hidden rounded-2xl">
                <img
                  src={MOCK.vr}
                  alt="Ambiente industrial em realidade virtual"
                  loading="lazy"
                  draggable={false}
                  className="h-32 w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                />
              </div>
              <div className="mt-auto pt-7">
                <div className="font-display text-6xl font-bold leading-none text-white">
                  20+
                </div>
                <div className="mt-2 text-sm text-muted">Projetos Ativos</div>
              </div>
            </div>
          </GlowCard>

          {/* --- Card 4: horizontal, text + dashboard (bottom, center+right) --- */}
          <GlowCard className="md:col-span-6 lg:col-span-8 lg:col-start-5">
            <div className="flex h-full flex-col items-center gap-8 p-6 sm:flex-row sm:gap-10 sm:p-8">
              <p className="flex-1 font-display text-base leading-relaxed text-white sm:text-lg">
                <span className="font-bold">Transformamos tecnologia em valor</span>
                , unindo Inteligência Artificial, Automação, Big Data,
                Desenvolvimento de Aplicações Mobile e Web para criar soluções
                que fazem a diferença.
              </p>
              <div className="flex w-full flex-1 items-center justify-center overflow-hidden rounded-2xl sm:w-auto">
                <img
                  src={MOCK.dashboard}
                  alt="Dashboard de análise de dados"
                  loading="lazy"
                  draggable={false}
                  className="h-44 w-full object-contain object-center transition-transform duration-500 ease-out group-hover:scale-105 sm:h-52"
                />
              </div>
            </div>
          </GlowCard>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   GlowCard — borderless glass surface with a soft ambient glow on
   hover (matches the borderless "reveal" feature cards in Projects).
   ============================================================ */
function GlowCard({ children, className = "" }) {
  return (
    <div
      className={`group relative rounded-3xl transition-transform duration-300 ease-out hover:-translate-y-0.5 ${className}`}
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
    </div>
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
