import { BEATS, SCENARIOS, type BeatId } from '@/lib/echo/scenarios.ts';
import styles from '../demo.module.css';

type Props = {
  active: BeatId | null;
  running: boolean;
  onRun: (beat: BeatId) => void;
  onReset: () => void;
};

export function Controls({ active, running, onRun, onReset }: Props) {
  return (
    <div className={styles.controls}>
      {BEATS.map((id, i) => (
        <button
          key={id}
          type="button"
          className={styles.beat}
          data-active={active === id}
          disabled={running}
          onClick={() => onRun(id)}
        >
          <span className={styles.beatIndex}>{i + 1}</span>
          {SCENARIOS[id].label}
        </button>
      ))}
      <button type="button" className={styles.reset} onClick={onReset}>
        reset
      </button>
    </div>
  );
}
