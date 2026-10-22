import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion, useReducedMotion } from "framer-motion";
import { SceneShell } from "@/components/layout/SceneShell";
import { content } from "@/lib/content";

function FairyLights() {
  const reduce = useReducedMotion();
  const pts = [0.05, 0.14, 0.23, 0.32, 0.41, 0.5, 0.59, 0.68, 0.77, 0.86, 0.95].map((t) => ({
    x: 2 * (1 - t) * t * 195 + t * t * 390,
    y: (1 - t) * (1 - t) * 4 + 2 * (1 - t) * t * 18 + t * t * 4,
  }));
  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-0 -top-3">
      <svg viewBox="0 0 390 26" className="w-full">
        <path d="M0,4 Q195,18 390,4" fill="none" stroke="#fff7ec" strokeOpacity="0.35" strokeWidth="1.2" />
        {pts.map((p, i) => (
          <g key={i}>
            <motion.circle
              cx={p.x} cy={p.y + 4} r="6" fill="#ffd9a0"
              animate={reduce ? { opacity: 0.18 } : { opacity: [0.1, 0.32, 0.1] }}
              transition={{ duration: 2.4 + (i % 5) * 0.5, delay: i * 0.37, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.circle
              cx={p.x} cy={p.y + 4} r="2.4" fill="#ffe9c4"
              animate={reduce ? { opacity: 0.8 } : { opacity: [0.45, 1, 0.45] }}
              transition={{ duration: 2.4 + (i % 5) * 0.5, delay: i * 0.37, repeat: Infinity, ease: "easeInOut" }}
            />
          </g>
        ))}
      </svg>
    </div>
  );
}

export const Route = createFileRoute("/journey/wishes")({
  head: () => ({ meta: [{ name: "robots", content: "noindex" }, { title: "Wishes for you 💫" }] }),
  component: Wishes,
});

function Wishes() {
  const nav = useNavigate();
  const page = content.wishesPage;

  return (
    <SceneShell>
      <div className="relative w-full max-w-2xl py-6">
        <FairyLights />
        <h1 className="text-center font-display text-4xl text-rose-100">{page.title}</h1>
        <p className="mt-2 text-center text-sm text-rose-200/60">{page.subtitle}</p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {content.wishes.map((w, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* High-contrast wish card — readable on the dark night sky */}
              <div className="flex items-start gap-4 rounded-2xl border border-white/12 bg-white/[0.06] p-5 shadow-[0_20px_50px_-25px_rgba(0,0,0,0.9)] backdrop-blur-xl">
                <span className="text-2xl leading-none">{w.emoji}</span>
                <div className="min-w-0">
                  <p className="font-display text-2xl leading-tight text-rose-50">{w.text}</p>
                  <p className="mt-1 text-[13px] leading-snug text-rose-200/70">{w.note}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <button
            onClick={() => nav({ to: "/journey/night" })} data-veilnav
            className="min-h-11 rounded-full bg-rose-500 px-6 py-2.5 text-sm font-medium text-white shadow-lg shadow-rose-900/40 transition hover:scale-[1.03]"
          >
            {page.nextLabel}
          </button>
        </div>
      </div>
    </SceneShell>
  );
}
