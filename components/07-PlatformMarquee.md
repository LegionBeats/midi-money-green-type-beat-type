# 07 — Platform marquee

Section `id="platforms"`. Full bleed, `overflow: hidden`, `position: relative`, `clamp(50px,8vh,90px)` vertical padding.

## Background glow
Absolutely positioned `inset: 0`, `pointer-events: none`:
`radial-gradient(620px 340px at 50% 14%, rgba(74,222,128,.11), transparent)`

## Header
Eyebrow **Connections**. H2 **Everywhere your / fans listen** — hard line break after "your", `line-height: .9` (tighter than other H2s because it is two lines). Block `margin-bottom: 52px`, 24px side padding.

## Rows
Wrapper: `display: flex; flex-direction: column; gap: 20px`, `position: relative`, with a symmetric edge fade:

```
mask-image: linear-gradient(to right,
  transparent 2%, rgba(0,0,0,.55) 30%, #000 47%,
  #000 53%, rgba(0,0,0,.55) 70%, transparent 98%)
```

Include `-webkit-mask-image` too.

Each row: `display: flex; width: max-content`, `will-change: transform`, `28s linear infinite`.
- **Row 1** — `scrollL`: `translateX(0) → translateX(-50%)`
- **Row 2** — `scrollR`: `translateX(-50%) → translateX(0)`

Opposing directions are the point of the dual-row treatment.

Each row contains its icon set **twice** (two identical halves for the seamless `-50%` loop), and each half repeats its 6-icon sequence **4×** so one half always exceeds viewport width.

## Icon card
72×72px, `border-radius: 16px`, background `#141414`, `border: 1px solid rgba(255,255,255,.08)`, flex-centered. Icon 34px, color `#9A9A94`. Cards spaced `gap: 40px`.

Hover: border → `rgba(74,222,128,.50)`, .4s ease. (The prototype also declares a color transition but no hover color — either drop it or add `color: #FFFFFF` on hover; ask the designer.)

## Icons (Iconify `simple-icons`)
Row 1: `youtube`, `spotify`, `soundcloud`, `applemusic`, `bandcamp`, `audiomack`
Row 2: `instagram`, `tiktok`, `x`, `discord`, `paypal`, `stripe`

The prototype loads the `iconify-icon` web component from CDN. In production, install the icon set locally.

## Footer block
Centered, `margin-top: 56px`, 24px side padding.

Copy, max-width 440px, 16px, `line-height: 1.6`, `#8A8A85`: **Your catalog stays yours. MIDIMONEY pushes every drop to the platforms your fans already live on — automatically.**

CTA, `margin-top: 30px` — pill link → `#pricing`: inline-flex, `gap: 10px`, padding `15px 30px`, `border-radius: 999px`, background `#4ADE80`, black, weight 800, 13px, uppercase, tracking `.08em`. Label **See all integrations**. Hover `translateY(-2px)` + `0 12px 32px rgba(74,222,128,.40)`.

## Reveal
Header 0ms, footer block 0ms. The rows themselves never reveal — always visible, always moving.
