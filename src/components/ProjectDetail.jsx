import { motion, useReducedMotion } from "framer-motion";
import { getProjectBySlug } from "../data/projects.js";

/**
 * ProjectDetail — dedicated page for a single project (route:
 * #/projetos/:slug).
 *
 * Structure ported faithfully from the Figma "Página do produto específico"
 * (node 171:294), rebuilt in the site's design system (dark glassmorphism,
 * brand blue/cyan accents #0066FF / #00BCFF, Bahnschrift, subtle motion):
 *
 *   1. Masthead     — huge project name + "PROPÓSITO DO PROJETO" block,
 *                     divider, metadata row (CLIENTE / LINK · ANO / CATEGORIA)
 *   2. Hero image   — large project mockup + caption footer (caption · 01—03)
 *   3. Editorial     — numbered rows: [01] O DESAFIO, [02] TECNOLOGIAS
 *                     (tag chips), [03] A SOLUÇÃO
 *   4. CTA          — "Visitar Projeto" gradient button (when a live URL
 *                     exists)
 *
 * The template is data-driven, so it renders for any project in
 * src/data/projects.js. Unknown slugs fall back to a friendly "not found".
 *
 * The global <Header /> and <Footer /> wrap this page from App.jsx.
 */

const EASE = [0.21, 0.47, 0.32, 0.98];

export default function ProjectDetail({ slug }) {
  const reduced = useReducedMotion();
  const project = getProjectBySlug(slug);

  if (!project) return <NotFound />;

  const {
    name,
    purpose,
    description,
    client,
    year,
    category,
    liveUrl,
    image,
    caption,
    challenge,
    challengeExtra,
    solution,
    technologies = [],
  } = project;

  // Build the numbered editorial sections that actually have content.
  const sections = [
    challenge && {
      label: "O Desafio",
      type: "text",
      body: challenge,
      extra: challengeExtra,
    },
    technologies.length > 0 && {
      label: "Tecnologias",
      type: "tags",
      items: technologies,
    },
    solution && { label: "A Solução", type: "text", body: solution },
  ].filter(Boolean);

  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: EASE, delay: 0.05 + i * 0.08 },
    }),
  };

  return (
    <main className="relative w-full overflow-hidden bg-transparent pt-28 sm:pt-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Back link */}
        <a
          href="#projetos"
          className="inline-flex items-center gap-2 font-display text-sm font-medium text-brand-300 transition-colors hover:text-brand-400"
        >
          <ArrowLeft />
          Voltar aos projetos
        </a>

        {/* ===== 1. Masthead ===== */}
        <motion.div
          initial={reduced ? false : "hidden"}
          animate="visible"
          className="mt-8"
        >
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end lg:gap-12">
            <motion.h1
              custom={0}
              variants={fadeUp}
              className="font-display text-6xl font-bold leading-[0.92] tracking-tight text-white sm:text-7xl lg:text-8xl"
            >
              {name}
            </motion.h1>
            <motion.div
              custom={1}
              variants={fadeUp}
              className="lg:max-w-md"
            >
              <p className="font-display text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-300">
                Propósito do Projeto
              </p>
              <p className="mt-3 text-[15px] leading-relaxed text-muted">
                {purpose || description}
              </p>
            </motion.div>
          </div>

          {/* Divider */}
          <div className="mt-10 h-px w-full bg-white/10" />

          {/* Metadata row */}
          <motion.div
            custom={2}
            variants={fadeUp}
            className="flex flex-col gap-8 py-6 sm:flex-row sm:items-start sm:justify-between"
          >
            <div className="flex flex-wrap gap-x-16 gap-y-6">
              <Meta label="Cliente" value={client || "Projeto interno"} />
              {liveUrl && (
                <div className="flex flex-col gap-1.5">
                  <span className="font-display text-[11px] font-semibold uppercase tracking-[0.12em] text-white/45">
                    Link de acesso
                  </span>
                  <a
                    href={liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1.5 font-display text-base font-medium text-brand-300 underline decoration-brand-300/40 underline-offset-4 transition-colors hover:text-brand-400 hover:decoration-brand-400"
                  >
                    Ver Projeto
                    <ArrowUpRight />
                  </a>
                </div>
              )}
            </div>
            <div className="flex flex-wrap gap-x-16 gap-y-6 sm:justify-end sm:text-right">
              <Meta label="Ano" value={year} align="sm:items-end" />
              <Meta label="Categoria" value={category} align="sm:items-end" />
            </div>
          </motion.div>
        </motion.div>

        {/* ===== 2. Hero image ===== */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mt-6"
        >
          <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] shadow-[0_20px_60px_rgba(0,188,255,0.08)] backdrop-blur-xl">
            <div className="relative h-[280px] w-full overflow-hidden sm:h-[440px] lg:h-[560px]">
              <img
                src={image}
                alt={`Mockup do projeto ${name}`}
                loading="lazy"
                decoding="async"
                draggable={false}
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(0,102,255,0.18) 0%, transparent 55%)",
                }}
              />
            </div>
          </div>
          {/* Caption footer */}
          <div className="mt-4 flex items-center justify-between">
            <span className="font-display text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
              {caption || description}
            </span>
            <span className="font-display text-[11px] font-semibold uppercase tracking-[0.14em] text-white/40">
              01 — 03
            </span>
          </div>
        </motion.div>

        {/* ===== 3. Editorial sections ===== */}
        <div className="mt-20">
          {sections.map((section, i) => (
            <EditorialRow
              key={section.label}
              index={i + 1}
              section={section}
              reduced={reduced}
            />
          ))}
          <div className="h-px w-full bg-white/10" />
        </div>

        {/* ===== 4. CTA ===== */}
        {liveUrl && (
          <div className="flex justify-end py-16 sm:py-24">
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex h-14 items-center gap-2.5 rounded-full bg-gradient-to-r from-brand-500 to-brand-300 px-9 font-display text-base font-bold text-white shadow-[0_4px_16px_rgba(0,188,255,0.25)] transition-all duration-300 hover:shadow-[0_12px_32px_rgba(0,188,255,0.45)] active:scale-95"
            >
              Visitar Projeto
              <ArrowRight />
            </a>
          </div>
        )}
        {!liveUrl && <div className="pb-16 sm:pb-24" />}
      </div>
    </main>
  );
}

/* ============================================================
   PARTS
   ============================================================ */

function Meta({ label, value, align = "" }) {
  return (
    <div className={`flex flex-col gap-1.5 ${align}`}>
      <span className="font-display text-[11px] font-semibold uppercase tracking-[0.12em] text-white/45">
        {label}
      </span>
      <span className="font-display text-base font-medium text-white">
        {value}
      </span>
    </div>
  );
}

function EditorialRow({ index, section, reduced }) {
  const num = String(index).padStart(2, "0");
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: EASE }}
      className="flex flex-col gap-10 pb-10"
    >
      <div className="h-px w-full bg-white/10" />
      <div className="flex flex-col gap-8 pb-6 md:flex-row md:gap-10">
        {/* Left column — number + label */}
        <div className="flex shrink-0 gap-6 md:w-[280px]">
          <span className="font-display text-xs font-semibold text-white/45">
            [ {num} ]
          </span>
          <span className="font-display text-xs font-semibold uppercase tracking-[0.1em] text-brand-300">
            {section.label}
          </span>
        </div>

        {/* Right column — content */}
        <div className="flex flex-1 flex-col gap-4">
          {section.type === "text" && (
            <>
              <p className="font-display text-2xl font-semibold leading-snug text-white sm:text-3xl">
                {section.body}
              </p>
              {section.extra && (
                <p className="text-base leading-relaxed text-muted">
                  {section.extra}
                </p>
              )}
            </>
          )}

          {section.type === "tags" && (
            <div className="flex flex-wrap gap-3">
              {section.items.map((tech) => (
                <span
                  key={tech}
                  className="inline-flex items-center rounded-full border border-brand-300/25 bg-white/[0.04] px-5 py-2.5 font-display text-[13px] font-medium text-white backdrop-blur-sm transition-colors duration-300 hover:border-brand-300/60 hover:bg-brand-500/10"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function NotFound() {
  return (
    <main className="relative flex min-h-[70vh] w-full items-center justify-center bg-transparent px-4 pt-28">
      <div className="text-center">
        <h1 className="font-display text-4xl font-extrabold text-white sm:text-5xl">
          Projeto não encontrado
        </h1>
        <p className="mt-4 text-muted">
          O projeto que você procura não existe ou foi movido.
        </p>
        <a
          href="#projetos"
          className="mt-8 inline-flex items-center gap-2 font-display text-sm font-semibold text-brand-300 transition-colors hover:text-brand-400"
        >
          <ArrowLeft />
          Voltar aos projetos
        </a>
      </div>
    </main>
  );
}

/* ---- Icons ---- */

function ArrowLeft() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden>
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

function ArrowUpRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden>
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  );
}
