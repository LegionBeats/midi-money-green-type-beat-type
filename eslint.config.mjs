import coreWebVitals from 'eslint-config-next/core-web-vitals';
import typescript from 'eslint-config-next/typescript';

const config = [
  ...coreWebVitals,
  ...typescript,
  {
    ignores: [
      '.next/**',
      'node_modules/**',
      // Vendored upstream code — see scripts/vendor-fluid-engine.mjs.
      'lib/fluid/engine.js',
      // The handoff package, kept for reference.
      'design_handoff_midimoney/**',
    ],
  },
];

export default config;
