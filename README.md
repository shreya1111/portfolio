# Shreya Srivastava — Portfolio

Personal portfolio for Shreya Srivastava (Software Engineer · AI/ML Engineer · Python Developer), built with Vite + React.

## Design

Dreamy glassmorphism with an AI/ML aesthetic:

- Layered radial + linear gradient mesh background (indigo → violet → near-black)
- Cursor-reactive particle **constellation** canvas behind the whole page (`ConstellationCanvas`)
- Fraunces (display, italic accents), Space Grotesk (body), JetBrains Mono (utility/labels)
- Glass cards with cursor-tracked radial glow and lift-on-hover
- Staged hero load-in, IntersectionObserver scroll reveals
- Full `prefers-reduced-motion` support (canvas motion off, transitions trimmed)

## Stack

- React 18 (functional components + hooks)
- Vite build tool
- Plain CSS with CSS custom-property design tokens (no UI kit)

## Getting started

```bash
npm install
npm run dev      # start the dev server
npm run build    # production build → dist/
npm run preview  # preview the production build
```

## Structure

```
src/
  components/
    ConstellationCanvas.jsx   background particle network
    Nav.jsx                   sticky blurred nav + mobile menu
    Hero.jsx                  staged load-in hero
    About.jsx                 bio + education glass stat card
    Experience.jsx            timeline of roles
    SkillsConstellation.jsx   color-coded skill node-map
    Projects.jsx / ProjectCard.jsx
    Certifications.jsx
    Contact.jsx
    Footer.jsx
    Reveal.jsx                scroll-reveal wrapper
    Icons.jsx                 inline SVG icons
  hooks/useReveal.js
  data.js                     all real resume content
  styles/global.css           design tokens + base styles
```

## Note on project links

Repo-specific GitHub URLs for EKOS, MedNexus-AI, and UniQuery weren't provided, so every
"View Code" button links to the main profile: https://github.com/shreya1111
Swap in the individual repo URLs in `src/data.js` (`PROJECTS`) and `ProjectCard.jsx` when available.
