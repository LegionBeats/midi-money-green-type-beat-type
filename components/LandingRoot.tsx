'use client';

import type { CSSProperties, ReactNode } from 'react';
import { MotionContext, usePrefersReducedMotion } from '@/lib/motion';
import styles from './LandingRoot.module.css';

type LandingRootProps = {
  /**
   * The single accent. Applied as --accent on the root, so alternates
   * (#A3E635, #22D3EE, #FFFFFF) reach every accent surface at once.
   */
  accent?: string;
  /** Wordmark marquee duration in seconds, 15-60. Applied as --mq-dur. */
  marqueeSpeed?: number;
  /** Short-circuits the entire motion system. See motion-spec.md #7. */
  reduceMotion?: boolean;
  children: ReactNode;
};

/**
 * Page shell. Owns the three tweakable props the design exposes and publishes
 * the resolved motion preference to every section below it.
 *
 * Debugging note from the handoff: if nothing on the page moves, check
 * data-reduce-motion on this element before looking anywhere else.
 */
export function LandingRoot({
  accent = '#4ADE80',
  marqueeSpeed = 34,
  reduceMotion = false,
  children,
}: LandingRootProps) {
  const prefersReduce = usePrefersReducedMotion();
  const resolved = reduceMotion || prefersReduce;

  return (
    <MotionContext.Provider value={{ reduceMotion: resolved }}>
      <div
        className={styles.root}
        data-reduce-motion={resolved ? 'true' : undefined}
        style={
          {
            '--accent': accent,
            '--mq-dur': `${marqueeSpeed}s`,
          } as CSSProperties
        }
      >
        {children}
      </div>
    </MotionContext.Provider>
  );
}
