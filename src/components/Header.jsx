import { useState, useEffect } from "react";
import logoBranca from "../assets/logos/branca/Logo.svg";
import PrimaryButton from "./ui/PrimaryButton.jsx";

const navLinks = [
  { label: "Serviços", href: "#servicos" },
  // Route links (#/...) → dedicated pages; section anchors (#...) → scroll on home.
  { label: "Projetos", href: "#/projetos" },
  { label: "Parceria AWS", href: "#/parceria-aws" },
  { label: "Sobre", href: "#sobre" },
  { label: "Trabalhe Conosco", href: "#trabalhe-conosco" },
];

/** True on wide screens (≥1024px). Uses matchMedia/innerWidth instead of
 *  Tailwind's `xl:` classes so the desktop/mobile switch is decided from the
 *  real viewport width — immune to iOS Safari quirks where a momentary
 *  horizontal overflow makes CSS min-width media queries misfire. */
function useIsDesktop() {
  const [desktop, setDesktop] = useState(() =>
    typeof window === "undefined"
      ? false
      : window.matchMedia("(min-width: 1024px)").matches
  );
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const sync = () => setDesktop(mq.matches);
    sync();
    mq.addEventListener?.("change", sync);
    return () => mq.removeEventListener?.("change", sync);
  }, []);
  return desktop;
}

/** Current hash route (e.g. "#/projetos"), kept in sync with navigation.
 *  Used to highlight the nav tab only when we're on that item's dedicated
 *  page — section anchors on the home page never stay "active". */
function useHashPath() {
  const [hash, setHash] = useState(() =>
    typeof window === "undefined" ? "" : window.location.hash
  );
  useEffect(() => {
    const sync = () => setHash(window.location.hash);
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);
  return hash;
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const isDesktop = useIsDesktop();
  const hash = useHashPath();

  /**
   * A nav item is active only when it points to its OWN page and we're on it.
   * Route links start with "#/" (e.g. "#/projetos"); section anchors like
   * "#servicos" are just scroll targets on the home page and never highlight.
   *
   * Matches the exact route or any sub-route (e.g. "#/projetos/chatbot-sgn"
   * keeps the "Projetos" tab active on a project detail page).
   */
  const isLinkActive = (href) => {
    if (!href.startsWith("#/") || href === "#/") return false;
    const base = href.slice(1); // "#/projetos" -> "/projetos"
    const path = hash.slice(1) || "/"; // current "#/projetos/x" -> "/projetos/x"
    return path === base || path.startsWith(`${base}/`);
  };

  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4 sm:top-6">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        {/* ===== Logo (left) ===== */}
        <a
          href="#/"
          className="flex shrink-0 items-center gap-2 rounded-full border border-white/10 bg-black/30 px-4 py-2.5 backdrop-blur-md"
          aria-label="SENAI Soluções Digitais — Início"
        >
          <img
            src={logoBranca}
            alt="SENAI Soluções Digitais"
            className="h-8 w-auto sm:h-9"
          />
        </a>

        {/* ===== Center pill (glass) — desktop only ===== */}
        {isDesktop && (
          <ul className="flex items-center gap-1 rounded-full border border-white/15 bg-black/30 p-1.5 backdrop-blur-md">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`block rounded-full px-5 py-2 font-display text-sm font-medium transition-all duration-300 ${
                    isLinkActive(link.href)
                      ? "bg-white text-black shadow-sm"
                      : "text-white/75 hover:text-white"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        )}

        {/* ===== CTA (right) + mobile toggle ===== */}
        <div className="flex shrink-0 items-center gap-3">
          {isDesktop ? (
            <PrimaryButton href="#contato" size="sm">
              Fale conosco
            </PrimaryButton>
          ) : (
            /* Mobile menu toggle (glass) */
            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={menuOpen}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/30 text-white backdrop-blur-md transition-colors hover:bg-white/10"
            >
              <MenuIcon open={menuOpen} />
            </button>
          )}
        </div>
      </nav>

      {/* ===== Mobile dropdown (glass pill panel) — mobile only ===== */}
      {!isDesktop && (
      <div
        className={`mx-auto mt-3 max-w-7xl overflow-hidden transition-[max-height,opacity] duration-300 ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="rounded-3xl border border-white/15 bg-black/50 p-3 backdrop-blur-xl">
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`block rounded-full px-4 py-3 font-display text-base font-medium transition-colors ${
                    isLinkActive(link.href)
                      ? "bg-white text-black"
                      : "text-white/85 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="mt-1">
              <PrimaryButton
                href="#contato"
                size="sm"
                onClick={() => setMenuOpen(false)}
                className="w-full"
              >
                Fale conosco
              </PrimaryButton>
            </li>
          </ul>
        </div>
      </div>
      )}
    </header>
  );
}

function MenuIcon({ open }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden
    >
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
