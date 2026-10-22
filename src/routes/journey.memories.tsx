import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useLayoutEffect, useState } from "react";
import { tapFill } from "@/lib/tapfill";
import { SceneShell } from "@/components/layout/SceneShell";
import { content } from "@/lib/content";

export const Route = createFileRoute("/journey/memories")({
  head: () => ({ meta: [{ name: "robots", content: "noindex" }, { title: "Little moments 📷" }] }),
  component: Memories,
});

const PALETTES = [
  "from-rose-300 via-amber-200 to-rose-200",
  "from-amber-200 via-rose-200 to-lilac",
  "from-lilac via-rose-200 to-amber-100",
  "from-rose-200 via-amber-100 to-lilac",
  "from-amber-100 via-lilac to-rose-200",
  "from-rose-300 via-lilac to-amber-100",
];

function Polaroid({ i, caption, secret, src }: { i: number; caption: string; secret: string; src?: string }) {
  const [flipped, setFlipped] = useState(false);
  const [imgBroken, setImgBroken] = useState(false);
  const rot = (i % 2 === 0 ? -1 : 1) * (3 + (i % 4));
  const showImg = !!src && !imgBroken;

  return (
    <motion.button
      onClick={() => setFlipped((f) => !f)}
      aria-label={`Polaroid: ${caption} — tap to flip`}
      className="[perspective:1200px]"
      initial={{ y: -400, opacity: 0, rotate: 0 }}
      animate={{ y: 0, opacity: 1, rotate: rot }}
      transition={{ type: "spring", stiffness: 60, damping: 12, delay: i * 0.15 }}
    >
      <div
        className="relative h-56 w-44 rounded-md bg-white p-2 pb-8 shadow-xl transition [transform-style:preserve-3d]"
        style={{ transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)", transitionDuration: "700ms" }}
      >
        <div className="absolute inset-2 bottom-8 [backface-visibility:hidden]">
          {showImg ? (
            <img
              src={src}
              alt={caption}
              loading="lazy"
              onError={() => setImgBroken(true)}
              className="h-full w-full rounded-sm object-cover"
            />
          ) : (
            <div className={`h-full w-full rounded-sm bg-gradient-to-br ${PALETTES[i % PALETTES.length]}`} />
          )}
        </div>
        <p className="absolute inset-x-0 bottom-2 text-center font-hand text-sm text-rose-900 [backface-visibility:hidden]">{caption}</p>
        <div
          className="absolute inset-2 grid place-items-center rounded-sm bg-rose-50 p-3 text-center [backface-visibility:hidden]"
          style={{ transform: "rotateY(180deg)" }}
        >
          <p className="font-hand text-base leading-snug text-rose-900">{secret}</p>
        </div>
      </div>
    </motion.button>
  );
}

function Memories() {
  const nav = useNavigate();
  const [noteOpen, setNoteOpen] = useState(true);
  useLayoutEffect(() => {
    try { if (sessionStorage.getItem("hena:note-seen") === "1") setNoteOpen(false); } catch {}
  }, []);

  return (
    <SceneShell>
      <AnimatePresence>
        {noteOpen && (
          <motion.div
            className="fixed inset-0 z-40 grid place-items-center bg-black/55 p-6 backdrop-blur-sm"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 18, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              className="w-full max-w-sm rounded-3xl border border-white/15 bg-white/10 p-6 text-center shadow-2xl backdrop-blur-xl"
            >
              <h2 className="font-display text-xl text-rose-100">{content.memories.apologyTitle}</h2>
              <p className="mt-3 text-sm leading-relaxed text-rose-100/85">{content.memories.apology}</p>
              <button
                onClick={() => {
                  setNoteOpen(false);
                  try { sessionStorage.setItem("hena:note-seen", "1"); } catch {}
                }}
                onPointerDown={tapFill("rgba(255,255,255,0.35)")}
                className="relative isolate mt-5 min-h-11 overflow-hidden rounded-full bg-rose-500/90 px-7 py-2.5 text-sm text-white shadow-lg shadow-rose-900/40 transition hover:scale-[1.03]"
              >
                {content.memories.apologyButton}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="w-full max-w-4xl">
        <h1 className="text-center font-display text-3xl text-rose-900 dark:text-rose-100">{content.memories.title}</h1>
        <p className="mt-1 text-center text-sm text-muted-foreground">{content.memories.subtitle}</p>

        <div className="mt-8 flex flex-wrap justify-center gap-6">
          {content.photos.map((p, i) => (
            <Polaroid key={i} i={i} caption={p.caption} secret={p.secret} src={(p as { src?: string }).src} />
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <button
            onClick={() => nav({ to: "/journey/cake" })}
            className="min-h-11 rounded-full bg-rose-500/90 px-7 py-3 text-sm text-white shadow-lg transition hover:scale-[1.03]"
          >
            {content.memories.nextLabel}
          </button>
        </div>
      </div>
    </SceneShell>
  );
}
