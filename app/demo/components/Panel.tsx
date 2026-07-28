import { CONFIRMATIONS } from '@/lib/echo/graph.ts';
import type { Scenario } from '@/lib/echo/scenarios.ts';
import styles from '../demo.module.css';

type Props = { scenario: Scenario | null; finished: boolean };

function Metric({ label, value, alarm }: { label: string; value: string; alarm?: boolean }) {
  return (
    <div className={styles.metric}>
      <span className={styles.metricLabel}>{label}</span>
      <span className={styles.metricValue} data-alarm={!!alarm}>
        {value}
      </span>
    </div>
  );
}

export function Panel({ scenario, finished }: Props) {
  const gate = scenario?.gate ?? null;

  return (
    <section className={styles.card}>
      <h2 className={styles.cardTitle}>Gate</h2>
      <div className={styles.metrics}>
        <Metric label="confirmations" value={scenario ? String(CONFIRMATIONS.length) : '—'} />
        <Metric label="original sources" value={gate ? String(gate.originalSources) : '—'} />
        <Metric
          label="independent evidence"
          value={gate ? String(gate.independentSources) : '—'}
          alarm={gate?.independentSources === 0}
        />
        {scenario?.verifyCalls !== null && scenario !== null ? (
          <Metric label="verify() calls" value={String(scenario.verifyCalls)} alarm />
        ) : null}
        <Metric
          label="gate ran"
          value={scenario ? (gate ? 'yes — in channel' : 'no') : '—'}
          alarm={!!scenario && !gate}
        />
      </div>

      <div className={styles.verdict} data-verdict={gate?.verdict ?? ''}>
        verdict: {gate ? gate.verdict : 'not evaluated'}
      </div>

      <div className={styles.outcome} data-outcome={finished ? scenario?.outcome : ''}>
        {finished && scenario ? scenario.outcome : '···'}
      </div>

      {finished && scenario?.id === 'agent-side' ? (
        <p className={styles.note}>
          The agent had verify(). The untrusted issue told it not to bother, and it agreed. A gate
          the agent chooses to call is not a gate.
        </p>
      ) : null}
      {finished && scenario?.id === 'echocheck' ? (
        <p className={styles.note}>
          Two agents, two different files, two approvals — and zero independent evidence. Different
          sources are not independent sources.
        </p>
      ) : null}
    </section>
  );
}
