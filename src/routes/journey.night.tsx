import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { SceneShell } from "@/components/layout/SceneShell";
import { content } from "@/lib/content";

export const Route = createFileRoute("/journey/night")({
  head: () => ({ meta: [{ name: "robots", content: "noindex" }, { title: "A magical night 🌙" }] }),
  component: Night,
});

/** A real crescent moon: pale silver disc with an offset shadow disc carving the crescent. */
function Moon() {
  return (
    <motion.div
      className="relative mx-auto h-32 w-32"
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
    >
      {/* crescent carved with an inset shadow so no opaque disc shows on the sky */}
      <div className="absolute inset-0 rounded-full shadow-[inset_22px_-10px_0_0_#f2f5ff] drop-shadow-[0_0_28px_rgba(200,215,255,0.45)]" />
    </motion.div>
  );
}

function Night() {
  const nav = useNavigate();
  const page = content.night;
  const [moonTaps, setMoonTaps] = useState(0);
  const moonFound = moonTaps >= 3;

  return (
    <SceneShell>
      <div className="relative w-full max-w-2xl text-center">
        {/* tap the moon 3 times — a secret just for the curious */}
        <button
          onClick={() => setMoonTaps((t) => t + 1)}
          aria-label="the moon"
          className="relative mx-auto block cursor-pointer"
        >
          <Moon />
          <AnimatePresence>
            {moonFound && (
              <>
                {["💗", "✨", "💗", "✨", "💗"].map((e, i) => (
                  <motion.span
                    key={i}
                    className="absolute left-1/2 top-1/2 text-lg"
                    initial={{ opacity: 0, x: 0, y: 0 }}
                    animate={{ opacity: [0, 1, 0], x: (i - 2) * 46, y: -46 - (i % 2) * 26 }}
                    transition={{ duration: 1.4, delay: i * 0.08, ease: "easeOut" }}
                  >
                    {e}
                  </motion.span>
                ))}
                <motion.p
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap font-hand text-sm text-rose-100/70"
                >
                  the moon agrees 🌙
                </motion.p>
              </>
            )}
          </AnimatePresence>
        </button>

        {/* a shooting star, every so often */}
        <motion.span
          aria-hidden
          className="pointer-events-none absolute right-[10%] top-[6%] h-[2px] w-24 rounded-full bg-gradient-to-l from-amber-100 to-transparent"
          initial={{ x: 0, y: 0, opacity: 0 }}
          animate={{ x: [0, -240], y: [0, 130], opacity: [0, 1, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 6.5, ease: "easeOut" }}
        />

        <h1 className="mt-10 font-display text-4xl text-rose-100">{page.title}</h1>
        <p className="mt-2 text-sm text-rose-200/60">{page.subtitle}</p>

        {["🦋", "🦋", "🌸", "🌷", "🦋", "✨"].map((e, i) => (
          <motion.span
            key={i}
            className="pointer-events-none absolute text-2xl opacity-80"
            style={{ left: `${(i * 27) % 90}%`, top: `${20 + ((i * 13) % 60)}%` }}
            animate={{ x: [0, 20, -10, 0], y: [0, -15, 10, 0], rotate: [0, 8, -6, 0] }}
            transition={{ duration: 8 + i, repeat: Infinity, ease: "easeInOut" }}
          >
            {e}
          </motion.span>
        ))}

        <button
          onClick={() => nav({ to: "/journey/gift" })}
          className="mt-14 rounded-full bg-rose-500 px-6 py-2.5 text-sm font-medium text-white shadow-lg shadow-rose-900/40 transition hover:scale-[1.03]"
        >
          {page.nextLabel}
        </button>
      </div>
    </SceneShell>
  );
}
