import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { HiOutlinePlay } from "react-icons/hi2";
import { SceneShell } from "@/components/layout/SceneShell";
import { GlassCard } from "@/components/ui/GlassCard";
import { MusicFirstModal } from "@/components/ui/MusicFirstModal";
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
  const [preload, setPreload] = useState(0);
  const [slow, setSlow] = useState(false);
  const [gate, setGate] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setProgress((p) => Math.min(100, p + 2)), 90);
    // safety net: the Continue button can never stay locked (throttled tabs, etc.)
    const safety = setTimeout(() => { setProgress(100); setSlow(true); }, 8000);
    return () => { clearInterval(id); clearTimeout(safety); };
  }, []);

  // real asset preload drives the last stretch of the bar — no stalls, no cuts
  useEffect(() => {
    const assets = [
      ...content.photos.map((ph) => ph.src),
      "/media/memes/birthday-sign.jpg",
      "/media/memes/not-that-special.jpg",
      "/media/img/envelope-closed.webp",
      "/media/img/envelope-open.webp",
      "/media/audio/chosen-ring.mp3",
      "/media/audio/music-box.mp3",
      "/media/audio/birthday-tune.mp3",
      "/media/author/debjeet.png",
      "/media/stickers/wait-bunny.webp",
      "/media/stickers/panda-heart.webp",
    ];
    let done = 0;
    assets.forEach((src) => {
      fetch(src, { cache: "force-cache" })
        .catch(() => {})
        .finally(() => {
          done += 1;
          setPreload(Math.round((done / assets.length) * 100));
        });
    });
  }, []);

  const shown = preload >= 100 || slow ? progress : Math.min(progress, 92);

  return (
    <SceneShell>
      <GlassCard className="w-full max-w-md text-center">
        <motion.img
          src="/media/stickers/panda-heart.webp"
          alt="A little panda holding a pink heart balloon"
          initial={{ opacity: 0, y: -14, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mb-4 w-24 -rotate-2 rounded-2xl border-4 border-white/90 shadow-xl"
        />
        <TypeWriter text={content.recipient.greeting} className="font-display text-3xl sm:text-4xl" />
        <p className="mt-3 text-sm text-muted-foreground">Preparing something for you…</p>

        <div className="relative mt-7 h-5 w-full overflow-hidden rounded-full border-2 border-rose-900/50 bg-white/90 dark:border-rose-100/40 dark:bg-white/10">
          <div
            className="h-full rounded-full transition-[width] duration-300 ease-out"
            style={{ width: `${shown}%`, background: "repeating-linear-gradient(45deg, #f87f9f 0 10px, #fba7bc 10px 20px)" }}
          />
        </div>
        <p className="mt-2 text-[11px] tracking-[0.25em] text-rose-200/70">{shown < 100 ? "LOADING…" : "ALL READY ✨"}</p>


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
            data-veilnav
            onClick={() => {
              if (!musicOn) { setGate(true); return; }
              nav({ to: "/journey/envelope" });
            }}
            disabled={shown < 100}
            className="min-h-11 rounded-full px-6 py-3 text-sm text-rose-700 underline-offset-4 hover:underline disabled:opacity-40 dark:text-rose-200"
          >
            Continue →
          </button>
        </div>
      </GlassCard>
      <MusicFirstModal open={gate} onClose={() => setGate(false)} onQuiet={() => nav({ to: "/journey/envelope" })} />
    </SceneShell>
  );
}
