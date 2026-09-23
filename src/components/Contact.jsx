/**
 * Contact — "Entre em contato" section.
 *
 * Mirrors the Figma "contact-info-section" (#79:540):
 *
 *   ┌─────────────────────┬───────────────────────────────┐
 *   │  Entre em contato    │   ┌── form-card (#0D0D0D) ──┐  │
 *   │  (title 50px)        │   │  ✉  E-mail direto        │  │
 *   │  subtitle (muted)    │   │     solucoes...@senai.br  │  │
 *   │                      │   │  📍 Sede                  │  │
 *   │                      │   │     Tubarão – SC, Brasil  │  │
 *   │                      │   │            [Enviar e-mail]│  │
 *   │                      │   └───────────────────────────┘  │
 *   └─────────────────────┴───────────────────────────────┘
 *
 * Design System:
 *  - Section background transparent → global infinite background shows through.
 *  - Left column: title (50px Bahnschrift/display SemiBold, white) + muted subtitle.
 *  - Form card: matte #0D0D0D, 1px border #27272A, rounded-2xl (16px),
 *    soft drop shadow. Info blocks with rounded icon chips.
 *  - CTA "Enviar e-mail": solid white pill with arrow, opens the mail client.
 *  - Fully responsive: stacks to a single column on small screens.
 */

const EMAIL = "solucoesdigitais@sc.senai.br";

export default function Contact() {
  return (
    <section
      id="contato"
      className="relative w-full bg-transparent py-24 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start gap-12 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
          {/* ===== Left column ===== */}
          <div className="flex w-full flex-col gap-5 lg:w-[460px] lg:shrink-0">
            <h2 className="font-display text-[2.25rem] font-semibold leading-tight tracking-tight text-white sm:text-[50px]">
              Entre em contato
            </h2>
            <p className="max-w-md text-base leading-relaxed text-muted">
              Estamos prontos para impulsionar o seu próximo projeto. Fale com
              nossa equipe.
            </p>
          </div>

          {/* ===== Form card ===== */}
          <div className="w-full lg:max-w-[680px] lg:flex-1">
            <div
              className="flex flex-col gap-12 rounded-2xl border border-[#27272A] bg-[#0D0D0D] p-8 sm:px-10 sm:py-12"
              style={{ boxShadow: "0px 16px 32px 0px rgba(0,0,0,0.5)" }}
            >
              {/* --- Info blocks --- */}
              <div className="flex flex-col gap-9">
                <InfoBlock
                  icon={<MailIcon />}
                  label="E-mail direto"
                  value={EMAIL}
                />
                <InfoBlock
                  icon={<MapPinIcon />}
                  label="Sede"
                  value="Tubarão – Santa Catarina, Brasil"
                />
              </div>

              {/* --- Action area --- */}
              <div className="flex justify-end">
                <a
                  href={`mailto:${EMAIL}`}
                  className="group inline-flex items-center gap-3 rounded-full bg-white py-3 pl-6 pr-4 font-display text-sm font-semibold text-black transition-all duration-300 hover:bg-white/90 hover:shadow-[0_0_28px_-6px_rgba(255,255,255,0.6)] active:scale-95"
                >
                  Enviar e-mail
                  <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---- Info block: icon chip + label + value ---- */
function InfoBlock({ icon, label, value }) {
  return (
    <div className="flex items-start gap-4">
      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center text-white/80">
        {icon}
      </span>
      <div className="flex flex-col gap-1.5">
        <span className="text-[13px] font-medium tracking-wide text-[#71717A]">
          {label}
        </span>
        <span className="font-display text-[22px] font-semibold leading-7 text-white">
          {value}
        </span>
      </div>
    </div>
  );
}

/* ---- Icons ---- */
function MailIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-10 6L2 7" />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function ArrowRight({ className = "" }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}
