# IAF MUSEUM — Vayu Gaurav Digital Portal

An independent, fan-made digital museum dedicated to the aircraft, history, and heritage of the Indian Air Force. Built as a cinematic dark-mode web experience with interactive 3D aircraft simulators, historical timelines, career guidance, and a multimedia archive.

> **Disclaimer:** This is an independent fan/information site. It is NOT affiliated with, endorsed by, or connected to the Indian Air Force, Ministry of Defence, or Government of India.

---

## Pages

| Page | Description |
|------|-------------|
| `index.html` | Homepage — hero video, fleet cards, interactive 3D simulator |
| `history.html` | 1971 Air War chronological timeline |
| `archives.html` | Masonry photo gallery + video lightbox |
| `careers.html` | IAF entry pathways (NDA, CDSE, AFCAT) + eligibility diagnostic |
| `news.html` | News dispatches with category filters |
| `rafale.html` | Dassault Rafale aircraft detail page |
| `su-30mki.html` | Sukhoi Su-30MKI aircraft detail page |
| `mirage-2000.html` | Dassault Mirage 2000 aircraft detail page |
| `tejas.html` | HAL Tejas Mk1A aircraft detail page |
| `tarang-shakti.html` | Exercise Tarang Shakti feature page |
| `uttam-aesa.html` | Uttam AESA Radar feature page |
| `about.html` | About the project, mission, legal notice |
| `sources.html` | Data sources and citations |
| `legal-disclaimer.html` | Full legal disclaimer |
| `privacy-policy.html` | Privacy policy |

---

## Features

- **Cinematic Hero** — Full-screen video background with multi-layer dark overlay
- **Interactive 3D Simulator** — Three.js WebGL viewer with Su-30MKK, Rafale C, Mirage 2000 GLB models; throttle control, exhaust glow, barrel roll & pitch maneuvers, engine audio synthesis
- **Search Palette** — Global keyboard-triggered search (`/` key) across all pages with fuzzy matching
- **IAF Eligibility Diagnostic** — Form-based modal that evaluates NDA / CDSE / AFCAT eligibility by age, education, and branch
- **Archives Gallery** — Masonry grid with category filters + video lightbox player
- **News Filters** — Category-based dispatch filtering (Acquisitions, Exercises, Indigenous Tech, Global Partnerships)
- **Scroll Reveal Animations** — Intersection Observer-based fade-up on scroll
- **Mobile Drawer** — Full-screen mobile navigation drawer
- **Dynamic Navbar** — Glass morphism navbar that transitions on scroll

---

## Tech Stack

| Technology | Usage |
|------------|-------|
| HTML5 | All pages, semantic structure |
| Tailwind CSS CDN | Utility-first styling with custom design tokens |
| Vanilla JavaScript | All interactivity via `global.js` |
| Three.js r128 | WebGL 3D aircraft simulator |
| GLTFLoader | Loading `.glb` 3D model files |
| OrbitControls | Mouse/touch camera control for 3D viewer |
| Web Audio API | Synthesized engine sound on throttle |
| Google Fonts | Plus Jakarta Sans + Cormorant Garamond |
| Material Symbols | Icon system throughout |

---

## Design System

- **Background:** `#121414` (deep charcoal)
- **Accent:** `#FF9933` (saffron)
- **Surface:** `#1e2020`
- **Text:** `#e2e2e2`
- **Glass UI:** `rgba(255,255,255,0.15)` + `backdrop-blur`
- **Typography:** Plus Jakarta Sans (UI) + Cormorant Garamond (editorial)

---

## Local Development

Serve via HTTP — required for 3D model loading (browsers block binary file fetch on `file://`):

```bash
# Node
npx serve .

# Python
python -m http.server 8080
```

Then open `http://localhost:3000` (or `8080`).

> The 3D `.glb` model files and video assets are **not included** in this repository due to file size. Place them in the project root to enable the 3D simulator and hero video.

**Required assets (place in root):**
```
sukhoi_su-30mkk.glb
dassault_rafale_c_f3.glb
dassault_mirage_2000d_rmv.glb

```

---

## Project Structure

```
IAF/
├── index.html              # Homepage
├── history.html            # 1971 War timeline
├── archives.html           # Photo & video gallery
├── careers.html            # Career pathways
├── news.html               # News dispatches
├── rafale.html             # Rafale detail
├── su-30mki.html           # Su-30MKI detail
├── mirage-2000.html        # Mirage 2000 detail
├── tejas.html              # Tejas Mk1A detail
├── tarang-shakti.html      # Exercise feature
├── uttam-aesa.html         # Radar feature
├── about.html              # About page
├── sources.html            # Sources
├── legal-disclaimer.html   # Legal
├── privacy-policy.html     # Privacy
├── global.js               # All interactivity
└── .gitignore
```

---
Built by GURUNATHAN V
## Legal

This portal is an independent fan project built for educational and informational purposes. All content is sourced from publicly available, open-source, and declassified materials including PIB archives and official press releases. No classified information is published or speculated upon.
