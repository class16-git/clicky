# Homepage Audit — Codex

## Current State (factual)

**What exists on #home-screen:**

- Dark space background (`#0d1117 → #1a1f2e`) with CSS-animated twinkling stars via `radial-gradient` pseudo-elements
- Logo: 🖥️ emoji (56px, floating animation, teal glow)
- Title: "Clickety Desk" (32px, white, Google Sans)
- Subtitle: "Big work for little hands" (14px, 50% opacity white)
- Prompt: "Who is playing today?" (13px, 40% opacity — ironic for a 2yo who can't read)
- Two theme cards side by side (160px wide each):
  - **Chrome** — tiny mock browser UI (traffic lights + tab bar + address bar preview, 128×80px)
  - **Space** — dark mini-preview with star dots and a tiny space-logo label
- "Let's go!" button — teal (`#4ECDC4`), pill-shaped, 18px bold
- No live stats, no social proof, no feature callouts, no "For parents" section

**The app after theme selection:**
- Full Chrome browser frame (realistic macOS-style title bar, tabs for Docs/Sheets/Slides/etc., address bar)
- Inside the browser: content worlds (paper, sheets, terminal, meet)
- Space theme: dark full-screen canvas

---

## Problems Identified

### Value Proposition
- **"Big work for little hands"** is corporate-parent speak. A 2yo doesn't care. A parent might nod approvingly, but the child is bored before they start.
- **No one-line description** of what actually happens when you press a key. TinyFingers says it plainly: *"Press a key or tap the screen to make colorful letters, shapes and sounds."* Clickety Desk says nothing.

### CTA / Start Action
- **"Let's go!"** is timid. It's a suggestion, not a celebration. TinyFingers says "Start smashing" — active, playful, realistic about what toddlers do with keyboards.
- The CTA is **below the fold on most phone screens** because of the two theme cards stacked above it. A 2yo can't scroll.
- **No urgency or social proof** — no "X kids playing right now," no "X keys smashed today." These numbers make a parent feel good about opening yet another screen to their child.

### Theme Selection Confusion
- Asking a 2yo to **choose between "Chrome" and "Space"** is absurd. They don't know what Chrome is. They can't read either label.
- The theme cards are **designed for adults** (mini browser UI preview is meaningless to a toddler — it looks like a boring computer screenshot).
- The selection mechanic (click a card, it glows teal, then you click the button) requires parent mediation. That's friction, not delight.

### Personality
- The logo is an emoji. It works but it's not memorable or distinctive.
- The page has **zero floating decorative elements** (TinyFingers has stars, hearts, planets drifting around). It feels static and flat despite the CSS twinkle animation.
- No tagline. No tagline font variation. No personality voice.

### Missing Features (vs TinyFingers)
- No live counter ("X kids playing now")
- No total keys smashed counter
- No "6 playful worlds" equivalent callout
- No "Any key. Any touch." compatibility callout
- No "A moment together" emotional hook
- No "For parents" section / parent gate
- No social proof (TikTok views, real families)
- No sounds/visuals preview

### What IS Present But Poorly Executed
- **Theme cards**: Concept is right (let user pick context) but thumbnails are unreadable at that size and the labels are invisible to the actual user (the toddler).
- **The space background**: It's dark and nice but the stars are CSS radial gradients — no depth, no parallax, no shooting stars.
- **Logo float animation**: Cute but it floats in a void with no other motion to companion it. The whole page feels still.

---

## TinyFingers Reference Analysis

**What TinyFingers does brilliantly:**

1. **CTA that describes the action**: "Start smashing ✧" — funny, accurate, exciting. The sparkle icon adds magic.
2. **Live social proof**: Green pulsing dot + "382 kids smashing keyboards right now." This makes a parent think "other parents trust this, it's safe."
3. **Cumulative counter**: "606,261 keys smashed today." Quantifies fun. Makes the product feel alive.
4. **Three-feature strip**: "6 playful worlds / Any key. Any touch. / A moment together." — answers every parent objection in one line.
5. **Emotional tagline**: "LITTLE FINGERS. BIG DISCOVERIES." — alliterative, aspirational, works for both audiences.
6. **Clear value proposition line**: "Press a key or tap the screen to make colorful letters, shapes and sounds." — explains the entire product in one sentence.
7. **Floating decorations**: Stars, hearts, planets drift in the background. The space theme is cohesive — every element serves it.
8. **Social proof section**: "Seen on TikTok, Instagram & YouTube" + "58.6M views" — credibility for the parent.

**What to BORROW for Clickety Desk (Google Workspace themed):**

- The live counter mechanic (works for our use case too — "X kids typing right now")
- "Start smashing" energy → could be "Start typing!" or "Let's type!" or even keep "Let's go!" but make it BIGGER and more animated
- Three-feature strip adapted to Google Workspace context: "Docs. Sheets. Meet. Forms." / "Any key. Any touch." / "A moment together"
- Social proof framing (even if fictional, "X families typing today" builds trust)
- The floating space decorations (TinyFingers does it better — more varied, more colorful, more animated)

**What's DIFFERENT because we're Google Workspace themed:**

- Our aesthetic is "what Mummy/Daddy's computer looks like" — familiar, recognizable, exciting to kids who associate it with parent access
- We have a built-in product story: "play with the things grown-ups use every day"
- The browser chrome frame IS the product — it's not just a backdrop, it's the toy
- "Big work for little hands" is our tagline potential — it speaks to the child being empowered, doing "real" work

---

## What Should Change (ranked by impact)

### 1. **Add a live activity counter** (HIGHEST IMPACT)
Fake or real, it transforms the page from "static screen" to "living product." Even "42 kids typing right now" with a pulsing green dot changes the心理学. Parent thinks: this is active, this is safe, other people use it.

### 2. **Redesign the CTA button**
- Make it HUGE — TinyFingers' button dominates the screen
- Change text to something action-oriented: "Let's type!" or "Start typing!" with a keyboard icon
- Add a sparkle/star to the button text for magic
- Remove the two-step flow (card selection → button). Either auto-advance on card click, or make the button itself the primary selector.

### 3. **Add a one-line value proposition**
Below the title, add: *"Press a key to make colorful letters, shapes and sounds — just like Mummy and Daddy's computer!"*
This explains the product in the time a parent spends glancing at it.

### 4. **Add a features strip** (3 icons + short text)
Three columns: (1) 📄 "Docs. Sheets. Meet." (2) ⌨️ "Any key. Any touch." (3) 👨‍👩‍👧 "A moment together."

### 5. **Redesign or remove theme cards**
Either:
- Make them into BIG, illustrated, tappable world cards with images a 2yo recognizes (a spaceship, a browser window with color)
- OR remove them entirely and just have one big "Let's go!" that enters a "mixed" world

### 6. **Add floating space decorations**
Stars, planets, hearts — more variety and animation than the current static twinkling. Drifting CSS/SVG elements make the page feel alive.

### 7. **Fix tagline**
"BIG WORK FOR LITTLE HANDS" should be styled like TinyFingers' "LITTLE FINGERS. BIG DISCOVERIES." — all caps, tracked out, orange/peach accent color, prominent placement above the main title.

---

## Proposed New Homepage Concept

A dark-space background with floating colorful decorations, a massive bold tagline at the top, the logo, and a single enormous "Let's type! ⌨️" button dominating the center — with a live "X kids typing right now" counter and a small "For parents" link, so the page works for the child who points at the shiny button and the parent who wants reassurance in 3 seconds.

---

## 3 Reference Screens

### Screen 1: "Start Typing!" Hero (mobile-first)
Dark space background with slow-drifting stars and small planets. Top: small tagline "BIG WORK FOR LITTLE HANDS" in orange, all-caps, tracked out. Center: the 🖥️ logo (large, floating). Below: "Clickety Desk" in big white letters. Below that: the one-line description in grey. Dead center: one giant pill button — "Let's type! ⌨️" in coral/peach, full-width on mobile, with a sparkle icon. Below the button: a live counter with pulsing green dot — "38 kids typing right now." Bottom: three small feature icons with text. Top-right corner: small "For parents ›" in muted text.

### Screen 2: Theme Selection (post-click, if retained)
Two large cards appear with a slide-up transition. Each card fills 80% of the screen width. "🌐 Chrome" card: big colorful browser screenshot with letters A B C floating out of it, label "Just like Mummy's computer." "🚀 Space" card: dark cosmic scene with stars bursting, label "Blast off into space!" Tap one → satisfying whoosh transition into that world.

### Screen 3: Parent Gate / For Parents (small section)
A collapsible "For parents" section at the very bottom with a轻轻 pull-up. Contains: short description ("Clickety Desk turns your Google Workspace into a sensory keyboard playground for toddlers"), three features in a row, and a "No account needed. Free forever." note. This addresses the parent's trust questions without cluttering the child's experience.
