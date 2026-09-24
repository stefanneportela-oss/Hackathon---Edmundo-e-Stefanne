import { useState, useCallback } from "react";
import SectionReveal from "./SectionReveal.jsx";

/**
 * Testimonials — "Depoimentos de Clientes".
 *
 * Recreates the reference testimonial card, adapted to the Dark/Neon DS:
 *  - Orange accents in the reference → Primary Blue / Neon (#0066FF).
 *  - Transparent section over the global background; Bahnschrift everywhere.
 *
 * Card anatomy (glassmorphism dark, rounded-3xl):
 *  - Header: "Depoimento de Cliente" tag (top-left) + numbering & nav (top-right).
 *  - Left column: circular monochrome avatar, author name (neon blue) + role,
 *    LinkedIn handle, and the partner company wordmark bottom-left.
 *  - Right column: large highlighted quote (white) + supporting paragraph.
 *  - Decorative giant quotation mark + neon ambient glow at the bottom-right.
 */
const TESTIMONIALS = [
  {
    id: 1,
    name: "Ricardo Alves",
    role: "CEO",
    handle: "linkedin.com/in/ricardoalves",
    company: "INDÚSTRIA MERCUR",
    quote:
      "O SENAI Soluções Digitais entregou uma plataforma robusta que transformou nossa operação e nos colocou anos à frente.",
    detail:
      "Do diagnóstico à entrega, a equipe foi ágil, técnica e comprometida. A solução se integrou perfeitamente aos nossos processos e já gera resultados mensuráveis. Recomendo fortemente.",
    avatar:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&h=200&q=80",
  },
  {
    id: 2,
    name: "Camila Duarte",
    role: "Diretora de Tecnologia",
    handle: "linkedin.com/in/camiladuarte",
    company: "LOGTECH BRASIL",
    quote:
      "A parceria com o SENAI Soluções Digitais elevou o nível de maturidade digital da nossa empresa em poucos meses.",
    detail:
      "Arquitetura moderna, código limpo e um time que realmente entende as dores da indústria. O suporte contínuo e a visão estratégica fizeram toda a diferença no projeto.",
    avatar:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&h=200&q=80",
  },
  {
    id: 3,
    name: "Fernando Rocha",
    role: "Gerente de Inovação",
    handle: "linkedin.com/in/fernandorocha",
    company: "SESI SC",
    quote:
      "Aplicaram inteligência artificial ao nosso core business com resultados que superaram as expectativas.",
    detail:
      "Da concepção ao deploy, tudo foi conduzido com excelência técnica e transparência. Ganhamos eficiência, segurança e uma base sólida para escalar. Uma parceria de verdade.",
    avatar:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&h=200&q=80",
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const total = TESTIMONIALS.length;

  const go = useCallback(
    (dir) => setIndex((i) => (i + dir + total) % total),
    [total]
  );

  const t = TESTIMONIALS[index];

  return (
    <section
      id="depoimentos"
      aria-label="Depoimentos de clientes"
      className="relative w-full bg-transparent py-24 sm:py-28"
    >
      <SectionReveal className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" amount={0.35}>
        <SectionReveal.Item className="relative">
          {/* Neon ambient glow behind the bottom-right corner */}
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-10 -right-10 h-64 w-64 rounded-full bg-primary/40 opacity-40 blur-3xl"
          />

          {/* ===== Card ===== */}
          <article className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0D0D0D]/80 p-8 backdrop-blur-xl sm:p-12">
            {/* Header */}
            <div className="flex items-center justify-between">
              <span className="font-display text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
                Depoimento de Cliente
              </span>
              <div className="flex items-center gap-4">
                <span className="font-mono text-xs tracking-widest text-white/50">
                  {String(index + 1).padStart(3, "0")} /{" "}
                  {String(total).padStart(3, "0")}
                </span>
                <div className="flex items-center gap-2">
                  <NavArrow dir="prev" onClick={() => go(-1)} />
                  <NavArrow dir="next" onClick={() => go(1)} />
                </div>
              </div>
            </div>

            {/* Body: two columns */}
            <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
              {/* Left: profile */}
              <div className="flex flex-col gap-6 lg:col-span-4">
                <img
                  src={t.avatar}
                  alt={`Foto de ${t.name}`}
                  loading="lazy"
                  draggable={false}
                  className="h-24 w-24 rounded-full object-cover grayscale"
                />
                <div>
                  <h3 className="font-display text-2xl font-bold text-primary">
                    {t.name}
                  </h3>
                  <p className="mt-1 font-display text-base text-white/60">
                    ({t.role})
                  </p>
                  <p className="mt-3 font-display text-sm text-muted">
                    {t.handle}
                  </p>
                </div>
                <p className="mt-auto pt-6 font-display text-sm font-semibold uppercase tracking-widest text-white/80">
                  {t.company}
                </p>
              </div>

              {/* Right: quote + detail */}
              <div className="lg:col-span-8">
                <p className="font-display text-2xl font-medium leading-snug text-white sm:text-3xl">
                  {t.quote}
                </p>
                <p className="mt-8 max-w-2xl font-display text-sm leading-relaxed text-muted sm:text-base">
                  {t.detail}
                </p>
              </div>
            </div>

            {/* Decorative giant quotation mark (bottom-right) */}
            <QuoteMark className="pointer-events-none absolute -bottom-6 right-6 text-primary opacity-90" />
          </article>
        </SectionReveal.Item>
      </SectionReveal>
    </section>
  );
}

/* ---- Bits ---- */

function NavArrow({ dir, onClick }) {
  return (
    <button
      onClick={onClick}
      aria-label={dir === "prev" ? "Depoimento anterior" : "Próximo depoimento"}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-primary/50 text-white transition-all duration-300 hover:border-primary hover:bg-primary/10 hover:shadow-[0_0_18px_-6px_rgba(0,102,255,0.9)] active:scale-95"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        {dir === "prev" ? (
          <>
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </>
        ) : (
          <>
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </>
        )}
      </svg>
    </button>
  );
}

function QuoteMark({ className = "" }) {
  return (
    <svg
      width="120"
      height="120"
      viewBox="0 0 100 100"
      fill="currentColor"
      aria-hidden
      className={className}
    >
      <path d="M12 58c0-16 10-30 26-36l4 8c-10 4-16 12-17 20h11c4 0 7 3 7 7v14c0 4-3 7-7 7H19c-4 0-7-3-7-7V58zm44 0c0-16 10-30 26-36l4 8c-10 4-16 12-17 20h11c4 0 7 3 7 7v14c0 4-3 7-7 7H63c-4 0-7-3-7-7V58z" />
    </svg>
  );
}
