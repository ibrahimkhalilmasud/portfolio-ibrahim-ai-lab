<div align="center">

# 🤖 Ibrahim AI Lab Portfolio

[![Next.js](https://img.shields.io/badge/Next.js-16.2.4-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Three.js](https://img.shields.io/badge/Three.js-0.184-000000?style=for-the-badge&logo=three.js&logoColor=white)](https://threejs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)

**A futuristic 3D AI portfolio** showcasing computer vision, virtual try-on systems, AI automation, and intelligent digital experiences.

[🌐 Live Demo](https://ibrahimkhalilmasud.github.io/portfolio-ibrahim-ai-lab/) · [🐛 Report Bug](https://github.com/ibrahimkhalilmasud/portfolio-ibrahim-ai-lab/issues) · [✨ Request Feature](https://github.com/ibrahimkhalilmasud/portfolio-ibrahim-ai-lab/issues)

</div>

---

## 🎨 Preview

> 🔵 Cyberpunk-inspired dark interface with real-time 3D particle fields, interactive neural network visualizations, and a skill galaxy powered by WebGL.

---

## 📐 Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                    BROWSER (Client-Side Only)                   │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                      app/page.tsx                        │  │
│  │   ┌──────────┐  ┌────────────┐  ┌──────────────────┐    │  │
│  │   │ Loading  │  │   Custom   │  │     Header       │    │  │
│  │   │ Screen   │  │   Cursor   │  │  (sticky nav)    │    │  │
│  │   └──────────┘  └────────────┘  └──────────────────┘    │  │
│  │                                                          │  │
│  │   ┌──────────────────────────────────────────────────┐  │  │
│  │   │              Page Sections (scroll)              │  │  │
│  │   │                                                  │  │  │
│  │   │  ┌─────────┐  ┌──────────┐  ┌───────────────┐   │  │  │
│  │   │  │  Hero   │  │  AI Lab  │  │   Projects    │   │  │  │
│  │   │  │ Section │  │ Section  │  │   Section     │   │  │  │
│  │   │  │ (3D ✨) │  │ (3D 🧠) │  │  (grid 🛠️)   │   │  │  │
│  │   │  └─────────┘  └──────────┘  └───────────────┘   │  │  │
│  │   │                                                  │  │  │
│  │   │  ┌─────────┐  ┌──────────┐  ┌───────────────┐   │  │  │
│  │   │  │ Skills  │  │Research  │  │   Timeline    │   │  │  │
│  │   │  │ Section │  │ Section  │  │   Section     │   │  │  │
│  │   │  │(3D 🌌)  │  │ (📊)    │  │  (journey ⏳) │   │  │  │
│  │   │  └─────────┘  └──────────┘  └───────────────┘   │  │  │
│  │   │                                                  │  │  │
│  │   │  ┌──────────────────┐  ┌──────────────────────┐  │  │  │
│  │   │  │  GitHub Section  │  │   Contact Section    │  │  │  │
│  │   │  │  (stats + repos) │  │   (form + socials)   │  │  │  │
│  │   │  └──────────────────┘  └──────────────────────┘  │  │  │
│  │   └──────────────────────────────────────────────────┘  │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              Technology Stack                            │  │
│  │  WebGL (Three.js) ─── Framer Motion ─── Tailwind CSS    │  │
│  │  React Three Fiber ── GSAP (optional) ─ Google Fonts    │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🗂️ Project Structure

```
portfolio-ibrahim-ai-lab/
│
├── 📁 app/                          # Next.js App Router
│   ├── 🎨 globals.css               # Global styles, CSS variables, animations
│   ├── 📄 layout.tsx                # Root HTML layout, metadata, fonts
│   └── 🏠 page.tsx                  # Main page — composes all sections
│
├── 📁 components/
│   ├── 📁 layout/                   # UI chrome (always visible)
│   │   ├── 🖱️  CustomCursor.tsx     # Animated custom cursor with hover effects
│   │   ├── 🔝 Header.tsx            # Sticky navigation with scroll & active-section tracking
│   │   └── ⏳ LoadingScreen.tsx     # Animated boot sequence with progress bar
│   │
│   └── 📁 sections/                 # Full-page scroll sections
│       ├── 🌟 HeroSection.tsx       # Three.js particle field + animated name reveal
│       ├── 🧠 AILabSection.tsx      # Interactive 3D neural network (React Three Fiber)
│       ├── 🛠️  ProjectsSection.tsx  # Tilt-on-hover project cards grid
│       ├── 🌌 SkillsSection.tsx     # 3D skill galaxy with orbiting nodes
│       ├── 🔬 ResearchSection.tsx   # AI vision roadmap + timeline
│       ├── ⏱️  TimelineSection.tsx  # Alternating career journey cards
│       ├── 🐙 GitHubSection.tsx     # Stats, repos, contribution heatmap
│       └── 📬 ContactSection.tsx    # Contact form + social links + CV download
│
├── 📁 public/                       # Static assets (SVGs)
├── 📄 next.config.ts                # Next.js configuration
├── 📄 tsconfig.json                 # TypeScript configuration
├── 📄 eslint.config.mjs             # ESLint flat config (core-web-vitals + TS)
├── 📄 postcss.config.mjs            # PostCSS configuration for Tailwind v4
└── 📄 package.json                  # Dependencies & scripts
```

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🌐 **3D Particle Hero** | 8,000-particle WebGL field, mouse-reactive rotation |
| 🧠 **Neural Network Viz** | Clickable 3D node graph of AI modules (React Three Fiber) |
| 🌌 **Skill Galaxy** | Orbiting skill nodes on configurable 3D axes |
| 🖱️ **Custom Cursor** | Dual-ring cursor with hover expansion & glow |
| ⚡ **Smooth Loading** | Animated boot sequence with 4-phase progress |
| 🃏 **Tilt Cards** | CSS 3D perspective tilt on project cards |
| 🔥 **GitHub Heatmap** | Contribution activity grid visualization |
| 📱 **Fully Responsive** | Mobile-first design with hamburger nav |
| ♿ **Accessible** | Semantic HTML, keyboard navigation |

---

## 🚀 Step-by-Step Setup Guide

### Prerequisites

Make sure you have the following installed:

| Tool | Version | Download |
|------|---------|----------|
| **Node.js** | ≥ 18.x LTS | [nodejs.org](https://nodejs.org/) |
| **npm** | ≥ 9.x (comes with Node) | bundled |
| **Git** | any recent | [git-scm.com](https://git-scm.com/) |

---

### Step 1 — Clone the Repository 📥

```bash
git clone https://github.com/ibrahimkhalilmasud/portfolio-ibrahim-ai-lab.git
cd portfolio-ibrahim-ai-lab
```

---

### Step 2 — Install Dependencies 📦

```bash
npm install
```

> ⏱️ This installs ~150 packages including Next.js, Three.js, Framer Motion, and Tailwind CSS. Takes ~30–60 seconds.

---

### Step 3 — Start the Development Server 🔧

```bash
npm run dev
```

Then open **[http://localhost:3000](http://localhost:3000)** in your browser.

> 💡 The dev server uses **Turbopack** for ultra-fast hot module replacement. Changes appear instantly.

---

### Step 4 — Explore & Customize 🎨

The site is organized into 8 sections. Each section lives in its own file under `components/sections/`.

**To update personal info:**

| File | What to edit |
|------|-------------|
| `components/sections/HeroSection.tsx` | Name, roles, stats |
| `components/sections/ProjectsSection.tsx` | Project cards, GitHub links |
| `components/sections/SkillsSection.tsx` | Skills list & categories |
| `components/sections/TimelineSection.tsx` | Career history |
| `components/sections/ResearchSection.tsx` | Research vision & roadmap |
| `components/sections/GitHubSection.tsx` | GitHub stats & repos |
| `components/sections/ContactSection.tsx` | Email, social links |
| `app/layout.tsx` | Page title, SEO metadata |

**To change the color theme**, edit the CSS variables in `app/globals.css`:

```css
:root {
  --blue-accent:   #00d4ff;  /* ← Primary cyan/blue */
  --blue-primary:  #0070f3;  /* ← Button blue */
  --violet-accent: #7c3aed;  /* ← Purple accent */
  --violet-light:  #a855f7;  /* ← Light purple */
}
```

---

### Step 5 — Build for Production 🏗️

```bash
npm run build
```

This creates an optimized static export in `.next/`.

> ✅ Expected output: `✓ Compiled successfully` with all 2 routes (/ and /_not-found).

---

### Step 6 — Run Production Build Locally (Optional) 🌐

```bash
npm run start
```

Open **[http://localhost:3000](http://localhost:3000)** to preview the production build.

---

### Step 7 — Lint Your Code 🔍

```bash
npx eslint .
```

The project uses ESLint **flat config** with `eslint-config-next` (core-web-vitals + TypeScript rules).

---

### Step 8 — Deploy to Vercel 🚀

The easiest way to deploy is with [Vercel](https://vercel.com/):

```bash
# Option A: Vercel CLI
npm install -g vercel
vercel

# Option B: GitHub Integration
# Push to GitHub → Import project on vercel.com → Deploy automatically
```

> 🌍 Vercel auto-detects Next.js and configures the build pipeline.

---

## 🛠️ Tech Stack

```
🧱 Framework      Next.js 16 (App Router, Turbopack)
⚛️  UI Library     React 19
📘 Language       TypeScript 5
🎨 Styling        Tailwind CSS v4 + custom CSS variables
🌐 3D Engine      Three.js 0.184 + React Three Fiber 9
✨ Animation      Framer Motion 12 + GSAP 3
🔠 Fonts          Space Grotesk + Inter (Google Fonts via HTML link)
🔍 Linting        ESLint 9 (flat config, core-web-vitals)
```

---

## 🔧 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server (Turbopack) |
| `npm run build` | Build for production |
| `npm run start` | Serve the production build locally |
| `npm run lint` | Run ESLint (requires local install: `npx eslint .`) |

---

## 📁 Key Files Reference

```
app/globals.css     → CSS custom properties, utility classes, keyframe animations
app/layout.tsx      → <html> root, metadata (SEO), Google Fonts link tags
app/page.tsx        → Composes all sections; handles loading state

components/layout/
  CustomCursor.tsx  → Dual-ring cursor (dot + ring) using requestAnimationFrame
  Header.tsx        → Fixed top nav with IntersectionObserver active section tracking
  LoadingScreen.tsx → 4-phase animated progress bar boot sequence

components/sections/
  HeroSection.tsx       → Three.js async import, 8k particles, role cycling
  AILabSection.tsx      → React Three Fiber canvas with 5 clickable neural nodes
  ProjectsSection.tsx   → 6 project cards with mouse-tilt CSS 3D perspective
  SkillsSection.tsx     → 18 skills orbiting on 3D axes in separate rings
  ResearchSection.tsx   → 3 feature cards + 4-step horizontal/vertical roadmap
  TimelineSection.tsx   → 5 alternating left/right career timeline items
  GitHubSection.tsx     → Heatmap (364 cells), language bars, repo cards
  ContactSection.tsx    → Simulated form submit, social links, CV download CTA
```

---

## 🎨 Design System

| Token | Value | Usage |
|-------|-------|-------|
| `--blue-accent` | `#00d4ff` | Primary highlights, borders, glows |
| `--blue-primary` | `#0070f3` | Button fills, gradients |
| `--violet-accent` | `#7c3aed` | Secondary accent |
| `--violet-light` | `#a855f7` | Light purple gradient end |
| `--background` | `#000000` | Page background |
| `--foreground` | `#f5f5f5` | Body text |
| `--silver` | `#888888` | Muted text |
| `--graphite` | `#111111` | Subtle containers |

**CSS Utility Classes** (defined in `globals.css`):

```
.glass              → Frosted glass card (backdrop-filter: blur)
.glow-blue          → Cyan text shadow glow
.glow-violet        → Purple text shadow glow
.gradient-text-blue → Blue → dark-blue gradient text
.gradient-text-mixed→ Cyan → violet gradient text
.section-container  → Max-width centered section wrapper
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m "feat: add amazing feature"`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 📄 License

This project is open source. Feel free to use it as a template for your own portfolio.

---

<div align="center">

**Built with 💙 by [Muhammad Ibrahim Khalil](https://github.com/ibrahimkhalilmasud)**

*AI Engineer · Computer Vision Researcher · Fashion AI Pioneer*

[![GitHub](https://img.shields.io/badge/GitHub-ibrahimkhalilmasud-181717?style=flat-square&logo=github)](https://github.com/ibrahimkhalilmasud)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-ibrahim--khalil--masud-0A66C2?style=flat-square&logo=linkedin)](https://linkedin.com/in/ibrahim-khalil-masud)
[![Email](https://img.shields.io/badge/Email-ibrahimkhalilmasud%40gmail.com-EA4335?style=flat-square&logo=gmail)](mailto:ibrahimkhalilmasud@gmail.com)

</div>
