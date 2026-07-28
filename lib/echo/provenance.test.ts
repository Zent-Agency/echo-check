import assert from 'node:assert/strict';
import { test } from 'node:test';

import { CONFIRMATIONS, DISPUTED, buildGraph } from './graph.ts';
import { canExecute, computeTaint, evaluate } from './provenance.ts';

const graph = buildGraph();

test('taint includes the sibling artifact (the naive descendants() bug)', () => {
  const taint = computeTaint(graph, DISPUTED);
  // generated-changelog.md is a sibling of the disputed node, not a descendant.
  // If this fails, the demo silently reports independent_sources = 1 and never blocks.
  assert.ok(taint.has('generated-changelog.md'));
  assert.ok(taint.has('issue-42'));
  assert.ok(taint.has('reviewer-b@t1'));
  assert.ok(taint.has('msg-approve-b'));
  assert.ok(!taint.has('CONTRIBUTING.md'));
});

test('golden path: two confirmations, zero independent evidence, REJECT', () => {
  const result = evaluate(graph, DISPUTED, CONFIRMATIONS);
  assert.equal(result.confirmations.length, 2);
  assert.equal(result.originalSources, 1);
  assert.equal(result.independentSources, 0);
  assert.equal(result.verdict, 'REJECT');
  assert.equal(result.receipt, null);
});

test('an action without a valid receipt is refused', () => {
  assert.equal(canExecute(evaluate(graph, DISPUTED, CONFIRMATIONS)).allowed, false);
  assert.equal(canExecute(null).allowed, false);
});

test('a clean but irrelevant source yields UNPROVEN, never PASS', () => {
  const withContributing = buildGraph({ reviewerBReadsContributing: true });
  const result = evaluate(withContributing, DISPUTED, CONFIRMATIONS);
  assert.deepEqual(
    result.confirmations.find((c) => c.id === 'msg-approve-b')?.clean,
    ['CONTRIBUTING.md'],
  );
  assert.equal(result.independentSources, 1);
  assert.equal(result.verdict, 'UNPROVEN');
  assert.equal(result.receipt, null);
  assert.equal(canExecute(result).allowed, false); // deploy stays blocked
});

test('PASS requires an explicit human approval and issues a receipt', () => {
  const withContributing = buildGraph({ reviewerBReadsContributing: true });
  const result = evaluate(withContributing, DISPUTED, CONFIRMATIONS, { approvedBy: 'maintainer' });
  assert.equal(result.verdict, 'PASS');
  assert.equal(result.receipt?.approvedBy, 'maintainer');
  assert.equal(canExecute(result).allowed, true);
});

test('provenance outranks the reviewer verdict: zero evidence still REJECTs', () => {
  // Reviewers could have said `unsafe` — evaluate() never reads their response at all.
  const result = evaluate(graph, DISPUTED, CONFIRMATIONS, { approvedBy: 'maintainer' });
  assert.equal(result.verdict, 'REJECT');
  assert.equal(result.receipt, null);
});
