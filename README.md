# A Night To Remember

You are an award-winning Senior Frontend Engineer, UI/UX Designer, Motion Designer, and Creative Developer.

Your mission is to build a PREMIUM, MODERN, CINEMATIC, and MOBILE-FIRST interactive birthday website.

This should NOT feel like a normal webpage.

It should feel like an emotional interactive experience.

Target quality:

Apple × Framer × Awwwards × Premium SaaS.

=================================================

GENERAL REQUIREMENTS

=================================================

• Mobile First (Most Important)

• Fully Responsive

• Optimized for Android devices

• Smooth 60 FPS animations

• Beautiful on desktop and tablet as well

• Fast loading

• Clean component architecture

• Production-quality code

• No copied UI

• Elegant typography

• Soft color palette

• Premium glassmorphism

• Beautiful gradients

• Accessible

• SEO friendly

• Lazy load images

• Smooth page transitions

• Modern animations

• No lag

Tech Stack

- React + Vite

- TailwindCSS

- Framer Motion

- GSAP

- Howler.js

- Lottie

- Canvas Confetti

- Lenis Smooth Scroll

- React Icons

=================================================

COLOR THEME

=================================================

Soft Pink

Cream White

Warm Gold

Rose

Pastel Purple

Dark Mode support.

=================================================

BACKGROUND

=================================================

Animated stars

Fireflies

Floating petals

Glowing particles

Soft blur effects

Mouse/touch glow interaction

=================================================

INTRO

=================================================

Black screen

Typing animation

"Someone spent days creating something special..."

Fade animation

Small glowing star appears.

Tap the star.

Everything slowly lights up.

=================================================

PAGE 1

SECRET PASSWORD

=================================================

Beautiful glass card

Polaroid image

Password keypad

Wrong password:

Cute panda animation

Message:

"Hehe... that's not the secret key 🐼"

After 3 attempts

"Hint unlocked..."

Correct password

Golden light explosion

Beautiful transition.

=================================================

PAGE 2

LOADING

=================================================

Typing animation

"Hey [Her Name] 🌸"

Loading bar

Floating hearts

Sparkles

Soft piano music (provide a visible Play button so browsers that block autoplay still work smoothly).

=================================================

PAGE 3

ENVELOPE

=================================================

Luxury envelope

Wax seal

Click animation

Envelope opens

Letter slowly comes out

Paper unfolding animation

=================================================

PAGE 4

HANDWRITTEN LETTER

=================================================

The letter should look handwritten.

Every word appears as if written in real time.

Beautiful paper texture.

=================================================

PAGE 5

PHOTO MEMORIES

=================================================

Photos fall naturally.

Polaroid style.

Click photo

Flip animation

Hidden message behind each photo.

=================================================

PAGE 6

HAPPY BIRTHDAY

=================================================

Cake builds itself.

Cream animation

Candles appear

Lights dim

Button

"Blow Candles"

If microphone permission is unavailable, allow a tap instead.

Candles go out

Confetti

Fireworks

=================================================

PAGE 7

MUSIC

=================================================

Beautiful music player.

Album artwork.

Rotating disc.

Progress animation.

Play / Pause

Elegant controls.

=================================================

PAGE 8

WISH WALL

=================================================

Floating cards

Stay Happy 🌸

Stay Healthy 💖

Keep Smiling 😊

Achieve Every Dream ✨

Stay Blessed 🌼

=================================================

PAGE 9

MAGICAL NIGHT

=================================================

Live stars

Moon

Fireflies

Flowers

Butterflies

Cursor glow

Ambient animations

=================================================

PAGE 10

SECRET GIFT

=================================================

Gift box

Hover animation

Ribbon unties

Box opens

Butterflies fly

Flowers bloom

Golden particles

=================================================

PAGE 11

FINAL MESSAGE

=================================================

Everything fades.

Stars slowly gather together.

They form:

Happy Birthday

[Her Name]

Then show:

"Some gifts are bought.

Some gifts are created with time, patience, and care.

This little website is one of them.

I hope today brings you happiness, smiles, and beautiful memories.

Happy Birthday."

=================================================

LAST SCREEN

=================================================

Minimal design.

Soft glowing background.

Show elegantly:

Made with ❤️

by

Debjeet

Then

"Thank you for taking this journey."

A small glowing Restart Journey button.

=================================================

EXTRA DETAILS

=================================================

Hidden easter eggs

Cute panda

Floating butterflies

Soft sound effects

Premium loading animations

Smooth fade transitions

No cheap effects

Everything should feel premium.

=================================================

IMPORTANT

=================================================

This project should feel like a premium interactive story rather than a normal website.

Every transition should be meaningful.

Every animation should feel smooth.

Every page should surprise the user.

The final result should be memorable, elegant, and emotionally warm while remaining respectful and not overwhelming.

Generate complete production-ready code with clean folder structure, reusable React components, and comments where useful.      ( Make an professional and ultimate gift 🎁 for my ultold love that i cmake his face smile )

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/054442a9-1310-4cc8-a815-704bdd935cfd).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

---

## 💝 Rebrand this site (the fun part)

Everything editable lives in **one file**: `src/content/birthday.config.json`.

| Key | What it controls |
|-----|------------------|
| `recipient.name` / `greeting` | the name everywhere (finale text-forming stars use it too) |
| `author.name` | the signature on the credits screen |
| `secret.password` / `hint` / `maxAttempts` | the keypad gate (theatre, not security — it ships in the client bundle) |
| `letter.title` / `body` | the cream parchment birthday letter (tap to reveal instantly) |
| `photos[]` | `{ src, caption, secret }` — drop images in `public/media/photos/` and reference them; omit `src` for gradient placeholders |
| `music[]` | playlist tracks `{ title, artist, src }` — drop audio in `public/media/audio/` (`.wav`/`.mp3`); bundled loops ship as placeholders |
| `wishes[]`, `cake.candles`, `finalMessage`, `credits.*` | the rest of the story |

Notes:
- Audio never autoplays; every track sits behind a visible play control, and load failures show a friendly retry instead of a fake "playing" state.
- The journey is guarded: scenes redirect to the password page until the key is solved (session-scoped).
- `prefers-reduced-motion` swaps the starfield/petals/fireflies for a calm static sky and lets Framer Motion simplify animations.
- Inner pages are `noindex`; only the intro is shareable.

## 📸 Adding the real assets (2 minutes)

1. **Hena's photos** — replace these six files (keep the names, any jpg/png):
   `public/media/photos/1.jpg` … `6.jpg`
   Captions/flip-notes live in `birthday.config.json` → `photos[]` (currently friendly placeholders — adapt them to each real picture; never imply shared memories you didn't both live).
   Missing/broken files automatically fall back to the soft gradient polaroids.
2. **Your profile photo (credits page)** — drop a square-ish jpg at:
   `public/media/author/debjeet.jpg`
   Until then the credits show an elegant "D" monogram in the same gold ring.
