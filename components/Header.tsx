'use client';

import { useEffect, useState } from 'react';
import { NAV_LINKS } from '@/data/content';
import { useScrolled } from '@/hooks/useScrolled';
import { Cta } from './Cta';
import { Logo } from './Logo';
import styles from './Header.module.css';

/**
 * Sticky rail. Deliberately outside the reveal choreography — the header is
 * present immediately while everything below it rises into place.
 *
 * Below 760px the inline nav is replaced by a disclosure panel rather than
 * being dropped, so Features / Pricing / FAQ stay reachable. The primary CTA
 * stays in the rail at every width.
 */
export function Header() {
  const scrolled = useScrolled(12);
  const [menuOpen, setMenuOpen] = useState(false);

  // Escape closes the panel, matching what a menu is expected to do.
  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

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

          <button
            type="button"
            className={[styles.menuButton, menuOpen && styles.menuOpen].filter(Boolean).join(' ')}
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="header-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            <span className={styles.menuBar} />
            <span className={styles.menuBar} />
            <span className={styles.menuBar} />
          </button>
        </div>
      </div>

      <div
        id="header-menu"
        className={[styles.panel, menuOpen && styles.panelOpen].filter(Boolean).join(' ')}
      >
        <div className={styles.panelInner}>
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={styles.panelLink}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a href="#top" className={styles.panelLink} onClick={() => setMenuOpen(false)}>
            Log in
          </a>
        </div>
      </div>
    </header>
  );
}
