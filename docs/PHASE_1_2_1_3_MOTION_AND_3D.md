# Phase 1.2 and 1.3 — motion and interactive developer pass

Motion: GSAP 3.15.1, ScrollTrigger and Lenis 1.3.28 are dynamically loaded when motion is enabled. Includes brief route entry, scroll reveals, reading progress, cursor-responsive hero lighting, smooth wheel scrolling, and a persistent motion preference. System reduced-motion takes precedence. Native scrolling and content remain available without JavaScript. No blocking loading screen.

3D: opt-in Three.js 0.187.0 scene with the approved portrait, front/back card textures, lighting, strap, drag-and-release damped angular simulation, flip/reset, and accessible standard-view fallback. Uses a custom small physics integrator instead of a second physics engine. The 3D bundle is requested only on demand. Rendering sleeps when stationary, offscreen, or in a hidden tab. Reduced-motion uses immediate settling. Context failure falls back to the HTML pass. Desktop-only hero pass; essential profile information remains available on small screens.

Validation: production build, ESLint and TypeScript passed. 18 Playwright tests passed (four responsive widths, six case studies, mobile navigation, two-page Axe baseline, profile details, skill filters, persistent motion preference, system reduced motion, actual 3D drag/flip/reset and unavailable WebGL fallback). Production dependency audit reported zero vulnerabilities. Chromium test evidence is not a guarantee of no bugs across every device or browser. Full Safari/Firefox, physical-device and Lighthouse verification remain future QA.

Release scope: portfolio/v2 preview only; no production promotion, main merge, portrait or project screenshot changes.
