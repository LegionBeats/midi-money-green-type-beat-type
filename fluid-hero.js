// fluid-hero.js
// Cursor fluid trail for the MIDIMONEY hero.
// Based on Pavel Dobryakov's WebGL-Fluid-Simulation (MIT License).
// This file holds the CONFIG + color override only.
// The simulation engine itself should be added by Claude Code from
// https://github.com/PavelDoGreat/WebGL-Fluid-Simulation (script.js)
// or via the npm package `webgl-fluid`.

export const FLUID_CONFIG = {
  SIM_RESOLUTION: 128,
  DYE_RESOLUTION: 1024,
  DENSITY_DISSIPATION: 3.5,   // quick-fading, smoky trail
  VELOCITY_DISSIPATION: 2,
  PRESSURE: 0.8,
  PRESSURE_ITERATIONS: 20,
  CURL: 30,                   // swirl / roil
  SPLAT_RADIUS: 0.25,
  SPLAT_FORCE: 6000,
  SHADING: true,
  COLORFUL: false,            // single color, no rainbow cycling
  BACK_COLOR: { r: 0, g: 0, b: 0 },
  TRANSPARENT: true,          // layers over the black hero
  BLOOM: true,
  BLOOM_INTENSITY: 0.8,
  SUNRAYS: true,
};

// #4ADE80 -> normalized (74,222,128)/255, dimmed by 0.15 because BLOOM
// amplifies it. Replaces the library's random color generator.
export function heroSplatColor() {
  return { r: 0.0435, g: 0.13065, b: 0.0753 };
}
