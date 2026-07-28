import { ancestors, descendants, nodeIndex } from './graph.ts';
import type { ConfirmationTrace, GateResult, Graph, NodeId } from './types.ts';

/**
 * The taint set for a disputed node.
 *
 * The naive version — `descendants(disputed)` — is wrong and silently breaks the
 * whole product: `generated-changelog.md` is a *sibling* of `release-summary.md`,
 * not a descendant, so it would be counted as clean evidence.
 *
 * Instead: climb to the untrusted source roots, then flood down from them.
 * Seeding from untrusted roots (rather than from every ancestor) keeps the taint
 * tight — it does not paint the entire repository red.
 */
export function computeTaint(graph: Graph): Set<NodeId> {
  // Seed from EVERY untrusted source in the graph, not only those ancestral to a
  // disputed node. A compromised source that a reviewer read as independent
  // evidence never touched the disputed artifact, yet its lineage must still be
  // excluded from the independence count. On the golden path issue-42 is the only
  // untrusted source, so this equals the old disputed-scoped result exactly.
  const untrustedRoots = graph.nodes
    .filter((n) => n.type === 'source' && n.origin === 'untrusted')
    .map((n) => n.id);

  const taint = new Set<NodeId>(untrustedRoots);
  for (const root of untrustedRoots) {
    for (const id of descendants(graph, root)) taint.add(id);
  }
  return taint;
}

/**
 * Provenance first, reviewer verdict second — the reviewer's `{verdict, ref}` is
 * never read here. A confirmation with no independent evidence does not count no
 * matter what it says, so no attacker-controlled byte can reach this decision.
 */
export function evaluate(
  graph: Graph,
  disputed: NodeId,
  confirmations: NodeId[],
  humanApproval?: { approvedBy: string },
): GateResult {
  const byId = nodeIndex(graph);
  const taint = computeTaint(graph);

  const traces: ConfirmationTrace[] = confirmations.map((id) => {
    const base = ancestors(graph, id);
    return { id, base, clean: base.filter((n) => !taint.has(n)) };
  });

  // Independent evidence means untainted SOURCE nodes — a trusted input that does
  // not descend from anything untrusted. Agent-states and messages are processing,
  // not evidence, so they never count toward independence on their own.
  const independent = new Set(
    traces.flatMap((t) => t.clean).filter((id) => byId.get(id)?.type === 'source'),
  );
  const independentSources = independent.size;
  const originalSources = [...taint].filter((id) => byId.get(id)?.type === 'source').length;

  // PASS is never reached automatically. A clean-but-irrelevant file can only ever
  // produce UNPROVEN: the gate detects the *absence* of independent evidence, it
  // does not judge the *quality* of evidence. That call belongs to a human.
  const verdict =
    independentSources === 0 ? 'REJECT' : humanApproval ? 'PASS' : 'UNPROVEN';

  return {
    verdict,
    disputed,
    taint: [...taint],
    confirmations: traces,
    independentSources,
    originalSources,
    receipt:
      verdict === 'PASS'
        ? { disputed, independentSources, approvedBy: humanApproval!.approvedBy }
        : null,
  };
}

/** A high-risk action needs a receipt. No receipt, no execution — that is the gate. */
export function canExecute(result: GateResult | null): { allowed: boolean; reason: string } {
  if (!result) return { allowed: false, reason: 'no gate result — action never verified' };
  if (!result.receipt) return { allowed: false, reason: `no valid receipt (${result.verdict})` };
  return { allowed: true, reason: `receipt for ${result.receipt.disputed}` };
}
