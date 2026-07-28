import type { Edge, Graph as GraphType, NodeId } from '@/lib/echo/types.ts';
import styles from '../demo.module.css';

const W = 132;
const H = 46;

// ponytail: hand-placed. The scenario set is fixed, so a layout engine is overkill.
const POS: Record<NodeId, [number, number]> = {
  'issue-42.md': [12, 96],
  'release-agent@t1': [188, 96],
  'release-summary.md': [364, 36],
  'generated-changelog.md': [364, 156],
  'reviewer-a@t1': [540, 36],
  'reviewer-b@t1': [540, 156],
  'msg-approve-a': [716, 36],
  'msg-approve-b': [716, 156],
  'deploy-agent@t1': [892, 96],
  // beat 4: the compromised-sign-off branch
  'security-signoff.md': [12, 300],
  'access-anomalies.log': [12, 384],
  'reviewer-c@t1': [540, 300],
  'msg-approve-c': [716, 300],
  'monitor@t1': [276, 384],
};

const META: Record<NodeId, string> = {
  'issue-42.md': 'source · untrusted',
  'release-agent@t1': 'agent-state',
  'release-summary.md': 'artifact · disputed',
  'generated-changelog.md': 'artifact · derived',
  'reviewer-a@t1': 'agent-state',
  'reviewer-b@t1': 'agent-state',
  'msg-approve-a': 'message · reviewer-a',
  'msg-approve-b': 'message · reviewer-b',
  'deploy-agent@t1': 'agent-state',
  'security-signoff.md': 'source · sign-off',
  'access-anomalies.log': 'source · identity feed',
  'reviewer-c@t1': 'agent-state',
  'msg-approve-c': 'message · reviewer-c',
  'monitor@t1': 'agent-state · monitor',
};

type Props = {
  graph: GraphType;
  active: Set<NodeId>;
  tainted: Set<NodeId>;
  flagEdges?: Edge[];
};

export function Graph({ graph, active, tainted, flagEdges = [] }: Props) {
  const drawn = graph.nodes.map((n) => n.id).filter((id) => POS[id]);
  const extended = drawn.includes('security-signoff.md');

  const posOf = (id: NodeId): [number, number] => {
    // Beat 4 has a third message row; drop the deploy agent to stay centered.
    if (id === 'deploy-agent@t1' && extended) return [892, 170];
    return POS[id];
  };

  // Fit the viewBox to whatever this beat actually draws.
  const xs = drawn.flatMap((id) => [posOf(id)[0], posOf(id)[0] + W]);
  const ys = drawn.flatMap((id) => [posOf(id)[1], posOf(id)[1] + H]);
  const pad = 16;
  const minX = Math.min(...xs) - pad;
  const minY = Math.min(...ys) - pad;
  const vb = `${minX} ${minY} ${Math.max(...xs) - minX + pad} ${Math.max(...ys) - minY + pad}`;

  const nodeState = (id: NodeId) =>
    tainted.has(id) ? 'tainted' : active.has(id) ? 'active' : 'idle';

  const curve = (from: NodeId, to: NodeId) => {
    const [x1, y1] = posOf(from);
    const [x2, y2] = posOf(to);
    const [sx, sy] = [x1 + W, y1 + H / 2];
    const [ex, ey] = [x2, y2 + H / 2];
    return `M ${sx} ${sy} C ${sx + 24} ${sy}, ${ex - 24} ${ey}, ${ex} ${ey}`;
  };

  return (
    <section className={styles.card}>
      <h2 className={styles.cardTitle}>Provenance graph</h2>
      <svg className={styles.graph} viewBox={vb} role="img" aria-label="Provenance graph">
        {graph.edges
          .filter(([from, to]) => POS[from] && POS[to])
          .map(([from, to]) => {
            const edgeState =
              tainted.has(from) && tainted.has(to)
                ? 'tainted'
                : active.has(from) && active.has(to)
                  ? 'active'
                  : 'idle';
            return (
              <path
                key={`${from}->${to}`}
                className={styles.edge}
                data-state={edgeState}
                d={curve(from, to)}
              />
            );
          })}

        {/* Monitor flagging a source — not data flow, so a distinct dashed edge. */}
        {flagEdges
          .filter(([from, to]) => POS[from] && POS[to] && tainted.has(to))
          .map(([from, to]) => {
            const [x1, y1] = posOf(from);
            const [x2, y2] = posOf(to);
            return (
              <path
                key={`flag-${from}->${to}`}
                className={styles.flagEdge}
                d={`M ${x1} ${y1 + H / 2} C ${x1 - 40} ${y1}, ${x2 - 40} ${y2 + H}, ${x2} ${y2 + H / 2}`}
              />
            );
          })}

        {drawn.map((id) => {
          const [x, y] = posOf(id);
          const s = nodeState(id);
          return (
            <g key={id} className={styles.nodeGroup} data-state={s}>
              <rect className={styles.nodeBox} data-state={s} x={x} y={y} width={W} height={H} rx={6} />
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
        {extended ? (
          <span>
            <i className={styles.swatch} style={{ background: 'var(--unproven)' }} />
            monitor flag
          </span>
        ) : (
          <span>X → Y = &quot;Y could have been affected by X&quot;</span>
        )}
      </div>
    </section>
  );
}
