# MIDIMONEY landing page

A single-page marketing site for MIDIMONEY, built from the design handoff in
[`design_handoff_midimoney/`](./design_handoff_midimoney/).

The handoff package is kept in the repo as the source of truth. Read
`design-tokens.md` and `motion-spec.md` there before changing anything visual —
the design is high-fidelity and the numbers in those files are the spec, not
suggestions.

## Stack

| | |
|---|---|
| Framework | Next.js 16 (App Router), React 19, TypeScript |
| Styling | CSS Modules over a custom-property token layer in `app/globals.css` |
| Fonts | Archivo + Instrument Serif, self-hosted via `next/font/google` |
| Icons | `simple-icons`, inlined at build time — no CDN, no runtime icon request |

CSS Modules rather than a utility framework: nearly every value in the design is
a literal `clamp()`, `rgba()` hairline, or one of three gradients, which maps
directly onto custom properties and reads the same as the spec it came from.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build
npm run lint
npm run typecheck
npm run preview    # single-file shareable build, see below
```

## Shareable preview

`npm run preview` (after a `npm run build`, which produces the font subsets it
inlines) bundles the page into one self-contained
`preview/midimoney-preview.html` — CSS, JS, and the same self-hosted Archivo and
Instrument Serif woff2 subsets, all inlined. It makes no network requests at
all, so it can be opened straight from disk or handed to anyone who needs to
look at the design without running the app.

It renders the same components, CSS, and motion hooks as the app. Two things
differ, both confined to the shell: it is a client-only React render rather than
SSR + hydration, and the fonts are inlined rather than served by `next/font`.

## Layout

```
app/
  globals.css      token layer, keyframes, reduced-motion short-circuit
  layout.tsx       fonts, metadata, no-JS reveal fallback
  page.tsx         the twelve sections, in order
components/        one component per section, plus shared primitives
hooks/             useReveal-adjacent motion hooks
lib/
  motion.tsx       reduced-motion context
  fluid/engine.js  vendored WebGL fluid simulation (generated)
data/              all page copy and the inlined platform icons
scripts/           regenerators for the two generated files
```

Sections map 1:1 onto the handoff's numbered component files. Shared pieces:
`SectionEyebrow` (used by six sections, as the handoff asks), `Reveal`, `Cta`,
`Logo`.

`LandingRoot` owns the three props the design exposes — `accent`,
`marqueeSpeed`, `reduceMotion` — and publishes them as `--accent`, `--mq-dur`,
and a motion context.

## Motion

Motion is the primary feature of this design. `motion-spec.md` is implemented
in full; the pieces worth knowing:

- **One reveal mechanism.** `Reveal` starts at `opacity: 0; translateY(30px)`
  and transitions over `.9s` on `cubic-bezier(.16, 1, .3, 1)`, fired by an
  IntersectionObserver at `threshold: 0.14`. Stagger is a `transition-delay`,
  not a second animation. It fires once and never re-hides.
- **The hero load choreography falls out of that same mechanism.** Those
  elements are already in view, so the observer's first callback lands on
  mount and the per-element delays (0/80/120/180/260/340/460/580/700ms)
  sequence the rise. The buttons at 260ms appear *before* the stats at 460ms
  even though they sit below them — that is intentional.
- **The pause is deliberate.** The last element rises at 700ms; the first stat
  number does not move until 1950ms. The page settles, holds, then the numbers
  race. Do not close that gap.
- **Counts** run 1600ms on a cubic ease-out, driven by `requestAnimationFrame`.
  Each label fades in at count start + 1100ms — while the number is still
  visibly decelerating, not after it stops. Stats more than 1.35 viewports down
  fall back to a `threshold: 0.5` observer instead.
- **The rotating word** starts at 1400ms and holds each word 3200ms. Its
  container has a `min-width: 280px` floor, which is load-bearing: without it
  "anything" and "promo" re-break the headline. The gap between the word and
  the "?" is a side effect of that and is intended.
- **Reduced motion** short-circuits everything, wired to both the
  `reduceMotion` prop and `prefers-reduced-motion: reduce`. If nothing on the
  page moves, check `data-reduce-motion` on the page root first.

## Fluid cursor

`components/FluidCursor.tsx` is a cursor-reactive smoke trail on a transparent
WebGL canvas, layered behind the hero. It is self-contained: the canvas is
`position: absolute; inset: 0; z-index: 0; pointer-events: none`, and it takes
its pointer target from its own parent — so moving the effect to another
section means changing only which container it sits in. That container needs
`position: relative`, `overflow: hidden`, and its content at `z-index: 1`.

Config and splat color come from `fluid-hero.js` at the repo root, unchanged.
Every splat uses `heroSplatColor()` rather than a random hue. Under reduced
motion the simulation never starts and the engine chunk is never fetched.

The simulation itself is **Pavel Dobryakov's
[WebGL-Fluid-Simulation](https://github.com/PavelDoGreat/WebGL-Fluid-Simulation)
(MIT)**, vendored into `lib/fluid/engine.js`.

## Generated files

Both are committed, and both have a regenerator so the edits stay reviewable
rather than living as hand-patches:

```bash
node scripts/generate-icons.mjs                        # data/platformIcons.ts
node scripts/vendor-fluid-engine.mjs <upstream/script.js>   # lib/fluid/engine.js
```

`vendor-fluid-engine.mjs` reshapes the upstream page script into one importable
factory: explicit canvas and pointer target, no dat.GUI or screenshot export,
no transparency checkerboard, no dithering-texture fetch, no opening splat
burst, a caller-supplied splat color, and a `destroy()` that stops the loop and
releases the GL context. Each edit asserts that it matched, so upstream drift
fails loudly instead of silently producing a broken engine.

## Open questions for the designer

1. **Mobile layout — needs signoff.** The handoff states the prototype was
   designed and reviewed at desktop widths only. Implemented per the README's
   own recommendation: the four three-column grids stack to one column below
   760px, the platform marquee keeps its 72px cards, the header nav is hidden,
   and the rotating word's 280px floor is released so the "?" sits tight. This
   is the least-invented option available, but it is still not a specified
   design.
2. **Syre's avatar initial is "Y", not "S".** Preserved verbatim from the
   handoff, which flags it as intentional. Confirm.
3. **Platform icon hover** now brightens the icon to `#FFFFFF` alongside the
   green border, resolving the prototype's declared-but-unused color
   transition.
4. **FAQ panel height** is measured from real content rather than the
   prototype's hard `260px`, as both the FAQ spec and `motion-spec.md` ask, so
   long answers cannot clip.
5. **Placeholder copy still to replace:** the footer legal links all point at
   `#top`, and the copyright line still reads "demo design system".
