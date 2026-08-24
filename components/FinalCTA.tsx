import { Cta } from './Cta';
import { Reveal } from './Reveal';
import styles from './FinalCTA.module.css';

/** The whole panel reveals as one element. */
export function FinalCTA() {
  return (
    <section className={styles.section}>
      <Reveal className={styles.panel}>
        <h2 className={styles.heading}>{"Stop uploading like it's 2016."}</h2>
        <p className={styles.sub}>
          Upload once. Video, beat store listing, checkout link in the description. Done.
        </p>
        <div className={styles.buttons}>
          <Cta variant="primary" href="#top">
            Start Selling Free
          </Cta>
          <Cta variant="outline" href="#pricing">
            See Plans
          </Cta>
        </div>
        <p className={styles.finePrint}>
          Free forever · No credit card required · Cancel anytime
        </p>
      </Reveal>
    </section>
  );
}
