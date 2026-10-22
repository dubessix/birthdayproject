import { AnimatePresence, motion } from "framer-motion";
import { GoldButton } from "./GoldButton";
import { useJourney } from "@/lib/journey";

/**
 * Gentle but firm: the song is part of the gift. If she tries to move on
 * without ever playing the music, this asks her to play it first.
 * A quiet escape hatch appears ONLY if audio genuinely fails on her device,
 * so she can never get stuck.
 */
export function MusicFirstModal({ open, onClose, onQuiet }: { open: boolean; onClose: () => void; onQuiet?: () => void }) {
  const { playMusic, musicFailed } = useJourney();
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 grid place-items-center bg-black/55 p-6 backdrop-blur-sm"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            className="w-full max-w-sm rounded-3xl border border-white/15 bg-white/10 p-6 text-center shadow-2xl backdrop-blur-xl"
          >
            <h2 className="font-display text-xl text-rose-100">one thing first 🎵</h2>
            <p className="mt-3 text-sm leading-snug text-rose-100/85">
              the song is half the magic — play it once, okay? then the whole journey sounds like the two of us.
            </p>
            <GoldButton
              className="mt-5 min-h-11"
              onClick={() => {
                playMusic();
                onClose();
              }}
            >
              play it ▶
            </GoldButton>
            {musicFailed && onQuiet && (
              <button
                onClick={onQuiet}
                className="mx-auto mt-3 block text-[11px] text-rose-200/60 underline-offset-4 hover:underline"
              >
                sound stuck? continue quietly 😅
              </button>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
