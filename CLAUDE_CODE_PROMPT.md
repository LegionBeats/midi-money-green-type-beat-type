# Starting prompt

Paste this into Claude Code from your repo root, after copying `design_handoff_midimoney/` in.

---

Implement the MIDIMONEY landing page from the handoff package in `design_handoff_midimoney/`.

Read in this order: `README.md`, `design-tokens.md`, `motion-spec.md`, then each file in `components/` in numbered order. The HTML in `design-reference/` is a design reference on a proprietary runtime — read it for exact values, do not copy it or try to run it. Screenshots of each section are in `screenshots/`.

Build it natively in this codebase using its existing framework, styling solution, and component conventions. Before you start, tell me which framework and styling approach you'll use and how you plan to split the twelve sections into components.

The design is high-fidelity: colors, type sizes, spacing, and motion timings in the docs are the spec. Two hard constraints — the palette (true black, true white, #4ADE80, #8A8A85) and the type (Archivo everywhere, Instrument Serif on exactly one line) are locked.

The motion choreography is a primary feature, not polish. Implement `motion-spec.md` fully, including the deliberate pause before the stat numbers count up and the 280px fixed-width container for the rotating word.

Mobile layout is unspecified — flag it and ask rather than guessing.

Fluid cursor effect: add a WebGL fluid cursor-trail behind the hero section only. Use Pavel Dobryakov's WebGL-Fluid-Simulation (MIT license) — either the webgl-fluid npm package or by vendoring its script.js from github.com/PavelDoGreat/WebGL-Fluid-Simulation. Wire it to a canvas that is the first child of the hero, absolutely positioned with inset 0, z-index 0, pointer-events none, transparent background, clipped by overflow hidden on the hero, and with the hero content layered above it at z-index 1. Import FLUID_CONFIG and heroSplatColor from fluid-hero.js (in the repo root) and use them for the simulation config and to override the splat color so every splat uses heroSplatColor() instead of a random color. Respect the reduceMotion prop — if reduceMotion is on, do not start the simulation. Keep the canvas plus init logic in one small self-contained component so the effect can be relocated to another section later by changing only its parent container.
