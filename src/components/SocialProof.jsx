/**
 * SocialProof — infinite logo marquee ("prova social").
 *
 * A continuous horizontal ticker of partner / client wordmarks that scrolls
 * forever, sitting directly below the Hero. Fully transparent so it blends
 * into the global infinite background (bg-grid + mouse glow).
 *
 * Behaviour (per brief):
 *  - Seamless infinite loop: the track holds the logo list TWICE and animates
 *    to translateX(-50%), so the second copy lands exactly where the first
 *    started — no visible jump.
 *  - Edge fade: a linear-gradient mask softens both ends (see `.marquee`).
 *  - Rest state: logos are grayscale + dimmed for an elegant dark look.
 *  - Hover on a logo: full white/brightness, slight scale, and a
 *    glassmorphism pill with a thin Primary-Blue (#0066FF) lit border.
 *  - Hover on the belt: the whole animation pauses instantly.
 *  - Global motion switch: the site-wide `animations-paused` class (from
 *    MotionToggle) freezes the scroll in place — handled by the global CSS
 *    rule, so no extra wiring is needed here.
 *
 * NOTE: These are placeholder/original wordmarks. Drop real partner SVGs into
 * the `PARTNERS` list (swap `label` for an <img src={...} />) to go live.
 */

const PARTNERS = [
  "SENAI",
  "SESI",
  "IEL",
  "FIEC",
  "Indústria 4.0",
  "SD Labs",
  "TechForge",
  "NovaIndústriaOS",
];

export default function SocialProof() {
  // Duplicate the list so the track can loop seamlessly at -50%.
  const loop = [...PARTNERS, ...PARTNERS];

  return (
    <section
      id="parceiros"
      aria-label="Empresas e parceiros que confiam em nossas soluções"
      className="relative w-full overflow-hidden bg-transparent py-14 sm:py-16"
    >
      {/* Discreet section title */}
      <p className="mb-8 text-center font-display text-xs font-medium uppercase tracking-[0.28em] text-brand-300/70 sm:text-sm">
        Empresas e parceiros que confiam em nossas soluções
      </p>

      {/* Marquee belt — hovering anywhere pauses the scroll */}
      <div className="marquee relative w-full">
        <ul
          className="marquee__track flex w-max items-center gap-4 sm:gap-6"
          style={{ "--marquee-duration": "42s" }}
        >
          {loop.map((name, i) => (
            <li key={`${name}-${i}`} aria-hidden={i >= PARTNERS.length}>
              <LogoPill label={name} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/**
 * A single logo cell. At rest it's a dim grayscale wordmark; on hover it
 * lights up to full white, scales slightly and gains a glass pill with a thin
 * Primary-Blue lit border + ambient glow.
 */
function LogoPill({ label }) {
  return (
    <div
      className="group flex cursor-default items-center justify-center rounded-full border border-transparent px-6 py-3.5 opacity-60 grayscale transition-all duration-300 ease-out hover:scale-[1.08] hover:border-primary/60 hover:bg-white/[0.05] hover:opacity-100 hover:grayscale-0 hover:shadow-[0_0_26px_-6px_rgba(0,102,255,0.85)] hover:backdrop-blur-md"
    >
      <span className="select-none whitespace-nowrap font-display text-lg font-bold tracking-tight text-white/90 transition-colors duration-300 group-hover:text-white sm:text-xl">
        {label}
      </span>
    </div>
  );
}
