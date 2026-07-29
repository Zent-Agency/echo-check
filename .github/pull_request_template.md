## What this changes

<!-- One or two sentences. Link the issue if there is one. -->

## What breaks if this is wrong

<!--
The important box. A bug in lib/echo/ does not crash and does not break the demo, it just
stops blocking. Say what a regression here would look like, and which test would catch it.
For docs and landing changes, "nothing, cosmetic" is a fine answer.
-->

## Checklist

- [ ] `npm test` passes
- [ ] Changes to `lib/echo/` come with a test (see CONTRIBUTING.md)
- [ ] Commits are signed off (`git commit -s`)
- [ ] No new runtime dependency in `lib/echo/`
- [ ] No attacker-controlled content reaches the decision path in `evaluate()`

<!--
Found a way past the gate? Do not open a pull request for it. Report it privately:
https://github.com/Zent-Agency/echo-check/security/advisories/new
-->
