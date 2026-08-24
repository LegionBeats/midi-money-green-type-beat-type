import { Fragment } from 'react';
import styles from './WordmarkMarquee.module.css';

const REPEATS = [0, 1, 2];

function Half({ hidden }: { hidden?: boolean }) {
  return (
    <div className={styles.half} aria-hidden={hidden || undefined}>
      {REPEATS.map((index) => (
        <Fragment key={index}>
          <span className={styles.word}>MIDIMONEY</span>
          <span className={styles.star}>✦</span>
        </Fragment>
      ))}
    </div>
  );
}

/**
 * Always visible, always moving — no reveal animation. Speed comes from
 * --mq-dur, set on the page root from the marqueeSpeed prop.
 */
export function WordmarkMarquee() {
  return (
    <div className={styles.band}>
      <div className={styles.track}>
        <Half />
        <Half hidden />
      </div>
    </div>
  );
}
