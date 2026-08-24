// Regenerates data/platformIcons.ts from @iconify-json/simple-icons.
// Run with: node scripts/generate-icons.mjs
//
// The prototype loaded the iconify-icon web component from a CDN. The handoff
// README asks for a local render instead, so we inline only the twelve marks
// the platform marquee actually uses rather than shipping the whole collection.
import { readFileSync, writeFileSync } from 'node:fs';

const collection = JSON.parse(
  readFileSync('node_modules/@iconify-json/simple-icons/icons.json', 'utf8'),
);

const ROW_1 = ['youtube', 'spotify', 'soundcloud', 'applemusic', 'bandcamp', 'audiomack'];
const ROW_2 = ['instagram', 'tiktok', 'x', 'discord', 'paypal', 'stripe'];

const LABELS = {
  youtube: 'YouTube', spotify: 'Spotify', soundcloud: 'SoundCloud',
  applemusic: 'Apple Music', bandcamp: 'Bandcamp', audiomack: 'Audiomack',
  instagram: 'Instagram', tiktok: 'TikTok', x: 'X',
  discord: 'Discord', paypal: 'PayPal', stripe: 'Stripe',
};

const entries = [...ROW_1, ...ROW_2].map((name) => {
  const icon = collection.icons[name];
  if (!icon) throw new Error(`simple-icons has no icon named "${name}"`);
  const width = icon.width ?? collection.width;
  const height = icon.height ?? collection.height;
  return `  ${name}: { label: ${JSON.stringify(LABELS[name])}, viewBox: '0 0 ${width} ${height}', body: ${JSON.stringify(icon.body)} },`;
}).join('\n');

writeFileSync('data/platformIcons.ts', `// Generated from @iconify-json/simple-icons (CC0-1.0) — see scripts/generate-icons.mjs.
// Only the twelve marks the platform marquee needs are inlined, so the page makes
// no runtime request for icons (the prototype hit the Iconify CDN; the handoff
// README asks for a local render instead).

export type PlatformIcon = { label: string; viewBox: string; body: string };

export const PLATFORM_ICONS: Record<string, PlatformIcon> = {
${entries}
};

/** Row 1 scrolls left, row 2 scrolls right — see design_handoff_midimoney/components/07-PlatformMarquee.md */
export const PLATFORM_ROW_1 = ${JSON.stringify(ROW_1)} as const;
export const PLATFORM_ROW_2 = ${JSON.stringify(ROW_2)} as const;
`);

console.log('wrote data/platformIcons.ts');
