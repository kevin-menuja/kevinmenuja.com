# Phase 1 — Premium UI/UX
Approved dark palette and original portrait retained. Reusable navigation, section headings, project cards, screenshots, technology tags and footer. Manrope, Inter and JetBrains Mono are self-hosted through Fontsource packages. Native screenshot proportions are preserved. Mobile navigation supports keyboard activation, Escape and outside dismissal. Animations respect reduced motion.
## Acceptance evidence
- Production build, ESLint and TypeScript passed.
- Playwright homepage checks passed at 1440, 768, 390 and 320 px, including overflow and screenshot loading.
- All six case-study route and screenshot checks passed.
- Mobile menu keyboard and section navigation test passed.
- Axe WCAG 2 A/AA and 2.1 A/AA: initial label-content mismatch corrected; targeted regression passed on homepage and Print Hub case study. No claim of full WCAG conformance.
- Production npm audit reported zero vulnerabilities at validation time.
- Desktop hero screenshot visually reviewed.
## Repeatable checks
npm ci
npx playwright install chromium
npm run lint
npm run build
npm run typecheck
npm run test:e2e
Optional CHROME_EXECUTABLE points to a locally installed Chrome executable.
## Release
Preview branch portfolio/v2. No main branch merge or production promotion. Full cross-browser review, content refinement, Lighthouse, custom domain and launch remain later milestones.
