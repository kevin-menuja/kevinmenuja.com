# Kevin Menuja — Portfolio V2
Professional engineering portfolio using Next.js App Router and TypeScript. V2 separates completed work from current AI learning, with six project case-study routes, repository links, and authentic source-derived previews where available. Diagrams on cards are labeled illustrations rather than screenshots.
## Development
Requires Node.js 22+.
- npm ci
- npm run dev
- npm run lint
- npm run typecheck
- npm run build
## Deployment
Vercel, connected to the existing GitHub repository. The portfolio/v2 branch is the review branch; main is the original website until the new site is approved. No database, credentials, or contact backend is required. Contact links open email or LinkedIn directly.
## Image provenance
Portrait: owner-approved black-and-white Kevin Menuja 2.png, visually matched to the supplied image and converted to WebP without retouching. ServiceOps: checked-in operations-light.webp application preview. NWSDB: published admin-analytics.png report screenshot, previously privacy-reviewed. PrintXpress: published docs/screenshots/home.png historical screenshot. Rice & Kottu Hut POS: checked-in docs/portfolio/pos-desktop.jpg billing screenshot, using synthetic demo data. Startek Print Hub POS: owner-supplied real administrator dashboard screenshot; financial amounts and monthly sales chart masked before publication, resized to 1440 × 811 WebP. No production account was accessed for this screenshot. SwiftDrive Rentals: homepage captured 25 November 2026 from a disposable local PHP/MySQL instance seeded from the published synthetic SQL. All six featured projects use genuine application screenshots or existing source-derived application previews. No AI-generated dashboard imagery is used. SwiftDrive homepage rendering is not a complete booking acceptance test.
## Brand system
Approved dark theme: background #0B0D10, surfaces #171A1F, text #F5F7FA, muted #A7B0B8, accent #CFE8B0, hover #7FA36B, borders #2A2F36. Portrait preserves the full original image; CSS scales it without stretching.
## Maintenance
Project entries and scope limitations are defined in app/projects.ts. Verify claims and links against the source repositories before publishing edits. Add a CV only when the owner supplies an approved version. Set canonical metadata, sitemap and public domain only once the intended production URL is confirmed. The old static website files remain on this branch for rollback context; main is unchanged.
