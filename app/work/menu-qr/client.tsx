'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

import { PROJECTS } from '@/data/consts';
import { PROJECT_CONTENT } from '@/data/project-content';
import {
  CaseContact,
  CaseDemo,
  CaseFeatures,
  CaseFigure,
  CaseHero,
  CaseNext,
  CaseOverview,
  CasePage,
  CaseSection,
  CaseTags,
} from '@/components/case/case-kit';

/* Printed objects (the receipt and the table tent) stay light on any surface. */
const PAPER =
  'bg-white [--ink:#0f1a36] [--ink-2:#4a5470] [--line:rgb(15_26_54/0.14)] [--line-strong:rgb(15_26_54/0.34)] [--mark:#1a4fc4] text-[color:var(--ink)]';

/* Deterministic pseudo-QR pattern for the table tent card. */
const QR_GRID = [
  '#######.#.#######',
  '#.....#.#.#.....#',
  '#.###.#..##.###.#',
  '#.###.#.#.#.###.#',
  '#.###.#..#..###.#',
  '#.....#.##..#...#',
  '#######.#.#######',
  '........##.......',
  '#.##.###..#.#.##.',
  '.#..#..##.###..##',
  '##.#.##.#..##.#..',
  '........#.##..##.',
  '#######..#.#.###.',
  '#.....#.###..#..#',
  '#.###.#.#..##.##.',
  '#.###.#..##.#..##',
  '#######.#..###.#.',
];

type Lang = 'en' | 'fr' | 'ar';

const langOptions: { id: Lang; label: string }[] = [
  { id: 'en', label: 'EN' },
  { id: 'fr', label: 'FR' },
  { id: 'ar', label: 'AR' },
];

const menuRow: Record<Lang, { dir: 'ltr' | 'rtl'; category: string; name: string; desc: string; price: string; cta: string }> = {
  en: {
    dir: 'ltr',
    category: 'From the grill',
    name: 'Grilled sea bream',
    desc: 'Charcoal-grilled, chermoula, preserved lemon',
    price: '28 DT',
    cta: 'Add to order',
  },
  fr: {
    dir: 'ltr',
    category: 'Au feu de bois',
    name: 'Daurade grillée',
    desc: 'Grillée au charbon, chermoula, citron confit',
    price: '28 DT',
    cta: 'Ajouter à la commande',
  },
  ar: {
    dir: 'rtl',
    category: 'من المشواة',
    name: 'دنيس مشوي',
    desc: 'مشوي على الفحم، شرمولة، ليمون مخلّل',
    price: '28 د.ت',
    cta: 'أضف إلى الطلب',
  },
};

const steps = [
  { n: '01', title: 'Build your menu', copy: 'Start from a template or blank — add photos, prices, and options; every change is live on the table QR the moment it saves.' },
  { n: '02', title: 'One QR per table', copy: 'Generate a unique code for every table; print it yourself or order pre-printed cards.' },
  { n: '03', title: 'Orders at the table', copy: 'Guests scan and order from their phone — tickets hit the kitchen display the moment they’re placed.' },
];

const carte = [
  { name: 'Passwordless sign-in', tag: 'no password', copy: 'A one-time code by phone or a magic link instead of a password — less friction, less drop-off.' },
  { name: 'Live menu editor', tag: 'real-time', copy: 'Photos, allergens, options — every change is live on the table QR the moment it saves.' },
  { name: 'Live orders & kitchen', tag: 'dashboard', copy: 'Tickets stream to the kitchen display and an orders dashboard the moment a table places them.' },
  { name: 'English · French · Arabic', tag: 'full RTL', copy: 'Trilingual storefronts with proper right-to-left layout, not a mirrored afterthought.' },
  { name: 'Storefront themes', tag: 'branded', copy: 'From minimal to full editorial — the menu page reads like the venue, not like software.' },
];

const expertise = [
  'Multi-tenant data modeling',
  'B2B SaaS architecture',
  'Internationalization (RTL)',
  'Passwordless auth',
  'Caching & performance',
  'Analytics dashboards',
];

/** Segmented EN/FR/AR control that re-renders a live menu row, flipping to RTL for Arabic. */
function TrilingualDemo() {
  const [lang, setLang] = useState<Lang>('en');
  const row = menuRow[lang];

  return (
    <CaseDemo
      title="One menu, three languages — try it"
      action={
        <div className="chip-row" role="group" aria-label="Menu language">
          {langOptions.map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => setLang(opt.id)}
              aria-pressed={lang === opt.id}
              className="chip min-w-12"
            >
              {opt.label}
            </button>
          ))}
        </div>
      }
      note="Arabic flips the whole layout right-to-left — type, dots, price, and button."
      className="self-center"
    >
      <motion.div
        key={lang}
        dir={row.dir}
        lang={lang}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="rounded-[4px] border border-[color:var(--line)] bg-[color:var(--wash)] p-5 sm:p-6"
      >
        <p className="text-sm font-semibold text-[color:var(--mark)]">{row.category}</p>
        <div className="mt-3 flex items-baseline gap-3">
          <h3 className="text-[1.25rem] font-bold leading-tight sm:text-[1.5rem]">{row.name}</h3>
          <span aria-hidden="true" className="min-w-4 flex-1 border-b border-dotted border-[color:var(--line-strong)]" />
          <span className="shrink-0 whitespace-nowrap text-base font-bold tabular-nums">{row.price}</span>
        </div>
        <p className="mt-2 text-sm text-[color:var(--ink-2)]">{row.desc}</p>
        <span className="mt-4 inline-flex min-h-10 items-center rounded-[3px] bg-[color:var(--ink)] px-4 text-sm font-semibold text-[color:var(--wash)]">
          {row.cta}
        </span>
      </motion.div>
    </CaseDemo>
  );
}

/** Stylised order receipt — how a scan becomes a kitchen ticket. Illustrative content. */
function Receipt() {
  return (
    <div className="mx-auto w-full max-w-xs">
      <div className={`${PAPER} px-6 pb-2 pt-6 text-sm tabular-nums shadow-[0_24px_48px_-20px_rgb(15_26_54/0.4)]`}>
        <p className="text-center text-base font-bold">CAFÉ EXEMPLE</p>
        <p className="mt-1 text-center text-xs text-[color:var(--ink-2)]">menu-qr.tn/r/cafe-exemple</p>
        <div className="my-4 border-t border-dashed border-[color:var(--line-strong)]" />
        <div className="flex justify-between font-semibold">
          <span>TABLE 07</span>
          <span className="text-[color:var(--mark)]">SCAN → ORDER</span>
        </div>
        <div className="my-4 border-t border-dashed border-[color:var(--line-strong)]" />
        {[
          ['1× Espresso', '3.5'],
          ['2× Citronnade', '9.0'],
          ['1× Croissant', '2.5'],
        ].map(([item, price]) => (
          <div key={item} className="flex items-baseline gap-2 py-1">
            <span>{item}</span>
            <span aria-hidden="true" className="flex-1 border-b border-dotted border-[color:var(--line-strong)]" />
            <span>{price}</span>
          </div>
        ))}
        <div className="my-4 border-t border-dashed border-[color:var(--line-strong)]" />
        <div className="flex justify-between font-bold">
          <span>TOTAL</span>
          <span>15.0 DT</span>
        </div>
        <div className="mt-4 flex justify-between gap-3 text-xs text-[color:var(--ink-2)]">
          <span>→ Kitchen ticket</span>
          <span>→ Live dashboard</span>
        </div>
        <p className="mt-3 text-center text-[11px] text-[color:var(--ink-2)]">illustration</p>
      </div>
      <div
        aria-hidden="true"
        className="h-3"
        style={{
          background:
            'linear-gradient(45deg, transparent 33.333%, #ffffff 33.333%, #ffffff 66.667%, transparent 66.667%), linear-gradient(-45deg, transparent 33.333%, #ffffff 33.333%, #ffffff 66.667%, transparent 66.667%)',
          backgroundSize: '14px 24px',
          backgroundPosition: '0 -12px',
        }}
      />
    </div>
  );
}

/** CSS table tent card with a stylised QR pattern. */
function TentCard() {
  return (
    <div className={`${PAPER} w-fit rounded-[4px] p-6 shadow-[0_32px_64px_-28px_rgb(0_0_0/0.7)] sm:p-9`}>
      <p className="text-center text-sm font-semibold text-[color:var(--ink-2)]">Table 07</p>
      <div className="mx-auto mt-4 grid w-fit gap-[2px] rounded-[3px] border border-[color:var(--line)] p-3" aria-hidden="true">
        {QR_GRID.map((row, ri) => (
          <div key={ri} className="flex gap-[2px]">
            {row.split('').map((cell, ci) => (
              <span
                key={ci}
                className={`size-[8px] rounded-[1px] sm:size-[10px] lg:size-[13px] ${cell === '#' ? 'bg-[color:var(--ink)]' : 'bg-transparent'}`}
              />
            ))}
          </div>
        ))}
      </div>
      <p className="mt-5 text-center text-base font-bold">Scan · Order · Enjoy</p>
      <p className="mt-1 text-center text-sm text-[color:var(--ink-2)]">No app. No wait.</p>
    </div>
  );
}

export default function MenuQRProjectPage() {
  const t = PROJECT_CONTENT['menu-qr'];
  const project = PROJECTS.find((p) => p.slug === 'menu-qr');

  if (!project) return null;

  return (
    <CasePage slug="menu-qr">
      <CaseHero
        slug="menu-qr"
        title={t.title}
        meta={[t.category, project.year, 'EN · FR · AR — full RTL']}
        liveUrl={project.url}
        tagline="The menu is the order."
        description={t.description}
        primary={{ href: '#receipt', label: 'Follow one order' }}
        media={
          <div className="grid place-items-center px-4 py-[clamp(40px,6vw,88px)] [background-image:linear-gradient(to_right,rgb(0_0_0/0.18)_2px,transparent_2px),linear-gradient(to_bottom,rgb(0_0_0/0.18)_2px,transparent_2px)] [background-size:28px_28px]">
            <TentCard />
          </div>
        }
        mediaAspect="auto"
        facts={['Multi-tenant SaaS', 'No app to download', 'No POS terminal', 'Live in ~10 min']}
      />

      <CaseSection label="The idea" title="Turn a printed menu into a sales channel.">
        <CaseOverview body={<p>{t.longDescription}</p>} problem={t.problem} solution={t.solution} />
      </CaseSection>

      <CaseSection id="receipt" label="Follow one order" title="From scan to kitchen in three steps.">
        <div className="demo-grid">
          <div className="order-2 min-[861px]:order-1">
            <Receipt />
          </div>
          <ol className="case-cards order-1 min-[861px]:order-2" style={{ '--cols': 1 } as React.CSSProperties}>
            {steps.map((s) => (
              <li key={s.n}>
                <p className="case-card-meta">{s.n}</p>
                <h3>{s.title}</h3>
                <p className="case-card-body">{s.copy}</p>
              </li>
            ))}
          </ol>
        </div>
      </CaseSection>

      <CaseSection
        label="La carte"
        title={<>What&rsquo;s on the menu</>}
        aside="Everything a venue needs between the table and the kitchen — written up like the menus it powers."
      >
        <div className="demo-grid">
          <div className="border-t-2 border-[color:var(--ink)] pt-5">
            <p className="text-center text-sm font-semibold text-[color:var(--ink-2)]">— La carte —</p>
            <ul className="mt-2">
              {carte.map((item) => (
                <li key={item.name} className="border-b border-[color:var(--line)] py-5 last:border-b-0">
                  <div className="flex items-baseline gap-3">
                    <h3 className="text-lg font-bold leading-snug">{item.name}</h3>
                    <span aria-hidden="true" className="min-w-4 flex-1 border-b border-dotted border-[color:var(--line-strong)]" />
                    <span className="shrink-0 text-sm font-semibold text-[color:var(--mark)]">{item.tag}</span>
                  </div>
                  <p className="mt-1.5 text-[color:var(--ink-2)]">{item.copy}</p>
                </li>
              ))}
            </ul>
          </div>
          <TrilingualDemo />
        </div>
      </CaseSection>

      <CaseSection label="In the wild" title="The product" surface="tone">
        <CaseFigure
          src="/menu-qr-hero.webp"
          alt="Menu QR landing page"
          dims={{ width: 1440, height: 900 }}
          caption="menu-qr.tn — the landing page"
          aspect="16 / 8"
          sizes="(max-width: 1024px) 100vw, 90vw"
          surface="night"
        />
        <div className="case-pair">
          <CaseFigure
            src="/menu-qr-bento.webp"
            alt="Menu QR feature overview and storefront preview"
            dims={{ width: 1440, height: 900 }}
            caption="Features & storefront preview"
            sizes="(max-width: 860px) 100vw, 50vw"
            surface="night"
          />
          <CaseFigure
            src="/menu-qr-pricing.webp"
            alt="Menu QR pricing page"
            dims={{ width: 1440, height: 900 }}
            caption="Self-serve pricing — no bank card to start"
            sizes="(max-width: 860px) 100vw, 50vw"
            surface="night"
          />
        </div>
        <CaseFeatures items={t.keyFeatures} />
      </CaseSection>

      <CaseSection label="Under the counter" title={<>Stack &amp; expertise</>}>
        <CaseTags items={project.tech} />
        <CaseTags items={expertise} label="Expertise" />
      </CaseSection>

      <CaseNext from="menu-qr" slug="autopart" />
      <CaseContact
        slug="menu-qr"
        title="Need software your customers never have to learn?"
        lede={<>I partner with founders and small teams to ship production software, start to finish. Tell me what you&rsquo;re building.</>}
      />
    </CasePage>
  );
}
