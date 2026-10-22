import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react";
import { TypeWriter } from "@/components/ui/TypeWriter";
import { content } from "@/lib/content";
import { usePrefersReducedMotion } from "@/lib/useReducedMotion";
import { launchMagicVeil } from "@/lib/magicVeil";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "A little something for you 🌸" },
      { name: "description", content: "A quiet, cinematic birthday journey — tap the star to begin." },
      { property: "og:title", content: "A little something for you 🌸" },
      { property: "og:description", content: "A quiet, cinematic birthday journey — tap the star to begin." },
    ],
  }),
  component: Intro,
});

function Intro() {
  const navigate = useNavigate();
  const [showStar, setShowStar] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const reduced = usePrefersReducedMotion();
  const launching = useRef(false);

  return (
    <motion.main
      className="relative z-10 flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden bg-black px-6 text-center"
      initial={{ opacity: 1 }}
      animate={{ opacity: leaving ? 0 : 1, backgroundColor: leaving ? "rgba(0,0,0,0)" : "rgba(0,0,0,1)" }}
      transition={{ duration: 1.2 }}
    >
      {/* Text block and star are separate rows so they can never overlap */}
      <div className="flex min-h-[7.5rem] max-w-md items-center justify-center sm:min-h-[8.5rem]">
        <TypeWriter
          text={content.intro.typedLine}
          className="font-display text-xl leading-relaxed text-white/80 sm:text-2xl"
          onDone={() => setTimeout(() => setShowStar(true), 500)}
        />
      </div>

      <div className="mt-16 flex h-24 items-start justify-center">
        <AnimatePresence>
          {showStar && !leaving && (
            <motion.button
              key="star"
              onClick={(e) => {
                if (launching.current || leaving) return; // no double activation mid-transition
                launching.current = true;
                if (reduced) {
                  navigate({ to: "/journey/password" });
                  return;
                }
                setLeaving(true);
                const r = e.currentTarget.getBoundingClientRect();
                launchMagicVeil(r.left + r.width / 2, r.top + r.height / 2, () =>
                  navigate({ to: "/journey/password" }),
                );
              }}
              aria-label="Tap the star to begin"
              className="inline-flex flex-col items-center gap-5"
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 3 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.span
                className="block h-4 w-4 rounded-full bg-amber-100 shadow-[0_0_60px_20px_rgba(255,220,150,0.75)]"
                animate={{ scale: [1, 1.25, 1], opacity: [0.9, 1, 0.9] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              />
              <span className="text-[11px] uppercase tracking-[0.35em] text-white/60">{content.intro.tapPrompt}</span>
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </motion.main>
  );
}
