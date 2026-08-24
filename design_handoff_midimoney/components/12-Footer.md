# 12 — Footer

`border-top: 1px solid rgba(255,255,255,.08)`. No background — page black throughout.

## Upper
Max-width 1180px, centered, padding `56px 24px 40px`. `display: grid; grid-template-columns: 1.6fr 1fr 1fr; gap: 32px`.

**Column 1 — brand.** Same logo lockup as the header (22×22px green rounded square + `MIDIMONEY`, weight 800, 18px, tracking `-.02em`, white, `gap: 10px`), linking to `#top`. Below, `margin-top: 16px`, max-width 300px, 14px, `line-height: 1.55`, `#8A8A85`: **The platform for producers to upload, monetize, and grow their music careers.**

**Columns 2–3 — link lists.** Heading: 12px, weight 700, tracking `.14em`, uppercase, `#5A5A55`, `margin-bottom: 16px`. Links: flex column, `gap: 11px`, 14px, `#8A8A85` → `#FFFFFF` on hover.

- **Links** — Features (`#features`), Pricing (`#pricing`), FAQ (`#faq`), Sign up (`#top`)
- **Legal** — Terms of Service, Privacy Policy, Refund Policy (all `#top` placeholders; wire to real routes)

## Lower
Max-width 1180px, padding `20px 24px 40px`, `border-top: 1px solid rgba(255,255,255,.06)`, 13px, `#5A5A55`, left-aligned.

Copy: **© 2026 MIDIMONEY — demo design system. All rights reserved.**

Replace "demo design system" with real production copy.

## Reveal
None. The footer has no reveal animation.
