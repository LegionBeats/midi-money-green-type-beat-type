# Design tokens — reuse reference

A one-page reference for reusing this design system in a future project. All
values live in `app/globals.css` as CSS custom properties on `:root`. Copy that
file plus the font setup in `app/layout.tsx` and you have the whole foundation.

## Color

```
--bg: #000000            page background
--fg: #ffffff            primary text
--accent: #4ade80        the one brand color (green)
--text-muted: #8a8a85
--text-body: #dadad5
--text-faint: #5a5a55
--text-badge: #b8b8b2
--icon-idle: #9a9a94
--surface: #141414       card/panel fill
--surface-alt: #222222
--wordmark: #232320
```

Everything is grayscale plus one accent. When adapting to a new brand, swap
`--accent` and re-derive the two `--line-accent-*` and `--shadow-*` values
below from it — the rest of the palette (grays) can usually stay as-is.

## Borders / hairlines

Opacity-scaled white, used instead of separate gray tokens:

```
--line-05 / -06 / -08 / -10 / -12 / -16 / -40   rgba(255,255,255, 0.05–0.4)
--line-accent-35 / -50                          rgba(accent, 0.35 / 0.5)
```

## Shadows

Every shadow in the design is a glow in the accent color — there is no neutral
drop shadow anywhere:

```
--shadow-primary:     0 14px 36px rgba(accent, 0.3)
--shadow-header-cta:  0 10px 26px rgba(accent, 0.28)
--shadow-pill-cta:    0 12px 32px rgba(accent, 0.4)
--shadow-pro-cta:     0 12px 30px rgba(accent, 0.32)
--shadow-pro-card:    0 0 0 1px var(--accent), 0 24px 70px rgba(accent, 0.2)
```

## Radii

```
--r-mark: 6px        --r-icon-card: 16px
--r-header-cta: 9px   --r-testimonial: 18px
--r-button: 11px      --r-pricing: 20px
--r-faq: 14px         --r-panel: 28px
--r-pill: 999px
```

Roughly: small UI chrome (6–11px) → cards (14–20px) → large panels (28px) →
pills (999px). Pick from this scale rather than inventing new radii.

## Type ramp

All headline/display sizes are `clamp(min, vw, max)` so they scale with
viewport width without breakpoints, then cap out at a fixed max around
1440px+:

```
--t-hero-h1:     clamp(32px, 6.5vw, 78px)
--t-hero-serif:  clamp(28px, 4.6vw, 56px)   the one serif accent line
--t-credential:  clamp(15px, 2.4vw, 28px)
--t-h2:          clamp(30px, 5vw, 60px)
--t-cta-h2:      clamp(34px, 6vw, 76px)
--t-stat:        clamp(42px, 5.6vw, 80px)
--t-metric:      clamp(56px, 7vw, 92px)
--t-step:        clamp(96px, 12vw, 150px)   numbered step display digits
--t-wordmark:    clamp(46px, 7vw, 96px)
```

**Formula:** `clamp(mobile-floor, N-vw, desktop-cap)`. The `vw` value is
chosen so the curve passes through both endpoints smoothly — no need to solve
it precisely, pick a vw value between 4–12 depending on how large the element
is, then tune the floor/cap by eye at 390px and 1440px.

**Proportional overlaps:** when a headline sits on a negative margin against
a numeral/stat (e.g. a caption overlapping a big number above it), don't use
a fixed px offset — it'll look wrong once the numeral scales down on mobile.
Scale the offset with the same ratio as the type token:

```css
margin-top: calc(var(--t-step) / 150 * -32px);
```

This holds together at every viewport because it resolves to exactly `-32px`
once `--t-step` hits its 150px cap, and shrinks proportionally below that.

## Layout

```
--header-h: 66px
--w-rail: 1180px       outermost content rail
--w-hero: 1000px
--w-section: 1040px
--w-faq: 820px
--pad-section-y: clamp(50px, 8vh, 90px)
--pad-section-x: clamp(24px, 7vw, 120px)
--bp-stack: 760px      breakpoint where 3-col grids collapse to 1 col
```

**Grid stacking pattern:** every 3-column section grid uses the same rule at
`760px`:

```css
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
@media (max-width: 760px) {
  .grid {
    grid-template-columns: 1fr;
    gap: 32px;
  }
}
```

This is currently copy-pasted per section (`ThreeSteps`, `ConversionStats`,
etc.) rather than a shared primitive. If a future project has more than a
couple of these, worth extracting into one shared grid component instead of
repeating the media query.

## Motion

```css
--ease: cubic-bezier(0.16, 1, 0.3, 1);  /* one curve for everything narrative — hard decelerate */
--reveal-dur: 0.9s;
--mq-dur: 34s;                          /* marquee scroll loop */
```

**Reveal pattern** (`components/Reveal.tsx`): a one-shot entry animation
using `IntersectionObserver` at `threshold: 0.14` with `rootMargin: '0px 0px
-6% 0px'`. Fires once, then unobserves. Per-element stagger via a `delay`
prop applied as `transition-delay`. Respects `prefers-reduced-motion` and a
`data-reduce-motion` root attribute — reduced-motion elements render
already-revealed rather than transitioning.

## Fonts

Self-hosted via `next/font/google` (no runtime request to Google):

```ts
const archivo = Archivo({ subsets: ['latin'], variable: '--font-archivo', display: 'swap' });
const instrumentSerif = Instrument_Serif({ subsets: ['latin'], weight: '400', style: ['normal','italic'], variable: '--font-instrument-serif', display: 'swap' });
```

Archivo (variable, 400–900) is the workhorse; weight 900 is load-bearing
across the page. Instrument Serif is used on exactly one line as an accent —
one serif moment, not a whole second typeface system.

## Reuse checklist for a new project

1. Copy `app/globals.css` token block (`:root { ... }`) and keyframes.
2. Copy the font setup from `app/layout.tsx`, swap fonts if needed.
3. Swap `--accent` and re-derive `--line-accent-*` / `--shadow-*` from it.
4. Reuse the `Reveal` component as-is for scroll-triggered entrances.
5. Reuse the type-ramp formula (`clamp(floor, Nvw, cap)`) for any new display
   text; use the proportional-overlap trick for anything overlapping a
   scaling numeral.
6. Reuse the `760px` grid-stacking pattern for any 3-column section.
