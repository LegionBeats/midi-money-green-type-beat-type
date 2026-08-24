'use client';

import { createContext, useContext, useSyncExternalStore } from 'react';

type MotionContextValue = {
  /** True when the `reduceMotion` prop is set OR the OS asks for reduced motion. */
  reduceMotion: boolean;
};

export const MotionContext = createContext<MotionContextValue>({ reduceMotion: false });

export function useMotion() {
  return useContext(MotionContext);
}

const REDUCE_QUERY = '(prefers-reduced-motion: reduce)';

function subscribe(onChange: () => void) {
  const query = window.matchMedia(REDUCE_QUERY);
  query.addEventListener('change', onChange);
  return () => query.removeEventListener('change', onChange);
}

const getSnapshot = () => window.matchMedia(REDUCE_QUERY).matches;

/** The server can't know the preference; motion starts on and is stood down. */
const getServerSnapshot = () => false;

/**
 * Tracks `prefers-reduced-motion: reduce`.
 *
 * The prototype wires reduced motion to a prop only; motion-spec.md asks for
 * the media query as well. Reading it through useSyncExternalStore keeps the
 * server render and hydration consistent without an effect round-trip.
 */
export function usePrefersReducedMotion() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
