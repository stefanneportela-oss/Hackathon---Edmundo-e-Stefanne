import logoBranca from "../assets/logos/branca/Logo.svg";
import SectionReveal from "./SectionReveal.jsx";

/**
 * Footer — site footer inspired by the reference layout.
 *
 *  - Brand column: logo + short description.
 *  - Link columns: Navegação, Empresa, Redes Sociais.
 *  - Bottom bar: copyright + credits.
 *  - Oversized brand wordmark as a watermark, filled with the brand gradient
 *    (#0574D9 → #00BCFF) fading into the black background.
 *
 * Transparent over the global background; animated in with SectionReveal.
 */
const COLUMNS = [
  {
    title: "Navegação",
    links: [
      { label: "Início", href: "#/" },
      { label: "Serviços", href: "#servicos" },
      { label: "Projetos", href: "#projetos" },
      { label: "Sobre", href: "#sobre" },
    ],
  },
  {
    title: "Empresa",
    links: [
      { label: "Trabalhe Conosco", href: "#trabalhe-conosco" },
      { label: "Parceiros", href: "#parceiros" },
      { label: "Contato", href: "#contato" },
    ],
  },
  {
    title: "Redes Sociais",
    links: [
      { label: "LinkedIn", href: "https://www.linkedin.com" },
      { label: "Instagram", href: "https://www.instagram.com" },
      { label: "Facebook", href: "https://www.facebook.com" },
    ],
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative w-full overflow-hidden bg-transparent pt-20">
      <SectionReveal className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" amount={0.2}>
        {/* ===== Top: brand + link columns ===== */}
        <SectionReveal.Item className="grid grid-cols-1 gap-12 md:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-5">
            <img
              src={logoBranca}
              alt="SENAI Soluções Digitais"
              className="h-10 w-auto"
            />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted">
              Impulsionando a indústria e os negócios com tecnologia —
              desenvolvemos software e soluções digitais que transformam a
              realidade da indústria.
            </p>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-7">
            {COLUMNS.map((col) => (
              <div key={col.title}>
                <h3 className="font-display text-sm font-semibold text-white">
                  {col.title}
                </h3>
                <ul className="mt-4 flex flex-col gap-3">
                  {col.links.map((link) => {
                    const external = link.href.startsWith("http");
                    return (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          {...(external
                            ? { target: "_blank", rel: "noopener noreferrer" }
                            : {})}
                          className="text-sm text-muted transition-colors duration-300 hover:text-white"
                        >
                          {link.label}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </SectionReveal.Item>

        {/* ===== Bottom bar ===== */}
        <SectionReveal.Item className="mt-16 flex flex-col gap-3 border-t border-white/10 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} SENAI Soluções Digitais. Todos os direitos reservados.</p>
          <p>Feito por Edmundo &amp; Stefanne · Hackathon</p>
        </SectionReveal.Item>
      </SectionReveal>

      {/* ===== Oversized watermark wordmark ===== */}
      <div aria-hidden className="relative w-full select-none overflow-hidden">
        <p
          className="translate-y-[18%] text-center font-display text-[22vw] font-black uppercase leading-none tracking-tight text-transparent"
          style={{
            backgroundImage:
              "linear-gradient(180deg, #00BCFF 0%, #0574D9 45%, rgba(5,116,217,0) 92%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
          }}
        >
          SENAI SD
        </p>
      </div>
    </footer>
  );
}
