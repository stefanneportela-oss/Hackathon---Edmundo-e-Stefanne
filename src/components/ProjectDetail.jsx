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
    image,
    challenge,
    challengeExtra,
    solution,
    technologies = [],
    stores,
    liveUrl,
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
        {/* Back link → projects listing page (#/projetos), not a section anchor */}
        <a
          href="#/projetos"
          className="inline-flex items-center gap-2 font-display text-sm font-medium text-brand-300 transition-colors hover:text-brand-400"
        >
          <ArrowLeft />
          Voltar aos projetos
        </a>

        {/* ===== 1. Masthead ===== */}
        <motion.div
          initial={reduced ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
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
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mt-6"
        >
          <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] shadow-[0_20px_60px_rgba(0,188,255,0.08)] backdrop-blur-xl">
            <div className="relative h-[200px] w-full overflow-hidden sm:h-[300px] lg:h-[380px]">
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

        {/* ===== 4. CTA — store buttons or live link ===== */}
        {(stores || liveUrl) && (
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="mt-12 flex flex-wrap items-center gap-4"
          >
            {stores?.playStore && (
              <a
                href={stores.playStore}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-brand-500 to-brand-300 px-7 py-3.5 font-display text-sm font-bold text-[#04101f] shadow-[0_10px_28px_rgba(0,188,255,0.3)] transition-all duration-300 hover:shadow-[0_14px_36px_rgba(0,188,255,0.45)] active:scale-95"
              >
                Baixar no Google Play
                <ExternalLink />
              </a>
            )}
            {stores?.appStore && (
              <a
                href={stores.appStore}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 rounded-full border border-white/25 px-7 py-3.5 font-display text-sm font-semibold text-white transition-all duration-300 hover:border-brand-300/70 hover:bg-white/[0.06] active:scale-95"
              >
                Baixar na App Store
                <ExternalLink />
              </a>
            )}
            {!stores && liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-brand-500 to-brand-300 px-7 py-3.5 font-display text-sm font-bold text-[#04101f] shadow-[0_10px_28px_rgba(0,188,255,0.3)] transition-all duration-300 hover:shadow-[0_14px_36px_rgba(0,188,255,0.45)] active:scale-95"
              >
                Visitar Projeto
                <ExternalLink />
              </a>
            )}
          </motion.div>
        )}

        <div className="pb-16 sm:pb-24" />
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
      viewport={{ once: false, amount: 0.3 }}
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
          href="#/projetos"
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

function ExternalLink() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden>
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

