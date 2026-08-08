# 01 — Header

Sticky top nav. `position: sticky; top: 0; z-index: 50`.

**Container:** full width, `backdrop-filter: blur(18px) saturate(180%)` (constant, include `-webkit-`). Background and bottom border animate on scroll — see below. Inner rail: max-width 1180px, centered, 24px horizontal padding, height **66px**, `display: flex; align-items: center; justify-content: space-between`.

## Left — logo
Link to `#top`. Flex row, `gap: 10px`, weight 800, 18px, tracking `-.02em`, white.
- Mark: 22×22px, `border-radius: 6px`, background `#4ADE80`. Plain square, no icon.
- Wordmark: `MIDIMONEY`.

## Center — nav
Flex row, `gap: 30px`, 14px, weight 500, color `#8A8A85` → `#FFFFFF` on hover.

`Features` → `#features` · `Pricing` → `#pricing` · `FAQ` → `#faq`

## Right — actions
Flex row, `gap: 16px`.
- `Log in` → `#top`. White, 14px, weight 600.
- `Start Free` → `#pricing`. Background `#4ADE80`, black text, weight 700, 14px, padding `9px 18px`, radius 9px. Hover: `translateY(-2px)` + `0 10px 26px rgba(74,222,128,.28)`, .25s ease.

## Scroll state
`scrollY > 12` toggles:

| | at top | scrolled |
|---|---|---|
| background | `rgba(0,0,0,.35)` | `rgba(0,0,0,.72)` |
| border-bottom | `1px solid rgba(255,255,255,0)` | `1px solid rgba(255,255,255,.10)` |

Both transition .3s ease. Passive scroll listener; evaluate once on mount so a page loaded mid-scroll is correct. Remove the listener on unmount.

The header does not participate in the reveal animation — it is present immediately.
