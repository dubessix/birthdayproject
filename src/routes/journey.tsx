import { createFileRoute, Outlet, useLocation, useNavigate } from "@tanstack/react-router";
import { launchMagicVeil } from "@/lib/magicVeil";
import { usePrefersReducedMotion } from "@/lib/useReducedMotion";
import { useEffect } from "react";
import { useJourney } from "@/lib/journey";

export const Route = createFileRoute("/journey")({
  head: () => ({ meta: [{ name: "robots", content: "noindex" }] }),
  component: JourneyLayout,
});

/**
 * Journey guard: the story can't be skipped.
 * Until the secret key is solved, every scene redirects to the password page.
 */
function JourneyLayout() {
  const { hydrated, unlocked } = useJourney();
  const { pathname } = useLocation();
  const nav = useNavigate();

  useEffect(() => {
    if (pathname === "/journey") {
      nav({ to: "/journey/password", replace: true });
      return;
    }
    if (hydrated && !unlocked && !pathname.startsWith("/journey/password")) {
      nav({ to: "/journey/password", replace: true });
    }
  }, [hydrated, unlocked, pathname, nav]);

    // hold/press any [data-veilnav] button: ink fills the button, then the same
  // colour swells from the tap point across the whole screen, and the next
  // page is revealed as the light fades. keyboard users get instant nav.
  const reduced = usePrefersReducedMotion();
  useEffect(() => {
    const down = (e: PointerEvent) => {
      const t = e.target as HTMLElement;
      const btn = t.closest ? (t.closest("button[data-veilnav]") as HTMLButtonElement | null) : null;
      if (!btn || btn.disabled || reduced) return;
      if (document.querySelector(".magic-veil")) return;
      e.preventDefault(); // hold the natural click; we click once covered
      const x = e.clientX;
      const y = e.clientY;
      window.setTimeout(() => {
        if (document.querySelector(".magic-veil")) return;
        launchMagicVeil(x, y, () => btn.click());
      }, 430);
    };
    document.addEventListener("pointerdown", down, true);
    return () => document.removeEventListener("pointerdown", down, true);
  }, [reduced]);

  return <Outlet />;
}
