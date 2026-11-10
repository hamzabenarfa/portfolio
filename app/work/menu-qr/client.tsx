'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

import { PROJECTS } from '@/data/consts';
import { PROJECT_CONTENT } from '@/data/project-content';
import type { CaseFilmData } from '@/data/films';
import { CaseFilm } from '@/components/case/case-film';
import {
  CaseContact,
  CaseDemo,
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

/* ---------- Storefront demo ---------- */

type Lang = 'en' | 'fr' | 'ar';
type Shop = 'cafe' | 'restaurant' | 'bakery' | 'bar';

const langOptions: { id: Lang; label: string }[] = [
  { id: 'en', label: 'EN' },
  { id: 'fr', label: 'FR' },
  { id: 'ar', label: 'AR' },
];

/* Storefront strings as the product translates them. */
const ui: Record<Lang, { openNow: string; order: string; call: string; theMenu: string; cart: string; cartSub: (n: number) => string; send: string; add: string; dt: string }> = {
  en: { openNow: '● LIVE · OPEN NOW', order: 'ORDER', call: 'CALL', theMenu: '— The menu', cart: 'Your order', cartSub: (n) => `${n} items · ready in ~12 min`, send: 'Send to kitchen', add: 'Add to cart', dt: 'DT' },
  fr: { openNow: '● EN LIGNE · OUVERT', order: 'COMMANDER', call: 'APPELER', theMenu: '— La carte', cart: 'Votre commande', cartSub: (n) => `${n} articles · prêt dans ~12 min`, send: 'Envoyer en cuisine', add: 'Ajouter au panier', dt: 'DT' },
  ar: { openNow: '● متصل · مفتوح', order: 'اطلب', call: 'اتصل', theMenu: '— القائمة', cart: 'طلبك', cartSub: (n) => `${n} أصناف · جاهز خلال ~12 د`, send: 'إرسال للمطبخ', add: 'أضف إلى السلة', dt: 'د.ت' },
};

interface MenuItem {
  name: Record<Lang, string>;
  price: number;
}

interface ShopDef {
  id: Shop;
  label: string;
  /* The design onboarding assigns to this business type. */
  design: 'galerie' | 'atelier' | 'maison' | 'neon';
  designLabel: string;
  name: string;
  slug: string;
  category: Record<Lang, string>;
  items: MenuItem[];
}

/* Business type → design, as onboarding maps them; items from each type's
   starter menu (French and Arabic as seeded; English for this page). */
const shops: ShopDef[] = [
  {
    id: 'cafe', label: 'Café', design: 'galerie', designLabel: 'Galerie', name: 'Café Sidi Bou', slug: 'cafe-sidi-bou',
    category: { en: 'Coffee', fr: 'Cafés', ar: 'قهوة' },
    items: [
      { name: { en: 'Espresso', fr: 'Espresso', ar: 'إسبريسو' }, price: 3.5 },
      { name: { en: 'Cappuccino', fr: 'Cappuccino', ar: 'كابتشينو' }, price: 5.8 },
      { name: { en: 'Flat white', fr: 'Flat white', ar: 'فلات وايت' }, price: 6.2 },
      { name: { en: 'Turkish coffee', fr: 'Café turc', ar: 'قهوة تركية' }, price: 4 },
    ],
  },
  {
    id: 'restaurant', label: 'Restaurant', design: 'atelier', designLabel: 'Atelier', name: 'Dar El Médina', slug: 'dar-el-medina',
    category: { en: 'Mains', fr: 'Plats', ar: 'أطباق' },
    items: [
      { name: { en: 'Lamb couscous', fr: "Couscous à l'agneau", ar: 'كسكسي بالعلوش' }, price: 22 },
      { name: { en: 'Merguez ojja', fr: 'Ojja merguez', ar: 'عجة بالمرقاز' }, price: 16.5 },
      { name: { en: 'Mixed grill', fr: 'Grillade mixte', ar: 'مشوي مشكل' }, price: 28 },
      { name: { en: 'Kamounia', fr: 'Kamounia', ar: 'كمونية' }, price: 15 },
    ],
  },
  {
    id: 'bakery', label: 'Bakery', design: 'maison', designLabel: 'Maison', name: 'Pâtisserie Zitouna', slug: 'patisserie-zitouna',
    category: { en: 'Pastries', fr: 'Viennoiseries', ar: 'مرطبات' },
    items: [
      { name: { en: 'Croissant', fr: 'Croissant', ar: 'كرواسون' }, price: 2.8 },
      { name: { en: 'Pain au chocolat', fr: 'Pain au chocolat', ar: 'بان أو شوكولا' }, price: 3.8 },
      { name: { en: 'Almond croissant', fr: 'Croissant amandes', ar: 'كرواسون باللوز' }, price: 4.5 },
      { name: { en: 'Lemon tart', fr: 'Tarte citron', ar: 'تارت ليمون' }, price: 6 },
    ],
  },
  {
    id: 'bar', label: 'Bar', design: 'neon', designLabel: 'Neon', name: 'Bar La Marsa', slug: 'bar-la-marsa',
    category: { en: 'Juices & smoothies', fr: 'Jus & smoothies', ar: 'عصائر وسموذي' },
    items: [
      { name: { en: 'Orange juice', fr: "Jus d'orange", ar: 'عصير برتقال' }, price: 6.5 },
      { name: { en: 'Mango smoothie', fr: 'Smoothie mangue', ar: 'سموذي مانجو' }, price: 9 },
      { name: { en: 'Mocktail', fr: 'Cocktail sans alcool', ar: 'كوكتال بدون كحول' }, price: 9.5 },
      { name: { en: 'Panini', fr: 'Panini', ar: 'بانيني' }, price: 9.5 },
    ],
  },
];

function price(n: number, lang: Lang): string {
  const amount = Number.isInteger(n) ? String(n) : n.toFixed(1);
  return lang === 'ar' ? `${amount} ${ui.ar.dt}` : `${amount} ${ui[lang].dt}`;
}

/**
 * A phone storefront: pick a business type to get the design onboarding
 * assigns it, switch the language, and watch Arabic flip the whole screen.
 */
function StorefrontDemo() {
  const [shopId, setShopId] = useState<Shop>('restaurant');
  const [lang, setLang] = useState<Lang>('en');
  const [cart, setCart] = useState<Record<string, number>>({});

  const shop = shops.find((s) => s.id === shopId) ?? shops[0];
  const t = ui[lang];
  const count = Object.values(cart).reduce((a, b) => a + b, 0);
  const add = (name: string) => setCart((c) => ({ ...c, [name]: (c[name] ?? 0) + 1 }));

  return (
    <CaseDemo
      title="One menu, three languages, a design per venue — try it"
      note="Interface strings are the product's own translations. Menus are the starter template each business type gets at onboarding, with English names added here. Venue names are fictional."
    >
      <div className="sf">
        <div className="sf-controls">
          <div className="sf-control" role="group" aria-label="Business type">
            <p className="sf-control-label">Business type</p>
            <div className="chip-row">
              {shops.map((s) => (
                <button key={s.id} type="button" className="chip chip-stack" aria-pressed={s.id === shopId} onClick={() => { setShopId(s.id); setCart({}); }}>
                  <span>{s.label}</span>
                  <span className="text-xs font-medium opacity-75">Design: {s.designLabel}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="sf-control" role="group" aria-label="Storefront language">
            <p className="sf-control-label">Language</p>
            <div className="chip-row">
              {langOptions.map((opt) => (
                <button key={opt.id} type="button" className="chip min-w-12" aria-pressed={lang === opt.id} onClick={() => setLang(opt.id)}>{opt.label}</button>
              ))}
            </div>
          </div>
          <p className="sf-explain">
            {lang === 'ar'
              ? 'Arabic sets dir="rtl" on the page: the layout, reading order, price leaders and buttons all flip, not just the text.'
              : `${shop.designLabel} is the design onboarding picks for a ${shop.label.toLowerCase()}; a venue can switch to any of the 28 later.`}
          </p>
        </div>

        <div className="phone" aria-label={`${shop.name} storefront preview`}>
          <motion.div
            key={`${shop.id}-${lang}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25 }}
            className="phone-screen"
            data-design={shop.design}
            dir={lang === 'ar' ? 'rtl' : 'ltr'}
            lang={lang}
          >
            <p className="sfp-path">menu-qr.tn / {shop.slug}</p>
            <header className="sfp-head">
              <p className="sfp-open">{t.openNow}</p>
              <h3 className="sfp-name">{shop.name}</h3>
              <div className="sfp-actions">
                <span className="sfp-primary">{t.order}</span>
                <span className="sfp-secondary">{t.call}</span>
              </div>
            </header>
            <p className="sfp-section">{t.theMenu}</p>
            <h4 className="sfp-category">{shop.category[lang]}</h4>
            <ul className="sfp-items">
              {shop.items.map((item) => (
                <li key={item.name.en}>
                  <span className="sfp-item-name">{item.name[lang]}</span>
                  <span className="sfp-leader" aria-hidden="true" />
                  <span className="sfp-item-price">{price(item.price, lang)}</span>
                  <button type="button" className="sfp-add" onClick={() => add(item.name.en)} aria-label={`${t.add}: ${item.name[lang]}`}>
                    +{cart[item.name.en] ? <span className="sfp-add-count">{cart[item.name.en]}</span> : null}
                  </button>
                </li>
              ))}
            </ul>
            <div className="sfp-cart" aria-live="polite">
              <span>
                <span className="sfp-cart-title">{t.cart}</span>
                <span className="sfp-cart-sub">{t.cartSub(count)}</span>
              </span>
              <span className="sfp-cart-cta">{t.send}</span>
            </div>
          </motion.div>
        </div>
      </div>
    </CaseDemo>
  );
}

/* ---------- Printed objects ---------- */

const steps = [
  { n: '01', title: 'Build your menu', copy: 'Start from the starter template or blank — add photos, prices, and options; every change is live on the table QR the moment it saves.' },
  { n: '02', title: 'One QR per table', copy: 'Generate a unique code for every table; print it yourself or order pre-printed cards.' },
  { n: '03', title: 'Orders at the table', copy: 'Guests scan and order from their phone — tickets hit the kitchen display the moment they’re placed.' },
];

const carte = [
  { name: 'Passwordless sign-in', tag: 'no password', copy: 'A one-time code by phone or a magic link instead of a password — less friction, less drop-off.' },
  { name: 'Live menu editor', tag: 'real-time', copy: 'Photos, allergens, options — every change is live on the table QR the moment it saves.' },
  { name: 'Live orders & kitchen', tag: 'dashboard', copy: 'Tickets stream to the kitchen display and an orders dashboard the moment a table places them.' },
  { name: 'English · French · Arabic', tag: 'full RTL', copy: 'Trilingual storefronts with proper right-to-left layout, not a mirrored afterthought.' },
  { name: '28 storefront designs', tag: 'branded', copy: 'From minimal to full editorial, auto-matched to the venue type at onboarding — the menu page reads like the venue, not like software.' },
];

const expertise = [
  'Multi-tenant data modeling',
  'B2B SaaS architecture',
  'Internationalization (RTL)',
  'Passwordless auth',
  'Caching & performance',
  'Analytics dashboards',
];

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
          ['2× Citronnade', '11.0'],
          ['1× Croissant', '2.8'],
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
          <span>17.3 DT</span>
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

/** The tent card on a tiled table, used as the hero when there's no film and beside the feature list when there is. */
function TentOnTable() {
  return (
    <div className="grid place-items-center px-4 py-[clamp(40px,6vw,88px)] [background-image:linear-gradient(to_right,rgb(0_0_0/0.18)_2px,transparent_2px),linear-gradient(to_bottom,rgb(0_0_0/0.18)_2px,transparent_2px)] [background-size:28px_28px]">
      <TentCard />
    </div>
  );
}

export default function MenuQRProjectPage({ film }: { film: CaseFilmData | null }) {
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
        primary={{ href: '#storefront', label: 'Try the storefront' }}
        media={film ? <CaseFilm film={film} /> : <TentOnTable />}
        mediaAspect="auto"
        facts={['Multi-tenant SaaS', 'No app to download', 'No POS terminal', '28 storefront designs']}
      />

      <CaseSection label="The idea" title="Turn a printed menu into a sales channel.">
        <CaseOverview body={<p>{t.longDescription}</p>} problem={t.problem} solution={t.solution} />
      </CaseSection>

      <CaseSection
        id="storefront"
        label="The centrepiece"
        title="One menu. Three languages. A design per venue."
        aside="Every venue is its own tenant with its own slug, staff and plan. At onboarding it gets a starter menu and one of 28 storefront designs matched to its business type, and diners read it in English, French or Arabic — with Arabic laid out right-to-left, not mirrored."
      >
        <StorefrontDemo />
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
          <figure className="self-center">
            <TentOnTable />
            <figcaption className="mt-3 text-[length:var(--text-xs)] text-[color:var(--ink-2)]">One code per table — print it yourself or order pre-printed cards.</figcaption>
          </figure>
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
