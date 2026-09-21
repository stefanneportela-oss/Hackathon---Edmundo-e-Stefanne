import { useState, useEffect } from "react";
import logoBranca from "../assets/logos/branca/Logo.svg";

const navLinks = [
  { label: "Serviços", href: "#servicos" },
  { label: "Projetos", href: "#projetos" },
  { label: "Sobre", href: "#sobre" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-white/10 bg-ink/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo (left) */}
        <a href="#top" className="flex shrink-0 items-center gap-2" aria-label="SENAI Soluções Digitais — Início">
          <img
            src={logoBranca}
            alt="SENAI Soluções Digitais"
            className="h-9 w-auto sm:h-10"
          />
        </a>

        {/* Nav links (center) */}
        <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-9 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="group relative text-sm font-medium text-white/80 transition-colors duration-200 hover:text-white"
              >
                {link.label}
                <span className="absolute -bottom-1.5 left-0 h-0.5 w-0 rounded-full bg-gradient-to-r from-brand-500 to-brand-300 transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        {/* CTA (right) */}
        <div className="flex items-center gap-3">
          <a
            href="#contato"
            className="hidden items-center gap-2 rounded-full bg-gradient-to-r from-brand-500 to-brand-300 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_24px_-8px_rgba(0,188,255,0.9)] transition-all duration-300 hover:shadow-[0_0_32px_-4px_rgba(0,188,255,1)] hover:brightness-110 active:scale-95 md:inline-flex"
          >
            Fale conosco
          </a>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuOpen}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-white transition-colors hover:bg-white/5 md:hidden"
          >
            <MenuIcon open={menuOpen} />
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      <div
        className={`overflow-hidden border-t border-white/10 bg-ink/95 backdrop-blur-xl transition-[max-height,opacity] duration-300 md:hidden ${
          menuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col gap-1 px-4 py-4">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block rounded-lg px-3 py-3 text-base font-medium text-white/85 transition-colors hover:bg-white/5 hover:text-white"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="mt-2">
            <a
              href="#contato"
              onClick={() => setMenuOpen(false)}
              className="block rounded-full bg-gradient-to-r from-brand-500 to-brand-300 px-5 py-3 text-center text-sm font-semibold text-white"
            >
              Fale conosco
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}

function MenuIcon({ open }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
      {open ? (
        <>
          <line x1="6" y1="6" x2="18" y2="18" />
          <line x1="6" y1="18" x2="18" y2="6" />
        </>
      ) : (
        <>
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </>
      )}
    </svg>
  );
}
