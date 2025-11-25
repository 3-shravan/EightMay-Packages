import { useEffect } from "react";

/**
 * Prevent Lenis from hijacking scroll events
 * inside any element matching the selector.
 *
 * Example:
 * useIgnoreLenisScroll(".js-native-scroll");
 */

export function useIgnoreLenisScroll(selector = ".js-native-scroll") {
  useEffect(() => {
    const handler = (e: Event) => {
      const el = document.querySelector(selector);
      if (el && e.target instanceof Node && el.contains(e.target)) {
        // Stop Lenis from hijacking
        e.stopImmediatePropagation();
        // Let native scroll happen
      }
    };

    window.addEventListener("wheel", handler, { capture: true });
    window.addEventListener("touchmove", handler, { capture: true });

    return () => {
      window.removeEventListener("wheel", handler, { capture: true });
      window.removeEventListener("touchmove", handler, { capture: true });
    };
  }, [selector]);
}
