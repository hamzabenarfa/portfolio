<div align="center">

# 🚀 Hamza Benarfa | Portfolio

### **Full-Stack Developer & DevOps Engineer**

[![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-06B6D4?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)

*A modern, high-performance portfolio showcasing my work as a freelance developer from Tunisia*

[**🌐 Live Demo**](https://hamzabenarfa.com) • [**📧 Contact**](mailto:contact@hamzabenarfa.com)

</div>

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| ⚡ **Blazing Fast** | Built on Next.js 16 with React 19 for optimal performance |
| 🌍 **Internationalization** | Full i18n support (English & French) via next-intl |
| 🎨 **Dark/Light Themes** | Seamless theme switching with next-themes |
| 🎬 **Smooth Animations** | Polished micro-interactions with Framer Motion |
| 📱 **Fully Responsive** | Optimized for all devices and screen sizes |
| 📊 **Analytics Ready** | Vercel Analytics & Speed Insights integration |
| 🔍 **SEO Optimized** | Dynamic sitemap, robots.txt & Open Graph metadata |

---

## 🛠️ Tech Stack

<table>
<tr>
<td align="center"><b>Frontend</b></td>
<td>Next.js 16, React 19, TypeScript 5</td>
</tr>
<tr>
<td align="center"><b>Styling</b></td>
<td>Tailwind CSS 4, CSS Custom Properties (OKLCH colors)</td>
</tr>
<tr>
<td align="center"><b>Animation</b></td>
<td>Framer Motion, tw-animate-css</td>
</tr>
<tr>
<td align="center"><b>i18n</b></td>
<td>next-intl (English, French)</td>
</tr>
<tr>
<td align="center"><b>UI Components</b></td>
<td>Radix UI, Lucide Icons, Geist Font</td>
</tr>
<tr>
<td align="center"><b>Analytics</b></td>
<td>Vercel Analytics, Speed Insights</td>
</tr>
</table>

---

## 📂 Project Structure

```
portfolio/
├── app/
│   ├── [locale]/           # i18n routing
│   │   ├── (home)/         # Homepage sections
│   │   │   └── _components # Hero, Projects, Experience, etc.
│   │   ├── projects/       # Project case studies
│   │   └── layout.tsx      # Root layout with metadata
│   ├── api/                # API routes
│   ├── globals.css         # Design tokens & utilities
│   ├── sitemap.ts          # Dynamic sitemap
│   └── robots.ts           # SEO robots config
├── components/             # Shared components
│   ├── header.tsx          # Navigation header
│   ├── project-showcase.tsx
│   ├── language-switcher.tsx
│   └── ui/                 # Reusable UI primitives
├── i18n/                   # Internationalization config
├── messages/               # Translation files (en.json, fr.json)
├── data/                   # Static data (projects, experience)
└── public/                 # Static assets
```

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ or **Bun** runtime
- **npm**, **yarn**, **pnpm**, or **bun**

### Installation

```bash
# Clone the repository
git clone https://github.com/hamzabenarfa/portfolio.git
cd portfolio

# Install dependencies
bun install
# or: npm install

# Start development server
bun dev
# or: npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

| Command | Description |
|---------|-------------|
| `bun dev` | Start development server |
| `bun build` | Build for production |
| `bun start` | Run production server |
| `bun lint` | Run ESLint |

---

## 🎨 Design System

This portfolio features a carefully crafted design system using **OKLCH color space** for vibrant, perceptually uniform colors:

### Color Tokens

```css
/* Light Mode */
--primary: oklch(0.75 0.18 85);     /* Golden Amber */
--accent: oklch(0.65 0.2 35);       /* Warm Coral */

/* Dark Mode */
--primary: oklch(0.8 0.16 85);      /* Amber */
--accent: oklch(0.75 0.18 45);      /* Coral */
```

### Utilities

- `.text-gradient` — Beautiful gradient text effect
- `.glow` — Subtle glow box-shadow
- `.bg-grain` — Noise texture overlay for depth
- `.animate-fade-in-up` — Smooth entrance animation

---

## 🌍 Internationalization

The portfolio supports multiple languages with URL-based locale detection:

| Language | Locale | Status |
|----------|--------|--------|
| 🇬🇧 English | `en` | ✅ Default |
| 🇫🇷 French | `fr` | ✅ Available |

Translation files are located in `/messages/` directory.

---

## 📦 Featured Projects

<table>
<tr>
<td width="50%">

### 🛍️ D-Talk Ecosystem
Multi-role fashion marketplace with real-time design studio
- 500+ active designers
- 60% faster customization
- Lighthouse 90+

</td>
<td width="50%">

### 🛒 Vertex
Tech gadgets e-commerce platform
- 1,000+ SKUs managed
- <2s load time
- 95+ Lighthouse scores

</td>
</tr>
<tr>
<td width="50%">

### 📋 Planner
Team productivity suite with Kanban & whiteboarding
- 200+ active users
- 40% productivity boost
- Real-time collaboration

</td>
<td width="50%">

### 📱 Menu QR
Digital restaurant menu platform
- 60s menu launch
- 100+ language support
- AI-powered digitization

</td>
</tr>
</table>

---

## 📈 Performance

This portfolio is optimized for core web vitals:

- ⚡ **LCP** < 2.5s
- 🎯 **FID** < 100ms
- 📐 **CLS** < 0.1
- 🏆 **Lighthouse** 95+ across all metrics

---

## 🤝 Connect

<div align="center">

**Available for freelance projects, consulting & full-time opportunities**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=for-the-badge&logo=linkedin)](https://linkedin.com/in/hamzabenarfa)
[![GitHub](https://img.shields.io/badge/GitHub-Follow-181717?style=for-the-badge&logo=github)](https://github.com/hamzabenarfa)
[![Email](https://img.shields.io/badge/Email-Contact-EA4335?style=for-the-badge&logo=gmail)](mailto:contact@hamzabenarfa.com)

</div>

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">

**Built with ❤️ by Hamza Benarfa**

*© 2025 All Rights Reserved*

</div>
