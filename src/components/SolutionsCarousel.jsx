import { useRef, useState, useEffect, useCallback } from "react";
import { solutions } from "../data/solutions.js";

export default function SolutionsCarousel() {
  const trackRef = useRef(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  // Drag-to-scroll state
  const drag = useRef({ down: false, startX: 0, startScroll: 0, moved: false });

  const updateArrows = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    setCanPrev(el.scrollLeft > 8);
    setCanNext(el.scrollLeft < maxScroll - 8);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    updateArrows();
    el.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", updateArrows);
    return () => {
      el.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, [updateArrows]);

  const scrollByCards = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector("[data-card]");
    const amount = card ? card.offsetWidth + 24 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  // ---- Pointer drag handlers ----
  const onPointerDown = (e) => {
    const el = trackRef.current;
    if (!el) return;
    drag.current = {
      down: true,
      startX: e.clientX,
      startScroll: el.scrollLeft,
      moved: false,
    };
    el.setPointerCapture?.(e.pointerId);
  };

  const onPointerMove = (e) => {
    const el = trackRef.current;
    if (!el || !drag.current.down) return;
    const dx = e.clientX - drag.current.startX;
    if (Math.abs(dx) > 4) drag.current.moved = true;
    el.scrollLeft = drag.current.startScroll - dx;
  };

  const endDrag = (e) => {
    const el = trackRef.current;
    if (el) el.releasePointerCapture?.(e.pointerId);
    // Delay clearing so click handlers can read `moved`
    setTimeout(() => (drag.current.down = false), 0);
  };

  return (
    <div className="relative w-full">
      {/* Header row: label + arrows */}
      <div className="mb-5 flex items-end justify-between gap-4 px-1">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-300">
            Soluções digitais
          </p>
          <h3 className="mt-1 text-white">Produtos que transformam a indústria</h3>
        </div>
        <div className="hidden items-center gap-2 sm:flex">
          <ArrowButton
            dir="left"
            disabled={!canPrev}
            onClick={() => scrollByCards(-1)}
          />
          <ArrowButton
            dir="right"
            disabled={!canNext}
            onClick={() => scrollByCards(1)}
          />
        </div>
      </div>

      {/* Track */}
      <div
        ref={trackRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        className="no-scrollbar flex cursor-grab snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-2 active:cursor-grabbing"
        style={{ touchAction: "pan-y" }}
      >
        {solutions.map((s) => (
          <article
            key={s.id}
            data-card
            className="group relative w-[80vw] shrink-0 snap-start overflow-hidden rounded-2xl border border-white/10 bg-ink-800 transition-all duration-500 ease-out hover:-translate-y-2 hover:border-brand-300/60 hover:shadow-[0_20px_60px_-20px_rgba(0,188,255,0.55)] sm:w-[380px]"
            onClickCapture={(e) => {
              // Prevent click navigation right after a drag
              if (drag.current.moved) {
                e.preventDefault();
                e.stopPropagation();
              }
            }}
          >
            {/* Image */}
            <div className="relative aspect-[16/11] overflow-hidden">
              <img
                src={s.src}
                alt={s.title}
                draggable={false}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-800 via-ink-800/20 to-transparent" />
              {/* Blue glow sweep on hover */}
              <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-gradient-to-tr from-brand-500/25 via-transparent to-brand-300/20" />
              <span className="absolute left-4 top-4 rounded-full border border-brand-300/40 bg-black/50 px-3 py-1 text-xs font-medium text-brand-300 backdrop-blur">
                {s.tag}
              </span>
            </div>

            {/* Body */}
            <div className="p-5">
              <h3 className="text-lg text-white">{s.title}</h3>
              <p className="mt-2 text-sm text-muted">{s.desc}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-300 opacity-0 transition-all duration-300 group-hover:opacity-100">
                Saiba mais
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
            </div>

            {/* Animated border highlight */}
            <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/5 transition-all duration-500 group-hover:ring-brand-300/50" />
          </article>
        ))}
      </div>

      {/* Mobile arrows below */}
      <div className="mt-4 flex items-center justify-center gap-3 sm:hidden">
        <ArrowButton dir="left" disabled={!canPrev} onClick={() => scrollByCards(-1)} />
        <ArrowButton dir="right" disabled={!canNext} onClick={() => scrollByCards(1)} />
      </div>
    </div>
  );
}

function ArrowButton({ dir = "right", onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={dir === "left" ? "Anterior" : "Próximo"}
      className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white backdrop-blur transition-all duration-300 hover:border-brand-300 hover:bg-brand-500/20 hover:scale-110 active:scale-95 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:scale-100 disabled:hover:border-white/15 disabled:hover:bg-white/5"
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={dir === "left" ? "rotate-180" : ""}
        aria-hidden
      >
        <line x1="5" y1="12" x2="19" y2="12" />
        <polyline points="12 5 19 12 12 19" />
      </svg>
    </button>
  );
}
