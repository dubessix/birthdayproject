import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { HiOutlinePlay } from "react-icons/hi2";
import { SceneShell } from "@/components/layout/SceneShell";
import { GlassCard } from "@/components/ui/GlassCard";
import { GoldButton } from "@/components/ui/GoldButton";
import { TypeWriter } from "@/components/ui/TypeWriter";
import { content } from "@/lib/content";
import { useJourney } from "@/lib/journey";

export const Route = createFileRoute("/journey/loading")({
  head: () => ({ meta: [{ name: "robots", content: "noindex" }, { title: "Preparing something… 🌸" }] }),
  component: Loading,
});

function Loading() {
  const nav = useNavigate();
  const { playMusic, musicOn, musicFailed } = useJourney();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setProgress((p) => Math.min(100, p + 2)), 90);
    // safety net: the Continue button can never stay locked (throttled tabs, etc.)
    const safety = setTimeout(() => setProgress(100), 8000);
    return () => { clearInterval(id); clearTimeout(safety); };
  }, []);

  return (
    <SceneShell>
      <GlassCard className="w-full max-w-md text-center">
        <TypeWriter text={content.recipient.greeting} className="font-display text-3xl sm:text-4xl" />
        <p className="mt-3 text-sm text-muted-foreground">Preparing something for you…</p>

        <div className="relative mt-8 h-2 overflow-hidden rounded-full bg-rose-100/60 dark:bg-white/10">
          <motion.div className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-rose-300 via-amber-200 to-lilac"
            style={{ width: `${progress}%` }} />
        </div>

        <div className="relative mt-4 h-10 overflow-hidden">
          {["💗", "✨", "🌸", "💫", "🌷", "💖"].map((e, i) => (
            <motion.span key={i} className="absolute text-lg" style={{ left: `${8 + (i * 15) % 80}%` }}
              animate={{ y: [10, -30], opacity: [0, 1, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.4 }}>{e}</motion.span>
          ))}
        </div>

        <div className="mt-8 flex flex-col items-center gap-3">
          {!musicOn && (
            <>
              <GoldButton onClick={playMusic} className="gap-2 min-h-11">
                <HiOutlinePlay className="mr-2 inline h-4 w-4" /> Play your song 🎵
              </GoldButton>
              {musicFailed && (
                <p className="text-xs text-rose-200/70" role="status">
                  the music couldn't load just now — tap to try again
                </p>
              )}
            </>
          )}
          <button
            onClick={() => nav({ to: "/journey/envelope" })}
            disabled={progress < 100}
            className="min-h-11 rounded-full px-6 py-3 text-sm text-rose-700 underline-offset-4 hover:underline disabled:opacity-40 dark:text-rose-200"
          >
            Continue →
          </button>
        </div>
      </GlassCard>
    </SceneShell>
  );
}
