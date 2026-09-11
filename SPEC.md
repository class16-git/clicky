# SPEC.md — Clickety Desk

## 1. Product Name & Brand Identity

**Name:** Clickety Desk
**Tagline:** Big work for little hands
**Product Type:** Interactive pretend-computer experience for toddlers
**Originality:** Inspired by TinyFingers' instant cause-and-effect philosophy, but designed around workplace role-play rather than pure sensory toy. No copying of TinyFingers' branding, visuals, or exact interactions.

---

## 2. Product Thesis & Vision

Every tap should make the child feel: "I am working like Daddy."

A 2-year-old watches their parent type, click, and "work" on a computer. They are fascinated. Clickety Desk gives them a safe, joyful, miniature version of that world — where pressing keys, tapping screens, and smashing keyboards all produce satisfying, meaningful results.

Unlike TinyFingers (pure cause-and-effect toy), Clickety Desk wraps each interaction in **work-shaped continuity**: taps visibly finish a document, grow a chart, repair a server, or resolve a ticket. The child builds a personal narrative: "I opened the computer. I typed. I fixed the Wi-Fi. I finished my work."

---

## 3. Target User

**Primary:** 2–5 year olds, especially 2-year-olds
**Secondary:** Parents/caregivers (parent mode)
**Key constraints:**
- Zero reading ability
- Impulsive, unscripted interaction
- Giant touch targets needed
- Forgiving — no wrong answers
- No failure states
- No frustrating puzzles

---

## 4. MVP Scope — "The Workday"

One cohesive experience containing 4 mini-apps:

### Paper (Documents)
- Colorful virtual paper
- Tapping creates colorful letters/shapes
- Pressing Enter draws a line or creates a new shape
- Random keyboard typing fills the page with colorful bouncing letters
- Pressing Space creates a rainbow gap
- Child "writes" something, then can press Enter to "send" it

### Numbers (Spreadsheet)
- Colorful 4×4 grid
- Tapping a cell fills it with animated numbers
- Numbers grow/chart when tapped repeatedly
- Columns fill with bouncing number bubbles
- Arrow keys move a colorful cursor around
- Enter in a cell triggers confetti
- Keyboard smashing fills the whole grid with animated numbers

### Fix-It (IT Guy)
- A sad computer/server appears with a red indicator
- Keyboard typing (any keys) repairs it progressively
- Each keystroke makes a gear turn or a wire connect
- Random key smashes = dramatic repair animation
- When "fixed": celebration — confetti, stars, "✅ FIXED!" in big friendly text
- New broken item appears — loop continues

### Team Call (Meeting)
- A grid of friendly avatar circles
- Tapping a circle makes a reaction emoji pop up (😊 🎉 👍 ❤️)
- Random key press makes all avatars wave or dance
- Space bar toggles "mute/unmute" icon — satisfying visual
- Enter triggers "applause" animation
- Child "had a meeting"

### Desktop Bar (always visible)
- Icons for Paper, Numbers, Fix-It, Team Call
- Tapping switches worlds instantly
- Visual indicator of current world

---

## 5. Visual Language

- **Palette:** Warm, playful — bright but not harsh
  - Background: soft cream/off-white (#FFF8F0)
  - Primary accent: coral (#FF6B6B)
  - Secondary: teal (#4ECDC4)
  - Yellow: (#FFE66D)
  - Purple: (#A855F7)
  - Dark text: warm charcoal (#2D2D2D)
- **Typography:** Large, friendly, no reading required — but when used, use rounded friendly fonts (system-ui with fallback)
- **Icons:** Large (80-120px touch targets), simple SVG, bold colors
- **Aesthetic:** "A beautiful pretend computer designed for little humans" — premium, warm, modern, not babyish
- **Animations:** Bouncy, springy (CSS animations with cubic-bezier overshoot)
- **NO:** gradient-heavy busy backgrounds, tiny icons, clinical corporate look

---

## 6. Interaction Model

### Keyboard (desktop/tablet)
- **Any letter key:** Triggers current world's primary action + sound + animation
- **Punctuation:** Special effects (bounce, spin, pop)
- **Enter:** Major action — send, confirm, next
- **Space:** Secondary action — mute, gap, pause
- **Arrow keys:** Move cursor/selector
- **Backspace:** Undo last action / make something disappear
- **Keyboard smashing:** Always produces a delightful cascade — never an error

### Mouse/Touch
- **Tap/Click anywhere:** Trigger primary action for current element
- **Drag:** Move things (stickers, numbers, icons)
- **Double-tap:** Special action (bigger effect)
- **Hold:** Sustained animation (engine running, server thinking)

### Sound (Web Audio API — synthesized, no external files)
- **Key press:** Soft mechanical click
- **Special key (Enter/Space):** Satisfying "thunk" or "whoosh"
- **Success:** Gentle chime / celebration tone
- **Error:** Never happens — but if world fails to load: gentle "oops" sound
- **Ambient:** None — only event-driven sounds
- **Parent-controlled volume** in parent mode

---

## 7. Parent Mode

**Activation:** Triple-tap top-right corner (hidden)
**Controls:**
- 🔊 Sound on/off
- 🌙 Reduced motion on/off
- 🎨 World selector
- 🔄 Reset session
- 📺 Fullscreen
**Visual:** Small, non-intrusive icons in corner — invisible to toddler
**Exit:** Tap outside or triple-tap again

---

## 8. Technical Architecture

- **Single HTML file** (`index.html`) — no build step required
- **Vanilla JavaScript** — no frameworks, maximum compatibility
- **CSS animations** — hardware-accelerated, reduced-motion aware
- **SVG icons** — inline, scalable, no external dependencies
- **Web Audio API** — synthesized sounds, no audio files
- **LocalStorage** — optional session state (no personal data)
- **Offline-capable** — works without internet after first load
- **No backend** — zero data collection, zero accounts

### File Structure (MVP)
```
index.html          — Single file containing everything
```

### Extensibility (future worlds)
Each world is a self-contained JavaScript module object:
```javascript
const worlds = {
  paper: { init(), handleKey(e), handleTap(x,y), render() },
  numbers: { init(), handleKey(e), handleTap(x,y), render() },
  fixit: { init(), handleKey(e), handleTap(x,y), render() },
  teamcall: { init(), handleKey(e), handleTap(x,y), render() }
};
```

---

## 9. Performance Targets

- **First paint:** < 1 second
- **Interactive:** < 2 seconds
- **60fps animations** on mobile
- **No external requests** after load
- **Total size:** < 100KB (single file)

---

## 10. Accessibility & Reduced Motion

- `prefers-reduced-motion` media query: disable CSS animations, keep functional feedback
- Large touch targets (min 80px)
- Keyboard-only fully supported
- Screen-reader-friendly labels on interactive elements (aria-labels)
- High contrast mode compatible

---

## 11. Privacy & Safety

- **Zero data collection**
- **No accounts, no email, no login**
- **No camera, no microphone**
- **No network requests** (except Google Fonts optional)
- **No advertising**
- **No external tracking**
- Works fully offline
- No cookies required

---

## 12. Testing Strategy

- Manual browser testing: Chrome, Firefox, Safari (desktop + mobile)
- Touch simulation in DevTools
- Keyboard event testing
- Reduced-motion toggle testing
- Sound on/off testing
- Fullscreen mode testing
- Verify no console errors

---

## 13. Deployment

- **Static hosting** — any CDN or simple web server
- GitHub Pages compatible (single `index.html`)
- No server-side requirements

---

## 14. What NOT to Build (MVP)

- Login/account system
- Backend or database
- Audio files (use synthesized sounds only)
- Complex puzzles or games with win/lose states
- Video or live camera features
- Social features
- Progress tracking
- Multiple languages
- Save/export functionality
- Complex drag-and-drop
- Mini-games with rules
