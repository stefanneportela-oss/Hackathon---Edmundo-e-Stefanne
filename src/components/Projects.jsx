import { useRef, useEffect } from "react";
import SolutionsCarousel from "./SolutionsCarousel.jsx";
import PrimaryButton from "./ui/PrimaryButton.jsx";
import SectionReveal from "./SectionReveal.jsx";
import useAnimationsPaused from "../hooks/useAnimationsPaused.js";

const features = [
  {
    title: "Inovação Constante",
    desc: "Sempre na vanguarda das tecnologias emergentes.",
  },
  {
    title: "Equipe Especializada",
    desc: "Profissionais multidisciplinares e experientes.",
  },
  {
    title: "Soluções Sob Medida",
    desc: "Desenvolvemos para suas necessidades específicas.",
  },
];

export default function Projects() {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);
  const raf = useRef(0);
  const pending = useRef(null);
  const paused = useAnimationsPaused();

  // Reveal each feature card based on how close the cursor is to it,
  // so the gradient "passing under" a card lights it up (like the reference).
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Paused → clear any glow and skip cursor tracking entirely.
    if (paused) {
      cardRefs.current.forEach((c) => c?.style.setProperty("--reveal", "0"));
      return;
    }

    const apply = () => {
      raf.current = 0;
      const p = pending.current;
      if (!p) return;
      cardRefs.current.forEach((card) => {
        if (!card) return;
        const r = card.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const dist = Math.hypot(p.x - cx, p.y - cy);
        const radius = 260; // reveal range in px
        const reveal = Math.max(0, 1 - dist / radius);
        card.style.setProperty("--reveal", reveal.toFixed(3));
      });
    };

    const onMove = (e) => {
      pending.current = { x: e.clientX, y: e.clientY };
      if (!raf.current) raf.current = requestAnimationFrame(apply);
    };
    const onLeave = () => {
      cardRefs.current.forEach((c) => c?.style.setProperty("--reveal", "0"));
    };

    section.addEventListener("pointermove", onMove, { passive: true });
    section.addEventListener("pointerleave", onLeave);
    return () => {
      section.removeEventListener("pointermove", onMove);
      section.removeEventListener("pointerleave", onLeave);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [paused]);

  return (
    <SectionReveal
      as="section"
      ref={sectionRef}
      id="projetos"
      className="relative w-full overflow-hidden bg-transparent py-16 sm:py-20"
    >
      {/* ===== Header ===== */}
      <SectionReveal.Item className="relative z-10 mx-auto flex max-w-3xl flex-col items-center px-4 text-center sm:px-6">
        <h2 className="text-white">
          Projetos em <span className="text-gradient">Destaque</span>
        </h2>
        <p className="mt-4 max-w-xl text-base text-muted sm:text-lg">
          Conheça algumas das soluções digitais que desenvolvemos para
          revolucionar a indústria.
        </p>

        <PrimaryButton href="#/projetos" size="sm" className="mt-8">
          Ver todos os projetos
        </PrimaryButton>
      </SectionReveal.Item>

      {/* ===== Carousel ===== */}
      <SectionReveal.Item className="relative z-10 mx-auto mt-2 max-w-7xl px-4 sm:px-6 lg:px-8">
        <SolutionsCarousel />
      </SectionReveal.Item>

      {/* ===== Features row ===== */}
      <SectionReveal.Item className="relative z-10 mx-auto mt-2 grid max-w-5xl grid-cols-1 gap-10 px-4 text-center sm:grid-cols-3 sm:gap-8 sm:px-6 lg:px-8">
        {features.map((f, i) => (
          <div
            key={f.title}
            ref={(el) => (cardRefs.current[i] = el)}
            className="reveal-card relative rounded-2xl px-6 py-7"
          >
            <div className="reveal-content">
              <h3 className="font-display text-lg font-semibold text-white">
                {f.title}
              </h3>
              <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-muted">
                {f.desc}
              </p>
            </div>
          </div>
        ))}
      </SectionReveal.Item>
    </SectionReveal>
  );
}
