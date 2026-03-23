# Design System Specification: The Ethereal Archive

## 1. Overview & Creative North Star
The Creative North Star for this design system is **"The Digital Curator."** 

This system moves beyond the rigid, utilitarian grids of standard SaaS applications. It is designed to feel like a high-end digital gallery—a space where content isn't just displayed, but "honored." We achieve this through a signature high-editorial aesthetic characterized by intentional asymmetry, generous "breathing room," and a rejection of traditional structural containment.

Instead of placing elements into a layout, we treat them as if they are **emerging** from a mist. The interface should feel quiet, sophisticated, and deeply intentional, using high-contrast typography scales and layered translucency to guide the eye rather than loud buttons or heavy borders.

---

## 2. Color & Atmospheric Depth
Our palette is a study in desaturation and warmth, designed to reduce eye strain and evoke a sense of calm "residency."

### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders for sectioning or containment. Traditional lines create a "trapped" feeling that contradicts the ethereal nature of the system. 
- **Boundaries** must be defined solely through background color shifts. Use `surface-container-low` (#f2f4f2) to distinguish a section from the primary `surface` (#f9f9f7).
- **Transitions** should feel tonal, not structural.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers—like stacked sheets of fine vellum.
- **Base:** `surface` (#f9f9f7).
- **Lowest Layer:** `surface-container-low` (#f2f4f2) for background sections.
- **Interactive Layer:** `surface-container-highest` (#dee4e0) for active states or prominent cards.
- **Nesting:** To define a card's importance, place a `surface-container-lowest` (#ffffff) card on a `surface-container-low` section. The subtle brightness shift provides all the "edge" required.

### The "Glass & Gradient" Rule
To add "soul" to the digital environment, use **Glassmorphism** for floating elements (modals, navigation bars).
- Apply a semi-transparent `surface` color with a `backdrop-blur` of 12px–20px.
- **Signature Textures:** For main CTAs or hero moments, use a subtle linear gradient from `primary` (#5f5e5e) to `primary-container` (#e4e2e1) at a 45-degree angle. This prevents the "flatness" of standard UI and adds a professional, tactile polish.

---

## 3. Typography: Editorial Authority
The typography system relies on the interplay between a clean, modern sans-serif and an evocative, historical serif.

- **The Sans-Serif (Inter):** Used for utility, navigation, and body. It must feel "airy." Increase tracking (letter-spacing) by 2-3% for labels and titles, and use a generous line-height (1.6 for body text).
- **The Serif (Noto Serif):** Reserved for "World-Building" moments—quotes, journal entries, or chapter headers. It provides the "history" and "soul" of the residency.

### Typographic Scale
- **Display LG (Noto Serif, 3.5rem):** For significant, emotional statements. Low-contrast, high-impact.
- **Headline MD (Noto Serif, 1.75rem):** For section titles that require a narrative feel.
- **Title MD (Inter, 1.125rem):** For functional headings. Use medium weight to contrast with the light body.
- **Body LG (Inter, 1rem):** Primary reading weight. Ensure `on-surface` (#2d3432) is used for maximum legibility against the off-white background.

---

## 4. Elevation & Depth: Tonal Layering
We do not use shadows to represent "height" in a traditional sense. We use them to represent "presence."

- **The Layering Principle:** Depth is achieved by stacking `surface-container` tiers. A `surface-container-highest` element feels closer to the user than a `surface-container-low` element.
- **Ambient Shadows:** When a floating effect is necessary (e.g., a dropdown), use an extra-diffused shadow: `box-shadow: 0 10px 40px rgba(45, 52, 50, 0.06)`. Note the tint: the shadow is a low-opacity version of `on-surface`, not pure black.
- **The Ghost Border Fallback:** If accessibility requires a border (e.g., in high-contrast needs), use `outline-variant` (#adb3b0) at **15% opacity**. Never use a 100% opaque border.

---

## 5. Components & Primitives

### Buttons
- **Primary:** `primary` (#5f5e5e) background with `on-primary` (#faf7f6) text. Roundedness: `md` (0.375rem). No shadow.
- **Secondary:** Transparent background with a `Ghost Border`.
- **Tertiary:** Text-only with `label-md` styling. On hover, apply a subtle `surface-container-high` (#e5e9e6) background "wash."

### Input Fields
- **Styling:** Forgo the "box." Use a `surface-container-low` background with a bottom-only `Ghost Border`.
- **States:** On focus, the bottom border transitions to `secondary` (#51616e).

### Cards & Lists
- **The "No-Divider" Mandate:** Forbid the use of horizontal lines to separate list items. 
- **Method:** Use `Spacing Scale 4` (1.4rem) between items. For cards, use background tonal shifts (`surface-container-low`) to group content.

### Residency Components (Custom)
- **The "Echo" Feedback:** When an action is successful, use a `Vitality Mint` (#A8C3B8) glow effect rather than a solid banner.
- **The "Emotional Nuance" Tag:** Use `tertiary-container` (#f2e3fa) for tags that denote moods or "melancholy" states, using `label-sm` typography.

---

## 6. Do’s and Don’ts

### Do
- **Do** use asymmetrical layouts. Align a headline to the left but push the body text to a central column to create a "curated" feel.
- **Do** use `Spacing Scale 16` (5.5rem) and `20` (7rem) to separate major sections. Empty space is a core feature, not a mistake.
- **Do** use `backdrop-blur` on all overlays to maintain the "ethereal" connection to the layer beneath.

### Don’t
- **Don’t** use 100% black typography. Always use `Digital Ink` (#2D2D2D) to keep the contrast soft.
- **Don’t** use sharp corners. Stick to the `md` (0.375rem) or `lg` (0.5rem) roundedness scale to keep the experience "soft."
- **Don’t** crowd the interface. If you feel like you need a divider line, you actually need more whitespace.