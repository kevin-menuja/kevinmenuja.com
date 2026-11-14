# Kevin Menuja — Personal Portfolio

**Personal website and digital portfolio** for Kevin Menuja, a Sri Lankan developer and founder of Startek.

**GitHub Pages project:** [kevin-menuja.github.io/kevinmenuja.com](https://kevin-menuja.github.io/kevinmenuja.com/)  
**Source owner:** [@kevin-menuja](https://github.com/kevin-menuja)

> The repository was transferred from `Startek-pvt-ltd` to the personal GitHub account. The GitHub Pages URL changed as part of the transfer; verify the new Pages publishing configuration and update external links.

## Overview

A responsive personal-brand website introducing Kevin Menuja's professional background, computing education, digital services, Startek business divisions, selected work, and contact channels.

### Main sections

- Hero introduction with portrait and calls to action
- About, education timeline, and founder background
- Web development, mobile development, digital marketing, UI/UX, and content services
- Startek business identity and divisions
- Selected work highlights
- Email contact form and social links

## Technology

| Area | Implementation |
| --- | --- |
| Markup | HTML5 |
| Styling | CSS3 and responsive layouts |
| Interaction | Vanilla JavaScript |
| Visual effects | HTML Canvas, particles, cursor effects, and Three.js loaded as an ES module from a CDN |
| Hosting | GitHub Pages |

The project is intentionally **static** and currently has no package manager, backend, database, or build step.

## Local preview

Clone this repository:

```bash
git clone https://github.com/kevin-menuja/kevinmenuja.com.git
cd kevinmenuja.com
```

Serve the project locally (Python 3 example):

```bash
python3 -m http.server 8000
```

Open `http://localhost:8000/` in a browser. An internet connection is needed for remote fonts and Three.js assets.

## Contact form behavior

The site's contact form uses a `mailto:` action. **It is not connected to a backend form processor** and therefore depends on the visitor having a configured email client.

## Deployment

This is a GitHub Pages website. To verify or reconfigure deployment after ownership transfer:

1. Open **Settings → Pages** in this repository.
2. Verify the publishing source, branch, and folder match the static files on `main`.
3. Open the new Pages URL and test desktop and mobile behavior.
4. Update any old `startek-pvt-ltd.github.io` links on your CV, LinkedIn, and social profiles.

## Portfolio maintenance checklist

- [ ] Confirm the new GitHub Pages URL loads
- [ ] Test navigation, responsiveness, and keyboard accessibility
- [ ] Check contrast and reduced-motion behavior
- [ ] Verify every social and GitHub link
- [ ] Confirm the email contact flow on mobile and desktop
- [ ] Review images for accessible alternative text and appropriate sizing
- [ ] Add current full-stack and AI engineering project case studies when ready

---

**Source and content ownership:** Kevin Menuja. Startek remains the name of the associated business and its divisions.
