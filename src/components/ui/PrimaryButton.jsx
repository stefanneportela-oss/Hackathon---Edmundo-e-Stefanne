/**
 * PrimaryButton — the site's standard primary CTA.
 *
 * Glass style (matching the Hero "Fale conosco"): translucent blue fill with
 * backdrop blur, a soft blue border and an ambient glow that intensifies on
 * hover. Renders as <a> when `href` is provided, otherwise <button>.
 *
 * Props:
 * - href, onClick, ...rest — passed through
 * - icon — optional trailing icon (defaults to an arrow); pass null to omit
 * - size — "md" (default) or "sm" for tighter placements (e.g. navbar)
 */
export default function PrimaryButton({
  children,
  href,
  icon,
  size = "md",
  className = "",
  ...rest
}) {
  const Tag = href ? "a" : "button";
  const pad = size === "sm" ? "px-6 py-3" : "px-8 py-3.5";
  const trailing = icon === undefined ? <ArrowIcon /> : icon;

  return (
    <Tag
      href={href}
      {...rest}
      className={`group inline-flex items-center justify-center gap-2 rounded-full border border-brand-300/40 bg-brand-500/15 ${pad} font-display text-sm font-semibold text-white shadow-[0_0_28px_-10px_rgba(0,188,255,0.8)] backdrop-blur-md transition-all duration-300 hover:border-brand-300/70 hover:bg-brand-500/25 hover:shadow-[0_0_40px_-6px_rgba(0,188,255,0.9)] active:scale-95 ${className}`}
    >
      {children}
      {trailing}
    </Tag>
  );
}

function ArrowIcon() {
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
      className="transition-transform duration-300 group-hover:translate-x-1"
      aria-hidden
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}
