# 🎮 DistroLand 3D // Interactive Retro Arcade Guide to Linux Distributions

> **A playful, minimal, 3D Linux distro universe built with Next.js 15, Three.js, Tailwind CSS, and Web Audio API.**  
> Explore 18 iconic Linux distributions rendered as chunky, extruded 3D collectible cartridges orbiting in a 360° carousel over a dreamy 8-bit pastel sky with real-time parallax tilt physics, responsive typography, and chiptune audio.

[![Next.js 15](https://img.shields.io/badge/Next.js-15.2.0-black?logo=next.js)](https://nextjs.org/)
[![Three.js](https://img.shields.io/badge/Three.js-r174-orange?logo=three.js)](https://threejs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v3-38bdf8?logo=tailwind-css)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## 🌟 GitHub Short Description & Topics

### 📌 Short Description (for GitHub About box)
```text
An interactive 3D retro-arcade guide to 18 Linux distributions featuring extruded beveled cartridges, real-time parallax tilt physics, chiptune audio, and responsive typography built with Next.js 15 & Three.js. 🐧🎮✨
```

### 🏷️ GitHub Topics / Tags
`nextjs`, `threejs`, `react`, `typescript`, `tailwindcss`, `webgl`, `3d-carousel`, `linux`, `linux-distro`, `chiptune-audio`, `web-audio-api`, `retro-arcade`, `interactive-3d`, `kawaii-design`, `educational`

---

## 📖 Project Overview

**DistroLand 3D** transforms the technical world of Linux operating systems into an approachable, tactile, retro-arcade experience. Instead of traditional flat tables or endless spec lists, all 18 major Linux distributions are presented as **tangible, chunky 3D collectible cartridges** with physical extruded depth, beveled edges, authentic silhouette badges, and curious expressive eyes.

The interface combines:
- **8-Bit Pastel Aesthetic**: A soothing sky gradient (`#A8D8F0` → `#FFF0D6` → `#FFA8CB`), stepped voxel clouds, pink rolling hills, and floating sparkle crosses.
- **Physical 3D Squircles**: Extruded beveled bodies with multi-layer front and back cartridge plates that react in real-time to lighting and mouse coordinates.
- **Dynamic Responsive Typography**: Text measurement and proportional font scaling on both the 3D badges and the HUD overlays, ensuring long distro names (e.g. *openSUSE Tumbleweed*, *EndeavourOS*, *elementary OS*) fit without clipping.
- **Zero-Dependency Chiptune Audio**: Pure Web Audio API square, triangle, and noise wave oscillators generating authentic arcade coin bleeps, jump boings, and fanfares.

---

## 🚀 Key Features

### 1. 🪐 3D Beveled Cartridge Carousel (`CyberDistroDeck3D.tsx`)
- **Real 3D Extrusion**: Geometry generated with `THREE.ExtrudeGeometry` featuring a `0.40` extrusion depth and `0.10` bevel thickness for ~`0.60` units of physical depth.
- **Multi-Layer Cartridge Body**:
  - **Front Face**: High-resolution face decal featuring the distro's authentic silhouette insignia, cute white oval eyes with pupil catchlights, and a dynamic arcade nameplate pill.
  - **Back Face**: Authentic retro game cartridge backing with cooling grip vents, ROM specs (`DISTRO-ROM // 64-BIT`), and barcode lines visible during 360° rotation.
  - **Soft Contact Shadow**: Radial gradient ground shadow that dynamically scales and softens with card elevation and hover.
- **Interactive Parallax Tilt Physics**: Hovering over any badge dynamically tilts it in 3D (`rotation.x` and `rotation.z` tracking mouse coordinates), catching directional sunlight and rim highlights in real time.
- **Idle Breathing Motion**: Subtle sinusoidal pitch and roll oscillation so all cartridges catch lighting facets even when idle.

### 2. 🎛️ Responsive Retro Arcade HUD (`CyberHeroControls.tsx`)
- **Dynamic Distro Header**: Responsive typography that automatically calculates font size based on character length (`text-base` for long titles, `text-xl` for standard) with `min-w-0` and `flex-wrap` layout to prevent overflow on mobile.
- **Lineage Quick Filters**: Five squircle filter badges directly matching the palette (`[★ ALL (18)]`, `[DEBIAN]`, `[ARCH]`, `[RED HAT]`, `[INDEPENDENT]`).
- **Instant Search**: Real-time fuzzy query filtering with automated carousel re-centering.
- **Randomizer**: Roll a surprise distribution with `[🎲 RANDOM]`.
- **Sound Toggle**: Instant mute/unmute with persistent state.

### 3. 📑 Full Interactive Distro Dossier (`CyberDistroDossier.tsx`)
- **System Requirements Meter**: Beginner-friendly CPU, RAM, and Storage meters with progress bars.
- **Desktop Environment Preview**: Window manager, default session type (Wayland/X11), and appearance tags.
- **Color Palette Swatches**: Signature brand palette with one-click HEX copying to clipboard.
- **Embedded GameBoy / 8-Bit Terminal**:
  - Executable simulated package commands (`sudo apt install`, `pacman -S`, `dnf update`).
  - Kawaii `neofetch` ASCII art renderer with live system specs.

---

## 🛠️ Tech Stack & Architecture

| Layer | Technology | Description |
| :--- | :--- | :--- |
| **Framework** | [Next.js 15.2 (App Router)](https://nextjs.org/) | Modern React 19 architecture with Server/Client components |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) | Strict type-safety across distro definitions and 3D scenes |
| **3D Engine** | [Three.js r174](https://threejs.org/) | Custom WebGL scenes, extruded geometries, raycasting, and lighting |
| **Animation** | [Anime.js v4](https://animejs.com/) | Bouncy elastic spring transitions and floating animations |
| **Styling** | [Tailwind CSS v3](https://tailwindcss.com/) | Pixel-perfect utility styling with custom arcade drop-shadows |
| **Audio** | [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API) | Procedural 8-bit chiptune sound synthesis with 0 external audio files |
| **Icons** | [Lucide React](https://lucide.dev/) | Clean, lightweight UI vector icons |

---

## ⌨️ Keyboard & Mouse Controls

| Action | Control |
| :--- | :--- |
| **Spin 360° Carousel** | Click & Drag with mouse / Touch swipe on mobile |
| **Cycle Distros** | Mouse Scroll Wheel |
| **Next / Previous** | `D` / `A` or `Right` / `Left` Arrow keys |
| **Inspect Full Dossier** | Click on 3D Cartridge or press `Space` / `Enter` |
| **Roll Random Distro** | Press `R` or click `[🎲 RANDOM]` |
| **Close Dossier / Help** | Press `Escape` |

---

## 📦 Getting Started

### Prerequisites
- **Node.js**: v18.18.0 or newer
- **npm** or **pnpm** or **yarn**

### Installation

```bash
# 1. Clone repository
git clone https://github.com/your-username/distroland-3d.git
cd distroland-3d

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Or build and run production server
npm run build
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
