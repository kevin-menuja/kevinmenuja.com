# Owner-requested pre-launch refinements

Removed motion toggle, 3D identity pass, associated Three.js dependency, and engineering playground. Motion defaults on; system reduced-motion settings take precedence. Desktop uses existing GSAP/Lenis; smaller or coarse-pointer devices use lightweight native CSS animation. Added persistent dark-default light/dark theme, full approved navbar title and previously provided personal social links. Removed decorative/repetitive microcopy while preserving essential labels, factual limitations and privacy information.

Synthetic voice removed. RecordedIntro is wired to an optional public/audio/introduction.mp3, absent until the owner supplies the recording. Automatic playback is attempted, with a pause and browser-policy fallback; actual recording, transcript alignment and playback acceptance remain pending. No synthetic audio published.

Final production build, lint, typecheck, 32/32 Chromium regression tests, Chromium/Firefox/WebKit smoke checks and production dependency audit (zero vulnerabilities) passed. Tests for removed features replaced with theme, motion and removal checks; light-theme accessibility tested on five routes. No fresh Lighthouse or physical-device test. Social hrefs checked against owner-provided URLs, not independently authenticated. Preview only; main and production untouched.
