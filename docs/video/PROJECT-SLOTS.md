# Project slots for FILM-PROMPT.md

Each run pastes one slot under the prompt; everything else stays identical. Agents verify every line
against the code. A slot is a pointer, not a source of truth.

## AutoParts Tunisia

- **Slug · title · live URL:** `autopart` · AutoParts Tunisia · https://parts.benarfa.com (French UI)
- **Engine:** Brag (`/brag --full --voice --tone polished --format landscape --duration 55`) on HyperFrames 0.8.204
- **Source folder:** `/home/benarfa/apps/projects/portfolio/video/autopart/` (cwd; Brag writes `brag-output/` here)
- **Repo:** `/home/benarfa/apps/projects/autopart` (read only). Public live routes: home, catalogue and category
  pages, part pages, vehicle finder, search. Never use `/connexion` on live.
- **Brand sources:** `src/app/globals.css` (tokens), `public/images`, `public/catalog`, fonts loaded in `src/app/layout.tsx`
- **One sentence:** a French, mobile-first car-parts marketplace for Tunisia where every order is checked by a human
  call to the supplier and locked with a 20% deposit, the balance paid cash on delivery.
- **Flow to show:** pick make → model → engine (vehicle-fit finder) → compatible part → order → deposit proof upload
  → order confirmed. Dashboards (admin call queue, supplier) are rebuilds labelled "Demo data".
- **The hard part:** the order state machine: supplier call verifies stock → deposit submitted and reviewed by an admin
  → confirmed; a 24-hour cron fails unpaid orders and frees the part, with a reminder 3–4 h before. Look in
  `src/lib/order/`, `src/lib/state/`, cron routes under `src/app/api/`, and `prisma/schema.prisma`.
- **Hook idea:** a listing that says "En stock" and a buyer who drives across town for nothing.
- **Stack line · end-card domain:** Next.js 16 · Postgres + Prisma · Meilisearch · Cloudflare R2 · parts.benarfa.com
- **Mismatches to watch:** the repo now has more roles than the portfolio copy's three (Pro, Livreur/driver), and
  `src/lib/ai`, sourcing and WhatsApp work. Only claim what's live and what the portfolio already says; list the rest.
- **Existing captures:** `portfolio/public/autopart-*.webp`.

## BeadCraft Studio

- **Slug · title · live URL:** `beadcraft` · BeadCraft Studio · https://craft.benarfa.com/en (also `/fr`)
- **Engine:** HyperFrames 0.8.204 directly (not Brag)
- **Source folder:** `/home/benarfa/apps/projects/portfolio/video/beadcraft/`
- **Repo:** `/home/benarfa/apps/projects/beadcraft_workspace/apps/beadcraft` (read only). Public live routes:
  `/[locale]`, `/catalogue`, `/designs`, `/configurator` (interacting with the designer is fine; don't check out).
  Claims rules for every BeadCraft video: `beadcraft_workspace/apps/video/AGENTS.md` (no AI claims, no delivery-time
  promises, no BeadCraft prices/tariffs, fictional data labelled).
- **Brand sources:** `src/app/globals.css`, `brand/tokens`, `brand/assets`. Real bead/charm sprites and OFL fonts to
  copy: `beadcraft_workspace/apps/video/brag-output/composition/assets/`. A French vertical reel exists there; this is a
  new English landscape film, so don't reuse its storyline.
- **One sentence:** a bilingual storefront where shoppers design a beaded bracelet bead by bead with a live price,
  and the maker's dashboard turns each design into a tracked made-to-order job.
- **Flow to show:** collection → configurator (style, place beads in slots, charm, cord, live price) → share link /
  order → maker dashboard pipeline (real status labels from `src/lib/order-status.ts`).
- **The hard part:** the price is computed from the design itself (beads + cord + charm + labour, `src/lib/pricing.ts`),
  and checkout is idempotent with optimistic-locked status updates (find the implementing files; verify before claiming).
- **Hook idea:** a custom-bracelet order scattered across a chat ("the Sidi Bou blue", "18 cm", "the little gold hand").
- **Stack line · end-card domain:** Next.js 16 · Zustand · Prisma + Postgres · Auth.js · craft.benarfa.com
- **Mismatches to watch:** the workspace has since grown a Shopify app and an embeddable engine; the film follows the
  storefront the portfolio describes and the live site shows.
- **Existing captures:** `portfolio/public/beadcraft-*.webp`.

## Menu QR

- **Slug · title · live URL:** `menu-qr` · Menu QR · https://www.menu-qr.tn
- **Engine:** Remotion 4.0.539 (Kokoro via the `hyperframes tts` CLI is used only as the voice tool)
- **Source folder:** `/home/benarfa/apps/projects/portfolio/video/menu-qr/` (new project from `create-video`; leave
  the D-Talk studio in `portfolio/remotion/` alone)
- **Repo:** `/home/benarfa/apps/projects/menu-qr` (read only). Public live routes: the landing page, and the seeded
  demo tenant menu `/t/demo` (Café Green, table 1). Browse only; never add to cart or order.
- **Brand sources:** `src/app/globals.css`, storefront design model `src/lib/storefront/model.ts`, preview images in
  `public/storefront-previews/`, translations in `messages/` (en, fr, ar).
- **One sentence:** a multi-tenant SaaS that puts a restaurant's menu behind one QR code per table and turns scans into
  live orders, with no app for diners and no POS for owners.
- **Flow to show:** scan a table QR → the venue's storefront in its own design → switch EN/FR/AR (real right-to-left)
  → order → it lands on the live kitchen/orders board (rebuild, "Demo data").
- **The hard part:** one codebase, many tenants: slug + table resolve the tenant, the storefront renders in that venue's
  design (28 designs auto-matched to business type) and language, and orders reach the board by polling.
- **Hook idea:** a laminated menu with prices crossed out and reprinted.
- **Stack line · end-card domain:** Next.js 16 · React 19 · Prisma + Postgres · Better Auth · menu-qr.tn
- **Mismatches to watch:** confirm the 28-designs count and the polling mechanism in code before saying them.
- **Existing captures:** `portfolio/public/menu-qr-*.webp`.
