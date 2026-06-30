# SEO Strategy — benarfa.com

Last updated: 2026-06-29. Owner: Hamza Benarfa.

This is the working SEO plan for the portfolio. It documents what is already
implemented in the codebase and the concrete next steps, in priority order.

---

## 1. Positioning & target keywords

The site sells **one person who ships products end to end**, not a generic dev
CV. Target intent-rich, lower-competition long-tail terms over vanity keywords.

**Primary (commercial intent)**
- freelance full-stack developer
- hire Next.js developer
- MVP development for startups
- SaaS developer / SaaS MVP builder
- React / NestJS freelance developer

**Secondary (proof / niche)**
- canvas product customizer developer (Konva.js / Fabric.js) — genuine differentiator
- restaurant menu SaaS developer
- fashion e-commerce developer
- Tunisia full-stack developer (local + remote-EU/US angle)

**Branded**
- Hamza Benarfa / Benarfa developer

Map one primary keyword per page. Do not let `/`, `/work`, and `/background`
compete for the same term (keyword cannibalization).

| Page | Primary target |
|------|----------------|
| `/` | freelance full-stack / MVP developer |
| `/work` | full-stack project case studies / portfolio |
| `/background` | full-stack developer experience & stack |
| `/projects/menu-qr` | restaurant menu SaaS development |
| `/projects/dtalk-ecosystem` | fashion marketplace / canvas customizer |
| `/projects/kindra` | fashion e-commerce starter kit |

---

## 2. Technical SEO — status

Implemented in this repo:
- **Single canonical locale.** i18n removed; one URL per page (no `/en`, `/fr`
  duplication). Canonicals set in `app/layout.tsx` and per-page metadata.
- **`app/sitemap.ts`** — includes `/`, `/work`, `/background`, and every
  `/projects/{slug}`. Re-check after adding pages.
- **`app/robots.ts`** — allows all crawlable routes; blocks aggressive SEO
  scrapers (Ahrefs/Semrush/etc. — optional, remove if you want backlink tools to crawl).
- **`app/manifest.ts`** — PWA manifest with icons.
- **Open Graph + Twitter cards** — global defaults + per-page overrides; dynamic
  OG image at `/api/og`.
- **JSON-LD** (`components/seo/`): `Person`, `WebSite`, `FAQPage`, `ProfilePage`.
  FAQ structured data is kept **in sync with the visible FAQ** (required for rich
  results).

### Next technical steps
1. **Verify in Google Search Console** (and Bing Webmaster). Submit `sitemap.xml`.
2. **Per-project canonicals** — add `alternates.canonical` to each
   `app/projects/*/page.tsx` (currently only title/description/OG are set).
3. **Breadcrumb JSON-LD** on `/work`, `/background`, and project pages using the
   existing `StructuredData type="BreadcrumbList"` (pass `breadcrumbs` to `<SEO />`).
4. **Add `CreativeWork`/`SoftwareSourceCode` JSON-LD** per project for richer
   indexing of the case studies.
5. Confirm Core Web Vitals in the field (see §5).

---

## 3. On-page checklist (every page)

- [ ] Exactly one `<h1>` containing the primary keyword naturally.
- [ ] Title ≤ 60 chars, description 140–160 chars, both unique per page.
- [ ] Descriptive `alt` text on meaningful images (decorative images use `alt=""`).
- [ ] Internal links use real anchor text ("engineering background", "Menu QR
      case study") — avoid "click here" / bare arrows as the only link text.
- [ ] Headings form a logical outline (no skipped levels).

---

## 4. Content plan (the real growth lever)

A 3-page portfolio ranks for branded terms only. To rank for commercial terms,
publish **case-study depth + a small writing surface**:

1. **Deepen case studies** — each `/projects/*` should answer: problem, approach,
   architecture, measurable outcome. This already exists; keep expanding with
   real numbers (load times, timelines, scale).
2. **Add a lightweight `/notes` or `/writing` section** (optional, future) for
   articles like "Building a canvas product customizer with Konva", "Shipping a
   restaurant SaaS MVP in 8 weeks". These target long-tail informational queries
   and earn links.
3. **Service-intent copy** — the home "What I build" section already maps to
   buyer language; mirror those phrases in metadata.

---

## 5. Performance (SEO-weighted)

CWV targets (from team performance rules): LCP < 2.5s, INP < 200ms, CLS < 0.1.

- Hero uses a dynamically imported WebGL scene (`ssr: false`) with a static
  fallback — good. Confirm it does not block LCP; the LCP element should be the
  hero text, not the canvas.
- All `next/image` usages have `fill` + `sizes`; keep explicit sizing to protect CLS.
- Fonts use `display: swap` (next/font). Good.
- Re-run Lighthouse on `/`, `/work`, and a project page after these changes.

---

## 6. Off-page / authority

- Link the site from GitHub profile, LinkedIn, and any client sites (footer credit).
- Get listed where buyers look: relevant directories, "available for hire" lists.
- Consistent NAP/branding (name, role, links) across LinkedIn, GitHub, site —
  reinforces the `Person` entity in §2.

---

## 7. Measurement

- Google Search Console: impressions, CTR, average position per query; fix pages
  with high impressions + low CTR (rewrite titles/descriptions).
- Track which case studies attract impressions and double down on that niche.
- Review quarterly; update this file with what moved.
