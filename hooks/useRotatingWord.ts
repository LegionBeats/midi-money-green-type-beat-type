'use client';

import { useEffect, useState } from 'react';
import { useMotion } from '@/lib/motion';

/** motion-spec.md #3 — rotation begins after the hero reveal, never during it. */
const ROTATION_START = 1400;
const WORD_DURATION = 3200;

/**
 * Cycles the accent word in the hero headline.
 *
 * `cycle` starts at -1, which is the render before rotation begins: the first
 * word is simply present, un-animated, having ridden up with the H1. From
 * cycle 0 onward it doubles as an animation key, so re-keying the node replays
 * the .5s fade-and-rise without touching the DOM by hand.
 */
export function useRotatingWord(words: readonly string[]) {
  const { reduceMotion } = useMotion();
  const [index, setIndex] = useState(0);
  const [cycle, setCycle] = useState(-1);

  useEffect(() => {
    if (reduceMotion) return;

    let interval: number | undefined;

    const start = window.setTimeout(() => {
      setCycle(0);
      interval = window.setInterval(() => {
        setIndex((current) => (current + 1) % words.length);
        setCycle((current) => current + 1);
      }, WORD_DURATION);
    }, ROTATION_START);

    // Both timers are torn down here — the prototype dropped the rotation one.
    return () => {
      clearTimeout(start);
      if (interval !== undefined) clearInterval(interval);
    };
  }, [reduceMotion, words.length]);

  return { word: words[index], cycle };
}
