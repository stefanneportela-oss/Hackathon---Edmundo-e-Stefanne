import { useRef, useCallback } from "react";
import SolutionsCarousel from "./SolutionsCarousel.jsx";

const stackChips = [
  "Inteligência Artificial",
  "Automação de Processos",
  "Big Data",
  "Apps Mobile & Web",
];

export default function Hero() {
  const spotlightRef = useRef(null);

  // Move the CSS spotlight to follow the mouse
  const onMouseMove = useCallback((e) => {
    const el = spotlightRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    el.style.setProperty("--mx", `${x}%`);
    el.style.setProperty("--my", `${y}%`);
  }, []);

  return (
    <section
      id="top"
      onMouseMove={onMouseMove}
      className="relative w-full overflow-hidden bg-black pt-28 pb-20 sm:pt-32"
    >
      {/* ===== Animated backdrops (pure black + blue mesh + mouse spotlight) ===== */}
      <div className="hero-mesh pointer-events-none absolute inset-0 -z-20" />
      <div
        ref={spotlightRef}
        className="hero-spotlight pointer-events-none absolute inset-0 -z-10"
      />
      <div className="bg-grid pointer-events-none absolute inset-0 -z-10" />
      <div className="animate-float pointer-events-none absolute -right-24 top-24 -z-10 h-72 w-72 rounded-full bg-brand-500/20 blur-[120px]" />
      <div className="animate-float pointer-events-none absolute -left-24 top-1/2 -z-10 h-72 w-72 rounded-full bg-brand-300/15 blur-[130px]" />

      {/* ===== Main content ===== */}
      <div className="mx-auto flex max-w-4xl flex-col items-center px-4 text-center sm:px-6">
        {/* Badge */}
        <div className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-brand-300/30 bg-brand-500/10 px-4 py-1.5 text-xs font-medium tracking-wide text-brand-300 backdrop-blur">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-300 opacity-70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-300" />
          </span>
          VANGUARDA EM TECNOLOGIA
        </div>

        {/* Headline */}
        <h1
          className="animate-fade-up mt-6 text-white"
          style={{ animationDelay: "0.05s" }}
        >
          Transformamos a indústria com{" "}
          <span className="text-gradient">soluções digitais</span>
        </h1>

        {/* Subtitle */}
        <p
          className="animate-fade-up mt-6 max-w-2xl text-base text-muted sm:text-lg"
          style={{ animationDelay: "0.12s" }}
        >
          Vamos além da programação. Entregamos valor real com projetos que
          integram Inteligência Artificial, Automação de Processos, Big Data e
          aplicações mobile e web de ponta.
        </p>

        {/* CTAs */}
        <div
          className="animate-fade-up mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
          style={{ animationDelay: "0.18s" }}
        >
          <a
            href="#contato"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand-500 to-brand-300 px-8 py-3.5 text-sm font-semibold text-white shadow-[0_0_32px_-8px_rgba(0,188,255,0.9)] transition-all duration-300 hover:shadow-[0_0_46px_-4px_rgba(0,188,255,1)] hover:brightness-110 active:scale-95"
          >
            Fale conosco
            <ArrowIcon />
          </a>
          <a
            href="#projetos"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-8 py-3.5 text-sm font-semibold text-white/90 transition-all duration-300 hover:border-white/40 hover:bg-white/5"
          >
            Ver projetos
          </a>
        </div>

        {/* Stack chips */}
        <div
          className="animate-fade-up mt-8 flex flex-wrap justify-center gap-2"
          style={{ animationDelay: "0.24s" }}
        >
          {stackChips.map((chip) => (
            <span
              key={chip}
              className="rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-white/70"
            >
              {chip}
            </span>
          ))}
        </div>
      </div>

      {/* ===== Products carousel ===== */}
      <div
        className="animate-fade-up relative mx-auto mt-16 max-w-7xl px-4 sm:mt-20 sm:px-6 lg:px-8"
        style={{ animationDelay: "0.3s" }}
      >
        <SolutionsCarousel />
      </div>
    </section>
  );
}

function ArrowIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="transition-transform duration-300 group-hover:translate-x-1"
      aria-hidden
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}
