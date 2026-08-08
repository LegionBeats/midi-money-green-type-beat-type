# 02 — Hero

Section `id="top"`. Max-width 1000px, centered, `text-align: center`. Padding: `clamp(28px,3.2vh,48px)` top, `clamp(24px,7vw,120px)` sides, `clamp(8px,1.5vh,16px)` bottom — tight at the bottom because the stats band follows immediately and must stay above the fold.

Elements in strict order. Do not reorder.

## 1. Pill
Inline-flex, `gap: 9px`, padding `7px 15px`, `border: 1px solid rgba(255,255,255,.12)`, `border-radius: 999px`, 12.5px, weight 600, tracking `.04em`, color `#B8B8B2`, `margin-bottom: 26px`.

Dot: 6×6px circle, `#4ADE80`, `animation: gpulse 4.6s ease-in-out infinite`.

Copy: **We turn producers into entrepreneurs**

## 2. H1 — rotating word
Archivo 900, uppercase, tracking `-.03em`, `line-height: 1.0`, `font-size: clamp(32px, 6.5vw, 78px)`, `text-wrap: balance`, `margin: 0`.

Two lines, one hard break after "sell":

```
Producers. want to sell
[rotating word]?
```

The word is a `<span>`: color `#4ADE80`, `display: inline-flex; align-items: center; justify-content: center`, **`min-width: 280px`**, `min-height: 1em`.

The "?" is a text node immediately following that span, so it renders on the same line as the word — there is exactly one `<br>` in the headline. Do not add a second break.

The 280px fixed width is load-bearing — it keeps "anything" and "promo" from re-breaking the headline. A side effect: because the span is a 280px inline-flex box with the word centered inside it, the "?" sits at a fixed distance from the word rather than tight against it. That gap is intended. Do not "fix" it by shrink-wrapping the span.

Words: `beats`, `packs`, `mixing`, `promo`, `anything`. Rotation starts 1400ms after load, 3200ms per word, .5s fade+rise in. Full timing in `motion-spec.md`.

Note the copy is verbatim, lowercase "want", period after "Producers." — intentional. Do not correct it.

## 3. Serif line
The only Instrument Serif in the design. Weight 400, `font-size: clamp(28px, 4.6vw, 56px)`, sentence case, tracking 0, `line-height: 1.2`, white, `text-wrap: balance`. Margin top `clamp(20px,2.8vh,40px)`.

Copy: **We'll show you how.**

## 4. Credential line
Archivo 600, uppercase, `font-size: clamp(15px, 2.4vw, 28px)`, `letter-spacing: .14em`, `line-height: 1.2`, color `#8A8A85`. Margin top `clamp(16px,2.2vh,32px)`.

Copy: **10+ year track record. Ask about us.**

## Reveal
Pill 0ms · H1 80ms · serif 120ms · credential 180ms. All `translateY(30px) → 0` + fade, .9s `cubic-bezier(.16,1,.3,1)`.
