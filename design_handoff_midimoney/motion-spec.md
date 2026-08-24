# Motion spec

Motion is the signature of this page. If you implement everything else perfectly and skip this, the design has failed. Read this before writing any of it.

## The easing
One curve for everything narrative: `cubic-bezier(.16, 1, .3, 1)` — a hard decelerate. Interaction feedback (hover lifts, border color) uses plain `ease` at .25–.4s.

## 1. Reveal on entry
Every revealable element starts at `opacity: 0; transform: translateY(30px)` and transitions to `opacity: 1; transform: none` over **.9s** with the shared easing.

Trigger: IntersectionObserver, `threshold: 0.14`, `rootMargin: '0px 0px -6% 0px'`. Fires once, then unobserve. Never re-hide on scroll out.

Per-element stagger is a `transition-delay` set at reveal time, not a separate animation.

## 2. Hero load choreography
The core sequence. On load, everything rises **together** as one group, staggered by tens of milliseconds — the stat numbers ride up as literal zeros alongside the hero text. Then a pause. Then the numbers race.

| t (ms) | Element |
|---|---|
| 0 | Hero pill ("We turn producers into entrepreneurs") |
| 80 | H1 |
| 120 | Serif line ("We'll show you how.") |
| 180 | Credential line |
| 260 | Button row |
| 340 | Fine-print secret line |
| 460 | Stat 1 (showing `0`) |
| 580 | Stat 2 (showing `$0`) |
| 700 | Stat 3 (showing `0`) |
| **1400** | Word rotation begins |
| **1950** | Stat 1 number starts counting |
| 2140 | Stat 2 number starts counting |
| 2330 | Stat 3 number starts counting |
| 3050 | Stat 1 label + description fade in |
| 3240 | Stat 2 label + description fade in |
| 3430 | Stat 3 label + description fade in |

The ~1250ms gap between the last element rising (700) and the first number moving (1950) is deliberate. The page settles, holds, then the numbers go. Do not close that gap.

### Number count-up
- Duration **1600ms**, easing `1 - (1-t)³` (cubic ease-out), driven by `requestAnimationFrame` against `performance.now()`.
- Formatting: `prefix + Math.round(value).toLocaleString('en-US') + suffix`. So stat 2 counts `$0 → $340,000` with live thousands separators; stat 1 ends `10,000+`.
- Targets: `10000` (suffix `+`), `340000` (prefix `$`), `2`.
- Labels fade in at **count start + 1600 − 500 = +1100ms**, i.e. as the number is visibly decelerating into its final value, not after it stops. Label fade is opacity only, .7s, shared easing.

### Fold handling
Stats within `1.35 × viewport height` of the top run the on-load sequence above even if not strictly visible — short viewports still get the race without scrolling. Stats further down instead wait for a `threshold: 0.5` observer, then count with a 140ms delay and a 900ms label delay.

## 3. Rotating word
Words, in order: **beats → packs → mixing → promo → anything**, wrapping forever.

- Starts at **1400ms** — after the hero reveal, never during it.
- **3200ms** per word.
- Transition in: `opacity 0 → 1`, `translateY(12px) → 0`, **.5s**, shared easing, `forwards`.
- The word is styled in the accent color and sits **alone on line 2** of the H1, in a container with `min-width: 280px` and `min-height: 1em`, centered. The fixed width is essential: without it, "anything" and "promo" shift the whole headline's line breaks. Do not let the container shrink-wrap the word.
- The "?" follows on line 3.

## 4. Marquees
Three infinite CSS translate loops. Each track contains **two identical halves** and animates `translateX(0 → -50%)`, so the seam is invisible and there is no reset jump. The icon rows repeat their 6-icon set 4× per half so one half always exceeds the viewport width.

| Marquee | Direction | Duration |
|---|---|---|
| MIDIMONEY wordmark | left | `var(--mq-dur)`, default 34s |
| Platform row 1 | left | 28s |
| Platform row 2 | right (`-50% → 0`) | 28s |

All `linear infinite`, with `will-change: transform`.

Platform rows sit behind a symmetric edge fade — a `mask-image` linear gradient: `transparent 2% → rgba(0,0,0,.55) 30% → #000 47% → #000 53% → rgba(0,0,0,.55) 70% → transparent 98%`. Include the `-webkit-` prefix.

## 5. Ambient and interaction
- **Hero pill dot:** `gpulse` 4.6s ease-in-out infinite — box-shadow `0 0 4px rgba(74,222,128,.30)` / opacity .9 at rest, expanding to `0 0 11px 3px rgba(74,222,128,.70)` / opacity 1 at 50%.
- **Header on scroll** (`scrollY > 12`): background `rgba(0,0,0,.35) → rgba(0,0,0,.72)`, bottom border `transparent → rgba(255,255,255,.10)`, both .3s ease. Backdrop filter `blur(18px) saturate(180%)` is constant (include `-webkit-`).
- **Buttons:** `translateY(-2px)` + green glow, .25s ease.
- **Platform icon cards:** border → `rgba(74,222,128,.50)`, .4s ease.
- **Links:** `#8A8A85 → #FFFFFF`.

## 6. FAQ accordion
- Body: `max-height 0 → 260px` over .45s shared easing, `opacity 0 → 1` over .35s ease, `overflow: hidden`.
- The `+` sign rotates `0deg → 135deg` over .35s shared easing and shifts `#FFFFFF → accent` over .3s.
- Card border `rgba(255,255,255,.10) → rgba(74,222,128,.35)`, .3s ease.
- The fixed 260px max-height is a prototype shortcut. Measure real content height in production so long answers can't clip.

## 7. Reduced motion
A `reduceMotion` flag short-circuits everything: all reveal elements jump to their final state, stat labels to `opacity: 1`, numbers to their formatted final values instantly, marquee animation to `none`. The rotating word stops rotating.

Wire this to `prefers-reduced-motion: reduce` as well as the prop — the prototype only wires the prop.

**Debugging note:** if nothing on the page moves, check this flag before looking anywhere else.
