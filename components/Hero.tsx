'use client';

import { ROTATING_WORDS } from '@/data/content';
import { useRotatingWord } from '@/hooks/useRotatingWord';
import { useMotion } from '@/lib/motion';
import { FluidCursor } from './FluidCursor';
import { Reveal } from './Reveal';
import styles from './Hero.module.css';

/**
 * Copy is verbatim: lowercase "want", the period after "Producers.", and
 * exactly one <br> in the headline — the "?" is a text node following the
 * rotating word's span so it lands on the same line.
 */
export function Hero() {
  const { reduceMotion } = useMotion();
  const { word, cycle } = useRotatingWord(ROTATING_WORDS);

  return (
    <section id="top" className={styles.hero}>
      <FluidCursor reduceMotion={reduceMotion} />

      <div className={styles.content}>
        <Reveal className={styles.pill}>
          <span className={styles.pillDot} aria-hidden="true" />
          We turn producers into entrepreneurs
        </Reveal>

        <Reveal as="h1" delay={80} className={styles.headline}>
          Producers. want to sell
          <br />
          <span className={styles.rotatingWord}>
            <span key={cycle} className={cycle >= 0 ? styles.word : undefined}>
              {word}
            </span>
          </span>
          ?
        </Reveal>

        <Reveal as="h2" delay={120} className={styles.serif}>
          {"We'll show you how."}
        </Reveal>

        <Reveal as="p" delay={180} className={styles.credential}>
          10+ year track record. Ask about us.
        </Reveal>
      </div>
    </section>
  );
}
