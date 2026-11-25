# Phases 5–7 — Technical insights, contact and quality assurance

## Phase 5
Four technical learning notes, a static insights index, homepage previews, article metadata, table of contents and links to exact source-project revisions. Topics: POS checkout reliability, service-oriented architecture, financial history and responsible AI-assisted engineering. General recommendations and proposed AI workflows are not misrepresented as deployed features.

## Phase 6
Contact composer uses native field validation and additional trimmed-input checks, fixed inquiry topics, bounded text, URI encoding and an explicit mailto action or clipboard copy. No server-side email delivery or storage is implemented; the visitor sends the draft in their email client. No real message was sent during QA.
Vercel Web Analytics 2.0.1 and Speed Insights 2.1.0 are integrated through a lazy-loaded client module. Production-only feature gate NEXT_PUBLIC_ENABLE_ANALYTICS=1, explicit opt-in default off, withdrawal, query/hash removal and consent recheck before sending. No custom events containing contact fields. Privacy page documents local preferences and external providers. Preview measurement disabled. Live collection remains OFF: enabling provider services in the Vercel dashboard and setting the production flag are launch acceptance steps. Do not upgrade plans or purchase services without owner approval.
Official configuration references:
- https://vercel.com/docs/analytics/quickstart
- https://vercel.com/docs/speed-insights/quickstart

## Phase 7
Added route metadata/canonical URLs, production sitemap and robots rules, preview noindex, security headers (nosniff, frame denial, referrer policy, permissions policy and baseline CSP restricting embedding, objects, base and form actions). This is baseline hardening, not a comprehensive CSP or penetration test.
Disabled automatic internal navigation prefetch after a WebKit smoke check exposed an intermittent RSC request error. Revalidated all regressions and expanded smoke checks.
Final lint, build and TypeScript: passed. 34/34 Chromium Playwright tests passed. Expanded Chromium, Firefox and WebKit smoke tests passed, covering homepage, six project routes, four article routes, insight index, privacy, contact, layout and prior interactions. Automated Axe checks passed on tested states; not formal WCAG conformance. Production npm audit: zero reported vulnerabilities. Unknown project/article routes return 404.
Local production-mode test used a fictional hostname and intercepted telemetry scripts. Verified indexing, 13 sitemap URLs, analytics opt-in and withdrawal. This does not establish live provider ingestion.
Lighthouse 13.6.0, local production build with preview indexing policy: final mobile homepage performance 96, accessibility 100, best practices 100, SEO 69; LCP 2.5 s, TBT 130 ms, CLS 0.003. Prior prefetch-fix baseline was 93/100/100/69. Representative article prefetch-fix build scored 100/100/100/66. Scores are single-run lab measurements, not field Core Web Vitals. Preview noindex deliberately limits SEO.
No physical-device acceptance, independent accessibility certification, live analytics ingestion, email delivery test or zero-bug guarantee. These limitations remain explicit. Phase 4 CV work is outside this scope.

## Reproduce
npm ci
npx playwright install chromium firefox webkit
npm run check:release
For production-mode simulation only:
VERCEL_ENV=production VERCEL_PROJECT_PRODUCTION_URL=portfolio.example.test NEXT_PUBLIC_ENABLE_ANALYTICS=1 npm run build
node scripts/check-production-mode.mjs
npm run build
Run Lighthouse 13.6.0 against the local production build separately from browser tests.

## Release
portfolio/v2 preview branch only. Existing media, main, production deployment and source-project data untouched. Phase 8 must verify final production hostname, analytics plan and provider configuration, live delivery if a server-side form is required, real-device acceptance and post-deployment smoke checks.
