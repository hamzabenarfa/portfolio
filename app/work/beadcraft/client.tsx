'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, Hand, Link2, Moon, RefreshCcw } from 'lucide-react';

import { PROJECTS } from '@/data/consts';
import { PROJECT_CONTENT } from '@/data/project-content';
import type { CaseFilmData } from '@/data/films';
import { CaseFilm } from '@/components/case/case-film';
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
  CaseTags,
} from '@/components/case/case-kit';

/* ---------- Bead configurator ---------- */

interface Bead {
  id: string;
  name: string;
  colors: string[];
  price: number;
  collection: 'Medina' | 'Sahara';
}

/* Beads, cords and charms as the shop seeds them: names, colours and TND prices. */
const beads: Bead[] = [
  { id: 'b01', name: 'Terracotta', colors: ['#b8492f'], price: 2.5, collection: 'Medina' },
  { id: 'b03', name: 'Indigo Door', colors: ['#2a3a5e'], price: 3, collection: 'Medina' },
  { id: 'b05', name: 'Brass', colors: ['#b48340'], price: 4, collection: 'Medina' },
  { id: 'b06', name: 'Saffron', colors: ['#d49a30'], price: 2.5, collection: 'Medina' },
  { id: 'b07', name: 'Pomegranate', colors: ['#8e2c3c'], price: 4.5, collection: 'Medina' },
  { id: 'b08', name: 'Tile Black', colors: ['#1a1612'], price: 2.5, collection: 'Medina' },
  { id: 'b09', name: 'Dune', colors: ['#e6c89a'], price: 2.5, collection: 'Sahara' },
  { id: 'b11', name: 'Date Palm', colors: ['#5e6b32'], price: 2.5, collection: 'Sahara' },
  { id: 'b13', name: 'Bone', colors: ['#ede0c8'], price: 3, collection: 'Sahara' },
  { id: 'b14', name: 'Sunset', colors: ['#d97a3c', '#b8492f'], price: 3.5, collection: 'Sahara' },
];

const cords = [
  { id: 'waxed-black', name: 'Waxed Black', hex: '#1a1612', price: 4 },
  { id: 'brown-leather', name: 'Brown Leather', hex: '#5a3a22', price: 4 },
  { id: 'tan-leather', name: 'Tan Leather', hex: '#a8784a', price: 4 },
  { id: 'gold-thread', name: 'Gold Thread', hex: '#b48340', price: 4 },
  { id: 'natural-hemp', name: 'Natural Hemp', hex: '#c8b48a', price: 4 },
  { id: 'ivory-silk', name: 'Ivory Silk', hex: '#ede0c8', price: 4 },
];

const charms = [
  { id: 'khomsa', name: 'Hand of Fatma', price: 12, Icon: Hand },
  { id: 'crescent', name: 'Crescent', price: 9, Icon: Moon },
  { id: 'eye', name: 'Evil Eye', price: 10, Icon: Eye },
];

/* Wrist sizes: one slot per centimetre, as the shop's size options define them. */
const sizes = [
  { id: 'wrist-s', label: 'S · 16cm', slots: 16 },
  { id: 'wrist-m', label: 'M · 18cm', slots: 18 },
  { id: 'wrist-l', label: 'L · 20cm', slots: 20 },
];

/* Labour per bracelet, from the product registry. */
const LABOR = 12;

const SHARE_ALPHABET = 'abcdefghjkmnpqrstuvwxyz23456789';

/** Same shape as the shop's share keys: a slug and five unambiguous characters. */
function shareKey(): string {
  const tail = Array.from({ length: 5 }, () => SHARE_ALPHABET[Math.floor(Math.random() * SHARE_ALPHABET.length)]).join('');
  return `my-bracelet-${tail}`;
}

function beadStyle(colors: string[]): React.CSSProperties {
  const [a, b = a] = colors;
  return {
    background: `radial-gradient(circle at 32% 30%, #ffffffb0 0%, ${a} 38%, ${b} 100%)`,
    boxShadow: 'inset -2px -3px 6px rgba(0,0,0,0.28), 0 2px 5px rgba(15,26,54,0.3)',
  };
}

function tnd(n: number): string {
  return `${n.toFixed(2)} TND`;
}

/** A starting pattern so the ring and its price aren't empty on arrival. */
function seedPattern(slots: number): (string | null)[] {
  const rhythm = ['b01', 'b06', 'b03', 'b06'];
  return Array.from({ length: slots }, (_, i) => rhythm[i % rhythm.length]);
}

/**
 * The real pricing rule, in miniature: beads plus the cord plus the charm,
 * plus labour. Tap a slot to place the selected bead; tap it again to clear.
 */
function BeadConfigurator() {
  const [sizeId, setSizeId] = useState(sizes[0].id);
  const [pattern, setPattern] = useState<(string | null)[]>(() => seedPattern(sizes[0].slots));
  const [beadId, setBeadId] = useState(beads[0].id);
  const [cordId, setCordId] = useState(cords[1].id);
  const [charmId, setCharmId] = useState<string | null>('khomsa');
  const [key, setKey] = useState<string | null>(null);

  const size = sizes.find((s) => s.id === sizeId) ?? sizes[0];
  const cord = cords.find((c) => c.id === cordId) ?? cords[0];
  const charm = charms.find((c) => c.id === charmId);
  const beadById = new Map(beads.map((b) => [b.id, b]));

  const placed = pattern.filter((id): id is string => id !== null);
  const beadTotal = placed.reduce((sum, id) => sum + (beadById.get(id)?.price ?? 0), 0);
  const total = beadTotal + cord.price + (charm?.price ?? 0) + LABOR;

  const resize = (id: string) => {
    const next = sizes.find((s) => s.id === id) ?? sizes[0];
    setSizeId(id);
    setPattern((prev) => Array.from({ length: next.slots }, (_, i) => prev[i] ?? null));
    setKey(null);
  };

  const tapSlot = (index: number) => {
    setPattern((prev) => prev.map((id, i) => (i === index ? (id === beadId ? null : beadId) : id)));
    setKey(null);
  };

  const clear = () => { setPattern(Array.from({ length: size.slots }, () => null)); setKey(null); };

  const radius = 42; // percent of the ring box
  const beadSize = Math.min(12, Math.floor(250 / size.slots)); // percent of the ring box

  return (
    <CaseDemo
      title="String your own — tap a slot"
      action={
        <button type="button" onClick={clear} className="demo-action">
          <RefreshCcw className="h-3.5 w-3.5" aria-hidden="true" /> Clear
        </button>
      }
      note="Beads, cords, charms, sizes and labour are the shop's seed data. The price follows the storefront's rule: beads + cord + charm + labour. The real editor adds flat and grid views, search, and saving to an account."
    >
      <div className="bc">
        <div className="bc-stage">
          <div className="bc-ring" role="group" aria-label={`Bracelet, ${size.slots} slots`} style={{ '--cord': cord.hex } as React.CSSProperties}>
            <svg viewBox="0 0 100 100" aria-hidden="true" className="bc-cord">
              <circle cx="50" cy="50" r={radius} fill="none" stroke={cord.hex} strokeWidth="2.2" />
            </svg>
            {pattern.map((id, i) => {
              const angle = (i / size.slots) * Math.PI * 2 - Math.PI / 2;
              const x = 50 + Math.cos(angle) * radius;
              const y = 50 + Math.sin(angle) * radius;
              const bead = id ? beadById.get(id) : undefined;
              const selected = beads.find((b) => b.id === beadId)!;
              return (
                <button
                  key={i}
                  type="button"
                  className="bc-slot"
                  data-empty={!bead || undefined}
                  style={{ left: `${x}%`, top: `${y}%`, width: `${beadSize}%` }}
                  onClick={() => tapSlot(i)}
                  aria-label={`Slot ${i + 1}: ${bead ? bead.name : 'empty'}. ${bead?.id === beadId ? 'Remove it' : `Place ${selected.name}`}`}
                >
                  {bead ? (
                    <motion.span
                      key={bead.id}
                      initial={{ scale: 0.5 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 420, damping: 20 }}
                      className="bc-bead"
                      style={beadStyle(bead.colors)}
                    />
                  ) : (
                    <span className="bc-empty" />
                  )}
                </button>
              );
            })}
            {charm && (
              <span className="bc-charm" aria-hidden="true">
                <charm.Icon size={18} strokeWidth={2} />
              </span>
            )}
          </div>

          <dl className="bc-price" aria-live="polite">
            <div><dt>{placed.length} beads</dt><dd>{tnd(beadTotal)}</dd></div>
            <div><dt>Cord · {cord.name}</dt><dd>{tnd(cord.price)}</dd></div>
            <div><dt>Charm · {charm ? charm.name : 'none'}</dt><dd>{tnd(charm?.price ?? 0)}</dd></div>
            <div><dt>Labour</dt><dd>{tnd(LABOR)}</dd></div>
            <div className="bc-total"><dt>Total</dt><dd>{tnd(total)}</dd></div>
          </dl>
          <div className="bc-share">
            <button type="button" className="demo-action" onClick={() => setKey(shareKey())}>
              <Link2 className="h-3.5 w-3.5" aria-hidden="true" /> {key ? 'New share key' : 'Share this design'}
            </button>
            {key && <p className="bc-key"><span className="visually-hidden">Share key: </span><code>{key}</code> — anyone with the link reopens this exact design.</p>}
          </div>
        </div>

        <div className="bc-trays">
          <div className="bc-tray" role="group" aria-label="Beads">
            <p className="bc-tray-label">Beads <span>Medina · Sahara</span></p>
            <div className="bc-swatches">
              {beads.map((b) => (
                <button key={b.id} type="button" className="bc-swatch" aria-pressed={b.id === beadId} onClick={() => setBeadId(b.id)}>
                  <span className="bc-swatch-bead" style={beadStyle(b.colors)} aria-hidden="true" />
                  <span className="bc-swatch-name">{b.name}</span>
                  <span className="bc-swatch-price">{b.price.toFixed(2)}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="bc-tray" role="group" aria-label="Cord">
            <p className="bc-tray-label">Cord <span>4.00 TND each</span></p>
            <div className="bc-cords">
              {cords.map((c) => (
                <button key={c.id} type="button" className="bc-cord-chip" aria-pressed={c.id === cordId} aria-label={c.name} title={c.name} onClick={() => { setCordId(c.id); setKey(null); }}>
                  <span style={{ background: c.hex }} aria-hidden="true" />
                </button>
              ))}
            </div>
          </div>
          <div className="bc-tray-pair">
            <div className="bc-tray" role="group" aria-label="Charm">
              <p className="bc-tray-label">Charm <span>up to one</span></p>
              <div className="chip-row">
                <button type="button" className="chip" aria-pressed={charmId === null} onClick={() => { setCharmId(null); setKey(null); }}>None</button>
                {charms.map((c) => (
                  <button key={c.id} type="button" className="chip" aria-pressed={charmId === c.id} onClick={() => { setCharmId(c.id); setKey(null); }}>
                    <c.Icon size={14} aria-hidden="true" /> {c.name} · {c.price}
                  </button>
                ))}
              </div>
            </div>
            <div className="bc-tray" role="group" aria-label="Wrist size">
              <p className="bc-tray-label">Wrist size <span>one slot per cm</span></p>
              <div className="chip-row">
                {sizes.map((s) => (
                  <button key={s.id} type="button" className="chip" aria-pressed={s.id === sizeId} onClick={() => resize(s.id)}>{s.label}</button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </CaseDemo>
  );
}

/* ---------- Order pipeline ---------- */

const pipeline = [
  { label: 'New', copy: 'A customer checked out. The order is created once: a retried request carrying the same idempotency key gets this same order back instead of a duplicate.' },
  { label: 'Confirmed', copy: 'The maker accepts the job. Every status change carries the order’s version, so two staff members updating it at once can’t silently overwrite each other.' },
  { label: 'In production', copy: 'Being strung. The dashboard’s overview counts units in production alongside revenue, order volume and average order value.' },
  { label: 'Shipped', copy: 'Handed to delivery — the storefront takes orders from all 24 Tunisian wilayas, priced in dinars, with no account required.' },
  { label: 'Delivered', copy: 'Done. The order settles into the KPI overview the maker checks each morning.' },
];

/** The five-stage pipeline, with the integrity rule that applies at each stage. */
function Pipeline() {
  const [current, setCurrent] = useState(2);
  const stage = pipeline[current];
  return (
    <CaseDemo title="Every order is a production job on a thread">
      <ol className="engine-rail" aria-label="Order stages">
        {pipeline.map((s, i) => (
          <li key={s.label} data-done={current > i ? 'true' : undefined} data-current={current === i ? 'true' : undefined}>
            <button type="button" className="engine-state" aria-pressed={current === i} onClick={() => setCurrent(i)}>
              <span className="engine-tile" aria-hidden="true" />
              <span className="engine-label">{s.label}</span>
            </button>
          </li>
        ))}
      </ol>
      <motion.p key={stage.label} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.22 }} className="engine-copy mt-6 max-w-[60ch]">
        {stage.copy}
      </motion.p>
    </CaseDemo>
  );
}

/* ---------- Page ---------- */

const dashboardCards = [
  { title: 'Inventory', body: 'A bead inventory grid with low-stock flags, so the maker never promises what she can’t string.' },
  { title: 'Orders', body: 'Each custom design becomes a tracked production job moving through five stages.' },
  { title: 'Collections', body: 'Beads and ready-made designs are grouped into named collections the maker curates herself.' },
  { title: 'Overview', body: 'Revenue, orders, average order value, and units in production — the business at a glance.' },
];

const integrity = [
  { meta: 'Checkout', title: 'Can’t double-charge', body: 'Checkout is idempotent: a repeated request with the same key returns the original order rather than creating a second one.' },
  { meta: 'Status updates', title: 'Can’t overwrite', body: 'Order transitions are optimistically locked, so concurrent edits from two staff members fail loudly instead of losing a change.' },
  { meta: 'Pricing', title: 'Can’t drift', body: 'One pure pricing function runs on the client for the live estimate and on the server for the authoritative total — the same formula, two data sources.' },
];

const collections = ['Medina', 'Sahara', 'Méditerranée', 'Mineral', 'Pearl', 'Garden', 'Ocean', 'Spice Market', 'Desert Night'];

const postcards = [
  { src: '/beadcraft-collection-medina.webp', alt: 'Medina collection beads', label: 'Medina' },
  { src: '/beadcraft-designs.webp', alt: 'Ready-made bracelet designs', label: 'Ready-made designs' },
  { src: '/beadcraft-collection-sahara.webp', alt: 'Sahara collection beads', label: 'Sahara' },
];

export default function BeadCraftProjectPage({ film }: { film: CaseFilmData | null }) {
  const t = PROJECT_CONTENT.beadcraft;
  const project = PROJECTS.find((p) => p.slug === 'beadcraft');

  if (!project) return null;

  return (
    <CasePage slug="beadcraft">
      <CaseHero
        slug="beadcraft"
        title={t.title}
        meta={[t.category, project.year, 'Handcrafted in Tunis', <span key="ar" lang="ar" dir="rtl">بيد كرافت</span>]}
        liveUrl={project.url}
        tagline="One bracelet, your story."
        description={t.description}
        primary={{ href: '#configurator', label: 'String your own' }}
        media={film ? <CaseFilm film={film} /> : <CaseHeroImage slug="beadcraft" src="/beadcraft-hero.webp" alt="BeadCraft Studio storefront" />}
        mediaAspect={film ? 'auto' : '16 / 10'}
        mediaCaption={film ? undefined : 'craft.benarfa.com — the storefront'}
        facts={['Handcrafted in Tunis', 'Made to order', 'Ships in 3–5 days', '24 governorates']}
      />

      <CaseSection label={t.subtitle} title={<>Turning a maker&rsquo;s craft into a product.</>}>
        <CaseOverview body={<p>{t.longDescription}</p>} problem={t.problem} solution={t.solution} />
      </CaseSection>

      <CaseSection
        id="configurator"
        label="The centrepiece"
        title="Tactile, not technical."
        aside="Customers build their bracelet bead by bead with a live preview and a live price. Every choice updates a Zustand store, and a finished design can be saved and shared by link — anyone who opens it lands in the configurator on that exact design."
      >
        <BeadConfigurator />
        <div className="demo-grid">
          <CaseFigure
            src="/beadcraft-configurator.webp"
            alt="BeadCraft bracelet configurator"
            dims={{ width: 1440, height: 900 }}
            caption="The real configurator — curved, flat, or grid layouts with live pricing"
            sizes="(max-width: 860px) 100vw, 50vw"
          />
          <CaseFeatures columns={1} items={['Curved, flat and grid layouts of the same design', 'Shareable designs by link', 'EN / FR storefront, TND pricing', 'Guest checkout — no account required']} />
        </div>
      </CaseSection>

      <CaseSection
        label="A palette rooted in place"
        title={<>Collections &amp; designs</>}
        aside="Collection names and bead colours are drawn from Tunisian places and motifs — Medina, Sahara, Sidi Bou — so the catalogue reads as local, not generic."
        surface="tone"
      >
        <div className="case-trio">
          {postcards.map((card) => (
            <CaseFigure
              key={card.src}
              src={card.src}
              alt={card.alt}
              dims={{ width: 1200, height: 1500 }}
              aspect="4 / 5"
              caption={card.label}
              sizes="(max-width: 860px) 100vw, 33vw"
              surface="saffron"
            />
          ))}
        </div>
        <CaseTags items={collections} label="Collections" />
      </CaseSection>

      <CaseSection label="Behind the counter" title={<>The crafter&rsquo;s dashboard</>}>
        <Pipeline />
        <div className="demo-grid">
          <CaseCards items={dashboardCards} />
          <CaseFigure
            src="/beadcraft-maker.webp"
            alt="BeadCraft crafter dashboard"
            dims={{ width: 1440, height: 900 }}
            caption="The maker side — inventory, orders, and KPIs"
            sizes="(max-width: 860px) 100vw, 55vw"
          />
        </div>
      </CaseSection>

      <CaseSection label="Built not to break" title="Three things that can’t go wrong." surface="night">
        <CaseCards columns={3} items={integrity} />
        <CaseStats
          items={[
            { value: 'Two', label: 'Surfaces', detail: 'Storefront + crafter dashboard' },
            { value: 'EN / FR', label: 'Languages', detail: 'Bilingual, TND pricing' },
            { value: '24', label: 'Wilayas', detail: 'Nationwide delivery, all governorates' },
          ]}
        />
        <CaseSpecs
          rows={[
            ['Framework', 'Next.js 16 Server Components · React 19 · TypeScript'],
            ['Interaction', 'Zustand — the configurator’s live state'],
            ['Data', 'PostgreSQL · Prisma 7 · strict Zod schemas at every boundary'],
            ['Integrity', 'Idempotent checkout · optimistic-locked order transitions'],
            ['Runtime', 'Bun · Tailwind v4'],
          ]}
        />
      </CaseSection>

      <CaseNext from="beadcraft" slug="menu-qr" />
      <CaseContact
        slug="beadcraft"
        title="Have a craft that deserves a real product?"
        lede={<>I partner with founders and small teams to ship production software, start to finish. Tell me what you&rsquo;re building.</>}
      />
    </CasePage>
  );
}
