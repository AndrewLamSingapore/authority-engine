# Authority Engine independent audit ? 21 October 2026

Status: **PARTIALLY COMPLETE**. This is a candidate-source and bounded local qualification, not a production release receipt.

## Identity and actual scope

Canonical repository: https://github.com/AndrewLamSingapore/authority-engine. Baseline main: `77ca821cbbb3ace0b5db86bf22feabe4cbb2640f`, confirmed against remote main. Work is on `codex/sovereign-five-20261021-091215` in an isolated worktree; original main is preserved. Current canonical ORQEVIA governance references were read at `9703c9b5df92ba266acf56bfb19d85f3e10bc739` as dated observation references, never runtime prerequisites.

The actual product is Andrew Lam's public Operations Intelligence Evidence Hub, not a general authorization gateway. README.md, src/App.jsx and src/v2 establish public case studies, evidence grades, decision-framework exercises, project navigation, article reads and contact handoffs. The bounded server-side evidence review/draft adapter is an additional capability. Completion does not require inventing an enterprise policy product.

## Architecture and ownership

- React19.3.1/ReactDOM19.3.1, React Router7 and Vite8.3 frontend; Node22.x is the supported build/API engine. Portable Node22.23.3 was used without global installation changes.
- Tailwind3/PostCSS owns legacy styling; src/v2/v2.css owns the current public shell. No CSS/framework migration was attempted merely to erase an advisory count.
- Sanity owns published articles and optional authenticated evidence candidate/draft persistence. Public client content reads have fallback/retry states; write authority is server-only in api/_sanity.js and separate ingestion/review/publication credentials.
- Formspree is optional external inquiry delivery. Browser tests intercept delivery; no user message was sent.
- api/_authority-policy.js validates local vendored contracts, redacts private data, rejects recognized credential material, prohibits self-publication, quarantines immature evidence and requires explicit approval for unpublished drafts. Reviewer authorization and privacy revalidation remain separate gates.
- Optional ORQEVIA observation and portfolio relay use HTTP contracts. React/API files do not import another sovereign checkout. /jarvis routes redirect to /orqevia for compatibility; these URLs do not reinstate a retired runtime.
- Vercel owns hosting/functions/headers/SPA routing. GitHub Quality CI installs locked packages, checks syntax/contracts/lint/tests/build; the bounded experiment has an explicit correctness gate. Remote baseline Quality passed; candidate CI/deployment evidence is recorded separately in the portfolio ledger.

## Reproduced repairs

1. Credential-like text in payload strings bypassed the provenance-only text check and reached a draft. Nested arrays, bearer text, JSON credentials, query keys and URL userinfo now reject before storage and again at the legacy draft boundary.
2. Independent review reproduced camel-case, kebab-case, plural, percent-encoded and padded credential-field bypasses. Keys are segmented/normalized and edge separators trimmed. Text is checked raw and after safe decoding of two percent-encoding layers; a malformed unrelated escape cannot disable inspection.
3. Credential material in property names is replaced without returning it in event keys or diagnostic paths. Private identifier text is scrubbed consistently in payload/provenance; camel-case identifier fields are redacted. Ordinary security discussion and token_count remain permitted.
4. Vite8.3.0 was affected by current Windows launch-editor advisories. The compatible locked patch is8.3.4; the manifest floor now excludes known affected8.3.0?8.3.2.

Evidence files: authority-credential-before/after.log, authority-privacy-variants-before/after.log, authority-key-boundary-before/after.log. All contain synthetic markers, never real credentials. Pattern matching is not universal secret discovery; arbitrary unlabeled or differently encoded secrets and editorial free text still require appropriate review. No credentials were changed.

## Verification and practical limits

| Check | Classification | Evidence |
|---|---|---|
| Supported runtime and locked install | PASS | Node22.23.3; npm ci in isolated checkout |
| Original test baseline | PASS |47 existing tests |
| Final privacy boundary regression | PASS |28 targeted actual assessment/draft tests; prior failures retained |
| Complete candidate API/unit set | See final receipt | authority-final-test-authority.log |
| Lint, syntax, launcher/registry/contract checks | PASS | authority-*.log, final receipt records exact source |
| Production build | PASS | authority-build-final.log; existing Canvas install step required after initial ignore-scripts install |
| Public browser workflows and accessibility | PASS | authority-browser/results.json;49 checks, real Chromium, external services blocked; contact delivery intercepted |
| Runtime exceptions in tested browser flow | PASS | zero page exceptions |
| Optional peers unavailable | PASS, bounded | core routes, evidence/frameworks and contact failure UI work while external origins are blocked |
| Dependency advisory audit | FAIL, scoped | remaining five high dev-dependency findings descend from unpatched braces<=3.0.3 via Tailwind3; production-only audit recorded separately |
| Finite decision-table correctness | PASS, bounded |262144 encoded states plus48 production assessment fixtures; not a proof of general privacy/AI correctness |
| Real Sanity create/review/draft/publish round-trip | NOT TESTED | would change external data; synthetic policy tests are narrower |
| Actual contact receipt/provider acceptance | NOT TESTED | no message sent |
| Independent cloud deployment/rollback | NOT TESTED | no production deployment performed |
| Production load/security headers/backup restoration | NOT TESTED unless separately recorded | local build is not runtime/restore evidence |
| Cost, energy, physical devices and commercial rights | NOT TESTED | no billing/power/device/rights audit evidence acquired |

The local /api/health source reports configuration flags, including a ready observation adapter; it does not probe actual Sanity, relay, model or owner-runtime correctness. Do not treat its HTTP200 or configured flags as operational certification.

## Deterministic experiment and acceptance decision

experiments/deterministic-policy is isolated and has no production imports. An18-bit state table with two-bit outputs is exactly64KiB; this specific predicate actually needs seven bits (maturity plus four flags) and fits32bytes. Unknown/reserved states deny. Full schema validation, credential/PII traversal, reasons, storage, signatures and human authorization are outside the leaf lookup.

The suite records warmup, input hashes, checksums, rotated method order, P50/P95/P99 batch averages, variance, generation cost, CPU/memory/runtime metadata and source hashes. Separate direct/JSON/local IPC/HTTP measurements use equivalent synthetic authorized leaf envelopes and report real per-request latency. No cache-residency/counter, GPU or energy claim is made. No demonstrated full-policy bottleneck, meaningful application saving or maintenance justification supports production replacement. The optimization is **REJECTED for production adoption**; the reproducible experiment is retained.

## Independent operation and recovery

Use this repository alone and Node22: npm ci; npm run lint; npm run check:server; npm run check:orqevia; npm run check:agent-registry; npm run check:portfolio-contracts; npm run test:authority; npm run test:decision-kernel; npm run build. Canvas's existing install step is required for generated OpenGraph images. npm run preview serves the built static shell. Missing optional peers/content delivery must retain clear degraded/retry states.

An opt-in local browser script is scripts/conversion-browser-qa.mjs. Its normal contact tests are intercepted. The run-specific isolation wrapper blocked other external hosts, used locked Playwright1.58.2 browser binaries and preserved49 check results/screenshots. It did not submit data or touch the parked repository.

For release, review the task commits, pass required CI, create an isolated preview with approved environment references, test exact deployed revision and primary workflows, then obtain production release authorization. Preserve the previous approved deployment. Rollback application changes via reviewed revert/previous deployment, preserving candidate/draft data. Database/content-provider backup, restore permissions, RTO/RPO and actual restoration must be independently commissioned before commercial recovery certification.

## Remaining gates and commercial value

P1: release the validated privacy repair through authorized review/preview/production gates; verify real independent Sanity/auth/draft operation and rollback with approved fixtures. P2: qualify a Tailwind dependency migration or upstream braces patch with legacy-page visual parity; remaining development advisory is not proof that the static production bundle exposes a braces endpoint. P2: verify content/contact provider operation, restore ownership, uptime/error monitoring, asset rights and actual operating costs.

The evidence hub can independently support recruitment and consulting discovery; its framework and evidence navigation work locally without ORQEVIA. Revenue, conversion, support burden and willingness to pay remain unmeasured. Narrow privacy fixes and reproducible setup provide concrete engineering value; no speculative inference cost reduction is claimed.
