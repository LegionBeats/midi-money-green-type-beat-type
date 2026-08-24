'use client';

import { useEffect, useRef } from 'react';
import { FLUID_CONFIG, heroSplatColor } from '@/fluid-hero';
import styles from './FluidCursor.module.css';

/**
 * A cursor-reactive smoke trail, rendered on a transparent WebGL canvas that
 * layers behind whatever container it is mounted in.
 *
 * The simulation is Pavel Dobryakov's WebGL-Fluid-Simulation (MIT), vendored
 * and adapted in lib/fluid/engine.js. Config and splat color come from
 * fluid-hero.js, so every splat is the accent green rather than a random hue.
 *
 * The engine is loaded on demand: it never enters the initial bundle, and
 * under reduced motion it is never fetched at all.
 */
export function FluidCursor({
  reduceMotion = false,
  className,
}: {
  reduceMotion?: boolean;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (reduceMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    // Pointer events come from the parent, because the canvas itself is
    // pointer-events:none and would never be hit-tested.
    const pointerTarget = canvas.parentElement ?? canvas;

    let cancelled = false;
    let simulation: { destroy: () => void } | undefined;

    import('@/lib/fluid/engine')
      .then(({ createFluidSimulation }) => {
        if (cancelled) return;
        simulation = createFluidSimulation(canvas, {
          config: FLUID_CONFIG,
          splatColor: heroSplatColor,
          pointerTarget,
        });
      })
      .catch((error) => {
        // No WebGL, or the context was refused. The section is designed to
        // read correctly without the effect, so fail quietly.
        console.warn('Fluid cursor unavailable:', error);
      });

    return () => {
      cancelled = true;
      simulation?.destroy();
    };
  }, [reduceMotion]);

  return (
    <canvas
      ref={canvasRef}
      className={[styles.canvas, className].filter(Boolean).join(' ')}
      aria-hidden="true"
    />
  );
}
