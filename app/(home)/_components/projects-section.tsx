"use client";

import { useRef, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SectionHead } from "./section-head";
import { FadeUp } from "@/components/fx/reveal";
import { Magnetic } from "@/components/fx/magnetic";

interface Project {
  label: ReactNode;
  plain: string;
  year: string;
  type: string;
  role: string;
  desc: string;
  image: string;
  href: string;
}

const projects: Project[] = [
  {
    label: (
      <>
        D‑Talk <em>Ecosystem</em>
      </>
    ),
    plain: "D-Talk Ecosystem",
    year: "2024",
    type: "Fashion Tech / SaaS",
    role: "Full-stack · Frontend architecture",
    desc: "Multi-role fashion marketplace connecting designers, brands, and buyers — with a real-time canvas-based product customizer and four distinct user dashboards.",
    image: "/d-talk.webp",
    href: "/projects/dtalk-ecosystem",
  },
  {
    label: (
      <>
        Menu <em>QR</em>
      </>
    ),
    plain: "Menu QR",
    year: "2025",
    type: "SaaS / Restaurant Tech",
    role: "Full-stack · Product build",
    desc: "B2B SaaS that lets restaurants self-onboard and publish QR-accessible menus in minutes — wizard onboarding, drag-and-drop editor, analytics, AI menu digitization.",
    image: "/menu-qr.webp",
    href: "/projects/menu-qr",
  },
  {
    label: (
      <>
        Kindra <em>Fashion</em>
      </>
    ),
    plain: "Kindra Fashion",
    year: "2025",
    type: "E-Commerce / Starter Kit",
    role: "Full-stack · Architecture & delivery",
    desc: "Production-ready e-commerce foundation for fashion brands — dual storefronts, multi-variant products, Stripe payments, and a full admin dashboard.",
    image: "/kindra.webp",
    href: "/projects/kindra",
  },
];

/**
 * Editorial work index. Desktop: oversized rows with an ink-sweep hover
 * and a floating live preview that trails the cursor with inertia.
 * Mobile: full cards with visible media.
 */
export function ProjectsSection() {
  const root = useRef<HTMLElement>(null);
  const preview = useRef<HTMLDivElement>(null);
  const active = useRef(-1);

  useGSAP(
    () => {
      const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (!fine || reduced || !preview.current) return;

      const el = preview.current;
      const xTo = gsap.quickTo(el, "x", { duration: 0.7, ease: "power3.out" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.7, ease: "power3.out" });
      const rTo = gsap.quickTo(el, "rotation", { duration: 0.8, ease: "power3.out" });
      let lastX = 0;

      const list = root.current!.querySelector<HTMLElement>(".work-list")!;
      const imgs = el.querySelectorAll<HTMLElement>(".work-preview-img");

      const move = (e: MouseEvent) => {
        const w = el.offsetWidth;
        xTo(e.clientX - w / 2);
        yTo(e.clientY - el.offsetHeight / 2);
        // tilt with horizontal velocity, like a card carried by hand
        rTo(gsap.utils.clamp(-9, 9, (e.clientX - lastX) * 0.45));
        lastX = e.clientX;
      };

      const enterRow = (i: number) => () => {
        active.current = i;
        imgs.forEach((img, j) => img.classList.toggle("active", j === i));
        gsap.to(el, { autoAlpha: 1, scale: 1, duration: 0.45, ease: "power3.out" });
      };

      const leaveList = () => {
        active.current = -1;
        gsap.to(el, { autoAlpha: 0, scale: 0.9, duration: 0.4, ease: "power3.in" });
      };

      gsap.set(el, { scale: 0.9, transformOrigin: "center center" });
      list.addEventListener("mousemove", move);
      list.addEventListener("mouseleave", leaveList);
      const rows = list.querySelectorAll<HTMLElement>(".work-row");
      const handlers: Array<() => void> = [];
      rows.forEach((row, i) => {
        const h = enterRow(i);
        handlers.push(h);
        row.addEventListener("mouseenter", h);
      });

      return () => {
        list.removeEventListener("mousemove", move);
        list.removeEventListener("mouseleave", leaveList);
        rows.forEach((row, i) => row.removeEventListener("mouseenter", handlers[i]));
      };
    },
    { scope: root },
  );

  return (
    <section id="work" className="section container" ref={root}>
      <SectionHead
        index="01"
        label="Selected Work"
        title={
          <>
            Selected <em>work</em>
          </>
        }
        meta={<>03 case studies</>}
      />

      <FadeUp className="work-list" stagger={0.12} y={60}>
        {projects.map((p, i) => (
          <a
            key={p.plain}
            href={p.href}
            className="work-row"
            data-cursor="view"
            data-cursor-label="View"
            aria-label={`${p.plain} — ${p.type}`}
          >
            <span className="work-index">/{String(i + 1).padStart(2, "0")}</span>
            <div className="work-media" aria-hidden="true">
              <Image src={p.image} alt="" fill sizes="100vw" />
            </div>
            <h3 className="work-name">{p.label}</h3>
            <div className="work-info">
              <span className="work-type mono">{p.type}</span>
              <span className="mono">{p.role}</span>
              <p className="work-desc">{p.desc}</p>
            </div>
            <span className="work-arrow" aria-hidden="true">
              ↗
            </span>
          </a>
        ))}
      </FadeUp>

      <div className="work-cta">
        <Magnetic>
          <Link href="/work" className="btn" data-cursor="hover">
            More <span className="arr">→</span>
          </Link>
        </Magnetic>
      </div>

      {/* floating cursor-follow preview */}
      <div className="work-preview" ref={preview} aria-hidden="true">
        {projects.map((p) => (
          <div key={p.plain} className="work-preview-img">
            <Image src={p.image} alt="" fill sizes="30vw" />
          </div>
        ))}
      </div>
    </section>
  );
}
