import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { SceneShell } from "@/components/layout/SceneShell";
import { content } from "@/lib/content";

export const Route = createFileRoute("/journey/letter")({
  head: () => ({ meta: [{ name: "robots", content: "noindex" }, { title: "A letter for you 🌸" }] }),
  component: Letter,
});

/**
 * The letter — the classic cream parchment look.
 * Words reveal softly; tapping the letter reveals everything instantly,
 * and the next button is NEVER locked.
 */
function Letter() {
  const nav = useNavigate();
  const words = useMemo(() => content.letter.body.split(/(\s+)/), []);
  const [skip, setSkip] = useState(false);

  return (
    <SceneShell>
      <div className="w-full max-w-2xl">
        <div
          role="button"
          tabIndex={0}
          onClick={() => setSkip(true)}
          onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setSkip(true); }}
          className="relative cursor-pointer rounded-2xl bg-[color:var(--cream)] p-6 shadow-2xl sm:p-10"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, rgba(180,130,90,0.05) 0 1px, transparent 1px 28px), radial-gradient(circle at 20% 10%, rgba(200,150,100,0.08), transparent 60%)",
          }}
        >
          <h1 className="font-display text-2xl text-rose-900 sm:text-3xl">{content.letter.title}</h1>

          {skip ? (
            <p className="mt-5 whitespace-pre-wrap font-hand text-xl leading-relaxed text-rose-950 sm:text-2xl">
              {content.letter.body}
            </p>
          ) : (
            <p className="mt-5 whitespace-pre-wrap font-hand text-xl leading-relaxed text-rose-950 sm:text-2xl">
              {words.map((w, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: i * 0.03 }}
                >
                  {w}
                </motion.span>
              ))}
            </p>
          )}

          {!skip && (
            <p className="mt-5 text-center text-[11px] uppercase tracking-[0.25em] text-rose-900/40">
              tap the letter to reveal instantly
            </p>
          )}
        </div>

        <div className="mt-6 flex justify-center">
          <button
            onClick={() => nav({ to: "/journey/memories" })}
            className="min-h-11 rounded-full bg-rose-500/90 px-7 py-3 text-sm text-white shadow-lg backdrop-blur transition hover:scale-[1.03]"
          >
            {content.letter.nextLabel}
          </button>
        </div>
      </div>
    </SceneShell>
  );
}
