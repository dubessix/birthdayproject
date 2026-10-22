# 🎂 Hena's site — push & Vercel deploy guide (for Debjeet)

Everything is committed in the workspace clone (`bp/`, branch `main`) and packed in
`hena-fixes.bundle`. Nothing below needs you to code — just click / paste.

---

## 0) Tonight — her 3–4 new photos
Send me the photos here in chat. I will:
- compress them to web-friendly JPGs,
- put them in the slots you say (e.g. photos 2 & 5 = her real pictures, or add new polaroids),
- re-run the full test suite, re-commit and refresh the bundle.
You do nothing else afterwards — just the push below.

---

## 1) Push to your GitHub repo (`dubessix/birthdayproject`)

**Option A — give me access (easiest, 2 min):**
1. GitHub → Settings → Developer settings → Personal access tokens → **tokens (classic)** → Generate new token.
2. Tick only `repo` scope. Copy the token (starts with `ghp_` or `github_pat_`).
3. Paste it here in chat. I push everything to `main` for you and delete nothing of yours.
   (Or: GitHub → your repo → Settings → Collaborators → add my username if you prefer.)

**Option B — you push yourself (no login sharing):**
```bash
git clone https://github.com/dubessix/birthdayproject.git
cd birthdayproject
git pull /path/to/hena-fixes.bundle main     # the bundle file I gave you
git push origin main
```
The bundle contains the FULL history (your first commit + every fix + every effect),
so one `git pull` + `git push` is enough.

---

## 2) Host on Vercel (free, perfect for this site)

1. Go to **vercel.com → Sign up → Continue with GitHub** (same GitHub account).
2. **Add New… → Project** → find `birthdayproject` → **Import**.
3. Vercel auto-detects the setup. Check these on the import screen:
   - Framework Preset: **Other** (or Vite — both work; the repo's `vercel.json` sets the build command)
   - Build Command: `npm run build`  (already in `vercel.json`)
   - Install Command: `npm install`  (already in `vercel.json`)
   - Node.js version: **20.x or 22.x** (default is fine)
4. Press **Deploy**. First deploy takes ~1–2 min. You get a URL like
   `https://birthdayproject-xxxx.vercel.app`.
5. **Important (makes her link-preview picture work):**
   - Vercel project → Settings → Environment Variables → add:
     - Name: `VITE_SITE_URL`
     - Value: your vercel URL from step 4 (e.g. `https://birthdayproject-xxxx.vercel.app`)
   - Then Deployments → ⋯ → **Redeploy** (once) so the variable bakes in.
6. Optional but nice: Settings → Domains → add a custom domain if you own one
   (e.g. `forhena.dev`) — otherwise the vercel.app URL is what you send her.

**Every future update** (photos, funny bits): push to GitHub (step 1) → Vercel
redeploys automatically in ~1 minute. Zero extra work.

### If a Vercel deploy ever fails
- Logs will say why; 99% of the time it's just a missing env var or a token expiry.
- The site builds cleanly in production mode right now (`npm run build` exits 0),
  so a failure would be Vercel-side config, not code.

---

## 3) About package versions (you asked for "latest, no prod errors")
- Everything is on the current stable Vite 8 / TanStack Start / Tailwind 4 / Framer Motion line,
  and the production build is verified (`npm run build` = exit 0, full Playwright run = 0 errors).
- ONE pin is deliberate: `rolldown@1.2.6` (inside package.json "overrides").
  Newer rolldown (1.2.8+) has a known crash bug (SIGBUS) that kills dev/build machines —
  the pin PREVENTS a production-time error. Don't "fix" this pin 🙂.

---

## 4) Send-it checklist (tomorrow)
- [ ] Evening: send her 3–4 photos → I update + retest + new bundle
- [ ] You: GitHub token (Option A) or bundle-push (Option B)
- [ ] You: Vercel import + deploy (5 min, steps above)
- [ ] Add `VITE_SITE_URL`, redeploy once
- [ ] Open the URL on YOUR phone once: star → light wave → password `23102008` →
      panda bar → ringtone → cake tune → memes → moon → final letter → credits
- [ ] Send her the link at the right moment 🌸

That's it. She gets: boot bunny → star light-wave → confession popup → her photos →
cake + birthday tune → your ringtone looping → shin-chan memes → warm moon →
"some gifts are bought…" → credits joke. No lag, no mixed sounds, no stuck screens.
