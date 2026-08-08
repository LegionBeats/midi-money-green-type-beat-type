# 10 — FAQ

Section `id="faq"`. Max-width **820px** (narrower than other sections), `clamp(50px,8vh,90px)` vertical / 24px horizontal padding.

## Header
Eyebrow **FAQ**. H2 **Questions**. Block `margin-bottom: 48px`.

## List
Flex column, `gap: 12px`. Single-open accordion: `openFaq` holds the open index, `-1` = none. Clicking the open item closes it. **Item 0 is open on load.**

## Card
Background `#000000` (same as page — the border does the work), `border-radius: 14px`, `overflow: hidden`, border `1px solid rgba(255,255,255,.10)` closed → `1px solid rgba(74,222,128,.35)` open, .3s ease.

**Trigger** — a real `<button>`: full width, transparent, no border, white, left-aligned, `padding: 20px 24px`, flex row `justify-content: space-between`, `gap: 16px`, `cursor: pointer`, `font-family: inherit`.
- Question: weight 700, 16.5px
- Sign: literal `+`, weight 400, 30px, `line-height: 1`, `flex: none`; `#FFFFFF` → `var(--accent)` open (.3s ease); `rotate(0deg)` → `rotate(135deg)` open (.35s `cubic-bezier(.16,1,.3,1)`)

135°, not 45° — the plus overshoots past the × and settles. Intentional.

**Body** — `overflow: hidden`; `max-height 0 → 260px` (.45s shared easing) and `opacity 0 → 1` (.35s ease). Answer: `padding: 0 24px 22px`, 15px, `line-height: 1.6`, `#8A8A85`.

Replace the hard 260px with a measured content height in production so long answers can't clip.

## Accessibility
The prototype ships a bare button. Add `aria-expanded`, `aria-controls`, and an id on the panel.

## Content (verbatim)
1. **Do you take commission on my sales?** — No. We charge 0% commission — you keep every dollar. The only fee is your processor's standard rate (2.9% + $0.30), which applies on any platform. We make money from optional subscriptions, not your revenue.
2. **Do I need a connected channel?** — A channel unlocks auto-publishing, but you can run a standalone beat store without one. You can connect or disconnect channels anytime from your dashboard.
3. **Can I schedule uploads?** — Yes — on Pro and Ultimate you can queue and schedule uploads in advance so your catalog goes live on a steady cadence without manual work.
4. **What payment methods do you support?** — Apple Pay, Google Pay, PayPal, and every major card, plus regional methods like iDEAL, SEPA, and more — whatever converts best for your buyer.
5. **Can I cancel anytime?** — Absolutely. Plans are month-to-month with no lock-in. Cancel from your billing page and you keep access through the end of your current period.
6. **Is switching from another platform worth it?** — Most producers migrate their catalog in an afternoon and start converting better the same week thanks to faster checkout and 0% commission.

## Reveal
Header 0ms; the whole list reveals as one block (not staggered per item).
