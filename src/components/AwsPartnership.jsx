import { motion, useReducedMotion } from "framer-motion";
import SectionReveal from "./SectionReveal.jsx";
import dashboard from "../assets/about/dashboard.png";
import portal from "../assets/about/portal.png";
import phones from "../assets/about/phones.png";
import vr from "../assets/about/vr.png";

/**
 * AwsPartnership — full dedicated page (route: #/parceria-aws).
 *
 * Structure ported faithfully from the Figma "Protótipo - AWS" (node 99:821),
 * rebuilt in the site's design system (dark glassmorphism, brand blue/cyan
 * accents #0066FF / #00BCFF, Bahnschrift, SectionReveal cascades):
 *
 *   1. Hero          — AWS Partner badge, big headline, subtitle, dual CTA
 *   2. Certifications— horizontal marquee of the team's AWS certifications
 *   3. Solutions     — 4 cards (image + title + copy + arrow footer)
 *   4. Benefits      — "Por que migrar" bento grid (Escalabilidade, 40%,
 *                      Segurança, Alta disponibilidade 99.99%)
 *   5. CTA           — text column with stats + glass contact card
 *
 * The global <Footer /> and <Header /> render around this page from App.jsx,
 * so it starts with top padding to clear the fixed header.
 */

const EASE = [0.21, 0.47, 0.32, 0.98];

/**
 * Navigate to a section on the landing page from a route page.
 *
 * The hash router only scrolls to section anchors (e.g. #contato) when the
 * landing page is mounted. From a route like #/parceria-aws that section
 * doesn't exist yet, so we first switch to the home route, then scroll to the
 * target once it has rendered.
 */
function goToHomeSection(e, id) {
  e.preventDefault();
  if (window.location.hash.replace(/^#/, "").startsWith("/")) {
    window.location.hash = "/";
    const tryScroll = (attempt = 0) => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      } else if (attempt < 20) {
        requestAnimationFrame(() => tryScroll(attempt + 1));
      }
    };
    requestAnimationFrame(() => tryScroll());
  } else {
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

/* Scattered white dots drifting around the hero — same treatment as the
   AwsPartner section on the home page. Varied position, size, glow, opacity
   and animation delay so they never move in lockstep. */
const DOTS = [
  { left: "8%", top: "20%", size: "5px", glow: 12, opacity: 0.9, drift: "aws-dot-a", delay: "0s" },
  { left: "18%", top: "38%", size: "3px", glow: 8, opacity: 0.6, drift: "aws-dot-b", delay: "0.6s" },
  { left: "13%", top: "62%", size: "4px", glow: 10, opacity: 0.75, drift: "aws-dot-a", delay: "1.2s" },
  { left: "26%", top: "72%", size: "2px", glow: 6, opacity: 0.5, drift: "aws-dot-b", delay: "0.3s" },
  { left: "10%", top: "82%", size: "5px", glow: 12, opacity: 0.85, drift: "aws-dot-a", delay: "1.8s" },
  { left: "32%", top: "16%", size: "3px", glow: 8, opacity: 0.65, drift: "aws-dot-b", delay: "0.9s" },
  { left: "44%", top: "12%", size: "2px", glow: 6, opacity: 0.5, drift: "aws-dot-a", delay: "2.1s" },
  { left: "56%", top: "18%", size: "4px", glow: 10, opacity: 0.8, drift: "aws-dot-b", delay: "0.4s" },
  { left: "66%", top: "12%", size: "3px", glow: 8, opacity: 0.6, drift: "aws-dot-a", delay: "1.5s" },
  { left: "76%", top: "22%", size: "2px", glow: 6, opacity: 0.5, drift: "aws-dot-b", delay: "2.4s" },
  { left: "84%", top: "18%", size: "5px", glow: 12, opacity: 0.9, drift: "aws-dot-a", delay: "0.7s" },
  { left: "90%", top: "34%", size: "3px", glow: 8, opacity: 0.65, drift: "aws-dot-b", delay: "1.1s" },
  { left: "88%", top: "54%", size: "4px", glow: 10, opacity: 0.75, drift: "aws-dot-a", delay: "2.0s" },
  { left: "74%", top: "68%", size: "2px", glow: 6, opacity: 0.5, drift: "aws-dot-b", delay: "0.2s" },
  { left: "90%", top: "78%", size: "5px", glow: 12, opacity: 0.85, drift: "aws-dot-a", delay: "1.4s" },
  { left: "60%", top: "82%", size: "3px", glow: 8, opacity: 0.6, drift: "aws-dot-b", delay: "2.2s" },
  { left: "48%", top: "86%", size: "4px", glow: 10, opacity: 0.7, drift: "aws-dot-a", delay: "0.5s" },
  { left: "38%", top: "80%", size: "2px", glow: 6, opacity: 0.5, drift: "aws-dot-b", delay: "1.7s" },
];

/* Team AWS certifications for the marquee (from Figma). */
const CERTS = [
  "Solutions Architect",
  "Developer Associate",
  "Cloud Practitioner",
  "SysOps Administrator",
  "DevOps Engineer",
  "Data Analytics",
  "Security Specialty",
  "Database Specialty",
];

/* Solutions cards (from Figma "Cards Row"). */
const SOLUTIONS = [
  {
    title: "Migração Cloud",
    desc: "Migre suas aplicações e dados para a AWS com segurança e zero downtime.",
    image: dashboard,
    icon: MigrateIcon,
  },
  {
    title: "Arquitetura Cloud-Native",
    desc: "Projete soluções escaláveis e resilientes usando serviços gerenciados da AWS.",
    image: portal,
    icon: LayersIcon,
  },
  {
    title: "DevOps & Automação",
    desc: "Automatize deploys, monitore performance e acelere entregas com CI/CD na AWS.",
    image: phones,
    icon: PipelineIcon,
  },
  {
    title: "FinOps & Otimização",
    desc: "Reduza custos em até 40% com governança financeira e right-sizing de recursos.",
    image: vr,
    icon: CoinIcon,
  },
];

export default function AwsPartnership() {
  const reduced = useReducedMotion();

  return (
    <main className="relative w-full overflow-hidden bg-transparent">
      <Hero reduced={reduced} />
      <Certifications />
      <Solutions reduced={reduced} />
      <Benefits reduced={reduced} />
      <FinalCta />
    </main>
  );
}

/* ============================================================
   1. HERO
   ============================================================ */
function Hero({ reduced }) {
  const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: EASE, delay: 0.05 + i * 0.1 },
    }),
  };

  return (
    <section className="relative flex min-h-[88vh] w-full items-center justify-center overflow-hidden px-4 pb-20 pt-32 sm:px-6 sm:pt-40 lg:min-h-screen">
      {/* Breathing central glow */}
      <div
        aria-hidden
        className="aws-glow pointer-events-none absolute left-1/2 top-1/2 z-0 h-[520px] w-[720px] max-w-[95%] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(0,188,255,0.18) 0%, rgba(0,102,255,0.06) 45%, transparent 100%)",
        }}
      />
      {/* Concentric orbital rings */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2"
      >
        <div className="aws-orbit h-[360px] w-[360px] rounded-full border border-brand-400/20 sm:h-[520px] sm:w-[520px]" />
        <div className="aws-orbit-rev absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-500/12 sm:h-[760px] sm:w-[760px]" />
      </div>

      {/* Drifting white dots scattered across the hero */}
      {DOTS.map((d, i) => (
        <span
          key={i}
          aria-hidden
          className={`${d.drift} pointer-events-none absolute z-0 rounded-full bg-white`}
          style={{
            left: d.left,
            top: d.top,
            width: d.size,
            height: d.size,
            opacity: d.opacity,
            boxShadow: `0 0 ${d.glow}px ${d.glow / 4}px rgba(255,255,255,0.7)`,
            animationDelay: d.delay,
          }}
        />
      ))}

      <motion.div
        initial={reduced ? false : "hidden"}
        animate="visible"
        className="relative z-10 mx-auto flex max-w-3xl flex-col items-center gap-7 text-center"
      >
        {/* AWS Partner badge */}
        <motion.div
          custom={0}
          variants={fadeUp}
          className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 backdrop-blur-md"
        >
          <span className="aws-status inline-block h-1.5 w-1.5 rounded-full bg-[#FF9900]" />
          <span className="font-display text-[13px] font-medium tracking-[0.04em] text-white">
            AWS Partner{" "}
            <span className="text-muted">| Select Tier Services</span>
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          custom={1}
          variants={fadeUp}
          className="font-display text-4xl font-extrabold leading-[1.12] text-white sm:text-5xl md:text-6xl"
        >
          Acelere sua jornada para a{" "}
          <span className="text-gradient">nuvem com a AWS</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          custom={2}
          variants={fadeUp}
          className="max-w-2xl text-base leading-relaxed text-muted sm:text-lg"
        >
          Somos parceiros certificados AWS com expertise em migração,
          arquitetura cloud-native, DevOps e otimização de custos. Transforme
          sua infraestrutura com quem entende de nuvem.
        </motion.p>

        {/* Dual CTA */}
        <motion.div
          custom={3}
          variants={fadeUp}
          className="flex flex-col items-center gap-4 pt-2 sm:flex-row"
        >
          <a
            href="#contato"
            onClick={(e) => goToHomeSection(e, "contato")}
            className="group inline-flex h-14 items-center gap-2.5 rounded-full bg-gradient-to-r from-brand-500 to-brand-300 px-8 font-display text-[15px] font-bold text-white shadow-[0_4px_16px_rgba(0,188,255,0.3)] transition-all duration-300 hover:shadow-[0_10px_32px_rgba(0,188,255,0.45)] active:scale-95"
          >
            Falar com um Especialista
            <ArrowRightIcon />
          </a>
          <a
            href="#aws-solutions"
            className="inline-flex h-14 items-center rounded-full border border-white/25 px-8 font-display text-[15px] font-semibold text-white transition-all duration-300 hover:border-brand-300/70 hover:bg-white/[0.06] active:scale-95"
          >
            Ver Soluções
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ============================================================
   2. CERTIFICATIONS MARQUEE
   ============================================================ */
function Certifications() {
  // Duplicate the list so the -50% marquee loop is seamless.
  const track = [...CERTS, ...CERTS];

  return (
    <section className="relative w-full overflow-hidden py-6">
      <p className="text-center font-display text-[10px] font-medium uppercase tracking-[0.3em] text-white/40">
        Certificações da equipe
      </p>
      <div className="marquee relative mt-5 w-full">
        <div className="marquee__track flex w-max items-center gap-3" style={{ "--marquee-duration": "42s" }}>
          {track.map((cert, i) => (
            <span
              key={i}
              className="inline-flex shrink-0 items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2.5 backdrop-blur-sm"
            >
              <span
                aria-hidden
                className="h-3 w-3 shrink-0 rounded-[3px]"
                style={{
                  background:
                    "linear-gradient(180deg, #FF9933 0%, #ED7521 100%)",
                }}
              />
              <span className="font-display text-[11px] font-bold text-white/70">
                AWS
              </span>
              <span className="font-display text-[11px] font-medium text-[#8c8c94]">
                {cert}
              </span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   3. SOLUTIONS
   ============================================================ */
function Solutions({ reduced }) {
  const cardIn = {
    hidden: { opacity: 0, y: 24 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: EASE, delay: i * 0.08 },
    }),
  };

  return (
    <section
      id="aws-solutions"
      className="relative w-full scroll-mt-24 px-4 py-20 sm:px-6 sm:py-28 lg:px-8"
    >
      <SectionReveal className="mx-auto max-w-7xl" amount={0.3}>
        {/* Header */}
        <div className="flex flex-col items-center gap-5 text-center">
          <SectionReveal.Item>
            <span className="inline-flex items-center rounded-full border border-white/15 bg-white/[0.06] px-4 py-1.5 font-display text-xs font-bold uppercase tracking-[0.16em] text-brand-300">
              Soluções
            </span>
          </SectionReveal.Item>
          <SectionReveal.Item
            as="h2"
            className="font-display text-3xl font-extrabold text-white sm:text-4xl md:text-5xl"
          >
            Nossas Soluções AWS
          </SectionReveal.Item>
          <SectionReveal.Item
            as="p"
            className="max-w-2xl text-base text-muted"
          >
            Serviços especializados para cada etapa da sua jornada cloud.
          </SectionReveal.Item>
        </div>

        {/* Cards */}
        <motion.div
          initial={reduced ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: false, amount: 0.15 }}
          className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {SOLUTIONS.map((s, i) => (
            <motion.div key={s.title} custom={i} variants={cardIn}>
              <SolutionCard solution={s} />
            </motion.div>
          ))}
        </motion.div>
      </SectionReveal>
    </section>
  );
}

function SolutionCard({ solution }) {
  const { title, desc, image, icon: Icon } = solution;
  return (
    <div className="group relative h-full">
      {/* Ambient neon glow on hover */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-0.5 rounded-[26px] opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: "rgba(0,102,255,0.22)" }}
      />
      <article className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl transition-transform duration-300 ease-out group-hover:-translate-y-1">
        {/* Illustration */}
        <div className="relative h-[168px] w-full overflow-hidden border-b border-white/10 bg-[#0a0a0a]">
          <img
            src={image}
            alt=""
            loading="lazy"
            decoding="async"
            draggable={false}
            className="h-full w-full object-cover opacity-80 transition-transform duration-500 ease-out group-hover:scale-105"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#111]/90 via-[#111]/30 to-transparent" />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(0,102,255,0.28) 0%, transparent 55%)",
            }}
          />
        </div>

        {/* Text */}
        <div className="flex flex-1 flex-col gap-3 px-6 pt-6">
          <h3 className="font-display text-xl font-bold text-white transition-colors duration-300 group-hover:text-brand-300">
            {title}
          </h3>
          <p className="text-sm leading-relaxed text-muted">{desc}</p>
        </div>

        {/* Footer arrow */}
        <div className="flex justify-end px-6 pb-6 pt-4">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-brand-300 transition-all duration-300 group-hover:border-brand-300/60 group-hover:bg-brand-500/15">
            <Icon />
          </span>
        </div>
      </article>
    </div>
  );
}

/* ============================================================
   4. BENEFITS — BENTO GRID
   ============================================================ */
function Benefits({ reduced }) {
  return (
    <section className="relative w-full border-b border-white/[0.06] px-4 py-24 sm:px-6 lg:px-8 lg:py-28">
      <SectionReveal className="mx-auto max-w-7xl" amount={0.2}>
        {/* Header */}
        <div className="flex flex-col items-center gap-4 text-center">
          <SectionReveal.Item>
            <span className="inline-flex items-center rounded-full border border-white/15 bg-white/[0.06] px-4 py-1.5 font-display text-[10px] font-bold uppercase tracking-[0.14em] text-brand-300">
              Vantagens
            </span>
          </SectionReveal.Item>
          <SectionReveal.Item
            as="h2"
            className="font-display text-3xl font-extrabold text-white sm:text-4xl md:text-5xl"
          >
            Por que migrar para a AWS?
          </SectionReveal.Item>
          <SectionReveal.Item
            as="p"
            className="max-w-2xl text-base leading-relaxed text-muted"
          >
            Descubra como a nuvem líder mundial impulsiona inovação, reduz
            custos operacionais e garante resiliência para o seu negócio.
          </SectionReveal.Item>
        </div>

        {/* Bento grid — each card fades + rises in sequence on scroll */}
        <motion.div
          initial={reduced ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
          className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-3 lg:grid-rows-2"
        >
          {/* Card 1 — Escalabilidade (tall, spans 2 rows) */}
          <BentoCard custom={0} className="lg:row-span-2">
            <div
              className="mb-6 flex h-[220px] items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]"
              style={{
                background:
                  "radial-gradient(120% 120% at 50% 0%, rgba(0,102,255,0.25) 0%, rgba(255,255,255,0.03) 60%)",
              }}
            >
              <ScaleGraphic />
            </div>
            <h3 className="font-display text-xl font-bold text-white">
              Escalabilidade
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Escale automaticamente seus recursos para atender qualquer demanda
              de tráfego, garantindo performance consistente de startups
              inovadoras a grandes enterprises.
            </p>
          </BentoCard>

          {/* Card 2 — 40% Redução de Custos */}
          <BentoCard custom={1}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex flex-col gap-1">
                <span className="font-display text-5xl font-extrabold text-white">
                  40%
                </span>
                <span className="max-w-[14rem] text-[13px] leading-snug text-muted">
                  de economia média obtida em custo de infraestrutura
                </span>
              </div>
              <span className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-brand-500/15 text-brand-300 shadow-[inset_0_0_0_1px_rgba(0,188,255,0.25)]">
                <CoinIcon size={26} />
              </span>
            </div>
            <div className="mt-6">
              <h3 className="font-display text-lg font-bold text-white">
                Redução de Custos
              </h3>
              <p className="mt-1.5 text-[13px] leading-relaxed text-white/45">
                Pague apenas pelo que utilizar e otimize sua alocação financeira
                dinamicamente.
              </p>
            </div>
          </BentoCard>

          {/* Card 3 — Segurança */}
          <BentoCard custom={2}>
            <div
              className="mb-4 flex h-[110px] items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-white/[0.03]"
              style={{
                background:
                  "radial-gradient(120% 120% at 50% 0%, rgba(0,188,255,0.22) 0%, rgba(255,255,255,0.03) 60%)",
              }}
            >
              <ShieldIcon size={40} />
            </div>
            <h3 className="font-display text-lg font-bold text-white">
              Segurança
            </h3>
            <p className="mt-1.5 text-xs leading-relaxed text-muted">
              Proteção enterprise-grade com compliance nativo e criptografia
              contínua de ponta a ponta.
            </p>
          </BentoCard>

          {/* Card 4 — Alta Disponibilidade (wide, spans 2 cols) */}
          <BentoCard custom={3} className="lg:col-span-2 lg:flex-row lg:items-center lg:gap-6">
            <div className="flex flex-col gap-4 lg:flex-1">
              <div className="flex flex-col gap-1">
                <span className="font-display text-xs font-bold uppercase tracking-[0.1em] text-brand-300">
                  Rede Global
                </span>
                <h3 className="font-display text-2xl font-bold text-white">
                  Garanta 99.99% de uptime
                </h3>
              </div>
              <p className="text-sm leading-relaxed text-muted">
                com infraestrutura robusta distribuída globalmente em múltiplas
                regiões geográficas isoladas e zonas de disponibilidade
                tolerantes a falhas.
              </p>
            </div>
            <div
              className="mt-5 flex h-[180px] items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] lg:mt-0 lg:w-[280px]"
              style={{
                background:
                  "radial-gradient(120% 120% at 50% 50%, rgba(0,102,255,0.22) 0%, rgba(255,255,255,0.03) 60%)",
              }}
            >
              <GlobeGraphic />
            </div>
          </BentoCard>
        </motion.div>
      </SectionReveal>
    </section>
  );
}

/* Fade + rise entrance for each bento card, staggered by the parent grid. */
const bentoCardIn = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE },
  },
};

function BentoCard({ children, className = "", custom }) {
  return (
    <motion.div
      custom={custom}
      variants={bentoCardIn}
      style={{ willChange: "transform, opacity" }}
      className={`flex flex-col rounded-3xl border border-white/10 bg-white/[0.04] p-8 shadow-[0_8px_24px_rgba(0,188,255,0.05)] backdrop-blur-xl transition-all duration-300 hover:border-brand-300/30 hover:bg-white/[0.06] ${className}`}
    >
      {children}
    </motion.div>
  );
}

/* ============================================================
   5. FINAL CTA
   ============================================================ */
function FinalCta() {
  return (
    <section className="relative w-full px-4 py-24 sm:px-6 lg:px-8 lg:py-28">
      <SectionReveal
        className="mx-auto flex max-w-7xl flex-col items-center gap-12 lg:flex-row lg:items-center lg:gap-16"
        amount={0.2}
      >
        {/* Text column */}
        <div className="flex-1">
          <SectionReveal.Item>
            <span className="font-display text-xs font-bold uppercase tracking-[0.14em] text-brand-500">
              Pronto para o próximo passo?
            </span>
          </SectionReveal.Item>
          <SectionReveal.Item
            as="h2"
            className="mt-4 font-display text-3xl font-extrabold leading-tight text-white sm:text-4xl"
          >
            Pronto para escalar sua infraestrutura?
          </SectionReveal.Item>
          <SectionReveal.Item
            as="p"
            className="mt-5 max-w-xl text-base leading-relaxed text-muted"
          >
            Nossa equipe de arquitetos certificados AWS está pronta para analisar
            seu ambiente e propor a melhor estratégia de cloud para o seu negócio
            de forma segura e personalizada.
          </SectionReveal.Item>
          <SectionReveal.Item className="mt-8 flex flex-wrap gap-10">
            <div className="flex flex-col gap-1">
              <span className="font-display text-lg font-bold text-white">
                100%
              </span>
              <span className="text-xs text-white/45">
                Equipe Certificada AWS
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-display text-lg font-bold text-white">
                Tubarão – SC
              </span>
              <span className="text-xs text-white/45">Sede Principal</span>
            </div>
          </SectionReveal.Item>
        </div>

        {/* Contact card */}
        <SectionReveal.Item className="w-full lg:w-[460px]">
          <div className="flex flex-col gap-8 rounded-3xl border border-white/10 bg-white/[0.04] p-8 shadow-[0_16px_32px_rgba(0,0,0,0.25)] backdrop-blur-xl sm:p-10">
            {/* Card header */}
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-500/15 text-brand-300 shadow-[inset_0_0_0_1px_rgba(0,188,255,0.25)]">
                <CloudIcon />
              </span>
              <div className="flex flex-col">
                <span className="font-display text-sm font-bold text-white">
                  SENAI Soluções
                </span>
                <span className="text-xs text-white/45">
                  Parceiro Estratégico AWS
                </span>
              </div>
            </div>

            {/* Contact details */}
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-1">
                <span className="font-display text-xs font-medium text-white/45">
                  E-mail direto
                </span>
                <span className="font-display text-base font-semibold text-white">
                  aws@senaisolucoes.com.br
                </span>
              </div>
              <div className="h-px w-full bg-white/10" />
              <div className="flex flex-col gap-1">
                <span className="font-display text-xs font-medium text-white/45">
                  Sede
                </span>
                <span className="font-display text-[15px] font-medium text-white">
                  Tubarão, Santa Catarina - Brasil
                </span>
              </div>
            </div>

            {/* CTA button */}
            <a
              href="#contato"
              onClick={(e) => goToHomeSection(e, "contato")}
              className="group inline-flex h-14 w-full items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-brand-500 to-brand-300 font-display text-sm font-bold text-white shadow-[0_8px_16px_rgba(0,188,255,0.25)] transition-all duration-300 hover:shadow-[0_12px_28px_rgba(0,188,255,0.4)] active:scale-95"
            >
              Falar com um Arquiteto Cloud
              <ArrowRightIcon />
            </a>
          </div>
        </SectionReveal.Item>
      </SectionReveal>
    </section>
  );
}

/* ============================================================
   GRAPHICS & ICONS (stroke = currentColor)
   ============================================================ */

function ScaleGraphic() {
  return (
    <svg width="180" height="120" viewBox="0 0 180 120" fill="none" aria-hidden>
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <rect
          key={i}
          x={14 + i * 28}
          y={92 - i * 14}
          width="16"
          height={i * 14 + 12}
          rx="4"
          fill="url(#scaleGrad)"
          opacity={0.35 + i * 0.12}
        />
      ))}
      <path
        d="M14 78 L42 64 L70 50 L98 40 L126 26 L154 14"
        stroke="#00BCFF"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <defs>
        <linearGradient id="scaleGrad" x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#00BCFF" />
          <stop offset="1" stopColor="#0574D9" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function GlobeGraphic() {
  return (
    <svg width="140" height="140" viewBox="0 0 140 140" fill="none" stroke="#00BCFF" strokeWidth="1.5" aria-hidden>
      <circle cx="70" cy="70" r="52" opacity="0.9" />
      <ellipse cx="70" cy="70" rx="52" ry="20" opacity="0.5" />
      <ellipse cx="70" cy="70" rx="20" ry="52" opacity="0.5" />
      <line x1="18" y1="70" x2="122" y2="70" opacity="0.5" />
      <line x1="70" y1="18" x2="70" y2="122" opacity="0.5" />
      {[
        [70, 18],
        [110, 55],
        [45, 95],
        [98, 100],
        [30, 50],
      ].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="3.5" fill="#00BCFF" stroke="none">
          <animate
            attributeName="opacity"
            values="0.4;1;0.4"
            dur="2.4s"
            begin={`${i * 0.4}s`}
            repeatCount="indefinite"
          />
        </circle>
      ))}
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden>
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

function MigrateIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M18 8 22 12l-4 4" />
      <path d="M2 12h20" />
      <path d="M6 16 2 12l4-4" />
    </svg>
  );
}

function LayersIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  );
}

function PipelineIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="5" cy="6" r="2.5" />
      <circle cx="19" cy="6" r="2.5" />
      <circle cx="12" cy="18" r="2.5" />
      <path d="M7.5 6h9M5 8.5v3a3 3 0 0 0 3 3h1.5M19 8.5v3a3 3 0 0 1-3 3h-1.5" />
    </svg>
  );
}

function CoinIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v10M9.5 9.5a2.5 2 0 0 1 5 0c0 1.2-1 1.7-2.5 2s-2.5.8-2.5 2a2.5 2 0 0 0 5 0" />
    </svg>
  );
}

function ShieldIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#00BCFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 2 4 5v6c0 5 3.5 8.5 8 11 4.5-2.5 8-6 8-11V5l-8-3Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function CloudIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M17.5 19a4.5 4.5 0 0 0 .5-8.97A6 6 0 0 0 6.34 9.5 4 4 0 0 0 7 17.5" />
      <path d="M7 19h10.5" />
    </svg>
  );
}
