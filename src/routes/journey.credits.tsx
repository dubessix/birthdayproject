import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { SceneShell } from "@/components/layout/SceneShell";
import { tapFill } from "@/lib/tapfill";
import { content } from "@/lib/content";

export const Route = createFileRoute("/journey/credits")({
  head: () => ({ meta: [{ name: "robots", content: "noindex" }, { title: "With love 💝" }] }),
  component: Credits,
});

/**
 * Author portrait: circular, thin warm-gold ring, soft glow, gentle fade-in.
 * Falls back to an elegant monogram if the photo asset hasn't been added yet
 * (drop it at public/media/author/debjeet.jpg — see config author.photo).
 */
function AuthorPhoto() {
  const src = (content.author as { photo?: string }).photo;
  const [broken, setBroken] = useState(false);
  const ring = "rounded-full border-2 border-amber-200/60 shadow-[0_0_50px_rgba(232,192,122,0.35)]";
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto h-24 w-24"
    >
      {src && !broken ? (
        <img
          src={src}
          alt={content.author.name}
          onError={() => setBroken(true)}
          className={`h-24 w-24 object-cover ${ring}`}
        />
      ) : (
        <div className={`grid h-24 w-24 place-items-center bg-white/5 font-display text-3xl text-amber-100 ${ring}`}>
          {content.author.name.charAt(0)}
        </div>
      )}
    </motion.div>
  );
}

function Credits() {
  const nav = useNavigate();
  const [egg, setEgg] = useState(false);
  const fade = (delay: number) => ({
    initial: { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] as const },
  });
  return (
    <SceneShell>
      <div className="w-full max-w-md text-center">
        {/* portrait with a soft halo */}
        <motion.div {...fade(0)} className="relative mx-auto h-24 w-24">
          <div aria-hidden className="absolute -inset-3 rounded-full bg-amber-200/10 blur-xl" />
          <AuthorPhoto />
        </motion.div>

        <motion.h1 {...fade(0.25)} className="mt-5 font-display text-2xl tracking-wide text-rose-900 dark:text-rose-100">
          {content.credits.signature}
        </motion.h1>

        <motion.div {...fade(0.4)} className="mx-auto my-4 h-px w-16 bg-gradient-to-r from-transparent via-rose-400 to-transparent" />

        <motion.p {...fade(0.5)} className="text-sm text-muted-foreground">
          {content.credits.thanks}
        </motion.p>

        <motion.div {...fade(0.7)} className="mt-7 inline-block -rotate-6">
          <div className="rounded-full border-2 border-rose-400/55 p-1">
            <div className="rounded-full border border-rose-400/55 px-5 py-2.5 font-hand text-rose-300/85">
              <p className="text-sm leading-tight">certified handmade</p>
              <p className="text-[11px] leading-tight tracking-[0.2em]">by debjeet</p>
              <p className="text-[11px] leading-tight">no refunds, only hugs 🤗</p>
            </div>
          </div>
        </motion.div>

        <motion.p
          {...fade(0.65)}
          className="mt-4 inline-block rounded-full border border-rose-200/20 bg-rose-200/[0.06] px-5 py-2 font-hand text-base text-rose-100/85"
        >
          {content.credits.ps}
        </motion.p>

        <motion.div {...fade(0.72)} className="mt-5">
          <img
            src="/media/memes/not-that-special.jpg"
            alt="A cartoon figure scratching his head with the caption: ab mai itna bhi kuch khass nahi"
            className="mx-auto w-40 rotate-2 rounded-lg border-4 border-white/90 shadow-xl"
          />
          <p className="mt-2 font-hand text-sm text-rose-200/75">{content.credits.memeCaption}</p>
        </motion.div>

        <motion.div {...fade(0.8)}>
          <motion.button
            onClick={() => {
              try { sessionStorage.removeItem("hena:unlocked"); } catch { /* storage may be unavailable */ }
              nav({ to: "/" });
            }}
            onPointerDown={tapFill("rgba(248,183,192,0.85)")}
            data-veilnav
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="relative isolate mt-6 min-h-11 overflow-hidden rounded-full bg-gradient-to-r from-amber-200 via-rose-200 to-amber-200 px-7 py-2.5 text-sm text-rose-950 shadow-[0_0_40px_rgba(232,192,122,0.6)]"
          >
            ✨ {content.credits.restart}
          </motion.button>
        </motion.div>

        {/* the secret p.s. — only the curious will ever find it */}
        <motion.div {...fade(1)} className="mt-6">
          <button
            onClick={() => setEgg((v) => !v)}
            className="-m-3 p-3 rounded text-[11px] tracking-[0.3em] text-rose-200/35 transition hover:text-rose-200/70 focus-visible:text-rose-200/70 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-rose-200/40"
          >
            · p.s. ·
          </button>
          <AnimatePresence>
            {egg && (
              <motion.p
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0 }}
                className="mx-auto mt-4 max-w-xs rounded-2xl border border-white/10 bg-white/5 p-4 font-hand text-base leading-snug text-rose-100/85 backdrop-blur"
              >
                you're my favorite person to make things for.
                <br />
                don't tell anyone 🙂 — D
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </SceneShell>
  );
}
