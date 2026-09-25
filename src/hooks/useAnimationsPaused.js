import { useEffect, useState } from "react";

/**
 * useAnimationsPaused — reactive read of the site-wide "pause animations"
 * switch owned by <MotionToggle/>.
 *
 * MotionToggle toggles the `animations-paused` class on <html>. CSS handles
 * pausing CSS animations/transitions, but JS-driven motion (the WebGL hero
 * hologram, the cursor-follow background glow, etc.) needs to *read* this
 * state and stop its own render loops / listeners. This hook exposes that
 * boolean and updates whenever the class changes, via a MutationObserver on
 * <html>'s class attribute — no props, no context, works anywhere.
 */
export default function useAnimationsPaused() {
  const [paused, setPaused] = useState(() =>
    typeof document === "undefined"
      ? false
      : document.documentElement.classList.contains("animations-paused")
  );

  useEffect(() => {
    const root = document.documentElement;
    const sync = () =>
      setPaused(root.classList.contains("animations-paused"));
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(root, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  return paused;
}
