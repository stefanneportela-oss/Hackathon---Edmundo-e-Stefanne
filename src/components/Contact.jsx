/**
 * Contact — "Entre em contato" (based on Figma node 141:403).
 *
 * Layout:
 *  - Top row (2 columns, bottom-aligned):
 *      · Left: monumental "Entre em contato" title + supporting text.
 *      · Right: gradient e-mail capsule (blue → indigo → blue) with a white
 *        circular send button, and a location line below.
 *  - Bottom row: three social links (LinkedIn, Instagram, Facebook) separated
 *    by a top border, each with an icon, a small label + name and a trailing
 *    arrow.
 *
 * Transparent section over the global background. Animated in with
 * SectionReveal (cascade). Fully responsive: columns and links stack on small
 * screens.
 */
import { useRef, useEffect } from "react";
import SectionReveal from "./SectionReveal.jsx";

const EMAIL = "solucoesdigitais@sc.senai.br";

const SOCIALS = [
  {
    label: "Conecte-se",
    name: "LinkedIn",
    href: "https://www.linkedin.com",
    icon: <LinkedInIcon />,
  },
  {
    label: "Acompanhe",
    name: "Instagram",
    href: "https://www.instagram.com",
    icon: <InstagramIcon />,
  },
  {
    label: "Siga-nos",
    name: "Facebook",
    href: "https://www.facebook.com",
    icon: <FacebookIcon />,
  },
];

export default function Contact() {
  const linksWrapRef = useRef(null);
  const linkRefs = useRef([]);
  const raf = useRef(0);
  const pending = useRef(null);

  // Cursor-proximity reveal on the social links — same effect as the Projects
  // feature cards: a soft blue glow lights up the link nearest the cursor.
  useEffect(() => {
    const wrap = linksWrapRef.current;
    if (!wrap) return;

    const apply = () => {
      raf.current = 0;
      const p = pending.current;
      if (!p) return;
      linkRefs.current.forEach((card) => {
        if (!card) return;
        const r = card.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const dist = Math.hypot(p.x - cx, p.y - cy);
        const radius = 260;
        const reveal = Math.max(0, 1 - dist / radius);
        card.style.setProperty("--reveal", reveal.toFixed(3));
      });
    };

    const onMove = (e) => {
      pending.current = { x: e.clientX, y: e.clientY };
      if (!raf.current) raf.current = requestAnimationFrame(apply);
    };
    const onLeave = () => {
      linkRefs.current.forEach((c) => c?.style.setProperty("--reveal", "0"));
    };

    wrap.addEventListener("pointermove", onMove, { passive: true });
    wrap.addEventListener("pointerleave", onLeave);
    return () => {
      wrap.removeEventListener("pointermove", onMove);
      wrap.removeEventListener("pointerleave", onLeave);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <section
      id="contato"
      className="relative w-full overflow-hidden bg-transparent py-24 sm:py-28"
    >
      <SectionReveal className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" amount={0.4}>
        {/* ===== Top row: intro (left) + direct contact (right) ===== */}
        <SectionReveal.Item className="flex flex-col gap-12 lg:flex-row lg:items-end lg:justify-between lg:gap-20">
          {/* --- Left: title + subtitle --- */}
          <div className="max-w-2xl">
            <h2 className="font-display text-4xl font-semibold leading-[1] tracking-tight text-white sm:text-6xl lg:text-7xl">
              Entre em contato
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-muted sm:text-lg">
              Estamos prontos para impulsionar o seu próximo projeto. Fale com
              nossa equipe.
            </p>
          </div>

          {/* --- Right: e-mail capsule + location --- */}
          <div className="flex w-full flex-col gap-6 lg:max-w-md">
            {/* Gradient e-mail capsule */}
            <a
              href={`mailto:${EMAIL}`}
              className="group flex items-center justify-between gap-4 rounded-full border border-white/10 py-2.5 pl-7 pr-2.5 shadow-[0_0_16px_0px_rgba(0,188,255,0.1)] transition-shadow duration-300 hover:shadow-[0_0_24px_0px_rgba(0,188,255,0.18)]"
              style={{
                background:
                  "linear-gradient(90deg, #0b1a2e 0%, #123556 60%, #185a86 100%)",
              }}
            >
              <span className="flex flex-col gap-1 overflow-hidden">
                <span className="font-display text-[10px] font-semibold uppercase tracking-wide text-[#C7D9FF]">
                  E-mail direto
                </span>
                <span className="truncate font-display text-base font-semibold text-[#F7F8FC] sm:text-lg">
                  {EMAIL}
                </span>
              </span>
              <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#F7F8FC] text-black transition-transform duration-300 group-hover:scale-105">
                <ArrowUpRight />
              </span>
            </a>

            {/* Location */}
            <div className="flex items-center gap-3 text-muted">
              <MapPinIcon />
              <span className="text-sm">Tubarão — Santa Catarina, Brasil</span>
            </div>
          </div>
        </SectionReveal.Item>

        {/* ===== Bottom row: social links (cursor-reveal cards) ===== */}
        <SectionReveal.Item
          ref={linksWrapRef}
          className="mt-16 grid grid-cols-1 gap-x-14 sm:mt-20 sm:grid-cols-3"
        >
          {SOCIALS.map((s, i) => (
            <a
              key={s.name}
              ref={(el) => (linkRefs.current[i] = el)}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="reveal-card group flex items-center gap-5 rounded-2xl border-t border-[#232631] px-4 py-7"
            >
              <div className="reveal-content flex w-full items-center gap-5">
                {/* Icon */}
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#111319] text-white transition-colors duration-300 group-hover:text-brand-300">
                  {s.icon}
                </span>
                {/* Label + name */}
                <span className="flex flex-1 flex-col gap-1.5">
                  <span className="font-display text-[11px] font-semibold uppercase tracking-wide text-[#5D626F]">
                    {s.label}
                  </span>
                  <span className="font-display text-base font-medium text-[#F7F8FC]">
                    {s.name}
                  </span>
                </span>
                {/* Trailing arrow */}
                <span className="text-[#5D626F] transition-all duration-300 group-hover:text-white group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                  <ArrowUpRight small />
                </span>
              </div>
            </a>
          ))}
        </SectionReveal.Item>
      </SectionReveal>
    </section>
  );
}

/* ---- Icons ---- */

function ArrowUpRight({ small = false }) {
  const s = small ? 16 : 20;
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.8 0 0 .78 0 1.75v20.5C0 23.2.8 24 1.77 24h20.45c.98 0 1.78-.8 1.78-1.75V1.75C24 .78 23.2 0 22.22 0z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <line x1="17.5" y1="6.5" x2="17.5" y2="6.5" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.25h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07z" />
    </svg>
  );
}
