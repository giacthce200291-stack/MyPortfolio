# My Portfolio — LOQ

Short overview
This repository contains a responsive portfolio site (HTML/CSS/JS) showcasing projects, skills and contact information. It includes accessibility improvements, a responsive carousel, reveal-on-scroll animations, a light/dark theme toggle (persisted), and a contact map.

Features
- Responsive layout (mobile-first, sidebar nav on desktop)
- Accessible navigation and interactive controls (aria attributes, keyboard support)
- Light/Dark theme toggle persisted in localStorage
- Reveal-on-scroll animations using IntersectionObserver with stagger
- Project carousel with arrows, dots and touch swipe
- Back-to-top button
- Embedded Google Map (responsive)

Four enhancements included
1. Theme persistence with OS-pref fallback (localStorage + prefers-color-scheme)
2. IntersectionObserver-based reveal animations with 150ms stagger
3. Lazy-loaded images with decoding="async" and width/height to reduce CLS
4. Carousel with keyboard and touch support

Validation proof
- HTML and CSS were linted and updated for common W3C issues:
  - form labels, button types, rel="noopener noreferrer" on external links
  - aria attributes for navigation, controls and landmarks
- To validate locally:
  - Use the W3C Validator (https://validator.w3.org/) to check index.html and project pages.
  - Take a screenshot of the "Document checking completed. No errors or warnings" page and save it as `images/screenshot-w3c-validation.png`.

Responsive design
- Breakpoints included for mobile and desktop (min-width: 768px) and refinements for very small screens (<375px).
- All media are responsive (max-width:100%). Carousel and map scale across viewports.
- To test responsiveness:
  - Open the site in browser devtools > responsive/mobile toolbar.
  - Capture screenshots for desktop and mobile and save them as `images/screenshot-home-desktop.png` and `images/screenshot-mobile.png`.

Screenshots to include (replace placeholders)
- images/screenshot-home-desktop.png — Homepage (desktop)
- images/screenshot-mobile.png — Mobile layout
- images/screenshot-w3c-validation.png — W3C validator success screenshot
- images/screenshot-responsiveness.png — responsiveness test (devtools)

How to produce final ZIP (Portfolio_Final_[YourName].zip)
1. Replace placeholder screenshots in `images/` with real PNGs (same filenames above).
2. Open PowerShell in the project root and run:
   .\package.ps1 -Name "YourName"
   This creates Portfolio_Final_YourName.zip containing the project files (index.html, project pages, css/, js/, images/, README.md).
3. Manually verify the ZIP and upload or submit it.

Notes
- Replace the OG image and the URLs in the JSON-LD in `index.html` with your deployed site URL and image.
- For image optimization, export screenshots as PNG/WebP and compress using your preferred tool (ImageOptim, Squoosh, etc.).
