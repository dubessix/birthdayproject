import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { HiOutlinePause, HiOutlinePlay } from "react-icons/hi2";
import { useState } from "react";
import { tapFill } from "@/lib/tapfill";
import { SceneShell } from "@/components/layout/SceneShell";
import { GlassCard } from "@/components/ui/GlassCard";
import { content } from "@/lib/content";
import { useJourney } from "@/lib/journey";

export const Route = createFileRoute("/journey/music")({
  head: () => ({ meta: [{ name: "robots", content: "noindex" }, { title: "For your ears 🎧" }] }),
  component: MusicScene,
});

function MusicScene() {
  const [fillOrigin, setFillOrigin] = useState<{ i: number; x: number; y: number } | null>(null);
  const nav = useNavigate();
  const { musicOn, musicFailed, toggleMusic, playTrack, trackIndex } = useJourney();

  return (
    <SceneShell hideAudio>
      <GlassCard className="w-full max-w-sm text-center">
        <h1 className="font-display text-2xl text-rose-900 dark:text-rose-100">{content.musicPage.title}</h1>

        <div className="relative mx-auto mt-6 h-44 w-44">
          <div aria-hidden className="absolute -inset-6 rounded-full bg-[radial-gradient(circle,rgba(255,214,150,0.3),rgba(248,183,192,0.15)_55%,transparent_75%)] blur-md" />
          <motion.div
            className="relative h-44 w-44 rounded-full bg-[conic-gradient(from_0deg,#fda4af,#fcd34d,#c4b5fd,#fda4af)] shadow-[0_18px_60px_-18px_rgba(244,63,94,0.55)]"
            animate={{ rotate: musicOn ? 360 : 0 }}
            transition={{ duration: 8, ease: "linear", repeat: musicOn ? Infinity : 0 }}
          >
            <div className="absolute inset-3 rounded-full bg-[repeating-radial-gradient(circle,rgba(0,0,0,0.13)_0_2px,transparent_2px_5px)]" />
            <div className="absolute inset-0 grid place-items-center">
              <div className="grid h-16 w-16 place-items-center rounded-full bg-white/95 shadow-inner">
                <span className="h-3 w-3 rounded-full bg-rose-950" />
              </div>
            </div>
          </motion.div>
        </div>

        <p className="mt-5 font-display text-lg text-rose-100">{content.music[trackIndex]?.title}</p>
        <p className="mt-0.5 text-[11px] text-muted-foreground">{content.music[trackIndex]?.artist}</p>

        <div className="mt-4 flex items-center justify-center gap-4">
          <button
            onClick={() => (musicOn ? toggleMusic() : playTrack(trackIndex))}
            onPointerDown={tapFill("rgba(248,183,192,0.85)")}
            aria-label={musicOn ? "Pause" : "Play"}
            className="relative isolate grid h-14 w-14 place-items-center overflow-hidden rounded-full bg-rose-500 text-white shadow-xl shadow-rose-900/40 transition hover:scale-105"
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
              onPointerDown={(e) => {
                const r = e.currentTarget.getBoundingClientRect();
                setFillOrigin({
                  i,
                  x: ((e.clientX - r.left) / r.width) * 100,
                  y: ((e.clientY - r.top) / r.height) * 100,
                });
              }}
              className={`relative isolate flex min-h-12 w-full items-center gap-3 overflow-hidden rounded-2xl border px-4 py-2.5 text-left transition ${
                i === trackIndex
                  ? "border-rose-300/40 text-rose-100"
                  : "border-white/10 bg-white/5 text-rose-100/80 hover:bg-white/10"
              }`}
            >
              <span
                aria-hidden
                className="tapfill-tab"
                style={{
                  clipPath:
                    i === trackIndex
                      ? `circle(145% at ${fillOrigin?.i === i ? fillOrigin.x : 50}% ${fillOrigin?.i === i ? fillOrigin.y : 50}%)`
                      : "circle(0% at 50% 50%)",
                }}
              />
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white/10 text-[11px]">
                {i === trackIndex && musicOn ? (
                  <span className="flex h-3.5 items-end gap-[3px]" aria-hidden>
                    {[0, 1, 2].map((b) => (
                      <span key={b} className="eq-bar" style={{ animationDelay: `${b * 0.16}s` }} />
                    ))}
                  </span>
                ) : (
                  <HiOutlinePlay className="h-3.5 w-3.5" />
                )}
              </span>
              <span className="min-w-0">
                <span className="block truncate text-sm font-medium">{t.title}</span>
                <span className="block truncate text-[11px] opacity-60">{t.artist}</span>
              </span>
            </button>
          ))}
        </div>

        <button
          onClick={() => nav({ to: "/journey/wishes" })} data-veilnav
          onPointerDown={tapFill("rgba(248,183,192,0.85)")}
          className="relative isolate mt-7 min-h-11 overflow-hidden rounded-full bg-white/60 px-7 py-3 text-sm text-rose-900 backdrop-blur transition hover:scale-[1.02] dark:bg-white/10 dark:text-rose-100"
        >
          {content.musicPage.nextLabel}
        </button>
      </GlassCard>
    </SceneShell>
  );
}  
