import { FOOTER_LINK_GROUPS } from '@/data/content';
import { Logo } from './Logo';
import styles from './Footer.module.css';

/** No reveal animation. */
export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.upper}>
        <div className={styles.brand}>
          <Logo />
          <p className={styles.blurb}>
            The platform for producers to upload, monetize, and grow their music careers.
          </p>
        </div>

        {FOOTER_LINK_GROUPS.map((group) => (
          <div key={group.heading}>
            <div className={styles.groupHeading}>{group.heading}</div>
            <div className={styles.links}>
              {group.links.map((link) => (
                <a key={link.label} href={link.href}>
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Replace "demo design system" with real production copy before launch. */}
      <div className={styles.lower}>
        © 2026 MIDIMONEY — demo design system. All rights reserved.
      </div>
    </footer>
  );
}
