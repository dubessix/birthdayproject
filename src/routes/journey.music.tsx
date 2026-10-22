import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { HiOutlinePause, HiOutlinePlay } from "react-icons/hi2";
import { SceneShell } from "@/components/layout/SceneShell";
import { GlassCard } from "@/components/ui/GlassCard";
import { content } from "@/lib/content";
import { useJourney } from "@/lib/journey";

export const Route = createFileRoute("/journey/music")({
  head: () => ({ meta: [{ name: "robots", content: "noindex" }, { title: "For your ears 🎧" }] }),
  component: MusicScene,
});

function MusicScene() {
  const nav = useNavigate();
  const { musicOn, musicFailed, toggleMusic, playTrack, trackIndex } = useJourney();

  return (
    <SceneShell hideAudio>
      <GlassCard className="w-full max-w-sm text-center">
        <h1 className="font-display text-2xl text-rose-900 dark:text-rose-100">{content.musicPage.title}</h1>

        <div className="mx-auto mt-6 grid h-52 w-52 place-items-center">
          <motion.div
            className="relative h-52 w-52 rounded-full bg-gradient-to-br from-rose-300 via-amber-200 to-lilac shadow-2xl"
            animate={{ rotate: musicOn ? 360 : 0 }}
            transition={{ repeat: musicOn ? Infinity : 0, duration: 8, ease: "linear" }}
          >
            <div className="absolute inset-6 rounded-full bg-gradient-to-br from-rose-400 to-rose-600" />
            <div className="absolute inset-14 rounded-full bg-white/90 shadow-inner" />
            <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-rose-950" />
          </motion.div>
        </div>

        <p className="mt-5 font-display text-xl">{content.music[trackIndex]?.title}</p>
        <p className="text-xs text-muted-foreground">{content.music[trackIndex]?.artist}</p>

        <div className="mt-5 flex items-center justify-center gap-4">
          <button
            onClick={() => (musicOn ? toggleMusic() : playTrack(trackIndex))}
            aria-label={musicOn ? "Pause" : "Play"}
            className="grid h-14 w-14 place-items-center rounded-full bg-rose-500 text-white shadow-xl transition hover:scale-105"
          >
            {musicOn ? <HiOutlinePause className="h-6 w-6" /> : <HiOutlinePlay className="h-6 w-6" />}
          </button>
        </div>
        {musicFailed && (
          <p className="mt-2 text-xs text-rose-200/70" role="status">this track couldn't load — try another</p>
        )}

        {/* playlist */}
        <div className="mt-6 space-y-2 text-left">
          {content.music.map((t, i) => (
            <button
              key={i}
              onClick={() => (i === trackIndex ? toggleMusic() : playTrack(i))}
              className={`flex min-h-12 w-full items-center gap-3 rounded-2xl border px-4 py-2.5 text-left transition ${
                i === trackIndex
                  ? "border-rose-300/40 bg-rose-400/15 text-rose-100"
                  : "border-white/10 bg-white/5 text-rose-100/80 hover:bg-white/10"
              }`}
            >
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white/10 text-[11px]">
                {i === trackIndex && musicOn ? <HiOutlinePause className="h-3.5 w-3.5" /> : <HiOutlinePlay className="h-3.5 w-3.5" />}
              </span>
              <span className="min-w-0">
                <span className="block truncate text-sm font-medium">{t.title}</span>
                <span className="block truncate text-[11px] opacity-60">{t.artist}</span>
              </span>
            </button>
          ))}
        </div>

        <button
          onClick={() => nav({ to: "/journey/wishes" })}
          className="mt-7 min-h-11 rounded-full bg-white/60 px-7 py-3 text-sm text-rose-900 backdrop-blur transition hover:scale-[1.02] dark:bg-white/10 dark:text-rose-100"
        >
          {content.musicPage.nextLabel}
        </button>
      </GlassCard>
    </SceneShell>
  );
}
