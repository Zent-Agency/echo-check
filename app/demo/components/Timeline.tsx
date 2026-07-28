'use client';

import { useEffect, useRef } from 'react';

import type { EchoEvent } from '@/lib/echo/scenarios.ts';
import styles from '../demo.module.css';

export function Timeline({ events }: { events: EchoEvent[] }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [events.length]);

  return (
    <section className={styles.card}>
      <h2 className={styles.cardTitle}>Timeline</h2>
      <div className={styles.timeline} ref={ref}>
        {events.length === 0 ? (
          <p className={styles.empty}>Pick a run to start.</p>
        ) : (
          events.map((e, i) => (
            <div key={i} className={styles.event} data-tone={e.tone ?? 'info'}>
              <span className={styles.actor}>{e.actor}</span>
              <span className={styles.eventText}>{e.text}</span>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
