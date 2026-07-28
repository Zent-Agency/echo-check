export type NodeId = string;

export type NodeType = 'source' | 'artifact' | 'agent-state' | 'message';

export type Origin = 'trusted' | 'untrusted' | 'derived';

export type EchoNode = {
  id: NodeId;
  type: NodeType;
  /** Only meaningful for `source` and `artifact` nodes. */
  origin?: Origin;
  writer?: string;
};

/** `[from, to]` — "to could have been affected by from". Deliberate over-approximation. */
export type Edge = [NodeId, NodeId];

export type Graph = { nodes: EchoNode[]; edges: Edge[] };

export type Verdict = 'PASS' | 'UNPROVEN' | 'REJECT';

/**
 * Reviewers answer with a struct, never prose. Nothing attacker-controlled ever
 * reaches the decision path — that is the whole non-injectable property.
 */
export type ReviewerResponse = { verdict: 'safe' | 'unsafe'; ref: NodeId };

export type ConfirmationTrace = {
  id: NodeId;
  /** Everything this confirmation transitively rests on. */
  base: NodeId[];
  /** The subset of `base` outside the taint. */
  clean: NodeId[];
};

export type Receipt = {
  disputed: NodeId;
  independentSources: number;
  approvedBy: string;
};

export type GateResult = {
  verdict: Verdict;
  disputed: NodeId;
  taint: NodeId[];
  confirmations: ConfirmationTrace[];
  independentSources: number;
  /** Untrusted `source` roots the taint was seeded from. */
  originalSources: number;
  receipt: Receipt | null;
};
