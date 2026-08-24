import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import path from 'node:path';

/*
 * Assembles the single self-contained HTML file published as the preview
 * artifact. Everything is inlined — CSS, JS, and the same self-hosted woff2
 * subsets next/font produced for the real build — so the page has no network
 * dependency at all and its type matches the app exactly.
 */

// --- fonts ------------------------------------------------------------------
const cssDir = '.next/static/chunks';
const fontCssFile = readdirSync(cssDir)
  .filter((f) => f.endsWith('.css'))
  .map((f) => path.join(cssDir, f))
  .find((f) => readFileSync(f, 'utf8').includes('@font-face'));
if (!fontCssFile) throw new Error('no generated @font-face CSS found — run `npm run build` first');

const faces = readFileSync(fontCssFile, 'utf8').match(/@font-face\{[^}]*\}/g) ?? [];
let inlined = 0;
const fontCss = faces
  .map((rule) =>
    rule.replace(/url\(\.\.\/media\/([^)]+)\)/g, (_, file) => {
      const buf = readFileSync(path.join('.next/static/media', file));
      inlined++;
      return `url(data:font/woff2;base64,${buf.toString('base64')})`;
    }),
  )
  .join('\n');

// --- page -------------------------------------------------------------------
const css = readFileSync('preview/out/bundle.css', 'utf8');
// A literal </script> inside a bundled string would close the inline block.
const js = readFileSync('preview/out/bundle.js', 'utf8').replaceAll('</script>', '<\\/script>');

const html = `<title>MIDIMONEY</title>
<style>
${fontCss}
${css}
</style>
<div id="midimoney-root"></div>
<script>${js}</script>
`;

writeFileSync('preview/midimoney-preview.html', html);
console.log(`fonts inlined: ${inlined} woff2 across ${faces.length} @font-face rules`);
console.log(`midimoney-preview.html  ${(Buffer.byteLength(html) / 1024).toFixed(0)} KB`);
