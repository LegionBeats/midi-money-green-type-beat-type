import styles from './SectionEyebrow.module.css';

/** Shared by sections 04, 06, 07, 08, 09 and 10 — only the label changes. */
export function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.eyebrow}>
      <span className={styles.dot} aria-hidden="true" />
      <span className={styles.label}>{children}</span>
    </div>
  );
}
