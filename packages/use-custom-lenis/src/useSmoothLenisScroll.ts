import Lenis from "@studio-freight/lenis";
import { useEffect, useRef } from "react";

export function useSmoothScroll(selector = ".js-native-scroll") {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const el = document.querySelector(selector);
    if (!el) return;

    const lenis = new Lenis({
      wrapper: el as HTMLElement,
      content: (el.firstElementChild as HTMLElement) || el,
      duration: 1.2,
      smooth:true,
      gestureOrientation: "vertical",
    });

    const raf = (time: number): void => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);
    lenisRef.current = lenis;

    return () => {
      lenis.destroy();
    };
  }, [selector]);

  return lenisRef;
}
