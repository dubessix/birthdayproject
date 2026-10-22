import { createFileRoute, Outlet, useLocation, useNavigate } from "@tanstack/react-router";
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

  return <Outlet />;
}
