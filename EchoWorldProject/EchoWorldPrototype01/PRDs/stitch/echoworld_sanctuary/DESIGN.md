# Design System Document: The Digital Residence

## 1. Overview & Creative North Star
The Creative North Star for this design system is **"The Curated Sanctuary."** 

Unlike traditional digital interfaces that prioritize speed and urgency, this system is built on the philosophy of a "Digital Residence"—a space that feels architectural, permanent, and calm. We reject the "template" look of modern SaaS by embracing intentional asymmetry, expansive whitespace, and a "High-End Editorial" layout. 

To achieve this, we avoid the rigid constraints of a standard 12-column grid in favor of layered compositions. Elements should feel like they are placed by hand on a physical desk, using overlapping surfaces and varying typographic scales to guide the eye through a narrative experience rather than a task-list.

---

## 2. Colors & Surface Philosophy
The palette is rooted in organic, earthy tones that evoke high-quality natural materials: linen, bronze, and stone.

### The "No-Line" Rule
**Explicit Instruction:** You are prohibited from using 1x solid borders to define sections. Layout boundaries must be created exclusively through:
- **Background Shifts:** Placing a `surface-container-low` component against a `surface` background.
- **Tonal Transitions:** Using the hierarchy of beige tones to imply edges.
- **Negative Space:** Using large gaps (Spacing 16 or 20) to denote new content blocks.

### Surface Hierarchy & Nesting
Treat the UI as a physical stack of fine paper. 
- **Base Layer:** `surface` (#fbf9f6) – The foundation.
- **Secondary Layer:** `surface-container-low` (#f5f3f0) – For large content regions.
- **Interactive Layer:** `surface-container-highest` (#e4e2df) – For active or elevated cards.
- **Signature Textures:** For primary CTAs or Hero backgrounds, use a subtle linear gradient from `primary` (#705731) to `primary-container` (#8b6f47) at a 135-degree angle. This adds a "metallic silk" depth that flat color cannot replicate.

### Glassmorphism & Depth
For floating overlays (modals or navigation bars), use a "Frosted Linen" effect:
- **Fill:** `surface_container_lowest` at 80% opacity.
- **Effect:** `backdrop-blur` of 20px. 
This allows the warmth of the background to bleed through, softening the interface and making it feel integrated into the environment.

---

## 3. Typography
The typography system relies on a high-contrast pairing between an authoritative Serif and a functional Sans-Serif.

- **Display & Headlines (Noto Serif):** These are the "voice" of the residence. Use `light` (300) weight with `wide tracking` (+5% to +10%) for a premium, editorial feel. These should never feel crowded; they require significant leading.
- **Body & Titles (Inter):** Used for utility and readability. Inter provides a clean, neutral counter-balance to the expressive serif.
- **Scale Usage:** 
    - Use `display-lg` for evocative, non-functional introductory text.
    - Use `label-sm` in `secondary` (#665d54) for metadata, ensuring it never competes with the primary narrative.

---

## 4. Elevation & Depth
We eschew traditional "material" shadows in favor of **Tonal Layering.**

### The Layering Principle
Depth is achieved by stacking surface tiers. A `surface-container-lowest` (#ffffff) card placed on a `surface-container` (#efeeeb) base creates a natural, soft lift. This is our primary method of elevation.

### Ambient Shadows
If a floating effect is required (e.g., a primary action button or a detached navigation element):
- **Blur:** 40px to 60px.
- **Opacity:** 4% to 8%.
- **Color:** Use a tinted shadow (`on-surface-variant` at low opacity) rather than pure black. This mimics natural ambient light reflecting off warm surfaces.

### The "Ghost Border" Fallback
If accessibility requirements demand a container boundary, use a **Ghost Border**:
- **Token:** `outline-variant` (#d1c4b7).
- **Opacity:** Maximum 20%. 
100% opaque, high-contrast borders are strictly forbidden as they "trap" the eye and break the organic flow.

---

## 5. Components

### Buttons
- **Primary:** High-fidelity Bronze Gold (`primary_container`). Large rounded corners (`lg`: 2rem). Text should be `on-primary-container`.
- **Secondary:** `surface-container-highest` background with `primary` text. No border.
- **Tertiary:** Text-only using `primary` color, with a subtle underline appearing only on hover.

### Cards & Lists
- **Rule:** Never use divider lines. 
- **Structure:** Separate list items using vertical whitespace (Spacing 4 or 6). 
- **Interaction:** On hover, a card should transition from its base color to `surface-container-highest` or apply a 10% opacity `surface-tint`.

### Input Fields
- **Style:** Minimalist. No bounding box; use a "Bottom-only" stroke using the `outline` token or a very soft `surface-container` fill.
- **Focus State:** The bottom stroke transitions to `primary` (#705731) with a 2px weight.

### Status Indicators (Digital Presence)
Avoid standard "LED" dots. Use soft, organic pills:
- **Home:** `tertiary` (#406251) background with `on-tertiary` text.
- **Out:** `primary` (#705731) background.
- **Travel:** `secondary` (#665d54) background.

---

## 6. Do's and Don'ts

### Do:
- **Embrace Asymmetry:** Offset your headers. Let images bleed off one side of the container while text remains centered.
- **Prioritize Whitespace:** If a layout feels "busy," increase the spacing scale by two increments. The goal is "breathing room."
- **Use "Editorial" Imagery:** Use photography with warm, natural lighting and soft focus to complement the UI.

### Don't:
- **Don't use pure black:** Use `Deep Charcoal` (#1A1714) for all "black" text to maintain the organic warmth.
- **Don't use 1px dividers:** They create "grid-lock" and make the residence feel like a spreadsheet.
- **Don't use "Gaming" animations:** No fast bounces or high-velocity slides. All transitions should be `ease-in-out` with durations between 300ms and 500ms to mimic natural movement.
- **Don't crowd the corners:** With a 2rem (`lg`) corner radius, ensure your internal padding is at least Spacing 6 (2rem) so content doesn't get clipped by the curve.