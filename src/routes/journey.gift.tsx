import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import confetti from "canvas-confetti";
import { SceneShell } from "@/components/layout/SceneShell";
import { content } from "@/lib/content";

export const Route = createFileRoute("/journey/gift")({
  head: () => ({ meta: [{ name: "robots", content: "noindex" }, { title: "A secret gift 🎁" }] }),
  component: Gift,
});

function goldBurst() {
  confetti({
    particleCount: 140,
    spread: 100,
    origin: { y: 0.55 },
    colors: ["#e8c07a", "#fadadd", "#e8a6b6", "#d9c7f2", "#fff7ec"],
  });
}

// the loot table — two drops, exactly like a little gacha game
const LOOT = [
  {
    src: "/media/memes/kitkat.jpg",
    alt: "a white cat offering a kitkat",
    rarity: "COMMON",
    stars: "✦",
    klass: "chocolate class",
    note: "gift #1: kitkat. budget — full effort, zero money 😌",
    badge: "bg-slate-100 text-slate-700 border-slate-300",
  },
  {
    src: "/media/memes/momos.jpg",
    alt: "a kitten presenting a plate of momos with chutney",
    rarity: "RARE",
    stars: "✦✦",
    klass: "chutney class",
    note: "gift #2: momos. extra chutney, no extra charge 😌",
    badge: "bg-sky-100 text-sky-800 border-sky-300",
  },
  {
    src: "/media/memes/sorry.jpg",
    alt: "a kitten holding a rose bouquet and a kitkat, apologising",
    rarity: "EPIC",
    stars: "✦✦",
    klass: "feelings class",
    note: "sorry, via cat. legally binding 😌",
    badge: "bg-gradient-to-r from-lilac to-purple-300 text-purple-900 border-purple-200",
  },
  {
    src: "/media/memes/aachiya.jpg",
    alt: "shin-chan with a pink bow and a fan, looking unimpressed",
    rarity: "EPIC",
    stars: "✦✦",
    klass: "sass class",
    note: "her reaction, pre-installed 😌",
    badge: "bg-gradient-to-r from-rose-200 to-rose-300 text-rose-900 border-rose-300",
  },
  {
    src: "/media/memes/shinchan.jpg",
    alt: "shin-chan running with a bouquet of flowers",
    rarity: "LEGENDARY",
    stars: "✦✦✦",
    klass: "flowers class",
    note: "…flowers. don't read into it 🫶",
    badge: "bg-gradient-to-r from-amber-200 to-amber-400 text-amber-900 border-amber-300",
  },
];

function Gift() {
  const nav = useNavigate();
  const [open, setOpen] = useState(false);
  const [drop, setDrop] = useState(0); // 0 = none yet, 1/2 = card on screen, 3 = all collected
  const page = content.gift;

  const openBox = () => {
    if (open) return;
    setOpen(true);
    goldBurst();
    window.setTimeout(() => setDrop(1), 1500);
  };

  const collect = () => {
    setDrop((d) => {
      if (d >= 1 && d <= LOOT.length) {
        if (d + 1 === LOOT.length) window.setTimeout(goldBurst, 350); // legendary sparkle on the last drop
        return d + 1;
      }
      return d;
    });
  };

  const collected = Math.min(Math.max(drop - 1, 0), LOOT.length);
  const done = drop >= LOOT.length + 1;

  return (
    <SceneShell>
      <div className="flex w-full max-w-md flex-col items-center">
        <h1 className="font-display text-4xl text-rose-100">{page.title}</h1>
        <p className="mt-1 text-sm text-rose-200/60">{page.subtitle}</p>

        <div className="relative mt-12 h-60 w-60">
          {/* soft glow under the box */}
          <div className="absolute bottom-2 left-1/2 h-6 w-44 -translate-x-1/2 rounded-[100%] bg-rose-500/25 blur-xl" />

          {/* box base */}
          <div className="absolute inset-x-6 bottom-4 h-32 overflow-hidden rounded-b-xl rounded-t-sm bg-gradient-to-b from-rose-500 to-rose-700 shadow-[0_25px_60px_-20px_rgba(0,0,0,0.8)]">
            <div className="absolute inset-y-0 left-1/2 w-7 -translate-x-1/2 bg-gradient-to-b from-amber-200 via-amber-300 to-amber-500 shadow-[0_0_14px_rgba(232,192,122,0.6)]" />
            <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,0.22),transparent_45%)]" />
          </div>

          {/* lid + ribbon + bow lift together */}
          <motion.div
            className="absolute inset-x-3 top-14"
            animate={open ? { y: -150, rotate: -10, opacity: 0 } : { y: [0, -4, 0] }}
            transition={open ? { duration: 0.9, ease: [0.22, 1, 0.36, 1] } : { duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="relative h-14 rounded-lg bg-gradient-to-b from-rose-400 to-rose-600 shadow-[0_18px_40px_-14px_rgba(0,0,0,0.75)]">
              <div className="absolute inset-y-0 left-1/2 w-7 -translate-x-1/2 bg-gradient-to-b from-amber-200 to-amber-400" />
              <div className="absolute inset-x-0 top-1/2 h-3 -translate-y-1/2 bg-gradient-to-r from-amber-300 via-amber-200 to-amber-400 opacity-80" />
              <div className="absolute inset-0 rounded-lg bg-[linear-gradient(115deg,rgba(255,255,255,0.25),transparent_50%)]" />
              {/* bow: two loops + knot */}
              <div className="absolute -top-7 left-1/2 flex -translate-x-1/2 items-center">
                <span className="block h-8 w-9 -rotate-12 rounded-[100%_0_100%_100%] bg-gradient-to-br from-amber-200 to-amber-400 shadow" />
                <span className="z-10 -mx-1 block h-4 w-4 rounded-full bg-amber-300 shadow" />
                <span className="block h-8 w-9 rotate-12 rounded-[0_100%_100%_100%] bg-gradient-to-bl from-amber-200 to-amber-400 shadow" />
              </div>
            </div>
          </motion.div>

          {!open && (
            <button onClick={openBox} className="absolute inset-0 z-10" aria-label="Open gift" />
          )}

          <AnimatePresence>
            {open && (
              <>
                {/* the loot-master cat pops out of the box (kept exactly as before) */}
                <motion.div
                  key="cat"
                  className={`absolute left-1/2 z-30 -translate-x-1/2 ${drop >= 1 && drop <= LOOT.length ? "-top-16" : "top-2"}`}
                  initial={{ y: 70, opacity: 0, scale: 0.3 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  transition={{ delay: 0.55, type: "spring", stiffness: 130, damping: 12 }}
                >
                  <motion.div
                    className="text-5xl drop-shadow-[0_0_18px_rgba(255,220,150,0.6)]"
                    animate={{ rotate: [0, -7, 7, 0] }}
                    transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
                  >
                    😺
                  </motion.div>
                  <motion.div
                    className="mt-1 -rotate-2 whitespace-nowrap rounded-xl bg-cream px-3 py-1 text-center font-hand text-lg text-rose-900 shadow-lg"
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: drop >= 1 && drop <= LOOT.length ? 0 : 1, scale: 1 }}
                    transition={{ delay: drop >= 1 && drop <= LOOT.length ? 0 : 1.1, type: "spring", stiffness: 200, damping: 15 }}
                  >
                    meow! happy birthday!!
                  </motion.div>
                </motion.div>
                {["🦋", "🌸", "🌷", "✨", "💫", "🦋", "🌼"].map((e, i) => (
                  <motion.span
                    key={i}
                    className="absolute left-1/2 top-1/2 text-2xl"
                    initial={{ x: 0, y: 0, opacity: 0, scale: 0.4 }}
                    animate={{ x: (i - 3) * 60, y: -60 - (i % 3) * 40, opacity: [0, 1, 0], scale: 1.2 }}
                    transition={{ duration: 2.2, delay: i * 0.08 }}
                  >
                    {e}
                  </motion.span>
                ))}
              </>
            )}
          </AnimatePresence>

          {/* loot drops rise out of the box, one tap each — like game value */}
          <AnimatePresence mode="wait">
            {open && drop >= 1 && drop <= LOOT.length && (
              <motion.button
                key={drop}
                onClick={collect}
                aria-label="Next item"
                className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2"
                initial={{ y: 70, opacity: 0, scale: 0.35, rotate: -4 }}
                animate={{ y: 0, opacity: 1, scale: 1, rotate: 0 }}
                exit={{ y: 60, opacity: 0, scale: 0.3, rotate: 5 }}
                transition={{ enter: { type: "spring", stiffness: 150, damping: 13 }, exit: { duration: 0.32, ease: "easeIn" } }}
                whileTap={{ scale: 0.94 }}
              >
                <span
                  className={`absolute -top-3 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-full border px-3 py-0.5 text-[10px] font-bold tracking-[0.18em] shadow ${LOOT[drop - 1].badge}`}
                >
                  {LOOT[drop - 1].rarity} {LOOT[drop - 1].stars} · {LOOT[drop - 1].klass}
                </span>
                <span className="relative mx-auto block w-fit overflow-hidden rounded-xl border-4 border-cream bg-cream p-1 shadow-[0_24px_60px_-18px_rgba(0,0,0,0.85)]">
                  <img src={LOOT[drop - 1].src} alt={LOOT[drop - 1].alt} className="mx-auto max-h-52 w-auto max-w-[16rem] object-contain" />
                  <motion.span
                    className="pointer-events-none absolute bottom-1.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-rose-950/70 px-2.5 py-0.5 text-[10px] tracking-wide text-rose-50 backdrop-blur-sm"
                    animate={{ opacity: [0.55, 0.95, 0.55] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                  >
                    tap to collect ▸
                  </motion.span>
                </span>
                <span className="mt-1.5 block -rotate-1 rounded-xl bg-cream px-3 py-1.5 text-center font-hand text-base leading-tight text-rose-900 shadow-lg">
                  {LOOT[drop - 1].note}
                </span>
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* little inventory strip — the game-value shelf */}
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6 }}
            className="mt-7 flex items-center gap-3"
          >
            <span className="font-hand text-base text-rose-100/70">loot bag: {collected}/{LOOT.length}</span>
            {LOOT.map((l, i) => (
              <span
                key={l.src}
                className={`relative h-14 w-14 overflow-hidden rounded-lg border-2 ${
                  collected > i ? "border-amber-300/80 shadow-[0_0_16px_rgba(232,192,122,0.35)]" : "border-dashed border-rose-200/35"
                }`}
              >
                {collected > i && <img src={l.src} alt={l.alt} className="h-full w-full object-cover" />}
                {collected > i && (
                  <span className="absolute bottom-0 right-0 rounded-tl-md bg-amber-300 px-1 text-[10px] font-bold text-amber-900">✓</span>
                )}
              </span>
            ))}
          </motion.div>
        )}

        {done && (
          <motion.button
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => nav({ to: "/journey/final" })}
            data-veilnav
            className="mt-8 rounded-full bg-rose-500 px-6 py-2.5 text-sm font-medium text-white shadow-lg shadow-rose-900/40"
          >
            {page.nextLabel}
          </motion.button>
        )}
      </div>
    </SceneShell>
  );
}
