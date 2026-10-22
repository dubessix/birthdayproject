
# Cinematic Birthday Experience — "For Hena"

A mobile-first, 11-page interactive story. Everything user-editable (name, password, hint, letter, photos, songs, wishes, credits, colors) lives in **one JSON file** so the same codebase can be reskinned and resold.

## Config-first architecture

Single source of truth:

```
src/content/birthday.config.json
```

Shape (excerpt):

```json
{
  "recipient": { "name": "Hena", "pronouns": "she/her" },
  "author":    { "name": "Debjeet" },
  "secret":    { "password": "23102008", "hint": "A date that changed everything (DDMMYYYY)", "maxAttempts": 3 },
  "letter":    { "title": "For you, Hena", "body": "..." },
  "photos":    [{ "src": "/media/photos/1.jpg", "caption": "That evening", "secret": "You laughed at my joke. I replayed it for weeks." }],
  "music":     [{ "title": "Our Song", "artist": "—", "src": "/media/audio/song1.mp3", "cover": "/media/covers/1.jpg" }],
  "wishes":    ["Stay Happy 🌸", "Stay Healthy 💖", "Keep Smiling 😊", "Achieve Every Dream ✨", "Stay Blessed 🌼"],
  "finalMessage": "Some gifts are bought...",
  "theme": { "mode": "auto", "pink": "#FADADD", "cream": "#FFF7EC", "gold": "#E8C07A", "rose": "#E8A6B6", "purple": "#D9C7F2" }
}
```

A tiny `useContent()` hook loads and validates it (zod) and exposes it to every page. Placeholders (generated polaroid-style images + a soft royalty-free piano loop) ship in `/public/media/` so it runs out of the box; swapping is drag-and-drop.

I'll draft a warm, respectful letter for Hena as the default `letter.body`; you can overwrite it anytime.

## Tech

React + Vite (TanStack Start already scaffolded), TailwindCSS v4 tokens for the soft palette + dark mode, Framer Motion (page transitions, orchestration), GSAP (envelope unfold, cake build, star gather), Lenis (smooth scroll), Howler.js (music + SFX with a visible Play button — no autoplay assumptions), Lottie (panda, butterflies, sparkles), canvas-confetti (candle blow + gift), react-icons.

## Route structure

Single-flow experience with a controller that advances scenes. Deep-linkable per page.

```
src/routes/
  index.tsx            → Intro (black screen → tap the star)
  __root.tsx           → global providers, Lenis, ambient bg, SEO
src/routes/journey/
  password.tsx         → Page 1
  loading.tsx          → Page 2
  envelope.tsx         → Page 3
  letter.tsx           → Page 4
  memories.tsx         → Page 5
  cake.tsx             → Page 6
  music.tsx            → Page 7
  wishes.tsx           → Page 8
  night.tsx            → Page 9
  gift.tsx             → Page 10
  final.tsx            → Page 11 (stars form "Happy Birthday Hena")
  credits.tsx          → Last screen (Made with ❤ by Debjeet, Restart)
```

A `JourneyProvider` tracks progress in `sessionStorage` so refresh doesn't skip cinematics, and gates forward navigation (can't reach `/journey/letter` before solving the password).

## Reusable components

```
src/components/
  ambient/          StarsCanvas, Fireflies, Petals, CursorGlow, GradientBlur
  ui/               GlassCard, GoldButton, TypeWriter, PolaroidFrame
  fx/               PageTransition, ConfettiBurst, Fireworks, SparkleTrail
  scenes/           Envelope, Cake, GiftBox, StarFormation, MusicPlayer, WishCard, PhotoStack, Keypad, PandaHint
  layout/           SceneShell, AudioBar
src/lib/
  content.ts        zod schema + loader
  audio.ts          Howler singleton, unlock-on-first-gesture
  motion.ts         shared easings, variants
  useHydrated.ts    SSR-safe hooks
  useReducedMotion.ts
```

## Page-by-page behaviour

1. **Intro** — black, typed "Someone spent days creating something special…", a small star fades in and pulses; tap it → GSAP timeline lights the scene, transitions to `/journey/password`.
2. **Password** — glass card, generated polaroid, numeric keypad (mobile-optimised), value from JSON. Wrong → Lottie panda shakes with "Hehe… that's not the secret key 🐼". After `maxAttempts` shows `secret.hint`. Correct → golden radial burst + iris transition.
3. **Loading** — typed "Hey Hena 🌸", progress bar with floating hearts/sparkles, prominent Play Music button (unlocks Howler; never autoplays).
4. **Envelope** — wax-seal press interaction, GSAP unfold, letter slides out.
5. **Letter** — parchment texture, "Homemade Apple"/"Caveat" handwritten font, per-word reveal timed to a soft pen SFX; content from `letter.body`.
6. **Memories** — polaroids drop with physics feel (Framer Motion + rotation), tap flips to reveal `photo.secret`.
7. **Cake** — GSAP build (plate → tiers → cream → candles), lights dim, "Blow Candles" button; tries `getUserMedia` mic (volume threshold) and always falls back to tap. Blow → flames out, confetti + fireworks.
8. **Music** — rotating disc album art, Howler-backed player, elegant progress ring, playlist from JSON.
9. **Wishes** — floating glass cards from `wishes[]`, parallax on device tilt.
10. **Night** — ambient scene: stars, moon, fireflies, butterflies, cursor/touch glow.
11. **Gift** — hover/tap ribbon unties (GSAP), lid lifts, butterflies + petals + gold particles fly out.
12. **Final** — stars gather (particle target coords generated from a text canvas mask) to form "Happy Birthday Hena", then `finalMessage` fades in.
13. **Credits** — "Made with ❤ by Debjeet", "Thank you for taking this journey.", glowing Restart button clears session and returns to Intro.

## Polish & non-negotiables

- Mobile-first at 390×844; tested breakpoints sm/md/lg.
- `prefers-reduced-motion` respected — heavy timelines swap for gentle fades.
- All audio behind a visible control; first gesture unlocks Howler.
- Lazy-load photos + Lottie JSON; preload only the next scene's assets.
- Semantic HTML + alt text + focus rings; dark mode via `theme.mode`.
- SEO: route-level `head()` with title/description/og for the intro; `noindex` on inner journey pages (private).
- Clean commit-ready code, TypeScript, comments where it helps.

## What ships as placeholders (swap later by editing JSON)

- 4–6 AI-generated soft polaroid images under `/public/media/photos/`
- 1 gentle piano loop under `/public/media/audio/` (royalty-free)
- Panda + butterfly Lottie JSONs under `/public/media/lottie/`
- Default letter draft (warm, respectful, ~180 words) in the config

## Delivery checklist

- [ ] Config JSON + zod schema + loader
- [ ] Ambient background system (stars, petals, fireflies, cursor glow)
- [ ] All 11 scenes + credits
- [ ] Journey guard + session progress
- [ ] Audio bar (Howler) with global mute
- [ ] Reduced-motion + dark-mode passes
- [ ] Lighthouse mobile pass (perf/accessibility)
- [ ] README explaining how to rebrand via the JSON

Approve and I'll build it end-to-end.
