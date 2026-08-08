# Handoff: MIDIMONEY Landing Page

## Overview
A single-page marketing site for MIDIMONEY — a beat-selling platform / education product for music producers. Dark, high-contrast, motion-forward. The page's job is to establish credibility (10+ year track record, tracked sales numbers, two named founders) and drive to a free signup.

The design is modeled on the motion choreography of typebeat.fun: content rises into place on load, stat numbers race up from zero after a deliberate pause, and a word in the headline rotates through five options.

## About the design files
The files in `design-reference/` are **design references created in HTML** — a prototype showing intended look and behavior. They are **not production code to copy directly.** They run on a proprietary component runtime (`support.js`, `<x-dc>`, `<sc-for>`, `renderVals()`) that does not exist outside the authoring environment, and every style is a literal inline style with no token layer.

Your task is to **recreate these designs in this codebase's existing environment** — React/Next, Vue, Svelte, whatever is established — using its existing component patterns, styling solution, and conventions. If the project has no frontend yet, choose the most appropriate framework and implement there.

Read the HTML for exact values. Read this documentation for intent, structure, and behavior.

## Fidelity
**High-fidelity.** Colors, typography, spacing, and motion timings are final and deliberate. Recreate them precisely. Where this documentation gives a number, that number is the spec.

Two things are intentionally locked and should not be "improved":
- **Palette.** True black, true white, one green accent, one muted gray. No second accent, no gradients beyond the two documented radial glows.
- **Type.** Archivo everywhere; Instrument Serif on exactly one line ("We'll show you how.").

## Component map
Each file in `components/` specifies one section, in page order. They are written to map 1:1 onto components in your codebase.

| # | Component | File | Screenshot |
|---|---|---|---|
| 1 | Sticky header / nav | `components/01-Header.md` | 01 |
| 2 | Hero (headline, rotating word, credential line) | `components/02-Hero.md` | 01 |
| 3 | Stats band + primary CTAs | `components/03-StatsBand.md` | 01 |
| 4 | Conversion stats section | `components/04-ConversionStats.md` | 02 |
| 5 | Wordmark marquee | `components/05-WordmarkMarquee.md` | 03 |
| 6 | Three steps | `components/06-ThreeSteps.md` | 03–04 |
| 7 | Platform icon marquee (dual row) | `components/07-PlatformMarquee.md` | 04–05 |
| 8 | Testimonials | `components/08-Testimonials.md` | 05–06 |
| 9 | Pricing (3 tiers) | `components/09-Pricing.md` | 06–07 |
| 10 | FAQ accordion | `components/10-FAQ.md` | 07 |
| 11 | Final CTA panel | `components/11-FinalCTA.md` | 08 |
| 12 | Footer | `components/12-Footer.md` | 08 |

Cross-cutting specs, read these first:
- `design-tokens.md` — every color, type, spacing, radius, and shadow value in the design.
- `motion-spec.md` — the full reveal choreography, timings, easings, and reduced-motion behavior. **The motion is a primary feature of this design, not decoration.** Budget real time for it.
- `CLAUDE_CODE_PROMPT.md` — a paste-ready prompt for starting the implementation.

## Page structure
Single scrolling page. All navigation is in-page anchor scrolling (`scroll-behavior: smooth`), no routes.

Anchor ids in use: `#top` (hero), `#features`, `#how`, `#platforms`, `#pricing`, `#faq`.

## State
The page holds almost no state. What exists:

| State | Type | Initial | Owner | Notes |
|---|---|---|---|---|
| `openFaq` | number | `0` | FAQ | Index of the open item; `-1` = all closed. Single-open accordion — opening one closes the other. First item open on load. |
| `wordIndex` | number | `0` | Hero | Index into the rotating word list. Advances every 3200ms, wraps. |
| `scrolled` | boolean | `false` | Header | `window.scrollY > 12`. Drives header background + border. |
| reveal flags | per-element | not revealed | all sections | One-shot; once revealed, never re-hidden. IntersectionObserver, unobserve on fire. |

No data fetching. No forms. No loading or error states. All copy and data is static and lives in the component files.

## Responsive
The prototype is fluid rather than breakpoint-driven: every type size and section padding is a `clamp()`, so it degrades continuously from ~1280px down. **It was designed and reviewed at desktop widths only.** Three three-column grids (conversion stats, three steps, testimonials, pricing) will need real mobile treatment that the prototype does not specify — recommend stacking to one column below ~760px, and the platform marquee rows keeping their 72px cards. Confirm mobile behavior with the designer rather than inferring it.

## Assets
No image or font files to transfer.
- **Fonts:** Archivo (400,500,600,700,800,900) and Instrument Serif (400, roman + italic), both from Google Fonts. Self-host or use your existing font pipeline; preserve the weights — 900 is load-bearing.
- **Icons:** platform logos come from Iconify's `simple-icons` set, loaded via the `iconify-icon` web component CDN. In production, install `@iconify-json/simple-icons` (or your icon library's equivalent) and render locally instead of hitting the CDN. Exact icon names are listed in `components/07-PlatformMarquee.md`. Note this is the one runtime network dependency in the design — a bundled or offline copy of the page still fetches these icons.
- The MIDIMONEY logo mark is a plain 22×22px green rounded square, not an asset.

## Prototype quirks not to replicate
- Reveals are driven by direct `style.setProperty(..., 'important')` mutation with retry loops and a 1200ms timeout fallback. That plumbing exists to work around the authoring runtime's streaming render. In a real framework, use CSS classes or a proper animation library.
- The rotating word element is found with `document.querySelector('[data-rotating-word]')` because a template ref did not work in the runtime. Use a normal ref.
- `componentWillUnmount` is defined twice in the logic class (the second shadows the first, dropping the word-timer cleanup). Clean up **both** the scroll listener and the rotation timer in your implementation.
- `support.js` is included only so the reference file opens in a browser. It is not part of the design.
