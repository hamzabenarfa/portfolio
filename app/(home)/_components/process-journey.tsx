"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface Stage {
  key: string;
  label: string;
  duration: string;
  title: string;
  subtitle: string;
  body: string;
  deliverables: string[];
  illustration: "discover" | "scope" | "design" | "build" | "support";
}

const stages: Stage[] = [
  {
    key: "discover",
    label: "Discovery",
    duration: "≈ 1 week",
    title: "Discovery",
    subtitle: "Project fit & scoping call",
    body:
      "We start by understanding the business, the people who will use the product, and the smallest version that can create real signal. I push back on anything that does not earn its place in the first release.",
    deliverables: [
      "Goals, users, and constraints written down",
      "First-release cutline",
      "A clear yes/no on whether we are a good fit",
    ],
    illustration: "discover",
  },
  {
    key: "scope",
    label: "Scoping",
    duration: "≈ 1 week",
    title: "Scoping",
    subtitle: "Plan, estimate, timeline",
    body:
      "I turn the discovery into a structured plan: user flows, data model, roles, integrations, and the trade-offs that decide the timeline. You get a real estimate, not a sales pitch.",
    deliverables: [
      "User flows and data model",
      "Architecture & stack decisions",
      "Phased timeline with milestones",
    ],
    illustration: "scope",
  },
  {
    key: "design",
    label: "Design",
    duration: "1 – 2 weeks",
    title: "Design",
    subtitle: "UI direction & key screens",
    body:
      "Design happens before the build gets expensive. I pin down a visual direction, build the key screens, and lock the parts of the UI that depend on hard product decisions.",
    deliverables: [
      "Visual direction & component baseline",
      "Hero flows designed end-to-end",
      "Empty, loading and error states",
    ],
    illustration: "design",
  },
  {
    key: "build",
    label: "Development",
    duration: "4 – 12 weeks",
    title: "Development",
    subtitle: "Ship in visible slices",
    body:
      "I build in weekly slices on a staging URL you can use. Frontend, backend, auth, data, payments, file storage — all handled by one person, so nothing falls between contractors.",
    deliverables: [
      "Weekly staging demo you can click through",
      "Production-quality Next.js + API code",
      "Tracked progress against the milestone plan",
    ],
    illustration: "build",
  },
  {
    key: "support",
    label: "Launch & Support",
    duration: "Ongoing",
    title: "Launch & Support",
    subtitle: "Deploy, harden, hand over",
    body:
      "Final mile: deploy pipeline, environment setup, responsive QA, documentation, and a clear handover. After launch I stay available to fix things fast or keep shipping with you.",
    deliverables: [
      "Production deploy + monitoring",
      "Operational docs and credentials handoff",
      "Optional retainer for ongoing work",
    ],
    illustration: "support",
  },
];

const AUTO_ADVANCE_MS = 6500;

export function ProcessJourney() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<number | null>(null);

  const clearTimer = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (paused) return;
    clearTimer();
    timerRef.current = window.setTimeout(() => {
      setActive((i) => (i + 1) % stages.length);
    }, AUTO_ADVANCE_MS);
    return clearTimer;
  }, [active, paused, clearTimer]);

  const handleSelect = (i: number) => {
    setActive(i);
    setPaused(true);
  };

  const stage = stages[active];

  return (
    <section
      id="process"
      className="container journey"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="section-header reveal">
        <span className="num">[ 03 / Process ]</span>
        <h2 className="title">
          How we ship <em>together</em>
        </h2>
        <span className="meta">
          5-stage process
          <br />
          From discovery to launch
        </span>
      </div>

      <div className="journey-intro reveal">
        <p>
          Every project moves through the same five stages — so you always know
          where we are, what you owe me, and what I owe you next. Click a stage
          to jump, or let it auto-advance.
        </p>
      </div>

      <div
        className="journey-rail reveal"
        role="tablist"
        aria-label="Process stages"
      >
        <div className="journey-rail-line" aria-hidden="true" />
        <div
          className="journey-rail-progress"
          aria-hidden="true"
          style={{ width: `${(active / (stages.length - 1)) * 100}%` }}
        />
        {stages.map((s, i) => {
          const status = i < active ? "done" : i === active ? "active" : "todo";
          return (
            <button
              key={s.key}
              role="tab"
              aria-selected={i === active}
              aria-controls={`journey-panel-${s.key}`}
              className={`journey-stage journey-stage-${status}`}
              onClick={() => handleSelect(i)}
              data-cursor-hover
            >
              <span className="journey-stage-label">{s.label}</span>
              <span className="journey-stage-dot" aria-hidden="true">
                <span className="journey-stage-dot-inner" />
              </span>
              <span className="journey-stage-meta">{`0${i + 1}`}</span>
            </button>
          );
        })}
      </div>

      <div
        id={`journey-panel-${stage.key}`}
        role="tabpanel"
        aria-labelledby={stage.key}
        className="journey-panel reveal"
        key={stage.key}
      >
        <div className="journey-panel-text">
          <span className="journey-panel-duration">
            <span className="journey-panel-clock" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3 2" strokeLinecap="round" />
              </svg>
            </span>
            {stage.duration}
          </span>

          <h3 className="journey-panel-title">{stage.title}</h3>
          <p className="journey-panel-subtitle">{stage.subtitle}</p>

          <p className="journey-panel-body">{stage.body}</p>

          <ul className="journey-panel-list">
            {stage.deliverables.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <div className="journey-panel-actions">
            <button
              type="button"
              className="journey-next"
              onClick={() => handleSelect((active + 1) % stages.length)}
              data-cursor-hover
            >
              <span>Next stage</span>
              <span className="arrow">→</span>
            </button>
            <span className="journey-pause">
              {paused ? "Paused" : "Auto-playing"} · {active + 1} / {stages.length}
            </span>
          </div>
        </div>

        <div className="journey-panel-visual" aria-hidden="true">
          <Illustration kind={stage.illustration} />
        </div>
      </div>
    </section>
  );
}

function Illustration({ kind }: { kind: Stage["illustration"] }) {
  if (kind === "discover") {
    return (
      <svg viewBox="0 0 320 280" className="journey-illu">
        <defs>
          <linearGradient id="d-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="var(--accent)" stopOpacity="0.18" />
            <stop offset="1" stopColor="var(--accent)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <rect x="20" y="20" width="280" height="240" rx="16" fill="url(#d-grad)" stroke="var(--line)" />
        <circle cx="120" cy="130" r="46" fill="none" stroke="var(--accent)" strokeWidth="1.5" />
        <line x1="156" y1="166" x2="200" y2="210" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" />
        <g fill="var(--ink-dim)" fontFamily="var(--font-jetbrains-mono)" fontSize="9">
          <text x="200" y="60">USERS</text>
          <text x="200" y="84">CONSTRAINTS</text>
          <text x="200" y="108">SUCCESS</text>
        </g>
        <g stroke="var(--line)" strokeWidth="1">
          <line x1="195" y1="56" x2="280" y2="56" />
          <line x1="195" y1="80" x2="280" y2="80" />
          <line x1="195" y1="104" x2="280" y2="104" />
        </g>
        <circle cx="120" cy="130" r="6" fill="var(--accent)" />
      </svg>
    );
  }

  if (kind === "scope") {
    return (
      <svg viewBox="0 0 320 280" className="journey-illu">
        <rect x="20" y="20" width="280" height="240" rx="16" fill="none" stroke="var(--line)" />
        <g stroke="var(--accent)" strokeWidth="1.5" fill="none">
          <rect x="40" y="50" width="100" height="60" rx="8" />
          <rect x="160" y="50" width="120" height="60" rx="8" />
          <rect x="40" y="130" width="240" height="50" rx="8" />
          <rect x="40" y="195" width="115" height="40" rx="8" />
          <rect x="165" y="195" width="115" height="40" rx="8" />
        </g>
        <g fill="var(--ink-dim)" fontFamily="var(--font-jetbrains-mono)" fontSize="9">
          <text x="50" y="74">/auth</text>
          <text x="50" y="92">— login, sso, otp</text>
          <text x="170" y="74">/dashboard</text>
          <text x="170" y="92">— admin, user, ops</text>
          <text x="50" y="154">data: postgres · cache: redis</text>
          <text x="50" y="172">files: s3 · payments: stripe</text>
          <text x="50" y="218">milestone 01</text>
          <text x="175" y="218">milestone 02</text>
        </g>
        <line x1="20" y1="240" x2="160" y2="240" stroke="var(--accent)" strokeWidth="2" />
      </svg>
    );
  }

  if (kind === "design") {
    return (
      <svg viewBox="0 0 320 280" className="journey-illu">
        <rect x="20" y="20" width="170" height="240" rx="14" fill="var(--bg-elev)" stroke="var(--line)" />
        <rect x="36" y="36" width="138" height="14" rx="3" fill="var(--accent)" opacity="0.55" />
        <rect x="36" y="58" width="100" height="8" rx="2" fill="var(--ink-faint)" />
        <rect x="36" y="74" width="80" height="8" rx="2" fill="var(--ink-faint)" />
        <rect x="36" y="100" width="138" height="60" rx="6" fill="none" stroke="var(--line)" />
        <circle cx="60" cy="130" r="10" fill="var(--accent-warm)" opacity="0.6" />
        <rect x="36" y="172" width="64" height="24" rx="12" fill="var(--accent)" />
        <rect x="200" y="40" width="100" height="100" rx="10" fill="none" stroke="var(--line)" />
        <rect x="200" y="155" width="100" height="50" rx="10" fill="none" stroke="var(--line)" />
        <rect x="200" y="220" width="100" height="30" rx="10" fill="none" stroke="var(--accent)" />
        <g fill="var(--ink-dim)" fontFamily="var(--font-jetbrains-mono)" fontSize="9">
          <text x="210" y="58">Tokens</text>
          <text x="210" y="172">Components</text>
          <text x="210" y="238">Direction</text>
        </g>
      </svg>
    );
  }

  if (kind === "build") {
    return (
      <svg viewBox="0 0 320 280" className="journey-illu">
        <rect x="20" y="20" width="280" height="240" rx="14" fill="var(--bg-elev)" stroke="var(--line)" />
        <g fill="var(--ink)" fontFamily="var(--font-jetbrains-mono)" fontSize="10">
          <text x="36" y="50">~ pnpm build</text>
          <text x="36" y="72" fill="var(--ink-faint)">▸ Compiled · 0 errors</text>
          <text x="36" y="92" fill="var(--ink-faint)">▸ Lint clean</text>
          <text x="36" y="112" fill="var(--accent)">▸ Deployed to staging-week-03</text>
        </g>
        <rect x="36" y="138" width="248" height="22" rx="4" fill="none" stroke="var(--line)" />
        <rect x="36" y="138" width="186" height="22" rx="4" fill="var(--accent)" opacity="0.32" />
        <g fill="var(--ink-dim)" fontFamily="var(--font-jetbrains-mono)" fontSize="9">
          <text x="40" y="153">milestone 02 — 75%</text>
          <text x="36" y="180">slice 01</text>
          <text x="106" y="180">slice 02</text>
          <text x="176" y="180">slice 03</text>
          <text x="246" y="180">slice 04</text>
        </g>
        <g stroke="var(--accent)" fill="var(--accent)">
          <circle cx="48" cy="200" r="5" />
          <circle cx="118" cy="200" r="5" />
          <circle cx="188" cy="200" r="5" />
        </g>
        <circle cx="258" cy="200" r="5" fill="none" stroke="var(--ink-faint)" />
        <line x1="48" y1="200" x2="258" y2="200" stroke="var(--line)" strokeDasharray="3 4" />
        <rect x="36" y="222" width="248" height="22" rx="4" fill="var(--bg)" stroke="var(--line)" />
        <text x="46" y="237" fill="var(--ink-dim)" fontFamily="var(--font-jetbrains-mono)" fontSize="9">
          ✓ staging.app.com — open
        </text>
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 320 280" className="journey-illu">
      <rect x="20" y="20" width="280" height="240" rx="14" fill="var(--bg-elev)" stroke="var(--line)" />
      <g stroke="var(--accent)" fill="none" strokeWidth="1.4">
        <path d="M48 196 Q 70 110 110 110 T 196 110 T 280 70" />
      </g>
      <g fill="var(--accent)">
        <circle cx="48" cy="196" r="4" />
        <circle cx="110" cy="110" r="4" />
        <circle cx="196" cy="110" r="4" />
        <circle cx="280" cy="70" r="4" />
      </g>
      <g fill="var(--ink-dim)" fontFamily="var(--font-jetbrains-mono)" fontSize="9">
        <text x="40" y="220">v1.0</text>
        <text x="98" y="135">v1.1</text>
        <text x="184" y="135">v1.2</text>
        <text x="246" y="60">v2.0</text>
      </g>
      <rect x="36" y="40" width="248" height="22" rx="4" fill="none" stroke="var(--line)" />
      <text x="46" y="55" fill="var(--ink)" fontFamily="var(--font-jetbrains-mono)" fontSize="9">
        ✓ production · monitoring · docs · handoff
      </text>
    </svg>
  );
}
