'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Maximize2 } from 'lucide-react';

import { PROJECTS } from '@/data/consts';
import { PROJECT_CONTENT } from '@/data/project-content';
import { Lightbox } from '@/components/fx/media';
import { MosaicImage } from '@/components/fx/mosaic-image';
import {
  CaseCards,
  CaseContact,
  CaseDemo,
  CaseFeatures,
  CaseFigure,
  CaseHero,
  CaseHeroImage,
  CaseNext,
  CaseOverview,
  CasePage,
  CaseSection,
  CaseSpecs,
  CaseStats,
} from '@/components/case/case-kit';

interface OrderState {
  id: string;
  label: string;
  tone: 'idle' | 'ok' | 'fail';
  headline: string;
  copy: string;
}

const orderStates: OrderState[] = [
  {
    id: 'awaiting',
    label: 'AWAITING_DEPOSIT',
    tone: 'idle',
    headline: 'Order locked, deposit pending',
    copy: 'The order reserves the part and waits for the 20% deposit. A reminder fires 3–4 hours before the deadline, and the buyer uploads a deposit proof photo straight from their phone.',
  },
  {
    id: 'confirmed',
    label: 'CONFIRMED',
    tone: 'ok',
    headline: 'Deposit cleared, stock verified by a human',
    copy: 'An operator phones the supplier and confirms the part is genuinely on the shelf before anything ships. Only then does fulfilment start — the remaining 80% is paid cash on delivery.',
  },
  {
    id: 'failed',
    label: 'FAILED_REJECTED',
    tone: 'fail',
    headline: 'Deadline passed, stock released',
    copy: 'A deposit-deadline cron expires unpaid orders automatically, so reserved inventory never gets stuck behind a buyer who walked away.',
  },
];

const flow = [
  { title: 'Find the part', body: 'Pick make, model, and engine — or full-text search the catalogue through Meilisearch.' },
  { title: 'Pay 20% deposit', body: 'The deposit locks the order in. No deposit by the deadline, no reservation.' },
  { title: 'We call the supplier', body: 'A real person confirms real stock before a single dinar of the balance is committed.' },
  { title: 'Cash on delivery', body: 'The part ships and the remaining 80% is paid on the doorstep.' },
];

const surfaces = [
  {
    tag: 'Bay 01',
    title: 'Customer',
    copy: 'Vehicle-fit catalogue, part search, garage, manual deposit submission with proof upload, and order tracking — French and mobile-first.',
    points: ['Vehicle finder', 'Part search', 'Deposit submission'],
  },
  {
    tag: 'Bay 02',
    title: 'Admin',
    copy: 'A call queue for human stock verification, deposit review, and the full order lifecycle.',
    points: ['Call queue', 'Deposit review', 'Order ops'],
  },
  {
    tag: 'Bay 03',
    title: 'Supplier',
    copy: 'Inventory management, shipping, and payout tracking for verified parts vendors.',
    points: ['Inventory', 'Shipping', 'Payouts'],
  },
];

interface CatalogueTile {
  src: string;
  label: string;
  alt: string;
}

const catalogueWall: CatalogueTile[] = [
  { src: '/autopart-moteur.webp', label: 'Moteur', alt: 'Engine parts category' },
  { src: '/autopart-freinage.webp', label: 'Freinage', alt: 'Braking parts category' },
  { src: '/autopart-suspension.webp', label: 'Suspension', alt: 'Suspension parts category' },
  { src: '/autopart-electricite.webp', label: 'Électricité', alt: 'Electrical parts category' },
  { src: '/autopart-injecteur.webp', label: 'Injecteurs', alt: 'Injector parts listing' },
  { src: '/autopart-plaquettes.webp', label: 'Plaquettes', alt: 'Brake pads listing' },
];

/** Order-status colours: pending, cleared, failed. */
function toneDot(tone: OrderState['tone']): string {
  if (tone === 'ok') return 'bg-emerald-500';
  if (tone === 'fail') return 'bg-red-500';
  return 'bg-[color:var(--saffron)]';
}

/** Diagnostic-console view of the deposit order engine. */
function OrderEngine() {
  const [active, setActive] = useState<OrderState>(orderStates[0]);

  return (
    <CaseDemo title="Order engine — diagnostic" note="cron: reminders + auto-expiry">
      <div className="grid gap-6 md:grid-cols-[minmax(14rem,0.9fr)_1.6fr] md:gap-[var(--gutter)]">
        <div className="flex flex-col gap-2">
          {orderStates.map((state) => {
            const isActive = active.id === state.id;
            return (
              <button key={state.id} type="button" onClick={() => setActive(state)} aria-pressed={isActive} className="chip">
                <span className="flex w-full items-center gap-3 py-3">
                  <span
                    aria-hidden="true"
                    className={`h-2 w-2 shrink-0 rounded-[1px] ${isActive ? toneDot(state.tone) : 'bg-[color:var(--line-strong)]'}`}
                  />
                  {state.label}
                </span>
              </button>
            );
          })}
        </div>
        <motion.div
          key={active.id}
          initial={{ opacity: 0, x: 8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.25 }}
          className="border-t border-[color:var(--line)] pt-6 md:border-l md:border-t-0 md:pl-[var(--gutter)] md:pt-1"
        >
          <p className="text-[length:var(--text-xs)] font-semibold text-[color:var(--ink-2)]">state readout</p>
          <h3 className="mt-3 text-[length:var(--text-xl)] font-[720] leading-[1.05] tracking-[-0.025em] [font-stretch:112%] [text-wrap:balance]">
            {active.headline}
          </h3>
          <p className="mt-4 max-w-[52ch] leading-[1.6] text-[color:var(--ink-2)]">{active.copy}</p>
        </motion.div>
      </div>
    </CaseDemo>
  );
}

/** Mosaic of real catalogue captures, each expandable. */
function CatalogueWall() {
  const [open, setOpen] = useState<CatalogueTile | null>(null);

  return (
    <CaseDemo
      title="Catalogue — real captures, fit-filtered per vehicle"
      action={<span className="hidden text-[length:var(--text-xs)] text-[color:var(--ink-2)] sm:inline">Click to inspect</span>}
    >
      <div className="grid grid-cols-2 gap-x-4 gap-y-6 lg:grid-cols-3 lg:gap-x-6">
        {catalogueWall.map((tile) => (
          <button
            key={tile.src}
            type="button"
            onClick={() => setOpen(tile)}
            aria-label={`Expand ${tile.alt}`}
            data-cursor-label="View"
            className="group block min-w-0 cursor-zoom-in text-left"
          >
            <MosaicImage
              src={tile.src}
              alt={tile.alt}
              sizes="(max-width: 1024px) 50vw, 33vw"
              grout="rgba(0,0,0,.2)"
              className="aspect-[4/3] rounded-[4px] group-hover:[&_img]:scale-[1.04]"
            />
            <span className="mt-3 flex min-h-7 items-center justify-between gap-2">
              <span className="text-[length:var(--text-sm)] font-semibold">{tile.label}</span>
              <span className="inline-flex items-center gap-1 rounded-[3px] bg-[color:var(--ink)] px-2 py-1 text-[length:var(--text-xs)] font-semibold text-[color:var(--wash)] opacity-0 transition-opacity group-focus-visible:opacity-100">
                <Maximize2 className="h-3 w-3" aria-hidden="true" /> View
              </span>
            </span>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {open && (
          <Lightbox src={open.src} alt={open.alt} dims={{ width: 1440, height: 900 }} onClose={() => setOpen(null)} />
        )}
      </AnimatePresence>
    </CaseDemo>
  );
}

export default function AutoPartProjectPage() {
  const t = PROJECT_CONTENT.autopart;
  const project = PROJECTS.find((p) => p.slug === 'autopart');

  if (!project) return null;

  return (
    <CasePage slug="autopart">
      <CaseHero
        slug="autopart"
        title={t.title}
        meta={[t.category, 'parts.benarfa.com', project.year]}
        liveUrl={project.url}
        tagline="Real parts. Real stock."
        description={t.description}
        primary={{ href: '#engine', label: 'Open the order engine' }}
        media={<CaseHeroImage slug="autopart" src={project.image || '/autopart.webp'} alt="AutoParts Tunisia storefront" />}
        mediaAspect="16 / 8"
      />

      <CaseSection label="The problem" title="Trust, engineered into the order itself.">
        <CaseOverview
          body={<p>{t.longDescription}</p>}
          problem={t.problem}
          solution={t.solution}
          problemLabel="Fault report"
          solutionLabel="The fix"
        />
        <CaseStats
          items={[
            { value: '03', label: 'Surfaces', detail: 'Customer · Admin · Supplier' },
            { value: '20%', label: 'Deposit', detail: 'Balance cash on delivery' },
            { value: '1 call', label: 'Verification', detail: 'Human stock check, every order' },
          ]}
        />
      </CaseSection>

      <CaseSection label="Job card" title="How an order works">
        <CaseCards items={flow} columns={4} />
      </CaseSection>

      <CaseSection
        id="engine"
        label="The hard part"
        title="Deposit order engine"
        aside="Every order is a small state machine. Select a state to read what the system does — and what it refuses to do — at each step."
        surface="night"
      >
        <OrderEngine />
        <CaseFeatures items={t.keyFeatures} />
      </CaseSection>

      <CaseSection label="One workshop, three bays" title="Three-sided platform">
        <CaseCards
          columns={3}
          items={surfaces.map((s) => ({
            meta: s.tag,
            title: s.title,
            body: (
              <>
                <p>{s.copy}</p>
                <ul className="case-tags mt-5">
                  {s.points.map((p) => <li key={p}>{p}</li>)}
                </ul>
              </>
            ),
          }))}
        />
      </CaseSection>

      <CaseSection label="On the shelves" title="The catalogue wall" surface="tone">
        <CatalogueWall />
        <div className="case-pair">
          <CaseFigure
            src="/autopart-catalogue.webp"
            alt="AutoParts category catalogue with live counts"
            dims={{ width: 1440, height: 900 }}
            caption="Catalogue — verified categories with live counts"
            sizes="(max-width: 860px) 100vw, 50vw"
            surface="sidi"
          />
          <CaseFigure
            src="/autopart-marques.webp"
            alt="AutoParts brand index"
            dims={{ width: 1440, height: 900 }}
            caption="Brands — the supplier-verified marque index"
            sizes="(max-width: 860px) 100vw, 50vw"
            surface="sidi"
          />
        </div>
      </CaseSection>

      <CaseSection label="Tools on the wall" title="Technology stack">
        <CaseSpecs
          rows={[
            ['Framework', 'Next.js 16 · React 19 · TypeScript · Tailwind v4'],
            ['Data', 'Prisma 7 · Neon Postgres · Redis'],
            ['Search', 'Meilisearch — typo-tolerant full-text part search'],
            ['Media', 'Cloudflare R2 — deposit proofs & used-part photos'],
            ['Auth', 'Auth.js — magic link · Google · password'],
            ['Tooling', 'Bun · Biome · Docker for local services'],
          ]}
        />
      </CaseSection>

      <CaseNext from="autopart" slug="beadcraft" />
      <CaseContact
        slug="autopart"
        title="Need a marketplace people can actually trust?"
        lede={<>I partner with founders and small teams to ship production software, start to finish. Tell me what you&rsquo;re building.</>}
      />
    </CasePage>
  );
}
