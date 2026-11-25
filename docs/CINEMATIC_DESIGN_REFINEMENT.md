# Cinematic engineering portfolio — reference-led refinement

Source review: owner-supplied Portfolio Example Websites.MP4 (387 seconds), sampled every six seconds (65 frames), plus seven supplied stills. The recording contains eight identifiable portfolio presentations. Design ideas adapted, not copied: oversized editorial type (DuingZ, Sree Adithya, Jai), portrait-led composition (Shadin), compact floating navigation and developer pass (Al-Fari, Shadin), skill matrix (sl.devspace), and alternating project storytelling (Sree Adithya). Static sampling cannot establish every motion detail or underlying implementation. No third-party imagery, recordings, identities or claims included.

## Design decisions
- Preserve approved palette and self-hosted typography, original portrait and all six authentic application screenshots.
- Centered portrait with oversized personal wordmark, compact personal pass with a real details toggle, and responsive hero. Pass is desktop-only; equivalent profile content remains available on mobile.
- Alternating editorial project rows with complete screenshot proportions, existing case-study routes and labels preserved.
- Filterable skills and learning matrix, with applied AI explicitly labeled as current learning rather than shipped implementations.
- CSS motion, no WebGL, autoplay media, fake agent status, or invented achievements. Reduced-motion preference respected.

## Verification
- Next.js build, ESLint, TypeScript passed.
- 14 Playwright tests passed, including all four homepage viewport widths, six case studies, mobile navigation, two-page automated Axe baseline, developer pass and technology filter interactions.
- Desktop hero screenshot visually reviewed.
- Production promotion and main branch merge intentionally excluded. Further visual approval, Lighthouse and full cross-browser checks remain pending.
