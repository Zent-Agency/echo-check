import { demoGraph } from '@/lib/echo/scenarios.ts';
import type { NodeId } from '@/lib/echo/types.ts';
import styles from '../demo.module.css';

const W = 132;
const H = 46;

// ponytail: hand-placed. The fixture is fixed, so a layout engine would be nine nodes of overkill.
const POS: Record<NodeId, [number, number]> = {
  'issue-42': [12, 147],
  'release-agent@t1': [180, 147],
  'release-summary.md': [348, 56],
  'generated-changelog.md': [348, 238],
  'reviewer-a@t1': [516, 56],
  'reviewer-b@t1': [516, 238],
  'msg-approve-a': [684, 56],
  'msg-approve-b': [684, 238],
  'deploy-agent@t1': [852, 147],
};

const META: Record<NodeId, string> = {
  'issue-42': 'source · untrusted',
  'release-agent@t1': 'agent-state',
  'release-summary.md': 'artifact · disputed',
  'generated-changelog.md': 'artifact · derived',
  'reviewer-a@t1': 'agent-state',
  'reviewer-b@t1': 'agent-state',
  'msg-approve-a': 'message · reviewer-a',
  'msg-approve-b': 'message · reviewer-b',
  'deploy-agent@t1': 'agent-state',
};

type Props = { active: Set<NodeId>; tainted: Set<NodeId> };

const state = (id: NodeId, { active, tainted }: Props) =>
  tainted.has(id) ? 'tainted' : active.has(id) ? 'active' : 'idle';

export function Graph(props: Props) {
  const drawn = Object.keys(POS);

  return (
    <section className={styles.card}>
      <h2 className={styles.cardTitle}>Provenance graph</h2>
      <svg className={styles.graph} viewBox="0 0 996 340" role="img" aria-label="Provenance graph">
        {demoGraph.edges
          .filter(([from, to]) => POS[from] && POS[to])
          .map(([from, to]) => {
            const [x1, y1] = POS[from];
            const [x2, y2] = POS[to];
            const [sx, sy] = [x1 + W, y1 + H / 2];
            const [ex, ey] = [x2, y2 + H / 2];
            const edgeState =
              props.tainted.has(from) && props.tainted.has(to)
                ? 'tainted'
                : props.active.has(from) && props.active.has(to)
                  ? 'active'
                  : 'idle';
            return (
              <path
                key={`${from}->${to}`}
                className={styles.edge}
                data-state={edgeState}
                d={`M ${sx} ${sy} C ${sx + 24} ${sy}, ${ex - 24} ${ey}, ${ex} ${ey}`}
              />
            );
          })}

        {drawn.map((id) => {
          const [x, y] = POS[id];
          const s = state(id, props);
          return (
            <g key={id} className={styles.nodeGroup} data-state={s}>
              <rect
                className={styles.nodeBox}
                data-state={s}
                x={x}
                y={y}
                width={W}
                height={H}
                rx={6}
              />
              <text className={styles.nodeLabel} x={x + 8} y={y + 20}>
                {id}
              </text>
              <text className={styles.nodeMeta} x={x + 8} y={y + 34}>
                {META[id]}
              </text>
            </g>
          );
        })}
      </svg>
      <div className={styles.legend}>
        <span>
          <i className={styles.swatch} style={{ background: 'var(--reject)' }} />
          tainted
        </span>
        <span>
          <i className={styles.swatch} style={{ background: 'var(--info)' }} />
          reached
        </span>
        <span>X → Y = &quot;Y could have been affected by X&quot;</span>
      </div>
    </section>
  );
}
