import { TESTIMONIALS } from '@/data/content';
import { Reveal } from './Reveal';
import { SectionEyebrow } from './SectionEyebrow';
import styles from './Testimonials.module.css';

/** Quotes carry their own typographic quote marks, as in the design. */
export function Testimonials() {
  return (
    <section className={styles.section}>
      <Reveal className={styles.header}>
        <SectionEyebrow>Testimonials</SectionEyebrow>
        <h2 className={styles.heading}>Producers talk</h2>
      </Reveal>

      <div className={styles.grid}>
        {TESTIMONIALS.map((item) => (
          <Reveal key={item.name} delay={item.delay} className={styles.card} as="figure">
            <p className={styles.quote}>{item.text}</p>
            <figcaption className={styles.attribution}>
              <span className={styles.avatar} aria-hidden="true">
                {item.initial}
              </span>
              <div>
                <div className={styles.name}>{item.name}</div>
                <div className={styles.role}>{item.role}</div>
              </div>
            </figcaption>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
