import { forwardRef, useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * SectionReveal — reusable scroll-entrance animation wrapper.
 *
 * Wrap any section (or block) so it fades + rises into view the first time it
 * scrolls into the viewport. Direct children wrapped in <SectionReveal.Item>
 * animate in sequence (stagger), building an elegant cascade:
 *   Badge → Title → Subtitle → Cards…
 *
 * Behaviour
 *  - Trigger: `whileInView` with `{ once, amount: 0.2 }`. By default `once` is
 *    false, so the animation replays every time the block re-enters the
 *    viewport (scroll away and back → it animates again). Pass `once` to play
 *    it a single time.
 *  - Motion: opacity 0 → 1 and y 40px → 0.
 *  - Easing: cubic-bezier(0.21, 0.47, 0.32, 0.98), duration ~0.7s.
 *  - Stagger: children reveal 0.15s apart.
 *  - Hardware accelerated (willChange: transform, opacity) for 60fps.
 *
 * Respects the global motion switch
 *  - If the user prefers reduced motion OR paused animations via the floating
 *    MotionToggle (the `animations-paused` class on <html>), the content is
 *    rendered immediately visible (opacity 1, y 0) with no transition.
 *
 * Usage
 *   <SectionReveal as="section" id="projetos" className="…">
 *     <SectionReveal.Item><Badge/></SectionReveal.Item>
 *     <SectionReveal.Item><h2>…</h2></SectionReveal.Item>
 *     <SectionReveal.Item><Grid/></SectionReveal.Item>
 *   </SectionReveal>
 */

const EASE = [0.21, 0.47, 0.32, 0.98];
const DURATION = 0.7;
const Y_OFFSET = 40;

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: Y_OFFSET },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION, ease: EASE },
  },
};

/** True when the site-wide "animations-paused" class is present on <html>. */
function useAnimationsPaused() {
  const [paused, setPaused] = useState(() =>
    typeof document !== "undefined" &&
    document.documentElement.classList.contains("animations-paused")
  );

  useEffect(() => {
    const root = document.documentElement;
    const sync = () =>
      setPaused(root.classList.contains("animations-paused"));
    sync();
    // The MotionToggle flips this class at runtime — react to it live.
    const observer = new MutationObserver(sync);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return paused;
}

const SectionReveal = forwardRef(function SectionReveal(
  { as = "div", children, className = "", amount = 0.2, once = false, ...rest },
  ref
) {
  const reducedMotion = useReducedMotion();
  const paused = useAnimationsPaused();
  const disabled = reducedMotion || paused;

  const MotionTag = motion[as] || motion.div;

  // When motion is disabled, render statically visible — no transition.
  if (disabled) {
    const StaticTag = as;
    return (
      <StaticTag ref={ref} className={className} {...rest}>
        {children}
      </StaticTag>
    );
  }

  return (
    <MotionTag
      ref={ref}
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      style={{ willChange: "transform, opacity" }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
});

/**
 * SectionReveal.Item — a single cascading child. Wrap each element that should
 * appear in sequence (badge, title, subtitle, grid, …).
 */
const Item = forwardRef(function Item(
  { as = "div", children, className = "", ...rest },
  ref
) {
  const reducedMotion = useReducedMotion();
  const paused = useAnimationsPaused();
  const disabled = reducedMotion || paused;

  if (disabled) {
    const StaticTag = as;
    return (
      <StaticTag ref={ref} className={className} {...rest}>
        {children}
      </StaticTag>
    );
  }

  const MotionTag = motion[as] || motion.div;
  return (
    <MotionTag
      ref={ref}
      className={className}
      variants={itemVariants}
      style={{ willChange: "transform, opacity" }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
});

SectionReveal.Item = Item;

export default SectionReveal;
