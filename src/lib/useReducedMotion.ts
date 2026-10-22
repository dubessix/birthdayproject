import { useEffect, useState } from "react";

/** Reads prefers-reduced-motion safely: server and first client paint agree (false),
 *  the real preference is applied post-hydration and tracked live via a cleaned-up
 *  media-query listener. Environments without matchMedia simply keep the default. */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);
  return reduced;
}
