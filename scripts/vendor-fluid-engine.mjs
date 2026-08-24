/**
 * Vendors Pavel Dobryakov's WebGL-Fluid-Simulation into lib/fluid/engine.js.
 *
 *   node scripts/vendor-fluid-engine.mjs path/to/script.js
 *
 * Source: https://github.com/PavelDoGreat/WebGL-Fluid-Simulation (MIT).
 *
 * The upstream file is a standalone page script: it grabs the first <canvas>
 * on the document, wires a dat.GUI panel, and starts an uncancellable rAF
 * loop. This script mechanically reshapes it into one importable factory —
 * `createFluidSimulation(canvas, options)` — that can be torn down, and that
 * takes its splat color from a caller-supplied function instead of a random
 * hue. Doing the edits here rather than by hand keeps them reviewable and
 * makes re-vendoring a newer upstream a re-run instead of a merge.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';

const source = readFileSync(process.argv[2] ?? 'script.js', 'utf8');

/** Removes `function NAME (...) { ... }` by matching braces from its header. */
function dropFunction(code, name) {
  const header = new RegExp(`\\nfunction ${name}\\s*\\(`);
  const match = header.exec(code);
  if (!match) throw new Error(`dropFunction: "${name}" not found`);

  let depth = 0;
  let end = -1;
  for (let i = code.indexOf('{', match.index); i < code.length; i++) {
    if (code[i] === '{') depth++;
    else if (code[i] === '}' && --depth === 0) {
      end = i;
      break;
    }
  }
  if (end === -1) throw new Error(`dropFunction: unbalanced braces in "${name}"`);

  return code.slice(0, match.index) + code.slice(end + 1);
}

/** Asserts the edit actually matched, so upstream drift fails loudly. */
function replaceOnce(code, find, replacement, label) {
  const parts = code.split(find);
  if (parts.length !== 2) {
    throw new Error(`replaceOnce: "${label}" matched ${parts.length - 1} times, expected 1`);
  }
  return parts[0] + replacement + parts[1];
}

// Everything from the first helper onward. The preceding lines are the demo
// page's promo popup, analytics, and its own canvas/config/GUI bootstrap —
// all of which the factory prologue replaces.
const bodyStart = source.indexOf('function getWebGLContext (canvas) {');
if (bodyStart === -1) throw new Error('could not find getWebGLContext');
let body = '\n' + source.slice(bodyStart);

// dat.GUI panel and the screenshot/download chain hanging off it.
for (const name of [
  'startGUI',
  'captureScreenshot',
  'framebufferToTexture',
  'normalizeTexture',
  'clamp01',
  'textureToCanvas',
  'downloadURI',
]) {
  body = dropFunction(body, name);
}

// Google Analytics beacon.
body = body.replace(/^\s*ga\('send'[^\n]*\n/gm, '');

// The demo opened with a burst of random splats and pushed more on spacebar.
// A cursor trail should start clean and only answer the pointer.
body = replaceOnce(
  body,
  '\nmultipleSplats(parseInt(Math.random() * 20) + 5);',
  '',
  'initial splat burst',
);

// The demo's own listeners assume the canvas is hit-testable and that touch
// drags belong to the simulation. Ours sits behind the hero at
// pointer-events:none, and must never swallow a scroll — the factory wires
// its own passive listeners on a target element instead.
body = replaceOnce(body, "\ncanvas.addEventListener('mousedown'", "\nconst __unusedMouseDown = (", 'mousedown');
body = body.slice(0, body.indexOf('\nconst __unusedMouseDown = ('))
  + body.slice(body.indexOf('function updatePointerDownData'));

// Start the loop from the factory, and let destroy() stop it.
body = replaceOnce(
  body,
  '\nupdate();\n\nfunction update () {',
  '\nfunction update () {',
  'update bootstrap',
);
body = replaceOnce(
  body,
  '    render(null);\n    requestAnimationFrame(update);',
  '    render(null);\n    if (running) animationFrame = requestAnimationFrame(update);',
  'rAF loop',
);

// TRANSPARENT is on so the sim composites over the black hero. Upstream draws
// its transparency checkerboard in that case, which would paint a grey grid
// across the section.
body = replaceOnce(
  body,
  '    if (target == null && config.TRANSPARENT)\n        drawCheckerboard(target);\n',
  '',
  'checkerboard',
);

// The dithering texture was fetched from the demo's own asset directory.
// Skip the request; the 1x1 white placeholder the function already builds is
// a fine no-op stand-in.
body = replaceOnce(
  body,
  "\nlet ditheringTexture = createTextureAsync('LDR_LLL1_0.png');",
  '\nlet ditheringTexture = createTextureAsync(options.ditheringTextureUrl);',
  'dithering texture',
);
body = replaceOnce(
  body,
  '    let image = new Image();',
  '    if (!url) return obj;\n\n    let image = new Image();',
  'dithering fetch guard',
);

// The one behavioural override the design calls for: every splat takes its
// color from the caller (heroSplatColor) rather than a random hue.
body = dropFunction(body, 'generateColor');
body = dropFunction(body, 'HSVtoRGB');

const DEFAULT_CONFIG = source
  .slice(source.indexOf('let config = {'), source.indexOf('}\n\nfunction pointerPrototype') + 1)
  .replace('let config = {', '{');

const prologue = `/* eslint-disable */
// @ts-nocheck
/*
 * WebGL fluid simulation — vendored and adapted.
 *
 * MIT License. Copyright (c) 2017 Pavel Dobryakov.
 * https://github.com/PavelDoGreat/WebGL-Fluid-Simulation
 *
 * GENERATED FILE — do not edit by hand.
 * Regenerate with: node scripts/vendor-fluid-engine.mjs <path-to-upstream-script.js>
 *
 * Adapted from the upstream page script into a single importable factory:
 *   - takes an explicit canvas and a pointer target instead of scraping the DOM
 *   - drops the dat.GUI panel, screenshot export, analytics, and promo popup
 *   - draws no transparency checkerboard, so it composites over the hero
 *   - never fetches the dithering texture
 *   - opens with no random splat burst; the pointer drives everything
 *   - takes its splat color from options.splatColor
 *   - returns destroy(), which stops the loop and releases the GL context
 */

const DEFAULT_CONFIG = ${DEFAULT_CONFIG};

/**
 * @param {HTMLCanvasElement} canvas
 * @param {{ config?: object, splatColor?: () => {r:number,g:number,b:number},
 *           pointerTarget?: HTMLElement, ditheringTextureUrl?: string }} [options]
 * @returns {{ destroy: () => void }}
 */
export function createFluidSimulation (canvas, options = {}) {
    const config = { ...DEFAULT_CONFIG, ...options.config };
    const splatColor = options.splatColor ?? (() => ({ r: 0.15, g: 0.15, b: 0.15 }));
    const pointerTarget = options.pointerTarget ?? canvas;

    let running = true;
    let animationFrame = 0;

    resizeCanvas();

    function pointerPrototype () {
        this.id = -1;
        this.texcoordX = 0;
        this.texcoordY = 0;
        this.prevTexcoordX = 0;
        this.prevTexcoordY = 0;
        this.deltaX = 0;
        this.deltaY = 0;
        this.down = false;
        this.moved = false;
        this.color = [30, 0, 300];
    }

    let pointers = [];
    let splatStack = [];
    pointers.push(new pointerPrototype());

    const { gl, ext } = getWebGLContext(canvas);

    if (isMobile()) {
        config.DYE_RESOLUTION = Math.min(config.DYE_RESOLUTION, 512);
    }
    if (!ext.supportLinearFiltering) {
        config.DYE_RESOLUTION = Math.min(config.DYE_RESOLUTION, 512);
        config.SHADING = false;
        config.BLOOM = false;
        config.SUNRAYS = false;
    }

    // Every splat uses the caller's color instead of a random hue.
    function generateColor () {
        return splatColor();
    }

    // The canvas is pointer-events:none, so coordinates arrive from the
    // target element and are mapped through the canvas's own box.
    function canvasPoint (clientX, clientY) {
        const rect = canvas.getBoundingClientRect();
        return {
            x: scaleByPixelRatio(clientX - rect.left),
            y: scaleByPixelRatio(clientY - rect.top),
        };
    }

    // A trail follows the bare cursor — no button required. The first move
    // only seeds the position, so the opening delta isn't a jump from 0,0.
    function onMouseMove (e) {
        const pointer = pointers[0];
        const { x, y } = canvasPoint(e.clientX, e.clientY);
        if (!pointer.down) {
            updatePointerDownData(pointer, -1, x, y);
            return;
        }
        updatePointerMoveData(pointer, x, y);
    }

    function onMouseLeave () {
        updatePointerUpData(pointers[0]);
    }

    function onTouchStart (e) {
        const touches = e.targetTouches;
        while (touches.length >= pointers.length) pointers.push(new pointerPrototype());
        for (let i = 0; i < touches.length; i++) {
            const { x, y } = canvasPoint(touches[i].clientX, touches[i].clientY);
            updatePointerDownData(pointers[i + 1], touches[i].identifier, x, y);
        }
    }

    // Deliberately passive and without preventDefault: the hero must stay
    // scrollable on touch.
    function onTouchMove (e) {
        const touches = e.targetTouches;
        for (let i = 0; i < touches.length; i++) {
            const pointer = pointers[i + 1];
            if (!pointer || !pointer.down) continue;
            const { x, y } = canvasPoint(touches[i].clientX, touches[i].clientY);
            updatePointerMoveData(pointer, x, y);
        }
    }

    function onTouchEnd (e) {
        const touches = e.changedTouches;
        for (let i = 0; i < touches.length; i++) {
            const pointer = pointers.find(p => p.id == touches[i].identifier);
            if (pointer != null) updatePointerUpData(pointer);
        }
    }

    pointerTarget.addEventListener('mousemove', onMouseMove, { passive: true });
    pointerTarget.addEventListener('mouseleave', onMouseLeave, { passive: true });
    pointerTarget.addEventListener('touchstart', onTouchStart, { passive: true });
    pointerTarget.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });

    function destroy () {
        if (!running) return;
        running = false;
        cancelAnimationFrame(animationFrame);
        pointerTarget.removeEventListener('mousemove', onMouseMove);
        pointerTarget.removeEventListener('mouseleave', onMouseLeave);
        pointerTarget.removeEventListener('touchstart', onTouchStart);
        pointerTarget.removeEventListener('touchmove', onTouchMove);
        window.removeEventListener('touchend', onTouchEnd);
        const lose = gl.getExtension('WEBGL_lose_context');
        if (lose) lose.loseContext();
    }
`;

// Indent the vendored body to sit inside the factory.
const indented = body
  .split('\n')
  .map((line) => (line.trim() === '' ? '' : '    ' + line))
  .join('\n');

const output = `${prologue}${indented}

    update();

    return { destroy };
}
`;

mkdirSync('lib/fluid', { recursive: true });
writeFileSync('lib/fluid/engine.js', output);
console.log(`wrote lib/fluid/engine.js (${output.split('\n').length} lines)`);
