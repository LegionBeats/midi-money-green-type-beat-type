'use client';

import { useEffect, useRef, useState, type ElementType, type HTMLAttributes } from 'react';
import { useMotion } from '@/lib/motion';
import styles from './Reveal.module.css';

type RevealProps = {
  /** Element to render. Defaults to a div; pass 'h1', 'p', 'section', etc. */
  as?: ElementType;
  /** Stagger, applied as transition-delay. */
  delay?: number;
} & HTMLAttributes<HTMLElement>;

/**
 * One-shot entry reveal. IntersectionObserver at threshold 0.14 with a -6%
 * bottom rootMargin; unobserves on fire and never re-hides.
 *
 * The hero's load choreography falls out of this same mechanism: those
 * elements are already in view, so the observer's initial callback fires on
 * mount and each element's `delay` sequences the rise.
 */
export function Reveal({
  as,
  delay = 0,
  className,
  style,
  children,
  ...rest
}: RevealProps) {
  const Tag = (as ?? 'div') as 'div';
  const ref = useRef<HTMLDivElement>(null);
  const { reduceMotion } = useMotion();
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    // Under reduced motion `shown` is already true — nothing to observe.
    if (reduceMotion) return;

    const element = ref.current;
    if (!element) return;

    if (!('IntersectionObserver' in window)) {
      const frame = requestAnimationFrame(() => setRevealed(true));
      return () => cancelAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          setRevealed(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.14, rootMargin: '0px 0px -6% 0px' },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [reduceMotion]);

  const shown = revealed || reduceMotion;

  return (
    <Tag
      ref={ref}
      // Also the hook the <noscript> fallback targets, so a JS-less page is
      // not a blank one.
      data-reveal=""
      className={[styles.reveal, shown && styles.revealed, className]
        .filter(Boolean)
        .join(' ')}
      style={delay ? { ...style, transitionDelay: `${delay}ms` } : style}
      {...rest}
    >
      {children}
    </Tag>
  );
}
