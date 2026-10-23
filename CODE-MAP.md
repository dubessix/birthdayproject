# CODE-MAP — read this before the code

For Debjeet, the day you read your own site line by line.
Every scene is one file. Every word she sees lives in ONE config file.
Read in this order; answer the question at the end of each stop out loud.
If you can answer it, you own that file.

## 0. The shape of the repo

- `src/content/birthday.config.json` — ALL copy: captions, secrets, wishes, playlist, letter, final message. Change a word here, the site changes. No code touch needed.
- `src/routes/journey.*.tsx` — one file per scene. TanStack Start = file-based routing: the filename IS the URL.
- `src/lib/content.ts` — loads + types that config.
- `src/components/` — shared shells (SceneShell), the gate modal (MusicFirstModal), ambient layers.
- `src/styles.css` — Tailwind v4 entry + hand-made keyframes (eq-bar, tapfill ripple).

## 1. Boot & loading

- `src/routes/__root.tsx` — the wait-bunny + striped bar are painted by the FIRST HTML, before any JS runs. Study: why putting markup in the root document beats a spinner component.
- `src/routes/journey.loading.tsx` — the bar reflects REAL preload progress, not a fake timer. Study: how the preload list is built, and the rule "delete an asset = delete it from this list too" (a 404 here once shipped; commit 0d271c8).
- Question: what breaks if a preload URL 404s?

## 2. The gate (music-first rule)

- `src/components/ui/MusicFirstModal.tsx` + its wiring in `journey.loading.tsx` and `journey.music.tsx`.
- Pattern: Continue handler checks `musicOn`; if false → modal. The quiet escape hatch renders ONLY when audio genuinely failed (`musicFailed`) — a gate must never become a trap.
- Question: why is the hatch conditional instead of always visible?

## 3. Password

- `src/routes/journey.password.tsx` — the code is a plain string state; submit fires when length hits 8; wrong attempts shake (framer `x` keyframes) and clear after 900 ms.
- Study: the 900 ms clear window — taps during the shake are swallowed on purpose. (My own QA once raced this and lost.)
- Question: why auto-submit on length instead of a Submit button?

## 4. Letter & memories

- `journey.letter.tsx` — word-by-word reveal (map words → motion.span with delay = i * 0.03). The margin doodle is inline SVG at 35% opacity.
- `journey.memories.tsx` — the 3D flip is pure CSS: `backface-visibility:hidden` on two faces, rotateY on the parent. Photos + captions come from config only.
- Question: how would YOU add a 7th polaroid? (Answer: config only. That's your first solo commit candidate.)

## 5. Cake & music (audio discipline)

- `journey.cake.tsx` — blow state dims the sky; the cake tune starts on the cake page and pauses/resumes via refs (`cakePaused`), because Howl.state() never reports "paused" reliably.
- `journey.music.tsx` — Howler with `html5: true`; the featured-song auto-switch is ONE useEffect on mount: find the config `musicPage.feature` src in the playlist → playTrack(idx).
- Rule learned the hard way: browsers block audio until a user gesture. Every autoplay in this site rides on a tap she already made.
- Question: why does the feature effect compare `idx !== trackIndex` before playing?

## 6. The loot crate (the best state machine in the repo)

- `journey.gift.tsx` — `drop` is one integer: 0 closed, 1..N card on screen, N+1 done. Everything else DERIVES from it: `collected`, `done`, inventory slots, cat perch, bubble visibility.
- `AnimatePresence mode="wait"` makes card N exit fully before card N+1 enters.
- Study the `collect()` updater: one guard (`d <= LOOT.length`) — a `<` instead of `<=` once froze the last drop (commit history tells the story).
- Question: why derive instead of storing `collected` in its own state?

## 7. Final & credits

- `journey.final.tsx` — particle text: canvas measures the text, stars fly to those points, then the real h1 fades in. Phases: gather → text.
- `journey.credits.tsx` — the stamp is two nested rounded-full borders, rotated -6°, nothing else.
- Question: why measure text on canvas instead of animating DOM letters?

## 8. Cross-cutting tricks (grep these)

- `tapfill` ripple: pointerdown starts a fill that HOLDS until release, then fades. Works on tabs too.
- Star-tap veil: a synchronous `useRef` guard stops double-taps from spawning 3 veils (useState guards are async — they lost that race once).
- `sessionStorage "hena:unlocked"`: init true + `useLayoutEffect` sync = no hydration mismatch in SSR.
- Ambient budget: 8 petals / 10 fireflies / canvas dpr ≤ 2. Motion-rich but never laggy was a hard requirement.
- `rolldown` pinned 1.2.6 in package.json overrides: 1.2.8 SIGBUS-crashed builds. Pins are scars, not cowardice.
- `nitro()` in vite.config.ts: without it Vercel deploys an empty shell (the great 404 night). With it, the build emits `.vercel/output` = Build Output API v3: static/ + one `__server` function + config.json routes.

## 9. Your first solo commits (pick one, I'll review like a senior dev if you want)

1. [easy] Add polaroid #7 from config only — caption, secret, done.
2. [easy] New wish card in config + check the stagger delay formula.
3. [medium] A "chapter 2" scene (new journey.*.tsx file) — the router picks it up with zero config; wire a Continue chain both ways.
4. [medium] Photo lightbox on memories tap-hold (gesture + escape + reduced-motion).
5. [hard] Replace the particle-text canvas with your own implementation from scratch, same phases.

The day one of these ships with your name only on it, this repo stops being "the AI's site".
Not before. And not by argument — by commit.
