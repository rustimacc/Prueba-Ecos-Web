# Design System Document: The Tactile Explorer

## 1. Overview & Creative North Star: "The Digital Hearth"
The Creative North Star for this design system is **The Digital Hearth**. In an era of sterile, flat interfaces, this system treats digital safety as a physical, cozy environment—a safe haven against the "cold" unpredictability of the open web.

We break the "educational template" look by blending the geometric, structural nature of low-poly art with a sophisticated, warm editorial layout. The interface avoids rigid grids in favor of **intentional asymmetry** and **organic layering**. By overlapping "notebook" style surfaces and using floating, low-poly elements that break the container bounds, we create an experience that feels like a curated physical scrapbook rather than a static screen.

---

## 2. Colors: Tonal Narrative
This system uses color not just for decoration, but as a primary gameplay feedback loop. The tension between **Safe (Warm)** and **Suspicious (Cold)** is the heartbeat of the UI.

### The Palette
- **Primary (Safe):** `#725a39` (Deep Oak) & `#d2b48c` (Warm Sand). These drive the sense of grounding and mentorship.
- **Tertiary (Suspicious):** `#8422dc` (Electric Violet). Used sparingly to signal digital "coldness" or external threats.
- **Surfaces:** Ranging from `surface-container-lowest` (`#ffffff`) to `surface-dim` (`#e2d8d1`).

### The "No-Line" Rule
**Explicit Instruction:** Prohibit 1px solid borders for sectioning. Structural boundaries must be defined solely through background color shifts. For example, a `surface-container-low` activity block should sit on a `surface` background without a stroke. This creates a softer, more inviting environment for children.

### Surface Hierarchy & Nesting
Treat the UI as stacked sheets of fine paper. 
- Use `surface-container-lowest` for the most interactive, "closest" elements (like an active chat bubble).
- Use `surface-container-high` for the background of the "notebook" overlay to give it a recessed, tactile feel.

### The "Glass & Gradient" Rule
To elevate the experience, floating low-poly icons should utilize **Glassmorphism**. Apply `surface-tint` at 20% opacity with a `20px` backdrop blur. For main Action Buttons, use a subtle linear gradient from `primary` to `primary_container` to provide a "pillowy" 3D depth that flat colors cannot achieve.

---

## 3. Typography: Editorial Clarity
We pair **Plus Jakarta Sans** for high-impact display moments with **Lexend** for reading. Lexend was specifically designed to reduce visual stress and improve reading performance, making it the perfect "Safe" typeface for kids.

- **Display (Plus Jakarta Sans):** Large, friendly, and slightly asymmetrical. Use `display-lg` for world-building headlines.
- **Body (Lexend):** Used for all instructional text. The generous x-height and character spacing ensure that internet safety concepts are legible even at smaller sizes.
- **The Tonal Shift:** Use `tertiary` color tokens for typography only when representing "The Cold/The Web." Safe, helpful instructions should always remain in `on-surface` or `primary`.

---

## 4. Elevation & Depth: Tonal Layering
Traditional drop shadows are too "software-like." We use **Ambient Depth**.

- **The Layering Principle:** Stack `surface-container` tiers to create lift. A card should be `surface-container-lowest` placed upon a `surface-container-low` background.
- **Ambient Shadows:** For floating "Notebook" overlays, use a shadow with a `40px` blur, `0%` spread, and `6%` opacity. The color must be a tinted version of `primary` (e.g., a dark warm brown) rather than black, to maintain the "Warm" aesthetic.
- **The "Ghost Border" Fallback:** If accessibility requires a border, use `outline-variant` at **15% opacity**. Never use 100% opaque lines.
- **Low-Poly Integration:** Low-poly decorative elements should "break the frame," partially overlapping containers to create a sense of three-dimensional space.

---

## 5. Components

### Buttons (The "Pebble" Style)
- **Primary:** Fully rounded (`shape-full`), using a warm gradient. High tactile feedback on press (slight scale down to 0.98).
- **Secondary:** `surface-container-highest` background with `primary` text. No border.
- **Tertiary:** Text-only with `label-md` styling, used for "Back" or "Cancel" to reduce visual weight.

### Floating Chat Bubbles
Designed as asymmetrical rounded rectangles. Use `xl` (3rem) corner radius for three corners and `sm` (0.5rem) for the "pointer" corner. Use Glassmorphism (semi-transparent `surface`) to make them feel lightweight.

### The 'Notebook' Overlay
The central UI container for lessons. 
- **Style:** Uses `surface-container-low`. 
- **Header:** A top-aligned `primary-container` strip that mimics a spiral or binder edge.
- **Depth:** Overlays the gameplay with a `backdrop-blur(10px)` to keep the focus on the safety lesson.

### Cards & Lists
**Forbid the use of divider lines.** Separate list items using `8px` of vertical white space and alternating between `surface-container-low` and `surface-container-lowest` backgrounds.

### Input Fields
Soft, pill-shaped (`shape-full`) containers. The "Active" state should not be a bright blue border, but rather a shift to a slightly warmer `primary-fixed-dim` background color.

---

## 6. Do's and Don'ts

### Do:
- **Do** use overlapping elements. A low-poly tree should "peek" over the edge of a notebook component.
- **Do** use color to teach. If a link looks "Cold" (Violets/Blues), it should feel visually distinct from the "Warm" (Beige/Brown) safe areas.
- **Do** maximize white space. Children (7-10) need clear focal points.

### Don't:
- **Don't** use pure black (#000000). Use `on-surface` (#1f1b17) for a softer, premium look.
- **Don't** use sharp 90-degree corners. Everything must feel "held" and safe.
- **Don't** use standard Material Design "elevation" shadows. Stick to Tonal Layering and the Ambient Shadow spec.
- **Don't** use 1px dividers. They create "visual noise" that distracts from the game’s core contrast mechanic.