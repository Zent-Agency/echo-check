import type { Edge, EchoNode, Graph, NodeId, Origin } from './types.ts';

/**
 * One observed I/O operation. This is the only thing the gate learns about a
 * run — it never sees agent reasoning, prompts, or model output.
 */
export type IoEvent =
  /** Agent read a file. */
  | { op: 'read'; agent: string; path: string }
  /** Agent wrote a file. */
  | { op: 'write'; agent: string; path: string }
  /** Agent produced a message (a review, an approval). */
  | { op: 'emit'; agent: string; id: NodeId }
  /** Agent ingested someone else's message. */
  | { op: 'consume'; agent: string; id: NodeId }
  /** Any other tool invocation. Not data flow — recorded for metrics only. */
  | { op: 'call'; agent: string; tool: string };

export type Journal = {
  /**
   * Trust policy, declared by the operator before the run — never by a model
   * and never by file content. An attacker who controls issue-42.md cannot
   * relabel it as trusted.
   */
  origins: Record<string, Origin>;
  events: IoEvent[];
};

const stateOf = (agent: string): NodeId => `${agent}@t1`;

/**
 * Build the provenance graph from observed I/O alone.
 *
 * Edge semantics stay the over-approximation: reading X means the agent's state
 * could have been affected by X, and everything it writes afterwards inherits
 * that. We do not try to prove the agent actually used what it read — that
 * would need to trust the agent.
 */
export function graphFromJournal(journal: Journal): Graph {
  const edges: Edge[] = [];
  const agents = new Set<string>();
  const written = new Set<NodeId>();
  const messages = new Set<NodeId>();
  const files = new Set<NodeId>();

  const push = (from: NodeId, to: NodeId) => {
    if (!edges.some(([a, b]) => a === from && b === to)) edges.push([from, to]);
  };

  for (const e of journal.events) {
    agents.add(e.agent);
    const state = stateOf(e.agent);
    switch (e.op) {
      case 'read':
        files.add(e.path);
        push(e.path, state);
        break;
      case 'write':
        files.add(e.path);
        written.add(e.path);
        push(state, e.path);
        break;
      case 'emit':
        messages.add(e.id);
        push(state, e.id);
        break;
      case 'consume':
        messages.add(e.id);
        push(e.id, state);
        break;
      case 'call':
        break; // a tool call moves no data
    }
  }

  const nodes: EchoNode[] = [
    ...[...files].map((path): EchoNode => {
      const writer = journal.events.find((e) => e.op === 'write' && e.path === path)?.agent;
      // A file an agent produced during the run is derived, whatever the policy says.
      return written.has(path)
        ? { id: path, type: 'artifact', origin: 'derived', writer }
        : { id: path, type: 'source', origin: journal.origins[path] ?? 'untrusted' };
    }),
    ...[...agents].map((a): EchoNode => ({ id: stateOf(a), type: 'agent-state' })),
    ...[...messages].map((id): EchoNode => {
      const writer = journal.events.find((e) => e.op === 'emit' && e.id === id)?.agent;
      return { id, type: 'message', origin: 'derived', writer };
    }),
  ];

  return { nodes, edges };
}

/**
 * A file with no declared origin defaults to untrusted. Fail closed: an input
 * nobody vouched for is not evidence.
 */
export function undeclaredInputs(journal: Journal): NodeId[] {
  const read = journal.events.filter((e) => e.op === 'read').map((e) => e.path);
  const written = new Set(journal.events.filter((e) => e.op === 'write').map((e) => e.path));
  return [...new Set(read)].filter((p) => !written.has(p) && !(p in journal.origins));
}

export function toolCalls(journal: Journal, tool: string): IoEvent[] {
  return journal.events.filter((e) => e.op === 'call' && e.tool === tool);
}
