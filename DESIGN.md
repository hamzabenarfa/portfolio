# Design

## Source of truth
- Status: Draft
- Last refreshed: 2026-05-14
- Primary product surfaces: portfolio landing page, selected work cards, project detail pages, contact conversion area.
- Evidence reviewed:
  - `app/[locale]/(home)/page.tsx` — landing section order and composition.
  - `app/[locale]/(home)/_components/hero.tsx` — primary positioning, CTA, hero copy.
  - `app/[locale]/(home)/_components/projects-section.tsx` — selected work cards and preview image treatment.
  - `app/[locale]/(home)/_components/capabilities.tsx` — services/capability copy.
  - `app/[locale]/(home)/_components/methodology.tsx` — process narrative.
  - `app/[locale]/(home)/_components/experience.tsx` — background accordions.
  - `app/[locale]/(home)/_components/faq.tsx` and `connect.tsx` — conversion/supporting content.
  - `app/globals.css` — home-page tokens, layout, animation, responsive behavior.
  - `docs/menu-qr-docs/*` and `docs/kindra-docs/*` — project evidence and architecture themes.
  - `public/d-talk.webp`, `public/menu-qr.webp`, `public/kindra.webp` — selected work imagery.

## Brand
- Personality: sharp technical partner, editorial portfolio, senior full-stack craft, calm confidence.
- Trust signals: shipped SaaS/products, full-stack ownership, production infrastructure, project evidence, explicit process, direct contact routes.
- Avoid: gimmicky decoration, unreadable overlays, noisy pattern spam, generic agency language, fake metrics.

## Product goals
- Goals:
  - Make the landing page feel more premium and product-minded.
  - Convert founders/agencies by showing ownership across product, engineering, and launch.
  - Let selected work screenshots lead while surrounding sections explain capability and reliability.
- Non-goals:
  - Do not introduce a separate design-system dependency.
  - Do not invent unverifiable business outcomes.
  - Do not make animation heavy enough to hurt performance.
- Success signals: clearer hierarchy, more scannable proof, richer but restrained visual system, passing lint/build.

## Personas and jobs
- Primary personas: founders building MVP/SaaS; agencies needing a senior full-stack partner; small teams with product/platform gaps.
- User jobs: quickly assess quality, understand scope of services, verify production competence, contact with confidence.
- Key contexts of use: desktop portfolio review, mobile scanning from social/profile links, hiring/client due diligence.

## Information architecture
- Primary navigation: Work, Services, Process, Contact.
- Core routes/screens: localized home page and project detail pages.
- Content hierarchy: hero positioning → technology/quality signal → selected work → services → process → background → FAQ → contact.

## Design principles
- Principle 1: Screenshots first; decoration should be ambient and derived from real project imagery.
- Principle 2: Use editorial grids, proof panels, and precise microcopy instead of loud visual effects.
- Tradeoffs: favor simple CSS and existing components over complex animation systems.

## Visual language
- Color: dark warm base, orange accent, muted cream text, project-specific warm/green/rose accents only where meaningful.
- Typography: large compressed Inter Tight display, Instrument Serif for emphasis, JetBrains Mono for proof labels and navigation.
- Spacing/layout rhythm: large section breathing room, clear grid systems, strong left/right alignment.
- Shape/radius/elevation: rounded cards with subtle borders/elevation; avoid plastic/glassy overuse.
- Motion: reveal-on-scroll, soft hover lift, marquee; no continuous heavy animation except existing lightweight marquee/pulse.
- Imagery/iconography: use real project screenshots, browser frames, text-first diagrams, minimal symbols.

## Components
- Existing components to reuse: `Hero`, `MarqueeTape`, `ProjectsSection`, `Capabilities`, `Methodology`, `Experience`, `FAQ`, `Connect`, `Header`.
- New/changed components: hero proof console, capability outcome metadata, process deliverables, contact availability card.
- Variants and states: hover/focus states must remain readable; accordions remain keyboard accessible.
- Token/component ownership: `app/globals.css` owns home-page visual language.

## Accessibility
- Target standard: practical WCAG AA contrast for body copy and controls.
- Keyboard/focus behavior: interactive rows/buttons need visible focus or existing keyboard handlers.
- Contrast/readability: avoid white text on light labels; body copy stays on dark surfaces.
- Screen-reader semantics: decorative elements use `aria-hidden`; images keep descriptive alt text.
- Reduced motion and sensory considerations: avoid adding new required motion-heavy interactions.

## Responsive behavior
- Supported breakpoints/devices: desktop wide grid, tablet single-column fallbacks, mobile linear reading.
- Layout adaptations: proof panels and bento cards collapse before text becomes cramped.
- Touch/hover differences: content must be visible without hover.

## Interaction states
- Loading: existing `loading.tsx` covers route loading.
- Empty: not applicable for static landing content.
- Error: not applicable for static landing content.
- Success: contact links open direct mail/WhatsApp.
- Disabled: not applicable.
- Offline/slow network: avoid blocking remote assets in home UI; use local images.

## Content voice
- Tone: direct, specific, senior, outcome-focused.
- Terminology: SaaS, dashboards, marketplaces, custom editors, infrastructure, launch.
- Microcopy rules: prefer concrete deliverables and constraints over hype.

## Implementation constraints
- Framework/styling system: Next.js 16 App Router, React 19, CSS in `app/globals.css`, Tailwind available but home uses custom CSS.
- Design-token constraints: preserve existing CSS variables and home-page scope.
- Performance constraints: use static local assets, CSS-only visual effects, no new dependency.
- Compatibility constraints: maintain localized route structure and existing project links.
- Test/screenshot expectations: run `npm run lint` and `npm run build`; visual QA by code inspection unless a browser capture flow is added.

## Open questions
- [ ] Whether to localize home-page copy via `next-intl` instead of current hardcoded English / owner / medium impact.
- [ ] Whether to add real measurable client outcomes once available / owner / high trust impact.
