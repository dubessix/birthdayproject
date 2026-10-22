import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { AudioBar } from "./AudioBar";

/**
 * Wraps every scene: page-level entrance/exit + shared audio bar.
 * - overflow-x-clip: burst particles can never create sideways page scroll.
 * - pb-28: content always clears the floating AudioBar (no overlap on small phones).
 */
export function SceneShell({ children, hideAudio = false }: { children: ReactNode; hideAudio?: boolean }) {
  return (
    <motion.main
      className="relative z-10 flex min-h-[100dvh] w-full items-center justify-center overflow-x-clip px-5 pt-10 pb-28 sm:px-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
      {!hideAudio && <AudioBar />}
    </motion.main>
  );
}
