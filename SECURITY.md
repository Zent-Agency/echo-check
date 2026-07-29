# Security policy

EchoCheck is a security control. If it fails, it fails silently and the pipeline it guards
keeps deploying. We take reports seriously and we would rather hear about a suspected
weakness than not.

## Reporting a vulnerability

**Do not open a public issue for a security report.**

Use either channel:

- **GitHub private vulnerability reporting** (preferred): the "Report a vulnerability"
  button under the repository's Security tab. It gives us a private thread with you.
- **Email**: francisco@zent-agency.com with `[echocheck-security]` in the subject.

Please include the affected version or commit, what an attacker gains, and the smallest
reproduction you can manage. A failing test against `lib/echo/` is the ideal report.

What to expect:

| Stage | Target |
|---|---|
| Acknowledgement | 72 hours |
| Initial assessment | 7 days |
| Fix or documented mitigation | 90 days |

We will credit you in the release notes unless you ask us not to.

## What we consider a vulnerability

The gate makes one guarantee: **an action whose confirmations all descend from untrusted
roots cannot execute.** Anything that breaks that guarantee is in scope. Concretely:

- A graph shape that yields `independentSources > 0` when every confirmation does in fact
  trace back to an untrusted root. The sibling-artifact bug documented in
  `lib/echo/provenance.ts` is the canonical example: it does not crash, it just stops
  blocking.
- Any input that reaches the decision path. `evaluate()` must never read attacker
  controlled content. A way to influence a verdict through a reviewer's `verdict` or `ref`
  field, a filename, or a message body is a vulnerability.
- Any sequence of journal events that upgrades an origin from `untrusted` to `trusted`.
  Trust downgrades are meant to be monotone and one way.
- A path that escapes the sandbox in `sandboxPath()` (`agents/runtime.ts`).
- A `canExecute()` result of `allowed: true` without a valid receipt.

## What is already known and documented

These are design limits, not vulnerabilities. They are described in
[the threat model](README.md#threat-model-and-honest-limits):

- Receipts are not cryptographically signed yet. Forging one requires code execution
  inside the gate's process, and hardening this is on the roadmap.
- The gate over-approximates influence: reading a file counts as being influenced by it.
  This produces false positives, not false negatives.
- I/O performed outside the instrumented tool boundary is invisible to the gate.
- A trust policy that declares an attacker controlled path as `trusted` defeats the gate
  for that path. That is why downgrades are open to every participant.

Reports that amount to "the gate does not judge whether the evidence is any good" are
working as intended: that case produces `UNPROVEN` and routes to a human, on purpose.

## Intentional attack content in this repository

`agents/sandbox/` contains a real prompt injection payload (`issue-42.md`) and a simulated
credential compromise log (`access-anomalies.log`). They are demo fixtures and are meant to
be there. Automated scanners flag them; that is a false positive, not a compromised repo.
Every file operation during a recording is confined to `agents/sandbox/`, and `deploy_prod`
is mocked and never reaches anything external.

## Supported versions

The project is pre-1.0. Only `main` is supported, and fixes ship there.
