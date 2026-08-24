# 09 — Pricing

Section `id="pricing"`. Max-width 1040px, `clamp(50px,8vh,90px)` / `clamp(24px,7vw,110px)` padding.

## Header
Eyebrow **Pricing**. H2 **Simple pricing**. Sub, max-width 480px, 16px, `#8A8A85`, `margin-top: 20px`: **Start free. Upgrade when you're ready. Cancel anytime.** Block `margin-bottom: 52px`.

## Grid
`repeat(3,1fr)`, `gap: 20px`, `align-items: start`.

## Card structure (all tiers)
`border-radius: 20px`, `padding: 32px`.
1. Tier name — 13px, weight 800, tracking `.14em`, uppercase
2. Price — Archivo 900, 52px, tracking `-.03em`, `line-height: 1`, `margin: 16px 0 4px`; period suffix inline at 16px / weight 600 / `#8A8A85`
3. Tagline — 14px, `#8A8A85`, `margin: 6px 0 24px`
4. CTA — full-width block, centered, weight 700, `padding: 13px`, `border-radius: 11px`
5. Divider — 1px, `margin: 24px 0`
6. Feature list — `list-style: none`, flex column, `gap: 13px`; each item flex row `gap: 11px`, 14.5px, `#DADAD5`, with a `✓` in `#4ADE80` weight 800

CTA comes **above** the feature list. Not the usual order — keep it.

## Free
Transparent background, `border: 1px solid rgba(255,255,255,.10)`. Tier name `#8A8A85`. Price `$0` + `/forever`. Tagline **Start selling today.** CTA **Start Free** → `#top`, transparent, `border: 1px solid rgba(255,255,255,.16)` → `rgba(255,255,255,.40)` on hover, white. Divider `rgba(255,255,255,.08)`.

Features: Unlimited MP3 uploads · 1 connected channel · Beat store + storefront · 0% commission on sales

## Pro (highlighted)
Background `radial-gradient(130% 90% at 50% 0%, rgba(74,222,128,.16), rgba(74,222,128,.04) 55%, #000000 85%)`. `border: 1px solid var(--accent)`. Resting shadow `0 0 0 1px var(--accent), 0 24px 70px rgba(74,222,128,.20)`. `position: relative`.

Badge: absolute `top: -12px; left: 50%; transform: translateX(-50%)`, background `#4ADE80`, black, weight 800, 11px, tracking `.1em`, uppercase, padding `5px 13px`, `border-radius: 999px`, `white-space: nowrap`. Label **Most popular**.

Tier name `#4ADE80`. Price `$17` + `/mo`. Tagline **For producers serious about growth.** CTA **Start Free Trial** → `#top`, background `#4ADE80`, black, hover `translateY(-2px)` + `0 12px 30px rgba(74,222,128,.32)`. Divider `rgba(255,255,255,.1)`.

Features: MP3, WAV & stems uploads · 2 connected channels · Scheduled uploads · Basic CRM + contracts

The card is **not** scaled up or offset vertically — it wins on glow alone.

## Ultimate
Same chrome as Free. Tier name `#8A8A85`. Price `$37` + `/mo`. Tagline **No ceiling on growth.** CTA **Start Free Trial** → `#top`, outline style.

Features: Everything in Pro · Unlimited channels · Advanced CRM + analytics · Priority support

## Footnote
Centered, `margin-top: 32px`, 13px, `#5A5A55`: **All plans include 0% commission · 7-day free trial on paid plans · Cancel anytime** (middot separators).

## Reveal
Header 0ms; cards 0 / 120 / 240ms.

No monthly/annual toggle exists. Don't add one.
