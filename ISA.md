---
project: AttentioWebsite
task: Cofounder revision — nav, remove factory animation, promote context boxes, contact form, footer
slug: attentio-website-cofounder-revision
effort: E3
phase: execute
progress: 36/41
mode: algorithm
started: 2026-07-09T19:18:17Z
updated: 2026-07-09T19:18:17Z
---

# ISA — AttentioWebsite

## Problem

The live landing page has a nav with only one section link ("How it works") while the page has seven content sections — visitors can't navigate to what exists. The #pipeline section leads with a conveyor-belt "box factory" canvas animation the founders no longer want, while the strongest sales asset on the page — the Before/After comparison of prompt-carried vs weight-carried rules — sits below it, unlabeled as the "With Context / Without Context" framing the founders use. There is no way for a prospect to contact the company: both "Get Started" CTAs dead-end (`href="#"` or scroll to a section with no form). The footer is a bare logo + copyright line that reflects none of the page's structure.

## Vision

Julian opens the deployed URL and every header in the nav lands him exactly on the section it names. The factory animation is gone; in its place the With Context / Without Context comparison is the centerpiece of the story and reads like the pitch he gives in meetings. A prospect fills the form and both founders find the inquiry in their inbox. The footer looks like the end of a real company's page.

## Out of Scope

Full visual redesign of the site (colors, typography, hero, spheres stay). New sections beyond the form. CMS or framework migration — the hand-rolled support.js runtime stays. Analytics, cookie banners, SEO overhaul. Custom domain wiring (separate task).

## Constraints

- Static site: `index.html` + `support.js` + `assets/` — no build step introduced.
- support.js template runtime (`ref="{{ x }}"` bindings) must keep working; removed refs must not throw.
- Form backend must not commit secrets to the public repo.
- Existing remaining animations (hero field, spheres, evidence cards) untouched.
- `prefers-reduced-motion`, skip-link, aria attributes preserved.
- Repo is shared with Julian (push access confirmed) — commits must be clean and pushed to `main`.
- Deploy target: existing Vercel project `attentio-website` (team attentio).

## Goal

The deployed site has a nav whose headers match and anchor to every real content section, no factory animation, the With Context / Without Context comparison promoted as the #pipeline centerpiece with founder-accurate copy, a working contact form that delivers to jake@attentio.ai and jbesonen@attentio.ai, and a footer that reflects the page — verified in a real browser on the production URL.

## Criteria

### D1 — Nav headers match content, go to right spots
- [ ] ISC-1: Nav link labeled for #permanence exists, href="#permanence"
- [ ] ISC-2: Nav link labeled for #reliability exists, href="#reliability"
- [ ] ISC-3: Nav link "How it works" → #pipeline preserved
- [ ] ISC-4: Nav link labeled for #evidence exists, href="#evidence"
- [ ] ISC-5: Nav link labeled for #sovereign exists, href="#sovereign"
- [ ] ISC-6: Nav link labeled for #adapt exists, href="#adapt"
- [ ] ISC-7: Nav CTA points to contact form section
- [ ] ISC-8: Logo anchor points to #hero or top, not dead "#"
- [ ] ISC-9: Every nav href="#x" has a matching id="x" in index.html
- [ ] ISC-10: Anti: no nav link targets a removed or nonexistent id

### D2 — Box factory animation removed
- [ ] ISC-11: pipeCanvas canvas element absent from index.html
- [ ] ISC-12: SOPs/Rules/Prompts/Policies absolute-positioned input boxes absent
- [ ] ISC-13: Attentio center box + duplicated "Your Model" conveyor divs absent
- [ ] ISC-14: support.js conveyor/startPipe code removed or provably never invoked
- [ ] ISC-15: Browser console shows zero errors on load after removal
- [ ] ISC-16: Anti: no blank 520px dead zone remains in #pipeline layout

### D3 — With Context / Without Context boxes promoted
- [ ] ISC-17: Card labeled "With Context" exists (former Before card)
- [ ] ISC-18: Card labeled "Without Context" exists (former After card)
- [ ] ISC-19: With Context copy states rules ride in the prompt: token cost, drift, degradation
- [ ] ISC-20: Without Context copy states rules encoded in weights: persistent, owned, same output
- [ ] ISC-21: Cards are the lead visual of #pipeline (appear directly under section heading)
- [ ] ISC-22: Section heading/intro copy updated to frame the comparison coherently
- [ ] ISC-23: Anti: comparison cards do not invert the founders' meaning (With Context = prompt-carried)

### D4 — Contact form to both founders
- [ ] ISC-24: <form> element exists in contact/cta section
- [ ] ISC-25: Form has name, work email, and message fields
- [ ] ISC-26: Submission delivers to jake@attentio.ai (live test or DEFERRED-VERIFY with task)
- [ ] ISC-27: Same submission delivers to jbesonen@attentio.ai (same probe)
- [ ] ISC-28: Required-field and email-format validation blocks bad submits client-side
- [ ] ISC-29: Success state renders after accepted submit
- [ ] ISC-30: Failure state renders on backend error
- [ ] ISC-31: Hero + nav "Get Started" CTAs route to the form
- [ ] ISC-32: Anti: no API key or secret committed to the public repo

### D5 — Footer redesigned to fit page
- [ ] ISC-33: Footer contains section links matching the nav
- [ ] ISC-34: Footer contains a contact affordance (mail link or form anchor)
- [ ] ISC-35: Footer keeps Attentio mark + tagline
- [ ] ISC-36: Footer uses existing CSS vars/tokens — visually consistent with page

### Integrity + deploy
- [ ] ISC-37: Local serve renders page with all remaining animations working (spheres, hero)
- [ ] ISC-38: Skip-link, aria-hidden, prefers-reduced-motion rules intact post-edit
- [ ] ISC-39: Changes committed and pushed to JAlex1201/AttentioWebsite main
- [ ] ISC-40: Vercel production redeployed; live URL serves the new markup
- [ ] ISC-41: Real-browser verification of live URL confirms nav, cards, form, footer render

## Test Strategy

| isc | type | check | threshold | tool |
|-----|------|-------|-----------|------|
| 1–10 | static | grep nav hrefs vs section ids | exact match set | Grep |
| 11–14 | static | grep removed markers absent | zero matches | Grep |
| 15, 37 | runtime | console errors on load | 0 errors | browser console read |
| 16, 21 | visual | screenshot of #pipeline | cards lead, no dead zone | browser screenshot |
| 17–23 | static+visual | grep labels + screenshot copy | labels present, meaning correct | Grep + screenshot |
| 24–25, 31 | static | grep form/fields/hrefs | present | Grep |
| 26–27 | live | submit test message | mail received or DEFERRED-VERIFY | form submit + founder inbox |
| 28–30 | runtime | submit invalid/valid/forced-fail | states render | browser interaction |
| 32 | static | grep for key patterns in repo | zero secrets | Grep |
| 33–36 | static+visual | grep footer + screenshot | present, consistent | Grep + screenshot |
| 38 | static | grep a11y attrs | intact | Grep |
| 39 | vcs | git log + push output | pushed to main | Bash |
| 40–41 | live | prod URL fetch + browser check | new markup live | curl + browser |

## Features

| name | description | satisfies | depends_on | parallelizable |
|------|-------------|-----------|------------|----------------|
| nav-rebuild | Derive nav from real sections, fix logo/CTA anchors | ISC-1..10 | — | yes |
| factory-removal | Strip conveyor canvas + boxes from html and support.js | ISC-11..16 | — | yes |
| context-promotion | Relabel/rewrite/move Before-After cards to section lead | ISC-17..23 | factory-removal | no |
| form-frontend | Form markup, validation, states, CTA routing | ISC-24,25,28..31 | backend-choice | yes |
| form-backend | Email delivery path for both founders | ISC-26,27,32 | Jake's backend decision | yes (Forge) |
| footer-redesign | Section links, contact, brand, tokens | ISC-33..36 | nav-rebuild | yes |
| deploy-verify | Commit, push, Vercel prod, browser proof | ISC-37..41 | all above | no |

## Decisions

- 2026-07-09T19:18Z — Effort E3 via classifier fail-safe (router 401); matches multi-file substantial profile. effort_source: classifier.
- 2026-07-09T19:18Z — Cofounder identified as Julian Besonen (jbesonen@attentio.ai) from git authors; form recipient pending Jake's confirmation.
- 2026-07-09T19:18Z — "Box factory" mapped to #pipeline conveyor canvas (support.js belt/conveyor code); "With/Without Context boxes" mapped to Before/After cards at index.html:156-202. Meaning: With Context = prompt carries rules (Before), Without Context = weights carry rules (After).
- 2026-07-09T19:18Z — Form backend choice (Vercel function+Resend / Formspree / Web3Forms / mailto) is Jake's call — external service, account/key required. Blocking D4.
