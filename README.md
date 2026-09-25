# 🖱️ Clickety Desk

**Big work for little hands.**

A pretend work computer for toddlers (ages 2–5). No login, no reading, no onboarding —
just open it and work.

→ **Live:** [https://class16-git.github.io/clicky](https://class16-git.github.io/clicky)

---

## What is this?

A child opens the page and gets her own work computer — the kind she sees a grown-up
using. She can:

- 🖱️ **Click** anything
- ⌨️ **Type** on a real keyboard
- 🎹 **Smash the keyboard** — it always produces work, never an error
- 👆 **Tap** on a phone or tablet

Every interaction should leave her feeling: *"I am working like a grown-up."*

---

## 🗂️ The Worlds

### 📄 Notes
A page she can type on. Bold, italic, colour and text size all work, and what she does
is remembered for the whole session. This is where she "writes her work".

### 💻 Terminal
The pretend IT console. Eight job cards (colour, cables, backup, deploy…) and the
keyboard both start real-looking jobs that show progress and then **finish with a ✅**.
Finished jobs stay on screen — the work accumulates. There is no way to fail.

### 📹 Call
A playful video call with four friendly colleagues (Momo, Kiki, Bubu and You). She can
mute, cover the camera, raise her hand, send a reaction, and **share her Notes page into
the call** so the others can see what she made. Reactions come from her first, then one
other person responds. (Names are invented - the product contains no real people.)

---

## ⌨️ How the keyboard works

| Input | What happens |
|---|---|
| **Any key, on the start screen** | Starts her work session immediately |
| **A burst of keys** (~300ms) | **One** response — a typed word in Notes, one job in Terminal, one reaction in Call. Not a machine-gun of effects. |
| **Any key, in any world** | Always produces something. Never "not found", never an error. |
| Arrow / Escape / modifier keys | A small pleasant response — never nothing |

The rule: **a keyboard smash produces exactly one piece of work.** That is what makes it
feel like doing something rather than watching something.

---

## 👨‍👩‍👧 For Parents

### Parent panel
Opened **only** by an adult gesture — hold two fingers for 2 seconds, one in each top
corner — or by pressing **Ctrl + Shift + P**. A single tap anywhere is never intercepted.

Inside:
- 🔊 Sound on/off and volume
- 🌙 Calm mode (reduced motion, calmer feedback)
- 📺 Fullscreen
- 🔄 Reset session (asks for confirmation)

Only parent settings are stored (in `localStorage`). No child activity is ever stored.

### Safety
- ✅ No login, no account, no profile
- ✅ No data collection, no analytics, no tracking
- ✅ No camera access and no microphone access — the call is pure pretend
- ✅ **No network requests at all** — everything is in the one file
- ✅ No advertising
- ✅ No real commands are ever executed — the terminal is fiction

---

## 🛠️ Technical

- **One HTML file** — no build step, no dependencies, no backend
- **~59 KB** — fast anywhere
- **Web Audio API** — all sounds synthesised, no audio files
- **State-driven** — one state object, one dispatch path, rows rendered from state
- **Responsive** — phone, tablet, desktop, landscape, short screens
- **Reduced motion** — honours `prefers-reduced-motion`, plus a parent calm mode

---

## 🚀 Run Locally

```bash
git clone https://github.com/class16-git/clicky.git
cd clicky
open index.html          # or: python3 -m http.server 8080
```

---

## 🎯 Design Principles

1. **Action → evidence.** A tap must leave something behind that a child can inspect later,
   not just a burst of particles.
2. **They act, they don't watch.** Nothing happens on a timer that the child did not cause.
3. **One response per action.** Rapid input is grouped; competing effects are not feedback.
4. **No wrong answers.** Smashing the keyboard is the most likely behaviour at 2 and it
   always produces work.
5. **No reading required.** Icons, shapes and colour carry the meaning.
6. **No failure.** No scores, no timers, no losing, no dead ends.

---

## 📝 Change Log

### 2026-09-25 — Interaction depth (major)
An enhancement, not a rebuild. The three worlds, chrome, themes and look were kept; what
changed is that actions now leave evidence and the child causes events.

- **Persistent work.** Docs formatting latches and stays; Terminal jobs accumulate as rows
  with progress → ✅; Call control states stay visibly set.
- **Productive keyboard model.** The old dead end (`command not found: <word>`) was
  removed. Rapid keys are grouped into one 300ms burst, one piece of work per burst, in
  every world — and any key starts the session from the start screen.
- **Causal Call.** The old random `setInterval` that highlighted a random tile as
  "speaking" was deleted. Reactions now originate from the child's own tile and receive
  one restrained family reply; Share shows her actual Notes page.
- **Interaction repair.** Dead controls fixed (`T+` now cycles text size; the theme pill
  now really switches theme); controls raised to ≥52px with real separation; responsive
  media queries added; one subtle idle cue instead of permanent motion.
- **Parent panel** added behind a toddler-proof gesture.
- **Subtraction.** Removed the external weather fetch (it fired a network request on every
  world switch), the invented "1,000+ little workers" badge, the `virus`/`boom` commands,
  and the per-tap confetti. Confetti now marks the first completed piece of work in a
  session, not every tap.
- **Renamed** the worlds off Google's product names: Docs → **Notes**, Meet → **Call**
  (Terminal unchanged), so the product has its own identity.
- **Fixed defects** found in independent review: an audio context created before any user
  gesture (so sounds could stay silent), a particle DOM leak where cleanup callbacks
  removed only the last node, invisible corner overlays that intercepted taps meant for
  the tabs, and formatting that collapsed the selection instead of applying to it.

---

## 📄 License

MIT — built with love for little hands.