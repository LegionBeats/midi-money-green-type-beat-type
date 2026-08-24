'use client';

import { NAV_LINKS } from '@/data/content';
import { useScrolled } from '@/hooks/useScrolled';
import { Cta } from './Cta';
import { Logo } from './Logo';
import styles from './Header.module.css';

/**
 * Sticky rail. Deliberately outside the reveal choreography — the header is
 * present immediately while everything below it rises into place.
 */
export function Header() {
  const scrolled = useScrolled(12);

  return (
    <header className={[styles.header, scrolled && styles.scrolled].filter(Boolean).join(' ')}>
      <div className={styles.rail}>
        <Logo />

        <nav className={styles.nav}>
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className={styles.actions}>
          <a href="#top" className={styles.login}>
            Log in
          </a>
          <Cta variant="header" href="#pricing">
            Start Free
          </Cta>
        </div>
      </div>
    </header>
  );
}
