import assert from 'node:assert/strict';
import { test } from 'node:test';

import { graphFromJournal, toolCalls, undeclaredInputs, type Journal } from './observed.ts';
import { canExecute, computeTaint, evaluate } from './provenance.ts';

/** The I/O a real run of the four agents produces. Nothing here is a verdict. */
const journal: Journal = {
  origins: { 'issue-42.md': 'untrusted', 'CONTRIBUTING.md': 'trusted' },
  events: [
    { op: 'read', agent: 'release-agent', path: 'issue-42.md' },
    { op: 'write', agent: 'release-agent', path: 'release-summary.md' },
    { op: 'write', agent: 'release-agent', path: 'generated-changelog.md' },
    { op: 'read', agent: 'reviewer-a', path: 'release-summary.md' },
    { op: 'emit', agent: 'reviewer-a', id: 'msg-approve-a' },
    { op: 'read', agent: 'reviewer-b', path: 'generated-changelog.md' },
    { op: 'emit', agent: 'reviewer-b', id: 'msg-approve-b' },
    { op: 'consume', agent: 'deploy-agent', id: 'msg-approve-a' },
    { op: 'consume', agent: 'deploy-agent', id: 'msg-approve-b' },
  ],
};

test('observed I/O rebuilds the golden path graph, no fixture involved', () => {
  const graph = graphFromJournal(journal);
  assert.deepEqual(graph.edges, [
    ['issue-42.md', 'release-agent@t1'],
    ['release-agent@t1', 'release-summary.md'],
    ['release-agent@t1', 'generated-changelog.md'],
    ['release-summary.md', 'reviewer-a@t1'],
    ['reviewer-a@t1', 'msg-approve-a'],
    ['generated-changelog.md', 'reviewer-b@t1'],
    ['reviewer-b@t1', 'msg-approve-b'],
    ['msg-approve-a', 'deploy-agent@t1'],
    ['msg-approve-b', 'deploy-agent@t1'],
  ]);
});

test('a file the agent wrote is derived, not a source', () => {
  const byId = new Map(graphFromJournal(journal).nodes.map((n) => [n.id, n]));
  assert.deepEqual(byId.get('issue-42.md'), {
    id: 'issue-42.md',
    type: 'source',
    origin: 'untrusted',
  });
  assert.equal(byId.get('release-summary.md')?.type, 'artifact');
  assert.equal(byId.get('release-summary.md')?.origin, 'derived');
  assert.equal(byId.get('release-summary.md')?.writer, 'release-agent');
});

test('the gate reaches REJECT on the observed graph, unchanged', () => {
  const graph = graphFromJournal(journal);
  const taint = computeTaint(graph, 'release-summary.md');
  assert.ok(taint.has('generated-changelog.md'), 'sibling artifact must be tainted');

  const result = evaluate(graph, 'release-summary.md', ['msg-approve-a', 'msg-approve-b']);
  assert.equal(result.independentSources, 0);
  assert.equal(result.verdict, 'REJECT');
  assert.equal(canExecute(result).allowed, false);
});

test('reading a trusted file adds independent evidence, still only UNPROVEN', () => {
  const graph = graphFromJournal({
    ...journal,
    events: [
      ...journal.events,
      { op: 'read', agent: 'reviewer-b', path: 'CONTRIBUTING.md' },
    ],
  });
  const result = evaluate(graph, 'release-summary.md', ['msg-approve-a', 'msg-approve-b']);
  assert.equal(result.independentSources, 1);
  assert.equal(result.verdict, 'UNPROVEN');
  assert.equal(canExecute(result).allowed, false);
});

test('an input nobody declared fails closed as untrusted', () => {
  const stray: Journal = {
    origins: {},
    events: [{ op: 'read', agent: 'reviewer-a', path: 'scratch/notes.md' }],
  };
  assert.deepEqual(undeclaredInputs(stray), ['scratch/notes.md']);
  const node = graphFromJournal(stray).nodes.find((n) => n.id === 'scratch/notes.md');
  assert.equal(node?.origin, 'untrusted');
});

test('tool calls are counted but move no data', () => {
  const withVerify: Journal = {
    ...journal,
    events: [...journal.events, { op: 'call', agent: 'deploy-agent', tool: 'verify' }],
  };
  assert.equal(toolCalls(withVerify, 'verify').length, 1);
  assert.equal(graphFromJournal(withVerify).edges.length, graphFromJournal(journal).edges.length);
});
