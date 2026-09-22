import { useRef, useState, useCallback, useEffect } from "react";
import { services } from "../data/services.js";

/**
 * Services section ("O Que Fazemos").
 *
 * Layout (mirrors the reference, adapted to the Dark/Neon Design System):
 *  ┌───────────────────────────────────────────────┐
 *  │  [Sobre Nós ↗]          (glass badge, top-left) │
 *  │  Serviços ⤵            (big Bahnschrift title)  │
 *  │  ── row of service cards (featured + standard) ─│
 *  │  subtext (bottom-left)                          │
 *  │  ( ← → )                       ( — — — )        │
 *  │  arrows (bottom-left)   line pagination (right) │
 *  └───────────────────────────────────────────────┘
 *
 * Design System:
 *  - Background: pure black (#000).
 *  - Card surface: #0D0D0D, rounded-3xl (24px).
 *  - Borders: neon blue gradient (#0066FF) with ambient glow that
 *    intensifies on hover.
 *  - Typography: Bahnschrift (inherited globally).
 */

// How many cards are visible in the viewport at once (responsive).
function useVisibleCount() {
  const [count, setCount] = useState(getCount());
  function getCount() {
    if (typeof window === "undefined") return 3;
    if (window.innerWidth < 640) return 1; // mobile
    if (window.innerWidth < 1024) return 2; // tablet
    return 3; // desktop
  }
  useEffect(() => {
    const onResize = () => setCount(getCount());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return count;
}

export default function Services() {
  const visible = useVisibleCount();
  const [page, setPage] = useState(0);

  const total = services.length;
  const maxPage = Math.max(0, total - visible);
  const pages = maxPage + 1;

  // Keep the page in range when the viewport (visible count) changes.
  useEffect(() => {
    setPage((p) => Math.min(p, maxPage));
  }, [maxPage]);

  const go = useCallback(
    (dir) => setPage((p) => Math.min(maxPage, Math.max(0, p + dir))),
    [maxPage]
  );

  return (
    <section
      id="servicos"
      className="relative w-full overflow-hidden bg-black py-24 sm:py-28"
    >
      {/* Ambient blue aura, kept subtle so cards stay the focus */}
      <div className="hero-aura pointer-events-none absolute inset-0 z-0 opacity-60" />
      <div className="bg-grid pointer-events-none absolute inset-0 z-0" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ===== Header (left aligned) ===== */}
        <div className="max-w-2xl">
          {/* Glass badge */}
          <a
            href="#sobre"
            className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 font-display text-sm font-medium text-white/90 backdrop-blur-md transition-all duration-300 hover:border-primary/60 hover:bg-white/10"
          >
            Sobre Nós
            <ArrowUpRight />
          </a>

          <h2 className="mt-6 flex items-center gap-3 text-white">
            Serviços
            <ArrowDown className="text-primary" />
          </h2>

          <p className="mt-4 max-w-xl text-base text-muted sm:text-lg">
            Concebemos, desenvolvemos e escalamos soluções digitais à medida do
            seu negócio.
          </p>
        </div>

        {/* ===== Cards viewport ===== */}
        <div className="mt-12 overflow-hidden sm:mt-14">
          <div
            className="flex transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{
              transform: `translateX(-${page * (100 / visible)}%)`,
            }}
          >
            {services.map((s) =>
              s.featured ? (
                <FeaturedCard key={s.id} service={s} visible={visible} />
              ) : (
                <StandardCard key={s.id} service={s} visible={visible} />
              )
            )}
          </div>
        </div>

        {/* ===== Footer nav ===== */}
        <div className="mt-10 flex items-center justify-between">
          {/* Arrows (bottom-left) */}
          <div className="flex items-center gap-3">
            <NavArrow
              dir="prev"
              disabled={page === 0}
              onClick={() => go(-1)}
            />
            <NavArrow
              dir="next"
              disabled={page >= maxPage}
              onClick={() => go(1)}
            />
          </div>

          {/* Line pagination (bottom-right) */}
          <div className="flex items-center gap-2" role="tablist" aria-label="Paginação de serviços">
            {Array.from({ length: pages }).map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === page}
                aria-label={`Ir para página ${i + 1}`}
                onClick={() => setPage(i)}
                className={`h-[3px] rounded-full transition-all duration-300 ${
                  i === page
                    ? "w-9 bg-primary shadow-[0_0_12px_-1px_rgba(0,102,255,0.9)]"
                    : "w-5 bg-white/25 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   CARDS
   ============================================================ */

// Shared neon-gradient border + ambient glow wrapper.
// `flex` basis is driven by how many cards are visible.
function CardShell({ children, visible, className = "" }) {
  return (
    <div
      className="shrink-0 px-3"
      style={{ flex: `0 0 ${100 / visible}%`, maxWidth: `${100 / visible}%` }}
    >
      <div className="group relative h-full">
        {/* Neon gradient border (masked) */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-3xl p-px opacity-70 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "linear-gradient(150deg, rgba(0,102,255,0.9) 0%, rgba(0,102,255,0.25) 38%, rgba(255,255,255,0.06) 55%, rgba(0,102,255,0.25) 72%, rgba(0,102,255,0.9) 100%)",
            WebkitMask:
              "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
        />
        {/* Ambient glow — intensifies on hover */}
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-1 rounded-[28px] opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: "rgba(0,102,255,0.18)" }}
        />
        <div
          className={`relative flex h-full flex-col rounded-3xl bg-[#0D0D0D] ${className}`}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

function FeaturedCard({ service, visible }) {
  return (
    <CardShell visible={visible} className="overflow-hidden">
      {/* Banner */}
      <div className="relative h-44 w-full overflow-hidden">
        <img
          src={service.banner}
          alt=""
          loading="lazy"
          draggable={false}
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
        {/* Blue tint + legibility gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-[#0D0D0D]/30 to-transparent" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(0,102,255,0.35) 0%, transparent 60%)",
          }}
        />
        {/* Icon (top-left) */}
        <span className="absolute left-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-primary/60 bg-black/50 text-primary backdrop-blur">
          <SparkIcon />
        </span>
        {/* Overlay text */}
        <h3 className="absolute inset-x-0 bottom-3 px-5 font-display text-lg font-bold leading-tight text-white">
          {service.overlay}
        </h3>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-6">
        <Separator />
        <h4 className="mt-4 font-display text-base font-bold text-white">
          {service.title}
        </h4>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          {service.desc}
        </p>
      </div>
    </CardShell>
  );
}

function StandardCard({ service, visible }) {
  return (
    <CardShell visible={visible}>
      <div className="flex flex-1 flex-col p-6">
        {/* Title */}
        <h3 className="font-display text-lg font-bold leading-tight text-white transition-colors duration-300 group-hover:text-primary">
          {service.title}
        </h3>

        <Separator className="mt-4" />

        {/* Explanatory copy (centered vertically) */}
        <p className="my-6 flex-1 text-sm leading-relaxed text-muted">
          {service.desc}
        </p>

        {/* Action button (bottom-left) */}
        <div>
          <button
            aria-label={`Saber mais sobre ${service.title}`}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-primary/50 bg-primary/10 text-primary transition-all duration-300 hover:bg-primary hover:text-white hover:shadow-[0_0_22px_-4px_rgba(0,102,255,0.9)] active:scale-95"
          >
            <ArrowUpRight />
          </button>
        </div>
      </div>
    </CardShell>
  );
}

/* ============================================================
   BITS
   ============================================================ */

function Separator({ className = "" }) {
  return (
    <div
      className={`h-px w-full ${className}`}
      style={{
        background:
          "linear-gradient(90deg, rgba(0,102,255,0.7) 0%, rgba(255,255,255,0.08) 100%)",
      }}
    />
  );
}

function NavArrow({ dir, disabled, onClick }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={dir === "prev" ? "Anterior" : "Próximo"}
      className={`inline-flex h-12 w-12 items-center justify-center rounded-full border border-primary/50 text-white transition-all duration-300 ${
        disabled
          ? "cursor-not-allowed opacity-30"
          : "hover:border-primary hover:bg-primary/10 hover:shadow-[0_0_22px_-6px_rgba(0,102,255,0.9)] active:scale-95"
      }`}
    >
      {dir === "prev" ? <ArrowLeft /> : <ArrowRight />}
    </button>
  );
}

/* ---- Icons ---- */

function ArrowUpRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden>
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  );
}

function ArrowDown({ className = "" }) {
  return (
    <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <line x1="12" y1="5" x2="12" y2="19" />
      <polyline points="19 12 12 19 5 12" />
    </svg>
  );
}

function ArrowLeft() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

function SparkIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" />
    </svg>
  );
}
