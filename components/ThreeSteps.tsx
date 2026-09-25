import { STEPS } from '@/data/content';
import { CardGrid } from './CardGrid';
import { Reveal } from './Reveal';
import { SectionEyebrow } from './SectionEyebrow';
import styles from './ThreeSteps.module.css';

export function ThreeSteps() {
  return (
    <section id="how" className={styles.section}>
      <Reveal className={styles.header}>
        <SectionEyebrow>How it works</SectionEyebrow>
        <h2 className={styles.heading}>Three steps</h2>
      </Reveal>

      <CardGrid>
        {STEPS.map((step) => (
          <Reveal key={step.numeral} delay={step.delay} className={styles.step}>
            <div
              className={[styles.numeral, step.accent && styles.numeralAccent]
                .filter(Boolean)
                .join(' ')}
              aria-hidden="true"
            >
              {step.numeral}
            </div>
            <h3 className={styles.title}>{step.title}</h3>
            <p className={styles.body}>{step.body}</p>
          </Reveal>
        ))}
      </CardGrid>
    </section>
  );
}
