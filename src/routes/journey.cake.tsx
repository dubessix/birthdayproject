import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import { SceneShell } from "@/components/layout/SceneShell";
import { GoldButton } from "@/components/ui/GoldButton";
import { content } from "@/lib/content";
import { useJourney } from "@/lib/journey";

export const Route = createFileRoute("/journey/cake")({
  head: () => ({ meta: [{ name: "robots", content: "noindex" }, { title: "Make a wish 🎂" }] }),
  component: Cake,
});

function fireConfetti() {
  const end = Date.now() + 1500;
  const colors = ["#e8a6b6", "#e8c07a", "#d9c7f2", "#fadadd"];
  (function frame() {
    confetti({ particleCount: 4, angle: 60, spread: 70, origin: { x: 0, y: 0.8 }, colors });
    confetti({ particleCount: 4, angle: 120, spread: 70, origin: { x: 1, y: 0.8 }, colors });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();
}

/** Candle: stick + wick + teardrop flame that sits exactly on the wick. */

function Bunting() {
  const reduce = useReducedMotion();
  const pts = [0.06, 0.17, 0.28, 0.39, 0.5, 0.61, 0.72, 0.83, 0.94].map((t) => ({
    x: 2 * (1 - t) * t * 195 + t * t * 390,
    y: (1 - t) * (1 - t) * 6 + 2 * (1 - t) * t * 26 + t * t * 6,
  }));
  const cols = ["#fda4af", "#fde68a", "#d9c7f2", "#fff7ec"];
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 -top-14 z-0"
      animate={reduce ? undefined : { rotate: [0, 1.2, 0] }}
      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      style={{ originX: "50%", originY: "0%" }}
    >
      <svg viewBox="0 0 390 40" className="w-full">
        <path d="M0,6 Q195,26 390,6" fill="none" stroke="#fff7ec" strokeOpacity="0.45" strokeWidth="1.5" />
        {pts.map((p, i) => (
          <path key={i} d={`M${p.x - 11},${p.y} L${p.x + 11},${p.y} L${p.x},${p.y + 20} Z`} fill={cols[i % 4]} opacity="0.85" />
        ))}
      </svg>
    </motion.div>
  );
}

function Candle({ blown, delay }: { blown: boolean; delay: number }) {
  return (
    <div className="relative mx-[5px] flex w-2.5 flex-col items-center">
      {/* flame stack, anchored to the top of the candle */}
      <div className="absolute bottom-full left-1/2 mb-[1px] -translate-x-1/2">
        <AnimatePresence>
          {!blown ? (
            <motion.span
              key="flame"
              className="block h-4 w-[9px] rounded-[50%_50%_50%_50%/60%_60%_40%_40%] bg-[radial-gradient(circle_at_50%_75%,#fff8dc_0%,#ffd166_45%,#f79420_80%,rgba(247,148,32,0)_100%)] shadow-[0_0_16px_5px_rgba(255,190,90,0.55)]"
              initial={{ opacity: 0, scaleY: 0.4 }}
              animate={{ opacity: 1, scaleY: [1, 1.15, 0.95, 1], scaleX: [1, 0.92, 1.05, 1] }}
              exit={{ opacity: 0, y: -14, scaleY: 0.2 }}
              transition={{
                opacity: { duration: 0.25 },
                scaleY: { duration: 0.9 + delay, repeat: Infinity, ease: "easeInOut" },
                scaleX: { duration: 1.1 + delay, repeat: Infinity, ease: "easeInOut" },
              }}
              style={{ transformOrigin: "bottom center" }}
            />
          ) : (
            <motion.span
              key="smoke"
              className="block h-4 w-[9px] rounded-full bg-slate-300/30 blur-[3px]"
              initial={{ opacity: 0.6, y: 0 }}
              animate={{ opacity: 0, y: -26 }}
              transition={{ duration: 1.6, delay: delay }}
            />
          )}
        </AnimatePresence>
      </div>
      {/* wick */}
      <div className="h-1.5 w-[2px] rounded-full bg-stone-700" />
      {/* candle body */}
      <div className="h-9 w-2.5 rounded-[2px] bg-[repeating-linear-gradient(45deg,#fff1f4_0_5px,#f2a0b4_5px_10px)] shadow-sm" />
    </div>
  );
}

function Cake() {
  const { playCakeTune, stopCakeTune } = useJourney();
  useEffect(() => {
    playCakeTune();
    return () => stopCakeTune();
  }, [playCakeTune, stopCakeTune]);
  const nav = useNavigate();
  const [built, setBuilt] = useState(false);
  const [dim, setDim] = useState(false);
  const [blown, setBlown] = useState(false);
  const page = content.cake;

  return (
    <SceneShell>
      {/* dims the whole sky (above ambient, below content) */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-[5] bg-black"
        animate={{ opacity: dim && !blown ? 0.7 : 0 }}
        transition={{ duration: 1 }}
      />
      <div className="relative z-10 flex w-full max-w-md flex-col items-center">
        <Bunting />
        <h1 className="font-display text-4xl text-rose-100">{page.title}</h1>

        <motion.div
          className="relative mt-12 h-72 w-64"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onAnimationComplete={() => setBuilt(true)}
          transition={{ duration: 0.6 }}
        >
          {/* plate */}
          <motion.div
            className="absolute bottom-2 left-1/2 h-3 w-56 -translate-x-1/2 rounded-full bg-white/80 shadow"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6 }}
          />
          {/* tier 1 */}
          <motion.div
            className="absolute bottom-5 left-1/2 h-20 w-48 -translate-x-1/2 rounded-t-md bg-gradient-to-b from-rose-300 to-rose-500 shadow-lg"
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <span className="absolute inset-x-0 top-6 text-center font-hand text-xl tracking-wide text-rose-50/95">
              {content.recipient.name} ✦ 18
            </span>
          </motion.div>
          {/* cream drips */}
          <motion.div
            className="absolute bottom-[92px] left-1/2 h-4 w-48 -translate-x-1/2 bg-[color:var(--cream)]"
            style={{
              clipPath:
                "polygon(0 0,100% 0,95% 100%,88% 30%,80% 100%,72% 40%,64% 100%,56% 30%,48% 100%,40% 40%,32% 100%,24% 30%,16% 100%,8% 40%,0 100%)",
            }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          />
          {/* tier 2 */}
          <motion.div
            className="absolute bottom-[100px] left-1/2 h-16 w-32 -translate-x-1/2 rounded-t-md bg-gradient-to-b from-amber-100 to-rose-200 shadow-lg"
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          />
          {/* candles — sit ON the top tier (tier 2 top = 100px + 64px = 164px) */}
          {built && (
            <motion.div
              className="absolute bottom-[164px] left-1/2 flex -translate-x-1/2 items-end"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {Array.from({ length: page.candles }).map((_, i) => (
                <Candle key={i} blown={blown} delay={i * 0.1} />
              ))}
            </motion.div>
          )}
        </motion.div>

        <div className="mt-6">
          <AnimatePresence mode="wait">
            {!blown ? (
              <motion.div key="blow" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <GoldButton
                  onClick={() => {
                    setDim(true);
                    setTimeout(() => {
                      setBlown(true);
                      fireConfetti();
                    }, 900);
                  }}
                >
                  {page.blowLabel}
                </GoldButton>
                <p className="mt-2 text-center text-xs text-rose-200/60">{page.blowHint}</p>
              </motion.div>
            ) : (
              <motion.button
                key="next"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={() => nav({ to: "/journey/music" })} data-veilnav
                className="rounded-full bg-rose-500 px-6 py-2.5 text-sm font-medium text-white shadow-lg shadow-rose-900/40"
              >
                {page.nextLabel}
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </SceneShell>
  );
}
