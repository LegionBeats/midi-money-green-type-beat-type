import type { AnchorHTMLAttributes } from 'react';
import styles from './Cta.module.css';

type Variant = 'primary' | 'outline' | 'header' | 'pill' | 'tierFilled' | 'tierOutline';

type CtaProps = {
  variant: Variant;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

const TIER_VARIANTS: Variant[] = ['tierFilled', 'tierOutline'];

export function Cta({ variant, className, children, ...rest }: CtaProps) {
  const classes = [
    styles.base,
    styles[variant],
    TIER_VARIANTS.includes(variant) && styles.tier,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <a className={classes} {...rest}>
      {children}
    </a>
  );
}
