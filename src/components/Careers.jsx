import { useRef, useEffect } from "react";
import { careers } from "../data/careers.js";
import SectionReveal from "./SectionReveal.jsx";
import useAnimationsPaused from "../hooks/useAnimationsPaused.js";

/**
 * Careers — "Trabalhe Conosco" sticky stacking cards.
 *
 * As the user scrolls, each card scrolls into view and sticks to the top
 * (position: sticky). The next card slides up and over the previous one,
 * building an elegant layered stack. Cards that get covered scale down
 * slightly and dim, reinforcing depth (driven by a scroll listener writing
 * CSS custom properties — no per-frame React re-render).
 *
 * Design System:
 *  - Section is fully transparent → the global infinite background (bg-grid +
 *    mouse glow) shows through.
 *  - Card surface: matte translucent #0D0D0D/90 + backdrop-blur, rounded-3xl,
 *    subtle translucent border.
 *  - Hover on the active card: Primary-Blue (#0066FF) gradient border + neon
 *    ambient glow.
 *  - Fully responsive; the sticky stack degrades gracefully on mobile.
 */
export default function Careers() {
  const listRef = useRef(null);
  const raf = useRef(0);
  const paused = useAnimationsPaused();

  // Depth effect: as a card gets covered by the next sticky card, shrink and
  // dim it based on how far it has scrolled past its sticky anchor.
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const cards = Array.from(list.querySelectorAll("[data-stack-card]"));
    if (cards.length === 0) return;

    // Paused (or reduced motion) → flatten all depth transforms and don't
    // react to scroll, so the stack sits still.
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced || paused) {
      cards.forEach((card) => {
        card.style.setProperty("--stack-scale", "1");
        card.style.setProperty("--stack-opacity", "1");
      });
      return;
    }

    const STICKY_TOP = 120; // must match the `top` used on the card wrapper

    const update = () => {
      raf.current = 0;
      cards.forEach((card, i) => {
        // Last card never gets covered.
        if (i === cards.length - 1) {
          card.style.setProperty("--stack-scale", "1");
          card.style.setProperty("--stack-opacity", "1");
          return;
        }
        const rect = card.getBoundingClientRect();
        // How far past the sticky anchor this card has been pushed (0..1),
        // measured over roughly one card height of scroll travel.
        const traveled = STICKY_TOP - rect.top;
        const progress = Math.min(1, Math.max(0, traveled / (rect.height || 1)));
        const scale = 1 - progress * 0.06; // down to 0.94
        const opacity = 1 - progress * 0.25; // down to 0.75
        card.style.setProperty("--stack-scale", scale.toFixed(4));
        card.style.setProperty("--stack-opacity", opacity.toFixed(4));
      });
    };

    const onScroll = () => {
      if (!raf.current) raf.current = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [paused]);

  return (
    <section
      id="trabalhe-conosco"
      className="relative w-full bg-transparent py-24 sm:py-28"
    >
      {/* Plain container (no SectionReveal wrapper): a transformed ancestor
          creates a containing block that traps `position: sticky`, breaking
          the stacking effect. The section stays transform-free so the cards
          stick to the viewport and layer over each other correctly. The header
          gets its own scoped reveal. */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* ===== Two-column layout: header (left) + cards (right) ===== */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start">
          {/* ---- Left column: header (sticky on desktop) ---- */}
          <SectionReveal className="flex flex-col items-start gap-4 text-left lg:col-span-5 lg:sticky lg:top-28" amount={0.3}>
            <SectionReveal.Item as="h2" className="text-white">
              Construa o futuro <span className="text-gradient">com a gente</span>
            </SectionReveal.Item>
            <SectionReveal.Item
              as="p"
              className="max-w-xl text-base leading-relaxed text-muted"
            >
              Áreas em que estamos sempre em busca de talentos para transformar a
              indústria através da tecnologia.
            </SectionReveal.Item>
          </SectionReveal>

          {/* ---- Right column: sticky stack ---- */}
          <div ref={listRef} className="flex flex-col gap-8 lg:col-span-7">
            {careers.map((c, i) => (
              <div
                key={c.id}
                data-stack-card
                className="sticky"
                style={{ top: `${120 + i * 16}px`, zIndex: i + 1 }}
              >
                <CareerCard career={c} index={i} total={careers.length} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CareerCard({ career, index, total }) {
  return (
    <div
      className="group relative origin-top"
      style={{
        transform: "scale(var(--stack-scale, 1))",
        opacity: "var(--stack-opacity, 1)",
        transition: "transform 0.15s linear, opacity 0.15s linear",
      }}
    >
      {/* Neon gradient border (masked) — brightens on hover */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-3xl p-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "linear-gradient(135deg, rgba(0,102,255,0.9) 0%, rgba(0,102,255,0.15) 45%, rgba(0,210,255,0.7) 100%)",
          WebkitMask:
            "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />
      {/* Ambient neon glow — appears on hover */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-1 rounded-[28px] opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: "rgba(0,102,255,0.2)" }}
      />

      {/* Card surface */}
      <article className="relative flex min-h-[300px] flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-[#0D0D0D]/90 p-7 backdrop-blur-md sm:min-h-[340px] sm:p-10">
        {/* Top: index + title + tags */}
        <div>
          <div className="mb-5 flex items-center justify-between">
            <span className="font-mono text-xs tracking-widest text-white/40">
              {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-500/15 text-brand-300 shadow-[inset_0_0_0_1px_rgba(0,188,255,0.25)]">
              <CardIcon name={career.icon} />
            </span>
          </div>

          <h3 className="font-display text-2xl font-bold uppercase leading-tight tracking-tight text-white sm:text-4xl">
            {career.title}
          </h3>

          {/* Subcategory tag pills */}
          <ul className="mt-5 flex flex-wrap gap-2.5">
            {career.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-white/12 bg-white/[0.04] px-3.5 py-1.5 font-display text-xs font-medium text-white/75 backdrop-blur-sm transition-colors duration-300 group-hover:border-primary/40 group-hover:text-white"
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom: description + trailing icon */}
        <div className="mt-8 flex items-end gap-4">
          <p className="max-w-2xl flex-1 text-sm leading-relaxed text-muted sm:text-base">
            {career.desc}
          </p>
          <a
            href="https://fiesc.pandape.infojobs.com.br/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Candidatar-se para ${career.title} no portal de vagas da FIESC`}
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-primary/50 bg-primary/10 text-primary transition-all duration-300 hover:bg-primary hover:text-white hover:shadow-[0_0_22px_-4px_rgba(0,102,255,0.9)] active:scale-95"
          >
            <ArrowUpRight />
          </a>
        </div>
      </article>
    </div>
  );
}

/* ---- Icons ---- */

function CardIcon({ name }) {
  const common = {
    width: 26,
    height: 26,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
    className: "text-primary/80 transition-colors duration-300 group-hover:text-primary",
  };
  switch (name) {
    case "brain":
      return (
        <svg {...common}>
          <path d="M12 5a3 3 0 0 0-3 3 3 3 0 0 0-3 3 3 3 0 0 0 1 5 3 3 0 0 0 5 1 3 3 0 0 0 5-1 3 3 0 0 0 1-5 3 3 0 0 0-3-3 3 3 0 0 0-3-3z" />
          <path d="M12 5v13" />
        </svg>
      );
    case "cube":
      return (
        <svg {...common}>
          <path d="M12 2 3 7v10l9 5 9-5V7l-9-5z" />
          <path d="M3 7l9 5 9-5M12 12v10" />
        </svg>
      );
    case "sparkles":
      return (
        <svg {...common}>
          <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" />
        </svg>
      );
    case "code":
    default:
      return (
        <svg {...common}>
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      );
  }
}

function ArrowUpRight() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  );
}
