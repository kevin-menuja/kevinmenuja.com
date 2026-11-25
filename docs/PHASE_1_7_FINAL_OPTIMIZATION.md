# Phase 1.7 — final performance optimization

## Changes
- Generate width-specific static WebP variants from the approved portrait and six project screenshots. Preserve the original images and gallery full-screen source files.
- Native srcset/sizes selects an appropriate image, with original fallback; the hero portrait is eager/high priority. No paid image transformation service or new runtime dependencies.
- Disable automatic route prefetch on project-card links; navigation remains available.
- Use content-visibility:auto and intrinsic-size estimates on below-fold cards, skill groups and engineering lab panels at smaller viewports.
- Disable expensive portrait masking, decorative glow and navigation backdrop blur on smaller screens; keep original portrait, approved colors and desktop effects.
- Keep the 3D pass, motion preferences, spoken introduction, engineering lab, project gallery and architecture explorer.

## Measured evidence
Local production build; Lighthouse 13.6.0 mobile default simulation. Preview indexing policy retained.
| Metric | Previous run | Optimized run |
|---|---:|---:|
| Performance | 79 | 97 |
| Accessibility | 100 | 100 |
| Best practices | 100 | 100 |
| SEO (noindex preview) | 63 | 63 |
| LCP | 3.6 s | 2.3 s |
| TBT | 460 ms | 120 ms |
| CLS | 0 | 0.003 |

Single lab run per build; not field Core Web Vitals or a controlled statistical benchmark. Production SEO and real-device checks remain release acceptance tasks. The original 55-point result was measured while other browser tests overlapped and is not directly comparable.

## Final validation
- ESLint, production build, TypeScript: passed.
- 26/26 Chromium Playwright regressions: passed.
- Chromium, Firefox and WebKit smoke checks: passed on exact optimized build.
- Four viewport widths and six case studies: passed in regression suite.
- Axe automated accessibility checks: passed in tested states, not formal WCAG conformance.
- npm production dependency audit: zero reported vulnerabilities at validation time.
- All responsive assets exist, original tracked image files unchanged.
- No absolute guarantee of zero bugs; no physical iPhone/Safari or real-user telemetry in this validation.

## Reproduce
Requires local cwebp/dwebp to regenerate static image variants, Node.js and existing Playwright browser installations.
```sh
python3 scripts/generate-responsive-images.py
npm ci
npm run lint
npm run build
npm run typecheck
npx playwright install chromium firefox webkit
npm run test:e2e
node scripts/check-cross-browser.mjs
npm audit --omit=dev --audit-level=high
```
For mobile Lighthouse, start the production build on localhost with npm run start and run the pinned Lighthouse 13.6.0 CLI against the home page in Chrome with default mobile simulation; run independently of other browser tests.

## Release scope
Preview branch portfolio/v2 only. Main, production domain, source projects and their data remain untouched.
