"use client";

import Image from "next/image";

export default function Header() {
  return (
    <nav className="nav">
      <a href="#top" className="nav-brand">
        <span className="nav-mark" style={{ overflow: "hidden" }}>
          <Image src="/avatar.jpeg" width={28} height={28} alt="B" className="w-full h-full object-cover" />
        </span>
        <span>
          Benarfa<span style={{ opacity: 0.5 }}>/</span>Hamza
        </span>
      </a>

      <ul className="nav-links">
        <li><a href="#work">Work</a></li>
        <li><a href="#services">Services</a></li>
        <li><a href="#process">Process</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>

      <div className="nav-status">
        <span className="dot" />
        Available · Tunis (GMT+1)
      </div>
    </nav>
  );
}
