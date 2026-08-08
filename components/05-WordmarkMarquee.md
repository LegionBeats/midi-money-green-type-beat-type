# 05 — Wordmark marquee

A full-bleed band of oversized MIDIMONEY wordmarks scrolling left. Pure texture — it carries no information and should be almost subliminal.

**Band:** `overflow: hidden`, padding `clamp(60px,10vh,120px)` vertical, margin `clamp(20px,4vh,50px)` vertical, hairlines `1px solid rgba(255,255,255,.05)` top and bottom.

**Track:** `display: flex; width: max-content`, `animation: mq var(--mq-dur) linear infinite`, `will-change: transform`. `--mq-dur` default **34s** (tunable 15–60s).

Keyframes: `translateX(0)` → `translateX(-50%)`.

**Contents:** two identical halves, second marked `aria-hidden="true"`. Each half is a flex row, `gap: 56px`, `padding-right: 56px`, containing three repetitions of:
- `MIDIMONEY` — Archivo 900, uppercase, tracking `-.02em`, `clamp(46px,7vw,96px)`, color `#232320`
- `✦` — `clamp(30px,4vw,52px)`, color `#232320`

The two-identical-halves + `-50%` construction is what makes the loop seamless. Keep it.

Color `#232320` against `#000000` is intentionally near-invisible. Do not raise the contrast.

No reveal animation; the band is always visible and always moving. Stops when `reduceMotion` is set.
