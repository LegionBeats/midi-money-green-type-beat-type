import { PRICING_TIERS } from '@/data/content';
import { Cta } from './Cta';
import { CardGrid } from './CardGrid';
import { Reveal } from './Reveal';
import { SectionEyebrow } from './SectionEyebrow';
import styles from './Pricing.module.css';

/**
 * The CTA sits above the feature list — not the usual order, and deliberate.
 * There is no monthly/annual toggle in this design.
 */
export function Pricing() {
  return (
    <section id="pricing" className={styles.section}>
      <Reveal className={styles.header}>
        <SectionEyebrow>Pricing</SectionEyebrow>
        <h2 className={styles.heading}>Simple pricing</h2>
        <p className={styles.sub}>
          {"Start free. Upgrade when you're ready. Cancel anytime."}
        </p>
      </Reveal>

      <CardGrid alignStart stackedGap={40}>
        {PRICING_TIERS.map((tier) => (
          <Reveal
            key={tier.name}
            delay={tier.delay}
            className={[styles.card, tier.highlighted && styles.cardHighlighted]
              .filter(Boolean)
              .join(' ')}
          >
            {tier.badge && <div className={styles.badge}>{tier.badge}</div>}

            <div
              className={[styles.tierName, tier.highlighted && styles.tierNameAccent]
                .filter(Boolean)
                .join(' ')}
            >
              {tier.name}
            </div>

            <div className={styles.price}>
              {tier.price}
              <span className={styles.period}>{tier.period}</span>
            </div>

            <p className={styles.tagline}>{tier.tagline}</p>

            <Cta variant={tier.highlighted ? 'tierFilled' : 'tierOutline'} href={tier.cta.href}>
              {tier.cta.label}
            </Cta>

            <div
              className={[styles.divider, tier.highlighted && styles.dividerHighlighted]
                .filter(Boolean)
                .join(' ')}
            />

            <ul className={styles.features}>
              {tier.features.map((feature) => (
                <li key={feature} className={styles.feature}>
                  <span className={styles.check} aria-hidden="true">
                    ✓
                  </span>
                  {feature}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </CardGrid>

      <p className={styles.footnote}>
        All plans include 0% commission · 7-day free trial on paid plans · Cancel anytime
      </p>
    </section>
  );
}
