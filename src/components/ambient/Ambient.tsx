import { StarField } from "./StarField";
import { usePrefersReducedMotion } from "@/lib/useReducedMotion";

/** Full-screen ambient layer: gradient wash + starfield + floating petals & fireflies.
 *  Petals/fireflies are skipped entirely for prefers-reduced-motion users. */
export function Ambient({ intensity = 1 }: { intensity?: number }) {
  const reduced = usePrefersReducedMotion();
  const petalCount = Math.round(10 * intensity);
  const fireflyCount = Math.round(14 * intensity);
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-rose-200/20 via-transparent to-transparent dark:from-rose-500/10" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,var(--tw-gradient-stops))] from-amber-200/20 via-transparent to-transparent dark:from-amber-400/10" />
      <StarField />
      {!reduced &&
        Array.from({ length: petalCount }).map((_, i) => (
          <span
            key={`p${i}`}
            className="absolute block h-3 w-3 rounded-full bg-rose-200/70 blur-[1px] dark:bg-rose-300/40"
            style={{
              left: `${(i * 97) % 100}%`,
              top: `-${10 + (i % 5) * 10}%`,
              animation: `petal-fall ${18 + (i % 6) * 3}s linear ${-i * 2}s infinite`,
            }}
          />
        ))}
      {!reduced &&
        Array.from({ length: fireflyCount }).map((_, i) => (
          <span
            key={`f${i}`}
            className="absolute block h-1.5 w-1.5 rounded-full bg-amber-100 shadow-[0_0_18px_6px_rgba(255,214,150,0.55)]"
            style={{
              left: `${(i * 53) % 100}%`,
              top: `${(i * 37) % 100}%`,
              animation: `firefly ${8 + (i % 5) * 2}s ease-in-out ${-i * 0.7}s infinite`,
            }}
          />
        ))}
    </div>
  );
}
