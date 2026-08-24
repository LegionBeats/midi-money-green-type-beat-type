'use client';

import { useState } from 'react';
import { FAQS } from '@/data/content';
import { useMeasuredHeight } from '@/hooks/useMeasuredHeight';
import { Reveal } from './Reveal';
import { SectionEyebrow } from './SectionEyebrow';
import styles from './FAQ.module.css';

function FaqItem({
  item,
  index,
  open,
  onToggle,
}: {
  item: (typeof FAQS)[number];
  index: number;
  open: boolean;
  onToggle: () => void;
}) {
  const { ref, height } = useMeasuredHeight<HTMLDivElement>();
  const panelId = `faq-panel-${index}`;
  const triggerId = `faq-trigger-${index}`;

  return (
    <div className={[styles.card, open && styles.cardOpen].filter(Boolean).join(' ')}>
      <button
        type="button"
        id={triggerId}
        className={styles.trigger}
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={panelId}
      >
        <span className={styles.question}>{item.question}</span>
        <span
          className={[styles.sign, open && styles.signOpen].filter(Boolean).join(' ')}
          aria-hidden="true"
        >
          +
        </span>
      </button>

      <div
        id={panelId}
        role="region"
        aria-labelledby={triggerId}
        className={styles.body}
        style={{ maxHeight: open ? height : 0, opacity: open ? 1 : 0 }}
      >
        <div ref={ref}>
          <p className={styles.answer}>{item.answer}</p>
        </div>
      </div>
    </div>
  );
}

/**
 * Single-open accordion: opening one closes the other, clicking the open item
 * closes it (-1 = all closed). The first item is open on load.
 *
 * The list reveals as one block rather than staggering per item.
 */
export function FAQ() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <section id="faq" className={styles.section}>
      <Reveal className={styles.header}>
        <SectionEyebrow>FAQ</SectionEyebrow>
        <h2 className={styles.heading}>Questions</h2>
      </Reveal>

      <Reveal className={styles.list}>
        {FAQS.map((item, index) => (
          <FaqItem
            key={item.question}
            item={item}
            index={index}
            open={openFaq === index}
            onToggle={() => setOpenFaq((current) => (current === index ? -1 : index))}
          />
        ))}
      </Reveal>
    </section>
  );
}
