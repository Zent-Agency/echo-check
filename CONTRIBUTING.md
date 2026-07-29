# Contributing

Thanks for looking. EchoCheck is a security control, so the bar for changes to the gate
itself is higher than the bar for changes to the landing page. This document is about that
difference.

> **Note:** `agents/sandbox/CONTRIBUTING.md` is not this file. It is a fixture for the
> recorded demo: the trusted document that predates `issue-42.md`. Ignore its rules, they
> are props.

## What we are looking for

Most wanted, in order:

1. **A test that breaks the gate.** A journal and a trust policy where `evaluate()` returns
   a verdict it should not. This is the single most valuable contribution to the project.
   If it reveals an exploitable weakness rather than a rough edge, send it privately first
   (see [Security](#security) below).
2. **Adapters** that capture an `IoEvent` journal from a real agent framework without
   hand-wiring the tool layer. Item 3 on the roadmap.
3. **Threat model gaps.** Cases where observed I/O does not capture real influence.
4. Documentation, translations, and demo fixes.

What is likely to be declined:

- **Runtime dependencies in `lib/echo/`.** The gate has zero of them on purpose: that is
  what lets it be embedded in an execution channel instead of run as a service. A change
  that adds one needs to argue why in an issue first.
- **Reading content in the decision path.** `evaluate()` must never see attacker
  controlled bytes. Heuristics, scoring, and model calls in the verdict path defeat the
  whole design. See "the non-injectable property" in the README.
- **Making `PASS` automatic.** The asymmetry is deliberate: independent evidence plus a
  named human, or it is not a `PASS`.

If you are planning something substantial in `lib/echo/`, open an issue before writing
code. It is a small module and design changes there are load bearing.

## The one hard rule

**Any change to `lib/echo/` comes with a test.**

Not policy for its own sake. A bug in this module does not throw and does not crash the
demo: it just quietly stops blocking. `computeTaint()` documents the canonical case, where
using `descendants(disputed)` instead of flooding down from untrusted roots makes a sibling
artifact look like clean evidence. Everything still runs. The gate simply approves the
attack. That class of failure is invisible without a test.

Look at `lib/echo/provenance.test.ts` for the shape. A good test states the property in its
name, not the mechanics.

## Getting set up

See [Running it](README.md#running-it) in the README. Short version:

```bash
npm install
npm test        # node --test lib/echo/*.test.ts
npm run dev     # landing on 127.0.0.1:3100, demo at /demo
```

You do not need an API key to work on the gate, the app, or the demo: `agents/recording.json`
is committed and the UI replays it. A `DEEPSEEK_API_KEY` is only needed to re-record with
`npm run record`.

Requires Node 22.6+ with `--experimental-strip-types`, or Node 24, where native TypeScript
type stripping is on by default.

## Sending a change

1. Fork, then branch: `feat/<slug>`, `fix/<slug>`, or `docs/<slug>`.
2. Make the change. Run `npm test`.
3. Commit with [Conventional Commits](https://www.conventionalcommits.org): `feat:`,
   `fix:`, `docs:`, `chore:`, `ci:`. One logical change per commit.
4. **Sign off your commits** (see below).
5. Open a pull request explaining what breaks if the change is wrong. For a change to the
   gate, say which test would catch a regression.

Two notes on CI. The deploy workflow does not run on pull requests, so nothing you send can
reach production or read a secret. And the first workflow run from a new contributor needs
a maintainer to approve it, which is a GitHub default, not a comment on your patch.

## Sign your commits (DCO)

This project uses the [Developer Certificate of Origin](https://developercertificate.org).
It is a statement that you have the right to contribute the code you are sending. It is not
a copyright assignment: your work stays yours, licensed to the project under Apache-2.0.

Add a sign-off line to every commit:

```bash
git commit -s -m "fix: taint flood misses a sibling artifact"
```

That appends:

```
Signed-off-by: Your Name <your.email@example.com>
```

Forgot on the last commit: `git commit --amend -s --no-edit`. On several:
`git rebase --signoff HEAD~3`.

## Security

Do not open a public issue for a vulnerability. See [SECURITY.md](SECURITY.md) for the
private reporting channel and for what counts as a vulnerability rather than a documented
limit.

## Code of conduct

Participation is covered by the [Code of Conduct](CODE_OF_CONDUCT.md).

## License

By contributing you agree that your work is licensed under
[Apache License 2.0](LICENSE), the project's license.
