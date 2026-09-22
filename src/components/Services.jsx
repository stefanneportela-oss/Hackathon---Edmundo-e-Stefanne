import { useRef, useState, useCallback, useEffect } from "react";
import { services } from "../data/services.js";

/**
 * Services section ("O Que Fazemos" / "What We Do").
 *
 * Layout mirrors the reference exactly, adapted to the Dark/Neon DS:
 *
 *  Serviços ⤵                                    (full-width title, top)
 *  ┌──────────────┬──────────────────────────────────────────────┐
 *  │ [Sobre Nós ↗]│  ┌ featured ┐ ┌ card ┐ ┌ card ┐ ┌ card ┐ …   │
 *  │              │  │ banner   │ │ text │ │ text │ │ text │     │
 *  │              │  └──────────┘ └──────┘ └──────┘ └──────┘     │
 *  │  subtext     │                                              │
 *  │  ( ← → )     │                              ( — — — )       │
 *  └──────────────┴──────────────────────────────────────────────┘
 *   left rail: badge (top), subtext + arrows (bottom)
 *   right: horizontal track of cards; pagination bottom-right
 *
 * Design System:
 *  - Background pure black (#000). Card surface #0D0D0D, rounded-3xl (24px).
 *  - Neon blue (#0066FF) gradient borders + ambient glow, stronger on hover.
 *  - Bahnschrift typography (inherited globally).
 */

// How many cards are visible in the right-hand track (responsive).
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
      {/* Ambient blue aura + faint grid, kept subtle so cards stay the focus */}
      <div className="hero-aura pointer-events-none absolute inset-0 z-0 opacity-50" />
      <div className="bg-grid pointer-events-none absolute inset-0 z-0" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ===== Full-width title (top) ===== */}
        <h2 className="flex items-center gap-3 text-white">
          Serviços
          <ArrowDown className="text-primary" />
        </h2>

        {/* ===== Two-column body: left rail + card track ===== */}
        <div className="mt-10 flex flex-col gap-8 lg:mt-14 lg:flex-row lg:gap-10">
          {/* ---- Left rail ---- */}
          <div className="flex shrink-0 flex-col lg:w-56">
            {/* Badge (top) */}
            <a
              href="#sobre"
              className="group inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 font-display text-sm font-medium text-white/90 backdrop-blur-md transition-all duration-300 hover:border-primary/60 hover:bg-white/10"
            >
              Sobre Nós
              <ArrowUpRight />
            </a>

            {/* Subtext (pushed to the bottom of the rail on desktop) */}
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-muted lg:mt-auto lg:pt-10">
              Concebemos, desenvolvemos e escalamos qualquer solução digital de
              que o seu negócio precise.
            </p>

            {/* Arrows (bottom-left) */}
            <div className="mt-8 flex items-center gap-3">
              <NavArrow dir="prev" disabled={page === 0} onClick={() => go(-1)} />
              <NavArrow
                dir="next"
                disabled={page >= maxPage}
                onClick={() => go(1)}
              />
            </div>
          </div>

          {/* ---- Card track ---- */}
          <div className="min-w-0 flex-1">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{ transform: `translateX(-${page * (100 / visible)}%)` }}
              >
                {services.map((s) => (
                  <ServiceCard key={s.id} service={s} visible={visible} />
                ))}
              </div>
            </div>

            {/* Line pagination (bottom-right of the track) */}
            <div
              className="mt-8 flex items-center justify-end gap-2"
              role="tablist"
              aria-label="Paginação de serviços"
            >
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
                      : "w-6 bg-white/25 hover:bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   CARDS
   ============================================================ */

/**
 * ServiceCard — a single card with two states (one component, no variants):
 *
 *  DEFAULT (rest): dark surface showing title, separator, copy and the
 *                  circular action button. No image.
 *  HOVER:          a 3D-tech banner image cross-fades in over the card, with
 *                  an icon (top-left) and an overlay headline (bottom). The
 *                  neon border + ambient glow intensify.
 *
 * Basis (width) is driven by how many cards are visible in the track.
 */
function ServiceCard({ service, visible }) {
  return (
    <div
      className="shrink-0 px-2.5"
      style={{ flex: `0 0 ${100 / visible}%`, maxWidth: `${100 / visible}%` }}
    >
      <div className="group relative h-full min-h-[400px]">
        {/* Neon gradient border (masked) — brightens on hover */}
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
        {/* Ambient glow — appears on hover */}
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-1 rounded-[28px] opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: "rgba(0,102,255,0.18)" }}
        />

        <div className="relative flex h-full flex-col overflow-hidden rounded-3xl bg-[#0D0D0D]">
          {/* ---- DEFAULT content ---- */}
          <div className="flex flex-1 flex-col p-6">
            <h3 className="font-display text-xl font-bold leading-snug text-white transition-colors duration-300 group-hover:text-primary">
              {service.title}
            </h3>

            <Separator className="mt-5" />

            <p className="mt-5 flex-1 text-sm leading-relaxed text-muted">
              {service.desc}
            </p>

            {/* Circular action button (bottom-left) */}
            <div>
              <button
                aria-label={`Saber mais sobre ${service.title}`}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-primary/50 bg-primary/10 text-primary transition-all duration-300 hover:bg-primary hover:text-white hover:shadow-[0_0_22px_-4px_rgba(0,102,255,0.9)] active:scale-95"
              >
                <GridIcon />
              </button>
            </div>
          </div>

          {/* ---- HOVER banner (revealed on hover) ---- */}
          <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100">
            <img
              src={service.banner}
              alt=""
              loading="lazy"
              draggable={false}
              className="h-full w-full scale-105 object-cover transition-transform duration-700 ease-out group-hover:scale-100"
            />
            {/* Legibility + blue tint */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/40" />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(135deg, rgba(0,102,255,0.4) 0%, transparent 60%)",
              }}
            />
            {/* Icon (top-left) */}
            <span className="absolute left-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-primary/60 bg-black/50 text-primary backdrop-blur">
              <SparkIcon />
            </span>
            {/* Overlay headline (bottom) */}
            <h3 className="absolute inset-x-0 bottom-5 px-5 font-display text-2xl font-bold leading-tight text-white">
              {service.overlay}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   BITS
   ============================================================ */

function Separator({ className = "" }) {
  return (
    <div
      className={`h-px w-10 ${className}`}
      style={{
        background:
          "linear-gradient(90deg, rgba(0,102,255,0.9) 0%, rgba(0,102,255,0.2) 100%)",
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

function GridIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </svg>
  );
}
