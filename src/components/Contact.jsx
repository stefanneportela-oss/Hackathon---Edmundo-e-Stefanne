/**
 * Contact — "Entre em contato".
 *
 * Two-column layout (based on the Figma design node 79:540):
 *  - Left: heading + supporting text.
 *  - Right: dark form-card with contact info blocks (e-mail, sede) and a
 *    primary "Enviar e-mail" CTA button.
 *
 * Design System:
 *  - Section transparent → the global infinite background shows through.
 *  - Card surface: matte #0D0D0D, subtle #27272A border, soft drop shadow,
 *    rounded-2xl.
 *  - Fully responsive: columns stack on small screens.
 */
const EMAIL = "solucoesdigitais@sc.senai.br";

export default function Contact() {
  return (
    <section
      id="contato"
      className="relative w-full bg-transparent py-24 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
          {/* ===== Left column ===== */}
          <div className="w-full max-w-lg">
            <h2 className="font-display text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl">
              Entre em contato
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-muted">
              Estamos prontos para impulsionar o seu próximo projeto. Fale com
              nossa equipe.
            </p>
          </div>

          {/* ===== Right column: form-card ===== */}
          <div className="w-full max-w-2xl">
            <div className="rounded-2xl border border-[#27272A] bg-[#0D0D0D] p-8 shadow-[0_16px_32px_0_rgba(0,0,0,0.5)] sm:p-10">
              {/* Info blocks */}
              <div className="flex flex-col gap-9">
                <ContactBlock
                  icon={<MailIcon />}
                  label="E-mail direto"
                  value={EMAIL}
                />
                <ContactBlock
                  icon={<MapPinIcon />}
                  label="Sede"
                  value="Tubarão – Santa Catarina, Brasil"
                />
              </div>

              {/* CTA */}
              <div className="mt-12 flex justify-end">
                <a
                  href={`mailto:${EMAIL}`}
                  className="group inline-flex items-center gap-3 rounded-full bg-white py-3 pl-6 pr-4 font-display text-sm font-semibold text-black transition-all duration-300 hover:shadow-[0_0_24px_-4px_rgba(255,255,255,0.6)] active:scale-95"
                >
                  Enviar e-mail
                  <span className="inline-flex h-6 w-6 items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5">
                    <ArrowRight />
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactBlock({ icon, label, value }) {
  return (
    <div className="flex items-start gap-4">
      <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center text-primary">
        {icon}
      </div>
      <div className="flex flex-col gap-1.5">
        <span className="font-display text-[13px] font-medium text-[#71717A]">
          {label}
        </span>
        <span className="font-display text-[22px] font-semibold leading-7 text-white break-words">
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
      strokeWidth="1.7"
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
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function ArrowRight() {
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
      aria-hidden
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}
