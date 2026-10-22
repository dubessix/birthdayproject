import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import confetti from "canvas-confetti";
import { SceneShell } from "@/components/layout/SceneShell";
import { content } from "@/lib/content";

export const Route = createFileRoute("/journey/gift")({
  head: () => ({ meta: [{ name: "robots", content: "noindex" }, { title: "A secret gift 🎁" }] }),
  component: Gift,
});

function goldBurst() {
  confetti({
    particleCount: 140,
    spread: 100,
    origin: { y: 0.55 },
    colors: ["#e8c07a", "#fadadd", "#e8a6b6", "#d9c7f2", "#fff7ec"],
  });
}

function Gift() {
  const nav = useNavigate();
  const [open, setOpen] = useState(false);
  const page = content.gift;

  return (
    <SceneShell>
      <div className="flex w-full max-w-md flex-col items-center">
        <h1 className="font-display text-4xl text-rose-100">{page.title}</h1>
        <p className="mt-1 text-sm text-rose-200/60">{page.subtitle}</p>

        <button
          onClick={() => { if (!open) { setOpen(true); goldBurst(); } }}
          className="relative mt-12 h-60 w-60"
          aria-label="Open gift"
        >
          {/* soft glow under the box */}
          <div className="absolute bottom-2 left-1/2 h-6 w-44 -translate-x-1/2 rounded-[100%] bg-rose-500/25 blur-xl" />

          {/* box base */}
          <div className="absolute inset-x-6 bottom-4 h-32 overflow-hidden rounded-b-xl rounded-t-sm bg-gradient-to-b from-rose-500 to-rose-700 shadow-[0_25px_60px_-20px_rgba(0,0,0,0.8)]">
            <div className="absolute inset-y-0 left-1/2 w-7 -translate-x-1/2 bg-gradient-to-b from-amber-200 via-amber-300 to-amber-500 shadow-[0_0_14px_rgba(232,192,122,0.6)]" />
            <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,0.22),transparent_45%)]" />
          </div>

          {/* lid + ribbon + bow lift together */}
          <motion.div
            className="absolute inset-x-3 top-14"
            animate={open ? { y: -150, rotate: -10, opacity: 0 } : { y: [0, -4, 0] }}
            transition={open ? { duration: 0.9, ease: [0.22, 1, 0.36, 1] } : { duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="relative h-14 rounded-lg bg-gradient-to-b from-rose-400 to-rose-600 shadow-[0_18px_40px_-14px_rgba(0,0,0,0.75)]">
              <div className="absolute inset-y-0 left-1/2 w-7 -translate-x-1/2 bg-gradient-to-b from-amber-200 to-amber-400" />
              <div className="absolute inset-x-0 top-1/2 h-3 -translate-y-1/2 bg-gradient-to-r from-amber-300 via-amber-200 to-amber-400 opacity-80" />
              <div className="absolute inset-0 rounded-lg bg-[linear-gradient(115deg,rgba(255,255,255,0.25),transparent_50%)]" />
              {/* bow: two loops + knot */}
              <div className="absolute -top-7 left-1/2 flex -translate-x-1/2 items-center">
                <span className="block h-8 w-9 -rotate-12 rounded-[100%_0_100%_100%] bg-gradient-to-br from-amber-200 to-amber-400 shadow" />
                <span className="z-10 -mx-1 block h-4 w-4 rounded-full bg-amber-300 shadow" />
                <span className="block h-8 w-9 rotate-12 rounded-[0_100%_100%_100%] bg-gradient-to-bl from-amber-200 to-amber-400 shadow" />
              </div>
            </div>
          </motion.div>

          <AnimatePresence>
            {open && (
              <>
                {/* the surprise: a very happy cat pops out of the box */}
                <motion.div
                  key="cat"
                  className="absolute left-1/2 top-6 z-10 -translate-x-1/2"
                  initial={{ y: 70, opacity: 0, scale: 0.3 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  transition={{ delay: 0.55, type: "spring", stiffness: 130, damping: 12 }}
                >
                  <motion.div
                    className="text-5xl drop-shadow-[0_0_18px_rgba(255,220,150,0.6)]"
                    animate={{ rotate: [0, -7, 7, 0] }}
                    transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
                  >
                    😺
                  </motion.div>
                  <motion.div
                    className="mt-1 -rotate-2 whitespace-nowrap rounded-xl bg-cream px-3 py-1 text-center font-hand text-lg text-rose-900 shadow-lg"
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.1, type: "spring", stiffness: 200, damping: 15 }}
                  >
                    meow! happy birthday!!
                  </motion.div>
                </motion.div>
                {["🦋", "🌸", "🌷", "✨", "💫", "🦋", "🌼"].map((e, i) => (
                  <motion.span
                    key={i}
                    className="absolute left-1/2 top-1/2 text-2xl"
                    initial={{ x: 0, y: 0, opacity: 0, scale: 0.4 }}
                    animate={{ x: (i - 3) * 60, y: -60 - (i % 3) * 40, opacity: [0, 1, 0], scale: 1.2 }}
                    transition={{ duration: 2.2, delay: i * 0.08 }}
                  >
                    {e}
                  </motion.span>
                ))}
              </>
            )}
          </AnimatePresence>
        </button>

        {open && (
          <motion.button
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            onClick={() => nav({ to: "/journey/final" })}
            className="mt-10 rounded-full bg-rose-500 px-6 py-2.5 text-sm font-medium text-white shadow-lg shadow-rose-900/40"
          >
            {page.nextLabel}
          </motion.button>
        )}
      </div>
    </SceneShell>
  );
}
