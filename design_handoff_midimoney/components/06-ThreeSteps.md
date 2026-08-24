# 06 — Three steps

Section `id="how"`. Max-width 1040px, `clamp(50px,8vh,90px)` / `clamp(24px,7vw,120px)` padding.

## Header
Eyebrow **How it works** (shared pattern, see 04). H2 **Three steps** — Archivo 900, uppercase, tracking `-.025em`, `line-height: .98`, `clamp(30px,5vw,60px)`. Block `margin-bottom: 56px`.

## Grid
`repeat(3,1fr)`, `gap: 20px`. No card chrome.

Each step:
- **Ghost numeral** — Archivo 900, `clamp(96px,12vw,150px)`, tracking `-.05em`, `line-height: .72`
- **H3** — Archivo 800, uppercase, 22px, tracking `-.01em`, `margin: -32px 0 14px`. The negative top margin pulls the title up to overlap the numeral's lower half; `position: relative` keeps it above.
- **Body** — 15px, `line-height: 1.55`, `#8A8A85`

| Numeral | Color | Title | Body |
|---|---|---|---|
| `01` | `rgba(255,255,255,.06)` | Upload beat | Drop your audio file. We auto-detect BPM, key, and generate tags in seconds. |
| `02` | `rgba(255,255,255,.06)` | Publish | Your beat goes live as a video and a store listing. Checkout link placed automatically. |
| `03` | `rgba(74,222,128,.20)` | Get paid | Artists buy with Apple Pay, Google Pay, or PayPal. Money hits your account instantly. |

Step 03's numeral is green-tinted and brighter than the other two — it marks the payoff. Not a mistake.

## Reveal
Header 0ms; steps 0 / 120 / 240ms.
