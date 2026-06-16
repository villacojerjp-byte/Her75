# Her 75 💗

A polished re-imagining of the **Her 75** app — a 75-day wellness challenge built for women — with a softer, more premium UI and **tactile click sounds on every button**.

This is a faithful UX recreation of the App Store app
([id6746784659](https://apps.apple.com/us/app/her-75/id6746784659)) with the visual
design elevated: glassmorphism cards, a warm blush→lavender gradient world, a
serif display face (Fraunces), spring animations, a gradient progress ring,
confetti on completion, and synthesized UI sounds + haptics.

## Screens

| Screen | What it does |
| --- | --- |
| **Onboarding** | Three floating-blob intro slides → "Begin my journey" |
| **Challenge Select** | Browse 7 challenges (75 Soft / Medium / Hard, Glow Within, Better Me, Sugar Free, Mental Wellness) filtered by intensity, with a sticky start CTA |
| **Today** | Day counter + gradient progress ring, cycle-aware banner, the 5 daily promises checklist (confetti when all 5 are kept) |
| **Hydrate** | Animated water-glass fill, quick-add amounts, and a cycle phase selector that raises/lowers your water goal |
| **Friends** | Live friend progress bars + a social accountability feed with likes & cheers |
| **You** | Profile stats, Food inspo grid, Books wishlist, and **Settings → Button sounds toggle** |

Screenshots live in [`shots/`](shots/).

## Button sounds 🔊

Every interactive element plays a soft, pleasant tone. There are **no audio
files** — all sounds are synthesized at runtime with the Web Audio API
([`src/lib/sound.ts`](src/lib/sound.ts)): tuned oscillator blips with attack/decay
envelopes, plus filtered-noise bursts for the "water" splash. Distinct sounds for
`tap`, `click`, `pop`, `toggle`, `water`, `success` (a happy arpeggio), `chime`,
`whoosh`, and `error`.

- Wrapped into `SoundButton`, `Tappable`, and `IconButton` ([`src/components/ui.tsx`](src/components/ui.tsx)) so sound + haptic fire on tap automatically.
- Audio is unlocked on the first user gesture (iOS requirement) and can be muted from **You → Settings → Button sounds** (preference persists).
- Native devices also get light **haptic** feedback via the Capacitor Haptics plugin, with a web Vibration API fallback ([`src/lib/haptics.ts`](src/lib/haptics.ts)).

## Tech stack

- **React 18 + TypeScript + Vite** — fast, type-safe web app
- **Framer Motion** — spring transitions, progress ring, confetti, tab indicator
- **lucide-react** — icons
- **Capacitor 6** — packages the web build into native iOS/Android shells
- State is a small Context store persisted to `localStorage` ([`src/lib/store.tsx`](src/lib/store.tsx))

### A note on "Expo + Capacitor"

The goal asked for *Expo and Capacitor*. In practice those are two different
runtimes that don't combine — **Expo** builds React **Native** apps, while
**Capacitor** wraps a React **web** app in a native shell. Since this project needs
a pixel-crafted web UI with Web-Audio button sounds and a browser preview, it's
built as **React (Vite) + Capacitor**, which is the realistic, runnable equivalent
of that request. The same component code could be ported to Expo/React Native
later if true native rendering is required.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173 — open narrow (or use device toolbar) for the phone view
```

Open at a desktop width and you get a framed "phone" preview; open narrow / on a
phone and it goes full-bleed.

### Production build

```bash
npm run build      # type-checks + outputs to dist/
npm run preview
```

### Native packaging (Capacitor)

```bash
npm run build
npx cap add ios        # or: npx cap add android   (needs Xcode / Android SDK)
npm run cap:sync
npx cap open ios       # or android
```

`capacitor.config.ts` is preconfigured (app id `com.her75.app`, `dist/` web dir,
status-bar theming).

## Regenerate screenshots

```bash
npm run build && npx vite preview --port 4181 &
node scripts/shots.mjs        # writes to shots/
```
