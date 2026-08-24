import { CONVERSION_METRICS } from '@/data/content';
import { Reveal } from './Reveal';
import { SectionEyebrow } from './SectionEyebrow';
import styles from './ConversionStats.module.css';

/** These numbers are static — only the hero stats count up. */
export function ConversionStats() {
  return (
    <section id="features" className={styles.section}>
      <Reveal className={styles.header}>
        <SectionEyebrow>Conversion</SectionEyebrow>
        <h2 className={styles.heading}>The best converting store on the internet.</h2>
        <p className={styles.sub}>
          Most producers lose sales because checkout is slow. Yours converts the moment an
          artist wants to buy.
        </p>
      </Reveal>

      <div className={styles.grid}>
        {CONVERSION_METRICS.map((item) => (
          <Reveal key={item.metric} delay={item.delay} className={styles.cell}>
            <div
              className={[styles.metric, item.accent && styles.metricAccent]
                .filter(Boolean)
                .join(' ')}
            >
              {item.metric}
            </div>
            <p className={styles.caption}>{item.caption}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
