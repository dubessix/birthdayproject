import { HiOutlineMusicalNote, HiOutlinePause } from "react-icons/hi2";
import { useJourney } from "@/lib/journey";

export function AudioBar() {
  const { musicOn, toggleMusic, hydrated } = useJourney();
  if (!hydrated) return null;
  return (
    <button
      onClick={toggleMusic}
      aria-label={musicOn ? "Pause music" : "Play music"}
      className="fixed bottom-5 right-5 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-white/40 bg-white/60 text-rose-700 shadow-lg backdrop-blur-xl transition hover:scale-105 dark:border-white/10 dark:bg-white/10 dark:text-rose-200"
    >
      {musicOn ? <HiOutlinePause className="h-5 w-5" /> : <HiOutlineMusicalNote className="h-5 w-5" />}
    </button>
  );
}
