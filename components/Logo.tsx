import styles from './Logo.module.css';

/** The header and footer share one lockup. */
export function Logo({ className }: { className?: string }) {
  return (
    <a href="#top" className={[styles.logo, className].filter(Boolean).join(' ')}>
      <span className={styles.mark} aria-hidden="true" />
      MIDIMONEY
    </a>
  );
}
