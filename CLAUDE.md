# Spare — Clubs & Catering Deck

A single-page sales deck for Spare targeting **clubs and catering venues** (distinct from `spare-landing` which covers schools). Structured as a slide-based presentation with a persistent left nav.

## Dev Server

```bash
python3 -m http.server 3000
# open http://localhost:3000
```

Or use the launch configs in `.claude/launch.json` (Python on 3000, npx serve on 3001).

## Stack

- Single HTML file (`index.html`) — no build step, no dependencies to install
- **Inter** (Google Fonts) — primary typeface
- Slide navigation is pure JS — no framework

## Layout Architecture

```
body (flex row)
├── #nav  (210px fixed left sidebar)
│   ├── .nav-logo
│   ├── .nav-sections  (scrollable nav links)
│   └── .nav-bottom    (progress bar + CTA button)
└── #stage (flex: 1, overflow hidden)
    └── .slide × N     (absolute positioned, opacity transitions)
```

Each `.slide` becomes `.active` via JS — only one is visible at a time with a fade + translateY transition (0.65s).

## Brand / Design Tokens

```
--teal: #00C4CC          (primary)
--teal-dark: #009BA3
--teal-light: #E6F9FA    (active nav bg)
--teal-mid: #B2EEF0
--text: #0F172A
--text-muted: #64748B
--border: #E2E8F0
--bg: #FFFFFF
--bg-subtle: #F8FAFC
```

## Copy Rules

- Never use em-dashes ( — ) in any copy. Use a comma instead.

## Conventions

- All styles inline in `<style>` in `<head>` — do not create external CSS files
- All JS inline at bottom of `<body>` — do not create external JS files
- Use CSS custom properties for all colors — never hardcode hex values in styles
- `html, body` are `overflow: hidden` — scrolling happens inside `.slide` elements
- Nav progress bar reflects current slide position

## Assets

```
assets/          — images, SVGs, PDFs, logos
assets/logos/    — school/partner logos
```
