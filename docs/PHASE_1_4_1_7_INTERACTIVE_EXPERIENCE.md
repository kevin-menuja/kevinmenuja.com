# Phase 1.4–1.7 — Interactive experience and quality assurance

## Features
- Living portrait: pointer-responsive translation and lighting, original approved photo unchanged, optional browser/device speech synthesis and transcript. No generated facial movement, lip-sync or voice cloning; narration availability depends on device/browser.
- Engineering Lab: two deterministic four-role workflow scenarios, run/pause/manual step/reset and progress. Explicit simulation, not live agents. The terminal uses a fixed command allowlist with bounded history; no shell, eval, API execution or production side effects.
- Project evidence: six case studies, twelve real application views (six existing and six additional source-derived views). Full-screen native dialog, keyboard navigation, focus restoration, image captions and three-layer interactive architecture overviews. Overview diagrams are conceptual, not exhaustive deployment topologies.
- Performance: motion defaults off for coarse-pointer and smaller devices; user choice persists and OS reduced motion takes precedence. GSAP, Lenis and 3D remain lazy-loaded. 3D respects global motion preference. Motion fallback keeps native scrolling available. Images are local WebP. Main document is not animated as one large composited layer.

## Asset provenance
Additional screenshots:
- Rice & Kottu Hut POS: docs/portfolio/pos-mobile.jpg, synthetic demonstration.
- ServiceOps: frontend/public/previews/inventory-light.webp and history-light.webp, existing demo previews.
- NWSDB: assets/screenshots/staff-operations.png, already-redacted report evidence.
- PrintXpress: docs/screenshots/product-catalogue.png and product-search.png, original coursework evidence.
All are from the corresponding published repository main branch. Reviewed visually; converted to WebP, no fabricated UI.

## Validation
- Final lint, typecheck, production build and all 26 Chromium Playwright tests passed.
- Additional Chromium, Firefox and WebKit smoke checks passed on the feature-complete build before the final mobile motion-default optimization. The final optimization was regression-tested in Chromium.
- Automated Axe scans passed for the homepage, representative project page, expanded interactive homepage and open screenshot modal; this is not a full WCAG certification.
- Production npm audit: zero reported vulnerabilities at test time.
- Local Lighthouse 13.6.0 mobile audit: baseline 55 performance / 100 accessibility / 100 best practices / 63 SEO. After optimization: 79 / 100 / 100 / 63. LCP 3.6 s, TBT 460 ms (was 4150 ms), CLS 0, FCP 0.8 s. Initial baseline overlapped browser smoke tests, so results are not a controlled benchmark. Performance remains below the 95+ launch target; further profiling required. SEO is deliberately reduced by preview noindex; production indexing must be verified at release. Local lab results are not real-user metrics.
- No failures remain in the executed final test suite; no absolute bug-free guarantee or full physical-device coverage.

## Reproduce
npm ci
npx playwright install chromium firefox webkit
npm run lint
npm run build
npm run typecheck
npm run test:e2e
node scripts/check-cross-browser.mjs
npm audit --omit=dev --audit-level=high

## Release scope
Preview branch portfolio/v2 only. No main merge, production promotion, source-project database access, new external paid service, or original portrait replacement.
