'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';

/** useLayoutEffect warns during SSR; fall back to useEffect on the server. */
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

/**
 * Tracks an element's natural content height.
 *
 * Both the FAQ spec and motion-spec.md call the prototype's hard 260px
 * max-height a shortcut and ask for a real measurement, so long answers can't
 * clip. Measuring in a layout effect means the item that starts open is
 * already at full height on first paint rather than animating open on load;
 * the ResizeObserver keeps it honest when the webfont swaps in or the column
 * reflows.
 */
export function useMeasuredHeight<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [height, setHeight] = useState(0);

  useIsomorphicLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;

    const measure = () => setHeight(element.scrollHeight);
    measure();

    if (typeof ResizeObserver === 'undefined') return;
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return { ref, height };
}
