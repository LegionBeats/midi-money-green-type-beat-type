'use client';

import { useEffect, useRef, useState } from 'react';
import { useMotion } from '@/lib/motion';

/** motion-spec.md #2 — "Number count-up" and "Fold handling". */
const COUNT_DURATION = 1600;
const ON_LOAD_FIRST_COUNT = 1950;
const ON_LOAD_COUNT_STAGGER = 190;
/** Labels land as the number is still visibly decelerating, not after it stops. */
const LABEL_LEAD = 500;
const IN_VIEW_COUNT_DELAY = 140;
const IN_VIEW_LABEL_DELAY = 900;
/** Stats within 1.35 viewports of the top run the on-load race without a scroll. */
const NEAR_FOLD_VIEWPORTS = 1.35;

type CountUpOptions = {
  target: number;
  prefix?: string;
  suffix?: string;
  /** Position in the stat row; sets the on-load stagger. */
  index: number;
};

/**
 * Drives one hero stat: the number's count-up and the cue for its label block.
 *
 * Before counting starts the cell shows `prefix + "0"` with no suffix — that is
 * what the design renders at rest ("0", "$0"), and the suffix only appears once
 * the number is live.
 */
export function useCountUp({ target, prefix = '', suffix = '', index }: CountUpOptions) {
  const ref = useRef<HTMLDivElement>(null);
  const { reduceMotion } = useMotion();
  const [value, setValue] = useState(0);
  const [started, setStarted] = useState(false);
  const [labelShown, setLabelShown] = useState(false);

  useEffect(() => {
    // Under reduced motion the number and its label are already at their
    // final state below — there is nothing to schedule.
    if (reduceMotion) return;

    const element = ref.current;
    if (!element) return;

    const timers: number[] = [];
    let frame = 0;

    const run = (countDelay: number, labelDelay: number) => {
      timers.push(
        window.setTimeout(() => {
          setStarted(true);
          const startedAt = performance.now();
          const tick = (now: number) => {
            const t = Math.min(1, (now - startedAt) / COUNT_DURATION);
            // Cubic ease-out: 1 - (1-t)^3.
            setValue(target * (1 - Math.pow(1 - t, 3)));
            if (t < 1) frame = requestAnimationFrame(tick);
          };
          frame = requestAnimationFrame(tick);
        }, countDelay),
      );
      timers.push(window.setTimeout(() => setLabelShown(true), labelDelay));
    };

    const cleanup = () => {
      timers.forEach(clearTimeout);
      cancelAnimationFrame(frame);
    };

    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    const nearFold =
      element.getBoundingClientRect().top < viewportHeight * NEAR_FOLD_VIEWPORTS;

    if (nearFold) {
      const countDelay = ON_LOAD_FIRST_COUNT + index * ON_LOAD_COUNT_STAGGER;
      run(countDelay, countDelay + COUNT_DURATION - LABEL_LEAD);
      return cleanup;
    }

    if (!('IntersectionObserver' in window)) {
      run(IN_VIEW_COUNT_DELAY, IN_VIEW_LABEL_DELAY);
      return cleanup;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          observer.unobserve(entry.target);
          run(IN_VIEW_COUNT_DELAY, IN_VIEW_LABEL_DELAY);
        }
      },
      { threshold: 0.5 },
    );

    observer.observe(element);
    return () => {
      observer.disconnect();
      cleanup();
    };
  }, [reduceMotion, target, index]);

  const format = (n: number) => `${prefix}${Math.round(n).toLocaleString('en-US')}${suffix}`;

  const display = reduceMotion
    ? format(target)
    : started
      ? format(value)
      : `${prefix}0`;

  return { ref, display, labelShown: labelShown || reduceMotion };
}
