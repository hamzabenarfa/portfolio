import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <nav className="nav">
      <Link href="/" className="nav-brand">
        <span className="nav-mark" style={{ overflow: "hidden" }}>
          <Image
            src="/avatar.jpeg"
            width={28}
            height={28}
            alt="Hamza Benarfa"
            className="w-full h-full object-cover"
          />
        </span>
        <span>
          Benarfa<span style={{ opacity: 0.5 }}>/</span>Hamza
        </span>
      </Link>

      <ul className="nav-links">
        <li><Link href="/projects">Work</Link></li>
        <li><Link href="/services">Services</Link></li>
        <li><Link href="/#process">Process</Link></li>
        <li><Link href="/about">About</Link></li>
        <li><Link href="/#contact">Contact</Link></li>
      </ul>

      <a
        href="https://wa.me/21622633345"
        className="nav-cta"
        target="_blank"
        rel="noreferrer"
        data-cursor-hover
      >
        <span className="nav-cta-dot" />
        Book a call
      </a>
    </nav>
  );
}
