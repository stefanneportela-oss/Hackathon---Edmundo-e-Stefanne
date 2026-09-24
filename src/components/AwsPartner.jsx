import SectionReveal from "./SectionReveal.jsx";
import PrimaryButton from "./ui/PrimaryButton.jsx";

/**
 * AwsPartner — "Parceiro AWS Partner Network (APN)" band.
 *
 * A dark rounded card sitting just below the Services section: the AWS Partner
 * badge on the left, the partnership copy on the right. Animated in with
 * SectionReveal; the badge has a soft neon glow that breathes on hover.
 *
 * Transparent section over the global background.
 */
export default function AwsPartner() {
  return (
    <section
      id="aws-partner"
      aria-label="Parceria AWS Partner Network"
      className="relative w-full bg-transparent py-12 sm:py-16"
    >
      <SectionReveal className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" amount={0.4}>
        <SectionReveal.Item className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#0D0D0D]/80 p-8 backdrop-blur-md sm:p-10">
          {/* Ambient neon glow that reacts on hover */}
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 blur-lg transition-opacity duration-500 group-hover:opacity-100"
            style={{ background: "rgba(0,102,255,0.15)" }}
          />

          <div className="relative flex flex-col items-center gap-8 text-center sm:flex-row sm:items-center sm:gap-10 sm:text-left">
            {/* AWS Partner badge */}
            <div className="shrink-0">
              <AwsPartnerBadge />
            </div>

            {/* Copy */}
            <div>
              <h3 className="font-display text-xl font-bold text-white sm:text-2xl">
                Parceiro AWS Partner Network (APN)
              </h3>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted sm:text-base">
                O SENAI Soluções Digitais integra o{" "}
                <span className="font-semibold text-white">
                  AWS Partner Network (APN)
                </span>
                , a rede global de parceiros da Amazon Web Services. Unimos a
                experiência de quem desenvolve soluções para a indústria desde
                2007 às melhores práticas de nuvem da AWS para modernizar
                aplicações, migrar cargas de trabalho e construir produtos
                digitais escaláveis, seguros e resilientes.
              </p>

              {/* Redirect to the dedicated AWS partnership page (coming soon) */}
              <PrimaryButton href="/parceria-aws" size="sm" className="mt-6">
                Saiba mais sobre a parceria
              </PrimaryButton>
            </div>
          </div>
        </SectionReveal.Item>
      </SectionReveal>
    </section>
  );
}

/**
 * AwsPartnerBadge — the "AWS Partner / Select Tier Services" mark, drawn as an
 * SVG so it needs no external asset. Subtle float + glow animation.
 */
function AwsPartnerBadge() {
  return (
    <div className="tr-float inline-flex h-32 w-32 items-center justify-center rounded-2xl bg-[#161A22] shadow-[0_0_30px_-8px_rgba(0,102,255,0.6)] transition-shadow duration-500 hover:shadow-[0_0_40px_-6px_rgba(0,102,255,0.85)]">
      <svg width="92" height="92" viewBox="0 0 120 120" fill="none" aria-label="AWS Partner — Select Tier Services">
        {/* aws wordmark */}
        <text
          x="60"
          y="40"
          textAnchor="middle"
          fontFamily="Arial, sans-serif"
          fontSize="26"
          fontWeight="700"
          fill="#FFFFFF"
        >
          aws
        </text>
        {/* smile */}
        <path
          d="M40 46 q20 12 40 0"
          stroke="#FF9900"
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
        />
        {/* divider */}
        <line x1="24" y1="60" x2="96" y2="60" stroke="#3A4150" strokeWidth="1.5" />
        {/* PARTNER */}
        <text
          x="60"
          y="82"
          textAnchor="middle"
          fontFamily="Arial, sans-serif"
          fontSize="16"
          fontWeight="700"
          letterSpacing="1.5"
          fill="#FFFFFF"
        >
          PARTNER
        </text>
        {/* tier */}
        <text
          x="60"
          y="98"
          textAnchor="middle"
          fontFamily="Arial, sans-serif"
          fontSize="8.5"
          fill="#9AA3B2"
        >
          Select Tier
        </text>
        <text
          x="60"
          y="109"
          textAnchor="middle"
          fontFamily="Arial, sans-serif"
          fontSize="8.5"
          fill="#9AA3B2"
        >
          Services
        </text>
      </svg>
    </div>
  );
}
