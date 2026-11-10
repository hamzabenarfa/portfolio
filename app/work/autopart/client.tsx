'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Maximize2 } from 'lucide-react';

import { PROJECTS } from '@/data/consts';
import { PROJECT_CONTENT } from '@/data/project-content';
import type { CaseFilmData } from '@/data/films';
import { Lightbox } from '@/components/fx/media';
import { MosaicImage } from '@/components/fx/mosaic-image';
import { CaseFilm } from '@/components/case/case-film';
import {
  CaseCards,
  CaseContact,
  CaseDemo,
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

/* ---------- Vehicle-fit finder ---------- */

interface Generation {
  name: string;
  from: number;
  to: number | null;
}

interface VehicleModel {
  name: string;
  generations: Generation[];
}

/* Makes from the Tunisian best-seller allowlist; models and generations as the
   vehicle database seeds them. */
const vehicles: { make: string; models: VehicleModel[] }[] = [
  { make: 'Renault', models: [{ name: 'Clio', generations: [{ name: 'Mk3 (BR0)', from: 2005, to: 2012 }, { name: 'Mk4 (BZ0)', from: 2012, to: 2019 }, { name: 'Mk5 (BZ1)', from: 2019, to: null }] }] },
  { make: 'Peugeot', models: [{ name: '208', generations: [{ name: 'MK1', from: 2012, to: 2019 }, { name: 'MK2', from: 2019, to: null }] }] },
  {
    make: 'Volkswagen',
    models: [
      { name: 'Polo', generations: [{ name: 'Mk5 (Type 6R)', from: 2009, to: 2014 }, { name: 'Mk6 (Type AW)', from: 2014, to: 2017 }, { name: 'Mk6 (Facelift)', from: 2017, to: null }] },
      { name: 'Golf', generations: [{ name: 'Mk6 (Type 5K)', from: 2008, to: 2012 }, { name: 'Mk7 (Type 5G)', from: 2012, to: 2017 }, { name: 'Mk8 (Type 5H)', from: 2019, to: null }] },
    ],
  },
  {
    make: 'Kia',
    models: [
      { name: 'Picanto', generations: [{ name: 'TA', from: 2011, to: 2017 }, { name: 'JA', from: 2017, to: 2023 }, { name: 'LA', from: 2023, to: null }] },
      { name: 'Rio', generations: [{ name: 'UB', from: 2011, to: 2017 }, { name: 'YB', from: 2017, to: 2023 }] },
    ],
  },
  {
    make: 'Hyundai',
    models: [
      { name: 'i10', generations: [{ name: 'i10 II (BA)', from: 2013, to: 2019 }, { name: 'i10 III (AC3/AI3)', from: 2019, to: null }] },
      { name: 'Accent', generations: [{ name: 'Accent IV (RB)', from: 2010, to: 2017 }, { name: 'Accent V (HCI)', from: 2017, to: 2023 }] },
    ],
  },
  { make: 'Toyota', models: [{ name: 'Yaris', generations: [{ name: 'XP130', from: 2011, to: 2020 }, { name: 'XP210', from: 2020, to: null }] }] },
];

/* Twelve parts from the seeded catalogue: French names, real brands. */
const parts = [
  { name: 'Plaquettes de frein avant', brand: 'TRW', category: 'Freinage' },
  { name: 'Disques de frein avant', brand: 'Bosch', category: 'Freinage' },
  { name: "Bougie d'allumage", brand: 'NGK', category: 'Moteur' },
  { name: 'Kit de distribution', brand: 'Gates', category: 'Moteur' },
  { name: 'Filtre à huile', brand: 'Mann', category: 'Filtres' },
  { name: 'Filtre à air', brand: 'Mann', category: 'Filtres' },
  { name: 'Pompe à eau', brand: 'SKF', category: 'Refroidissement' },
  { name: 'Amortisseur avant', brand: 'Monroe', category: 'Suspension' },
  { name: 'Rotule de direction', brand: 'Lemförder', category: 'Suspension' },
  { name: 'Kit embrayage', brand: 'LUK', category: 'Transmission' },
  { name: 'Alternateur', brand: 'Valeo', category: 'Électricité' },
  { name: 'Batterie 12V', brand: 'Varta', category: 'Électricité' },
];

/** Sample fitment: a stable two-thirds of the pool per generation, so every car narrows differently. */
function fits(generation: string, index: number): boolean {
  let hash = 0;
  for (const ch of generation) hash = (hash * 31 + ch.charCodeAt(0)) % 9973;
  return (hash + index * 5) % 3 !== 0;
}

function years(g: Generation): string {
  return `${g.from}–${g.to ?? 'now'}`;
}

/** Make → model → generation, narrowing a part list the way the storefront does. */
function FitFinder() {
  const [makeName, setMakeName] = useState<string | null>(null);
  const [modelName, setModelName] = useState<string | null>(null);
  const [genName, setGenName] = useState<string | null>(null);

  const make = vehicles.find((v) => v.make === makeName);
  const model = make?.models.find((m) => m.name === modelName);
  const generation = model?.generations.find((g) => g.name === genName);
  const shown = generation ? parts.filter((_, i) => fits(generation.name, i)) : parts;

  const pickMake = (name: string) => { setMakeName(name); setModelName(null); setGenName(null); };
  const pickModel = (name: string) => { setModelName(name); setGenName(null); };

  const headline = generation
    ? `${shown.length} of ${parts.length} parts fit a ${make!.make} ${model!.name} ${generation.name}`
    : model
      ? `Which ${make!.make} ${model.name}?`
      : make
        ? `Which ${make.make}?`
        : 'Pick your car to see only what fits';

  return (
    <CaseDemo
      title="Vehicle-fit finder — try it"
      action={
        (makeName || modelName || genName) && (
          <button type="button" className="demo-action" onClick={() => pickMake('')}>Start over</button>
        )
      }
      note="Cars and part names come from the seeded catalogue. Which part fits which generation is sample data on this page."
    >
      <div className="finder">
        <div className="finder-steps">
          <div className="finder-step" role="group" aria-label="Make">
            <p className="finder-step-label"><span>01</span> Make</p>
            <div className="chip-row">
              {vehicles.map((v) => (
                <button key={v.make} type="button" className="chip" aria-pressed={v.make === makeName} onClick={() => pickMake(v.make)}>{v.make}</button>
              ))}
            </div>
          </div>
          <div className="finder-step" role="group" aria-label="Model" data-waiting={!make || undefined}>
            <p className="finder-step-label"><span>02</span> Model</p>
            {make ? (
              <div className="chip-row">
                {make.models.map((m) => (
                  <button key={m.name} type="button" className="chip" aria-pressed={m.name === modelName} onClick={() => pickModel(m.name)}>{m.name}</button>
                ))}
              </div>
            ) : (
              <p className="finder-wait">Choose a make first</p>
            )}
          </div>
          <div className="finder-step" role="group" aria-label="Generation" data-waiting={!model || undefined}>
            <p className="finder-step-label"><span>03</span> Generation</p>
            {model ? (
              <div className="chip-row">
                {model.generations.map((g) => (
                  <button key={g.name} type="button" className="chip chip-stack" aria-pressed={g.name === genName} onClick={() => setGenName(g.name)}>
                    <span>{g.name}</span>
                    <span className="text-xs font-medium opacity-75">{years(g)}</span>
                  </button>
                ))}
              </div>
            ) : (
              <p className="finder-wait">Choose a model first</p>
            )}
          </div>
        </div>

        <div className="finder-results" aria-live="polite">
          <h3 className="finder-headline">{headline}</h3>
          <p className="finder-sub">
            {generation
              ? `${years(generation)} · every listing below is filtered by this generation, the same way the storefront filters by compatibility.`
              : 'Browsing needs no account. Until a car is chosen, the catalogue shows everything.'}
          </p>
          <ul className="finder-list">
            <AnimatePresence initial={false}>
              {shown.map((p) => (
                <motion.li
                  key={p.name}
                  layout="position"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.18 }}
                >
                  <span className="finder-part">
                    <span className="finder-part-name">{p.name}</span>
                    <span className="finder-part-meta">{p.brand} · {p.category}</span>
                  </span>
                  <span className="finder-fit" data-fit={generation ? 'true' : undefined}>{generation ? 'Fits' : 'Any car'}</span>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </div>
      </div>
    </CaseDemo>
  );
}

/* ---------- Deposit order engine ---------- */

interface OrderState {
  id: string;
  label: string;
  headline: string;
  copy: string;
  /** An end state the happy path can fall into. */
  exit?: boolean;
}

/* The real OrderStatus enum, in the order an order moves through it. */
const orderPath: OrderState[] = [
  {
    id: 'VERIFICATION_IN_PROGRESS',
    label: 'Verification in progress',
    headline: 'A human phones the supplier',
    copy: 'The order lands in the admin call queue. Someone calls the supplier, confirms the part is really on the shelf and agrees the final price. No money has been requested yet.',
  },
  {
    id: 'CONFIRMED_HELD',
    label: 'Confirmed, held',
    headline: 'Stock confirmed, price locked',
    copy: 'The supplier said yes. The part is held for this buyer at the agreed price, and only now does the order ask for its deposit.',
  },
  {
    id: 'AWAITING_DEPOSIT',
    label: 'Awaiting deposit',
    headline: 'The 24-hour clock starts',
    copy: 'The buyer pays 20% through an external channel — D17, Wafacash, a bank transfer or a postal mandat. The deadline is set 24 hours out, and a cron job sends a reminder 3 to 4 hours before it expires.',
  },
  {
    id: 'DEPOSIT_UNDER_REVIEW',
    label: 'Deposit under review',
    headline: 'A reference code or a receipt photo',
    copy: 'The buyer submits the transfer reference and/or a photo of the receipt from their phone. An admin checks it before anything ships.',
  },
  {
    id: 'DEPOSIT_CONFIRMED',
    label: 'Deposit confirmed',
    headline: 'Inventory bound to the order',
    copy: 'The deposit is accepted and the supplier’s inventory is bound to this order. From here the deadline cron can no longer fail it.',
  },
  {
    id: 'OUT_FOR_DELIVERY',
    label: 'Out for delivery',
    headline: 'The remaining 80%, on the doorstep',
    copy: 'The part ships and the balance is paid cash on delivery. A failed delivery and a dispute each have their own state rather than a note in a text field.',
  },
  {
    id: 'COMPLETED',
    label: 'Completed',
    headline: 'Commission and payout',
    copy: 'On completion the platform’s 8% commission is computed on the agreed price, and the supplier’s payout is recorded for the rest.',
  },
];

const orderExits: OrderState[] = [
  {
    id: 'FAILED_REJECTED',
    label: 'Failed / rejected',
    headline: 'Deadline passed, part released',
    copy: 'No deposit by the deadline: the cron fails the order automatically and the reserved part is free for the next buyer. Every re-entry into Awaiting deposit restarts the clock.',
    exit: true,
  },
  {
    id: 'CANCELLED',
    label: 'Cancelled',
    headline: 'Cancelled, cleanly',
    copy: 'An order that dies after its deposit was confirmed leaves money and bound inventory behind. Both are unwound as explicit records, not forgotten.',
    exit: true,
  },
];

/** Walk the real state machine; every state is a button, the readout says what the system does there. */
function OrderEngine() {
  const [activeId, setActiveId] = useState(orderPath[0].id);
  const active = [...orderPath, ...orderExits].find((s) => s.id === activeId)!;
  const pathIndex = orderPath.findIndex((s) => s.id === activeId);

  return (
    <CaseDemo title="Order engine — every state of the real enum" note="Two cron jobs run underneath: a deposit reminder at the 3–4 hour mark, and the deadline expiry that frees the part.">
      <ol className="engine-rail" aria-label="Order states">
        {orderPath.map((s, i) => (
          <li key={s.id} data-done={pathIndex > i ? 'true' : undefined} data-current={activeId === s.id ? 'true' : undefined}>
            <button type="button" className="engine-state" aria-pressed={activeId === s.id} onClick={() => setActiveId(s.id)}>
              <span className="engine-tile" aria-hidden="true" />
              <span className="engine-label">{s.label}</span>
            </button>
          </li>
        ))}
      </ol>
      <div className="engine-body">
        <motion.div
          key={active.id}
          initial={{ opacity: 0, x: 8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.25 }}
          className="engine-readout"
        >
          <p className="engine-code" data-exit={active.exit || undefined}>{active.id}</p>
          <h3 className="engine-headline">{active.headline}</h3>
          <p className="engine-copy">{active.copy}</p>
          {active.id === 'AWAITING_DEPOSIT' && (
            <button type="button" className="demo-action mt-5" onClick={() => setActiveId('FAILED_REJECTED')}>
              Let the deadline pass →
            </button>
          )}
          {active.exit && (
            <button type="button" className="demo-action mt-5" onClick={() => setActiveId(orderPath[0].id)}>
              ← Back to the start
            </button>
          )}
        </motion.div>
        <div className="engine-side">
          <p className="engine-side-label">Exit states</p>
          <div className="chip-row">
            {orderExits.map((s) => (
              <button key={s.id} type="button" className="chip" aria-pressed={activeId === s.id} onClick={() => setActiveId(s.id)}>{s.label}</button>
            ))}
          </div>
          <dl className="engine-facts">
            <div><dt>Deposit</dt><dd>20%</dd></div>
            <div><dt>Deadline</dt><dd>24 h</dd></div>
            <div><dt>Reminder</dt><dd>3–4 h before</dd></div>
            <div><dt>Commission</dt><dd>8%</dd></div>
          </dl>
        </div>
      </div>
    </CaseDemo>
  );
}

/* ---------- Surfaces and captures ---------- */

const surfaces = [
  {
    tag: 'Bay 01',
    title: 'Customer',
    copy: 'Vehicle-fit catalogue, Meilisearch part search, a garage of saved cars, deposit submission with proof upload and order tracking. French, mobile-first, no account needed to browse.',
    points: ['Vehicle finder', 'Part search', 'Deposit submission'],
  },
  {
    tag: 'Bay 02',
    title: 'Admin',
    copy: 'A click-to-call queue for stock verification, deposit review against the account, and the full order lifecycle.',
    points: ['Call queue', 'Deposit review', 'Order ops'],
  },
  {
    tag: 'Bay 03',
    title: 'Supplier',
    copy: 'Inventory, shipment handoff and payout tracking for verified parts vendors, with the 8% commission computed on completed orders.',
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

/** Mosaic of real catalogue captures, each expandable. */
function CatalogueWall() {
  const [open, setOpen] = useState<CatalogueTile | null>(null);

  return (
    <CaseDemo
      title="Customer surface — real captures"
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

export default function AutoPartProjectPage({ film }: { film: CaseFilmData | null }) {
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
        primary={{ href: '#finder', label: 'Find a part' }}
        media={film ? <CaseFilm film={film} /> : <CaseHeroImage slug="autopart" src={project.image || '/autopart.webp'} alt="AutoParts Tunisia storefront" />}
        mediaAspect={film ? 'auto' : '16 / 8'}
        facts={['100+ brands · 2,000+ models', '20% deposit, balance on delivery', 'A phone call before every order', 'French, mobile-first']}
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
            { value: '20%', label: 'Deposit', detail: 'Paid off-platform, reviewed by an admin' },
            { value: '24 h', label: 'Deposit deadline', detail: 'A cron fails unpaid orders and frees the part' },
            { value: '8%', label: 'Platform commission', detail: 'Computed on completed orders' },
          ]}
        />
      </CaseSection>

      <CaseSection
        id="finder"
        label="Find the part"
        title="Does it fit my car?"
        aside="Buyers narrow the catalogue by make, model and generation before they see a single part — or go straight to typo-tolerant Meilisearch search. The seeded vehicle data covers 100+ brands and 2,000+ models, and a signed-in buyer keeps their cars in a garage so the next visit starts filtered."
      >
        <FitFinder />
        <div className="case-pair">
          <CaseFigure
            src="/autopart-catalogue.webp"
            alt="AutoParts category catalogue with live counts"
            dims={{ width: 1440, height: 900 }}
            caption="Catalogue — categories with live counts"
            sizes="(max-width: 860px) 100vw, 50vw"
          />
          <CaseFigure
            src="/autopart-marques.webp"
            alt="AutoParts brand index"
            dims={{ width: 1440, height: 900 }}
            caption="Marques — the brand index behind the finder"
            sizes="(max-width: 860px) 100vw, 50vw"
          />
        </div>
      </CaseSection>

      <CaseSection
        id="engine"
        label="The hard part"
        title="Deposit order engine"
        aside="Every order is a small state machine with eleven states. Select one to read what the system does there — and what it refuses to do until a human has checked."
        surface="night"
      >
        <OrderEngine />
      </CaseSection>

      <CaseSection label="One workshop, three bays" title="Three-sided platform" surface="tone">
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
        <CatalogueWall />
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
