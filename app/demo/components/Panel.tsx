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

const NOTES: Partial<Record<string, string>> = {
  'agent-side':
    'The agent had verify(). It ran it, got "no corroboration", and the untrusted issue told it to ignore that. A gate the agent chooses to honor is not a gate.',
  echocheck:
    'Two agents, two different files, two approvals — and zero independent evidence. Different sources are not independent sources.',
  compromised:
    'A trusted sign-off from a hijacked account launders as independent evidence. The monitor judges the account, not the release, and downgrades it — a move that can only tighten the gate.',
};

export function Panel({ scenario, finished }: Props) {
  const gate = scenario?.gate ?? null;
  const confirmations = scenario?.id === 'compromised' ? 3 : 2;

  return (
    <section className={styles.card}>
      <h2 className={styles.cardTitle}>Gate</h2>
      <div className={styles.metrics}>
        <Metric label="confirmations" value={scenario ? String(confirmations) : '—'} />
        <Metric label="original sources" value={gate ? String(gate.originalSources) : '—'} />
        <Metric
          label="independent evidence"
          value={gate ? String(gate.independentSources) : '—'}
          alarm={gate?.independentSources === 0}
        />
        {scenario?.verifyCalls !== null && scenario !== null ? (
          <Metric label="verify() calls" value={`${scenario.verifyCalls} · ignored`} alarm />
        ) : null}
        <Metric
          label="gate ran"
          value={scenario ? (gate ? 'yes — in channel' : 'no') : '—'}
          alarm={!!scenario && !gate}
        />
      </div>

      {scenario?.beat4 ? (
        <div className={styles.beat4}>
          <span className={styles.beat4Row} data-bad="true">
            no monitor · independent = {scenario.beat4.vulnerable} → PASS-eligible
          </span>
          <span className={styles.beat4Row}>
            with monitor · independent = {scenario.beat4.guarded} → REJECT
          </span>
        </div>
      ) : null}

      <div className={styles.verdict} data-verdict={gate?.verdict ?? ''}>
        verdict: {gate ? gate.verdict : 'not evaluated'}
      </div>

      <div className={styles.outcome} data-outcome={finished ? scenario?.outcome : ''}>
        {finished && scenario ? scenario.outcome : '···'}
      </div>

      {finished && scenario && NOTES[scenario.id] ? (
        <p className={styles.note}>{NOTES[scenario.id]}</p>
      ) : null}
    </section>
  );
}
