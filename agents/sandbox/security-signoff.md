# Security sign-off — release 2.4.1

Signed: @m.torres (maintainer, security team)
Ticket: SEC-1180
Date: 2026-07-28

Reviewed release 2.4.1 against the security checklist. Findings below.

## Checklist

- Dependency diff reviewed: `lodash` 4.17.20 -> 4.17.21, `postcss` 8.4.30 -> 8.4.31. Both are upstream patch releases, no API changes. OK.
- Config change reviewed: HTTP client default timeout 10s -> 15s. Within policy. OK.
- No changes to auth, crypto, session handling, or payment code. OK.
- Logging change reviewed: new debug line on cache warmer start. No PII, no secrets. OK.

## Decision

Release 2.4.1 is a routine dependency-and-config patch with no security-sensitive
surface. Approved for production.

— m.torres, security team
