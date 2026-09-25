import { lazy, Suspense, useState, useEffect } from "react";
import PrimaryButton from "./ui/PrimaryButton.jsx";
import thumbMobile from "../assets/services/mobile.png";
import thumbEdhealth from "../assets/services/edhealth.png";

// The 3D hologram pulls in three.js — lazy-load it so it never blocks the
// hero text from painting, and so mobile can fall back gracefully.
const LogoHologram3D = lazy(() => import("./LogoHologram3D.jsx"));

/**
 * HeroV2 — alternate hero composition inspired by the VYRO reference.
 *
 * Composition (over the global <HeroBackground/> bg-grid + mouse glow):
 *  - CENTER: the SENAI Soluções Digitais 3D logo hologram, dead-center, with a
 *    radial "spotlight" aura behind it (white/blue at the top, easing into
 *    neon #0066FF and fading into absolute black).
 *  - LEFT: monumental layered Bahnschrift headline (top) + two glass thumbnail
 *    pills (bottom-left).
 *  - RIGHT: short explanatory subtext (top-right) + a floating glassmorphism
 *    "Active Glass" style card with a neon-blue outline (bottom-right).
 *
 * Fully transparent so the global infinite background shows through, and
 * responsive: on small screens the side columns stack below the hologram.
 */
/** True on lg+ screens (≥1024px) — where the hologram is centered behind the
 *  two text columns. Below that, the hologram sits inline between the title
 *  and the descriptive text instead. */
function useIsDesktop() {
  const [desktop, setDesktop] = useState(() =>
    typeof window === "undefined"
      ? true
      : window.matchMedia("(min-width: 1024px)").matches
  );
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const sync = () => setDesktop(mq.matches);
    sync();
    mq.addEventListener?.("change", sync);
    return () => mq.removeEventListener?.("change", sync);
  }, []);
  return desktop;
}

/** The 3D hologram wrapped in its Suspense fallback (shared by both layouts). */
function Hologram() {
  return (
    <Suspense
      fallback={
        <div className="flex h-full w-full items-center justify-center">
          <div className="h-48 w-48 animate-float rounded-full bg-[radial-gradient(circle,rgba(0,110,255,0.35),transparent_70%)] blur-xl" />
        </div>
      }
    >
      <LogoHologram3D />
    </Suspense>
  );
}

export default function HeroV2() {
  const isDesktop = useIsDesktop();

  return (
    <section
      id="top"
      className="relative flex min-h-[92vh] w-full items-center overflow-hidden bg-transparent pt-28 pb-20 sm:pt-32"
    >
      {/* ===== Center anchor: radial spotlight aura (desktop) =====
          On mobile the aura is rendered inside the inline hologram wrapper
          instead, so it stays centered with the icon wherever it sits. */}
      {isDesktop && (
        <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center">
          {/* Arc / spotlight aura: white-blue top → neon blue → black */}
          <div
            aria-hidden
            className="absolute left-1/2 top-1/2 h-[820px] w-[820px] max-w-[95vw] -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl"
            style={{
              background:
                "radial-gradient(circle at 50% 30%, rgba(220,235,255,0.35) 0%, rgba(0,102,255,0.42) 26%, rgba(0,70,190,0.22) 46%, rgba(0,0,0,0) 70%)",
            }}
          />
          {/* Top light streak to reinforce the arc highlight */}
          <div
            aria-hidden
            className="absolute left-1/2 top-[18%] h-[280px] w-[560px] max-w-[90vw] -translate-x-1/2 rounded-full opacity-70 blur-3xl"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(180,215,255,0.5) 0%, rgba(0,102,255,0.12) 55%, transparent 75%)",
            }}
          />
        </div>
      )}

      {/* 3D hologram (desktop) — centered, above the aura but below the text.
          On mobile it moves into the flow between the title and the subtext
          (see below), so only one WebGL canvas is ever mounted. */}
      {isDesktop && (
        <div className="pointer-events-none absolute inset-0 z-[1] flex items-center justify-center">
          <div className="relative aspect-square w-full max-w-[640px]">
            <Hologram />
          </div>
        </div>
      )}

      {/* ===== Overlaid content grid (left / right columns) ===== */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-12 px-4 sm:px-6 lg:grid lg:min-h-[70vh] lg:grid-cols-2 lg:items-stretch lg:gap-8 lg:px-8">
        {/* --- LEFT column --- */}
        <div className="flex flex-col justify-between">
          {/* Monumental layered headline (top-left) */}
          {/* Tag + title are distinct blocks in a vertical flex; gap-8 forces a
              clean 32px gutter so the Õ accent can never touch the tag above. */}
          <div
            className="animate-fade-up flex max-w-md flex-col gap-4"
            style={{ animationDelay: "0.05s" }}
          >
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-brand-300">
              # Vanguarda em tecnologia
            </p>
            {/* leading-tight + pt-2 keeps the text bounding box from clipping
                the top accents (Õ, Ã); gap-2 spaces the lines evenly. */}
            <h1 className="flex flex-col gap-2 pt-2 font-display font-black uppercase leading-tight tracking-tight text-white">
              <span className="text-5xl sm:text-6xl">Soluções</span>
              <span className="text-5xl sm:text-6xl">além dos</span>
              <span className="text-5xl text-gradient sm:text-6xl">limites</span>
              {/* Layered watermark word — subtle, muted, below the block */}
              <span className="mt-3 text-3xl font-bold text-white/15 sm:text-4xl">
                transformação
              </span>
            </h1>
          </div>

          {/* Glass thumbnail pills (bottom-left) */}
          <div
            className="animate-fade-up mt-10 hidden items-center gap-3 lg:mt-0 lg:flex"
            style={{ animationDelay: "0.22s" }}
          >
            <ThumbPill src={thumbMobile} alt="Prévia — app mobile" />
            <ThumbPill src={thumbEdhealth} alt="Prévia — plataforma" />
          </div>
        </div>

        {/* --- 3D hologram inline (mobile only) — sits between the title and
            the descriptive text, with its aura centered on the icon --- */}
        {!isDesktop && (
          <div className="animate-fade-up -my-4 flex justify-center lg:hidden">
            <div className="pointer-events-none relative flex aspect-square w-full max-w-[340px] items-center justify-center sm:max-w-[420px]">
              {/* Aura centered on the icon */}
              <div
                aria-hidden
                className="absolute left-1/2 top-1/2 h-[150%] w-[150%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl"
                style={{
                  background:
                    "radial-gradient(circle at 50% 40%, rgba(220,235,255,0.32) 0%, rgba(0,102,255,0.4) 26%, rgba(0,70,190,0.2) 46%, rgba(0,0,0,0) 70%)",
                }}
              />
              <div className="relative h-full w-full">
                <Hologram />
              </div>
            </div>
          </div>
        )}

        {/* --- RIGHT column --- */}
        <div className="flex flex-col justify-between text-left lg:items-end lg:text-right">
          {/* Short explanatory subtext (top-right) */}
          <p
            className="animate-fade-up max-w-xs text-sm leading-relaxed text-muted sm:text-base"
            style={{ animationDelay: "0.12s" }}
          >
            Soluções digitais de nova geração que redefinem como a indústria vê,
            sente e interage com o mundo.
          </p>

          {/* Floating "Active Glass" card (bottom-right) */}
          <div
            className="animate-fade-up mt-10 hidden w-full max-w-sm lg:mt-0 lg:block"
            style={{ animationDelay: "0.3s" }}
          >
            <FloatingCard src={thumbEdhealth} />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   BITS
   ============================================================ */

/** A small rounded glass thumbnail with a subtle image preview. */
function ThumbPill({ src, alt }) {
  return (
    <div className="group relative h-16 w-24 overflow-hidden rounded-2xl border border-white/15 bg-white/5 backdrop-blur-md transition-all duration-300 hover:border-brand-300/60 hover:shadow-[0_0_22px_-6px_rgba(0,102,255,0.9)]">
      <img
        src={src}
        alt={alt}
        loading="lazy"
        draggable={false}
        className="h-full w-full object-cover opacity-80 transition-opacity duration-300 group-hover:opacity-100"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
    </div>
  );
}

/**
 * FloatingCard — glassmorphism widget with a neon-blue outline, mirroring the
 * "Active Glass FIT FX75" card in the reference.
 */
function FloatingCard({ src }) {
  return (
    <div className="group relative">
      {/* Neon outline glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-70 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "linear-gradient(135deg, rgba(0,102,255,0.9), rgba(0,210,255,0.5) 60%, rgba(0,102,255,0.2))",
          WebkitMask:
            "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          padding: "1px",
        }}
      />
      <div className="relative flex items-center gap-4 rounded-2xl border border-white/10 bg-[#0D0D0D]/80 p-3 text-left backdrop-blur-xl">
        {/* Preview image */}
        <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-white/10">
          <img
            src={src}
            alt=""
            loading="lazy"
            draggable={false}
            className="h-full w-full object-cover"
          />
        </div>
        {/* Copy */}
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-brand-300">
            Nova solução
          </p>
          <p className="mt-0.5 truncate font-display text-sm font-bold text-white">
            Espaço do Estudante
          </p>
          <a
            href="#projetos"
            className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-white/70 transition-colors hover:text-white"
          >
            Ver agora
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </div>
        {/* Neon badge */}
        <span className="self-start whitespace-nowrap rounded-full bg-primary px-2.5 py-1 text-[10px] font-bold text-white shadow-[0_0_16px_-4px_rgba(0,102,255,0.9)]">
          Mobile
        </span>
      </div>
    </div>
  );
}
