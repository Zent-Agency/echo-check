import type { EchoNode, Edge, Graph, NodeId } from './types.ts';

export const DISPUTED: NodeId = 'release-summary.md';

export const CONFIRMATIONS: NodeId[] = ['msg-approve-a', 'msg-approve-b'];

const NODES: EchoNode[] = [
  { id: 'issue-42', type: 'source', origin: 'untrusted', writer: 'external-user' },
  { id: 'release-agent@t1', type: 'agent-state' },
  { id: 'release-summary.md', type: 'artifact', origin: 'derived', writer: 'release-agent' },
  { id: 'generated-changelog.md', type: 'artifact', origin: 'derived', writer: 'release-agent' },
  { id: 'reviewer-a@t1', type: 'agent-state' },
  { id: 'reviewer-b@t1', type: 'agent-state' },
  { id: 'msg-approve-a', type: 'message', origin: 'derived', writer: 'reviewer-a' },
  { id: 'msg-approve-b', type: 'message', origin: 'derived', writer: 'reviewer-b' },
  { id: 'deploy-agent@t1', type: 'agent-state' },
  { id: 'CONTRIBUTING.md', type: 'source', origin: 'trusted', writer: 'maintainer' },
];

/** The golden path. `CONTRIBUTING.md` is deliberately unconnected here. */
const EDGES: Edge[] = [
  ['issue-42', 'release-agent@t1'],
  ['release-agent@t1', 'release-summary.md'],
  ['release-agent@t1', 'generated-changelog.md'],
  ['release-summary.md', 'reviewer-a@t1'],
  ['generated-changelog.md', 'reviewer-b@t1'],
  ['reviewer-a@t1', 'msg-approve-a'],
  ['reviewer-b@t1', 'msg-approve-b'],
  ['msg-approve-a', 'deploy-agent@t1'],
  ['msg-approve-b', 'deploy-agent@t1'],
];

/** Node ids on the golden path, in render order. */
export const GOLDEN_PATH: NodeId[] = EDGES.flat().filter((id, i, all) => all.indexOf(id) === i);

export function buildGraph(opts: { reviewerBReadsContributing?: boolean } = {}): Graph {
  const edges: Edge[] = [...EDGES];
  if (opts.reviewerBReadsContributing) edges.push(['CONTRIBUTING.md', 'reviewer-b@t1']);
  return { nodes: NODES, edges };
}

export function nodeIndex(graph: Graph): Map<NodeId, EchoNode> {
  return new Map(graph.nodes.map((n) => [n.id, n]));
}

// ponytail: O(edges) per hop, the fixture has 10 nodes. Index the edges if a real graph ever lands here.
function walk(graph: Graph, start: NodeId, up: boolean): NodeId[] {
  const seen = new Set<NodeId>();
  const queue = [start];
  while (queue.length) {
    const current = queue.shift()!;
    for (const [from, to] of graph.edges) {
      const [match, next] = up ? [to, from] : [from, to];
      if (match === current && !seen.has(next)) {
        seen.add(next);
        queue.push(next);
      }
    }
  }
  seen.delete(start);
  return [...seen];
}

/** Everything `id` could have been affected by. Excludes `id`. */
export function ancestors(graph: Graph, id: NodeId): NodeId[] {
  return walk(graph, id, true);
}

/** Everything that could have been affected by `id`. Excludes `id`. */
export function descendants(graph: Graph, id: NodeId): NodeId[] {
  return walk(graph, id, false);
}
