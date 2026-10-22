import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { SceneShell } from "@/components/layout/SceneShell";

export const Route = createFileRoute("/journey/envelope")({
  head: () => ({ meta: [{ name: "robots", content: "noindex" }, { title: "A letter for you ✉️" }] }),
  component: EnvelopeScene,
});

/** deterministic spark burst directions */
const SPARKS = Array.from({ length: 10 }, (_, i) => {
  const a = (i / 10) * Math.PI * 2;
  return { x: Math.cos(a) * 95, y: Math.sin(a) * 72, d: (i % 5) * 0.03 };
});

/**
 * Real-AI-envelope scene.
 * Tap the seal → shockwave ring + spark burst → sealed envelope crossfades to
 * the opened one → the letter rises out of the envelope mouth (clipped so it
 * can only exist above the mouth, like real paper sliding out).
 */
function EnvelopeScene() {
  const nav = useNavigate();
  const [open, setOpen] = useState(false);

  // preload the opened state so the crossfade never flashes
  useEffect(() => {
    ["/media/img/envelope-closed.webp", "/media/img/envelope-open.webp"].forEach((s) => {
      const im = new Image();
      im.src = s;
    });
  }, []);

  return (
    <SceneShell>
      <div className="flex w-full max-w-md flex-col items-center gap-4">
        <h1 className="font-display text-2xl text-rose-900 dark:text-rose-100">a letter for you</h1>

        <div className="relative w-full max-w-sm">
          {/* soft breathing glow behind the envelope */}
          <motion.div
            aria-hidden
            className="absolute inset-8 rounded-full bg-rose-400/20 blur-3xl"
            animate={open ? { opacity: 0.55 } : { opacity: [0.2, 0.42, 0.2] }}
            transition={open ? { duration: 0.8 } : { duration: 3.2, repeat: Infinity }}
          />

          {/* letter — clipped so it can only exist ABOVE the envelope mouth */}
          <div
            className="pointer-events-none absolute inset-x-[14%] z-20 overflow-hidden"
            style={{ top: "-42%", height: "84%" }}
            aria-hidden={!open}
          >
            <motion.div
              className="absolute inset-x-0 rounded-md bg-cream p-4 text-left font-hand text-rose-900 shadow-[0_18px_50px_-12px_rgba(0,0,0,0.7)]"
              style={{ bottom: -150 }}
              initial={{ y: 0, opacity: 0 }}
              animate={{ y: open ? -150 : 0, opacity: open ? 1 : 0 }}
              transition={
                open
                  ? { y: { type: "spring", stiffness: 62, damping: 13, delay: 0.55 }, opacity: { duration: 0.25, delay: 0.55 } }
                  : { duration: 0 }
              }
            >
              <p className="text-lg leading-snug">Dear Hena,</p>
              <p className="text-sm leading-snug opacity-70">happy birthday!! 🎉</p>
            </motion.div>
          </div>

          <button onClick={() => setOpen(true)} disabled={open} aria-label="Open envelope" className="relative z-10 block w-full">
            <div className="relative aspect-[16/9] w-full">
              <motion.img
                src="/media/img/envelope-closed.webp"
                alt="Sealed rose envelope with a crimson wax seal"
                className="absolute inset-0 h-full w-full object-contain [mask-image:radial-gradient(ellipse_at_center,black_66%,transparent_100%)]"
                animate={{ opacity: open ? 0 : 1, scale: open ? 1.06 : 1, y: open ? 0 : [0, -7, 0] }}
                transition={
                  open
                    ? { duration: 0.4 }
                    : { y: { duration: 4.5, repeat: Infinity, ease: "easeInOut" }, opacity: { duration: 0.3 }, scale: { duration: 0.3 } }
                }
              />
              <motion.img
                src="/media/img/envelope-open.webp"
                alt="Opened envelope with the flap raised"
                className="absolute inset-0 h-full w-full object-contain [mask-image:radial-gradient(ellipse_at_center,black_66%,transparent_100%)]"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: open ? 1 : 0, scale: open ? 1 : 0.96 }}
                transition={{ duration: 0.5, delay: open ? 0.18 : 0 }}
              />

              {/* seal shockwave + spark burst */}
              <AnimatePresence>
                {open && (
                  <motion.span
                    key="ring"
                    className="absolute left-1/2 top-1/2 h-12 w-12 rounded-full border-2 border-amber-200/90"
                    initial={{ opacity: 0.9, scale: 0.3, x: "-50%", y: "-50%" }}
                    animate={{ opacity: 0, scale: 5.5, x: "-50%", y: "-50%" }}
                    transition={{ duration: 0.9, ease: "easeOut" }}
                  />
                )}
                {open &&
                  SPARKS.map((s, i) => (
                    <motion.span
                      key={i}
                      className="absolute left-1/2 top-1/2 text-sm"
                      initial={{ opacity: 0, x: 0, y: 0 }}
                      animate={{ opacity: [0, 1, 0], x: s.x, y: s.y }}
                      transition={{ duration: 1.1, delay: s.d, ease: "easeOut" }}
                    >
                      {i % 3 === 0 ? "✨" : i % 3 === 1 ? "🌸" : "💫"}
                    </motion.span>
                  ))}
              </AnimatePresence>
            </div>
          </button>
        </div>

        <AnimatePresence mode="wait">
          {!open ? (
            <motion.p key="hint" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-sm text-muted-foreground">
              tap the seal
            </motion.p>
          ) : (
            <motion.button
              key="read"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.15 }}
              onClick={() => nav({ to: "/journey/letter" })}
              className="min-h-11 rounded-full bg-rose-500/90 px-7 py-3 text-sm text-white shadow-lg backdrop-blur transition hover:scale-[1.03]"
            >
              Read the letter →
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </SceneShell>
  );
}
