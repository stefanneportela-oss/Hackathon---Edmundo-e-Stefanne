import { useState, useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { categories, projects } from "../data/projects.js";

/**
 * Portfolio — full projects page (route: #/projetos).
 *
 * Content mirrors the official site (senaisolucoesdigitais.com.br): same
 * projects, descriptions and tags. Layout inspired by the Figma "product page"
 * reference (left sidebar of areas + main content grid), rebuilt in the site's
 * design system: dark glassmorphism, brand blue/cyan accents, Bahnschrift.
 *
 * A tag sidebar filters the project grid (2 columns). Responsive: the sidebar
 * collapses into a horizontal chip row above the grid on mobile/tablet.
 */

const EASE = [0.21, 0.47, 0.32, 0.98];

export default function Portfolio() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState("todos");

  const visible = useMemo(
    () =>
      active === "todos"
        ? projects
        : projects.filter((p) => p.tags.includes(active)),
    [active]
  );

  const cardIn = {
    hidden: { opacity: 0, y: 24 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: EASE, delay: i * 0.06 },
    }),
  };

  return (
    <main className="relative w-full overflow-hidden bg-transparent pt-28 pb-24 sm:pt-32 sm:pb-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ===== Header ===== */}
        <div className="max-w-3xl">
          <a
            href="#/"
            className="inline-flex items-center gap-2 font-display text-sm font-medium text-brand-300 transition-colors hover:text-brand-400"
          >
            <ArrowLeft />
            Voltar ao início
          </a>
          <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.1] text-white sm:text-5xl md:text-6xl">
            Projetos e <span className="text-gradient">Soluções</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            Explore todos os projetos e soluções digitais que desenvolvemos.
          </p>
        </div>

        {/* ===== Body: sidebar + grid ===== */}
        <div className="mt-12 flex flex-col gap-8 lg:mt-16 lg:flex-row lg:gap-12">
          {/* ---- Sidebar (desktop) / chip row (mobile) ---- */}
          <aside className="lg:w-56 lg:shrink-0">
            <p className="hidden font-display text-[13px] font-semibold uppercase tracking-[0.14em] text-white/50 lg:block">
              Filtrar por área
            </p>
            <nav
              className="mt-0 flex gap-2 overflow-x-auto pb-2 lg:mt-4 lg:flex-col lg:gap-1 lg:overflow-visible lg:pb-0"
              aria-label="Filtrar projetos por tag"
            >
              {categories.map((cat) => {
                const isActive = active === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActive(cat.id)}
                    aria-pressed={isActive}
                    className={`shrink-0 whitespace-nowrap rounded-lg px-4 py-2.5 text-left font-display text-sm font-medium transition-all duration-300 lg:w-full ${
                      isActive
                        ? "bg-brand-500/15 text-white shadow-[inset_0_0_0_1px_rgba(0,188,255,0.35)]"
                        : "text-muted hover:bg-white/[0.06] hover:text-white"
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* ---- Project grid (2 columns) ---- */}
          <div className="min-w-0 flex-1">
            <motion.div
              key={active}
              initial={reduced ? false : "hidden"}
              animate="visible"
              className="grid grid-cols-1 gap-6 md:grid-cols-2"
            >
              {visible.map((project, i) => (
                <motion.div key={project.slug} custom={i} variants={cardIn}>
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </motion.div>

            {visible.length === 0 && (
              <p className="text-muted">Nenhum projeto nesta categoria ainda.</p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

/**
 * ProjectCard — structure ported faithfully from the Figma "Feature Card"
 * (node 19:1386), rebuilt in the site's design system:
 *
 *   ┌──────────────────────────────────┐
 *   │ Card Text Info (padding 24)       │
 *   │  Header Row: título ──── [ Tag ]  │
 *   │  Descrição                        │
 *   ├──────────────────────────────────┤  ← top border
 *   │ UI Preview Container (h ~220)     │
 *   │   inner UI mock (glass panel)     │
 *   └──────────────────────────────────┘
 *
 * Since projects have no bundled screenshots, the "UI Preview Container" holds
 * a stylised mock panel (icon + client/year + tags + "Ver detalhes"), matching
 * the framed inner-mock look of the reference.
 */
function ProjectCard({ project }) {
  const { name, description, tags, slug, image } = project;
  const primaryTag = tags[0];

  // Card links to the dedicated project detail page (#/projetos/:slug).
  return (
    <div className="group relative h-full">
      {/* Ambient neon glow on hover */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-0.5 rounded-[16px] opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: "rgba(0,102,255,0.22)" }}
      />
      <a
        href={`#/projetos/${slug}`}
        aria-label={`Ver detalhes do projeto ${name}`}
        className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] shadow-[0_8px_24px_rgba(0,188,255,0.05)] backdrop-blur-xl transition-transform duration-300 ease-out group-hover:-translate-y-1"
      >
        {/* ---- Card Text Info (top) ---- */}
        <div className="flex flex-col gap-2.5 p-6">
          {/* Header row: title (left) + primary tag (right) */}
          <div className="flex items-center justify-between gap-3">
            <h3 className="min-w-0 truncate font-display text-lg font-semibold tracking-tight text-brand-300">
              {name}
            </h3>
            <span className="shrink-0 whitespace-nowrap rounded-md border border-brand-300/60 bg-brand-500/10 px-2 py-1 font-display text-[11px] font-medium text-brand-300">
              {primaryTag}
            </span>
          </div>

          {/* Short description */}
          <p className="text-[13px] leading-relaxed text-[#bbbbbb]">
            {description}
          </p>
        </div>

        {/* ---- UI Preview Container (bottom) — project image ---- */}
        <div className="mt-auto flex h-[220px] items-center justify-center overflow-hidden border-t border-white/10 bg-[#131315] p-5">
          <div className="relative h-full w-full overflow-hidden rounded-lg border border-white/10">
            <img
              src={image}
              alt={`Prévia do projeto ${name}`}
              loading="lazy"
              decoding="async"
              draggable={false}
              className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </div>
        </div>
      </a>
    </div>
  );
}

function ArrowLeft() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  );
}


