'use client';

import { useEffect, useMemo, useState } from 'react';

import { BEATS, SCENARIOS, type BeatId } from '@/lib/echo/scenarios.ts';
import type { NodeId } from '@/lib/echo/types.ts';

import { Controls } from './components/Controls';
import { Graph } from './components/Graph';
import { Panel } from './components/Panel';
import { Timeline } from './components/Timeline';
import styles from './demo.module.css';

const STEP_MS = 480;

export default function DemoPage() {
  const [beat, setBeat] = useState<BeatId | null>(null);
  const [step, setStep] = useState(0);

  const scenario = beat ? SCENARIOS[beat] : null;
  const shown = useMemo(() => scenario?.events.slice(0, step) ?? [], [scenario, step]);
  const finished = !!scenario && step >= scenario.events.length;

  useEffect(() => {
    if (!scenario || step >= scenario.events.length) return;
    const timer = setTimeout(() => setStep((s) => s + 1), step === 0 ? 150 : STEP_MS);
    return () => clearTimeout(timer);
  }, [scenario, step]);

  const active = useMemo(
    () => new Set<NodeId>(shown.map((e) => e.node).filter((n): n is NodeId => !!n)),
    [shown],
  );

  const tainted = useMemo(
    () =>
      shown.some((e) => e.taint) && scenario?.gate
        ? new Set<NodeId>(scenario.gate.taint)
        : new Set<NodeId>(),
    [shown, scenario],
  );

  const graph = (scenario ?? SCENARIOS[BEATS[0]]).graph;

  const run = (id: BeatId) => {
    setBeat(id);
    setStep(0);
  };

  const reset = () => {
    setBeat(null);
    setStep(0);
  };

  return (
    <main className={styles.page}>
      <div className={styles.inner}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>EchoCheck — independent evidence gate</h1>
          <p className={styles.tagline}>
            Real agents, replayed from a recorded run. Four beats: an unprotected deploy, an
            agent-side verify() tool, the channel-side gate, and a hijacked trusted account. Every
            approval that matters descends from the same untrusted source.
          </p>
        </div>
        <p className={styles.question}>{scenario?.question ?? 'Pick a run.'}</p>
      </header>

      <Controls active={beat} running={!!scenario && !finished} onRun={run} onReset={reset} />

      <div className={styles.grid}>
        <div className={styles.stack}>
          <Graph graph={graph} active={active} tainted={tainted} flagEdges={scenario?.flagEdges} />
          <Timeline events={shown} />
        </div>
        <div className={styles.stack}>
          <Panel scenario={scenario} finished={finished} />
        </div>
      </div>
      </div>
    </main>
  );
}
