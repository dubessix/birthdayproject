import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import { SceneShell } from "@/components/layout/SceneShell";
import { content } from "@/lib/content";

export const Route = createFileRoute("/journey/final")({
  head: () => ({ meta: [{ name: "robots", content: "noindex" }, { title: "Happy Birthday 🌟" }] }),
  component: Final,
});

/** deterministic pseudo-random in [0,1) — same on server & client, no hydration mismatch */
const rnd = (i: number, salt: number) => {
  const v = Math.sin(i * 127.1 + salt * 311.7) * 43758.5453;
  return v - Math.floor(v);
};

const STAR_COUNT = 130;

/** Sample points from a text mask so the stars gather into real words. */
function useStarTargets() {
  const [pts, setPts] = useState<{ x: number; y: number }[] | null>(null);
  useEffect(() => {
    if (typeof document === "undefined") return;
    const c = document.createElement("canvas");
    c.width = 340; c.height = 150;
    const ctx = c.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;
    ctx.fillStyle = "#fff";
    ctx.textAlign = "center";
    ctx.font = "700 46px 'Cormorant Garamond', Georgia, serif";
    ctx.fillText("Happy Birthday", 170, 62);
    ctx.fillText(content.recipient.name, 170, 122);
    const data = ctx.getImageData(0, 0, 340, 150).data;
    const raw: { x: number; y: number }[] = [];
    for (let y = 0; y < 150; y += 2) {
      for (let x = 0; x < 340; x += 2) {
        if (data[(y * 340 + x) * 4 + 3] > 120) raw.push({ x: (x / 340) * 100, y: (y / 150) * 100 });
      }
    }
    if (!raw.length) return;
    const step = Math.max(1, Math.floor(raw.length / STAR_COUNT));
    const out: { x: number; y: number }[] = [];
    for (let i = 0; i < raw.length && out.length < STAR_COUNT; i += step) out.push(raw[i]);
    setPts(out);
  }, []);
  return pts;
}

function Final() {
  const nav = useNavigate();
  const [phase, setPhase] = useState<"gather" | "text">("gather");
  const [mounted, setMounted] = useState(false);
  const pts = useStarTargets();

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    const id = setTimeout(() => setPhase("text"), 2600);
    return () => clearTimeout(id);
  }, []);

  return (
    <SceneShell>
      <div className="relative w-full max-w-2xl text-center">
        <div className="relative mx-auto h-44 w-full" aria-hidden>
          {/* stars mount client-side only — SSR and hydration stay identical (0 warnings) */}
          {mounted && Array.from({ length: STAR_COUNT }).map((_, i) => {
            const target = pts ? pts[i % pts.length] : { x: 20 + (i * 60) / STAR_COUNT, y: 50 };
            return (
              <motion.span
                key={i}
                className="absolute h-1.5 w-1.5 rounded-full bg-amber-100 shadow-[0_0_10px_2px_rgba(255,220,150,0.8)]"
                initial={{ left: `${rnd(i, 1) * 100}%`, top: `${rnd(i, 2) * 100}%`, opacity: 0 }}
                animate={{ left: `${target.x}%`, top: `${target.y}%`, opacity: phase === "gather" ? 1 : 0 }}
                transition={{ duration: 2.2, delay: (i % 40) * 0.02, ease: [0.22, 1, 0.36, 1] }}
              />
            );
          })}
        </div>

        <motion.h1
          className="mt-2 font-display text-4xl leading-tight text-rose-900 sm:text-6xl dark:text-rose-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: phase === "text" ? 1 : 0, y: 0 }}
          transition={{ duration: 1.2 }}
        >
          Happy Birthday
          <br />
          <span className="bg-gradient-to-r from-rose-400 via-amber-300 to-lilac bg-clip-text text-transparent">
            {content.recipient.name}
          </span>
        </motion.h1>

        <motion.div
          className="mx-auto mt-6 max-w-lg rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.9)] backdrop-blur-xl"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: phase === "text" ? 1 : 0, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <p className="whitespace-pre-line text-[15px] leading-snug text-rose-100/85">{content.finalMessage}</p>
        </motion.div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: phase === "text" ? 1 : 0 }}
          transition={{ delay: 2, duration: 1 }}
          onClick={() => nav({ to: "/journey/credits" })} data-veilnav
          className="mt-9 min-h-11 rounded-full bg-rose-500/90 px-8 py-3 text-sm text-white shadow-lg shadow-rose-900/50 transition hover:scale-[1.03]"
        >
          Continue →
        </motion.button>
      </div>
    </SceneShell>
  );
}
