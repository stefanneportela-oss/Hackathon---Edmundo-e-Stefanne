import senaiLogo from "../assets/logos/parceiros/senai.png";
import sesiLogo from "../assets/logos/parceiros/sesi.png";
import ielLogo from "../assets/logos/parceiros/iel.png";
import cniLogo from "../assets/logos/parceiros/cni.png";

/**
 * SocialProof — infinite logo marquee ("prova social").
 *
 * A continuous horizontal ticker of the Sistema Indústria partner logos,
 * sitting directly below the Hero. Fully transparent so it blends into the
 * global infinite background (bg-grid + mouse glow).
 *
 * Logos are the exact set from the Figma "logo-marquee-section" (#79:587):
 * SENAI, SESI, IEL and CNI — the white institutional marks.
 *
 * Behaviour (per brief):
 *  - Seamless infinite loop: the track holds the logo list TWICE and animates
 *    to translateX(-50%), so the second copy lands exactly where the first
 *    started — no visible jump.
 *  - Edge fade: a linear-gradient mask softens both ends (see `.marquee`),
 *    matching the fade-left / fade-right rectangles in the Figma design.
 *  - Rest state: logos are dimmed for an elegant dark look.
 *  - Hover on a logo: full brightness, slight scale, and a glassmorphism pill
 *    with a thin Primary-Blue (#0066FF) lit border.
 *  - Hover on the belt: the whole animation pauses instantly.
 *  - Global motion switch: the site-wide `animations-paused` class (from
 *    MotionToggle) freezes the scroll in place — handled by global CSS.
 */

const PARTNERS = [
  { name: "SENAI", src: senaiLogo },
  { name: "SESI", src: sesiLogo },
  { name: "IEL", src: ielLogo },
  { name: "CNI", src: cniLogo },
];

/* One group = the 4 partner logos repeated enough times to comfortably
 * exceed the widest viewport, so the belt is always full (no empty gap before
 * the loop restarts). The track renders this group TWICE; animating by exactly
 * -50% swaps copy A for copy B at the identical position → perfectly seamless,
 * continuous, infinite scroll. */
const REPEAT = 4;

function LogoGroup({ ariaHidden }) {
  return (
    <ul
      className="flex shrink-0 items-center gap-16 pr-16 sm:gap-24 sm:pr-24 lg:gap-[120px] lg:pr-[120px]"
      aria-hidden={ariaHidden || undefined}
    >
      {Array.from({ length: REPEAT }).flatMap((_, r) =>
        PARTNERS.map((partner) => (
          <li key={`${partner.name}-${r}`}>
            <LogoPill partner={partner} />
          </li>
        ))
      )}
    </ul>
  );
}

export default function SocialProof() {
  return (
    <section
      id="parceiros"
      aria-label="Impulsionando a inovação no Sistema Indústria"
      className="relative w-full overflow-hidden bg-transparent py-14 sm:py-16"
    >
      {/* Discreet section title (matches Figma) */}
      <p className="mb-10 text-center font-display text-sm font-semibold uppercase tracking-[0.21em] text-[#70707A]">
        Impulsionando a inovação no Sistema Indústria
      </p>

      {/* Marquee belt — hovering anywhere pauses the scroll */}
      <div className="marquee relative w-full">
        <div
          className="marquee__track flex w-max items-center"
          style={{ "--marquee-duration": "80s" }}
        >
          {/* Two identical groups → translateX(-50%) loops with no jump */}
          <LogoGroup />
          <LogoGroup ariaHidden />
        </div>
      </div>
    </section>
  );
}

/**
 * A single logo cell. At rest it's a dim wordmark; on hover it lights up to
 * full brightness, scales slightly and gains a glass pill with a thin
 * Primary-Blue lit border + ambient glow.
 */
function LogoPill({ partner }) {
  return (
    <div className="group flex cursor-default items-center justify-center rounded-full border border-transparent px-7 py-4 opacity-55 transition-all duration-300 ease-out hover:scale-[1.08] hover:border-primary/60 hover:bg-white/[0.05] hover:opacity-100 hover:shadow-[0_0_26px_-6px_rgba(0,102,255,0.85)] hover:backdrop-blur-md">
      <img
        src={partner.src}
        alt={`Logo ${partner.name}`}
        loading="lazy"
        draggable={false}
        className="h-8 w-auto select-none object-contain sm:h-9 lg:h-10"
      />
    </div>
  );
}
