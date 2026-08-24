# Design tokens

The prototype has no token layer — every value is a literal inline style. These are the values it actually uses, deduplicated. Define them as tokens in your codebase.

## Color

| Token | Value | Used for |
|---|---|---|
| `bg` | `#000000` | Page background, FAQ card background. True black. |
| `fg` | `#FFFFFF` | Headlines, primary text, logo. True white. |
| `accent` | `#4ADE80` | The only accent. CTAs, eyebrow labels, stat labels, logo mark, open-FAQ border, checkmarks. |
| `text-muted` | `#8A8A85` | Body copy, nav links, stat descriptions, secondary text. |
| `text-body` | `#DADAD5` | Testimonial quotes, pricing feature list items. |
| `text-faint` | `#5A5A55` | Fine print, footer column headings, footer legal line. |
| `text-badge` | `#B8B8B2` | Hero pill label only. |
| `icon-idle` | `#9A9A94` | Platform marquee icons. |
| `surface` | `#141414` | Testimonial cards, platform icon cards. |
| `surface-alt` | `#222222` | Testimonial avatar circle. |
| `wordmark` | `#232320` | Giant MIDIMONEY marquee text. Near-invisible by design. |
| `step-ghost` | `rgba(255,255,255,.06)` | Oversized step numerals 01 / 02. |
| `step-ghost-accent` | `rgba(74,222,128,.20)` | Step numeral 03 only. |

### Borders and hairlines
- `rgba(255,255,255,.05)` — wordmark marquee top/bottom rules
- `rgba(255,255,255,.06)` — footer legal divider
- `rgba(255,255,255,.08)` — stats band rules, card borders, footer top, pricing dividers
- `rgba(255,255,255,.10)` — pricing card borders, FAQ closed border, scrolled header border
- `rgba(255,255,255,.12)` — hero pill border
- `rgba(255,255,255,.16)` — secondary button border
- `rgba(255,255,255,.40)` — secondary button border on hover
- `rgba(74,222,128,.35)` — FAQ open border
- `rgba(74,222,128,.50)` — platform icon card border on hover

### Gradients (only three in the whole design)
- **Pro pricing card:** `radial-gradient(130% 90% at 50% 0%, rgba(74,222,128,.16), rgba(74,222,128,.04) 55%, #000000 85%)`
- **Platforms section glow:** `radial-gradient(620px 340px at 50% 14%, rgba(74,222,128,.11), transparent)`, absolutely positioned, `pointer-events: none`
- **Final CTA panel:** `linear-gradient(180deg, #161616, #101010)`

### Selection
`::selection` — background `#4ADE80`, color `#000000`.

## Typography

**Archivo** — everything. **Instrument Serif 400** — the hero's second line only.

Body defaults: `-webkit-font-smoothing: antialiased`, `text-rendering: optimizeLegibility`.

| Role | Family | Weight | Size | Tracking | Leading | Case |
|---|---|---|---|---|---|---|
| Hero H1 | Archivo | 900 | `clamp(32px, 6.5vw, 78px)` | `-.03em` | 1.0 | UPPER |
| Hero serif line | Instrument Serif | 400 | `clamp(28px, 4.6vw, 56px)` | 0 | 1.2 | Sentence |
| Credential line | Archivo | 600 | `clamp(15px, 2.4vw, 28px)` | `.14em` | 1.2 | UPPER |
| Section H2 | Archivo | 900 | `clamp(30px, 5vw, 60px)` | `-.025em` | .98 | UPPER |
| Final CTA H2 | Archivo | 900 | `clamp(34px, 6vw, 76px)` | `-.03em` | .95 | UPPER |
| Eyebrow label | Archivo | 700 | 12px | `.2em` | — | UPPER |
| Stat number | Archivo | 900 | `clamp(42px, 5.6vw, 80px)` | `-.04em` | .82 | — |
| Big metric | Archivo | 900 | `clamp(56px, 7vw, 92px)` | `-.045em` | .82 | — |
| Step numeral | Archivo | 900 | `clamp(96px, 12vw, 150px)` | `-.05em` | .72 | — |
| Marquee wordmark | Archivo | 900 | `clamp(46px, 7vw, 96px)` | `-.02em` | — | UPPER |
| Stat label | Archivo | 800 | 13px | `.16em` | — | UPPER |
| Card H3 | Archivo | 800 | 22px | `-.01em` | — | UPPER |
| Price | Archivo | 900 | 52px | `-.03em` | 1 | — |
| FAQ question | Archivo | 700 | 16.5px | — | — | Sentence |
| Body large | Archivo | 400 | 17px | — | 1.55 | — |
| Body | Archivo | 400 | 15–16px | — | 1.5–1.6 | — |
| Body small | Archivo | 400 | 14–14.5px | — | 1.5–1.55 | — |
| Fine print | Archivo | 400 | 13px | `.02em` | — | — |
| Button label | Archivo | 700 | 16px (14px in header) | — | — | — |

`text-wrap: balance` on: hero H1, hero serif line, conversion H2, final CTA H2.

## Spacing and layout

| Container | Max width | Horizontal padding |
|---|---|---|
| Header inner | 1180px | 24px |
| Hero | 1000px | `clamp(24px, 7vw, 120px)` |
| Standard section | 1040px | `clamp(24px, 7vw, 120px)` |
| FAQ | 820px | 24px |
| Footer inner | 1180px | 24px |
| Stats band, testimonials, platforms | full bleed | `clamp(24px, 5vw, 64px)` / 0 |

- Section vertical rhythm: `clamp(50px, 8vh, 90px)` top and bottom.
- Three-column grids: `repeat(3, 1fr)`, `gap: 20px` (stats band uses 44px).
- Header height: 66px.

## Radii
6px (logo mark) · 9px (header CTA) · 11px (buttons) · 14px (FAQ card) · 16px (platform icon card) · 18px (testimonial card) · 20px (pricing card) · 28px (final CTA panel) · 999px (pills)

## Shadows
Every shadow is a green glow on an accent surface. There are no neutral drop shadows.

- Primary button hover: `0 14px 36px rgba(74,222,128,.30)`
- Header CTA hover: `0 10px 26px rgba(74,222,128,.28)`
- Pill CTA hover: `0 12px 32px rgba(74,222,128,.40)`
- Pro card resting: `0 0 0 1px #4ADE80, 0 24px 70px rgba(74,222,128,.20)`

## Tweakable props
The prototype exposes three props. Preserve them as component props if useful:
- `accent` — color, default `#4ADE80` (alternates offered: `#A3E635`, `#22D3EE`, `#FFFFFF`). Applied as the `--accent` custom property on the root.
- `marqueeSpeed` — 15–60s, default 34s. Applied as `--mq-dur`. Drives the wordmark marquee only.
- `reduceMotion` — boolean, default false. See `motion-spec.md`.
