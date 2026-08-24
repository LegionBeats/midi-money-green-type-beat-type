# 04 — Conversion stats

Section `id="features"`. Max-width 1040px, `clamp(50px,8vh,90px)` vertical / `clamp(24px,7vw,120px)` horizontal padding.

## Header block (centered)
**Eyebrow:** flex row centered, `gap: 10px`, `margin-bottom: 22px`. 6×6px `#4ADE80` dot (static, no pulse) + label 12px / weight 700 / tracking `.2em` / uppercase / `#4ADE80`. Text: **Conversion**

This eyebrow pattern repeats in sections 06, 07, 08, 09, 10 with only the label changing. Extract it as a shared `SectionEyebrow` component.

**H2:** Archivo 900, uppercase, tracking `-.025em`, `line-height: .98`, `clamp(30px,5vw,60px)`, max-width 760px, `text-wrap: balance`. Copy: **The best converting store on the internet.**

**Sub:** 17px, `line-height: 1.55`, `#8A8A85`, max-width 560px, `margin-top: 22px`. Copy: **Most producers lose sales because checkout is slow. Yours converts the moment an artist wants to buy.**

## Metric grid
`repeat(3,1fr)`, `gap: 20px`, `margin-top: 56px`. No card background or border — these are bare numbers.

Each: metric Archivo 900, `clamp(56px,7vw,92px)`, tracking `-.045em`, `line-height: .82`; caption 15px, `line-height: 1.5`, `#8A8A85`, max-width 240px, `margin-top: -8px` (deliberate overlap into the numeral's leading).

| Metric | Color | Caption |
|---|---|---|
| `+22.3%` | `#4ADE80` | checkout conversion with one-tap Apple&nbsp;Pay |
| `65%` | `#FFFFFF` | faster than typing out a full card number |
| `$0` | `#FFFFFF` | commission on every single sale you make |

Only the first metric is green. Keep the non-breaking space in "Apple Pay".

These numbers do **not** count up — they are static. Only the hero stats animate.

## Reveal
Header block 0ms; metrics 0 / 120 / 240ms.
