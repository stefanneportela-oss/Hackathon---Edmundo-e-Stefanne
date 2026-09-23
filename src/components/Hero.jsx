import { lazy, Suspense } from "react";
import HeroBackground from "./HeroBackground.jsx";
import PrimaryButton from "./ui/PrimaryButton.jsx";

// The 3D hologram pulls in three.js — lazy-load it so it never blocks the
// hero text from painting, and so mobile can fall back gracefully.
const LogoHologram3D = lazy(() => import("./LogoHologram3D.jsx"));

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[88vh] w-full items-center overflow-hidden bg-black pt-28 pb-20 sm:pt-32"
    >
      {/* ===== Background (mouse-follow glow + grid, matches Projects) ===== */}
      <HeroBackground />
      <div className="bg-grid pointer-events-none absolute inset-0 z-0" />

      {/* ===== Main content — two columns: text (left) + hologram (right) ===== */}
      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:px-8">
        {/* --- Left: headline + copy (anchored left) --- */}
        <div className="max-w-2xl text-left">
          {/* Eyebrow */}
          <p
            className="animate-fade-up text-xs font-medium uppercase tracking-[0.2em] text-brand-300"
            style={{ animationDelay: "0.02s" }}
          >
            # Vanguarda em tecnologia
          </p>

          {/* Headline */}
          <h1
            className="animate-fade-up mt-5 text-white"
            style={{ animationDelay: "0.05s" }}
          >
            Transformamos a indústria com{" "}
            <span className="text-gradient">soluções digitais</span>
          </h1>

          {/* Subtitle */}
          <p
            className="animate-fade-up mt-6 max-w-xl text-base text-muted sm:text-lg"
            style={{ animationDelay: "0.12s" }}
          >
            Impulsionando a Indústria e os Negócios com Tecnologia.
          </p>

          {/* CTAs */}
          <div
            className="animate-fade-up mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
            style={{ animationDelay: "0.18s" }}
          >
            <PrimaryButton href="#contato">Fale conosco</PrimaryButton>
            <a
              href="#projetos"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-8 py-3.5 text-sm font-semibold text-white/90 backdrop-blur-md transition-all duration-300 hover:border-white/40 hover:bg-white/10"
            >
              Ver projetos
            </a>
          </div>
        </div>

        {/* --- Right: animated 3D logo hologram (balances the left copy) --- */}
        <div className="animate-fade-up relative mx-auto aspect-square w-full max-w-[340px] sm:max-w-[440px] lg:max-w-none lg:h-[560px]" style={{ animationDelay: "0.24s" }}>
          <Suspense
            fallback={
              <div className="flex h-full w-full items-center justify-center">
                <div className="h-40 w-40 animate-float rounded-full bg-[radial-gradient(circle,rgba(0,110,255,0.35),transparent_70%)] blur-xl" />
              </div>
            }
          >
            <LogoHologram3D />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
