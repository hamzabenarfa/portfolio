'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { RefreshCcw } from 'lucide-react';

import { PROJECTS } from '@/data/consts';
import { PROJECT_CONTENT } from '@/data/project-content';
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
  CaseSteps,
} from '@/components/case/case-kit';

/* ---------- Interactive strand builder ---------- */

interface Palette {
  id: string;
  name: string;
  place: string;
  colors: string[];
}

const palettes: Palette[] = [
  {
    id: 'medina',
    name: 'Medina',
    place: 'Tunis — terracotta & brass',
    colors: ['#b8503a', '#c98a3a', '#f1e3cb', '#2f3e6b', '#8a5a44'],
  },
  {
    id: 'sahara',
    name: 'Sahara',
    place: 'Douz — sand & dusk',
    colors: ['#d9a05b', '#b97742', '#f5efe2', '#7fa7c4', '#6e4a2f'],
  },
  {
    id: 'sidibou',
    name: 'Sidi Bou',
    place: 'Sidi Bou Saïd — white & blue',
    colors: ['#f7f4ee', '#2b6cb0', '#1e3a5f', '#9cc3e5', '#c8b78e'],
  },
];

const BEAD_COUNT = 11;
/* Gentle arch — vertical offset per bead, in px. */
const ARC = [0, 10, 18, 24, 28, 30, 28, 24, 18, 10, 0];

function beadStyle(color: string): React.CSSProperties {
  return {
    background: `radial-gradient(circle at 32% 30%, #ffffffcc 0%, ${color} 42%, ${color} 100%)`,
    boxShadow: 'inset -2px -3px 6px rgba(0,0,0,0.25), 0 3px 6px rgba(15,26,54,0.25)',
  };
}

/**
 * A miniature of the real product: pick a collection, tap beads to restring
 * them, and the strand updates live — the same feel as the configurator.
 */
function StrandBuilder() {
  const [paletteId, setPaletteId] = useState<string>(palettes[0].id);
  const [beads, setBeads] = useState<number[]>(() =>
    Array.from({ length: BEAD_COUNT }, (_, i) => i % palettes[0].colors.length),
  );

  const palette = palettes.find((p) => p.id === paletteId) ?? palettes[0];

  const cycleBead = (index: number) => {
    setBeads((prev) =>
      prev.map((c, i) => (i === index ? (c + 1) % palette.colors.length : c)),
    );
  };

  const restring = () => {
    setBeads((prev) => prev.map((_, i) => (i * 2 + Math.floor(Math.random() * palette.colors.length)) % palette.colors.length));
  };

  return (
    <CaseDemo
      title="String your own — tap a bead"
      action={
        <button type="button" onClick={restring} className="demo-action">
          <RefreshCcw className="h-3.5 w-3.5" aria-hidden="true" /> Restring
        </button>
      }
      note={<>A sketch of the real thing — the live configurator strings full designs with cords, charms &amp; sharing.</>}
    >
      {/* the strand */}
      <div className="relative mt-4 pb-6">
        <svg
          aria-hidden="true"
          viewBox="0 0 440 60"
          preserveAspectRatio="none"
          className="absolute inset-x-2 top-[14px] h-[42px] w-[calc(100%-16px)]"
        >
          <path d="M0 6 Q 220 66 440 6" fill="none" stroke="#8a5a44" strokeWidth="2" strokeDasharray="1 3" />
        </svg>
        <div className="relative flex items-start justify-between px-1">
          {beads.map((colorIndex, i) => {
            const color = palette.colors[colorIndex % palette.colors.length];
            return (
              <button
                key={i}
                type="button"
                onClick={() => cycleBead(i)}
                aria-label={`Bead ${i + 1} — tap to change colour`}
                style={{ transform: `translateY(${ARC[i]}px)` }}
                className="rounded-full p-0.5 transition-transform hover:scale-110 focus-visible:scale-110 active:scale-95"
              >
                <motion.span
                  key={`${paletteId}-${colorIndex}`}
                  initial={{ scale: 0.6 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 420, damping: 18 }}
                  className="block h-6 w-6 rounded-full sm:h-8 sm:w-8"
                  style={beadStyle(color)}
                />
              </button>
            );
          })}
        </div>
        {/* charm */}
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-[52px] h-4 w-3 -translate-x-1/2 rounded-b-full border border-[#8a5a44]/50 bg-gradient-to-b from-[#e2c477] to-[#b98a3a] shadow-sm sm:top-[58px]"
        />
      </div>

      {/* collection picker */}
      <div className="mt-8 grid gap-2 sm:grid-cols-3" role="group" aria-label="Collection">
        {palettes.map((p) => {
          const active = p.id === paletteId;
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => setPaletteId(p.id)}
              aria-pressed={active}
              className="chip h-auto flex-col items-stretch gap-1 py-3"
            >
              <span className="flex items-center justify-between gap-3">
                <span className="text-base font-bold">{p.name}</span>
                <span className="flex -space-x-1.5" aria-hidden="true">
                  {p.colors.slice(0, 4).map((c) => (
                    <span key={c} className="h-3.5 w-3.5 rounded-full border border-white" style={{ backgroundColor: c }} />
                  ))}
                </span>
              </span>
              <span className="text-xs font-medium opacity-75">{p.place}</span>
            </button>
          );
        })}
      </div>
    </CaseDemo>
  );
}

/* ---------- Page ---------- */

const pipeline = ['New', 'Confirmed', 'In Production', 'Shipped', 'Delivered'];

const dashboardCards = [
  { title: 'Inventory', body: 'A bead inventory grid with low-stock flags, so the maker never promises what she can’t string.' },
  { title: 'Orders', body: 'Each custom design becomes a tracked production job moving through five stages.' },
  { title: 'Collections', body: 'Beads and ready-made designs are grouped into named collections the maker curates herself.' },
  { title: 'Overview', body: 'Revenue, orders, average order value, and top beads — the business at a glance.' },
];

const postcards = [
  { src: '/beadcraft-collection-medina.webp', alt: 'Medina collection beads', label: 'Medina' },
  { src: '/beadcraft-designs.webp', alt: 'Ready-made bracelet designs', label: 'Ready-made designs' },
  { src: '/beadcraft-collection-sahara.webp', alt: 'Sahara collection beads', label: 'Sahara' },
];

export default function BeadCraftProjectPage() {
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
        media={<CaseHeroImage slug="beadcraft" src="/beadcraft-hero.webp" alt="BeadCraft Studio storefront" />}
        mediaAspect="16 / 10"
        mediaCaption="craft.benarfa.com — the storefront"
        facts={['Handcrafted in Tunis', 'Made to order', 'Ships in 3–5 days', '24 governorates']}
      />

      <CaseSection label={t.subtitle} title={<>Turning a maker&rsquo;s craft into a product.</>}>
        <CaseOverview body={<p>{t.longDescription}</p>} problem={t.problem} solution={t.solution} />
      </CaseSection>

      <CaseSection
        id="configurator"
        label="The centrepiece"
        title="Tactile, not technical."
        aside="Customers build their bracelet bead by bead with a live preview — every choice updates a Zustand store, and finished designs can be saved and shared by link."
      >
        <div className="demo-grid">
          <StrandBuilder />
          <div className="grid gap-6">
            <CaseFigure
              src="/beadcraft-configurator.webp"
              alt="BeadCraft bracelet configurator"
              dims={{ width: 1440, height: 900 }}
              caption="The real configurator — curved, flat, or grid layouts with live pricing"
              sizes="(max-width: 860px) 100vw, 50vw"
            />
            <CaseFeatures items={['Live 2D preview', 'Shareable designs', 'EN / FR storefront', 'No duplicate orders']} />
          </div>
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
      </CaseSection>

      <CaseSection label="Behind the counter" title={<>The crafter&rsquo;s dashboard</>}>
        <CaseDemo title="Every order is a production job on a thread">
          <CaseSteps steps={pipeline} current={2} label="Order stages" />
        </CaseDemo>
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
        <CaseFeatures items={t.keyFeatures} />
      </CaseSection>

      <CaseSection label="Materials" title={<>What it&rsquo;s made of</>} surface="night">
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
