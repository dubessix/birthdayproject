import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { HiOutlineBackspace } from "react-icons/hi2";
import { SceneShell } from "@/components/layout/SceneShell";
import { GlassCard } from "@/components/ui/GlassCard";
import { content } from "@/lib/content";
import { useJourney } from "@/lib/journey";
import { tapFill } from "@/lib/tapfill";

export const Route = createFileRoute("/journey/password")({
  head: () => ({ meta: [{ name: "robots", content: "noindex" }, { title: "A secret key 🗝️" }] }),
  component: Password,
});

const KEYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", "⌫"];

function Password() {
  const nav = useNavigate();
  const { unlock } = useJourney();
  const [val, setVal] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [wrong, setWrong] = useState(false);
  const [burst, setBurst] = useState(false);
  const [teaserBroken, setTeaserBroken] = useState(false);

  const submit = (next: string) => {
    if (next === content.secret.password) {
      setBurst(true);
      unlock();
      setTimeout(() => nav({ to: "/journey/loading" }), 1300);
    } else {
      setWrong(true);
      setAttempts((a) => a + 1);
      setTimeout(() => { setWrong(false); setVal(""); }, 900);
    }
  };

  const press = (k: string) => {
    if (!k) return;
    if (k === "⌫") { setVal((v) => v.slice(0, -1)); return; }
    setVal((v) => {
      const next = (v + k).slice(0, content.secret.password.length);
      if (next.length === content.secret.password.length) setTimeout(() => submit(next), 0);
      return next;
    });
  };

  // Physical keyboard works too (desktop + bluetooth keyboards).
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key >= "0" && e.key <= "9") press(e.key);
      else if (e.key === "Backspace") press("⌫");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  return (
    <SceneShell>
      <AnimatePresence>
        {burst && (
          <motion.div key="burst"
            className="pointer-events-none fixed inset-0 z-40"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div
              className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-200 shadow-[0_0_120px_60px_rgba(255,210,140,0.8)]"
              animate={{ scale: [1, 120] }}
              transition={{ duration: 1.1, ease: "easeOut" }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div animate={wrong ? { x: [-10, 10, -8, 8, -4, 0] } : {}} transition={{ duration: 0.5 }} className="w-full max-w-sm">
        <GlassCard className="p-6">
          <div className="mb-5 flex flex-col items-center">
            <div className="relative rotate-[-3deg] rounded-md bg-white p-2 pb-6 shadow-lg">
              <div className="relative h-28 w-32 overflow-hidden rounded-sm bg-gradient-to-br from-rose-200 via-amber-100 to-lilac">
                {!teaserBroken && (
                  <img
                    src="/media/memes/birthday-sign.jpg"
                    alt="A cartoon friend holding a colourful Happy Birthday sign"
                    onError={() => setTeaserBroken(true)}
                    className="absolute inset-0 z-10 h-full w-full rounded-sm object-contain object-center p-1"
                  />
                )}
              </div>
              <p className="mt-2 text-center font-hand text-sm text-rose-900">a small secret</p>
            </div>
            <h1 className="mt-5 font-display text-2xl text-foreground">Enter the secret key</h1>
            <p className="mt-1 text-xs text-muted-foreground">{content.secret.password.length} digits — keypad or keyboard</p>
          </div>

          <div className="mx-auto mb-4 flex h-12 items-center justify-center gap-2" aria-label={`${val.length} of ${content.secret.password.length} digits entered`}>
            {Array.from({ length: content.secret.password.length }).map((_, i) => (
              <div key={i} className={`h-3 w-3 rounded-full transition ${i < val.length ? "bg-rose-500 scale-110" : "bg-rose-200/70"}`} />
            ))}
          </div>

          <div className="grid grid-cols-3 gap-2">
            {KEYS.map((k, i) =>
              k === "" ? (
                <span key={i} aria-hidden className="h-12" />
              ) : (
                <button
                  key={i}
                  onClick={() => press(k)}
                  onPointerDown={tapFill("rgba(255,255,255,0.5)")}
                  aria-label={k === "⌫" ? "Delete last digit" : `Digit ${k}`}
                  className="relative isolate h-12 overflow-hidden rounded-2xl border border-white/40 bg-white/50 text-lg font-medium text-rose-900 shadow-sm backdrop-blur transition active:scale-95 dark:border-white/10 dark:bg-white/5 dark:text-rose-100"
                >
                  {k === "⌫" ? <HiOutlineBackspace className="mx-auto h-5 w-5" /> : k}
                </button>
              ),
            )}
          </div>

          <p className="mt-3 text-center text-[11px] tracking-wide text-rose-200/50">
            psst — you know this date better than anyone 😉
          </p>

          <AnimatePresence>
            {wrong && (
              <motion.div key="panda" className="mt-5 flex items-center justify-center gap-2"
                initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                role="status">
                <motion.span className="text-3xl" animate={{ rotate: [0, -15, 15, -10, 0] }} transition={{ duration: 0.6 }}>🐼</motion.span>
                <span className="text-sm text-rose-800 dark:text-rose-200">{content.secret.wrongMessage}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {attempts >= content.secret.maxAttempts && (
            <div className="mt-4 rounded-2xl bg-amber-100/70 px-3 py-2 text-center text-xs text-amber-900 dark:bg-amber-300/10 dark:text-amber-200">
              <p>
                Hint unlocked: <span className="font-medium">{content.secret.hint}</span>
              </p>
              {/* friendly escape hatch — the gate is theatre, she should never get stuck */}
              <button
                onClick={() => { unlock(); nav({ to: "/journey/loading" }); }}
                onPointerDown={tapFill("rgba(255,255,255,0.35)")}
                className="relative isolate mt-2 min-h-8 overflow-hidden rounded-full px-4 py-1.5 text-[11px] underline-offset-4 hover:underline"
              >
                still stuck? continue anyway 😅
              </button>
            </div>
          )}
        </GlassCard>
      </motion.div>
    </SceneShell>
  );
}
