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

          {/* margin doodle — like a pen test before writing */}
          <svg aria-hidden viewBox="0 0 48 48" className="pointer-events-none absolute bottom-3 right-4 h-11 w-11 opacity-35">
              <g fill="none" stroke="#7f1d1d" strokeWidth="1.6" strokeLinecap="round">
                <ellipse cx="19" cy="14" rx="3.2" ry="8" transform="rotate(-9 19 14)" />
                <ellipse cx="27" cy="14" rx="3.2" ry="8" transform="rotate(9 27 14)" />
                <circle cx="23" cy="28" r="9" />
                <path d="M19.5,27 q1,1.6 2,0 q1,1.6 2,0" />
                <circle cx="19.5" cy="25" r="0.7" fill="#7f1d1d" />
                <circle cx="26.5" cy="25" r="0.7" fill="#7f1d1d" />
                <path d="M38,8 l1.6,3.4 3.6,0.4 -2.7,2.4 0.8,3.5 -3.3,-1.9 -3.3,1.9 0.8,-3.5 -2.7,-2.4 3.6,-0.4 Z" strokeWidth="1.2" />
              </g>
            </svg>
        </div>

        <div className="mt-6 flex justify-center">
          <button
            onClick={() => nav({ to: "/journey/memories" })} data-veilnav
            className="min-h-11 rounded-full bg-rose-500/90 px-7 py-3 text-sm text-white shadow-lg backdrop-blur transition hover:scale-[1.03]"
          >
            {content.letter.nextLabel}
          </button>
        </div>
      </div>
    </SceneShell>
  );
}
