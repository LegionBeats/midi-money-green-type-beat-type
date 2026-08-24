# 03 — Stats band + primary CTAs

Full-bleed section directly under the hero. Padding `clamp(2px,0.8vh,8px)` top, `clamp(24px,5vw,72px)` sides, `clamp(40px,6vh,72px)` bottom.

**Requirement: the three stats must be above the fold at desktop.** That constraint drives the tight hero and band padding. Verify it at 1280×800 and 1440×900.

## Stat row
`display: grid; grid-template-columns: repeat(3,1fr); gap: 44px`. Rules `1px solid rgba(255,255,255,.08)` on top and bottom. Vertical padding `clamp(24px,4vh,44px)`. Bottom margin `clamp(28px,4.2vh,50px)`. Cells are `text-align: left` inside a centered page.

Each cell:
- **Number** — Archivo 900, `clamp(42px,5.6vw,80px)`, tracking `-.04em`, `line-height: .82`, white. Renders as `0` / `$0` before counting.
- **Copy block** (opacity 0 until its cue):
  - Label — 13px, weight 800, tracking `.16em`, uppercase, `#4ADE80`, `margin-top: 12px`
  - Description — 14.5px, `line-height: 1.5`, `#8A8A85`, `margin-top: 9px`, capped max-width

| Target | Label | Description | Max-width |
|---|---|---|---|
| `10,000+` | producers | taught to become entrepreneurs. | 260px |
| `$340,000` | beat sales | just what we can track — and doesn't include us. Just our students. | 270px |
| `2` | friends | Anno Domini and Legion Gabe did the impossible — well over $1M each selling beats. And taught a generation how we did it. | 300px |

Copy is verbatim, em dashes included.

## Button row
Below the stat row. `display: flex; gap: 14px; justify-content: center; flex-wrap: wrap`.

- **Start Selling Free** → `#pricing`. Background `#4ADE80`, black, weight 700, 16px, padding `16px 30px`, radius 11px. Hover `translateY(-2px)` + `0 14px 36px rgba(74,222,128,.30)`.
- **Learn more** → `#how`. Transparent, white, weight 600, 16px, padding `16px 28px`, radius 11px, `border: 1px solid rgba(255,255,255,.16)` → `rgba(255,255,255,.40)` on hover, also `translateY(-2px)`.

## Fine print
Centered, 13px, `#5A5A55`, tracking `.02em`, margin top `clamp(16px,2.4vh,28px)`.

Copy: **The secret? We teach universal direct response marketing techniques proven to work since before the internet.**

## Reveal / count cues
Stats rise at 460 / 580 / 700ms as zeros. Buttons 260ms, fine print 340ms — so the CTAs appear *before* the stats even though they sit below them in the DOM. That is intentional.

Counting starts at 1950 / 2140 / 2330ms, runs 1600ms; labels fade at +1100ms into each count. Full spec in `motion-spec.md`.
