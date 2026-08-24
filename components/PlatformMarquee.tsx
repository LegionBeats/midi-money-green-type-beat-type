import { Fragment } from 'react';
import { PLATFORM_ICONS, PLATFORM_ROW_1, PLATFORM_ROW_2 } from '@/data/platformIcons';
import { Cta } from './Cta';
import { Reveal } from './Reveal';
import { SectionEyebrow } from './SectionEyebrow';
import styles from './PlatformMarquee.module.css';

/** Repeats per half, so one half always exceeds the viewport width. */
const REPEATS_PER_HALF = 4;

function IconCard({ name }: { name: string }) {
  const icon = PLATFORM_ICONS[name];

  return (
    <div className={styles.card}>
      <svg
        className={styles.icon}
        viewBox={icon.viewBox}
        // Icon bodies are inlined at build time from @iconify-json/simple-icons
        // by scripts/generate-icons.mjs — no user input reaches this.
        dangerouslySetInnerHTML={{ __html: icon.body }}
      />
    </div>
  );
}

/** One of the two identical halves that make the -50% loop seamless. */
function Half({ names }: { names: readonly string[] }) {
  return (
    <div className={styles.half}>
      {Array.from({ length: REPEATS_PER_HALF }, (_, repeat) => (
        <Fragment key={repeat}>
          {names.map((name) => (
            <IconCard key={`${repeat}-${name}`} name={name} />
          ))}
        </Fragment>
      ))}
    </div>
  );
}

function Row({ names, direction }: { names: readonly string[]; direction: 'left' | 'right' }) {
  return (
    <div
      className={[styles.row, direction === 'left' ? styles.rowLeft : styles.rowRight].join(' ')}
    >
      <Half names={names} />
      <Half names={names} />
    </div>
  );
}

/**
 * The rows never reveal — they are always visible and always moving. Only the
 * header and footer blocks participate in the entry choreography.
 *
 * The icon rows are decorative: the heading and blurb carry the meaning, so
 * they are hidden from assistive tech rather than announcing 96 logo names.
 */
export function PlatformMarquee() {
  return (
    <section id="platforms" className={styles.section}>
      <div className={styles.glow} aria-hidden="true" />

      <Reveal className={styles.header}>
        <SectionEyebrow>Connections</SectionEyebrow>
        <h2 className={styles.heading}>
          Everywhere your
          <br />
          fans listen
        </h2>
      </Reveal>

      <div className={styles.rows} aria-hidden="true">
        <Row names={PLATFORM_ROW_1} direction="left" />
        <Row names={PLATFORM_ROW_2} direction="right" />
      </div>

      <Reveal className={styles.footer}>
        <p className={styles.blurb}>
          Your catalog stays yours. MIDIMONEY pushes every drop to the platforms your fans
          already live on — automatically.
        </p>
        <div className={styles.ctaWrap}>
          <Cta variant="pill" href="#pricing">
            See all integrations
          </Cta>
        </div>
      </Reveal>
    </section>
  );
}
