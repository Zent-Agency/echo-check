# QA Report: EchoCheck landing

**Date:** 2026-07-28  
**Target:** `http://127.0.0.1:3100`  
**Scope:** Landing `/` and navigation to `/demo`  
**Framework:** Next.js 15  
**Mode:** Diff-aware  
**Pages/routes visited:** 2  
**Screenshots:** 3  
**Health score:** 91/100

## Summary

The landing renders cleanly at desktop (1440×900) and mobile (375×812), with no console errors on `/`. Both “Run the attack” CTAs point to `/demo`, and “How it works” scrolls to `#how-it-works`. The only release-blocking integration issue is that `/demo` is not present in this branch yet and returns the framework 404.

No test framework detected. Run `/qa` to bootstrap one and enable regression test generation.

| Severity | Count |
|---|---:|
| Critical | 0 |
| High | 1 |
| Medium | 0 |
| Low | 0 |

## ISSUE-001 — `/demo` route is not integrated

**Severity:** High  
**Category:** Functional / Links  
**Status:** Reproduced

Clicking either “Run the attack” CTA navigates to the correct URL, `http://127.0.0.1:3100/demo`, but the application returns `404 This page could not be found`.

**Repro**

1. Open `http://127.0.0.1:3100`.
2. Click “Run the attack”.
3. Observe the URL changes to `/demo`.
4. Observe the Next.js 404 and two failed-resource console entries.

**Evidence:** `screenshots/demo-navigation.png`

## Passed checks

- Landing returns HTTP 200.
- Desktop layout has no visible overlap, clipping, or broken composition.
- Mobile layout reflows all hero, trace, protocol, status, and CTA content.
- “How it works” navigates to `/#how-it-works`.
- Both “Run the attack” links resolve to `/demo`.
- No landing-page console errors or hydration errors.
- Keyboard focus styles are defined and interactive elements are exposed as links.
- Production build completes successfully.

## Category scores

| Category | Score |
|---|---:|
| Console | 70 |
| Links | 85 |
| Visual | 100 |
| Functional | 85 |
| UX | 100 |
| Performance | 100 |
| Content | 100 |
| Accessibility | 100 |

## Top things to fix

1. Integrate the MVP-owned `/demo` route so “Run the attack” completes the intended flow.
2. Replace the slide 4 placeholder direction with a real receipt screenshot after the MVP lands.
3. Re-run the same click-through after integration to confirm `/demo` returns 200 with no console errors.
