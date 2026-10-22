import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Howl } from "howler";
import { content } from "./content";

type JourneyState = {
  hydrated: boolean;
  unlocked: boolean;
  unlock: () => void;
  musicOn: boolean;
  musicFailed: boolean;
  trackIndex: number;
  playMusic: () => void;
  playTrack: (i: number) => void;
  playCakeTune: () => void;
  stopCakeTune: () => void;
  toggleMusic: () => void;
};

const Ctx = createContext<JourneyState | null>(null);

export function JourneyProvider({ children }: { children: ReactNode }) {
  const [hydrated, setHydrated] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [musicOn, setMusicOn] = useState(false);
  const [musicFailed, setMusicFailed] = useState(false);
  const [trackIndex, setTrackIndex] = useState(0);
  const howls = useRef<Record<number, Howl>>({});
  const current = useRef(0);

  useEffect(() => {
    setHydrated(true);
    try {
      setUnlocked(sessionStorage.getItem("hena:unlocked") === "1");
    } catch {}
  }, []);

  const unlock = useCallback(() => {
    setUnlocked(true);
    try { sessionStorage.setItem("hena:unlocked", "1"); } catch {}
  }, []);

  const ensureHowl = useCallback((i: number): Howl | null => {
    if (howls.current[i]) return howls.current[i];
    const track = content.music[i];
    if (!track) return null;
    const h = new Howl({
      src: [track.src],
      html5: true,
      loop: true,
      volume: 0.4,
      // Only claim "music is on" when audio actually starts — never lie on failure.
      onplay: () => { setMusicOn(true); setMusicFailed(false); },
      onpause: () => setMusicOn(false),
      onstop: () => setMusicOn(false),
      onloaderror: () => { setMusicOn(false); setMusicFailed(true); },
      onplayerror: () => { setMusicOn(false); setMusicFailed(true); },
    });
    howls.current[i] = h;
    return h;
  }, []);

  const playTrack = useCallback((i: number) => {
    const prev = howls.current[current.current];
    if (prev && prev.playing()) prev.pause();
    current.current = i;
    setTrackIndex(i);
    const h = ensureHowl(i);
    if (!h) { setMusicFailed(true); return; }
    setMusicFailed(false);
    h.play(); // onplay flips musicOn; onloaderror flips musicFailed
  }, [ensureHowl]);

  const playMusic = useCallback(() => playTrack(0), [playTrack]);

  const toggleMusic = useCallback(() => {
    const h = howls.current[current.current] ?? ensureHowl(current.current);
    if (!h) { setMusicFailed(true); return; }
    if (h.playing()) h.pause();
    else h.play();
  }, [ensureHowl]);


  // --- cake moment: a cheerful happy-birthday cue that takes over, then hands back ---
  const cakeHowl = useRef<Howl | null>(null);
  const resumeWasOn = useRef(false);

  const playCakeTune = useCallback(() => {
    const main = howls.current[current.current];
    resumeWasOn.current = !!main && main.playing();
    if (main && main.playing()) main.pause();
    if (!cakeHowl.current) {
      cakeHowl.current = new Howl({
        src: [content.cake.tune],
        html5: true,
        loop: false,
        volume: 0.5,
        onplay: () => { setMusicOn(true); setMusicFailed(false); },
        onpause: () => setMusicOn(false),
        onstop: () => setMusicOn(false),
        onend: () => setMusicOn(false),
        onloaderror: () => { setMusicOn(false); setMusicFailed(true); },
        onplayerror: () => { setMusicOn(false); setMusicFailed(true); },
      });
    }
    cakeHowl.current.play();
  }, []);

  const stopCakeTune = useCallback(() => {
    cakeHowl.current?.stop();
    const main = howls.current[current.current];
    if (main && resumeWasOn.current) main.play();
    resumeWasOn.current = false;
  }, []);

  useEffect(() => () => { cakeHowl.current?.unload(); }, []);

  useEffect(() => () => { Object.values(howls.current).forEach((h) => h.unload()); }, []);

  const value = useMemo(
    () => ({ hydrated, unlocked, unlock, musicOn, musicFailed, trackIndex, playMusic, playTrack, toggleMusic, playCakeTune, stopCakeTune }),
    [hydrated, unlocked, unlock, musicOn, musicFailed, trackIndex, playMusic, playTrack, toggleMusic, playCakeTune, stopCakeTune],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useJourney() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useJourney outside provider");
  return v;
}
