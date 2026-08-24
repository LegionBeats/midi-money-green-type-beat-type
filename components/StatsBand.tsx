'use client';

import { HERO_STATS, type HeroStat } from '@/data/content';
import { useCountUp } from '@/hooks/useCountUp';
import { Cta } from './Cta';
import { Reveal } from './Reveal';
import styles from './StatsBand.module.css';

function Stat({ stat, index }: { stat: HeroStat; index: number }) {
  const { ref, display, labelShown } = useCountUp({
    target: stat.target,
    prefix: stat.prefix,
    suffix: stat.suffix,
    index,
  });

  return (
    <Reveal delay={stat.revealDelay} className={styles.cell}>
      <div ref={ref} className={styles.number}>
        {display}
      </div>
      <div
        data-statcopy=""
        className={[styles.copy, labelShown && styles.copyShown].filter(Boolean).join(' ')}
      >
        <div className={styles.label}>{stat.label}</div>
        <p className={styles.description} style={{ maxWidth: stat.descriptionMaxWidth }}>
          {stat.description}
        </p>
      </div>
    </Reveal>
  );
}

/**
 * The stats ride up as literal zeros alongside the hero text, the page holds
 * for roughly 1250ms, and only then do the numbers race. The buttons and fine
 * print reveal at 260ms and 340ms — before the stats above them in the
 * layout, which is intentional.
 */
export function StatsBand() {
  return (
    <section className={styles.band}>
      <div className={styles.row}>
        {HERO_STATS.map((stat, index) => (
          <Stat key={stat.label} stat={stat} index={index} />
        ))}
      </div>

      <Reveal delay={260} className={styles.buttons}>
        <Cta variant="primary" href="#pricing">
          Start Selling Free
        </Cta>
        <Cta variant="outline" href="#how">
          Learn more
        </Cta>
      </Reveal>

      <Reveal as="p" delay={340} className={styles.finePrint}>
        The secret? We teach universal direct response marketing techniques proven to work
        since before the internet.
      </Reveal>
    </section>
  );
}
