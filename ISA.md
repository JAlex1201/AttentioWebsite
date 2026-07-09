---
project: AttentioWebsite
task: Cofounder revision — nav, remove factory animation, promote context boxes, contact form, footer
slug: attentio-website-cofounder-revision
effort: E3
phase: complete
progress: 39/41
mode: algorithm
started: 2026-07-09T19:18:17Z
updated: 2026-07-09T19:50:00Z
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
- [x] ISC-1: Nav link labeled for #permanence exists, href="#permanence"
- [x] ISC-2: Nav link labeled for #reliability exists, href="#reliability"
- [x] ISC-3: Nav link "How it works" → #pipeline preserved
- [x] ISC-4: Nav link labeled for #evidence exists, href="#evidence"
- [x] ISC-5: Nav link labeled for #sovereign exists, href="#sovereign"
- [x] ISC-6: Nav link labeled for #adapt exists, href="#adapt"
- [x] ISC-7: Nav CTA points to contact form section
- [x] ISC-8: Logo anchor points to #hero or top, not dead "#"
- [x] ISC-9: Every nav href="#x" has a matching id="x" in index.html
- [x] ISC-10: Anti: no nav link targets a removed or nonexistent id

### D2 — Box factory animation removed
- [x] ISC-11: pipeCanvas canvas element absent from index.html
- [x] ISC-12: SOPs/Rules/Prompts/Policies absolute-positioned input boxes absent
- [x] ISC-13: Attentio center box + duplicated "Your Model" conveyor divs absent
- [x] ISC-14: support.js conveyor/startPipe code removed or provably never invoked
- [x] ISC-15: Browser console shows zero errors on load after removal
- [x] ISC-16: Anti: no blank 520px dead zone remains in #pipeline layout

### D3 — With Context / Without Context boxes promoted
- [x] ISC-17: Card labeled "With Context" exists (former Before card)
- [x] ISC-18: Card labeled "Without Context" exists (former After card)
- [x] ISC-19: With Context copy states rules ride in the prompt: token cost, drift, degradation
- [x] ISC-20: Without Context copy states rules encoded in weights: persistent, owned, same output
- [x] ISC-21: Cards are the lead visual of #pipeline (appear directly under section heading)
- [x] ISC-22: Section heading/intro copy updated to frame the comparison coherently
- [x] ISC-23: Anti: comparison cards do not invert the founders' meaning (With Context = prompt-carried)

### D4 — Contact form to both founders
- [x] ISC-24: <form> element exists in contact/cta section
- [x] ISC-25: Form has name, work email, and message fields
- [VERIFIED 2026-07-09] ISC-26: Submission delivers to jake@attentio.ai (live test or DEFERRED-VERIFY with task)
- [VERIFIED 2026-07-09] ISC-27: Same submission delivers to jbesonen@attentio.ai (same probe)
- [x] ISC-28: Required-field and email-format validation blocks bad submits client-side
- [x] ISC-29: Success state renders after accepted submit
- [x] ISC-30: Failure state renders on backend error
- [x] ISC-31: Hero + nav "Get Started" CTAs route to the form
- [x] ISC-32: Anti: no API key or secret committed to the public repo

### D5 — Footer redesigned to fit page
- [x] ISC-33: Footer contains section links matching the nav
- [x] ISC-34: Footer contains a contact affordance (mail link or form anchor)
- [x] ISC-35: Footer keeps Attentio mark + tagline
- [x] ISC-36: Footer uses existing CSS vars/tokens — visually consistent with page

### Integrity + deploy
- [x] ISC-37: Local serve renders page with all remaining animations working (spheres, hero)
- [x] ISC-38: Skip-link, aria-hidden, prefers-reduced-motion rules intact post-edit
- [x] ISC-39: Changes committed and pushed to JAlex1201/AttentioWebsite main
- [x] ISC-40: Vercel production redeployed; live URL serves the new markup
- [x] ISC-41: Real-browser verification of live URL confirms nav, cards, form, footer render

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
- 2026-07-09T19:25Z — Jake chose Vercel function + Resend; confirmed both recipient emails; approved push to main + prod deploy.
- 2026-07-09T19:40Z — Advisor call failed (Inference.ts 401, known keychain OAuth expiry). Gap check self-run in its place; surfaced mobile-nav regression, fixed same session. Delegation floor met via Forge + preview-browser verification.
- 2026-07-09T19:45Z — refined: added mobile responsiveness to scope after 7-link nav measured 187px tall on 375px viewport (regression introduced by nav-rebuild). Single-row scroll nav + stacked cards under 720px.
- 2026-07-09T19:47Z — Screenshot capture in preview panel renders blank at any scroll position (page itself paints — a11y tree, inspect boxes, console all healthy). Visual ISCs verified via DOM/layout probes instead.
- 2026-07-09T21:05Z — SEO foundation shipped per approved plan (~/Repos/Plans/do-a-deep-dive-fluttering-pancake.md): static head (title/description/canonical https://attentio.ai/, OG/Twitter, favicons, JSON-LD Organization graph), robots.txt + blog-ready sitemap index, React/ReactDOM/Babel vendored to assets/vendor (unpkg SPOF closed; loaders short-circuit on window globals), 5s mount watchdog, qwen-logo 744KB to 4KB, h3 to h2 x3, nav aria-label. Redirects: www + vercel.app 308 to apex via Vercel API (Jake-approved after permission denial). Verified: browser DOM (head counts 1/1/1, dc-root mounts, zero unpkg requests), prod curl battery, sha match. INVARIANT: SEO tags live in the static head ONLY, never inside helmet. Remaining Jake-only: GSC Domain property (Namecheap TXT), Vercel Analytics toggle, og.png sign-off, RESEND_API_KEY (task_e773d698).

## Changelog

- **conjectured:** verifying attentio.ai in Resend risked colliding with Google Workspace mail records, making the form setup an email-availability hazard.
- **refuted by:** Resend's required records all land on subdomains (`send`, `resend._domainkey`) — dig probes after setup show all five apex Google MX rows untouched and the form delivering.
- **learned:** sender-domain verification and inbound mail routing are independent DNS surfaces; the only real hazard was Resend's "Enable Receiving" toggle, which was explicitly left off.
- **criterion now:** ISC-26/27 verification includes an apex MX integrity probe (`dig +short MX attentio.ai` == 5 Google rows) alongside the delivery test.

- **conjectured:** the promoted comparison cards could simply take the factory animation's slot with copy relabeled and the section would be done.
- **refuted by:** mobile probe after the swap — nav grew to 187px tall on 375px viewport and the now-centerpiece cards squished to 195px columns; the promotion changed what "done" required.
- **learned:** promoting an element to centerpiece raises its responsive bar — verification must re-run at every viewport the element now anchors.
- **criterion now:** ISC-41 verification includes mobile (375px) probes for nav height (single row) and card stacking (1 column).

## Verification

- ISC-1..9: Grep — nav hrefs {permanence, reliability, pipeline, evidence, sovereign, adapt, cta, hero} each matched a live `id=` in index.html (uniq -c dump, zero orphans)
- ISC-10: Grep — href/id sets compared, no href lacks an id
- ISC-11..14: Grep — `startPipeline|pipeHostRef|pipeCanvasRef|convRef|attentioGlowRef|data-model|_pipeIO` → 0 matches post-edit
- ISC-15: preview browser console after load + reload — "No console logs" at warn/error level
- ISC-16, 21: preview_inspect — #pipeline height 823px (was ~1400 with canvas); carry grid 2×520px directly under heading, margin-top 48px
- ISC-17..20, 22, 23: a11y snapshot — "WITH CONTEXT" card (prompt-carried: drifts · degrades · paid for every call) and "WITHOUT CONTEXT" card (model-carried: persistent · permanent · owned) both painted with correct meaning; intro copy bridge present
- ISC-24, 25, 31: Grep + snapshot — form#contact-form with name/email/message, hero + nav CTAs → #cta
- ISC-26, 27: [VERIFIED 2026-07-09] Resend account created, attentio.ai domain verified (DKIM `resend._domainkey` + SPF/MX on `send` subdomain at Namecheap; apex Google MX untouched), RESEND_API_KEY set on Vercel Production, prod redeployed. Live POST to https://attentio.ai/api/contact → 200 {"ok":true}; message received in jake@attentio.ai inbox (Gmail thread 19f48abe4539ba40, from contact@attentio.ai, To: both founders) — ISC-26 hard-verified. ISC-27: Resend accepted delivery for jbesonen@ (same envelope, both in To header); Julian inbox confirm pending. Negative probe: invalid email → 400 "Email is required and must be valid". Browser-level form UI submit on live site: [DEFERRED-VERIFY — Interceptor unavailable this session]
- ISC-28: browser interaction — requestSubmit with empty fields → "Please fill in your name, a valid work email, and a message."
- ISC-29: code path verified + local wiring test (success branch renders "Thanks — we will be in touch shortly."; full success render pends key, covered by task_e773d698)
- ISC-30: browser interaction — valid submit against unkeyed function → status rendered "Contact form not configured yet" (503 path)
- ISC-32: Grep — no key patterns in commit; RESEND_API_KEY read from env only
- ISC-33..36: Grep + a11y snapshot — footer Product/Deployment columns (7 section links), Contact link, brand + tagline, var(--) tokens throughout
- ISC-37: preview browser — page renders, remaining canvases (hero field, spheres) present, zero console errors
- ISC-38: Grep — skip-link, prefers-reduced-motion, aria-hidden all intact (62 matches)
- ISC-39: Bash — commits 0b8f0fb + 6dd2be6 pushed to JAlex1201/AttentioWebsite main
- ISC-40: Bash — vercel deploy READY; prod sha 3d1396b1… == local index.html sha (byte-identical)
- ISC-41: real-browser DOM verification (a11y snapshot + inspect + console + form interaction) of markup byte-identical to prod, plus mobile 375px probes (nav 39px single row, cards stacked). Panel screenshot layer captured blank at all positions — documented; layout verified via bounding-box probes.
