import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { AnimatePresence, MotionConfig } from "framer-motion";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { JourneyProvider } from "../lib/journey";
import { Ambient } from "../components/ambient/Ambient";
import { content } from "../lib/content";

function NotFoundComponent() {
  return (
    <div className="relative z-10 flex min-h-[100dvh] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-7xl">404</h1>
        <p className="mt-3 text-muted-foreground">
          This page drifted off into the stars.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block rounded-full bg-rose-200/70 px-5 py-2 text-sm text-rose-950 backdrop-blur"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  return (
    <div className="relative z-10 flex min-h-[100dvh] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-3xl">Something didn't unfold</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Try again — the magic is stubborn.
        </p>
        <button
          onClick={() => {
            router.invalidate();
            reset();
          }}
          className="mt-6 rounded-full bg-rose-200/70 px-5 py-2 text-sm text-rose-950"
        >
          Try again
        </button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()(
  {
    head: () => {
      // Absolute Open Graph URLs need the production origin. Set VITE_SITE_URL at deploy
      // time (e.g. VITE_SITE_URL=https://your-site.netlify.app). Without it we fall back
      // to a root-relative path rather than inventing a domain. The star icon reveals no secrets.
      const siteUrl = (import.meta.env?.VITE_SITE_URL as string | undefined)?.replace(/\/$/, "") ?? "";
      return {
      meta: [
        { charSet: "utf-8" },
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1, viewport-fit=cover",
        },
        { name: "theme-color", content: "#241a2e" },
        { title: "A little something for you 🌸" },
        {
          name: "description",
          content:
            "A quiet, cinematic birthday letter — pages that light up as you tap.",
        },
        { property: "og:title", content: "A little something for you 🌸" },
        {
          property: "og:description",
          content: "A quiet, cinematic birthday letter.",
        },
        { property: "og:type", content: "website" },
        { property: "og:image", content: `${siteUrl}/icons/android-chrome-512.png` },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [
        { rel: "stylesheet", href: appCss },
        { rel: "icon", type: "image/x-icon", href: "/icons/favicon.ico" },
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: "/icons/favicon-16.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "/icons/favicon-32.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "96x96",
          href: "/icons/favicon-96.png",
        },
        { rel: "apple-touch-icon", href: "/icons/apple-touch-icon.png" },
        { rel: "manifest", href: "/site.webmanifest" },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossOrigin: "anonymous",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Caveat:wght@400;600;700&family=Inter:wght@300;400;500;600&display=swap",
        },
      ],
    };
    },
    shellComponent: RootShell,
    component: RootComponent,
    notFoundComponent: NotFoundComponent,
    errorComponent: ErrorComponent,
  },
);

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={content.theme.mode === "dark" ? "dark" : undefined}
    >
      <head>
        <HeadContent />
        <link rel="preload" as="image" href="/media/stickers/panda-heart.webp" />
      </head>
      <body>
        {/* boot loader: paints with the first HTML so she never sees a black stuck screen */}
        <div
          id="boot"
          style={{ position: "fixed", inset: 0, zIndex: 9999, background: "#241a2e", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 18, transition: "opacity .6s ease" }}
        >
          <img
            src="/media/stickers/panda-heart.webp"
            alt=""
            style={{ width: 96, borderRadius: 18, border: "4px solid rgba(255,255,255,.92)", boxShadow: "0 18px 50px -18px rgba(0,0,0,.8)" }}
          />
          <div style={{ width: 220, height: 18, borderRadius: 999, border: "2px solid rgba(140,60,80,.65)", background: "rgba(255,255,255,.94)", overflow: "hidden" }}>
            <div style={{ height: "100%", width: "38%", borderRadius: 999, background: "repeating-linear-gradient(45deg,#f87f9f 0 10px,#fba7bc 10px 20px)", animation: "bootslide 1.15s linear infinite" }} />
          </div>
          <div style={{ fontSize: 11, letterSpacing: ".3em", color: "rgba(255,205,218,.8)" }}>LOADING…</div>
        </div>
        <style>{"@keyframes bootslide{from{transform:translateX(-110%)}to{transform:translateX(360%)}} .boot-done{opacity:0;pointer-events:none}"}</style>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  // hide the boot loader once the app is hydrated and the first assets are cached
  useEffect(() => {
    const assets = [
      "/media/stickers/panda-heart.webp",
      "/media/stickers/wait-bunny.webp",
      "/media/photos/1.jpg",
      "/media/audio/chosen-ring.mp3",
      "/media/img/envelope-closed.webp",
    ];
    const start = performance.now();
    let done = 0;
    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      const waitMs = Math.max(0, 900 - (performance.now() - start));
      window.setTimeout(() => {
        const b = document.getElementById("boot");
        if (!b) return;
        b.classList.add("boot-done");
        window.setTimeout(() => b.remove(), 700);
      }, waitMs);
    };
    assets.forEach((src) => {
      fetch(src, { cache: "force-cache" })
        .catch(() => {})
        .finally(() => {
          done += 1;
          if (done >= assets.length) finish();
        });
    });
    const safety = window.setTimeout(finish, 7000);
    return () => window.clearTimeout(safety);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <JourneyProvider>
        <MotionConfig reducedMotion="user">
          <Ambient />
          <AnimatePresence mode="wait">
            <Outlet />
          </AnimatePresence>
        </MotionConfig>
      </JourneyProvider>
    </QueryClientProvider>
  );
}
