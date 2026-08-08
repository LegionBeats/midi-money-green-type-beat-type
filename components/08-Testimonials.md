# 08 — Testimonials

Full-bleed section, `clamp(50px,8vh,90px)` vertical / `clamp(24px,5vw,64px)` horizontal padding.

## Header
Eyebrow **Testimonials**. H2 **Producers talk**. Block `margin-bottom: 52px`.

## Grid
`repeat(3,1fr)`, `gap: 20px`.

## Card
Background `#141414`, `border: 1px solid rgba(255,255,255,.08)`, `border-radius: 18px`, `padding: 30px`, `display: flex; flex-direction: column; gap: 22px`. No hover state.

- **Quote** — 16px, `line-height: 1.55`, `#DADAD5`. Wrapped in typographic curly quotes (`“ ”`) as literal characters in the copy.
- **Attribution** — flex row, `gap: 12px`, `margin-top: auto` so it pins to the card bottom regardless of quote length.
  - Avatar: 40×40px circle, background `#222`, flex-centered, weight 800, `#4ADE80`, single initial. No photos.
  - Name: weight 700, 14px, white. Role: 12.5px, `#8A8A85`.

| Quote | Name | Role | Initial |
|---|---|---|---|
| “I never thought I’d be this satisfied with a platform. It saves me so much time I can just make music.” | SickoBeats | Producer | S |
| “Exactly what I’ve been looking for. Auto-detection for BPM, key, and the AI features are unreal.” | Syre | Producer | Y |
| “Visually intuitive and incredibly efficient. Connecting multiple channels streamlined my whole workflow.” | Drobbeat | Producer | D |

Note Syre's initial is **Y**, not S. Preserve it — flag to the designer if it looks wrong.

Copy is verbatim.

## Reveal
Header 0ms; cards 0 / 120 / 240ms (the delay travels with each item's data).
