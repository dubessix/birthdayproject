import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { SceneShell } from "@/components/layout/SceneShell";
import { content } from "@/lib/content";

export const Route = createFileRoute("/journey/wishes")({
  head: () => ({ meta: [{ name: "robots", content: "noindex" }, { title: "Wishes for you 💫" }] }),
  component: Wishes,
});

function Wishes() {
  const nav = useNavigate();
  const page = content.wishesPage;

  return (
    <SceneShell>
      <div className="w-full max-w-2xl py-6">
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
            onClick={() => nav({ to: "/journey/night" })}
            className="min-h-11 rounded-full bg-rose-500 px-6 py-2.5 text-sm font-medium text-white shadow-lg shadow-rose-900/40 transition hover:scale-[1.03]"
          >
            {page.nextLabel}
          </button>
        </div>
      </div>
    </SceneShell>
  );
}
