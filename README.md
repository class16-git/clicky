# 🖱️ Clickety Desk

**Big work for little hands.**

A beautiful pretend computer designed for toddlers (ages 2–5). No login, no reading, no onboarding — just open and play.

→ **Live:** [https://class16-git.github.io/clicky](https://class16-git.github.io/clicky)

---

## What is this?

A child opens the website and gets a fictional work computer. She can:

- 🖱️ **Click** anywhere
- ⌨️ **Type** anything — letters, numbers, random keys
- 🎹 **Smash the keyboard** — still gets something delightful
- 👆 **Tap** on mobile or tablet

Every interaction makes her feel: *"I am working like Daddy."*

---

## 🗂️ The Worlds

### 📝 Paper
Type on a colorful page. Letters bounce and float. Press **Enter** to "send" the paper — it folds into an airplane and flies away!

### 🔢 Numbers
A 4×4 colorful grid. Tap cells or type to fill them with growing numbers. Press **Enter** for confetti!

### 🔧 Fix-It
A sad computer needs help. Press any key to repair it — wires connect, gears turn, progress fills. Press **Enter** for a dramatic fix celebration!

### 📹 Team Call
A fake video meeting. Tap avatars for emoji reactions. Press **Space** to mute/unmute. Press **Enter** for applause!

---

## ⌨️ Keyboard Cheatsheet

| Key | Effect |
|-----|--------|
| Any letter | World-specific action + sound |
| Space | Secondary action (gap line / mute toggle) |
| Enter | Big action (send / confetti / fix / applause) |
| Backspace | Undo last action |
| Arrow keys | Move cursor around |
| Smash 5+ keys fast | ✨ Special intensified mode ✨ |

---

## 👨‍👩‍👧 For Parents

### Parent Mode
Triple-tap the **top-right corner** to open settings:
- 🔊 Sound on/off
- 🌙 Reduce motion
- 🎨 Switch worlds
- 🔄 Reset current world
- 📺 Fullscreen

### Safety
- ✅ No login or account
- ✅ No data collection
- ✅ No camera or microphone
- ✅ No advertising
- ✅ Works offline (after first load)
- ✅ No external tracking

---

## 🛠️ Technical

- **Single HTML file** — no build step, no dependencies
- **~44KB total** — fast on any connection
- **Web Audio API** — synthesized sounds, no audio files
- **Responsive** — desktop, tablet, mobile
- **Reduced motion** — respects `prefers-reduced-motion`
- **Offline-capable** — Service Worker ready

---

## 🚀 Run Locally

```bash
# Clone
git clone https://github.com/class16-git/clicky.git
cd clicky

# Open directly in browser
open index.html

# Or serve locally
python3 -m http.server 8080
# Then open http://localhost:8080
```

---

## 📦 Add a New World

See [PLAN.md](PLAN.md) → "Future Worlds" for the architecture. A new world is ~100 lines of JavaScript:

```javascript
const myWorld = {
  init() { /* setup DOM */ },
  handleKey(e) { /* respond to input */ },
  handleTap(x, y) { /* respond to touch/click */ },
  reset() { /* clear state */ },
  destroy() { /* cleanup */ }
};
worlds['myworld'] = myWorld;
```

---

## 🎯 Design Principles

1. **Every tap = immediate joy** — feedback in <50ms
2. **Every tap = work-shaped** — not random, feels purposeful
3. **No wrong answers** — keyboard smashing always works
4. **No reading** — icons and colors, not text
5. **No failure** — no error states, no dead ends

---

## 📄 License

MIT — built with love for little hands.
