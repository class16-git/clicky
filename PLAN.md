# PLAN.md — Clickety Desk

## Overview

**Product:** Clickety Desk
**Tagline:** Big work for little hands
**Type:** Single HTML file, no build step, runs anywhere

---

## UX Thesis

**The core question:** How do we make this feel like role-playing Daddy's work rather than simply pressing buttons and watching animations?

**Answer:** Every interaction must have TWO qualities simultaneously:
1. **Instant joy** — immediate color, sound, motion feedback (like TinyFingers)
2. **Work continuity** — the action visibly advances something that feels like real work

A key press makes colors AND makes progress on a "document." Smashing the keyboard fills a spreadsheet AND creates a cascade of bouncing numbers. Pressing Enter resolves a ticket AND triggers celebration. The child is never rewarded by effects alone — every effect is work-shaped.

---

## MVP Worlds

### World 1: Paper
**What it looks like:** A warm cream-colored page with a blinking cursor. Big friendly paper.

**Interactions:**

| Input | Result |
|---|---|
| Any letter key | Colorful letter appears, bounces, floats up slightly, soft click sound |
| Number key | Larger number appears with a pop animation |
| Space | Rainbow gap line drawn across the page |
| Enter | Page "sends" — paper folds into airplane and flies off screen, new blank page slides in |
| Backspace | Last letter fades out with a gentle poof |
| Punctuation (!?.,) | Shape burst — sparkles explode from cursor |
| Arrow keys | Move the cursor around the page |
| Keyboard smash | Cascade of rainbow letters filling the page — a "letter storm" |

**Sound:** Soft mechanical key click on each press. Whoosh on Enter. Gentle chime when paper "sends."

**Visual details:**
- Letters are colorful (cycling through coral/teal/yellow/purple)
- Cursor is a friendly bouncing block
- Paper has subtle lined texture
- On "send": paper folds into airplane, flies to corner, new page slides in

---

### World 2: Numbers
**What it looks like:** A 4×4 grid of large cells in a colorful table.

**Interactions:**

| Input | Result |
|---|---|
| Any key (first press in cell) | Number appears in the cell (random 1–99), cell glows |
| Repeated key presses in same cell | Number grows larger, color shifts |
| Arrow keys | Move a colorful cursor around the grid |
| Enter | Confetti burst from current cell, number locks in with bounce |
| Backspace | Clear the current cell |
| Keyboard smash | All cells fill with animated bouncing numbers |

**Sound:** Soft tick on each number. Pop on Enter. Chime cascade on keyboard smash.

**Visual details:**
- Grid lines are thick and colorful (not gray)
- Cells have rounded corners
- Numbers animate: scale up then settle
- Cursor is a pulsing colored ring around the active cell
- On Enter: confetti particles burst from cell

---

### World 3: Fix-It
**What it looks like:** A cute computer/server illustration with a sad face and a red warning light.

**Interactions:**

| Input | Result |
|---|---|
| Any key press | Progress bar fills a bit, a wire connects, a gear turns |
| 5 key presses | Screen flickers, looks less sad |
| 10 key presses | Yellow "working" spinner appears |
| 15 key presses | Warning light turns yellow |
| 20 key presses | Warning light turns green, big smile appears |
| Enter (at any point) | Dramatic repair: all wires connect, gears spin, "✅ FIXED!" appears with confetti |
| Backspace | Undo last repair progress (go backwards) |
| Keyboard smash | Dramatic repair sequence auto-completes instantly |

**Sound:** Click-click-click of repair. Whirring on progress. Fanfare on "FIXED!"

**Visual details:**
- Computer has big cute eyes (sad → hopeful → happy)
- Warning light: red → yellow → green
- Wires visibly connect with each keypress
- Gears rotate
- Confetti explosion on fix
- New broken item slides in after celebration (cycle through: laptop, server, router, tablet)

---

### World 4: Team Call
**What it looks like:** A grid of 6 friendly colored circles (avatar placeholders) in a video-call layout.

**Interactions:**

| Input | Result |
|---|---|
| Tap/click any avatar | Emoji reaction pops up above that avatar (😊 🎉 👍 ❤️ 🔥) |
| Press 1-6 | Same as tapping that avatar |
| Random key | All avatars wave simultaneously |
| Space | Toggle mute icon on all avatars (🔇 ↔️ 🔊) |
| Enter | "Applause" animation — hands clapping appear at bottom |
| Backspace | Remove last emoji |
| Keyboard smash | All avatars dance, emoji cascade |

**Sound:** Soft pop on emoji. Whoosh on mute toggle. Gentle applause sound on Enter.

**Visual details:**
- Avatars are simple colored circles with subtle face shapes
- Emojis float up and fade
- Wave: avatar shapes rotate side to side
- Mute icon is large and satisfying
- Clapping hands are simple SVG animations

---

## Desktop Bar

**Always visible at bottom of screen**

- 4 large icons (Paper, Numbers, Fix-It, Team Call)
- Current world highlighted with a glow/border
- Tapping icon switches world instantly (crossfade animation)
- Visual feedback on tap (scale up briefly)

---

## Keyboard Smash Behavior (Global)

**Always active in every world:**

- Any rapid input (>5 keys within 500ms) triggers "smash mode"
- Smash mode: intensified version of the normal world effect
- Letters storm faster, numbers cascade wider, repair goes instant
- Sound: rapid-fire clicking with a building crescendo
- Visual: subtle screen shake, color saturation increases temporarily
- NO negative states — always joyful escalation

---

## Parent Mode

**Activation:** Triple-tap (3 rapid taps) in top-right corner of the screen

**Panel slides down:**

| Control | Function |
|---|---|
| 🔊 Sound | Toggle sound on/off |
| 🌙 Motion | Toggle reduced motion |
| 🎨 World | Select which world to show |
| 🔄 Reset | Reset current world to initial state |
| 📺 Fullscreen | Toggle fullscreen |

**Dismissal:** Tap outside panel, or triple-tap corner again

**Design:** Small, clean, semi-transparent — doesn't break the child's experience if seen

---

## Sound Design (Web Audio API — synthesized)

All sounds generated in-browser with Web Audio API — no audio files needed.

| Event | Sound |
|---|---|
| Key press (letter) | Soft sine wave click, 50ms, pitch varies slightly |
| Number key | Same as letter but slightly higher pitch |
| Space | Short white noise burst, 30ms |
| Enter | Frequency sweep down, 100ms (satisfying thunk) |
| Punctuation | Quick chime (two sine waves) |
| Smash mode | Rapid clicking with volume envelope |
| Celebration/Fixed | Ascending chime sequence (C-E-G) |
| Mute toggle | Whoosh (filtered noise sweep) |
| Paper send | Paper rustle + whoosh |

---

## Technical Implementation

### Single HTML File Structure

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
  <title>Clickety Desk</title>
  <style>/* All CSS inline */</style>
</head>
<body>
  <!-- World container -->
  <div id="world"></div>
  <!-- Desktop bar -->
  <nav id="desktop-bar"></nav>
  <!-- Parent mode panel -->
  <div id="parent-panel"></div>
  <script>/* All JS inline */</script>
</body>
</html>
```

### JavaScript Architecture

```javascript
// State
const state = {
  currentWorld: 'paper',
  soundEnabled: true,
  reducedMotion: false,
  worlds: {}
};

// Sound engine (Web Audio API)
const sound = {
  ctx: null,
  init() { /* create AudioContext on first user interaction */ },
  play(type) { /* synthesize and play sound */ }
};

// World interface
class World {
  constructor(container) { this.el = container; }
  init() {}
  handleKey(e) {}
  handleTap(x, y, target) {}
  reset() {}
  destroy() {}
}

// Each world registers itself
const worlds = {
  paper: new PaperWorld(),
  numbers: new NumbersWorld(),
  fixit: new FixItWorld(),
  teamcall: new TeamCallWorld()
};

// Switch worlds
function switchWorld(name) {
  worlds[state.currentWorld].destroy();
  state.currentWorld = name;
  worlds[name].init();
}

// Event routing
document.addEventListener('keydown', e => worlds[state.currentWorld].handleKey(e));
document.addEventListener('click', e => handleTap(e));
document.addEventListener('touchstart', e => handleTap(e));
```

### CSS Animation Principles

```css
/* Spring/bounce effect */
@keyframes pop {
  0% { transform: scale(0); }
  70% { transform: scale(1.2); }
  100% { transform: scale(1); }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Build & Deployment

- **No build step** — single `index.html`
- **Test locally:** Open `index.html` in any browser
- **Deploy:** Upload to GitHub Pages, Netlify, Vercel, or any static host
- **GitHub Pages:** Enable in repo settings, serve from `main` branch

---

## Future Worlds (Post-MVP)

1. **Warehouse** — packages on conveyor belt, barcode scanner, trucks
2. **Dashboard** — colorful charts that grow when keys are pressed
3. **Mail** — inbox with letters that open when tapped
4. **Calendar** — dates that fill with stickers when tapped

Each world is a self-contained module. Adding a new world = adding ~100 lines of JS.

---

## Success Criteria (MVP)

- [ ] Opens immediately with no reading required
- [ ] Every key press produces visible+audible feedback
- [ ] Keyboard smashing always produces delightful cascade
- [ ] All 4 worlds are accessible and functional
- [ ] Touch works on mobile/tablet
- [ ] Sound can be muted
- [ ] Reduced motion works
- [ ] Parent mode is accessible but hidden from toddler
- [ ] Single HTML file under 100KB
- [ ] Runs offline
- [ ] No external network requests
- [ ] No console errors
