import type { CSSProperties, ReactNode } from 'react';
import styles from './CardGrid.module.css';

type CardGridProps = {
  /** Columns at desktop width. Always stacks to one below 760px. */
  columns?: number;
  gap?: number;
  /** Gap once stacked; defaults to a roomier 32px. */
  stackedGap?: number;
  /** Cards size to their own content rather than stretching to the tallest. */
  alignStart?: boolean;
  className?: string;
  children: ReactNode;
};

export function CardGrid({
  columns = 3,
  gap = 20,
  stackedGap = 32,
  alignStart = false,
  className,
  children,
}: CardGridProps) {
  return (
    <div
      className={[styles.grid, alignStart && styles.alignStart, className]
        .filter(Boolean)
        .join(' ')}
      style={
        {
          '--cols': columns,
          '--grid-gap': `${gap}px`,
          '--grid-gap-stacked': `${stackedGap}px`,
        } as CSSProperties
      }
    >
      {children}
    </div>
  );
}
