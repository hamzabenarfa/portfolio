# SEO / GEO / AEO Codebase Audit

Audit date: 2026-05-14  
Repository: `/home/benarfa/apps/portfolio`  
Scope: source code, route structure, generated build artifacts, metadata, sitemap/robots output, structured data, content files, public assets, and validation command output.  
Validation evidence: `npm run lint` passed; `npm run build` passed and generated 18 static/dynamic routes. No live crawl, Lighthouse, Search Console, analytics, or production HTTP redirect checks were available in the repository, so those items are marked **Needs verification** where relevant.

---

## 1. Executive Summary

The codebase already has a solid technical baseline for a small bilingual portfolio: Next.js App Router, static generation for English and French routes, `next-intl` routing, a dynamic sitemap, robots route, web manifest, Open Graph image endpoint, Vercel Analytics/Speed Insights, `next/image`, local WebP assets, and initial JSON-LD components.

The biggest production blockers are metadata correctness and information architecture:

1. **Project pages currently canonicalize to the home page in the generated build.** Generated HTML for `/en/projects/*` uses `https://benarfa.com` as canonical, and generated French project pages use `https://benarfa.com/fr`. This can collapse project-page indexing into the homepage.
2. **Project hreflang alternates also point to the home page, not matching project URLs.** This weakens international targeting and can confuse duplicate clustering.
3. **Project metadata is partially inherited incorrectly.** Generated titles duplicate the brand suffix (`| Hamza Benarfa | Hamza Benarfa`), project pages lack `og:url`, and Twitter card title/image inherit the home-page values.
4. **Structured data exists but is not route-specific and is injected after interactivity.** The current schema is global Person/WebSite/FAQ/ProfilePage JSON-LD on every route, not server-rendered per page, and project/article/breadcrumb/service schemas are missing.
5. **There is no content growth architecture.** The repo has no blog, category, tag, author, glossary, comparison, service, or dedicated FAQ routes. The site is currently a portfolio plus three project case studies, which limits SEO, GEO, and AEO surface area.
6. **The production domain is inconsistent in repository evidence.** Code defaults to `https://benarfa.com`, while `README.md` references `https://hamzabenarfa.com` and `contact@hamzabenarfa.com`. This must be verified before launch.

Overall current state: **good foundation, not production-competitive yet**. Fix canonical/hreflang/social metadata first, then move schema server-side and route-specific, then build content hubs around full-stack MVPs, SaaS, e-commerce, restaurant tech, custom editors, and DevOps launch work.

---

## 2. Priority Scorecard

| Area | Current status | Priority | Estimated impact | Effort |
|---|---|---:|---:|---:|
| Canonical URLs | Home canonical is correct; project pages inherit home canonicals in generated HTML | Critical | Very high | Medium |
| Hreflang / alternates | Home alternates exist; project alternates point to home URLs | Critical | Very high | Medium |
| Project metadata | Static project metadata exists, but generated titles duplicate brand; Twitter/OG incomplete | Critical | High | Low-Medium |
| Production domain | Code defaults to `benarfa.com`; README says `hamzabenarfa.com` | Critical / Needs verification | Very high if wrong | Low |
| Sitemap | Includes localized home + projects, but no hreflang alternates and `lastModified` is build time | High | High | Medium |
| Robots.txt | Present, but blocks major SEO crawlers and needs production-policy verification | Medium / Needs verification | Medium | Low |
| Structured data | Person/WebSite/FAQ/ProfilePage exist; not route-specific, not server-rendered, missing major schema types | High | High | Medium |
| GEO / AI search | Strong project facts exist, but no llms.txt, source-like pages, author entity page, or machine-readable summaries | High | High | Medium-High |
| AEO | Visible FAQ exists; schema FAQ does not match visible FAQ; no answer blocks/how-to/comparison/glossary | High | High | Medium |
| Content architecture | No blog/category/tag/glossary/service/author pages | High | Very high | High |
| Internal linking | Anchor nav + project cards exist; no breadcrumbs, related-content graph, footer crawl links, language switcher | High | High | Medium |
| Internationalization | `en`/`fr` routes exist; most current UI/project content is hardcoded English; project metadata not localized | High | High | Medium-High |
| Performance / CWV | Static generation, fonts, and optimized images exist; project pages are large client components with framer-motion | Medium-High | High | Medium |
| Accessibility / semantics | Good landmark baseline; custom cursor, clickable div accordions, missing focus/ARIA states need work | Medium-High | Medium-High | Medium |
| Social previews | Root `/api/og` exists; project OG images exist; Twitter cards inherit home data | High | Medium-High | Low-Medium |
| Conversion SEO | Clear contact CTAs exist; service/location/offer pages are missing | Medium-High | High | Medium |
| Monitoring | Vercel Analytics and Speed Insights are included; Search Console/schema/Lighthouse monitoring absent from repo | Medium / Needs verification | Medium | Low |

---

## 3. Critical Issues

### Critical issue 1 — Project pages canonicalize to the homepage

| Field | Details |
|---|---|
| Problem | Generated project pages inherit the layout canonical, so `/en/projects/dtalk-ecosystem`, `/en/projects/menu-qr`, and `/en/projects/kindra` canonicalize to `https://benarfa.com`; French project pages canonicalize to `https://benarfa.com/fr`. |
| Why it matters | Search engines may treat project case studies as duplicate/secondary versions of the homepage and may not index or rank them independently. This directly undermines the strongest SEO assets in the repo. |
| Where it appears | Source: `app/[locale]/layout.tsx:102-105` defines only home-level canonicals. Project pages (`app/[locale]/projects/*/page.tsx`) do not override `alternates.canonical`. Generated evidence after `npm run build`: `.next/server/app/en/projects/*.html` canonical = `https://benarfa.com`; `.next/server/app/fr/projects/kindra.html` canonical = `https://benarfa.com/fr`. |
| Recommended fix | Add per-route canonicals for every route. Use a shared SEO URL helper that receives `locale` and pathname and returns canonical plus localized alternates. |
| Implementation notes | Implement `generateMetadata({ params })` on each project page, or convert project pages to a dynamic `[slug]` route backed by `PROJECTS`. For `dtalk-ecosystem`, canonical should be `/projects/dtalk-ecosystem` for English and `/fr/projects/dtalk-ecosystem` for French. |
| Priority | Critical |

### Critical issue 2 — Project hreflang alternates point to home URLs

| Field | Details |
|---|---|
| Problem | Generated project pages have `hrefLang="en" href="https://benarfa.com"` and `hrefLang="fr" href="https://benarfa.com/fr"` instead of project-specific equivalents. |
| Why it matters | Hreflang clusters should map equivalent pages across languages. Home alternates on project pages create incorrect language clusters and can weaken international SEO. |
| Where it appears | Source: `app/[locale]/layout.tsx:102-105`; generated build evidence from `.next/server/app/en/projects/*.html` and `.next/server/app/fr/projects/kindra.html`. |
| Recommended fix | Generate alternates per pathname, including `x-default`. |
| Implementation notes | Example: for `menu-qr`, `languages: { en: `${baseUrl}/projects/menu-qr`, fr: `${baseUrl}/fr/projects/menu-qr`, "x-default": `${baseUrl}/projects/menu-qr` }`. Also consider adding `alternates` to sitemap entries using `xhtml:link` if the framework/site generation supports it. |
| Priority | Critical |

### Critical issue 3 — Project metadata inherits or duplicates incorrect fields

| Field | Details |
|---|---|
| Problem | Generated project titles duplicate the brand suffix, e.g. `KINDRA - E-Commerce Platform | Hamza Benarfa | Hamza Benarfa`. Project pages lack `og:url`. Twitter title/description/image inherit home values instead of project-specific values. |
| Why it matters | Duplicated titles reduce snippet quality. Missing `og:url` and stale Twitter metadata harm social previews and entity consistency. AI/search systems also rely on clean page-level summaries. |
| Where it appears | Source: layout title template `app/[locale]/layout.tsx:64-67`; project static titles already include `| Hamza Benarfa` at `app/[locale]/projects/dtalk-ecosystem/page.tsx:4-19`, `app/[locale]/projects/menu-qr/page.tsx:4-19`, `app/[locale]/projects/kindra/page.tsx:4-19`. Generated evidence: `.next/server/app/en/projects/*.html` and `.next/server/app/fr/projects/kindra.html`. |
| Recommended fix | Remove the brand suffix from child metadata titles, or bypass the template with absolute titles. Add project-specific Twitter metadata and `openGraph.url`. |
| Implementation notes | Prefer central metadata builders: `getPageMetadata({ locale, path, title, description, image, type })`. Keep raw title as `D-Talk Ecosystem — Multi-Role Fashion Platform`; let the template append the brand once. |
| Priority | Critical |

### Critical issue 4 — Production canonical domain is inconsistent and needs verification

| Field | Details |
|---|---|
| Problem | Code defaults metadata/sitemap/robots/schema to `https://benarfa.com`, but `README.md` references `https://hamzabenarfa.com` and `contact@hamzabenarfa.com`. |
| Why it matters | If the wrong domain is canonicalized, submitted in sitemaps, or used in schema, search engines may index the wrong host or split authority across domains. |
| Where it appears | `app/[locale]/layout.tsx:13`, `app/sitemap.ts:5`, `app/robots.ts:3`, `components/seo/structured-seo-data.tsx:14`; conflicting README evidence at `README.md:14` and `README.md:230-232`. |
| Recommended fix | Verify the true production domain and redirects before launch. Set `NEXT_PUBLIC_WEB_URL` in production and update README/contact/schema consistency. |
| Implementation notes | Acceptance should include HTTP checks for `http://`, `https://`, `www`, bare domain, `/en`, `/fr`, and old domains. All non-canonical hosts should 301 to the selected canonical host. |
| Priority | Critical / Needs verification |

---

## 4. Technical SEO Audit

### Current strengths

- Static route generation is working. `npm run build` generated SSG pages for `/en`, `/fr`, `/en/projects/*`, and `/fr/projects/*`.
- Localized routing is configured in `i18n/routing.ts:6-10` with locales `en` and `fr`, default locale `en`, and `localePrefix: "as-needed"`.
- A `proxy.ts` middleware exists and excludes API/static assets (`proxy.ts:6-9`).
- `app/sitemap.ts` exists and includes localized home/project URLs.
- `app/robots.ts` exists and points crawlers to the sitemap.
- `app/manifest.ts` exists.
- Metadata robots are set to index/follow in `app/[locale]/layout.tsx:97-101`.

### Technical findings

| Priority | Problem | Why it matters | Where / evidence | Recommended fix | Implementation notes |
|---:|---|---|---|---|---|
| Critical | Project canonicals point to the localized homepage | Can deindex/collapse project case studies | `app/[locale]/layout.tsx:102-105`; generated `.next/server/app/en/projects/*.html` | Add path-aware canonical metadata per route | Build a `canonicalFor(locale, path)` helper and use it in every page metadata export |
| Critical | Project hreflang alternates point to home URLs | Incorrect language clustering | `app/[locale]/layout.tsx:102-105`; generated project HTML | Generate path-aware language alternates | Include `x-default`; verify output after build |
| High | Sitemap lacks hreflang alternates | Sitemap gives only `<loc>` entries; no explicit language pairs | `app/sitemap.ts:8-25`; generated `.next/server/app/sitemap.xml.body` | Add alternate references if supported, or generate custom XML with `xhtml:link` | Pair each English URL with its French equivalent |
| High | Sitemap `lastModified` is `new Date()` for all URLs | Every build makes all pages look modified even when content did not change | `app/sitemap.ts:9` | Use content-specific `updatedAt` values | Add `updatedAt` to `PROJECTS` and homepage config; use git/content timestamps if available |
| High | Project routes are duplicated as individual files | Metadata/content logic is repeated and harder to keep correct | `app/[locale]/projects/{dtalk-ecosystem,menu-qr,kindra}` | Consider one dynamic `[slug]` route with a project content registry | This improves sitemap, schema, related links, and metadata consistency |
| Medium | `/en` build route exists while sitemap uses `/` for default English | Likely correct with `localePrefix: "as-needed"`, but redirect behavior was not verified | Build output lists `/en`; `app/sitemap.ts` emits `https://benarfa.com` for English home | Needs verification | Test production redirects: `/en` should 301/308 to `/` or have a self-consistent canonical policy |
| Medium | Robots blocks AhrefsBot/SemrushBot/DotBot/MJ12/BLEXBot | May reduce third-party SEO tooling visibility and competitive monitoring | `app/robots.ts:13-16`; generated `robots.txt.body` | Verify whether blocking SEO tools is intentional | For launch audits, temporarily allow trusted SEO crawlers or accept lower external tool diagnostics |
| Medium | `Host` directive included in robots | Some crawlers ignore it; not harmful, but domain must be correct | `app/robots.ts:18-19` | Keep only if canonical domain verified | Do not rely on `Host` as a canonicalization substitute |
| Medium | No redirect map in repo | Domain normalization, trailing slashes, old URLs, and `/en` behavior cannot be verified from source | `next.config.mjs` has no `redirects()` | Needs verification | Add redirects only after domain/URL policy is confirmed |
| Low | Pagination is not implemented | Not an issue now because no blog/archive exists | No blog/category/tag routes found | Add pagination when blog/category pages are added | Use crawlable `/blog/page/2` or query strategy with canonical rules |

---

## 5. Metadata Audit

### Existing metadata

- Global localized metadata is generated in `app/[locale]/layout.tsx:45-108`.
- Root titles/descriptions exist for English and French (`layout.tsx:52-60`).
- Open Graph metadata exists globally (`layout.tsx:81-89`).
- Twitter metadata exists globally (`layout.tsx:90-96`).
- Robots metadata exists globally (`layout.tsx:97-101`).
- Canonical/language alternates exist globally but are home-only (`layout.tsx:102-105`).
- Icons are defined globally (`layout.tsx:106`).
- Project pages define static metadata and OG images (`app/[locale]/projects/*/page.tsx`).
- Generated HTML includes viewport metadata automatically.

### Metadata findings

| Priority | Problem | Why it matters | Where / evidence | Recommended fix | Implementation notes |
|---:|---|---|---|---|---|
| Critical | Child project titles duplicate brand suffix | Search snippets look unpolished; titles may truncate important terms | Generated build: `D-Talk ... | Hamza Benarfa | Hamza Benarfa`; source `layout.tsx:64-67` plus child titles with suffix | Remove `| Hamza Benarfa` from child titles or use absolute titles | Standardize: `title: "D-Talk Ecosystem — Fashion Marketplace Case Study"` |
| Critical | Project canonical/alternate metadata is inherited from home | Indexing and hreflang issues | See Critical Issues | Generate path-aware metadata | Central helper should cover canonical, alternates, `openGraph.url`, and Twitter image |
| High | Project Twitter cards are inherited from home | Social previews for case studies can show wrong title/description/image | Generated project HTML: Twitter title/image are home values | Add `twitter` metadata per project | Use the same project image as OG or create project-specific `/api/og?project=` route |
| High | Project `og:url` is missing | Social parsers and entity reconciliation lose canonical page URL | Generated project HTML: `og_url: MISSING` | Add `openGraph.url` per route | Use absolute URL helper; include locale-specific URL |
| High | Project metadata is not localized | French project routes have English titles/descriptions in generated HTML | `app/[locale]/projects/*/page.tsx` exports static metadata; generated `.next/server/app/fr/projects/kindra.html` English title/description | Use `generateMetadata({ params })` and translations/content registry | Pull from `messages/fr.json` or a structured project content source |
| Medium | Global keywords are generic | Meta keywords are mostly ignored by major search engines and can look dated | `layout.tsx:69-78` | Do not rely on meta keywords; if kept, make them page-specific | Focus on title/description/schema/body content instead |
| Medium | Root OG image is one generic endpoint | Fine for home, but project/social campaigns need page-specific images | `layout.tsx:88`; `app/api/og/route.tsx` | Add dynamic OG route parameters or static project OG images | Use project title, category, and screenshot in the image |
| Medium | No explicit `themeColor`/viewport export in metadata | Viewport exists in generated HTML; theme color is only in manifest | `app/manifest.ts:10-11`; generated HTML has viewport | Optional | Add `export const viewport` if you need theme color/media color variants |
| Low | Authors only global | Project pages do not define reviewer/author/editor metadata | `layout.tsx:79` | Add author and reviewed-by info to Article/Profile schemas | Useful for E-E-A-T/GEO rather than direct ranking |

---

## 6. Structured Data / Schema Audit

### Current schema implementation

- `components/seo/seo.tsx:8-15` renders structured data globally from the layout.
- `components/seo/structured-seo-data.tsx` supports `Organization`, `WebSite`, `BreadcrumbList`, `FAQPage`, and `ProfilePage` types.
- The `Organization` type currently returns a `Person` schema (`structured-seo-data.tsx:16-56`).
- `WebSite` schema includes `name`, `url`, `inLanguage`, and author (`structured-seo-data.tsx:58-69`).
- `FAQPage` schema uses `DEFAULT_FAQS` unless custom FAQs are passed (`structured-seo-data.tsx:82-93`, `142-169`).
- `ProfilePage` schema includes `dateModified: new Date().toISOString().split("T")[0]` (`structured-seo-data.tsx:95-111`).
- JSON-LD is injected via `next/script` with `strategy="afterInteractive"` (`structured-seo-data.tsx:132-138`).

### Schema findings

| Priority | Problem | Why it matters | Where / evidence | Recommended fix | Implementation notes |
|---:|---|---|---|---|---|
| High | JSON-LD is injected after interactivity, not as immediate server-rendered JSON-LD in the document head/body | Search engines can process JS, but server-rendered JSON-LD is more reliable and easier to validate | `components/seo/structured-seo-data.tsx:132-138`; generated HTML count of immediate `application/ld+json` tags was `0` | Render JSON-LD as server markup in layout/page components | Use a server component `<script type="application/ld+json" dangerouslySetInnerHTML=... />` without `next/script` for structured data |
| High | Global FAQ schema does not match visible FAQ content | FAQ rich result eligibility can be affected if schema questions differ from visible content | Visible FAQ: `app/[locale]/(home)/_components/faq.tsx:10-31`; schema FAQ defaults: `structured-seo-data.tsx:142-169` | Use the same FAQ data source for UI and JSON-LD | Store FAQ data in typed content files by locale and pass it to both UI and schema |
| High | Same global FAQPage/ProfilePage schemas render on project pages | Project pages should not all claim the same FAQ/ProfilePage as their primary schema | `SEO` is rendered in `app/[locale]/layout.tsx:125` for every route | Scope schema by route | Home: Person/WebSite/ProfilePage/FAQ. Project pages: WebPage/Article/CreativeWork/BreadcrumbList plus Person author |
| High | BreadcrumbList support exists but is never wired | Breadcrumb rich results and crawl context are missing | `components/seo/seo.tsx:14`; no project page passes breadcrumbs | Add visible breadcrumbs and JSON-LD breadcrumbs per route | Breadcrumbs: Home → Projects → Project name; localize labels |
| High | No WebPage/Article/BlogPosting/CreativeWork schema for project case studies | Case studies are the most valuable content but lack page-level structured summaries | `components/seo/structured-seo-data.tsx:4` supported types omit these | Add `WebPage` + `Article` or `CreativeWork`/`SoftwareSourceCode`-adjacent schema as appropriate | Avoid unsupported/fake claims; include `headline`, `description`, `author`, `datePublished`, `dateModified`, `image`, `inLanguage`, `mainEntityOfPage` |
| Medium | `Organization` prop returns `Person` schema | Naming mismatch increases maintenance errors | `components/seo/seo.tsx:10`; `structured-seo-data.tsx:115-117` | Rename type to `Person`, or add a real Organization schema if an organization exists | For a personal portfolio, `Person` + `ProfilePage` is more accurate than Organization |
| Medium | No Service schema for service/offering pages | Service intent is present in content but not represented as structured entities | `capabilities.tsx:10-43` has service data but no schema | Add Service schema when dedicated service pages exist | Do not add broad Service schema globally until service pages have visible content |
| Medium | No Review/Testimonial schema | Testimonials exist in `messages/*.json`, but are not rendered visibly in current page components | `messages/en.json:244-257`; no component usage found | Needs verification before using Review schema | Only mark up real, visible, consented testimonials with verifiable attribution |
| Low | `dateModified` uses current date | Every build updates ProfilePage date regardless of content change | `structured-seo-data.tsx:110` | Use content version date | Keep dates stable and truthful |

### Relevant schema opportunities

| Schema type | Current status | Recommendation |
|---|---|---|
| Person | Present, but rendered via `Organization` prop | Keep and server-render; add `sameAs`, `knowsAbout`, `hasOccupation`, `worksFor` only if accurate |
| Organization | Not truly present | Add only if there is a real business entity; otherwise avoid |
| WebSite | Present | Add `potentialAction` only if internal search exists; otherwise omit |
| WebPage | Missing | Add for home, service pages, project pages, blog posts |
| ProfilePage | Present globally | Keep only on home/about/profile route |
| BreadcrumbList | Supported but unused | Add visible breadcrumbs and JSON-LD on project/blog/category/service pages |
| FAQPage | Present globally but mismatched | Render only where visible FAQ exists and use same data source |
| Article / BlogPosting | Missing | Add when blog/content routes exist |
| HowTo | Missing | Use only for true step-by-step guides, not generic service pages |
| Product | Not relevant for portfolio itself | Could be relevant only for productized offerings if created |
| Service | Missing | Add to dedicated service pages such as MVP development, SaaS platform development, DevOps launch support |
| LocalBusiness | Needs verification | Use only if the freelancer has a public local business profile/address/service area strategy |
| Review | Needs verification | Use only with visible, real testimonials/reviews |

---

## 7. GEO / AI Search Visibility Audit

Generative Engine Optimization depends on clear entity definitions, factual consistency, source-like pages, extractable summaries, and machine-readable context. The repo has useful raw material but not enough AI-search structure.

### Current strengths

- Clear entity: Hamza Benarfa as full-stack developer in layout metadata and Person schema.
- Clear domains of expertise: SaaS, dashboards, web platforms, custom editors, DevOps, Next.js, React, TypeScript, NestJS, PostgreSQL, Docker.
- Project case studies include rich architecture and problem/solution content.
- Bilingual message files exist (`messages/en.json`, `messages/fr.json`).
- Architecture docs exist under `docs/kindra-docs/*` and `docs/menu-qr-docs/*`, but they are not routed as website content.

### GEO findings

| Priority | Problem | Why it matters | Where / evidence | Recommended fix | Implementation notes |
|---:|---|---|---|---|---|
| High | No `llms.txt` or AI-readable site summary | AI crawlers and answer engines lack a concise map of important pages/entities | `public/llms.txt` and `app/llms.txt` absent | Add `app/llms.txt/route.ts` or `public/llms.txt` | Include canonical URL, author bio, services, project URLs, topics, update policy, contact, and source docs |
| High | No dedicated author/about entity page | AI systems benefit from a stable page defining credentials, services, locations, and sameAs links | No `app/[locale]/about` or author route | Add `/about` or `/author/hamza-benarfa` | Include concise bio, expertise, work history, project links, contact, languages, location/service area |
| High | Project content is not structured as source-like summaries | Long case studies exist, but there are no consistent factual summary blocks | `app/[locale]/projects/*/client.tsx` | Add “At a glance” facts to every project | Fields: project type, role, industry, stack, problem, solution, outcomes, year, live URL, repo/docs if public |
| High | Docs contain valuable long-form source material but are not routable | AI/search systems cannot discover `docs/*` through the website | `docs/kindra-docs/*`, `docs/menu-qr-docs/*` | Convert docs into public case-study sections or blog/reference pages | Keep internal-only details out; publish polished summaries with canonical URLs |
| High | Claims need evidence or “Needs verification” | AI-answer platforms can amplify unsupported metrics | README has claims such as performance scores and project metrics; messages include Lighthouse claims | Add evidence, source links, or remove/soften claims | Examples needing verification: Lighthouse 90+/95+, active designer/user counts, “100+ language support” |
| Medium | Entity naming/domain/contact inconsistent | Weakens entity reconciliation | Code uses `benarfa.com`; README uses `hamzabenarfa.com`; schema email `contact@benarfa.com` | Verify canonical identity and update all sources | Keep same name, URL, contact, social profiles, and language info across schema, pages, README, llms.txt |
| Medium | No machine-readable service taxonomy | AI systems cannot easily classify offerings | Service data exists in `capabilities.tsx:10-43` but only on home | Create service hub and service detail pages | Add concise descriptions, ideal client, deliverables, FAQs, related projects, schema |
| Medium | No content update policy | AI systems favor current and maintained sources | No visible update dates except dynamic schema/build dates | Add real `dateModified`/content freshness fields | Use stable update dates from content files |

### Recommended AI-readable entity summary

Create a single canonical entity description and reuse it in schema, about page, llms.txt, and homepage:

> Hamza Benarfa is a Tunisia-based independent full-stack developer who builds production-ready SaaS platforms, dashboards, marketplaces, e-commerce systems, custom editors, and launch infrastructure for founders, agencies, and small teams. Core stack includes Next.js, React, TypeScript, Node/NestJS, PostgreSQL, Docker, CI/CD, and cloud deployment.

Needs verification before publishing: exact legal/business name, canonical domain, preferred public email, service area wording, years of experience, availability, and measurable outcomes.

---

## 8. AEO / Answer Engine Optimization Audit

### Current strengths

- Home page includes a FAQ section (`app/[locale]/(home)/_components/faq.tsx`).
- Home hero and services answer “what do you build?” and “who is this for?”
- Project pages use strong problem/solution and architecture sections.

### AEO findings

| Priority | Problem | Why it matters | Where / evidence | Recommended fix | Implementation notes |
|---:|---|---|---|---|---|
| High | Visible FAQ and FAQ schema are different | Answer engines and rich-result validators expect schema to reflect visible content | UI FAQ: `faq.tsx:10-31`; schema FAQ: `structured-seo-data.tsx:142-169` | Use a shared typed FAQ data source by locale | Render FAQ UI and JSON-LD from the same array |
| High | FAQ accordion uses clickable `div role="button"` without `aria-expanded` | Accessibility and snippet extraction suffer | `faq.tsx:50-57`; `experience.tsx:87-93` | Use real `<button>` elements or add ARIA state/control IDs | Prefer semantic button inside heading pattern for FAQ questions |
| High | No concise answer blocks above long sections | AI answer engines prefer direct, extractable answers | Home/project sections are narrative-first | Add “Short answer” / “TL;DR” blocks | Example: “Can Hamza build a SaaS MVP?” with 40-60 word answer |
| Medium-High | No comparison tables | Comparison queries are strong commercial-intent opportunities | No comparison route/table found | Add comparison pages/sections | Examples: freelancer vs agency, Next.js vs WordPress for MVP, custom SaaS vs no-code |
| Medium-High | No how-to content | How-to pages can win answer snippets | No blog/how-to routes | Add practical guides | Examples: “How to scope a SaaS MVP”, “How to launch a QR menu SaaS”, “How to plan role-based dashboards” |
| Medium | No glossary/definition pages | Definition pages help entity coverage for AI systems | No glossary route/content | Add `/glossary` | Terms: MVP, RBAC, custom editor, multi-tenant SaaS, webhook, CI/CD, R2, server actions |
| Medium | No dedicated service FAQs | Commercial questions are buried in home FAQ | No service routes | Add service-specific FAQ blocks | Each service page should answer cost, timeline, stack, deliverables, handoff, maintenance |
| Low | FAQ schema currently global | FAQPage should be scoped to pages with matching visible FAQs | `SEO` in global layout | Render FAQPage only on relevant routes | Avoid marking every page as an FAQ page |

---

## 9. Content Architecture Audit

### Current architecture

Current routable content is limited to:

- Home page: `app/[locale]/(home)/page.tsx`
- Project case studies:
  - `app/[locale]/projects/dtalk-ecosystem/page.tsx`
  - `app/[locale]/projects/menu-qr/page.tsx`
  - `app/[locale]/projects/kindra/page.tsx`
- Generated utility routes:
  - `/sitemap.xml`
  - `/robots.txt`
  - `/manifest.webmanifest`
  - `/api/og`

Absent content structures from repository inspection:

- No `app/[locale]/blog`
- No `app/[locale]/tags`
- No `app/[locale]/category`
- No `app/[locale]/glossary`
- No `app/[locale]/services`
- No `app/[locale]/about`
- No `content`, `posts`, or MDX source directory

### Content architecture findings

| Priority | Problem | Why it matters | Where / evidence | Recommended fix | Implementation notes |
|---:|---|---|---|---|---|
| High | No service landing pages | Home page is too broad to rank for service-intent searches | Service data only in `capabilities.tsx:10-43` | Add `/services` hub and detail pages | Start with MVP development, SaaS platform development, custom editor development, DevOps launch infrastructure |
| High | No blog/content system | No way to target informational and commercial-intent long-tail queries | No blog/content directories found | Add MDX or typed content registry | Keep bilingual strategy manageable: launch English first only if French translation cannot be maintained; mark French as Needs verification |
| High | No topic clusters | The site cannot build topical authority beyond portfolio pages | No category/tag routes | Create clusters around core services/industries | Connect guides → service pages → case studies → FAQs |
| High | No author/about page | Weak E-E-A-T/entity consolidation | No `/about` route | Add author/about page | Include sameAs, expertise, work history, speaking/teaching, contact, CV, project links |
| Medium-High | Project docs are not routed | Existing docs could become valuable source pages | `docs/kindra-docs/*`, `docs/menu-qr-docs/*` | Repurpose into public case-study expansions | Publish sanitized architecture summaries and link them from project pages |
| Medium | No tag/category taxonomy | Future blog scale would become messy | No tags/categories | Define taxonomy before adding posts | Limit categories to 6-8 and tags to reusable technical/business topics |
| Medium | No footer crawl map | Important pages would be harder to discover as site grows | Footer only has copyright/back-to-top in `page.tsx:41-44` | Add footer navigation | Include services, projects, blog, about, contact, language links |

### Recommended top-level information architecture

```text
/
/fr
/about
/fr/about
/services
/services/mvp-development
/services/saas-platform-development
/services/custom-editor-development
/services/devops-launch-infrastructure
/projects
/projects/dtalk-ecosystem
/projects/menu-qr
/projects/kindra
/blog
/blog/[slug]
/categories/[category]
/tags/[tag]
/glossary
/glossary/[term]
/faq
/llms.txt
```

If maintaining full French content is not feasible, launch with equivalent French core pages first (home, about, services, projects) and mark blog translation policy clearly.

---

## 10. Blog / Tags / Content Plan

### Recommended categories

| Category | Purpose | Example target intent |
|---|---|---|
| SaaS MVP Development | Commercial/informational hub for founder MVP queries | “build SaaS MVP with Next.js” |
| Full-Stack Architecture | Technical credibility and AI/entity depth | “role based dashboard architecture” |
| Next.js & React Engineering | Technology-specific authority | “Next.js app router SaaS patterns” |
| E-Commerce & Marketplace | Connects Kindra and D-Talk case studies | “fashion marketplace platform development” |
| Restaurant Tech / QR Menus | Connects Menu QR case study to niche industry searches | “digital menu SaaS for restaurants” |
| Custom Editors & Canvas Tools | Differentiating niche around Konva/Fabric/canvas | “build product customizer web app” |
| DevOps & Launch Infrastructure | High-trust technical operations topics | “CI/CD for SaaS MVP” |
| Founder Guides | Conversion-oriented educational content | “how to scope an MVP” |

### Recommended tags

`Next.js`, `React`, `TypeScript`, `NestJS`, `Node.js`, `PostgreSQL`, `Docker`, `CI/CD`, `Vercel`, `Cloudflare`, `Azure`, `Stripe`, `RBAC`, `OAuth`, `SaaS`, `MVP`, `Marketplace`, `E-Commerce`, `Restaurant Tech`, `Fashion Tech`, `QR Codes`, `Custom Editors`, `Konva.js`, `Fabric.js`, `Canvas`, `Performance`, `Accessibility`, `SEO`, `AI OCR`, `Multi-tenant SaaS`, `Admin Dashboards`.

### Initial blog post ideas

| Cluster | Post idea | Search / answer intent | Internal links |
|---|---|---|---|
| SaaS MVP | How to scope a SaaS MVP before writing code | Founder education, conversion | MVP service, Methodology, Kindra |
| SaaS MVP | SaaS MVP checklist: auth, roles, billing, admin, deployment | Featured snippet/list | MVP service, SaaS service |
| SaaS MVP | Freelance developer vs agency for an MVP: when each makes sense | Comparison / commercial | Services, Contact |
| Next.js | Why Next.js is a strong fit for founder-led SaaS MVPs | Tech decision support | MVP service, project pages |
| Next.js | App Router patterns for dashboards and admin panels | Developer authority | D-Talk, Menu QR |
| Full-stack | Role-based access control for SaaS dashboards | Technical/AEO | D-Talk, SaaS service |
| Full-stack | Designing admin panels that operators actually use | Product/technical | Kindra, D-Talk |
| E-commerce | Fashion e-commerce platform architecture: products, variants, checkout | Industry authority | Kindra |
| E-commerce | Marketplace vs e-commerce store: architecture differences | Comparison | D-Talk, Kindra |
| Restaurant Tech | How QR menu platforms work behind the scenes | Industry long-tail | Menu QR |
| Restaurant Tech | Digital menu SaaS features restaurants actually need | Commercial/niche | Menu QR, SaaS service |
| Custom Editors | Building product customizers with canvas tools | Differentiator | D-Talk, custom editor service |
| Custom Editors | Konva.js vs Fabric.js for web-based design editors | Comparison | Custom editor service, D-Talk |
| DevOps | Launch checklist for SaaS MVPs on Vercel/Docker/cloud | Checklist/AEO | DevOps service, Methodology |
| DevOps | CI/CD basics for small teams shipping production apps | Educational | DevOps service |
| GEO/AEO | How technical founders should document products for AI search | Meta/content strategy | Blog, services |
| Accessibility | Accessibility checks that also improve SEO | SEO/AEO | Performance/accessibility service if created |
| Performance | Core Web Vitals checklist for Next.js landing pages | Technical authority | Home, services |

### Topic cluster structure

```text
Pillar: SaaS MVP Development
  ├─ Service page: /services/mvp-development
  ├─ Guide: /blog/how-to-scope-saas-mvp
  ├─ Checklist: /blog/saas-mvp-checklist
  ├─ Comparison: /blog/freelance-developer-vs-agency-mvp
  ├─ Case study: /projects/kindra
  └─ Case study: /projects/menu-qr

Pillar: Custom Editors & Product Customizers
  ├─ Service page: /services/custom-editor-development
  ├─ Guide: /blog/build-product-customizer-web-app
  ├─ Comparison: /blog/konva-vs-fabric-js
  └─ Case study: /projects/dtalk-ecosystem

Pillar: Restaurant Tech SaaS
  ├─ Industry page: /industries/restaurant-tech
  ├─ Guide: /blog/how-qr-menu-platforms-work
  ├─ Checklist: /blog/digital-menu-saas-features
  └─ Case study: /projects/menu-qr
```

### Internal linking recommendations

- Every service page links to 1-3 relevant case studies and 3-5 relevant posts.
- Every blog post links upward to a service pillar and sideways to related posts.
- Every case study links to relevant service pages, technology glossary terms, and related case studies.
- Add a “Related reading” block below project pages.
- Add breadcrumbs on all non-home pages.
- Add footer links to services, projects, blog, glossary, FAQ, about, and contact.

---

## 11. Performance and Core Web Vitals Audit

### Current strengths

- Routes are statically generated for home/project locale pages.
- `next/image` is used for images in header, project cards, and project pages.
- `next/font/google` is used with `display: "swap"` (`app/[locale]/layout.tsx:16-34`).
- Next image config enables AVIF/WebP formats (`next.config.mjs:5-13`).
- `optimizePackageImports` is configured for `framer-motion` and `lucide-react` (`next.config.mjs:14-16`).
- Build passed successfully.

### Evidence from build/assets

- Largest generated JS chunks observed: ~208.8 KB, ~141.4 KB, ~141.4 KB, ~110.0 KB.
- Main generated CSS chunk observed: ~108.9 KB.
- Largest public assets include `public/d-talk.png` (~932.6 KB), `public/kindra.png` (~765.1 KB), `public/dtalk-landing-full.webp` (~489.9 KB), and manifest icons around ~344 KB / ~69 KB.
- Project client components are large and fully client-side: D-Talk 638 lines, Kindra 615 lines, Menu QR 469 lines.
- Project pages import `framer-motion`, scroll listeners, and many `lucide-react` icons (`app/[locale]/projects/*/client.tsx`).

### Performance findings

| Priority | Problem | Why it matters | Where / evidence | Recommended fix | Implementation notes |
|---:|---|---|---|---|---|
| High | Project pages are large client components | More JS hydration and runtime work can hurt INP/LCP on mobile | `'use client'` at top of all project client files; framer-motion imports | Split server content from client enhancements | Render static article content as server components; isolate progress bar/animations into small client components |
| High | Framer Motion and scroll listeners are used across every project page | Scroll-based animation can increase main-thread work | `useScroll`, `useSpring`, `useTransform`, `window.addEventListener('scroll')` in project clients | Reduce motion scope and respect reduced motion | Use CSS/sticky where possible; throttle/avoid scroll state; disable motion for reduced motion |
| Medium-High | Home custom cursor runs RAF loop | Desktop main-thread work for decorative effect | `custom-cursor.tsx:32-41`; CSS cursor hidden in `globals.css:37-45` | Make cursor optional or remove | Avoid hiding native cursor; disable on lower-power devices and reduced motion already partly handled |
| Medium-High | Above-the-fold project images lack consistent priority | LCP can degrade on project pages with hero images | Kindra has `priority` at `kindra/client.tsx:304`; D-Talk/Menu QR images do not show priority | Add `priority` only for true LCP image per route | For text-first heroes, avoid priority on below-fold images; verify with Lighthouse |
| Medium | Large unused PNGs remain in `public` | Public assets do not affect bundle by themselves, but can be crawled/served if linked; repo bloat and accidental usage risk | `public/d-talk.png`, `public/kindra.png`, `public/menu-qr.png` | Keep only if needed; otherwise archive outside public | Do not delete without explicit approval; replace references with WebP/AVIF where used |
| Medium | Image cache TTL is low | `minimumCacheTTL: 60` may be low for static portfolio assets | `next.config.mjs:12` | Increase cache TTL for stable image assets | Use hashed/static asset caching via deployment platform where possible |
| Medium | Global analytics and speed scripts load on all pages | Third-party/analytics scripts can affect CWV | `app/[locale]/layout.tsx:126-127` | Keep, but verify impact | Use Vercel data to monitor; do not add more scripts without budget |
| Medium | Visual effects use blur, backdrop blur, gradients, mix-blend-mode | GPU/compositing costs can affect lower-end devices | `app/globals.css` blur/mix-blend/backdrop patterns; project pages have large blurred backgrounds | Profile on mobile | Reduce blur radius/count on mobile; add reduced-motion/reduced-transparency variants |
| Medium | No Lighthouse/CWV budgets in repo | Claims cannot be enforced | README claims CWV targets; no performance tests/scripts | Add budget checks | Use Lighthouse CI or WebPageTest in CI; Needs verification with production URL |
| Low | Baseline browser mapping warning during build | Build warns dependency data is over two months old | `npm run build` output | Update dependency in normal maintenance | No package install was performed during this audit |

---

## 12. Accessibility and Semantic HTML Audit

### Current strengths

- Pages use semantic landmarks: `nav`, `main`, `header`, `section`, `article`, `aside`, `footer` appear throughout route components.
- Home has one clear `h1` in `hero.tsx:25-37`.
- Project pages include `h1` headings and section headings.
- `next/image` includes alt attributes in all found image usages.
- Custom cursor respects fine pointer and reduced motion in JS (`custom-cursor.tsx:9-13`).

### Accessibility findings

| Priority | Problem | Why it matters | Where / evidence | Recommended fix | Implementation notes |
|---:|---|---|---|---|---|
| High | Clickable accordion rows use `div role="button"` instead of semantic buttons | Screen reader, keyboard, and state semantics are weaker | `faq.tsx:50-57`; `experience.tsx:87-93` | Use `<button>` for accordion triggers | Add `aria-expanded`, `aria-controls`, IDs, and keep visible content in semantic containers |
| High | No visible focus style found in CSS search | Keyboard users may not see where focus is | `app/globals.css` has no `:focus`/`:focus-visible` rules found | Add global `:focus-visible` styles | Ensure high contrast against dark backgrounds; include buttons and links |
| Medium-High | Custom cursor hides native cursor on desktop | Can reduce usability and accessibility | `globals.css:37-45`; `custom-cursor.tsx` | Avoid `cursor: none`, or scope only to decorative zones | Current mobile fallback restores cursor at `globals.css:1632-1641`, but desktop still affected |
| Medium-High | Reveal animations hide content until JS adds classes | If JS fails, content with `.reveal` stays opacity 0 | `globals.css:1496-1517`; `scroll-reveal.tsx:6-25` | Make content visible by default and enhance with JS/CSS | Use `@media (scripting: enabled)` if supported or add `no-js` fallback |
| Medium | Project navigation buttons lack `aria-current` | Active table-of-contents state is visual only | Project client nav button maps | Add `aria-current="true"` or `aria-current="location"` | Helps assistive tech and semantic navigation |
| Medium | Header avatar alt is `B` | Not descriptive | `components/header.tsx:10` | Use `alt="Hamza Benarfa portrait"` or empty alt if decorative | Because it is inside brand link, descriptive brand text may be sufficient; choose one |
| Medium | No skip link found | Keyboard users must tab through fixed nav | No skip link in layout/page | Add “Skip to content” link | Target `<main id="main-content">`; home currently has `<main>` without ID |
| Medium | No language switcher found | Users/crawlers cannot easily navigate language equivalents | `i18n/navigation.ts` exists; no language switcher component found | Add visible language links | Link current path to `en`/`fr` equivalent and align with hreflang |
| Low | Icons may need explicit decorative semantics | Needs verification; lucide icons are likely decorative in many contexts | `lucide-react` imports across project pages | Mark decorative icons `aria-hidden` where not meaningful | Avoid duplicate spoken labels |

---

## 13. Internal Linking and Navigation Audit

### Current state

- Home nav links to in-page anchors: Work, Services, Process, Contact (`components/header.tsx:17-22`).
- Home project cards link to project pages (`projects-section.tsx:81`).
- Project pages link back to `/#work` and external live project URLs.
- Kindra links to another project (`kindra/client.tsx:566-583`).
- Footer only includes copyright and back-to-top (`app/[locale]/(home)/page.tsx:41-44`).

### Internal linking findings

| Priority | Problem | Why it matters | Where / evidence | Recommended fix | Implementation notes |
|---:|---|---|---|---|---|
| High | No breadcrumbs on project pages | Weaker crawl hierarchy and missing BreadcrumbList rich results | Breadcrumb schema supported but unused | Add visible breadcrumbs to all non-home pages | Home → Projects → Project Name; localize labels |
| High | No project index route | `/projects` hub does not exist as a standalone crawlable landing page | No `app/[locale]/projects/page.tsx` found | Add projects hub | Include filters by industry/stack/type, and link to case studies |
| High | No services hub/detail pages | Service keywords are only on home anchors | No `app/[locale]/services` | Add services hub and detail pages | Link service pages from nav/footer/project pages |
| Medium-High | Footer has no crawlable sitemap-like links | As site grows, important pages may be buried | `page.tsx:41-44` | Add footer navigation groups | Services, Projects, Blog, About, Contact, Languages, Social profiles |
| Medium | Project pages mostly do not link to each other | Related project discovery is weak | Only Kindra has “Explore another project” | Add related projects module to all project pages | Use industry/stack relationships from `PROJECTS` |
| Medium | No contextual links in body copy | Search engines and users lose semantic associations | Project body copy plain text | Link stack terms to glossary, services to service pages, industries to category pages | Keep links editorial and sparse |
| Medium | No language switcher | Users cannot move between localized equivalent URLs easily | No component found | Add current-path language switcher | Reuse `i18n/navigation.ts` helpers |
| Low | Header nav hidden on mobile | Mobile users lose section nav | `globals.css:1555-1562` hides `.nav-links` and `.nav-status` | Add mobile menu or footer section nav | Not an SEO blocker but affects UX/conversion |

---

## 14. Implementation Roadmap

### Phase 1: Immediate Fixes

| Task | Reason | Files likely affected | Priority | Estimated effort | Acceptance criteria |
|---|---|---|---:|---:|---|
| Verify canonical production domain | Prevent indexing wrong host | Env/config, README, deployment settings | Critical | S | One canonical host chosen; all code/docs/schema use it; redirects verified for old/www/http variants |
| Add path-aware canonical and hreflang helper | Fix project indexing and language clusters | New `lib/seo.ts` or `components/seo/*`; `app/[locale]/layout.tsx`; project pages | Critical | M | Generated project HTML has self-referencing canonical and matching `en`/`fr` alternates plus `x-default` |
| Fix project title duplication | Improve snippets and metadata quality | `app/[locale]/projects/*/page.tsx`; metadata helper | Critical | S | Generated titles contain one brand suffix maximum |
| Add project-specific Twitter and OG URL metadata | Fix social previews | Project page metadata; `app/api/og/route.tsx` optional | Critical | S-M | Generated project HTML has project `twitter:title`, `twitter:description`, `twitter:image`, and `og:url` |
| Localize project metadata | Stop French pages from serving English snippets | `messages/*.json`; project metadata generation | High | M | French project pages have French titles/descriptions and correct French URLs |

### Phase 2: Foundation Improvements

| Task | Reason | Files likely affected | Priority | Estimated effort | Acceptance criteria |
|---|---|---|---:|---:|---|
| Move JSON-LD to server-rendered route-specific components | Improve schema reliability | `components/seo/structured-seo-data.tsx`; `components/seo/seo.tsx`; layout/pages | High | M | View-source/generated HTML contains actual `application/ld+json` scripts for relevant route schemas |
| Replace global FAQ schema with shared visible FAQ data | Align UI/schema and avoid global FAQ misuse | `faq.tsx`; `structured-seo-data.tsx`; content data files | High | M | FAQ schema exactly matches visible FAQ on the page and appears only on pages with visible FAQ |
| Add Breadcrumb component + BreadcrumbList schema | Improve navigation and rich result eligibility | New `components/breadcrumbs.tsx`; project pages; schema helper | High | M | Every non-home page shows breadcrumbs and emits valid BreadcrumbList JSON-LD |
| Improve sitemap | Better crawl and hreflang discovery | `app/sitemap.ts` or custom sitemap route; `data/consts.ts` | High | M | Sitemap uses content-specific lastmod and includes all public routes; hreflang included if supported/custom |
| Review robots policy | Avoid unintentionally blocking SEO tools | `app/robots.ts` | Medium | S | Robots policy documented; major crawlers blocked only if intentional |
| Add project index page | Improve crawl path and portfolio discovery | `app/[locale]/projects/page.tsx`; sitemap; nav/footer | High | M | `/projects` and `/fr/projects` list all case studies with metadata/schema |

### Phase 3: Content Expansion

| Task | Reason | Files likely affected | Priority | Estimated effort | Acceptance criteria |
|---|---|---|---:|---:|---|
| Add service hub and service detail pages | Capture commercial-intent searches | `app/[locale]/services/*`; content registry; schema | High | L | At least 4 service pages live with FAQs, related projects, schema, and CTAs |
| Add about/author page | Strengthen entity/E-E-A-T/GEO | `app/[locale]/about/page.tsx`; schema | High | M | About page has bio, expertise, work history, sameAs, contact, and canonical metadata |
| Add blog content system | Build topical authority | `content/` or `app/[locale]/blog`; MDX/content utilities | High | L | Blog index, post pages, categories/tags, sitemap entries, and Article schema work |
| Publish first topic cluster | Start ranking for target topics | Blog posts + service pages | High | L | SaaS MVP cluster has pillar service page, 3 supporting posts, and internal links |
| Convert internal docs into public reference pages | Leverage existing depth | `docs/*` to content routes | Medium-High | M-L | Sanitized Kindra/Menu QR architecture articles are published and linked from case studies |
| Add glossary | Improve answer/entity coverage | `app/[locale]/glossary/*` | Medium | M | 15-25 terms with definitions, related posts, service links, and schema where appropriate |

### Phase 4: GEO / AEO Enhancements

| Task | Reason | Files likely affected | Priority | Estimated effort | Acceptance criteria |
|---|---|---|---:|---:|---|
| Add `llms.txt` | Give AI crawlers a concise site map and entity summary | `app/llms.txt/route.ts` or `public/llms.txt` | High | S-M | `/llms.txt` lists canonical pages, services, projects, topics, author, and update policy |
| Add “At a glance” project summary blocks | Make project facts extractable | Project client/page components; content registry | High | M | Every project has consistent facts: role, industry, stack, problem, solution, outcome, year |
| Add concise answer blocks to service/blog pages | Win answer snippets and AI answers | Service/blog templates | High | M | Pages include direct answer blocks near top with 40-80 word summaries |
| Add comparison pages | Capture high-intent decision queries | Blog/comparison routes | Medium-High | M | At least 3 comparison pages with tables and CTAs |
| Add how-to guides | Capture instructional queries | Blog routes | Medium-High | M | At least 3 how-to posts with step lists, diagrams/tables, and HowTo schema only where valid |
| Add trust/evidence module | Avoid unverifiable claims | Home/about/projects | Medium-High | M | Claims have supporting evidence or are marked/rewritten conservatively |

### Phase 5: Optimization and Monitoring

| Task | Reason | Files likely affected | Priority | Estimated effort | Acceptance criteria |
|---|---|---|---:|---:|---|
| Add Lighthouse/Next bundle budget checks | Prevent performance regressions | `package.json`; CI config | Medium | M | CI reports route CWV/lighthouse budgets or bundle-size thresholds |
| Split client-heavy project pages | Reduce hydration and improve CWV | `app/[locale]/projects/*/client.tsx`; new server/client components | Medium-High | L | Static content is server-rendered; only interactive widgets hydrate |
| Add accessibility regression checks | Protect discoverability/usability | `package.json`; test scripts | Medium | M | Axe or Playwright accessibility smoke tests cover home and project pages |
| Connect Search Console and submit sitemap | Monitor indexing and search performance | Deployment/admin, not repo | High / Needs verification | S | Property verified; sitemap submitted; coverage checked after deployment |
| Validate schema in Rich Results / Schema validators | Catch markup errors | Generated pages | High | S | Home/project pages pass validator checks with intended schema only |
| Establish content refresh process | Keep GEO/AEO facts current | Content docs/process | Medium | S-M | Each content item has owner, dateModified, review cadence, and update checklist |

---

## 15. Recommended File Changes

Do not treat this as implementation approval; this is the recommended file/change inventory for a future execution phase.

### Create

- `lib/seo.ts` — canonical URL, alternates, metadata, and OG/Twitter helpers.
- `lib/site.ts` or `data/site.ts` — canonical domain, author/entity data, social links, contact, languages.
- `components/seo/json-ld.tsx` — server-rendered JSON-LD component.
- `components/seo/schema-builders.ts` — typed builders for Person, WebSite, WebPage, Article, BreadcrumbList, FAQPage, Service.
- `components/breadcrumbs.tsx` — visible breadcrumbs plus schema input.
- `components/related-content.tsx` — related projects/posts/services module.
- `components/faq-section.tsx` — semantic FAQ with shared data and ARIA.
- `app/[locale]/projects/page.tsx` — project index route.
- `app/[locale]/about/page.tsx` — author/entity page.
- `app/[locale]/services/page.tsx` — service hub.
- `app/[locale]/services/mvp-development/page.tsx`
- `app/[locale]/services/saas-platform-development/page.tsx`
- `app/[locale]/services/custom-editor-development/page.tsx`
- `app/[locale]/services/devops-launch-infrastructure/page.tsx`
- `app/[locale]/blog/page.tsx` — blog index.
- `app/[locale]/blog/[slug]/page.tsx` — blog detail route.
- `app/[locale]/categories/[category]/page.tsx` — category archive.
- `app/[locale]/tags/[tag]/page.tsx` — tag archive.
- `app/[locale]/glossary/page.tsx` and `app/[locale]/glossary/[term]/page.tsx` — glossary.
- `app/llms.txt/route.ts` or `public/llms.txt` — AI-readable site guide.
- `content/projects.ts` — project content registry with localized metadata, `updatedAt`, images, related links, FAQs.
- `content/faqs.ts` — shared localized FAQ data.
- `content/services.ts` — service taxonomy and page content.
- `content/blog/*.mdx` or typed post files — blog source.
- `content/glossary.ts` — glossary terms.

### Modify

- `app/[locale]/layout.tsx` — keep only global defaults; avoid home-specific canonical/alternates applying to children; render route-safe schemas only.
- `app/[locale]/projects/*/page.tsx` — replace static metadata with locale/path-aware `generateMetadata`, or migrate to `[slug]` dynamic route.
- `app/sitemap.ts` — include all public routes, stable `lastModified`, and hreflang alternates if supported/customized.
- `app/robots.ts` — verify blocked crawlers and canonical host.
- `app/api/og/route.tsx` — support dynamic page/project-specific social images or replace with static generated OG images.
- `components/seo/structured-seo-data.tsx` — replace/rename; avoid `afterInteractive`; add route-specific schema types.
- `components/seo/seo.tsx` — stop rendering all schemas globally; accept route-specific schema props.
- `app/[locale]/(home)/_components/faq.tsx` — use semantic FAQ component and shared data.
- `app/[locale]/(home)/_components/experience.tsx` — use semantic accordion pattern.
- `components/header.tsx` — add language switcher, better avatar alt, mobile nav, or link to new hubs.
- `app/[locale]/(home)/page.tsx` — add main ID/skip target, richer footer links, and possibly localized content.
- `app/globals.css` — add focus-visible styles, no-JS reveal fallback, reduced-motion rules, and mobile performance reductions.
- `README.md` — align canonical domain, contact email, claims, project list, and package manager instructions with actual repo.
- `data/consts.ts` — add `updatedAt`, `industry`, `category`, `summary`, `localeContent`, `relatedProjectSlugs`, `featured`, `priority`, `ogImage` fields.
- `messages/en.json` and `messages/fr.json` — remove unused or duplicated content, or wire it into the UI and metadata.

---

## 16. Final Checklist

### Launch-critical SEO

- [ ] Canonical production domain verified.
- [ ] `NEXT_PUBLIC_WEB_URL` set correctly in production.
- [ ] All non-canonical host variants redirect with 301/308.
- [ ] `/en` default-locale behavior verified and documented.
- [ ] Every indexable page has a self-referencing canonical.
- [ ] Every localized page has correct `en`, `fr`, and `x-default` alternates.
- [ ] Project pages no longer canonicalize to home.
- [ ] Project titles do not duplicate brand suffix.
- [ ] Project metadata is localized on French routes.
- [ ] Project pages have `og:url`, project OG image, and project Twitter card metadata.
- [ ] Sitemap includes every public route.
- [ ] Sitemap uses stable, content-specific `lastModified` values.
- [ ] Robots policy reviewed; crawler blocks are intentional.
- [ ] Search Console property verified and sitemap submitted. **Needs verification**.

### Structured data

- [ ] JSON-LD is server-rendered and visible in generated HTML.
- [ ] Home emits Person, WebSite, ProfilePage, and matching FAQPage where visible.
- [ ] Project pages emit WebPage/Article or CreativeWork-style schema as appropriate.
- [ ] BreadcrumbList schema exists only where visible breadcrumbs exist.
- [ ] FAQ schema exactly matches visible FAQ content.
- [ ] Service schema added only to dedicated service pages with matching content.
- [ ] Review schema used only for visible, real, permissioned testimonials. **Needs verification**.
- [ ] Schema validated with Rich Results Test / Schema validator. **Needs verification**.

### GEO / AEO

- [ ] `/llms.txt` exists and lists canonical pages, services, projects, topics, and contact info.
- [ ] Author/about page exists with consistent entity facts.
- [ ] Project pages include “At a glance” factual summaries.
- [ ] Service pages include concise answer blocks and FAQs.
- [ ] Blog posts include short answer summaries where relevant.
- [ ] Comparison pages use clear tables.
- [ ] How-to pages use ordered steps and HowTo schema only when valid.
- [ ] Glossary terms have concise definitions and related links.
- [ ] All measurable claims have evidence or are rewritten conservatively.

### Content architecture

- [ ] `/projects` hub exists and links to all case studies.
- [ ] `/services` hub exists.
- [ ] Four service detail pages exist: MVP, SaaS, custom editors, DevOps launch.
- [ ] Blog index and post template exist.
- [ ] Category and tag archive templates exist.
- [ ] Glossary index and term template exist.
- [ ] Related content module appears on project/service/blog pages.
- [ ] Footer contains crawlable links to core hubs.
- [ ] Language switcher links current page equivalents.
- [ ] Content update dates and owners are tracked.

### Performance / CWV

- [ ] Lighthouse or equivalent measured on production home and project pages. **Needs verification**.
- [ ] LCP element identified per route.
- [ ] Critical images have correct `priority`; non-critical images lazy-load.
- [ ] Project pages split static server content from client-only enhancements.
- [ ] Framer Motion usage reduced or isolated.
- [ ] Reduced-motion behavior verified for home and project pages.
- [ ] Custom cursor reviewed or removed for accessibility/performance.
- [ ] Image cache TTL reviewed.
- [ ] Large public PNGs are either used intentionally or archived outside `public`.
- [ ] Bundle/CSS size budget added to CI.

### Accessibility / semantic HTML

- [ ] Skip-to-content link exists.
- [ ] Main content target has stable `id`.
- [ ] Global `:focus-visible` style exists and is high-contrast.
- [ ] FAQ and experience accordions use semantic buttons.
- [ ] Accordions expose `aria-expanded` and `aria-controls`.
- [ ] Project table-of-contents buttons expose active state via ARIA.
- [ ] Avatar image alt text is descriptive or intentionally empty.
- [ ] Decorative icons are marked appropriately.
- [ ] Content remains visible if JavaScript fails.
- [ ] Mobile navigation exposes key links.

### Monitoring and governance

- [ ] Vercel Analytics and Speed Insights verified in production. **Needs verification**.
- [ ] Search Console indexing monitored after launch. **Needs verification**.
- [ ] Schema validation included in release checklist.
- [ ] Crawl test run after deployment. **Needs verification**.
- [ ] Content refresh cadence defined.
- [ ] Domain/contact/social identity consistency reviewed quarterly.
